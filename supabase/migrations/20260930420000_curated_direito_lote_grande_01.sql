-- Curated (authored) questions, Direito lote grande 01: 30 questões cobrindo
-- Administrativo, Constitucional, Penal, Processual Penal, Direitos Humanos
-- e Legislação Especial. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-053',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Delegação de competência (Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
É permitida, em caráter excepcional e por motivos relevantes devidamente justificados, a delegação de competência para a prática de atos administrativos, ainda que o delegante não seja superior hierárquico do delegado, sendo vedada, porém, a delegação para edição de atos de caráter normativo, decisão de recursos administrativos e matérias de competência exclusiva do órgão.$q$,
  'C',
  $q$Certo. Os arts. 12 e 13 da Lei nº 9.784/1999 admitem a delegação de competência mesmo entre órgãos ou autoridades não subordinados hierarquicamente, desde que motivada, vedando-a expressamente para a edição de atos normativos, a decisão de recursos administrativos e as matérias de competência exclusiva do órgão ou autoridade. Exemplo: um órgão pode delegar a prática de atos de mero expediente a outro setor, mas não pode delegar o julgamento de um recurso hierárquico interposto contra sua própria decisão.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999, arts. 12-13','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-054',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Prazo para decisão em processo administrativo (Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
Concluída a instrução do processo administrativo, a Administração tem o prazo de até trinta dias para decidir, salvo prorrogação por igual período, expressamente motivada.$q$,
  'C',
  $q$Certo. O art. 49 da Lei nº 9.784/1999 fixa prazo de até 30 dias, contados do encerramento da instrução, para que a Administração profira decisão, permitindo prorrogação motivada por igual período. Exemplo: em um processo complexo com muitas provas, o órgão pode justificar a necessidade de mais 30 dias para decidir, desde que fundamente essa prorrogação.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999, art. 49','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-055',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Reversão do servidor (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
A reversão é o retorno à atividade do servidor aposentado por invalidez, quando junta médica oficial declarar insubsistentes os motivos da aposentadoria, podendo ocorrer também no interesse da administração, desde que satisfeitos os requisitos legais específicos para essa segunda modalidade.$q$,
  'C',
  $q$Certo. O art. 25 da Lei nº 8.112/1990 prevê duas hipóteses de reversão: (i) quando junta médica oficial declara insubsistentes os motivos da aposentadoria por invalidez, sendo obrigatória; e (ii) no interesse da administração, exigindo, entre outros requisitos, que o servidor tenha sido estável quando em atividade e que a aposentadoria tenha sido voluntária. Exemplo: um servidor aposentado por invalidez que, após exame médico, é considerado apto ao trabalho deve reverter à atividade.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990, art. 25','url','https://www.planalto.gov.br/ccivil_03/leis/l8112cons.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-056',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Contratação direta por emergência (Lei 14.133/2021)',
  $q$Julgue o item a seguir, com base na Lei nº 14.133/2021.
É dispensável a licitação nos casos de emergência ou calamidade pública, quando caracterizada urgência de atendimento de situação que possa ocasionar prejuízo ou comprometer a segurança de pessoas, obras ou bens, sendo a contratação restrita à parcela necessária ao atendimento da situação emergencial e vedada a prorrogação dos respectivos contratos.$q$,
  'C',
  $q$Certo. O art. 75, inciso VIII, da Lei nº 14.133/2021 autoriza a dispensa de licitação em situações emergenciais ou de calamidade pública, limitando a contratação direta ao estritamente necessário para afastar o risco, com prazo máximo de vigência de um ano e vedação expressa à prorrogação. Exemplo: após uma enchente que danifica uma ponte de acesso a um hospital, o Poder Público pode contratar diretamente a obra emergencial de reparo, sem licitação prévia.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021, art. 75, VIII','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-057',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Responsabilidade civil do Estado — ação regressiva',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
