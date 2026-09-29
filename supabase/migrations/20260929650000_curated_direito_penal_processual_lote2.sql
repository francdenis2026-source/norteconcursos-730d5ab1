-- Curated (authored) questions, Direito lote 5: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes: original
-- content, full legal audit.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-004',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Teoria do crime — tentativa',
  $q$Julgue o item a seguir, com base no Código Penal.
Diz-se o crime tentado quando, iniciada a execução, não se consuma por circunstâncias alheias à vontade do agente, sendo a pena, nesse caso, reduzida de um a dois terços em relação à pena prevista para o crime consumado, salvo disposição legal em contrário.$q$,
  'C',
  $q$Certo. O art. 14, inciso II, do Código Penal define a tentativa exatamente assim: quando, iniciada a execução, o crime não se consuma por circunstâncias alheias à vontade do agente — ou seja, o agente queria consumar o crime, mas algo fora do seu controle impediu esse resultado. O parágrafo único do art. 14 estabelece a punição: "pune-se a tentativa com a pena correspondente ao crime consumado, diminuída de um a dois terços", salvo disposição legal específica em sentido diverso (existem crimes, como alguns previstos em leis especiais, que preveem punição diferenciada para a tentativa).
Exemplo: quem atira em alguém com intenção de matar, mas erra o alvo por pouco e a vítima sobrevive ilesa, pode responder por tentativa de homicídio — a intenção de consumar o crime estava presente, mas o resultado morte não ocorreu por uma circunstância (o erro de pontaria, digamos) alheia à vontade do agente, que efetivamente queria matar.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-005',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Aplicação da lei penal no tempo',
  $q$Julgue o item a seguir, com base no Código Penal.
A lei penal não retroagirá, salvo para beneficiar o réu, princípio conhecido como retroatividade da lei penal mais benéfica, que se aplica inclusive a fatos já definitivamente julgados, quando a lei posterior deixa de considerar o fato como criminoso ou comina pena menos rigorosa.$q$,
  'C',
  $q$Certo. O art. 5º, inciso XL, da Constituição Federal estabelece que "a lei penal não retroagirá, salvo para beneficiar o réu", e o art. 2º do Código Penal detalha essa aplicação: quando uma lei posterior deixa de considerar o fato como criminoso (abolitio criminis), cessam a execução e os efeitos penais da sentença condenatória, mesmo que já transitada em julgado; e o parágrafo único do mesmo artigo estende essa retroatividade benéfica também a casos em que a lei nova, sem descriminalizar totalmente, comina pena menos rigorosa — em ambos os casos, aplica-se a lei mais favorável ao réu, mesmo que o processo já tenha sido definitivamente julgado.
Exemplo: se uma conduta deixa de ser crime por uma lei nova, quem já estava cumprindo pena por aquele fato específico deve ser libertado imediatamente quanto a essa condenação — a retroatividade benéfica se sobrepõe até mesmo à coisa julgada, quando o assunto é reduzir ou eliminar a punição penal de alguém.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'),jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-006',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra o patrimônio — furto e roubo',
  $q$Julgue o item a seguir, com base no Código Penal.
A principal distinção entre furto e roubo está no emprego de violência ou grave ameaça à pessoa (ou de outro meio que reduza sua capacidade de resistência) na subtração da coisa alheia móvel, elemento presente no roubo e ausente no furto simples.$q$,
  'C',
  $q$Certo. O art. 155 do Código Penal define o furto como "subtrair, para si ou para outrem, coisa alheia móvel" — a subtração ocorre sem violência ou grave ameaça direta contra a vítima (embora possa haver, por exemplo, destreza ou aproveitamento de um descuido). Já o art. 157 define o roubo exatamente como a subtração da coisa mediante "grave ameaça ou violência a pessoa, ou depois de havê-la, por qualquer meio, reduzido à impossibilidade de resistência" — a presença desse constrangimento direto à vítima é o que diferencia o roubo do furto e justifica a pena bem mais elevada prevista para o roubo, já que há um crime contra a pessoa somado à subtração patrimonial.
