-- Curated (authored) questions, Direito lote 47: mais Direito
-- Constitucional e Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-025',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Estado de emergência sanitária e limitação de direitos',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Mesmo em situações excepcionais, como emergências sanitárias, eventuais restrições a direitos fundamentais, como liberdade de locomoção ou de reunião, impostas pelo poder público, devem observar os requisitos de legalidade, necessidade e proporcionalidade, não sendo válida uma restrição genérica, desproporcional ou sem amparo legal específico.$q$,
  'C',
  $q$Certo. Mesmo diante de situações excepcionais que justifiquem alguma limitação a direitos fundamentais em nome da proteção da saúde pública ou de outros interesses coletivos relevantes, o ordenamento jurídico brasileiro exige que essas restrições sigam parâmetros mínimos de legitimidade: precisam ter amparo legal específico (legalidade), ser efetivamente necessárias para alcançar a finalidade pretendida (necessidade) e ser proporcionais, não indo além do estritamente exigido pela situação concreta (proporcionalidade em sentido estrito). Restrições genéricas, desproporcionais, ou aplicadas sem qualquer base legal específica, mesmo em contextos emergenciais, podem ser questionadas judicialmente como inconstitucionais, já que nenhuma emergência, por si só, autoriza a supressão irrestrita de direitos fundamentais.
Exemplo: durante uma emergência de saúde pública, medidas como restrição temporária de circulação em determinadas áreas, quando tecnicamente justificadas e proporcionais à gravidade da situação concreta, podem ser legítimas; já uma restrição aplicada de forma indiscriminada, sem qualquer base técnica ou proporção com o risco real envolvido, tende a ser questionada como violação desproporcional a direitos fundamentais.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-026',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Conselho Nacional de Justiça e Conselho Nacional do Ministério Público',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Compete ao Conselho Nacional de Justiça, entre outras atribuições, o controle da atuação administrativa e financeira do Poder Judiciário e do cumprimento dos deveres funcionais dos juízes, sem, contudo, ter competência para o controle da atividade jurisdicional propriamente dita, ou seja, do conteúdo das decisões judiciais.$q$,
  'C',
  $q$Certo. O art. 103-B, § 4º, da CF/1988 estabelece as competências do Conselho Nacional de Justiça (CNJ), incluindo o controle da atuação administrativa e financeira do Poder Judiciário e do cumprimento dos deveres funcionais dos juízes. Uma limitação importante e amplamente reconhecida pela doutrina e jurisprudência é que o CNJ não tem competência para exercer controle sobre a atividade jurisdicional propriamente dita — ou seja, não pode revisar, anular ou modificar o conteúdo de decisões judiciais específicas proferidas por juízes no exercício de sua função jurisdicional; sua atuação se limita à esfera administrativa, disciplinar e de gestão do Judiciário, preservando a independência funcional dos magistrados quanto ao mérito de suas decisões.
Exemplo: o CNJ pode investigar e punir um juiz por conduta funcional inadequada (como atraso injustificado sistemático na entrega de decisões, ou violação a deveres funcionais), mas não pode, por exemplo, simplesmente reformar o conteúdo de uma sentença específica que esse juiz tenha proferido — isso é matéria exclusiva dos recursos processuais próprios, dentro da estrutura jurisdicional.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-029',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei Anticorrupção Empresarial',
  $q$Julgue o item a seguir, com base na Lei nº 12.846/2013.
A Lei Anticorrupção (Lei nº 12.846/2013) dispõe sobre a responsabilização objetiva administrativa e civil de pessoas jurídicas pela prática de atos lesivos à administração pública, nacional ou estrangeira, independentemente da comprovação de culpa ou dolo dos seus dirigentes ou administradores.$q$,
  'C',
  $q$Certo. O art. 1º da Lei nº 12.846/2013 estabelece que a lei dispõe sobre a responsabilização OBJETIVA administrativa e civil de pessoas jurídicas pela prática de atos contra a administração pública, nacional ou estrangeira. A responsabilidade objetiva da empresa significa que não é necessário comprovar culpa ou dolo dos dirigentes ou administradores para que a pessoa jurídica seja responsabilizada — basta demonstrar que o ato lesivo foi praticado em seu interesse ou benefício, ainda que exclusivo. Isso é diferente da responsabilidade das pessoas físicas envolvidas (dirigentes, administradores), que pode exigir análise subjetiva (dolo ou culpa) em outras esferas de responsabilização, como a criminal, mas não na responsabilização objetiva da própria empresa prevista nessa lei específica.
Exemplo: mesmo que a empresa comprove que não tinha conhecimento formal ou intenção institucional de praticar corrupção, se um ato lesivo à administração pública foi praticado em seu benefício por algum de seus representantes, a pessoa jurídica pode ser responsabilizada objetivamente, sem necessidade de provar que a empresa "quis" ou "concordou" institucionalmente com aquele ato específico.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.846/2013 – Lei Anticorrupção Empresarial','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12846.htm')),
  'difícil', now()
);
