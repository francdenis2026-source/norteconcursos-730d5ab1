-- PC-AC 2026: novos módulos de Contabilidade Geral fundamentados nos PDFs enviados.
insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,source_note,content_status,flashcards,quiz,updated_at) values ('pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao','Contabilidade Geral','8. Contabilidade de custos: matéria-prima, custos de produção, rateio e departamentalização',8,'Contabilidade de custos: consumo de matéria-prima e rateio','Cálculo do consumo de matéria-prima, separação de custos e despesas, rateio por critérios e departamentalização.','# Aula 8 — Custos, consumo de matéria-prima e rateio

## 1. Custo, despesa e gasto

- **Custo:** gasto ligado à produção de bens ou serviços.
- **Despesa:** gasto ligado à administração, comercialização ou obtenção de receitas, sem integrar diretamente a produção.
- **Custo direto:** pode ser identificado e atribuído diretamente ao produto, como matéria-prima e mão de obra direta.
- **Custo indireto:** atende à produção, mas precisa de critério de distribuição, como energia da fábrica, aluguel e depreciação de máquinas comuns.

Atenção: o nome do gasto não basta. Observe sua finalidade. Energia consumida na fábrica pode ser custo indireto; energia do escritório administrativo é despesa.

## 2. Consumo de matéria-prima

A fórmula é:

**Consumo = Estoque inicial + Compras − Estoque final**

Exemplo do material: estoque inicial de R$ 3.000, compras de R$ 11.000 e estoque final de R$ 5.000.

R$ 3.000 + R$ 11.000 − R$ 5.000 = **R$ 9.000**.

Pense assim: havia R$ 3 mil guardados, entraram R$ 11 mil em compras e sobraram R$ 5 mil. O que foi consumido na produção foi R$ 9 mil.

## 3. Custo de produção do período — exemplo resolvido do material

Dados da questão Consulplan/CFC 2020.2 (valores em reais):
- Compra de matéria-prima: 11.000
- Estoque inicial: 3.000
- Estoque final: 5.000
- Mão de obra: 5.000
- Supervisão geral da produção: 2.900
- Aluguel da fábrica: 600
- Lubrificantes dos equipamentos de produção: 400
- Manutenção preventiva de máquinas de produção: 500
- Supervisão do almoxarifado de matéria-prima: 1.400
- Depreciação de equipamentos de produção: 300
- Seguro dos equipamentos da fábrica: 340
- Energia elétrica consumida na produção: 790

Primeiro, calcule a matéria-prima consumida: 3.000 + 11.000 − 5.000 = 9.000.

Depois, some os custos de produção apresentados:
9.000 + 5.000 + 2.900 + 600 + 400 + 500 + 1.400 + 300 + 340 + 790 = **R$ 21.230**.

Não inclua neste custo de produção as despesas comerciais e administrativas (R$ 4.000), as despesas financeiras (R$ 200) nem a propaganda/marketing (R$ 1.500), pois não são custos de fabricação.

## 4. O que é rateio?

Ratear é **dividir um gasto comum entre setores ou produtos**, usando um critério definido.

Exemplo simples: uma conta de energia de R$ 50.000 será dividida entre departamentos conforme a área ocupada. Se a área total é 100 m² e um departamento ocupa 20 m², ele recebe 20% do gasto:

50.000 × (20 ÷ 100) = **R$ 10.000**.

Atenção: não se divide necessariamente em partes iguais. O critério deve refletir a relação do gasto com o departamento.

## 5. Bases de rateio do exercício do material

O exercício Consulplan/CFC 2020.1 apresenta três departamentos: serviço (20 m², 40 empregados, 2 máquinas), produção 1 (50 m², 60 empregados, 3 máquinas) e produção 2 (30 m², 100 empregados, 5 máquinas).

O próprio enunciado informa as bases:
- Energia elétrica de R$ 50.000: área ocupada (m²).
- Água, telefone e alimentação de R$ 100.000: quantidade de empregados.
- Depreciação de R$ 12.000: quantidade de máquinas.

**Energia — área total de 100 m²**
- Serviço: 20/100 × 50.000 = R$ 10.000.
- Produção 1: 50/100 × 50.000 = R$ 25.000.
- Produção 2: 30/100 × 50.000 = R$ 15.000.

**Água, telefone e alimentação — 200 empregados**
- Serviço: 40/200 × 100.000 = R$ 20.000.
- Produção 1: 60/200 × 100.000 = R$ 30.000.
- Produção 2: 100/200 × 100.000 = R$ 50.000.

**Depreciação — 10 máquinas**
- Serviço: 2/10 × 12.000 = R$ 2.400.
- Produção 1: 3/10 × 12.000 = R$ 3.600.
- Produção 2: 5/10 × 12.000 = R$ 6.000.

Confira: a soma das parcelas de cada gasto deve voltar ao total original.

## 6. Departamentalização

É a distribuição dos custos indiretos por departamentos antes de atribuí-los aos produtos. O exercício distingue departamento de serviço e departamentos de produção. Os departamentos de produção recebem os custos que lhes cabem e depois esses custos são atribuídos aos produtos conforme o critério informado no enunciado.

**Pegadinhas para a prova**
- Estoque final é subtraído, não somado.
- Despesa administrativa não vira custo de fabricação só porque ocorreu no mesmo período.
- O critério de rateio vem do enunciado: área, empregados, máquinas ou outro indicador indicado.
- Não confunda departamento de serviço com departamento que fabrica diretamente o produto.

## Treino — questões autorais

1. Uma indústria tinha estoque inicial de matéria-prima de R$ 4.000, comprou R$ 13.000 e terminou o período com R$ 6.000. O consumo foi de R$ 11.000. **Certo ou errado?**

2. Uma conta de energia de R$ 30.000 será rateada pela área. Um setor ocupa 25 m² de um total de 150 m². Sua parcela será de R$ 5.000. **Certo ou errado?**

**Gabarito comentado**
1. **Certo.** 4.000 + 13.000 − 6.000 = R$ 11.000.
2. **Certo.** 25/150 = 1/6; 30.000 ÷ 6 = R$ 5.000.','PC-AC 2026','Conteúdo organizado exclusivamente a partir dos arquivos enviados: “Prova 2020.2 Resolvida - Parte 02.pdf” (questão Consulplan/CFC 2020.2, páginas 13–18) e “Revisão de Véspera.pdf” (questão Consulplan/CFC 2020.1, páginas 2–3).','active','[{"f":"Como calcular o consumo de matéria-prima?","b":"Estoque inicial + compras − estoque final."},{"f":"Qual o consumo com estoque inicial de R$ 3.000, compras de R$ 11.000 e estoque final de R$ 5.000?","b":"R$ 9.000."},{"f":"O que é rateio?","b":"Divisão de um gasto comum entre setores ou produtos por um critério definido."},{"f":"Qual foi a base de rateio da energia no exercício da Consulplan/CFC 2020.1?","b":"Área ocupada em metros quadrados."},{"f":"No exercício de departamentalização, qual a base da depreciação?","b":"Quantidade de máquinas."}]'::jsonb,'[{"q":"Estoque inicial de R$ 3.000, compras de R$ 11.000 e estoque final de R$ 5.000 resultam em consumo de R$ 9.000.","a":true,"why":"Consumo = 3.000 + 11.000 − 5.000 = R$ 9.000."},{"q":"No rateio de R$ 50.000 de energia por área, um departamento com 20 m² de um total de 100 m² recebe R$ 10.000.","a":true,"why":"20/100 = 20%; 20% de R$ 50.000 são R$ 10.000."},{"q":"A propaganda de marketing do produto deve integrar o custo de fabricação apresentado na questão da Cia. Faz Agora.","a":false,"why":"O enunciado classifica propaganda/marketing como despesa, fora dos custos de produção."},{"q":"Se a depreciação de R$ 12.000 é rateada entre departamentos com 2, 3 e 5 máquinas, o departamento com 5 máquinas recebe R$ 6.000.","a":true,"why":"Há 10 máquinas no total; 5/10 de R$ 12.000 = R$ 6.000."},{"q":"O estoque final de matéria-prima deve ser somado ao estoque inicial para calcular o consumo.","a":false,"why":"O estoque final é subtraído: EI + compras − EF."}]'::jsonb,now()) on conflict (slug) do update set discipline=excluded.discipline,topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();

insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,source_note,content_status,flashcards,quiz,updated_at) values ('pcac-2026-contabilidade-09-investimentos-dividendos-mep-metodo-custo','Contabilidade Geral','9. Investimentos: método de custo, equivalência patrimonial e dividendos',9,'Investimentos, participação societária e dividendos','Participação percentual, dividendos a receber, método de custo e método da equivalência patrimonial.','# Aula 9 — Investimentos, participação societária e dividendos

## 1. Participação na empresa

Quando uma empresa compra ações de outra, passa a ter uma participação no capital da investida. Se possui 12% de participação, em regra, terá direito a 12% dos dividendos distribuídos aos acionistas daquela participação.

**Conta básica: dividendos distribuídos × percentual de participação.**

Exemplo: a investida distribuiu R$ 18.000 em dividendos. A investidora possui 12%.

18.000 × 12% = 18.000 × 0,12 = **R$ 2.160 a receber**.

Atenção: o percentual de participação é aplicado sobre o total de dividendos distribuídos, e não sobre o patrimônio líquido inteiro.

## 2. Método de custo

Segundo o resumo enviado, os investimentos que não se enquadram como coligadas ou controladas são avaliados pelo método de custo, como critério residual descrito no material.

No método de custo:
- o investimento é registrado pelo custo de aquisição;
- os dividendos distribuídos são reconhecidos como receita, conforme a regra apresentada no material;
- o resumo também destaca a exceção dos dividendos distribuídos em até seis meses após a aquisição: são tratados como recuperação de parte do investimento.

## 3. Questão resolvida do material — participação de 12%

A questão Consulplan/Exame CFC 2020.2 informa:
- participação adquirida: 12%;
- lucro apurado pela investida: R$ 36.000;
- distribuição aprovada: 50% do lucro;
- investimento avaliado pelo método de custo.

Primeiro, calcule o total dos dividendos:
36.000 × 50% = R$ 18.000.

Depois, calcule a parte da investidora:
18.000 × 12% = **R$ 2.160**.

Como o enunciado informa método de custo e a distribuição ocorre em 31/12/2019, mais de seis meses após a aquisição em 15/03/2019? Não: o intervalo é inferior a seis meses? De 15/03 a 31/12 são mais de seis meses. Portanto, aplica-se o tratamento de receita de dividendos indicado no material.

Lançamento:
- Débito: Dividendos a Receber — R$ 2.160.
- Crédito: Receita de Dividendos em Investimentos Avaliados pelo Método de Custo — R$ 2.160.

## 4. Método da Equivalência Patrimonial (MEP)

O material explica que o MEP reconhece a participação da investidora no resultado da investida à medida que esse resultado é apurado, e não somente quando os dividendos são distribuídos.

A fórmula didática apresentada é:

**Participação no PL = Patrimônio líquido da investida × percentual de participação.**

O resumo informa que investimentos em coligadas e controladas, sociedades do mesmo grupo e sob controle comum são avaliados pelo MEP. Também apresenta a influência significativa como capacidade de participar das decisões financeiras ou operacionais sem controlar a investida e indica presunção de influência significativa a partir de 20% do capital votante, sem controle.

## 5. Dividendos no MEP

Quando a investida declara dividendos:
- o patrimônio líquido da investida diminui;
- a investidora reconhece um direito a receber;
- o valor contábil do investimento da investidora diminui.

Lançamento indicado no material:
- Débito: Dividendos a Receber.
- Crédito: Investimento — MEP.

Já o reconhecimento da participação no resultado positivo da investida é:
- Débito: Investimento — MEP.
- Crédito: Resultado com Equivalência Patrimonial.

## 6. Diferença entre método de custo e MEP

| Situação | Método de custo | MEP |
|---|---|---|
| Resultado da investida | Não é reconhecido automaticamente como resultado da investidora apenas por ter sido apurado | A participação no resultado é reconhecida quando ocorre |
| Dividendos declarados | Em regra, receita, conforme resumo; observar exceção de até seis meses | Reduzem o investimento e geram dividendos a receber |
| Lançamento dos dividendos | Débito em dividendos a receber; crédito em receita de dividendos | Débito em dividendos a receber; crédito em investimento |

**Pegadinhas para a prova**
- 12% de participação não significa receber 12% do lucro se apenas parte dele foi distribuída.
- Primeiro calcule o total distribuído; depois aplique o percentual da participação.
- No MEP, dividendos não são uma segunda receita: reduzem o investimento.
- Não confunda método de custo com método da equivalência patrimonial.

## Treino — questões autorais

1. Uma investidora possui 15% de participação em uma empresa que distribuiu R$ 40.000 em dividendos. O direito a receber é de R$ 6.000. **Certo ou errado?**

2. Pelo MEP, quando a investida declara dividendos, a investidora debita Dividendos a Receber e credita Receita de Dividendos. **Certo ou errado?**

**Gabarito comentado**
1. **Certo.** 40.000 × 0,15 = R$ 6.000.
2. **Errado.** Pelo MEP, o crédito é na conta Investimento — MEP, pois a distribuição reduz o patrimônio líquido da investida e o valor do investimento.','PC-AC 2026','Conteúdo organizado exclusivamente a partir dos arquivos enviados: “Resumo - Contabilidade Geral.pdf” (itens 95–114, páginas 19–21) e “Revisão de Véspera - Alunos.pdf” (questão Consulplan/Exame CFC 2020.2, página 1).','active','[{"f":"Como calcular os dividendos devidos à investidora?","b":"Total de dividendos distribuídos × percentual de participação."},{"f":"Quanto recebe quem tem 12% de participação se a empresa distribui R$ 18.000?","b":"R$ 2.160."},{"f":"Como os dividendos são tratados, em regra, no método de custo segundo o resumo?","b":"Como receita de dividendos, observada a exceção de distribuição em até seis meses após a aquisição."},{"f":"O que o MEP reconhece na investidora?","b":"Sua participação no resultado da investida à medida que o resultado é apurado."},{"f":"Qual o lançamento dos dividendos no MEP?","b":"Débito em Dividendos a Receber e crédito em Investimento — MEP."}]'::jsonb,'[{"q":"Uma participação de 12% em uma empresa que distribui R$ 18.000 em dividendos dá direito a R$ 2.160.","a":true,"why":"18.000 × 0,12 = R$ 2.160."},{"q":"Se a empresa distribui apenas 50% de um lucro de R$ 36.000, a investidora com 12% recebe 12% de R$ 36.000.","a":false,"why":"Primeiro calcula-se o total distribuído: 36.000 × 50% = 18.000. Depois: 18.000 × 12% = R$ 2.160."},{"q":"No MEP, a participação da investidora no lucro da investida é reconhecida à medida que o resultado é apurado.","a":true,"why":"Esse é o ponto central do método da equivalência patrimonial descrito no resumo."},{"q":"Pelo MEP, os dividendos declarados geram crédito em Receita de Dividendos.","a":false,"why":"O lançamento apresentado no material credita Investimento — MEP."},{"q":"O resumo apresenta presunção de influência significativa a partir de 20% do capital votante, sem controle.","a":true,"why":"Essa é a referência expressamente indicada no material enviado."}]'::jsonb,now()) on conflict (slug) do update set discipline=excluded.discipline,topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();

insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,source_note,content_status,flashcards,quiz,updated_at) values ('pcac-2026-contabilidade-10-impairment-goodwill-reducao-valor-recuperavel','Contabilidade Geral','10. Redução ao valor recuperável de ativos e goodwill',10,'Impairment: redução ao valor recuperável e goodwill','Teste de recuperabilidade, reconhecimento de perdas e vedação à reversão de perda por impairment do goodwill.','# Aula 10 — Impairment e goodwill

## 1. O que é impairment?

Impairment é o teste de redução ao valor recuperável de um ativo. A ideia é verificar se o valor registrado na contabilidade pode ser recuperado por meio do uso ou da venda do ativo.

O material da questão Consulplan/CFC 2019.1 destaca que, ao fim de cada período de reporte, a entidade avalia se há indicação de que um ativo possa ter sofrido desvalorização. Havendo indicação, deve estimar o valor recuperável.

## 2. Valor recuperável

Na comparação apresentada nas questões do material, considere:
- valor em uso;
- valor justo líquido das despesas de venda.

O valor recuperável corresponde ao maior entre esses dois valores. Compara-se esse valor com o valor contábil do ativo. Se o valor contábil for maior, existe perda por desvalorização.

Exemplo didático: valor contábil de R$ 100.000; valor em uso de R$ 85.000; valor justo líquido de despesas de venda de R$ 90.000. Valor recuperável = R$ 90.000. Perda = R$ 10.000.

## 3. Goodwill — ágio por expectativa de rentabilidade futura

Goodwill é o ágio por expectativa de rentabilidade futura, relacionado à aquisição de participação/negócio. O simulado enviado também destaca que goodwill gerado internamente não deve ser reconhecido como ativo.

O goodwill reconhecido deve ser submetido ao teste de recuperabilidade conforme o material.

## 4. A perda do goodwill não pode ser revertida

**Regra central para memorizar: uma perda por redução ao valor recuperável reconhecida para goodwill não pode ser revertida em período posterior.**

Mesmo que a situação econômica melhore no futuro, a perda anteriormente reconhecida sobre o goodwill não é revertida.

Atenção à pegadinha: a questão Consulplan/CFC 2019.1 apresenta como afirmativa II a frase de que perdas de goodwill devem ser revertidas. Essa afirmação é falsa. O gabarito assinalado no material é a alternativa **C — I e III, apenas**.

## 5. Reconhecimento da perda

A questão do material afirma que a perda por desvalorização é reconhecida imediatamente no resultado, salvo o tratamento específico para ativo reavaliado, em que a desvalorização reduz o saldo de reavaliação, conforme a regra apresentada no enunciado.

## 6. Questão do simulado sobre goodwill

O simulado enviado apresenta goodwill com:
- custo: R$ 990.000;
- perda por desvalorização reconhecida anteriormente: R$ 110.000;
- valor em uso no novo teste: R$ 1.050.000;
- valor justo líquido das despesas de venda: R$ 830.000.

O valor recuperável é o maior: R$ 1.050.000. Porém, como já houve perda reconhecida sobre goodwill, ela não pode ser revertida. Assim, o valor contábil permanece em **R$ 880.000** (990.000 − 110.000), e não volta a R$ 990.000 ou R$ 1.050.000.

## Pegadinhas para a prova
- Valor recuperável: maior entre valor em uso e valor justo líquido das despesas de venda.
- Se valor contábil superar o recuperável, reconhece-se perda.
- Goodwill gerado internamente não é reconhecido como ativo, conforme o simulado.
- Perda por impairment do goodwill não pode ser revertida.
- Não confunda melhora no valor recuperável com autorização para estornar a perda do goodwill.

## Treino — questões autorais

1. Uma perda por redução ao valor recuperável anteriormente reconhecida sobre goodwill pode ser revertida se o valor recuperável aumentar no exercício seguinte. **Certo ou errado?**

2. Um ativo tem valor contábil de R$ 120.000, valor em uso de R$ 100.000 e valor justo líquido de despesas de venda de R$ 105.000. O valor recuperável é R$ 105.000 e a perda é R$ 15.000. **Certo ou errado?**

**Gabarito comentado**
1. **Errado.** A perda reconhecida sobre goodwill não pode ser revertida.
2. **Certo.** O maior valor é R$ 105.000; 120.000 − 105.000 = R$ 15.000.','PC-AC 2026','Conteúdo organizado exclusivamente a partir dos arquivos enviados: “Revisão de Véspera.pdf” (questão Consulplan/Exame CFC 2019.1, páginas 26–27) e “Correção - Simulado.pptx” (questões sobre goodwill e teste de recuperabilidade).','active','[{"f":"O que é impairment?","b":"Teste de redução ao valor recuperável de um ativo."},{"f":"Como se determina o valor recuperável nas questões do material?","b":"Pelo maior entre valor em uso e valor justo líquido das despesas de venda."},{"f":"Quando há perda por impairment?","b":"Quando o valor contábil supera o valor recuperável."},{"f":"A perda por impairment do goodwill pode ser revertida?","b":"Não. A perda reconhecida sobre goodwill não pode ser revertida."},{"f":"Goodwill gerado internamente deve ser reconhecido como ativo?","b":"Não, conforme a questão do simulado enviado."}]'::jsonb,'[{"q":"Uma perda por redução ao valor recuperável anteriormente reconhecida sobre goodwill não pode ser revertida em exercício futuro.","a":true,"why":"A vedação à reversão de perda reconhecida sobre goodwill é a regra central cobrada no material."},{"q":"O valor recuperável é o menor entre o valor em uso e o valor justo líquido das despesas de venda.","a":false,"why":"É o maior entre os dois valores."},{"q":"Se o valor contábil é R$ 100.000 e o valor recuperável é R$ 90.000, a perda é de R$ 10.000.","a":true,"why":"A perda corresponde à diferença entre valor contábil e valor recuperável."},{"q":"A melhora do valor recuperável permite aumentar o goodwill pelo estorno da perda reconhecida anteriormente.","a":false,"why":"A perda reconhecida sobre goodwill não pode ser revertida."},{"q":"A questão Consulplan/CFC 2019.1 apresentada no material tem como resposta I e III, apenas.","a":true,"why":"A afirmativa II é falsa porque propõe reversão da perda de goodwill; o material assinala a alternativa C."}]'::jsonb,now()) on conflict (slug) do update set discipline=excluded.discipline,topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();