-- Curated (authored) questions, Direito lote 2: Direito Penal, Direito
-- Processual Penal e Legislação Especial. Same authoring approach as
-- 20260929610000: original content, full legal audit (legal_basis,
-- law_version_checked_at, syllabus_topic_id).

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-001',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Excludentes de ilicitude',
  $q$Julgue o item a seguir, com base no Código Penal.
A legítima defesa, prevista no art. 25 do Código Penal, exige que o agente utilize moderadamente os meios necessários para repelir injusta agressão, atual ou iminente, a direito seu ou de outrem, não se caracterizando quando a agressão já cessou.$q$,
  'C',
  $q$Certo. O art. 25 do Código Penal define a legítima defesa como o uso moderado dos meios necessários para repelir injusta agressão, atual ou iminente, a direito próprio ou alheio. Dois pontos merecem destaque: a agressão precisa ser atual (acontecendo naquele momento) ou iminente (prestes a acontecer), e não pode já ter cessado — reagir depois que a agressão terminou não é mais legítima defesa, podendo configurar outro instituto (como o excesso, ou até mesmo um novo crime, dependendo do caso). Além disso, a reação precisa ser moderada: usar força muito além do necessário para repelir a agressão pode caracterizar excesso, afastando a excludente.
Exemplo: revidar um golpe enquanto ainda se está sendo agredido pode ser legítima defesa; mas continuar agredindo o agressor depois que ele já parou e está se afastando não é mais "repelir uma agressão atual", podendo configurar excesso ou até vingança, que a lei não ampara.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-002',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Concurso de pessoas',
  $q$Julgue o item a seguir, com base no Código Penal.
No concurso de pessoas, aquele que, de qualquer modo, concorre para o crime incide nas penas a ele cominadas, na medida de sua culpabilidade, mas a lei prevê a possibilidade de redução de pena para o participante de menor importância na prática do delito.$q$,
  'C',
  $q$Certo. O art. 29, caput, do Código Penal estabelece que "quem, de qualquer modo, concorre para o crime incide nas penas a este cominadas, na medida de sua culpabilidade" — ou seja, a pena não é necessariamente idêntica para todos os envolvidos, devendo ser individualizada conforme o grau de participação de cada um. O § 1º do mesmo artigo complementa que, "se a participação for de menor importância, a pena pode ser diminuída de um sexto a um terço", reconhecendo que nem todo participante contribui da mesma forma decisiva para o resultado do crime.
Exemplo: numa fraude complexa, o autor intelectual que planejou tudo e quem apenas emprestou, sem saber muito do plano, um carro usado no crime, por exemplo, podem responder pelo mesmo crime, mas com penas proporcionalmente diferentes, justamente por causa dessa medida de culpabilidade individual prevista em lei.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-003',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a administração pública',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de corrupção passiva, previsto no art. 317 do Código Penal, configura-se quando o funcionário público solicita ou recebe, para si ou para outrem, direta ou indiretamente, ainda que fora da função ou antes de assumi-la, mas em razão dela, vantagem indevida, ou aceita promessa de tal vantagem.$q$,
  'C',
  $q$Certo. O art. 317, caput, do Código Penal descreve exatamente esse tipo penal: "Solicitar ou receber, para si ou para outrem, direta ou indiretamente, ainda que fora da função ou antes de assumi-la, mas em razão dela, vantagem indevida, ou aceitar promessa de tal vantagem". Um ponto importante é que o crime não exige que o funcionário já esteja no exercício efetivo do cargo no momento do ato — basta que a vantagem seja solicitada ou recebida "em razão da função", mesmo antes de assumi-la ou fora do exercício dela, o que amplia a proteção penal contra o comércio ilícito de influência ligado ao cargo público.
