-- Server-side grading and daily quota for the public guest challenge.
-- The session token is an unguessable bearer credential stored by the browser.
-- The daily challenge still shares the same ten selected questions for all visitors.

create table if not exists public.daily_guest_sessions (
  token uuid primary key default gen_random_uuid(),
  day date not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '36 hours')
);

create table if not exists public.daily_guest_answers (
  id bigint generated always as identity primary key,
  session_token uuid not null references public.daily_guest_sessions(token) on delete cascade,
  day date not null,
  question_id uuid not null references public.official_exam_questions(id),
  selected_answer text not null check (selected_answer in ('C','E')),
  is_correct boolean not null,
  answered_at timestamptz not null default now(),
  unique (session_token, question_id)
);

create index if not exists daily_guest_answers_day_idx
  on public.daily_guest_answers(day, session_token);

alter table public.daily_guest_sessions enable row level security;
alter table public.daily_guest_answers enable row level security;
revoke all on public.daily_guest_sessions from anon, authenticated;
revoke all on public.daily_guest_answers from anon, authenticated;

create or replace function public.start_daily_guest_session(p_existing_token uuid default null)
returns uuid
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_day date := public.get_current_acre_date();
  v_token uuid;
begin
  if p_existing_token is not null then
    select s.token into v_token
    from public.daily_guest_sessions s
    where s.token = p_existing_token
      and s.day = v_day
      and s.expires_at > now()
    limit 1;
    if v_token is not null then return v_token; end if;
  end if;

  insert into public.daily_guest_sessions(day)
  values (v_day)
  returning token into v_token;
  return v_token;
end;
$function$;

create or replace function public.get_daily_guest_progress(p_session_token uuid)
returns table(used integer, answers jsonb)
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_day date := public.get_current_acre_date();
begin
  if p_session_token is null then
    raise exception 'Sessão de visitante inválida' using errcode = '28000';
  end if;
  if not exists (
    select 1 from public.daily_guest_sessions s
    where s.token = p_session_token and s.day = v_day and s.expires_at > now()
  ) then
    raise exception 'Sessão expirada; inicie uma nova rodada' using errcode = '28000';
  end if;

  return query
    select count(*)::integer,
      coalesce(jsonb_agg(jsonb_build_object(
        'id', a.question_id,
        'correct', a.is_correct
      ) order by a.answered_at), '[]'::jsonb)
    from public.daily_guest_answers a
    where a.session_token = p_session_token and a.day = v_day;
end;
$function$;

create or replace function public.grade_daily_guest_answer(
  p_session_token uuid,
  p_question_id uuid,
  p_selected_answer text
)
returns table(
  question_id uuid,
  selected_answer text,
  official_answer text,
  is_correct boolean,
  explanation text,
  legal_basis jsonb,
  law_version_checked_at timestamptz,
  used integer
)
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_day date := public.get_current_acre_date();
  v_answer text;
  v_explanation text;
  v_basis jsonb;
  v_checked timestamptz;
  v_used integer;
  v_correct boolean;
begin
  if p_session_token is null or p_question_id is null
     or p_selected_answer not in ('C','E') then
    raise exception 'Resposta ou sessão inválida' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtext('norte-guest-grade'), hashtext(p_session_token::text));

  if not exists (
    select 1 from public.daily_guest_sessions s
    where s.token = p_session_token and s.day = v_day and s.expires_at > now()
  ) then
    raise exception 'Sessão expirada; inicie uma nova rodada' using errcode = '28000';
  end if;

  if not exists (
    select 1 from public.daily_guest_question_items i
    where i.day = v_day and i.question_id = p_question_id
  ) then
    raise exception 'Questão não pertence ao desafio de hoje' using errcode = '42501';
  end if;

  select count(*)::integer into v_used
  from public.daily_guest_answers a
  where a.session_token = p_session_token and a.day = v_day;

  if v_used >= 10 then
    raise exception 'Limite diário de 10 respostas atingido' using errcode = '54000';
  end if;

  select p.official_answer, p.review_note, p.legal_basis, p.law_version_checked_at
    into v_answer, v_explanation, v_basis, v_checked
  from public.official_exam_questions p
  where p.id = p_question_id and p.content_status = 'active'
    and p.official_answer in ('C','E')
    and p.review_note is not null;

  if v_answer is null then
    raise exception 'Gabarito não disponível para esta questão' using errcode = 'P0002';
  end if;

  v_correct := (p_selected_answer = v_answer);

  insert into public.daily_guest_answers(
    session_token, day, question_id, selected_answer, is_correct
  ) values (
    p_session_token, v_day, p_question_id, p_selected_answer, v_correct
  );

  v_used := v_used + 1;
  return query select p_question_id, p_selected_answer, v_answer, v_correct,
    v_explanation, v_basis, v_checked, v_used;
end;
$function$;

revoke all on function public.start_daily_guest_session(uuid) from public;
revoke all on function public.get_daily_guest_progress(uuid) from public;
revoke all on function public.grade_daily_guest_answer(uuid,uuid,text) from public;
grant execute on function public.start_daily_guest_session(uuid) to anon, authenticated;
grant execute on function public.get_daily_guest_progress(uuid) to anon, authenticated;
grant execute on function public.grade_daily_guest_answer(uuid,uuid,text) to anon, authenticated;

