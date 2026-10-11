-- Inclui novos alunos no ranking geral e transforma o tempo de resposta em sinal pedagógico.
-- O ranking continua sem administradores; usuários sem atividade aparecem como iniciantes no geral.
create or replace function public.get_ranking_section(_kind text, _limit integer default 20)
returns table (
  rank_position bigint, user_id uuid, display_name text, points integer,
  question_points integer, simulator_points integer, study_points integer, extra_points integer,
  study_hours numeric, questions integer, accuracy integer, simulators integer,
  is_me boolean, stars integer, level_name text
)
language sql stable security definer set search_path = public
as $$
  with events as (select * from public.score_events()),
  participants as (
    select p.id as user_id, coalesce(e.qp, 0) as qp, coalesce(e.sp, 0) as sp,
      coalesce(e.fp, 0) as fp, coalesce(e.ep, 0) as ep, coalesce(e.dp, 0) as dp,
      coalesce(e.hp, 0) as hp, coalesce(e.hrs, 0) as hrs, coalesce(e.qn, 0) as qn,
      coalesce(e.qc, 0) as qc, coalesce(e.sn, 0) as sn
    from public.profiles p
    left join events e on e.user_id = p.id
    where not exists (select 1 from public.user_roles ur where ur.user_id = p.id and ur.role = 'admin')
  ),
  scored as (
    select x.*, x.qp + x.sp + x.fp + x.ep + x.dp + x.hp as general,
      case _kind when 'questions' then x.qp when 'simulators' then x.sp
        else x.qp + x.sp + x.fp + x.ep + x.dp + x.hp end as total
    from participants x
  )
  select row_number() over (order by s.total desc, s.user_id), s.user_id,
    case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
      when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
      else split_part(trim(p.full_name), ' ', 1) || ' ' ||
        left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    s.total, s.qp, s.sp, s.hp, s.fp + s.ep + s.dp, s.hrs, s.qn,
    case when s.qn > 0 then round(100.0 * s.qc / s.qn)::int else 0 end, s.sn,
    s.user_id = auth.uid(), lv.stars, lv.level_name
  from scored s left join public.profiles p on p.id = s.user_id
  cross join lateral public.level_of(s.general) lv
  where _kind = 'general' or s.total > 0
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
language sql stable security definer set search_path = public
as $$
  with events as (select * from public.score_events()),
  participants as (
    select p.id as user_id, coalesce(e.qp, 0) as qp, coalesce(e.sp, 0) as sp,
      coalesce(e.fp, 0) as fp, coalesce(e.ep, 0) as ep, coalesce(e.dp, 0) as dp,
      coalesce(e.hp, 0) as hp, coalesce(e.hrs, 0) as hrs, coalesce(e.qn, 0) as qn,
      coalesce(e.qc, 0) as qc, coalesce(e.sn, 0) as sn
    from public.profiles p left join events e on e.user_id = p.id
    where not exists (select 1 from public.user_roles ur where ur.user_id = p.id and ur.role = 'admin')
  ),
  ranked as (
    select x.*, x.qp + x.sp + x.fp + x.ep + x.dp + x.hp as general,
      row_number() over (order by x.qp + x.sp + x.fp + x.ep + x.dp + x.hp desc, x.user_id) as pos,
      count(*) over () as n
    from participants x
  )
  select case when coalesce(trim(p.full_name), '') = '' then 'Candidato Norte'
    when array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1) = 1 then trim(p.full_name)
    else split_part(trim(p.full_name), ' ', 1) || ' ' ||
      left((regexp_split_to_array(trim(p.full_name), '\s+'))[array_length(regexp_split_to_array(trim(p.full_name), '\s+'), 1)], 1) || '.' end,
    lv.stars, lv.level_name, r.general, lv.next_min, r.pos, r.n, r.qp, r.sp, r.hp, r.fp, r.ep, r.dp, r.hrs, r.qn,
    case when r.qn > 0 then round(100.0 * r.qc / r.qn)::int else 0 end, r.sn,
    (select coalesce(max(a.accuracy), 0) from public.simulator_attempts a where a.user_id = r.user_id),
    coalesce((select us.longest_streak from public.user_streaks us where us.user_id = r.user_id), 0),
    coalesce((select array_agg(ac.name order by ac.name) from public.user_achievements ua
      join public.achievements ac on ac.id = ua.achievement_id where ua.user_id = r.user_id), '{}')
  from ranked r left join public.profiles p on p.id = r.user_id
  cross join lateral public.level_of(r.general) lv
  where r.user_id = _user and auth.uid() is not null
$$;
revoke all on function public.get_ranking_profile(uuid) from public, anon;
grant execute on function public.get_ranking_profile(uuid) to authenticated;

-- Diagnóstico por disciplina e assunto. O tempo vem da resposta registrada pelo Treinador;
-- a mediana reduz o efeito de pausas ocasionais e evita classificar um tema por um único outlier.
create or replace function public.my_difficulty_analysis()
returns table (
  subject text, topic text, answered integer, correct integer, accuracy integer,
  avg_seconds integer, median_seconds integer, difficulty_score integer
)
language sql stable security definer set search_path = public
as $$
  with first_response as (
    select distinct on (r.question_id) r.question_id, r.subject, r.is_correct, r.response_seconds
    from public.question_training_responses r
    where r.user_id = auth.uid()
    order by r.question_id, r.created_at
  ),
  taxonomy as (
    select id, subject, coalesce(nullif(subtopic, ''), subject) as topic
      from public.curated_question_catalog
    union all
    select q.id, q.subject, coalesce(nullif(st.topic_text, ''), q.subject)
      from public.official_exam_questions q
      left join public.syllabus_topics st on st.id = q.syllabus_topic_id
    union all
    select id, subject, subject from public.board_exam_questions
  ),
  enriched as (
    select f.subject, coalesce(t.topic, f.subject) as topic, f.is_correct, greatest(f.response_seconds, 0) as seconds
    from first_response f left join taxonomy t on t.id = f.question_id
  ),
  grouped as (
    select subject, topic, count(*)::int as answered, count(*) filter (where is_correct)::int as correct,
      round(avg(seconds))::int as avg_seconds,
      (percentile_cont(0.5) within group (order by seconds))::int as median_seconds
    from enriched group by subject, topic
  )
  select subject, topic, answered, correct,
    case when answered > 0 then round(100.0 * correct / answered)::int else 0 end,
    avg_seconds, median_seconds,
    greatest(0, least(100, round(
      (100 - case when answered > 0 then 100.0 * correct / answered else 0 end) * 0.7
      + least(median_seconds, 180) / 180.0 * 30
    )::int))
  from grouped order by difficulty_score desc, answered desc, subject, topic
$$;
revoke all on function public.my_difficulty_analysis() from public, anon;
grant execute on function public.my_difficulty_analysis() to authenticated;
