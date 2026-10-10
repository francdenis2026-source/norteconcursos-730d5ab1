-- Pontuação justa e à prova de fraude do Ranking.
-- Tudo é recalculado NO SERVIDOR a partir do que o aluno fez; nada que o navegador informa sobre acerto vale:
--  * acerto é conferido contra o gabarito oficial (inclusive nos simulados);
--  * só a 1ª resposta de cada questão conta, somando Treinador + Simulados (repetir não rende ponto);
--  * Treinador: resposta com menos de 4 s, ou a menos de 4 s da anterior, não conta; máx. 100 questões pontuadas por dia (Acre);
--    certo sem ajuda +3, certo com ajuda +1, errado -2; o saldo do dia nunca fica negativo e só vale por inteiro com >= 70% de acertos
--    (50% ou menos = 0, proporcional entre 50% e 70%): chutar em massa não paga;
--  * Simulado: a tentativa só vale se durou >= 10 s por questão respondida; certo +3, errado -2, branco 0 (piso 0, mesma regra de acerto);
--    bônus de precisão (+25/+50/+100 com 70/80/90%) só com >= 20 questões inéditas na tentativa;
--  * Estudo: 5 pts por hora ativa, no máximo 3 h por dia; Flashcards: +1 por cartão revisado (sem "errei"), até 50/dia;
--    Redação: +20 por texto de >= 150 palavras, 1 por dia; Constância: +5 por dia de estudo real (>= 20 min ou >= 10 questões).
-- Administradores ficam fora. Semana e mês seguem o fuso do Acre.

drop function if exists public.get_ranking_profile(uuid);
drop function if exists public.get_ranking_section(text, integer);
drop function if exists public.ranking_totals();

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
    select id, official_answer as ans from public.official_exam_questions where content_status = 'active' and official_answer <> 'X'
    union all select id, official_answer from public.curated_question_catalog where content_status = 'active' and official_answer <> 'X'
    union all select id, official_answer from public.board_exam_questions where content_status = 'active' and official_answer <> 'X'
  ),
  tr as (
    select t.user_id, t.question_id, t.created_at as at, (t.selected_answer = k.ans) as ok,
           t.asked_for_help as help, null::uuid as attempt_id, 'q'::text as kind
    from public.question_training_responses t
    join keys k on k.id = t.question_id
    where t.question_source <> 'personal' and t.response_seconds >= 4
  ),
  sr as (
    select r.user_id, r.question_id, a.finished_at as at, (r.selected_answer = k.ans) as ok,
           false as help, r.attempt_id, 's'::text as kind,
           a.duration_seconds, count(*) over (partition by r.attempt_id) as answered
    from public.simulator_responses r
    join public.simulator_attempts a on a.id = r.attempt_id
    join keys k on k.id = r.question_id
    where r.selected_answer is not null
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

create or replace function public.get_ranking_section(_kind text, _limit integer default 20)
returns table (
  rank_position bigint, user_id uuid, display_name text, points integer,
  question_points integer, simulator_points integer, study_points integer, extra_points integer,
  study_hours numeric, questions integer, accuracy integer, simulators integer,
  is_me boolean, stars integer, level_name text
)
language sql
stable
security definer
set search_path = public
as $$
  with sc as (
    select t.*, t.qp + t.sp + t.fp + t.ep + t.dp + t.hp as general,
           case _kind when 'questions' then t.qp when 'simulators' then t.sp else t.qp + t.sp + t.fp + t.ep + t.dp + t.hp end as total
    from public.score_events() t
  )
  select row_number() over (order by sc.total desc, sc.user_id), sc.user_id,
    case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
         when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
         else split_part(trim(p.full_name), ' ', 1) || ' '
              || left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    sc.total, sc.qp, sc.sp, sc.hp, sc.fp + sc.ep + sc.dp, sc.hrs, sc.qn,
    case when sc.qn > 0 then round(100.0 * sc.qc / sc.qn)::int else 0 end, sc.sn,
    sc.user_id = auth.uid(), lv.stars, lv.level_name
  from sc left join public.profiles p on p.id = sc.user_id
  cross join lateral public.level_of(sc.general) lv
  where sc.total > 0
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
language sql
stable
security definer
set search_path = public
as $$
  with t as (
    select x.*, x.qp + x.sp + x.fp + x.ep + x.dp + x.hp as general,
           row_number() over (order by x.qp + x.sp + x.fp + x.ep + x.dp + x.hp desc, x.user_id) as pos,
           count(*) over () as n
    from public.score_events() x
  )
  select
    case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
         when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
         else split_part(trim(p.full_name), ' ', 1) || ' '
              || left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    lv.stars, lv.level_name, t.general, lv.next_min, t.pos, t.n, t.qp, t.sp, t.hp, t.fp, t.ep, t.dp, t.hrs, t.qn,
    case when t.qn > 0 then round(100.0 * t.qc / t.qn)::int else 0 end, t.sn,
    (select coalesce(max(a.accuracy), 0) from public.simulator_attempts a where a.user_id = t.user_id),
    coalesce((select us.longest_streak from public.user_streaks us where us.user_id = t.user_id), 0),
    coalesce((select array_agg(ac.name order by ac.name) from public.user_achievements ua
              join public.achievements ac on ac.id = ua.achievement_id where ua.user_id = t.user_id), '{}')
  from t
  left join public.profiles p on p.id = t.user_id
  cross join lateral public.level_of(t.general) lv
  where t.user_id = _user and auth.uid() is not null
$$;
revoke all on function public.get_ranking_profile(uuid) from public, anon;
grant execute on function public.get_ranking_profile(uuid) to authenticated;

-- Telas antigas (Simulador e Histórico) passam a usar a mesma pontuação do Ranking.
create or replace function public.rank_table(_period text, _metric text)
returns table (
  user_id uuid, points integer, questions integer, correct integer,
  all_points integer, stars integer, level_name text
)
language sql
stable
security definer
set search_path = public
as $$
  with since as (
    select case _period
      when 'week'  then date_trunc('week',  now() at time zone 'America/Rio_Branco') at time zone 'America/Rio_Branco'
      when 'month' then date_trunc('month', now() at time zone 'America/Rio_Branco') at time zone 'America/Rio_Branco'
      else '-infinity'::timestamptz end as t
  ),
  per as (select s.* from public.score_events((select t from since)) s),
  tot as (select s.user_id, s.qp + s.sp + s.fp + s.ep + s.dp + s.hp as all_points from public.score_events() s)
  select p.user_id, (p.qp + p.sp + p.fp + p.ep + p.dp + p.hp)::int, p.qn, p.qc, t.all_points, lv.stars, lv.level_name
  from per p join tot t using (user_id)
  cross join lateral public.level_of(t.all_points) lv
  where p.qp + p.sp + p.fp + p.ep + p.dp + p.hp > 0
$$;
revoke all on function public.rank_table(text, text) from public, anon, authenticated;
