-- Curated (authored) questions, Direito lote 11: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-010',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a liberdade individual',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de constrangimento ilegal, previsto no art. 146 do Código Penal, consiste em constranger alguém, mediante violência ou grave ameaça, ou depois de lhe haver reduzido, por qualquer outro meio, a capacidade de resistência, a não fazer o que a lei permite, ou a fazer o que ela não manda.$q$,
  'C',
  $q$Certo. O art. 146, caput, do Código Penal define exatamente essa conduta: "Constranger alguém, mediante violência ou grave ameaça, ou depois de lhe haver reduzido, por qualquer outro meio, a capacidade de resistência, a não fazer o que a lei permite, ou a fazer o que ela não manda". É um tipo penal amplo, que protege a liberdade individual de autodeterminação da vítima — o crime se consuma quando alguém, por meio de violência, ameaça ou outro meio que anule a capacidade de resistência, força a vítima a agir (ou deixar de agir) de forma diferente da que ela livremente escolheria, dentro dos limites do que a lei permite ou exige.
Exemplo: obrigar alguém, sob ameaça, a assinar um documento que ela não é legalmente obrigada a assinar (algo que a lei não a "manda" fazer) configura constrangimento ilegal — a vítima teve sua liberdade de decisão anulada pela coação empregada contra ela.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-011',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Extinção da punibilidade',
  $q$Julgue o item a seguir, com base no Código Penal.
Extingue-se a punibilidade pela morte do agente, pela anistia, graça ou indulto, pela retroatividade de lei que não mais considera o fato como criminoso, pela prescrição, decadência ou perempção, e por outras causas expressamente previstas em lei.$q$,
  'C',
  $q$Certo. O art. 107 do Código Penal lista, em seus incisos, diversas causas de extinção da punibilidade, incluindo a morte do agente (inciso I — a responsabilidade penal, ao contrário da civil, não se transmite aos herdeiros), a anistia, graça ou indulto (inciso II), a retroatividade de lei que não mais considera o fato como criminoso — a chamada abolitio criminis (inciso III), a prescrição, decadência ou perempção (inciso IV), entre outras hipóteses previstas ao longo do artigo. Uma vez extinta a punibilidade por qualquer dessas causas, o Estado perde definitivamente o direito de punir aquele fato específico em relação àquele agente.
Exemplo: se o autor de um crime falece antes de cumprir a pena (ou mesmo antes de ser julgado), a punibilidade se extingue automaticamente com sua morte — não é possível transferir a punição penal a herdeiros ou familiares, diferentemente de eventuais dívidas civis, que podem, dentro de certos limites, ser cobradas do espólio.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-009',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Nulidades processuais',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Nenhuma das partes poderá arguir nulidade a que haja dado causa, ou para que tenha concorrido, ou referente a formalidade cuja observância só à parte contrária interesse, sendo esse princípio conhecido como princípio da lealdade processual ou vedação ao venire contra factum proprium.$q$,
  'C',
  $q$Certo. O art. 565 do Código de Processo Penal estabelece que "nenhuma das partes poderá arguir nulidade a que haja dado causa, ou para que tenha concorrido, ou referente a formalidade cuja observância só à parte contrária interesse". Esse dispositivo reflete o princípio de que ninguém pode se beneficiar da própria torpeza (ou, em outras palavras, se comportar de forma contraditória, alegando depois um vício processual que ela mesma provocou ou para o qual contribuiu). A lógica é evitar manipulações processuais: se uma parte causou o vício, não pode, estrategicamente, alegá-lo depois para anular um ato que lhe é desfavorável.
Exemplo: se a defesa deliberadamente deixa de comparecer a um ato processual, provocando uma irregularidade formal, ela não pode depois alegar essa mesma irregularidade (que ela mesma causou) como nulidade para anular o processo — isso seria usar sua própria conduta contraditória para obter vantagem processual indevida.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-010',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Acordo de Não Persecução Penal',
  $q$Julgue o item a seguir, com base no Código de Processo Penal, com a redação dada pela Lei nº 13.964/2019.
O Acordo de Não Persecução Penal poderá ser oferecido pelo Ministério Público quando o investigado houver confessado formal e circunstancialmente a prática de infração penal sem violência ou grave ameaça, com pena mínima inferior a quatro anos, desde que necessário e suficiente para reprovação e prevenção do crime.$q$,
  'C',
  $q$Certo. O art. 28-A, caput, do Código de Processo Penal, incluído pela Lei nº 13.964/2019 (Pacote Anticrime), estabelece que, não sendo caso de arquivamento, o Ministério Público poderá propor o Acordo de Não Persecução Penal quando o investigado tiver confessado formal e circunstancialmente a prática de infração penal sem violência ou grave ameaça, com pena mínima inferior a quatro anos, e o acordo for necessário e suficiente para reprovação e prevenção do crime, mediante o cumprimento de determinadas condições, como reparação do dano, prestação de serviços à comunidade, entre outras previstas nos incisos do dispositivo. Trata-se de instrumento de justiça penal negociada, evitando o processo criminal tradicional em certos casos, mediante compromissos assumidos pelo investigado.
Exemplo: um investigado por um crime patrimonial sem violência, com pena mínima inferior a quatro anos, que confessa detalhadamente sua participação no fato, pode, em vez de responder a um processo criminal completo, aceitar um ANPP, cumprindo condições estabelecidas (como reparar o dano causado e prestar serviços comunitários), evitando assim a instauração da ação penal propriamente dita.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
