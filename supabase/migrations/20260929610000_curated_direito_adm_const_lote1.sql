-- Curated (authored) questions, Direito lote 1: Direito Administrativo e
-- Direito Constitucional. Original stems/explanations written from
-- scratch (general topics from the user's reference PDFs used only as
-- inspiration, no text reproduced). Full legal audit included for every
-- item: legal_audit_completed=true, law_version_checked_at=now(),
-- legal_basis citing the official Planalto-compiled text, and
-- syllabus_topic_id tied to the PF 2025 Agente edition, per
-- CONTENT_GOVERNANCE.md. Legal provisions cited here (CF/88 art. 37, Lei
-- 9.784/1999, Lei 8.112/1990) are foundational, long-stable dispositions
-- checked against the Planalto compiled text as of 2026-09-29.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-001',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Princípios da Administração Pública',
  $q$Julgue o item a seguir.
O princípio da publicidade, previsto no art. 37, caput, da Constituição Federal, exige a divulgação oficial dos atos administrativos como condição de eficácia, admitindo, contudo, exceções expressamente previstas na própria Constituição, como o sigilo necessário à segurança da sociedade e do Estado.$q$,
  'C',
  $q$Certo. O art. 37, caput, da CF/1988 lista a publicidade como um dos princípios expressos da administração pública (ao lado de legalidade, impessoalidade, moralidade e eficiência — o famoso "LIMPE"). A regra geral é que atos administrativos só produzem efeitos plenos após divulgados oficialmente, permitindo controle social e transparência. Mas a própria Constituição admite exceções ao acesso irrestrito à informação — o art. 5º, XXXIII, por exemplo, ressalva o sigilo "imprescindível à segurança da sociedade e do Estado" — mostrando que a publicidade, embora seja regra, não é absoluta.
Exemplo: é a mesma lógica de uma lei só valer para todos depois de publicada no Diário Oficial — mas informações sobre uma operação policial em andamento, por exemplo, podem legitimamente ficar sigilosas até não colocarem em risco a segurança da operação ou de terceiros.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-002',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Atributos do ato administrativo',
  $q$Julgue o item a seguir.
A autoexecutoriedade é o atributo pelo qual a administração pública pode executar diretamente suas decisões, sem necessidade de prévia autorização do Poder Judiciário, mas esse atributo não está presente em todos os atos administrativos, dependendo de previsão legal expressa ou de situação de urgência.$q$,
  'C',
  $q$Certo. A autoexecutoriedade permite que a administração ponha em prática suas próprias decisões (como a interdição de um estabelecimento irregular ou a apreensão de mercadoria) sem precisar, previamente, obter uma ordem judicial autorizando essa execução. Porém, a doutrina majoritária entende que esse atributo não é automático em todo ato administrativo: ele só existe quando a lei expressamente autoriza (como no poder de polícia) ou em situações de urgência que exijam atuação imediata da administração para proteger o interesse público — nos demais casos, a administração pode precisar recorrer ao Judiciário para executar coercitivamente sua decisão.
Exemplo: fiscais sanitários podem interditar imediatamente um restaurante com risco à saúde pública (autoexecutoriedade, por urgência e previsão legal), mas, para cobrar uma dívida de um particular que não pagou uma multa administrativa, a administração normalmente precisa acionar a Justiça (execução fiscal), pois não há autoexecutoriedade automática nesse caso.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-003',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Processo Administrativo Federal (Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
No processo administrativo federal, é assegurado ao interessado o direito de ser assistido por advogado, mas essa assistência não é, em regra, obrigatória para a validade dos atos praticados no processo.$q$,
  'C',
  $q$Certo. O art. 3º, IV, da Lei nº 9.784/1999 assegura ao administrado o direito de "fazer-se assistir, facultativamente, por advogado, salvo quando obrigatória a representação, por força de lei". A própria redação do dispositivo já deixa claro que a assistência por advogado é, em regra, facultativa (opcional) no processo administrativo, diferente do que ocorre, por exemplo, no processo judicial, em que a representação por advogado costuma ser exigida. Só em hipóteses específicas previstas em lei a representação por advogado se torna obrigatória.
