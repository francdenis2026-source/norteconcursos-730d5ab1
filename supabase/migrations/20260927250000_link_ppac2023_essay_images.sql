-- The PP-AC 2023 essay was stored with an accurate transcription/tema but
-- storage_paths was left empty, same gap already found and fixed for PRF
-- 2021 (20260927180000) and DEPEN 2021 (20260927220000). The candidate's own
-- handwriting matching this transcription verbatim spans two pages of his
-- own booklet: pagina-14.jpg (the "PROVA DISCURSIVA - REDAÇÃO" prompt page,
-- which already carries the first two paragraphs of his rascunho at the
-- bottom) and pagina-15.jpg (the rest of the rascunho, lines 1-29) — both
-- already in the student-exams bucket as part of the 15-page
-- policia-penal-ac-2023-agente set.
update public.essay_submissions
set storage_paths = '[
  "f4326343-dd3a-46cf-b5e6-e6194abb31e5/policia-penal-ac-2023-agente/pagina-14.jpg",
  "f4326343-dd3a-46cf-b5e6-e6194abb31e5/policia-penal-ac-2023-agente/pagina-15.jpg"
]'::jsonb
where user_id = (select id from auth.users where email = '69598193268@norteconcurso.local')
  and contest_name = 'Polícia Penal do Acre'
  and contest_year = '2023';