As pessoas jurídicas de direito público e as de direito privado prestadoras de serviços públicos responderão pelos danos que seus agentes, nessa qualidade, causarem a terceiros, assegurado o direito de regresso contra o responsável nos casos de dolo ou culpa.$q$,
  'C',
  $q$Certo. O art. 37, § 6º, da Constituição Federal consagra a responsabilidade objetiva do Estado (e de prestadoras de serviço público) perante terceiros, sob a teoria do risco administrativo, ao mesmo tempo em que assegura o direito de regresso contra o agente causador do dano, condicionado à comprovação de dolo ou culpa deste, já que em relação ao agente a responsabilidade é subjetiva. Exemplo: se um agente público, dirigindo embriagado um veículo oficial, causa acidente com terceiro, o Estado indeniza a vítima independentemente de culpa, mas pode depois cobrar do agente o valor pago, por ação regressiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 37, § 6º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-038',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Competências privativas da União (art. 22, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Compete privativamente à União legislar sobre direito civil, comercial, penal, processual, eleitoral, agrário, marítimo, aeronáutico, espacial e do trabalho, podendo lei complementar autorizar os estados a legislar sobre questões específicas dessas matérias.$q$,
  'C',
  $q$Certo. O art. 22, caput, da Constituição Federal enumera as matérias de competência legislativa privativa da União, e o parágrafo único do mesmo artigo permite que lei complementar autorize os estados a legislar sobre pontos específicos dessas matérias, flexibilizando a rigidez da competência privativa. Exemplo: uma lei complementar federal pode autorizar um estado a legislar sobre um aspecto pontual do direito processual relacionado a peculiaridades regionais.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 22','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-039',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Impeachment do Presidente da República (art. 86, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Admitida a acusação contra o Presidente da República, por dois terços da Câmara dos Deputados, será ele submetido a julgamento perante o Supremo Tribunal Federal, nas infrações penais comuns, ou perante o Senado Federal, nos crimes de responsabilidade.$q$,
  'C',
  $q$Certo. O art. 86 da Constituição Federal estabelece o rito bifásico: a Câmara dos Deputados, por 2/3 de seus membros, autoriza a instauração do processo, e a partir daí o julgamento de mérito ocorre no STF (crimes comuns) ou no Senado Federal (crimes de responsabilidade), este último presidido pelo Presidente do STF. Exemplo: se o Presidente é acusado de crime de responsabilidade, mesmo após a autorização da Câmara, quem julga o mérito é o Senado, e não a própria Câmara.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 86','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-040',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Garantias da magistratura (art. 95, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São garantias constitucionais dos juízes a vitaliciedade, a inamovibilidade e a irredutibilidade de subsídio, esta última ressalvado o disposto nos arts. 37, X e XI, 39, § 4º, 150, II, 153, III, e 153, § 2º, I, da Constituição.$q$,
  'C',
  $q$Certo. O art. 95 da Constituição Federal assegura aos magistrados as garantias de vitaliciedade (perda do cargo apenas por sentença judicial transitada em julgado), inamovibilidade (salvo por interesse público, por decisão do respectivo tribunal) e irredutibilidade de subsídio, esta sujeita às ressalvas constitucionais relativas à incidência de tributos e a tetos remuneratórios. Exemplo: um juiz não pode ser removido de sua comarca contra a sua vontade, exceto por decisão fundamentada do tribunal, por interesse público.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 95','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-041',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Súmula vinculante (art. 103-A, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O Supremo Tribunal Federal poderá, de ofício ou por provocação, mediante decisão de dois terços de seus membros, após reiteradas decisões sobre matéria constitucional, aprovar súmula que terá efeito vinculante em relação aos demais órgãos do Poder Judiciário e à administração pública direta e indireta, nas esferas federal, estadual e municipal.$q$,
  'C',
  $q$Certo. O art. 103-A da Constituição Federal, incluído pela EC nº 45/2004, disciplina a súmula vinculante, exigindo quórum qualificado de 2/3 dos ministros do STF e reiteradas decisões sobre a mesma matéria constitucional, com eficácia vinculante para o Judiciário e a administração pública em todas as esferas federativas. Exemplo: uma vez editada uma súmula vinculante sobre determinado tema, um órgão da administração municipal fica obrigado a segui-la, sob pena de reclamação ao STF.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 103-A','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-042',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Direito à saúde — competência comum (art. 23, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É competência comum da União, dos estados, do Distrito Federal e dos municípios cuidar da saúde e assistência pública, da proteção e garantia das pessoas portadoras de deficiência.$q$,
  'C',
  $q$Certo. O art. 23, inciso II, da Constituição Federal atribui a todos os entes federativos, de forma comum e cumulativa (não exclusiva), a competência material para cuidar da saúde e assistência pública, o que permite atuação simultânea da União, dos estados, do Distrito Federal e dos municípios nessa área. Exemplo: tanto o município quanto o estado e a União podem manter unidades de saúde e programas de assistência, sem que a atuação de um exclua a dos demais.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 23, II','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-042',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a Administração Pública — concussão',
  $q$Julgue o item a seguir, com base no Código Penal.