Exemplo: um cidadão pode, sozinho, sem contratar advogado, apresentar um requerimento ou recurso administrativo perante um órgão público, participando plenamente do processo — diferente de uma ação judicial, em que a presença de advogado costuma ser exigida na maioria dos casos.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999 – Processo Administrativo Federal','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-004',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Processo Administrativo Federal (Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
O direito da administração pública federal de anular os atos administrativos de que decorram efeitos favoráveis para os destinatários decai em cinco anos, contados da data em que foram praticados, salvo comprovada má-fé.$q$,
  'C',
  $q$Certo. O art. 54, caput, da Lei nº 9.784/1999 estabelece exatamente esse prazo: "O direito da Administração de anular os atos administrativos de que decorram efeitos favoráveis para os destinatários decai em cinco anos, contados da data em que foram praticados, salvo comprovada má-fé". Esse prazo decadencial existe para dar segurança jurídica ao administrado que, de boa-fé, se beneficiou de um ato administrativo — depois de cinco anos, mesmo que o ato tenha algum vício, a administração perde o direito de anulá-lo, exceto se ficar provada má-fé do beneficiário.
Exemplo: se um servidor recebeu, de boa-fé, um benefício concedido por decisão administrativa com um pequeno vício técnico, e mais de cinco anos se passaram sem que ninguém questionasse isso, a administração já não pode mais anular esse benefício só por causa do vício original — a estabilidade da situação já se consolidou pelo decurso do prazo.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999 – Processo Administrativo Federal','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-005',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Regime Jurídico dos Servidores Públicos (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
A demissão é a penalidade disciplinar mais grave prevista para o servidor público civil federal, sendo aplicável, entre outras hipóteses, em caso de crime contra a administração pública, desde que apurado em processo administrativo disciplinar regular.$q$,
  'C',
  $q$Certo. A Lei nº 8.112/1990 prevê a demissão como a mais grave das penalidades disciplinares aplicáveis ao servidor público civil federal (art. 127, inciso V, prevendo a demissão entre as penalidades, ao lado de advertência, suspensão, cassação de aposentadoria/disponibilidade e destituição de cargo em comissão/função comissionada). Entre as hipóteses que ensejam demissão está a prática de crime contra a administração pública (art. 132), mas, como qualquer penalidade disciplinar, ela só pode ser aplicada após regular processo administrativo disciplinar (PAD), garantindo ao servidor o contraditório e a ampla defesa antes da decisão final.
Exemplo: um servidor suspeito de desviar recursos públicos não pode ser simplesmente demitido por decisão unilateral de um superior — é necessário instaurar um PAD, apurar os fatos, garantir a defesa do servidor, e só então, comprovada a infração, aplicar a demissão como penalidade.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-006',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Poder de polícia',
  $q$Julgue o item a seguir.
O poder de polícia administrativa consiste na faculdade que a administração pública tem de restringir e condicionar o exercício de direitos individuais em benefício do interesse público, e um de seus atributos é a coercibilidade, que permite a imposição de suas determinações independentemente da anuência do particular afetado.$q$,
  'C',
  $q$Certo. O poder de polícia é a atividade da administração que limita ou disciplina direitos individuais em favor do bem-estar coletivo, da segurança, da saúde e de outros interesses públicos — como acontece na fiscalização sanitária, no trânsito, na segurança de edificações etc. Entre seus atributos clássicos está a coercibilidade: as determinações decorrentes do poder de polícia podem ser impostas ao particular independentemente de sua concordância, já que se trata de uma manifestação de supremacia do interesse público sobre o interesse privado, diferentemente de uma relação contratual comum, em que a vontade das partes precisa convergir.
