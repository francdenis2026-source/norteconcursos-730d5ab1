// Generates one bounded, audited SQL transaction; never connects to production.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
export const batch='idecan-math-pedagogy-v1';
const directory='supabase/imports/idecan/revisao-integral';
export async function buildMathSQL(db,snapshots){
 const report=JSON.parse(fs.readFileSync(`${directory}/pareceres-matematica.json`));
 const original=JSON.parse(fs.readFileSync('supabase/imports/idecan/idecan_questions.json'));
 const live=new Map(snapshots.board_exam_questions.map(q=>[q.id,q]));
 const notes=JSON.parse(fs.readFileSync(`${directory}/explicacoes-matematica-rascunho.json`));
 const data=[];
 for(const item of report.items){
  const old=live.get(item.id),q=original[item.local_index],note=notes.find(n=>n.local_index===item.local_index);
  if(!old||old.board!=='IDECAN'||old.contest_name!==q.contest_name||old.exam_type!==q.exam_type||old.item_number!==q.item_number||old.official_answer!==q.official_answer||JSON.stringify(old.options)!==JSON.stringify(q.options)||old.stem.replace(/\r\n/g,'\n')!==q.stem)throw Error(`Snapshot diverge: ${item.id}`);
  if(old.explanation||old.syllabus_topic_id||old.content_status!=='active'||old.legal_review_required)throw Error('Existing review protected');
  if(!note||note.solution+'\n\nErro comum: '+note.common_error+'\n\nExemplo prático: '+note.practical_example!==item.explanation)throw Error('Explanation differs from authored review');
  const topic=snapshots.syllabus_topics.find(t=>t.id===item.syllabus_topic_id);
  const edition=snapshots.syllabus_editions.find(e=>e.id===topic?.edition_id);
  const source=snapshots.content_sources.find(s=>s.id===edition?.source_id);
  if(topic?.content_status!=='current'||edition?.status!=='active'||edition.id!==item.syllabus_edition_id||source?.is_official!==true||source.status!=='vigente'||source.url!==item.syllabus_url)throw Error('Syllabus evidence differs');
  const baseline={...old};delete baseline.created_at;delete baseline.verified_at;
  const hash=(await db.query("select encode(sha256(convert_to($1::jsonb::text,'UTF8')),'hex') hash",[JSON.stringify(baseline)])).rows[0].hash;
  data.push({id:item.id,expected_hash:hash,topic:item.syllabus_topic_id,edition:edition.id,source_url:source.url,topic_text:topic.topic_text,status:item.new_content_status,explanation:item.explanation,stem:item.local_index===81?'Cinco delegacias foram avaliadas quanto à eficiência de resolução de crimes, apresentando os seguintes índices: Delegacia A: 0,85; Delegacia B: √0,64; Delegacia C: 0,805; Delegacia D: 8/9; e a Delegacia E: (√0,81)². Escrevendo todos os índices na forma decimal, temos que a delegacia com o menor índice de eficiência é a:':null,booklet_sha256:item.booklet_sha256});
 }
 if(data.length!==38||data.filter(x=>x.status==='active').length!==37||data.filter(x=>x.status==='under_review').length!==1)throw Error('Unexpected batch coverage');
 const topics=Object.fromEntries(data.map(x=>[x.topic,{topic:x.topic,edition:x.edition,source_url:x.source_url,topic_text:x.topic_text}]));
 const books=[...new Set(data.map(x=>x.booklet_sha256))];
 const catalog=JSON.stringify({topics,books});
 const json='[\n'+data.map(x=>JSON.stringify([x.id,x.expected_hash,x.status,x.explanation,x.stem,books.indexOf(x.booklet_sha256),x.topic])).join(',\n')+'\n]';
 if(json.includes('$items$'))throw Error('Unsafe delimiter');
 return `-- IDECAN: 37 explicações aprovadas de matemática; 1 questão retida.
-- Execute inteiro no SQL Editor como postgres. Não libera informática, legislação ou PC-CE.
-- Todas as mudanças deste lote são atômicas; reexecução não duplica auditoria.
begin;
do $access$ begin
 if current_user not in ('postgres','supabase_admin') then
  raise exception 'Execute no SQL Editor como administrador postgres';
 end if;
end $access$;
create table if not exists public.idecan_pedagogical_review_audit (
 id bigint generated always as identity primary key,
 batch_key text not null,
 question_id uuid not null references public.board_exam_questions(id),
 before_data jsonb not null,
 after_data jsonb not null,
 evidence jsonb not null,
 reviewer_id uuid,
 reviewed_at timestamptz not null default now(),
 unique(batch_key,question_id)
);
alter table public.idecan_pedagogical_review_audit enable row level security;
revoke all on public.idecan_pedagogical_review_audit from anon,authenticated;
grant select on public.idecan_pedagogical_review_audit to authenticated;
drop policy if exists "Admins read IDECAN pedagogical audit" on public.idecan_pedagogical_review_audit;
create policy "Admins read IDECAN pedagogical audit" on public.idecan_pedagogical_review_audit
 for select to authenticated using (public.has_role(auth.uid(),'admin'));
do $review$
declare
 change jsonb;
 tuple jsonb;
 catalog jsonb := $catalog$${catalog}$catalog$::jsonb;
 stored public.board_exam_questions;
 previous_application public.idecan_pedagogical_review_audit;
 updated_row public.board_exam_questions;
 actual_hash text;
begin
 for tuple in select value from jsonb_array_elements($items$${json}$items$::jsonb) loop
  change := jsonb_build_object('id',tuple->0,'expected_hash',tuple->1,'status',tuple->2,
    'explanation',tuple->3,'stem',tuple->4,'booklet_sha256',catalog#>array['books',tuple->>5])
    || (catalog#>array['topics',tuple->>6]);
  select * into stored from public.board_exam_questions where id=(change->>'id')::uuid for update;
  if not found then raise exception 'Questão ausente: %',change->>'id'; end if;
  select * into previous_application from public.idecan_pedagogical_review_audit
   where batch_key='${batch}' and question_id=stored.id;
  if found then
   if to_jsonb(stored) is distinct from previous_application.after_data then
    raise exception 'Questão alterada após o lote: %; revisão preservada',stored.id;
   end if;
   continue;
  end if;
  select encode(sha256(convert_to((to_jsonb(stored)-array['created_at','verified_at'])::text,'UTF8')),'hex') into actual_hash;
  if actual_hash is distinct from change->>'expected_hash' then
   raise exception 'Questão modificada desde a conferência: %; lote revertido',stored.id;
  end if;
  perform 1 from public.syllabus_topics t
   join public.syllabus_editions e on e.id=t.edition_id
   join public.content_sources s on s.id=e.source_id
   where t.id=(change->>'topic')::uuid and t.content_status='current'
    and t.topic_text=change->>'topic_text'
    and e.id=(change->>'edition')::uuid and e.status='active'
    and s.url=change->>'source_url' and s.is_official and s.status='vigente'
   for share of t,e,s;
  if not found then raise exception 'Edital/tópico oficial divergente: %',stored.id; end if;
  if stored.board<>'IDECAN' or stored.official_answer='X' or stored.legal_review_required
    or change->>'status' not in ('active','under_review')
    or change->>'explanation' not like '%Exemplo prático:%' then
   raise exception 'Item fora do escopo não jurídico aprovado';
  end if;
  update public.board_exam_questions set
   explanation=change->>'explanation',
   syllabus_topic_id=(change->>'topic')::uuid,
   tested_topic=change->>'topic_text',
   stem=coalesce(change->>'stem',stored.stem),
   content_status=change->>'status',
   verified_at=now(),
   review_note=concat_ws('; ',stored.review_note,
    'Revisão matemática individual: gabarito definitivo, resolução, erro comum e exemplo; matriz PF 2025, sem previsão de edital PC-AC',
    case when change->>'status'='under_review' then 'Retida: 7,5 jornadas versus conclusão no oitavo dia exige decisão editorial' else 'Explicação pedagógica aprovada' end)
   where id=stored.id returning * into updated_row;
  insert into public.idecan_pedagogical_review_audit(batch_key,question_id,before_data,after_data,evidence,reviewer_id)
   values('${batch}',stored.id,to_jsonb(stored),to_jsonb(updated_row),
    jsonb_build_object('booklet_sha256',change->>'booklet_sha256','syllabus_url',change->>'source_url','historical_answer_preserved',true),auth.uid());
 end loop;
 if (select count(*) from public.idecan_pedagogical_review_audit where batch_key='${batch}')<>38 then
  raise exception 'Contagem divergente; lote revertido';
 end if;
end $review$;
commit;
-- Resultado esperado apenas neste lote: active=37; under_review=1; com_explicacao=quantidade.
select q.content_status,count(*) as quantidade,
 count(*) filter(where q.explanation like '%Exemplo prático:%') as com_explicacao
from public.board_exam_questions q
join public.idecan_pedagogical_review_audit a on a.question_id=q.id
where a.batch_key='${batch}' group by q.content_status order by q.content_status;
`;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const {PGlite}=await import(pathToFileURL(process.argv[3]).href);
 const db=new PGlite();try{
  const snapshots=Object.fromEntries(['board_exam_questions','syllabus_topics','syllabus_editions','content_sources'].map(table=>[table,JSON.parse(fs.readFileSync(path.join(process.argv[2],table+'.json')))]));
  const sql=await buildMathSQL(db,snapshots);
  fs.writeFileSync(`${directory}/aplicar-explicacoes-matematica.sql`,sql);
  console.log(JSON.stringify({bytes:Buffer.byteLength(sql),approved:37,held:1,remote_applied:false}));
 }finally{await db.close();}
}
