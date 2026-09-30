-- Curated (authored) questions, Direito lote grande 02: 30 questões cobrindo
-- Administrativo, Constitucional, Penal, Processual Penal, Direitos Humanos
-- e Legislação Especial. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-058',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Teoria do órgão — imputação volitiva',
  $q$Julgue o item a seguir, com base na doutrina do direito administrativo.
Pela teoria do órgão, os atos praticados pelos agentes públicos no exercício de suas funções são imputados diretamente à pessoa jurídica que compõem, sem necessidade de outorga de mandato, pois o agente manifesta a própria vontade do Estado.$q$,
  'C',
  $q$Certo. A teoria do órgão (ou da imputação volitiva) explica a relação entre o agente público e o Estado sem recorrer à ideia de representação ou mandato: o agente, ao atuar nessa qualidade, não representa o Estado, mas presentifica sua vontade, de modo que o ato praticado é imputado diretamente à pessoa jurídica, e não ao agente individualmente. Exemplo: quando um delegado assina um auto de prisão em flagrante, o ato é considerado praticado pelo próprio Estado, e não por ele pessoalmente.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Direito Administrativo — Teoria do Órgão','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-059',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Princípio da autotutela (Súmula 473, STF)',
  $q$Julgue o item a seguir, com base na Súmula nº 473 do Supremo Tribunal Federal.
