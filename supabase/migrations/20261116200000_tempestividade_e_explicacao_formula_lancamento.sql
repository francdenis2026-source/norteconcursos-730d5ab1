update public.study_materials
set body_md = body_md || $temp$

## Tempestividade: o que significa?

A **tempestividade** é uma característica qualitativa de melhoria da informação contábil. Ela exige que a informação esteja disponível **no momento certo**, antes que perca sua utilidade para quem precisa tomar uma decisão.

Em termos simples, uma informação pode estar correta, mas chegar tarde demais. Quando isso acontece, o usuário talvez não consiga mais usar essa informação para decidir, avaliar um risco ou corrigir uma conduta.

### Exemplo da multa

A empresa foi notificada em **10/12/2024**. Naquele momento, já sabia:

- que a multa existia;
- qual era o fato que gerou a multa;
- que não havia possibilidade de recurso;
- que surgiria uma obrigação de pagamento.

Por isso, a despesa pertencia ao ano de **2024**. Esperar até janeiro de 2025, apenas porque esse era o prazo para pagar, atrasaria o registro.

O pagamento e o reconhecimento são acontecimentos diferentes:

| Momento | O que ocorre |
|---|---|
| Dezembro de 2024 | A multa é conhecida e a despesa deve ser reconhecida |
| Janeiro de 2025 | A obrigação é paga |

O regime de competência manda reconhecer a despesa quando o fato ocorre, e não somente quando o dinheiro sai do caixa.

### Tempestividade não significa registrar de qualquer maneira

A informação deve ser:

1. registrada no período correto;
2. conferida;
3. apresentada com qualidade;
4. disponibilizada enquanto ainda puder influenciar decisões.

A empresa não pode esperar o vencimento de uma obrigação já conhecida para somente então reconhecer a despesa.

### Diferença entre características parecidas

- **Tempestividade:** a informação chegou no momento adequado.
- **Relevância:** a informação pode mudar ou confirmar uma decisão.
- **Representação fidedigna:** a informação retrata corretamente o fato.
- **Materialidade:** o erro ou omissão tem importância suficiente para influenciar decisões.
- **Compreensibilidade:** a informação é apresentada de modo claro.
- **Comparabilidade:** permite comparar períodos ou entidades.

### Como resolver questões

Quando o enunciado disser que:

- o fato já aconteceu;
- a empresa já tinha conhecimento;
- o registro foi adiado;
- o usuário ficou sem a informação no período adequado;

a característica cobrada normalmente é **tempestividade**.

**Resumo:** tempestividade é entregar a informação correta no tempo em que ela ainda pode ser útil.

$temp$,
updated_at = now()
where slug = 'contabilidade-estrutura-conceitual-informacao-util';

update public.official_exam_questions
set review_note = 'Resposta: ERRADO. A aquisição de um bem paga parcialmente à vista e parcialmente a prazo é registrada com um débito na conta do bem e dois créditos: Caixa ou Bancos pela parte paga imediatamente e Fornecedores ou Contas a Pagar pela parte que será paga depois. Esse lançamento tem uma conta devedora e duas contas credoras, o que corresponde à segunda fórmula de lançamento, e não à terceira. A terceira fórmula possui duas ou mais contas devedoras e uma conta credora. Exemplo: bem de R$ 10.000, com R$ 4.000 pagos à vista e R$ 6.000 a prazo: débito em Equipamentos de R$ 10.000; crédito em Caixa de R$ 4.000; crédito em Fornecedores de R$ 6.000. Portanto, o item está errado porque chama de terceira fórmula uma situação que exige, no mínimo, a segunda fórmula. Fonte e conferência: item oficial, gabarito definitivo e classificação tradicional das fórmulas de lançamento.'
where id in ('621b2003-7e18-4003-9b85-37d18e407a42','47fc29eb-3c45-4f3a-9202-d95a5b0a1d7e');
