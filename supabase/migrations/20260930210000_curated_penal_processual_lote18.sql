-- Curated (authored) questions, Direito lote 62: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-034',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a paz pública — incitação ao crime',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de incitação ao crime, previsto no art. 286 do Código Penal, consiste em incitar, publicamente, a prática de crime, sendo suficiente, para sua consumação, que a incitação seja feita publicamente, independentemente de o crime incitado vir a ser efetivamente cometido por quem a recebeu.$q$,
  'C',
  $q$Certo. O art. 286, caput, do Código Penal tipifica "incitar, publicamente, a prática de crime". Trata-se de crime formal (de consumação antecipada): a mera incitação pública, por si só, já é suficiente para a consumação do delito, independentemente de o crime incitado vir a ser efetivamente cometido por qualquer pessoa que tenha recebido a incitação. O elemento "publicamente" é essencial — a incitação precisa ser dirigida a um número indeterminado de pessoas (por exemplo, num discurso público, numa publicação de amplo alcance), e não a uma pessoa específica em conversa privada, hipótese que se enquadraria melhor em outras figuras jurídicas (como participação, se o crime vier a ser efetivamente cometido pelo incitado individual).
Exemplo: alguém que, em uma manifestação pública, incita abertamente a plateia a invadir e depredar um estabelecimento comercial já pratica o crime de incitação, consumado no momento do discurso público, mesmo que, ao final, ninguém efetivamente cometa a invasão sugerida.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-030',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Emendatio libelli e mutatio libelli',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Na emendatio libelli, o juiz pode atribuir definição jurídica diversa da constante da acusação, ainda que tenha que aplicar pena mais grave, sem necessidade de modificar a descrição do fato contida na denúncia, diferentemente da mutatio libelli, que exige aditamento da denúncia quando, no curso da instrução, surge prova de elementar ou circunstância não contida explicitamente na peça acusatória original.$q$,
  'C',
  $q$Certo. O art. 383 do Código de Processo Penal trata da emendatio libelli: o juiz pode, sem modificar a descrição do fato contida na denúncia ou queixa, atribuir-lhe definição jurídica diversa, ainda que, em consequência, tenha de aplicar pena mais grave — isso ocorre porque o acusado se defende dos FATOS narrados, não da capitulação jurídica atribuída pela acusação, então uma simples reclassificação jurídica do mesmo fato não prejudica sua defesa. Já a mutatio libelli (art. 384) ocorre quando, no curso da instrução, surge prova de elementar ou circunstância da infração penal não contida explicitamente na denúncia ou queixa — nesse caso, como há uma MUDANÇA FÁTICA relevante (e não apenas jurídica), o Ministério Público deve aditar a denúncia para incluir esse novo elemento, garantindo ao acusado a oportunidade de se defender também dessa nova circunstância fática antes de eventual condenação com base nela.
Exemplo: se os fatos narrados na denúncia, sem qualquer alteração, na verdade configuram um crime diferente do que foi originalmente capitulado (por exemplo, denúncia por furto, mas os fatos descritos já indicam roubo), o juiz pode simplesmente reclassificar via emendatio libelli; mas se, durante a instrução, surge uma prova de um elemento fático novo que não constava da denúncia original (como o uso de uma arma não mencionada inicialmente), aí é necessário o aditamento pela via da mutatio libelli, garantindo defesa específica sobre esse novo elemento.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
