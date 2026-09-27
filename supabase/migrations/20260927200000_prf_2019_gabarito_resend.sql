-- Candidate resent his personal gabarito for PRF 2019 (2026-09-27). Verified
-- against the previously stored record BEFORE applying: 118/120 comparable
-- items identical, only item 40 (previously blank, now "E") and item 62
-- (C -> E, an annulled item so it doesn't change scoring) changed. Confirmed
-- as a genuine refinement of PRF 2019, not a different year.
--
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2019, career_name matches '%Rodovi%'). Per CEBRASPE rule in
-- public.exam_board_scoring_rules, blanks are not discounted.
-- Result: 66 corretas, 39 erradas, 12 anuladas, 3 em branco.
-- Nota líquida: 66 - 39 + 12 = 39 (was 40 with wrong_count=38/blank_count=4).
update public.student_exam_documents
set correct_count = 66,
    wrong_count = 39,
    blank_count = 3,
    score_net = 39,
    extracted_data = jsonb_set(
      jsonb_set(extracted_data, '{items,40}', '"errada"'),
      '{by_subject}',
      '{
        "Língua Portuguesa": {"total":20,"correct":17,"wrong":2,"annulled":1,"blank":0},
        "Raciocínio Lógico-Matemático": {"total":20,"correct":11,"wrong":6,"annulled":2,"blank":1},
        "Ética no Serviço Público": {"total":4,"correct":1,"wrong":3,"annulled":0,"blank":0},
        "Atualidades e Geografia": {"total":6,"correct":1,"wrong":5,"annulled":0,"blank":0},
        "Direito de Trânsito": {"total":40,"correct":21,"wrong":13,"annulled":6,"blank":0},
        "Direito Administrativo": {"total":5,"correct":2,"wrong":1,"annulled":1,"blank":1},
        "Direito Constitucional": {"total":5,"correct":1,"wrong":4,"annulled":0,"blank":0},
        "Direito Penal e Processual Penal": {"total":15,"correct":8,"wrong":5,"annulled":2,"blank":0},
        "Direitos Humanos": {"total":5,"correct":4,"wrong":0,"annulled":0,"blank":1}
      }'::jsonb
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado, verificado contra o registro anterior antes de aplicar (118/120 itens idênticos — apenas itens 40 e 62 mudaram, sendo o 62 anulado e portanto neutro para a nota). Resultado: 66 corretas, 39 erradas, 12 anuladas, 3 em branco. Nota líquida final 39 (66-39+12), regra CEBRASPE (brancas não descontam). Piores disciplinas: Atualidades e Geografia (líquido -4, 16,7% de acerto) e Direito Constitucional (líquido -3, 20% de acerto) — não é lacuna de branco, é erro de conceito nas poucas questões respondidas.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2019'
  and doc_type = 'resultado';
