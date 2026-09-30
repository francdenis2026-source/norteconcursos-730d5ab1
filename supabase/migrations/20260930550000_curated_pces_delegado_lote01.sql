-- Curated (authored) questions for Polícia Civil do Estado do Espírito Santo
-- — Delegado de Polícia (2022): 30 questões cobrindo as 12 disciplinas do
-- edital. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '692800f2-0f05-4601-ab0a-e6e0653d6b08', 'pces22-crim-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Criminologia', 'Escola ecológica (Escola de Chicago)',
  $q$Julgue o item a seguir, com base na criminologia.
A Escola Ecológica (ou Escola de Chicago) associa a criminalidade a fatores ambientais e de desorganização social nas áreas urbanas, relacionando o aumento da criminalidade a características do espaço físico e social, como pobreza, mobilidade populacional e ausência de coesão comunitária, e não apenas a características individuais do agente.$q$,
  'C',
  $q$Certo. A Escola Ecológica, desenvolvida a partir de estudos da Universidade de Chicago, propôs que a criminalidade estaria relacionada às características do ambiente urbano e à desorganização social de determinadas áreas (mobilidade populacional intensa, pobreza, ausência de controle social informal), deslocando parte da explicação criminológica do indivíduo isolado para o contexto socioespacial em que ele está inserido. Exemplo: bairros com alta rotatividade populacional e baixa coesão comunitária tendem, segundo essa escola, a apresentar taxas de criminalidade mais elevadas, independentemente das características pessoais de seus moradores.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '692800f2-0f05-4601-ab0a-e6e0653d6b08', 'pces22-crim-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Criminologia', 'Prevenção primária, secundária e terciária',
  $q$Julgue o item a seguir, com base na criminologia.
A prevenção primária atua sobre as causas estruturais e sociais da criminalidade antes que o delito ocorra, por meio de políticas públicas amplas como educação e emprego, distinguindo-se da prevenção secundária, voltada a grupos de risco específicos, e da terciária, dirigida a quem já praticou o delito, visando evitar a reincidência.$q$,
  'C',
  $q$Certo. A classificação da prevenção criminal em níveis (primária, secundária e terciária) organiza as estratégias de política criminal conforme o público-alvo e o momento de intervenção: a primária atua amplamente sobre causas estruturais antes da ocorrência do delito, a secundária foca em grupos ou situações identificadas como de maior risco, e a terciária concentra-se em quem já cometeu crimes, buscando reduzir a reincidência por meio de ressocialização. Exemplo: um programa de melhoria educacional em bairros vulneráveis é prevenção primária; um programa de acompanhamento de egressos do sistema prisional é prevenção terciária.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '76a90dc8-3a1e-479f-8623-d40a78f2dff2', 'pces22-adm-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Administrativo', 'Pregão (Lei 10.520/2002)',
  $q$Julgue o item a seguir, com base na Lei nº 10.520/2002.
O pregão, modalidade de licitação instituída para aquisição de bens e serviços comuns, tem como critério de julgamento o menor preço, sendo caracterizado pela inversão das fases de habilitação e julgamento das propostas em relação às modalidades tradicionais da antiga Lei nº 8.666/1993.$q$,
  'C',
  $q$Certo. A Lei nº 10.520/2002 instituiu o pregão como modalidade licitatória célere, restrita a bens e serviços comuns, com julgamento pelo critério de menor preço (ou maior desconto, conforme evoluções posteriores), e caracterizada pela inversão de fases: primeiro se julgam as propostas de preço, e somente depois se verifica a habilitação do licitante vencedor, agilizando o processo em relação ao rito tradicional então vigente na Lei nº 8.666/1993. Exemplo: a aquisição de material de escritório padronizado por uma delegacia pode ser feita por pregão, com julgamento imediato pelo menor preço ofertado.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 10.520/2002, art. 4º','url','https://www.planalto.gov.br/ccivil_03/leis/2002/l10520.htm')),
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '76a90dc8-3a1e-479f-8623-d40a78f2dff2', 'pces22-adm-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Administrativo', 'Classificação dos atos de improbidade (Lei 8.429/1992)',
  $q$Julgue o item a seguir, com base na Lei nº 8.429/1992.
