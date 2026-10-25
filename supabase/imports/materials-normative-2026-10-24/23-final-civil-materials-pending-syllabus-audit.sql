-- Read-only completion audit. 23 of 23 study materials now contain 20 exercises.
-- Last two materials are fully reviewed, but their 36 new authored questions
-- must not be inserted into curated_question_catalog until a matching active
-- syllabus topic exists. No unrelated syllabus mapping should be fabricated.
select slug,jsonb_array_length(quiz) quiz_count,
jsonb_array_length(practice_review->'items') reviewed_count,
practice_review->>'status' review_status,
practice_review->>'catalog_status' catalog_status
from public.study_materials where id in
('1d07f5bb-4d9d-4684-bf60-651b50afdecd',
 '969528f3-0d19-486a-84e9-1feb258545e7');
select count(*) as catalogued_authorial_questions
from public.curated_question_catalog
where external_item_key like 'norte:study:%'
and is_original and content_status='active'
and official_answer in ('C','E');
