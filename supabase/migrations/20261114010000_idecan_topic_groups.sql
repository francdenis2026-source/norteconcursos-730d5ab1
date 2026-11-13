-- Questões ativas da IDECAN agrupadas por prova, matéria e assunto cobrado (uma linha por grupo).
-- Alimenta o selo de "chance de cair" por assunto do edital sem baixar as questões inteiras.
create or replace function public.get_idecan_topic_groups()
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'contest_name', contest_name, 'career_name', career_name, 'exam_year', exam_year,
    'subject', subject, 'tested_topic', tested_topic, 'n', n)), '[]'::jsonb)
  from (
    select contest_name, career_name, exam_year, subject, tested_topic, count(*) as n
    from public.board_exam_questions
    where board ilike '%IDECAN%'
      and content_status = 'active'
      and official_answer <> 'X'
    group by contest_name, career_name, exam_year, subject, tested_topic
  ) g
$$;
revoke all on function public.get_idecan_topic_groups() from public, anon;
grant execute on function public.get_idecan_topic_groups() to authenticated;
