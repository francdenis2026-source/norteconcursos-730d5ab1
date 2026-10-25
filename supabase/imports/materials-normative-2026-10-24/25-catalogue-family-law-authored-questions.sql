-- Lote autoral: pensão alimentícia, itens 1–15.
-- Aplicado no Supabase em 2026-10-24. Idempotente: ON CONFLICT impede duplicação.
-- Os itens 1–15 se enquadram em Direito de Família/relações de parentesco
-- do edital ativo PC-PI Delegado (tópico exato abaixo). Os itens 16–20 tratam
-- de execução processual civil e permanecem pendentes de edital compatível.
begin;
do $guard$
begin
  if not exists (
    select 1 from public.study_materials
    where slug='processo-civil-pensao-alimenticia-atualizacoes'
      and jsonb_array_length(quiz)=20
      and jsonb_array_length(practice_review->'items')=20
  ) then raise exception 'Material ou revisão não está no estado esperado'; end if;
  if not exists (
    select 1 from public.syllabus_topics t
    join public.syllabus_editions e on e.id=t.edition_id
    where t.id='2b106279-1fd5-4580-a04d-3da0829e1d3a'
      and t.content_status='current' and e.status='active'
      and t.topic_text ilike '%Direito de Família%'
      and t.topic_text ilike '%Relações de parentesco%'
  ) then raise exception 'Tópico de edital deixou de estar ativo ou pertinente'; end if;
end $guard$;

insert into public.content_sources(source_type,title,issuer,url,status,is_official,notes)
select 'sumula','STJ — Súmula 358: cancelamento de alimentos após maioridade',
  'Superior Tribunal de Justiça',
  'https://processo.stj.jus.br/SCON/pesquisar.jsp?b=SUMU&livre=SUMULA+INPATH%28TIPO%29+AND+358+INPATH%28NUM%29',
  'vigente',true,'Enunciado oficial consultado para questões autorais sobre alimentos.'
where not exists (select 1 from public.content_sources where url='https://processo.stj.jus.br/SCON/pesquisar.jsp?b=SUMU&livre=SUMULA+INPATH%28TIPO%29+AND+358+INPATH%28NUM%29');

insert into public.content_sources(source_type,title,issuer,url,status,is_official,notes)
select 'sumula','STJ — Súmula 309: débito alimentar que autoriza prisão civil',
  'Superior Tribunal de Justiça',
  'https://scon.stj.jus.br/SCON/sumstj/doc.jsp?b=SUMU&h=true&i=1&l=10&livre=SUMULA+INPATH%28TIPO%29+AND+309+INPATH%28NUM%29&ordenacao=-%40NUM&p=false',
  'vigente',true,'Enunciado oficial consultado para questões autorais sobre execução de alimentos.'
where not exists (select 1 from public.content_sources where url='https://scon.stj.jus.br/SCON/sumstj/doc.jsp?b=SUMU&h=true&i=1&l=10&livre=SUMULA+INPATH%28TIPO%29+AND+309+INPATH%28NUM%29&ordenacao=-%40NUM&p=false');

update public.study_materials
set practice_review =
  jsonb_set(
    jsonb_set(
      jsonb_set(
        jsonb_set(practice_review,'{items,10,source_url}',
          to_jsonb('https://processo.stj.jus.br/SCON/pesquisar.jsp?b=SUMU&livre=SUMULA+INPATH%28TIPO%29+AND+358+INPATH%28NUM%29'::text)),
        '{items,11,source_url}',
          to_jsonb('https://processo.stj.jus.br/SCON/pesquisar.jsp?b=SUMU&livre=SUMULA+INPATH%28TIPO%29+AND+358+INPATH%28NUM%29'::text)),
      '{catalog_status}',to_jsonb('partially_catalogued_pending_procedural_syllabus'::text)),
    '{catalogued_item_indexes}','[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]'::jsonb),
  updated_at=now()
where slug='processo-civil-pensao-alimenticia-atualizacoes'
  and jsonb_array_length(quiz)=20
  and jsonb_array_length(practice_review->'items')=20;

update public.study_materials
set practice_review=jsonb_set(
  practice_review,'{pending_item_indexes}','[16,17,18,19,20]'::jsonb)
where slug='processo-civil-pensao-alimenticia-atualizacoes'
  and jsonb_array_length(quiz)=20
  and jsonb_array_length(practice_review->'items')=20;