Comete o crime de concussão o funcionário público que exige, para si ou para outrem, direta ou indiretamente, ainda que fora da função ou antes de assumi-la, mas em razão dela, vantagem indevida, distinguindo-se da corrupção passiva pelo verbo "exigir", que denota conduta unilateral e impositiva, em vez de mera solicitação, recebimento ou aceitação de promessa.$q$,
  'C',
  $q$Certo. O art. 316 do Código Penal tipifica a concussão pelo verbo "exigir", que representa conduta imperativa e unilateral do agente público em relação à vítima, ao passo que a corrupção passiva (art. 317 do CP) pressupõe solicitação, recebimento ou aceitação de promessa de vantagem, condutas que admitem maior grau de consentimento ou bilateralidade entre agente e particular. Exemplo: um fiscal que exige suborno sob ameaça de autuação indevida comete concussão; se apenas aceitasse uma oferta espontânea do fiscalizado, seria corrupção passiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-043',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra o patrimônio — extorsão',
  $q$Julgue o item a seguir, com base no Código Penal e na jurisprudência do STJ.
O crime de extorsão consuma-se no momento do constrangimento exercido mediante violência ou grave ameaça, independentemente da obtenção da vantagem econômica indevida, sendo, portanto, classificado como crime formal.$q$,
  'C',
  $q$Certo. Nos termos da Súmula nº 96 do STJ, "o crime de extorsão consuma-se independentemente da obtenção da vantagem indevida", bastando o emprego de violência ou grave ameaça com o fim de obter a vantagem, o que confirma sua natureza de crime formal. Diferencia-se do roubo porque, na extorsão, exige-se um comportamento ativo da própria vítima (entregar, assinar, fazer algo) para que o resultado almejado pelo agente se concretize. Exemplo: se o agente ameaça a vítima para que ela assine um cheque, o crime já está consumado no momento da ameaça, ainda que o cheque nunca seja compensado.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 158; Súmula 96/STJ','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-044',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crime de tortura (Lei 9.455/1997)',
  $q$Julgue o item a seguir, com base na Lei nº 9.455/1997.
