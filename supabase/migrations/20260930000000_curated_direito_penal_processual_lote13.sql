-- Curated (authored) questions, Direito lote 40: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-027',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a Administração Pública — corrupção ativa',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de corrupção ativa, previsto no art. 333 do Código Penal, consiste em oferecer ou prometer vantagem indevida a funcionário público, para determiná-lo a praticar, omitir ou retardar ato de ofício, sendo crime formal que se consuma independentemente da efetiva aceitação da vantagem pelo funcionário público.$q$,
  'C',
  $q$Certo. O art. 333, caput, do Código Penal tipifica a corrupção ativa como "oferecer ou prometer vantagem indevida a funcionário público, para determiná-lo a praticar, omitir ou retardar ato de ofício". Diferentemente da corrupção passiva (art. 317, que pune o funcionário público que solicita ou recebe a vantagem), a corrupção ativa está no polo oposto da relação — pune quem oferece ou promete a vantagem. A doutrina classifica esse crime como formal (ou de consumação antecipada): ele se consuma no momento em que a oferta ou promessa é feita, independentemente de o funcionário público aceitá-la ou não — a simples proposta de corrupção já configura o crime, mesmo que o funcionário recuse imediatamente.
Exemplo: se alguém oferece dinheiro a um fiscal para que ele deixe de aplicar uma multa devida, o crime de corrupção ativa já se consuma no momento dessa oferta, mesmo que o fiscal recuse veementemente a proposta e denuncie o fato imediatamente — não é necessário que a vantagem seja efetivamente aceita para que o crime já esteja consumado.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-022',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Habeas corpus no CPP',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Compete o conhecimento de habeas corpus a qualquer juiz ou tribunal competente, podendo ser impetrado tanto preventivamente, quando alguém se encontrar apenas ameaçado de sofrer violência ou coação ilegal em sua liberdade de locomoção, quanto repressivamente, quando a coação ilegal já estiver concretamente ocorrendo.$q$,
  'C',
  $q$Certo. O Código de Processo Penal, a partir do art. 647, regulamenta o habeas corpus, admitindo tanto a modalidade preventiva (também chamada de "salvo-conduto"), destinada a proteger a pessoa que se encontra apenas ameaçada de sofrer, futuramente, coação ilegal à sua liberdade de locomoção, quanto a modalidade repressiva (ou liberatória), destinada a fazer cessar uma coação ilegal já em curso, como uma prisão que já está sendo executada de forma ilegal. Essa dupla função do habeas corpus reflete a amplitude de proteção que o instrumento oferece: tanto evitar a violação iminente quanto reverter uma violação já concretizada à liberdade de locomoção.
Exemplo: alguém que tem informações concretas de que será preso ilegalmente pode impetrar habeas corpus preventivo, buscando um salvo-conduto que impeça a prisão futura; já quem já está preso de forma ilegal impetra habeas corpus repressivo, buscando a cessação imediata dessa coação já existente.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
);