update public.study_materials
set practice_review=jsonb_set(
  practice_review,'{sources}',
  coalesce(practice_review->'sources','[]'::jsonb)
    || jsonb_build_array(jsonb_build_object('url','https://processo.stj.jus.br/SCON/pesquisar.jsp?b=SUMU&livre=SUMULA+INPATH%28TIPO%29+AND+358+INPATH%28NUM%29')))
where slug='processo-civil-pensao-alimenticia-atualizacoes'
  and not coalesce(practice_review->'sources','[]'::jsonb)
    @> '[{"url":"https://processo.stj.jus.br/SCON/pesquisar.jsp?b=SUMU&livre=SUMULA+INPATH%28TIPO%29+AND+358+INPATH%28NUM%29"}]'::jsonb;

update public.study_materials
set practice_review=jsonb_set(
  practice_review,'{sources}',
  coalesce(practice_review->'sources','[]'::jsonb)
    || jsonb_build_array(jsonb_build_object('url','https://scon.stj.jus.br/SCON/sumstj/doc.jsp?b=SUMU&h=true&i=1&l=10&livre=SUMULA+INPATH%28TIPO%29+AND+309+INPATH%28NUM%29&ordenacao=-%40NUM&p=false')))
where slug='processo-civil-pensao-alimenticia-atualizacoes'
  and not coalesce(practice_review->'sources','[]'::jsonb)
    @> '[{"url":"https://scon.stj.jus.br/SCON/sumstj/doc.jsp?b=SUMU&h=true&i=1&l=10&livre=SUMULA+INPATH%28TIPO%29+AND+309+INPATH%28NUM%29&ordenacao=-%40NUM&p=false"}]'::jsonb;

with m as (
  select sm.* from public.study_materials sm
  where sm.slug='processo-civil-pensao-alimenticia-atualizacoes'
    and jsonb_array_length(sm.quiz)=20
    and jsonb_array_length(sm.practice_review->'items')=20
), item_rows as (
  select m.*, i.item, i.ord
  from m cross join lateral jsonb_array_elements(m.practice_review->'items') with ordinality i(item,ord)
  where i.ord<=15 and i.item->>'origin'='authored_current_official_text'
), topic as (
  select t.id topic_id,e.contest_name,e.contest_year,e.role_name
  from public.syllabus_topics t
  join public.syllabus_editions e on e.id=t.edition_id
  where t.id='2b106279-1fd5-4580-a04d-3da0829e1d3a'
    and t.content_status='current' and e.status='active'
    and t.topic_text ilike '%Direito de Família%'
    and t.topic_text ilike '%Relações de parentesco%'
), source_ids as (
  select
    (select id from public.content_sources where id='8b7a080b-df0b-5b20-bc35-38b4a8dc2f6d' and status='vigente') cc_id,
    (select id from public.content_sources where url='https://processo.stj.jus.br/SCON/pesquisar.jsp?b=SUMU&livre=SUMULA+INPATH%28TIPO%29+AND+358+INPATH%28NUM%29' and status='vigente') stj358_id
), inserted as (
  insert into public.curated_question_catalog
    (source_id,syllabus_topic_id,external_item_key,contest_name,contest_year,career_name,exam_board,subject,subtopic,question_text,official_answer,explanation,legal_basis,difficulty,content_status,is_original,verified_at,law_version_checked_at,tested_topic)
  select
    case when ir.ord in (11,12) then si.stj358_id else si.cc_id end,
    t.topic_id,
    'norte:study:'||ir.slug||':'||ir.ord,
    t.contest_name,t.contest_year,t.role_name,'AUTORAL','Direito Civil',
    'Pensão alimentícia — Direito de Família',
    'Julgue o item: '||(ir.item->>'q'),
    case when (ir.item->>'a')::boolean then 'C' else 'E' end,
    ir.item->>'why',
    jsonb_build_array(jsonb_build_object('url',ir.item->>'source_url','material_slug',ir.slug,'practice_index',ir.ord)),
    'média','active',true,now(),now(),
    'Direito de Família — relações de parentesco e alimentos'
  from item_rows ir cross join topic t cross join source_ids si
  where si.cc_id is not null and si.stj358_id is not null
  on conflict (source_id,external_item_key) do nothing
  returning id
)
select count(*) as inserted_in_this_run from inserted;

-- Verificação final: 15 itens ativos no catálogo; cinco itens processuais ficam pendentes.
do $verify$
begin
  if (select count(*) from public.curated_question_catalog
      where external_item_key like 'norte:study:processo-civil-pensao-alimenticia-atualizacoes:%'
        and is_original and content_status='active') < 15 then
    raise exception 'Auditoria falhou: catálogo tem menos de 15 questões autorais';
  end if;
end $verify$;
commit;
