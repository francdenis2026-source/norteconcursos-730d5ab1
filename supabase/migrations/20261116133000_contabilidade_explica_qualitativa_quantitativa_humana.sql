-- Reforço didático em linguagem simples para as alterações patrimoniais.

update public.study_materials
set body_md = body_md || $material$

## Como entender qualitativa e quantitativa sem decorar

Imagine o patrimônio como uma mochila com vários bolsos. O **Ativo** é tudo que a entidade tem ou tem para receber. O **Passivo** são as dívidas. O **Patrimônio Líquido** é a parte que sobra para os proprietários.

### 1. Qualitativa significa mudar os bolsos

Na alteração qualitativa, o valor geral permanece igual, mas o conteúdo dos bolsos muda.

**Exemplo:** a empresa tinha R$ 1.000 no Caixa e comprou uma mesa por R$ 1.000 à vista.

- Antes: Caixa = R$ 1.000.
- Depois: Caixa = R$ 0 e Móveis = R$ 1.000.
- A empresa apenas trocou dinheiro por um móvel.
- O total do Ativo continuou em R$ 1.000.
- O Patrimônio Líquido não mudou.

Por isso, é uma alteração qualitativa e um **fato permutativo**. A palavra “permutativo” vem de permuta, que significa troca.

### 2. Quantitativa significa mudar o tamanho da mochila

Na alteração quantitativa, o valor do patrimônio ou do Patrimônio Líquido aumenta ou diminui.

**Exemplo:** a empresa utilizou o imóvel em março e reconheceu R$ 1.000 de despesa de aluguel.

- A empresa consumiu um serviço.
- O resultado diminuiu R$ 1.000.
- O Patrimônio Líquido diminuiu, em regra, R$ 1.000.
- Não foi apenas uma troca entre contas.

Por isso, é uma alteração quantitativa e um **fato modificativo diminutivo**.

Outro exemplo: se a empresa presta um serviço de R$ 2.000 e reconhece essa receita, o resultado e o Patrimônio Líquido aumentam. É uma alteração quantitativa aumentativa.

### 3. Mista significa troca e mudança de valor juntas

**Exemplo:** a empresa paga uma dívida de R$ 1.000 e também paga R$ 100 de juros.

- A dívida diminui R$ 1.000.
- O Caixa diminui R$ 1.100.
- Os R$ 1.000 correspondentes à dívida representam uma troca patrimonial.
- Os R$ 100 de juros são uma despesa e reduzem o Patrimônio Líquido.

O mesmo fato teve uma parte qualitativa e uma parte quantitativa. Por isso, é **misto diminutivo**.

### Roteiro de prova em três perguntas

1. Houve apenas troca entre contas, sem receita ou despesa? **Qualitativa, fato permutativo.**
2. Apareceu receita ou despesa que alterou o resultado? **Quantitativa, fato modificativo.**
3. Houve troca e também receita ou despesa? **Mista.**

### Quadro para revisão

| Situação | O que acontece | Classificação |
|---|---|---|
| Compra de mesa à vista | Sai Caixa e entra Móveis | Qualitativa, permutativa |
| Despesa de aluguel reconhecida | Resultado e PL diminuem | Quantitativa, modificativa diminutiva |
| Receita de serviço reconhecida | Resultado e PL aumentam | Quantitativa, modificativa aumentativa |
| Dívida paga com juros | Troca patrimonial + despesa | Mista diminutiva |

**Frase para memorizar:** qualitativa troca a composição; quantitativa muda o valor; mista faz as duas coisas.
$material$,
flashcards = coalesce(flashcards, '[]'::jsonb) || '[
  {"f":"Como imaginar uma alteração qualitativa?","b":"Como uma troca de conteúdo entre os bolsos da mochila: muda a composição, mas o valor geral permanece."},
  {"f":"Como imaginar uma alteração quantitativa?","b":"Como aumentar ou diminuir o tamanho da mochila: o valor do patrimônio ou do PL muda."},
  {"f":"Qual é a sequência de análise na prova?","b":"Troca sem receita ou despesa = qualitativa; receita ou despesa = quantitativa; troca mais receita ou despesa = mista."}
]'::jsonb,
updated_at = now()
where slug = 'pcac-2026-contabilidade-02-contas-receitas-despesas-fatos'
  and position('## Como entender qualitativa e quantitativa sem decorar' in body_md) = 0;