A Administração pode anular seus próprios atos, quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos, ou revogá-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos e ressalvada, em todos os casos, a apreciação judicial.$q$,
  'C',
  $q$Certo. A Súmula nº 473 do STF consagra o princípio da autotutela administrativa, reconhecendo à Administração o poder-dever de rever seus próprios atos, seja pela anulação (atos ilegais, com efeitos retroativos) seja pela revogação (atos legais mas inconvenientes ou inoportunos, com efeitos apenas para o futuro), sempre respeitando direitos adquiridos e sem excluir o controle jurisdicional. Exemplo: um ato administrativo praticado sem observância de requisito formal pode ser anulado de ofício pela própria Administração, independentemente de provocação judicial.$q$,
  jsonb_build_array(jsonb_build_object('title','Súmula nº 473 do STF','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-060',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Contrato de gestão — Organizações Sociais (Lei 9.637/1998)',
  $q$Julgue o item a seguir, com base na Lei nº 9.637/1998.
O contrato de gestão é o instrumento firmado entre o Poder Público e entidade qualificada como Organização Social, com vistas à formação de parceria para fomento e execução de atividades relativas às áreas de ensino, pesquisa científica, desenvolvimento tecnológico, proteção do meio ambiente, cultura e saúde.$q$,
  'C',
  $q$Certo. A Lei nº 9.637/1998 disciplina a qualificação de pessoas jurídicas de direito privado sem fins lucrativos como Organizações Sociais e prevê o contrato de gestão como instrumento de parceria entre o Poder Público e essas entidades, destinado ao fomento e à execução de atividades de interesse público nas áreas expressamente listadas na lei. Exemplo: um hospital administrado por uma Organização Social presta serviços de saúde à população mediante metas de desempenho fixadas no contrato de gestão firmado com o Estado.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.637/1998, arts. 1º e 5º','url','https://www.planalto.gov.br/ccivil_03/leis/l9637.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-061',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Vinculação ao instrumento convocatório',
  $q$Julgue o item a seguir, com base na Lei nº 14.133/2021.
Pelo princípio da vinculação ao instrumento convocatório, a Administração e os licitantes ficam obrigados a observar as regras estabelecidas no edital, não podendo a Administração exigir ou aceitar documento ou condição não previstos no instrumento convocatório.$q$,
  'C',
  $q$Certo. A Lei nº 14.133/2021 elenca, entre os princípios da licitação, a vinculação ao edital, segundo o qual as regras fixadas no instrumento convocatório vinculam tanto a Administração quanto os licitantes durante todo o certame, sendo vedada a exigência ou aceitação de condições estranhas ao que foi previamente estabelecido, sob pena de nulidade do procedimento. Exemplo: se o edital exige certidão específica de regularidade fiscal, a Administração não pode dispensar essa exigência para um licitante nem exigir documento adicional não previsto originalmente.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021, art. 5º','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-062',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Processo administrativo disciplinar — rito sumário (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
O rito sumário do processo administrativo disciplinar é aplicável aos casos de acumulação ilegal de cargos, abandono de cargo e inassiduidade habitual, apresentando prazos mais céleres do que o rito ordinário.$q$,
  'C',
  $q$Certo. O art. 133 da Lei nº 8.112/1990 prevê o procedimento sumário para apurar as infrações de acumulação ilegal de cargos, abandono de cargo e inassiduidade habitual, com prazos reduzidos em relação ao rito ordinário do processo disciplinar, justamente por se tratar, em regra, de situações de mais fácil comprovação documental. Exemplo: a apuração de abandono de cargo, evidenciada por faltas consecutivas ao serviço por mais de trinta dias, tramita pelo rito sumário, mais célere que o processo disciplinar ordinário.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990, art. 133','url','https://www.planalto.gov.br/ccivil_03/leis/l8112cons.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-043',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Ação Direta de Inconstitucionalidade por Omissão',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Declarada a inconstitucionalidade por omissão de medida para tornar efetiva norma constitucional, será dada ciência ao poder competente para a adoção das providências necessárias e, em se tratando de órgão administrativo, para fazê-lo em trinta dias.$q$,
  'C',
  $q$Certo. O art. 103, § 2º, da Constituição Federal disciplina a ação direta de inconstitucionalidade por omissão, que visa combater a inércia do Poder Público em regulamentar normas constitucionais de eficácia limitada; reconhecida a omissão, dá-se ciência ao órgão competente, havendo, no caso de órgão administrativo, prazo de 30 dias para suprir a omissão, diferentemente do que ocorre em relação ao Poder Legislativo, para o qual não há prazo fixado. Exemplo: se uma norma constitucional depende de regulamento de um órgão do Executivo e este permanece inerte, o STF pode fixar prazo de 30 dias para que a omissão seja sanada.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 103, § 2º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-044',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Conselho Nacional de Justiça (art. 103-B, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O Conselho Nacional de Justiça é composto por quinze membros, com mandato de dois anos, admitida uma recondução, cabendo sua presidência ao Presidente do Supremo Tribunal Federal.$q$,
  'C',
  $q$Certo. O art. 103-B da Constituição Federal, incluído pela EC nº 45/2004, estabelece a composição do CNJ com 15 membros de origens diversas (magistrados, membros do Ministério Público, advogados e cidadãos indicados pelo Congresso Nacional), mandato de dois anos e uma recondução admitida, cabendo ao Presidente do STF presidir o órgão. Exemplo: um conselheiro que exerça o mandato por dois anos pode ser reconduzido por mais dois anos, mas não indefinidamente.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 103-B','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-045',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Imunidade material e formal dos parlamentares',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A imunidade material assegura aos deputados e senadores inviolabilidade civil e penal por quaisquer de suas opiniões, palavras e votos, ao passo que a imunidade formal está relacionada às regras especiais sobre prisão e processo a que se sujeitam os parlamentares.$q$,
  'C',
  $q$Certo. O art. 53 da Constituição Federal distingue a imunidade material (caput), que torna os parlamentares invioláveis civil e penalmente por suas manifestações no exercício do mandato, da imunidade formal (parágrafos), relativa às regras específicas sobre prisão (em regra só é possível em flagrante de crime inafiançável) e sobre o processo (possibilidade de sustação da ação penal pela respectiva Casa Legislativa). Exemplo: um deputado não pode ser processado civil ou penalmente por uma opinião política manifestada em discurso no plenário, em razão da imunidade material.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 53','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-046',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Vedações constitucionais aos entes federativos (art. 19, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É vedado à União, aos estados, ao Distrito Federal e aos municípios estabelecer cultos religiosos ou igrejas, subvencioná-los, embaraçar-lhes o funcionamento ou manter com eles ou seus representantes relações de dependência ou aliança, ressalvada a colaboração de interesse público na forma da lei.$q$,
  'C',
  $q$Certo. O art. 19, inciso I, da Constituição Federal reafirma a laicidade do Estado brasileiro, vedando a instituição de cultos oficiais ou a subvenção de igrejas por qualquer ente federativo, admitindo, porém, colaboração pontual de interesse público, prevista em lei, o que não se confunde com vínculo institucional de dependência ou aliança. Exemplo: o Estado pode firmar convênio com uma entidade religiosa para prestação de assistência social à população carente, sem que isso configure violação à laicidade estatal.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 19, I','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-047',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Naturalização (art. 12, II, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São naturalizados brasileiros aqueles originários de países de língua portuguesa que residam no Brasil por um ano ininterrupto e apresentem idoneidade moral, enquanto os demais estrangeiros podem obter a naturalização extraordinária após quinze anos de residência ininterrupta e sem condenação penal.$q$,
  'C',
  $q$Certo. O art. 12, inciso II, da Constituição Federal prevê duas modalidades de naturalização: a ordinária, mais simplificada para os originários de países de língua portuguesa (um ano de residência ininterrupta e idoneidade moral), e a extraordinária, aplicável a qualquer estrangeiro que resida no Brasil por quinze anos ininterruptos, sem condenação penal, desde que requeira a nacionalidade brasileira. Exemplo: um cidadão português pode se naturalizar brasileiro após apenas um ano de residência, enquanto um cidadão de outra nacionalidade, sem esse requisito diferenciado, precisa de quinze anos de residência ininterrupta.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 12, II','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-047',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crime continuado (art. 71, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Quando o agente, mediante mais de uma ação ou omissão, pratica dois ou mais crimes da mesma espécie e, pelas condições de tempo, lugar, maneira de execução e outras semelhantes, devem os subsequentes ser havidos como continuação do primeiro, aplica-se a pena de um só dos crimes, se idênticas, ou a mais grave, se diversas, aumentada, em qualquer caso, de um sexto a dois terços.$q$,
  'C',
  $q$Certo. O art. 71 do Código Penal disciplina a ficção jurídica do crime continuado, tratando, para fins de dosimetria, uma pluralidade de condutas da mesma espécie e com circunstâncias semelhantes de tempo, lugar e modo de execução como se fossem um único delito continuado, o que resulta em pena mais branda do que a soma das penas de cada crime isoladamente. Exemplo: um caixa de banco que, em dias seguidos, subtrai pequenas quantias do mesmo cofre, nas mesmas condições, pode ter suas condutas reconhecidas como crime continuado de furto.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 71','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-048',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a dignidade sexual — estupro de vulnerável',
  $q$Julgue o item a seguir, com base no Código Penal.
Configura o crime de estupro de vulnerável ter conjunção carnal ou praticar outro ato libidinoso com menor de quatorze anos, independentemente de consentimento da vítima, uma vez que a lei presume de forma absoluta sua vulnerabilidade.$q$,
  'C',
  $q$Certo. O art. 217-A do Código Penal tipifica o estupro de vulnerável, presumindo de forma absoluta a vulnerabilidade do menor de 14 anos, de modo que eventual consentimento da vítima é juridicamente irrelevante para afastar a tipicidade da conduta, entendimento também consolidado na Súmula 593 do STJ. Exemplo: ainda que a vítima menor de 14 anos aparente ter consentido com o ato, o crime está configurado, pois a lei não admite prova em contrário quanto à sua incapacidade de consentir validamente.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 217-A; Súmula 593/STJ','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-049',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Desistência voluntária e arrependimento eficaz (art. 15, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
O agente que, voluntariamente, desiste de prosseguir na execução do crime, ou impede que o resultado se produza, só responde pelos atos já praticados, ainda que estes, isoladamente, constituam crime.$q$,
  'C',
  $q$Certo. O art. 15 do Código Penal prevê a "ponte de ouro" da desistência voluntária (o agente interrompe a execução ainda em curso) e do arrependimento eficaz (o agente, após esgotar os atos executórios, impede ativamente a produção do resultado), casos em que o agente responde apenas pelos atos já praticados, e não pelo crime inicialmente pretendido, desde que a desistência ou o impedimento sejam voluntários, ainda que não espontâneos. Exemplo: quem efetua disparos contra a vítima e, arrependido, a socorre e evita sua morte, responde por lesão corporal e não por tentativa de homicídio, se comprovada a eficácia do arrependimento.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 15','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-050',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Reincidência (art. 63, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Verifica-se a reincidência quando o agente comete novo crime depois de transitar em julgado, no país ou no estrangeiro, sentença que o tenha condenado por crime anterior.$q$,
  'C',
  $q$Certo. O art. 63 do Código Penal define a reincidência a partir do cometimento de novo crime após o trânsito em julgado de sentença condenatória por crime anterior, seja essa condenação proferida no Brasil ou no exterior, sendo circunstância agravante genérica na dosimetria da pena e produzindo diversos outros efeitos jurídicos, como o afastamento de determinados benefícios penais. Exemplo: uma pessoa condenada definitivamente por furto em outro país que, ao retornar ao Brasil, comete novo crime, pode ser considerada reincidente para fins do direito penal brasileiro.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 63','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-051',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a Administração Pública — corrupção passiva',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de corrupção passiva consuma-se com a simples solicitação de vantagem indevida pelo funcionário público, ou com a mera aceitação de promessa de vantagem, independentemente do efetivo recebimento.$q$,
  'C',
  $q$Certo. O art. 317 do Código Penal tipifica a corrupção passiva como crime formal, que se consuma com a solicitação, o recebimento ou a simples aceitação de promessa de vantagem indevida pelo funcionário público, em razão da função, não sendo necessário o efetivo recebimento da vantagem para a consumação do delito. Exemplo: se um servidor solicita propina a um particular, o crime já está consumado nesse momento, ainda que o valor nunca chegue a ser efetivamente pago.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 317','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-043',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Prisão temporária (Lei 7.960/1989)',
  $q$Julgue o item a seguir, com base na Lei nº 7.960/1989.
A prisão temporária é cabível durante a investigação policial, com prazo de cinco dias, prorrogável por igual período em caso de extrema e comprovada necessidade, ressalvado prazo diferenciado nos crimes hediondos.$q$,
  'C',
  $q$Certo. A Lei nº 7.960/1989 disciplina a prisão temporária, medida cautelar restrita à fase de investigação, com prazo regra de 5 dias, prorrogáveis por mais 5 em caso de extrema e comprovada necessidade; nos crimes hediondos e equiparados, a Lei nº 8.072/1990 fixa prazo diferenciado de 30 dias, prorrogável por igual período. Exemplo: em uma investigação de homicídio qualificado (crime hediondo), a prisão temporária pode ser decretada por até 30 dias, prorrogáveis por mais 30, diferentemente do prazo regra de 5+5 dias.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.960/1989, art. 2º; Lei nº 8.072/1990, art. 2º, § 4º','url','https://www.planalto.gov.br/ccivil_03/leis/l7960.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-044',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Princípio da correlação (congruência) entre acusação e sentença',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Pelo princípio da correlação, a sentença deve guardar correspondência com a acusação descrita na denúncia ou queixa, sendo vedado ao juiz condenar o réu por fato diverso do narrado, ressalvadas as hipóteses de emendatio libelli e mutatio libelli.$q$,
  'C',
  $q$Certo. O princípio da correlação (ou congruência) impõe que o juiz decida nos limites do fato descrito na peça acusatória, sendo vedada a condenação por fato não narrado, salvo nas hipóteses expressamente previstas nos arts. 383 (emendatio libelli, quando o juiz pode dar definição jurídica diversa ao mesmo fato) e 384 (mutatio libelli, quando surge prova de fato não contido na denúncia, exigindo aditamento) do Código de Processo Penal. Exemplo: se a denúncia descreve furto simples mas a instrução revela circunstância qualificadora não narrada, o juiz não pode simplesmente condenar por furto qualificado sem observar o procedimento de mutatio libelli.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, arts. 383-384','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-045',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Conexão e continência (arts. 76-77, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A conexão ocorre quando duas ou mais infrações penais estão relacionadas entre si, seja por terem sido cometidas ao mesmo tempo por várias pessoas reunidas, seja por uma delas ter sido praticada para facilitar ou ocultar a outra, determinando a reunião dos processos para julgamento conjunto perante o juízo prevalente.$q$,
  'C',
  $q$Certo. O art. 76 do Código de Processo Penal disciplina as hipóteses de conexão (concursal, instrumental ou probatória e teleológica), determinando a reunião de processos perante o juízo prevalente, conforme critérios do art. 78 do mesmo Código, em regra o de maior graduação hierárquica ou o do local da infração mais grave. Exemplo: se duas pessoas cometem um crime em conjunto no mesmo contexto fático, seus processos devem, em regra, ser reunidos e julgados pelo mesmo juízo.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, arts. 76-78','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-046',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Exame de corpo de delito (art. 158, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Quando a infração deixar vestígios, será indispensável o exame de corpo de delito, direto ou indireto, não podendo supri-lo a confissão do acusado.$q$,
  'C',
  $q$Certo. O art. 158 do Código de Processo Penal exige, nos crimes que deixam vestígios materiais (delicta facti permanentis), a realização do exame de corpo de delito, direto (quando os vestígios ainda existem) ou indireto (por meio de outros elementos de prova, quando os vestígios desaparecerem), sendo expressamente vedado que a confissão do acusado substitua essa prova técnica. Exemplo: em um crime de lesão corporal, mesmo que o réu confesse ter agredido a vítima, é necessário o exame de corpo de delito para comprovar a materialidade das lesões, salvo se os vestígios tiverem desaparecido, hipótese em que se admite prova testemunhal supletiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 158','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-047',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Embargos de declaração no processo penal (art. 382, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Cabem embargos de declaração contra sentença ou acórdão em que houver ambiguidade, obscuridade, contradição ou omissão, devendo ser opostos no prazo de dois dias.$q$,
  'C',
  $q$Certo. O art. 382 do Código de Processo Penal admite os embargos de declaração para sanar ambiguidade, obscuridade, contradição ou omissão em decisão judicial, fixando prazo de 2 dias para sua oposição, contados da ciência da decisão embargada, servindo o recurso para aclarar o julgado, e não para reexame do mérito da causa. Exemplo: se uma sentença condenatória deixa de se manifestar sobre um pedido de detração de pena expressamente formulado pela defesa, cabem embargos de declaração para suprir essa omissão.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 382','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-050',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção sobre os Direitos da Criança (1989)',
  $q$Julgue o item a seguir, com base na Convenção sobre os Direitos da Criança (1989).
A Convenção sobre os Direitos da Criança reconhece a criança como sujeito de direitos e consagra o princípio do melhor interesse da criança como consideração primordial em todas as ações que lhe digam respeito, adotadas por instituições públicas ou privadas.$q$,
  'C',
  $q$Certo. A Convenção sobre os Direitos da Criança, ratificada pelo Brasil em 1990, rompe com a visão anterior que tratava a criança como mero objeto de proteção, reconhecendo-a como sujeito pleno de direitos, e consagra em seu art. 3º o princípio do melhor interesse da criança (best interests of the child) como consideração primordial em toda decisão que a afete, seja tomada por autoridades públicas, tribunais ou instituições privadas de assistência social. Exemplo: em uma disputa de guarda entre os pais, a decisão judicial deve priorizar o que for melhor para a criança, e não apenas os interesses dos genitores envolvidos.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 99.710/1990 – Convenção sobre os Direitos da Criança','url','https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d99710.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-051',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Protocolo de Istambul — investigação da tortura',
  $q$Julgue o item a seguir, com base no Protocolo de Istambul (1999).
O Protocolo de Istambul constitui um manual da ONU que estabelece padrões internacionais para a investigação e a documentação eficazes de casos de tortura e maus-tratos, servindo de referência técnica para peritos e autoridades, sem constituir tratado internacional vinculante em sentido estrito.$q$,
  'C',
  $q$Certo. O Protocolo de Istambul (Manual para a Investigação e Documentação Eficazes da Tortura e Outros Tratamentos ou Penas Cruéis, Desumanos ou Degradantes) é um guia técnico elaborado sob os auspícios da ONU, amplamente reconhecido internacionalmente como padrão de referência para a atuação de médicos legistas, peritos e autoridades na apuração de alegações de tortura, mas não tem a natureza de tratado internacional formalmente vinculante como a Convenção da ONU contra a Tortura. Exemplo: peritos oficiais que examinam uma suposta vítima de tortura costumam seguir os protocolos técnicos de entrevista e documentação de lesões estabelecidos nesse manual.$q$,
  jsonb_build_array(jsonb_build_object('title','Protocolo de Istambul — ACNUDH','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-052',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Princípio da vedação ao retrocesso social',
  $q$Julgue o item a seguir, com base na doutrina dos direitos humanos e fundamentais.
Pelo princípio da vedação ao retrocesso social, uma vez concretizado um direito social por meio de normas infraconstitucionais, não pode o legislador suprimi-lo ou reduzi-lo drasticamente sem a adoção de medidas compensatórias equivalentes, sob pena de violação ao núcleo essencial do direito já incorporado ao patrimônio jurídico dos cidadãos.$q$,
  'C',
  $q$Certo. O princípio da vedação ao retrocesso social (ou proibição de retrocesso) protege o núcleo essencial de direitos sociais já implementados por lei, impedindo que o legislador infraconstitucional os suprima ou os esvazie de forma abrupta e sem compensação equivalente, sob o fundamento de que os direitos sociais, uma vez efetivados, passam a integrar o patrimônio jurídico dos indivíduos e da coletividade. Exemplo: a revogação pura e simples de um benefício previdenciário já consolidado, sem qualquer medida substitutiva, pode ser considerada inconstitucional por violar essa vedação.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina constitucional — Princípio da Vedação ao Retrocesso Social','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-053',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Alto Comissariado das Nações Unidas para os Direitos Humanos',
  $q$Julgue o item a seguir, com base no sistema global de proteção dos direitos humanos.
O Alto Comissariado das Nações Unidas para os Direitos Humanos (ACNUDH) é o órgão da ONU responsável por promover e proteger o gozo efetivo dos direitos humanos em geral, distinguindo-se do Alto Comissariado das Nações Unidas para Refugiados (ACNUR), que atua especificamente na proteção de refugiados.$q$,
  'C',
  $q$Certo. O ACNUDH tem mandato amplo de promoção e proteção de todos os direitos humanos reconhecidos internacionalmente, coordenando as atividades da ONU nessa área e prestando apoio técnico a Estados e órgãos das Nações Unidas, enquanto o ACNUR possui mandato específico e mais restrito, voltado à proteção internacional de refugiados e à busca de soluções duradouras para o deslocamento forçado, não se confundindo os dois órgãos apesar da semelhança de siglas. Exemplo: uma denúncia genérica de violação de direitos trabalhistas em um país é matéria de interesse do ACNUDH, ao passo que uma questão específica sobre o status de refugiados é tratada pelo ACNUR.$q$,
  jsonb_build_array(jsonb_build_object('title','Sistema ONU de Direitos Humanos — ACNUDH e ACNUR','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-054',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção para a Prevenção e a Repressão do Crime de Genocídio (1948)',
  $q$Julgue o item a seguir, com base na Convenção para a Prevenção e a Repressão do Crime de Genocídio (1948).
A Convenção define genocídio como atos cometidos com a intenção de destruir, no todo ou em parte, um grupo nacional, étnico, racial ou religioso, como tal, estabelecendo que o genocídio, seja cometido em tempo de paz ou de guerra, constitui crime de direito internacional.$q$,
  'C',
  $q$Certo. A Convenção para a Prevenção e a Repressão do Crime de Genocídio, ratificada pelo Brasil, exige, para a configuração do genocídio, o elemento subjetivo especial (dolo específico) de destruir, total ou parcialmente, um grupo nacional, étnico, racial ou religioso enquanto tal, distinguindo-o de outros crimes contra a humanidade que não exigem essa intenção destrutiva dirigida especificamente ao grupo. Exemplo: assassinatos em massa motivados exclusivamente por pertencimento religioso da vítima, com o propósito de exterminar o grupo religioso, podem configurar genocídio, e não apenas homicídios múltiplos.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 30.822/1952 – Convenção para a Prevenção e a Repressão do Crime de Genocídio','url','https://www.planalto.gov.br/ccivil_03/decreto/1950-1969/d30822.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-046',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Improbidade Administrativa — dolo exigido (Lei 14.230/2021)',
  $q$Julgue o item a seguir, com base na Lei nº 8.429/1992, com a redação dada pela Lei nº 14.230/2021.
A partir da reforma promovida pela Lei nº 14.230/2021, passou-se a exigir a comprovação de dolo específico do agente para a configuração dos atos de improbidade administrativa, afastando-se a modalidade culposa antes admitida para os atos que causam prejuízo ao erário.$q$,
  'C',
  $q$Certo. A Lei nº 14.230/2021 promoveu profunda reforma na Lei de Improbidade Administrativa, extinguindo a modalidade culposa dos atos de improbidade que causam dano ao erário (antes prevista no art. 10, na redação original) e passando a exigir, para todas as modalidades de improbidade, a comprovação de dolo específico do agente, com a finalidade de alcançar o resultado ilícito tipificado ou de assumir o risco de produzi-lo. Exemplo: um gestor que, por mera negligência (sem dolo), causa prejuízo ao erário não mais responde por improbidade administrativa após a reforma de 2021, embora possa responder por outras searas, como a civil ou administrativa disciplinar.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.429/1992, art. 1º, § 1º, com redação da Lei nº 14.230/2021','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-047',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'ECA — medidas socioeducativas (art. 112)',
  $q$Julgue o item a seguir, com base na Lei nº 8.069/1990 (Estatuto da Criança e do Adolescente).
Verificada a prática de ato infracional, a autoridade competente poderá aplicar ao adolescente medidas como advertência, obrigação de reparar o dano, prestação de serviços à comunidade, liberdade assistida, inserção em regime de semiliberdade e internação em estabelecimento educacional, observados os princípios da brevidade, excepcionalidade e respeito à condição peculiar de pessoa em desenvolvimento.$q$,
  'C',
  $q$Certo. O art. 112 do Estatuto da Criança e do Adolescente elenca o rol de medidas socioeducativas aplicáveis ao adolescente autor de ato infracional, e o § 3º do mesmo dispositivo impõe, especialmente para a medida mais gravosa de internação, a observância dos princípios da brevidade, excepcionalidade e respeito à condição peculiar de pessoa em desenvolvimento, conforme reforçado pelo art. 121 do Estatuto. Exemplo: um adolescente que pratica ato infracional de menor gravidade pode receber medida de advertência, reservando-se a internação apenas para casos que efetivamente justifiquem essa medida mais restritiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.069/1990, arts. 112 e 121','url','https://www.planalto.gov.br/ccivil_03/leis/l8069.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-048',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Execução Penal — remição pelo trabalho e pelo estudo',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
O condenado que cumpre pena em regime fechado ou semiaberto poderá remir parte do tempo de execução da pena pelo trabalho ou pelo estudo, à razão de um dia de pena a cada doze horas de frequência escolar ou a cada três dias trabalhados.$q$,
  'C',
  $q$Certo. O art. 126 da Lei de Execução Penal permite a remição de pena tanto pelo estudo (1 dia de pena a cada 12 horas de frequência escolar, divididas em, no mínimo, 3 dias) quanto pelo trabalho (1 dia de pena a cada 3 dias trabalhados), sendo os dois benefícios cumuláveis quando as atividades forem compatíveis entre si, refletindo a política de ressocialização por meio da educação e do trabalho prisional. Exemplo: um preso que estuda e trabalha simultaneamente pode acumular a remição decorrente de ambas as atividades, desde que a carga horária permita a compatibilização.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 126','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-049',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei Antiterrorismo (Lei 13.260/2016)',
  $q$Julgue o item a seguir, com base na Lei nº 13.260/2016.
A Lei Antiterrorismo exclui expressamente de sua incidência as manifestações políticas, os movimentos sociais, sindicais, religiosos ou de categoria profissional dirigidos por propósitos sociais ou reivindicatórios, ainda que envolvam a defesa de direitos e garantias constitucionais.$q$,
  'C',
  $q$Certo. O art. 2º, § 2º, da Lei nº 13.260/2016 exclui expressamente do conceito de terrorismo as condutas praticadas no contexto de manifestações políticas, movimentos sociais, sindicais, religiosos ou de categoria profissional, quando dirigidos por propósitos sociais ou reivindicatórios, com o objetivo de garantir ou defender direitos, garantias e liberdades constitucionais, resguardando a legitimidade de protestos e greves legítimas. Exemplo: uma greve de trabalhadores com bloqueio pacífico de via pública não se enquadra no conceito de terrorismo, ainda que cause transtornos, por se tratar de reivindicação legítima de categoria profissional.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.260/2016, art. 2º, § 2º','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13260.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-050',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Acesso à Informação (Lei 12.527/2011)',
  $q$Julgue o item a seguir, com base na Lei nº 12.527/2011 (Lei de Acesso à Informação).
A Lei de Acesso à Informação assegura o direito fundamental de acesso à informação em poder de órgãos e entidades públicas, estabelecendo que a publicidade é a regra geral e o sigilo, a exceção, devendo os pedidos de acesso ser atendidos imediatamente ou, quando não for possível, no prazo de até vinte dias, prorrogável por mais dez dias mediante justificativa expressa.$q$,
  'C',
  $q$Certo. A Lei nº 12.527/2011 consagra o princípio da publicidade como regra e o sigilo como exceção no trato de informações públicas, fixando, no art. 11, prazo de resposta imediata ou, quando inviável, de até 20 dias, prorrogável por mais 10 dias mediante justificativa expressa comunicada ao solicitante, garantindo transparência ativa e passiva da Administração Pública. Exemplo: um cidadão que solicita informações sobre gastos públicos de um órgão deve receber resposta em até 20 dias, salvo justificativa fundamentada para os 10 dias adicionais de prazo.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.527/2011, art. 11','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm')),
  'fácil', now()
);
