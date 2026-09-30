-- Curated (authored) questions, Direito lote 64: mais Direito
-- Administrativo e Direito Constitucional. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-047',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Dever de probidade e vedação ao nepotismo',
  $q$Julgue o item a seguir, com base na Súmula Vinculante nº 13 do STF.
A nomeação de cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau, para o exercício de cargo em comissão ou de confiança, no âmbito do mesmo órgão em que atue o agente nomeante ou de órgão sob sua direta influência hierárquica, viola a Constituição Federal, ainda que a nomeação recaia sobre pessoa tecnicamente qualificada para a função.$q$,
  'C',
  $q$Certo. A Súmula Vinculante nº 13 do STF veda a prática de nepotismo, considerando inconstitucional "a nomeação de cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau, inclusive, da autoridade nomeante ou de servidor da mesma pessoa jurídica investido em cargo de direção, chefia ou assessoramento, para o exercício de cargo em comissão ou de confiança ou, ainda, de função gratificada na administração pública direta e indireta". Um ponto importante é que a vedação não depende de análise da qualificação técnica do nomeado — mesmo que a pessoa seja plenamente capacitada para a função, a simples relação de parentesco com quem exerce influência sobre a nomeação já configura a violação, por presumir objetivamente o risco de favorecimento pessoal em detrimento da impessoalidade que deve reger a administração pública.
Exemplo: um secretário municipal que nomeia seu irmão para um cargo de confiança dentro da mesma secretaria pratica nepotismo vedado pela Súmula Vinculante 13, ainda que o irmão tenha excelente qualificação técnica para exercer aquela função — a proibição é objetiva, baseada no risco estrutural de favorecimento, e não na avaliação subjetiva da competência do parente nomeado.$q$,
  jsonb_build_array(jsonb_build_object('title','STF – Súmula Vinculante nº 13 – Vedação ao Nepotismo','url','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=1219')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-032',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Remédios constitucionais — mandado de injunção',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Conceder-se-á mandado de injunção sempre que a falta de norma regulamentadora torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania, tratando-se, portanto, de remédio voltado a combater a omissão legislativa que impede a fruição de um direito constitucionalmente assegurado.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LXXI, da CF/1988 estabelece que "conceder-se-á mandado de injunção sempre que a falta de norma regulamentadora torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania". Esse instrumento tem por objetivo específico combater a chamada "síndrome de inefetividade das normas constitucionais" — situações em que a própria Constituição prevê um direito, mas sua fruição prática depende de regulamentação legislativa que simplesmente nunca foi editada, deixando o direito constitucional "no papel", sem efetividade concreta. O impetrante busca, com o mandado de injunção, que o Judiciário reconheça essa omissão e, conforme a jurisprudência atual do STF (que evoluiu para uma posição mais concretista), viabilize o exercício do direito enquanto a omissão legislativa persistir.
Exemplo: se a Constituição garante determinado direito trabalhista que depende de lei específica para sua aplicação prática, e essa lei nunca foi editada pelo Congresso, o titular do direito pode buscar mandado de injunção para que o Judiciário viabilize, de alguma forma, o exercício desse direito diante da omissão legislativa persistente.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