O crime de tortura pode ser praticado por qualquer pessoa, não exigindo a condição de funcionário público, mas, caso o agente ostente essa qualidade, incide causa especial de aumento de pena.$q$,
  'C',
  $q$Certo. A Lei nº 9.455/1997 não restringe o sujeito ativo do crime de tortura a funcionários públicos, podendo ser praticado por particulares (ex.: pais que torturam filhos, sequestradores que torturam reféns). O art. 1º, § 4º, inciso II, prevê que a pena é aumentada de um sexto até um terço se o crime é cometido por agente público, justamente por essa qualidade especial representar maior reprovabilidade da conduta. Exemplo: um particular que tortura uma pessoa sob sua guarda para obter confissão comete o crime; se fosse um policial na mesma situação, a pena seria majorada.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.455/1997, art. 1º, § 4º, II','url','https://www.planalto.gov.br/ccivil_03/leis/l9455.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-045',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Legítima defesa (art. 25, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Considera-se em legítima defesa quem, usando moderadamente dos meios necessários, repele injusta agressão, atual ou iminente, a direito seu ou de outrem.$q$,
  'C',
  $q$Certo. O art. 25 do Código Penal define a legítima defesa a partir de quatro elementos: agressão injusta, atual ou iminente, uso moderado dos meios necessários e proteção de direito próprio ou alheio, sendo causa excludente de ilicitude. Exemplo: se alguém é atacado com uma faca e reage imobilizando o agressor com força proporcional ao ataque, age em legítima defesa; se, após já neutralizado o agressor, continuar agredindo-o sem necessidade, incorre em excesso.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 25','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-046',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Abolitio criminis (art. 2º, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Ninguém pode ser punido por fato que lei posterior deixa de considerar crime, cessando em virtude dela a execução e os efeitos penais da sentença condenatória, sem prejuízo, todavia, dos efeitos civis decorrentes do ato.$q$,
  'C',
  $q$Certo. O art. 2º, caput, do Código Penal consagra a abolitio criminis, hipótese de retroatividade da lei penal mais benéfica em que a descriminalização de uma conduta faz cessar a execução da pena e os efeitos penais da condenação (como a reincidência), mas preserva os efeitos extrapenais, como a obrigação civil de reparar o dano causado pelo ato. Exemplo: se uma condenação por determinado crime já extinto deixa de existir, o condenado é posto em liberdade e não figura mais como reincidente, mas ainda pode ser obrigado a indenizar a vítima pelos prejuízos causados.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 2º, caput','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-038',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Prisão domiciliar (arts. 317-318, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A prisão domiciliar consiste no recolhimento do indiciado ou acusado em sua residência, substituindo a prisão preventiva, cabível, entre outras hipóteses, quando o agente for maior de oitenta anos, extremamente debilitado por doença grave, ou imprescindível aos cuidados especiais de pessoa menor de seis anos ou com deficiência.$q$,
  'C',
  $q$Certo. Os arts. 317 e 318 do Código de Processo Penal preveem a prisão domiciliar como substitutiva da prisão preventiva em hipóteses específicas, entre elas a idade avançada (maior de 80 anos), o estado de saúde grave, e a imprescindibilidade dos cuidados do agente a pessoa menor de 6 anos ou com deficiência, refletindo a preocupação do legislador com situações de vulnerabilidade que tornam desproporcional a prisão em estabelecimento comum. Exemplo: um pai que é o único responsável pelos cuidados de um filho pequeno pode ter a prisão preventiva convertida em domiciliar, desde que comprovada essa imprescindibilidade.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, arts. 317-318','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-039',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Princípio do juiz natural',
  $q$Julgue o item a seguir, com base na Constituição Federal e no Código de Processo Penal.
O princípio do juiz natural veda a instituição de tribunais de exceção e exige que ninguém seja processado nem sentenciado senão pela autoridade competente, fixada segundo critérios legais previamente estabelecidos e não posteriores ao fato investigado.$q$,
  'C',
  $q$Certo. O art. 5º, incisos XXXVII e LIII, da Constituição Federal veda a criação de juízo ou tribunal de exceção e assegura que ninguém será processado nem sentenciado senão pela autoridade competente, o que significa que os critérios de fixação de competência devem ser previamente definidos em lei, e não estabelecidos após a ocorrência do fato para direcionar o julgamento a determinado órgão. Exemplo: não é permitido criar um tribunal especial, após o cometimento de um crime, apenas para julgar aquele caso específico.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, XXXVII e LIII','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-040',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Ação penal pública condicionada (art. 24, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A ação penal pública condicionada depende de representação do ofendido ou de seu representante legal, ou de requisição do ministro da Justiça, nos casos previstos expressamente em lei.$q$,
  'C',
  $q$Certo. O art. 24 do Código de Processo Penal estabelece que a ação penal pública é promovida pelo Ministério Público, mas, quando a lei exige, depende de representação do ofendido (ou de quem tenha qualidade para representá-lo) ou de requisição do Ministro da Justiça, como condição de procedibilidade sem a qual o MP não pode oferecer a denúncia. Exemplo: em determinados crimes contra a honra, a ação penal pública depende de representação da vítima, e sem essa manifestação de vontade o Ministério Público não pode agir.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 24','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-041',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Recurso extraordinário e recurso especial no processo penal',
  $q$Julgue o item a seguir, com base na Constituição Federal.
