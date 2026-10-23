-- Corrige SOMENTE a anotação não jurídica confirmada nas cinco questões.
-- Depois, execute novamente o SQL de aplicação das cinco explicações.
-- Não muda status, edital, enunciado, gabarito ou datas de verificação.
begin;

do $access$
begin
  if current_user not in ('postgres','supabase_admin') then
    raise exception 'Execute no SQL Editor como postgres.';
  end if;
end $access$;

create table if not exists public.idecan_admin_metadata_audit (
  batch_key text not null,
  question_id uuid not null references public.board_exam_questions(id),
  before_data jsonb not null,
  after_data jsonb not null,
  applied_at timestamptz not null default now(),
  primary key (batch_key, question_id)
);
alter table public.idecan_admin_metadata_audit enable row level security;
revoke all on public.idecan_admin_metadata_audit from public, anon, authenticated;

do $fix$
declare
  target record;
  stored public.board_exam_questions;
  updated_row public.board_exam_questions;
  marker jsonb := '[{"title":"Questão de teoria da Administração; sem legislação diretamente aplicável"}]'::jsonb;
begin
  for target in
    select * from (values
      ('e68a5855-328a-4c42-8921-b0795d49c9e0'::uuid,64,'E'),
      ('c7150109-0ab2-48bb-82ef-999b5d7ce52a'::uuid,65,'B'),
      ('1486cc61-6e76-4f54-b0db-516c437275f5'::uuid,66,'A'),
      ('61235d9c-6458-4b3a-a543-1121f367ac5d'::uuid,67,'D'),
      ('d5ccfd98-dd53-4838-b1f9-fb8772aa3f8b'::uuid,68,'C')
    ) as items(id,numero,gabarito)
  loop
    select * into strict stored
    from public.board_exam_questions
    where id = target.id
      and board = 'IDECAN'
      and contest_name = 'PC SC - Escrivão de Polícia Civil 2026'
      and career_name = 'Escrivão de Polícia Civil'
      and exam_year = 2026
      and exam_type = 'Tipo A'
      and subject = 'Administração'
      and item_number = target.numero
      and official_answer = target.gabarito
    for update;

    if stored.content_status is distinct from 'active'
       or stored.needs_visual is distinct from false
       or stored.legal_review_required is distinct from false then
      raise exception 'Questão % mudou ou exige revisão. Lote cancelado.', target.numero;
    end if;

    if stored.legal_basis = '[]'::jsonb then
      continue;
    end if;

    if stored.legal_basis is distinct from marker then
      raise exception 'Questão % tem referências diferentes. Preservadas; lote cancelado.', target.numero;
    end if;

    if nullif(btrim(stored.explanation),'') is not null then
      raise exception 'Questão % já recebeu explicação. Confira a revisão antes de alterar metadados.', target.numero;
    end if;

    if exists (
      select 1 from public.idecan_admin_metadata_audit
      where batch_key = 'idecan-admin-nonlegal-marker-v1'
        and question_id = stored.id
    ) then
      raise exception 'Questão % tem auditoria anterior e metadados divergentes.', target.numero;
    end if;

    update public.board_exam_questions
    set legal_basis = '[]'::jsonb
    where id = stored.id
    returning * into updated_row;

    insert into public.idecan_admin_metadata_audit
      (batch_key,question_id,before_data,after_data)
    values ('idecan-admin-nonlegal-marker-v1',stored.id,
            to_jsonb(stored),to_jsonb(updated_row));
  end loop;
end $fix$;

select item_number as questao, content_status as estado,
       legal_basis as referencias_juridicas,
       explanation is not null as tem_explicacao
from public.board_exam_questions
where id in (
  'e68a5855-328a-4c42-8921-b0795d49c9e0'::uuid,
  'c7150109-0ab2-48bb-82ef-999b5d7ce52a'::uuid,
  '1486cc61-6e76-4f54-b0db-516c437275f5'::uuid,
  '61235d9c-6458-4b3a-a543-1121f367ac5d'::uuid,
  'd5ccfd98-dd53-4838-b1f9-fb8772aa3f8b'::uuid
)
order by item_number;

commit;
