-- Curated (authored) questions, Direito lote 25: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-020',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Direitos LGBTQIA+ — criminalização da homofobia',
  $q$Julgue o item a seguir, com base na jurisprudência do Supremo Tribunal Federal.
O Supremo Tribunal Federal, no julgamento da ADO 26 e do MI 4733, reconheceu a mora do Congresso Nacional em criminalizar atos de homofobia e transfobia, determinando, até que sobrevenha legislação específica, a aplicação da Lei nº 7.716/1989 (Lei do Racismo) a essas condutas, por meio de interpretação conforme a Constituição.$q$,
  'C',
  $q$Certo. No julgamento conjunto da Ação Direta de Inconstitucionalidade por Omissão (ADO) 26 e do Mandado de Injunção (MI) 4733, em 2019, o STF reconheceu que o Congresso Nacional estava em mora inconstitucional por não ter, até então, editado lei específica para criminalizar condutas de homofobia e transfobia, conforme mandado constitucional de criminalização decorrente da proteção à dignidade humana e da vedação a qualquer forma de discriminação. Como solução temporária (até que o Congresso legisle especificamente sobre o tema), o STF determinou que a Lei nº 7.716/1989 (que tipifica crimes resultantes de discriminação de raça, cor, etnia, religião ou procedência nacional) fosse aplicada, por interpretação conforme a Constituição, também às condutas homofóbicas e transfóbicas, até edição de legislação específica pelo Poder Legislativo.
Exemplo: enquanto o Congresso não aprova uma lei específica sobre o tema, atos de discriminação por orientação sexual ou identidade de gênero, nos moldes da decisão do STF, podem ser enquadrados dentro da estrutura típica já prevista na Lei do Racismo, numa solução interpretativa criada pela Corte para suprir a lacuna legislativa identificada.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-021',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Sistema Interamericano — medidas provisórias',
  $q$Julgue o item a seguir.
A Corte Interamericana de Direitos Humanos pode, em casos de extrema gravidade e urgência, ordenar medidas provisórias que se façam necessárias para evitar danos irreparáveis a pessoas, mesmo em casos ainda não submetidos ao seu conhecimento como processo principal, a pedido da Comissão Interamericana.$q$,
  'C',
  $q$Certo. O art. 63, item 2, da Convenção Americana sobre Direitos Humanos estabelece que "em casos de extrema gravidade e urgência, e quando se fizer necessário evitar danos irreparáveis às pessoas, a Corte, nos assuntos de que estiver conhecendo, poderá tomar as medidas provisórias que considerar pertinentes. Se se tratar de assuntos que ainda não estiverem submetidos ao seu conhecimento, poderá atuar a pedido da Comissão". Essas medidas provisórias funcionam como uma espécie de proteção cautelar urgente do sistema interamericano, permitindo agir rapidamente diante de riscos graves e iminentes a pessoas, mesmo antes de o caso principal ter sido formalmente submetido à Corte para julgamento de mérito.
Exemplo: se há informações de que a vida de uma pessoa está sob risco iminente num contexto que envolva possível responsabilidade estatal, a Comissão Interamericana pode solicitar à Corte a decretação de medidas provisórias urgentes de proteção a essa pessoa, mesmo que o caso principal sobre a violação de direitos ainda não tenha sido formalmente julgado pela Corte.$q$,
  jsonb_build_array(jsonb_build_object('title','Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica, 1969) – Decreto nº 678/1992','url','https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '9dfc55b7-7ad4-4b76-9b5f-ea1a7a421254', 'auth-leg-022',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei do Feminicídio',
  $q$Julgue o item a seguir, com base no Código Penal.
O feminicídio, qualificadora do crime de homicídio introduzida pela Lei nº 13.104/2015, configura-se quando o crime é praticado contra a mulher por razões da condição de sexo feminino, o que ocorre, entre outras hipóteses, quando o crime envolve violência doméstica e familiar ou menosprezo ou discriminação à condição de mulher.$q$,
  'C',
  $q$Certo. O art. 121, § 2º-A, do Código Penal, introduzido pela Lei nº 13.104/2015 (Lei do Feminicídio), esclarece que se considera que há razões de condição de sexo feminino quando o crime envolve violência doméstica e familiar (inciso I) ou menosprezo ou discriminação à condição de mulher (inciso II). A qualificadora reconhece que certos homicídios de mulheres têm uma motivação específica ligada ao gênero da vítima, refletindo relações de poder, controle ou discriminação de gênero — o que justifica um tratamento penal diferenciado, com pena mais severa, dada a gravidade dessa motivação específica.
Exemplo: o assassinato de uma mulher por seu companheiro, no contexto de um histórico de violência doméstica prévia, tende a se enquadrar na qualificadora de feminicídio, diferentemente de um homicídio comum sem essa relação específica com o gênero da vítima e com dinâmicas de violência doméstica ou discriminação de gênero.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
);
