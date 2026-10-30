-- Cover foreign-key joins used by question catalog filters and answer history.
-- These indexes improve joins and parent-row updates/deletes without changing data or access rules.
create index if not exists idx_official_exam_questions_source_id
  on public.official_exam_questions (question_source_id);
create index if not exists idx_official_exam_questions_syllabus_topic_id
  on public.official_exam_questions (syllabus_topic_id);
create index if not exists idx_curated_question_catalog_syllabus_topic_id
  on public.curated_question_catalog (syllabus_topic_id);
create index if not exists idx_board_exam_questions_syllabus_topic_id
  on public.board_exam_questions (syllabus_topic_id);
create index if not exists idx_question_bank_syllabus_topic_id
  on public.question_bank (syllabus_topic_id);
create index if not exists idx_questions_discipline_id
  on public.questions (discipline_id);
create index if not exists idx_questions_subject_id
  on public.questions (subject_id);
create index if not exists idx_user_responses_user_id
  on public.user_responses (user_id);
create index if not exists idx_user_responses_question_id
  on public.user_responses (question_id);

analyze public.official_exam_questions;
analyze public.curated_question_catalog;
analyze public.board_exam_questions;
analyze public.question_bank;
analyze public.questions;
analyze public.user_responses;
