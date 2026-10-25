-- Post-publication independent audit: penal-lei-no-tempo
-- Published through Supabase SQL connector on 2026-10-24.
-- 8 preserved + 12 authored = 20. This file is read-only; do not republish.
-- Authored exercises are not official examination questions.
select
  m.id,
  m.slug,
  jsonb_array_length(m.quiz) as exercise_count,
  jsonb_array_length(m.practice_review->'items') as reviewed_item_count,
  m.practice_review->>'status' as review_status,
  m.practice_review->>'syllabus_topic_id' as syllabus_topic_id,
  count(*) filter (where item->>'origin'='preserved_published') as preserved_items,
  count(*) filter (where item->>'origin'='authored_current_official_text') as authored_items
from public.study_materials m
cross join lateral jsonb_array_elements(m.practice_review->'items') item
where m.id='a099e1d5-87a4-4f8d-88ed-a1551f8b125b'
group by m.id,m.slug,m.quiz,m.practice_review;
