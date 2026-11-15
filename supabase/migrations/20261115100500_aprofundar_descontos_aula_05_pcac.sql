-- Aprofundar descontos e atualização de valores (item 5.3) na aula 5 PC-AC 2026.
-- Complemento externo, separado do PDF Resumo - Contabilidade Geral.pdf.
-- Reexecução segura pelo marcador.

update public.study_materials
set body_md=body_md || $desc$

## 9. Descontos e atualização de valores — aprofundamento do item 5.3

> **Complemento externo:** esta explicação não consta do PDF original consultado. Foi acrescentada para desenvolver o item do edital sobre descontos e atualização de valores, com apoio de material didático da Universidade Estadual de Londrina e de material preparatório de Matemática Financeira.

### 9.1 Três conceitos que não podem ser confundidos

- **Valor nominal (N):** valor do título na data do vencimento (valor futuro ou de face).
- **Valor atual (A):** quanto o título vale na data em que é antecipado (valor presente).
- **Desconto (D):** diferença entre o valor nominal e o atual.

**D = N − A** e **A = N − D**.

### 9.2 Desconto comercial simples (por fora)

A taxa incide sobre o valor nominal:
- D = N × i × n
- A = N × (1 − i × n)

Exemplo: título de R$ 2.000, taxa de 2% ao mês, antecipado em 3 meses:
D = 2.000 × 0,02 × 3 = R$ 120.
A = 2.000 − 120 = **R$ 1.880**.

### 9.3 Desconto racional simples (por dentro)

A taxa incide sobre o valor atual:
- A = N ÷ (1 + i × n)
- D = N − A

Exemplo: título de R$ 1.320, taxa de 10% ao mês, antecipado em 2 meses:
A = 1.320 ÷ (1 + 0,10 × 2) = 1.320 ÷ 1,20 = **R$ 1.100**.
D = 1.320 − 1.100 = **R$ 220**.

**Dica de memória:** comercial = taxa sobre o valor de face (nominal); racional = taxa sobre o valor de hoje (atual).

### 9.4 Desconto racional composto

É a atualização para valor presente em regime composto:
**A = N ÷ (1 + i)ⁿ**.

Exemplo: valor nominal de R$ 1.210, taxa de 10% por período e 2 períodos:
A = 1.210 ÷ (1,10)² = 1.210 ÷ 1,21 = **R$ 1.000**.

### 9.5 Como escolher a fórmula

1. Se o enunciado informar desconto comercial ou bancário, identifique a base nominal.
2. Se informar desconto racional, a base é o valor atual.
3. Se disser simples, o prazo multiplica a taxa.
4. Se disser composto, há potência pelo número de períodos.
5. Confira se o resultado pedido é o desconto (D) ou o valor atual (A).

**Pegadinha:** o desconto é a diferença entre o valor futuro e o presente. Não confunda desconto com o valor líquido recebido.

## 10. Questões de fixação — descontos

**Questão 1.** O desconto é a diferença entre o valor nominal e o valor atual. **Certo.** D = N − A.

**Questão 2.** No desconto comercial simples, a taxa incide sobre o valor nominal. **Certo.**

**Questão 3.** No desconto racional simples, a taxa incide sobre o valor nominal. **Errado.** Incide sobre o valor atual.

**Questão 4.** Um título de R$ 2.000, descontado comercialmente a 2% ao mês por 3 meses, tem desconto de R$ 120 e valor atual de R$ 1.880. **Certo.**

**Questão 5.** Um título de R$ 1.320, descontado racionalmente a 10% ao mês por 2 meses, tem valor atual de R$ 1.100. **Certo.**

**Questão 6.** No desconto racional composto, o valor atual é calculado dividindo o valor nominal por (1 + i) elevado ao número de períodos. **Certo.**

**Questão 7.** Se a questão pergunta o valor líquido recebido na antecipação, a resposta é o desconto. **Errado.** O valor líquido é o valor atual; o desconto é a diferença entre nominal e atual.
$desc$,
flashcards=coalesce(flashcards,'[]'::jsonb)||'[
{"f":"Valor do título na data de vencimento.","b":"O que é valor nominal?"},
{"f":"Valor do título na data da antecipação.","b":"O que é valor atual?"},
{"f":"D = N − A.","b":"Como se calcula o desconto?"},
{"f":"A taxa incide sobre o valor nominal.","b":"No desconto comercial simples, qual é a base de cálculo?"},
{"f":"A taxa incide sobre o valor atual.","b":"No desconto racional simples, qual é a base de cálculo?"},
{"f":"A = N ÷ (1 + i)ⁿ.","b":"Qual é a fórmula do valor atual no desconto racional composto?"}]'::jsonb,
quiz=coalesce(quiz,'[]'::jsonb)||'[
{"q":"O desconto corresponde à diferença entre o valor nominal e o valor atual.","a":true,"why":"D = N − A."},
{"q":"No desconto comercial simples, a taxa incide sobre o valor nominal.","a":true,"why":"É a característica do desconto por fora."},
{"q":"No desconto racional simples, a taxa incide sobre o valor nominal.","a":false,"why":"A base do desconto racional é o valor atual."},
{"q":"Título de R$ 2.000 com desconto comercial simples de 2% ao mês por 3 meses gera desconto de R$ 120.","a":true,"why":"2.000 × 0,02 × 3 = 120."},
{"q":"Título de R$ 1.320 com desconto racional simples de 10% ao mês por 2 meses tem valor atual de R$ 1.100.","a":true,"why":"1.320 ÷ (1 + 0,10 × 2) = 1.100."},
{"q":"No desconto racional composto, o valor atual é N dividido por (1+i) elevado a n.","a":true,"why":"A = N ÷ (1+i)^n."},
{"q":"O valor líquido recebido na antecipação é o próprio desconto.","a":false,"why":"O valor líquido é o valor atual; o desconto é N − A."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-05-matematica-financeira-juros-descontos'
and position('## 9. Descontos e atualização de valores — aprofundamento do item 5.3' in body_md)=0;