Exemplo: um fiscal municipal pode determinar a interdição de uma obra irregular independentemente de o proprietário concordar com isso — a coercibilidade permite que a decisão administrativa produza efeitos mesmo contra a vontade do particular, respeitados os limites legais e o direito de defesa posterior.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-001',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Direitos e garantias fundamentais',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Nos termos do art. 5º, caput, da Constituição Federal, os direitos e garantias fundamentais ali elencados são assegurados a brasileiros e a estrangeiros residentes no país, o que, segundo entendimento consolidado, não afasta sua aplicação também a estrangeiros em trânsito pelo território nacional, quanto aos direitos de natureza universal.$q$,
  'C',
  $q$Certo. O art. 5º, caput, da CF/1988 menciona, em sua literalidade, "brasileiros e estrangeiros residentes no País", mas a doutrina e a jurisprudência do STF consolidaram entendimento de que essa redação não deve ser interpretada restritivamente: direitos fundamentais de caráter universal (como o direito à vida, à dignidade, à integridade física, ao devido processo legal) são garantidos a qualquer pessoa que esteja em território brasileiro, independentemente de ser residente ou estar apenas em trânsito pelo país — a residência formal não é condição para o gozo dos direitos fundamentais mais essenciais.
Exemplo: um turista estrangeiro em viagem pelo Brasil, mesmo sem residir no país, tem direito ao devido processo legal caso seja preso, e não pode ser submetido a tortura ou tratamento degradante — a proteção constitucional a esses direitos básicos não depende de ele ter residência fixa em território nacional.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-002',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Segurança pública (art. 144, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Nos termos do art. 144, § 1º, da Constituição Federal, incumbe à Polícia Federal, entre outras atribuições, apurar infrações penais contra a ordem política e social ou em detrimento de bens, serviços e interesses da União ou de suas entidades autárquicas e empresas públicas.$q$,
  'C',
  $q$Certo. O art. 144, § 1º, inciso I, da CF/1988 estabelece justamente essa atribuição da Polícia Federal: "apurar infrações penais contra a ordem política e social ou em detrimento de bens, serviços e interesses da União ou de suas entidades autárquicas e empresas públicas, assim como outras infrações cuja prática tenha repercussão interestadual ou internacional e exija repressão uniforme". Esse dispositivo constitucional é a base jurídica de várias das competências investigativas mais amplas da PF, distinguindo-a das polícias civis estaduais, que têm competência mais restrita territorialmente.
Exemplo: crimes de corrupção envolvendo verbas federais, tráfico internacional de drogas ou crimes que atravessam fronteiras estaduais tendem a ser investigados pela Polícia Federal justamente por causa dessa atribuição constitucional específica, diferente de um furto comum numa loja, que é matéria de polícia civil estadual.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-003',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Remédios constitucionais',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O habeas corpus é o remédio constitucional cabível sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção, por ilegalidade ou abuso de poder, podendo ser impetrado por qualquer pessoa, em seu favor ou de outrem.$q$,
  'C',
  $q$Certo. O art. 5º, LXVIII, da CF/1988 prevê que "conceder-se-á habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de locomoção, por ilegalidade ou abuso de poder". É um instrumento de tutela específica da liberdade de ir e vir — por isso não serve para discutir, por exemplo, questões patrimoniais ou outros direitos que não envolvam diretamente a liberdade de locomoção. Além disso, diferentemente de outras ações que exigem capacidade postulatória (advogado), o habeas corpus pode ser impetrado por qualquer pessoa, mesmo sem formação jurídica, em benefício próprio ou de terceiro.
Exemplo: um cidadão comum pode impetrar habeas corpus em favor de um vizinho que acredita estar sendo preso ilegalmente, sem precisar de advogado para isso — basta que a ameaça ou violência à liberdade de locomoção decorra de ilegalidade ou abuso de poder.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'fácil', now()
);
