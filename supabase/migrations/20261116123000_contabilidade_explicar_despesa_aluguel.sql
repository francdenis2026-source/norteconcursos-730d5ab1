-- Explicação prática solicitada para o reconhecimento de despesa de aluguel.

update public.study_materials
set body_md = body_md || $material$

## Entenda o reconhecimento de despesa de aluguel

Reconhecer uma despesa significa registrar que a entidade consumiu um recurso ou recebeu um serviço que pertence àquele período. No aluguel, a empresa usa o imóvel durante o mês. Por isso, o gasto pertence ao mês de uso, mesmo que o pagamento aconteça depois.

### Exemplo do cotidiano

Uma empresa utiliza o escritório durante todo o mês de março. O aluguel é de R$ 2.000 e será pago somente em abril.

- Em março, a empresa reconhece **Despesa de aluguel de R$ 2.000**.
- Essa despesa reduz o resultado e, em regra, reduz o Patrimônio Líquido.
- Como ainda não houve pagamento, surge ou permanece uma obrigação em **Aluguéis a pagar**, no Passivo.
- Em abril, quando pagar, baixa a obrigação e reduz o Caixa ou Banco. A despesa não é reconhecida novamente.

### Lançamentos simplificados

**Em março, reconhecimento da despesa:** débito em Despesa de aluguel de R$ 2.000 e crédito em Aluguéis a pagar de R$ 2.000.

**Em abril, pagamento:** débito em Aluguéis a pagar de R$ 2.000 e crédito em Caixa ou Bancos de R$ 2.000.

### Como identificar na prova

Pergunte quando o imóvel foi utilizado, e não apenas quando o dinheiro saiu. Pelo regime de competência, a despesa é reconhecida quando o benefício foi consumido. Por isso, reconhecer despesa de aluguel é um **fato modificativo diminutivo** quando ainda não existe uma troca patrimonial no mesmo lançamento: o resultado e o PL diminuem.

**Não confunda:** reconhecer a despesa é registrar o consumo do aluguel; pagar é quitar a obrigação. São momentos diferentes.

### Treino autoral

1. Aluguel de março pago em abril deve ser reconhecido como despesa de março. **Certo.** O imóvel foi utilizado em março.
2. O pagamento do aluguel em abril gera uma nova despesa de aluguel. **Errado.** Em abril ocorre a baixa de Aluguéis a pagar; a despesa já foi reconhecida em março.
$material$,
flashcards = coalesce(flashcards, '[]'::jsonb) || '[
  {"f":"O que significa reconhecer uma despesa de aluguel?","b":"Registrar que o imóvel foi utilizado e que o gasto pertence àquele período."},
  {"f":"Aluguel de março pago em abril pertence a qual mês pelo regime de competência?","b":"Março, porque foi o mês em que o imóvel foi utilizado."},
  {"f":"Qual a diferença entre reconhecer e pagar o aluguel?","b":"Reconhecer registra a despesa; pagar baixa a obrigação e reduz Caixa ou Bancos."}
]'::jsonb,
quiz = coalesce(quiz, '[]'::jsonb) || '[
  {"q":"O aluguel de março pago em abril deve ser reconhecido como despesa de março.","a":true,"why":"O reconhecimento segue o período de uso do imóvel, pelo regime de competência."},
  {"q":"O pagamento em abril gera uma nova despesa de aluguel.","a":false,"why":"O pagamento apenas baixa Aluguéis a pagar; a despesa já foi reconhecida em março."}
]'::jsonb,
updated_at = now()
where slug = 'pcac-2026-contabilidade-02-contas-receitas-despesas-fatos'
  and position('## Entenda o reconhecimento de despesa de aluguel' in body_md) = 0;
