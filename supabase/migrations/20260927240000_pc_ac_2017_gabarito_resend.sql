-- Candidate resent his personal gabarito for PC-AC 2017 (2026-09-27, caderno
-- S01 - Versão V). Verified against the previously stored record BEFORE
-- applying: 78/80 items identical, only items 60 (Direito Processual Penal)
-- and 66 (Legislação Penal Especial) changed — both flip from correct to
-- wrong. Confirmed as a genuine correction, not a different attempt.
--
-- Candidate explicitly asked to re-verify the scoring FORMULA for this banca
-- (IBADE), since it differs from CEBRASPE (no negative marking, weighted
-- points per discipline instead of a flat +1/-1). Checked directly against
-- the exam booklet's own cover page (pagina-01.jpg of the candidate's own
-- caderno S01-V, photographed and already in storage): the weight table
-- printed there is EXACTLY what was already used — Direito Penal and Direito
-- Processual Penal worth 2 points/question, every other discipline worth 1
-- point/question, scale 0-100. No correction to the formula was needed, only
-- to the 2 changed answers.
--
-- New total after the 2 flips: 48/100 (was 51/100). Both items 60 and 66
-- move from "correta" to "errada" — item 60 costs 2 points (Direito
-- Processual Penal), item 66 costs 1 point (Legislação Penal Especial).
update public.student_exam_documents
set correct_count = 39,
    wrong_count = 41,
    score_net = 48,
    score_raw = 48,
    extracted_data = jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(extracted_data, '{items,60}', '"errada"'),
          '{items,66}', '"errada"'
        ),
        '{candidate_answers,60}', '"E"'
      ),
      '{candidate_answers,66}', '"E"'
    ) || jsonb_build_object(
      'pontuacao_obtida', jsonb_build_object(
        'total', 48,
        'informatica', jsonb_build_object('de', 5, 'pontos', 5, 'corretas', 5),
        'direito_penal', jsonb_build_object('de', 10, 'pontos', 8, 'corretas', 4),
        'medicina_legal', jsonb_build_object('de', 10, 'pontos', 8, 'corretas', 8),
        'lingua_portuguesa', jsonb_build_object('de', 10, 'pontos', 2, 'corretas', 2),
        'raciocinio_logico', jsonb_build_object('de', 5, 'pontos', 1, 'corretas', 1),
        'direito_administrativo', jsonb_build_object('de', 10, 'pontos', 5, 'corretas', 5),
        'direito_constitucional', jsonb_build_object('de', 10, 'pontos', 5, 'corretas', 5),
        'direito_processual_penal', jsonb_build_object('de', 10, 'pontos', 10, 'corretas', 5),
        'legislacao_penal_especial', jsonb_build_object('de', 10, 'pontos', 4, 'corretas', 4)
      )
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado, verificado contra o registro anterior antes de aplicar (78/80 itens idênticos — apenas itens 60 e 66 mudaram, ambos de correta para errada). Candidato também pediu para reconferir a fórmula de pontuação desta banca (IBADE) — confirmado diretamente na capa da própria prova (pagina-01.jpg do caderno S01-V do candidato): Direito Penal e Direito Processual Penal valem 2 pts/questão, demais disciplinas 1 pt/questão, escala 0-100, sem desconto por erro. Fórmula já estava correta; só os 2 itens mudaram. Novo total: 48/100 (era 51/100). Direito Processual Penal caiu de 6/10 para 5/10 corretas (perdeu 2 pts); Legislação Penal Especial caiu de 5/10 para 4/10 corretas (perdeu 1 pt).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Civil do Acre'
  and contest_year = '2017'
  and doc_type = 'resultado';
