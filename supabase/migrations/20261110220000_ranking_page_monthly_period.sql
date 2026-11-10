-- Ranking por mês: a mesma classificação Geral/Questões/Simulados, recortada para o mês
-- vigente (fuso do Acre). Reaproveita score_events(_since), já usada por rank_table() para o
-- mesmo recorte. _period é opcional (default 'all'); chamadas antigas continuam funcionando.
-- Mantém critérios, elegibilidade e desempate; só muda a janela de tempo considerada.
create or replace function public.get_ranking_page(
  _kind text default 'general', _page integer default 1,
  _page_size integer default 20, _search text default '', _period text default 'all'
) returns jsonb
language plpgsql stable security definer set search_path = public
as $$
declare
  result jsonb;
  size integer := least(greatest(coalesce(_page_size, 20), 1), 100);
  requested integer := greatest(coalesce(_page, 1), 1);
  needle text := public._ranking_search_key(left(trim(coalesce(_search, '')), 100));
  since timestamptz;
begin
  if auth.uid() is null then raise insufficient_privilege using message = 'Authentication required'; end if;
  if _kind not in ('general', 'questions', 'simulators') or _kind is null then
    raise invalid_parameter_value using message = 'Invalid ranking section';
  end if;
  if _period not in ('all', 'month') or _period is null then
    raise invalid_parameter_value using message = 'Invalid ranking period';
  end if;
  since := case _period
    when 'month' then date_trunc('month', now() at time zone 'America/Rio_Branco') at time zone 'America/Rio_Branco'
    else '-infinity'::timestamptz end;
  with events as materialized (select * from public.score_events(since)),
  participants as (
    select p.id as user_id,
      case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
        when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
        else split_part(trim(p.full_name), ' ', 1) || ' ' || left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end as display_name,
      coalesce(e.qp, 0) as qp, coalesce(e.sp, 0) as sp, coalesce(e.fp, 0) as fp, coalesce(e.ep, 0) as ep,
      coalesce(e.hrs, 0) as hrs, coalesce(e.qn, 0) as qn, coalesce(e.qc, 0) as qc, coalesce(e.sn, 0) as sn
    from public.profiles p left join events e on e.user_id = p.id
    where not exists (select 1 from public.user_roles ur where ur.user_id = p.id and ur.role = 'admin')
  ), scored as (
    select p.*, p.qp + p.sp + p.fp + p.ep as total,
      case _kind when 'questions' then p.qp when 'simulators' then p.sp else p.qp + p.sp + p.fp + p.ep end as points
    from participants p
  ), eligible as (
    select s.*, rank() over (order by s.points desc,
      case when _kind <> 'simulators' then coalesce(s.qc::numeric / nullif(s.qn, 0), -1) end desc nulls last,
      case when _kind <> 'simulators' then s.qc end desc nulls last,
      case when _kind <> 'simulators' then s.qn end desc nulls last,
      case when _kind = 'simulators' then s.sn end desc nulls last,
      case when _kind = 'general' then s.sp end desc nulls last
    ) as position
    from scored s where _kind = 'general' or s.points > 0
  ), public_entries as (
    select e.position as rank_position, s.user_id, s.display_name, s.points,
      s.qp as question_points, s.sp as simulator_points, 0 as study_points, s.fp + s.ep as extra_points,
      s.hrs as study_hours, s.qn as questions,
      case when s.qn > 0 then round(100.0 * s.qc / s.qn)::integer else 0 end as accuracy,
      s.sn as simulators, s.user_id = auth.uid() as is_me, lv.stars, lv.level_name
    from scored s left join eligible e using (user_id)
    cross join lateral public.level_of(s.total) lv
  ), matches as (
    select * from public_entries e where e.rank_position is not null
      and (needle = '' or strpos(public._ranking_search_key(e.display_name), needle) > 0)
  ), counts as (
    select count(*) as total, (select count(*) from eligible) as participants from matches
  ), paging as (
    select c.*, greatest(1, ceil(c.total::numeric / size)::integer) as page_count,
      least(requested, greatest(1, ceil(c.total::numeric / size)::integer)) as page
    from counts c
  ), page_entries as (
    select e.* from matches e order by e.rank_position, e.user_id
    limit size offset (select (p.page::bigint - 1) * size from paging p)
  )
  select jsonb_build_object(
    'entries', coalesce((select jsonb_agg(to_jsonb(e) order by e.rank_position, e.user_id) from page_entries e), '[]'::jsonb),
    'my_entry', (select to_jsonb(e) from public_entries e where e.is_me),
    'total', p.total, 'participants', p.participants, 'page', p.page, 'page_size', size, 'page_count', p.page_count
  ) into result from paging p;
  return result;
end $$;
revoke all on function public.get_ranking_page(text, integer, integer, text, text) from public, anon;
grant execute on function public.get_ranking_page(text, integer, integer, text, text) to authenticated;
