-- Identidade física e primeira resposta compartilhada por todas as modalidades.
-- Não altera conteúdo, gabaritos ou resultados históricos. ranking_first NULL = legado.
-- A reserva única é append-only; duas transações disputando a mesma questão não pontuam duas vezes.
begin;
lock table public.question_training_responses, public.simulator_responses in share row exclusive mode;

alter table public.question_training_responses add column if not exists question_table text;
alter table public.question_training_responses add column if not exists ranking_first boolean;
alter table public.simulator_responses add column if not exists question_table text;
alter table public.simulator_responses add column if not exists ranking_first boolean;

create table public.question_first_answers (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_table text not null check (question_table in ('official_exam_questions','board_exam_questions','curated_question_catalog','question_bank')),
  question_id uuid not null,
  response_id uuid not null,
  modality text not null check (modality in ('trainer','simulator')),
  selected_answer text not null,
  is_correct boolean not null,
  answered_at timestamptz not null,
  primary key (user_id, question_table, question_id)
);
alter table public.question_first_answers enable row level security;
create policy "Read own first answers" on public.question_first_answers for select to authenticated using (user_id = auth.uid());
revoke all on public.question_first_answers from anon, authenticated;
grant select on public.question_first_answers to authenticated;

-- O namespace de uma resposta antiga só é inferido quando não existe conflito entre tabelas.
create function public.question_origin_candidates(_source text, _id uuid)
returns table (question_table text, official_answer text)
language sql stable security definer set search_path = public as $$
  select 'official_exam_questions', q.official_answer from public.official_exam_questions q where _source = 'official' and q.id = _id
  union all select 'board_exam_questions', q.official_answer from public.board_exam_questions q where _source = 'official' and q.id = _id
  union all select 'curated_question_catalog', q.official_answer from public.curated_question_catalog q where _source = 'curated' and q.id = _id
  union all select 'question_bank', q.official_answer from public.question_bank q where _source = 'personal' and q.id = _id
$$;
revoke all on function public.question_origin_candidates(text, uuid) from public, anon, authenticated;

do $$ begin
  if exists (
    select 1 from (
      select question_source, question_id from public.question_training_responses
      union select question_source, question_id from public.simulator_responses where selected_answer is not null
    ) r where (select count(*) from public.question_origin_candidates(r.question_source, r.question_id)) > 1
  ) then
    raise exception 'Ambiguous legacy question origins: audit source/table collisions before applying this migration';
  end if;
end $$;

insert into public.question_first_answers
select distinct on (e.user_id, c.question_table, e.question_id)
  e.user_id, c.question_table, e.question_id, e.id, e.modality, e.selected_answer, e.is_correct, e.at
from (
  select t.user_id, t.question_source, t.question_id, t.id, 'trainer'::text as modality,
    t.selected_answer, t.is_correct, t.created_at as at from public.question_training_responses t
  union all
  select r.user_id, r.question_source, r.question_id, r.id, 'simulator', r.selected_answer, r.is_correct, a.finished_at
  from public.simulator_responses r join public.simulator_attempts a on a.id = r.attempt_id
  where r.selected_answer is not null
) e cross join lateral public.question_origin_candidates(e.question_source, e.question_id) c
order by e.user_id, c.question_table, e.question_id, e.at, e.modality, e.id;

create function public.reserve_question_first_answer()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  origin text;
  answer text;
  claim uuid;
  candidates integer;
  owner uuid;
