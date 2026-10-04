-- ============================================================================
-- Norte Concurso — TUDO DE 03/10/2026 EM UM ARQUIVO (cole no SQL Editor do Supabase e rode UMA vez)
-- Pode ser rodado de novo sem estragar nada: todos os comandos são idempotentes.
-- Ordem: login por CPF, ofensiva, trava de planos, medalhas, ficha do aluno, sessões, fotos,
-- ranking, progresso, limite da IA, assistente de estudos, relógio, panorama, cronograma,
-- flashcards e sala de estudo.
-- Pré-requisito: o banco base do projeto (migrations anteriores) já aplicado.
-- ============================================================================

-- ------------------------------------------------------------------
-- 20261003200000_login_email_for_cpf.sql
-- ------------------------------------------------------------------
-- Login por CPF: contas novas usam e-mail real, então o CPF precisa ser resolvido para o e-mail de login.
-- Contas antigas (@norteconcurso.local) continuam funcionando, pois o e-mail vem de auth.users.
create or replace function public.login_email_for_cpf(_cpf text)
returns text
language sql
security definer
stable
set search_path = public, auth
as $$
  select u.email::text
  from public.profiles p
  join auth.users u on u.id = p.id
  where p.cpf = regexp_replace(coalesce(_cpf, ''), '\D', '', 'g')
  limit 1
$$;

revoke all on function public.login_email_for_cpf(text) from public;
grant execute on function public.login_email_for_cpf(text) to anon, authenticated;

-- ------------------------------------------------------------------
-- 20261003210000_real_study_streak_and_user_essays.sql
-- ------------------------------------------------------------------
-- Os valores antigos eram de teste/simulação: a contagem recomeça do zero, mas SÓ na primeira aplicação
-- (se a função já existe, esta migration já rodou e as ofensivas reais não podem ser apagadas).
do $$
begin
  if not exists (
    select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'register_study_visit'
  ) then
    update public.user_streaks set current_streak = 0, longest_streak = 0, last_activity_date = null;
  end if;
end $$;

-- 1) Ofensiva real: conta apenas os dias (fuso do Acre) em que o aluno entrou na plataforma.
create or replace function public.register_study_visit()
returns table (current_streak integer, longest_streak integer, last_activity_date date)
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  today date := public.get_current_acre_date();
  s public.user_streaks%rowtype;
  nxt integer;
begin
  if uid is null then return; end if;
  insert into public.user_streaks (user_id) values (uid) on conflict (user_id) do nothing;
  select * into s from public.user_streaks where user_id = uid for update;
  if s.last_activity_date is distinct from today then
    nxt := case when s.last_activity_date = today - 1 then s.current_streak + 1 else 1 end;
    update public.user_streaks
       set current_streak = nxt,
           longest_streak = greatest(s.longest_streak, nxt),
           last_activity_date = today,
           updated_at = now()
     where user_id = uid;
  end if;
  return query
    select u.current_streak, u.longest_streak, u.last_activity_date
    from public.user_streaks u where u.user_id = uid;
end $$;

revoke all on function public.register_study_visit() from public;
grant execute on function public.register_study_visit() to authenticated;

