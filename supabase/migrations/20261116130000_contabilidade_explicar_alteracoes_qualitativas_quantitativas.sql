-- Complemento didático sobre alterações qualitativas e quantitativas.

update public.study_materials
set body_md = body_md || $material$

## Alterações qualitativas e quantitativas

Esses nomes mostram **o que mudou no patrimônio**.

### Alteração qualitativa

É uma mudança na composição do patrimônio. Um elemento troca de lugar com outro, mas o valor total do patrimônio e o Patrimônio Líquido permanecem iguais.

**Exemplo:** a empresa compra um móvel de R$ 1.000 à vista.

- Móveis aumentam R$ 1.000.
- Caixa diminui R$ 1.000.
- O total do Ativo não muda.
- O Patrimônio Líquido não muda.

Esse é um **fato permutativo**.

### Alteração quantitativa

É uma mudança no valor total do patrimônio ou no Patrimônio Líquido. Normalmente aparece quando a entidade reconhece uma receita ou uma despesa.

**Exemplo:** a empresa reconhece despesa de aluguel de R$ 1.000.

- Surge ou aumenta a despesa.
- O resultado diminui.
- O Patrimônio Líquido diminui, em regra.

Esse é um **fato modificativo diminutivo**.

### Alteração mista

Combina alteração qualitativa e quantitativa no mesmo fato.

**Exemplo:** pagamento de uma dívida de R$ 1.000 com juros de R$ 100.

- A dívida e o Caixa diminuem R$ 1.000, formando a parte qualitativa.
- Os juros de R$ 100 são despesa e reduzem o Patrimônio Líquido, formando a parte quantitativa.

### Como resolver na prova

1. Pergunte se houve apenas troca entre elementos patrimoniais. Se sim, é alteração qualitativa e fato permutativo.
2. Pergunte se receita ou despesa alterou o Patrimônio Líquido. Se sim, é alteração quantitativa e fato modificativo.
3. Se houve troca e também receita ou despesa, é alteração mista.

**Macete:** qualitativa muda a composição; quantitativa muda o valor; mista muda os dois.

### Treino autoral

1. A compra de um equipamento à vista é alteração qualitativa. **Certo.** Troca Caixa por Equipamentos sem alterar o Patrimônio Líquido.
2. O reconhecimento de uma despesa de aluguel é alteração qualitativa. **Errado.** A despesa reduz o resultado e o Patrimônio Líquido, portanto é quantitativa.
3. O pagamento de uma dívida com juros é alteração mista. **Certo.** Há baixa da dívida e do Caixa, além da despesa de juros.
$material$,
flashcards = coalesce(flashcards, '[]'::jsonb) || '[
  {"f":"O que é uma alteração qualitativa?","b":"Mudança na composição do patrimônio sem alterar seu valor total ou o Patrimônio Líquido."},
  {"f":"O que é uma alteração quantitativa?","b":"Mudança no valor total do patrimônio ou do Patrimônio Líquido, geralmente por receita ou despesa."},
  {"f":"Qual é o macete para diferenciar qualitativa e quantitativa?","b":"Qualitativa muda a composição; quantitativa muda o valor; mista muda os dois."}
]'::jsonb,
quiz = coalesce(quiz, '[]'::jsonb) || '[
  {"q":"A compra de equipamento à vista é alteração qualitativa.","a":true,"why":"Troca Caixa por Equipamentos sem alterar o Patrimônio Líquido."},
  {"q":"O reconhecimento de despesa de aluguel é alteração qualitativa.","a":false,"why":"A despesa reduz o resultado e o Patrimônio Líquido, sendo alteração quantitativa."},
  {"q":"O pagamento de dívida com juros é alteração mista.","a":true,"why":"Combina a baixa da dívida e do Caixa com a despesa de juros."}
]'::jsonb,
updated_at = now()
where slug = 'pcac-2026-contabilidade-02-contas-receitas-despesas-fatos'
  and position('## Alterações qualitativas e quantitativas' in body_md) = 0;
