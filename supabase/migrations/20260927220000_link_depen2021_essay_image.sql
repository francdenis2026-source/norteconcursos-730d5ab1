-- The DEPEN 2021 essay was stored with an accurate transcription/tema but
-- storage_paths was left empty, same gap found earlier for PRF 2021
-- (20260927180000). The handwritten "RASCUNHO" page matching this
-- transcription verbatim is pagina-10.jpg of the candidate's own DEPEN 2021
-- booklet (already in the student-exams bucket, part of the 10-page
-- depen-2021-agente set); pagina-09.jpg is the "PROVA DISCURSIVA" prompt
-- page itself (motivating text + legal excerpts), not the candidate's
-- answer, so only pagina-10 is linked here — consistent with how every
-- other essay row only references the candidate's own handwritten page.
update public.essay_submissions
set storage_paths = '["f4326343-dd3a-46cf-b5e6-e6194abb31e5/depen-2021-agente/pagina-10.jpg"]'::jsonb
where user_id = (select id from auth.users where email = '69598193268@norteconcurso.local')
  and contest_name = 'Departamento Penitenciário Nacional'
  and contest_year = '2021';
