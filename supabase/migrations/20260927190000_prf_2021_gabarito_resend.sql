-- Candidate resent his personal gabarito for PRF 2021 (2026-09-27). Verified
-- against the previously stored record BEFORE applying: 106/110 comparable
-- items identical, only items 28, 29, 30 and 79 changed. Confirmed as a
-- genuine refinement of PRF 2021, not a different year.
--
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2021, career_name matches '%Rodovi%'). Per CEBRASPE rule in
-- public.exam_board_scoring_rules, blanks are not discounted.
-- Result: 53 corretas, 43 erradas, 10 anuladas, 14 em branco.
-- Nota líquida: 53 - 43 + 10 = 20 (was 21 with wrong_count=42/blank_count=15).
update public.student_exam_documents
set correct_count = 53,
    wrong_count = 43,
    blank_count = 14,
    score_net = 20,
    extracted_data = jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(extracted_data, '{items,28}', '"correta"'),
          '{items,29}', '"errada"'
        ),
        '{items,30}', '"branco"'
      ),
      '{items,79}', '"correta"'
    ) || jsonb_build_object(
      'by_subject', '{
        "Língua Estrangeira - Inglês": {"total":8,"correct":4,"wrong":2,"annulled":1,"blank":1},
        "Língua Portuguesa": {"total":18,"correct":8,"wrong":9,"annulled":0,"blank":1},
        "Raciocínio Lógico-Matemático": {"total":6,"correct":2,"wrong":1,"annulled":0,"blank":3},
        "Informática": {"total":7,"correct":3,"wrong":2,"annulled":1,"blank":1},
        "Física": {"total":5,"correct":1,"wrong":2,"annulled":0,"blank":2},
        "Ética no Serviço Público": {"total":6,"correct":3,"wrong":2,"annulled":1,"blank":0},
        "Geografia dos Transportes": {"total":5,"correct":1,"wrong":2,"annulled":0,"blank":2},
        "Direito de Trânsito": {"total":30,"correct":11,"wrong":13,"annulled":4,"blank":2},
        "Direito Administrativo": {"total":7,"correct":3,"wrong":3,"annulled":1,"blank":0},
        "Direito Constitucional": {"total":7,"correct":4,"wrong":1,"annulled":2,"blank":0},
        "Direito Penal e Processual Penal": {"total":16,"correct":9,"wrong":5,"annulled":0,"blank":2},
        "Direitos Humanos": {"total":5,"correct":4,"wrong":1,"annulled":0,"blank":0}
      }'::jsonb
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado, verificado contra o registro anterior antes de aplicar (106/110 itens idênticos — apenas itens 28, 29, 30 e 79 mudaram). Resultado: 53 corretas, 43 erradas, 10 anuladas, 14 em branco. Nota líquida final 20 (53-43+10), regra CEBRASPE (brancas não descontam). Maiores concentrações de branco: Raciocínio Lógico-Matemático (50%) e Física/Geografia dos Transportes (40% cada) — sinal de lacuna de base nessas disciplinas, não apenas falta de tempo.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2021'
  and doc_type = 'resultado';
