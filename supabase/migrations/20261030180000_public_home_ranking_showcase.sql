-- Public homepage showcase, always derived from the same scoring and tiebreak logic as General ranking.
-- Never expose account IDs, contact details, or full names.
create or replace function public.get_public_ranking_showcase()
returns table(rank_position bigint, display_name text, points integer, accuracy integer, questions integer, simulators integer, stars integer)
language sql stable security definer set search_path = public
as $$
  with scores as (
    select p.id as user_id, p.full_name,
           coalesce(e.qp,0) qp, coalesce(e.sp,0) sp, coalesce(e.fp,0) fp, coalesce(e.ep,0) ep,
           coalesce(e.qn,0) qn, coalesce(e.qc,0) qc, coalesce(e.sn,0) sn
    from public.profiles p
    left join public.score_events() e on e.user_id=p.id
    where not exists (select 1 from public.user_roles ur where ur.user_id=p.id and ur.role='admin')
  ), ranked as (
    select s.*, (s.qp+s.sp+s.fp+s.ep)::integer total,
           rank() over (order by (s.qp+s.sp+s.fp+s.ep) desc,
                        coalesce(s.qc::numeric/nullif(s.qn,0),-1) desc,
                        s.qc desc, s.qn desc, s.sp desc) as pos
    from scores s
    where s.qp+s.sp+s.fp+s.ep > 0
  )
  select r.pos,
    case when coalesce(trim(r.full_name),'')='' then 'Candidato Norte'
         when array_length(regexp_split_to_array(trim(r.full_name),'\s+'),1)=1 then trim(r.full_name)
         else split_part(trim(r.full_name),' ',1)||' '||
              left((regexp_split_to_array(trim(r.full_name),'\s+'))[array_length(regexp_split_to_array(trim(r.full_name),'\s+'),1)],1)||'.'
    end,
    r.total,
    case when r.qn>0 then round(100.0*r.qc/r.qn)::integer else 0 end,
    r.qn, r.sn, lv.stars
  from ranked r
  cross join lateral public.level_of(r.total) lv
  order by r.pos, r.user_id
  limit 4;
$$;
revoke all on function public.get_public_ranking_showcase() from public, anon, authenticated;
grant execute on function public.get_public_ranking_showcase() to anon, authenticated;
