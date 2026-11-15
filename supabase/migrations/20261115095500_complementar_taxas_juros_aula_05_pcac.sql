-- Complemento do item 5.2 do edital PC-AC 2026: taxas de juros.
-- Origem identificada no próprio material: seção adicional baseada em ENAP, FGV e educação financeira.
-- O PDF "Resumo - Contabilidade Geral.pdf" não desenvolve classificação/conversão de taxas.
-- Reexecução segura pelo marcador da seção.

update public.study_materials
set body_md=body_md || $taxas$

## 7. Taxas de juros — complemento do item 5.2 do edital

> **Origem deste complemento:** o PDF "Resumo - Contabilidade Geral.pdf" não desenvolve a classificação e a conversão das taxas. Esta seção foi acrescentada separadamente, com apoio didático externo da ENAP, da FGV e de referências de educação financeira. Não é conteúdo transcrito do PDF original.

### 7.1 Taxa proporcional

É a conversão linear de taxas entre períodos, utilizada no regime de juros simples.

Exemplo: 2% ao mês correspondem proporcionalmente a 24% ao ano:
2% × 12 = 24%.

**Dica:** proporcional = multiplicar ou dividir pelo número de períodos. Não use essa regra automaticamente em juros compostos.

### 7.2 Taxa equivalente

Duas taxas são equivalentes quando, aplicadas ao mesmo capital e pelo mesmo prazo total, produzem o mesmo montante, no regime de capitalização considerado.

No regime composto:
**i₂ = (1 + i₁)ⁿ − 1**, quando o período maior contém n períodos menores.

Exemplo: 1% ao mês equivale a aproximadamente 12,68% ao ano:
(1,01)¹² − 1 = 0,1268.

**Pegadinha:** 1% × 12 = 12% é a taxa proporcional simples; não é a taxa efetiva anual equivalente em juros compostos.

### 7.3 Taxa nominal e taxa efetiva

- **Nominal:** período ao qual a taxa é anunciada não coincide com o período de capitalização. Exemplo: 12% ao ano com capitalização mensal.
- **Efetiva:** período da taxa coincide com o período de capitalização. Exemplo: 1% ao mês, com capitalização mensal.

No exemplo de 12% ao ano com capitalização mensal, a taxa por período é 12% ÷ 12 = 1% ao mês. A taxa efetiva anual correspondente, em capitalização composta, é:
(1,01)¹² − 1 ≈ 12,68%.

### 7.4 Taxa real e inflação

A taxa real mede o ganho ou custo após descontar o efeito da inflação. A relação exata é:
**1 + i_real = (1 + i_nominal) ÷ (1 + inflação)**.

Exemplo: taxa nominal de 10% e inflação de 4%:
(1,10 ÷ 1,04) − 1 ≈ 5,77% de taxa real.

Não basta subtrair 4 pontos percentuais em qualquer situação; a fórmula exata considera a relação entre os fatores.

### 7.5 Como identificar a taxa na questão

1. Circule a unidade: ao dia, ao mês, ao trimestre, ao semestre ou ao ano.
2. Observe a capitalização: simples ou composta.
3. Veja se a questão pede taxa proporcional ou equivalente.
4. Se aparecer "taxa nominal com capitalização mensal", converta para a taxa do período de capitalização.
5. Se aparecer inflação, verifique se a questão pede taxa real.
6. Só então substitua na fórmula.

**Resumo para memorizar:**
- Proporcional: conversão linear, associada aos juros simples.
- Equivalente: mesmo montante no prazo considerado.
- Nominal: período da taxa diferente do período de capitalização.
- Efetiva: período da taxa igual ao período de capitalização.
- Real: taxa após considerar a inflação.

## 8. Questões de fixação — taxas de juros

**Questão 1.** Uma taxa de 2% ao mês corresponde a 24% ao ano pelo critério proporcional simples. **Certo.** Cálculo: 2% × 12 = 24%.

**Questão 2.** Em juros compostos, 1% ao mês equivale a 12% ao ano. **Errado.** A taxa efetiva anual equivalente é (1,01)¹² − 1 ≈ 12,68%.

**Questão 3.** Uma taxa de 12% ao ano com capitalização mensal é nominal, pois o período da taxa é diferente do período de capitalização. **Certo.**

**Questão 4.** Uma taxa de 1% ao mês, com capitalização mensal, é efetiva. **Certo.**

**Questão 5.** Se a taxa nominal é 10% e a inflação é 4%, a taxa real exata é 6%. **Errado.** (1,10 ÷ 1,04) − 1 ≈ 5,77%.

**Questão 6.** Duas taxas são equivalentes quando, aplicadas ao mesmo capital pelo mesmo prazo total, geram o mesmo montante. **Certo.**

**Questão 7.** A taxa proporcional e a taxa equivalente são sempre iguais, qualquer que seja o regime de capitalização. **Errado.** Em juros compostos, a equivalência considera capitalização exponencial.
$taxas$,
flashcards=coalesce(flashcards,'[]'::jsonb)||'[
{"f":"Conversão linear entre períodos, usada no regime simples.","b":"O que é taxa proporcional?"},
{"f":"Taxas que produzem o mesmo montante no mesmo prazo e para o mesmo capital.","b":"O que são taxas equivalentes?"},
{"f":"Período da taxa diferente do período de capitalização.","b":"O que caracteriza taxa nominal?"},
{"f":"Período da taxa igual ao período de capitalização.","b":"O que caracteriza taxa efetiva?"},
{"f":"A taxa após considerar o efeito da inflação.","b":"O que representa a taxa real?"},
{"f":"Aproximadamente 12,68% ao ano: (1,01)¹² − 1.","b":"Quanto equivale 1% ao mês em taxa efetiva anual composta?"}]'::jsonb,
quiz=coalesce(quiz,'[]'::jsonb)||'[
{"q":"Em juros simples, 2% ao mês correspondem a 24% ao ano pelo critério proporcional.","a":true,"why":"2% × 12 = 24%, na conversão linear."},
{"q":"Em juros compostos, 1% ao mês equivale exatamente a 12% ao ano.","a":false,"why":"A taxa efetiva anual é (1,01)¹² − 1, aproximadamente 12,68%."},
{"q":"Uma taxa de 12% ao ano com capitalização mensal é nominal.","a":true,"why":"O período de referência anual difere do período mensal de capitalização."},
{"q":"Uma taxa de 1% ao mês com capitalização mensal é efetiva.","a":true,"why":"O período da taxa coincide com o período de capitalização."},
{"q":"A taxa real considera o efeito da inflação.","a":true,"why":"A taxa real expressa o ganho ou custo descontado o efeito inflacionário."},
{"q":"Taxas equivalentes produzem o mesmo montante para o mesmo capital e prazo total.","a":true,"why":"Essa é a definição operacional de equivalência de taxas."},
{"q":"Taxas proporcionais e equivalentes são sempre iguais em juros compostos.","a":false,"why":"A proporcionalidade é linear; a equivalência composta utiliza capitalização exponencial."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-05-matematica-financeira-juros-descontos'
and position('## 7. Taxas de juros — complemento do item 5.2 do edital' in body_md)=0;