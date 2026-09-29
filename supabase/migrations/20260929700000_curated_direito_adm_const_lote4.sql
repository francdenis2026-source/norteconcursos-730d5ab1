-- Curated (authored) questions, Direito lote 10: mais Direito
-- Administrativo (contratos, licitação) e Direito Constitucional
-- (nacionalidade). Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-014',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Cláusulas exorbitantes dos contratos administrativos',
  $q$Julgue o item a seguir, com base na Lei nº 14.133/2021.
As cláusulas exorbitantes conferem à administração pública prerrogativas não usualmente presentes nos contratos privados, como a possibilidade de alteração e rescisão unilateral do contrato, o poder de fiscalizar sua execução e a possibilidade de aplicar sanções ao contratado, sempre observados os limites legais e o direito ao contraditório.$q$,
  'C',
  $q$Certo. As cláusulas exorbitantes são uma característica marcante dos contratos administrativos, decorrentes da posição de supremacia do interesse público sobre o interesse particular do contratado. A Lei nº 14.133/2021 (Nova Lei de Licitações), em seu art. 104, elenca prerrogativas da administração nos contratos, como modificá-los unilateralmente para melhor adequação às finalidades de interesse público, rescindi-los unilateralmente nos casos especificados em lei, fiscalizar sua execução e aplicar sanções motivadas pela inexecução total ou parcial do ajuste — prerrogativas que não existiriam num contrato entre particulares em pé de igualdade, mas que, no contrato administrativo, sempre precisam respeitar os limites legais e assegurar ao contratado o direito de defesa antes de qualquer penalização.
Exemplo: numa relação contratual entre duas empresas privadas, nenhuma das partes pode simplesmente alterar unilateralmente as condições do contrato sem concordância da outra; já a administração pública, em contratos administrativos, tem esse poder excepcional, justamente por representar o interesse coletivo, ainda que sujeito a limites e ao dever de recompor o equilíbrio econômico-financeiro do contratado quando cabível.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021 – Nova Lei de Licitações e Contratos Administrativos','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-015',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Dispensa e inexigibilidade de licitação',
  $q$Julgue o item a seguir, com base na Lei nº 14.133/2021.
A inexigibilidade de licitação ocorre quando há inviabilidade de competição, como nos casos de fornecedor exclusivo, ao passo que a dispensa de licitação pressupõe a existência de possível competição, mas a lei autoriza que, em determinadas situações expressamente previstas, a licitação seja dispensada por razões de conveniência, urgência ou baixo valor.$q$,
  'C',
  $q$Certo. A distinção central entre inexigibilidade e dispensa de licitação está na viabilidade de competição: na INEXIGIBILIDADE (art. 74 da Lei nº 14.133/2021), simplesmente não é possível competir — por exemplo, quando existe apenas um fornecedor exclusivo capaz de atender à necessidade específica da administração, tornando inviável qualquer disputa entre concorrentes. Já na DISPENSA (art. 75), a competição até seria tecnicamente possível (existem vários fornecedores potenciais), mas a lei, em hipóteses taxativamente previstas — como contratações de baixo valor, situações de emergência ou calamidade pública, entre outras —, autoriza que a administração contrate diretamente, sem realizar o procedimento licitatório completo, por razões de interesse público, urgência ou economicidade processual.
