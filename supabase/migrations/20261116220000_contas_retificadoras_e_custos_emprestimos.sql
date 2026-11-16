update public.official_exam_questions
set review_note = 'Item CERTO. A depreciação acumulada é uma conta retificadora do ativo imobilizado. Ela possui natureza credora e reduz o valor contábil do bem. Quando a depreciação é reconhecida, o lançamento normalmente debita Despesa de Depreciação e credita Depreciação Acumulada. Assim, o aumento do saldo da depreciação acumulada diminui o ativo líquido e reduz o resultado do período. Como a redução do resultado diminui o patrimônio líquido, o efeito patrimonial é negativo. A segunda parte do item também está correta: débito não significa automaticamente melhoria patrimonial. Um débito pode aumentar uma despesa, reduzir uma receita ou aumentar um ativo sem alterar o PL. Exemplo: débito em Despesa de Depreciação e crédito em Depreciação Acumulada reduz o PL; já débito em Caixa e crédito em Capital Social aumenta o ativo e o PL, mas débito, isoladamente, não revela o efeito final. | Revisada com explicação didática sobre contas retificadoras.'
where id in ('64e18091-695a-4606-9637-e3b4872be5f5','47611429-9548-4458-ba11-90046a1b909e');

update public.question_bank
set explanation = 'A resposta é R$ 8.000. Custos de empréstimos não são automaticamente capitalizados. Primeiro, separe os gastos: R$ 5.000 foram usados para comprar uma ambulância; R$ 6.000, para comprar material de ambulatório; e R$ 8.000 estão diretamente ligados à construção de uma nova ala, que somente ficará pronta para uso em 2028. Um ativo que exige período substancial para ficar pronto é um ativo qualificável. Os custos de empréstimos diretamente atribuíveis à sua construção podem ser incorporados ao custo desse ativo. A ambulância e o material de ambulatório estão disponíveis para uso ou consumo imediato e, por isso, os respectivos custos de empréstimos são reconhecidos como despesa financeira. Cálculo: R$ 5.000 + R$ 6.000 = R$ 11.000 não capitalizados; R$ 8.000 = valor capitalizado no custo da nova ala. Dica: pergunte qual gasto está diretamente ligado a um ativo que demora substancialmente para ficar pronto. Somente esse valor será capitalizado.'
where id = 'fdfc067f-619d-46c4-a4e4-4b56040821dd';

update public.study_materials
set body_md = body_md || $ret$

## Contas retificadoras — explicação completa

Conta retificadora é uma conta criada para **diminuir o saldo de outra conta**. Ela aparece junto da conta principal, mas possui natureza oposta àquela que está sendo ajustada.

### Exemplo da depreciação acumulada

Uma máquina foi comprada por R$ 100.000. Depois de algum tempo, a empresa reconheceu R$ 20.000 de depreciação.

| Conta | Valor |
|---|---:|
| Máquinas | R$ 100.000 |
| (−) Depreciação acumulada | R$ 20.000 |
| Valor contábil líquido | R$ 80.000 |

A máquina continua registrada pelo custo de aquisição de R$ 100.000. A depreciação acumulada mostra quanto desse custo já foi consumido pelo uso, pelo tempo ou pela obsolescência.

### Natureza e lançamento

O Ativo normalmente tem natureza devedora. Como a depreciação acumulada reduz o Ativo, ela tem natureza credora.

Lançamento da depreciação:

- Débito: Despesa de depreciação — R$ 20.000;
- Crédito: Depreciação acumulada — R$ 20.000.

O débito registra a despesa. O crédito aumenta a conta retificadora. O efeito final é a redução do resultado e, em regra, do patrimônio líquido.

### Outras contas retificadoras frequentes

- Depreciação acumulada: reduz o imobilizado.
- Amortização acumulada: reduz o intangível ou outro ativo amortizável.
- Exaustão acumulada: reduz recursos naturais explorados.
- Perdas estimadas em créditos de liquidação duvidosa: reduzem contas a receber.
- Ações em tesouraria: reduzem o patrimônio líquido.
- Capital a integralizar: reduz o capital social já subscrito.

### Débito não significa sempre aumento ou melhora

A função do débito depende da natureza da conta:

- débito em Ativo normalmente aumenta o ativo;
- débito em Despesa aumenta a despesa e pode reduzir o PL;
- débito em Passivo normalmente reduz a obrigação;
- débito em Receita normalmente reduz a receita;
- débito em conta retificadora pode reduzir a própria retificação.

Por isso, nunca conclua que um débito melhorou a situação patrimonial sem identificar as contas envolvidas.

### Como resolver questões

1. Identifique a conta principal.
2. Procure a conta que a reduz.
3. Verifique a natureza da conta retificadora.
4. Analise o lançamento inteiro, com débito e crédito.
5. Avalie o efeito no Ativo, Passivo e PL.

$ret$,
updated_at = now()
where slug = 'contabilidade-depreciacao-amortizacao-exaustao';

update public.study_materials
set body_md = body_md || $cap$

## Custos de empréstimos e ativo qualificável

Custos de empréstimos são juros e outros gastos financeiros ligados à obtenção de recursos. A regra prática é separar duas situações:

- **Despesa financeira:** quando o recurso financia algo que já está pronto para uso ou consumo;
- **Custo do ativo:** quando o gasto financeiro é diretamente atribuível à construção ou produção de um ativo qualificável.

### O que é um ativo qualificável?

É um ativo que precisa de um período substancial para ficar pronto para o uso ou para a venda.

Exemplos:

- construção de hospital;
- construção de uma nova ala;
- fábrica em implantação;
- grande obra de infraestrutura.

Uma ambulância comprada pronta não é ativo qualificável. Material de ambulatório comprado para consumo também não é.

### Aplicação da questão

| Gasto | Tratamento | Valor |
|---|---|---:|
| Empréstimo usado para comprar ambulância pronta | Despesa financeira | R$ 5.000 |
| Empréstimo usado para comprar material de ambulatório | Despesa financeira | R$ 6.000 |
| Empréstimo usado na construção da nova ala, pronta em 2028 | Capitalizado no custo do ativo | R$ 8.000 |

**Valor capitalizado: R$ 8.000.**

Capitalizar significa não levar o gasto imediatamente para a despesa. O valor é incorporado ao custo da nova ala e será apropriado conforme as regras aplicáveis, inclusive por depreciação quando o ativo estiver disponível para uso.

### Exemplo simples

Se uma empresa paga juros para financiar uma máquina que já chegou pronta, os juros normalmente são despesa financeira.

Se contrai empréstimo para construir uma fábrica que levará três anos para ficar pronta, os juros diretamente atribuíveis à construção podem ser incorporados ao custo da fábrica durante o período de construção.

### Roteiro de prova

1. Identifique o que foi financiado.
2. Pergunte se o ativo já estava pronto para uso ou consumo.
3. Verifique se a preparação exige período substancial.
4. Capitalize apenas o custo diretamente atribuível ao ativo qualificável.
5. Reconheça os demais custos como despesa financeira.

$cap$,
updated_at = now()
where slug = 'pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao';
