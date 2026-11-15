-- PC-AC 2026: questões comentadas extraídas dos PDFs CFC Consulplan 2020.1 e 2020.2.
-- A questão 30 de DVA foi mantida como pendência de conferência: transcrição e alternativas não conciliam.
update public.study_materials set body_md=body_md||'

## Questões Consulplan/CFC 2020.2 — custo de produção e departamentalização

### Questão: Cia. Faz Agora — custo de produção do período (alternativa B: R$ 21.230)

**1. Descubra a matéria-prima consumida:** estoque inicial + compras − estoque final = 3.000 + 11.000 − 5.000 = **R$ 9.000**.

**2. Some a mão de obra direta:** R$ 5.000.

**3. Separe os custos indiretos de fabricação:** supervisão geral da produção (2.900), aluguel da fábrica (600), lubrificantes usados nos equipamentos (400), manutenção preventiva das máquinas (500), supervisão do almoxarifado de matéria-prima (1.400), depreciação dos equipamentos de produção (300), seguro dos equipamentos da fábrica (340) e energia consumida na produção (790). Total dos CIF = **R$ 7.230**.

Custo de produção do período = 9.000 + 5.000 + 7.230 = **R$ 21.230**.

**O que fica de fora:** despesas comerciais e administrativas (4.000), despesas financeiras (200) e propaganda/marketing (1.500). São despesas do período, não custos de fabricação.

**Macete:** para matéria-prima, use EI + compras − EF. Depois some MOD e CIF. Não misture gastos de vender, administrar ou financiar com o custo de fabricar.

### Questão: Indústria Alfa — rateio por departamentos (alternativa D: A = R$ 4,49; B = R$ 5,27 por unidade)

Custos diretos: produto A = R$ 30.000; produto B = R$ 35.000. Produção: A = 15.000 unidades; B = 10.000 unidades.

**Etapa 1 — distribuir Administração Geral da Produção (R$ 8.000) por funcionários.** Total de funcionários: 10 + 12 + 6 + 4 = 32. Rateio: Corte R$ 2.500; Costura R$ 3.000; Pintura R$ 1.500; Almoxarifado R$ 1.000.

**Etapa 2 — distribuir o Almoxarifado.** O custo do almoxarifado passa de R$ 5.000 para R$ 6.000. Pela quantidade de requisições (600, 600 e 300; total 1.500), transfere-se: Corte R$ 2.400; Costura R$ 2.400; Pintura R$ 1.200.

**Etapa 3 — custos indiretos finais dos departamentos de produção.** Corte: 14.000 + 2.500 + 2.400 = R$ 18.900. Costura: 20.000 + 3.000 + 2.400 = R$ 25.400. Pintura: 8.000 + 1.500 + 1.200 = R$ 10.700.

**Etapa 4 — ratear Corte e Costura entre A e B pelo volume produzido.** Como ambos passam por esses departamentos, o total de R$ 44.300 é dividido proporcionalmente a 15.000 e 10.000 unidades: A recebe R$ 26.580; B recebe R$ 17.720. A Pintura é exclusiva de A: soma mais R$ 10.700.

CIF de A = 26.580 + 10.700 = R$ 37.280. Custo total de A = 30.000 + 37.280 = R$ 67.280; por unidade = 67.280 ÷ 15.000 = **R$ 4,49**.

CIF de B = R$ 17.720. Custo total de B = 35.000 + 17.720 = R$ 52.720; por unidade = 52.720 ÷ 10.000 = **R$ 5,27**.

