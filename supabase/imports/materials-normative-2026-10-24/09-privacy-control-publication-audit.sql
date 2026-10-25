-- Read-only audit: privacy/data (8+12), administration control (4+16).
-- Authored study exercises, not official examination questions.
select slug,jsonb_array_length(quiz) as exercise_count,
practice_review->>'status' as review_status,
(select count(*) from jsonb_array_elements(practice_review->'items') x where x->>'origin'='preserved_published') as preserved,
(select count(*) from jsonb_array_elements(practice_review->'items') x where x->>'origin'='authored_current_official_text') as authored
from public.study_materials where id in
('d032f780-b1ca-4ad7-8839-2c240c52dbb2','287e7307-ed41-4416-988d-0a81c90dcdcc');
