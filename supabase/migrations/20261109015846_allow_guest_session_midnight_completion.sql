-- Let an already-open visitor challenge finish across Acre midnight.
-- New sessions still begin on the current Acre day; an existing bearer session
-- remains bound to its original daily question set until its 36-hour expiry.

create or replace function public.get_daily_guest_progress(p_session_token uuid)
returns table(used integer, answers jsonb)
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_day date;
begin
  if p_session_token is null then
    raise exception 'Sessão de visitante inválida' using errcode = '28000';
  end if;

  select s.day into v_day
  from public.daily_guest_sessions s
  where s.token = p_session_token and s.expires_at > now();

  if v_day is null then
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
  v_day date;
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

  select s.day into v_day
  from public.daily_guest_sessions s
  where s.token = p_session_token and s.expires_at > now();

  if v_day is null then
    raise exception 'Sessão expirada; inicie uma nova rodada' using errcode = '28000';
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
