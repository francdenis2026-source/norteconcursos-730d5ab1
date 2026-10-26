-- Read-only verification of two published practice batches (2026-10-24).
-- These are authored study exercises, not official examination questions.
-- Source: https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm
-- Original eight items preserved in each; twelve authored items appended.
select m.slug, jsonb_array_length(m.quiz) as total_exercises,
       m.practice_review->>'status' as review_status,
       m.practice_review->>'syllabus_topic_id' as syllabus_topic_id,
       (select count(*) from jsonb_array_elements(m.practice_review->'items') x
        where x->>'origin'='preserved_published') as original_count,
       (select count(*) from jsonb_array_elements(m.practice_review->'items') x
        where x->>'origin'='authored_current_official_text') as new_count
from public.study_materials m
where m.id in (
 '768b20a2-df14-48c1-9273-4595e7ed7077',
 '2eb5e9d0-bf52-48dd-ad2e-3d0a5fc1b944'
);
