-- O painel do aluno e o histórico mostram a posição via my_rank_summary(), que ainda
-- desempatava por UUID e nunca dividia posição entre empatados — diferente do que o
-- Ranking (get_ranking_page) e o perfil (get_ranking_profile) já fazem desde 30/10/2026
-- (critério por aproveitamento, sem vantagem por ordem de cadastro). Alinha o desempate
-- e passa a dividir a posição em caso de empate, sem alterar pontos ou elegibilidade.
create or replace function public.my_rank_summary(_period text default 'all', _metric text default 'points')
returns table (user_id uuid, rank_position bigint, total_points integer, stars integer, level_name text, completed_simulators integer, best_accuracy numeric)
language sql stable security definer set search_path = public
as $$
  with ranked as (
    select r.*, rank() over (
      order by case when _metric = 'questions' then r.questions else r.points end desc,
        coalesce(r.correct::numeric / nullif(r.questions, 0), -1) desc,
        r.correct desc,
        r.questions desc,
        case when _metric = 'questions' then r.points else r.questions end desc
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
