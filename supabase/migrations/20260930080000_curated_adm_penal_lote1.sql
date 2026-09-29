-- Curated (authored) questions, Direito lote 48: mais Direito
-- Administrativo e Direito Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-041',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Contrato de gestão e parceria público-privada',
  $q$Julgue o item a seguir, com base na Lei nº 11.079/2004.
A parceria público-privada (PPP), nas modalidades patrocinada e administrativa, é sempre um contrato de concessão precedido de licitação na modalidade concorrência, vedada a celebração de PPP cujo valor do contrato seja inferior ao limite mínimo estabelecido em lei, exatamente para reservar esse instrumento a projetos de maior vulto e complexidade.$q$,
  'C',
  $q$Certo. A Lei nº 11.079/2004 disciplina a parceria público-privada, prevendo duas modalidades: a concessão patrocinada (concessão de serviços públicos ou de obras públicas com contraprestação pecuniária adicional do parceiro público ao parceiro privado, além das tarifas eventualmente cobradas dos usuários) e a concessão administrativa (contrato de prestação de serviços em que a administração pública é a usuária direta ou indireta, mesmo quando envolva execução de obra). A lei fixa um valor mínimo para a celebração de PPPs (originalmente R$ 20 milhões, valor sujeito a atualizações), justamente porque esse modelo contratual é mais complexo e envolve custos de estruturação relativamente altos, sendo reservado a projetos de maior vulto que justifiquem essa complexidade adicional em comparação com uma concessão comum ou contratação convencional.
Exemplo: um projeto de infraestrutura de grande porte, como a construção e operação de um complexo hospitalar por décadas, com pagamentos periódicos do poder público ao parceiro privado ao longo do contrato, é um exemplo típico de PPP na modalidade administrativa, diferente de contratações simples e de menor valor, que seguem os modelos contratuais tradicionais.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.079/2004 – Lei de Parcerias Público-Privadas','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/lei/l11079.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-042',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Remoção do servidor (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
A remoção é o deslocamento do servidor, a pedido ou de ofício, no âmbito do mesmo quadro, com ou sem mudança de sede, podendo ocorrer, entre outras hipóteses, de ofício, no interesse da administração, ou a pedido, para acompanhar cônjuge ou companheiro que também seja servidor público e tenha sido deslocado no interesse da administração.$q$,
  'C',
  $q$Certo. O art. 36 da Lei nº 8.112/1990 define remoção como "o deslocamento do servidor, a pedido ou de ofício, no âmbito do mesmo quadro, com ou sem mudança de sede". O parágrafo único do mesmo artigo lista as modalidades de remoção, incluindo: de ofício, no interesse da Administração (inciso I); e, a pedido, para acompanhar cônjuge ou companheiro, também servidor público civil ou militar, de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios, que foi deslocado no interesse da Administração (inciso III, alínea "a"). Essa última hipótese reconhece a importância de preservar a unidade familiar mesmo diante de deslocamentos funcionais determinados por necessidade administrativa, permitindo que o cônjuge servidor também se desloque para acompanhar o outro.
Exemplo: se um servidor público é removido de ofício, por necessidade administrativa, para outra cidade, seu cônjuge, também servidor público, pode requerer remoção para acompanhá-lo, preservando a convivência familiar mesmo diante dessa movimentação funcional determinada pelo interesse da administração.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-030',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a família — abandono material',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de abandono material, previsto no art. 244 do Código Penal, consiste em deixar, sem justa causa, de prover a subsistência do cônjuge, ou de filho menor de 18 anos ou inapto para o trabalho, ou de ascendente inválido ou maior de 60 anos, não lhe proporcionando os recursos necessários, ou faltando ao pagamento de pensão alimentícia judicialmente fixada.$q$,
  'C',
  $q$Certo. O art. 244, caput, do Código Penal tipifica o abandono material como "deixar, sem justa causa, de prover a subsistência do cônjuge, ou de filho menor de 18 (dezoito) anos ou inapto para o trabalho, ou de ascendente inválido ou maior de 60 (sessenta) anos, não lhes proporcionando os recursos necessários ou faltando ao pagamento de pensão alimentícia judicialmente acordada, fixada ou majorada". Trata-se de crime que protege o dever de assistência material dentro das relações familiares — a expressão "sem justa causa" é elemento essencial: se o agente comprovadamente não tem condições financeiras reais de prover essa subsistência (por exemplo, em razão de desemprego involuntário e comprovado, sem má-fé), pode não haver crime, pois a justa causa afasta a tipicidade.
Exemplo: um pai que, tendo condições financeiras de sustentar seu filho menor, deliberadamente deixa de fazê-lo, ou reiteradamente não paga a pensão alimentícia judicialmente fixada, sem justificativa legítima, pode responder pelo crime de abandono material — diferente de um pai que perdeu o emprego involuntariamente e, comprovadamente, não tem condições financeiras momentâneas de prover essa assistência, hipótese em que a "justa causa" pode afastar a tipicidade do crime.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
);