-- 2) Caderno de redação do aluno (salvar, editar, excluir).
create table if not exists public.user_essays (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Sem título',
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.user_essays enable row level security;
drop policy if exists "Users manage own written essays" on public.user_essays;
create policy "Users manage own written essays"
  on public.user_essays for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists set_user_essays_updated_at on public.user_essays;
create trigger set_user_essays_updated_at before update on public.user_essays
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------------
-- 20261003220000_lock_subscription_fields.sql
-- ------------------------------------------------------------------
-- Planos pagos desativados na fase de testes: o aluno não pode alterar o próprio plano pela API.
-- Só administrador ou service role (auth.uid() nulo) mudam estes campos.
create or replace function public.protect_subscription_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and not public.has_role(auth.uid(), 'admin') then
    new.subscription_tier := old.subscription_tier;
    new.is_activated := old.is_activated;
    new.subscription_expires_at := old.subscription_expires_at;
    new.activation_code := old.activation_code;
    new.activation_expires_at := old.activation_expires_at;
  end if;
  return new;
end $$;

drop trigger if exists protect_subscription_fields on public.profiles;
create trigger protect_subscription_fields before update on public.profiles
  for each row execute function public.protect_subscription_fields();

-- ------------------------------------------------------------------
-- 20261003230000_medals_progression.sql
-- ------------------------------------------------------------------
-- Medalhas com progressão real: cada medalha tem uma métrica e uma meta; o servidor concede.
alter table public.achievements add column if not exists metric text;
alter table public.achievements add column if not exists target integer;
alter table public.achievements add column if not exists sort_order integer not null default 100;

insert into public.achievements (code, name, description, metric, target, sort_order) values
('FIRST_10',     'Primeiras 10',          'Resolva 10 questões.',                          'answered', 10,   10),
('ANSWERED_100', 'Centurião',             'Resolva 100 questões.',                         'answered', 100,  11),
('ANSWERED_500', 'Veterano de Questões',  'Resolva 500 questões.',                         'answered', 500,  12),
('ANSWERED_1000','Mil Questões',          'Resolva 1.000 questões.',                       'answered', 1000, 13),
('CORRECT_50',   'Mira Afiada',           'Acumule 50 acertos.',                           'correct',  50,   20),
('CORRECT_250',  'Tiro Certeiro',         'Acumule 250 acertos.',                          'correct',  250,  21),
('CORRECT_1000', 'Elite do Gabarito',     'Acumule 1.000 acertos.',                        'correct',  1000, 22),
('STREAK_3',     'Ritmo Inicial',         'Estude 3 dias seguidos.',                       'streak',   3,    30),
('STREAK_7',     'Semana de Foco',        'Estude 7 dias seguidos.',                       'streak',   7,    31),
('STREAK_30',    'Disciplina de Ferro',   'Estude 30 dias seguidos.',                      'streak',   30,   32),
('MOCK_1',       'Primeiro Simulado',     'Conclua um simulado.',                          'mocks',    1,    40),
('PERFECT_SCORE','Gabarito',              'Acerte 100% de um simulado (mín. 10 questões).','perfect',  1,    41),
('ESSAY_1',      'Pena Afiada',           'Salve sua primeira redação.',                   'essays',   1,    50),
('ESSAY_5',      'Redator Dedicado',      'Salve 5 redações.',                             'essays',   5,    51)
on conflict (code) do update set
  name = excluded.name, description = excluded.description,
  metric = excluded.metric, target = excluded.target, sort_order = excluded.sort_order;

-- Valor atual de cada métrica para o usuário logado.
create or replace function public.medal_metrics(_uid uuid)
returns table (metric text, value integer)
language sql
stable
security definer
set search_path = public
as $$
  select 'answered', count(*)::int from public.user_responses where user_id = _uid
  union all select 'correct', count(*)::int from public.user_responses where user_id = _uid and is_correct
  union all select 'streak', coalesce((select longest_streak from public.user_streaks where user_id = _uid), 0)
  union all select 'mocks', count(*)::int from public.mock_exam_results where user_id = _uid
  union all select 'perfect', count(*)::int from public.mock_exam_results
            where user_id = _uid and total_questions >= 10 and correct_answers = total_questions
  union all select 'essays', count(*)::int from public.user_essays where user_id = _uid
$$;
revoke all on function public.medal_metrics(uuid) from public;

-- Concede as medalhas cuja meta foi atingida e devolve as novas.
create or replace function public.award_achievements()
returns setof public.achievements
language plpgsql
security definer
set search_path = public
as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return; end if;
  return query
  with ins as (
    insert into public.user_achievements (user_id, achievement_id)
    select uid, a.id
    from public.achievements a
    join public.medal_metrics(uid) m on m.metric = a.metric
    where a.target is not null and m.value >= a.target
    on conflict (user_id, achievement_id) do nothing
    returning achievement_id
  )
  select a.* from public.achievements a join ins on ins.achievement_id = a.id;
end $$;
revoke all on function public.award_achievements() from public;
grant execute on function public.award_achievements() to authenticated;

-- Progresso de todas as medalhas (conquistadas ou não) do usuário logado.
create or replace function public.medal_progress()
returns table (code text, name text, description text, target integer, current integer, earned boolean)
language sql
stable
security definer
set search_path = public
as $$
  select a.code, a.name, a.description, a.target,
         least(coalesce(m.value, 0), a.target) as current,
         exists (select 1 from public.user_achievements ua where ua.user_id = auth.uid() and ua.achievement_id = a.id) as earned
  from public.achievements a
  left join public.medal_metrics(auth.uid()) m on m.metric = a.metric
  where a.target is not null
  order by a.sort_order
$$;
revoke all on function public.medal_progress() from public;
grant execute on function public.medal_progress() to authenticated;

-- Medalhas só são concedidas pelo servidor: o aluno não pode se auto-conceder.
drop policy if exists "Users can insert own achievements" on public.user_achievements;

-- ------------------------------------------------------------------
-- 20261003240000_admin_student_details.sql
-- ------------------------------------------------------------------
-- Detalhes de cadastro para o administrador: datas de cadastro e login, plano, pagamentos e pendências.
-- Lê auth.users (inacessível ao cliente), por isso usa security definer com checagem de admin.

-- Linha resumida de todos os alunos (cadastro e último login).
create or replace function public.admin_students_access()
returns table (id uuid, created_at timestamptz, last_sign_in_at timestamptz, email_confirmed boolean)
language sql
stable
security definer
set search_path = public, auth
as $$
  select u.id, u.created_at, u.last_sign_in_at, u.email_confirmed_at is not null
  from auth.users u
  where public.has_role(auth.uid(), 'admin')
$$;
revoke all on function public.admin_students_access() from public;
grant execute on function public.admin_students_access() to authenticated;

-- Ficha completa de um aluno.
create or replace function public.admin_student_details(_user_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare r jsonb;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Acesso restrito ao administrador' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'id', u.id,
    'full_name', p.full_name,
    'email', u.email,
    'cpf', p.cpf,
    'created_at', u.created_at,
    'email_confirmed_at', u.email_confirmed_at,
    'last_sign_in_at', u.last_sign_in_at,
    'tier', coalesce(p.subscription_tier, 'free'),
    'is_activated', coalesce(p.is_activated, false),
    'expires_at', p.subscription_expires_at,
    'is_admin', public.has_role(u.id, 'admin'),
    'last_study_date', s.last_activity_date,
    'current_streak', coalesce(s.current_streak, 0),
    'longest_streak', coalesce(s.longest_streak, 0),
    'answered', (select count(*) from (select distinct question_id from public.question_training_responses x where x.user_id = u.id) d)
                + (select count(*) from public.simulator_responses x where x.user_id = u.id and x.selected_answer is not null),
    'correct', (select count(*) from (select distinct on (question_id) is_correct from public.question_training_responses x where x.user_id = u.id order by question_id, created_at) d where d.is_correct)
                + (select count(*) from public.simulator_responses x where x.user_id = u.id and x.is_correct),
    'essays', (select count(*) from public.user_essays x where x.user_id = u.id),
    'exams', (select count(*) from public.student_exam_documents x where x.user_id = u.id),
    'medals', (select count(*) from public.user_achievements x where x.user_id = u.id),
    'paid_total_cents', coalesce((select sum(f.amount_cents) from public.finance_entries f
                                  where f.student_id = u.id and f.kind = 'receita'), 0),
    'payments', coalesce((select jsonb_agg(t order by t.entry_date desc, t.created_at desc) from (
                  select f.entry_date, f.category, f.description, f.amount_cents, f.plan_id, f.created_at
                  from public.finance_entries f
                  where f.student_id = u.id and f.kind = 'receita'
                  order by f.entry_date desc, f.created_at desc limit 8) t), '[]'::jsonb),
    'plan_history', coalesce((select jsonb_agg(t order by t.created_at desc) from (
                  select l.event_type, l.old_tier, l.new_tier, l.created_at, l.metadata->>'reason' as reason
                  from public.subscription_audit_logs l
                  where l.user_id = u.id
                  order by l.created_at desc limit 8) t), '[]'::jsonb)
  ) into r
  from auth.users u
  left join public.profiles p on p.id = u.id
  left join public.user_streaks s on s.user_id = u.id
  where u.id = _user_id;

  return r;
end $$;
revoke all on function public.admin_student_details(uuid) from public;
grant execute on function public.admin_student_details(uuid) to authenticated;

-- ------------------------------------------------------------------
-- 20261003250000_study_sessions.sql
-- ------------------------------------------------------------------
-- Tempo de estudo por sessão: o navegador envia um "batimento" a cada ~30 s com os segundos
-- em que a aba esteve visível. O servidor soma; o aluno não escreve na tabela diretamente.
create table if not exists public.study_sessions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  active_seconds integer not null default 0,
  study_date date not null default public.get_current_acre_date()
);
create index if not exists study_sessions_user_idx on public.study_sessions (user_id, started_at desc);
alter table public.study_sessions enable row level security;

