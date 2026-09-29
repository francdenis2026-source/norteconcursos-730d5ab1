-- Curated (authored) questions, Direito lote 52: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-043',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Fundações públicas',
  $q$Julgue o item a seguir.
As fundações públicas, integrantes da administração indireta, podem ser instituídas com personalidade jurídica de direito público (fundações autárquicas ou de direito público) ou de direito privado, sendo, em qualquer caso, sua criação autorizada por lei específica, cabendo a lei complementar definir as áreas de sua atuação, nos termos constitucionais.$q$,
  'C',
  $q$Certo. O art. 37, inciso XIX, da CF/1988 estabelece que "somente por lei específica poderá ser criada autarquia e autorizada a instituição de empresa pública, de sociedade de economia mista e de fundação, cabendo à lei complementar, neste último caso, definir as áreas de sua atuação". A doutrina reconhece que as fundações públicas podem assumir personalidade jurídica de direito público (quando são criadas diretamente por lei, com regime jurídico semelhante ao das autarquias, sendo chamadas de fundações autárquicas ou fundações de direito público) ou de direito privado (quando a lei apenas autoriza sua instituição, sendo formalmente constituídas por registro de seus atos constitutivos em cartório, com regime híbrido, submetido parcialmente ao direito privado, mas com derrogações de direito público em razão de sua finalidade pública).
Exemplo: uma fundação pública que administra um museu ou centro de pesquisa histórica de titularidade estatal pode ser estruturada como fundação de direito público, com regime jurídico próximo ao autárquico, ou como fundação de direito privado, dependendo da opção legislativa feita no momento de sua criação, sempre observando a exigência de lei específica autorizadora e, no caso das fundações, de lei complementar definindo as áreas possíveis de atuação.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-028',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Perda de mandato parlamentar',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Perderá o mandato o Deputado ou Senador que sofrer condenação criminal em sentença transitada em julgado, sendo, nesse caso específico, a decisão sobre a perda do mandato de competência da respectiva Casa Legislativa, por votação em escrutínio, e não uma consequência automática e imediata da própria condenação.$q$,
  'E',
  $q$Errado. O art. 55, inciso VI, da CF/1988 prevê a perda de mandato por condenação criminal em sentença transitada em julgado como uma das hipóteses de perda de mandato parlamentar. Porém, o § 2º do mesmo artigo distingue duas modalidades de perda de mandato: para determinadas hipóteses (como quebra de decoro parlamentar), a perda é decidida pela Casa Legislativa, por votação; mas, para a hipótese específica de condenação criminal transitada em julgado (assim como para perda ou suspensão de direitos políticos), o § 3º do art. 55 estabelece expressamente que a perda de mandato, nesses casos, será DECLARADA pela Mesa da Casa respectiva, de ofício ou mediante provocação, assegurada ampla defesa — ou seja, não depende de deliberação e votação política do plenário, mas de uma declaração formal e vinculada aos efeitos automáticos da condenação criminal, o que torna errada a afirmação de que a decisão dependeria de votação da Casa Legislativa nesse caso específico.
Exemplo: diferente do caso de quebra de decoro parlamentar (que exige deliberação e votação do plenário da Casa), a perda de mandato por condenação criminal transitada em julgado é apenas declarada formalmente pela Mesa da Casa, sem necessidade de votação política sobre o mérito, refletindo o caráter mais automático e vinculado dessa consequência jurídica específica.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
);
