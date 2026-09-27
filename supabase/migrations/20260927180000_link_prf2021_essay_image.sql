-- The PRF 2021 essay (Polícia Rodoviária Federal — 2021) was stored with an
-- accurate transcription and correction, but storage_paths was left empty.
-- The actual handwritten "RASCUNHO" page matching that transcription verbatim
-- is pagina-09.jpg of the candidate's own PRF 2021 booklet (already in the
-- student-exams bucket, part of the 9-page prf-2021-agente set) — it was
-- just never linked from essay_submissions, unlike every other essay row
-- (PF 2014/2018/2021/2025), which already reference their own booklet pages.
update public.essay_submissions
set storage_paths = '["f4326343-dd3a-46cf-b5e6-e6194abb31e5/prf-2021-agente/pagina-09.jpg"]'::jsonb
where user_id = (select id from auth.users where email = '69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2021';