Exemplo: se um candidato aprovado em concurso, ainda antes de tomar posse, já solicita vantagem indevida prometendo facilitar algo assim que assumir o cargo, isso já pode configurar corrupção passiva, porque a vantagem está sendo pedida "em razão" da função que ele está prestes a exercer.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-001',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Inquérito policial',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
O inquérito policial é procedimento de natureza inquisitorial, dispensando o contraditório e a ampla defesa em sua fase, mas isso não impede que o indiciado, por meio de advogado, tenha acesso aos elementos de prova já documentados nos autos que digam respeito ao exercício do direito de defesa.$q$,
  'C',
  $q$Certo. O inquérito policial é, de fato, um procedimento administrativo de natureza inquisitorial (não plenamente contraditório), conduzido pela autoridade policial para reunir elementos que embasem uma futura ação penal. Justamente por isso, o contraditório e a ampla defesa em sentido pleno (como existem no processo judicial) não são obrigatórios nessa fase investigativa. Porém, isso não significa sigilo absoluto e irrestrito: a Súmula Vinculante nº 14 do STF assegura ao advogado o direito de acesso aos elementos de prova já documentados no inquérito que digam respeito ao exercício do direito de defesa do investigado, ainda que as investigações não tenham sido concluídas.
Exemplo: um advogado pode consultar documentos e provas já anexados ao inquérito para preparar a defesa do seu cliente, mesmo que a investigação ainda esteja em curso — o que não é permitido é o acesso a diligências ainda em andamento e não documentadas, que poderiam comprometer a própria investigação se reveladas antecipadamente.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'),jsonb_build_object('title','STF – Súmula Vinculante nº 14','url','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=1230')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-002',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Prisão em flagrante',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Considera-se em flagrante delito quem está cometendo a infração penal, quem acaba de cometê-la, ou quem é perseguido, logo após, pela autoridade, pelo ofendido ou por qualquer pessoa, em situação que faça presumir ser autor da infração.$q$,
  'C',
  $q$Certo. O art. 302 do Código de Processo Penal define as hipóteses de flagrante: (I) está cometendo a infração penal (flagrante próprio); (II) acaba de cometê-la (também flagrante próprio, no sentido de imediatamente após); (III) é perseguido, logo após, pela autoridade, pelo ofendido ou por qualquer pessoa, em situação que faça presumir ser autor da infração (flagrante impróprio ou quase-flagrante); e (IV) é encontrado, logo depois, com instrumentos, armas, objetos ou papéis que façam presumir ser ele autor da infração (flagrante presumido ou ficto). O item descreve corretamente as três primeiras hipóteses previstas no dispositivo.
Exemplo: um policial que vê alguém arrombando um carro está diante de um flagrante próprio; já perseguir alguém logo após um assalto, com base em pistas que apontem para essa pessoa como autora, é um exemplo de flagrante impróprio — situações diferentes, mas todas dentro do conceito legal de flagrante.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-003',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Prisão preventiva',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A prisão preventiva poderá ser decretada como garantia da ordem pública, da ordem econômica, por conveniência da instrução criminal, ou para assegurar a aplicação da lei penal, quando houver prova da existência do crime e indício suficiente de autoria e de perigo gerado pelo estado de liberdade do imputado.$q$,
  'C',
  $q$Certo. O art. 312 do Código de Processo Penal, com a redação dada pela Lei nº 13.964/2019 (Pacote Anticrime), estabelece justamente esses fundamentos para a prisão preventiva: garantia da ordem pública, da ordem econômica, conveniência da instrução criminal ou necessidade de assegurar a aplicação da lei penal, sempre exigindo prova da existência do crime e indício suficiente de autoria, além de — desde a reforma de 2019 — perigo concreto gerado pelo estado de liberdade do investigado ou acusado, o que reforçou a exigência de fundamentação concreta (não apenas abstrata) para decretar essa prisão cautelar.
Exemplo: não basta a gravidade abstrata do crime para decretar prisão preventiva — o juiz precisa demonstrar, com fatos concretos do caso, por que a liberdade do investigado representa um risco real, como risco de fuga, de destruição de provas ou de reiteração criminosa, e não apenas presumir esse risco pela natureza do delito.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '9dfc55b7-7ad4-4b76-9b5f-ea1a7a421254', 'auth-leg-001',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Drogas (Lei 11.343/2006)',
  $q$Julgue o item a seguir, com base na Lei nº 11.343/2006.
