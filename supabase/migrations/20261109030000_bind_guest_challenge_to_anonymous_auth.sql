-- Bind each free challenge session to a Supabase anonymous-auth identity.
-- Supabase Auth applies its own anonymous signup rate limits by IP, so clearing
-- localStorage no longer resets the daily challenge quota for the same identity.
-- This is friction against casual abuse, not a guarantee against distributed bots.

alter table public.daily_guest_sessions
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

create index if not exists daily_guest_sessions_user_day_idx
  on public.daily_guest_sessions(user_id, day);

create or replace function public.start_daily_guest_session(p_existing_token uuid default null)
returns uuid
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_day date := public.get_current_acre_date();
  v_user_id uuid := auth.uid();
  v_token uuid;
begin
  if v_user_id is null then
    raise exception 'Autenticação anônima necessária para iniciar o desafio' using errcode = '28000';
  end if;

  delete from public.daily_guest_sessions
  where expires_at <= now();

  if p_existing_token is not null then
    select s.token into v_token
    from public.daily_guest_sessions s
    where s.token = p_existing_token
      and s.user_id = v_user_id
      and s.day = v_day
      and s.expires_at > now()
    limit 1;
    if v_token is not null then return v_token; end if;
  end if;

  -- One session per authenticated visitor and Acre day. Concurrent tabs
  -- reuse the same session rather than creating additional daily quotas.
  perform pg_advisory_xact_lock(hashtext('norte-guest-start'), hashtext(v_user_id::text || ':' || v_day::text));

  select s.token into v_token
  from public.daily_guest_sessions s
  where s.user_id = v_user_id
    and s.day = v_day
    and s.expires_at > now()
  order by s.created_at
  limit 1;

  if v_token is not null then return v_token; end if;

  insert into public.daily_guest_sessions(day, user_id)
  values (v_day, v_user_id)
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
  v_day date;
  v_user_id uuid := auth.uid();
begin
  if p_session_token is null or v_user_id is null then
    raise exception 'Sessão de visitante inválida' using errcode = '28000';
  end if;

  select s.day into v_day
  from public.daily_guest_sessions s
  where s.token = p_session_token
    and s.user_id = v_user_id
    and s.expires_at > now();

  if v_day is null then
    raise exception 'Sessão expirada ou não pertence a este visitante' using errcode = '28000';
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
  v_day date;
  v_user_id uuid := auth.uid();
  v_answer text;
  v_explanation text;
  v_basis jsonb;
  v_checked timestamptz;
  v_used integer;
  v_correct boolean;
begin
  if p_session_token is null or p_question_id is null
     or p_selected_answer not in ('C','E') or v_user_id is null then
    raise exception 'Resposta ou sessão inválida' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtext('norte-guest-grade'), hashtext(p_session_token::text));

  select s.day into v_day
  from public.daily_guest_sessions s
  where s.token = p_session_token
    and s.user_id = v_user_id
    and s.expires_at > now();

  if v_day is null then
    raise exception 'Sessão expirada ou não pertence a este visitante' using errcode = '28000';
  end if;

  if not exists (
    select 1 from public.daily_guest_question_items i
    where i.day = v_day and i.question_id = p_question_id
  ) then
    raise exception 'Questão não pertence ao desafio desta sessão' using errcode = '42501';
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
