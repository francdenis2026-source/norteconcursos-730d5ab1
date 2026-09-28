-- Persistent professional simulator built exclusively from governed active questions.
create table if not exists public.simulator_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  contest_filter text,
  subject_filter text,
  total_questions integer not null check (total_questions > 0),
  correct_answers integer not null default 0,
  wrong_answers integer not null default 0,
  blank_answers integer not null default 0,
  accuracy numeric(5,2) not null default 0 check (accuracy between 0 and 100),
  duration_seconds integer not null default 0,
  time_limit_seconds integer not null,
  finished_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  check (correct_answers + wrong_answers + blank_answers = total_questions)
);

create table if not exists public.simulator_responses (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.simulator_attempts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null,
  question_source text not null check (question_source in ('official','curated')),
  question_order integer not null check (question_order > 0),
  subject text not null,
  selected_answer text check (selected_answer in ('C','E')),
  official_answer text not null check (official_answer in ('C','E')),
  is_correct boolean,
  was_flagged boolean not null default false,
  created_at timestamptz not null default now(),
  unique (attempt_id, question_order)
);

alter table public.simulator_attempts enable row level security;
alter table public.simulator_responses enable row level security;

drop policy if exists "Users manage own simulator attempts" on public.simulator_attempts;
create policy "Users manage own simulator attempts" on public.simulator_attempts
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage own simulator responses" on public.simulator_responses;
create policy "Users manage own simulator responses" on public.simulator_responses
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Admins read simulator attempts" on public.simulator_attempts;
create policy "Admins read simulator attempts" on public.simulator_attempts
  for select to authenticated using (public.has_role(auth.uid(),'admin'));

drop policy if exists "Admins read simulator responses" on public.simulator_responses;
create policy "Admins read simulator responses" on public.simulator_responses
  for select to authenticated using (public.has_role(auth.uid(),'admin'));

create index if not exists idx_simulator_attempts_user_finished
  on public.simulator_attempts(user_id, finished_at desc);
create index if not exists idx_simulator_responses_attempt
  on public.simulator_responses(attempt_id, question_order);

comment on table public.simulator_attempts is
  'Candidate simulator history; questions are selected only from active governed catalogs.';
