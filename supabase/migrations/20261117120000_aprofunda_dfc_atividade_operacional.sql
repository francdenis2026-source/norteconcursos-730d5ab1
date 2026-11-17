update public.question_bank
set explanation = 'A alternativa correta é B — R$ 310.000. A atividade operacional reúne os recebimentos e pagamentos ligados ao funcionamento normal da entidade pública. Entram os impostos recebidos, os valores recebidos por serviços e o recebimento relacionado à solução de litígio. Saem os pagamentos a funcionários e por serviços. Cálculo: recebimentos R$ 800.000 + R$ 120.000 = R$ 920.000; pagamentos R$ 360.000 + R$ 250.000 = R$ 610.000; fluxo operacional líquido R$ 920.000 − R$ 610.000 = R$ 310.000. Um exemplo simples: se uma prefeitura recebe R$ 100.000 em impostos e paga R$ 60.000 em salários e serviços, o fluxo operacional líquido é R$ 40.000. Não se deve considerar somente os impostos nem misturar, nesta conta, compras de ativos ou contratação de empréstimos, que pertencem a outras atividades da DFC.'
where id = 'd9cf285e-bf3e-472d-a0ef-2403404abee5';

update public.study_materials
set body_md = body_md || $dfc$

## Atividade operacional na DFC — como entender

A Demonstração dos Fluxos de Caixa mostra as entradas e saídas efetivas de dinheiro. Ela separa os fluxos em três grupos:

- **Atividades operacionais:** relacionadas ao funcionamento normal da entidade;
- **Atividades de investimento:** compra e venda de ativos de longo prazo;
- **Atividades de financiamento:** empréstimos, financiamentos, capital e dividendos.

### O que entra na atividade operacional?

Entram os recebimentos e pagamentos ligados à prestação dos serviços públicos e à manutenção das atividades, como:

- impostos recebidos;
- taxas e contribuições recebidas;
- pagamentos a funcionários;
- pagamentos a fornecedores e prestadores de serviços;
- pagamentos de despesas correntes;
- recebimentos ou pagamentos relacionados a determinados litígios ligados à atividade.

### Aplicação na questão

**Recebimentos:**

- Impostos: R$ 800.000;
- Solução de litígio: R$ 120.000;
- Total recebido: **R$ 920.000**.

**Pagamentos:**

- Funcionários: R$ 360.000;
- Serviços: R$ 250.000;
- Total pago: **R$ 610.000**.

**Fluxo operacional líquido:**

**R$ 920.000 − R$ 610.000 = R$ 310.000.**

A entidade gerou R$ 310.000 de caixa líquido com suas atividades operacionais.

### Exemplo fácil

Imagine uma pequena prefeitura:

- recebeu R$ 100.000 em impostos;
- pagou R$ 40.000 aos funcionários;
- pagou R$ 20.000 por serviços.

O fluxo operacional líquido será:

**R$ 100.000 − R$ 40.000 − R$ 20.000 = R$ 40.000.**

Isso significa que sobraram R$ 40.000 de caixa depois dos pagamentos ligados ao funcionamento normal.

### Como não confundir os grupos

| Operação | Grupo da DFC |
|---|---|
| Recebimento de impostos | Operacional |
| Pagamento de salários | Operacional |
| Pagamento de fornecedores | Operacional |
| Compra de ambulância | Investimento |
| Venda de máquina | Investimento |
| Recebimento de empréstimo | Financiamento |
| Pagamento do principal de empréstimo | Financiamento |

**Dica:** primeiro identifique se o dinheiro entrou ou saiu. Depois pergunte por que ele entrou ou saiu. Se estiver ligado ao funcionamento cotidiano, é operacional.

$dfc$,
updated_at = now()
where slug = 'pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes';
