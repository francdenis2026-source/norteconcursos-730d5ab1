-- PC-AC 2026: módulos 11 a 15 de Contabilidade Geral, baseados nos arquivos didáticos enviados.
insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,source_note,content_status,flashcards,quiz,updated_at) values ('pcac-2026-contabilidade-11-estoques-mensuracao-avp-inventarios','Contabilidade Geral','11. Estoques, critérios de mensuração, inventários e ajuste a valor presente',11,'Estoques: mensuração, inventários e ajuste a valor presente','Custo de aquisição, valor realizável líquido, descontos, frete, perdas, PEPS, UEPS, média e AVP.','# Aula 11 — Estoques, mensuração e ajuste a valor presente

## 1. Mensuração dos estoques

O resumo enviado apresenta a avaliação inicial dos estoques pelo custo histórico e, na mensuração subsequente, pelo **custo ou valor realizável líquido, dos dois o menor**.

O custo do estoque inclui os custos de aquisição e transformação e outros gastos necessários para trazer o estoque à sua condição e localização atuais.

## 2. O que entra no custo

Segundo o material:
- preço de compra;
- impostos de importação e tributos não recuperáveis;
- frete sobre compras;
- seguro, manuseio e custos diretamente atribuíveis.

O resumo lista como itens que não integram o custo: tributos recuperáveis, descontos comerciais e abatimentos.

**Desconto comercial/incondicional:** negociado no momento da compra, sem condição; é deduzido do preço de aquisição.

**Desconto financeiro:** concedido para antecipar o pagamento; o material o apresenta como receita financeira para o comprador, sem afetar o custo do estoque.

Frete sobre compra é custo; frete sobre venda é despesa.

## 3. Perdas e armazenagem

O material diferencia perdas normais, tratadas como custo, e perdas anormais, tratadas como despesa. Também chama atenção para a análise dos gastos de armazenagem, conforme sua natureza e relação com o estoque.

## 4. Inventário periódico e permanente

- **Inventário periódico:** o estoque é apurado na data do balanço por inventário físico; não há baixa operação por operação.
- **Inventário permanente:** o controle é contínuo, com baixa a cada venda. O material cita PEPS, UEPS, média, custo específico e método do varejo.

O resumo compara os efeitos:
- PEPS: CMV menor, estoque final maior e lucro maior, conforme o quadro didático.
- UEPS: CMV maior, estoque final menor e lucro menor; o material informa que é proibido.
- Média: resultado intermediário no quadro apresentado.

## 5. Ajuste a valor presente (AVP)

O resumo informa que ativos e passivos não circulantes são ajustados a valor presente; para itens circulantes, o ajuste é indicado quando houver efeito relevante.

A questão Consulplan/CFC 2020.2 apresenta uma compra a prazo de R$ 60.000, em três parcelas anuais de R$ 20.000, com taxa composta de 15% ao ano. O AVP representa a diferença entre o valor nominal e o valor presente dos pagamentos.

Para calcular cada parcela, desconta-se o valor futuro pela taxa e pelo prazo correspondente. O valor presente é a soma dos valores descontados; o ajuste é a diferença para o total nominal.

## 6. Exemplo resolvido — AVP

Com base na questão: parcelas de R$ 20.000 nos finais de cada um dos três anos e taxa de 15% ao ano.

- 1ª parcela: 20.000 ÷ 1,15 = aproximadamente R$ 17.391,30.
- 2ª parcela: 20.000 ÷ 1,15² = aproximadamente R$ 15.122,87.
- 3ª parcela: 20.000 ÷ 1,15³ = aproximadamente R$ 13.150,32.

Valor presente aproximado: R$ 45.664,49. Ajuste aproximado: R$ 14.335,51. A alternativa do material que corresponde aos valores arredondados é **B — R$ 14.335,50 / R$ 45.664,50**.

## Pegadinhas
- Custo ou valor realizável líquido: use o menor.
- Frete de compra e frete de venda têm tratamentos diferentes no resumo.
- Desconto comercial reduz o custo; desconto financeiro não reduz o custo do estoque.
- Não confunda inventário periódico com permanente.
- No AVP, some as parcelas depois de descontar cada uma pelo seu prazo.

## Treino autoral
1. No custo de aquisição do estoque, o frete sobre compra e os tributos não recuperáveis podem ser incluídos. **Certo ou errado?**
2. No inventário permanente, a empresa controla continuamente o estoque e registra a baixa nas vendas. **Certo ou errado?**
3. Em três parcelas anuais iguais, a parcela do terceiro ano é descontada por três períodos. **Certo ou errado?**

**Gabarito comentado:** 1. Certo, conforme a lista do resumo. 2. Certo, definição do material. 3. Certo, cada parcela deve ser trazida a valor presente pelo prazo até seu vencimento.','PC-AC 2026','“Resumo - Contabilidade Geral.pdf”, itens 87–94 e 151–154, páginas 17–19 e 26; “Revisão de Véspera - Alunos.pdf”, questões Consulplan/CFC 2020.2, páginas 10 e 19.','active','[{"f":"Qual é a base de mensuração subsequente dos estoques apresentada no resumo?","b":"Custo ou valor realizável líquido, dos dois o menor."},{"f":"Frete sobre compra integra o custo do estoque?","b":"Sim, conforme o resumo enviado."},{"f":"Como o material trata o frete sobre venda?","b":"Como despesa."},{"f":"Qual a diferença entre inventário periódico e permanente?","b":"Periódico: apuração física na data do balanço. Permanente: controle contínuo e baixa a cada venda."},{"f":"Como calcular o AVP de uma parcela futura?","b":"Dividir o valor futuro por (1 + taxa) elevado ao número de períodos."}]'::jsonb,'[{"q":"O estoque deve ser mensurado subsequentemente pelo maior entre custo e valor realizável líquido.","a":false,"why":"O resumo indica o menor dos dois."},{"q":"Frete sobre compra é apresentado no material como custo do estoque.","a":true,"why":"O resumo inclui frete sobre compra entre os custos de aquisição."},{"q":"Desconto comercial incondicional é deduzido do preço de aquisição.","a":true,"why":"É negociado no momento da compra e reduz o custo."},{"q":"O inventário periódico registra baixa operação por operação.","a":false,"why":"Essa característica é do inventário permanente."},{"q":"No AVP da questão, o valor presente aproximado das três parcelas é R$ 45.664,50.","a":true,"why":"O material indica R$ 45.664,50 e AVP de R$ 14.335,50."}]'::jsonb,now()) on conflict (slug) do update set topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();

insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,source_note,content_status,flashcards,quiz,updated_at) values ('pcac-2026-contabilidade-12-moeda-estrangeira-cpc02-moeda-funcional','Contabilidade Geral','12. Operações em moeda estrangeira e CPC 02',12,'Moeda estrangeira, variação cambial e moeda funcional','Taxas de câmbio, variação cambial e definição de moeda funcional, com base nas questões do CFC 2020.2.','# Aula 12 — Operações em moeda estrangeira e CPC 02

## 1. Conversão de ativos e passivos

A questão Consulplan/CFC 2020.2 pergunta qual taxa deve ser utilizada para converter ativos e passivos celebrados em moeda estrangeira na data do balanço. A alternativa indicada pelo conteúdo do CPC 02 cobrado no exercício é a taxa de câmbio da data de fechamento do respectivo balanço.

Não confunda essa taxa com a taxa da data de ocorrência da transação, que é uma das alternativas apresentadas na questão.

## 2. Variação cambial

O material define variação cambial como a diferença resultante da conversão de um número específico de unidades de uma moeda para outra moeda, a diferentes taxas cambiais.

Em linguagem simples: quando o valor expresso em moeda estrangeira é convertido usando taxas diferentes, surge uma diferença cambial.

## 3. Moeda funcional

A questão da empresa agrícola que exporta sua produção para clientes na China cobra o conceito de moeda funcional.

**Moeda funcional é a moeda do ambiente econômico principal no qual a entidade opera.**

Não é necessariamente a moeda do país onde está o maior cliente, nem a taxa de câmbio utilizada para liquidar uma operação.

## 4. Como resolver as três questões do material

- Conversão de ativos e passivos na data do balanço: identifique a taxa de fechamento.
- Diferença decorrente de conversão a taxas distintas: variação cambial.
- Moeda do ambiente econômico principal da entidade: moeda funcional.

## Pegadinhas
- Taxa de fechamento não é a mesma coisa que taxa da data da transação.
- Variação cambial é uma diferença decorrente da conversão por taxas diferentes.
- Moeda funcional está ligada ao ambiente econômico principal da entidade.

## Treino autoral
1. Na questão do material, para converter ativos e passivos em moeda estrangeira na data do balanço, a taxa indicada é a de fechamento. **Certo ou errado?**
2. A variação cambial é a diferença resultante da conversão a diferentes taxas. **Certo ou errado?**
3. Moeda funcional corresponde à moeda do ambiente econômico principal no qual a entidade opera. **Certo ou errado?**

**Gabarito comentado:** as três afirmações estão corretas e reproduzem os conceitos cobrados nas questões enviadas.','PC-AC 2026','“Prova 2020.2 Resolvida - Parte 02.pdf”, questões Consulplan/Exame CFC 2020.2, páginas 8–10.','active','[{"f":"Qual taxa é indicada na questão para converter ativos e passivos na data do balanço?","b":"Taxa de câmbio da data de fechamento do balanço."},{"f":"O que é variação cambial?","b":"Diferença resultante da conversão de unidades monetárias a diferentes taxas de câmbio."},{"f":"O que é moeda funcional?","b":"Moeda do ambiente econômico principal no qual a entidade opera."},{"f":"Moeda funcional é necessariamente a moeda do país do maior cliente?","b":"Não. O conceito é ligado ao ambiente econômico principal da entidade."},{"f":"Qual é a fonte das questões desta aula?","b":"Prova resolvida Consulplan/Exame CFC 2020.2, páginas 8 a 10."}]'::jsonb,'[{"q":"A taxa para conversão de ativos e passivos na data do balanço, segundo a questão enviada, é a taxa de fechamento.","a":true,"why":"É a alternativa indicada no exercício sobre CPC 02."},{"q":"Variação cambial é uma diferença resultante da conversão a diferentes taxas.","a":true,"why":"Essa é a definição cobrada na questão."},{"q":"Moeda funcional é a moeda do ambiente econômico principal da entidade.","a":true,"why":"Definição apresentada na questão sobre a empresa exportadora."},{"q":"A taxa média do exercício foi a alternativa indicada para converter ativos e passivos na data do balanço.","a":false,"why":"A questão aponta a taxa de fechamento."},{"q":"Moeda funcional é a taxa de câmbio utilizada para liquidação imediata de operações.","a":false,"why":"Essa definição não corresponde à moeda funcional."}]'::jsonb,now()) on conflict (slug) do update set topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();

insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,source_note,content_status,flashcards,quiz,updated_at) values ('pcac-2026-contabilidade-13-custeio-rkw-variavel-ponto-equilibrio','Contabilidade Geral','13. Custeio pleno (RKW), custeio variável e ponto de equilíbrio',13,'Sistemas de custeio e ponto de equilíbrio','Cálculo de custo pleno unitário, margem de contribuição e ponto de equilíbrio contábil com questões do material enviado.','# Aula 13 — Sistemas de custeio e ponto de equilíbrio

## 1. Custeio pleno ou RKW

A questão do material apresenta uma indústria com:
- materiais diretos: R$ 10.000;
- mão de obra: R$ 15.000;
- custos indiretos de produção: R$ 25.000;
- despesas: R$ 30.000;
- produção: 500 unidades.

No custeio pleno (RKW), a questão inclui os gastos totais apresentados, inclusive despesas, no cálculo do custo pleno.

Cálculo:
10.000 + 15.000 + 25.000 + 30.000 = R$ 80.000.

Custo pleno unitário:
80.000 ÷ 500 = **R$ 160,00 por unidade**.

## 2. Custeio direto ou variável

A questão 16 do material informa produção de 10.000 unidades, venda de 80% ao preço unitário de R$ 200, custos e despesas fixas de R$ 700.000 e custos/despesas variáveis por unidade:
- materiais diretos: R$ 10;
- mão de obra direta: R$ 8;
- despesas variáveis de venda: R$ 5;
- custos indiretos variáveis: R$ 15.

No custeio variável, separam-se os valores variáveis dos fixos. A margem de contribuição é a receita de venda menos os custos e despesas variáveis associados às unidades vendidas.

Unidades vendidas: 10.000 × 80% = 8.000.
Receita: 8.000 × R$ 200 = R$ 1.600.000.
Variável unitário: 10 + 8 + 5 + 15 = R$ 38.
Variáveis das unidades vendidas: 8.000 × 38 = R$ 304.000.
Margem de contribuição: 1.600.000 − 304.000 = R$ 1.296.000.
Resultado operacional: 1.296.000 − 700.000 = **R$ 596.000**.

## 3. Ponto de equilíbrio contábil

A questão do material informa:
- preço de venda unitário: R$ 600;
- custo variável total: R$ 500.000 para 2.500 unidades;
- custos fixos totais: R$ 800.000.

Custo variável unitário:
500.000 ÷ 2.500 = R$ 200.

Margem de contribuição unitária:
600 − 200 = R$ 400.

Ponto de equilíbrio em unidades:
800.000 ÷ 400 = **2.000 unidades**.

Receita no ponto de equilíbrio:
2.000 × 600 = **R$ 1.200.000**.

## 4. Como diferenciar as questões

- RKW: observe que o enunciado menciona custeio pleno e soma também as despesas apresentadas.
- Custeio variável: separe valores variáveis por unidade dos valores fixos.
- Ponto de equilíbrio: divida os custos fixos pela margem de contribuição unitária.

## Pegadinhas
- Não confunda custo pleno com custo de fabricação isolado.
- No custeio variável, as despesas variáveis de venda entram no cálculo da margem de contribuição.
- O ponto de equilíbrio é atingido quando a margem de contribuição total cobre os custos fixos.
- Não use produção total como unidades vendidas quando o enunciado informa percentual vendido.

## Treino autoral
1. No exemplo RKW, o custo pleno unitário é R$ 160. **Certo ou errado?**
2. Se 8.000 unidades são vendidas a R$ 200 e os gastos variáveis por unidade somam R$ 38, a margem de contribuição total é R$ 1.296.000. **Certo ou errado?**
3. Com custos fixos de R$ 800.000 e margem de contribuição unitária de R$ 400, o ponto de equilíbrio é 2.000 unidades. **Certo ou errado?**

**Gabarito comentado:** 1. Certo: 80.000 ÷ 500. 2. Certo: 1.600.000 − 304.000. 3. Certo: 800.000 ÷ 400.','PC-AC 2026','“Prova 2020.2 Resolvida - Parte 02.pdf”, questões Consulplan/CFC 2020.2, páginas 12 e 18; “Revisão de Véspera - Alunos.pdf”, questões 7 e 16, páginas 9 e 19.','active','[{"f":"No exemplo RKW, qual o custo total considerado?","b":"R$ 80.000, incluindo materiais, mão de obra, custos indiretos e despesas."},{"f":"Qual o custo pleno unitário do exemplo de 500 unidades?","b":"R$ 160,00."},{"f":"Como calcular margem de contribuição unitária?","b":"Preço de venda unitário menos custos e despesas variáveis unitários."},{"f":"Como calcular o ponto de equilíbrio em unidades?","b":"Custos fixos totais divididos pela margem de contribuição unitária."},{"f":"Qual o ponto de equilíbrio do exemplo do material?","b":"2.000 unidades, correspondentes a R$ 1.200.000 em receita."}]'::jsonb,'[{"q":"No exemplo RKW, o custo pleno total é R$ 80.000.","a":true,"why":"10.000 + 15.000 + 25.000 + 30.000 = R$ 80.000."},{"q":"O custo pleno unitário do exemplo é R$ 100.","a":false,"why":"R$ 80.000 divididos por 500 unidades resultam em R$ 160."},{"q":"No custeio variável do exemplo, 80% de 10.000 unidades correspondem a 8.000 unidades vendidas.","a":true,"why":"10.000 × 0,80 = 8.000."},{"q":"A margem de contribuição unitária do exemplo de ponto de equilíbrio é R$ 400.","a":true,"why":"Preço de R$ 600 menos custo variável unitário de R$ 200."},{"q":"Com custos fixos de R$ 800.000 e margem unitária de R$ 400, o ponto de equilíbrio é 1.500 unidades.","a":false,"why":"800.000 ÷ 400 = 2.000 unidades."}]'::jsonb,now()) on conflict (slug) do update set topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();

insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,source_note,content_status,flashcards,quiz,updated_at) values ('pcac-2026-contabilidade-14-imobilizado-depreciacao-provisoes-contingencias','Contabilidade Geral','14. Ativo imobilizado, depreciação, provisões e passivos contingentes',14,'Imobilizado, depreciação, provisões e contingências','Custo do imobilizado, depreciação linear, revisão de vida útil, provisões e tratamento de perdas prováveis, possíveis e remotas.','# Aula 14 — Imobilizado, depreciação e provisões

## 1. Reconhecimento do imobilizado

O resumo apresenta o imobilizado como bens corpóreos destinados à manutenção das atividades da companhia. O reconhecimento inicial é feito pelo custo, incluindo os gastos necessários para colocar o ativo em condições de uso.

O material lista como componentes do custo: preço de aquisição, impostos não recuperáveis, preparação do local, frete e manuseio por conta do comprador, instalação, montagem, testes, honorários profissionais e custos diretamente atribuíveis.

O resumo lista como itens que não integram o custo: descontos comerciais e abatimentos, propaganda, treinamento, custos administrativos e outros custos indiretos não atribuíveis.

## 2. Gastos posteriores

O material diferencia:
- gastos de capital: beneficiam mais de um exercício e, se atenderem às condições de reconhecimento, são adicionados ao ativo;
- gastos do período: manutenção e reparos que apenas mantêm o bem em condições de operar são despesas;
- manutenção periódica: despesa;
- paradas programadas: o resumo as apresenta como gastos de capital, ativados e depreciados.

## 3. Depreciação pelo método da linha reta

Passos indicados no resumo:
1. identificar o valor de aquisição;
2. encontrar o valor residual;
3. calcular o valor depreciável: aquisição menos residual;
4. identificar a vida útil;
5. dividir o valor depreciável pela vida útil.

**Depreciação anual = (custo − valor residual) ÷ vida útil.**

## 4. Exemplo da questão Consulplan/CFC 2020.2

A questão apresenta máquina adquirida por R$ 900.000, com valor residual de 15%, vida útil de 10 anos e disponibilidade para uso em 10/04/2019.

- Valor residual: 900.000 × 15% = R$ 135.000.
- Valor depreciável: 900.000 − 135.000 = R$ 765.000.
- Depreciação anual: 765.000 ÷ 10 = R$ 76.500.
- Período de abril a dezembro: 9 meses.
- Depreciação do período: 76.500 × 9/12 = **R$ 57.375**.

A alternativa compatível com o cálculo é B — R$ 57.375,00.

O resumo também registra que vida útil e valor residual devem ser revistos ao menos ao final de cada ano e, se houver diferença, tratados como mudança de estimativa contábil.

## 5. Provisões e passivos contingentes

O resumo define provisão como passivo de prazo ou valor incertos. A questão da FLAME S.A apresenta cinco processos com probabilidades de perda:
- provável: reconhecer ou ajustar provisão conforme a estimativa;
- possível: o exercício trata como não contabilizada na provisão;
- remota: o exercício também não indica reconhecimento de provisão.

Na questão:
- Processo 1: provisão existente de R$ 25.000 e estimativa provável de R$ 35.000 — complementar R$ 10.000.
- Processo 2: perda provável de R$ 20.000 sem provisão — constituir R$ 20.000.
- Processo 3: perda possível, com provisão anterior de R$ 40.000 — reverter a provisão, conforme a alternativa assinalada pelo exercício.
- Processos 4 e 5: estimativas remota e possível — não constituir provisão na situação apresentada.

A alternativa que reúne esses tratamentos é A.

## 6. Provisão x reserva para contingências

O resumo diferencia:
- **Reserva para contingências:** conta do patrimônio líquido, formada com parcela do lucro para compensar possível diminuição do lucro em exercício futuro.
- **Provisão para contingências:** passivo, com contrapartida em despesa, ligada a fato gerador já ocorrido e obrigação de prazo ou valor incertos.

Não confunda a reserva, que é destinação do lucro, com a provisão, que reconhece obrigação.

## Pegadinhas
- Depreciação considera valor residual; não se divide automaticamente o custo bruto pela vida útil.
- Use o período em que o ativo esteve disponível para uso, conforme a questão.
- Perda provável, possível e remota não recebem o mesmo tratamento no exercício.
- Reserva para contingências fica no PL; provisão para contingências fica no passivo.

## Treino autoral
1. Um bem de R$ 900.000, com residual de 15% e vida útil de 10 anos, tem depreciação anual de R$ 76.500. **Certo ou errado?**
2. Uma provisão já registrada em R$ 25.000 deve ser complementada em R$ 10.000 se a estimativa provável passar a R$ 35.000. **Certo ou errado?**
3. Reserva para contingências e provisão para contingências são ambas contas do passivo. **Certo ou errado?**

**Gabarito comentado:** 1. Certo: (900.000 − 135.000) ÷ 10. 2. Certo: diferença de R$ 10.000. 3. Errado: reserva é PL; provisão é passivo.','PC-AC 2026','“Resumo - Contabilidade Geral.pdf”, itens 115–145 e 137–141, páginas 21–26; “Revisão de Véspera - Alunos.pdf”, questões Consulplan/CFC 2020.2, páginas 13 e 21–22.','active','[{"f":"Como calcular o valor depreciável?","b":"Custo de aquisição menos valor residual."},{"f":"Qual a fórmula da depreciação linear anual?","b":"(Custo − valor residual) ÷ vida útil."},{"f":"Qual a depreciação do exemplo da máquina de R$ 900 mil por 9 meses?","b":"R$ 57.375."},{"f":"Onde fica a reserva para contingências?","b":"No Patrimônio Líquido, como reserva de lucros."},{"f":"Onde fica a provisão para contingências?","b":"No passivo, com contrapartida em despesa, conforme o resumo."}]'::jsonb,'[{"q":"No exemplo, o valor residual de 15% sobre R$ 900.000 é R$ 135.000.","a":true,"why":"900.000 × 0,15 = 135.000."},{"q":"A depreciação anual do exemplo é R$ 90.000.","a":false,"why":"(900.000 − 135.000) ÷ 10 = R$ 76.500."},{"q":"A depreciação de nove meses no exemplo é R$ 57.375.","a":true,"why":"76.500 × 9/12 = 57.375."},{"q":"A reserva para contingências é uma conta do Patrimônio Líquido.","a":true,"why":"O resumo a classifica como reserva de lucros."},{"q":"No exemplo FLAME, perda provável de R$ 20.000 sem provisão anterior requer constituir provisão de R$ 20.000.","a":true,"why":"É o tratamento indicado na alternativa A da questão."}]'::jsonb,now()) on conflict (slug) do update set topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();

insert into public.study_materials (slug,discipline,topic_label,sort_order,title,summary,body_md,contest_name,source_note,content_status,flashcards,quiz,updated_at) values ('pcac-2026-contabilidade-15-dfc-dva-fluxos-caixa-demonstracoes','Contabilidade Geral','15. Demonstração dos Fluxos de Caixa e Demonstração do Valor Adicionado',15,'DFC e DVA: fluxos de caixa e distribuição do valor adicionado','Estrutura da DFC, métodos direto e indireto, atividades operacionais, investimento e financiamento, e estrutura da DVA.','# Aula 15 — DFC e DVA

## 1. Demonstração dos Fluxos de Caixa (DFC)

O resumo define a DFC como a demonstração que evidencia a variação das contas Caixa e Equivalentes de Caixa da companhia.

O material apresenta três grupos mínimos de fluxos:
- atividades operacionais;
- atividades de investimento;
- atividades de financiamento.

## 2. Método direto e método indireto

O resumo informa que a DFC pode ser elaborada pelo método direto ou indireto. A diferença entre os métodos está somente no fluxo operacional.

No método indireto, os passos didáticos do material são:
1. partir do lucro líquido do exercício;
2. ajustar receitas e despesas que não afetaram o caixa;
3. eliminar o efeito de vendas e compras a prazo.

Exemplo apresentado no resumo:
- lucro líquido: 450;
- depreciação: +50;
- lucro ajustado: 500.

O resumo também apresenta as relações para variações de contas:
- aumento do ativo: diminui o caixa;
- diminuição do ativo: aumenta o caixa;
- aumento do passivo: aumenta o caixa;
- diminuição do passivo: diminui o caixa.

## 3. Atividades operacionais

São as principais atividades geradoras de receita e outras que não sejam de investimento ou financiamento.

Exemplos apresentados:
- recebimentos de vendas de mercadorias e prestação de serviços;
- recebimentos de royalties, honorários e comissões;
- pagamentos a fornecedores e empregados;
- pagamentos de seguros e imposto de renda.

## 4. Atividades de investimento

Referem-se à aquisição e venda de ativos de longo prazo e de outros investimentos não incluídos nos equivalentes de caixa.

Exemplos do material:
- recebimento pela venda de imobilizado, intangível e outros ativos de longo prazo;
- recebimento pela venda de participações societárias;
- pagamento pela aquisição de imobilizado, intangível e participações societárias.

## 5. Atividades de financiamento

São as atividades que alteram o tamanho e a composição do capital próprio e do capital de terceiros.

Exemplos apresentados:
- recebimento pela emissão de ações e debêntures;
- recebimento de empréstimos;
- pagamento para resgate de ações;
- amortização de empréstimos;
- pagamento de arrendamento mercantil financeiro.

## 6. Ponto de atenção do resumo

O material traz uma tabela com tratamentos encorajados pelo CPC e alternativas indicadas no quadro para juros e juros sobre capital próprio/dividendos. Em questões, observe o tratamento que o enunciado solicita e o critério indicado.

## 7. Demonstração do Valor Adicionado (DVA)

O resumo apresenta a estrutura da DVA com:
1. receitas;
2. insumos adquiridos de terceiros;
3. valor adicionado bruto;
4. retenções (depreciação, amortização e exaustão);
5. valor adicionado líquido produzido pela entidade;
6. valor adicionado recebido em transferência;
7. valor adicionado total a distribuir;
8. distribuição do valor adicionado.

O quadro da distribuição inclui pessoal, impostos, taxas e contribuições, remuneração de capitais de terceiros e remuneração de capitais próprios.

## Pegadinhas
- DFC trata de caixa e equivalentes de caixa, não é a mesma coisa que a DRE.
- Não confunda fluxo operacional, investimento e financiamento.
- No método indireto, o ponto de partida é o lucro líquido, com ajustes.
- Aquisição de imobilizado é fluxo de investimento; recebimento de empréstimo é financiamento.
- DVA evidencia geração e distribuição do valor adicionado, conforme a estrutura do resumo.

## Treino autoral
1. A DFC evidencia a variação de caixa e equivalentes de caixa. **Certo ou errado?**
2. A aquisição de imobilizado é exemplo de fluxo de financiamento. **Certo ou errado?**
3. No método indireto, o resumo indica partir do lucro líquido e ajustar itens sem efeito caixa. **Certo ou errado?**

**Gabarito comentado:** 1. Certo. 2. Errado: é atividade de investimento. 3. Certo, corresponde aos passos descritos no resumo.','PC-AC 2026','“Resumo - Contabilidade Geral.pdf”, itens 157–167, páginas 29–32.','active','[{"f":"O que a DFC evidencia?","b":"A variação das contas Caixa e Equivalentes de Caixa."},{"f":"Quais são os três grupos de fluxos da DFC?","b":"Operacionais, investimento e financiamento."},{"f":"Qual é o ponto de partida do método indireto no resumo?","b":"Lucro líquido do exercício."},{"f":"Aquisição de imobilizado é qual tipo de fluxo?","b":"Atividade de investimento."},{"f":"Quais grandes grupos aparecem na distribuição da DVA?","b":"Pessoal; tributos; remuneração de capitais de terceiros; remuneração de capitais próprios."}]'::jsonb,'[{"q":"A DFC evidencia a variação de caixa e equivalentes de caixa.","a":true,"why":"Essa é a definição apresentada no resumo."},{"q":"A DFC possui fluxos operacionais, de investimento e de financiamento.","a":true,"why":"Os três grupos estão listados no material."},{"q":"No método indireto, o resumo indica começar pelo lucro líquido e ajustar itens sem efeito caixa.","a":true,"why":"É o roteiro indicado nos itens 161 e 162."},{"q":"A aquisição de imobilizado é exemplo de atividade operacional.","a":false,"why":"O resumo classifica aquisição de imobilizado em atividades de investimento."},{"q":"A emissão de ações e o recebimento de empréstimos são exemplos de atividades de financiamento.","a":true,"why":"Ambos alteram a composição do capital próprio ou de terceiros."}]'::jsonb,now()) on conflict (slug) do update set topic_label=excluded.topic_label,sort_order=excluded.sort_order,title=excluded.title,summary=excluded.summary,body_md=excluded.body_md,source_note=excluded.source_note,content_status='active',flashcards=excluded.flashcards,quiz=excluded.quiz,updated_at=now();