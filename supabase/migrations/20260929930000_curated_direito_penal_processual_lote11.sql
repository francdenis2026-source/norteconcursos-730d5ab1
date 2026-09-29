-- Curated (authored) questions, Direito lote 33: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-024',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a liberdade individual — sequestro e cárcere privado',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de sequestro ou cárcere privado, previsto no art. 148 do Código Penal, é crime permanente, cuja consumação se prolonga no tempo enquanto durar a privação de liberdade da vítima, o que tem relevância, por exemplo, para efeitos de flagrante e de contagem do prazo prescricional.$q$,
  'C',
  $q$Certo. O art. 148, caput, do Código Penal tipifica sequestrar ou manter alguém em cárcere privado. A doutrina classifica esse crime como permanente, ou seja, sua consumação não se esgota num único instante, mas se prolonga enquanto durar o estado antijurídico criado pelo agente — no caso, a privação de liberdade da vítima persiste continuamente até que ela seja libertada. Essa classificação tem consequências práticas importantes: como o crime "continua se consumando" a cada momento em que a vítima permanece presa, é possível a prisão em flagrante a qualquer momento durante essa permanência (não apenas no instante inicial da captura), e o prazo prescricional só começa a correr a partir do momento em que cessa a permanência (ou seja, quando a vítima é libertada), e não do início do sequestro.
Exemplo: se uma vítima é mantida em cárcere privado por trinta dias, um policial que a encontre presa no vigésimo dia pode efetuar prisão em flagrante do sequestrador naquele momento, mesmo não tendo presenciado o início do crime — isso só é possível justamente porque o crime é permanente, e a situação de flagrância se renova a cada instante em que a privação de liberdade persiste.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-020',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Perícia criminal',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
As perícias serão realizadas por perito oficial, portador de diploma de curso superior, e, na falta de perito oficial, o exame poderá ser realizado por duas pessoas idôneas, portadoras de diploma de curso superior preferencialmente na área específica, dentre as que tiverem habilitação técnica relacionada à natureza do exame.$q$,
  'C',
  $q$Certo. O art. 159, caput, do Código de Processo Penal estabelece que "o exame de corpo de delito e outras perícias serão realizados por perito oficial, portador de diploma de curso superior". O § 1º do mesmo artigo prevê a solução para a ausência de perito oficial no local: "na falta de perito oficial, o exame será realizado por 2 (duas) pessoas idôneas, portadoras de diploma de curso superior preferencialmente na área específica, dentre as que tiverem habilitação técnica relacionada à natureza do exame". Essa regra busca garantir, mesmo na ausência de perito oficial (situação comum em muitas comarcas do interior do país), um mínimo de qualificação técnica e imparcialidade na realização da perícia, exigindo dois peritos não oficiais, e não apenas um, para reforçar a confiabilidade do exame.
Exemplo: em uma comarca sem perito criminal oficial disponível, o exame necessário para apurar determinado crime pode ser realizado por dois profissionais habilitados na área técnica pertinente (como dois médicos, no caso de exame de corpo de delito relacionado a lesões corporais), em substituição ao perito oficial que faltou.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
