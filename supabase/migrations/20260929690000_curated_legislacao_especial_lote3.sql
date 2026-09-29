-- Curated (authored) questions, Direito lote 9: mais Legislação Especial
-- (Improbidade Administrativa, Acesso à Informação, Interceptação
-- Telefônica). Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-009',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Improbidade Administrativa',
  $q$Julgue o item a seguir, com base na Lei nº 8.429/1992, com as alterações da Lei nº 14.230/2021.
Após as alterações promovidas pela Lei nº 14.230/2021, os atos de improbidade administrativa que causam prejuízo ao erário passaram a exigir, para sua caracterização, a comprovação de dolo do agente, não mais bastando a mera culpa (conduta culposa).$q$,
  'C',
  $q$Certo. Antes da reforma promovida pela Lei nº 14.230/2021, o art. 10 da Lei nº 8.429/1992 admitia a modalidade culposa para os atos de improbidade que causassem prejuízo ao erário — ou seja, mesmo um erro não intencional, mas negligente, poderia configurar improbidade nessa modalidade. A reforma de 2021 alterou significativamente esse panorama: o novo art. 1º, § 1º, passou a exigir, para toda e qualquer modalidade de improbidade administrativa (incluindo a que causa prejuízo ao erário), a comprovação de dolo (vontade consciente) do agente, afastando expressamente a responsabilização por simples culpa. Essa mudança foi uma das mais relevantes da reforma, tornando mais rigoroso o padrão de prova exigido para a condenação por improbidade.
Exemplo: antes da reforma, um gestor que, por descuido (sem má-fé), causasse prejuízo ao erário poderia responder por improbidade culposa; depois da Lei nº 14.230/2021, esse mesmo gestor só responderá por improbidade se ficar demonstrado que ele agiu de forma dolosa (intencional), e não apenas por erro ou desatenção.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.429/1992 – Lei de Improbidade Administrativa, com alterações da Lei nº 14.230/2021','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-010',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Acesso à Informação',
  $q$Julgue o item a seguir, com base na Lei nº 12.527/2011.
A Lei de Acesso à Informação estabelece que o acesso à informação pública é a regra, e o sigilo, a exceção, sendo assegurado a qualquer interessado o direito de obter informação pública de órgãos e entidades, mediante procedimento objetivo e ágil, sem necessidade de apresentar os motivos que ensejam o pedido.$q$,
  'C',
  $q$Certo. A Lei nº 12.527/2011 (Lei de Acesso à Informação — LAI) consagra, entre seus princípios, a publicidade como regra geral e o sigilo como exceção, invertendo a lógica que antes prevalecia na administração pública. O art. 10, § 3º, da lei estabelece expressamente que "são vedadas quaisquer exigências relativas aos motivos determinantes da solicitação de informações de interesse público" — ou seja, o cidadão que pede acesso a uma informação pública não precisa justificar por que quer aquela informação; basta fazer o pedido, seguindo o procedimento objetivo previsto na lei, para que o órgão público, em regra, forneça a informação solicitada, salvo hipóteses específicas de sigilo legalmente justificado.
Exemplo: qualquer pessoa pode solicitar, por exemplo, informações sobre gastos públicos de um determinado órgão sem precisar explicar "por que" quer saber disso — a simples condição de cidadão interessado já é suficiente para exercer esse direito de acesso, dentro dos limites legais.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.527/2011 – Lei de Acesso à Informação','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-011',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Interceptação Telefônica',
  $q$Julgue o item a seguir, com base na Lei nº 9.296/1996.
A interceptação de comunicações telefônicas, para fins de investigação criminal ou instrução processual penal, depende de ordem do juiz competente, sendo vedada quando o fato investigado constituir infração penal punida, no máximo, com pena de detenção.$q$,
  'C',
  $q$Certo. O art. 1º da Lei nº 9.296/1996 estabelece que a interceptação telefônica, para fins de investigação criminal ou instrução processual penal, depende de ordem do juiz competente da ação principal, sob segredo de justiça. Já o art. 2º, inciso III, veda a interceptação quando "o fato investigado constituir infração penal punida, no máximo, com pena de detenção" — ou seja, para crimes considerados de menor gravidade (aqueles cuja pena máxima é apenas detenção, e não reclusão), a lei não autoriza esse meio de prova mais invasivo, reservando a interceptação telefônica para casos de maior gravidade, em respeito ao princípio da proporcionalidade entre a medida invasiva e a importância do bem jurídico investigado.
