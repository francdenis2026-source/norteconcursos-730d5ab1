-- Pontos fortes no ranking: disciplinas com maior aproveitamento de cada candidato
-- (treinador, área de estudo PC-AC e simulados). Mínimo de 3 respostas por disciplina.
-- Expõe só nome da disciplina, % e quantidade; nunca IDs nem conteúdo das respostas.
create or replace function public._ranking_strengths_of(_uid uuid, _limit integer default 3)
returns jsonb language sql stable security definer set search_path = public as $$
  with answers as (
    select trim(subject) as s, is_correct as ok from public.question_training_responses
      where user_id = _uid and question_source <> 'personal' and coalesce(trim(subject), '') <> ''
    union all
    select trim(subject_name), is_correct from public.pcac_study_responses
      where user_id = _uid and coalesce(trim(subject_name), '') <> ''
    union all
    select trim(subject), is_correct from public.simulator_responses
      where user_id = _uid and selected_answer is not null and is_correct is not null and coalesce(trim(subject), '') <> ''
  ), agg as (
    select s, count(*)::int as n, round(100.0 * count(*) filter (where ok) / count(*))::int as pct
    from answers group by s having count(*) >= 3
  )
  select coalesce(jsonb_agg(jsonb_build_object('s', s, 'pct', pct, 'n', n) order by pct desc, n desc), '[]'::jsonb)
  from (select * from agg order by pct desc, n desc limit greatest(1, least(coalesce(_limit, 3), 6))) t;
$$;
revoke all on function public._ranking_strengths_of(uuid, integer) from public, anon, authenticated;

-- Perfil do ranking (usuário logado vendo qualquer candidato não-admin).
create or replace function public.get_ranking_strengths(_user uuid)
returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  if auth.uid() is null then raise insufficient_privilege using message = 'Authentication required'; end if;
  if exists (select 1 from public.user_roles where user_id = _user and role = 'admin') then return '[]'::jsonb; end if;
  return public._ranking_strengths_of(_user, 4);
end $$;
revoke all on function public.get_ranking_strengths(uuid) from public, anon;
grant execute on function public.get_ranking_strengths(uuid) to authenticated;

-- Homepage: pontos fortes dos 4 primeiros, na mesma ordem de get_public_ranking_showcase().
create or replace function public.get_public_ranking_strengths()
returns table(rank_position bigint, strengths jsonb)
language sql stable security definer set search_path = public as $$
  with scores as (
    select p.id as user_id, coalesce(e.qp,0) qp, coalesce(e.sp,0) sp, coalesce(e.fp,0) fp, coalesce(e.ep,0) ep,
           coalesce(e.qn,0) qn, coalesce(e.qc,0) qc
    from public.profiles p left join public.score_events() e on e.user_id = p.id
    where not exists (select 1 from public.user_roles ur where ur.user_id = p.id and ur.role = 'admin')
  ), ranked as (
    select s.user_id, rank() over (order by (s.qp+s.sp+s.fp+s.ep) desc, coalesce(s.qc::numeric/nullif(s.qn,0),-1) desc,
                                    s.qc desc, s.qn desc, s.sp desc) as pos
    from scores s where s.qp+s.sp+s.fp+s.ep > 0
  )
  select r.pos, public._ranking_strengths_of(r.user_id, 3) from ranked r order by r.pos, r.user_id limit 4;
$$;
revoke all on function public.get_public_ranking_strengths() from public, anon, authenticated;
grant execute on function public.get_public_ranking_strengths() to anon, authenticated;
notify pgrst, 'reload schema';
