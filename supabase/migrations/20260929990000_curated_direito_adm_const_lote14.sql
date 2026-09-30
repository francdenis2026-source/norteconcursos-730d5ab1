-- Curated (authored) questions, Direito lote 39: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-035',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Terceiro setor — OS e OSCIP',
  $q$Julgue o item a seguir.
As Organizações Sociais (OS) e as Organizações da Sociedade Civil de Interesse Público (OSCIP) são entidades privadas sem fins lucrativos que, mediante qualificação específica concedida pelo poder público e celebração de instrumento jurídico próprio (contrato de gestão ou termo de parceria, respectivamente), podem receber recursos públicos, fomento e apoio para o desenvolvimento de atividades de interesse público, sem, contudo, integrarem a administração pública.$q$,
  'C',
  $q$Certo. As Organizações Sociais (disciplinadas pela Lei nº 9.637/1998) e as Organizações da Sociedade Civil de Interesse Público (disciplinadas pela Lei nº 9.790/1999) são entidades privadas, sem fins lucrativos, que recebem uma qualificação jurídica específica do poder público, permitindo-lhes celebrar parcerias formais — contrato de gestão, no caso das OS, e termo de parceria, no caso das OSCIP — para desenvolver atividades de interesse público (como saúde, educação, cultura, pesquisa científica), recebendo, em contrapartida, recursos públicos, bens e outras formas de fomento. Apesar dessa relação próxima com o Estado, essas entidades permanecem sendo pessoas jurídicas de direito privado, não integrando formalmente a estrutura da administração pública (nem direta, nem indireta) — daí a classificação como parte do chamado "terceiro setor".
Exemplo: um hospital gerido por uma Organização Social, mediante contrato de gestão com o poder público, opera com recursos públicos e sob fiscalização estatal, mas continua sendo uma entidade privada, e não um órgão ou entidade formal da administração pública, diferente, por exemplo, de um hospital público administrado diretamente por uma autarquia de saúde.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-036',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Direito de petição no processo administrativo (Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
São legitimados como interessados no processo administrativo, entre outros, as pessoas físicas ou jurídicas que o iniciem como titulares de direitos ou interesses individuais ou no exercício do direito de representação, bem como aqueles cujos interesses possam ser afetados pela decisão a ser adotada.$q$,
  'C',
  $q$Certo. O art. 9º da Lei nº 9.784/1999 define os legitimados a figurar como interessados no processo administrativo, incluindo, entre outros incisos: (I) pessoas físicas ou jurídicas que o iniciem como titulares de direitos ou interesses individuais ou no exercício do direito de representação; e (II) aqueles que, sem terem iniciado o processo, têm direitos ou interesses que possam ser afetados pela decisão a ser adotada. Essa ampla legitimação busca garantir que todos que possam ser concretamente afetados por uma decisão administrativa tenham a oportunidade de participar do processo, assegurando o contraditório e a ampla defesa a quem tem interesse jurídico relevante no desfecho daquele procedimento específico.
Exemplo: numa licitação, não apenas quem apresentou proposta tem legitimidade para participar de eventuais recursos relacionados ao certame — outros concorrentes cujos interesses possam ser diretamente afetados pela decisão sobre o vencedor também podem, em regra, figurar como interessados no processo administrativo correspondente.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999 – Processo Administrativo Federal','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-022',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Defensoria Pública',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A Defensoria Pública é instituição permanente, essencial à função jurisdicional do Estado, incumbindo-lhe, como expressão e instrumento do regime democrático, a orientação jurídica, a promoção dos direitos humanos e a defesa, em todos os graus, judicial e extrajudicial, dos direitos individuais e coletivos, de forma integral e gratuita, aos necessitados.$q$,
  'C',
  $q$Certo. O art. 134, caput, da CF/1988 (com a redação dada pela Emenda Constitucional nº 80/2014) reforçou o papel institucional da Defensoria Pública: "instituição permanente, essencial à função jurisdicional do Estado, incumbindo-lhe, como expressão e instrumento do regime democrático, fundamentalmente, a orientação jurídica, a promoção dos direitos humanos e a defesa, em todos os graus, judicial e extrajudicial, dos direitos individuais e coletivos, de forma integral e gratuita, aos necessitados, na forma do inciso LXXIV do art. 5º desta Constituição Federal". A ampliação constitucional dessa missão institucional, incluindo expressamente a "promoção dos direitos humanos", reflete o entendimento de que a Defensoria vai além da simples assistência judicial individual, atuando também de forma mais ampla na defesa de direitos coletivos e na promoção da cidadania.
Exemplo: além de defender individualmente uma pessoa que não pode pagar advogado num processo judicial, a Defensoria Pública também pode atuar coletivamente, por exemplo, em ações civis públicas que defendam interesses de grupos vulneráveis, refletindo essa dimensão mais ampla de promoção de direitos humanos e defesa de direitos coletivos que a Constituição lhe atribui.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
