-- Candidate resent his personal gabarito for PF 2021 (2026-09-27). Verified
-- against the previously stored record BEFORE applying (per the process
-- established after the 2014/2018 mix-up): 118/120 items identical, only
-- item 98 (C->E) and item 108 (C->blank) changed. Confirmed as a genuine
-- refinement of PF 2021, not a different year.
--
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2021, career_name='Agente de Polícia Federal'). Per CEBRASPE
-- rule in public.exam_board_scoring_rules, blanks are not discounted.
-- Result: 37 corretas, 36 erradas, 5 anuladas (itens 28,92,106,108,119),
-- 42 em branco. Nota líquida: 37 - 36 + 5 = 6 (was 8 with correct_count=38).
update public.student_exam_documents
set correct_count = 37,
    wrong_count = 36,
    blank_count = 42,
    score_net = 6,
    extracted_data = jsonb_set(
      jsonb_set(
        jsonb_set(extracted_data, '{items,98}', '"errada"'),
        '{items,108}', '"branco"'
      ),
      '{by_subject}',
      '{
        "Língua Portuguesa": {"total":24,"correct":9,"wrong":10,"annulled":0,"blank":5,"blank_pct":21},
        "Direito Administrativo": {"total":3,"correct":0,"wrong":2,"annulled":0,"blank":1,"blank_pct":33},
        "Direito Constitucional": {"total":3,"correct":2,"wrong":0,"annulled":1,"blank":0,"blank_pct":0},
        "Direito Penal e Processual Penal": {"total":4,"correct":3,"wrong":1,"annulled":0,"blank":0,"blank_pct":0},
        "Legislação Especial": {"total":2,"correct":1,"wrong":1,"annulled":0,"blank":0,"blank_pct":0},
        "Estatística": {"total":12,"correct":1,"wrong":0,"annulled":0,"blank":11,"blank_pct":92},
        "Raciocínio Lógico": {"total":12,"correct":3,"wrong":6,"annulled":0,"blank":3,"blank_pct":25},
        "Informática": {"total":36,"correct":13,"wrong":9,"annulled":1,"blank":13,"blank_pct":36},
        "Contabilidade Geral": {"total":24,"correct":5,"wrong":7,"annulled":3,"blank":9,"blank_pct":38}
      }'::jsonb
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado, verificado contra o registro anterior antes de aplicar (118/120 itens idênticos — apenas item 98 e 108 mudaram). Resultado: 37 corretas, 36 erradas, 5 anuladas, 42 em branco. Nota líquida final 6 (37-36+5), regra CEBRASPE. Estatística é a disciplina com maior lacuna de conhecimento: 92% dos itens em branco (11 de 12) — sinal de ponto fraco crítico, não apenas falta de tempo (ver public.exam_board_scoring_rules e a diretriz do candidato de sempre analisar brancos como indicador de pontos fracos).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2021'
  and doc_type = 'resultado';