Exemplo: contratar a única empresa do mundo detentora de uma patente exclusiva de determinado equipamento é inexigibilidade (não há concorrência possível); já contratar diretamente um serviço de pequeno valor, sem licitação, mesmo havendo vários fornecedores no mercado capazes de prestá-lo, é uma hipótese de dispensa, expressamente autorizada pela lei para esses casos específicos.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021 – Nova Lei de Licitações e Contratos Administrativos','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-016',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Prescrição da ação disciplinar (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
A ação disciplinar prescreverá em cinco anos, quanto às infrações puníveis com demissão, cassação de aposentadoria ou disponibilidade e destituição de cargo em comissão, e em dois anos, quanto à suspensão, contado o prazo da data em que o fato se tornou conhecido.$q$,
  'C',
  $q$Certo. O art. 142, caput, incisos I e II, da Lei nº 8.112/1990 estabelece justamente esses prazos prescricionais: em cinco anos, quanto às infrações puníveis com demissão, cassação de aposentadoria ou disponibilidade e destituição de cargo em comissão (as penalidades mais graves); e em dois anos, quanto à suspensão. Já a advertência prescreve em 180 dias (art. 142, III). O § 1º do mesmo artigo determina que o prazo de prescrição começa a correr da data em que o fato se tornou conhecido pela administração, e não necessariamente da data em que o fato ocorreu — o que é relevante em casos de infrações que só vêm à tona tempo depois de praticadas.
Exemplo: se um servidor pratica uma infração grave sujeita à demissão, mas essa infração só é descoberta pela administração cinco anos depois de ter sido cometida, o prazo prescricional de cinco anos começa a contar a partir dessa descoberta, e não da data original do fato — o que pode, na prática, alongar consideravelmente o tempo total entre o fato e a eventual prescrição.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-009',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Nacionalidade',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São brasileiros natos os nascidos na República Federativa do Brasil, ainda que de pais estrangeiros, desde que estes não estejam a serviço de seu país, sendo também considerados natos os nascidos no estrangeiro, de pai brasileiro ou de mãe brasileira, desde que sejam registrados em repartição brasileira competente ou venham a residir no Brasil e optem, em qualquer tempo, pela nacionalidade brasileira.$q$,
  'C',
  $q$Certo. O art. 12, inciso I, da CF/1988 lista as hipóteses de brasileiro nato, incluindo: os nascidos na República Federativa do Brasil, ainda que de pais estrangeiros, desde que estes não estejam a serviço de seu país (alínea "a" — critério do jus soli, com essa exceção específica); e os nascidos no estrangeiro, de pai brasileiro ou de mãe brasileira, desde que sejam registrados em repartição brasileira competente, ou venham a residir na República Federativa do Brasil e optem, em qualquer tempo, depois de atingida a maioridade, pela nacionalidade brasileira (alíneas "b" e "c", combinando critérios de jus sanguinis com registro ou opção posterior).
Exemplo: um filho de pais estrangeiros nascido no Brasil é, em regra, brasileiro nato (salvo se os pais estiverem a serviço do país deles, como diplomatas em missão oficial); já um filho de mãe brasileira nascido no exterior pode ser brasileiro nato se registrado numa embaixada ou consulado brasileiro, ou, alternativamente, se vier a residir no Brasil e depois optar formalmente pela nacionalidade brasileira.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-010',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Repartição de competências — entes federativos',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Compete privativamente à União legislar sobre direito penal, direito processual e direito civil, entre outras matérias, sendo facultado aos estados, por meio de lei complementar, legislar sobre questões específicas dessas matérias, desde que autorizados por lei complementar federal.$q$,
  'C',
  $q$Certo. O art. 22, incisos I, da CF/1988 estabelece que compete privativamente à União legislar sobre direito civil, comercial, penal, processual, entre outras matérias listadas no dispositivo. O parágrafo único do mesmo artigo, porém, prevê uma flexibilização: "lei complementar poderá autorizar os Estados a legislar sobre questões específicas das matérias relacionadas neste artigo" — ou seja, embora a regra geral seja a competência exclusiva da União nessas matérias, a própria Constituição admite que, mediante lei complementar federal autorizativa, os Estados possam legislar sobre pontos específicos e delimitados dentro desses temas, sem que isso represente uma invasão indevida de competência.
Exemplo: mesmo sendo o direito penal, em regra, matéria de competência privativa da União, uma lei complementar federal poderia, em tese, autorizar um Estado a legislar sobre um aspecto bem específico e delimitado dessa matéria, dentro dos limites que essa autorização estabelecer — sem essa autorização prévia, porém, o Estado não pode legislar sobre direito penal por conta própria.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
);
