-- Audits for two published material batches: State liability and administrative acts.
-- These are verification queries, not imports; do not rerun older imports.
select slug,jsonb_array_length(quiz) as quiz_count,
jsonb_array_length(practice_review->'items') as reviewed_count
from public.study_materials
where slug in ('administrativo-responsabilidade-civil-do-estado',
'administrativo-atos-administrativos-requisitos-atributos');
select split_part(external_item_key,':',3) as material_slug,
count(*) as authored_catalogued
from public.curated_question_catalog
where external_item_key like 'norte:study:%'
and split_part(external_item_key,':',3) in
('administrativo-responsabilidade-civil-do-estado',
'administrativo-atos-administrativos-requisitos-atributos')
and is_original and content_status='active' and official_answer in ('C','E')
group by 1;
