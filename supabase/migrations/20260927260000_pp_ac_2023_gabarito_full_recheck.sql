-- Candidate resent his personal gabarito for PP-AC 2023 (2026-09-27, versão
-- B). Verified against the previously stored candidate_answers BEFORE
-- applying: 57/60 identical, only items 6 (blank -> A), 45 (A -> B) and 53
-- (C -> D) changed.
--
-- While recomputing from scratch against public.official_exam_questions,
-- TWO PRE-EXISTING GRADING BUGS were found, unrelated to this resend (the
-- candidate's answer for these items never changed across sessions):
--   * item 39: candidate answered D, official answer is D -> was wrongly
--     classified "errada", should be "correta" (+2 pts, Específicos).
--   * item 51: candidate answered D, official answer is D -> was wrongly
--     classified "errada", should be "correta" (+2 pts, Específicos).
-- A third pre-existing bug (item 9: candidate answered C, official is A,
-- was wrongly classified "correta") self-corrects here since item 9 is
-- recomputed from scratch as "errada" (-1 pt, Gerais) in this same pass.
--
-- Full recompute, per the official edital formula (item 7.1.1/7.1.3):
-- Conhecimentos Gerais (itens 1-30) = 1 pt/questão; Conhecimentos
-- Específicos (itens 31-60) = 2 pts/questão. No negative marking (IBFC).
--   Gerais: 26/30 (Língua Portuguesa 7/10, História e Geografia do Acre
--     10/10, Informática Básica 9/10)
--   Específicos: 46/60
--   TOTAL: 72/90 (was 70/90)
--
-- The candidate's COMBINED score (objetiva + discursiva = 85,40) was
-- already confirmed in the Diário Oficial do Estado do Acre — that total is
-- fixed and authoritative. Only the objetiva/discursiva SPLIT was ever a
-- deduction made by this project (never published separately by the
-- government), so correcting the objetiva component to 72 means the
-- discursiva component is now deduced as 85,40 - 72 = 13,40 (was 15,40).
update public.student_exam_documents
set correct_count = 49,
    wrong_count = 11,
    blank_count = 0,
    score_net = 72,
    score_raw = 85.40,
    extracted_data = jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(
            jsonb_set(
              jsonb_set(extracted_data, '{items,6}', '"errada"'),
              '{items,9}', '"errada"'
            ),
            '{items,39}', '"correta"'
          ),
          '{items,45}', '"errada"'
        ),
        '{items,51}', '"correta"'
      ),
      '{items,53}', '"errada"'
    ) || jsonb_build_object(
      'candidate_answers', (extracted_data->'candidate_answers') || jsonb_build_object('6','A','45','B','53','D'),
      'pontuacao_obtida', jsonb_build_object(
        'total', 72,
        'gerais_total', 26,
        'lingua_portuguesa', jsonb_build_object('de', 10, 'pontos', 7, 'corretas', 7),
        'historia_geografia_acre', jsonb_build_object('de', 10, 'pontos', 10, 'corretas', 10),
        'informatica_basica', jsonb_build_object('de', 10, 'pontos', 9, 'corretas', 9),
        'especificos', jsonb_build_object('de', 30, 'pontos', 46, 'corretas', 23)
      ),
      'confirmacao_diario_oficial', jsonb_build_object(
        'nome', 'Franc Denis Barroso de Oliveira',
        'fonte', 'Diário Oficial do Estado do Acre',
        'nota_objetiva_calculada', 72,
        'nota_discursiva_deduzida', 13.40,
        'nota_combinada_objetiva_mais_discursiva', 85.40
      )
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado, verificado contra o registro anterior (57/60 itens idênticos — apenas itens 6, 45 e 53 mudaram). Ao recalcular do zero contra o gabarito oficial, foram encontrados 2 erros de classificação PRÉ-EXISTENTES e não relacionados ao reenvio: itens 39 e 51 (candidato respondeu D em ambos, que bate com o oficial) estavam marcados como errada por engano em sessão anterior — corrigidos para correta (+2 pts cada). O item 9 (candidato respondeu C, oficial é A) estava marcado como correta por engano — corrigido para errada (-1 pt). Resultado: Gerais 26/30 (Língua Portuguesa 7/10, História e Geografia do Acre 10/10, Informática 9/10), Específicos 46/60 (23 corretas). TOTAL OBJETIVA: 72/90 (era 70/90). A nota COMBINADA (objetiva + discursiva = 85,40) já é confirmada no Diário Oficial do Estado do Acre e não muda — só a divisão entre objetiva/discursiva é deduzida por este projeto; com a objetiva corrigida para 72, a discursiva deduzida passa a ser 13,40 (era 15,40). Candidato segue HABILITADO em ambos os critérios (mínimo objetiva 45, mínimo discursiva 10).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Penal do Acre'
  and contest_year = '2023'
  and doc_type = 'resultado';