Cabe recurso extraordinário ao Supremo Tribunal Federal quando a decisão recorrida contrariar dispositivo da Constituição, e cabe recurso especial ao Superior Tribunal de Justiça quando a decisão contrariar lei federal ou divergir de julgado de outro tribunal, exigindo-se, em ambos os casos, o esgotamento das instâncias ordinárias.$q$,
  'C',
  $q$Certo. Os arts. 102, III, e 105, III, da Constituição Federal disciplinam, respectivamente, o cabimento do recurso extraordinário (violação a dispositivo constitucional) e do recurso especial (violação a lei federal ou divergência jurisprudencial), ambos exigindo o prévio esgotamento das vias recursais ordinárias e o devido prequestionamento da matéria. Exemplo: uma decisão de tribunal estadual que interprete de forma diferente de outro tribunal a mesma norma federal pode ensejar recurso especial ao STJ, para uniformizar a interpretação.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, arts. 102, III, e 105, III','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-042',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Revisão criminal (art. 621, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A revisão criminal é cabível a qualquer tempo, antes da extinção da pena ou após, sempre em favor do condenado, quando a sentença condenatória for contrária a texto expresso de lei, se fundar em provas falsas, ou quando, após a sentença, se descobrirem novas provas de inocência.$q$,
  'C',
  $q$Certo. O art. 621 do Código de Processo Penal admite a revisão criminal, ação autônoma de impugnação, sem prazo prescricional (a qualquer tempo), exclusivamente em favor do réu — nunca pro societate — nas hipóteses de decisão contrária a texto de lei ou à evidência dos autos, fundamento em provas falsas, ou descoberta de novas provas de inocência após a condenação. Exemplo: se, anos após o trânsito em julgado, surge um exame de DNA que comprova a inocência do condenado, cabe revisão criminal para desconstituir a condenação, mesmo que a pena já tenha sido cumprida.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 621','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-045',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção de 1951 sobre o Estatuto dos Refugiados',
  $q$Julgue o item a seguir, com base na Convenção de 1951 relativa ao Estatuto dos Refugiados.
Refugiado é a pessoa que, devido a fundado temor de perseguição por motivos de raça, religião, nacionalidade, grupo social ou opinião política, encontra-se fora do país de sua nacionalidade e não pode ou, em razão desse temor, não quer valer-se da proteção desse país, sendo vedada sua devolução ao território onde sua vida ou liberdade estejam ameaçadas.$q$,
  'C',
  $q$Certo. A Convenção de 1951 relativa ao Estatuto dos Refugiados, ratificada pelo Brasil, define refugiado a partir do fundado temor de perseguição por um dos motivos elencados e consagra o princípio do non-refoulement, que proíbe a devolução do refugiado para território onde sua vida ou liberdade estejam ameaçadas, sendo esse princípio um dos pilares do Direito Internacional dos Refugiados. Exemplo: um Estado signatário não pode deportar um refugiado reconhecido de volta ao seu país de origem se lá sua vida correr risco em razão de perseguição política.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 50.215/1961 – Convenção relativa ao Estatuto dos Refugiados (1951)','url','https://www.planalto.gov.br/ccivil_03/decreto/1950-1969/d50215.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-046',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção Interamericana para Prevenir e Punir a Tortura',
  $q$Julgue o item a seguir, com base na Convenção Interamericana para Prevenir e Punir a Tortura (1985).
O conceito de tortura adotado pela Convenção Interamericana é mais amplo do que o da Convenção da ONU contra a Tortura, ao incluir métodos que anulem a personalidade da vítima ou diminuam sua capacidade física ou mental, ainda que não causem dor física ou angústia psíquica.$q$,
  'C',
  $q$Certo. A Convenção Interamericana para Prevenir e Punir a Tortura, ratificada pelo Brasil em 1989, amplia o conceito de tortura em relação à Convenção da ONU (1984) ao abranger também métodos que, mesmo sem causar dor física ou angústia psíquica imediata, tenham a finalidade ou o efeito de anular a personalidade da vítima ou diminuir sua capacidade física ou mental. Exemplo: técnicas de privação sensorial prolongada, que não causam dor física direta mas comprometem a capacidade mental da vítima, podem se enquadrar nesse conceito ampliado.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 98.386/1989 – Convenção Interamericana para Prevenir e Punir a Tortura','url','https://www.planalto.gov.br/ccivil_03/decreto/1980-1989/d98386.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-047',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Assistência consular (Convenção de Viena de 1963)',
  $q$Julgue o item a seguir, com base na Convenção de Viena sobre Relações Consulares (1963).