A Lei de Improbidade Administrativa classifica os atos ímprobos em três categorias — os que importam enriquecimento ilícito, os que causam prejuízo ao erário e os que atentam contra os princípios da administração pública — impondo sanções que podem incluir perda da função pública, suspensão de direitos políticos e ressarcimento ao erário.$q$,
  'C',
  $q$Certo. Os arts. 9º, 10 e 11 da Lei nº 8.429/1992 estruturam a tipologia dos atos de improbidade administrativa em três categorias distintas, cada uma com gravidade e sanções próprias, sendo as consequências previstas no art. 12 da lei (perda da função pública, suspensão de direitos políticos, ressarcimento ao erário, entre outras) graduadas conforme a categoria e a gravidade do ato praticado. Exemplo: um agente público que recebe vantagem indevida para favorecer terceiro em processo licitatório pode responder por ato de improbidade que importa enriquecimento ilícito.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.429/1992, arts. 9º-12','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm')),
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '76a90dc8-3a1e-479f-8623-d40a78f2dff2', 'pces22-adm-03',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Administrativo', 'Garantias em contratos administrativos (Lei 8.666/1993)',
  $q$Julgue o item a seguir, com base na Lei nº 8.666/1993.
A critério da autoridade competente, em cada caso, pode ser exigida, na licitação, prestação de garantia nas contratações de obras, serviços e compras, podendo o contratado optar por caução em dinheiro ou títulos da dívida pública, seguro-garantia, ou fiança bancária.$q$,
  'C',
  $q$Certo. O art. 56 da Lei nº 8.666/1993 faculta à Administração exigir garantia contratual nas licitações de obras, serviços e compras, cabendo ao contratado a escolha entre as modalidades previstas em lei (caução em dinheiro ou títulos da dívida pública, seguro-garantia, ou fiança bancária), instrumento que visa assegurar o cumprimento das obrigações contratuais assumidas. Exemplo: em um contrato de obra pública de grande vulto, a Administração pode exigir do contratado a apresentação de seguro-garantia como condição para a celebração do contrato.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.666/1993, art. 56','url','https://www.planalto.gov.br/ccivil_03/leis/l8666cons.htm')),
  'difícil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '6ea55165-91c8-4204-8c53-4aaeb0f6e75f', 'pces22-civil-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Civil', 'Prescrição da pretensão de reparação civil (art. 206, § 3º, V, CC)',
  $q$Julgue o item a seguir, com base no Código Civil.
Prescreve em três anos a pretensão de reparação civil, prazo aplicável, em regra, às ações indenizatórias decorrentes de responsabilidade civil extracontratual.$q$,
  'C',
  $q$Certo. O art. 206, § 3º, inciso V, do Código Civil fixa em três anos o prazo prescricional para a pretensão de reparação civil, aplicável, como regra geral, às ações de indenização por dano moral ou material decorrentes de responsabilidade civil extracontratual, prazo mais curto do que o prazo geral decenal previsto no art. 205 do mesmo Código. Exemplo: a vítima de um acidente de trânsito tem, em regra, o prazo de três anos, a partir da ciência do dano e de sua autoria, para ajuizar ação de reparação civil contra o responsável.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Civil, art. 206, § 3º, V','url','https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm')),
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '6ea55165-91c8-4204-8c53-4aaeb0f6e75f', 'pces22-civil-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Civil', 'Cláusula resolutiva expressa (art. 474, CC)',
  $q$Julgue o item a seguir, com base no Código Civil.
