-- Read-only audit for Bens Públicos and PAD batches.
-- Each material: four preserved and sixteen new questions; 20 total.
-- Each newly authored item is catalogued with is_original=true,
-- board AUTORAL, C/E answer, official source and active syllabus topic.
select slug,jsonb_array_length(quiz) quiz_count,
jsonb_array_length(practice_review->'items') reviewed_count
from public.study_materials
where slug in ('administrativo-bens-publicos-classificacao-uso',
'servidores-lei-8112-pad-sindicancia-ritos-prescricao');
select split_part(external_item_key,':',3) material_slug,count(*) authored_count
from public.curated_question_catalog
where external_item_key like 'norte:study:%'
and split_part(external_item_key,':',3) in
('administrativo-bens-publicos-classificacao-uso',
'servidores-lei-8112-pad-sindicancia-ritos-prescricao')
and is_original and content_status='active' and official_answer in ('C','E')
group by 1;
