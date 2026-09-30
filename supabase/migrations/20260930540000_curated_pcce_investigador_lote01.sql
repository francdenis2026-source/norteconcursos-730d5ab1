-- Curated (authored) questions for Polícia Civil do Ceará — Oficial
-- Investigador de Polícia (2025): 30 questões cobrindo Constitucional,
-- Administrativo, Penal, Processual Penal, Criminologia, Medicina Legal,
-- Legislação Estadual, Português, RLM, Informática, Estatística e
-- Contabilidade. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'd9cee236-b4f1-4be7-a764-e359f6bf7758', 'pcceinv25-const-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Noções de Direito Constitucional', 'Ação popular (art. 5º, LXXIII, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Qualquer cidadão é parte legítima para propor ação popular que vise a anular ato lesivo ao patrimônio público ou de entidade de que o Estado participe, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural, ficando o autor, salvo comprovada má-fé, isento de custas judiciais e do ônus da sucumbência.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LXXIII, da Constituição Federal confere legitimidade exclusiva ao cidadão (e não a qualquer pessoa) para propor ação popular, remédio constitucional voltado à proteção do patrimônio público, da moralidade administrativa, do meio ambiente e do patrimônio histórico e cultural, isentando-o de custas e ônus sucumbenciais, salvo má-fé comprovada, o que estimula o exercício do controle social sobre atos lesivos aos interesses coletivos. Exemplo: um cidadão pode propor ação popular para anular um contrato administrativo firmado sem licitação, quando esta era exigida, e que tenha causado prejuízo ao erário.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LXXIII','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'd9cee236-b4f1-4be7-a764-e359f6bf7758', 'pcceinv25-const-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Noções de Direito Constitucional', 'Vedação à prisão civil por dívida (art. 5º, LXVII, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Não haverá prisão civil por dívida, salvo a do responsável pelo inadimplemento voluntário e inescusável de obrigação alimentícia.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LXVII, da Constituição Federal veda, como regra, a prisão civil por dívida, admitindo uma única exceção expressa: a do devedor de alimentos que deixa de pagar voluntária e injustificadamente a pensão devida, hipótese em que a prisão funciona como medida coercitiva para forçar o cumprimento da obrigação, e não como punição propriamente dita. Exemplo: um pai que, podendo pagar, deixa de forma injustificada de arcar com a pensão alimentícia do filho pode ter sua prisão civil decretada, diferentemente de um devedor comum de dívida bancária, que não pode ser preso civilmente por essa razão.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LXVII','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'cdb777f4-4e31-4314-a72d-ccc36328099e', 'pcceinv25-adm-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Noções de Direito Administrativo', 'Poder hierárquico',
  $q$Julgue o item a seguir, com base na doutrina de direito administrativo.
O poder hierárquico decorre da estrutura verticalizada da Administração Pública, permitindo à autoridade superior distribuir e escalonar funções entre seus órgãos, dar ordens, fiscalizar e rever a atuação de seus subordinados, e delegar ou avocar atribuições, nos limites legais.$q$,
  'C',
  $q$Certo. O poder hierárquico é atributo típico da organização administrativa, fundamentado na relação de subordinação entre órgãos e agentes públicos dentro da mesma pessoa jurídica, conferindo à autoridade superior instrumentos de comando, fiscalização, revisão e, quando cabível, delegação ou avocação de competências, sempre nos limites estabelecidos em lei. Exemplo: um delegado-geral pode, no exercício do poder hierárquico, determinar que uma delegacia específica priorize a investigação de determinado tipo de crime, dentro de sua competência funcional.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Direito Administrativo — Poder hierárquico','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'cdb777f4-4e31-4314-a72d-ccc36328099e', 'pcceinv25-adm-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Noções de Direito Administrativo', 'Elemento forma do ato administrativo',
  $q$Julgue o item a seguir, com base na doutrina de direito administrativo.
A forma é elemento do ato administrativo que consiste no revestimento exteriorizador do ato, exigindo-se, em regra, a forma escrita, admitindo-se excepcionalmente outras formas de manifestação, desde que a lei não exija formalidade específica.$q$,
  'C',
  $q$Certo. Entre os cinco elementos do ato administrativo (competência, finalidade, forma, motivo e objeto), a forma representa o modo pelo qual a vontade administrativa se exterioriza, sendo a forma escrita a regra geral por razões de segurança jurídica e possibilidade de controle, admitindo-se, excepcionalmente, formas diversas (como gestos de agentes de trânsito) quando a urgência ou a natureza do ato assim justificar, e desde que não haja exigência legal de forma específica. Exemplo: um agente de trânsito pode manifestar uma ordem administrativa por meio de gestos, e não necessariamente por escrito, em razão da natureza da situação.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Direito Administrativo — Elementos do ato administrativo','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'b957b16e-3e71-448a-b641-30f84998d9de', 'pcceinv25-penal-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Noções de Direito Penal', 'Falsificação de documento particular e absorção pelo estelionato (Súmula 17/STJ)',
  $q$Julgue o item a seguir, com base no Código Penal e na Súmula nº 17 do STJ.
O crime de falsificação de documento particular é absorvido pelo crime de estelionato quando o falso se exaure no estelionato, sem mais potencialidade lesiva, conforme entendimento sumulado do Superior Tribunal de Justiça.$q$,
  'C',
  $q$Certo. A Súmula nº 17 do STJ ("Quando o falso se exaure no estelionato, sem mais potencialidade lesiva, é por este absorvido") consagra o princípio da consunção aplicado à relação entre a falsificação documental (art. 298 do CP) e o estelionato (art. 171 do CP), de modo que, esgotando-se a função do documento falso no próprio golpe patrimonial, sem produzir efeitos lesivos autônomos posteriores, o agente responde apenas pelo estelionato. Exemplo: se o agente falsifica um único documento apenas para consumar um golpe financeiro específico contra uma vítima, sem que o documento falso possa ser usado para outros fins lesivos, responde só pelo estelionato.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 298; Súmula nº 17 do STJ','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'b957b16e-3e71-448a-b641-30f84998d9de', 'pcceinv25-penal-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Noções de Direito Penal', 'Crime de resistência (art. 329, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de resistência consiste em opor-se à execução de ato legal, mediante violência ou ameaça a funcionário competente para executá-lo ou a quem lhe esteja prestando auxílio, sendo a pena aumentada se o ato, em razão da resistência, não se executa.$q$,
  'C',
  $q$Certo. O art. 329 do Código Penal tipifica a resistência, exigindo, para sua configuração, o emprego de violência física ou ameaça (não bastando a simples desobediência verbal, que configuraria outro crime) contra agente competente que executa ato legal, sendo a pena majorada quando essa resistência efetivamente impede a consumação do ato administrativo ou judicial em curso. Exemplo: um suspeito que agride fisicamente o policial para impedir sua própria prisão em flagrante comete resistência, com pena agravada se, em razão dessa violência, a prisão não se efetiva naquele momento.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 329','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'b957b16e-3e71-448a-b641-30f84998d9de', 'pcceinv25-penal-03',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Noções de Direito Penal', 'Estrito cumprimento de dever legal (art. 23, III, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Não há crime quando o agente pratica o fato em estrito cumprimento de dever legal, causa de exclusão de ilicitude aplicável, por exemplo, ao policial que efetua prisão em flagrante nos estritos limites legais.$q$,
  'C',
  $q$Certo. O art. 23, inciso III, do Código Penal prevê o estrito cumprimento de dever legal como causa excludente de ilicitude, aplicável a agentes públicos (como policiais) que, no exercício regular de suas funções e nos exatos limites impostos pela lei, praticam conduta que, em outras circunstâncias, seria considerada típica, como a privação da liberdade de alguém no ato de prender em flagrante. Exemplo: o policial que imobiliza fisicamente um suspeito para efetuar a prisão em flagrante, usando apenas a força estritamente necessária, age amparado por essa excludente de ilicitude.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 23, III','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '5c03f035-408a-45d3-88b5-ccf1fd2132e4', 'pcceinv25-proc-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Processual Penal', 'Competência — foro do local da infração (art. 70, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A competência será, de regra, determinada pelo lugar em que se consumar a infração, ou, no caso de tentativa, pelo lugar em que for praticado o último ato de execução.$q$,
  'C',
  $q$Certo. O art. 70 do Código de Processo Penal fixa a regra geral de competência territorial (ratione loci), tomando como referência o local da consumação da infração; no caso de crime tentado, em que o resultado não ocorre, a competência é determinada pelo local do último ato de execução praticado pelo agente, independentemente de onde o resultado, se ocorresse, se verificaria. Exemplo: se um disparo de arma de fogo é efetuado em uma cidade, mas a vítima morre em outra, para onde foi socorrida, a competência para julgar o homicídio consumado é do local da morte (consumação), e não do local do disparo.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 70','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '5c03f035-408a-45d3-88b5-ccf1fd2132e4', 'pcceinv25-proc-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Processual Penal', 'Livre convencimento motivado (art. 155, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
O juiz formará sua convicção pela livre apreciação da prova produzida em contraditório judicial, não podendo fundamentar sua decisão exclusivamente nos elementos informativos colhidos na investigação, ressalvadas as provas cautelares, não repetíveis e antecipadas.$q$,
  'C',
  $q$Certo. O art. 155 do Código de Processo Penal consagra o princípio do livre convencimento motivado, permitindo ao juiz valorar livremente as provas produzidas sob contraditório judicial, mas vedando que a condenação se baseie exclusivamente em elementos colhidos unilateralmente na fase investigativa (como depoimentos prestados apenas perante a autoridade policial), ressalvadas as provas de natureza cautelar, não repetíveis ou antecipadas, que, por sua própria natureza, não podem ser reproduzidas em juízo. Exemplo: uma confissão prestada apenas na fase policial, sem confirmação em juízo sob contraditório, não pode, isoladamente, embasar uma condenação.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 155','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '5c03f035-408a-45d3-88b5-ccf1fd2132e4', 'pcceinv25-proc-03',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Processual Penal', 'Efeitos devolutivo e suspensivo dos recursos',
  $q$Julgue o item a seguir, com base na doutrina processual penal.
O efeito devolutivo transfere ao tribunal o reexame da matéria impugnada, enquanto o efeito suspensivo impede a produção imediata dos efeitos da decisão recorrida até o julgamento do recurso, não possuindo, necessariamente, todo recurso ambos os efeitos.$q$,
  'C',
  $q$Certo. Os recursos processuais podem produzir efeito devolutivo (transferência da matéria decidida ao órgão julgador superior para reexame) e, quando previsto em lei, efeito suspensivo (impedimento da produção imediata dos efeitos da decisão até o julgamento definitivo do recurso), sendo o efeito devolutivo inerente a praticamente todo recurso, enquanto o suspensivo depende de previsão legal específica para cada tipo de recurso e situação processual. Exemplo: a apelação contra sentença condenatória, em regra, não impede a execução provisória de determinados efeitos da decisão, evidenciando que nem todo recurso suspende automaticamente os efeitos da decisão recorrida.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Direito Processual Penal — Efeitos dos recursos','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '987dce18-10c0-4689-af90-14792a768c3f', 'pcceinv25-crim-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Criminologia', 'Escola Clássica (Beccaria)',
  $q$Julgue o item a seguir, com base na criminologia.
A Escola Clássica da Criminologia, tendo Cesare Beccaria como um de seus principais expoentes, defendia o livre-arbítrio do indivíduo e a ideia de que o crime resulta de uma escolha racional do agente, fundamentando a pena como consequência proporcional e certa do delito, com finalidade preventiva geral.$q$,
  'C',
  $q$Certo. A Escola Clássica, influenciada pelo Iluminismo, parte da premissa do livre-arbítrio, segundo a qual o indivíduo escolhe racionalmente praticar o crime após ponderar vantagens e desvantagens, o que fundamenta a defesa de penas proporcionais e certas, capazes de desestimular, pela previsibilidade e pela racionalidade do castigo, a prática de novos delitos (prevenção geral). Exemplo: a obra "Dos Delitos e Das Penas", de Beccaria, defende a proporcionalidade entre o crime e a pena como forma de garantir justiça e eficácia preventiva do sistema penal.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '987dce18-10c0-4689-af90-14792a768c3f', 'pcceinv25-crim-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Criminologia', 'Escola Positiva (Lombroso)',
  $q$Julgue o item a seguir, com base na criminologia.
A Escola Positiva, associada a autores como Cesare Lombroso, rompeu com a ideia de livre-arbítrio, buscando explicar o crime a partir de fatores biológicos, psicológicos e sociais que predisporiam o indivíduo à conduta criminosa, deslocando o foco da análise do fato para a pessoa do criminoso.$q$,
  'C',
  $q$Certo. A Escola Positiva, em contraposição à Escola Clássica, adota método científico-naturalista para investigar as causas do crime, deslocando o objeto de estudo do fato criminoso (direito penal do fato) para o próprio criminoso (direito penal do autor), buscando fatores biológicos, psicológicos e sociais que expliquem a predisposição individual à conduta delituosa. Exemplo: os estudos de Lombroso sobre características físicas supostamente associadas à criminalidade, embora hoje amplamente superados e criticados, marcaram o início dessa abordagem positivista na criminologia.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '987dce18-10c0-4689-af90-14792a768c3f', 'pcceinv25-crim-03',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Criminologia', 'Teoria da associação diferencial (Sutherland)',
  $q$Julgue o item a seguir, com base na criminologia.
Segundo a teoria da associação diferencial, formulada por Edwin Sutherland, o comportamento criminoso é aprendido por meio da interação social, sendo o aprendizado de técnicas, motivos e racionalizações favoráveis à violação da lei determinante para a prática do crime.$q$,
  'C',
  $q$Certo. A teoria da associação diferencial, desenvolvida por Edwin Sutherland, explica o comportamento criminoso como resultado de um processo de aprendizagem social semelhante ao de qualquer outro comportamento, ocorrendo por meio da comunicação e da interação com pessoas que já possuem definições favoráveis à violação da lei, contrariando explicações puramente biológicas ou individuais para a criminalidade. Exemplo: um jovem que convive predominantemente com pessoas envolvidas em atividades criminosas tende, segundo essa teoria, a aprender e internalizar padrões de comportamento e justificativas favoráveis à prática de crimes.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '10e84f8b-f06b-47c9-a1b6-245b5e88b22f', 'pcceinv25-medlegal-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Medicina Legal', 'Morte encefálica',
  $q$Julgue o item a seguir, com base na medicina legal.
A morte encefálica, caracterizada pela cessação irreversível de todas as funções do encéfalo, incluindo o tronco cerebral, é reconhecida pela legislação brasileira como critério legal de morte para fins de transplante de órgãos, exigindo protocolo clínico específico para sua constatação.$q$,
  'C',
  $q$Certo. A legislação brasileira sobre transplantes reconhece a morte encefálica como critério legal definidor do óbito para fins de doação de órgãos, exigindo a constatação por meio de protocolo clínico rigoroso, com avaliação por médicos habilitados e exames complementares específicos, justamente pela irreversibilidade e pela gravidade dessa determinação, que autoriza a retirada de órgãos para transplante. Exemplo: um paciente mantido em suporte artificial de vida, mas com morte encefálica constatada segundo o protocolo legal, é considerado juridicamente morto, ainda que seu coração continue batendo com o auxílio de aparelhos.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.434/1997, art. 3º','url','https://www.planalto.gov.br/ccivil_03/leis/l9434.htm')),
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '10e84f8b-f06b-47c9-a1b6-245b5e88b22f', 'pcceinv25-medlegal-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Medicina Legal', 'Dosagem de alcoolemia — exame de sangue e etilômetro',
  $q$Julgue o item a seguir, com base na medicina legal.
A dosagem de álcool no sangue (alcoolemia) pode ser obtida por meio de exame de sangue ou de ar alveolar expirado (etilômetro), sendo o resultado expresso, no primeiro caso, em gramas de álcool por litro de sangue, e no segundo, em miligramas de álcool por litro de ar expelido dos pulmões.$q$,
  'C',
  $q$Certo. A aferição do nível de álcool no organismo pode ser feita por diferentes métodos periciais, sendo o exame de sangue considerado mais preciso, com resultado expresso em gramas de álcool por litro de sangue, e o teste do etilômetro (bafômetro) um método indireto, baseado na relação entre o álcool no sangue e no ar alveolar expirado, expresso em miligramas por litro de ar. Exemplo: em uma fiscalização de trânsito, o condutor pode ser submetido ao teste do etilômetro, e, em caso de contestação ou indisponibilidade do aparelho, ao exame de sangue para confirmação mais precisa do nível de álcool.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '10e84f8b-f06b-47c9-a1b6-245b5e88b22f', 'pcceinv25-medlegal-03',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Medicina Legal', 'Conceito de vestígio e cadeia de custódia',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Vestígio é definido, para fins periciais, como qualquer objeto ou material bruto, sensível e latente, que possa estar relacionado a um evento investigado, sendo submetido a coleta, acondicionamento e análise segundo os procedimentos da cadeia de custódia.$q$,
  'C',
  $q$Certo. O art. 158-A do Código de Processo Penal, incluído pela Lei nº 13.964/2019, conceitua vestígio como todo objeto ou material bruto, sensível ou latente, que se relacione ao fato investigado, cuja integridade probatória deve ser preservada por meio dos procedimentos formais da cadeia de custódia, desde a coleta até o descarte ou a devolução, assegurando confiabilidade à prova pericial produzida. Exemplo: uma amostra de sangue encontrada em um local de crime é considerada vestígio e deve seguir todo o protocolo de cadeia de custódia até se tornar prova pericial válida no processo.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 158-A','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'ff6932e2-68c9-43ef-87f1-fffd899098d8', 'pcceinv25-legest-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Legislação Estadual', 'Organização da Polícia Civil do Ceará',
  $q$Julgue o item a seguir, com base na organização institucional da Polícia Civil do Ceará.
No estado do Ceará, a organização e o funcionamento da Polícia Civil são disciplinados por lei complementar estadual específica, que estabelece a estrutura de cargos e carreiras, entre eles o de Oficial Investigador de Polícia, subordinada, em nível superior, à Secretaria de Segurança Pública e Defesa Social do estado.$q$,
  'C',
  $q$Certo. A exemplo dos demais estados da federação, o Ceará organiza sua Polícia Civil por meio de lei complementar estadual, que define a estrutura de carreiras, cargos e a hierarquia funcional da corporação, estando o órgão vinculado, em nível superior de gestão, à Secretaria estadual responsável pela segurança pública, encarregada de coordenar as políticas de segurança no âmbito do estado. Exemplo: o cargo de Oficial Investigador de Polícia integra a estrutura de carreira estabelecida pela legislação estadual cearense específica sobre a Polícia Civil.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'ff6932e2-68c9-43ef-87f1-fffd899098d8', 'pcceinv25-legest-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Legislação Estadual', 'Competência da Polícia Civil estadual (art. 144, § 4º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Cabe à Polícia Civil do Ceará, ressalvada a competência da União, exercer as funções de polícia judiciária e a apuração de infrações penais, exceto as de natureza militar, no âmbito do território cearense.$q$,
  'C',
  $q$Certo. O art. 144, § 4º, da Constituição Federal atribui às polícias civis dos estados, dirigidas por delegados de polícia de carreira, as funções de polícia judiciária e a apuração de infrações penais, ressalvada a competência da União (exercida pela Polícia Federal) e excetuadas as infrações penais militares, competência que se estende à Polícia Civil do Ceará dentro dos limites territoriais do estado. Exemplo: a investigação de um homicídio comum ocorrido no interior do Ceará é, em regra, atribuição da Polícia Civil estadual, e não da Polícia Federal.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 144, § 4º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '607babcc-995f-484b-83f5-5e03ea90967e', 'pcceinv25-port-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Língua Portuguesa', 'Concordância verbal com sujeito oracional',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Quando o sujeito da oração é representado por uma oração subordinada substantiva (sujeito oracional), o verbo da oração principal permanece no singular, por se tratar de sujeito de natureza única, ainda que a oração subordinada contenha elementos no plural.$q$,
  'C',
  $q$Certo. O sujeito oracional, formado por uma oração subordinada substantiva subjetiva, é considerado, para fins de concordância, um único elemento sintático, de modo que o verbo da oração principal deve permanecer no singular, independentemente do número gramatical de palavras presentes dentro da oração subordinada que exerce essa função de sujeito. Exemplo: "É necessário que os policiais cheguem cedo" — o verbo "é" permanece no singular, pois o sujeito é a oração inteira "que os policiais cheguem cedo", e não apenas a palavra "policiais".$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '607babcc-995f-484b-83f5-5e03ea90967e', 'pcceinv25-port-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Língua Portuguesa', 'Pronome relativo "que"',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
O pronome relativo "que" retoma um termo antecedente da oração anterior, introduzindo uma oração subordinada adjetiva que o qualifica ou especifica, podendo ser substituído, em muitos contextos, por "o qual", "a qual" e flexões.$q$,
  'C',
  $q$Certo. O pronome relativo "que" tem a função de retomar um antecedente (substantivo ou pronome mencionado anteriormente) e introduzir uma oração subordinada adjetiva, que atua qualificando ou especificando esse antecedente, sendo, em diversos contextos, substituível pelas formas "o qual", "a qual", "os quais" e "as quais", sem prejuízo de sentido. Exemplo: "O investigador que resolveu o caso foi elogiado" pode ser reescrito como "O investigador, o qual resolveu o caso, foi elogiado", mantendo a mesma relação sintática.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '607babcc-995f-484b-83f5-5e03ea90967e', 'pcceinv25-port-03',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Língua Portuguesa', 'Uso de "há" e "a" para indicar tempo',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Emprega-se "há" (forma do verbo haver) para indicar tempo decorrido, e "a" (preposição) para indicar tempo futuro.$q$,
  'C',
  $q$Certo. A distinção entre "há" e "a" no contexto temporal é frequentemente cobrada em provas de português: "há" (do verbo haver, no sentido de "existir" ou "fazer") é usado para indicar tempo já decorrido em relação ao momento da fala, enquanto "a" (preposição) indica tempo futuro, uma distância a ser ainda percorrida a partir do momento presente. Exemplo: "O crime ocorreu há dois anos" (tempo passado) versus "A investigação será concluída daqui a dois meses" (tempo futuro).$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '8d3bca71-12c5-4798-b5c1-55f746e96a2b', 'pcceinv25-rlm-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Raciocínio Lógico', 'Lei de De Morgan — negação da conjunção',
  $q$Julgue o item a seguir, com base na lógica proposicional.
Pela lei de De Morgan, a negação da conjunção "P e Q" é logicamente equivalente à disjunção "não P ou não Q".$q$,
  'C',
  $q$Certo. As leis de De Morgan estabelecem equivalências fundamentais entre negação, conjunção e disjunção na lógica proposicional, determinando que a negação de "P e Q" (¬(P ∧ Q)) equivale a "não P ou não Q" (¬P ∨ ¬Q), regra amplamente utilizada na resolução de questões de raciocínio lógico em concursos. Exemplo: a negação de "o suspeito confessou e a prova foi encontrada" é "o suspeito não confessou ou a prova não foi encontrada".$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '8d3bca71-12c5-4798-b5c1-55f746e96a2b', 'pcceinv25-rlm-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Raciocínio Lógico', 'Lei de De Morgan — negação da disjunção',
  $q$Julgue o item a seguir, com base na lógica proposicional.
Pela lei de De Morgan, a negação da disjunção "P ou Q" é logicamente equivalente à conjunção "não P e não Q".$q$,
  'C',
  $q$Certo. Complementando a primeira lei de De Morgan, a negação da disjunção "P ou Q" (¬(P ∨ Q)) equivale à conjunção "não P e não Q" (¬P ∧ ¬Q), pois, para que a disjunção original seja falsa, é necessário que ambas as proposições componentes sejam falsas simultaneamente. Exemplo: a negação de "o suspeito estava em casa ou no trabalho" é "o suspeito não estava em casa e não estava no trabalho".$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '8d3bca71-12c5-4798-b5c1-55f746e96a2b', 'pcceinv25-rlm-03',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Raciocínio Lógico', 'Combinação simples',
  $q$Julgue o item a seguir, com base em análise combinatória.
A combinação simples é utilizada para calcular o número de agrupamentos possíveis de um subconjunto de elementos, a partir de um conjunto maior, em que a ordem dos elementos escolhidos não é relevante para diferenciar os agrupamentos.$q$,
  'C',
  $q$Certo. A combinação simples aplica-se a situações em que se deseja formar subconjuntos de elementos a partir de um conjunto maior, sem que a ordem de escolha influencie o resultado, diferenciando-se do arranjo simples, no qual a ordem dos elementos selecionados é relevante para caracterizar agrupamentos distintos. Exemplo: a formação de uma equipe de três investigadores escolhidos entre dez disponíveis é um problema de combinação, pois a ordem em que os três são selecionados não altera a equipe formada.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '03c9cf14-2eb8-4b63-b3ce-fd545723cb7b', 'pcceinv25-info-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Informática', 'Atalho Alt+Tab',
  $q$Julgue o item a seguir, com base em noções de informática.
O atalho Alt+Tab permite alternar rapidamente entre as janelas de aplicativos abertos no sistema operacional, exibindo, quando mantido pressionado, uma lista visual das janelas disponíveis para seleção.$q$,
  'C',
  $q$Certo. O atalho Alt+Tab é um recurso padrão dos sistemas operacionais para alternância rápida entre janelas de programas em execução, exibindo, ao ser mantido pressionado, miniaturas ou ícones das janelas abertas, permitindo ao usuário navegar entre elas com o uso repetido da tecla Tab antes de soltar a combinação. Exemplo: um usuário trabalhando simultaneamente em um navegador e em um editor de texto pode usar Alt+Tab para alternar rapidamente entre essas duas janelas sem precisar minimizá-las manualmente.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '03c9cf14-2eb8-4b63-b3ce-fd545723cb7b', 'pcceinv25-info-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Informática', 'Vírus de macro',
  $q$Julgue o item a seguir, com base em noções de informática.
Vírus de macro é tipo de malware que se aproveita de linguagens de automação de tarefas (macros) presentes em aplicativos de escritório, como editores de texto e planilhas eletrônicas, para se propagar quando o usuário abre um arquivo infectado com macros habilitadas.$q$,
  'C',
  $q$Certo. Os vírus de macro exploram a funcionalidade de automação (macros) disponível em programas de escritório para executar código malicioso quando o usuário abre um documento infectado e habilita a execução de macros, sendo uma técnica de propagação de malware que depende diretamente da interação e permissão do usuário para se ativar. Exemplo: um arquivo de planilha recebido por e-mail, contendo uma macro maliciosa, pode infectar o computador do destinatário se este habilitar a execução de macros ao abrir o arquivo.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'd959dad8-02db-4822-b5f0-e1e95bf1e83e', 'pcceinv25-estat-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Estatística', 'Média aritmética simples',
  $q$Julgue o item a seguir, com base em noções de estatística.
A média aritmética simples de um conjunto de valores é obtida pela soma de todos os valores dividida pela quantidade de valores considerados, sendo sensível a valores extremos (outliers) presentes no conjunto de dados.$q$,
  'C',
  $q$Certo. A média aritmética simples é a medida de tendência central mais utilizada, calculada pela divisão da soma de todos os valores do conjunto pelo número total de valores, apresentando como limitação sua sensibilidade a valores muito discrepantes (outliers), que podem distorcer significativamente o resultado em relação ao comportamento típico da maioria dos dados. Exemplo: em um conjunto de idades composto majoritariamente por jovens, a presença de um único valor muito elevado pode elevar consideravelmente a média, tornando-a pouco representativa do grupo.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', 'd959dad8-02db-4822-b5f0-e1e95bf1e83e', 'pcceinv25-estat-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Estatística', 'Mediana',
  $q$Julgue o item a seguir, com base em noções de estatística.
A mediana de um conjunto de dados ordenados corresponde ao valor central da distribuição, dividindo o conjunto em duas partes com igual número de elementos, sendo medida de tendência central menos sensível a valores extremos do que a média aritmética.$q$,
  'C',
  $q$Certo. A mediana representa o valor que ocupa a posição central de um conjunto de dados previamente ordenados, dividindo-o em duas metades com igual quantidade de elementos, sendo, por depender apenas da posição central e não do valor específico de cada elemento, menos afetada por valores extremos do que a média aritmética. Exemplo: em um conjunto de salários com um valor extremamente alto e discrepante, a mediana tende a representar melhor o salário típico do grupo do que a média, que seria distorcida por esse valor extremo.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '3478811f-5c88-4abd-b2c5-0948d568649d', 'pcceinv25-contab-01',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Contabilidade', 'Patrimônio líquido',
  $q$Julgue o item a seguir, com base em noções de contabilidade.
O patrimônio líquido de uma entidade corresponde à diferença entre o total do ativo e o total do passivo, representando a parcela dos recursos pertencente aos sócios ou proprietários, podendo ser positivo, negativo (passivo a descoberto) ou nulo.$q$,
  'C',
  $q$Certo. O patrimônio líquido é obtido pela equação contábil fundamental (Ativo menos Passivo), representando o valor residual que pertence efetivamente aos proprietários ou sócios da entidade após a dedução de todas as obrigações, podendo assumir valor positivo (situação patrimonial favorável), negativo (quando o passivo supera o ativo, configurando passivo a descoberto) ou, mais raramente, nulo. Exemplo: uma empresa fortemente endividada, cujas obrigações superam o valor de seus bens e direitos, apresenta patrimônio líquido negativo.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '0c8cd2e4-8436-434e-ac23-04b4cc033e26', '3478811f-5c88-4abd-b2c5-0948d568649d', 'pcceinv25-contab-02',
  'Polícia Civil do Ceará', 2025, 'Oficial Investigador de Polícia', 'UECE-CEV', 'Contabilidade', 'Regime de competência',
  $q$Julgue o item a seguir, com base em noções de contabilidade.
Pelo regime de competência, as receitas e despesas devem ser reconhecidas no período em que ocorrem, independentemente do efetivo recebimento ou pagamento em dinheiro, em contraposição ao regime de caixa, que considera apenas o efetivo fluxo financeiro.$q$,
  'C',
  $q$Certo. O regime de competência determina que os fatos contábeis sejam reconhecidos no período em que efetivamente ocorrem, independentemente de quando o dinheiro entra ou sai do caixa, o que proporciona uma visão mais fiel do desempenho econômico da entidade em cada período, ao contrário do regime de caixa, que registra receitas e despesas apenas no momento do efetivo recebimento ou pagamento. Exemplo: uma venda realizada a prazo em dezembro deve ser reconhecida como receita desse mês pelo regime de competência, mesmo que o pagamento só ocorra em janeiro do ano seguinte.$q$,
  '[]'::jsonb,
  'média', now()
);
