-- PC-AC 2026: lote complementar de questões Consulplan/CFC 2020.1 e 2020.2, com foco em tópicos do edital.
update public.study_materials set body_md=body_md||'

## Questão CFC 2020.2 — dividendos em investimento avaliado pelo método de custo (alternativa B)

A investidora possui 12% da Cia. Juma. A investida apurou lucro de R$ 36.000 e aprovou distribuir 50% em dividendos. Total dos dividendos: 36.000 × 50% = R$ 18.000. Parcela da investidora: 18.000 × 12% = **R$ 2.160**.

No método de custo, o dividendo declarado é reconhecido como receita de dividendos, com débito em Dividendos a Receber e crédito em Receita de Dividendos. Não se reduz o valor do investimento nessa situação.

**Resposta: alternativa B.**

**Macete:** método de custo → dividendo declarado é receita. Equivalência patrimonial → a investidora reconhece sua parcela do lucro quando a investida apura o resultado; dividendos posteriores reduzem o investimento.',quiz=quiz||'[{"q":"Na questão CFC 2020.2, o dividendo da investidora pelo método de custo é R$ 2.160.","a":true,"why":"36.000 × 50% × 12% = R$ 2.160; reconhece-se receita de dividendos."}]'::jsonb,flashcards=flashcards||'[{"f":"Como calcular o dividendo no método de custo?","b":"Lucro da investida × percentual distribuído × participação da investidora; o dividendo declarado é receita."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-09-investimentos-dividendos-mep-metodo-custo' and content_status='active' and body_md not like '%## Questão CFC 2020.2 — dividendos pelo método de custo%';
update public.study_materials set body_md=body_md||'

## Questão CFC 2020.1 — ágio por rentabilidade futura (goodwill) na aquisição de controle (alternativa D)

A Alfa compra 80% da Beta por R$ 300.000. Na data da aquisição, o valor justo do ativo da Beta é R$ 560.000 e o passivo é R$ 200.000. Ativos líquidos a valor justo = 560.000 − 200.000 = R$ 360.000. Parcela adquirida (80%) = 360.000 × 80% = R$ 288.000.

Goodwill = contraprestação transferida − parcela adquirida dos ativos líquidos a valor justo = 300.000 − 288.000 = **R$ 12.000**.

**Resposta: alternativa D — ágio por rentabilidade futura (goodwill) de R$ 12.000.**

**Pegadinha:** não compare R$ 300.000 com os ativos líquidos integrais de R$ 360.000; compare com a participação adquirida de 80%.',quiz=quiz||'[{"q":"Na aquisição de 80% da Beta por R$ 300.000, com ativos líquidos a valor justo de R$ 360.000, o goodwill é R$ 12.000.","a":true,"why":"80% de 360.000 = 288.000; 300.000 − 288.000 = 12.000."}]'::jsonb,flashcards=flashcards||'[{"f":"Como calcular goodwill quando há aquisição de controle?","b":"Contraprestação transferida menos a participação adquirida nos ativos líquidos identificáveis a valor justo."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-10-impairment-goodwill-reducao-valor-recuperavel' and content_status='active' and body_md not like '%## Questão CFC 2020.1 — goodwill na aquisição de controle%';
update public.study_materials set body_md=body_md||'

## Questão CFC 2020.1 — custo de mercadorias para revenda (alternativa C: R$ 594.500)

Compra para revenda: R$ 650.000, com ICMS de 17%. O ICMS recuperável é 650.000 × 17% = R$ 110.500. O custo líquido da mercadoria é R$ 539.500. Somam-se seguro do estoque de R$ 25.000 e frete de R$ 30.000: custo do estoque = 539.500 + 25.000 + 30.000 = **R$ 594.500**.

Os juros do empréstimo de R$ 40.000 não integram o custo do estoque, pois o enunciado não descreve ativo qualificável; são encargos financeiros.

**Resposta: alternativa C.**

**Macete:** tributo recuperável sai do custo; frete e seguro necessários para trazer o estoque à condição/localização atuais entram; juros de financiamento não são automaticamente custo de estoque.',quiz=quiz||'[{"q":"Na questão CFC 2020.1, o custo final do estoque para revenda é R$ 594.500.","a":true,"why":"650.000 − ICMS recuperável de 110.500 + seguro de 25.000 + frete de 30.000 = 594.500."},{"q":"Os juros de financiamento de R$ 40.000 integram o custo das mercadorias para revenda mesmo sem ativo qualificável.","a":false,"why":"Não são incorporados ao estoque neste enunciado; são encargos financeiros."}]'::jsonb,flashcards=flashcards||'[{"f":"O que compõe o custo do estoque na questão CFC 2020.1?","b":"Compra líquida de ICMS recuperável + seguro do estoque + frete; encargos financeiros ficam fora."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-11-estoques-mensuracao-avp-inventarios' and content_status='active' and body_md not like '%## Questão CFC 2020.1 — custo do estoque e financiamento%';
update public.study_materials set body_md=body_md||'

## Questão CFC 2020.2 — ponto de equilíbrio contábil (alternativa D)

Preço de venda unitário: R$ 600. Custo variável total de R$ 500.000 para 2.500 unidades: custo variável unitário = 500.000 ÷ 2.500 = R$ 200. Margem de contribuição unitária = 600 − 200 = R$ 400.

Ponto de equilíbrio contábil em unidades = custos fixos ÷ margem de contribuição unitária = 800.000 ÷ 400 = **2.000 unidades**. Receita correspondente = 2.000 × 600 = **R$ 1.200.000**.

**Resposta: alternativa D.**

**Jeito fácil:** primeiro ache o custo variável por unidade; depois subtraia do preço para obter a margem de contribuição. Divida os custos fixos por essa margem.

## Questão CFC 2020.2 — custeio variável: resultado operacional (R$ 596.000)

Foram produzidas 10.000 unidades e vendidas 80%: 8.000 unidades. Receita: 8.000 × R$ 200 = R$ 1.600.000.

Custos variáveis de fabricação por unidade: matéria-prima 10 + mão de obra 8 + CIF variável 15 = R$ 33. Para 8.000 unidades vendidas: R$ 264.000. Despesas variáveis de venda: 8.000 × R$ 5 = R$ 40.000.

Margem de contribuição = 1.600.000 − 264.000 − 40.000 = R$ 1.296.000. Resultado operacional = 1.296.000 − custos e despesas fixas de 700.000 = **R$ 596.000**.

**Macete:** no custeio variável, só os custos variáveis de fabricação vão para o custo do produto; os fixos do período são deduzidos integralmente no resultado. Despesa variável de venda acompanha as unidades vendidas.',quiz=quiz||'[{"q":"Na questão CFC 2020.2, o ponto de equilíbrio é 2.000 unidades e R$ 1.200.000 de receita.","a":true,"why":"Custo variável unitário 200; margem de contribuição 400; 800.000 ÷ 400 = 2.000 unidades; receita = 1.200.000."},{"q":"No custeio variável da questão CFC 2020.2, o resultado operacional é R$ 596.000.","a":true,"why":"Receita 1.600.000 − custos variáveis de fabricação 264.000 − despesas variáveis 40.000 − fixos 700.000 = 596.000."}]'::jsonb,flashcards=flashcards||'[{"f":"Como calcular ponto de equilíbrio em unidades?","b":"Custos fixos ÷ margem de contribuição unitária."},{"f":"Qual a fórmula da margem de contribuição unitária?","b":"Preço de venda unitário − custo variável unitário."},{"f":"No custeio variável, como calcular resultado operacional?","b":"Receita − custos variáveis dos produtos vendidos − despesas variáveis − custos e despesas fixas."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-13-custeio-rkw-variavel-ponto-equilibrio' and content_status='active' and body_md not like '%## Questão CFC 2020.2 — ponto de equilíbrio e custeio variável%';
update public.study_materials set body_md=body_md||'

## Questão CFC 2020.2 — depreciação de máquina (alternativa B: R$ 57.375)

Custo da máquina: R$ 900.000. Valor residual: 15% × 900.000 = R$ 135.000. Valor depreciável = 900.000 − 135.000 = R$ 765.000.

Vida útil: 10 anos. Depreciação anual = 765.000 ÷ 10 = R$ 76.500. Como ficou disponível para uso em 10/04/2019, a questão considera nove meses de depreciação até 31/12/2019: 76.500 × 9/12 = **R$ 57.375**.

**Resposta: alternativa B.**

**Pegadinha:** a base de cálculo não é o custo integral; primeiro subtraia o valor residual. Depois aplique a fração de tempo de uso.',quiz=quiz||'[{"q":"Na questão CFC 2020.2, a depreciação de 2019 da máquina é R$ 57.375.","a":true,"why":"(900.000 − 135.000) ÷ 10 × 9/12 = 57.375."}]'::jsonb,flashcards=flashcards||'[{"f":"Qual a base depreciável?","b":"Custo do ativo menos valor residual."},{"f":"Como calcular depreciação proporcional no primeiro ano?","b":"(Custo − valor residual) ÷ vida útil × fração do ano em uso."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-14-imobilizado-depreciacao-provisoes-contingencias' and content_status='active' and body_md not like '%## Questão CFC 2020.2 — depreciação da máquina%';
update public.study_materials set body_md=body_md||'

## Questão CFC 2020.2 — regime de competência e resultado financeiro (alternativa C: R$ 37.250)

Considere apenas juros relativos a dezembro de 2019, independentemente de terem sido pagos/recebidos:
- Juros passivos de dezembro: 18.750 pagos + 24.000 não pagos = R$ 42.750 de despesa financeira.
- Juros ativos de dezembro: 50.000 recebidos + 30.000 não recebidos = R$ 80.000 de receita financeira.

Resultado financeiro líquido = 80.000 − 42.750 = **R$ 37.250 positivo**.

Os juros relativos a janeiro de 2020 ficam fora da DRE de 2019, mesmo que tenham sido pagos ou recebidos em 2019.

**Resposta: alternativa C.**

**Macete:** competência olha quando a receita/despesa foi gerada, não quando o dinheiro entrou ou saiu.

## Questão CFC 2020.2 — resultado bruto após devolução de vendas (alternativa B: R$ 14.000)

Venda a prazo: R$ 100.000; custo: R$ 60.000; ICMS: 20%. Devolução de 30%: receita devolvida R$ 30.000 e custo correspondente devolvido R$ 18.000.

Receita líquida após ICMS e devolução: 100.000 − 30.000 − 20.000 + 6.000 = R$ 56.000. CMV líquido: 60.000 − 18.000 = R$ 42.000. Resultado bruto = 56.000 − 42.000 = **R$ 14.000**.

**Resposta: alternativa B.**

**Pegadinha:** ao devolver 30% das vendas, reduza também o CMV na mesma proporção e reverta o ICMS correspondente.',quiz=quiz||'[{"q":"Na questão CFC 2020.2, o resultado financeiro líquido por competência em 2019 é positivo em R$ 37.250.","a":true,"why":"Receitas financeiras de dezembro: 80.000; despesas financeiras de dezembro: 42.750; saldo positivo de 37.250."},{"q":"Juros relativos a janeiro de 2020 devem entrar na DRE de 2019 se foram pagos/recebidos em 2019.","a":false,"why":"Pelo regime de competência, ficam no período de janeiro de 2020."},{"q":"Na questão CFC 2020.2, o resultado bruto após a devolução de 30% é R$ 14.000.","a":true,"why":"Receita líquida após ICMS e devolução 56.000; CMV líquido 42.000; resultado bruto 14.000."}]'::jsonb,flashcards=flashcards||'[{"f":"O que o regime de competência considera?","b":"O período em que a receita ou despesa é gerada, não a data de recebimento ou pagamento."},{"f":"Como calcular o resultado financeiro líquido?","b":"Receitas financeiras do período menos despesas financeiras do período."},{"f":"Como calcular resultado bruto após devolução de vendas?","b":"Receita líquida após ICMS e devoluções menos CMV líquido das mercadorias devolvidas."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes' and content_status='active' and body_md not like '%## Questão CFC 2020.2 — competência e resultado bruto%';
update public.study_materials set body_md=body_md||'

## Questão CFC 2020.1 — origens e aplicações de recursos: classificação de contas (alternativa A)

A questão pede separar contas com natureza credora (origens) e contas com natureza devedora (aplicações), conforme a classificação apresentada no exercício.

**Origens (credoras):** 1 Duplicatas Descontadas; 5 Exaustão Acumulada; 7 Adiantamento de Clientes; 9 Provisão para 13º Salário; 11 Reserva de Incentivos Fiscais; 12 Capital Subscrito; 13 Empréstimos e Financiamentos; 15 Debêntures e Outros Títulos de Dívida.

**Aplicações (devedoras):** 2 Terrenos em Uso; 3 Adiantamentos a Empregados; 4 Adiantamento a Fornecedores; 6 Impostos a Recuperar; 8 Encargos Financeiros a Transcorrer; 10 Gastos com Emissão de Títulos; 14 Ações em Tesouraria.

**Resposta: alternativa A.**

**Macete:** passivos e patrimônio líquido credores tendem a ser origens; ativos e contas redutoras/devedoras tendem a ser aplicações. Cuidado com contas retificadoras: observe a natureza do saldo, não apenas o nome.

## Questão CFC 2020.2 — total do passivo exigível (alternativa A: R$ 7.875)

Some apenas as contas credoras que representam obrigações, excluindo capital subscrito (patrimônio líquido). Contas exigíveis: provisões para contratos onerosos 1.912,50; juros sobre capital próprio a pagar 562,50; ISS retido a recolher 2.475; impostos a pagar 787,50; fornecedores 337,50; empréstimos a pagar 562,50; dividendos a pagar 900; adiantamento de clientes 337,50.

Total = 1.912,50 + 562,50 + 2.475 + 787,50 + 337,50 + 562,50 + 900 + 337,50 = **R$ 7.875**.

**Resposta: alternativa A.** Capital subscrito é patrimônio líquido, não passivo exigível.

## Questão CFC 2020.2 — constituição da reserva legal (alternativa A: R$ 2.880)

Lucro líquido do exercício: R$ 57.600. A reserva legal corresponde a 5% do lucro: 57.600 × 5% = **R$ 2.880**.

Verifique o teto: 20% do capital social de R$ 70.400 = R$ 14.080. Já existe reserva legal de R$ 6.400; o espaço disponível é R$ 7.680. Como R$ 2.880 cabe nesse limite, a constituição integral é possível.

**Resposta: alternativa A.**

**Pegadinha:** a existência de reserva legal anterior não significa que a constituição do exercício seja zero. Compare o valor de 5% do lucro com o espaço restante até o limite de 20% do capital.',quiz=quiz||'[{"q":"Na questão CFC 2020.1, a alternativa A classifica como origens as contas 1, 5, 7, 9, 11, 12, 13 e 15.","a":true,"why":"São as contas credoras/obrigações e patrimônio líquido listadas no enunciado; as devedoras são aplicações."},{"q":"Na questão CFC 2020.2, o passivo exigível é R$ 7.875.","a":true,"why":"Soma das obrigações credoras; capital subscrito não entra porque pertence ao patrimônio líquido."},{"q":"Na questão CFC 2020.2, a reserva legal a constituir é R$ 2.880.","a":true,"why":"5% de R$ 57.600 = R$ 2.880, abaixo do espaço restante até o limite de 20% do capital."}]'::jsonb,flashcards=flashcards||'[{"f":"O que entra no passivo exigível?","b":"Obrigações com terceiros; contas do patrimônio líquido, como capital subscrito, ficam fora."},{"f":"Como calcular a reserva legal do exercício?","b":"5% do lucro líquido, limitada ao espaço restante até 20% do capital social."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos' and content_status='active' and body_md not like '%## Questão CFC 2020.1 — origens e aplicações; passivo exigível; reserva legal%';
update public.study_materials set body_md=body_md||'

## Questão CFC 2020.2 — balanço patrimonial após fatos contábeis (alternativa D)

A empresa iniciou com capital em dinheiro de R$ 10.000; comprou móveis à vista por R$ 1.700; comprou mercadorias por R$ 6.000 (R$ 4.500 à vista e R$ 1.500 a prazo); vendeu a prazo R$ 500 de mercadorias cujo custo foi R$ 300; comprou veículo por R$ 700 com pagamento em 05/05/2021; e pagou 70% da dívida da compra de mercadorias.

**Patrimônio líquido:** capital de R$ 10.000 + lucro da venda (500 − 300) = **R$ 10.200**.

**Passivo circulante:** saldo de fornecedor de mercadorias: 30% × 1.500 = R$ 450. A obrigação do veículo de R$ 700 vence em maio de 2021, dentro de 12 meses, então também é circulante. Total = **R$ 1.150**.

**Ativo total:** caixa 10.000 − 1.700 − 4.500 − 1.050 = R$ 2.750; móveis R$ 1.700; estoque final 6.000 − 300 = R$ 5.700; clientes R$ 500; veículo R$ 700. Total = **R$ 11.350**.

**Resposta: alternativa D — PL R$ 10.200; Ativo Total R$ 11.350; Passivo Circulante R$ 1.150.**

**Macete:** em compra a prazo, o bem entra no ativo e a obrigação no passivo; venda a prazo gera clientes; custo da mercadoria vendida reduz estoque e resultado. Classifique vencimento em até 12 meses como circulante.',quiz=quiz||'[{"q":"Na questão CFC 2020.2, o PL é R$ 10.200, o ativo total R$ 11.350 e o passivo circulante R$ 1.150.","a":true,"why":"PL = capital 10.000 + lucro 200; ativo total soma caixa, móveis, estoque, clientes e veículo; passivo circulante soma fornecedores 450 e veículo 700."}]'::jsonb,flashcards=flashcards||'[{"f":"Como apurar o lucro da venda de mercadorias?","b":"Receita de venda menos custo das mercadorias vendidas."},{"f":"Quando uma obrigação é circulante?","b":"Quando se espera liquidá-la no ciclo operacional normal ou em até 12 meses, conforme o critério aplicável."}]'::jsonb,updated_at=now() where slug='pcac-2026-contabilidade-16-patrimonio-liquido-reservas-dividendos' and content_status='active' and body_md not like '%## Questão CFC 2020.2 — fatos contábeis e equação patrimonial%';