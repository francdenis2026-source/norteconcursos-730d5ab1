-- Curated (authored) questions, Direito lote 80: mais Direito Penal e
-- Direito Processual Penal. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-040',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Penas — regimes de cumprimento',
  $q$Julgue o item a seguir, com base no Código Penal.
A pena privativa de liberdade poderá ser cumprida em regime fechado, semiaberto ou aberto, sendo o regime inicial determinado, entre outros fatores, pela quantidade de pena aplicada e pela reincidência do condenado, cabendo ao juiz, na sentença, fixar o regime inicial de cumprimento da pena privativa de liberdade.$q$,
  'C',
  $q$Certo. O art. 33 do Código Penal estabelece os três regimes de cumprimento da pena privativa de liberdade — fechado (em estabelecimento de segurança máxima ou média), semiaberto (em colônia agrícola, industrial ou estabelecimento similar) e aberto (em casa de albergado ou estabelecimento adequado). A fixação do regime inicial considera, entre outros critérios, a quantidade de pena aplicada (penas maiores tendem a exigir regime inicial mais rigoroso) e a reincidência do condenado (reincidentes, em regra, têm regime inicial mais gravoso do que réus primários com a mesma quantidade de pena), além de outras circunstâncias judiciais do caso concreto, cabendo ao juiz, ao proferir a sentença condenatória, determinar expressamente o regime inicial de cumprimento aplicável àquele condenado específico.
Exemplo: dois condenados com a mesma pena de seis anos de reclusão podem ter regimes iniciais diferentes se um deles for reincidente e o outro, réu primário — a reincidência tende a justificar um regime inicial mais rigoroso, mesmo diante de penas equivalentes, refletindo a maior reprovabilidade atribuída a quem já havia sido anteriormente condenado.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-036',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Réplica e tréplica no procedimento comum',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
No procedimento comum ordinário, encerrada a instrução probatória, o Ministério Público apresenta suas alegações finais, seguido da defesa, cabendo réplica ao acusador e tréplica ao defensor, quando surgir fato ou circunstância nova que possa influir no julgamento da causa, assegurando-se sempre a igualdade entre as partes no exercício do contraditório.$q$,
  'C',
  $q$Certo. O procedimento comum ordinário do Código de Processo Penal, com as alterações da Lei nº 11.719/2008, estabelece que, encerrada a instrução probatória, as partes apresentam alegações finais (Ministério Público, seguido da defesa), geralmente na própria audiência, em regra por meio de alegações orais, podendo o juiz, em casos de maior complexidade, converter em alegações escritas. O art. 402 do CPP prevê que, ao final da instrução, se requerida, poderá ser deferido às partes o direito de requerer diligências cuja necessidade se origine de circunstâncias ou fatos apurados na instrução, refletindo o compromisso do procedimento com a igualdade entre acusação e defesa e a busca da verdade real dentro do devido processo legal, garantindo a ambas as partes oportunidade equivalente de se manifestar sobre fatos e circunstâncias relevantes surgidos ao longo do processo.
Exemplo: se, durante a instrução, surge um elemento de prova relevante e inesperado que pode influenciar diretamente o resultado do julgamento, as partes têm a oportunidade de se manifestar especificamente sobre esse elemento novo em suas alegações finais, preservando o equilíbrio processual entre acusação e defesa antes da decisão do juiz.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
