-- Publication audit: Powers of Administration material.
-- 3 original exercises preserved, 17 newly authored, 20 total in material.
-- 17 new items inserted into curated_question_catalog, with stable external keys,
-- C/E answer, explanations, AUTORAL board, is_original and active syllabus topic.
select slug,jsonb_array_length(quiz) as quiz_count,
jsonb_array_length(practice_review->'items') as reviewed_count
from public.study_materials
where slug='administrativo-poderes-vinculado-discricionario-hierarquico';
select count(*) as published_originals
from public.curated_question_catalog
where external_item_key like 'norte:study:administrativo-poderes-vinculado-discricionario-hierarquico:%'
and is_original and content_status='active' and official_answer in ('C','E');
