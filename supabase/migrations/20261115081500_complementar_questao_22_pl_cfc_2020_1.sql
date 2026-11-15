-- Complementa a aula de Patrimônio Líquido com a segunda questão 22 do CFC 2020.1.
update public.study_materials
set body_md=body_md || $q$

## Questão original — Consulplan/CFC 2020.1, questão 22 (segunda questão): composição do Patrimônio Líquido

A questão apresenta saldos de várias contas patrimoniais em 31/12/2016 e pede o valor total do Patrimônio Líquido após a destinação do resultado.

**Resposta: alternativa C — R$ 336.600,00.**

### 1. Primeiro, identifique somente as contas do Patrimônio Líquido

- Capital subscrito: + R$ 250.000.
- Reserva de ágio na emissão de ações: + R$ 12.000.
- Reserva de incentivos fiscais: + R$ 45.000.
- Reserva legal: + R$ 32.500.
- Reserva estatutária: + R$ 42.100.
- Capital a integralizar: − R$ 8.000.
- Gastos com emissão de títulos patrimoniais: − R$ 9.000.
- Ações em tesouraria: − R$ 28.000.

### 2. Faça a soma

250.000 + 12.000 + 45.000 + 32.500 + 42.100 − 8.000 − 9.000 − 28.000 = **R$ 336.600**.

### 3. Por que as outras contas não entram?

Caixa, edificações, terrenos, mercadorias, patentes, veículos, investimentos em controladas, adiantamentos, clientes e aplicações são contas do Ativo. Fornecedores, salários a pagar, impostos a recolher, dividendos a pagar, adiantamentos recebidos de clientes e empréstimos são contas do Passivo. Depreciação acumulada e exaustão acumulada são contas redutoras do Ativo, não do Patrimônio Líquido.

### Macete para acertar

No PL, procure:
- Capital e reservas: normalmente somam.
- Capital a integralizar: subtrai.
- Gastos com emissão de títulos patrimoniais: subtraem do PL.
- Ações em tesouraria: subtraem do PL.

**Pegadinha:** não some todas as contas do balanço. A questão pede apenas o Patrimônio Líquido, não o Ativo nem o Passivo.

### Treino autoral

1. Capital subscrito de R$ 100.000 e capital a integralizar de R$ 20.000 resultam em contribuição líquida de R$ 80.000 ao PL. **Certo ou errado?**
2. Ações em tesouraria aumentam o Patrimônio Líquido. **Certo ou errado?**
3. Fornecedores e empréstimos bancários são componentes do Patrimônio Líquido. **Certo ou errado?**

**Gabarito comentado:** 1. **Certo.** 100.000 − 20.000 = 80.000. 2. **Errado.** Ações em tesouraria são redutoras do PL. 3. **Errado.** São obrigações classificadas no Passivo.
$q$,
flashcards=coalesce(flashcards,'[]'::jsonb)||'[
{"f":"Questão 22 (segunda) CFC 2020.1: qual é o Patrimônio Líquido?","b":"R$ 336.600 — alternativa C."},
{"f":"Quais contas reduzem o PL na questão 22?","b":"Capital a integralizar (8.000), gastos com emissão de títulos patrimoniais (9.000) e ações em tesouraria (28.000)."},
{"f":"Fornecedores, empréstimos e salários a pagar entram no PL?","b":"Não. São contas do Passivo."},
{"f":"Ações em tesouraria aumentam ou reduzem o PL?","b":"Reduzem o Patrimônio Líquido."}]'::jsonb,
quiz=coalesce(quiz,'[]'::jsonb)||'[
{"q":"Na segunda questão 22 do CFC 2020.1, o Patrimônio Líquido é R$ 336.600.","a":true,"why":"Somam-se capital e reservas e subtraem-se capital a integralizar, gastos de emissão e ações em tesouraria."},
{"q":"Ações em tesouraria são adicionadas ao Patrimônio Líquido.","a":false,"why":"São conta redutora do Patrimônio Líquido."},
{"q":"Fornecedores e empréstimos bancários devem ser somados ao PL.","a":false,"why":"São obrigações classificadas no Passivo."}]'::jsonb,
source_note=concat_ws('; ',nullif(source_note,''),'Questão 22 (segunda questão, Patrimônio Líquido), Consulplan/CFC 2020.1, PDF Prova 2020.1 - Resolvida - Parte 03, páginas 7–8.'),
updated_at=now()
where slug='pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos'
and position('Questão original — Consulplan/CFC 2020.1, questão 22 (segunda questão)' in body_md)=0;
