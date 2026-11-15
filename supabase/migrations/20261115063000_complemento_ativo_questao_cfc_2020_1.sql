-- Complemento da aula 1 com a questão 24 do Exame CFC 2020.1.
update public.study_materials set
body_md=left(body_md,position('## Questão original — Consulplan/CFC 2020.1, questão 24: composição do Ativo' in body_md)-1) || $lesson$
## Questão original — Consulplan/CFC 2020.1, questão 24: composição do Ativo

Marcos e Roberto contribuíram com R$ 25.000 cada para constituir uma sociedade. Com parte dos recursos, compraram um escritório por R$ 100.000, pagando R$ 20.000 à vista e financiando R$ 80.000 a longo prazo. Também compraram móveis e utensílios por R$ 15.000 à vista. A questão pergunta o valor do Ativo.

**Resposta: alternativa A — R$ 130.000,00.**

### Resolução passo a passo

1. Aportes dos sócios: 25.000 + 25.000 = **R$ 50.000 em caixa**.
2. Compra do escritório: o imóvel entra no Ativo por **R$ 100.000**. Saem R$ 20.000 do caixa e nasce uma dívida de R$ 80.000 a longo prazo.
3. Compra de móveis e utensílios: entram bens de **R$ 15.000** e saem R$ 15.000 do caixa.
4. Caixa restante: 50.000 − 20.000 − 15.000 = **R$ 15.000**.

O Ativo final é composto por:
- Escritório: R$ 100.000.
- Móveis e utensílios: R$ 15.000.
- Caixa restante: R$ 15.000.

**Ativo total = 100.000 + 15.000 + 15.000 = R$ 130.000.**

### Conferência pela equação patrimonial

- Ativo: R$ 130.000.
- Passivo: financiamento de longo prazo de R$ 80.000.
- Patrimônio Líquido: capital aportado de R$ 50.000.

A equação fecha: **130.000 = 80.000 + 50.000**.

### Pegadinha

Não some apenas os bens comprados e esqueça o dinheiro que sobrou em caixa. Também não desconte o financiamento do valor do imóvel: o imóvel é registrado no Ativo pelo valor integral, e a dívida aparece separadamente no Passivo.

### Treino autoral

1. Os dois sócios aportaram juntos R$ 50.000. **Certo ou errado?**
2. O escritório deve ser registrado no Ativo por R$ 100.000, ainda que R$ 80.000 tenham sido financiados. **Certo ou errado?**
3. Após as duas compras, restaram R$ 15.000 em caixa. **Certo ou errado?**
4. O Ativo final é R$ 130.000. **Certo ou errado?**

**Gabarito comentado**
1. **Certo.** 25.000 + 25.000 = 50.000.
2. **Certo.** A dívida não reduz o valor de reconhecimento do imóvel.
3. **Certo.** 50.000 − 20.000 − 15.000 = 15.000.
4. **Certo.** 100.000 de escritório + 15.000 de móveis + 15.000 de caixa = 130.000.
$lesson$,
flashcards='[{"f":"Qual é o objeto da Contabilidade?","b":"O patrimônio das entidades."},{"f":"Qual é a finalidade da Contabilidade?","b":"Produzir informações úteis para controle, avaliação e tomada de decisões."},{"f":"O que integra o ativo?","b":"Recursos econômicos controlados pela entidade, como bens e direitos."},{"f":"O que representa o passivo?","b":"Obrigações presentes da entidade perante terceiros."},{"f":"Qual é a equação fundamental?","b":"Ativo = Passivo + Patrimônio Líquido."},{"f":"Na questão CFC 2020.1, questão 24, qual é o valor do Ativo?","b":"R$ 130.000 — escritório de R$ 100.000 + móveis de R$ 15.000 + caixa restante de R$ 15.000."},{"f":"Quanto os dois sócios aportaram juntos?","b":"R$ 50.000 — R$ 25.000 de cada sócio."},{"f":"Quanto sobrou em caixa depois das compras?","b":"R$ 15.000 — 50.000 − 20.000 − 15.000."},{"f":"Financiamento de longo prazo é Ativo ou Passivo?","b":"Passivo, pois representa obrigação da entidade."},{"f":"Como conferir a equação patrimonial na questão CFC 2020.1?","b":"Ativo de R$ 130.000 = Passivo de R$ 80.000 + PL de R$ 50.000."}]'::jsonb,
quiz='[{"q":"O objeto da Contabilidade é o patrimônio das entidades.","a":true,"why":"A Contabilidade identifica, registra e informa os fatos que afetam o patrimônio."},{"q":"O patrimônio líquido corresponde à soma dos bens, direitos e obrigações.","a":false,"why":"Essa descrição se refere ao patrimônio em sentido amplo. O PL é o valor residual dos ativos após a dedução dos passivos."},{"q":"Valores a receber de clientes são classificados no ativo.","a":true,"why":"Representam direitos da entidade contra terceiros."},{"q":"Fornecedores a pagar são classificados no passivo.","a":true,"why":"São obrigações presentes perante terceiros."},{"q":"Se o ativo é R$ 20.000 e o passivo é R$ 12.000, o PL é R$ 32.000.","a":false,"why":"PL = Ativo − Passivo = R$ 8.000."},{"q":"Os dois sócios aportaram juntos R$ 50.000.","a":true,"why":"25.000 + 25.000 = 50.000."},{"q":"O escritório deve ser registrado no Ativo por R$ 100.000, ainda que R$ 80.000 tenham sido financiados.","a":true,"why":"O imóvel é reconhecido pelo valor integral; o financiamento é obrigação no Passivo."},{"q":"Após pagar R$ 20.000 pelo escritório e R$ 15.000 pelos móveis, restaram R$ 15.000 em caixa.","a":true,"why":"50.000 − 20.000 − 15.000 = 15.000."},{"q":"Na questão 24 do CFC 2020.1, o Ativo final é R$ 115.000.","a":false,"why":"Faltou incluir os R$ 15.000 que permaneceram em caixa. O total é R$ 130.000."},{"q":"A equação patrimonial final é 130.000 = 80.000 + 50.000.","a":true,"why":"Ativo 130.000 = financiamento 80.000 + capital próprio 50.000."}]'::jsonb,
source_note=concat_ws('; ',nullif(source_note,''),'Questão 24, Consulplan/Exame CFC 2020.1, Prova 2020.1 - Resolvida - Parte 03.pdf, página 10.'),
updated_at=now()
where slug='pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo'
and position('## Questão original — Consulplan/CFC 2020.1, questão 24: composição do Ativo' in body_md)>0;
