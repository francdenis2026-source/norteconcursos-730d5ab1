-- Curated (authored) questions, Direito lote 72: mais Direitos Humanos e
-- Legislação Especial. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-041',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Garantias judiciais mínimas',
  $q$Julgue o item a seguir, com base na Convenção Americana sobre Direitos Humanos.
Toda pessoa acusada de delito tem direito a ser assistida gratuitamente por um defensor proporcionado pelo Estado, remunerado ou não, segundo a legislação interna, se não se defender ela própria nem nomear defensor dentro do prazo estabelecido pela lei, garantia expressamente prevista entre as garantias judiciais mínimas asseguradas pelo Pacto de San José da Costa Rica.$q$,
  'C',
  $q$Certo. O art. 8º, item 2, alínea "e", da Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica) assegura, entre as garantias judiciais mínimas de toda pessoa acusada de delito, "o direito irrenunciável de ser assistida por um defensor proporcionado pelo Estado, remunerado ou não, segundo a legislação interna, se o acusado não se defender ele próprio, nem nomear defensor dentro do prazo estabelecido pela lei". Essa garantia reflete o compromisso do sistema interamericano com o devido processo legal, assegurando que ninguém seja julgado criminalmente sem contar com defesa técnica adequada, mesmo que não tenha condições financeiras de contratar advogado particular — no Brasil, essa garantia é materializada, principalmente, por meio da atuação da Defensoria Pública.
Exemplo: um acusado sem recursos financeiros para contratar advogado, que não constitui defensor por conta própria dentro do prazo legal, deve ter assegurada assistência jurídica gratuita fornecida pelo Estado (no Brasil, tipicamente pela Defensoria Pública), como garantia mínima do devido processo legal reconhecida internacionalmente.$q$,
  jsonb_build_array(jsonb_build_object('title','Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica, 1969) – Decreto nº 678/1992','url','https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-037',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Marco Civil da Internet',
  $q$Julgue o item a seguir, com base na Lei nº 12.965/2014.
O Marco Civil da Internet estabelece que os provedores de conexão à internet devem manter os registros de conexão, sob sigilo, em ambiente controlado e de segurança, pelo prazo de um ano, ressalvado prazo maior por determinação legal ou requerimento cautelar de autoridade competente, sendo a guarda de registros de acesso a aplicações de internet, quando exigida, disciplinada por prazo distinto.$q$,
  'C',
  $q$Certo. O art. 13, caput, da Lei nº 12.965/2014 (Marco Civil da Internet) estabelece que "na provisão de conexão à internet, cabe ao administrador de sistema autônomo respectivo o dever de manter os registros de conexão, sob sigilo, em ambiente controlado e de segurança, pelo prazo de 1 (um) ano". Essa é diferente da regra aplicável aos registros de acesso a APLICAÇÕES de internet (art. 15), cujo prazo de guarda, quando exigido, é de 6 meses. O § 2º do art. 13 prevê que a autoridade policial ou administrativa ou o Ministério Público podem requerer cautelarmente que os registros de conexão sejam guardados por prazo superior ao previsto, quando houver necessidade específica de investigação, evitando que provas potencialmente relevantes sejam descartadas antes do prazo legal padrão.
Exemplo: uma investigação que necessite dos registros de conexão de determinado usuário, mesmo que o prazo padrão de um ano esteja próximo de expirar, pode ser objeto de requerimento cautelar de preservação desses dados por prazo adicional, evitando que sejam descartados enquanto a autorização judicial específica para acesso a esses registros ainda está sendo obtida.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.965/2014 – Marco Civil da Internet','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm')),
  'difícil', now()
);
