-- Curated (authored) questions, Direito lote 46: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-029',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a Administração da Justiça — favorecimento',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de favorecimento pessoal, previsto no art. 348 do Código Penal, consiste em auxiliar a subtrair-se à ação de autoridade pública autor de crime a que é cominada pena de reclusão, sendo diferente do favorecimento real, que consiste em prestar auxílio destinado a tornar seguro o proveito do crime, e não a pessoa do criminoso.$q$,
  'C',
  $q$Certo. O art. 348, caput, do Código Penal tipifica o favorecimento pessoal como "auxiliar a subtrair-se à ação de autoridade pública autor de crime a que é cominada pena de reclusão" — o foco desse crime é ajudar a PESSOA do criminoso a escapar da ação da justiça (por exemplo, escondendo-o, fornecendo transporte para fuga). Já o art. 349 tipifica o favorecimento real: "prestar a criminoso, fora dos casos de coautoria ou de receptação, auxílio destinado a tornar seguro o proveito do crime" — nesse caso, o auxílio não é para proteger a pessoa do criminoso, mas sim para ajudar a assegurar o proveito econômico ou material obtido com o crime, como esconder ou ajudar a vender bens roubados.
Exemplo: quem esconde um assassino em sua casa para que a polícia não o encontre pratica favorecimento pessoal; já quem ajuda esse mesmo assassino a esconder ou vender bens roubados durante o crime (sem ter participado do crime original) pratica favorecimento real — os dois protegem o criminoso de formas diferentes, uma protegendo a pessoa, outra protegendo o produto do crime.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-024',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Foro por prerrogativa de função',
  $q$Julgue o item a seguir, com base na jurisprudência do Supremo Tribunal Federal.
O Supremo Tribunal Federal, ao restringir o alcance do foro por prerrogativa de função para parlamentares federais, firmou entendimento de que esse foro especial se aplica apenas a crimes cometidos durante o exercício do cargo e relacionados às funções desempenhadas, não abrangendo automaticamente crimes cometidos antes da diplomação ou sem relação com o exercício do mandato.$q$,
  'C',
  $q$Certo. No julgamento da Questão de Ordem na Ação Penal 937, em 2018, o STF restringiu significativamente o alcance do foro por prerrogativa de função aplicável a Deputados Federais e Senadores (art. 53, § 1º, da CF), fixando o entendimento de que o foro especial no STF se restringe aos crimes cometidos no cargo e em razão dele — ou seja, deve haver relação direta entre o crime imputado e o exercício das funções parlamentares. Crimes praticados antes do exercício do cargo, ou que não guardem relação com as atribuições parlamentares (como crimes de natureza puramente pessoal, sem vínculo funcional), passaram, com essa nova orientação, a ser processados e julgados pelas instâncias comuns, e não mais automaticamente pelo STF apenas em razão do cargo ocupado pelo acusado.
Exemplo: um parlamentar processado por um crime cometido anos antes de assumir o mandato, sem qualquer relação com suas funções legislativas, não terá, segundo esse entendimento consolidado, o processo automaticamente deslocado para o STF apenas por ele ocupar atualmente um cargo com prerrogativa de foro — o processo permanece, em regra, na instância comum competente para aquele tipo de crime.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-025',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Princípio da identidade física do juiz',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
O juiz que presidiu a instrução deverá proferir a sentença, princípio conhecido como identidade física do juiz, admitindo-se exceções nos casos de afastamento do magistrado por qualquer motivo, hipótese em que passará os autos ao seu sucessor.$q$,
  'C',
  $q$Certo. O art. 399, § 2º, do Código de Processo Penal estabelece que "o juiz que presidiu a instrução deverá proferir a sentença", consagrando o princípio da identidade física do juiz no processo penal — a ideia é que o magistrado que efetivamente colheu a prova oral (ouviu testemunhas, acompanhou o interrogatório) tem melhores condições de avaliar essa prova ao proferir a sentença, em comparação com um juiz que apenas leria as transcrições posteriormente. Esse princípio, porém, não é absoluto: se o juiz que presidiu a instrução for afastado por qualquer motivo (promoção, remoção, licença, aposentadoria, entre outros), os autos são simplesmente encaminhados ao juiz sucessor, que assumirá o julgamento com base no que consta dos autos, sem que isso configure alguma nulidade processual.
Exemplo: se o juiz que conduziu toda a instrução de um processo é promovido para outro tribunal antes de proferir a sentença, o processo é encaminhado ao juiz que o substituir na vara, que proferirá a sentença com base nos elementos já produzidos nos autos, sem necessidade de repetir toda a instrução processual apenas por causa dessa substituição do magistrado.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
