-- The candidate confirmed the two "REDAÇÃO" photos found misfiled inside the
-- PC-AC 2017 local folder (banca FUNCAB, not IBADE) don't belong to any
-- contest they recognize. Removing the placeholder rows; the storage
-- objects were already deleted directly via the Storage API.
delete from public.student_exam_documents
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and storage_path like '%/nao-identificado-funcab/%';
