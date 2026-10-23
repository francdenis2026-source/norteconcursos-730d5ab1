/** Build a guarded, transactional explanation-only update. Never connects to Supabase. */
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {PGlite}=await import(process.argv[2]?pathToFileURL(process.argv[2]).href:'@electric-sql/pglite');
const dir=new URL('../../supabase/imports/idecan/explicacoes-administracao-2026-10-23/',import.meta.url);
const pack=JSON.parse(readFileSync(new URL('explicacoes.json',dir),'utf8'));
const db=new PGlite();
const hashExpr=`encode(sha256(convert_to(jsonb_build_object('stem',replace(stem,E'\\r\\n',E'\\n'),'options',options,'answer',official_answer,'subject',subject)::text,'UTF8')),'hex')`;
try{
 const changes=[];
 for(const q of pack.items){
  const row={stem:q.original_stem,options:q.original_options,official_answer:q.historical_answer,subject:q.subject};
  const {rows}=await db.query(`select ${hashExpr} as hash from jsonb_to_record($1::jsonb) as x(stem text,options jsonb,official_answer text,subject text)`,[JSON.stringify(row)]);
  changes.push({item:q.identity.item_number,hash:rows[0].hash,answer:q.historical_answer,explanation:q.explanation});
 }
 const sql=`-- IDECAN: explicações das questões 64–68, Escrivão PC-SC 2026, Tipo A.
-- Execute o BLOCO INTEIRO no SQL Editor como postgres.
-- Altera somente explanation; preserva status, edital, enunciado e gabarito.
-- Não libera under_review nem certifica uma nova revisão de fonte/edital.
-- Explicação existente diferente, questão alterada ou bloqueada: reverte TODO o lote.
begin;
do $access$
begin
  if current_user not in ('postgres','supabase_admin') then
    raise exception 'Execute no SQL Editor como administrador postgres.';
  end if;
end $access$;

create table if not exists public.idecan_admin_explanation_audit (
  batch_key text not null,
  question_id uuid not null references public.board_exam_questions(id),
  before_data jsonb not null,
  after_data jsonb not null,
  applied_at timestamptz not null default now(),
  primary key (batch_key,question_id)
);
alter table public.idecan_admin_explanation_audit enable row level security;
revoke all on public.idecan_admin_explanation_audit from anon, authenticated;

do $apply$
declare
  change jsonb;
  stored public.board_exam_questions;
  updated_row public.board_exam_questions;
  actual_hash text;
  applied_count integer := 0;
  unchanged_count integer := 0;
begin
  for change in
    select value from jsonb_array_elements($items$
${JSON.stringify(changes,null,2)}
$items$::jsonb)
  loop
    select * into strict stored
    from public.board_exam_questions
    where board = 'IDECAN'
      and contest_name = 'PC SC - Escrivão de Polícia Civil 2026'
      and career_name = 'Escrivão de Polícia Civil'
      and exam_year = 2026 and exam_type = 'Tipo A'
      and item_number = (change->>'item')::integer
    for update;

    select ${hashExpr}
    into actual_hash
    from public.board_exam_questions where id = stored.id;

    if actual_hash <> change->>'hash' then
      raise exception 'Questão % mudou: confira enunciado, alternativas, matéria e gabarito. Nada aplicado.', change->>'item';
    end if;
    if stored.content_status not in ('active','under_review')
       or stored.needs_visual
       or stored.legal_review_required
       or coalesce(stored.legal_basis,'[]'::jsonb) <> '[]'::jsonb then
      raise exception 'Questão % bloqueada ou exige revisão adicional. Nada aplicado.', change->>'item';
    end if;

    if stored.explanation = change->>'explanation' then
      unchanged_count := unchanged_count + 1;
      continue;
    end if;
    if nullif(btrim(stored.explanation),'') is not null then
      raise exception 'Questão % já tem explicação diferente. Preservada; lote cancelado.', change->>'item';
    end if;
    if exists (
      select 1 from public.idecan_admin_explanation_audit
      where batch_key = 'idecan-admin-pcsc-64-68-20261023'
        and question_id = stored.id
    ) then
      raise exception 'Questão % tem auditoria anterior e comentário divergente. Lote cancelado.', change->>'item';
    end if;

    update public.board_exam_questions
    set explanation = change->>'explanation'
    where id = stored.id
    returning * into updated_row;

    insert into public.idecan_admin_explanation_audit
      (batch_key,question_id,before_data,after_data)
    values ('idecan-admin-pcsc-64-68-20261023',stored.id,
            to_jsonb(stored),to_jsonb(updated_row));
    applied_count := applied_count + 1;
  end loop;
  raise notice 'Explicações aplicadas: %. Já iguais: %. Status e gabaritos preservados.', applied_count, unchanged_count;
end $apply$;

select item_number as questao, official_answer as gabarito,
       content_status as estado, syllabus_topic_id as topico_edital,
       nullif(btrim(explanation),'') is not null as tem_explicacao,
       explanation ~* 'Exemplo( pr[aá]tico)?:' as tem_exemplo
from public.board_exam_questions
where board = 'IDECAN'
  and contest_name = 'PC SC - Escrivão de Polícia Civil 2026'
  and career_name = 'Escrivão de Polícia Civil'
  and exam_year = 2026 and exam_type = 'Tipo A'
  and item_number between 64 and 68
order by item_number;
commit;
`;
 writeFileSync(new URL('aplicar-cinco-explicacoes.sql',dir),sql);
 console.log('Generated five-item explanation-only SQL; no remote writes.');
} finally{await db.close();}
