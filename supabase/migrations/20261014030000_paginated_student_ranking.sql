-- Paginação e busca no servidor. A posição é calculada antes da busca;
-- nomes completos e dados de contato nunca entram no resultado público.
create or replace function public._ranking_search_key(input text) returns text
language sql immutable set search_path = public as $$
  select translate(lower(coalesce(input, '')), 'áàâãäéèêëíìîïóòôõöúùûüçñ', 'aaaaaeeeeiiiiooooouuuucn')
$$;
revoke all on function public._ranking_search_key(text) from public, anon, authenticated;

create or replace function public.get_ranking_page(
  _kind text default 'general', _page integer default 1,
  _page_size integer default 20, _search text default ''
) returns jsonb
language plpgsql stable security definer set search_path = public
as $$
declare
  result jsonb;
  size integer := least(greatest(coalesce(_page_size, 20), 1), 100);
  requested integer := greatest(coalesce(_page, 1), 1);
  needle text := public._ranking_search_key(left(trim(coalesce(_search, '')), 100));
begin
  if auth.uid() is null then raise insufficient_privilege using message = 'Authentication required'; end if;
  if _kind not in ('general', 'questions', 'simulators') or _kind is null then
    raise invalid_parameter_value using message = 'Invalid ranking section';
  end if;
  with events as materialized (select * from public.score_events()),
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
    select s.*, row_number() over (order by s.points desc, s.user_id) as position
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
    select e.* from matches e order by e.rank_position
    limit size offset (select (p.page::bigint - 1) * size from paging p)
  )
  select jsonb_build_object(
    'entries', coalesce((select jsonb_agg(to_jsonb(e) order by e.rank_position) from page_entries e), '[]'::jsonb),
    'my_entry', (select to_jsonb(e) from public_entries e where e.is_me),
    'total', p.total, 'participants', p.participants, 'page', p.page, 'page_size', size, 'page_count', p.page_count
  ) into result from paging p;
  return result;
end $$;
revoke all on function public.get_ranking_page(text, integer, integer, text) from public, anon;
grant execute on function public.get_ranking_page(text, integer, integer, text) to authenticated;