O estrangeiro preso em outro país tem o direito de se comunicar com a repartição consular do seu Estado de origem, devendo a autoridade que efetuou a prisão informá-lo desse direito sem demora.$q$,
  'C',
  $q$Certo. O art. 36 da Convenção de Viena sobre Relações Consulares assegura ao estrangeiro preso, detido ou em prisão preventiva o direito de comunicação com a repartição consular de seu país, impondo à autoridade competente do Estado receptor o dever de informar esse direito ao estrangeiro sem demora, permitindo o exercício da assistência consular como garantia adicional ao devido processo legal em contexto de nacionalidade estrangeira. Exemplo: ao prender um turista estrangeiro, a autoridade policial deve informá-lo de que pode contatar o consulado de seu país para obter assistência.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 61.078/1967 – Convenção de Viena sobre Relações Consulares, art. 36','url','https://www.planalto.gov.br/ccivil_03/decreto/d61078.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-048',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Dignidade da pessoa humana como fundamento (art. 1º, III, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A dignidade da pessoa humana é fundamento da República Federativa do Brasil e funciona como princípio matriz dos direitos fundamentais, servindo de vetor interpretativo para todo o ordenamento jurídico, ainda que não gere, por si só, direitos subjetivos específicos e determinados.$q$,
  'C',
  $q$Certo. O art. 1º, inciso III, da Constituição Federal eleva a dignidade da pessoa humana a fundamento da República, atribuindo-lhe a função de princípio estruturante que informa a interpretação de todo o sistema de direitos fundamentais, ainda que sua concretização normalmente dependa da conjugação com outras normas constitucionais e infraconstitucionais mais específicas. Exemplo: ao interpretar uma lei que restrinja direitos de presos, o intérprete deve levar em conta a dignidade da pessoa humana como parâmetro para aferir a proporcionalidade da restrição.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 1º, III','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-049',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Comissão Interamericana de Direitos Humanos — petições individuais',
  $q$Julgue o item a seguir, com base na Convenção Americana sobre Direitos Humanos.
Qualquer pessoa, grupo de pessoas ou entidade não governamental pode apresentar à Comissão Interamericana de Direitos Humanos petições contendo denúncia de violação da Convenção Americana por um Estado-parte, exigindo-se, em regra, o prévio esgotamento dos recursos internos, salvo exceções previstas na própria Convenção.$q$,
  'C',
  $q$Certo. O art. 44 da Convenção Americana sobre Direitos Humanos legitima amplamente a apresentação de petições individuais perante a Comissão Interamericana, não exigindo que o peticionário seja a própria vítima, e o art. 46 estabelece, como regra geral, a necessidade de esgotamento dos recursos da jurisdição interna antes do acionamento do sistema interamericano, ressalvadas hipóteses como a inexistência de devido processo legal interno ou a demora injustificada na decisão. Exemplo: uma organização não governamental pode denunciar à Comissão a violação de direitos de um grupo de presos, mesmo sem ser ela própria a vítima direta.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 678/1992 – Convenção Americana sobre Direitos Humanos, arts. 44 e 46','url','https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-041',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Interceptação Telefônica (Lei 9.296/1996)',
  $q$Julgue o item a seguir, com base na Lei nº 9.296/1996.
A interceptação de comunicações telefônicas depende de ordem do juiz competente da ação principal, sob segredo de justiça, não sendo admitida quando o fato investigado constituir infração penal punida, no máximo, com pena de detenção.$q$,
  'C',
  $q$Certo. A Lei nº 9.296/1996 exige autorização judicial prévia e fundamentada do juiz competente da ação principal para a interceptação telefônica, processada sob sigilo, e o art. 2º, inciso III, veda a medida quando o fato investigado for punido apenas com detenção, reservando essa técnica invasiva de investigação para crimes de maior gravidade, em regra punidos com reclusão. Exemplo: a investigação de uma contravenção penal não pode, isoladamente, justificar uma interceptação telefônica, por não atingir o patamar de gravidade exigido pela lei.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.296/1996, arts. 1º e 2º','url','https://www.planalto.gov.br/ccivil_03/leis/l9296.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-042',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Estatuto do Desarmamento (Lei 10.826/2003)',
  $q$Julgue o item a seguir, com base na Lei nº 10.826/2003.
