-- Curated (authored) questions, Direito lote 55: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-044',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Contrato administrativo — equilíbrio econômico-financeiro',
  $q$Julgue o item a seguir.
A teoria da imprevisão permite a revisão do contrato administrativo quando sobrevêm fatos imprevisíveis, ou previsíveis mas de consequências incalculáveis, que retardem ou impeçam a execução do ajustado, alterando substancialmente as condições de execução, sendo diferente do fato do príncipe, que decorre de ato geral do próprio poder público contratante que reflete indiretamente sobre o contrato.$q$,
  'C',
  $q$Certo. A teoria da imprevisão (também chamada de teoria da onerosidade excessiva ou "rebus sic stantibus") justifica a revisão do contrato administrativo quando eventos supervenientes, imprevisíveis pelas partes no momento da contratação (ou previsíveis, mas com consequências que não poderiam ser calculadas com exatidão), tornam a execução do contrato excessivamente onerosa para uma das partes, alterando substancialmente o equilíbrio econômico-financeiro original. Já o fato do príncipe é um instituto distinto: decorre de um ato geral do próprio poder público (na condição de Estado, e não especificamente como contratante daquele ajuste específico), que reflete indiretamente sobre a execução do contrato, tornando-a mais onerosa, mesmo sem estar diretamente relacionado àquele contrato em particular.
Exemplo: uma crise econômica geral e imprevisível que dispara os preços de insumos essenciais para a execução de um contrato pode justificar revisão contratual pela teoria da imprevisão; já uma nova lei tributária editada pelo governo federal, que aumenta impostos aplicáveis de forma geral (não voltada especificamente àquele contrato), mas que acaba impactando o custo de execução daquele contrato específico, é exemplo de fato do príncipe.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-029',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Extradição',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Nenhum brasileiro será extraditado, salvo o naturalizado, em caso de crime comum, praticado antes da naturalização, ou de comprovado envolvimento em tráfico ilícito de entorpecentes e drogas afins, na forma da lei, sendo vedada, em qualquer hipótese, a extradição de brasileiro nato.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LI, da CF/1988 estabelece que "nenhum brasileiro será extraditado, salvo o naturalizado, em caso de crime comum, praticado antes da naturalização, ou de comprovado envolvimento em tráfico ilícito de entorpecentes e drogas afins, na forma da lei". Ou seja, o brasileiro NATO nunca pode ser extraditado, em nenhuma hipótese — proteção absoluta. Já o brasileiro NATURALIZADO pode, excepcionalmente, ser extraditado em duas situações específicas: crime comum praticado antes da naturalização, ou comprovado envolvimento em tráfico de drogas (independentemente de quando o crime tenha sido praticado, antes ou depois da naturalização, nessa segunda hipótese específica).
Exemplo: um brasileiro naturalizado que praticou um crime comum em outro país antes de se naturalizar brasileiro pode, em tese, ser extraditado para responder por esse crime; já um brasileiro nato jamais pode ser extraditado, independentemente da gravidade do crime que tenha cometido, seja no Brasil ou no exterior.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
