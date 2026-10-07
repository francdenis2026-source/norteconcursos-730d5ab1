-- A questão pf25-013 (Contabilidade Geral, equação patrimonial) é a única
-- questão curada de Contabilidade sem o bloco "Exemplo:" na explicação —
-- sem ele, hasReviewedExplanation() nunca marca a questão como "revisada"
-- no Treinador. Acrescenta um exemplo do dia a dia, sem alterar enunciado,
-- gabarito nem base legal.
begin;

update public.curated_question_catalog
set explanation = explanation || E'\n\nExemplo: uma loja tem R$ 50.000 em bens e direitos (ativo) e deve R$ 30.000 a fornecedores e bancos (passivo exigível). Pela equação patrimonial, PL = Ativo − Passivo exigível = 50.000 − 30.000 = R$ 20.000, positivo — exatamente o caso descrito no enunciado, em que o ativo supera o passivo exigível.'
where external_item_key = 'pf25-013'
  and explanation not like '%Exemplo:%';

commit;
