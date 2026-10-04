-- Progresso real de um aluno para o administrador: simulados, desempenho por matéria,
-- atividade dos últimos 14 dias (questões e minutos de estudo).
create or replace function public.admin_student_progress(_user_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare r jsonb;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Acesso restrito ao administrador' using errcode = '42501';
  end if;

  with tr as (
    select distinct on (question_id) subject, is_correct, created_at
    from public.question_training_responses where user_id = _user_id
    order by question_id, created_at
  ),
  sr as (
    select subject, is_correct, created_at
    from public.simulator_responses where user_id = _user_id and selected_answer is not null
  ),
  allr as (select * from tr union all select * from sr),
  days as (
    select generate_series(public.get_current_acre_date() - 13, public.get_current_acre_date(), interval '1 day')::date as d
  )
  select jsonb_build_object(
    'simulators', coalesce((select jsonb_agg(t order by t.finished_at) from (
        select id, title, total_questions, correct_answers, wrong_answers, blank_answers, accuracy, duration_seconds, finished_at
        from public.simulator_attempts where user_id = _user_id order by finished_at desc limit 20) t), '[]'::jsonb),
    'subjects', coalesce((select jsonb_agg(t order by t.answered desc) from (
        select subject, count(*) as answered, count(*) filter (where is_correct) as correct
        from allr group by subject) t), '[]'::jsonb),
    'days', (select jsonb_agg(jsonb_build_object(
        'day', days.d,
        'questions', (select count(*) from allr where (allr.created_at at time zone 'America/Rio_Branco')::date = days.d),
        'correct', (select count(*) from allr where allr.is_correct and (allr.created_at at time zone 'America/Rio_Branco')::date = days.d),
        'seconds', coalesce((select sum(active_seconds) from public.study_sessions s where s.user_id = _user_id and s.study_date = days.d), 0)
      ) order by days.d) from days),
    'total_answered', (select count(*) from allr),
    'total_correct', (select count(*) from allr where is_correct)
  ) into r;
  return r;
end $$;
revoke all on function public.admin_student_progress(uuid) from public;
grant execute on function public.admin_student_progress(uuid) to authenticated;
