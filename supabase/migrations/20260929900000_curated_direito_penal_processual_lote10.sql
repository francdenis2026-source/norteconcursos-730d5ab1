-- Curated (authored) questions, Direito lote 30: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-023',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra o meio ambiente — poluição',
  $q$Julgue o item a seguir, com base na Lei nº 9.605/1998.
Causar poluição de qualquer natureza em níveis tais que resultem ou possam resultar em danos à saúde humana, ou que provoquem a mortandade de animais ou a destruição significativa da flora, constitui crime ambiental, independentemente de a poluição ter efetivamente causado o dano, bastando a criação de perigo concreto a esses bens jurídicos.$q$,
  'C',
  $q$Certo. O art. 54, caput, da Lei nº 9.605/1998 tipifica a poluição ambiental como "causar poluição de qualquer natureza em níveis tais que resultem ou possam resultar em danos à saúde humana, ou que provoquem a mortandade de animais ou a destruição significativa da flora". A expressão "ou possam resultar" indica que o crime pode se caracterizar como de perigo concreto — não é necessário que o dano efetivamente se materialize (a doença já tenha ocorrido, os animais já tenham morrido); basta que a poluição gerada tenha criado uma situação de risco real e concreto a esses bens jurídicos protegidos, o que amplia o alcance protetivo da norma penal ambiental.
Exemplo: o despejo de substâncias tóxicas num rio em quantidade capaz de comprovadamente colocar em risco a saúde de quem consome aquela água já pode configurar o crime, mesmo que, por sorte ou por intervenção rápida, ninguém tenha efetivamente adoecido em razão desse despejo específico — o risco concreto já é suficiente para a tipificação.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.605/1998 – Crimes Ambientais','url','https://www.planalto.gov.br/ccivil_03/leis/l9605.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-018',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Princípios processuais penais — presunção de inocência',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória, princípio que impõe ao acusador o ônus de provar a culpa do réu, sendo vedada a inversão desse ônus probatório em desfavor do acusado no processo penal.$q$,
  'C',
  $q$Certo. O art. 5º, LVII, da CF/1988 consagra o princípio da presunção de inocência (ou não culpabilidade): "ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória". Uma das principais consequências práticas desse princípio é a distribuição do ônus da prova no processo penal: cabe à acusação (Ministério Público ou querelante) provar, de forma inequívoca, a culpa do réu, e não ao réu provar sua inocência — em caso de dúvida razoável que não seja superada pela acusação, o princípio do in dubio pro reo determina que a dúvida beneficie o acusado, resultando em absolvição.
Exemplo: num julgamento criminal, não cabe ao réu "provar que não cometeu o crime"; cabe à acusação apresentar provas suficientes e convincentes de que ele o cometeu — se essas provas não forem suficientemente conclusivas, a dúvida deve favorecer o réu, e não o contrário, refletindo diretamente o princípio da presunção de inocência.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-019',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Colaboração premiada',
  $q$Julgue o item a seguir, com base na Lei nº 12.850/2013.
A colaboração premiada é meio de obtenção de prova, e não meio de prova propriamente dito, exigindo a lei que a sentença condenatória não seja fundamentada exclusivamente nas declarações do agente colaborador, o que reforça a necessidade de corroboração por outros elementos de prova produzidos no processo.$q$,
  'C',
  $q$Certo. A colaboração premiada, disciplinada pela Lei nº 12.850/2013 (Lei de Organização Criminosa), é classificada pela doutrina majoritária como meio de OBTENÇÃO de prova (um instrumento que permite chegar a outras provas), e não como meio de prova propriamente dito (que seria a prova em si, já produzida e diretamente apreciável pelo juiz). O art. 4º, § 16, da lei estabelece expressamente que "nenhuma das seguintes medidas será decretada ou proferida com fundamento apenas nas declarações do colaborador: I - medidas cautelares reais ou pessoais; II - recebimento de denúncia ou queixa-crime; III - sentença condenatória" — exigindo, portanto, que as declarações do colaborador sejam corroboradas por outros elementos de prova independentes para que possam efetivamente fundamentar uma condenação.
Exemplo: se um delator afirma, em colaboração premiada, que determinada pessoa participou de um esquema criminoso, essa afirmação isolada não é suficiente para condenar o acusado — é necessário que outras provas independentes (documentos, testemunhas, perícias) confirmem, ao menos em parte, o que foi relatado pelo colaborador, evitando condenações baseadas apenas na palavra de quem tem interesse direto em obter os benefícios do acordo.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.850/2013 – Lei de Organização Criminosa','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm')),
  'difícil', now()
);
