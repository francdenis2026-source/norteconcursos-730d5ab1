-- Clarify the interpretation of a negative standardized z score.
update public.study_materials m
set quiz=(
 select jsonb_agg(
  case when x.ordinality=10 then jsonb_set(x.value,'{why}',to_jsonb(((x.value->>'why') || ' O cálculo é z=(x−μ)/σ. Como o desvio-padrão σ é positivo, o sinal de z depende da diferença x−μ. Se x for menor que a média μ, essa diferença será negativa e o escore z também. Exemplo: média 50, desvio-padrão 10 e valor 40 resultam em z=−1, ou seja, um desvio-padrão abaixo da média.')::text),true)
  else x.value end order by x.ordinality
 )
 from jsonb_array_elements(m.quiz) with ordinality x(value,ordinality)
),updated_at=now()
where m.contest_name='PC-AC 2026'
and m.discipline='Estatística'
and m.slug='pcac-2026-estatistica-12-distribuicoes-probabilidade';
