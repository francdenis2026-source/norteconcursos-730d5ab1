-- Contagem de questões por disciplina feita no banco (uma linha por disciplina).
-- Substitui a leitura de todas as questões pelo site a cada visita ao painel.
-- Mesmos critérios de antes: oficiais ativas sem gabarito X; autorais ativas.
create or replace function public.get_question_subject_counts()
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object('subject', subject, 'total', total) order by subject), '[]'::jsonb)
  from (
    select subject, sum(n) as total
    from (
      select subject, count(*) as n
      from public.official_exam_questions
      where content_status = 'active' and official_answer <> 'X'
      group by subject
      union all
      select subject, count(*)
      from public.curated_question_catalog
      where content_status = 'active'
      group by subject
    ) x
    group by subject
  ) y
$$;
revoke all on function public.get_question_subject_counts() from public, anon;
grant execute on function public.get_question_subject_counts() to authenticated;
