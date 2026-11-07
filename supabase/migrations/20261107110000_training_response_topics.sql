-- Preserve the exact topic used by the trainer so performance analysis does not
-- have to infer it again from a changing catalog taxonomy.
alter table public.question_training_responses
  add column if not exists topic text;

create index if not exists idx_training_responses_user_subject_topic
  on public.question_training_responses(user_id, subject, topic);

create or replace function public.my_difficulty_analysis()
returns table (
  subject text, topic text, answered integer, correct integer, accuracy integer,
  avg_seconds integer, median_seconds integer, difficulty_score integer
)
language sql stable security definer set search_path = public
as $$
  with first_response as (
    select distinct on (r.question_id) r.question_id, r.subject,
      coalesce(nullif(r.topic, ''), r.subject) as recorded_topic,
      r.is_correct, r.response_seconds
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
    select f.subject, coalesce(nullif(f.recorded_topic, f.subject), t.topic, f.subject) as topic,
      f.is_correct, greatest(f.response_seconds, 0) as seconds
    from first_response f left join taxonomy t on t.id = f.question_id
  ),
  grouped as (
    select subject, topic, count(*)::int as answered,
      count(*) filter (where is_correct)::int as correct,
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
