-- Curated (authored) questions, Direito lote 60: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-037',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Direito à liberdade de expressão e seus limites',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É livre a manifestação do pensamento, sendo vedado o anonimato, assegurado o direito de resposta, proporcional ao agravo, além da indenização por dano material, moral ou à imagem, sendo esses os principais mecanismos constitucionais de equilíbrio entre a liberdade de expressão e a proteção de outros direitos da personalidade.$q$,
  'C',
  $q$Certo. O art. 5º, inciso IV, da CF/1988 assegura que "é livre a manifestação do pensamento, sendo vedado o anonimato", e o inciso V complementa: "é assegurado o direito de resposta, proporcional ao agravo, além da indenização por dano material, moral ou à imagem". Esses dispositivos, lidos em conjunto, mostram que a Constituição não trata a liberdade de expressão como um direito absoluto e sem consequências: quem se manifesta publicamente assume identificação (vedação ao anonimato) e responsabilidade por eventuais excessos, sendo assegurados à pessoa ofendida tanto o direito de resposta proporcional quanto a possibilidade de buscar indenização pelos danos concretamente sofridos, equilibrando a liberdade de expressão com a proteção de outros direitos fundamentais, como honra e imagem.
Exemplo: uma pessoa que se sente ofendida por uma publicação pode, em regra, exigir espaço proporcional para responder à ofensa (direito de resposta) e, dependendo do caso, buscar indenização pelos danos concretos sofridos — mecanismos que buscam corrigir excessos sem, contudo, significar censura prévia à liberdade de expressão em si.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-033',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Combate ao Financiamento do Terrorismo',
  $q$Julgue o item a seguir, com base na Lei nº 13.810/2019.
A Lei nº 13.810/2019 disciplina o cumprimento, no Brasil, de sanções impostas por resoluções do Conselho de Segurança das Nações Unidas, incluindo o congelamento de ativos de pessoas naturais e jurídicas relacionadas ao terrorismo, ao seu financiamento e à proliferação de armas de destruição em massa, prevendo procedimento célere para tanto.$q$,
  'C',
  $q$Certo. A Lei nº 13.810/2019 estabelece procedimentos para o cumprimento, em território nacional, de sanções decorrentes de resoluções do Conselho de Segurança das Nações Unidas, especificamente quanto ao congelamento de ativos de pessoas naturais ou jurídicas envolvidas em atos de terrorismo, financiamento do terrorismo ou proliferação de armas de destruição em massa. A lei foi concebida para permitir uma resposta célere e eficiente às designações feitas pelo Conselho de Segurança da ONU, evitando que o Brasil demorasse a cumprir obrigações internacionais assumidas nesse âmbito, o que poderia comprometer a efetividade do combate internacional ao financiamento de atividades terroristas.
Exemplo: quando o Conselho de Segurança da ONU designa uma pessoa ou entidade como envolvida em financiamento de terrorismo, essa lei permite que autoridades brasileiras determinem rapidamente o congelamento de eventuais ativos financeiros dessa pessoa ou entidade localizados no Brasil, cumprindo assim as obrigações internacionais assumidas pelo país nesse contexto de cooperação internacional contra o terrorismo.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.810/2019 – Lei de Cumprimento de Sanções do Conselho de Segurança da ONU','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13810.htm')),
  'difícil', now()
);
