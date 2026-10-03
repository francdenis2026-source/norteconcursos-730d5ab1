-- Curated (authored) questions, Direito lote 81: mais Direitos Humanos e
-- Legislação Especial. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-044',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção Americana de Direitos Humanos — garantias judiciais (art. 8º)',
  $q$Julgue o item a seguir, com base na Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica), promulgada no Brasil pelo Decreto nº 678/1992.
Toda pessoa tem direito a ser ouvida, com as devidas garantias e dentro de um prazo razoável, por juiz ou tribunal competente, independente e imparcial, estabelecido anteriormente por lei, na apuração de qualquer acusação penal formulada contra ela, ou para que se determinem seus direitos ou obrigações de caráter civil, trabalhista, fiscal ou de qualquer outra natureza.$q$,
  'C',
  $q$Certo. O art. 8º, item 1, da Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica) assegura as garantias judiciais mínimas a toda pessoa, tanto em processos de natureza penal quanto em processos cíveis, trabalhistas, fiscais ou de qualquer outra natureza, exigindo que a causa seja apreciada por autoridade judicial competente, independente e imparcial, previamente instituída por lei (vedando tribunais de exceção), dentro de prazo razoável, em observância ao devido processo legal. O Brasil internalizou a Convenção por meio do Decreto nº 678, de 6 de novembro de 1992, e o Supremo Tribunal Federal reconhece a esses tratados de direitos humanos, quando não aprovados pelo rito do art. 5º, § 3º, da Constituição, o status de norma supralegal, abaixo da Constituição mas acima da legislação ordinária.
Exemplo: em um processo administrativo disciplinar contra um servidor público, mesmo não sendo processo penal, a Convenção exige que a apuração observe prazo razoável e seja conduzida por autoridade imparcial, sob pena de violação às garantias judiciais mínimas asseguradas pelo Pacto de San José.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 678/1992 – Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica)','url','https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-040',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Drogas — tráfico privilegiado (art. 33, § 4º)',
  $q$Julgue o item a seguir, com base na Lei nº 11.343/2006 (Lei de Drogas).
As penas do tráfico de drogas poderão ser reduzidas de um sexto a dois terços quando o agente for primário, de bons antecedentes, não se dedicar às atividades criminosas nem integrar organização criminosa, causa de diminuição conhecida como tráfico privilegiado, cuja concessão exige o preenchimento cumulativo de todos esses requisitos.$q$,
  'C',
  $q$Certo. O art. 33, § 4º, da Lei nº 11.343/2006 prevê a causa especial de diminuição de pena conhecida como "tráfico privilegiado", aplicável quando o agente condenado por tráfico de drogas for primário, tiver bons antecedentes, não se dedicar a atividades criminosas nem integrar organização criminosa — requisitos que devem estar todos presentes cumulativamente, e não de forma alternativa, para que o juiz possa reduzir a pena de um sexto a dois terços. O Supremo Tribunal Federal já assentou que o simples fato de o agente ser primário e de bons antecedentes não gera direito automático à redução máxima, cabendo ao julgador fixar o percentual de diminuição conforme as circunstâncias do caso concreto, e que a ausência de qualquer um dos requisitos legais afasta a aplicação do benefício.
Exemplo: um réu primário e sem antecedentes criminais, mas que a instrução processual comprove estar vinculado a uma organização criminosa de tráfico, não faz jus ao tráfico privilegiado, ainda que preencha os demais requisitos, porque a lei exige o preenchimento simultâneo de todas as condições legais.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.343/2006 – Lei de Drogas, texto compilado','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm')),
  'difícil', now()
);
