-- Read-only audit of four published 2026-10-24 batches.
-- Each material has 20 reviewed exercises, originals preserved, and
-- every new exercise published to the question catalog with C/E answer,
-- explanation, active syllabus topic and AUTORAL provenance.
select slug,jsonb_array_length(quiz) material_questions,
jsonb_array_length(practice_review->'items') reviewed_questions
from public.study_materials where slug in (
'administrativo-licitacoes-lei-14133-modalidades',
'administrativo-contratos-administrativos-lei-14133',
'processo-civil-tutela-provisoria',
'constitucional-acumulacao-ec138-casos',
'penal-confissao-sumulas-545-630');
select split_part(external_item_key,':',3) material_slug,count(*) authored_count
from public.curated_question_catalog
where external_item_key like 'norte:study:%'
and split_part(external_item_key,':',3) in (
'administrativo-licitacoes-lei-14133-modalidades',
'administrativo-contratos-administrativos-lei-14133',
'processo-civil-tutela-provisoria',
'constitucional-acumulacao-ec138-casos',
'penal-confissao-sumulas-545-630')
and is_original and content_status='active' and official_answer in ('C','E')
group by 1;
