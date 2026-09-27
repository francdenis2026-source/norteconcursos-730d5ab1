-- PC-AC 2017 only has 22 real booklet pages (cover + 21 content pages for
-- 80 questions); the original upload accidentally included the misfiled
-- FUNCAB essay photos as pagina-23/24, which have since been removed from
-- storage. Drops the matching DB rows.
delete from public.student_exam_documents
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and (storage_path like '%/policia-civil-ac-2017-agente/pagina-23.jpg'
       or storage_path like '%/policia-civil-ac-2017-agente/pagina-24.jpg');
