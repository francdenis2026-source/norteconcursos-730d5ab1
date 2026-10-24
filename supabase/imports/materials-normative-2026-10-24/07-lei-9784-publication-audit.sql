-- Audit only. Exercises were published in Supabase, not by this SQL file.
-- 2026-10-24: Federal Administrative Procedure Law 9.784/1999.
-- Four previously published exercises preserved; sixteen original practice exercises added.
-- These are not official exam questions.
select m.slug,jsonb_array_length(m.quiz) total,
m.practice_review->>'status' review_status,
m.practice_review->>'syllabus_topic_id' syllabus_topic_id,
(select count(*) from jsonb_array_elements(m.practice_review->'items') x where x->>'origin'='preserved_published') preserved,
(select count(*) from jsonb_array_elements(m.practice_review->'items') x where x->>'origin'='authored_current_official_text') authored
from public.study_materials m
where m.id='48407590-049a-465e-9d6d-5a4348dc2417';
