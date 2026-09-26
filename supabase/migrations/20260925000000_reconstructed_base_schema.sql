-- Reconstructed base schema for Norte Concurso
-- NOTE: the original 20260813000000_norte_concurso_schema.sql and
-- 20260813000003_gamification_and_media.sql files were empty in the
-- repository (the real schema was never committed to git). This migration
-- rebuilds the schema by inferring table/column names from the front-end
-- code (src/types, src/services/mockService.ts, src/services/adminService.ts,
-- src/hooks/useDashboard.ts, src/routes/api/public/stripe-webhook.ts).

-- ============ Types ============

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('admin', 'moderator', 'user');
  end if;
end $$;

-- ============ profiles ============

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  subscription_tier text not null default 'free', -- 'free' | 'essential' | 'plus' | 'premium'
  subscription_expires_at timestamptz,
  onboarding_completed boolean not null default false,
  onboarding_progress jsonb not null default '{}'::jsonb,
  onboarding_steps jsonb default '{"contest": false, "notebook": false, "plan": false}'::jsonb,
  onboarding_done boolean default false,
  activation_code text,
  activation_attempts integer default 0,
  activation_expires_at timestamptz,
  is_activated boolean not null default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- Note: "Users can update own profile" policy is created by
-- 20260813000001_onboarding_and_tiers.sql, kept there to match original history.

create policy "Service role full access to profiles"
  on public.profiles for all
  to service_role
  using (true) with check (true);

-- ============ user_roles ============

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create policy "Users can view own role"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Service role full access to user_roles"
  on public.user_roles for all
  to service_role
  using (true) with check (true);

-- Helper: has_role() used by RLS policies below
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Admins can manage all roles"
  on public.user_roles for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can view all profiles"
  on public.profiles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update all profiles"
  on public.profiles for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- ============ Auto-create profile + default role on signup ============

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email)
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ contests ============

create table if not exists public.contests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  agency text,
  career text, -- 'Policial' | 'Administrativa' | 'Tribunal' | 'Fiscal' | 'Bancária' | 'Saúde' | 'Educação'
  role text,
  exam_board text,
  education_level text, -- 'Médio' | 'Superior'
  location text,
  status text not null default 'Previsto', -- ContestStatus
  vacancies integer default 0,
  salary numeric default 0,
  exam_date date,
  start_date date,
  end_date date,
  is_demo boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.contests enable row level security;

create policy "Anyone can view contests"
  on public.contests for select
  using (true);

create policy "Admins can manage contests"
  on public.contests for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ disciplines / subjects ============

create table if not exists public.disciplines (
  id uuid primary key default gen_random_uuid(),
  name text not null
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  discipline_id uuid references public.disciplines(id) on delete cascade,
  parent_id uuid references public.subjects(id) on delete set null
);

alter table public.disciplines enable row level security;
alter table public.subjects enable row level security;

create policy "Anyone can view disciplines" on public.disciplines for select using (true);
create policy "Anyone can view subjects" on public.subjects for select using (true);

create policy "Admins can manage disciplines"
  on public.disciplines for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can manage subjects"
  on public.subjects for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ questions ============

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  type text not null, -- 'Múltipla Escolha' | 'Certo ou Errado'
  options jsonb, -- [{id, text, isCorrect}]
  correct_answer boolean,
  explanation text,
  teacher_comment text,
  theory_links jsonb default '[]'::jsonb, -- [{title, url}]
  media jsonb default '[]'::jsonb, -- [{id, file_path, media_type, label}]
  discipline_id uuid references public.disciplines(id) on delete set null,
  subject_id uuid references public.subjects(id) on delete set null,
  difficulty text default 'Média', -- 'Fácil' | 'Média' | 'Difícil'
  is_demo boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.questions enable row level security;

create policy "Anyone can view questions"
  on public.questions for select
  using (true);

create policy "Admins can manage questions"
  on public.questions for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ user_responses ============

