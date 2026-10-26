-- Read-only verification for 113 original exercises catalogued from eight reviewed materials.
-- They are active in curated_question_catalog with subject, subtopic, syllabus topic,
-- authorial classification (AUTORAL), source reference, correct answer and explanation.
-- Each item has a stable external_item_key: norte:study:<material_slug>:<ordinal>.
-- Original study_materials.quiz items remain intact.
-- UI filtering and visual counters must be separately verified against frontend query logic.
select count(*) as authored_catalogued,
count(*) filter(where content_status='active' and is_original) as active_original,
count(distinct syllabus_topic_id) as syllabus_topics,
count(distinct subject) as disciplines
from public.curated_question_catalog
where external_item_key like 'norte:study:%';
select count(*) as total_catalog from public.curated_question_catalog;
