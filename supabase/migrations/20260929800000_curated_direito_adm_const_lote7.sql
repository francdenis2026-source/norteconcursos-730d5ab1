-- Curated (authored) questions, Direito lote 20: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-021',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Entidades da administração indireta',
  $q$Julgue o item a seguir.
As autarquias são pessoas jurídicas de direito público, criadas por lei específica, com capacidade de autoadministração, sujeitas a controle finalístico (supervisão ministerial) pelo ente que as criou, mas sem subordinação hierárquica direta, o que caracteriza a chamada autonomia administrativa própria dessas entidades.$q$,
  'C',
  $q$Certo. As autarquias integram a administração pública indireta e são criadas diretamente por lei específica (não por decreto, diferente de outras estruturas), tendo personalidade jurídica de direito público próprio, distinta da pessoa jurídica que as criou (União, Estados, DF ou Municípios). Justamente por terem personalidade jurídica própria, não há subordinação hierárquica entre a autarquia e o ente que a instituiu — o que existe é o chamado "controle finalístico" ou "supervisão ministerial" (ou tutela administrativa), um controle mais limitado do que a hierarquia, voltado a verificar se a autarquia está cumprindo suas finalidades legais, sem que o ente controlador possa simplesmente reformar ou revogar livremente qualquer decisão interna da autarquia, como faria dentro de sua própria estrutura hierárquica direta.
Exemplo: um ministério não pode simplesmente "mandar" uma autarquia vinculada a ele tomar determinada decisão interna, como faria com um órgão subordinado dentro de sua própria estrutura direta — o controle exercido é mais de fiscalização de finalidade e legalidade do que de comando hierárquico direto, respeitando a autonomia administrativa própria da autarquia.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-022',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Motivação dos atos administrativos (Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
Os atos administrativos deverão ser motivados, com indicação dos fatos e dos fundamentos jurídicos, quando, entre outras hipóteses, neguem, limitem ou afetem direitos ou interesses, imponham ou agravem deveres, encargos ou sanções, ou decidam recursos administrativos.$q$,
  'C',
  $q$Certo. O art. 50, caput, incisos I, II e V, da Lei nº 9.784/1999 lista essas hipóteses, entre outras, em que os atos administrativos devem ser motivados, com indicação dos fatos e dos fundamentos jurídicos: quando neguem, limitem ou afetem direitos ou interesses; quando imponham ou agravem deveres, encargos ou sanções; e quando decidam recursos administrativos. A motivação é uma garantia fundamental do administrado, pois permite que ele compreenda as razões da decisão administrativa e, com base nisso, exerça de forma efetiva seu direito de defesa ou de recurso — decisões que afetam negativamente a esfera jurídica do particular, especialmente, não podem ser simplesmente "impostas" sem essa justificativa explícita.
Exemplo: se a administração nega um pedido de licença ou aplica uma penalidade a um particular, ela precisa explicar, de forma clara, quais fatos e quais fundamentos legais embasam essa decisão — não basta simplesmente comunicar o resultado negativo sem essa justificativa, sob pena de vício de motivação passível de questionamento.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999 – Processo Administrativo Federal','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-015',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Inviolabilidade de correspondência e comunicações',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É inviolável o sigilo da correspondência e das comunicações telegráficas, de dados e das comunicações telefônicas, sendo que este último — o sigilo das comunicações telefônicas — admite expressamente exceção constitucional, mediante ordem judicial, para fins de investigação criminal ou instrução processual penal, na forma que a lei estabelecer.$q$,
  'C',
  $q$Certo. O art. 5º, inciso XII, da CF/1988 estabelece que "é inviolável o sigilo da correspondência e das comunicações telegráficas, de dados e das comunicações telefônicas, salvo, no último caso, por ordem judicial, nas hipóteses e na forma que a lei estabelecer para fins de investigação criminal ou instrução processual penal". A redação constitucional é peculiar: a exceção expressa ("salvo... no último caso") refere-se apenas às comunicações telefônicas, o que gerou intenso debate doutrinário e jurisprudencial sobre se seria possível, por analogia ou interpretação sistemática, também quebrar sigilo de dados mediante ordem judicial — entendimento hoje amplamente aceito na prática, mas que ilustra a peculiaridade textual desse dispositivo constitucional.
Exemplo: a Lei nº 9.296/1996 regulamenta especificamente essa exceção constitucional para as comunicações telefônicas, estabelecendo os requisitos e o procedimento para que um juiz autorize a interceptação telefônica em uma investigação criminal, exatamente na forma que a Constituição determinou que a lei deveria estabelecer.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
);
