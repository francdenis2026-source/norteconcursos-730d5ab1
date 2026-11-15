-- Complementa a aula de DFC com a resolução integral da questão 32 do CFC 2020.1.
update public.study_materials
set body_md=body_md || $q$

## Questão original — Consulplan/CFC 2020.1, questão 32: classificação dos fluxos na DFC

A questão fornece estas variações e valores: aumento de capital social em moeda corrente R$ 15.000; aumento de clientes R$ 18.000; venda de imobilizado R$ 23.000; aumento de estoques R$ 45.000; aumento de duplicatas descontadas R$ 12.000; empréstimos de curto prazo R$ 34.000; depreciação R$ 8.000; aquisição de imobilizado R$ 42.500; aumento de fornecedores R$ 32.800; redução de salários a pagar R$ 13.400; lucro líquido do exercício R$ 22.300.

**Resposta: alternativa A — atividades de investimento e operacionais consumiram caixa.**

### 1. Atividades operacionais — método indireto

Comece pelo lucro líquido e faça os ajustes:

- Lucro líquido: + R$ 22.300.
- Depreciação: + R$ 8.000 (despesa sem saída de caixa).
- Aumento de clientes: − R$ 18.000 (mais vendas ainda não recebidas).
- Aumento de estoques: − R$ 45.000 (recursos aplicados em mercadorias).
- Aumento de fornecedores: + R$ 32.800 (compras ainda não pagas).
- Redução de salários a pagar: − R$ 13.400 (pagamento de obrigações).

Fluxo operacional = 22.300 + 8.000 − 18.000 − 45.000 + 32.800 − 13.400 = **− R$ 13.300**. Portanto, as atividades operacionais consumiram caixa.

### 2. Atividades de investimento

- Venda de imobilizado: + R$ 23.000.
- Aquisição de imobilizado: − R$ 42.500.

Fluxo de investimento = 23.000 − 42.500 = **− R$ 19.500**. Portanto, as atividades de investimento também consumiram caixa.

### 3. Atividades de financiamento

- Aumento de capital em dinheiro: + R$ 15.000.
- Aumento de duplicatas descontadas: + R$ 12.000 (entrada de recursos por operação de financiamento, conforme o enquadramento da questão).
- Empréstimos de curto prazo: + R$ 34.000.

Fluxo de financiamento = 15.000 + 12.000 + 34.000 = **+ R$ 61.000**. Portanto, as atividades de financiamento geraram caixa.

### Conclusão

Operacional: − R$ 13.300; investimento: − R$ 19.500; financiamento: + R$ 61.000. A alternativa correta é **A — Investimento e Operacionais consumiram caixa**.

### Macetes para a prova

- Aumento de ativo operacional (clientes e estoques) normalmente consome caixa: sinal negativo.
- Aumento de passivo operacional (fornecedores) normalmente gera caixa: sinal positivo.
- Redução de passivo (salários a pagar) consome caixa: sinal negativo.
- Depreciação é somada de volta no método indireto, pois reduziu o lucro sem saída de dinheiro.
- Comprar imobilizado = investimento negativo; vender imobilizado = investimento positivo.
- Receber empréstimo ou capital = financiamento positivo.

### Treino autoral

1. No método indireto, o aumento de clientes deve ser subtraído do lucro líquido. **Certo ou errado?**
2. A depreciação é somada ao lucro líquido porque não representa saída de caixa no período. **Certo ou errado?**
3. A aquisição de imobilizado é fluxo operacional. **Certo ou errado?**
4. Aumento de fornecedores, mantidas as demais condições, aumenta o fluxo operacional de caixa. **Certo ou errado?**

**Gabarito comentado:** 1. **Certo.** Parte das receitas ainda não virou recebimento. 2. **Certo.** É despesa sem desembolso no período. 3. **Errado.** É atividade de investimento. 4. **Certo.** A empresa adiou pagamentos, preservando caixa.
$q$,
flashcards=coalesce(flashcards,'[]'::jsonb)||'[
{"f":"Questão 32 CFC 2020.1: qual foi o fluxo operacional?","b":"Consumo de R$ 13.300: 22.300 + 8.000 − 18.000 − 45.000 + 32.800 − 13.400."},
{"f":"Questão 32 CFC 2020.1: qual foi o fluxo de investimento?","b":"Consumo de R$ 19.500: venda 23.000 menos aquisição 42.500."},
{"f":"Questão 32 CFC 2020.1: qual foi o fluxo de financiamento?","b":"Geração de R$ 61.000: capital 15.000 + duplicatas descontadas 12.000 + empréstimos 34.000."},
{"f":"Na DFC indireta, como tratar aumento de clientes e de fornecedores?","b":"Aumento de clientes reduz o caixa operacional; aumento de fornecedores aumenta o caixa operacional."}]'::jsonb,
quiz=coalesce(quiz,'[]'::jsonb)||'[
{"q":"Na questão 32, o aumento de clientes de R$ 18.000 é subtraído no fluxo operacional.","a":true,"why":"Aumento de contas a receber indica receita ainda não recebida."},
{"q":"Na questão 32, a depreciação de R$ 8.000 é somada ao lucro líquido no método indireto.","a":true,"why":"É despesa sem saída de caixa no período."},
{"q":"Na questão 32, as atividades de investimento geraram caixa de R$ 19.500.","a":false,"why":"A aquisição de 42.500 supera a venda de 23.000; houve consumo de 19.500."},
{"q":"Na questão 32, as atividades operacionais e de investimento consumiram caixa.","a":true,"why":"Operacional −13.300 e investimento −19.500."}]'::jsonb,
source_note=concat_ws('; ',nullif(source_note,''),'Questão 32, Consulplan/CFC 2020.1, PDF Prova 2020.1 - Resolvida - Parte 03, páginas 24–25.'),
updated_at=now()
where slug='pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes'
and position('Questão original — Consulplan/CFC 2020.1, questão 32' in body_md)=0;
