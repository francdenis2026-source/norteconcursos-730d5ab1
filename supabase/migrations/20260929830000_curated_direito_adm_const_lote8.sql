-- Curated (authored) questions, Direito lote 23: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-023',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Concessão e permissão de serviços públicos',
  $q$Julgue o item a seguir, com base na Lei nº 8.987/1995.
A concessão de serviço público depende de licitação na modalidade concorrência e é formalizada mediante contrato administrativo com prazo determinado, diferentemente da permissão, que, embora também exija licitação, é formalizada por meio de contrato de adesão, revogável unilateralmente pelo poder concedente, em regra a título precário.$q$,
  'C',
  $q$Certo. A Lei nº 8.987/1995 estabelece essa distinção entre os dois institutos: a CONCESSÃO de serviço público (art. 2º, II) é a delegação de sua prestação, feita pelo poder concedente, mediante licitação, na modalidade concorrência, à pessoa jurídica ou consórcio de empresas, por prazo determinado, formalizada por contrato; já a PERMISSÃO (art. 2º, IV) é a delegação, a título precário, mediante licitação, à pessoa física ou jurídica que demonstre capacidade para seu desempenho, formalizada por contrato de adesão. A precariedade da permissão significa que ela pode, em regra, ser revogada unilateralmente pelo poder público a qualquer tempo, sem necessidade das mesmas garantias e do mesmo grau de estabilidade contratual característicos da concessão.
Exemplo: um serviço de transporte público de grande porte, prestado por uma empresa por prazo longo e determinado, costuma ser organizado por concessão; já uma autorização mais simples e precária, como certos serviços locais de menor complexidade, pode ser estruturada por permissão, com menor estabilidade contratual para o particular delegatário.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.987/1995 – Lei de Concessões e Permissões de Serviços Públicos','url','https://www.planalto.gov.br/ccivil_03/leis/l8987cons.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-024',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Vencimento e remuneração (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
Vencimento é a retribuição pecuniária pelo exercício de cargo público, com valor fixado em lei, enquanto remuneração é o vencimento do cargo efetivo acrescido das vantagens pecuniárias permanentes estabelecidas em lei, sendo o subsídio, quando aplicável a determinadas carreiras, uma forma de retribuição fixada em parcela única, vedado o acréscimo de qualquer vantagem pecuniária.$q$,
  'C',
  $q$Certo. O art. 40 da Lei nº 8.112/1990 define vencimento como "a retribuição pecuniária pelo exercício de cargo público, com valor fixado em lei", enquanto o art. 41 define remuneração como "o vencimento do cargo efetivo, acrescido das vantagens pecuniárias permanentes estabelecidas em lei". Já o regime de subsídio, previsto no art. 39, § 4º, da Constituição Federal (aplicável a determinadas carreiras, como as de fiscalização e outras especificadas em lei), consiste em parcela única, vedado o acréscimo de qualquer gratificação, adicional, abono, prêmio, verba de representação ou outra espécie remuneratória, sob pena de descaracterizar esse regime mais simplificado de retribuição.
Exemplo: um servidor que recebe vencimento básico e, além dele, adicionais por tempo de serviço e gratificações específicas, está sob o regime de remuneração tradicional; já um servidor de carreira submetida ao regime de subsídio recebe um valor único e fixo, sem esses acréscimos separados, o que simplifica (mas também restringe) a composição de sua retribuição pecuniária.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm'),jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-016',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Cláusulas pétreas',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Não será objeto de deliberação a proposta de emenda constitucional tendente a abolir a forma federativa de Estado, o voto direto, secreto, universal e periódico, a separação dos Poderes, e os direitos e garantias individuais, sendo essas as chamadas cláusulas pétreas do texto constitucional.$q$,
  'C',
  $q$Certo. O art. 60, § 4º, da CF/1988 lista exatamente essas quatro matérias como cláusulas pétreas — núcleo imodificável (ao menos por emenda constitucional) do texto constitucional: a forma federativa de Estado (inciso I); o voto direto, secreto, universal e periódico (inciso II); a separação dos Poderes (inciso III); e os direitos e garantias individuais (inciso IV). A proteção conferida pelas cláusulas pétreas não impede toda e qualquer alteração sobre essas matérias, mas veda emendas que TENDAM a aboli-las — ou seja, mudanças que enfraqueçam ou eliminem, na essência, esses elementos fundamentais podem ser consideradas inconstitucionais, mesmo que aprovadas pelo procedimento formal de emenda.
Exemplo: uma proposta de emenda que buscasse concentrar todo o poder decisório num único órgão, esvaziando a autonomia do Legislativo ou do Judiciário, poderia ser questionada por tender a violar a separação dos Poderes, ainda que aprovada com o quórum formal exigido para emendas constitucionais — o conteúdo, e não apenas o procedimento, é o que está protegido pelas cláusulas pétreas.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
