-- Curated (authored) questions, Direito lote 18: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-015',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Concurso de crimes',
  $q$Julgue o item a seguir, com base no Código Penal.
No concurso material de crimes, aplicam-se cumulativamente as penas em que haja incorrido o agente, enquanto no concurso formal, quando o agente, mediante uma só ação ou omissão, pratica dois ou mais crimes, aplica-se, em regra, a pena mais grave, aumentada de um sexto até metade.$q$,
  'C',
  $q$Certo. O art. 69 do Código Penal trata do concurso material: quando o agente, mediante mais de uma ação ou omissão, pratica dois ou mais crimes, aplicam-se cumulativamente as penas privativas de liberdade em que haja incorrido — ou seja, as penas se somam. Já o art. 70, caput, trata do concurso formal: quando o agente, mediante uma só ação ou omissão, pratica dois ou mais crimes, idênticos ou não, aplica-se a pena mais grave (ou, se iguais, uma delas), aumentada, em qualquer caso, de um sexto até metade — regra que busca ser mais benéfica ao réu do que a simples soma das penas, reconhecendo que a conduta praticada foi única, ainda que tenha produzido múltiplos resultados criminosos.
Exemplo: quem, com um único tiro, atinge e mata duas pessoas ao mesmo tempo (uma só ação, dois resultados) responde por concurso formal, com pena aumentada de um sexto até metade sobre a pena do crime mais grave; já quem pratica dois furtos em ocasiões distintas, com ações separadas, responde por concurso material, com as penas de cada furto somadas integralmente.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-016',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a honra',
  $q$Julgue o item a seguir, com base no Código Penal.
A calúnia consiste em imputar falsamente a alguém fato definido como crime, sendo diferente da difamação, que consiste em imputar a alguém fato ofensivo à sua reputação, ainda que verdadeiro, e da injúria, que consiste em ofender a dignidade ou o decoro de alguém, sem a imputação de fato específico.$q$,
  'C',
  $q$Certo. Os três crimes contra a honra têm elementos distintos: a CALÚNIA (art. 138) exige a imputação FALSA de um fato definido como CRIME — se o fato imputado for verdadeiro ou não configurar crime, não há calúnia; a DIFAMAÇÃO (art. 139) consiste em imputar a alguém um fato ofensivo à sua reputação, mas, diferentemente da calúnia, não exige que esse fato seja necessariamente falso (a lei pune a divulgação do fato ofensivo à reputação, mesmo que verdadeiro, salvo exceções específicas) nem que seja definido como crime; já a INJÚRIA (art. 140) não envolve a imputação de um fato específico, mas sim ofensas diretas à dignidade ou ao decoro da pessoa, geralmente por meio de xingamentos ou qualificações depreciativas genéricas.
Exemplo: dizer falsamente que alguém "roubou dinheiro da empresa" é calúnia (fato falso, definido como crime); espalhar que alguém "teve um caso extraconjugal", mesmo sendo verdade, pode configurar difamação (fato ofensivo à reputação, não necessariamente falso, e não é crime); e simplesmente chamar alguém de "incompetente" ou usar um xingamento genérico, sem apontar um fato específico, tende a configurar injúria.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-013',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Prazo para conclusão do inquérito policial',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Quando o indiciado estiver preso, o prazo para conclusão do inquérito policial será de dez dias, contado a partir da data em que se executar a ordem de prisão, ou do dia em que se cumprir o mandado, se o réu estiver preso, sendo esse prazo, em regra, de trinta dias quando o indiciado estiver solto, podendo ser prorrogado.$q$,
  'C',
  $q$Certo. O art. 10, caput, do Código de Processo Penal estabelece que "o inquérito deverá terminar no prazo de 10 dias, se o indiciado tiver sido preso em flagrante, ou estiver preso preventivamente, contado o prazo, nesta hipótese, a partir do dia em que se executar a ordem de prisão, ou no prazo de 30 dias, quando estiver solto, mediante fiança ou sem ela". Esses são os prazos gerais previstos no CPP, aplicáveis à investigação conduzida pela polícia comum; vale notar que legislações especiais podem prever prazos diferentes para determinados tipos de investigação (como na Lei de Drogas, que estabelece prazos próprios), e o prazo para indiciado solto pode ser prorrogado mediante autorização judicial, mediante representação da autoridade policial, quando as investigações se mostrarem mais complexas.
Exemplo: um inquérito sobre um crime de menor complexidade, com o indiciado preso, precisa, em regra, ser concluído em até 10 dias contados da execução da prisão; já se o indiciado estiver solto, o prazo padrão sobe para 30 dias, com possibilidade de prorrogação em casos que exijam investigação mais aprofundada.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-014',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Recursos — apelação',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Cabe apelação, entre outras hipóteses, das sentenças definitivas de condenação ou absolvição proferidas por juiz singular, devendo o recurso ser interposto no prazo legal, sob pena de preclusão, salvo hipóteses excepcionais previstas em lei que autorizem sua interposição fora do prazo comum.$q$,
  'C',
  $q$Certo. O art. 593, inciso I, do Código de Processo Penal estabelece que cabe apelação das sentenças definitivas de condenação ou absolvição proferidas por juiz singular, sendo esse um dos recursos mais utilizados no processo penal para levar ao tribunal de segunda instância a revisão de uma decisão de primeiro grau. Como todo recurso, a apelação está sujeita a um prazo legal para interposição, sob pena de preclusão (perda do direito de recorrer pelo decurso do prazo) — a regra geral é a observância estrita desses prazos, e exceções que permitam a interposição fora do prazo comum dependem de previsão legal específica (como situações de justo impedimento comprovado, avaliadas caso a caso pelo Judiciário).
Exemplo: se a defesa deixa transcorrer o prazo legal para apelar de uma sentença condenatória sem apresentar o recurso, ela perde, em regra, o direito de questionar aquela decisão por meio de apelação, ficando a sentença sujeita ao trânsito em julgado, salvo se demonstrada alguma causa excepcional que justifique a superação do prazo.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
);
