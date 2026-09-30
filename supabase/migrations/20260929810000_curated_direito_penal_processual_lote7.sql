-- Curated (authored) questions, Direito lote 21: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-017',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Erro de tipo e erro de proibição',
  $q$Julgue o item a seguir, com base no Código Penal.
O erro sobre elemento constitutivo do tipo legal de crime exclui o dolo, mas permite a punição por crime culposo, se previsto em lei, ao passo que o erro sobre a ilicitude do fato, se inevitável, isenta de pena, e, se evitável, apenas reduz a pena de um sexto a um terço.$q$,
  'C',
  $q$Certo. O art. 20, caput, do Código Penal trata do erro de tipo: "o erro sobre elemento constitutivo do tipo legal de crime exclui o dolo, mas permite a punição por crime culposo, se previsto em lei" — ou seja, se o agente não sabia (por erro) que estava praticando um dos elementos que caracterizam o crime, o dolo (intenção) é excluído, mas ele ainda pode responder na modalidade culposa, se essa modalidade existir para aquele crime específico. Já o art. 21, caput, trata do erro de proibição (erro sobre a ilicitude do fato): "o desconhecimento da lei é inescusável. O erro sobre a ilicitude do fato, se inevitável, isenta de pena; se evitável, poderá diminuí-la de um sexto a um terço" — aqui, o agente sabia exatamente o que estava fazendo faticamente, mas, por erro, acreditava (de forma justificável ou não) que sua conduta era permitida pela lei.
Exemplo: atirar em alguém pensando, por erro plenamente justificável, que se tratava de um animal selvagem no escuro (erro de tipo) é situação bem diferente de alguém que sabe exatamente o que está fazendo, mas acredita, por desinformação evitável, que aquela conduta específica não é proibida por lei (erro de proibição) — as consequências jurídicas de cada tipo de erro são bem distintas.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-018',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes hediondos',
  $q$Julgue o item a seguir, com base na Lei nº 8.072/1990.
Os crimes hediondos, o tráfico ilícito de entorpecentes, a tortura e o terrorismo são insuscetíveis de anistia, graça, indulto e fiança, sendo o cumprimento de pena, em regra, iniciado em regime inicialmente fechado nos crimes hediondos e equiparados.$q$,
  'C',
  $q$Certo. O art. 5º, XLIII, da CF/1988 estabelece que esses crimes (hediondos, tráfico de drogas, tortura e terrorismo) são inafiançáveis e insuscetíveis de graça ou anistia — vedação que a Lei nº 8.072/1990 (Lei dos Crimes Hediondos) também estende ao indulto. Quanto ao regime inicial de cumprimento de pena, a Lei nº 8.072/1990 (art. 2º, § 1º) determina que a pena por crime hediondo ou equiparado será cumprida inicialmente em regime fechado, refletindo o tratamento mais rigoroso que a Constituição e a legislação infraconstitucional conferem a esse grupo de crimes considerados especialmente graves.
Exemplo: mesmo em situações em que, para crimes comuns, seria possível iniciar o cumprimento de pena num regime mais brando, a legislação específica dos crimes hediondos exige, como regra geral, que o cumprimento comece no regime fechado, refletindo a maior reprovabilidade atribuída a esse grupo de crimes pela ordem jurídica.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm'),jsonb_build_object('title','Lei nº 8.072/1990 – Lei dos Crimes Hediondos','url','https://www.planalto.gov.br/ccivil_03/leis/l8072.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-015',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Interrogatório do réu',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
O silêncio do acusado durante o interrogatório não importará em confissão nem poderá ser interpretado em prejuízo de sua defesa, tratando-se de manifestação expressa do direito constitucional de não produzir prova contra si mesmo (nemo tenetur se detegere).$q$,
  'C',
  $q$Certo. O art. 186, parágrafo único, do Código de Processo Penal estabelece que "o silêncio, que não importará em confissão, não poderá ser interpretado em prejuízo da defesa". Esse dispositivo é reflexo direto do princípio constitucional (implícito, mas reconhecido pela doutrina e jurisprudência a partir de tratados internacionais e do próprio devido processo legal) segundo o qual ninguém é obrigado a produzir prova contra si mesmo — conhecido pela expressão latina "nemo tenetur se detegere". Isso significa que o acusado tem o direito de permanecer calado durante o interrogatório sem que esse silêncio seja usado como indício de culpa ou como um "quase reconhecimento" da acusação, protegendo sua estratégia de defesa.
Exemplo: um réu que opta por não responder às perguntas do juiz durante o interrogatório não pode ter esse silêncio citado na sentença como um elemento a favor da condenação — o juiz precisa fundamentar a decisão em outras provas dos autos, sem usar o silêncio do acusado como prova de culpa.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
);
