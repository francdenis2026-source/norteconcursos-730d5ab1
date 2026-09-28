-- Uploads a reference copy of the PC-AC 2017 (Agente de Polícia Civil, IBADE)
-- exam booklet to the "student-exams" storage bucket, for later use.
--
-- IMPORTANT: the file uploaded is caderno S01 - VERSÃO T (not V). The
-- candidate's actual booklet is versão V, but the version-V PDF could not be
-- located this session (official site antigo.ibade.org.br unreachable, no
-- Wayback Machine archive of the exam booklet exists — only the gabarito and
-- edital were archived — and the only other mirror, pciconcursos.com.br, is
-- blocked by a captcha). IBADE typically keeps the same question stems across
-- versions and only reshuffles the order of the five alternatives (A-E) and
-- the resulting correct letter, so this T-version booklet is useful as a
-- reference for the QUESTION TEXT, but its alternative lettering does NOT
-- match the candidate's version-V answer sheet or the official V gabarito
-- already stored in this database. Kept here purely as a placeholder for
-- future use, clearly labeled, until the true version-V booklet is located.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,notes)
select u.id,'Polícia Civil do Acre','2017','IBADE','prova',
  'PC_Acre_2017_S01_T_prova_referencia.pdf','pc-acre-2017/prova-S01-T-referencia.pdf',
  null,null,null,
  'ATENÇÃO: este arquivo é o caderno de provas na VERSÃO T (código S01 T), baixado de arquivos.qconcursos.com. O caderno do candidato é a VERSÃO V (S01 V) — a ordem/letra das alternativas certamente difere entre as duas versões, e por isso o gabarito oficial já cadastrado (seção "Prova: V") NÃO corresponde a este PDF item a item. Guardado apenas como referência do enunciado das questões (texto normalmente idêntico entre versões na banca IBADE), para uso futuro caso a versão V seja localizada ou para conferência manual pelo candidato. Fontes tentadas sem sucesso para a versão V: site oficial da IBADE (fora do ar), Wayback Machine (não arquivou o caderno de provas, só gabarito e edital), pciconcursos.com.br (bloqueado por captcha).'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;
