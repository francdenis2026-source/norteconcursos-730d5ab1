-- PC-AC 2026: reforço didático com questões Consulplan/CFC 2020.1 e 2020.2.
update public.study_materials
set body_md=body_md||'

## 7. Questão original — Consulplan/CFC 2020.1, questão 25: rateio dos custos comuns

O enunciado apresenta três departamentos: Serviços, Produção 1 e Produção 2. Pergunta quanto dos gastos comuns deve ser alocado ao Departamento de Serviços.

Dados do Departamento de Serviços: 20 m², 40 empregados e 2 máquinas. Totais: 100 m², 200 empregados e 10 máquinas.

- Energia elétrica: R$ 50.000, rateada pela área. Serviços: 20/100 × 50.000 = R$ 10.000.
- Água, telefone e alimentação: R$ 100.000, rateados pelo número de empregados. Serviços: 40/200 × 100.000 = R$ 20.000.
- Depreciação: R$ 12.000, rateada pelo número de máquinas. Serviços: 2/10 × 12.000 = R$ 2.400.

Total do Departamento de Serviços: 10.000 + 20.000 + 2.400 = **R$ 32.400 — alternativa B**.

**Como acertar sem decorar:** não use a mesma base para todos os gastos. Primeiro identifique a base indicada para cada despesa; depois calcule apenas a parcela do departamento pedido; por último, some as parcelas.

**Pegadinha:** o enunciado não pede o custo total da empresa nem o custo de um departamento de produção. Pede somente a parcela alocada ao Departamento de Serviços.',
flashcards=flashcards||'[{"f":"Qual foi o total rateado ao Departamento de Serviços na questão Consulplan/CFC 2020.1?","b":"R$ 32.400: energia R$ 10.000 + água/telefone/alimentação R$ 20.000 + depreciação R$ 2.400."},{"f":"Qual a base de rateio da energia elétrica na questão de departamentalização?","b":"Área ocupada em metros quadrados."},{"f":"Qual a base de rateio de água, telefone e alimentação?","b":"Quantidade de empregados."}]'::jsonb,
quiz=quiz||'[{"q":"Na questão Consulplan/CFC 2020.1, quanto dos gastos comuns é alocado ao Departamento de Serviços?","a":true,"why":"Energia: R$ 10.000; água/telefone/alimentação: R$ 20.000; depreciação: R$ 2.400. Total: R$ 32.400, alternativa B."},{"q":"No rateio da questão, a energia elétrica é distribuída conforme o número de empregados.","a":false,"why":"A energia é rateada pela área ocupada. Número de empregados é a base para água, telefone e alimentação."},{"q":"Na questão de rateio, a parcela da depreciação do Departamento de Serviços é R$ 2.400.","a":true,"why":"O departamento tem 2 de 10 máquinas: 2/10 × R$ 12.000 = R$ 2.400."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao'
and content_status='active';

update public.study_materials
set body_md=body_md||'

## 5. Questão original — Consulplan/CFC 2020.2: custeio pleno (RKW)

A Indústria Gama produz 500 unidades. O enunciado informa materiais diretos de R$ 10.000, mão de obra de R$ 15.000, custos indiretos de produção de R$ 25.000 e despesas de R$ 30.000. Pergunta o custo pleno unitário.

No custeio pleno (RKW), somam-se os gastos de produção e também as despesas consideradas no enunciado:

10.000 + 15.000 + 25.000 + 30.000 = R$ 80.000.

Agora divida pela produção de 500 unidades:

80.000 ÷ 500 = **R$ 160 por unidade — alternativa D**.

**Jeito fácil:** no RKW, pense em custo pleno: o cálculo absorve também as despesas. Se você somar só materiais, mão de obra e custos indiretos, chegará a R$ 50.000 e marcará uma alternativa errada.

**Pegadinha:** não confunda custo de fabricação (R$ 50.000) com custo pleno (R$ 80.000). A palavra RKW é o sinal de que as despesas apresentadas também entram no custo pleno do exercício.',
flashcards=flashcards||'[{"f":"Qual o custo pleno unitário na questão Consulplan/CFC 2020.2 da Indústria Gama?","b":"R$ 160 por unidade: (10.000 + 15.000 + 25.000 + 30.000) ÷ 500."},{"f":"Qual é a pegadinha do RKW na questão da Indústria Gama?","b":"Somar também as despesas apresentadas. Só somar custos de fabricação daria R$ 50.000, não o custo pleno de R$ 80.000."}]'::jsonb,
quiz=quiz||'[{"q":"No exercício RKW da Consulplan/CFC 2020.2, o custo pleno unitário é R$ 160.","a":true,"why":"Materiais R$ 10.000 + mão de obra R$ 15.000 + CIF R$ 25.000 + despesas R$ 30.000 = R$ 80.000. Dividido por 500 unidades = R$ 160."},{"q":"No exercício RKW, as despesas de R$ 30.000 devem ser excluídas do cálculo do custo pleno.","a":false,"why":"O RKW é custeio pleno: o exercício inclui as despesas apresentadas."},{"q":"No exercício RKW, o custo de fabricação sem as despesas é R$ 50.000.","a":true,"why":"10.000 + 15.000 + 25.000 = R$ 50.000; mas o custo pleno inclui também as despesas de R$ 30.000."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-13-custeio-rkw-variavel-ponto-equilibrio'
and content_status='active';
