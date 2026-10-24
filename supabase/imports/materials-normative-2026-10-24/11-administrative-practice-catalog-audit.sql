-- Audit: Lei 8.112 and CTN police-power original practice publication, 2026-10-24.
-- 16 new questions: servidores-lei-8112-posse-exercicio-vacancia-remocao.
-- 17 new questions: administrativo-poder-de-policia-ciclo-prescricao.
-- Original material questions preserved; each material has 20 reviewed items.
-- New questions separately inserted in curated_question_catalog with stable
-- norte:study:<slug>:<ordinal> keys, syllabus topics, C/E answers, explanations,
-- is_original=true, exam_board='AUTORAL', and official legal-source URL.
select slug,jsonb_array_length(quiz) as quiz_count,
jsonb_array_length(practice_review->'items') as reviewed_count
from public.study_materials
where slug in ('servidores-lei-8112-posse-exercicio-vacancia-remocao',
'administrativo-poder-de-policia-ciclo-prescricao');
select split_part(external_item_key,':',3) as material_slug,count(*) as published
from public.curated_question_catalog
where external_item_key like 'norte:study:%'
and split_part(external_item_key,':',3) in ('servidores-lei-8112-posse-exercicio-vacancia-remocao','administrativo-poder-de-policia-ciclo-prescricao')
group by 1;
