-- Curated (authored) questions, Direito lote 49: mais Direito
-- Constitucional e Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-027',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Vedação à tortura e a tratamentos degradantes',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Ninguém será submetido a tortura nem a tratamento desumano ou degradante, sendo essa vedação constitucional aplicável a qualquer pessoa, independentemente de sua condição jurídica, inclusive a presos e a pessoas submetidas a outras formas de privação de liberdade pelo Estado.$q$,
  'C',
  $q$Certo. O art. 5º, inciso III, da CF/1988 estabelece que "ninguém será submetido a tortura nem a tratamento desumano ou degradante". Essa é uma garantia absoluta e universal, aplicável a qualquer pessoa dentro do território nacional, sem exceções relacionadas à gravidade do crime cometido ou à condição jurídica do indivíduo — a proibição vale tanto para pessoas em liberdade quanto, e especialmente, para pessoas privadas de liberdade sob custódia estatal (presos, internados), justamente por serem essas as situações em que o poder do Estado sobre o indivíduo é mais absoluto e, portanto, exige controle mais rigoroso contra abusos.
Exemplo: mesmo uma pessoa condenada por crime extremamente grave continua tendo o direito absoluto de não ser submetida a tortura ou a tratamento degradante durante o cumprimento de sua pena — a gravidade do crime cometido nunca justifica, sob a ótica constitucional, esse tipo de violação à dignidade da pessoa.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-026',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Inépcia da denúncia',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A denúncia ou queixa será rejeitada quando faltar pressuposto processual ou condição para o exercício da ação penal, ou faltar justa causa para o exercício da ação penal, sendo a inépcia da denúncia um dos vícios que impedem seu regular recebimento pelo juiz.$q$,
  'C',
  $q$Certo. O art. 395 do Código de Processo Penal, com a redação dada pela Lei nº 11.719/2008, estabelece que "a denúncia ou queixa será rejeitada quando: I - for manifestamente inepta; II - faltar pressuposto processual ou condição para o exercício da ação penal; ou III - faltar justa causa para o exercício da ação penal". A inépcia da denúncia (inciso I) ocorre, tipicamente, quando a peça acusatória não descreve adequadamente os fatos criminosos de forma que permita ao acusado exercer sua ampla defesa — por exemplo, quando é genérica demais, não individualiza a conduta de cada acusado num crime com vários réus, ou apresenta contradições internas graves que impeçam a compreensão exata da imputação.
Exemplo: uma denúncia que simplesmente diz "os réus cometeram um crime" sem especificar qual conduta cada um praticou, quando e como, dificultando a defesa individualizada de cada acusado, tende a ser considerada inepta e rejeitada pelo juiz antes mesmo de o processo ter seu curso regular iniciado.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
