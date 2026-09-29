-- Curated (authored) questions, Direito lote 3: Direitos Humanos e mais
-- Legislação Especial. Same authoring approach as prior lotes: original
-- content, full legal audit (legal_basis, law_version_checked_at,
-- syllabus_topic_id).

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-001',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Declaração Universal dos Direitos Humanos',
  $q$Julgue o item a seguir.
A Declaração Universal dos Direitos Humanos, de 1948, embora não tenha, originalmente, força de tratado internacional vinculante, é amplamente reconhecida pela doutrina como fundamento moral e político dos principais instrumentos internacionais de direitos humanos elaborados posteriormente.$q$,
  'C',
  $q$Certo. A Declaração Universal dos Direitos Humanos (DUDH), adotada pela Assembleia Geral da ONU em 1948, foi originalmente concebida como uma resolução da Assembleia Geral, sem a força jurídica vinculante própria de um tratado ratificado pelos Estados. Ainda assim, ela é considerada o documento fundador do sistema internacional de proteção dos direitos humanos, servindo de base moral, política e inspiradora para tratados posteriores juridicamente vinculantes, como o Pacto Internacional sobre Direitos Civis e Políticos e o Pacto Internacional sobre Direitos Econômicos, Sociais e Culturais, ambos de 1966.
Exemplo: é como uma "carta de princípios" inicial que, apesar de não obrigar formalmente os países por si só, moldou e inspirou praticamente todos os tratados de direitos humanos que vieram depois — funcionando como uma referência moral universal, mesmo sem o mesmo peso jurídico de um tratado ratificado.$q$,
  jsonb_build_array(jsonb_build_object('title','Declaração Universal dos Direitos Humanos (ONU, 1948)','url','https://www.ohchr.org/en/human-rights/universal-declaration/translations/portuguese')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-002',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Pacto de San José da Costa Rica',
  $q$Julgue o item a seguir.
A Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica), da qual o Brasil é signatário, instituiu a Corte Interamericana de Direitos Humanos, órgão jurisdicional cuja competência contenciosa o Brasil reconheceu expressamente.$q$,
  'C',
  $q$Certo. A Convenção Americana sobre Direitos Humanos, adotada em San José, Costa Rica, em 1969, criou dois órgãos de proteção: a Comissão Interamericana de Direitos Humanos e a Corte Interamericana de Direitos Humanos. Esta última tem competência jurisdicional (contenciosa) para julgar casos envolvendo violações de direitos humanos pelos Estados que reconheceram expressamente essa competência — o Brasil o fez por meio de decreto legislativo, o que significa que decisões da Corte podem gerar obrigações internacionais concretas para o país em casos de violação de direitos previstos na Convenção.
