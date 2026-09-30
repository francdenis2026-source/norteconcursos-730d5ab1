-- Curated (authored) questions, Direito lote 76: mais Direito
-- Administrativo e Direito Constitucional. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-051',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Teoria dos motivos determinantes',
  $q$Julgue o item a seguir.
Pela teoria dos motivos determinantes, quando a administração pública indica os motivos que fundamentam a prática de um ato administrativo discricionário, ainda que a lei não exigisse expressamente essa motivação, ela fica vinculada à existência e à veracidade desses motivos declarados, de modo que, comprovada sua inexistência ou falsidade, o ato se torna inválido.$q$,
  'C',
  $q$Certo. A teoria dos motivos determinantes estabelece que, uma vez que a administração pública, mesmo em atos discricionários que não exigiriam motivação obrigatória, decide expor os motivos que fundamentam sua decisão, ela fica vinculada a esses motivos declarados — não pode, posteriormente, alegar outros motivos diferentes para justificar o mesmo ato, e, principalmente, se ficar comprovado que os motivos apresentados eram inexistentes ou falsos, o ato praticado com base neles torna-se inválido, ainda que a lei, em tese, não exigisse motivação para aquele tipo específico de ato. Essa teoria reforça o controle sobre a boa-fé e a veracidade da atuação administrativa, mesmo em espaços de discricionariedade.
Exemplo: se a administração exonera um servidor comissionado alegando reorganização administrativa do setor (motivo declarado, mesmo sem obrigação legal de motivar esse tipo específico de exoneração), mas fica comprovado que, na verdade, não houve reorganização alguma e o motivo apresentado era falso, o ato de exoneração pode ser invalidado justamente por essa incompatibilidade entre o motivo declarado e a realidade dos fatos, aplicando-se a teoria dos motivos determinantes.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-036',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Plebiscito, referendo e iniciativa popular',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São formas de exercício da soberania popular, além do sufrágio universal, o plebiscito, o referendo e a iniciativa popular, sendo o plebiscito convocado com anterioridade a um ato legislativo ou administrativo, enquanto o referendo é convocado posteriormente à edição desse ato, cabendo ao povo ratificá-lo ou rejeitá-lo.$q$,
  'C',
  $q$Certo. O art. 14, caput, da CF/1988 estabelece que "a soberania popular será exercida pelo sufrágio universal e pelo voto direto e secreto, com valor igual para todos, e, nos termos da lei, mediante: I - plebiscito; II - referendo; III - iniciativa popular". A distinção temporal entre plebiscito e referendo é bem estabelecida: o PLEBISCITO é convocado ANTES da elaboração de um ato legislativo ou administrativo, consultando previamente a população sobre determinada questão a ser decidida (o povo se manifesta antes, orientando a decisão futura); já o REFERENDO é convocado DEPOIS da edição do ato, submetendo-o à aprovação ou rejeição popular posterior (o ato já existe, e o povo decide se ele será mantido ou não).
Exemplo: consultar previamente a população sobre se um determinado território deve ou não ser desmembrado para formar um novo estado, antes de qualquer lei sobre o tema, é plebiscito; já submeter à população, após a aprovação de uma lei já existente, a decisão sobre se essa lei deve ou não continuar vigorando, é referendo.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'fácil', now()
);