Exemplo: pegar a carteira de alguém sem que a vítima perceba, num ônibus lotado (batedor de carteira), configura furto; já tomar a carteira da vítima mediante ameaça de uma arma ou agressão física configura roubo, justamente pela violência ou grave ameaça empregada contra a pessoa.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-004',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Competência — regra geral',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A competência será, de regra, determinada pelo lugar em que se consumar a infração, ou, no caso de tentativa, pelo lugar em que for praticado o último ato de execução, salvo exceções previstas em lei.$q$,
  'C',
  $q$Certo. O art. 70, caput, do Código de Processo Penal estabelece essa regra geral de competência territorial (ratione loci): "A competência será, de regra, determinada pelo lugar em que se consumar a infração, ou, no caso de tentativa, pelo lugar em que for praticado o último ato de execução". Essa regra do "lugar do resultado" (ou do último ato executório, em caso de tentativa) é a regra geral, mas o próprio Código e leis especiais preveem outras regras de competência (por exemplo, para crimes à distância, crimes plurilocais, ou competências específicas de Justiça Federal e outras), que prevalecem como exceção quando aplicáveis ao caso concreto.
Exemplo: se um crime é consumado em uma cidade diferente daquela onde começou a ser executado, em regra é o local da consumação (onde o resultado efetivamente ocorreu) que define, via de regra, qual comarca ou seção judiciária será competente para processar e julgar o caso — salvo quando alguma regra especial de competência afastar essa regra geral.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-005',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Provas — cadeia de custódia',
  $q$Julgue o item a seguir, com base no Código de Processo Penal, com a redação dada pela Lei nº 13.964/2019.
A cadeia de custódia é o conjunto de procedimentos utilizados para manter e documentar a história cronológica do vestígio coletado em locais ou vítimas de crimes, para rastrear sua posse e manuseio a partir de seu reconhecimento até o descarte.$q$,
  'C',
  $q$Certo. O art. 158-A, caput, do Código de Processo Penal, com a redação dada pela Lei nº 13.964/2019 (Pacote Anticrime), define a cadeia de custódia exatamente nesses termos: "o conjunto de todos os procedimentos utilizados para manter e documentar a história cronológica do vestígio coletado em locais ou em vítimas de crimes, para rastrear sua posse e manuseio a partir de seu reconhecimento até o descarte". Esse instituto foi formalizado na lei justamente para garantir a idoneidade da prova pericial: qualquer falha ou quebra nesse rastreamento documentado pode comprometer a confiabilidade da prova e ser usada pela defesa para questionar sua validade no processo.
Exemplo: uma arma apreendida numa cena de crime precisa ter cada etapa documentada — quem a coletou, como foi embalada, quem a transportou, onde ficou armazenada, quem a analisou — de modo que, se essa "corrente" de responsabilidades for interrompida ou mal documentada em algum ponto, surge dúvida legítima sobre se aquela é realmente a mesma arma encontrada na cena, ou se houve alguma contaminação/adulteração no caminho.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-006',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Audiência de custódia',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
No prazo de até 24 horas após a realização da prisão, o preso deverá ser conduzido à presença do juiz competente, para participar da audiência de custódia, ocasião em que serão avaliadas a legalidade e a necessidade da prisão, podendo o juiz relaxar a prisão ilegal, convertê-la em preventiva ou conceder liberdade provisória.$q$,
  'C',
  $q$Certo. O art. 310 do Código de Processo Penal estabelece que, após receber o auto de prisão em flagrante, no prazo máximo de 24 horas, o preso deve ser levado à presença do juiz para a audiência de custódia, momento em que o magistrado verifica a legalidade e a necessidade da prisão, podendo: relaxar a prisão ilegal (quando há vício formal); converter a prisão em flagrante em preventiva, se presentes os requisitos legais para essa modalidade de prisão cautelar; ou conceder liberdade provisória, com ou sem medidas cautelares diversas da prisão, quando não houver necessidade de manter a pessoa presa.
Exemplo: mesmo alguém preso em flagrante de forma tecnicamente correta pode ter a prisão convertida em liberdade provisória na audiência de custódia, se o juiz entender que não há necessidade concreta de mantê-lo preso até o julgamento — a audiência de custódia funciona como um filtro rápido de legalidade e necessidade logo após a prisão, evitando prisões desnecessárias ou ilegais que se prolonguem no tempo.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
);