begin
  if tg_op = 'UPDATE' then
    -- Retentativas idempotentes não podem transformar erro em acerto ou trocar a identidade.
    if (to_jsonb(new) - 'asked_for_help') is distinct from (to_jsonb(old) - 'asked_for_help')
       or (coalesce((to_jsonb(old)->>'asked_for_help')::boolean, false) and not coalesce((to_jsonb(new)->>'asked_for_help')::boolean, false)) then
      raise exception 'A saved question response is immutable';
    end if;
    return new;
  end if;
  if auth.uid() is not null and new.user_id is distinct from auth.uid() then
    raise insufficient_privilege using message = 'Response owner does not match session';
  end if;
  -- ON CONFLICT DO NOTHING deve ser idempotente, inclusive antes do gatilho.
  if tg_table_name = 'question_training_responses' then
    if exists(select 1 from public.question_training_responses where id = new.id) then return new; end if;
  else
    select user_id into owner from public.simulator_attempts where id = new.attempt_id;
    if owner is distinct from new.user_id then raise exception 'Attempt owner mismatch'; end if;
    if exists(select 1 from public.simulator_responses where attempt_id = new.attempt_id and question_order = new.question_order) then return new; end if;
  end if;
  select count(*), min(c.question_table), min(c.official_answer) into candidates, origin, answer
  from public.question_origin_candidates(new.question_source, new.question_id) c
  where new.question_table is null or c.question_table = new.question_table;
  if candidates <> 1 then raise exception 'Question origin is missing or ambiguous'; end if;
  new.question_table := origin;
  if origin = 'question_bank' and not exists (
    select 1 from public.question_bank where id = new.question_id and user_id = new.user_id
  ) then
    raise insufficient_privilege using message = 'Personal question owner mismatch';
  end if;
  -- Corrige os campos de resultado no servidor, nunca confiando no cliente.
  new.official_answer := answer;
  new.is_correct := case when new.selected_answer is null then null else new.selected_answer = answer end;
  new.created_at := clock_timestamp();
  new.ranking_first := false;
  if new.selected_answer is null then return new; end if;
  insert into public.question_first_answers(user_id, question_table, question_id, response_id, modality, selected_answer, is_correct, answered_at)
  values(new.user_id, origin, new.question_id, new.id,
    case when tg_table_name = 'simulator_responses' then 'simulator' else 'trainer' end,
    new.selected_answer, new.is_correct, new.created_at)
  on conflict (user_id, question_table, question_id) do nothing
  returning response_id into claim;
  new.ranking_first := claim is not null;
  return new;
end $$;
revoke all on function public.reserve_question_first_answer() from public, anon, authenticated;
create trigger reserve_question_first_answer before insert or update on public.question_training_responses for each row execute function public.reserve_question_first_answer();
create trigger reserve_question_first_answer before insert or update on public.simulator_responses for each row execute function public.reserve_question_first_answer();

create function public.get_question_first_answers()
returns table(question_table text, question_id uuid, selected_answer text, is_correct boolean, answered_at timestamptz, modality text)
language sql stable security definer set search_path = public as $$
  select f.question_table, f.question_id, f.selected_answer, f.is_correct, f.answered_at, f.modality
  from public.question_first_answers f where f.user_id = auth.uid()
  order by f.answered_at, f.question_table, f.question_id
$$;
revoke all on function public.get_question_first_answers() from public, anon;
grant execute on function public.get_question_first_answers() to authenticated;

