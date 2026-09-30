-- Curated (authored) questions, Direito lote 68: mais Direito Penal e
-- Direito Processual Penal. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-036',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a Administração Pública — advocacia administrativa',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de advocacia administrativa, previsto no art. 321 do Código Penal, consiste em patrocinar, direta ou indiretamente, interesse privado perante a administração pública, valendo-se o funcionário público da qualidade de funcionário, sendo a pena aumentada se o interesse patrocinado for ilegítimo.$q$,
  'C',
  $q$Certo. O art. 321, caput, do Código Penal tipifica "patrocinar, direta ou indiretamente, interesse privado perante a administração pública, valendo-se da qualidade de funcionário". O parágrafo único estabelece que "a pena é aumentada da metade, se o interesse é ilegítimo" — ou seja, mesmo quando o interesse patrocinado for legítimo (por exemplo, ajudar a agilizar um processo administrativo de terceiro que tem, de fato, direito ao que pretende), a conduta de usar a posição funcional para influenciar em favor desse interesse privado já configura crime, mas com pena maior quando o interesse patrocinado, além disso, for ilegítimo (ou seja, algo a que o particular não teria realmente direito).
Exemplo: um servidor público que, valendo-se de sua posição dentro do órgão, intercede pessoalmente para agilizar ou favorecer o processo administrativo de um conhecido, mesmo que esse conhecido tenha direito legítimo ao que pleiteia, já pratica advocacia administrativa — a gravidade e a pena aumentam ainda mais se o interesse que ele está favorecendo for, na verdade, ilegítimo.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-032',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Sursis processual',
  $q$Julgue o item a seguir, com base na Lei nº 9.099/1995.
Nos crimes em que a pena mínima cominada for igual ou inferior a um ano, abrangidas ou não por esta Lei, o Ministério Público, ao oferecer a denúncia, poderá propor a suspensão do processo, por dois a quatro anos, desde que o acusado não esteja sendo processado ou não tenha sido condenado por outro crime, presentes os demais requisitos que autorizariam a suspensão condicional da pena.$q$,
  'C',
  $q$Certo. O art. 89, caput, da Lei nº 9.099/1995 (Lei dos Juizados Especiais Cíveis e Criminais) prevê a suspensão condicional do processo ("sursis processual") justamente nesses termos: aplicável a crimes com pena mínima cominada igual ou inferior a um ano (independentemente de estarem ou não sujeitos aos procedimentos dos juizados especiais), permitindo que o Ministério Público, ao oferecer denúncia, proponha a suspensão do processo por período de prova de 2 a 4 anos, desde que presentes os requisitos que autorizariam, em tese, a suspensão condicional da pena, e o acusado não esteja sendo processado nem tenha sido condenado por outro crime. Trata-se de instituto de política criminal despenalizadora, que evita o desenvolvimento completo do processo penal para crimes de menor gravidade, mediante condições impostas ao acusado durante o período de prova.
Exemplo: um réu processado por um crime com pena mínima de seis meses, sem antecedentes criminais e sem outro processo em curso, pode receber uma proposta de suspensão condicional do processo pelo Ministério Público, cumprindo determinadas condições (como comparecimento periódico em juízo) durante o período de prova, e, se cumprir tudo corretamente, o processo é extinto ao final desse período, sem gerar condenação formal.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.099/1995 – Lei dos Juizados Especiais Cíveis e Criminais','url','https://www.planalto.gov.br/ccivil_03/leis/l9099.htm')),
  'difícil', now()
);
