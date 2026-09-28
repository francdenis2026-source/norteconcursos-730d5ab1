-- Training is intentionally separate from ranked simulator attempts.
create table if not exists public.question_training_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null,
  question_source text not null check (question_source in ('official','curated','personal')),
  contest_name text not null,
  subject text not null,
  selected_answer text not null check (selected_answer in ('A','B','C','D','E')),
  official_answer text not null check (official_answer in ('A','B','C','D','E')),
  is_correct boolean not null,
  asked_for_help boolean not null default false,
  response_seconds integer not null default 0 check (response_seconds >= 0),
  created_at timestamptz not null default now()
);

alter table public.question_training_responses enable row level security;

drop policy if exists "Users manage own training responses" on public.question_training_responses;
create policy "Users manage own training responses"
  on public.question_training_responses for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Admins read training responses" on public.question_training_responses;
create policy "Admins read training responses"
  on public.question_training_responses for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_training_responses_user_created
  on public.question_training_responses(user_id, created_at desc);
create index if not exists idx_training_responses_user_subject
  on public.question_training_responses(user_id, subject);

comment on table public.question_training_responses is
  'Immediate-feedback training history; it never affects simulator ranking.';
