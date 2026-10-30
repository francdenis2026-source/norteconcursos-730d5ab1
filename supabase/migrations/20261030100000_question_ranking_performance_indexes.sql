-- Indexes supporting the public ranking calculation and public question summary.
-- Keep ranking formulas and eligibility thresholds unchanged.
begin;
create index if not exists idx_training_responses_question_rank on public.question_training_responses (question_id, question_table, created_at) include (user_id, selected_answer, asked_for_help, response_seconds, ranking_first) where question_source <> 'personal';
create index if not exists idx_simulator_responses_question_rank on public.simulator_responses (question_id, question_table, attempt_id) include (user_id, selected_answer, ranking_first) where selected_answer is not null;
create index if not exists idx_user_essays_created_at_user on public.user_essays (created_at, user_id);
create index if not exists idx_flashcard_reviews_ranked on public.flashcard_reviews (reviewed_at, user_id, card_id) where rating <> 'again';
create index if not exists idx_study_sessions_ranked on public.study_sessions (started_at, user_id) include (study_date, active_seconds);
create index if not exists idx_official_questions_public_summary on public.official_exam_questions (content_status, official_answer) include (legal_review_required);
create index if not exists idx_curated_questions_public_summary on public.curated_question_catalog (content_status, official_answer);
create index if not exists idx_board_questions_public_summary on public.board_exam_questions (content_status, official_answer) include (legal_review_required);
commit;