-- The return type remains the existing composite for frontend compatibility,
-- but answer keys, explanations, legal references and extraction are redacted.
-- The current daily set is populated by the existing deterministic rotation
-- logic in the function already installed on the project.
create or replace function public.get_daily_guest_questions(p_limit integer default 10)
returns setof public.official_exam_questions
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_day date := public.get_current_acre_date();
  v_limit integer := least(greatest(coalesce(p_limit, 10), 0), 10);
  v_question public.official_exam_questions;
  v_item record;
  v_pool jsonb;
  v_pick record;
  v_index integer;
  v_counts record;
  v_tier integer;
  v_x integer;
  v_combos text[] := '{}';
  v_ids uuid[] := '{}';
  v_keys text[] := '{}';
  v_kinds text[] := '{}';
  v_police boolean[] := '{}';
  v_subjects text[] := '{}';
  v_careers text[] := '{}';
  v_answers text[] := '{}';
begin
  if v_limit = 0 then return; end if;
  perform pg_advisory_xact_lock(hashtext('norte-daily-guest-v2'), v_day - date '2000-01-01');

  if not exists (select 1 from public.daily_guest_question_sets where day = v_day) then
    select coalesce(jsonb_agg(to_jsonb(c)), '[]'::jsonb) into v_pool
    from (
      select distinct on (p.content_key)
        p.question_id as id, p.content_key as key, p.question_format as kind,
        p.police, p.discipline as subject, p.career, p.exam_year as year,
        p.official_answer as answer,
        (select max(h.day) from public.daily_guest_question_items h
         where (h.content_key = p.content_key or h.question_id = p.question_id)
           and h.day < v_day) as last_served
      from public._guest_question_pool() p
      order by p.content_key, p.exam_year desc, p.question_id
    ) c;

    for v_tier in 1..3 loop
      select
        count(*) filter (where c.kind = 'multiple_choice' and c.police) as pm,
        count(*) filter (where c.kind = 'true_false' and c.police) as pc,
        count(*) filter (where c.kind = 'multiple_choice' and not c.police) as om,
        count(*) filter (where c.kind = 'true_false' and not c.police) as oc
      into v_counts
      from jsonb_to_recordset(v_pool) as c(kind text, police boolean, year integer, last_served date)
      where (v_tier >= 2 or c.year >= extract(year from v_day)::integer - 2)
        and (v_tier >= 3 or c.last_served is null);
      select n into v_x from generate_series(0, 4) n
      where n <= v_counts.om and 4 - n <= v_counts.oc
        and 5 - n <= v_counts.pm and 1 + n <= v_counts.pc
      order by abs(n - 2), n limit 1;
      exit when found;
    end loop;
    v_x := coalesce(v_x, 2);

    for v_index in 1..10 loop
      select c.* into v_pick
      from jsonb_to_recordset(v_pool) as c(
        id uuid, key text, kind text, police boolean, subject text,
        career text, year integer, answer text, last_served date
      )
      where not (c.key = any(v_keys))
      order by
        coalesce(c.last_served, '-infinity'::date),
        (cardinality(array_positions(v_combos, c.kind || ':' || c.police::text)) <
          case when c.kind = 'multiple_choice' and c.police then 5 - v_x
               when c.kind = 'multiple_choice' then v_x
               when c.police then 1 + v_x else 4 - v_x end) desc,
        (c.year >= extract(year from v_day)::integer - 2) desc,
        (cardinality(array_positions(v_kinds, c.kind)) < 5) desc,
        (cardinality(array_positions(v_police, c.police)) < case when c.police then 6 else 4 end) desc,
        cardinality(array_positions(v_subjects, c.subject)),
        cardinality(array_positions(v_careers, c.career)),
        cardinality(array_positions(v_answers, c.kind || ':' || c.answer)),
        c.year desc, md5(c.id::text || v_day::text)
      limit 1;
      exit when not found;
      v_combos := array_append(v_combos, v_pick.kind || ':' || v_pick.police::text);
      v_ids := array_append(v_ids, v_pick.id);
      v_keys := array_append(v_keys, v_pick.key);
      v_kinds := array_append(v_kinds, v_pick.kind);
      v_police := array_append(v_police, v_pick.police);
      v_subjects := array_append(v_subjects, v_pick.subject);
      v_careers := array_append(v_careers, v_pick.career);
      v_answers := array_append(v_answers, v_pick.kind || ':' || v_pick.answer);
    end loop;

    if cardinality(v_ids) > 0 then
      insert into public.daily_guest_question_sets(day) values (v_day);
      insert into public.daily_guest_question_items(day, position, question_id, content_key)
      select v_day, n, v_ids[n], v_keys[n] from generate_subscripts(v_ids, 1) n;
    end if;
  end if;

  select coalesce(array_agg(i.question_id order by i.position), '{}'::uuid[])
    into v_ids
  from public.daily_guest_question_items i where i.day = v_day;

  for v_item in
    select q as question, p.question_text as served_text
    from public.daily_guest_question_items i
    join public._guest_question_pool(v_ids) p
      on p.question_id = i.question_id and p.content_key = i.content_key
    join public.official_exam_questions q on q.id = p.question_id
    where i.day = v_day order by i.position limit v_limit
  loop
    v_question := v_item.question;
    v_question.question_text := v_item.served_text;
    v_question.official_answer := null;
    v_question.answer_key_source_id := null;
    v_question.raw_extraction := null;
    v_question.legal_basis := '[]'::jsonb;
    v_question.law_version_checked_at := null;
    v_question.review_note := null;
    v_question.verified_at := null;
    return next v_question;
  end loop;
  return;
end;
$function$;

revoke all on function public.get_daily_guest_questions(integer) from public;
grant execute on function public.get_daily_guest_questions(integer) to anon, authenticated;
