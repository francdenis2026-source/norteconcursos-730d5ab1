-- O ranking mede desempenho em questões e simulados. Horas continuam disponíveis
-- como métrica informativa, mas não aumentam a pontuação nem a posição.
create or replace function public.get_ranking_section(_kind text, _limit integer default 20)
returns table (
  rank_position bigint, user_id uuid, display_name text, points integer,
  question_points integer, simulator_points integer, study_points integer, extra_points integer,
  study_hours numeric, questions integer, accuracy integer, simulators integer,
  is_me boolean, stars integer, level_name text
)
language sql stable security definer set search_path = public
as $$
  with events as (select * from public.score_events()),
  participants as (
    select p.id as user_id, coalesce(e.qp, 0) as qp, coalesce(e.sp, 0) as sp,
      coalesce(e.fp, 0) as fp, coalesce(e.ep, 0) as ep, coalesce(e.hrs, 0) as hrs,
      coalesce(e.qn, 0) as qn, coalesce(e.qc, 0) as qc, coalesce(e.sn, 0) as sn
    from public.profiles p left join events e on e.user_id = p.id
    where not exists (select 1 from public.user_roles ur where ur.user_id = p.id and ur.role = 'admin')
  ),
  scored as (
    select x.*, x.qp + x.sp + x.fp + x.ep as total,
      case _kind when 'questions' then x.qp when 'simulators' then x.sp else x.qp + x.sp + x.fp + x.ep end as ranking_total
    from participants x
  )
  select row_number() over (order by s.ranking_total desc, s.user_id), s.user_id,
    case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
      when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
      else split_part(trim(p.full_name), ' ', 1) || ' ' || left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    s.ranking_total, s.qp, s.sp, 0, s.fp + s.ep, s.hrs, s.qn,
    case when s.qn > 0 then round(100.0 * s.qc / s.qn)::int else 0 end, s.sn,
    s.user_id = auth.uid(), lv.stars, lv.level_name
  from scored s left join public.profiles p on p.id = s.user_id
  cross join lateral public.level_of(s.total) lv
  where _kind = 'general' or s.ranking_total > 0
  order by 1
  limit least(greatest(_limit, 1), 100)
$$;
revoke all on function public.get_ranking_section(text, integer) from public, anon;
grant execute on function public.get_ranking_section(text, integer) to authenticated;

create or replace function public.get_ranking_profile(_user uuid)
returns table (
  display_name text, stars integer, level_name text, general_points integer, next_level_at integer,
  general_position bigint, participants bigint, question_points integer, simulator_points integer,
  study_points integer, flashcard_points integer, essay_points integer, consistency_points integer,
  study_hours numeric, questions integer, accuracy integer, simulators integer, best_accuracy numeric,
  streak integer, medals text[]
)
language sql stable security definer set search_path = public
as $$
  with events as (select * from public.score_events()),
  participants as (
    select p.id as user_id, coalesce(e.qp, 0) as qp, coalesce(e.sp, 0) as sp,
      coalesce(e.fp, 0) as fp, coalesce(e.ep, 0) as ep, coalesce(e.hrs, 0) as hrs,
      coalesce(e.qn, 0) as qn, coalesce(e.qc, 0) as qc, coalesce(e.sn, 0) as sn
    from public.profiles p left join events e on e.user_id = p.id
    where not exists (select 1 from public.user_roles ur where ur.user_id = p.id and ur.role = 'admin')
  ),
  ranked as (
    select x.*, x.qp + x.sp + x.fp + x.ep as general,
      row_number() over (order by x.qp + x.sp + x.fp + x.ep desc, x.user_id) as pos,
      count(*) over () as n
    from participants x
  )
  select case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
    when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
    else split_part(trim(p.full_name), ' ', 1) || ' ' || left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    lv.stars, lv.level_name, r.general, lv.next_min, r.pos, r.n, r.qp, r.sp, 0, r.fp, r.ep, 0, r.hrs, r.qn,
    case when r.qn > 0 then round(100.0 * r.qc / r.qn)::int else 0 end, r.sn,
    (select coalesce(max(a.accuracy), 0) from public.simulator_attempts a where a.user_id = r.user_id),
    coalesce((select us.longest_streak from public.user_streaks us where us.user_id = r.user_id), 0),
    coalesce((select array_agg(ac.name order by ac.name) from public.user_achievements ua
      join public.achievements ac on ac.id = ua.achievement_id where ua.user_id = r.user_id), '{}')
  from ranked r left join public.profiles p on p.id = r.user_id
  cross join lateral public.level_of(r.general) lv
  where r.user_id = _user and auth.uid() is not null
$$;
revoke all on function public.get_ranking_profile(uuid) from public, anon;
grant execute on function public.get_ranking_profile(uuid) to authenticated;

create or replace function public.rank_table(_period text, _metric text)
returns table (user_id uuid, points integer, questions integer, correct integer, all_points integer, stars integer, level_name text)
language sql stable security definer set search_path = public
as $$
  with since as (
    select case _period
      when 'week' then date_trunc('week', now() at time zone 'America/Rio_Branco') at time zone 'America/Rio_Branco'
      when 'month' then date_trunc('month', now() at time zone 'America/Rio_Branco') at time zone 'America/Rio_Branco'
      else '-infinity'::timestamptz end as t
  ),
  per as (select s.* from public.score_events((select t from since)) s),
  tot as (select s.user_id, (s.qp + s.sp + s.fp + s.ep)::int as all_points from public.score_events() s)
  select p.user_id, (p.qp + p.sp + p.fp + p.ep)::int,
    p.qn, p.qc, t.all_points, lv.stars, lv.level_name
  from per p join tot t using (user_id)
  cross join lateral public.level_of(t.all_points) lv
  where p.qp + p.sp + p.fp + p.ep > 0
$$;
revoke all on function public.rank_table(text, text) from public, anon, authenticated;
grant execute on function public.rank_table(text, text) to authenticated;

create or replace function public.my_rank_summary(_period text default 'all', _metric text default 'points')
returns table (user_id uuid, rank_position bigint, total_points integer, stars integer, level_name text, completed_simulators integer, best_accuracy numeric)
language sql stable security definer set search_path = public
as $$
  with ranked as (
    select r.*, row_number() over (
      order by case when _metric = 'questions' then r.questions else r.points end desc,
        case when _metric = 'questions' then r.points else r.questions end desc, r.user_id
    ) as pos
    from public.rank_table(_period, _metric) r
  ), sim as (
    select count(*)::int as n, coalesce(max(accuracy), 0) as best
    from public.simulator_attempts where user_id = auth.uid()
  )
  select auth.uid(), me.pos, coalesce(me.all_points, 0), coalesce(me.stars, 1), coalesce(me.level_name, 'Aspirante'),
    sim.n, sim.best
  from sim left join ranked me on me.user_id = auth.uid()
$$;
revoke all on function public.my_rank_summary(text, text) from public, anon;
grant execute on function public.my_rank_summary(text, text) to authenticated;