-- Fórmulas preservadas. Linhas anteriores (ranking_first NULL) mantêm seu cálculo anterior.
create or replace function public.score_events(_since timestamptz default '-infinity')
returns table (
  user_id uuid, qp integer, sp integer, fp integer, ep integer, dp integer, hp integer,
  hrs numeric, qn integer, qc integer, sn integer
)
language sql
stable
security definer
set search_path = public
as $$
  with keys as (
    select id, 'official_exam_questions'::text as tbl, official_answer as ans from public.official_exam_questions where content_status = 'active' and official_answer <> 'X'
    union all select id, 'curated_question_catalog', official_answer from public.curated_question_catalog where content_status = 'active' and official_answer <> 'X'
    union all select id, 'board_exam_questions', official_answer from public.board_exam_questions where content_status = 'active' and official_answer <> 'X'
  ),
  tr as (
    select t.user_id, case when t.question_table is null then t.question_id::text else t.question_table || ':' || t.question_id::text end as question_id, t.created_at as at, (t.selected_answer = k.ans) as ok,
           t.asked_for_help as help, null::uuid as attempt_id, 'q'::text as kind
    from public.question_training_responses t
    join keys k on k.id = t.question_id and (t.question_table is null or t.question_table = k.tbl)
    where t.question_source <> 'personal' and t.response_seconds >= 4 and (t.ranking_first is null or t.ranking_first)
  ),
  sr as (
    select r.user_id, case when r.question_table is null then r.question_id::text else r.question_table || ':' || r.question_id::text end as question_id, a.finished_at as at, (r.selected_answer = k.ans) as ok,
           false as help, r.attempt_id, 's'::text as kind,
           a.duration_seconds, (select count(*) from public.simulator_responses rr where rr.attempt_id = r.attempt_id and rr.selected_answer is not null) as answered
    from public.simulator_responses r
    join public.simulator_attempts a on a.id = r.attempt_id
    join keys k on k.id = r.question_id and (r.question_table is null or r.question_table = k.tbl)
    where r.selected_answer is not null and (r.ranking_first is null or r.ranking_first)
  ),
  sa as (
    select user_id, question_id, at, ok, help, attempt_id, kind from sr where duration_seconds >= 10 * answered
  ),
  first_answer as (
    select distinct on (e.user_id, e.question_id) e.*
    from (select * from tr union all select * from sa) e
    order by e.user_id, e.question_id, e.at
  ),
  q_spaced as (
    select f.*, lag(f.at) over (partition by f.user_id order by f.at) as prev_at
    from first_answer f where f.kind = 'q'
  ),
  q_valid as (
    select x.*, row_number() over (partition by x.user_id, ((x.at at time zone 'America/Rio_Branco')::date) order by x.at) as rn
    from q_spaced x
    where x.prev_at is null or x.at - x.prev_at >= interval '4 seconds'
  ),
  qday as (
    select v.user_id, ((v.at at time zone 'America/Rio_Branco')::date) as d,
           round(greatest(0, sum(case when v.ok then (case when v.help then 1 else 3 end) else -2 end))
                 * least(1, greatest(0, ((count(*) filter (where v.ok))::numeric / count(*) - 0.5) / 0.2)))::int as pts,
           count(*)::int as n, (count(*) filter (where v.ok))::int as c
    from q_valid v
    where v.rn <= 100 and v.at >= _since
    group by 1, 2
  ),
  satt as (
    select f.user_id, f.attempt_id, count(*)::int as n, (count(*) filter (where f.ok))::int as c,
           round(greatest(0, 3 * count(*) filter (where f.ok) - 2 * count(*) filter (where not f.ok))
                 * least(1, greatest(0, ((count(*) filter (where f.ok))::numeric / count(*) - 0.5) / 0.2)))::int as base
    from first_answer f
    where f.kind = 's' and f.at >= _since
    group by 1, 2
  ),
  sim as (
    select s.user_id, s.n, s.c,
           s.base + case when s.n >= 20 and s.c::numeric / s.n >= 0.9 then 100
                         when s.n >= 20 and s.c::numeric / s.n >= 0.8 then 50
                         when s.n >= 20 and s.c::numeric / s.n >= 0.7 then 25 else 0 end as pts
    from satt s
  ),
  std as (
    select ss.user_id, ss.study_date as d, sum(ss.active_seconds)::bigint as secs
    from public.study_sessions ss
    where _since = '-infinity' or ss.started_at >= _since
    group by 1, 2
  ),
  fl as (
    select fr.user_id, least(count(distinct fr.card_id), 50)::int as n
    from public.flashcard_reviews fr
    where fr.rating <> 'again' and fr.reviewed_at >= _since
    group by fr.user_id, ((fr.reviewed_at at time zone 'America/Rio_Branco')::date)
  ),
  es as (
    select x.user_id, count(*)::int as n
    from (
      select e.user_id, row_number() over (partition by e.user_id, ((e.created_at at time zone 'America/Rio_Branco')::date) order by e.created_at) as rn
      from public.user_essays e
      where e.created_at >= _since
        and coalesce(array_length(regexp_split_to_array(trim(e.body), '\s+'), 1), 0) >= 150
    ) x
    where x.rn = 1
    group by x.user_id
  ),
  active_days as (
    select user_id, d from std where secs >= 1200
    union select user_id, d from qday where n >= 10
  ),
  users as (
    select user_id from qday union select user_id from sim union select user_id from std
    union select user_id from fl union select user_id from es
  ),
  qa as (select user_id, sum(pts)::int as pts, sum(n)::int as n, sum(c)::int as c from qday group by user_id),
  sm as (select user_id, sum(pts)::int as pts, sum(n)::int as n, sum(c)::int as c, count(*)::int as atts from sim group by user_id),
  sd as (select user_id, (sum(least(secs, 10800)) / 720)::int as pts, sum(secs) as secs from std group by user_id),
  fa as (select user_id, sum(n)::int as pts from fl group by user_id),
  ea as (select user_id, (n * 20)::int as pts from es),
  da as (select user_id, (count(*) * 5)::int as pts from active_days group by user_id)
  select u.user_id,
         coalesce(qa.pts, 0), coalesce(sm.pts, 0), coalesce(fa.pts, 0), coalesce(ea.pts, 0), coalesce(da.pts, 0), coalesce(sd.pts, 0),
         round(coalesce(sd.secs, 0) / 3600.0, 1),
         coalesce(qa.n, 0) + coalesce(sm.n, 0), coalesce(qa.c, 0) + coalesce(sm.c, 0), coalesce(sm.atts, 0)
  from users u
  left join qa using (user_id) left join sm using (user_id) left join sd using (user_id)
  left join fa using (user_id) left join ea using (user_id) left join da using (user_id)
  where not exists (select 1 from public.user_roles ur where ur.user_id = u.user_id and ur.role = 'admin')
