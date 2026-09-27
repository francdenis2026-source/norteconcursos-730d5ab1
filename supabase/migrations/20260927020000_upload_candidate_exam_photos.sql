-- Uploads the candidate's own exam booklet photos (Franc Denis, CPF
-- 69598193268) to the "student-exams" storage bucket and registers them as
-- doc_type='prova_realizada' rows, so they are permanently accessible to the
-- system ("guardadas onde o sistema possa acessar a qualquer momento") and
-- grouped under the exact same contest_name/contest_year already used by
-- each contest's "resultado" row.
--
-- IMPORTANT — separation of "provas que realizei" from "provas do
-- concurso": these rows are ONLY the candidate's own scanned booklet pages.
-- Official reference material (gabaritos, matrizes, padrões de resposta —
-- e.g. GAB_DEFINITIVO_*.pdf, MATRIZ_*.pdf) that sits in the same local
-- folders was intentionally NOT uploaded here; that material already feeds
-- official_exam_questions via the exam-import migrations and does not
-- belong in the candidate's own document history.
with owner as (
  select id from auth.users where email = '69598193268@norteconcurso.local'
)
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, uploaded_via, file_name, storage_path, notes)
select
  owner.id, c.contest_name, c.contest_year, c.exam_board, 'prova_realizada', 'admin_import',
  format('pagina-%s.jpg', lpad(p::text, 2, '0')),
  format('%s/%s/pagina-%s.jpg', owner.id, c.folder, lpad(p::text, 2, '0')),
  'Página original do caderno de provas do candidato, enviada para o storage durante auditoria/reorganização do painel (2026-09-27).'
from owner
cross join (values
  ('Polícia Civil do Acre','2017','IBADE','policia-civil-ac-2017-agente',24),
  ('Polícia Penal do Acre','2023','IBFC','policia-penal-ac-2023-agente',15),
  ('Departamento Penitenciário Nacional','2021','CEBRASPE','depen-2021-agente',10),
  ('Polícia Rodoviária Federal','2019','CEBRASPE','prf-2019-agente',11),
  ('Polícia Rodoviária Federal','2021','CEBRASPE','prf-2021-agente',9),
  ('SEFAZ/AC - Secretaria de Estado da Fazenda do Acre','2023','CEBRASPE','sefaz-ac-2023-especialista',10)
) as c(contest_name, contest_year, exam_board, folder, page_count)
cross join generate_series(1, c.page_count) as p
on conflict do nothing;

-- The two "REDAÇÃO" photos found inside the PC-AC 2017 local folder carry
-- the banca "FUNCAB - Fundação Professor Carlos Augusto Bittencourt" in
-- their footer, which is NOT IBADE (the real PC-AC 2017 banca). They were
-- almost certainly misfiled from a different, not-yet-identified contest.
-- Stored here with contest_name left NULL and a clear note instead of
-- guessing — visible in the admin "Provas Enviadas" screen so the candidate
-- can say which contest they actually belong to.
with owner as (
  select id from auth.users where email = '69598193268@norteconcurso.local'
)
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, uploaded_via, analysis_status, file_name, storage_path, notes)
select owner.id, null, null, 'FUNCAB', 'prova_realizada', 'admin_import', 'pendente', f.file_name,
  format('%s/nao-identificado-funcab/%s', owner.id, f.file_name),
  'ATENÇÃO: encontrada dentro da pasta local "PC CIVEL DO ACRE 2017", mas o rodapé do documento mostra a banca FUNCAB - Fundação Professor Carlos Augusto Bittencourt, diferente da banca real do PC-AC 2017 (IBADE). Provavelmente pertence a outro concurso ainda não identificado nesta plataforma. Aguardando o candidato confirmar a qual concurso/ano isto pertence antes de vincular a um painel.'
from owner
cross join (values ('redacao-enunciado.jpg'), ('redacao-texto.jpg')) as f(file_name)
on conflict do nothing;
