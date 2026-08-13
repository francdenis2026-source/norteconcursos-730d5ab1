-- Norte Concurso — fundação transacional da Fase 2
-- Esta migration é aditiva, não contém senhas e pode ser aplicada pelo Supabase CLI.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.normalize_cpf(value text)
returns text
language sql
immutable
strict
set search_path = ''
as $$ select regexp_replace(value, '[^0-9]', '', 'g') $$;

create or replace function public.is_valid_cpf(value text)
returns boolean
language plpgsql
immutable
set search_path = ''
as $$
declare
  cpf text := public.normalize_cpf(coalesce(value, ''));
  total integer;
  digit integer;
  i integer;
begin
  if length(cpf) <> 11 or cpf = repeat(substring(cpf, 1, 1), 11) then return false; end if;
  total := 0;
  for i in 1..9 loop total := total + substring(cpf, i, 1)::integer * (11 - i); end loop;
  digit := (total * 10) % 11;
  if digit = 10 then digit := 0; end if;
  if digit <> substring(cpf, 10, 1)::integer then return false; end if;
  total := 0;
  for i in 1..10 loop total := total + substring(cpf, i, 1)::integer * (12 - i); end loop;
  digit := (total * 10) % 11;
  if digit = 10 then digit := 0; end if;
  return digit = substring(cpf, 11, 1)::integer;
end;
$$;

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code in ('trial', 'essential', 'plus', 'premium')),
  name text not null,
  price_cents integer not null default 0 check (price_cents >= 0),
  trial_days integer not null default 0 check (trial_days >= 0),
  daily_question_limit integer,
  monthly_question_limit integer,
  monthly_ai_limit integer not null default 0,
  monthly_exam_upload_limit integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.plans (code, name, price_cents, trial_days, daily_question_limit, monthly_question_limit, monthly_ai_limit, monthly_exam_upload_limit)
values
  ('trial', 'Teste Gratuito', 0, 15, 10, null, 10, 1),
  ('essential', 'Essencial', 1990, 0, null, 500, 0, 0),
  ('plus', 'Plus', 3990, 0, null, null, 150, 10),
  ('premium', 'Premium', 6990, 0, null, null, 500, 30)
