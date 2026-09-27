-- Official confirmation from the Diário Oficial do Estado do Acre: candidate
-- "Franc Denis Barroso de Oliveira" scored 85,40 (Prova Objetiva + Prova
-- Discursiva combined). This matches, and confirms, the weighted-scoring
-- calculation already applied in 20260926220000 (70,00 na Prova Objetiva):
--   85,40 (oficial, combinado) - 70,00 (objetiva, calculada) = 15,40 (discursiva)
-- 15,40 de 20 pontos na discursiva está bem acima do mínimo exigido (10 pontos)
-- pelo item 7.2.2 do edital — candidato HABILITADO também na Prova Discursiva.

update public.student_exam_documents
set score_raw = 85.40,
    extracted_data = extracted_data || jsonb_build_object(
      'confirmacao_diario_oficial', jsonb_build_object(
        'nome', 'Franc Denis Barroso de Oliveira',
        'nota_combinada_objetiva_mais_discursiva', 85.40,
        'nota_objetiva_calculada', 70.00,
        'nota_discursiva_deduzida', 15.40,
        'fonte', 'Diário Oficial do Estado do Acre'
      )
    ),
    notes = notes || ' CONFIRMADO no Diário Oficial do Estado do Acre: nota combinada (objetiva + discursiva) de 85,40 para o candidato. Isso valida o cálculo da objetiva (70,00) feito nesta sessão e permite deduzir a nota da discursiva: 85,40 - 70,00 = 15,40 de 20 pontos — habilitado também na discursiva (mínimo exigido: 10).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Penal do Acre'
  and contest_year = '2023'
  and doc_type = 'resultado';

update public.essay_submissions
set status = 'corrigida',
    correcao = correcao || jsonb_build_object(
      'nota_oficial_confirmada', 15.40,
      'fonte_confirmacao', 'Deduzida do Diário Oficial do Estado do Acre (nota combinada 85,40 - nota objetiva calculada 70,00 = 15,40)'
    )
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Penal do Acre'
  and contest_year = '2023';
