-- Ranking com nível e perfil público resumido (só dados de desempenho; nunca e-mail nem nome completo).
-- Nível pela pontuação geral (questões + simulados + estudo): 250 / 750 / 1500 / 3000.
create or replace function public.ranking_totals()
returns table (user_id uuid, qp integer, sp integer, hp integer, hrs numeric, qn integer, qc integer)
language sql
stable
security definer
set search_path = public
as $$
  with q as (
    select f.user_id, sum(1 + case when f.is_correct and not f.asked_for_help then 2 else 0 end)::int as pts,
           count(*)::int as n, count(*) filter (where f.is_correct)::int as ok
    from (select distinct on (r.user_id, r.question_id) r.* from public.question_training_responses r
          order by r.user_id, r.question_id, r.created_at) f
    group by f.user_id
  ),
  s as (
    select a.user_id, sum(greatest(10, a.correct_answers * 10 - a.wrong_answers * 2
      + case when a.accuracy >= 90 then 100 when a.accuracy >= 80 then 60 when a.accuracy >= 70 then 30 else 0 end))::int as pts
    from public.simulator_attempts a group by a.user_id
  ),
  st as (
    select ss.user_id, sum(ss.active_seconds) as secs from public.study_sessions ss group by ss.user_id
  ),
  u as (select user_id from q union select user_id from s union select user_id from st)
  select u.user_id, coalesce(q.pts, 0), coalesce(s.pts, 0), (coalesce(st.secs, 0) / 360)::int,
         round(coalesce(st.secs, 0) / 3600.0, 1), coalesce(q.n, 0), coalesce(q.ok, 0)
  from u left join q using (user_id) left join s using (user_id) left join st using (user_id)
  where not exists (select 1 from public.user_roles ur where ur.user_id = u.user_id and ur.role = 'admin')
$$;
revoke all on function public.ranking_totals() from public;

create or replace function public.level_of(_points integer)
returns table (stars integer, level_name text, level_min integer, next_min integer)
language sql
immutable
as $$
  select case when _points >= 3000 then 5 when _points >= 1500 then 4 when _points >= 750 then 3 when _points >= 250 then 2 else 1 end,
         case when _points >= 3000 then 'Elite' when _points >= 1500 then 'Especialista' when _points >= 750 then 'Avançado' when _points >= 250 then 'Competidor' else 'Aspirante' end,
         case when _points >= 3000 then 3000 when _points >= 1500 then 1500 when _points >= 750 then 750 when _points >= 250 then 250 else 0 end,
         case when _points >= 3000 then null when _points >= 1500 then 3000 when _points >= 750 then 1500 when _points >= 250 then 750 else 250 end
$$;

drop function if exists public.get_ranking_section(text, integer);
create or replace function public.get_ranking_section(_kind text, _limit integer default 20)
returns table (
  rank_position bigint, user_id uuid, display_name text, points integer,
  question_points integer, simulator_points integer, study_points integer,
  study_hours numeric, is_me boolean, stars integer, level_name text
)
language sql
stable
security definer
set search_path = public
as $$
  with sc as (
    select t.*, case _kind when 'questions' then t.qp when 'simulators' then t.sp else t.qp + t.sp + t.hp end as total,
           t.qp + t.sp + t.hp as general
    from public.ranking_totals() t
  )
  select row_number() over (order by sc.total desc, sc.user_id), sc.user_id,
    case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
         when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
         else split_part(trim(p.full_name), ' ', 1) || ' '
              || left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    sc.total, sc.qp, sc.sp, sc.hp, sc.hrs, sc.user_id = auth.uid(), lv.stars, lv.level_name
  from sc left join public.profiles p on p.id = sc.user_id
  cross join lateral public.level_of(sc.general) lv
  where sc.total > 0
  order by 1
  limit least(greatest(_limit, 1), 100)
$$;
revoke all on function public.get_ranking_section(text, integer) from public;
grant execute on function public.get_ranking_section(text, integer) to authenticated;

create or replace function public.get_ranking_profile(_user uuid)
returns table (
  display_name text, stars integer, level_name text, general_points integer, next_level_at integer,
  general_position bigint, participants bigint, question_points integer, simulator_points integer,
  study_points integer, study_hours numeric, questions integer, accuracy integer,
  simulators integer, best_accuracy numeric, streak integer, medals text[]
)
language sql
stable
security definer
set search_path = public
as $$
  with t as (
    select x.*, x.qp + x.sp + x.hp as general,
           row_number() over (order by x.qp + x.sp + x.hp desc, x.user_id) as pos,
           count(*) over () as n
    from public.ranking_totals() x
  )
  select
    case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
         when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
         else split_part(trim(p.full_name), ' ', 1) || ' '
              || left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    lv.stars, lv.level_name, t.general, lv.next_min, t.pos, t.n, t.qp, t.sp, t.hp, t.hrs, t.qn,
    case when t.qn > 0 then round(100.0 * t.qc / t.qn)::int else 0 end,
    (select count(*)::int from public.simulator_attempts a where a.user_id = t.user_id),
    (select coalesce(max(a.accuracy), 0) from public.simulator_attempts a where a.user_id = t.user_id),
    coalesce((select us.longest_streak from public.user_streaks us where us.user_id = t.user_id), 0),
    coalesce((select array_agg(ac.name order by ac.sort_order) from public.user_achievements ua
              join public.achievements ac on ac.id = ua.achievement_id where ua.user_id = t.user_id), '{}')
  from t
  left join public.profiles p on p.id = t.user_id
  cross join lateral public.level_of(t.general) lv
  where t.user_id = _user and auth.uid() is not null
$$;
revoke all on function public.get_ranking_profile(uuid) from public;
grant execute on function public.get_ranking_profile(uuid) to authenticated;
