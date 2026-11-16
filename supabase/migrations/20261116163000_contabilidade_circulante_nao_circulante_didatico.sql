-- Explicação didática sobre a organização do Balanço Patrimonial.

update public.study_materials
set body_md = body_md || $material$

## Circulante e não circulante: como organizar as contas

### O que significa “circulante”?

Circulante é aquilo que se movimenta no curto prazo ou dentro do ciclo normal da entidade. Pense no dinheiro entrando e saindo da rotina do negócio.

No **Ativo Circulante**, ficam recursos e direitos que normalmente serão usados, vendidos ou transformados em dinheiro no curto prazo. No **Passivo Circulante**, ficam obrigações que normalmente serão pagas no curto prazo.

O prazo de 12 meses é uma referência muito usada nas questões. Quando o ciclo operacional normal da entidade é maior, ele também deve ser considerado.

### O que significa “não circulante”?

Não circulante é aquilo que será realizado, usado ou pago em prazo mais longo. Não quer dizer que nunca se transformará em dinheiro ou nunca será pago. Quer dizer que isso não ocorrerá no curto prazo considerado.

### Organização visual do Balanço Patrimonial

```text
BALANÇO PATRIMONIAL
│
├── ATIVO  — bens e direitos
│   ├── Ativo Circulante
│   │   ├── Caixa e Bancos
│   │   ├── Clientes
│   │   ├── Estoques
│   │   └── Despesas antecipadas
│   │
│   └── Ativo não circulante
│       ├── Realizável a longo prazo
│       ├── Investimentos
│       ├── Imobilizado
│       └── Intangível
│
├── PASSIVO  — obrigações
│   ├── Passivo Circulante
│   │   ├── Fornecedores
│   │   ├── Salários a pagar
│   │   └── Impostos a pagar
│   │
│   └── Passivo não circulante
│       └── Financiamentos de longo prazo
│
└── PATRIMÔNIO LÍQUIDO
    ├── Capital social
    └── Reservas e resultados acumulados
```

### Exemplo numérico simples

Uma loja possui:

- Caixa: R$ 10.000;
- Clientes a receber: R$ 8.000;
- Estoques: R$ 12.000;
- Veículo usado nas entregas: R$ 40.000;
- Software utilizado pela loja: R$ 5.000;
- Dívida com fornecedores: R$ 9.000;
- Financiamento do veículo com vencimento longo: R$ 20.000.

```text
ATIVO
├── Ativo Circulante
│   ├── Caixa ................ R$ 10.000
│   ├── Clientes ............. R$  8.000
│   └── Estoques ............. R$ 12.000
│       Total circulante ..... R$ 30.000
│
└── Ativo não circulante
    ├── Imobilizado .......... R$ 40.000  (veículo)
    └── Intangível ........... R$  5.000  (software)
        Total não circulante . R$ 45.000

PASSIVO
├── Passivo Circulante ....... R$  9.000  (fornecedores)
└── Passivo não circulante ... R$ 20.000  (financiamento longo)
```

### Como raciocinar sem decorar

Pergunte primeiro: **isso é algo que a entidade tem ou deve?**

- Se tem ou tem a receber, é Ativo.
- Se deve, é Passivo.
- Se pertence aos sócios, é Patrimônio Líquido.

Depois pergunte: **isso se movimenta no curto prazo ou no longo prazo?**

- Caixa, Clientes e Estoques → Ativo Circulante.
- Veículo usado pela empresa → Imobilizado, no Ativo não circulante.
- Software ou patente → Intangível, no Ativo não circulante.
- Fornecedores → Passivo Circulante.
- Financiamento com vencimento distante → Passivo não circulante, separando a parcela de curto prazo.

### Pegadinhas de prova

- Estoque não é Imobilizado. Estoque é mercadoria mantida para venda, consumo ou transformação.
- Veículo usado nas atividades não é Estoque. É Imobilizado.
- Clientes são Ativo, mesmo que o dinheiro ainda não tenha entrado.
- Fornecedores são Passivo, mesmo que a mercadoria já esteja no Estoque.
- Não circulante não significa “sem valor” ou “sem realização”. Significa prazo mais longo.

**Macete:** primeiro separe o que a entidade tem do que ela deve. Depois separe curto prazo de longo prazo.

### Treino autoral

1. Caixa, Clientes e Estoques pertencem normalmente ao Ativo Circulante. **Certo.** São recursos ou direitos ligados à operação de curto prazo.
2. Todo Ativo não circulante é um bem físico. **Errado.** O grupo também inclui direitos, investimentos e intangíveis.
3. Fornecedores a pagar normalmente pertencem ao Passivo Circulante. **Certo.** A obrigação costuma vencer no ciclo normal ou no curto prazo.
4. Veículo usado pela empresa e estoque para revenda pertencem ao mesmo grupo. **Errado.** O veículo é Imobilizado; o estoque é Ativo Circulante.
$material$,
flashcards = coalesce(flashcards, '[]'::jsonb) || '[
  {"f":"O que é Ativo Circulante?","b":"Grupo de bens e direitos que serão usados, vendidos ou transformados em dinheiro no curto prazo, como Caixa, Clientes e Estoques."},
  {"f":"Quais grupos formam o Ativo não circulante?","b":"Realizável a longo prazo, Investimentos, Imobilizado e Intangível."},
  {"f":"Fornecedores ficam no Ativo ou no Passivo?","b":"No Passivo, normalmente no Passivo Circulante, porque representam dívidas."},
  {"f":"Veículo usado pela empresa é Estoque?","b":"Não. É Imobilizado, no Ativo não circulante."}
]'::jsonb,
quiz = coalesce(quiz, '[]'::jsonb) || '[
  {"q":"Caixa, Clientes e Estoques são contas do Ativo Circulante.","a":true,"why":"Estão ligados à movimentação de curto prazo da entidade."},
  {"q":"Veículo usado pela empresa pertence ao Estoque.","a":false,"why":"Veículo usado na atividade é Imobilizado, no Ativo não circulante."},
  {"q":"Fornecedores representam Passivo Circulante em regra.","a":true,"why":"São obrigações normalmente pagas no ciclo normal ou no curto prazo."},
  {"q":"O Ativo não circulante possui apenas bens físicos.","a":false,"why":"Também inclui direitos de longo prazo, investimentos e intangíveis."}
]'::jsonb,
updated_at = now()
where slug = 'pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo'
  and position('## Circulante e não circulante: como organizar as contas' in body_md) = 0;
