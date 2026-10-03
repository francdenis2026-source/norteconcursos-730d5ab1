-- Curated (authored) questions for Câmara dos Deputados — Técnico
-- Legislativo (Policial Legislativo Federal), 2026: 30 questões baseadas nos
-- itens REAIS já importados em official_exam_questions (mesmo texto e
-- gabarito oficial do caderno CD-PLF 2026, CEBRASPE), com explicação
-- pedagógica e base legal verificada. Cobre Direito Administrativo,
-- Constitucional, Penal e Direitos Humanos.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '9bdd0632-9ac7-4197-b18b-cf2e45191320', 'cdplf26-adm-01',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Administrativo', 'Revisão de processo administrativo disciplinar (art. 65, Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
A aplicação de sanções no âmbito de processo administrativo poderá ser revista de ofício, a qualquer tempo, desde que surjam fatos novos ou circunstâncias relevantes suscetíveis de justificar a inadequação da sanção aplicada, sendo vedada a reformatio in pejus.$q$,
  'C',
  $q$Certo. O art. 65 da Lei nº 9.784/1999 permite a revisão, a pedido ou de ofício, dos processos administrativos que resultem em sanção, sempre que surgirem fatos novos ou circunstâncias relevantes capazes de justificar a inadequação da penalidade aplicada; o parágrafo único do mesmo artigo veda expressamente que da revisão resulte agravamento da sanção (reformatio in pejus), protegendo o administrado contra piora de sua situação em razão de revisão que ele próprio, ou a Administração, provocou. Exemplo: se, após a aplicação de uma penalidade, surgem provas de que a conduta do servidor foi menos grave do que se supunha, a Administração pode rever de ofício a sanção para reduzi-la, mas nunca para aumentá-la.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999, art. 65','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'média', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '9bdd0632-9ac7-4197-b18b-cf2e45191320', 'cdplf26-adm-02',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Administrativo', 'Personalidade judiciária das Câmaras Municipais',
  $q$Julgue o item a seguir, com base na doutrina e na jurisprudência de direito administrativo.
As câmaras de vereadores, por serem desprovidas de personalidade jurídica própria, não possuem capacidade processual para propor ações judiciais, cabendo exclusivamente às pessoas jurídicas de direito público a defesa dos seus direitos institucionais.$q$,
  'E',
  $q$Errado. Embora as câmaras municipais não possuam personalidade jurídica de direito material (não sendo, portanto, sujeitos de direitos e obrigações patrimoniais como o próprio Município), a jurisprudência reconhece-lhes personalidade judiciária, permitindo que atuem em juízo, em nome próprio, para a defesa de suas prerrogativas institucionais, como a autonomia orçamentária e organizacional do Poder Legislativo local. Exemplo: uma Câmara Municipal pode ajuizar mandado de segurança para defender sua autonomia orçamentária diante de ato do Poder Executivo que a viole, ainda que não tenha personalidade jurídica própria para outros fins.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '9bdd0632-9ac7-4197-b18b-cf2e45191320', 'cdplf26-adm-03',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Administrativo', 'Vedação à delegação da decisão de recursos administrativos (art. 13, Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
A decisão de recursos administrativos pode ser objeto de delegação de competência, conforme a conveniência e a oportunidade, em razão de circunstâncias de cunho técnico e jurídico.$q$,
  'E',
  $q$Errado. O art. 13, inciso II, da Lei nº 9.784/1999 veda expressamente a delegação de competência para a decisão de recursos administrativos, ao lado da edição de atos de caráter normativo e das matérias de competência exclusiva do órgão, justamente para preservar a garantia de reexame por autoridade com atribuição própria para tanto, e não por delegação. Exemplo: um órgão não pode delegar a outro a decisão final de um recurso hierárquico interposto contra sua própria decisão, ainda que por razões de conveniência técnica.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999, art. 13, II','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'média', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '9bdd0632-9ac7-4197-b18b-cf2e45191320', 'cdplf26-adm-04',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Administrativo', 'Termo inicial da decadência em efeitos patrimoniais contínuos (art. 54, Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
O prazo decadencial de cinco anos para a administração anular os atos administrativos ilegais contar-se-á, no caso de efeitos patrimoniais contínuos, da percepção do primeiro pagamento ao beneficiário.$q$,
  'C',
  $q$Certo. O art. 54, caput e § 1º, da Lei nº 9.784/1999 fixa em cinco anos o prazo decadencial para a Administração anular atos administrativos favoráveis eivados de ilegalidade, estabelecendo, para os atos de efeitos patrimoniais contínuos (como benefícios pagos periodicamente), que esse prazo se conta da percepção do primeiro pagamento, e não da data de cada pagamento subsequente. Exemplo: se um servidor recebe indevidamente uma gratificação mensal com base em ato ilegal, o prazo de cinco anos para a Administração anular esse ato começa a contar do primeiro pagamento da gratificação, e não se renova a cada mês.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999, art. 54, § 1º','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '9bdd0632-9ac7-4197-b18b-cf2e45191320', 'cdplf26-adm-05',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Administrativo', 'Vedação definitiva de retorno ao serviço público (art. 137, Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
O servidor que foi demitido por se ter valido do cargo para lograr proveito pessoal, em detrimento da dignidade da função pública, não poderá retornar ao serviço público federal pelo período de dez anos, ainda que aprovado em outro concurso público.$q$,
  'E',
  $q$Errado. O art. 137, parágrafo único, da Lei nº 8.112/1990 estabelece que a demissão por essa infração específica (valer-se do cargo para lograr proveito pessoal ou de outrem, em detrimento da dignidade da função pública) acarreta a vedação DEFINITIVA (e não por prazo determinado de dez anos) de retorno ao serviço público federal, tratando-se de uma das infrações mais graves previstas no estatuto dos servidores federais. Exemplo: um servidor demitido por essa causa específica não poderá, em hipótese alguma no futuro, ser reconduzido ao serviço público federal, ainda que aprovado em novo concurso décadas depois.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990, art. 137, parágrafo único','url','https://www.planalto.gov.br/ccivil_03/leis/l8112cons.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '9bdd0632-9ac7-4197-b18b-cf2e45191320', 'cdplf26-adm-06',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Administrativo', 'Servidor como procurador de cônjuge para benefícios previdenciários (art. 117, Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
É permitido ao servidor público atuar como procurador de seu cônjuge para tratar de benefícios previdenciários ou assistenciais junto a repartições públicas.$q$,
  'C',
  $q$Certo. O art. 117, inciso XI, da Lei nº 8.112/1990 proíbe, como regra, que o servidor atue como procurador ou intermediário junto a repartições públicas, ressalvando expressamente a hipótese de benefícios previdenciários ou assistenciais de parentes até o segundo grau, e de cônjuge ou companheiro, situação em que essa atuação é permitida. Exemplo: um servidor público pode, sem violar essa vedação, representar seu cônjuge perante o INSS para tratar de um benefício previdenciário específico.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990, art. 117, XI','url','https://www.planalto.gov.br/ccivil_03/leis/l8112cons.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '9bdd0632-9ac7-4197-b18b-cf2e45191320', 'cdplf26-adm-07',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Administrativo', 'Teoria da dupla garantia — responsabilidade civil do Estado (art. 37, § 6º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988 e na jurisprudência do STF.
No caso de ilícito praticado por agente público contra terceiro, a ação de indenização por danos materiais deve ser ajuizada diretamente contra o Estado, que tem o direito de regresso contra o servidor em caso de culpa ou dolo.$q$,
  'C',
  $q$Certo. O STF consolidou o entendimento, conhecido como teoria da dupla garantia, segundo o qual o art. 37, § 6º, da Constituição Federal garante tanto à vítima (que pode buscar indenização do Estado, sob responsabilidade objetiva, sem necessidade de provar culpa do agente) quanto ao próprio agente público (que só responde perante o Estado, em ação regressiva, e não diretamente perante a vítima, mediante comprovação de dolo ou culpa). Exemplo: uma pessoa atropelada por viatura oficial em situação de negligência do motorista deve processar o Estado, e não o agente diretamente, cabendo ao Estado, posteriormente, buscar o ressarcimento do servidor culpado por meio de ação regressiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 37, § 6º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '9bdd0632-9ac7-4197-b18b-cf2e45191320', 'cdplf26-adm-08',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Administrativo', 'Improbidade administrativa — exigência de dolo (art. 9º, Lei 8.429/1992)',
  $q$Julgue o item a seguir, com base na Lei nº 8.429/1992, com a redação dada pela Lei nº 14.230/2021.
Constitui ato de improbidade administrativa caracterizado como enriquecimento ilícito auferir, seja de forma dolosa, seja de forma culposa, qualquer tipo de vantagem patrimonial indevida em razão do exercício de cargo público.$q$,
  'E',
  $q$Errado. Após a reforma promovida pela Lei nº 14.230/2021, a Lei de Improbidade Administrativa passou a exigir a comprovação de dolo específico para a configuração de qualquer modalidade de ato de improbidade, inclusive o enriquecimento ilícito, tendo sido extinta a possibilidade de responsabilização por conduta meramente culposa nessa seara. Exemplo: um agente público que, por mero descuido administrativo (sem intenção), acaba obtendo alguma vantagem indevida não configura, após a reforma de 2021, ato de improbidade por enriquecimento ilícito, por ausência do dolo exigido pela lei atual.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.429/1992, art. 9º, com redação da Lei nº 14.230/2021','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'ff015731-538e-4d8d-a63d-1fe4960f6249', 'cdplf26-const-01',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Constitucional', 'Cassação de aposentadoria e regime contributivo-solidário',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988 e na jurisprudência do STF.
A aplicação da penalidade de cassação de aposentadoria ou disponibilidade de servidor é compatível com o caráter contributivo e solidário do regime próprio de previdência dos servidores públicos.$q$,
  'C',
  $q$Certo. O Supremo Tribunal Federal firmou entendimento de que a cassação de aposentadoria, prevista como sanção disciplinar em estatutos funcionais para infrações gravíssimas cometidas quando o servidor ainda estava na ativa, é compatível com o caráter contributivo e solidário do regime próprio de previdência social, não configurando violação ao direito adquirido, já que a penalidade tem natureza sancionatória e não meramente previdenciária. Exemplo: um servidor aposentado que, quando ainda em atividade, praticou infração gravíssima (como corrupção) pode ter sua aposentadoria cassada como sanção, mesmo já estando aposentado no momento da condenação administrativa.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 40; jurisprudência do STF','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'ff015731-538e-4d8d-a63d-1fe4960f6249', 'cdplf26-const-02',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Constitucional', 'Habeas corpus para trancamento de ação penal',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988 e na jurisprudência dos tribunais superiores.
É cabível o trancamento da ação penal por meio de habeas corpus, admitido diante de situações excepcionalíssimas, como quando constatada, de plano, ausência de justa causa para a propositura da ação penal.$q$,
  'C',
  $q$Certo. A jurisprudência dos tribunais superiores admite, excepcionalmente, o uso do habeas corpus para trancar ação penal manifestamente inviável, restringindo essa possibilidade a hipóteses de flagrante ilegalidade verificável de plano, sem necessidade de exame aprofundado de provas, como a atipicidade da conduta, a extinção da punibilidade ou a ausência de justa causa evidente para a persecução penal. Exemplo: se uma denúncia é oferecida por fato manifestamente atípico, sem qualquer elemento mínimo de indício de crime, o réu pode buscar o trancamento da ação penal por meio de habeas corpus, sem necessidade de aguardar toda a instrução processual.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LXVIII; jurisprudência do STF e do STJ','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'ff015731-538e-4d8d-a63d-1fe4960f6249', 'cdplf26-const-03',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Constitucional', 'Inviolabilidade domiciliar e área comum de pousada',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988 e na jurisprudência do STF.
Área comum do pátio de uma pousada não é abrangida pela proteção conferida pela cláusula da inviolabilidade domiciliar.$q$,
  'C',
  $q$Certo. A jurisprudência do STF, ao interpretar amplamente o conceito de "casa" para fins de proteção constitucional (art. 5º, XI, da CF), reconhece que essa proteção se estende a espaços de uso privativo, como os quartos de hóspedes em um estabelecimento de hospedagem, mas não necessariamente às áreas comuns e de acesso compartilhado, como pátios e corredores abertos à circulação geral do estabelecimento, que não gozam da mesma expectativa de privacidade. Exemplo: o ingresso policial no pátio comum de uma pousada, sem autorização judicial, não configura violação à inviolabilidade domiciliar, diferentemente do ingresso não autorizado em um quarto específico ocupado por um hóspede.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, XI; jurisprudência do STF','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'ff015731-538e-4d8d-a63d-1fe4960f6249', 'cdplf26-const-04',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Constitucional', 'Perícias em local de incêndio — inconstitucionalidade da exclusividade dos bombeiros',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988 e na jurisprudência do STF.
É constitucional a atribuição exclusiva ao Corpo de Bombeiros Militar da realização de perícias em locais de incêndio ou explosão.$q$,
  'E',
  $q$Errado. O STF já declarou inconstitucional norma estadual que atribui competência exclusiva ao Corpo de Bombeiros Militar para a realização de perícias em locais de incêndio ou explosão, por entender que essa atividade pericial, de natureza técnico-científica voltada à apuração da causa e da autoria de eventuais crimes, deve permanecer, em regra, no âmbito da polícia científica (perícia oficial de natureza criminal), sob pena de comprometer a organização constitucional das funções de investigação e persecução penal. Exemplo: uma lei estadual que impedisse a atuação de peritos criminais da Polícia Civil em incêndios suspeitos de serem criminosos, reservando a perícia exclusivamente aos bombeiros, seria inconstitucional segundo esse entendimento.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 144; jurisprudência do STF','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'ff015731-538e-4d8d-a63d-1fe4960f6249', 'cdplf26-const-05',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Constitucional', 'Atribuições da Polícia Federal (art. 144, § 1º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
No sistema de segurança pública constitucionalmente instituído, à Polícia Federal cabe o exercício das funções de polícia marítima, aeroportuária, rodoviária, judiciária da União e de fronteiras.$q$,
  'E',
  $q$Errado. O art. 144, § 1º, da Constituição Federal atribui à Polícia Federal as funções de polícia marítima, aeroportuária, de fronteiras e judiciária da União, mas a função de polícia rodoviária federal (fiscalização e patrulhamento ostensivo das rodovias federais) é atribuição de órgão distinto e autônomo, a Polícia Rodoviária Federal, prevista no art. 144, § 2º, da própria Constituição, e não da Polícia Federal. Exemplo: a fiscalização de velocidade e o patrulhamento das rodovias federais são realizados pela Polícia Rodoviária Federal, não pela Polícia Federal, ainda que ambas integrem o sistema constitucional de segurança pública da União.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 144, §§ 1º e 2º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'ff015731-538e-4d8d-a63d-1fe4960f6249', 'cdplf26-const-06',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Constitucional', 'Vedação a habeas corpus contra punições disciplinares militares (art. 142, § 2º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É assegurada a concessão de habeas corpus contra ato de violência ou coação à liberdade de locomoção de membros das Forças Armadas, inclusive em razão de prisões disciplinares militares.$q$,
  'E',
  $q$Errado. O art. 142, § 2º, da Constituição Federal veda expressamente a concessão de habeas corpus em relação a punições disciplinares militares, tratando-se de uma das poucas exceções constitucionais ao cabimento desse remédio constitucional, justificada pela necessidade de preservar a disciplina e a hierarquia próprias das instituições militares. Exemplo: um militar punido disciplinarmente com prisão em razão de infração ao regulamento militar não pode buscar habeas corpus contra o mérito dessa punição disciplinar especificamente, embora o Judiciário possa examinar aspectos formais, como a competência da autoridade e a observância do devido processo.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 142, § 2º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'ff015731-538e-4d8d-a63d-1fe4960f6249', 'cdplf26-const-07',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Constitucional', 'Projeto de lei de iniciativa popular (art. 61, § 2º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Projeto de lei de iniciativa popular deve ser encaminhado à Câmara dos Deputados, subscrito por, no mínimo, um por cento do eleitorado nacional, distribuído por pelo menos cinco estados, com não menos de três décimos por cento dos eleitores de cada um deles.$q$,
  'C',
  $q$Certo. O art. 61, § 2º, da Constituição Federal estabelece os requisitos formais para o exercício da iniciativa popular de lei no âmbito federal, exigindo subscrição de, no mínimo, 1% do eleitorado nacional, distribuído em pelo menos cinco estados, com não menos de 0,3% dos eleitores em cada um deles, mecanismo de participação popular direta no processo legislativo, com apresentação do projeto perante a Câmara dos Deputados. Exemplo: uma proposta legislativa sobre determinado tema pode ser apresentada por iniciativa popular à Câmara dos Deputados, desde que reunidas as assinaturas mínimas exigidas nesses termos.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 61, § 2º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'ff015731-538e-4d8d-a63d-1fe4960f6249', 'cdplf26-const-08',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Constitucional', 'Inviolabilidade parlamentar após diplomação (art. 53, § 2º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Desde a expedição do diploma, o eleito para o cargo de deputado federal só poderá ser preso em caso de flagrante de crime inafiançável.$q$,
  'C',
  $q$Certo. O art. 53, § 2º, da Constituição Federal assegura a imunidade formal relativa à prisão desde a expedição do diploma eleitoral, e não apenas a partir da posse no cargo, restringindo a prisão do parlamentar (ou do diplomado eleito) à hipótese de flagrante de crime inafiançável, situação que ainda exige remessa dos autos à respectiva Casa Legislativa dentro de 24 horas para deliberação sobre a manutenção ou não da prisão. Exemplo: um deputado federal diplomado, mas ainda não empossado, só pode ser preso se flagrado cometendo crime inafiançável, gozando já dessa proteção formal desde a diplomação.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 53, § 2º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '2c6b8dfc-bca9-45b4-bbca-d3535cd0ca2b', 'cdplf26-penal-01',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Penal', 'Incomunicabilidade das circunstâncias pessoais (art. 30, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
As condições de caráter pessoal não se comunicam entre os agentes, ainda que constituam elementares do tipo penal.$q$,
  'E',
  $q$Errado. O art. 30 do Código Penal estabelece que não se comunicam as circunstâncias e condições de caráter pessoal, "salvo quando elementares do crime" — ou seja, quando a condição pessoal integra a própria definição do tipo penal (elementar), ela SE COMUNICA aos demais coautores e partícipes que dela tenham conhecimento, ao contrário do que afirma o item. Exemplo: em um crime de peculato, que exige a qualidade de funcionário público como elementar, um particular que participa da conduta, ciente dessa condição do outro agente, responde também por peculato, e não por outro crime, justamente porque essa condição pessoal, sendo elementar do tipo, se comunica a ele.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 30','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '2c6b8dfc-bca9-45b4-bbca-d3535cd0ca2b', 'cdplf26-penal-02',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Penal', 'Rompimento do nexo causal (art. 13, § 1º, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
A superveniência de causa relativamente independente que, por si só, produz o resultado rompe o nexo causal, afastando a imputação desse resultado ao agente anterior.$q$,
  'C',
  $q$Certo. O art. 13, § 1º, do Código Penal disciplina a superveniência causal, estabelecendo que, quando uma causa superveniente relativamente independente é, por si só, suficiente para produzir o resultado, rompe-se o nexo causal em relação à conduta anterior, respondendo o primeiro agente apenas pelos atos já praticados até aquele ponto, e não pelo resultado final. Exemplo: se a vítima de uma facada é levada ao hospital e morre em razão de um incêndio na ambulância (causa totalmente independente e por si só suficiente), o autor da facada responde apenas por tentativa de homicídio, e não pelo homicídio consumado, pois o incêndio rompeu o nexo causal.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 13, § 1º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '2c6b8dfc-bca9-45b4-bbca-d3535cd0ca2b', 'cdplf26-penal-03',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Penal', 'Vedação à combinação de leis penais no tempo',
  $q$Julgue o item a seguir, com base no Código Penal e na jurisprudência dos tribunais superiores.
Na hipótese de sucessão de leis penais no tempo, é permitido ao juiz aplicar parte de uma lei anterior e parte de uma lei posterior, desde que o resultado seja mais favorável ao réu.$q$,
  'E',
  $q$Errado. A jurisprudência dominante dos tribunais superiores veda a chamada combinação de leis (lex tertia), segundo a qual o juiz não pode extrair partes benéficas de leis diferentes para criar uma terceira norma híbrida, mais favorável do que qualquer uma das leis consideradas isoladamente; o juiz deve escolher e aplicar integralmente a lei (anterior ou posterior) que, em seu conjunto, seja mais favorável ao réu no caso concreto. Exemplo: se a lei antiga tem pena menor mas regime mais rigoroso, e a lei nova tem pena maior mas regime mais brando, o juiz deve optar integralmente por uma das duas leis, sem combinar a pena menor da antiga com o regime mais brando da nova.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 2º, parágrafo único; jurisprudência dos tribunais superiores','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '2c6b8dfc-bca9-45b4-bbca-d3535cd0ca2b', 'cdplf26-penal-04',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Penal', 'Abolitio criminis e retroatividade da lei mais benéfica (art. 2º, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
A abolitio criminis extingue a punibilidade e faz cessar a execução e os efeitos penais da condenação, ao passo que a lei posterior mais benéfica retroage para beneficiar o réu, podendo implicar redução de pena ou modificação do regime jurídico aplicável.$q$,
  'C',
  $q$Certo. O art. 2º do Código Penal distingue duas situações de retroatividade benéfica: a abolitio criminis (caput), em que a descriminalização da conduta extingue a punibilidade e cessa a execução e os efeitos penais da sentença condenatória, e a simples sucessão de leis penais mais benéficas (parágrafo único), em que a nova lei, sem descriminalizar a conduta, retroage para beneficiar o réu de outras formas, como redução de pena ou mudança de regime de cumprimento. Exemplo: se uma lei nova deixa de considerar crime determinada conduta, cessam imediatamente a execução da pena e seus efeitos penais para quem já havia sido condenado por ela; se apenas reduz a pena cominada, aplica-se essa redução retroativamente, sem extinguir a punibilidade.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 2º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '2c6b8dfc-bca9-45b4-bbca-d3535cd0ca2b', 'cdplf26-penal-05',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Penal', 'Extraterritorialidade condicionada — dupla tipicidade (art. 7º, § 2º, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
A lei penal brasileira aplica-se a crime praticado no estrangeiro por brasileiro, ainda que o fato não seja punível no país em que tenha sido praticado, desde que o agente ingresse no território nacional.$q$,
  'E',
  $q$Errado. O art. 7º, § 2º, alínea "b", do Código Penal estabelece, entre os requisitos cumulativos da extraterritorialidade condicionada, a exigência de que o fato seja punível também no país em que foi praticado (princípio da dupla tipicidade), de modo que, se o fato não constitui crime no local em que ocorreu, a lei penal brasileira não pode alcançá-lo com base nessa hipótese, mesmo que o agente brasileiro venha a ingressar no território nacional. Exemplo: se um brasileiro pratica, no exterior, uma conduta que não é crime naquele país, ele não pode ser processado no Brasil por esse fato com base na extraterritorialidade condicionada, ainda que retorne ao território nacional.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 7º, § 2º, "b"','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '2c6b8dfc-bca9-45b4-bbca-d3535cd0ca2b', 'cdplf26-penal-06',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Penal', 'Descriminante putativa por erro evitável',
  $q$Julgue o item a seguir, com base no Código Penal.
O agente que, por erro evitável, supõe estar acobertado por uma causa de exclusão da ilicitude atua sem culpabilidade, devendo ser a pena afastada.$q$,
  'E',
  $q$Errado. Na descriminante putativa (erro sobre a existência ou os limites de uma causa de exclusão da ilicitude), se o erro é evitável (inescusável, decorrente de falta de cuidado do agente), ele não afasta totalmente a pena, mas permite, conforme a teoria adotada e a modalidade do erro, a punição do agente a título de culpa, se prevista em lei para aquele crime; apenas o erro inevitável (plenamente justificado pelas circunstâncias) exclui totalmente a culpabilidade e a pena. Exemplo: um agente que, por descuido evidente e falta de cautela, supõe erroneamente estar em legítima defesa e mata alguém pode responder por homicídio culposo, e não ficar totalmente isento de pena, pois o erro em que incorreu era evitável com um mínimo de cuidado.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 20, § 1º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', '2c6b8dfc-bca9-45b4-bbca-d3535cd0ca2b', 'cdplf26-penal-07',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direito Penal', 'Inimputabilidade e medida de segurança (art. 26, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
O agente que, ao tempo da ação, em razão de doença mental ou desenvolvimento mental incompleto ou retardado, era inteiramente incapaz de entender o caráter ilícito do fato é isento de pena, ficando sujeito, contudo, à imposição de medida de segurança.$q$,
  'C',
  $q$Certo. O art. 26, caput, do Código Penal isenta de pena o agente inteiramente incapaz de compreender o caráter ilícito do fato ou de se autodeterminar conforme esse entendimento, em razão de doença mental ou desenvolvimento mental incompleto ou retardado, e, embora isento de pena por ausência de culpabilidade, o agente considerado perigoso permanece sujeito à imposição de medida de segurança, de natureza preventiva e não punitiva, voltada ao tratamento e à contenção do risco que representa. Exemplo: um agente que, comprovadamente por transtorno mental grave, não compreendia a ilicitude de sua conduta ao matar alguém, é absolvido impropriamente e submetido a medida de segurança, como internação em hospital de custódia e tratamento psiquiátrico.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 26, caput','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'b59006a2-489e-4862-ad2d-7870520a94b9', 'cdplf26-dh-01',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direitos Humanos', 'Procedimento de incorporação de tratados de direitos humanos (art. 5º, § 3º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A Constituição Federal de 1988 dispõe de procedimento de aprovação específico para a incorporação dos tratados e convenções internacionais sobre direitos humanos ao ordenamento jurídico pátrio.$q$,
  'C',
  $q$Certo. O art. 5º, § 3º, da Constituição Federal, incluído pela EC nº 45/2004, prevê procedimento diferenciado para a internalização de tratados internacionais de direitos humanos, exigindo aprovação em cada Casa do Congresso Nacional, em dois turnos, por três quintos dos votos dos respectivos membros, para que o tratado seja equivalente a emenda constitucional, procedimento mais rigoroso do que o exigido para tratados internacionais comuns. Exemplo: a Convenção sobre os Direitos das Pessoas com Deficiência foi aprovada segundo esse procedimento especial, adquirindo status de emenda constitucional no ordenamento brasileiro.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, § 3º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'b59006a2-489e-4862-ad2d-7870520a94b9', 'cdplf26-dh-02',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direitos Humanos', 'Gerações (dimensões) dos direitos humanos',
  $q$Julgue o item a seguir, com base na doutrina de direitos humanos.
As gerações (ou dimensões) dos direitos humanos contemplam a evolução histórica desses direitos, que abrange tanto a noção de direitos civis e políticos, direitos econômicos, sociais e culturais quanto a de direitos difusos e coletivos, por exemplo.$q$,
  'C',
  $q$Certo. A doutrina classifica os direitos humanos em gerações (ou dimensões) que refletem sua evolução histórica: a primeira geração relaciona-se aos direitos civis e políticos (liberdade), a segunda aos direitos econômicos, sociais e culturais (igualdade), e a terceira aos direitos difusos e coletivos, como meio ambiente e paz (fraternidade/solidariedade), havendo, ainda, quem defenda gerações posteriores relacionadas a temas como biotecnologia e direito à informação. Exemplo: o direito à liberdade de expressão é de primeira geração; o direito à saúde é de segunda geração; o direito a um meio ambiente equilibrado é de terceira geração.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'b59006a2-489e-4862-ad2d-7870520a94b9', 'cdplf26-dh-03',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direitos Humanos', 'Reconhecimento da personalidade jurídica (art. 3º, CADH)',
  $q$Julgue o item a seguir, com base na Convenção Americana sobre Direitos Humanos.
A Convenção Americana sobre Direitos Humanos, que versa sobre várias espécies de direitos, entre os quais se incluem os direitos civis e políticos, assegura a toda pessoa o reconhecimento de sua personalidade jurídica.$q$,
  'C',
  $q$Certo. O art. 3º da Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica) assegura a toda pessoa o direito ao reconhecimento de sua personalidade jurídica, direito fundamental que constitui pressuposto para o exercício de todos os demais direitos civis reconhecidos pelo tratado, ao lado de outros direitos civis e políticos igualmente protegidos pela Convenção. Exemplo: negar o reconhecimento da personalidade jurídica de uma pessoa (impedindo, por exemplo, seu registro civil) violaria diretamente esse dispositivo da Convenção.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 678/1992 – Convenção Americana sobre Direitos Humanos, art. 3º','url','https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm')),
  'fácil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'b59006a2-489e-4862-ad2d-7870520a94b9', 'cdplf26-dh-04',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direitos Humanos', 'Ordem de apreciação de petições no Sistema Interamericano',
  $q$Julgue o item a seguir, com base na Convenção Americana sobre Direitos Humanos.
O Sistema Interamericano de Direitos Humanos, previsto na Convenção Americana sobre Direitos Humanos, permite a apreciação, pela Corte Interamericana de Direitos Humanos, de demandas que envolvam direitos humanos que, uma vez ali acolhidas, serão objeto de julgamento pela Comissão Interamericana de Direitos Humanos.$q$,
  'E',
  $q$Errado. A sistemática do Pacto de San José da Costa Rica estabelece ordem inversa à descrita no item: as petições e denúncias de violação de direitos humanos são inicialmente apresentadas e processadas pela Comissão Interamericana de Direitos Humanos, que pode, posteriormente, submeter o caso à Corte Interamericana de Direitos Humanos para julgamento definitivo, e não o contrário. Exemplo: uma vítima de violação de direitos humanos por um Estado-parte deve, em regra, esgotar os recursos internos e depois peticionar à Comissão, que avalia o caso antes de eventualmente encaminhá-lo à Corte.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 678/1992 – Convenção Americana sobre Direitos Humanos, arts. 44 e 61','url','https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm')),
  'média', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'b59006a2-489e-4862-ad2d-7870520a94b9', 'cdplf26-dh-05',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direitos Humanos', 'Legitimidade ampla para petições à Comissão Interamericana (art. 44, CADH)',
  $q$Julgue o item a seguir, com base na Convenção Americana sobre Direitos Humanos.
A competência para apresentar petições que contenham denúncias ou queixas de violação da Convenção Interamericana de Direitos Humanos é restrita aos Estados-membros dessa convenção.$q$,
  'E',
  $q$Errado. O art. 44 da Convenção Americana sobre Direitos Humanos confere legitimidade ampla para a apresentação de petições à Comissão Interamericana, permitindo que qualquer pessoa, grupo de pessoas ou entidade não governamental legalmente reconhecida apresente denúncias de violação da Convenção por um Estado-parte, não se restringindo essa legitimidade aos próprios Estados-membros. Exemplo: uma organização não governamental de direitos humanos pode apresentar à Comissão Interamericana uma petição denunciando violação de direitos de um grupo de pessoas, mesmo sem ser ela própria a vítima direta.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 678/1992 – Convenção Americana sobre Direitos Humanos, art. 44','url','https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm')),
  'média', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'b59006a2-489e-4862-ad2d-7870520a94b9', 'cdplf26-dh-06',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direitos Humanos', 'Natureza jurídica da DUDH (soft law)',
  $q$Julgue o item a seguir, com base na doutrina de direitos humanos.
A DUDH tem cunho de hard law, de modo que a sua observância pelos países signatários é obrigatória, consoante os preceitos do direito internacional.$q$,
  'E',
  $q$Errado. A Declaração Universal dos Direitos Humanos (1948) é, tecnicamente, uma resolução da Assembleia Geral da ONU, e não um tratado internacional formalmente vinculante, sendo, por isso, classificada pela doutrina majoritária como soft law (norma de caráter orientador e moral, sem força jurídica cogente originária), ainda que boa parte de seu conteúdo seja hoje considerada costume internacional ou tenha sido incorporada a tratados posteriores juridicamente vinculantes. Exemplo: ao contrário de um tratado ratificado, o descumprimento direto de um dispositivo da DUDH, isoladamente, não gera, por si só, uma sanção jurídica automática no plano do direito internacional, dada sua natureza declaratória originária.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  'd76d513f-e494-473b-a1cd-0bb4092938af', 'b59006a2-489e-4862-ad2d-7870520a94b9', 'cdplf26-dh-07',
  'Câmara dos Deputados', 2026, 'Técnico Legislativo – Especialidade: Policial Legislativo Federal', 'CEBRASPE', 'Direitos Humanos', 'Vedação à tortura na DUDH (art. 5º)',
  $q$Julgue o item a seguir, com base na Declaração Universal dos Direitos Humanos (1948).
Segundo o disposto na DUDH, nenhuma pessoa será submetida a tortura, tratamento ou castigo cruel, desumano ou degradante.$q$,
  'C',
  $q$Certo. O art. 5º da Declaração Universal dos Direitos Humanos consagra a vedação absoluta à tortura e a tratamentos ou castigos cruéis, desumanos ou degradantes, princípio que, apesar da natureza declaratória originária da DUDH, é hoje amplamente reconhecido como norma de direito internacional consuetudinário e reproduzido em diversos tratados vinculantes posteriores, como a Convenção da ONU contra a Tortura. Exemplo: qualquer forma de tortura empregada por agentes de um Estado, ainda que sob justificativa de investigação criminal, viola diretamente esse princípio consagrado na DUDH desde 1948.$q$,
  '[]'::jsonb,
  'fácil', now()
);