A posse de arma de fogo é o exercício do direito de manter a arma registrada dentro dos limites da residência ou local de trabalho, ao passo que o porte, em regra vedado ao cidadão comum, exige autorização específica e permite que a arma seja transportada fora desses limites.$q$,
  'C',
  $q$Certo. O Estatuto do Desarmamento distingue posse (manutenção da arma de fogo, com registro, no interior de residência ou local de trabalho) e porte (autorização para transportar a arma fora desses limites), sendo o porte, em regra, vedado ao cidadão comum, salvo exceções legais e mediante autorização específica da Polícia Federal, diferentemente das categorias com porte funcional, como policiais e membros das Forças Armadas. Exemplo: um cidadão que possui registro de arma em casa não pode, apenas com base nesse registro, circular armado pela rua, pois isso configuraria porte ilegal.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 10.826/2003, arts. 4º e 6º','url','https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-043',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Lavagem de Dinheiro (Lei 9.613/1998)',
  $q$Julgue o item a seguir, com base na Lei nº 9.613/1998.
Após a alteração promovida pela Lei nº 12.683/2012, o crime de lavagem de dinheiro pode ter como antecedente qualquer infração penal, tendo sido abolido o rol taxativo de crimes antecedentes previsto na redação original da lei.$q$,
  'C',
  $q$Certo. A redação original da Lei nº 9.613/1998 exigia que a lavagem de dinheiro decorresse de um rol taxativo de crimes antecedentes (tráfico, terrorismo, corrupção, entre outros). A Lei nº 12.683/2012 eliminou essa exigência, passando a admitir qualquer infração penal como antecedente apto a caracterizar a lavagem, desde que os bens, direitos ou valores tenham origem, direta ou indireta, dessa infração. Exemplo: atualmente, mesmo um crime patrimonial não elencado no rol antigo pode servir de base para a caracterização de lavagem de dinheiro dos valores dele decorrentes.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.613/1998, art. 1º, com redação da Lei nº 12.683/2012','url','https://www.planalto.gov.br/ccivil_03/leis/l9613.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-044',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei Maria da Penha — medidas protetivas de urgência',
  $q$Julgue o item a seguir, com base na Lei nº 11.340/2006 (Lei Maria da Penha).
As medidas protetivas de urgência podem ser concedidas pelo juiz imediatamente, independentemente de audiência das partes e de manifestação do Ministério Público, no prazo de quarenta e oito horas.$q$,
  'C',
  $q$Certo. O art. 18 da Lei nº 11.340/2006 autoriza o juiz a conceder as medidas protetivas de urgência de imediato, sem necessidade de oitiva prévia das partes ou de manifestação do Ministério Público, justamente para garantir a proteção célere da vítima em situação de risco, sendo comunicado o Ministério Público após a concessão. Exemplo: recebido o pedido de medida protetiva, o juiz pode determinar o afastamento do agressor do lar em até 48 horas, sem aguardar manifestação prévia do parquet.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.340/2006, art. 18','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-045',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Organização criminosa — conceito legal (Lei 12.850/2013)',
  $q$Julgue o item a seguir, com base na Lei nº 12.850/2013.
Considera-se organização criminosa a associação de quatro ou mais pessoas estruturalmente ordenada e caracterizada pela divisão de tarefas, ainda que informalmente, com objetivo de obter, direta ou indiretamente, vantagem de qualquer natureza, mediante a prática de infrações penais cujas penas máximas sejam superiores a quatro anos, ou que sejam de caráter transnacional.$q$,
  'C',
  $q$Certo. O art. 1º, § 1º, da Lei nº 12.850/2013 traz a definição legal de organização criminosa, exigindo, cumulativamente: (i) associação de 4 ou mais pessoas; (ii) estrutura ordenada com divisão de tarefas, ainda que informal; (iii) finalidade de obter vantagem de qualquer natureza; e (iv) prática de infrações com pena máxima superior a 4 anos, ou de caráter transnacional (hipótese em que a exigência de pena não se aplica). Exemplo: um grupo de três pessoas, por não atingir o número mínimo de integrantes exigido pela lei, não se enquadra no conceito legal de organização criminosa, ainda que estruturado e com divisão de tarefas.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.850/2013, art. 1º, § 1º','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm')),
  'média', now()
);