create table if not exists public.user_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid references public.questions(id) on delete cascade,
  selected_option_id text,
  is_correct boolean,
  time_spent integer default 0,
  created_at timestamptz not null default now()
);

alter table public.user_responses enable row level security;

create policy "Users can view own responses"
  on public.user_responses for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own responses"
  on public.user_responses for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Admins can view all responses"
  on public.user_responses for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- ============ mock_exam_results ============

create table if not exists public.mock_exam_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exam_id text,
  total_questions integer default 0,
  correct_answers integer default 0,
  duration_seconds integer default 0,
  finished_at timestamptz default now(),
  created_at timestamptz not null default now()
);

alter table public.mock_exam_results enable row level security;

create policy "Users can view own mock exam results"
  on public.mock_exam_results for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own mock exam results"
  on public.mock_exam_results for insert to authenticated
  with check (auth.uid() = user_id);

-- Needed so the ranking query can join profiles.full_name for any user_id
create policy "Anyone authenticated can view mock exam results for ranking"
  on public.mock_exam_results for select to authenticated
  using (true);

-- ============ achievements / user_achievements ============

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  icon_url text
);

create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  attained_at timestamptz not null default now(),
  unique (user_id, achievement_id)
);

alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;

create policy "Anyone can view achievements" on public.achievements for select using (true);

create policy "Users can view own achievements"
  on public.user_achievements for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own achievements"
  on public.user_achievements for insert to authenticated
  with check (auth.uid() = user_id);

-- ============ user_streaks ============

create table if not exists public.user_streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_activity_date date,
  updated_at timestamptz not null default now()
);

alter table public.user_streaks enable row level security;

create policy "Users can view own streak"
  on public.user_streaks for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can update own streak"
  on public.user_streaks for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============ subscription_plans ============

create table if not exists public.subscription_plans (
  id text primary key, -- 'free' | 'essential' | 'plus' | 'premium'
  name text not null,
  price numeric default 0,
  features jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscription_plans enable row level security;

create policy "Anyone can view subscription plans"
  on public.subscription_plans for select using (true);

create policy "Admins can manage subscription plans"
  on public.subscription_plans for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- ============ subscription_audit_logs ============

create table if not exists public.subscription_audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null, -- 'activation' | 'upgrade' | 'downgrade' | 'cancellation' | 'trial_start'
  old_tier text,
  new_tier text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.subscription_audit_logs enable row level security;

create policy "Users can view own subscription audit logs"
  on public.subscription_audit_logs for select to authenticated
  using (auth.uid() = user_id);

create policy "Admins can view all subscription audit logs"
  on public.subscription_audit_logs for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert subscription audit logs"
  on public.subscription_audit_logs for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ admin_audit_logs ============

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id text,
  old_values jsonb,
  new_values jsonb,
  created_at timestamptz not null default now()
);

alter table public.admin_audit_logs enable row level security;

create policy "Admins can view admin audit logs"
  on public.admin_audit_logs for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert admin audit logs"
  on public.admin_audit_logs for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ comment_audit_logs ============

create table if not exists public.comment_audit_logs (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references public.questions(id) on delete cascade,
  admin_id uuid references auth.users(id) on delete set null,
  old_comment text,
  new_comment text,
  created_at timestamptz not null default now()
);

alter table public.comment_audit_logs enable row level security;

create policy "Admins can view comment audit logs"
  on public.comment_audit_logs for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert comment audit logs"
  on public.comment_audit_logs for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ updated_at triggers ============

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_contests_updated_at on public.contests;
create trigger set_contests_updated_at before update on public.contests
  for each row execute function public.set_updated_at();

drop trigger if exists set_questions_updated_at on public.questions;
create trigger set_questions_updated_at before update on public.questions
  for each row execute function public.set_updated_at();

drop trigger if exists set_subscription_plans_updated_at on public.subscription_plans;
create trigger set_subscription_plans_updated_at before update on public.subscription_plans
  for each row execute function public.set_updated_at();
