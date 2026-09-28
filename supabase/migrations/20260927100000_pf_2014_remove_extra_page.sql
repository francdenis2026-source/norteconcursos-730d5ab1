-- The candidate re-scanned the PF 2014 booklet; the fresh set only has 11
-- real pages (vs 12 previously), so removes the now-orphaned pagina-12 row.
delete from public.student_exam_documents
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and storage_path like '%/policia-federal-2014-agente/pagina-12.jpg';
