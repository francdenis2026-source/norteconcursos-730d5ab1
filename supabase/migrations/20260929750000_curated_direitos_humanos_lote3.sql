-- Curated (authored) questions, Direito lote 15: mais Direitos Humanos.
-- Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-011',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Gerações (dimensões) de direitos humanos',
  $q$Julgue o item a seguir.
Os direitos humanos de primeira geração (ou dimensão) correspondem, predominantemente, aos direitos civis e políticos, que exigem, em regra, uma abstenção do Estado (não intervenção), enquanto os de segunda geração correspondem aos direitos sociais, econômicos e culturais, que exigem, em regra, prestações positivas do Estado.$q$,
  'C',
  $q$Certo. A teoria das gerações (ou dimensões) de direitos humanos, embora sujeita a críticas doutrinárias quanto à rigidez dessa divisão cronológica, é amplamente usada didaticamente: os direitos de primeira geração (civis e políticos, como liberdade de expressão, direito à vida, direito ao voto) surgem historicamente ligados às revoluções liberais e exigem, tipicamente, que o Estado se abstenha de interferir na esfera de liberdade individual (direitos de defesa/negativos); já os direitos de segunda geração (sociais, econômicos e culturais, como saúde, educação, trabalho) surgem num contexto posterior, ligado às lutas sociais, e exigem, ao contrário, que o Estado atue positivamente, prestando serviços e implementando políticas públicas para sua efetivação (direitos prestacionais/positivos).
Exemplo: o direito à liberdade de expressão se efetiva basicamente quando o Estado NÃO censura o que alguém fala (abstenção); já o direito à saúde só se efetiva quando o Estado ATIVAMENTE constrói hospitais, forma profissionais e mantém um sistema de atendimento (prestação positiva) — a diferença de natureza entre as duas gerações está justamente nesse tipo de exigência ao Estado.$q$,
  jsonb_build_array(jsonb_build_object('title','Declaração Universal dos Direitos Humanos (ONU, 1948)','url','https://www.ohchr.org/en/human-rights/universal-declaration/translations/portuguese')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-012',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Sistema Interamericano — Comissão Interamericana',
  $q$Julgue o item a seguir.
A Comissão Interamericana de Direitos Humanos tem, entre suas funções, a de receber petições individuais alegando violação de direitos humanos por Estados-membros da Organização dos Estados Americanos, podendo, após a análise do caso, encaminhá-lo à Corte Interamericana de Direitos Humanos, quando cabível.$q$,
  'C',
  $q$Certo. A Comissão Interamericana de Direitos Humanos, com sede em Washington, é um dos dois órgãos do sistema interamericano de proteção de direitos humanos (ao lado da Corte Interamericana), e uma de suas funções centrais é justamente processar petições individuais apresentadas por pessoas, grupos de pessoas ou entidades não governamentais que aleguem violação de direitos humanos por um Estado-membro da OEA. Após analisar a admissibilidade e o mérito da petição, e frustradas as tentativas de solução amistosa, a Comissão pode, em determinados casos, submeter o caso à Corte Interamericana de Direitos Humanos para julgamento, desde que o Estado envolvido tenha reconhecido a competência contenciosa da Corte.
Exemplo: uma pessoa que sofreu uma violação grave de direitos humanos por parte do Estado brasileiro, e que já esgotou os recursos internos disponíveis no país sem obter reparação, pode apresentar uma petição individual à Comissão Interamericana, que, dependendo da análise do caso, pode eventualmente levá-lo à Corte Interamericana para julgamento.$q$,
  jsonb_build_array(jsonb_build_object('title','Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica, 1969) – Decreto nº 678/1992','url','https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-013',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção sobre os Direitos da Criança',
  $q$Julgue o item a seguir.
A Convenção sobre os Direitos da Criança, adotada pela ONU em 1989 e ratificada pelo Brasil, consagra o princípio do melhor interesse da criança como norteador de todas as decisões que a afetem, seja por parte de instituições públicas ou privadas, tribunais, autoridades administrativas ou órgãos legislativos.$q$,
  'C',
  $q$Certo. O art. 3º, item 1, da Convenção sobre os Direitos da Criança (adotada pela ONU em 1989, ratificada pelo Brasil e internalizada pelo Decreto nº 99.710/1990) estabelece que "todas as ações relativas às crianças, levadas a efeito por instituições públicas ou privadas de bem-estar social, tribunais, autoridades administrativas ou órgãos legislativos, devem considerar, primordialmente, o melhor interesse da criança". Esse princípio do "melhor interesse" (best interests of the child) tornou-se um dos pilares centrais da doutrina da proteção integral, refletida também no direito interno brasileiro, especialmente no Estatuto da Criança e do Adolescente, orientando decisões em processos de guarda, adoção, medidas protetivas e outras questões que envolvam crianças e adolescentes.
Exemplo: numa disputa de guarda entre pais separados, a decisão judicial deve priorizar o que é efetivamente melhor para o bem-estar e desenvolvimento da criança, e não simplesmente os interesses ou conveniências dos adultos envolvidos na disputa — esse é o núcleo prático do princípio do melhor interesse da criança.$q$,
  jsonb_build_array(jsonb_build_object('title','Convenção sobre os Direitos da Criança (ONU, 1989) – Decreto nº 99.710/1990','url','https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d99710.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-014',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Princípio da dignidade da pessoa humana',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A dignidade da pessoa humana, elencada entre os fundamentos da República Federativa do Brasil no art. 1º da Constituição Federal, funciona como valor unificador de todos os direitos fundamentais, servindo de critério interpretativo para a compreensão e aplicação das demais normas constitucionais.$q$,
  'C',
  $q$Certo. O art. 1º, inciso III, da CF/1988 elenca a dignidade da pessoa humana como um dos fundamentos da República Federativa do Brasil, ao lado da soberania, da cidadania, dos valores sociais do trabalho e da livre iniciativa, e do pluralismo político. A doutrina constitucional atribui a esse princípio uma função de "supraprincípio" ou valor-fonte, que unifica e dá sentido a todo o sistema de direitos fundamentais previsto na Constituição — na prática, isso significa que a dignidade da pessoa humana serve como parâmetro interpretativo para compreender e aplicar outras normas constitucionais, ajudando a resolver conflitos entre direitos e a preencher lacunas normativas em casos concretos.
Exemplo: quando há dúvida sobre como aplicar ou interpretar determinado direito fundamental num caso concreto, os tribunais frequentemente recorrem ao princípio da dignidade da pessoa humana como bússola interpretativa, verificando qual solução melhor preserva e promove a dignidade das pessoas envolvidas no caso.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'fácil', now()
);