A cláusula resolutiva expressa opera de pleno direito, dispensando a necessidade de interpelação judicial para a resolução do contrato em caso de inadimplemento, ao passo que a cláusula resolutiva tácita depende de interpelação judicial para produzir esse efeito.$q$,
  'C',
  $q$Certo. O art. 474 do Código Civil estabelece que a cláusula resolutiva expressa, prevista pelas próprias partes no contrato, opera automaticamente com o inadimplemento, sem necessidade de intervenção judicial prévia para desconstituir o vínculo contratual, diferentemente da cláusula resolutiva tácita (implícita em todo contrato bilateral, art. 475), que exige interpelação judicial para produzir a resolução. Exemplo: um contrato de compra e venda que preveja expressamente a resolução automática em caso de atraso no pagamento dispensa o credor de buscar previamente o Judiciário para considerar o contrato resolvido.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Civil, art. 474','url','https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm')),
  'difícil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', 'aa472aca-c472-498c-9b2a-050441ed3824', 'pces22-const-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Constitucional', 'Objetivos fundamentais da República (art. 3º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Constituem objetivos fundamentais da República Federativa do Brasil construir uma sociedade livre, justa e solidária; garantir o desenvolvimento nacional; erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais; e promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação.$q$,
  'C',
  $q$Certo. O art. 3º da Constituição Federal elenca os objetivos fundamentais da República, que representam metas a serem perseguidas pelo Estado brasileiro em suas políticas e ações, servindo também de parâmetro interpretativo para a aplicação de outras normas constitucionais e infraconstitucionais voltadas à redução de desigualdades e à promoção da igualdade material. Exemplo: políticas públicas de transferência de renda voltadas à redução da pobreza concretizam diretamente o objetivo fundamental de erradicação da pobreza e da marginalização.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 3º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', 'aa472aca-c472-498c-9b2a-050441ed3824', 'pces22-const-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Constitucional', 'Intervenção do Estado no Município (art. 35, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O Estado não intervirá em seus municípios, exceto quando não for paga, sem motivo de força maior, por dois anos consecutivos, a dívida fundada; não forem prestadas as contas devidas; não tiver sido aplicado o mínimo exigido da receita municipal na manutenção do ensino e nas ações de saúde; ou o Tribunal de Justiça der provimento a representação para assegurar a observância de princípios indicados na Constituição Estadual.$q$,
  'C',
  $q$Certo. O art. 35 da Constituição Federal disciplina as hipóteses taxativas em que o estado-membro pode intervir em seus municípios, medida excepcional de restrição à autonomia municipal, cabível apenas nas situações expressamente previstas, como o não pagamento de dívida fundada, a ausência de prestação de contas, o descumprimento dos mínimos constitucionais de investimento em educação e saúde, ou decisão do Tribunal de Justiça em representação interventiva. Exemplo: um município que deixa de aplicar o percentual mínimo constitucional em ações de saúde pode, em tese, sofrer intervenção estadual com base nesse dispositivo.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 35','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', 'aa472aca-c472-498c-9b2a-050441ed3824', 'pces22-const-03',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Constitucional', 'Criação e desmembramento de municípios (art. 18, § 4º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A criação, a incorporação, a fusão e o desmembramento de municípios far-se-ão por lei estadual, dentro do período determinado por lei complementar federal, dependendo de consulta prévia, mediante plebiscito, às populações dos municípios envolvidos, e da divulgação dos Estudos de Viabilidade Municipal.$q$,
  'C',
  $q$Certo. O art. 18, § 4º, da Constituição Federal, com redação dada pela EC nº 15/1996, exige, para a criação ou reorganização territorial de municípios, lei estadual editada dentro do período fixado por lei complementar federal, consulta prévia às populações diretamente interessadas por meio de plebiscito, e a divulgação dos Estudos de Viabilidade Municipal, medidas que visam evitar a criação desordenada e sem embasamento técnico de novos municípios. Exemplo: a criação de um novo município a partir do desmembramento de parte do território de outro depende de plebiscito prévio junto à população da área a ser desmembrada.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 18, § 4º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '1125c080-adb6-4220-a6fb-80a93fc20762', 'pces22-penal-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Penal', 'Erro sobre a pessoa (art. 20, § 3º, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
No erro quanto à pessoa contra a qual o crime é praticado, não se consideram as condições ou qualidades da vítima efetiva, senão as da pessoa contra quem o agente queria praticar o crime.$q$,
  'C',
  $q$Certo. O art. 20, § 3º, do Código Penal disciplina o erro sobre a pessoa (error in persona), determinando que, para fins de análise das circunstâncias do crime, considera-se a vítima virtual (aquela que o agente pretendia atingir), e não a vítima real efetivamente atingida por engano, o que pode influenciar, por exemplo, o reconhecimento de qualificadoras relacionadas às condições pessoais da vítima. Exemplo: se o agente, por confundir a vítima, mata o pai ao invés do padrasto pretendido, considera-se, para fins de agravantes relacionadas a relação de parentesco, a condição da vítima virtual (padrasto), e não da vítima real (pai), conforme a intenção original do agente.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 20, § 3º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '1125c080-adb6-4220-a6fb-80a93fc20762', 'pces22-penal-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Penal', 'Perdão judicial e suspensão condicional da pena',
  $q$Julgue o item a seguir, com base no Código Penal e na Súmula nº 18 do STJ.
O perdão judicial, quando previsto em lei, extingue a punibilidade sem gerar reincidência, ao passo que a suspensão condicional da pena (sursis) suspende a execução da pena privativa de liberdade por determinado período, mediante condições impostas ao condenado.$q$,
  'C',
  $q$Certo. O perdão judicial, nas hipóteses previstas em lei, deixa de aplicar a pena ao agente em razão de circunstâncias específicas do caso concreto (como no homicídio culposo em que o próprio agente sofre consequências graves), e a Súmula nº 18 do STJ estabelece que a sentença concessiva do perdão judicial não constitui reincidência para efeitos penais; já a suspensão condicional da pena (art. 77 do CP) permite a suspensão da execução de pena privativa de liberdade de curta duração, mediante o cumprimento de condições fixadas judicialmente durante o período de prova. Exemplo: um motorista que, em acidente culposo, perde um filho e é condenado por homicídio culposo pode ser beneficiado pelo perdão judicial, sem que isso gere reincidência em condenação futura.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, arts. 77 e 121, § 5º; Súmula nº 18 do STJ','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '1125c080-adb6-4220-a6fb-80a93fc20762', 'pces22-penal-03',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Penal', 'Furto qualificado pelo repouso noturno (art. 155, § 1º, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
A pena do crime de furto aumenta-se de um terço se o crime é praticado durante o repouso noturno.$q$,
  'C',
  $q$Certo. O art. 155, § 1º, do Código Penal prevê causa especial de aumento de pena para o furto praticado durante o repouso noturno, período em que se presume maior vulnerabilidade das vítimas e maior facilidade para a prática do crime, sendo entendimento consolidado que essa majorante se aplica também ao furto qualificado, e não apenas ao simples. Exemplo: um furto cometido de madrugada, em residência onde os moradores dormiam, sofre o acréscimo de um terço na pena, em razão do repouso noturno.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 155, § 1º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '70a9a33a-7425-41ce-b9d4-e14738231dbd', 'pces22-proc-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Processual Penal', 'Federalização de investigações — IDC (art. 109, § 5º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Compete à Justiça Federal, em casos de grave violação de direitos humanos, mediante incidente de deslocamento de competência suscitado pelo Procurador-Geral da República perante o Superior Tribunal de Justiça, a apuração e o julgamento de crimes que, em tese, violem tratados internacionais de direitos humanos dos quais o Brasil seja parte.$q$,
  'C',
  $q$Certo. O art. 109, § 5º, da Constituição Federal, incluído pela EC nº 45/2004, criou o incidente de deslocamento de competência (IDC), mecanismo excepcional que permite o deslocamento de investigações e processos relativos a graves violações de direitos humanos para a Justiça Federal, mediante provocação do Procurador-Geral da República e decisão do Superior Tribunal de Justiça, com o objetivo de assegurar o cumprimento de obrigações internacionais do Brasil na matéria. Exemplo: um caso de homicídio de defensor de direitos humanos, inicialmente investigado pela polícia estadual, pode, em situações excepcionais, ter sua competência deslocada para a esfera federal por meio do IDC.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 109, § 5º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '70a9a33a-7425-41ce-b9d4-e14738231dbd', 'pces22-proc-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Processual Penal', 'Uso de algemas (Súmula Vinculante 11)',
  $q$Julgue o item a seguir, com base na Súmula Vinculante nº 11 do STF.
Só é lícito o uso de algemas em casos de resistência e de fundado receio de fuga ou de perigo à integridade física própria ou alheia, por parte do preso ou de terceiros, justificada a excepcionalidade por escrito, sob pena de responsabilidade disciplinar, civil e penal do agente ou da autoridade e de nulidade da prisão ou do ato processual a que se refere.$q$,
  'C',
  $q$Certo. A Súmula Vinculante nº 11 do STF restringe o uso de algemas às hipóteses de resistência, fundado receio de fuga ou risco à integridade física, exigindo justificativa escrita da excepcionalidade da medida, sob pena de responsabilização do agente e de nulidade do ato processual praticado sob uso irregular de algemas, buscando resguardar a dignidade e a presunção de inocência do preso. Exemplo: algemar um preso dócil e sem histórico de violência, sem justificativa escrita da necessidade da medida, pode ensejar responsabilização do agente e até nulidade de atos processuais relacionados.$q$,
  jsonb_build_array(jsonb_build_object('title','Súmula Vinculante nº 11 do STF','url','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp')),
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '70a9a33a-7425-41ce-b9d4-e14738231dbd', 'pces22-proc-03',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direito Processual Penal', 'Busca domiciliar — finalidades (art. 240, § 1º, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Proceder-se-á à busca domiciliar para, entre outras finalidades, prender criminosos, apreender coisas achadas ou obtidas por meios criminosos, apreender instrumentos de falsificação ou de contrafação, ou colher qualquer elemento de convicção.$q$,
  'C',
  $q$Certo. O art. 240, § 1º, do Código de Processo Penal elenca as finalidades que autorizam a busca domiciliar, medida que, em regra, depende de mandado judicial (ressalvadas as hipóteses constitucionais de flagrante, desastre, socorro ou consentimento do morador), abrangendo desde a captura de foragidos até a apreensão de bens e instrumentos relacionados à prática criminosa e a colheita de provas relevantes à investigação. Exemplo: um mandado de busca e apreensão pode ser expedido para localizar tanto um objeto furtado quanto documentos que sirvam de prova em uma investigação de corrupção.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 240, § 1º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', 'd227f34d-13ef-443a-84de-6188c887e614', 'pces22-dh-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direitos Humanos', 'Código de Conduta da ONU para Funcionários da Lei (Resolução 34/169)',
  $q$Julgue o item a seguir, com base no Código de Conduta para os Funcionários Responsáveis pela Aplicação da Lei (ONU, Resolução nº 34/169).
O Código de Conduta estabelece que os funcionários responsáveis pela aplicação da lei devem cumprir, a todo momento, os deveres que a lei lhes impõe, protegendo todas as pessoas contra atos ilegais, de forma compatível com o alto grau de responsabilidade exigido por sua profissão.$q$,
  'C',
  $q$Certo. O Código de Conduta para os Funcionários Responsáveis pela Aplicação da Lei, adotado pela Resolução nº 34/169 da Assembleia Geral da ONU em 1979, estabelece parâmetros éticos e de conduta para policiais e demais agentes de segurança pública no exercício de suas funções, reforçando a responsabilidade especial desses profissionais na proteção dos direitos e da segurança de todos os cidadãos, sem discriminação. Exemplo: um policial que atua com parcialidade e omissão diante de uma ilegalidade em curso descumpre os padrões estabelecidos por esse código de conduta internacional.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', 'd227f34d-13ef-443a-84de-6188c887e614', 'pces22-dh-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direitos Humanos', 'Lei nº 13.060/2014 — instrumentos de menor potencial ofensivo',
  $q$Julgue o item a seguir, com base na Lei nº 13.060/2014.
A Lei nº 13.060/2014 disciplina o uso dos instrumentos de menor potencial ofensivo pelos agentes de segurança pública em todo o território nacional, estabelecendo que a utilização de tais instrumentos deve observar os princípios da legalidade, necessidade, razoabilidade e proporcionalidade.$q$,
  'C',
  $q$Certo. A Lei nº 13.060/2014 regulamenta o emprego de instrumentos de menor potencial ofensivo (como armas de eletrochoque e munições de impacto controlado) pelos agentes de segurança pública, submetendo essa utilização a princípios que buscam limitar o uso da força ao estritamente necessário e proporcional à situação enfrentada, alinhando a legislação nacional a parâmetros internacionais de direitos humanos sobre o uso da força. Exemplo: o uso de arma de eletrochoque contra uma pessoa já contida e sem resistência violaria os princípios de necessidade e proporcionalidade exigidos por essa lei.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.060/2014','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13060.htm')),
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', 'd227f34d-13ef-443a-84de-6188c887e614', 'pces22-dh-03',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Direitos Humanos', 'Convenção contra a Tortura (Decreto nº 40/1991)',
  $q$Julgue o item a seguir, com base no Decreto nº 40/1991.
A Convenção da ONU contra a Tortura e Outros Tratamentos ou Penas Cruéis, Desumanos ou Degradantes, internalizada no Brasil pelo Decreto nº 40/1991, obriga os Estados-partes a tomarem medidas legislativas, administrativas, judiciais e de outra índole eficazes para impedir a prática de tortura em qualquer território sob sua jurisdição.$q$,
  'C',
  $q$Certo. O Decreto nº 40/1991 promulgou, no Brasil, a Convenção contra a Tortura adotada pela ONU em 1984, impondo aos Estados-partes o dever de adotar medidas efetivas de prevenção e repressão à tortura, o que, no ordenamento brasileiro, se materializou, entre outras normas, na própria Lei nº 9.455/1997, que tipifica o crime de tortura em cumprimento a essa obrigação internacional. Exemplo: a edição de lei penal específica tipificando a tortura como crime autônomo é uma das medidas legislativas exigidas pela Convenção para seu efetivo cumprimento.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 40/1991','url','https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0040.htm')),
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '463e1e81-3708-41dc-a575-cef35d657e65', 'pces22-estatuto-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Estatuto dos Policiais Civis do Espírito Santo (LC 46/1994)', 'Hierarquia e disciplina',
  $q$Julgue o item a seguir, com base no Estatuto dos Policiais Civis do Espírito Santo (Lei Complementar nº 46/1994).
O Estatuto dos Policiais Civis do Espírito Santo estabelece que os servidores da carreira policial civil estão sujeitos aos princípios da hierarquia e da disciplina, elementos essenciais à organização e ao funcionamento da corporação.$q$,
  'C',
  $q$Certo. A exemplo dos estatutos que regem as carreiras policiais em outros estados, o Estatuto dos Policiais Civis do Espírito Santo estrutura a corporação sob os princípios da hierarquia (relação de subordinação escalonada entre os diferentes níveis funcionais) e da disciplina (observância dos deveres funcionais e das ordens legais emanadas dos superiores), elementos considerados essenciais ao funcionamento ordenado de instituições policiais. Exemplo: um investigador de polícia deve observar as determinações funcionais emanadas de seu delegado-chefe, em razão do princípio da hierarquia que rege a carreira.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '463e1e81-3708-41dc-a575-cef35d657e65', 'pces22-estatuto-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Estatuto dos Policiais Civis do Espírito Santo (LC 46/1994)', 'Suspensão preventiva',
  $q$Julgue o item a seguir, com base no Estatuto dos Policiais Civis do Espírito Santo (Lei Complementar nº 46/1994).
O Estatuto prevê a possibilidade de suspensão preventiva do servidor policial civil, como medida cautelar administrativa aplicável durante a apuração de infração disciplinar, quando a permanência do servidor em suas funções possa comprometer a investigação ou representar risco à ordem do serviço.$q$,
  'C',
  $q$Certo. A suspensão preventiva é medida cautelar de natureza administrativa, prevista em estatutos de carreiras policiais para situações em que a manutenção do servidor investigado em suas atividades regulares possa comprometer a apuração dos fatos ou representar risco à ordem do serviço, distinguindo-se da sanção disciplinar definitiva, que só é aplicada após a conclusão do devido processo administrativo. Exemplo: um policial civil investigado por suspeita de vazamento de informações sigilosas de uma investigação em curso pode ser preventivamente afastado de suas funções até a conclusão da apuração administrativa correspondente.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '577ed4a6-4bd1-499c-8dcd-5089c65b8fde', 'pces22-leg-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Legislação Penal Especial', 'Competência dos Juizados de Violência Doméstica (Lei 11.340/2006)',
  $q$Julgue o item a seguir, com base na Lei nº 11.340/2006 (Lei Maria da Penha).
Os Juizados de Violência Doméstica e Familiar contra a Mulher têm competência cível e criminal para os casos abrangidos pela lei, podendo processar, julgar e executar tanto as causas decorrentes da prática de violência doméstica quanto as medidas protetivas de urgência.$q$,
  'C',
  $q$Certo. O art. 14 da Lei nº 11.340/2006 atribui aos Juizados de Violência Doméstica e Familiar contra a Mulher competência híbrida, cível e criminal, concentrando em um único órgão jurisdicional o processamento das questões penais decorrentes do crime e das medidas protetivas de natureza cível, o que confere maior celeridade e efetividade na proteção da vítima. Exemplo: o mesmo juizado pode, no mesmo contexto processual, julgar o crime de lesão corporal praticado no âmbito doméstico e decidir sobre a concessão de medida protetiva de afastamento do agressor.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.340/2006, art. 14','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm')),
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '577ed4a6-4bd1-499c-8dcd-5089c65b8fde', 'pces22-leg-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Legislação Penal Especial', 'Tráfico de drogas — natureza permanente da conduta de guardar/depositar (art. 33, Lei 11.343/2006)',
  $q$Julgue o item a seguir, com base na Lei nº 11.343/2006 (Lei de Drogas).
O crime de tráfico de drogas é de natureza permanente quanto às condutas de "guardar" ou "ter em depósito", protraindo-se a consumação no tempo enquanto persistir a posse da droga para fins de comércio, o que permite a prisão em flagrante a qualquer momento durante essa permanência.$q$,
  'C',
  $q$Certo. Entre os diversos verbos do tipo do art. 33 da Lei nº 11.343/2006, condutas como "guardar" e "ter em depósito" caracterizam crime permanente, cuja consumação se prolonga no tempo enquanto durar a situação de posse da droga para fins de tráfico, o que tem relevante consequência prática: a possibilidade de prisão em flagrante a qualquer momento durante essa permanência, sem necessidade de flagrar o agente no exato instante da aquisição da droga. Exemplo: um traficante que mantém drogas armazenadas em sua residência pode ser preso em flagrante em qualquer dia em que a droga ainda estiver em seu poder, mesmo que a aquisição tenha ocorrido dias antes.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.343/2006, art. 33','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm')),
  'difícil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '577ed4a6-4bd1-499c-8dcd-5089c65b8fde', 'pces22-leg-03',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Legislação Penal Especial', 'ECA — dever de comunicação de maus-tratos (art. 13)',
  $q$Julgue o item a seguir, com base na Lei nº 8.069/1990 (Estatuto da Criança e do Adolescente).
Os casos de suspeita ou confirmação de maus-tratos contra criança ou adolescente serão obrigatoriamente comunicados ao Conselho Tutelar da respectiva localidade, sem prejuízo de outras providências legais, configurando o descumprimento dessa obrigação infração administrativa sujeita a multa.$q$,
  'C',
  $q$Certo. O art. 13 do Estatuto da Criança e do Adolescente impõe dever de comunicação ao Conselho Tutelar diante de casos suspeitos ou confirmados de maus-tratos contra crianças e adolescentes, obrigação que recai especialmente sobre profissionais de saúde, educação e assistência social, sendo o descumprimento dessa obrigação tipificado como infração administrativa sujeita a multa, nos termos do art. 245 do mesmo Estatuto. Exemplo: um profissional de saúde que identifica sinais de maus-tratos em uma criança atendida deve, obrigatoriamente, comunicar o fato ao Conselho Tutelar, sob pena de responder por infração administrativa em caso de omissão.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.069/1990, arts. 13 e 245','url','https://www.planalto.gov.br/ccivil_03/leis/l8069.htm')),
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', 'fcd68472-0046-49b7-b01e-505b840eeaac', 'pces22-port-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Língua Portuguesa', 'Coesão referencial — elipse',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A elipse é mecanismo de coesão textual que consiste na omissão de um termo facilmente recuperável pelo contexto, evitando repetições desnecessárias e conferindo maior fluidez ao texto.$q$,
  'C',
  $q$Certo. A elipse é recurso coesivo que permite omitir um termo já mencionado ou facilmente inferível pelo contexto textual, sem prejuízo da compreensão, contribuindo para evitar repetições desnecessárias e tornar a redação mais fluida e econômica. Exemplo: em "O delegado assinou o auto; o escrivão, o relatório", há elipse do verbo "assinou" na segunda oração, facilmente recuperável pelo contexto da primeira.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', 'fcd68472-0046-49b7-b01e-505b840eeaac', 'pces22-port-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Língua Portuguesa', 'Reescrita de segmentos — equivalência semântica',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A reescrita de um segmento textual deve preservar o sentido original da frase, ainda que sejam empregadas estruturas sintáticas ou vocabulário diferentes, sendo incorreta a reescrita que altere a relação lógica original entre as ideias.$q$,
  'C',
  $q$Certo. Ao reescrever um trecho de texto, é fundamental preservar a relação de sentido original entre as ideias (causa, consequência, condição, concessão, entre outras), ainda que se altere a estrutura sintática ou o vocabulário empregado, sendo considerada incorreta qualquer reescrita que distorça essa relação lógica, como transformar uma relação causal em uma meramente aditiva. Exemplo: reescrever "Como estava chovendo, a operação foi adiada" (relação causal) como "Estava chovendo e a operação foi adiada" altera sutilmente a relação lógica original, de causa explícita para mera adição de fatos.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '51bbef14-44f6-47dc-96cd-3a71576d88f8', 'pces22-medlegal-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Medicina Legal', 'Identificação civil — sistema de Vucetich',
  $q$Julgue o item a seguir, com base na medicina legal e na papiloscopia.
O sistema de classificação datiloscópica de Juan Vucetich, adotado no Brasil, organiza as impressões digitais em quatro tipos fundamentais (arco, presilha interna, presilha externa e verticilo), servindo de base para os sistemas de identificação civil e criminal ainda hoje utilizados.$q$,
  'C',
  $q$Certo. O sistema Vucetich, desenvolvido pelo criminologista argentino Juan Vucetich no final do século XIX, classifica as impressões digitais em quatro tipos fundamentais de desenhos papilares (arco, presilha interna, presilha externa e verticilo), método que se tornou base para diversos sistemas de identificação civil e criminal adotados em países da América Latina, incluindo o Brasil. Exemplo: a classificação datiloscópica utilizada em documentos de identidade civil brasileiros historicamente se fundamenta nos princípios do sistema Vucetich.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '51bbef14-44f6-47dc-96cd-3a71576d88f8', 'pces22-medlegal-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Medicina Legal', 'Lesões por projétil de arma de fogo — orifícios de entrada e saída',
  $q$Julgue o item a seguir, com base na medicina legal.
No exame de lesões por projétil de arma de fogo, o orifício de entrada geralmente apresenta bordas invertidas (para dentro) e, quando o disparo é feito a curta distância, pode apresentar halo de contusão e resíduos de pólvora, características que auxiliam a perícia a diferenciar o orifício de entrada do de saída.$q$,
  'C',
  $q$Certo. A perícia balística e de lesões por arma de fogo utiliza características específicas para distinguir o orifício de entrada (em regra, bordas invertidas para dentro, podendo apresentar halo de contusão e resíduos de pólvora em disparos de curta distância) do orifício de saída (em regra, bordas evertidas para fora, sem esses sinais associados ao disparo), elementos fundamentais para reconstituir a dinâmica do evento e a trajetória do projétil. Exemplo: a identificação de resíduos de pólvora ao redor de uma lesão pode indicar disparo efetuado a curta distância, dado relevante para diferenciar, por exemplo, hipóteses de suicídio e homicídio.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '2ec1ffe4-2ebd-4f6c-b4e1-4a520ecae45c', 'pces22-info-01',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Noções de Informática', 'Compactação de arquivos no Windows',
  $q$Julgue o item a seguir, com base em noções de informática.
A compactação de arquivos no Windows permite reduzir o espaço de armazenamento ocupado por um ou mais arquivos, agrupando-os em um único arquivo compactado (como .zip), o que também facilita o compartilhamento de múltiplos arquivos como um único item.$q$,
  'C',
  $q$Certo. A funcionalidade de compactação nativa do Windows permite reunir um ou mais arquivos e pastas em um único arquivo compactado, reduzindo o espaço de armazenamento ocupado e simplificando o compartilhamento, já que múltiplos itens podem ser transferidos ou anexados como um único arquivo compactado, em vez de vários arquivos separados. Exemplo: antes de enviar por e-mail vários documentos de um processo, o usuário pode compactá-los em um único arquivo .zip para facilitar o envio.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '3072439a-64fc-41ad-807d-e578b19e6868', '2ec1ffe4-2ebd-4f6c-b4e1-4a520ecae45c', 'pces22-info-02',
  'Polícia Civil do Estado do Espírito Santo', 2022, 'Delegado de Polícia', 'CEBRASPE', 'Noções de Informática', 'Memória ROM',
  $q$Julgue o item a seguir, com base em noções de informática.
A memória ROM (Read-Only Memory) é um tipo de memória não volátil, cujo conteúdo geralmente não pode ser alterado pelo usuário durante o uso normal do equipamento, sendo utilizada para armazenar instruções essenciais de inicialização do sistema, como a BIOS/firmware.$q$,
  'C',
  $q$Certo. A ROM é memória não volátil (mantém seu conteúdo mesmo sem energia elétrica) destinada ao armazenamento de instruções essenciais e geralmente fixas do sistema, como as rotinas de inicialização (BIOS/firmware), diferindo da memória RAM, que é volátil e utilizada para armazenamento temporário de dados durante a execução de programas. Exemplo: as instruções básicas que permitem ao computador iniciar antes mesmo de carregar o sistema operacional estão armazenadas em memória ROM (ou tecnologias correlatas, como a memória flash da BIOS moderna).$q$,
  '[]'::jsonb,
  'fácil', now()
);
