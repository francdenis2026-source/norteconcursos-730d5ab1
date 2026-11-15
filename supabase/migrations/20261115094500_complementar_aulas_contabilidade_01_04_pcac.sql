-- Complemento das aulas PC-AC 2026 (Contabilidade Geral e Análise Financeira)
-- Conteúdo estritamente derivado do arquivo "Resumo - Contabilidade Geral.pdf", páginas 3–10.
-- Reexecução segura: cada bloco só é anexado se seu marcador ainda não existir.

update public.study_materials
set body_md=body_md || $a$

## 7. Campo de aplicação e autonomia da entidade

A Contabilidade pode ser aplicada às **aziendas**, entendidas no material como patrimônio administrado. A expressão entidade é mais abrangente do que sociedade: pode haver patrimônio e gestão em organizações que não sejam sociedades empresárias.

A autonomia patrimonial significa que a pessoa jurídica e seus sócios não se confundem. O patrimônio da entidade deve ser identificado e registrado separadamente do patrimônio particular dos proprietários.

**Para a prova:** campo de aplicação = aziendas; objeto = patrimônio; finalidade = fornecer informações; autonomia = separar entidade e sócios.
$a$,
flashcards=coalesce(flashcards,'[]'::jsonb)||'[
{"f":"Aziendas: patrimônio administrado.","b":"Qual é o campo de aplicação da Contabilidade, conforme o resumo?"},
{"f":"A pessoa jurídica possui patrimônio próprio, distinto do patrimônio particular dos sócios.","b":"O que significa autonomia patrimonial?"}]'::jsonb,
quiz=coalesce(quiz,'[]'::jsonb)||'[
{"q":"O campo de aplicação da Contabilidade abrange as aziendas, entendidas como patrimônio e gestão.","a":true,"why":"O Resumo de Contabilidade Geral apresenta a azienda como campo de aplicação."},
{"q":"O patrimônio da sociedade se confunde com o patrimônio particular de seus sócios.","a":false,"why":"A autonomia patrimonial distingue a pessoa jurídica de seus sócios."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-01-fundamentos-patrimonio-ativo-passivo'
and position('## 7. Campo de aplicação e autonomia da entidade' in body_md)=0;

update public.study_materials
set body_md=body_md || $b$

## 6. Atos contábeis e fatos contábeis

O resumo diferencia dois acontecimentos:

- **Ato contábil:** ocorre na entidade, mas não provoca alteração no patrimônio. Por não modificar o patrimônio, não é registrado como fato contábil.
- **Fato contábil:** provoca variação no patrimônio e precisa ser reconhecido na escrituração.

Exemplo de ato: assinatura de um pedido de compra ainda sem entrega, pagamento ou outro evento que altere o patrimônio, conforme as condições da operação.

Exemplo de fato: recebimento das mercadorias compradas, que altera a composição patrimonial.

## 7. Classificação dos fatos contábeis

- **Permutativo:** altera a composição dos elementos patrimoniais, sem modificar o valor do PL. Exemplo: compra de mercadorias à vista; aumenta estoque e diminui caixa.
- **Modificativo aumentativo:** aumenta o PL. Exemplo: reconhecimento de receita de serviço.
- **Modificativo diminutivo:** diminui o PL. Exemplo: reconhecimento de despesa.
- **Misto aumentativo:** combina permuta patrimonial com aumento do PL.
- **Misto diminutivo:** combina permuta patrimonial com redução do PL. Exemplo: pagamento de obrigação com juros; baixa a obrigação e o caixa, e os juros reduzem o resultado.

**Roteiro de prova:** pergunte primeiro se o PL mudou. Se não mudou, o fato é permutativo. Se mudou, verifique se houve também uma troca entre elementos patrimoniais: pode ser misto. Se apenas alterou o PL, é modificativo.

## 8. Custo, despesa e resultado

O custo está relacionado à aquisição ou produção de bens e serviços. A despesa representa consumo de recursos reconhecido no resultado. O momento e a finalidade do consumo ajudam a diferenciar os conceitos.

**Resultado simplificado = receitas − despesas.** O custo de um produto vendido afeta o resultado como custo da mercadoria ou produto vendido; não confunda o estoque ainda não vendido com despesa já consumida.
$b$,
flashcards=coalesce(flashcards,'[]'::jsonb)||'[
{"f":"Acontecimento que ocorre na entidade sem provocar alteração patrimonial.","b":"O que é ato contábil?"},
{"f":"Acontecimento que provoca variação no patrimônio e deve ser reconhecido.","b":"O que é fato contábil?"},
{"f":"Permutativo: troca elementos patrimoniais sem alterar o PL.","b":"Qual é a característica do fato permutativo?"},
{"f":"Aumenta o patrimônio líquido.","b":"O que faz um fato modificativo aumentativo?"},
{"f":"Diminui o patrimônio líquido.","b":"O que faz um fato modificativo diminutivo?"}]'::jsonb,
quiz=coalesce(quiz,'[]'::jsonb)||'[
{"q":"Atos contábeis são acontecimentos que não provocam alteração no patrimônio.","a":true,"why":"Essa é a distinção apresentada no resumo entre ato e fato contábil."},
{"q":"Todo ato contábil deve ser registrado como fato contábil, mesmo sem alteração patrimonial.","a":false,"why":"O ato não provoca variação patrimonial; o fato contábil provoca."},
{"q":"A compra de mercadorias à vista, sem outros efeitos, é fato permutativo.","a":true,"why":"Há troca entre caixa e estoque, sem alteração imediata do PL."},
{"q":"O reconhecimento de receita de serviço é fato modificativo aumentativo.","a":true,"why":"A receita aumenta o resultado e, em regra, o PL."},
{"q":"O pagamento de obrigação com juros pode constituir fato misto diminutivo.","a":true,"why":"Há baixa de elementos patrimoniais e despesa de juros que reduz o PL."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-02-contas-receitas-despesas-fatos'
and position('## 6. Atos contábeis e fatos contábeis' in body_md)=0;

update public.study_materials
set body_md=body_md || $c$

## 7. Elementos mínimos do lançamento contábil

O resumo indica que a escrituração deve permitir identificar, no mínimo:

- data do registro, correspondente à data em que o fato ocorreu;
- conta devedora;
- conta credora;
- histórico que represente a essência econômica da transação (ou código padronizado com tabela auxiliar);
- valor;
- informação que permita identificar univocamente os registros que integram o mesmo lançamento.

O histórico não deve ser uma descrição vaga: precisa permitir compreender a essência econômica do fato.

## 8. Fórmulas de lançamento

As fórmulas classificam a quantidade de contas debitadas e creditadas:

| Fórmula | Débitos | Créditos |
|---|---:|---:|
| 1ª | 1 | 1 |
| 2ª | 1 | 2 ou mais |
| 3ª | 2 ou mais | 1 |
| 4ª | 2 ou mais | 2 ou mais |

**Exemplo:** um débito em Caixa contra Capital Social é lançamento de 1ª fórmula. Um débito em uma conta contra duas contas credoras é de 2ª fórmula.

## 9. Retificação de lançamentos

O resumo apresenta três formas técnicas de corrigir registros:

- **Estorno:** lançamento inverso para anular integralmente o registro incorreto.
- **Transferência:** transposição do valor para a conta correta.
- **Complementação:** ajuste do valor para mais ou para menos, quando o lançamento original ficou incompleto ou incorreto no montante.

**Atenção:** retificar não significa apagar o histórico. A correção deve preservar a rastreabilidade do registro.

## 10. Livros Diário e Razão

- **Livro Diário:** registra os lançamentos em ordem cronológica, permitindo acompanhar a sequência dos fatos.
- **Livro Razão:** organiza os registros por conta, facilitando a consulta e análise dos respectivos movimentos e saldos.

O Diário responde principalmente “quando e em que sequência ocorreu”; o Razão permite acompanhar “o que aconteceu em cada conta”.

## 11. Limites do balancete de verificação

O balancete evidencia a igualdade matemática entre débitos e créditos. Porém, não garante que todos os lançamentos estejam corretos.

Pode existir erro mesmo com igualdade, por exemplo: uso de conta incorreta em lançamento de mesmo valor, omissão integral de uma operação ou registro em conta errada mantendo débito e crédito iguais.
$c$,
flashcards=coalesce(flashcards,'[]'::jsonb)||'[
{"f":"Data, conta devedora, conta credora, histórico, valor e identificação unívoca do lançamento.","b":"Quais são os elementos mínimos de um lançamento contábil indicados no resumo?"},
{"f":"Uma conta debitada e uma creditada.","b":"Como se estrutura a 1ª fórmula de lançamento?"},
{"f":"Estorno, transferência e complementação.","b":"Quais são as formas de retificação de lançamento?"},
{"f":"Registra os fatos em ordem cronológica.","b":"Qual é a função do Livro Diário?"},
{"f":"Organiza os lançamentos por conta e permite acompanhar seus movimentos e saldos.","b":"Qual é a função do Livro Razão?"},
{"f":"A igualdade matemática entre débitos e créditos.","b":"O que o balancete de verificação evidencia?"}]'::jsonb,
quiz=coalesce(quiz,'[]'::jsonb)||'[
{"q":"O histórico do lançamento deve representar a essência econômica da transação.","a":true,"why":"O resumo inclui o histórico entre os elementos mínimos da escrituração."},
{"q":"A 2ª fórmula de lançamento apresenta uma conta debitada e duas ou mais contas creditadas.","a":true,"why":"É a classificação apresentada no quadro de fórmulas."},
{"q":"A 3ª fórmula de lançamento apresenta duas ou mais contas debitadas e uma conta creditada.","a":true,"why":"É a estrutura da 3ª fórmula."},
{"q":"A transferência é uma forma de retificação que transpõe o valor para a conta correta.","a":true,"why":"Essa é a definição de transferência no resumo."},
{"q":"O balancete garante que não houve omissão de lançamentos nem erro de classificação.","a":false,"why":"O balancete evidencia a igualdade matemática, mas não detecta necessariamente esses erros."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-03-escrituracao-partidas-dobradas'
and position('## 7. Elementos mínimos do lançamento contábil' in body_md)=0;

update public.study_materials
set body_md=body_md || $d$

## 6. Estrutura e classificação do Balanço Patrimonial

O resumo apresenta a estrutura do Balanço Patrimonial em três grandes grupos:

**Ativo**
- Ativo circulante.
- Ativo não circulante: realizável a longo prazo, investimentos, imobilizado e intangível.

**Passivo e Patrimônio Líquido**
- Passivo circulante.
- Passivo não circulante.
- Patrimônio Líquido.

No Ativo, as contas são apresentadas em ordem decrescente de liquidez, isto é, da maior facilidade de conversão em dinheiro para a menor.

### Ativo circulante

O material destaca:
- disponibilidades;
- direitos realizáveis no curso do exercício social subsequente;
- aplicações de recursos em despesas do exercício seguinte.

### Ativo não circulante

É composto por:
- realizável a longo prazo;
- investimentos;
- imobilizado;
- intangível.

**Não confunda:** investimento, imobilizado e intangível são grupos distintos do ativo não circulante. O imobilizado se relaciona a bens corpóreos destinados à manutenção das atividades; o intangível, a direitos de natureza incorpórea.

## 7. Balanço Patrimonial x DRE

| Demonstração | O que evidencia | Referência temporal |
|---|---|---|
| Balanço Patrimonial | Posição patrimonial e financeira | Uma data específica |
| DRE | Formação do resultado por receitas, custos e despesas | Um período |

O Balanço é uma fotografia da posição patrimonial. A DRE explica o desempenho durante o período. Uma entidade pode apresentar lucro na DRE e, mesmo assim, não ter caixa suficiente, por exemplo, se suas vendas ocorreram a prazo e ainda não foram recebidas.

## 8. Leitura inicial das demonstrações

Ao interpretar um Balanço, identifique primeiro os grupos de Ativo, Passivo e PL e observe a relação entre eles. Na DRE, acompanhe a formação do resultado e diferencie receitas, custos e despesas.

**Roteiro:** posição em uma data = Balanço; desempenho ao longo do período = DRE; recebimento ou pagamento = fluxo financeiro. Não use lucro como sinônimo de dinheiro disponível.
$d$,
flashcards=coalesce(flashcards,'[]'::jsonb)||'[
{"f":"Ativo circulante e ativo não circulante.","b":"Quais são os dois grandes grupos do Ativo no Balanço?"},
{"f":"Realizável a longo prazo, investimentos, imobilizado e intangível.","b":"Quais são os componentes do ativo não circulante?"},
{"f":"Em ordem decrescente de liquidez.","b":"Como as contas do Ativo são apresentadas no Balanço?"},
{"f":"Uma data específica.","b":"Qual é a referência temporal do Balanço Patrimonial?"},
{"f":"Um período contábil.","b":"Qual é a referência temporal da DRE?"}]'::jsonb,
quiz=coalesce(quiz,'[]'::jsonb)||'[
{"q":"O ativo não circulante inclui realizável a longo prazo, investimentos, imobilizado e intangível.","a":true,"why":"Esses são os quatro grupos apresentados no resumo."},
{"q":"As contas do Ativo são apresentadas em ordem decrescente de liquidez.","a":true,"why":"O resumo descreve essa ordem de apresentação."},
{"q":"O Balanço Patrimonial evidencia o desempenho ao longo de um período, enquanto a DRE apresenta a posição em uma data.","a":false,"why":"Está invertido: o Balanço é uma posição em data específica; a DRE evidencia o resultado de um período."},
{"q":"Uma empresa pode apresentar lucro na DRE e não ter caixa suficiente no mesmo momento.","a":true,"why":"Vendas a prazo podem gerar receita e lucro antes do recebimento."},
{"q":"Imobilizado e intangível são grupos distintos do ativo não circulante.","a":true,"why":"Imobilizado se refere a bens corpóreos; intangível, a direitos incorpóreos."}]'::jsonb,
updated_at=now()
where slug='pcac-2026-contabilidade-04-demonstracoes-balanco-dre-regimes'
and position('## 6. Estrutura e classificação do Balanço Patrimonial' in body_md)=0;
