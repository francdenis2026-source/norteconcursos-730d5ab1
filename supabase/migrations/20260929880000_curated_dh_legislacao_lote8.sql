-- Curated (authored) questions, Direito lote 28: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-022',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Política Nacional de Direitos Humanos e atuação policial',
  $q$Julgue o item a seguir.
A atuação de agentes de segurança pública deve observar, entre outros parâmetros, o princípio da proporcionalidade no uso da força, de modo que o nível de força empregado seja compatível com o nível de resistência ou de ameaça representado pela pessoa abordada, evitando-se o uso de força excessiva mesmo diante de situações de resistência passiva.$q$,
  'C',
  $q$Certo. O princípio da proporcionalidade no uso da força, amplamente reconhecido em diretrizes nacionais e internacionais de direitos humanos aplicáveis à segurança pública, exige que o agente adeque o nível de força empregado à gravidade concreta da resistência ou ameaça enfrentada, evitando reações desproporcionais. Diante de uma resistência meramente passiva (como alguém que simplesmente se recusa a se mover, sem agressão), o uso de força excessiva (como golpes ou uso de armas) violaria esse princípio, já que existiriam meios mais brandos e adequados para lidar com aquele nível específico de resistência.
Exemplo: conter uma pessoa que apenas se senta no chão em protesto passivo, sem oferecer resistência ativa ou risco a terceiros, exige uma resposta proporcionalmente branda (como contenção física leve), e não o mesmo nível de força que seria justificável diante de uma agressão ativa e violenta — usar força equivalente nos dois cenários violaria o princípio da proporcionalidade.$q$,
  jsonb_build_array(jsonb_build_object('title','Princípios Básicos da ONU sobre o Uso da Força e Armas de Fogo (1990)','url','https://www.ohchr.org/en/instruments-mechanisms/instruments/basic-principles-use-force-and-firearms-law-enforcement')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-023',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Direito à privacidade e proteção de dados como direito humano',
  $q$Julgue o item a seguir.
O direito à proteção de dados pessoais foi expressamente incluído entre os direitos fundamentais previstos no art. 5º da Constituição Federal por meio da Emenda Constitucional nº 115/2022, reforçando, em âmbito constitucional, a proteção já conferida infraconstitucionalmente pela Lei Geral de Proteção de Dados.$q$,
  'C',
  $q$Certo. A Emenda Constitucional nº 115/2022 alterou o art. 5º da Constituição Federal para incluir, entre os direitos e garantias fundamentais, o inciso LXXIX, assegurando "é assegurado, nos termos da lei, o direito à proteção dos dados pessoais, inclusive nos meios digitais". Essa alteração elevou a proteção de dados pessoais ao status de direito fundamental expresso no texto constitucional, reforçando, em nível constitucional, a proteção que já era conferida em âmbito infraconstitucional pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018), consolidando esse direito como parte do núcleo de direitos fundamentais protegidos pelo ordenamento jurídico brasileiro.
Exemplo: antes dessa emenda, a proteção de dados pessoais decorria principalmente da legislação infraconstitucional (LGPD) e de interpretações extraídas de outros direitos fundamentais, como a privacidade e a intimidade; com a EC nº 115/2022, o direito passou a ter previsão explícita e autônoma no próprio texto constitucional, reforçando sua hierarquia normativa e sua proteção.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988, com a Emenda Constitucional nº 115/2022 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-023',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Terrorismo',
  $q$Julgue o item a seguir, com base na Lei nº 13.260/2016.
A Lei de Terrorismo, ao definir o crime de terrorismo, exige, para sua caracterização, que a conduta seja praticada por razões de xenofobia, discriminação ou preconceito de raça, cor, etnia e religião, quando tiver por finalidade provocar terror social ou generalizado, expondo a perigo pessoa, patrimônio, a paz pública ou a incolumidade pública, ressalvando expressamente a conduta individual ou coletiva de pessoas movidas por propósitos sociais ou reivindicatórios.$q$,
  'C',
  $q$Certo. O art. 2º, caput, da Lei nº 13.260/2016 tipifica o terrorismo justamente com esses elementos: praticar, por razões de xenofobia, discriminação ou preconceito de raça, cor, etnia e religião, quando tiver por finalidade provocar terror social ou generalizado, expondo a perigo pessoa, patrimônio, a paz pública ou a incolumidade pública, atos como os elencados no dispositivo. O § 2º do mesmo artigo ressalva expressamente que "o disposto neste artigo não se aplica à conduta individual ou coletiva de pessoas em manifestações políticas, movimentos sociais, sindicais, religiosos, de classe ou de categoria profissional, direcionados por propósitos sociais ou reivindicatórios, visando a contestar, criticar, protestar ou apoiar, com o objetivo de defender direitos, garantias e liberdades constitucionais" — uma salvaguarda importante para não criminalizar manifestações sociais e políticas legítimas sob o pretexto de combate ao terrorismo.
Exemplo: uma manifestação sindical reivindicando melhores condições de trabalho, mesmo que gere tumulto ou perturbação da ordem pública, não se enquadra automaticamente como terrorismo, justamente por causa dessa ressalva expressa da lei, que protege o direito à manifestação política e social legítima.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.260/2016 – Lei de Terrorismo','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13260.htm')),
  'difícil', now()
);
