-- Curated (authored) questions, Direito lote 79: mais Direito
-- Administrativo e Direito Constitucional. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-052',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Direito de greve do servidor público',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988 e na jurisprudência do STF.
O direito de greve do servidor público civil, embora assegurado constitucionalmente, foi objeto de mandado de injunção julgado pelo STF, que, diante da omissão legislativa persistente na regulamentação específica desse direito, determinou a aplicação, no que couber, da lei geral de greve dos trabalhadores da iniciativa privada, enquanto não sobrevier legislação específica.$q$,
  'C',
  $q$Certo. O art. 37, inciso VII, da CF/1988 assegura o direito de greve do servidor público, mas condiciona seu exercício aos "termos e nos limites definidos em lei específica" — lei essa que, até hoje, nunca foi editada pelo Congresso Nacional, configurando uma omissão legislativa persistente. Diante dessa lacuna, o STF, no julgamento de mandados de injunção sobre o tema, determinou a aplicação, no que couber, da Lei nº 7.783/1989 (que regula o direito de greve na iniciativa privada) aos servidores públicos, como solução provisória enquanto a lei específica não for editada, garantindo assim algum grau de efetividade ao direito constitucional mesmo diante da omissão do Legislativo.
Exemplo: servidores públicos que decidem exercer o direito de greve, na ausência de lei específica que regule os detalhes desse exercício, aplicam, por determinação judicial do STF, regras análogas às da lei geral de greve dos trabalhadores privados, como parâmetro provisório para questões como aviso prévio, manutenção de serviços essenciais e outros aspectos práticos do movimento grevista.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-037',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Sigilo de fonte jornalística',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É livre a expressão da atividade intelectual, artística, científica e de comunicação, independentemente de censura ou licença, e é assegurado, no exercício profissional, o sigilo da fonte, quando necessário ao exercício profissional, garantia que se estende também a jornalistas que atuam de forma não vinculada a veículos de comunicação tradicionais.$q$,
  'C',
  $q$Certo. O art. 5º, incisos IX e XIV, da CF/1988 assegura, respectivamente, a liberdade de expressão intelectual, artística, científica e de comunicação, independentemente de censura ou licença, e o sigilo da fonte, quando necessário ao exercício profissional. Embora essa garantia tenha sido historicamente associada à profissão jornalística tradicional, a jurisprudência e a doutrina reconhecem que a proteção ao sigilo da fonte não se restringe formalmente a jornalistas vinculados a veículos tradicionais de comunicação (jornais, emissoras de TV/rádio) — a garantia constitucional visa proteger a livre circulação de informações de interesse público, independentemente do formato ou vínculo institucional específico de quem exerce essa atividade de comunicação e investigação.
Exemplo: um comunicador independente que produz conteúdo investigativo relevante para uma plataforma digital própria, sem vínculo formal com uma redação jornalística tradicional, pode, em determinados contextos, também invocar a proteção ao sigilo de suas fontes de informação, na medida em que exerce, na prática, atividade de comunicação análoga à jornalística.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