Exemplo: se o Brasil for condenado pela Corte Interamericana por uma violação de direitos humanos reconhecida em um caso concreto, o país assume o compromisso internacional de cumprir a decisão, o que pode incluir reparação a vítimas ou mudanças em práticas institucionais apontadas como violadoras de direitos.$q$,
  jsonb_build_array(jsonb_build_object('title','Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica, 1969) – Decreto nº 678/1992','url','https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-003',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Vedação à tortura',
  $q$Julgue o item a seguir, com base na Lei nº 9.455/1997.
Constitui crime de tortura constranger alguém com emprego de violência ou grave ameaça, causando-lhe sofrimento físico ou mental, com o fim de obter informação, declaração ou confissão da vítima ou de terceira pessoa, sendo esse crime insuscetível de anistia, graça ou indulto, nos termos da Constituição Federal.$q$,
  'C',
  $q$Certo. O art. 1º, inciso I, alínea "a", da Lei nº 9.455/1997 define exatamente essa conduta como crime de tortura: constranger alguém, com violência ou grave ameaça, causando-lhe sofrimento físico ou mental, com o fim de obter informação, declaração ou confissão da vítima ou de terceiro. E o art. 5º, XLIII, da Constituição Federal classifica a tortura, ao lado do tráfico ilícito de drogas, do terrorismo e dos crimes hediondos, como crime insuscetível de graça ou anistia — vedação que a doutrina majoritária estende também ao indulto, dada a gravidade excepcional atribuída constitucionalmente a essas condutas.
Exemplo: mesmo em contextos de anistias amplas concedidas por lei para outros crimes, a tortura permanece fora do alcance desse tipo de perdão estatal, justamente pela gravidade que a Constituição atribuiu especificamente a ela e a poucos outros crimes.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.455/1997 – Crimes de Tortura','url','https://www.planalto.gov.br/ccivil_03/leis/l9455.htm'),jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-004',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Uso da força por agentes de segurança pública',
  $q$Julgue o item a seguir.
Os princípios internacionais sobre uso da força por agentes de segurança pública, como os Princípios Básicos da ONU sobre o Uso da Força e Armas de Fogo, orientam que o uso da força deve observar os critérios de legalidade, necessidade, proporcionalidade e moderação, priorizando meios não letais sempre que possível.$q$,
  'C',
  $q$Certo. Os Princípios Básicos sobre o Uso da Força e Armas de Fogo pelos Funcionários Responsáveis pela Aplicação da Lei, adotados pela ONU em 1990, estabelecem diretrizes orientadoras (soft law) para o uso da força por agentes de segurança em todo o mundo, incluindo a recomendação de que os agentes recorram, sempre que possível, a meios não violentos antes de utilizar a força, e que, quando o uso da força for inevitável, este deve ser exercido com moderação e proporcionalidade em relação à gravidade da infração e ao objetivo legítimo a ser alcançado — a força não deve exceder o estritamente necessário para conter a situação.
Exemplo: diante de uma pessoa desarmada resistindo passivamente a uma ordem, a orientação é buscar primeiro técnicas de contenção não letais e comunicação, reservando o uso de força mais intensa (e, em último caso, arma de fogo) apenas para situações que representem risco real e iminente à vida do agente ou de terceiros, e na medida estritamente necessária para neutralizar esse risco.$q$,
  jsonb_build_array(jsonb_build_object('title','Princípios Básicos da ONU sobre o Uso da Força e Armas de Fogo (1990)','url','https://www.ohchr.org/en/instruments-mechanisms/instruments/basic-principles-use-force-and-firearms-law-enforcement')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-005',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Estatuto do Refugiado',
  $q$Julgue o item a seguir, com base na Lei nº 9.474/1997.
Será reconhecido como refugiado todo indivíduo que, devido a fundados temores de perseguição por motivos de raça, religião, nacionalidade, grupo social ou opiniões políticas, encontre-se fora de seu país de nacionalidade e não possa ou não queira acolher-se à proteção desse país.$q$,
  'C',
  $q$Certo. O art. 1º, inciso I, da Lei nº 9.474/1997 (que implementa, no Brasil, a Convenção de 1951 relativa ao Estatuto dos Refugiados) define exatamente esses requisitos para o reconhecimento da condição de refugiado: fundado temor de perseguição por raça, religião, nacionalidade, pertencimento a determinado grupo social ou opiniões políticas, estar fora do país de origem e não poder ou não querer, por causa desse temor, voltar a se valer da proteção desse país. É importante notar que o simples desejo de melhores condições econômicas, por si só, não caracteriza refúgio — é necessário o elemento de perseguição fundada em um dos motivos taxativamente previstos na lei.
Exemplo: uma pessoa que foge de seu país porque é perseguida por sua religião, com risco real à sua integridade, pode se enquadrar no conceito de refugiado; já alguém que sai do país apenas em busca de um emprego melhor, sem essa perseguição específica, normalmente se enquadraria em outra categoria migratória, não na de refugiado.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.474/1997 – Estatuto dos Refugiados','url','https://www.planalto.gov.br/ccivil_03/leis/l9474.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-004',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Migração (Lei 13.445/2017)',
  $q$Julgue o item a seguir, com base na Lei nº 13.445/2017.
A Lei de Migração adota, entre seus princípios, a não criminalização da migração, o repúdio a práticas de expulsão ou de deportação coletivas, e a garantia do devido processo legal ao migrante, inclusive quanto ao direito de ser informado sobre seus direitos.$q$,
  'C',
  $q$Certo. O art. 3º da Lei nº 13.445/2017 (Lei de Migração) lista uma série de princípios que regem a política migratória brasileira, entre eles: a não criminalização da migração (inciso III); a não discriminação e o repúdio à xenofobia; a garantia do direito à reunião familiar; e, de forma relevante, a vedação a expulsões ou deportações coletivas (o que exige análise individualizada de cada caso, não decisões em bloco contra grupos de migrantes) e a garantia do devido processo legal, incluindo o direito à ampla defesa e ao contraditório em processos que possam levar à retirada compulsória do migrante do território nacional.
Exemplo: mesmo diante de um grande grupo de migrantes em situação irregular, a lei exige que cada caso seja analisado individualmente antes de qualquer medida de expulsão ou deportação — não é permitido simplesmente expulsar "o grupo inteiro" sem essa análise caso a caso e sem garantir a cada pessoa o direito de se defender.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.445/2017 – Lei de Migração','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm')),
  'média', now()
);
