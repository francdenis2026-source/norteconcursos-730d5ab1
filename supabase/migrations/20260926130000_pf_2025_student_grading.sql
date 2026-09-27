-- Franc Denis's PF 2025 result (CPF 69598193268), cargo 16: Agente de Polícia
-- Federal, Edital nº 1 - PF - Policial de 20/5/2025, aplicação 27/7/2025.
--
-- Unlike the other years, this uses the OFFICIAL BDI (Boletim de Desempenho
-- Individual) figure published by CEBRASPE itself — 82 acertos, 26 erros, nota
-- líquida 56,00, 13.104ª colocação na ampla concorrência — rather than an
-- item-by-item re-grading from a retyped answer sheet. A candidate-side
-- item-by-item confrontation was attempted first and produced a materially
-- different result (52/46/10/12), which strongly suggests a transcription error
-- in the retyped sheet rather than an error in the official gabarito
-- (106_PF_016_01 + 106_PF_CB2_01 + 106_PF_CG1_01, all read directly from the
-- official CEBRASPE PDFs). Per the candidate's explicit choice, the officially
-- published BDI number is used as the source of truth here; no per-item
-- "items" breakdown is stored since the BDI does not publish one, so the
-- "Pontos fracos por disciplina" section will not have data for this specific
-- attempt (it still works normally for the other years already graded item by
-- item).
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Agente de Polícia Federal','2025','CEBRASPE','resultado',
  'PF_2025_resultado_franc_denis.txt','manual-entry/pf-2025-franc-denis',
  82, 26, 12, 56,
  '{
    "method": "Boletim de Desempenho Individual (BDI) oficial da CEBRASPE — fonte mais autoritativa que uma reconferência manual",
    "classificacao_ampla_concorrencia": 13104,
    "resultado_oficial": {"nota_total": 56.00, "acertos_total": 82, "erros_total": 26, "classificacao_ampla_objetiva": 13104}
  }'::jsonb,
  'Nota líquida oficial confirmada pelo BDI da CEBRASPE: 56,00 pts (82 acertos, 26 erros), 13.104ª colocação na ampla concorrência. Uma primeira tentativa de conferência item a item, a partir de respostas retranscritas pelo candidato, resultou em números bem diferentes (52 corretas / 46 erradas / 10 anuladas / 12 em branco) — divergência grande demais para ser explicada por diferença de critério, então foi tratada como provável erro de transcrição na planilha, e descartada em favor do BDI oficial (fonte publicada pela própria banca), por decisão explícita do candidato.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;
