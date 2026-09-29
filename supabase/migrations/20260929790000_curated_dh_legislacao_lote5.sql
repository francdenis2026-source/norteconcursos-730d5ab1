-- Curated (authored) questions, Direito lote 19: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-015',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Sistema Global de Proteção — Conselho de Direitos Humanos',
  $q$Julgue o item a seguir.
O Conselho de Direitos Humanos da ONU, criado em 2006 em substituição à antiga Comissão de Direitos Humanos, realiza periodicamente a Revisão Periódica Universal, mecanismo pelo qual a situação de direitos humanos de todos os Estados-membros da ONU é avaliada de forma regular, independentemente de denúncias específicas de violação.$q$,
  'C',
  $q$Certo. O Conselho de Direitos Humanos da ONU foi criado em 2006, substituindo a antiga Comissão de Direitos Humanos, com o objetivo de fortalecer o sistema global de promoção e proteção dos direitos humanos. Um de seus principais mecanismos é a Revisão Periódica Universal (RPU), um processo pelo qual a situação de direitos humanos de TODOS os Estados-membros da ONU é examinada periodicamente (em ciclos regulares), de forma sistemática e não seletiva — diferente de mecanismos acionados apenas mediante denúncia de violação específica, a RPU submete todos os países ao mesmo escrutínio periódico, independentemente de haver ou não alegações concretas de violação naquele momento.
Exemplo: mesmo um país sem denúncias recentes específicas de violação de direitos humanos passa, periodicamente, pela Revisão Periódica Universal, na qual outros Estados-membros e organizações podem apresentar observações e recomendações sobre a situação de direitos humanos naquele país, num processo de avaliação mútua e sistemática entre todos os membros da ONU.$q$,
  jsonb_build_array(jsonb_build_object('title','Resolução da Assembleia Geral da ONU nº 60/251 (2006) – Criação do Conselho de Direitos Humanos','url','https://www.ohchr.org/en/hr-bodies/hrc/about-council')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-016',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Discriminação racial',
  $q$Julgue o item a seguir, com base na Lei nº 7.716/1989.
A prática de racismo é crime inafiançável e imprescritível, nos termos da Constituição Federal, sendo essa vedação distinta e mais rigorosa do que a aplicável ao crime de injúria racial, ainda que, na jurisprudência mais recente do Supremo Tribunal Federal, também se reconheça a imprescritibilidade e a inafiançabilidade para a injúria racial, equiparando-a, nesses efeitos, ao crime de racismo.$q$,
  'C',
  $q$Certo. O art. 5º, XLII, da CF/1988 estabelece que "a prática do racismo constitui crime inafiançável e imprescritível, sujeito à pena de reclusão, nos termos da lei" — regulamentado pela Lei nº 7.716/1989. Durante muito tempo, discutiu-se se a injúria racial (prevista separadamente no Código Penal, art. 140, § 3º) teria o mesmo tratamento rigoroso do crime de racismo propriamente dito. O Supremo Tribunal Federal, em julgamento de repercussão geral, evoluiu seu entendimento para reconhecer que a injúria racial também deve ser tratada como imprescritível e inafiançável, equiparando-a, nesses efeitos específicos, ao crime de racismo, reforçando a proteção penal contra manifestações de discriminação racial em suas diferentes formas típicas.
Exemplo: tanto quem pratica atos de discriminação racial coletiva ou institucional (racismo, nos termos da Lei nº 7.716/1989) quanto quem ofende individualmente alguém com base em elementos raciais (injúria racial) estão, segundo a jurisprudência atual do STF, sujeitos ao mesmo regime de imprescritibilidade e inafiançabilidade, ainda que sejam tipos penais tecnicamente distintos.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm'),jsonb_build_object('title','Lei nº 7.716/1989 – Lei do Racismo','url','https://www.planalto.gov.br/ccivil_03/leis/l7716.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '9dfc55b7-7ad4-4b76-9b5f-ea1a7a421254', 'auth-leg-019',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Estatuto da Igualdade Racial',
  $q$Julgue o item a seguir, com base na Lei nº 12.288/2010.
O Estatuto da Igualdade Racial define desigualdade racial como toda situação injustificada de diferenciação de acesso e fruição de bens, serviços e oportunidades, nas esferas pública e privada, em virtude de raça, cor, descendência ou origem nacional ou étnica, prevendo, entre suas diretrizes, a adoção de políticas públicas de promoção da igualdade racial.$q$,
  'C',
  $q$Certo. O art. 1º, parágrafo único, inciso I, da Lei nº 12.288/2010 (Estatuto da Igualdade Racial) define desigualdade racial nesses termos: "toda situação injustificada de diferenciação de acesso e fruição de bens, serviços e oportunidades, nas esferas pública e privada, em virtude de raça, cor, descendência ou origem nacional ou étnica". O Estatuto, de forma ampla, busca garantir à população negra a efetivação da igualdade de oportunidades, a defesa dos direitos étnicos individuais, coletivos e difusos, e o combate à discriminação e às demais formas de intolerância étnica, prevendo diversas políticas públicas voltadas a essa finalidade, como ações afirmativas em diferentes áreas (educação, saúde, trabalho, entre outras).
Exemplo: políticas de cotas raciais em concursos públicos ou instituições de ensino são exemplos concretos de políticas públicas de promoção da igualdade racial, alinhadas ao espírito do Estatuto, buscando corrigir desigualdades históricas de acesso a oportunidades vivenciadas pela população negra no Brasil.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.288/2010 – Estatuto da Igualdade Racial','url','https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12288.htm')),
  'média', now()
);
