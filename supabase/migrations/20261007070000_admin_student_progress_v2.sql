-- Amplia o progresso do aluno para o administrador: mais dias de atividade (parametrizável),
-- separa questões avulsas (treino) de questões em simulado, e adiciona sequência, ranking
-- e distância para a nota de corte — as mesmas métricas da Visão 360° do aluno, agora
-- disponíveis para o administrador em qualquer conta.
drop function if exists public.admin_student_progress(uuid);
create or replace function public.admin_student_progress(_user_id uuid, _days integer default 30)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  r jsonb;
  days_window integer := least(greatest(coalesce(_days, 30), 1), 90);
  start_d date;
  end_d date;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Acesso restrito ao administrador' using errcode = '42501';
  end if;

  end_d := public.get_current_acre_date();
  start_d := end_d - (days_window - 1);

  with tr as (
    select distinct on (question_id) subject, is_correct, created_at
    from public.question_training_responses where user_id = _user_id
    order by question_id, created_at
  ),
  sr as (
    select subject, is_correct, created_at
    from public.simulator_responses where user_id = _user_id and selected_answer is not null
  ),
  allr as (
    select subject, is_correct, created_at, 'treino'::text as kind from tr
    union all
    select subject, is_correct, created_at, 'simulado'::text as kind from sr
  ),
  daily as (
    select (created_at at time zone 'America/Rio_Branco')::date as d,
           count(*) as questions,
           count(*) filter (where is_correct) as correct
    from allr
    where (created_at at time zone 'America/Rio_Branco')::date >= start_d
    group by 1
  ),
  study as (
    select study_date as d, sum(active_seconds) as seconds
    from public.study_sessions
    where user_id = _user_id and study_date >= start_d
    group by 1
  ),
  days as (
    select generate_series(start_d, end_d, interval '1 day')::date as d
  ),
  best_scores as (
    select contest_name, contest_year, max(coalesce(score_net, score_raw)) as best
    from public.student_exam_documents
    where user_id = _user_id and contest_name is not null and contest_year is not null
      and coalesce(score_net, score_raw) is not null
    group by 1, 2
  )
  select jsonb_build_object(
    'simulators', coalesce((select jsonb_agg(t order by t.finished_at) from (
        select id, title, total_questions, correct_answers, wrong_answers, blank_answers, accuracy, duration_seconds, finished_at
        from public.simulator_attempts where user_id = _user_id order by finished_at desc limit 20) t), '[]'::jsonb),
    'subjects', coalesce((select jsonb_agg(t order by t.answered desc) from (
        select subject, count(*) as answered, count(*) filter (where is_correct) as correct
        from allr group by subject) t), '[]'::jsonb),
    'days', coalesce((select jsonb_agg(jsonb_build_object(
        'day', days.d,
        'questions', coalesce(daily.questions, 0),
        'correct', coalesce(daily.correct, 0),
        'seconds', coalesce(study.seconds, 0)
      ) order by days.d) from days
      left join daily on daily.d = days.d
      left join study on study.d = days.d), '[]'::jsonb),
    'days_window', days_window,
    'total_answered', (select count(*) from allr),
    'total_correct', (select count(*) from allr where is_correct),
    'practice_split', jsonb_build_object(
      'treino', jsonb_build_object(
        'answered', (select count(*) from allr where kind = 'treino'),
        'correct', (select count(*) from allr where kind = 'treino' and is_correct)
      ),
      'simulado', jsonb_build_object(
        'answered', (select count(*) from allr where kind = 'simulado'),
        'correct', (select count(*) from allr where kind = 'simulado' and is_correct)
      )
    ),
    'streak', (select jsonb_build_object('current', current_streak, 'longest', longest_streak)
      from public.user_streaks where user_id = _user_id),
    'rank', (select jsonb_build_object('total_points', total_points, 'stars', stars, 'level_name', level_name)
      from public.user_rank_profiles where user_id = _user_id),
    'cutoff_gaps', coalesce((select jsonb_agg(jsonb_build_object(
        'contest_name', bs.contest_name,
        'contest_year', bs.contest_year,
        'cutoff_score', cri.cutoff_score,
        'best_score', bs.best,
        'gap', bs.best - cri.cutoff_score
      )) from best_scores bs
      join public.contest_reference_info cri
        on cri.contest_name = bs.contest_name and cri.contest_year = bs.contest_year
       and cri.cutoff_score is not null), '[]'::jsonb)
  ) into r;
  return r;
end $$;
revoke all on function public.admin_student_progress(uuid, integer) from public;
grant execute on function public.admin_student_progress(uuid, integer) to authenticated;