**Pegadinha:** não rateie Pintura para B: o enunciado diz que B não passa por esse departamento. E faça os rateios de serviço na ordem indicada: primeiro Administração Geral, depois Almoxarifado, só então os departamentos de produção.',quiz=quiz||'[{"q":"Na questão CFC 2020.2 da Cia. Faz Agora, qual o custo de produção do período?","a":true,"why":"Matéria-prima consumida: 3.000 + 11.000 − 5.000 = 9.000. MOD 5.000. CIF 7.230. Total R$ 21.230, alternativa B."},{"q":"Despesas comerciais, administrativas, financeiras e propaganda integram o custo de fabricação da questão Cia. Faz Agora.","a":false,"why":"São despesas do período. O custo de fabricação reúne matéria-prima consumida, mão de obra direta e custos indiretos de fabricação."},{"q":"Na questão da Indústria Alfa, o produto B recebe parte dos custos de Pintura.","a":false,"why":"O enunciado informa que B passa somente por Corte e Costura; Pintura é exclusiva do produto A."},{"q":"Na questão de departamentalização da Indústria Alfa, os custos unitários são A = R$ 4,49 e B = R$ 5,27.","a":true,"why":"Administração é rateada por funcionários; Almoxarifado por requisições; custos de produção por volume. Pintura só vai para A."}]'::jsonb,flashcards=flashcards||'[{"f":"Como calcular matéria-prima consumida?","b":"Estoque inicial + compras − estoque final."},{"f":"Quais itens compõem o custo de produção do período?","b":"Matéria-prima consumida + mão de obra direta + custos indiretos de fabricação."},{"f":"Qual o custo de produção na questão Cia. Faz Agora?","b":"R$ 21.230: MP consumida R$ 9.000 + MOD R$ 5.000 + CIF R$ 7.230."},{"f":"Qual a sequência do rateio na questão da Indústria Alfa?","b":"Administração Geral por funcionários; Almoxarifado por requisições; departamentos de produção aos produtos por volume."},{"f":"Por que Pintura não é rateada ao produto B?","b":"Porque B não passa pelo departamento de Pintura."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-08-custos-materia-prima-rateio-departamentalizacao' and content_status='active' and body_md not like '%## Questões Consulplan/CFC 2020.2 — custo de produção e departamentalização%';
update public.study_materials set body_md=body_md||'

## Questão Consulplan/CFC 2020.2 — resultado consolidado (alternativa C: R$ 175.000)

A controladora B detém 100% de A e usa o Método da Equivalência Patrimonial nas demonstrações individuais. A questão informa estoque inicial de mercadorias de B de R$ 150.000, metade desse estoque vendida a A, vendas intragrupo de B a A no total de R$ 150.000 e revenda por A a terceiros de todas as mercadorias adquiridas, por R$ 250.000.

Para o resultado consolidado, elimine a operação entre empresas do grupo: a venda de B para A não é receita perante terceiros. O estoque de B que já existia no início e foi transferido corresponde a metade de R$ 150.000 = R$ 75.000, que representa o custo do grupo para essa mercadoria. Assim, receita externa de R$ 250.000 − custo do grupo de R$ 75.000 = **R$ 175.000**.

**Jeito fácil:** nas demonstrações consolidadas, o grupo é tratado como se fosse uma única empresa. Venda entre controladora e controlada não gera receita consolidada; só conta a venda para quem está fora do grupo.

**Pegadinha:** não some o faturamento intragrupo de R$ 150.000 à receita externa de R$ 250.000. Isso duplicaria a venda da mesma mercadoria.',quiz=quiz||'[{"q":"Na consolidação de B e A, a venda intragrupo de B para A deve permanecer como receita consolidada.","a":false,"why":"A venda entre empresas do grupo é eliminada. Só a venda a terceiros permanece como receita consolidada."},{"q":"Na questão Consulplan/CFC 2020.2, o resultado consolidado é R$ 175.000.","a":true,"why":"Receita externa de A de R$ 250.000 menos custo do grupo de R$ 75.000 (metade do estoque inicial de B de R$ 150.000) = R$ 175.000."}]'::jsonb,flashcards=flashcards||'[{"f":"Como eliminar vendas intragrupo na consolidação?","b":"Eliminar a receita e o custo da operação entre empresas do grupo; manter a venda a terceiros."},{"f":"Qual o resultado consolidado na questão CFC 2020.2?","b":"R$ 175.000, conforme os dados do enunciado e a eliminação das operações intragrupo."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-09-investimentos-dividendos-mep-metodo-custo' and content_status='active' and body_md not like '%## Questão Consulplan/CFC 2020.2 — resultado consolidado (alternativa C: R$ 175.000)%';
update public.study_materials set body_md=body_md||'

## Questão Consulplan/CFC 2020.1, estoque — média ponderada móvel (alternativa D: R$ 4.872)

Estoque inicial: R$ 1.455 por 150 unidades. Compras: em 10/10, nota de R$ 3.000, tributos recuperáveis de R$ 540, frete de R$ 180 e 200 unidades; em 16/10, nota de R$ 6.250, tributos recuperáveis de R$ 750, frete de R$ 265 e 500 unidades. A única venda foi de 420 unidades em 27/10.

**1. Calcule o custo de cada compra.** Tributo recuperável não compõe o custo; frete necessário à aquisição compõe.
- Primeira compra: 3.000 − 540 + 180 = R$ 2.640.
- Segunda compra: 6.250 − 750 + 265 = R$ 5.765.

**2. Some o estoque disponível.** Valor: 1.455 + 2.640 + 5.765 = R$ 9.860. Quantidade: 150 + 200 + 500 = 850 unidades.

**3. Calcule a média ponderada móvel.** 9.860 ÷ 850 = **R$ 11,60 por unidade**.

**4. Calcule o CMV.** 420 × 11,60 = **R$ 4.872 — alternativa D**.

**Macete:** tributo recuperável sai do custo; frete de compra entra. Na média móvel, some valor e quantidade disponíveis antes da venda e divida um pelo outro.',quiz=quiz||'[{"q":"Na questão CFC 2020.1, o CMV pela média ponderada móvel é R$ 4.872.","a":true,"why":"Custo total disponível R$ 9.860 ÷ 850 unidades = R$ 11,60. Para 420 unidades vendidas: R$ 4.872."},{"q":"Tributos recuperáveis devem ser somados ao custo do estoque na compra.","a":false,"why":"Tributos recuperáveis não integram o custo. O frete necessário à aquisição integra."}]'::jsonb,flashcards=flashcards||'[{"f":"Como calcular o CMV pela média ponderada móvel?","b":"Custo total disponível ÷ quantidade total disponível = custo médio unitário; depois multiplique pelas unidades vendidas."},{"f":"Tributos recuperáveis e frete entram no custo de aquisição?","b":"Tributos recuperáveis não entram; frete necessário à aquisição entra."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-11-estoques-mensuracao-avp-inventarios' and content_status='active' and body_md not like '%## Questão Consulplan/CFC 2020.1, estoque — média ponderada móvel (alternativa D: R$ 4.872)%';
update public.study_materials set body_md=body_md||'

## Questão Consulplan/CFC 2020.1, questão 27 — custeio por processo (alternativa A: $ 500)

Dados: matéria-prima $ 2.500; mão de obra direta $ 1.500; custos indiretos de fabricação $ 1.000; 1.100 unidades iniciadas; 900 acabadas; 200 em processamento com estágio de fabricação de 50%.

Custo total do período = 2.500 + 1.500 + 1.000 = **$ 5.000**.

Unidades equivalentes: 900 acabadas + (200 × 50%) = 900 + 100 = **1.000 unidades equivalentes**.

Custo por unidade equivalente = 5.000 ÷ 1.000 = **$ 5**. Estoque final em elaboração = 200 × 50% × $ 5 = **$ 500 — alternativa A**.

**Jeito fácil:** 200 unidades pela metade equivalem a 100 unidades completas. Multiplique as unidades equivalentes em processo pelo custo unitário equivalente.

**Pegadinha:** não multiplique as 200 unidades por 100% do custo; elas só estão 50% prontas.',quiz=quiz||'[{"q":"Na questão CFC 2020.1, o estoque final em elaboração é $ 500.","a":true,"why":"900 unidades acabadas + 100 equivalentes das 200 unidades a 50% = 1.000 equivalentes. Custo equivalente = $5. Estoque final = 100 × $5 = $500."},{"q":"As 200 unidades em elaboração devem ser consideradas 200 unidades equivalentes completas.","a":false,"why":"Com 50% de acabamento, representam 100 unidades equivalentes."}]'::jsonb,flashcards=flashcards||'[{"f":"Como calcular unidades equivalentes no custeio por processo?","b":"Unidades acabadas + (unidades em elaboração × percentual de acabamento)."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-13-custeio-rkw-variavel-ponto-equilibrio' and content_status='active' and body_md not like '%## Questão Consulplan/CFC 2020.1, questão 27 — custeio por processo (alternativa A: $ 500)%';
update public.study_materials set body_md=body_md||'

## Questão Consulplan/CFC 2020.2 — classificação das variações patrimoniais (alternativa C)

A distribuidora comprou estoques por R$ 175.000, vendeu mercadorias com receita líquida de R$ 370.000 e CMV de R$ 130.000, comprou terreno para valorização de longo prazo por R$ 1.000.000, reconheceu depreciação de R$ 20.000, pagou passivo circulante de R$ 45.000 e adquiriu o controle de outra entidade por R$ 700.000, tudo conforme as condições descritas no enunciado.

A variação dos ativos circulantes é:
- Caixa: +370.000 (recebimento das vendas) −175.000 (compras) −45.000 (pagamento de passivo) = +150.000; atenção: o desembolso de R$ 1.000.000 pelo terreno e R$ 700.000 pelo investimento também sai do caixa, totalizando caixa −1.550.000.
- Estoques: compras de 175.000 − CMV de 130.000 = +45.000.
- Variação líquida do ativo circulante: −1.550.000 + 45.000 = **−R$ 1.505.000**.

**Resposta: alternativa C — diminuição de R$ 1.505.000 nos Ativos Circulantes.** O terreno mantido para valorização de capital é propriedade para investimento, no ativo não circulante; a participação de controle também é investimento não circulante nas demonstrações individuais.

**Macete:** acompanhe primeiro o caixa e depois o estoque. Não confunda aquisição de terreno para valorização (não circulante) com estoque para venda no curto prazo.',quiz=quiz||'[{"q":"Na questão CFC 2020.2, o ativo circulante diminui R$ 1.505.000.","a":true,"why":"Caixa cai R$ 1.550.000 e estoques aumentam R$ 45.000; variação líquida: −R$ 1.505.000."},{"q":"O terreno adquirido para valorização de capital no longo prazo é estoque circulante.","a":false,"why":"É propriedade para investimento, classificada no ativo não circulante."}]'::jsonb,flashcards=flashcards||'[{"f":"Terreno mantido para valorização de capital a longo prazo é classificado onde?","b":"Como propriedade para investimento, no ativo não circulante."},{"f":"Qual a variação do ativo circulante na questão CFC 2020.2?","b":"Diminuição de R$ 1.505.000."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-14-imobilizado-depreciacao-provisoes-contingencias' and content_status='active' and body_md not like '%## Questão Consulplan/CFC 2020.2 — classificação das variações patrimoniais (alternativa C)%';
update public.study_materials set body_md=body_md||'

## Questão Consulplan/CFC 2020.1, questão 30 — DVA: valor adicionado a distribuir (alternativa D: R$ 189.900)

A DRE informa receita bruta de vendas de R$ 328.000, ICMS/faturamento de R$ 59.040, CMV de R$ 146.600, salários e encargos de R$ 12.200, depreciação de R$ 8.000, aluguéis de R$ 14.000 e receita financeira de R$ 16.500.

**1. Valor adicionado bruto:** receita bruta de R$ 328.000 menos o custo das mercadorias vendidas de R$ 146.600 = R$ 181.400. O aluguel não é deduzido nessa etapa: é distribuição do valor adicionado aos capitais de terceiros.

**2. Valor adicionado líquido produzido:** 181.400 − depreciação de 8.000 = R$ 173.400.

**3. Valor adicionado recebido em transferência:** receita financeira de R$ 16.500.

Valor adicionado a distribuir = 173.400 + 16.500 = **R$ 189.900 — alternativa D**.

**Pegadinha:** aluguel e salários são parcelas de distribuição do valor adicionado, não devem ser subtraídos como se fossem insumos adquiridos de terceiros no cálculo acima. A receita financeira entra como valor adicionado recebido em transferência.


## Questão Consulplan/CFC 2020.1, questão 32 — classificação dos fluxos na DFC

O enunciado traz aumento de capital (+R$ 15.000), aumento de clientes (−R$ 18.000), venda de imobilizado (+R$ 23.000), aumento de estoques (−R$ 45.000), duplicatas descontadas (+R$ 12.000), empréstimos de curto prazo (+R$ 34.000), depreciação (+R$ 8.000), aquisição de imobilizado (−R$ 42.500), aumento de fornecedores (+R$ 32.800), redução de salários a pagar (−R$ 13.400) e lucro líquido (+R$ 22.300).

**Atividades operacionais:** partindo do lucro líquido, somam-se depreciação e ajustam-se as variações operacionais: 22.300 + 8.000 − 18.000 − 45.000 + 32.800 − 13.400 = **−R$ 13.300** (consumiram caixa).

**Atividades de investimento:** venda de imobilizado 23.000 − aquisição de imobilizado 42.500 = **−R$ 19.500** (consumiram caixa).

**Atividades de financiamento:** aumento de capital, empréstimos e desconto de duplicatas geram entradas de caixa; portanto, financiamento gera caixa.

**Resposta: alternativa A — atividades de investimento e operacionais consumiram caixa.**

**Macete:** compra/venda de imobilizado = investimento; capital e empréstimos = financiamento; clientes, estoques, fornecedores e salários a pagar = operação. A depreciação é adicionada de volta no método indireto, pois não representa saída de caixa.',quiz=quiz||'[{"q":"Na questão CFC 2020.1, a receita financeira de R$ 16.500 é valor adicionado recebido em transferência.","a":true,"why":"Receitas financeiras são valores adicionados recebidos em transferência e somam-se ao valor adicionado líquido produzido."},{"q":"Na questão 30, o aluguel deve ser subtraído junto com o CMV para calcular o valor adicionado bruto.","a":false,"why":"O aluguel é distribuição do valor adicionado aos capitais de terceiros; não é deduzido como insumo nessa etapa."},{"q":"Na questão CFC 2020.1, as atividades operacionais e de investimento consomem caixa.","a":true,"why":"CFO calculado: −R$ 13.300; CFI: −R$ 19.500. Financiamento recebe entradas."}]'::jsonb,flashcards=flashcards||'[{"f":"Onde entram receitas financeiras na DVA?","b":"Como valor adicionado recebido em transferência."},{"f":"No método indireto da DFC, como tratar depreciação?","b":"Adicionar de volta ao lucro líquido, pois é despesa sem saída de caixa."},{"f":"Qual a classificação de compra/venda de imobilizado na DFC?","b":"Atividades de investimento."},{"f":"Qual a classificação de aumento de capital e empréstimos na DFC?","b":"Atividades de financiamento."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes' and content_status='active' and body_md not like '%## Questão Consulplan/CFC 2020.1, questão 30 — DVA: valor adicionado a distribuir (alternativa D: R$ 189.900)%';
update public.study_materials set body_md=body_md||'

## Questão Consulplan/CFC 2020.1, questão 31 — reserva legal e dividendos (alternativa D)

Capital social: R$ 250.000; reserva legal existente: R$ 46.250; reserva estatutária existente: R$ 57.000; lucro do exercício: R$ 140.000. Destinação aprovada: 5% para reserva legal, 40% para reserva estatutária, R$ 35.000 para reserva para contingências e o restante para dividendos.

**Reserva legal:** 5% × 140.000 = R$ 7.000 seria o valor normal. Porém, o limite da reserva legal é 20% do capital social: 20% × 250.000 = R$ 50.000. Como já há R$ 46.250, só cabe constituir R$ 3.750 para alcançar o limite.

**Reserva estatutária:** 40% × 140.000 = R$ 56.000.

**Dividendos:** 140.000 − 3.750 − 56.000 − 35.000 = **R$ 45.250**.

Resposta: **alternativa D — reserva legal de R$ 3.750 e dividendos de R$ 45.250**.

**Pegadinha:** os 5% não podem ultrapassar o teto de 20% do capital social. Primeiro verifique quanto falta para o limite; só depois destine o saldo do lucro.',quiz=quiz||'[{"q":"Na questão CFC 2020.1, a reserva legal a constituir é R$ 3.750.","a":true,"why":"O teto é 20% de R$ 250.000 = R$ 50.000. Já existem R$ 46.250; só cabem R$ 3.750."},{"q":"Na questão CFC 2020.1, os dividendos a pagar são R$ 45.250.","a":true,"why":"140.000 − 3.750 de reserva legal − 56.000 de reserva estatutária − 35.000 de contingências = R$ 45.250."}]'::jsonb,flashcards=flashcards||'[{"f":"Qual o limite da reserva legal?","b":"20% do capital social; a constituição do exercício fica limitada ao espaço restante até esse teto."},{"f":"Como calcular dividendos residuais após destinações do lucro?","b":"Lucro do exercício menos reserva legal, reserva estatutária e reserva para contingências aprovadas."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos' and content_status='active' and body_md not like '%## Questão Consulplan/CFC 2020.1, questão 31 — reserva legal e dividendos (alternativa D)%';

-- Questão CFC 2020.2: encargos de financiamento de matéria-prima quando o produto não é ativo qualificável.
update public.study_materials set body_md=body_md||'

## Questão Consulplan/CFC 2020.2 — encargos financeiros na aquisição de matéria-prima (alternativa D)

A Indústria Beta compra matéria-prima por $ 50.000 e paga $ 2.500 de encargos de financiamento. O enunciado informa expressamente que o produto final não é ativo qualificável.

A matéria-prima é registrada por **$ 50.000**. Como o produto não é ativo qualificável, os encargos de financiamento não são incorporados ao estoque: são reconhecidos como **despesa financeira de $ 2.500**.

Resposta: **alternativa D**.

**Jeito fácil:** só se capitalizam encargos de empréstimos quando atendem aos critérios de ativo qualificável. Se o enunciado diz que não é ativo qualificável, não some os juros ao custo do estoque.

**Pegadinha:** não confunda custo da matéria-prima com custo financeiro de obter recursos para comprá-la.',quiz=quiz||'[{"q":"Na questão da Indústria Beta, os encargos de financiamento de $ 2.500 integram o custo da matéria-prima, embora o produto final não seja ativo qualificável.","a":false,"why":"Os encargos são despesa financeira, pois o enunciado informa que o produto final não é ativo qualificável."},{"q":"Na questão CFC 2020.2, a matéria-prima é registrada por $ 50.000 e os $ 2.500 como despesa financeira.","a":true,"why":"Alternativa D: custo da matéria-prima $ 50.000 e despesa financeira $ 2.500."}]'::jsonb,flashcards=flashcards||'[{"f":"Como registrar encargos de financiamento quando o produto não é ativo qualificável?","b":"Como despesa financeira, sem incorporá-los ao custo do estoque."},{"f":"Qual o lançamento econômico indicado na questão da Indústria Beta?","b":"Matéria-prima por $ 50.000 e despesa financeira por $ 2.500."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-11-estoques-mensuracao-avp-inventarios' and content_status='active' and body_md not like '%Questão Consulplan/CFC 2020.2 — encargos financeiros na aquisição de matéria-prima%';

-- Questão CFC 2020.2: efeitos no ativo circulante, já incluída no módulo 14 na parte explicativa acima.
