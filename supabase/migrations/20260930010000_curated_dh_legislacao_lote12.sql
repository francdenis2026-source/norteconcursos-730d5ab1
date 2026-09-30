-- Curated (authored) questions, Direito lote 41: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-030',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Direitos indígenas',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São reconhecidos aos índios sua organização social, costumes, línguas, crenças e tradições, e os direitos originários sobre as terras que tradicionalmente ocupam, competindo à União demarcá-las, proteger e fazer respeitar todos os seus bens, sendo nulos os atos que tenham por objeto a ocupação, o domínio e a posse dessas terras por terceiros não indígenas.$q$,
  'C',
  $q$Certo. O art. 231, caput e § 6º, da CF/1988 estabelece exatamente esse regime de proteção: reconhece aos índios sua organização social, costumes, línguas, crenças e tradições, e os direitos originários sobre as terras que tradicionalmente ocupam, competindo à União demarcá-las, proteger e fazer respeitar todos os seus bens. O § 6º complementa que "são nulos e extintos, não produzindo efeitos jurídicos, os atos que tenham por objeto a ocupação, o domínio e a posse das terras [indígenas], ou a exploração das riquezas naturais do solo, dos rios e dos lagos nelas existentes", ressalvado relevante interesse público da União, na forma de lei complementar. A expressão "direitos originários" indica que esses direitos não decorrem de uma concessão do Estado, mas são reconhecidos como preexistentes à própria formação do Estado brasileiro.
Exemplo: um terceiro que ocupa e explora comercialmente terras tradicionalmente indígenas, sem observância desse regime constitucional específico, pratica atos considerados nulos e sem efeitos jurídicos, independentemente de eventual boa-fé ou tempo de ocupação, dada a natureza originária e especialmente protegida desses direitos indígenas.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-031',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção 169 da OIT — povos indígenas e tribais',
  $q$Julgue o item a seguir.
A Convenção nº 169 da Organização Internacional do Trabalho (OIT), ratificada pelo Brasil, estabelece o direito de consulta prévia, livre e informada aos povos indígenas e tribais sempre que se preveja a adoção de medidas legislativas ou administrativas que possam afetá-los diretamente, como no caso de projetos de exploração de recursos naturais em suas terras.$q$,
  'C',
  $q$Certo. A Convenção nº 169 da OIT, sobre Povos Indígenas e Tribais (1989), ratificada pelo Brasil e internalizada pelo Decreto nº 5.051/2004, estabelece, em seu art. 6º, o dever dos governos de consultar os povos interessados, mediante procedimentos apropriados e, particularmente, através de suas instituições representativas, sempre que sejam previstas medidas legislativas ou administrativas suscetíveis de afetá-los diretamente. Esse direito de consulta prévia, livre e informada é especialmente relevante em contextos de projetos de exploração de recursos naturais (mineração, hidrelétricas, entre outros) que possam impactar terras tradicionalmente ocupadas por esses povos, buscando garantir sua participação efetiva nas decisões que afetam diretamente seu modo de vida e seu território.
Exemplo: antes de autorizar um grande empreendimento de exploração mineral em área que afete diretamente terras indígenas ou de comunidades tradicionais, a Convenção nº 169 exige que essas comunidades sejam consultadas de forma prévia, livre e informada sobre o projeto, e não apenas comunicadas depois de a decisão já ter sido tomada pelo poder público ou pela empresa interessada.$q$,
  jsonb_build_array(jsonb_build_object('title','Convenção nº 169 da OIT sobre Povos Indígenas e Tribais (1989) – Decreto nº 5.051/2004','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/decreto/d5051.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-027',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Estatuto do Índio',
  $q$Julgue o item a seguir, com base na Lei nº 6.001/1973.
O Estatuto do Índio tem por objetivo preservar a cultura indígena e integrar os índios, progressiva e harmoniosamente, à comunhão nacional, atribuindo à União, aos seus órgãos de assistência aos índios e aos Estados-membros a competência para a prática de atos administrativos necessários ao regular funcionamento dos direitos assegurados aos índios.$q$,
  'C',
  $q$Certo. O art. 1º da Lei nº 6.001/1973 (Estatuto do Índio) estabelece que essa lei regula a situação jurídica dos índios ou silvícolas e das comunidades indígenas, com o propósito de preservar a sua cultura e integrá-los, progressiva e harmoniosamente, à comunhão nacional. Embora parte da doutrina moderna critique essa concepção "integracionista" original da lei, tida como parcialmente superada pelo paradigma constitucional de 1988 (que reconhece e valoriza a diversidade cultural indígena, sem exigir sua "integração" à cultura nacional dominante), o Estatuto do Índio ainda regula diversos aspectos práticos da tutela e assistência aos povos indígenas no Brasil, permanecendo em vigor naquilo que não conflita com a Constituição de 1988.
Exemplo: mesmo com as críticas doutrinárias ao paradigma integracionista original, dispositivos do Estatuto do Índio relacionados, por exemplo, à administração patrimonial de bens indígenas ou a procedimentos específicos de assistência continuam sendo aplicados, desde que compatíveis com os princípios constitucionais de 1988, que reforçam o respeito à diversidade cultural, e não a assimilação forçada.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 6.001/1973 – Estatuto do Índio','url','https://www.planalto.gov.br/ccivil_03/leis/l6001.htm')),
  'difícil', now()
);