drop policy if exists "Users read own study sessions" on public.study_sessions;
create policy "Users read own study sessions" on public.study_sessions
  for select to authenticated using (auth.uid() = user_id);

create or replace function public.study_heartbeat(_id uuid, _seconds integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return; end if;
  insert into public.study_sessions (id, user_id, active_seconds)
  values (_id, uid, least(greatest(coalesce(_seconds, 0), 0), 120))
  on conflict (id) do update
    set active_seconds = public.study_sessions.active_seconds + least(greatest(coalesce(_seconds, 0), 0), 120),
        last_seen_at = now()
    where public.study_sessions.user_id = uid;
end $$;
revoke all on function public.study_heartbeat(uuid, integer) from public;
grant execute on function public.study_heartbeat(uuid, integer) to authenticated;

-- Total estudado hoje (dia do Acre) pelo usuário logado.
create or replace function public.study_time_today()
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(sum(active_seconds), 0)::int from public.study_sessions
  where user_id = auth.uid() and study_date = public.get_current_acre_date()
$$;
revoke all on function public.study_time_today() from public;
grant execute on function public.study_time_today() to authenticated;

-- Administrador: quem está online agora (batimento nos últimos 90 s).
create or replace function public.admin_students_online()
returns table (user_id uuid, session_seconds integer)
language sql
stable
security definer
set search_path = public
as $$
  select distinct on (s.user_id) s.user_id, s.active_seconds
  from public.study_sessions s
  where public.has_role(auth.uid(), 'admin') and s.last_seen_at > now() - interval '90 seconds'
  order by s.user_id, s.last_seen_at desc
$$;
revoke all on function public.admin_students_online() from public;
grant execute on function public.admin_students_online() to authenticated;

-- Administrador: tempo de uso de um aluno.
create or replace function public.admin_student_time(_user_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare r jsonb;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Acesso restrito ao administrador' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'total_seconds', coalesce(sum(active_seconds), 0),
    'today_seconds', coalesce(sum(active_seconds) filter (where study_date = public.get_current_acre_date()), 0),
    'sessions', count(*),
    'online', coalesce(bool_or(last_seen_at > now() - interval '90 seconds'), false),
    'recent', coalesce((select jsonb_agg(t order by t.started_at desc) from (
        select started_at, last_seen_at, active_seconds from public.study_sessions
        where user_id = _user_id order by started_at desc limit 8) t), '[]'::jsonb)
  ) into r
  from public.study_sessions where user_id = _user_id;
  return r;
end $$;
revoke all on function public.admin_student_time(uuid) from public;
grant execute on function public.admin_student_time(uuid) to authenticated;

-- ------------------------------------------------------------------
-- 20261003260000_avatars_bucket.sql
-- ------------------------------------------------------------------
-- Foto de perfil: bucket público de leitura; cada aluno só grava na própria pasta (<user_id>/...).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 1048576, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = 1048576,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "Users upload own avatar" on storage.objects;
create policy "Users upload own avatar" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users update own avatar" on storage.objects;
create policy "Users update own avatar" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users delete own avatar" on storage.objects;
create policy "Users delete own avatar" on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- ------------------------------------------------------------------
-- 20261003270000_ranking_periods_and_questions.sql
-- ------------------------------------------------------------------
-- Ranking por período (semana, mês, geral) e por métrica (pontos, questões resolvidas).
-- Pontos = simulados (10/acerto, -2/erro, bônus de precisão) + questões avulsas do Treinador
-- (+1 por questão respondida, +2 se acertar sem pedir ajuda; só a 1ª resposta de cada questão conta).
-- Administradores ficam fora do ranking. Semana e mês seguem o fuso do Acre.

create or replace function public.rank_table(_period text, _metric text)
returns table (
  user_id uuid, points integer, questions integer, correct integer,
  all_points integer, stars integer, level_name text
)
language sql
stable
security definer
set search_path = public
as $$
  with since as (
    select case _period
      when 'week'  then date_trunc('week',  now() at time zone 'America/Rio_Branco') at time zone 'America/Rio_Branco'
      when 'month' then date_trunc('month', now() at time zone 'America/Rio_Branco') at time zone 'America/Rio_Branco'
      else '-infinity'::timestamptz end as t
  ),
  q as (
    select distinct on (r.user_id, r.question_id)
      r.user_id, r.created_at as at,
      1 + case when r.is_correct and not r.asked_for_help then 2 else 0 end as pts,
      1 as qs,
      case when r.is_correct then 1 else 0 end as ok
    from public.question_training_responses r
    order by r.user_id, r.question_id, r.created_at
  ),
  s as (
    select a.user_id, a.finished_at as at,
      greatest(10, a.correct_answers * 10 - a.wrong_answers * 2
        + case when a.accuracy >= 90 then 100 when a.accuracy >= 80 then 60 when a.accuracy >= 70 then 30 else 0 end) as pts,
      (a.total_questions - a.blank_answers) as qs,
      a.correct_answers as ok
    from public.simulator_attempts a
  ),
  ev as (
    select * from q union all select * from s
  ),
  valid as (
    select ev.* from ev
    where not exists (select 1 from public.user_roles ur where ur.user_id = ev.user_id and ur.role = 'admin')
  ),
  tot as (select v.user_id, sum(v.pts)::int as all_points from valid v group by v.user_id),
  per as (
    select v.user_id, sum(v.pts)::int as points, sum(v.qs)::int as questions, sum(v.ok)::int as correct
    from valid v, since where v.at >= since.t group by v.user_id
  )
  select p.user_id, p.points, p.questions, p.correct, t.all_points,
    case when t.all_points >= 3000 then 5 when t.all_points >= 1500 then 4 when t.all_points >= 750 then 3 when t.all_points >= 250 then 2 else 1 end,
    case when t.all_points >= 3000 then 'Elite' when t.all_points >= 1500 then 'Especialista' when t.all_points >= 750 then 'Avançado' when t.all_points >= 250 then 'Competidor' else 'Aspirante' end
  from per p join tot t using (user_id)
$$;
revoke all on function public.rank_table(text, text) from public;

create or replace function public.get_ranking(_period text default 'all', _metric text default 'points', _limit integer default 20)
returns table (
  rank_position bigint, user_id uuid, display_name text, points integer, questions integer,
  accuracy integer, stars integer, level_name text, is_me boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select row_number() over (
           order by case when _metric = 'questions' then t.questions else t.points end desc,
                    case when _metric = 'questions' then t.points else t.questions end desc, t.user_id),
    t.user_id,
    case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
         when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
         else split_part(trim(p.full_name), ' ', 1) || ' '
              || left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    t.points, t.questions,
    case when t.questions > 0 then round(100.0 * t.correct / t.questions)::int else 0 end,
    t.stars, t.level_name, t.user_id = auth.uid()
  from public.rank_table(_period, _metric) t
  left join public.profiles p on p.id = t.user_id
  order by 1
  limit least(greatest(_limit, 1), 100)
$$;
revoke all on function public.get_ranking(text, text, integer) from public;
grant execute on function public.get_ranking(text, text, integer) to authenticated;

-- Resumo do usuário logado: posição no período/métrica e estrelas/nível pelo total geral.
create or replace function public.my_rank_summary(_period text default 'all', _metric text default 'points')
returns table (
  user_id uuid, rank_position bigint, total_points integer, stars integer, level_name text,
  completed_simulators integer, best_accuracy numeric
)
language sql
stable
security definer
set search_path = public
as $$
  with ranked as (
    select t.user_id, t.all_points, t.stars, t.level_name,
      row_number() over (
        order by case when _metric = 'questions' then t.questions else t.points end desc,
                 case when _metric = 'questions' then t.points else t.questions end desc, t.user_id) as pos
    from public.rank_table(_period, _metric) t
  ),
  me as (
    select * from ranked where user_id = auth.uid()
  ),
  sim as (
    select count(*)::int as n, coalesce(max(accuracy), 0) as best
    from public.simulator_attempts where user_id = auth.uid()
  )
  select auth.uid(), me.pos, coalesce(me.all_points, 0), coalesce(me.stars, 1), coalesce(me.level_name, 'Aspirante'),
         sim.n, sim.best
  from sim left join me on true
$$;
revoke all on function public.my_rank_summary(text, text) from public;
grant execute on function public.my_rank_summary(text, text) to authenticated;

-- Medalhas passam a contar as questões reais (Treinador + simulados), não a tabela antiga.
create or replace function public.medal_metrics(_uid uuid)
returns table (metric text, value integer)
language sql
stable
security definer
set search_path = public
as $$
  with qa as (
    select distinct on (question_id) is_correct as ok from public.question_training_responses where user_id = _uid
    order by question_id, created_at
  ),
  sa as (
    select is_correct as ok from public.simulator_responses where user_id = _uid and selected_answer is not null
  ),
  allq as (select ok from qa union all select ok from sa)
  select 'answered', (select count(*)::int from allq)
  union all select 'correct', (select count(*)::int from allq where ok)
  union all select 'streak', coalesce((select longest_streak from public.user_streaks where user_id = _uid), 0)
  union all select 'mocks', (select count(*)::int from public.simulator_attempts where user_id = _uid)
  union all select 'perfect', (select count(*)::int from public.simulator_attempts
                               where user_id = _uid and total_questions >= 10 and correct_answers = total_questions)
  union all select 'essays', (select count(*)::int from public.user_essays where user_id = _uid)
$$;
revoke all on function public.medal_metrics(uuid) from public;

-- ------------------------------------------------------------------
-- 20261003280000_admin_student_progress.sql
-- ------------------------------------------------------------------
-- Progresso real de um aluno para o administrador: simulados, desempenho por matéria,
-- atividade dos últimos 14 dias (questões e minutos de estudo).
create or replace function public.admin_student_progress(_user_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare r jsonb;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Acesso restrito ao administrador' using errcode = '42501';
  end if;

  with tr as (
    select distinct on (question_id) subject, is_correct, created_at
    from public.question_training_responses where user_id = _user_id
    order by question_id, created_at
  ),
  sr as (
    select subject, is_correct, created_at
    from public.simulator_responses where user_id = _user_id and selected_answer is not null
  ),
  allr as (select * from tr union all select * from sr),
  days as (
    select generate_series(public.get_current_acre_date() - 13, public.get_current_acre_date(), interval '1 day')::date as d
  )
  select jsonb_build_object(
    'simulators', coalesce((select jsonb_agg(t order by t.finished_at) from (
        select id, title, total_questions, correct_answers, wrong_answers, blank_answers, accuracy, duration_seconds, finished_at
        from public.simulator_attempts where user_id = _user_id order by finished_at desc limit 20) t), '[]'::jsonb),
    'subjects', coalesce((select jsonb_agg(t order by t.answered desc) from (
        select subject, count(*) as answered, count(*) filter (where is_correct) as correct
        from allr group by subject) t), '[]'::jsonb),
    'days', (select jsonb_agg(jsonb_build_object(
        'day', days.d,
        'questions', (select count(*) from allr where (allr.created_at at time zone 'America/Rio_Branco')::date = days.d),
        'correct', (select count(*) from allr where allr.is_correct and (allr.created_at at time zone 'America/Rio_Branco')::date = days.d),
        'seconds', coalesce((select sum(active_seconds) from public.study_sessions s where s.user_id = _user_id and s.study_date = days.d), 0)
      ) order by days.d) from days),
    'total_answered', (select count(*) from allr),
    'total_correct', (select count(*) from allr where is_correct)
  ) into r;
  return r;
end $$;
revoke all on function public.admin_student_progress(uuid) from public;
grant execute on function public.admin_student_progress(uuid) to authenticated;

-- ------------------------------------------------------------------
-- 20261003290000_ai_daily_limit_server.sql
-- ------------------------------------------------------------------
-- Limite diário da IA aplicado no servidor (dia do Acre). O navegador não decide mais nada:
-- o servidor chama ai_try_consume() ANTES de gerar a resposta; se o limite acabou, recusa.

create table if not exists public.ai_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  used_on date not null default public.get_current_acre_date(),
  created_at timestamptz not null default now()
);
create index if not exists ai_usage_logs_user_idx on public.ai_usage_logs (user_id, used_on);
alter table public.ai_usage_logs enable row level security;

-- O aluno só lê o próprio uso; quem grava é a função abaixo (não dá para forjar nem apagar).
drop policy if exists "Users insert own ai usage" on public.ai_usage_logs;
revoke insert, update, delete on public.ai_usage_logs from authenticated;
drop policy if exists "Users view own ai usage" on public.ai_usage_logs;
create policy "Users view own ai usage" on public.ai_usage_logs
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Admins view all ai usage" on public.ai_usage_logs;
create policy "Admins view all ai usage" on public.ai_usage_logs
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
grant select on public.ai_usage_logs to authenticated;

-- Reserva uma resolução. _limit nulo = ilimitado. Devolve false quando o limite do dia acabou.
create or replace function public.ai_try_consume(_limit integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  today date := public.get_current_acre_date();
  used integer;
begin
  if uid is null then return false; end if;
  perform pg_advisory_xact_lock(hashtext('ai:' || uid::text));  -- requisições simultâneas não furam o limite
  select count(*) into used from public.ai_usage_logs where user_id = uid and used_on = today;
  if _limit is not null and used >= _limit then return false; end if;
  insert into public.ai_usage_logs (user_id, used_on) values (uid, today);
  return true;
end $$;
revoke all on function public.ai_try_consume(integer) from public;
grant execute on function public.ai_try_consume(integer) to authenticated;

-- Quantas resoluções o usuário logado já usou hoje.
create or replace function public.ai_used_today()
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::int from public.ai_usage_logs
  where user_id = auth.uid() and used_on = public.get_current_acre_date()
$$;
revoke all on function public.ai_used_today() from public;
grant execute on function public.ai_used_today() to authenticated;

-- ------------------------------------------------------------------
-- 20261003300000_study_coach.sql
-- ------------------------------------------------------------------
-- Assistente de estudos: perfil de preparação do aluno e estatísticas reais por matéria.
create table if not exists public.study_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  experience text not null check (experience in ('first', 'some', 'veteran')),
  career text not null,
  exam_date date,
  hours_per_week integer not null check (hours_per_week between 1 and 80),
  last_plan jsonb,              -- foto do último plano: {at, shares:{matéria: %}} para mostrar o que mudou
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.study_profiles enable row level security;
drop policy if exists "Users manage own study profile" on public.study_profiles;
create policy "Users manage own study profile" on public.study_profiles
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists set_study_profiles_updated_at on public.study_profiles;
create trigger set_study_profiles_updated_at before update on public.study_profiles
  for each row execute function public.set_updated_at();

-- Desempenho do aluno por matéria: totais, últimos 14 dias e tempo gasto respondendo.
-- Só a primeira resposta de cada questão do Treinador conta; simulados entram sem tempo.
create or replace function public.my_subject_stats()
returns table (subject text, answered integer, correct integer, recent_answered integer, recent_correct integer, seconds integer)
language sql
stable
security definer
set search_path = public
as $$
  with tr as (
    select distinct on (question_id) subject, is_correct, created_at, response_seconds
    from public.question_training_responses where user_id = auth.uid()
    order by question_id, created_at
  ),
  sr as (
    select subject, is_correct, created_at, 0 as response_seconds
    from public.simulator_responses where user_id = auth.uid() and selected_answer is not null
  ),
  allr as (select * from tr union all select * from sr)
  select subject,
    count(*)::int,
    count(*) filter (where is_correct)::int,
    count(*) filter (where created_at > now() - interval '14 days')::int,
    count(*) filter (where is_correct and created_at > now() - interval '14 days')::int,
    coalesce(sum(response_seconds), 0)::int
  from allr group by subject
$$;
revoke all on function public.my_subject_stats() from public;
grant execute on function public.my_subject_stats() to authenticated;

-- Horas totais de estudo na plataforma (sessões com a aba visível).
create or replace function public.my_study_hours()
returns numeric
language sql
stable
security definer
set search_path = public
as $$
  select round(coalesce(sum(active_seconds), 0) / 3600.0, 1) from public.study_sessions where user_id = auth.uid()
$$;
revoke all on function public.my_study_hours() from public;
grant execute on function public.my_study_hours() to authenticated;

-- ------------------------------------------------------------------
-- 20261003310000_server_now.sql
-- ------------------------------------------------------------------
-- Hora oficial do servidor, para o relógio da plataforma não depender do relógio do aparelho.
create or replace function public.server_now()
returns timestamptz
language sql
stable
as $$ select now() $$;
grant execute on function public.server_now() to anon, authenticated;

-- ------------------------------------------------------------------
-- 20261003320000_study_coach_multi_plans.sql
-- ------------------------------------------------------------------
-- Assistente de estudos: vários planos por aluno (criar, editar, excluir), dias de estudo e redação.
-- Idempotente: a troca da chave primária só acontece se a coluna id ainda não existir.
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'study_profiles' and column_name = 'id'
  ) then
    alter table public.study_profiles drop constraint if exists study_profiles_pkey;
    alter table public.study_profiles add column id uuid not null default gen_random_uuid();
    alter table public.study_profiles add primary key (id);
  end if;
end $$;
alter table public.study_profiles add column if not exists name text;
alter table public.study_profiles add column if not exists study_days integer[] not null default '{1,2,3,4,5,6}';
alter table public.study_profiles add column if not exists essay boolean not null default false;
create index if not exists study_profiles_user_idx on public.study_profiles (user_id, updated_at desc);

-- ------------------------------------------------------------------
-- 20261003330000_exam_panorama.sql
-- ------------------------------------------------------------------
-- Panorama das provas: análise agregada de TODAS as provas oficiais da plataforma, igual para todos os alunos.
-- Só devolve contagens (nenhum enunciado, gabarito ou dado pessoal). Conta itens ativos e em revisão;
-- anulados, revogados e arquivados ficam de fora.
create or replace function public.exam_panorama()
returns table (
  contest_name text, exam_year integer, career_name text, exam_board text,
  subject text, items integer, scope text, family text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    q.contest_name, q.exam_year, q.career_name, q.exam_board, q.subject, count(*)::int,
    case
      when q.contest_name ~* '(Polícia Federal|Rodoviária Federal|Departamento Penitenciário Nacional|Câmara dos Deputados)' then 'federal'
      when q.contest_name ~* '(Prefeitura|Município|Municipal)' then 'municipal'
      else 'estadual'
    end,
    case
      when q.contest_name ~* 'Polícia Federal' then 'Polícia Federal'
      when q.contest_name ~* 'Rodoviária Federal' then 'PRF'
      when q.contest_name ~* '(Penal|Penitenciário)' then 'Polícia Penal'
      when q.contest_name ~* 'Polícia Civil' then 'Polícia Civil'
      when q.contest_name ~* 'Polícia Militar' then 'Polícia Militar'
      else 'Outros órgãos'
    end
  from public.official_exam_questions q
  where q.content_status in ('active', 'under_review')
    and auth.uid() is not null
  group by q.contest_name, q.exam_year, q.career_name, q.exam_board, q.subject
$$;
revoke all on function public.exam_panorama() from public;
grant execute on function public.exam_panorama() to authenticated;

-- ------------------------------------------------------------------
-- 20261003340000_study_checklist.sql
-- ------------------------------------------------------------------
-- Cronograma com horários e acompanhamento: o aluno marca cada bloco estudado e o histórico vira o
-- "Registro de estudos" no próprio painel.
alter table public.study_profiles add column if not exists start_time text not null default '19:00'
  check (start_time ~ '^[0-2][0-9]:[0-5][0-9]$');

create table if not exists public.study_plan_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references public.study_profiles(id) on delete set null,
  week_start date not null,                 -- segunda-feira da semana (fuso do Acre)
  block_key text not null,                  -- identifica o bloco dentro da semana
  subject text not null,
  kind text not null,
  topics text[] not null default '{}',
  minutes integer not null check (minutes > 0 and minutes <= 600),
  done_at timestamptz not null default now(),
  unique (user_id, plan_id, week_start, block_key)
);
create index if not exists study_plan_checks_user_idx on public.study_plan_checks (user_id, done_at desc);
alter table public.study_plan_checks enable row level security;
drop policy if exists "Users manage own study checks" on public.study_plan_checks;
create policy "Users manage own study checks" on public.study_plan_checks
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Admins read study checks" on public.study_plan_checks;
create policy "Admins read study checks" on public.study_plan_checks
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------------
-- 20261003350000_flashcards.sql
-- ------------------------------------------------------------------
-- Flashcards próprios do aluno com repetição espaçada (estilo SM-2 simplificado).
create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  topic text,
  front text not null check (length(front) between 1 and 600),
  back text not null check (length(back) between 1 and 1500),
  source text not null default 'manual',     -- 'manual' | 'library'
  source_key text,                           -- evita importar o mesmo cartão da Biblioteca duas vezes
  ease numeric(4,2) not null default 2.5,
  interval_days integer not null default 0,
  reps integer not null default 0,
  lapses integer not null default 0,
  due_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, source_key)
);
create index if not exists flashcards_due_idx on public.flashcards (user_id, due_at);
alter table public.flashcards enable row level security;
drop policy if exists "Users manage own flashcards" on public.flashcards;
create policy "Users manage own flashcards" on public.flashcards
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.flashcard_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id uuid references public.flashcards(id) on delete set null,
  rating text not null check (rating in ('again', 'hard', 'good', 'easy')),
  reviewed_at timestamptz not null default now()
);
create index if not exists flashcard_reviews_user_idx on public.flashcard_reviews (user_id, reviewed_at desc);
alter table public.flashcard_reviews enable row level security;
drop policy if exists "Users manage own flashcard reviews" on public.flashcard_reviews;
create policy "Users manage own flashcard reviews" on public.flashcard_reviews
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ------------------------------------------------------------------
-- 20261003360000_study_room.sql
-- ------------------------------------------------------------------
-- Sala de estudo: guarda o tempo realmente cronometrado (só foco, sem pausas) de cada bloco concluído.
alter table public.study_plan_checks add column if not exists actual_seconds integer not null default 0
  check (actual_seconds >= 0 and actual_seconds <= 86400);

