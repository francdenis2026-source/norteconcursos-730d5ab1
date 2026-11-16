-- Complemento didático sobre livros contábeis e escrituração digital.

update public.study_materials
set body_md = body_md || $material$

## Livros contábeis: o que cada um faz e o que pode cair na prova

### Livro Diário

O Diário registra os fatos contábeis **na ordem em que aconteceram**. Ele funciona como uma linha do tempo da entidade.

Um lançamento no Diário deve permitir identificar, no mínimo, a data, a conta debitada, a conta creditada, o valor e o histórico do fato.

Na abordagem clássica cobrada em Contabilidade Geral, o Diário é o **livro principal e obrigatório da escrituração**. Por isso, quando a questão perguntar qual livro registra os fatos em ordem cronológica ou qual é o livro principal, a resposta esperada costuma ser Diário.

**Exemplo:** em 10/03, a empresa vende mercadorias a prazo por R$ 2.000. O Diário registra a data, o débito em Clientes, o crédito da receita ou da conta correspondente e o histórico da venda.

### Livro Razão

O Razão organiza os lançamentos **por conta**. Em vez de contar a história por data, ele mostra tudo que aconteceu com uma conta específica.

**Exemplo:** na conta Clientes do Razão, aparecem todas as vendas a prazo e todos os recebimentos. A diferença entre débitos e créditos mostra quanto os clientes ainda devem.

O Razão é essencial para acompanhar saldos e preparar balancetes e demonstrações. Em questões introdutórias, é apresentado como livro auxiliar em relação ao Diário. A obrigação específica de registros e a forma digital dependem também da legislação fiscal e do regime da entidade.

### Livro Caixa

O Livro Caixa controla entradas e saídas de dinheiro. Ele pode ser útil para acompanhar o caixa, mas **não substitui o Diário**, porque nem todo fato contábil envolve dinheiro e nem todo registro de caixa explica sozinho a classificação contábil completa.

**Exemplo:** uma compra de mercadorias a prazo aumenta o estoque e cria uma dívida com fornecedor, mas não gera saída imediata de Caixa. Portanto, o fato precisa ser registrado na escrituração contábil mesmo sem movimento financeiro no momento.

### Registro de Inventário e livros fiscais

O Registro de Inventário detalha estoques e outros bens conforme a obrigação aplicável. Registro de Entradas, Registro de Saídas e outros livros fiscais atendem ao controle tributário. Eles não devem ser confundidos com o Diário, que é o livro contábil principal na classificação introdutória.

### Escrituração digital

A ECD é a Escrituração Contábil Digital. Ela transmite eletronicamente a escrituração ao sistema oficial quando a entidade está obrigada. A forma digital não elimina a função dos livros: o Diário continua sendo o registro cronológico e o Razão continua permitindo acompanhar cada conta.

### Como diferenciar rapidamente

| Se a questão perguntar... | Pense em... |
|---|---|
| Ordem de datas e todos os fatos | Diário |
| Movimentação e saldo de uma conta | Razão |
| Entradas e saídas de dinheiro | Livro Caixa |
| Quantidade e valor dos estoques | Registro de Inventário |
| Transmissão eletrônica da escrituração | ECD |

**Macete:** Diário conta a história por data. Razão separa a história por conta. Caixa acompanha dinheiro.

### Pegadinhas comuns

- Dizer que o Razão registra os fatos em ordem cronológica como função principal. Essa é a característica do Diário.
- Dizer que o Livro Caixa substitui o Diário. Ele não substitui a escrituração completa.
- Confundir Registro de Inventário com o Diário. O inventário detalha bens e estoques, enquanto o Diário registra fatos.
- Afirmar que ECD é uma nova função contábil. Ela é um meio digital de transmitir a escrituração exigida.

### Treino autoral

1. O Diário registra os fatos contábeis em ordem cronológica. **Certo.** Essa é sua característica principal.
2. O Razão permite acompanhar a movimentação e o saldo de cada conta. **Certo.** Ele organiza os lançamentos por conta.
3. O Livro Caixa substitui o Diário em todos os casos. **Errado.** O Caixa controla dinheiro, enquanto o Diário registra a escrituração contábil completa.
4. A ECD é uma forma eletrônica de transmitir a escrituração contábil quando exigida. **Certo.** Ela não altera a função dos livros.
$material$,
flashcards = coalesce(flashcards, '[]'::jsonb) || '[
  {"f":"Qual livro registra os fatos em ordem cronológica?","b":"O Livro Diário."},
  {"f":"Qual livro mostra a movimentação e o saldo de cada conta?","b":"O Livro Razão."},
  {"f":"O Livro Caixa substitui o Diário?","b":"Não. Ele controla entradas e saídas de dinheiro, mas não substitui a escrituração completa."},
  {"f":"O que é ECD?","b":"Escrituração Contábil Digital, forma eletrônica de transmitir a escrituração exigida."}
]'::jsonb,
quiz = coalesce(quiz, '[]'::jsonb) || '[
  {"q":"O Diário registra os fatos contábeis em ordem cronológica.","a":true,"why":"Essa é a função principal do Diário."},
  {"q":"O Razão organiza os lançamentos por conta e permite conhecer o saldo.","a":true,"why":"O Razão acompanha a movimentação individual de cada conta."},
  {"q":"O Livro Caixa substitui o Diário em todos os casos.","a":false,"why":"O Caixa controla dinheiro e não substitui a escrituração contábil completa."},
  {"q":"A ECD é uma forma digital de transmitir a escrituração exigida.","a":true,"why":"A ECD mantém a função dos livros em meio eletrônico."}
]'::jsonb,
updated_at = now()
where slug = 'pcac-2026-contabilidade-03-escrituracao-partidas-dobradas'
  and position('## Livros contábeis: o que cada um faz e o que pode cair na prova' in body_md) = 0;
