-- Agrupa as questões oficiais ativas por prova, disciplina e tópico do edital (uma linha por grupo).
-- Substitui a leitura de todas as questões nas telas Raio-X dos editais e Panorama das provas.
create or replace function public.get_radar_question_groups()
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'contest_name', contest_name, 'career_name', career_name, 'exam_board', exam_board,
    'exam_year', exam_year, 'subject', subject, 'syllabus_topic_id', syllabus_topic_id, 'n', n)), '[]'::jsonb)
  from (
    select contest_name, career_name, exam_board, exam_year, subject, syllabus_topic_id, count(*) as n
    from public.official_exam_questions
    where content_status = 'active'
    group by contest_name, career_name, exam_board, exam_year, subject, syllabus_topic_id
  ) g
$$;
revoke all on function public.get_radar_question_groups() from public, anon;
grant execute on function public.get_radar_question_groups() to authenticated;
