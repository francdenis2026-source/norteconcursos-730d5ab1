-- Support the answer patterns used by major Brazilian examination boards.
alter table public.simulator_responses drop constraint if exists simulator_responses_selected_answer_check;
alter table public.simulator_responses drop constraint if exists simulator_responses_official_answer_check;
alter table public.simulator_responses add constraint simulator_responses_selected_answer_check
  check (selected_answer in ('A','B','C','D','E'));
alter table public.simulator_responses add constraint simulator_responses_official_answer_check
  check (official_answer in ('A','B','C','D','E'));
