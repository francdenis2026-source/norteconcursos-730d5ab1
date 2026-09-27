-- Root-cause fix for the DEPEN 2021 question bank disappearing (found during
-- an audit of the candidate's panel). official_exam_questions only had
-- unique(exam_year, item_number) — with no contest_name/career_name in the
-- key, any two contests sharing an exam_year and overlapping item_number
-- range collide. Every "on conflict (exam_year,item_number) do update"
-- import for a NEW contest silently overwrote another contest's existing
-- rows sharing that same year (their contest_name/career_name stayed as
-- whichever contest inserted first, but question_text/official_answer got
-- clobbered by whichever import ran last). This is why DEPEN 2021 (exam_year
-- 2021, items 1-120) vanished: Polícia Federal 2021 already occupied that
-- exact (exam_year, item_number) key range.
alter table public.official_exam_questions
  drop constraint if exists official_exam_questions_exam_year_item_number_key;

alter table public.official_exam_questions
  add constraint official_exam_questions_contest_year_item_key
  unique (contest_name, exam_year, item_number);
