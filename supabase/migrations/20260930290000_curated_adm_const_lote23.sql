-- Curated (authored) questions, Direito lote 70: mais Direito
-- Administrativo e Direito Constitucional. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-049',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Sindicância investigativa versus sindicância acusatória',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
A sindicância pode ter caráter meramente investigativo, preparatório de eventual processo disciplinar, sem contraditório, ou caráter punitivo, quando dela puder resultar imediatamente uma das penalidades mais brandas previstas em lei, hipótese em que a garantia do contraditório e da ampla defesa deve ser observada, mesmo nesse procedimento mais simplificado.$q$,
  'C',
  $q$Certo. A doutrina e a jurisprudência distinguem duas modalidades de sindicância: a sindicância INVESTIGATIVA (ou preparatória), de natureza inquisitorial, destinada apenas a apurar preliminarmente fatos e reunir elementos que poderão, ou não, fundamentar a instauração de um processo disciplinar mais formal — nessa fase puramente investigativa, o contraditório pleno ainda não é exigido, de forma similar ao que ocorre num inquérito policial; e a sindicância ACUSATÓRIA (ou punitiva), da qual pode resultar diretamente a aplicação de penalidade (como advertência ou suspensão de até 30 dias, conforme já vimos no art. 145 da Lei nº 8.112/1990), hipótese em que, por poder gerar consequência sancionatória direta ao servidor, o contraditório e a ampla defesa devem ser assegurados, mesmo nesse procedimento mais simplificado do que o processo disciplinar completo.
Exemplo: uma sindicância aberta apenas para apurar preliminarmente se houve ou não irregularidade, sem ainda aplicar qualquer penalidade diretamente, pode dispensar o contraditório nessa fase inicial; mas, se essa mesma sindicância já vai culminar diretamente numa penalidade contra o servidor, ele precisa ter garantido, desde então, o direito de se defender antes da decisão final.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-034',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Vedações e incompatibilidades parlamentares',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Desde a expedição do diploma, os membros do Congresso Nacional não poderão firmar ou manter contrato com pessoa jurídica de direito público, autarquia, empresa pública, sociedade de economia mista ou empresa concessionária de serviço público, salvo quando o contrato obedecer a cláusulas uniformes.$q$,
  'C',
  $q$Certo. O art. 54, inciso I, alínea "a", da CF/1988 estabelece essa vedação específica: desde a expedição do diploma, os Deputados e Senadores não poderão firmar ou manter contrato com pessoa jurídica de direito público, autarquia, empresa pública, sociedade de economia mista ou empresa concessionária de serviço público, salvo quando o contrato obedecer a cláusulas uniformes. Essa ressalva das "cláusulas uniformes" existe justamente para não impedir o parlamentar de contratar serviços públicos comuns (como energia elétrica, água, telefonia de empresas concessionárias) que qualquer cidadão contrata em condições padronizadas — a vedação busca evitar contratos privilegiados ou negociados individualmente entre o parlamentar e entes públicos, e não impedir sua participação, como qualquer outro cidadão, em relações contratuais padronizadas e sem privilégios.
Exemplo: um parlamentar pode continuar sendo cliente comum de uma concessionária de energia elétrica, pagando as mesmas tarifas e seguindo as mesmas condições contratuais de qualquer outro consumidor (cláusulas uniformes), mas não pode firmar um contrato especial e individualmente negociado com um órgão público, que lhe conferisse vantagens não disponíveis aos demais cidadãos.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
);