on conflict (code) do update set
  name = excluded.name,
  price_cents = excluded.price_cents,
  trial_days = excluded.trial_days,
  daily_question_limit = excluded.daily_question_limit,
  monthly_question_limit = excluded.monthly_question_limit,
  monthly_ai_limit = excluded.monthly_ai_limit,
  monthly_exam_upload_limit = excluded.monthly_exam_upload_limit;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 3 and 160),
  cpf text unique check (cpf is null or public.is_valid_cpf(cpf)),
  cpf_last4 text generated always as (right(cpf, 4)) stored,
  phone text,
  avatar_url text,
  focused_contest_id uuid,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'editor', 'reviewer', 'support', 'student')),
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create or replace function public.has_role(required_role text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid()
      and (role = required_role or role in ('owner', 'admin'))
  )
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  supplied_cpf text := nullif(public.normalize_cpf(coalesce(new.raw_user_meta_data ->> 'cpf', '')), '');
begin
  if supplied_cpf is not null and not public.is_valid_cpf(supplied_cpf) then
    raise exception 'CPF inválido';
  end if;
  insert into public.profiles (id, full_name, cpf)
  values (new.id, coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'Novo aluno'), supplied_cpf);
  insert into public.user_roles (user_id, role) values (new.id, 'student') on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  postal_code text not null,
  street text not null,
  number text not null,
  complement text,
  district text not null,
  city text not null,
  state char(2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.segments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.careers (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid references public.segments(id) on delete set null,
  name text not null,
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  acronym text,
  scope text check (scope in ('federal', 'state', 'municipal')),
  state char(2),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (name, state)
);

create table if not exists public.exam_boards (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  acronym text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.contests (
  id uuid primary key default gen_random_uuid(),
  career_id uuid references public.careers(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  exam_board_id uuid references public.exam_boards(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  education_level text check (education_level in ('fundamental', 'middle', 'higher', 'various')),
  scope text check (scope in ('federal', 'state', 'municipal')),
  state char(2),
  city text,
  status text not null default 'expected' check (status in ('expected', 'requested', 'authorized', 'board_defined', 'notice_published', 'registration_open', 'registration_closed', 'exam_scheduled', 'in_progress', 'finished', 'suspended')),
  vacancies integer check (vacancies is null or vacancies >= 0),
  salary_cents integer check (salary_cents is null or salary_cents >= 0),
  exam_date date,
  exam_date_is_estimated boolean not null default false,
  official_url text,
  source_url text,
  source_updated_at timestamptz,
  cover_url text,
  is_published boolean not null default false,
  is_demo boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles drop constraint if exists profiles_focused_contest_id_fkey;
alter table public.profiles add constraint profiles_focused_contest_id_fkey
  foreign key (focused_contest_id) references public.contests(id) on delete set null;

create table if not exists public.positions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  name text not null,
  education_level text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (organization_id, name)
);

create table if not exists public.contest_positions (
  contest_id uuid not null references public.contests(id) on delete cascade,
  position_id uuid not null references public.positions(id) on delete cascade,
  vacancies integer,
  salary_cents integer,
  primary key (contest_id, position_id)
);

create table if not exists public.disciplines (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  discipline_id uuid not null references public.disciplines(id) on delete cascade,
  parent_id uuid references public.subjects(id) on delete cascade,
  name text not null,
  position integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (discipline_id, parent_id, name)
);

create table if not exists public.contest_syllabus_items (
  id uuid primary key default gen_random_uuid(),
  contest_id uuid not null references public.contests(id) on delete cascade,
  discipline_id uuid not null references public.disciplines(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete cascade,
  weight numeric(8,3) not null default 1 check (weight > 0),
  priority smallint not null default 3 check (priority between 1 and 5),
  estimated_incidence numeric(5,2) check (estimated_incidence between 0 and 100),
  expected_questions integer check (expected_questions is null or expected_questions >= 0),
  position integer not null default 0,
  notes text,
  unique (contest_id, discipline_id, subject_id)
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  contest_id uuid references public.contests(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  exam_board_id uuid references public.exam_boards(id) on delete set null,
  discipline_id uuid not null references public.disciplines(id),
  subject_id uuid references public.subjects(id),
  statement text not null,
  supporting_text text,
  image_url text,
  question_type text not null check (question_type in ('multiple_choice', 'true_false')),
  explanation text,
  difficulty text not null default 'medium' check (difficulty in ('easy', 'medium', 'hard')),
  year integer check (year is null or year between 1980 and 2200),
  source text,
  source_license text,
  status text not null default 'draft' check (status in ('draft', 'review_pending', 'published', 'outdated', 'annulled', 'archived')),
  is_ai_generated boolean not null default false,
  is_demo boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  reviewed_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  label text not null,
  option_text text not null,
  position integer not null,
  unique (question_id, label),
  unique (question_id, position)
);

create table if not exists public.question_answer_keys (
  question_id uuid primary key references public.questions(id) on delete cascade,
  correct_option_id uuid references public.question_options(id) on delete cascade,
  boolean_answer boolean,
  constraint answer_key_exactly_one check (
    (correct_option_id is not null and boolean_answer is null)
    or (correct_option_id is null and boolean_answer is not null)
  )
);

create table if not exists public.user_contests (
  user_id uuid not null references auth.users(id) on delete cascade,
  contest_id uuid not null references public.contests(id) on delete cascade,
  is_primary boolean not null default false,
  study_started_on date,
  weekly_goal_minutes integer not null default 600 check (weekly_goal_minutes between 30 and 10080),
  created_at timestamptz not null default now(),
  primary key (user_id, contest_id)
);

create unique index if not exists one_primary_contest_per_user on public.user_contests(user_id) where is_primary;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid not null references public.plans(id),
  status text not null check (status in ('trialing', 'active', 'past_due', 'canceled', 'expired')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists one_current_subscription_per_user
  on public.subscriptions(user_id) where status in ('trialing', 'active', 'past_due');

create table if not exists public.user_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  selected_option_id uuid references public.question_options(id) on delete restrict,
  boolean_answer boolean,
  is_correct boolean not null,
  time_spent_seconds integer not null default 0 check (time_spent_seconds between 0 and 86400),
  answered_at timestamptz not null default now()
);

create index if not exists user_answers_user_date_idx on public.user_answers(user_id, answered_at desc);
create index if not exists user_answers_question_idx on public.user_answers(question_id);

create table if not exists public.notebooks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contest_id uuid references public.contests(id) on delete set null,
  name text not null check (char_length(name) between 2 and 100),
  description text,
  status text not null default 'active' check (status in ('active', 'archived')),
  is_automatic boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notebook_questions (
  notebook_id uuid not null references public.notebooks(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (notebook_id, question_id)
);

create table if not exists public.error_notebook_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  error_count integer not null default 1,
  later_correct_count integer not null default 0,
  status text not null default 'new' check (status in ('new', 'review', 'learning', 'improving', 'mastered')),
  note text,
  next_review_at timestamptz,
  first_error_at timestamptz not null default now(),
  last_error_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table if not exists public.mock_exams (
  id uuid primary key default gen_random_uuid(),
  contest_id uuid references public.contests(id) on delete set null,
  owner_user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  duration_minutes integer check (duration_minutes is null or duration_minutes > 0),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_official boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mock_exam_questions (
  mock_exam_id uuid not null references public.mock_exams(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  position integer not null,
  weight numeric(8,3) not null default 1 check (weight > 0),
  primary key (mock_exam_id, question_id),
  unique (mock_exam_id, position)
);

create table if not exists public.mock_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  mock_exam_id uuid not null references public.mock_exams(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'in_progress' check (status in ('in_progress', 'submitted', 'expired')),
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  score numeric(10,3),
  correct_count integer,
  wrong_count integer,
  blank_count integer,
  unique (id, user_id)
);

create table if not exists public.mock_exam_answers (
  attempt_id uuid not null references public.mock_exam_attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  selected_option_id uuid references public.question_options(id),
  boolean_answer boolean,
  marked_for_review boolean not null default false,
  saved_at timestamptz not null default now(),
  primary key (attempt_id, question_id)
);

create table if not exists public.study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contest_id uuid not null references public.contests(id) on delete cascade,
  title text not null,
  status text not null default 'active' check (status in ('draft', 'active', 'paused', 'completed', 'archived')),
  starts_on date not null,
  exam_date date,
  weekly_goal_minutes integer not null check (weekly_goal_minutes > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.study_plan_items (
  id uuid primary key default gen_random_uuid(),
  study_plan_id uuid not null references public.study_plans(id) on delete cascade,
  discipline_id uuid not null references public.disciplines(id),
  subject_id uuid references public.subjects(id),
  activity_type text not null check (activity_type in ('theory', 'questions', 'review', 'error_notebook', 'essay', 'mock_exam', 'flashcards')),
  scheduled_at timestamptz not null,
  duration_minutes integer not null check (duration_minutes > 0),
  goal text,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'postponed', 'ignored', 'overdue')),
  completed_at timestamptz,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_item_id uuid references public.study_plan_items(id) on delete set null,
  discipline_id uuid references public.disciplines(id),
  subject_id uuid references public.subjects(id),
  activity_type text not null,
  started_at timestamptz not null,
  ended_at timestamptz,
  effective_seconds integer not null default 0 check (effective_seconds >= 0),
  note text,
  created_at timestamptz not null default now()
);

create unique index if not exists one_active_study_session_per_user
  on public.study_sessions(user_id) where ended_at is null;

create table if not exists public.review_schedules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  discipline_id uuid references public.disciplines(id),
  subject_id uuid references public.subjects(id),
  question_id uuid references public.questions(id) on delete cascade,
  source_type text not null check (source_type in ('content', 'wrong_answer', 'mock_exam', 'study_plan', 'manual')),
  scheduled_for timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'completed', 'canceled')),
  recall_rating text check (recall_rating in ('forgot', 'hard', 'good', 'mastered')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_question_notes (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  note text not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table if not exists public.favorite_questions (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.answer_question(
  p_question_id uuid,
  p_selected_option_id uuid default null,
  p_boolean_answer boolean default null,
  p_time_spent_seconds integer default 0
)
returns table(answer_id uuid, is_correct boolean, explanation text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_question public.questions%rowtype;
  v_key public.question_answer_keys%rowtype;
  v_is_correct boolean;
  v_answer_id uuid;
  v_daily_limit integer;
  v_monthly_limit integer;
begin
  if v_user_id is null then raise exception 'Autenticação obrigatória'; end if;
  select * into v_question from public.questions where id = p_question_id and status = 'published';
  if not found then raise exception 'Questão indisponível'; end if;

  select p.daily_question_limit, p.monthly_question_limit
    into v_daily_limit, v_monthly_limit
  from public.subscriptions s join public.plans p on p.id = s.plan_id
  where s.user_id = v_user_id and s.status in ('trialing', 'active')
  order by s.created_at desc limit 1;

  if v_daily_limit is not null and (
    select count(*) from public.user_answers where user_id = v_user_id and answered_at >= date_trunc('day', now())
  ) >= v_daily_limit then raise exception 'Limite diário de questões atingido'; end if;

  if v_monthly_limit is not null and (
    select count(*) from public.user_answers where user_id = v_user_id and answered_at >= date_trunc('month', now())
  ) >= v_monthly_limit then raise exception 'Limite mensal de questões atingido'; end if;

  select * into strict v_key from public.question_answer_keys where question_id = p_question_id;
  if v_question.question_type = 'multiple_choice' then
    if p_selected_option_id is null then raise exception 'Selecione uma alternativa'; end if;
    if not exists (select 1 from public.question_options where id = p_selected_option_id and question_id = p_question_id) then
      raise exception 'Alternativa inválida';
    end if;
    v_is_correct := p_selected_option_id = v_key.correct_option_id;
  else
    if p_boolean_answer is null then raise exception 'Informe certo ou errado'; end if;
    v_is_correct := p_boolean_answer = v_key.boolean_answer;
  end if;

  insert into public.user_answers (user_id, question_id, selected_option_id, boolean_answer, is_correct, time_spent_seconds)
  values (v_user_id, p_question_id, p_selected_option_id, p_boolean_answer, v_is_correct, greatest(0, least(p_time_spent_seconds, 86400)))
  returning id into v_answer_id;

  if not v_is_correct then
    insert into public.error_notebook_items (user_id, question_id, next_review_at)
    values (v_user_id, p_question_id, now() + interval '1 day')
    on conflict (user_id, question_id) do update set
      error_count = public.error_notebook_items.error_count + 1,
      status = 'review',
      last_error_at = now(),
      next_review_at = now() + interval '1 day',
      updated_at = now();
  else
    update public.error_notebook_items set
      later_correct_count = later_correct_count + 1,
      status = case when later_correct_count + 1 >= 2 then 'improving' else status end,
      updated_at = now()
    where user_id = v_user_id and question_id = p_question_id;
  end if;

  return query select v_answer_id, v_is_correct, v_question.explanation;
end;
$$;

create or replace function public.set_primary_contest(p_contest_id uuid, p_weekly_goal_minutes integer default 600)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then raise exception 'Autenticação obrigatória'; end if;
  if not exists (select 1 from public.contests where id = p_contest_id and is_published) then
    raise exception 'Concurso indisponível';
  end if;
  update public.user_contests set is_primary = false where user_id = auth.uid() and is_primary;
  insert into public.user_contests (user_id, contest_id, is_primary, weekly_goal_minutes)
  values (auth.uid(), p_contest_id, true, greatest(30, least(p_weekly_goal_minutes, 10080)))
  on conflict (user_id, contest_id) do update set is_primary = true, weekly_goal_minutes = excluded.weekly_goal_minutes;
  update public.profiles set focused_contest_id = p_contest_id, updated_at = now() where id = auth.uid();
end;
$$;

create or replace function public.start_mock_exam(p_mock_exam_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_attempt_id uuid;
begin
  if auth.uid() is null then raise exception 'Autenticação obrigatória'; end if;
  if not exists (
    select 1 from public.mock_exams
    where id = p_mock_exam_id and (status = 'published' or owner_user_id = auth.uid())
  ) then raise exception 'Simulado indisponível'; end if;

  select id into v_attempt_id from public.mock_exam_attempts
  where mock_exam_id = p_mock_exam_id and user_id = auth.uid() and status = 'in_progress'
  order by started_at desc limit 1;
  if v_attempt_id is not null then return v_attempt_id; end if;

  insert into public.mock_exam_attempts (mock_exam_id, user_id)
  values (p_mock_exam_id, auth.uid()) returning id into v_attempt_id;
  return v_attempt_id;
end;
$$;

create or replace function public.save_mock_answer(
  p_attempt_id uuid,
  p_question_id uuid,
  p_selected_option_id uuid default null,
  p_boolean_answer boolean default null,
  p_marked_for_review boolean default false
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare v_mock_exam_id uuid;
begin
  select mock_exam_id into v_mock_exam_id from public.mock_exam_attempts
  where id = p_attempt_id and user_id = auth.uid() and status = 'in_progress';
  if v_mock_exam_id is null then raise exception 'Tentativa indisponível'; end if;
  if not exists (
    select 1 from public.mock_exam_questions
    where mock_exam_id = v_mock_exam_id and question_id = p_question_id
  ) then raise exception 'Questão não pertence ao simulado'; end if;
  if p_selected_option_id is not null and not exists (
    select 1 from public.question_options
    where id = p_selected_option_id and question_id = p_question_id
  ) then raise exception 'Alternativa inválida'; end if;

  insert into public.mock_exam_answers (attempt_id, question_id, selected_option_id, boolean_answer, marked_for_review)
  values (p_attempt_id, p_question_id, p_selected_option_id, p_boolean_answer, p_marked_for_review)
  on conflict (attempt_id, question_id) do update set
    selected_option_id = excluded.selected_option_id,
    boolean_answer = excluded.boolean_answer,
    marked_for_review = excluded.marked_for_review,
    saved_at = now();
end;
$$;

create or replace function public.finish_mock_exam(p_attempt_id uuid)
returns table(score numeric, correct_count integer, wrong_count integer, blank_count integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_mock_exam_id uuid;
  v_total numeric;
  v_correct integer;
  v_wrong integer;
  v_blank integer;
  v_score numeric;
begin
  select mock_exam_id into v_mock_exam_id from public.mock_exam_attempts
  where id = p_attempt_id and user_id = auth.uid() and status = 'in_progress'
  for update;
  if v_mock_exam_id is null then raise exception 'Tentativa já finalizada ou indisponível'; end if;

  select
    count(*),
    count(*) filter (where a.question_id is null or (a.selected_option_id is null and a.boolean_answer is null)),
    count(*) filter (where a.question_id is not null and (
      a.selected_option_id = k.correct_option_id
      or (a.selected_option_id is null and a.boolean_answer is not distinct from k.boolean_answer)
    )),
    count(*) filter (where a.question_id is not null
      and (a.selected_option_id is not null or a.boolean_answer is not null)
      and not (
        a.selected_option_id = k.correct_option_id
        or (a.selected_option_id is null and a.boolean_answer is not distinct from k.boolean_answer)
      ))
  into v_total, v_blank, v_correct, v_wrong
  from public.mock_exam_questions mq
  left join public.mock_exam_answers a on a.attempt_id = p_attempt_id and a.question_id = mq.question_id
  join public.question_answer_keys k on k.question_id = mq.question_id
  where mq.mock_exam_id = v_mock_exam_id;

  v_score := case when v_total > 0 then round((v_correct::numeric / v_total) * 100, 3) else 0 end;
  update public.mock_exam_attempts set
    status = 'submitted', submitted_at = now(), score = v_score,
    correct_count = v_correct, wrong_count = v_wrong, blank_count = v_blank
  where id = p_attempt_id;
  return query select v_score, v_correct, v_wrong, v_blank;
end;
$$;

create or replace view public.published_question_options
with (security_barrier = true)
as
select qo.id, qo.question_id, qo.label, qo.option_text, qo.position
from public.question_options qo
join public.questions q on q.id = qo.question_id
where q.status = 'published';

-- Índices dos filtros mais utilizados.
create index if not exists contests_catalog_idx on public.contests(is_published, status, state, career_id);
create index if not exists questions_filter_idx on public.questions(status, discipline_id, subject_id, difficulty, exam_board_id, year);
create index if not exists study_items_schedule_idx on public.study_plan_items(study_plan_id, scheduled_at, status);
create index if not exists reviews_user_schedule_idx on public.review_schedules(user_id, status, scheduled_for);

-- updated_at
do $$
declare table_name text;
begin
  foreach table_name in array array['plans','profiles','addresses','careers','contests','disciplines','subjects','questions','notebooks','mock_exams','subscriptions','study_plans','study_plan_items','review_schedules']
  loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format('create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end $$;

-- RLS em todas as tabelas expostas.
alter table public.plans enable row level security;
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.addresses enable row level security;
alter table public.segments enable row level security;
alter table public.careers enable row level security;
alter table public.organizations enable row level security;
alter table public.exam_boards enable row level security;
alter table public.contests enable row level security;
alter table public.positions enable row level security;
alter table public.contest_positions enable row level security;
alter table public.disciplines enable row level security;
alter table public.subjects enable row level security;
alter table public.contest_syllabus_items enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.question_answer_keys enable row level security;
alter table public.user_contests enable row level security;
alter table public.subscriptions enable row level security;
alter table public.user_answers enable row level security;
alter table public.notebooks enable row level security;
alter table public.notebook_questions enable row level security;
alter table public.error_notebook_items enable row level security;
alter table public.mock_exams enable row level security;
alter table public.mock_exam_questions enable row level security;
alter table public.mock_exam_attempts enable row level security;
alter table public.mock_exam_answers enable row level security;
alter table public.study_plans enable row level security;
alter table public.study_plan_items enable row level security;
alter table public.study_sessions enable row level security;
alter table public.review_schedules enable row level security;
alter table public.user_question_notes enable row level security;
alter table public.favorite_questions enable row level security;
alter table public.audit_logs enable row level security;

-- Catálogo: leitura publicada; gestão apenas por equipe autorizada.
create policy plans_read on public.plans for select using (is_active or public.has_role('admin'));
create policy catalog_segments_read on public.segments for select using (is_active or public.has_role('editor'));
create policy catalog_careers_read on public.careers for select using (is_active or public.has_role('editor'));
create policy catalog_organizations_read on public.organizations for select using (is_active or public.has_role('editor'));
create policy catalog_boards_read on public.exam_boards for select using (is_active or public.has_role('editor'));
create policy contests_read on public.contests for select using (is_published or public.has_role('editor'));
create policy positions_read on public.positions for select using (is_active or public.has_role('editor'));
create policy contest_positions_read on public.contest_positions for select using (exists (select 1 from public.contests c where c.id = contest_id and (c.is_published or public.has_role('editor'))));
create policy disciplines_read on public.disciplines for select using (is_active or public.has_role('editor'));
create policy subjects_read on public.subjects for select using (is_active or public.has_role('editor'));
create policy syllabus_read on public.contest_syllabus_items for select using (exists (select 1 from public.contests c where c.id = contest_id and (c.is_published or public.has_role('editor'))));
create policy questions_read on public.questions for select using (status = 'published' or public.has_role('editor') or public.has_role('reviewer'));
create policy options_read_staff on public.question_options for select using (public.has_role('editor') or public.has_role('reviewer'));
create policy answer_keys_staff_only on public.question_answer_keys for all using (public.has_role('editor') or public.has_role('reviewer')) with check (public.has_role('editor') or public.has_role('reviewer'));

create policy catalog_staff_segments on public.segments for all using (public.has_role('editor')) with check (public.has_role('editor'));
create policy catalog_staff_careers on public.careers for all using (public.has_role('editor')) with check (public.has_role('editor'));
create policy catalog_staff_orgs on public.organizations for all using (public.has_role('editor')) with check (public.has_role('editor'));
create policy catalog_staff_boards on public.exam_boards for all using (public.has_role('editor')) with check (public.has_role('editor'));
create policy catalog_staff_contests on public.contests for all using (public.has_role('editor')) with check (public.has_role('editor'));
create policy catalog_staff_positions on public.positions for all using (public.has_role('editor')) with check (public.has_role('editor'));
create policy catalog_staff_contest_positions on public.contest_positions for all using (public.has_role('editor')) with check (public.has_role('editor'));
create policy catalog_staff_disciplines on public.disciplines for all using (public.has_role('editor')) with check (public.has_role('editor'));
create policy catalog_staff_subjects on public.subjects for all using (public.has_role('editor')) with check (public.has_role('editor'));
create policy catalog_staff_syllabus on public.contest_syllabus_items for all using (public.has_role('editor')) with check (public.has_role('editor'));
create policy catalog_staff_questions on public.questions for all using (public.has_role('editor') or public.has_role('reviewer')) with check (public.has_role('editor') or public.has_role('reviewer'));
create policy catalog_staff_options on public.question_options for all using (public.has_role('editor') or public.has_role('reviewer')) with check (public.has_role('editor') or public.has_role('reviewer'));

-- Dados privados do aluno.
create policy profile_self_read on public.profiles for select using (id = auth.uid() or public.has_role('support'));
create policy profile_self_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy roles_self_read on public.user_roles for select using (user_id = auth.uid() or public.has_role('admin'));
create policy roles_admin_manage on public.user_roles for all using (public.has_role('admin')) with check (public.has_role('admin'));
create policy addresses_owner on public.addresses for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy user_contests_owner on public.user_contests for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy subscriptions_owner_read on public.subscriptions for select using (user_id = auth.uid() or public.has_role('support'));
create policy answers_owner_read on public.user_answers for select using (user_id = auth.uid());
create policy notebooks_owner on public.notebooks for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy notebook_questions_owner on public.notebook_questions for all
  using (exists (select 1 from public.notebooks n where n.id = notebook_id and n.user_id = auth.uid()))
  with check (exists (select 1 from public.notebooks n where n.id = notebook_id and n.user_id = auth.uid()));
create policy errors_owner on public.error_notebook_items for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy mock_exams_read on public.mock_exams for select using (status = 'published' or owner_user_id = auth.uid() or public.has_role('editor'));
create policy mock_exams_owner on public.mock_exams for all using (owner_user_id = auth.uid() or public.has_role('editor')) with check (owner_user_id = auth.uid() or public.has_role('editor'));
create policy mock_questions_read on public.mock_exam_questions for select using (exists (select 1 from public.mock_exams m where m.id = mock_exam_id and (m.status = 'published' or m.owner_user_id = auth.uid() or public.has_role('editor'))));
create policy attempts_owner_read on public.mock_exam_attempts for select using (user_id = auth.uid());
create policy attempt_answers_owner_read on public.mock_exam_answers for select
  using (exists (select 1 from public.mock_exam_attempts a where a.id = attempt_id and a.user_id = auth.uid()));
create policy study_plans_owner on public.study_plans for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy study_items_owner on public.study_plan_items for all
  using (exists (select 1 from public.study_plans p where p.id = study_plan_id and p.user_id = auth.uid()))
  with check (exists (select 1 from public.study_plans p where p.id = study_plan_id and p.user_id = auth.uid()));
create policy study_sessions_owner on public.study_sessions for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy reviews_owner on public.review_schedules for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy notes_owner on public.user_question_notes for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy favorites_owner on public.favorite_questions for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy audit_admin_read on public.audit_logs for select using (public.has_role('admin'));

-- Privilégios: alunos não podem inserir respostas nem ler gabaritos diretamente.
revoke all on public.question_answer_keys from anon, authenticated;
revoke insert, update, delete on public.user_answers from anon, authenticated;
revoke insert, update, delete on public.mock_exam_attempts from anon, authenticated;
revoke insert, update, delete on public.mock_exam_answers from anon, authenticated;
grant select on public.published_question_options to anon, authenticated;
grant execute on function public.answer_question(uuid, uuid, boolean, integer) to authenticated;
grant execute on function public.set_primary_contest(uuid, integer) to authenticated;
grant execute on function public.start_mock_exam(uuid) to authenticated;
grant execute on function public.save_mock_answer(uuid, uuid, uuid, boolean, boolean) to authenticated;
grant execute on function public.finish_mock_exam(uuid) to authenticated;

-- Usuários que já existiam antes desta migration também recebem perfil e papel de aluno.
insert into public.profiles (id, full_name, cpf)
select
  u.id,
  coalesce(nullif(trim(u.raw_user_meta_data ->> 'full_name'), ''), split_part(coalesce(u.email, 'Aluno'), '@', 1)),
  case
    when public.is_valid_cpf(u.raw_user_meta_data ->> 'cpf') then public.normalize_cpf(u.raw_user_meta_data ->> 'cpf')
    else null
  end
from auth.users u
on conflict (id) do nothing;

insert into public.user_roles (user_id, role)
select id, 'student' from auth.users
on conflict do nothing;

-- Assinatura de teste criada automaticamente para novos usuários.
create or replace function public.create_trial_subscription()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare trial_plan_id uuid;
begin
  select id into trial_plan_id from public.plans where code = 'trial';
  insert into public.subscriptions (user_id, plan_id, status, ends_at)
  values (new.id, trial_plan_id, 'trialing', now() + interval '15 days');
  return new;
end;
$$;

drop trigger if exists on_profile_created_trial on public.profiles;
create trigger on_profile_created_trial after insert on public.profiles
for each row execute function public.create_trial_subscription();

insert into public.subscriptions (user_id, plan_id, status, ends_at)
select p.id, plans.id, 'trialing', now() + interval '15 days'
from public.profiles p
cross join public.plans plans
where plans.code = 'trial'
  and not exists (
    select 1 from public.subscriptions s
    where s.user_id = p.id and s.status in ('trialing', 'active', 'past_due')
  );
