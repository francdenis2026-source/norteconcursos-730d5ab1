-- Candidate resent his personal gabarito for DEPEN 2021 (2026-09-27, pasted
-- under a typo'd title "Polícia Penal Federal" but confirmed by content as
-- DEPEN). Verified against the previously stored record BEFORE applying:
-- 111/120 comparable items identical, only items 9,10,11,12,14,15,16,18,20
-- changed (mostly filling in items that were previously blank, or flipping
-- 14/15/16/18). Confirmed as a genuine refinement of DEPEN 2021.
--
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2021, career_name matching '%penit%'). Per CEBRASPE rule in
-- public.exam_board_scoring_rules, blanks are not discounted.
-- Result: 56 corretas, 47 erradas, 5 anuladas, 12 em branco.
-- Nota líquida: 56 - 47 + 5 = 14 (was 15 with wrong_count=46/blank_count=13).
update public.student_exam_documents
set correct_count = 56,
    wrong_count = 47,
    blank_count = 12,
    score_net = 14,
    extracted_data = jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(
            jsonb_set(
              jsonb_set(
                jsonb_set(
                  jsonb_set(
                    jsonb_set(extracted_data, '{items,9}', '"errada"'),
                    '{items,10}', '"branco"'
                  ),
                  '{items,11}', '"errada"'
                ),
                '{items,12}', '"branco"'
              ),
              '{items,14}', '"errada"'
            ),
            '{items,15}', '"errada"'
          ),
          '{items,16}', '"errada"'
        ),
        '{items,18}', '"correta"'
      ),
      '{items,20}', '"errada"'
    ) || jsonb_build_object(
      'by_subject', '{
        "Língua Portuguesa": {"total":13,"correct":4,"wrong":6,"annulled":1,"blank":2},
        "Lei 12.846/2013": {"total":2,"correct":1,"wrong":1,"annulled":0,"blank":0},
        "Ética, Moral e Sindicância": {"total":4,"correct":2,"wrong":2,"annulled":0,"blank":0},
        "Raciocínio Lógico": {"total":5,"correct":2,"wrong":2,"annulled":0,"blank":1},
        "Microsoft Office e Informática": {"total":6,"correct":4,"wrong":2,"annulled":0,"blank":0},
        "Direito Constitucional e Administrativo": {"total":14,"correct":7,"wrong":5,"annulled":1,"blank":1},
        "Direito Penal e Processual Penal": {"total":18,"correct":9,"wrong":7,"annulled":2,"blank":0},
        "Direitos Humanos e Política Penitenciária": {"total":8,"correct":3,"wrong":3,"annulled":0,"blank":2},
        "Regras da ONU e Legislação Especial": {"total":10,"correct":4,"wrong":5,"annulled":0,"blank":1},
        "Plano Nacional de Política Criminal e Penitenciária": {"total":7,"correct":4,"wrong":3,"annulled":0,"blank":0},
        "SUSP e Execução Penal": {"total":9,"correct":4,"wrong":4,"annulled":0,"blank":1},
        "Regulamento Penitenciário Federal": {"total":24,"correct":12,"wrong":7,"annulled":1,"blank":4}
      }'::jsonb
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado (colado com título "Polícia Penal Federal" por engano de digitação, mas confirmado como DEPEN pelo conteúdo idêntico a 111/120 itens já salvos). Resultado: 56 corretas, 47 erradas, 5 anuladas, 12 em branco. Nota líquida final 14 (56-47+5), regra CEBRASPE (brancas não descontam). Língua Portuguesa e Regras da ONU/Legislação Especial ficaram com líquido negativo.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Departamento Penitenciário Nacional'
  and contest_year = '2021'
  and doc_type = 'resultado';
