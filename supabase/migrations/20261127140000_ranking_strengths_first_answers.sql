-- Pontos fortes do ranking: mesma regra do histórico e do ranking (uma resposta por questão, a primeira).
-- Antes somava todas as tentativas e três tabelas, e a % não batia com a conta do candidato.
-- Agora: primeira resposta de cada questão (treinador, simulados e área PC-AC antiga) e disciplina
-- vinda do cadastro da questão (nome único), com mínimo de 3 respostas.
-- Ordem pelo limite inferior de Wilson (80%): 95% em 200 questões vale mais que 100% em 3.
create or replace function public._ranking_strengths_of(_uid uuid, _limit integer default 3)
returns jsonb language sql stable security definer set search_path = public as $$
  with raw as (
    select t.question_id::text as qid, t.created_at as at, t.is_correct as ok,
           coalesce(nullif(trim(q.subject), ''), nullif(trim(t.subject), '')) as subj
    from public.question_training_responses t
    left join lateral (
      select z.subject from (
        select b.subject from public.board_exam_questions b where b.id = t.question_id
        union all select o.subject from public.official_exam_questions o where o.id = t.question_id
        union all select c.subject from public.curated_question_catalog c where c.id = t.question_id
      ) z limit 1
    ) q on true
    where t.user_id = _uid and t.question_source <> 'personal' and t.selected_answer is not null
    union all
    select r.question_id::text, a.finished_at, r.is_correct,
           coalesce(nullif(trim(q.subject), ''), nullif(trim(r.subject), ''))
    from public.simulator_responses r
    join public.simulator_attempts a on a.id = r.attempt_id
    left join lateral (
      select z.subject from (
        select b.subject from public.board_exam_questions b where b.id = r.question_id
        union all select o.subject from public.official_exam_questions o where o.id = r.question_id
        union all select c.subject from public.curated_question_catalog c where c.id = r.question_id
      ) z limit 1
    ) q on true
    where a.user_id = _uid and r.selected_answer is not null and r.is_correct is not null
    union all
    select 'k:' || p.question_key, p.answered_at, p.is_correct, nullif(trim(p.subject_name), '')
    from public.pcac_study_responses p
    where p.user_id = _uid
  ), first_ans as (
    select distinct on (qid) qid, ok, subj from raw order by qid, at
  ), agg as (
    select lower(subj) as k, mode() within group (order by subj) as s,
           count(*)::int as n, (count(*) filter (where ok))::int as c
    from first_ans
    where subj is not null and lower(subj) <> 'estudo pc-ac'
    group by lower(subj) having count(*) >= 3
  ), scored as (
    select s, n, c, round(100.0 * c / n)::int as pct,
           ((c::float8 / n) + 0.8192 / n - 1.28 * sqrt(((c::float8 / n) * (1 - c::float8 / n) + 0.4096 / n) / n)) / (1 + 1.6384 / n) as score
    from agg
  )
  select coalesce(jsonb_agg(jsonb_build_object('s', s, 'pct', pct, 'n', n, 'c', c) order by score desc, n desc), '[]'::jsonb)
  from (select * from scored order by score desc, n desc limit greatest(1, least(coalesce(_limit, 3), 6))) t;
$$;
revoke all on function public._ranking_strengths_of(uuid, integer) from public, anon, authenticated;
notify pgrst, 'reload schema';
