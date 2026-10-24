-- Improbidade administrativa: 4 preserved exercises, 16 authored additions.
-- New questions also published in curated_question_catalog with active syllabus
-- topic, original authorship marker, official source, C/E answers and explanations.
select slug,jsonb_array_length(quiz) as material_questions,
jsonb_array_length(practice_review->'items') as reviewed_questions
from public.study_materials
where slug='administrativo-improbidade-lei-8429-reforma-14230';
select count(*) as authored_catalogued
from public.curated_question_catalog
where external_item_key like 'norte:study:administrativo-improbidade-lei-8429-reforma-14230:%'
and content_status='active' and is_original and official_answer in ('C','E');
