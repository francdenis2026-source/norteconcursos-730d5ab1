-- Ranking em 3 seções: questões, simulados e geral (questões + simulados + horas de estudo).
-- Regras de pontos iguais às de rank_table; estudo = 10 pontos por hora ativa (study_sessions).
-- Administradores ficam fora. Só nome + inicial do sobrenome é exposto.
create or replace function public.get_ranking_section(_kind text, _limit integer default 20)
returns table (
  rank_position bigint, user_id uuid, display_name text, points integer,
  question_points integer, simulator_points integer, study_points integer,
  study_hours numeric, is_me boolean
)
language sql
stable
security definer
set search_path = public
as $$
  with q as (
    select f.user_id, sum(1 + case when f.is_correct and not f.asked_for_help then 2 else 0 end)::int as pts
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
  u as (
    select user_id from q union select user_id from s union select user_id from st
  ),
  t as (
    select u.user_id,
      coalesce(q.pts, 0) as qp, coalesce(s.pts, 0) as sp,
      (coalesce(st.secs, 0) / 360)::int as hp, round(coalesce(st.secs, 0) / 3600.0, 1) as hrs
    from u left join q using (user_id) left join s using (user_id) left join st using (user_id)
    where not exists (select 1 from public.user_roles ur where ur.user_id = u.user_id and ur.role = 'admin')
  ),
  sc as (
    select t.*, case _kind when 'questions' then qp when 'simulators' then sp else qp + sp + hp end as total from t
  )
  select row_number() over (order by sc.total desc, sc.user_id), sc.user_id,
    case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
         when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
         else split_part(trim(p.full_name), ' ', 1) || ' '
              || left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    sc.total, sc.qp, sc.sp, sc.hp, sc.hrs, sc.user_id = auth.uid()
  from sc left join public.profiles p on p.id = sc.user_id
  where sc.total > 0
  order by 1
  limit least(greatest(_limit, 1), 100)
$$;
revoke all on function public.get_ranking_section(text, integer) from public;
grant execute on function public.get_ranking_section(text, integer) to authenticated;
