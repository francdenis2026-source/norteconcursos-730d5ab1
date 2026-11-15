-- Revisão de qualidade dos exercícios ativos de Contabilidade PC-AC 2026.
-- Corrige enunciados que dependiam de contexto implícito e substitui itens repetidos.
-- Mantém a quantidade de questões e suas justificativas. Aplicação segura por índices conhecidos.

update public.study_materials
set quiz=jsonb_set(
  jsonb_set(
    jsonb_set(quiz,
      '{5}',
      '{"a":true,"q":"Dois sócios integralizam R$ 25.000 cada em dinheiro. Qual é o total incorporado ao capital social?","why":"Somamos os aportes: R$ 25.000 + R$ 25.000 = R$ 50.000. O enunciado contém todos os dados necessários."}'::jsonb),
      '{7}',
      '{"a":true,"q":"Uma entidade começou com R$ 50.000 em caixa, pagou R$ 20.000 à vista por um escritório e R$ 15.000 à vista por móveis. Ao final, restaram R$ 15.000 em caixa.","why":"Caixa final = R$ 50.000 − R$ 20.000 − R$ 15.000 = R$ 15.000. Os bens adquiridos continuam registrados no Ativo."}'::jsonb),
      '{8}',
      '{"a":true,"q":"Uma entidade possui escritório de R$ 100.000, móveis de R$ 15.000 e caixa de R$ 15.000. O Ativo total é R$ 130.000, mesmo que R$ 80.000 do escritório tenham sido financiados.","why":"Ativo = escritório R$ 100.000 + móveis R$ 15.000 + caixa R$ 15.000 = R$ 130.000. O financiamento de R$ 80.000 é obrigação no Passivo, não desconto do valor do Ativo."}'::jsonb),
updated_at=now()
where slug='pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo';

update public.study_materials
set quiz=jsonb_set(quiz,'{7}',
'{"a":true,"q":"O recebimento de uma duplicata de R$ 1.000 acrescida de R$ 100 de juros, totalizando R$ 1.100, é um fato misto aumentativo.","why":"Há troca patrimonial (entrada de caixa e baixa do direito a receber) e reconhecimento de receita de juros, que aumenta o resultado e o PL."}'::jsonb),
updated_at=now()
where slug='pcac-2026-contabilidade-02-contas-receitas-despesas-fatos';

update public.study_materials
set quiz=jsonb_set(quiz,'{8}',
'{"a":true,"q":"Uma receita de serviço realizada em dezembro, mas recebida somente em janeiro, é reconhecida em dezembro quando atendidos os critérios do regime de competência.","why":"Pelo regime de competência, a receita é reconhecida no período em que é gerada, e não necessariamente na data do recebimento."}'::jsonb),
updated_at=now()
where slug='pcac-2026-contabilidade-04-demonstracoes-balanco-dre-regimes';

update public.study_materials
set quiz=jsonb_set(quiz,'{5}',
'{"a":true,"q":"Se uma tarifa bancária de R$ 120 aparece no extrato e ainda não foi registrada pela empresa, o ajuste contábil reconhece a despesa e reduz Bancos em R$ 120.","why":"A empresa registra a despesa bancária debitando a despesa e creditando Bancos, reduzindo o saldo contábil."}'::jsonb),
updated_at=now()
where slug='pcac-2026-contabilidade-17-sistema-bancario-conciliacao-extrato-razao';
