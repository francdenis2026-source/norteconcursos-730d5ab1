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