A Lei de Drogas estabelece penas distintas para quem pratica tráfico de drogas e para quem as adquire, guarda, tem em depósito, transporta ou traz consigo para consumo pessoal, sendo que, nesse último caso, a lei não prevê pena privativa de liberdade, mas sim medidas como advertência, prestação de serviços à comunidade e medida educativa.$q$,
  'C',
  $q$Certo. O art. 28 da Lei nº 11.343/2006 trata do usuário de drogas de forma diferenciada do traficante: quem adquire, guarda, tem em depósito, transporta ou traz consigo, para consumo pessoal, drogas sem autorização, está sujeito às penas de advertência sobre os efeitos das drogas, prestação de serviços à comunidade e medida educativa de comparecimento a programa ou curso educativo — mas a lei expressamente NÃO prevê pena de prisão para essa conduta, diferentemente do tráfico (art. 33), que tem pena privativa de liberdade bem mais severa. Essa distinção reflete uma política legislativa de tratar o usuário de forma menos punitiva que o traficante.
Exemplo: uma pessoa flagrada portando uma pequena quantidade de droga para uso próprio pode ser encaminhada a um curso educativo ou a prestação de serviços comunitários, mas não vai presa por essa conduta isolada — bem diferente de quem é flagrado vendendo ou distribuindo a droga, que se enquadra no crime de tráfico, com penas privativas de liberdade previstas.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.343/2006 – Lei de Drogas','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '012bdb9d-f67d-48e9-911e-10be9fc9226e', 'auth-leg-002',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Abuso de Autoridade (Lei 13.869/2019)',
  $q$Julgue o item a seguir, com base na Lei nº 13.869/2019.
A Lei de Abuso de Autoridade exige, para a configuração de suas condutas típicas, que o agente atue com a finalidade específica de prejudicar outrem, beneficiar a si mesmo ou a terceiro, ou, ainda, por mero capricho ou satisfação pessoal, não sendo suficiente, por si só, a mera divergência na interpretação de lei ou na avaliação de fatos e provas.$q$,
  'C',
  $q$Certo. O art. 1º, § 1º, da Lei nº 13.869/2019 estabelece que as condutas descritas na lei constituem crime de abuso de autoridade somente quando praticadas com a finalidade específica de prejudicar outrem ou beneficiar a si mesmo ou a terceiro, ou, ainda, por mero capricho ou satisfação pessoal. Esse elemento subjetivo específico (chamado de "dolo específico") é essencial: o § 2º do mesmo artigo complementa que a mera divergência na interpretação de lei ou na avaliação de fatos e provas não configura abuso de autoridade. Essa exigência protege o agente público que atua de boa-fé, ainda que sua decisão técnica ou interpretativa venha a ser questionada ou revertida posteriormente.
Exemplo: um policial que, de boa-fé, interpreta uma situação de forma equivocada, mas sem intenção de prejudicar ninguém ou de se beneficiar, não comete abuso de autoridade só por ter errado tecnicamente — a lei exige a intenção específica de causar dano, beneficiar-se ou agir por capricho, e não pune o simples erro de avaliação feito de boa-fé.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.869/2019 – Lei de Abuso de Autoridade','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-003',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Estatuto do Desarmamento (Lei 10.826/2003)',
  $q$Julgue o item a seguir, com base na Lei nº 10.826/2003.
O porte de arma de fogo é, em regra, vedado a particulares no território nacional, dependendo de autorização específica emitida pela Polícia Federal, com prazo de validade determinado, sendo o porte diferente do registro da arma, que é o ato de cadastrá-la, sem necessariamente autorizar sua circulação fora de casa.$q$,
  'C',
  $q$Certo. A Lei nº 10.826/2003 (Estatuto do Desarmamento) distingue claramente registro de porte de arma: o registro é o ato de cadastrar a arma formalmente perante o órgão competente, permitindo, em regra, apenas mantê-la dentro de casa ou local de trabalho (sob certas condições); já o PORTE é a autorização específica para trazer a arma consigo, fora de casa, em vias e locais públicos, sendo concedido em caráter mais restrito, mediante autorização específica — para civis em geral, emitida pela Polícia Federal —, com prazo de validade determinado e requisitos adicionais mais rigorosos do que os exigidos para o simples registro.
Exemplo: uma pessoa pode ter uma arma registrada e mantê-la dentro de sua residência legalmente, mas isso não significa automaticamente que ela pode circular armada pela rua — para isso, precisaria também da autorização específica de porte, um documento distinto e mais restrito do que o simples registro.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 10.826/2003 – Estatuto do Desarmamento','url','https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm')),
  'média', now()
);
