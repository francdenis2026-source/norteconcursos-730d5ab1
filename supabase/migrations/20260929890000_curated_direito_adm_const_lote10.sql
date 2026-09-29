-- Curated (authored) questions, Direito lote 29: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-027',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Controle da administração pública',
  $q$Julgue o item a seguir.
O controle da administração pública pode ser classificado, quanto ao órgão que o exerce, em controle administrativo (exercido pela própria administração sobre seus atos), controle legislativo (exercido pelo Poder Legislativo, com o auxílio do Tribunal de Contas) e controle judicial (exercido pelo Poder Judiciário), sendo este último, em regra, limitado ao exame da legalidade dos atos administrativos, sem adentrar no mérito de decisões discricionárias.$q$,
  'C',
  $q$Certo. Essa classificação tripartite do controle da administração pública, quanto ao órgão controlador, é amplamente reconhecida na doutrina: controle ADMINISTRATIVO (também chamado de autotutela), exercido pela própria administração sobre seus próprios atos, permitindo anulação de atos ilegais e revogação de atos inconvenientes; controle LEGISLATIVO, exercido pelo Poder Legislativo, com auxílio técnico do Tribunal de Contas, fiscalizando aspectos contábeis, financeiros, orçamentários, operacionais e patrimoniais da administração; e controle JUDICIAL, exercido pelo Poder Judiciário, que, em regra, se limita a examinar a legalidade dos atos administrativos, sem adentrar no mérito administrativo propriamente dito (a conveniência e oportunidade de decisões discricionárias), respeitando a separação de Poderes, salvo quando o próprio exercício da discricionariedade extrapolar os limites da razoabilidade e da proporcionalidade.
Exemplo: o Judiciário pode anular um ato administrativo que viole diretamente a lei (controle de legalidade), mas, em regra, não pode substituir a avaliação do administrador sobre qual seria a melhor decisão dentro de uma margem de escolha legalmente conferida a ele (o chamado mérito administrativo), salvo em casos de flagrante desproporcionalidade ou desvio de finalidade.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-028',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Acesso aos autos do processo administrativo (Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
O órgão competente perante o qual tramita o processo administrativo determinará a intimação do interessado para ciência de decisão ou a efetivação de diligências, devendo constar da intimação, entre outros elementos, o prazo e o local em que o processo poderá ser examinado, sendo assegurado ao interessado, em regra, o direito de vista dos autos.$q$,
  'C',
  $q$Certo. O art. 26 da Lei nº 9.784/1999 disciplina a intimação no processo administrativo, exigindo que dela constem, entre outros elementos previstos no § 1º, a identificação do intimado e nome do órgão ou entidade administrativa, a finalidade da intimação, a data, hora e local em que deve comparecer, e informação sobre o direito de se fazer representar. O art. 3º, inciso II, da mesma lei já assegura, como direito básico do administrado, "ter ciência da tramitação dos processos administrativos em que tenha a condição de interessado, ter vista dos autos, obter cópias de documentos neles contidos e conhecer as decisões proferidas" — reforçando o princípio da publicidade e da transparência processual, essencial ao exercício efetivo do contraditório e da ampla defesa pelo interessado no processo.
Exemplo: um servidor investigado em processo administrativo disciplinar tem, em regra, o direito de consultar os autos do processo, obter cópias de documentos relevantes e acompanhar seu andamento, o que é fundamental para que ele possa construir sua defesa de forma informada e efetiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999 – Processo Administrativo Federal','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-018',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Imunidades parlamentares',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Os Deputados e Senadores são invioláveis, civil e penalmente, por quaisquer de suas opiniões, palavras e votos, imunidade material que, diferentemente da imunidade formal (relativa a prisão e processo), não se restringe às hipóteses de manifestação em razão do exercício do mandato parlamentar praticadas exclusivamente dentro das dependências do Congresso Nacional.$q$,
  'C',
  $q$Certo. O art. 53, caput, da CF/1988 estabelece a imunidade material dos parlamentares: "Os Deputados e Senadores são invioláveis, civil e penalmente, por quaisquer de suas opiniões, palavras e votos". A jurisprudência do STF consolidou entendimento de que essa imunidade não se limita fisicamente às dependências do Congresso Nacional — abrange manifestações feitas fora do parlamento, desde que exista nexo de causalidade entre a manifestação e o exercício do mandato parlamentar (por exemplo, entrevistas à imprensa sobre temas de interesse político-legislativo). Isso a diferencia da imunidade formal (relativa a prisão e a processo, prevista nos parágrafos seguintes do mesmo artigo), que trata de regras procedimentais específicas para a prisão e o processamento de parlamentares, e não da inviolabilidade quanto ao conteúdo de suas manifestações.
Exemplo: um parlamentar que, numa entrevista concedida fora do plenário, mas claramente relacionada a um projeto de lei em discussão, expressa uma opinião política controversa está, em regra, protegido pela imunidade material, desde que fique demonstrado o vínculo entre a manifestação e o exercício de sua função parlamentar — a proteção não depende de a fala ter ocorrido dentro do prédio do Congresso.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
);
