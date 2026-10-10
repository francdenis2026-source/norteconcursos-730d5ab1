-- Correção do ranking: (1) get_ranking_profile não existia no banco (a criação falhava por depender de
-- achievements.sort_order, que só existe se a migration de medalhas foi aplicada) — agora ordena por nome;
-- (2) "revoke from public" não tira o acesso do papel anon no Supabase: ranking_totals/level_of/get_ranking_*
-- estavam legíveis sem login. Agora só usuários logados chamam as duas funções do ranking.
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
    coalesce((select array_agg(ac.name order by ac.name) from public.user_achievements ua
              join public.achievements ac on ac.id = ua.achievement_id where ua.user_id = t.user_id), '{}')
  from t
  left join public.profiles p on p.id = t.user_id
  cross join lateral public.level_of(t.general) lv
  where t.user_id = _user and auth.uid() is not null
$$;

revoke all on function public.ranking_totals() from public, anon, authenticated;
revoke all on function public.level_of(integer) from public, anon;
grant execute on function public.level_of(integer) to authenticated;
revoke all on function public.get_ranking_section(text, integer) from public, anon;
grant execute on function public.get_ranking_section(text, integer) to authenticated;
revoke all on function public.get_ranking_profile(uuid) from public, anon;
grant execute on function public.get_ranking_profile(uuid) to authenticated;
