-- Persist each student's PC-AC study-plan preferences per account and cargo.
-- RLS prevents a student from reading or changing another account's preferences.
create table if not exists public.user_study_plan_configs (
  user_id uuid not null references auth.users(id) on delete cascade,
  cargo_id text not null,
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint user_study_plan_configs_pkey primary key (user_id, cargo_id),
  constraint user_study_plan_configs_cargo_id_check check (cargo_id ~ '^[a-z0-9_-]{1,80}$')
);

alter table public.user_study_plan_configs enable row level security;

drop policy if exists "Users can read their own study plan config" on public.user_study_plan_configs;
create policy "Users can read their own study plan config"
  on public.user_study_plan_configs for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own study plan config" on public.user_study_plan_configs;
create policy "Users can insert their own study plan config"
  on public.user_study_plan_configs for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own study plan config" on public.user_study_plan_configs;
create policy "Users can update their own study plan config"
  on public.user_study_plan_configs for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update on public.user_study_plan_configs to authenticated;
