-- Curated (authored) questions, Direito lote 38: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-028',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Execução penal e direitos do preso',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984.
A Lei de Execução Penal assegura ao preso, entre outros direitos, alimentação, vestuário e instalações higiênicas, assistência material, à saúde, jurídica, educacional, social e religiosa, sendo esses direitos considerados essenciais à execução penal, independentemente da natureza do crime pelo qual a pessoa esteja condenada.$q$,
  'C',
  $q$Certo. O art. 41, incisos I a IV, da Lei nº 7.210/1984 (Lei de Execução Penal) lista, entre os direitos do preso, a alimentação, vestuário e instalações higiênicas; e o art. 11 detalha as diferentes modalidades de assistência ao preso: material, à saúde, jurídica, educacional, social e religiosa. Esses direitos existem justamente porque a privação de liberdade, decorrente da condenação penal, restringe especificamente o direito de ir e vir da pessoa, mas não suprime automaticamente todos os seus outros direitos fundamentais e humanos, que continuam sendo devidos independentemente da gravidade do crime cometido — a dignidade da pessoa humana é preservada mesmo durante o cumprimento de pena.
Exemplo: um preso condenado por crime grave continua tendo direito a alimentação adequada, atendimento médico quando necessário e assistência jurídica para acompanhar seu processo, entre outros direitos assegurados pela LEP — a gravidade do crime cometido não autoriza a supressão desses direitos básicos durante o cumprimento da pena.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984 – Lei de Execução Penal','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-029',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Direito à identidade e ao nome social',
  $q$Julgue o item a seguir.
O uso do nome social por pessoas travestis e transexuais em órgãos e entidades da administração pública federal, garantido por decreto federal, reflete uma dimensão do direito à identidade de gênero como direito humano, permitindo que a pessoa seja identificada, no cotidiano administrativo, pelo nome que reflete sua identidade autopercebida, independentemente do nome constante em seu registro civil.$q$,
  'C',
  $q$Certo. O reconhecimento do nome social — o nome pelo qual pessoas travestis e transexuais se identificam e são identificadas socialmente, e que pode ser diferente daquele constante em seu registro civil — foi consolidado no âmbito da administração pública federal por meio de normativos específicos, refletindo o entendimento de que a identidade de gênero é um aspecto essencial da dignidade da pessoa humana. Esse reconhecimento permite que, em cadastros, chamadas e documentos administrativos cotidianos, a pessoa seja identificada pelo nome que corresponde à sua identidade de gênero autopercebida, sem prejuízo do uso do nome civil em registros formais específicos que exijam essa correspondência legal (como determinados documentos oficiais), buscando reduzir situações de constrangimento e discriminação vivenciadas por essa população.
Exemplo: uma pessoa trans atendida num órgão público federal pode ser chamada pelo nome social que usa no cotidiano, mesmo que seu documento de identidade formal ainda registre um nome diferente, refletindo o compromisso da administração com o respeito à identidade de gênero da pessoa em suas interações administrativas cotidianas.$q$,
  jsonb_build_array(jsonb_build_object('title','Decreto nº 8.727/2016 – Uso do nome social na administração pública federal','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/decreto/d8727.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-026',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Execução Penal — progressão de regime',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984.
A progressão de regime de cumprimento de pena, de regime mais rigoroso para regime menos rigoroso, deve ser determinada pelo juiz, quando o preso tiver cumprido ao menos a fração de pena exigida em lei, conforme a natureza do crime, aliada a boa conduta carcerária comprovada, sendo vedada a progressão por saltos, ou seja, diretamente do regime fechado para o aberto, sem passar pelo semiaberto.$q$,
  'C',
  $q$Certo. O art. 112 da Lei nº 7.210/1984 estabelece que a progressão de regime prisional depende do cumprimento de frações mínimas da pena (que variam conforme a natureza do crime — por exemplo, crimes hediondos exigem frações maiores do que crimes comuns) e da boa conduta carcerária comprovada pelo diretor do estabelecimento penal. Além disso, a jurisprudência dos tribunais superiores é pacífica ao vedar a chamada "progressão por saltos" — o condenado deve progredir sequencialmente do regime fechado para o semiaberto, e só depois para o aberto, não sendo permitido pular etapas diretamente do fechado para o aberto, mesmo que, em tese, ele já tivesse cumprido tempo suficiente para tanto, considerando o regime mais brando isoladamente.
Exemplo: um condenado que cumpre pena em regime fechado, mesmo que tecnicamente já tivesse tempo de pena cumprido equivalente ao exigido para o regime aberto, precisa necessariamente passar primeiro pelo regime semiaberto antes de eventualmente progredir ao regime aberto — não é permitido pular diretamente do fechado para o aberto.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984 – Lei de Execução Penal','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'difícil', now()
);
