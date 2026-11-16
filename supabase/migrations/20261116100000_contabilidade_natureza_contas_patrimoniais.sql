-- Reforço pedagógico solicitado para a aula de fundamentos de Contabilidade.
-- A condição pelo marcador torna a atualização segura para reaplicação.

update public.study_materials
set body_md = body_md || $material$

## Natureza das contas: ativo, passivo e patrimônio líquido

### Explicação fácil

Natureza é o lado em que uma conta normalmente aumenta e apresenta seu saldo. Ela não significa que débito seja algo ruim ou que crédito seja algo bom. É apenas a regra de funcionamento da conta.

| Grupo | Natureza normal | Aumenta com | Diminui com | Exemplos |
|---|---|---|---|---|
| Ativo | Devedora | Débito | Crédito | Caixa, bancos, clientes, veículos |
| Passivo | Credora | Crédito | Débito | Fornecedores, empréstimos, salários a pagar |
| Patrimônio líquido | Credora | Crédito | Débito | Capital social, reservas de lucros |
| Despesas | Devedora | Débito | Crédito | Aluguel, salários, energia |
| Receitas | Credora | Crédito | Débito | Receita de serviços, vendas |

### Como pensar no cotidiano

O **ativo** representa recursos e direitos da entidade. Se entra dinheiro no caixa, o ativo aumenta e fazemos um débito em Caixa. Se o cliente paga uma duplicata, o Caixa aumenta por débito e o direito em Clientes diminui por crédito.

O **passivo** representa obrigações com terceiros. Ao contratar um empréstimo, surge uma dívida. A conta Empréstimos a pagar aumenta por crédito. Quando a dívida é paga, ela diminui por débito.

O **patrimônio líquido** representa a parte que pertence aos proprietários depois das obrigações. Capital social e reservas normalmente têm natureza credora. Prejuízos acumulados podem gerar saldo devedor dentro do PL, pois reduzem a riqueza dos proprietários.

### Atenção às contas retificadoras

Uma conta retificadora reduz outra conta e, por isso, tem natureza contrária. A Depreciação acumulada retifica o ativo imobilizado e normalmente tem saldo credor. A conta não deixa de estar relacionada ao ativo por ter saldo credor.

### Macete de prova

**Ativo e despesa aumentam no débito. Passivo, patrimônio líquido e receita aumentam no crédito.** Em seguida, procure a palavra “aumenta”, “diminui” ou “saldo normal” no enunciado. A natureza indica o comportamento usual, não uma garantia de que nunca haverá saldo contrário.

### Exemplos de lançamentos

1. Recebimento de R$ 2.000 de cliente: débito em Caixa e crédito em Clientes.
2. Empréstimo de R$ 10.000 recebido no banco: débito em Bancos e crédito em Empréstimos a pagar.
3. Pagamento de R$ 500 de aluguel: débito em Despesa de aluguel e crédito em Caixa.

### Treino autoral

1. As contas do ativo têm natureza devedora e aumentam por débito. **Certo.** Ativo, como Caixa e Clientes, cresce no lado do débito.
2. Fornecedores e capital social aumentam por débito. **Errado.** Fornecedores é passivo e capital social é patrimônio líquido. Ambos têm natureza credora e aumentam por crédito.
$material$
,
flashcards = coalesce(flashcards, '[]'::jsonb) || '[
  {"f":"Qual é a natureza normal do Ativo?","b":"Devedora. O Ativo aumenta por débito e diminui por crédito."},
  {"f":"Qual é a natureza normal do Passivo e do Patrimônio Líquido?","b":"Credora. Ambos aumentam por crédito e diminuem por débito."},
  {"f":"Por que a depreciação acumulada tem saldo credor?","b":"Porque é uma conta retificadora que reduz o valor de uma conta do Ativo."},
  {"f":"Qual é o macete para natureza das contas?","b":"Ativo e despesa aumentam no débito; Passivo, PL e receita aumentam no crédito."}
]'::jsonb,
quiz = coalesce(quiz, '[]'::jsonb) || '[
  {"q":"Caixa e Clientes são contas de natureza devedora.","a":true,"why":"São contas do Ativo e aumentam por débito."},
  {"q":"Fornecedores e Capital Social são contas de natureza devedora.","a":false,"why":"Passivo e Patrimônio Líquido têm natureza credora e aumentam por crédito."},
  {"q":"A Depreciação acumulada pode ter saldo credor mesmo sendo uma retificadora do Ativo.","a":true,"why":"A conta retificadora tem natureza contrária à conta que reduz."},
  {"q":"Receita de serviços aumenta por débito.","a":false,"why":"Receita tem natureza credora e aumenta por crédito."}
]'::jsonb,
updated_at = now()
where slug = 'pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo'
  and position('## Natureza das contas: ativo, passivo e patrimônio líquido' in body_md) = 0;
