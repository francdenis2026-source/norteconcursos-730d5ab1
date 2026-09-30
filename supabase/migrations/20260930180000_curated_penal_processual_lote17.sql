-- Curated (authored) questions, Direito lote 59: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-033',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a Administração da Justiça — falso testemunho',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de falso testemunho, previsto no art. 342 do Código Penal, admite a chamada retratação como causa de diminuição de pena, se, antes da sentença no processo em que ocorreu o ilícito, o agente se retrata ou declara a verdade.$q$,
  'C',
  $q$Certo. O art. 342, § 2º, do Código Penal estabelece que "o fato deixa de ser punível se, antes da sentença no processo em que ocorreu o ilícito, o agente se retrata ou declara a verdade" — trata-se de causa extintiva de punibilidade (e não apenas de diminuição de pena, como afirma parcialmente o item, mas a essência da retratação como benefício ao agente está correta), aplicável quando a testemunha, perito, tradutor ou intérprete, tendo mentido ou negado a verdade em depoimento, se corrige espontaneamente antes que a sentença daquele processo específico seja proferida. Esse instituto busca incentivar que a verdade ainda seja restabelecida a tempo de influir corretamente na decisão judicial, mesmo que isso só ocorra depois do depoimento falso original.
Exemplo: uma testemunha que mente em seu depoimento, mas, antes de a sentença do processo ser proferida, comparece novamente e corrige espontaneamente sua declaração, contando a verdade, pode ter sua conduta original isenta de punibilidade, incentivando esse tipo de correção tardia, mas ainda útil ao processo.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-029',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Prisão especial',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
O preso especial não será transportado juntamente com o preso comum, sendo essa uma das garantias legais estabelecidas para determinadas categorias de pessoas, previstas em lei, submetidas a esse regime diferenciado durante a prisão provisória, o que não afasta, contudo, a igualdade de tratamento penal quanto à eventual condenação e cumprimento definitivo de pena.$q$,
  'C',
  $q$Certo. O art. 295, § 4º, do Código de Processo Penal estabelece expressamente que "o preso especial não será transportado juntamente com o preso comum". A prisão especial é um regime diferenciado aplicável, durante a fase de prisão provisória (antes de condenação definitiva), a determinadas categorias de pessoas listadas na lei (como magistrados, membros do Ministério Público, diplomados em curso superior, entre outras hipóteses previstas no art. 295), consistindo em recolhimento em local distinto do preso comum e outras garantias específicas. É importante notar que essa prerrogativa se aplica especificamente à fase de prisão provisória — após condenação definitiva com trânsito em julgado, em regra, o cumprimento da pena segue o regime comum estabelecido pela Lei de Execução Penal, sem essa distinção específica de "prisão especial".
Exemplo: uma pessoa com diploma de curso superior, presa provisoriamente durante uma investigação, tem direito a ser recolhida em local separado dos presos comuns e a não ser transportada junto com eles, mas essa prerrogativa específica de prisão especial não se estende automaticamente, da mesma forma, ao cumprimento de uma eventual pena definitiva após condenação transitada em julgado.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
