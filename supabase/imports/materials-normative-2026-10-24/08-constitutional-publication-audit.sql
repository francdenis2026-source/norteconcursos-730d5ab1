-- Read-only publication audit. No mutation.
-- Two constitutional law materials completed with authored practice exercises.
-- Nationality: 4 preserved + 16 authored.
-- Political rights: 3 preserved + 17 authored.
-- Source: https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm
-- These are not official examination questions.
select slug,jsonb_array_length(quiz) total,practice_review->>'status' review_status,
(select count(*) from jsonb_array_elements(practice_review->'items') x where x->>'origin'='preserved_published') preserved,
(select count(*) from jsonb_array_elements(practice_review->'items') x where x->>'origin'='authored_current_official_text') authored
from public.study_materials where id in
('7c20498d-8989-4cfe-8fd9-46e6bb4bf76f','b82da9ff-297d-44cc-b1fb-5e4d0c164726');