Exemplo: uma investigação sobre um crime grave, punido com reclusão, como um homicídio ou um esquema de corrupção, pode, em tese, justificar a autorização judicial de interceptação telefônica; já uma infração de menor gravidade, punida apenas com detenção, não permite esse tipo de medida, ainda que o juiz concordasse em autorizá-la — a própria lei já veda essa possibilidade nesses casos.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.296/1996 – Lei de Interceptação Telefônica','url','https://www.planalto.gov.br/ccivil_03/leis/l9296.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-008',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Súmula Vinculante 11 — uso de algemas',
  $q$Julgue o item a seguir, com base na jurisprudência do Supremo Tribunal Federal.
Segundo a Súmula Vinculante nº 11 do STF, o uso de algemas só é lícito em casos de resistência, de fundado receio de fuga ou de perigo à integridade física própria ou alheia, exigindo-se, em qualquer caso, justificativa escrita, sob pena de responsabilidade civil do Estado e do agente que descumprir a determinação.$q$,
  'C',
  $q$Certo. A Súmula Vinculante nº 11 do STF fixa exatamente esses limites: "Só é lícito o uso de algemas em casos de resistência e de fundado receio de fuga ou de perigo à integridade física própria ou alheia, por parte do preso ou de terceiros, justificada a excepcionalidade por escrito, sob pena de responsabilidade disciplinar civil e penal do agente ou da autoridade e de nulidade da prisão ou do ato processual a que se refere, sem prejuízo da responsabilidade civil do Estado". Vale notar que o uso de algemas não é, portanto, automático ou padrão para toda prisão — depende de uma das hipóteses específicas previstas na súmula, e sua utilização precisa ser justificada por escrito, sob risco de consequências jurídicas para quem descumprir essa exigência.
Exemplo: algemar rotineiramente qualquer pessoa presa, sem análise concreta do risco de fuga, resistência ou perigo, contraria a Súmula Vinculante 11 — só se justifica o uso quando há elementos concretos que indiquem uma dessas situações específicas, e essa justificativa precisa ficar documentada por escrito.$q$,
  jsonb_build_array(jsonb_build_object('title','STF – Súmula Vinculante nº 11 – Uso de algemas','url','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=1220')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '9dfc55b7-7ad4-4b76-9b5f-ea1a7a421254', 'auth-leg-012',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei Maria da Penha',
  $q$Julgue o item a seguir, com base na Lei nº 11.340/2006.
A Lei Maria da Penha define violência doméstica e familiar contra a mulher como qualquer ação ou omissão baseada no gênero que lhe cause morte, lesão, sofrimento físico, sexual ou psicológico e dano moral ou patrimonial, abrangendo, além da violência física, também as violências psicológica, sexual, patrimonial e moral.$q$,
  'C',
  $q$Certo. O art. 5º da Lei nº 11.340/2006 (Lei Maria da Penha) define violência doméstica e familiar contra a mulher como "qualquer ação ou omissão baseada no gênero que lhe cause morte, lesão, sofrimento físico, sexual ou psicológico e dano moral ou patrimonial". Já o art. 7º detalha as formas dessa violência, reconhecendo expressamente, além da violência física, também a violência psicológica, a violência sexual, a violência patrimonial (dano, retenção ou subtração de bens, valores ou recursos econômicos da vítima) e a violência moral (calúnia, difamação ou injúria) — um reconhecimento amplo de que a violência de gênero não se limita a agressões físicas.
Exemplo: impedir deliberadamente que a companheira trabalhe fora de casa e controlar totalmente o dinheiro dela contra sua vontade, sem qualquer agressão física envolvida, já pode configurar violência patrimonial e/ou psicológica nos termos da lei — a Lei Maria da Penha não protege apenas contra socos e tapas, mas contra um espectro bem mais amplo de condutas.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.340/2006 – Lei Maria da Penha','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm')),
  'fácil', now()
);
