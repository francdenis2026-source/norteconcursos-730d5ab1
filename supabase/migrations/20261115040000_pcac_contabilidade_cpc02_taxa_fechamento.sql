-- PC-AC 2026: acrescenta questão baseada no material Consulplan/CFC 2020.2 ao módulo de moeda estrangeira.
update public.study_materials
set body_md='# Aula 12 — Operações em moeda estrangeira e CPC 02

## 1. Conversão de ativos e passivos na data do balanço
A questão Consulplan/Exame CFC 2020.2 pergunta qual taxa deve ser utilizada para converter ativos e passivos celebrados em moeda estrangeira na data do balanço. A alternativa correta é **C — taxa de câmbio da data de fechamento na data do respectivo balanço**.

**Jeito fácil de lembrar:** se a pergunta fala em converter ativos e passivos na data do balanço, procure a taxa de fechamento. Não escolha a taxa média do exercício nem a taxa histórica da data da transação para essa conversão de fechamento.

## 2. Taxa da transação e taxa de fechamento
A taxa da data da transação está relacionada ao reconhecimento inicial da operação. Já a questão do material trata da conversão de ativos e passivos na data do balanço e aponta a taxa de fechamento. Leia com atenção o momento ao qual a pergunta se refere.

## 3. Variação cambial
O material define variação cambial como a diferença resultante da conversão de um número específico de unidades de uma moeda para outra moeda, a diferentes taxas cambiais.

Em linguagem simples: quando o mesmo valor em moeda estrangeira é convertido usando taxas diferentes, aparece uma diferença cambial.

## 4. Moeda funcional
**Moeda funcional é a moeda do ambiente econômico principal no qual a entidade opera.** Não é necessariamente a moeda do país onde está o maior cliente, nem a taxa de câmbio usada para liquidar uma operação.

## 5. Questão original do material — Consulplan/CFC 2020.2
O enunciado pergunta qual taxa deve ser usada para converter ativos e passivos em moeda estrangeira. As alternativas são: média do exercício; data de ocorrência das transações; data de fechamento do respectivo balanço; taxa livremente estipulada pelo contador.

**Resposta: alternativa C — data de fechamento do respectivo balanço.**

## Pegadinhas
- Taxa de fechamento não é a mesma coisa que taxa da data da transação.
- A taxa não é livremente escolhida pelo contador.
- Variação cambial é diferença decorrente de conversão a taxas distintas.
- Moeda funcional está ligada ao ambiente econômico principal da entidade.

## Treino autoral
1. Na questão Consulplan/CFC 2020.2, para converter ativos e passivos em moeda estrangeira na data do balanço, a taxa indicada é a de fechamento. **Certo ou errado?**
2. A taxa média do exercício foi a alternativa indicada para a conversão de ativos e passivos na data do balanço. **Certo ou errado?**

**Gabarito comentado:** 1. Certo. A questão aponta a taxa de fechamento. 2. Errado. A alternativa correta é a taxa de fechamento, não a média do exercício.',
flashcards='[{"f":"Qual taxa é indicada para converter ativos e passivos na data do balanço na questão CFC 2020.2?","b":"Taxa de câmbio da data de fechamento do respectivo balanço."},{"f":"O que é variação cambial?","b":"Diferença resultante da conversão de unidades monetárias a diferentes taxas de câmbio."},{"f":"O que é moeda funcional?","b":"Moeda do ambiente econômico principal no qual a entidade opera."},{"f":"Moeda funcional é necessariamente a moeda do país do maior cliente?","b":"Não. É a moeda do ambiente econômico principal da entidade."},{"f":"Qual é a pegadinha central da questão sobre CPC 02?","b":"Não confundir taxa de fechamento com taxa da data da transação ou taxa média."},{"f":"Qual alternativa correta da questão Consulplan/CFC 2020.2 sobre ativos e passivos em moeda estrangeira?","b":"Alternativa C: taxa de câmbio da data de fechamento do respectivo balanço."}]'::jsonb,
quiz='[{"q":"A taxa para conversão de ativos e passivos na data do balanço, segundo a questão enviada, é a taxa de fechamento.","a":true,"why":"A questão Consulplan/CFC 2020.2 aponta a alternativa C."},{"q":"Variação cambial é uma diferença resultante da conversão a diferentes taxas.","a":true,"why":"Essa é a definição cobrada no material."},{"q":"Moeda funcional é a moeda do ambiente econômico principal da entidade.","a":true,"why":"É a definição apresentada na questão sobre a empresa exportadora."},{"q":"A taxa média do exercício foi a alternativa indicada para converter ativos e passivos na data do balanço.","a":false,"why":"A alternativa correta é a taxa de fechamento do respectivo balanço."},{"q":"A taxa para conversão de ativos e passivos na data do balanço é livremente estipulada pelo contador.","a":false,"why":"A questão indica a taxa de fechamento, não uma taxa livre."},{"q":"Na questão Consulplan/CFC 2020.2, a alternativa correta sobre a taxa de conversão é a letra C.","a":true,"why":"A letra C afirma taxa de câmbio da data de fechamento na data do respectivo balanço."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-12-moeda-estrangeira-cpc02-moeda-funcional'
and content_status='active'
and body_md not like '%A alternativa correta é **C — taxa de câmbio da data de fechamento%';
