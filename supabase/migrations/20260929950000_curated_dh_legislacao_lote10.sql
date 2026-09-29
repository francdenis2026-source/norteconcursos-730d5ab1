-- Curated (authored) questions, Direito lote 35: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-026',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção de Genebra e refugiados apátridas',
  $q$Julgue o item a seguir.
Apátrida é a pessoa que não é considerada nacional de nenhum Estado, seja por lacunas legislativas, conflitos de leis de nacionalidade entre países, ou perda de nacionalidade sem aquisição de outra, situação distinta da de refugiado, ainda que uma mesma pessoa possa, em certos casos, ser simultaneamente refugiada e apátrida.$q$,
  'C',
  $q$Certo. A apatridia (ou condição de apátrida) é regulada internacionalmente pela Convenção sobre o Estatuto dos Apátridas (1954), definindo apátrida como a pessoa que não é considerada nacional por nenhum Estado, conforme sua legislação. Essa situação pode decorrer de diferentes causas: lacunas ou conflitos entre as legislações de nacionalidade de diferentes países (por exemplo, quando um país adota jus soli e outro jus sanguinis, e a criança nasce numa combinação que não gera nacionalidade em nenhum dos dois), ou perda da nacionalidade original sem aquisição de outra. A condição de apátrida é conceitualmente distinta da de refugiado (que foge de perseguição, mas mantém, em regra, sua nacionalidade de origem), embora uma pessoa possa, em situações específicas, acumular as duas condições simultaneamente.
Exemplo: uma criança nascida em um país que só reconhece nacionalidade por descendência (jus sanguinis), de pais que, por algum motivo, também não puderam lhe transmitir nacionalidade alguma, pode nascer apátrida, sem vínculo de nacionalidade com nenhum Estado, independentemente de estar ou não fugindo de perseguição, que é o elemento central que caracteriza a condição de refugiado.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.445/2017 – Lei de Migração','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-027',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Proteção a vítimas e testemunhas',
  $q$Julgue o item a seguir, com base na Lei nº 9.807/1999.
O Programa Federal de Assistência a Vítimas e a Testemunhas Ameaçadas tem por finalidade proteger vítimas e testemunhas de crimes que estejam coagidas ou expostas a grave ameaça em razão de colaborarem com a investigação ou processo criminal, podendo as medidas de proteção incluir mudança de domicílio ou de local de trabalho, sem alteração da identidade civil, salvo em casos excepcionais previstos em lei.$q$,
  'C',
  $q$Certo. A Lei nº 9.807/1999 institui normas para organização e manutenção de programas especiais de proteção a vítimas e a testemunhas ameaçadas, prevendo, entre as medidas de proteção, a segurança na residência, transporte e trânsito, quando necessário; a transferência de residência ou acomodação provisória; a preservação da identidade, imagem e dados pessoais; a mudança de domicílio ou de local de trabalho; entre outras. Em regra, essas medidas não incluem a alteração formal da identidade civil, hipótese mais excepcional, reservada especificamente a casos de proteção mais extrema, previstos na própria lei, quando as demais medidas se mostrarem insuficientes para garantir a segurança da pessoa protegida.
Exemplo: uma testemunha que colaborou com uma investigação criminal e passou a sofrer ameaças concretas de retaliação pode ser incluída no programa de proteção, recebendo apoio para mudar de cidade e de emprego, mantendo, em regra, sua identidade civil original, salvo se a gravidade extrema do risco justificar, excepcionalmente, medida mais drástica de alteração de identidade.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.807/1999 – Lei de Proteção a Vítimas e Testemunhas','url','https://www.planalto.gov.br/ccivil_03/leis/l9807.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '012bdb9d-f67d-48e9-911e-10be9fc9226e', 'auth-leg-025',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Abuso de Autoridade — condutas específicas',
  $q$Julgue o item a seguir, com base na Lei nº 13.869/2019.
Constitui infração disciplinar, nos termos da Lei de Abuso de Autoridade, decretar a prisão de alguém sem observância das formalidades legais, ou fora das hipóteses legais, sendo essa conduta tipificada como crime específico e não meramente como agravante de outra infração já existente no ordenamento.$q$,
  'C',
  $q$Certo. O art. 9º da Lei nº 13.869/2019 tipifica especificamente como crime "decretar medida de privação da liberdade em manifesta desconformidade com as hipóteses legais". Essa é uma das diversas condutas específicas de abuso de autoridade previstas ao longo da lei, que buscou detalhar, em tipos penais autônomos, diferentes formas de exercício abusivo de poder por parte de agentes públicos — indo além de uma mera agravante genérica de outros crimes, a lei criou tipos penais próprios e específicos para essas condutas, com penas e elementos próprios, o que reforça o tratamento penal diferenciado dado ao tema após a edição dessa legislação específica em 2019.
Exemplo: uma autoridade que decreta prisão de alguém sem que estejam presentes os requisitos legais para tal medida cautelar, de forma manifestamente contrária ao que a lei exige, pode responder especificamente pelo crime do art. 9º da Lei de Abuso de Autoridade, além de eventuais outras consequências jurídicas (como a nulidade da própria prisão decretada irregularmente).$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.869/2019 – Lei de Abuso de Autoridade','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm')),
  'média', now()
);