$$;
revoke all on function public.score_events(timestamptz) from public, anon, authenticated;


-- Somente o dono lê a pontuação elegível desta tentativa, separada da sua nota.
create function public.get_simulator_ranking_result(_attempt uuid)
returns jsonb language sql stable security definer set search_path = public as $$
  with attempt as (
    select * from public.simulator_attempts where id = _attempt and user_id = auth.uid()
  ), eligible as (
    select r.*, (r.selected_answer = (select c.official_answer from public.question_origin_candidates(r.question_source, r.question_id) c where c.question_table = r.question_table)) as ranking_correct from public.simulator_responses r join attempt a on a.id = r.attempt_id
    where r.selected_answer is not null and r.ranking_first
      and exists (
        select 1 from (
          select 'official_exam_questions'::text as tbl, id from public.official_exam_questions where content_status = 'active' and official_answer <> 'X'
          union all select 'board_exam_questions', id from public.board_exam_questions where content_status = 'active' and official_answer <> 'X'
          union all select 'curated_question_catalog', id from public.curated_question_catalog where content_status = 'active' and official_answer <> 'X'
        ) k where k.tbl = r.question_table and k.id = r.question_id
      )
  ), counts as (
    select count(*)::int as n, (count(*) filter (where ranking_correct))::int as c from eligible
  ), all_responses as (
    select count(*)::int as answered, (count(*) filter(where not ranking_first))::int as repeated,
      bool_and(ranking_first is not null) as complete
    from public.simulator_responses r join attempt a on a.id = r.attempt_id
    where r.selected_answer is not null
  )
  select case when not coalesce(r.complete, true) then null else jsonb_build_object(
    'eligible', c.n, 'repeated', r.repeated,
    'points', case when c.n = 0 or a.duration_seconds < 10 * r.answered then 0 else
      round(greatest(0, 3 * c.c - 2 * (c.n - c.c)) * least(1, greatest(0, (c.c::numeric / c.n - 0.5) / 0.2)))::int
      + case when c.n >= 20 and c.c::numeric / c.n >= 0.9 then 100
             when c.n >= 20 and c.c::numeric / c.n >= 0.8 then 50
             when c.n >= 20 and c.c::numeric / c.n >= 0.7 then 25 else 0 end end
  ) end from attempt a cross join counts c cross join all_responses r
$$;
revoke all on function public.get_simulator_ranking_result(uuid) from public, anon;
grant execute on function public.get_simulator_ranking_result(uuid) to authenticated;

commit;
