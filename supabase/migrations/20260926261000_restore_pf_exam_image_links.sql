-- Restores the database links for Franc Denis's 46 original PF exam pages.
-- The objects remained intact in the student-exams bucket after the legacy
-- duplicate cleanup, but their student_exam_documents rows were removed.
-- Keep the verified manual result rows: these page rows carry no score and are
-- grouped with the corresponding result by contest_name + contest_year.

with owner as (
  select id
  from auth.users
  where email = '69598193268@norteconcurso.local'
  limit 1
), exams(contest_year, folder, page_count) as (
  values
    ('2014', 'policia-federal-2014-agente', 12),
    ('2018', 'policia-federal-2018-agente', 12),
    ('2021', 'policia-federal-2021-agente', 12),
    ('2025', 'policia-federal-2025-agente', 10)
), pages as (
  select
    owner.id as user_id,
    exams.contest_year,
    exams.folder,
    generate_series(1, exams.page_count) as page_number
  from owner
  cross join exams
)
insert into public.student_exam_documents (
  user_id,
  contest_name,
  contest_year,
  exam_board,
  doc_type,
  file_name,
  storage_path,
  notes
)
select
  pages.user_id,
  'Agente de Polícia Federal',
  pages.contest_year,
  'CEBRASPE',
  'prova_realizada',
  format('pagina-%s.jpg', lpad(pages.page_number::text, 2, '0')),
  format(
    '%s/%s/pagina-%s.jpg',
    pages.user_id,
    pages.folder,
    lpad(pages.page_number::text, 2, '0')
  ),
  'Página original enviada pelo candidato; vínculo restaurado após auditoria do Storage.'
from pages
where not exists (
  select 1
  from public.student_exam_documents existing
  where existing.user_id = pages.user_id
    and existing.storage_path = format(
      '%s/%s/pagina-%s.jpg',
      pages.user_id,
      pages.folder,
      lpad(pages.page_number::text, 2, '0')
    )
);
