-- Identidade de questão, primeira tentativa no ranking e histórico de tentativas.
--
-- 1. question_public_code(): código público NC-<prefixo>-<uuid> (mesmo cálculo de src/lib/questionIdentity.ts).
-- 2. question_identity_aliases + question_canonical_map(): cadastros idênticos da mesma prova (ex.:
--    itens comuns a Agente e Papiloscopista na PC-PR 2026) respondem como UMA questão. Duplicatas
--    entre fontes diferentes só são unidas por registro explícito (alias) de um administrador.
-- 3. ranking_first_attempts(): a 1ª tentativa de cada questão, somando Treinador e Simulados.
--    Qualquer tentativa (certa, errada, rápida demais ou de simulado inválido) CONSOME a questão; o
--    que muda é só se ela rende pontos. Repetir depois nunca pontua e não há "tentar até acertar".
--    Antes, uma resposta de Treinador com menos de 4 s era descartada e uma repetição posterior
--    passava a valer como se fosse inédita.
-- 4. score_events(): mesma pontuação de 20261012100000_fair_scoring.sql, lendo ranking_first_attempts().
-- 5. my_answered_questions() e simulator_attempt_ranking(): base do aviso "você já respondeu" e do
--    histórico (pontuação elegível ao ranking, separada da nota da tentativa).
-- 6. simulator_attempt_results: regra de correção e nota de cada tentativa (campos extras gravados pelo
--    app; o resultado essencial continua em simulator_attempts).
-- 7. study_later_items: "Estudar depois"/questões puladas ligadas à conta (antes só no navegador).
--
-- Nada aqui apaga, reescreve ou recalcula respostas; a pontuação continua derivada na leitura.

create or replace function public.question_public_code(_table text, _id uuid)
returns text
language sql
immutable
set search_path = public
as $$
  select 'NC-' || case _table
      when 'official_exam_questions' then 'OF'
      when 'board_exam_questions' then 'BA'
      when 'curated_question_catalog' then 'AU'
      when 'question_bank' then 'PE'
    end || '-' || _id::text
$$;
grant execute on function public.question_public_code(text, uuid) to authenticated;

create or replace function public._normalize_question_text(_text text)
returns text
language sql
immutable
set search_path = public
as $$ select lower(regexp_replace(btrim(coalesce(_text, '')), '\s+', ' ', 'g')) $$;
revoke all on function public._normalize_question_text(text) from public, anon, authenticated;

create table if not exists public.question_identity_aliases (
  question_id uuid primary key,
  canonical_id uuid not null,
  note text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  check (question_id <> canonical_id)
);
alter table public.question_identity_aliases enable row level security;
drop policy if exists "Admins manage question identity aliases" on public.question_identity_aliases;
create policy "Admins manage question identity aliases"
  on public.question_identity_aliases for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
comment on table public.question_identity_aliases is
  'Cadastros comprovadamente iguais de uma mesma questão (inclusive entre tabelas). question_id responde como canonical_id para fins de ranking.';

-- Mapa question_id -> canonical_id das questões ativas com gabarito. Linhas de uma mesma tabela
-- só se unem quando concordam em prova (concurso + ano + banca), gabarito e texto completo
-- (apoio + enunciado + alternativas). Itens que apenas dividem o texto de apoio têm enunciados
-- distintos e nunca se unem. Aliases explícitos têm prioridade.
create or replace function public.question_canonical_map()
returns table (question_id uuid, canonical_id uuid)
language sql
stable
security definer
set search_path = public
as $$
  with fp as (
    select o.id, 'o:' || md5(concat_ws('|', public._normalize_question_text(o.contest_name), o.exam_year::text,
             public._normalize_question_text(o.exam_board), o.official_answer, coalesce(o.support_text_id::text, ''),
             public._normalize_question_text(o.question_text))) as key
    from public.official_exam_questions o
    where o.content_status = 'active' and o.official_answer <> 'X'
    union all
    select b.id, 'b:' || md5(concat_ws('|', public._normalize_question_text(b.contest_name), b.exam_year::text,
             public._normalize_question_text(b.board), b.official_answer, public._normalize_question_text(b.support_text),
             public._normalize_question_text(b.stem), public._normalize_question_text(b.options::text)))
    from public.board_exam_questions b
    where b.content_status = 'active' and b.official_answer <> 'X'
    union all
    select c.id, 'c:' || c.id::text
    from public.curated_question_catalog c
    where c.content_status = 'active' and c.official_answer <> 'X'
  ),
  grouped as (
    select f.id, g.canonical
    from fp f
    join (select key, (array_agg(id order by id::text))[1] as canonical from fp group by key) g on g.key = f.key
  ),
  merged as (
    select id as question_id, canonical as canonical_id, 0 as prio from grouped
    union all
    select a.question_id, a.canonical_id, 1 from public.question_identity_aliases a
  )
  select distinct on (m.question_id) m.question_id, m.canonical_id
  from merged m
  order by m.question_id, m.prio desc
