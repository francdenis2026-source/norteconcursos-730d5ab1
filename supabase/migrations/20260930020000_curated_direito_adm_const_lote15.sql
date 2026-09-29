-- Curated (authored) questions, Direito lote 42: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-037',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Silêncio administrativo',
  $q$Julgue o item a seguir.
O silêncio administrativo, quando a lei não estabelecer prazo para a manifestação da administração nem atribuir efeito específico à sua inércia, não pode ser automaticamente interpretado como deferimento tácito do pedido, sendo cabível, nesses casos, a busca de provimento judicial para suprir a omissão administrativa.$q$,
  'C',
  $q$Certo. O silêncio administrativo, por si só, não tem um significado jurídico único e automático — sua interpretação depende do que a lei especificamente estabelece para cada situação. Quando a lei não prevê prazo específico para a manifestação da administração, nem atribui expressamente um efeito (positivo ou negativo) a essa inércia, a doutrina majoritária entende que não se pode simplesmente presumir deferimento tácito do pedido — a omissão, nesses casos, configura uma ilegalidade por inércia administrativa, passível de correção pela via judicial, geralmente por meio de mandado de segurança ou outra ação cabível, buscando obrigar a administração a se manifestar (ou, em alguns casos, permitindo ao Judiciário suprir diretamente a omissão, conforme as circunstâncias).
Exemplo: se um cidadão apresenta um requerimento administrativo e a administração simplesmente não responde, sem que exista lei específica dizendo que esse silêncio equivale a aprovação, o cidadão não pode presumir que seu pedido foi automaticamente deferido — ele precisará, se necessário, buscar meios judiciais para obrigar a administração a decidir sobre seu pedido.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-038',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Efeitos da anulação de processo administrativo disciplinar',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
Será cassada a aposentadoria ou a disponibilidade do inativo que houver praticado, na atividade, falta punível com a demissão, sendo esse instituto o meio adequado para responsabilizar disciplinarmente o servidor que se aposentou ou passou à disponibilidade após a prática da infração, mas antes da conclusão do processo disciplinar correspondente.$q$,
  'C',
  $q$Certo. O art. 134 da Lei nº 8.112/1990 estabelece que "será cassada a aposentadoria ou a disponibilidade do inativo que houver praticado, na atividade, falta punível com a demissão". Esse instituto existe justamente para evitar que o servidor "escape" da responsabilização disciplinar simplesmente se aposentando ou passando à disponibilidade após cometer uma infração grave, mas antes de o processo administrativo disciplinar ser concluído com sua eventual demissão. A cassação de aposentadoria (ou de disponibilidade) representa, portanto, o equivalente à demissão para o servidor que já não está mais em atividade, garantindo que a gravidade da infração cometida enquanto ele ainda trabalhava não fique impune apenas por causa dessa mudança de status funcional posterior.
Exemplo: se um servidor comete uma infração gravíssima, punível com demissão, mas se aposenta antes que o processo disciplinar correspondente seja concluído, ele ainda pode, ao final do processo, ter sua aposentadoria cassada, produzindo efeito equivalente ao da demissão que teria sido aplicada caso ele ainda estivesse em atividade.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-023',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Direito à saúde — competência comum',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É competência comum da União, dos Estados, do Distrito Federal e dos Municípios cuidar da saúde e assistência pública, o que significa que a responsabilidade por garantir esse direito social é compartilhada entre todos os entes federativos, e não exclusiva de apenas um deles.$q$,
  'C',
  $q$Certo. O art. 23, inciso II, da CF/1988 estabelece que "é competência comum da União, dos Estados, do Distrito Federal e dos Municípios cuidar da saúde e assistência pública, da proteção e garantia das pessoas portadoras de deficiência". A competência comum, diferente da competência privativa (exclusiva de um único ente), significa que todos os entes federativos compartilham responsabilidade sobre essa matéria, cada um atuando dentro de sua esfera de atribuições, mas sem que a responsabilidade se concentre exclusivamente em apenas um deles — o Sistema Único de Saúde (SUS), por exemplo, é organizado justamente de forma descentralizada, com atuação articulada entre União, Estados e Municípios.
Exemplo: um cidadão que necessita de tratamento de saúde pode, em tese, buscar responsabilização de qualquer um dos entes federativos (União, Estado ou Município) para garantir seu acesso a esse direito, refletindo a natureza solidária e compartilhada dessa competência comum entre os diferentes níveis de governo.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'fácil', now()
);
