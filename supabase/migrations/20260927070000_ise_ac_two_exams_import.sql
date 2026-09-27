-- Two new contests found in the candidate's local folder ("ISE AC" and "TEC
-- DE INFORMÁTICA 2021 ISE"), both from Edital ISE-AC (Instituto
-- Socioeducativo do Estado do Acre), concurso aplicado 5/12/2021, banca
-- IBADE. Same edital, two different cargos (Agente Socioeducativo Masculino
-- vs Técnico de Informática) — kept as two separate panels since they are
-- different roles with different question sets/gabaritos, following this
-- project's rule of never mixing careers.
--
-- Photos were read one by one to determine the true page/question order
-- printed on each sheet ("Tipo Z/X – Página N"), since the original
-- filenames (random UUIDs from the phone camera) did not reflect that
-- order. Uploaded to storage already in the corrected sequence.
--
-- Only the candidate's own booklet pages are registered here (doc_type
-- 'prova_realizada') — no official gabarito/grading has been performed yet
-- for either exam.
with owner as (
  select id from auth.users where email = '69598193268@norteconcurso.local'
)
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, uploaded_via, file_name, storage_path, notes)
select owner.id, c.contest_name, c.contest_year, 'IBADE', 'prova_realizada', 'admin_import',
  format('pagina-%s.jpg', lpad(p::text, 2, '0')),
  format('%s/%s/pagina-%s.jpg', owner.id, c.folder, lpad(p::text, 2, '0')),
  'Página original do caderno de provas do candidato (Edital ISE-AC, aplicação 5/12/2021), reordenada pela numeração real de página impressa em cada folha.'
from owner
cross join (values
  ('Instituto Socioeducativo do Estado do Acre - Agente Socioeducativo','2021','ise-ac-2021-agente-socioeducativo',20),
  ('Instituto Socioeducativo do Estado do Acre - Técnico de Informática','2021','ise-ac-2021-tecnico-informatica',19)
) as c(contest_name, contest_year, folder, page_count)
cross join generate_series(1, c.page_count) as p
on conflict do nothing;