$$;
revoke all on function public.question_canonical_map() from public, anon, authenticated;

-- Pontos de uma tentativa de simulador a partir das respostas que contam (n) e dos acertos (c).
create or replace function public.simulator_points(_n integer, _c integer)
returns integer
language sql
immutable
set search_path = public
as $$
  select case when coalesce(_n, 0) <= 0 then 0 else
    round(greatest(0, 3 * _c - 2 * (_n - _c))
          * least(1, greatest(0, (_c::numeric / _n - 0.5) / 0.2)))::int
    + case when _n >= 20 and _c::numeric / _n >= 0.9 then 100
           when _n >= 20 and _c::numeric / _n >= 0.8 then 50
           when _n >= 20 and _c::numeric / _n >= 0.7 then 25 else 0 end
  end
$$;
revoke all on function public.simulator_points(integer, integer) from public, anon, authenticated;

-- A 1ª tentativa de cada (usuário, questão canônica), de qualquer modalidade.
-- valid = a tentativa pode render pontos (Treinador: >= 4 s; Simulador: duração >= 10 s por resposta).
create or replace function public.ranking_first_attempts()
returns table (
  user_id uuid, question_id uuid, at timestamptz, ok boolean, help boolean,
  attempt_id uuid, kind text, valid boolean
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
  canon as (select * from public.question_canonical_map()),
  tr as (
    select t.user_id, coalesce(c.canonical_id, t.question_id) as question_id, t.created_at as at,
           (t.selected_answer = k.ans) as ok, t.asked_for_help as help, null::uuid as attempt_id,
           'q'::text as kind, (t.response_seconds >= 4) as valid, t.id::text as tie
    from public.question_training_responses t
    join keys k on k.id = t.question_id
    left join canon c on c.question_id = t.question_id
    where t.question_source <> 'personal'
  ),
  sr as (
    select r.user_id, coalesce(c.canonical_id, r.question_id) as question_id, a.finished_at as at,
           (r.selected_answer = k.ans) as ok, r.attempt_id,
           (a.duration_seconds >= 10 * count(*) over (partition by r.attempt_id)) as valid, r.id::text as tie
    from public.simulator_responses r
    join public.simulator_attempts a on a.id = r.attempt_id
    join keys k on k.id = r.question_id
    left join canon c on c.question_id = r.question_id
    where r.selected_answer is not null
  ),
  every_attempt as (
    select user_id, question_id, at, ok, help, attempt_id, kind, valid, tie from tr
    union all
    select user_id, question_id, at, ok, false, attempt_id, 's'::text, valid, tie from sr
  )
  select distinct on (e.user_id, e.question_id)
         e.user_id, e.question_id, e.at, e.ok, e.help, e.attempt_id, e.kind, e.valid
  from every_attempt e
  order by e.user_id, e.question_id, e.at, e.tie
$$;
revoke all on function public.ranking_first_attempts() from public, anon, authenticated;

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
  with first_answer as (
    select f.user_id, f.question_id, f.at, f.ok, f.help, f.attempt_id, f.kind
    from public.ranking_first_attempts() f
    where f.valid
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
    select f.user_id, f.attempt_id, count(*)::int as n, (count(*) filter (where f.ok))::int as c
    from first_answer f
    where f.kind = 's' and f.at >= _since
    group by 1, 2
  ),
  sim as (
    select s.user_id, s.n, s.c, public.simulator_points(s.n, s.c) as pts
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

-- Questões que o usuário logado já respondeu (e o que a 1ª tentativa rendeu), por cadastro físico.
-- Todos os cadastros equivalentes (mesma questão em duas linhas) aparecem como respondidos.
create or replace function public.my_answered_questions()
returns table (
  question_id uuid, first_at timestamptz, origin text, was_correct boolean, counts_for_ranking boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(m.question_id, f.question_id), f.at,
         case f.kind when 's' then 'simulator' else 'trainer' end, f.ok, f.valid
  from public.ranking_first_attempts() f
  left join public.question_canonical_map() m on m.canonical_id = f.question_id
  where f.user_id = auth.uid() and auth.uid() is not null
$$;
revoke all on function public.my_answered_questions() from public, anon;
grant execute on function public.my_answered_questions() to authenticated;

-- Resumo de ranking de cada tentativa de simulador do usuário logado.
--  answered  = respostas dadas na tentativa; counted = as que eram a 1ª tentativa da questão;
--  repeated  = answered - counted (já respondidas antes, em qualquer modalidade);
--  points    = pontos de ranking elegíveis da tentativa (0 quando a duração não vale para o ranking).
create or replace function public.simulator_attempt_ranking(_attempt_ids uuid[])
returns table (attempt_id uuid, answered integer, counted integer, repeated integer, points integer, attempt_valid boolean)
language sql
stable
security definer
set search_path = public
as $$
  with mine as (
    select a.id, a.duration_seconds,
           (select count(*)::int from public.simulator_responses r where r.attempt_id = a.id and r.selected_answer is not null) as answered
    from public.simulator_attempts a
    where a.user_id = auth.uid() and auth.uid() is not null and a.id = any (_attempt_ids)
  ),
  firsts as (
    select f.attempt_id, count(*)::int as n, (count(*) filter (where f.ok))::int as c
    from public.ranking_first_attempts() f
    where f.user_id = auth.uid() and f.kind = 's' and f.valid and f.attempt_id = any (_attempt_ids)
    group by f.attempt_id
  )
  select m.id, m.answered, coalesce(x.n, 0), greatest(m.answered - coalesce(x.n, 0), 0),
         public.simulator_points(coalesce(x.n, 0), coalesce(x.c, 0)),
         m.duration_seconds >= 10 * m.answered
  from mine m left join firsts x on x.attempt_id = m.id
$$;
revoke all on function public.simulator_attempt_ranking(uuid[]) from public, anon;
grant execute on function public.simulator_attempt_ranking(uuid[]) to authenticated;

-- Regra de correção e nota de cada tentativa. Complementa simulator_attempts, que segue guardando
-- acertos, erros, brancos e aproveitamento.
create table if not exists public.simulator_attempt_results (
  attempt_id uuid primary key references public.simulator_attempts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  scoring_rule text not null check (scoring_rule in ('simple', 'net_one_to_one')),
  rule_verified boolean not null default false,
  score numeric(8,2) not null,
  max_score numeric(8,2) not null,
  answered_count integer not null check (answered_count >= 0),
  skipped_count integer not null default 0 check (skipped_count >= 0),
  created_at timestamptz not null default now()
);
alter table public.simulator_attempt_results enable row level security;
drop policy if exists "Users manage own attempt results" on public.simulator_attempt_results;
create policy "Users manage own attempt results" on public.simulator_attempt_results
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Admins read attempt results" on public.simulator_attempt_results;
create policy "Admins read attempt results" on public.simulator_attempt_results
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
comment on table public.simulator_attempt_results is
  'Nota da tentativa conforme a regra da edição (ou pontuação simples). Não é a pontuação do ranking; esta vem de simulator_attempt_ranking().';

-- "Estudar depois" e questões puladas, ligados à conta.
create table if not exists public.study_later_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_table text not null check (
    question_table in ('official_exam_questions','curated_question_catalog','question_bank','board_exam_questions')
  ),
  question_id uuid not null,
  reason text not null default 'saved' check (reason in ('saved', 'skipped')),
  payload jsonb not null,
  notes text not null default '' check (char_length(notes) <= 4000),
  reviewed boolean not null default false,
  saved_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, question_table, question_id)
);
alter table public.study_later_items enable row level security;
drop policy if exists "Users manage own study later items" on public.study_later_items;
create policy "Users manage own study later items" on public.study_later_items
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_study_later_items_user on public.study_later_items(user_id, reviewed, saved_at desc);
comment on table public.study_later_items is
  'Caderno "Estudar depois" por conta. payload guarda o item como exibido no navegador (pergunta + tópicos conferidos).';
