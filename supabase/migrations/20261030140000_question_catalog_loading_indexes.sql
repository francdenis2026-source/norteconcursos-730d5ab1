-- Speed up the active question catalog's ordered pagination without changing eligibility.
-- Partial indexes stay small and match the catalog's content_status = 'active' filter.
create index if not exists idx_official_exam_questions_active_id
  on public.official_exam_questions (id)
  where content_status = 'active';

create index if not exists idx_curated_question_catalog_active_id
  on public.curated_question_catalog (id)
  where content_status = 'active';

create index if not exists idx_board_exam_questions_active_id
  on public.board_exam_questions (id)
  where content_status = 'active';

-- The personal bank is filtered by the signed-in user's ID and active status.
create index if not exists idx_question_bank_user_active_id
  on public.question_bank (user_id, id)
  where content_status = 'active';

-- question_currency is ordered by question_id when applying "currentness" labels.
create index if not exists idx_question_currency_question_id
  on public.question_currency (question_id);

analyze public.official_exam_questions;
analyze public.curated_question_catalog;
analyze public.board_exam_questions;
analyze public.question_bank;
analyze public.question_currency;
