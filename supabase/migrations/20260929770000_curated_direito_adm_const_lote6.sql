-- Curated (authored) questions, Direito lote 17: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-019',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Classificação dos atos administrativos',
  $q$Julgue o item a seguir.
Os atos administrativos vinculados são aqueles em que a lei estabelece todos os requisitos e condições de sua realização, não deixando margem de escolha para o administrador quanto à conveniência e oportunidade da prática do ato, diferentemente dos atos discricionários, em que a lei confere ao administrador certa margem de liberdade para decidir sobre a prática do ato ou seu conteúdo, dentro dos limites legais.$q$,
  'C',
  $q$Certo. Essa é a distinção clássica entre atos vinculados e atos discricionários no direito administrativo. Nos atos VINCULADOS, a lei já define de forma exaustiva todos os elementos do ato (competência, forma, motivo, objeto, finalidade), não sobrando ao administrador qualquer margem de escolha: uma vez preenchidos os requisitos legais, ele é obrigado a praticar o ato de determinada forma. Já nos atos DISCRICIONÁRIOS, a lei confere ao administrador certa margem de liberdade (o chamado "mérito administrativo") para decidir, dentro de parâmetros legais, sobre a conveniência e oportunidade de praticar o ato, ou sobre seu conteúdo específico, permitindo uma avaliação subjetiva dentro dos limites que a própria lei estabelece.
Exemplo: a concessão de aposentadoria por tempo de contribuição, uma vez cumpridos todos os requisitos legais, é ato vinculado — a administração não pode negar o benefício se os requisitos estão preenchidos; já a decisão de conceder ou não uma licença para tratar de assuntos particulares pode envolver certa discricionariedade da administração, avaliando a conveniência daquele momento específico, dentro dos limites que a lei permitir.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-020',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Nulidade e convalidação dos atos (Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
Em decisão na qual se evidencie não acarretarem lesão ao interesse público nem prejuízo a terceiros, os atos que apresentarem defeitos sanáveis poderão ser convalidados pela própria administração, sendo essa convalidação um ato discricionário, e não obrigatório.$q$,
  'C',
  $q$Certo. O art. 55 da Lei nº 9.784/1999 estabelece que "em decisão na qual se evidencie não acarretarem lesão ao interesse público nem prejuízo a terceiros, os atos que apresentarem defeitos sanáveis poderão ser convalidados pela própria Administração". O uso do verbo "poderão", e não "deverão", é interpretado pela doutrina como uma indicação de que a convalidação é, em regra, um ato discricionário — a administração tem a faculdade de convalidar o ato defeituoso (corrigindo o vício, mas mantendo seus efeitos desde a origem), mas não está estritamente obrigada a fazê-lo, podendo, alternativamente, optar por anular o ato viciado, conforme sua avaliação do caso concreto, desde que respeitados os limites legais.
Exemplo: se um ato administrativo tem um pequeno defeito de forma, mas não causou prejuízo a ninguém e não lesa o interesse público, a administração pode optar por simplesmente corrigir essa falha formal (convalidando o ato) em vez de anulá-lo por completo e refazer todo o procedimento — mas essa escolha entre convalidar ou anular, dentro desses parâmetros, envolve certa margem de decisão administrativa.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999 – Processo Administrativo Federal','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-013',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Devido processo legal',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O princípio do devido processo legal, previsto no art. 5º, inciso LIV, da Constituição Federal, desdobra-se em uma dimensão processual (garantias formais do processo, como contraditório e ampla defesa) e em uma dimensão substantiva, que exige que as leis e atos estatais sejam razoáveis e proporcionais, e não apenas formalmente regulares.$q$,
  'C',
  $q$Certo. O art. 5º, LIV, da CF/1988 estabelece que "ninguém será privado da liberdade ou de seus bens sem o devido processo legal". A doutrina constitucional identifica, nesse princípio, duas dimensões complementares: o devido processo legal PROCESSUAL (ou formal), que assegura as garantias procedimentais mínimas de um processo justo, como contraditório, ampla defesa, juiz natural e duração razoável do processo; e o devido processo legal SUBSTANTIVO (substantive due process), de origem norte-americana mas incorporado à doutrina brasileira, que exige que o próprio conteúdo das leis e dos atos estatais seja razoável, proporcional e não arbitrário — não basta seguir corretamente um procedimento formal se a norma ou decisão em si for desproporcional ou irracional.
Exemplo: mesmo que um processo administrativo siga rigorosamente todas as etapas formais previstas (contraditório, prazo para defesa etc.), se a penalidade aplicada ao final for manifestamente desproporcional à infração cometida, pode-se questionar essa decisão sob o prisma do devido processo legal substantivo, e não apenas processual.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-014',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Intervenção federal',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A União não intervirá nos Estados nem no Distrito Federal, exceto nas hipóteses taxativamente previstas na Constituição Federal, como para pôr termo a grave comprometimento da ordem pública ou para prover a execução de lei federal, ordem ou decisão judicial.$q$,
  'C',
  $q$Certo. O art. 34 da CF/1988 estabelece a regra geral de não intervenção da União nos Estados e no Distrito Federal, seguida de um rol taxativo de hipóteses excepcionais em que a intervenção é constitucionalmente permitida, entre elas: pôr termo a grave comprometimento da ordem pública (inciso III); prover a execução de lei federal, ordem ou decisão judicial (inciso VI); e outras hipóteses ligadas à defesa da integridade nacional, à organização de finanças públicas, entre outras listadas no dispositivo. Por ser uma medida excepcional que restringe a autonomia dos entes federados, a intervenção federal só pode ocorrer nas hipóteses expressamente previstas, e segue procedimento formal específico definido nos artigos seguintes da Constituição.
Exemplo: se um Estado se recusa reiteradamente a cumprir uma decisão judicial ou uma lei federal, esgotados outros meios, a União pode, dentro dos procedimentos constitucionais, decretar intervenção federal naquele Estado especificamente para garantir o cumprimento dessa decisão ou lei, sem que isso represente uma violação à autonomia federativa, já que a própria Constituição previu essa exceção.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
);
