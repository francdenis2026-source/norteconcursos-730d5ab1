-- Curated (authored) questions for Polícia Civil do Acre (edital 2017, base
-- para a campanha PCAC 2026), lote 02: 30 questões cobrindo as 9 disciplinas
-- do edital com subtemas inéditos. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-04',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Direitos sociais (art. 6º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São direitos sociais a educação, a saúde, a alimentação, o trabalho, a moradia, o transporte, o lazer, a segurança, a previdência social, a proteção à maternidade e à infância, e a assistência aos desamparados.$q$,
  'C',
  $q$Certo. O art. 6º da Constituição Federal, com a redação atual, enumera os direitos sociais, que impõem ao Estado prestações positivas voltadas à melhoria das condições de vida da população, distinguindo-se dos direitos individuais (de natureza predominantemente negativa, de abstenção estatal). Exemplo: a construção de moradias populares por programas habitacionais concretiza o direito social à moradia previsto nesse dispositivo.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 6º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-05',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Estado de defesa (art. 136, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O estado de defesa é decretado pelo Presidente da República, ouvidos o Conselho da República e o Conselho de Defesa Nacional, para preservar ou prontamente restabelecer, em locais restritos e determinados, a ordem pública ou a paz social ameaçadas por grave e iminente instabilidade institucional ou atingidas por calamidades de grandes proporções na natureza.$q$,
  'C',
  $q$Certo. O art. 136 da Constituição Federal disciplina o estado de defesa como medida excepcional de restrição de direitos em áreas específicas e por tempo determinado, exigindo a prévia oitiva de dois órgãos consultivos (Conselho da República e Conselho de Defesa Nacional) antes de sua decretação pelo Presidente da República, e devendo o ato ser submetido ao Congresso Nacional em até 24 horas. Exemplo: uma calamidade natural de grandes proporções em determinada região pode justificar a decretação do estado de defesa restrito àquela área.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 136','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-06',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Mandado de segurança (art. 5º, LXIX, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Conceder-se-á mandado de segurança para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública ou agente de pessoa jurídica no exercício de atribuições do Poder Público.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LXIX, da Constituição Federal prevê o mandado de segurança como remédio constitucional residual, cabível sempre que houver lesão ou ameaça a direito líquido e certo (comprovável de plano, sem dilação probatória) não protegido por habeas corpus (liberdade de locomoção) ou habeas data (acesso e retificação de dados pessoais), praticada por autoridade pública ou agente equiparado. Exemplo: um candidato que tem seu direito líquido e certo de participar de concurso público negado por ato ilegal da banca examinadora pode impetrar mandado de segurança.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LXIX','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-04',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Princípios expressos da Administração Pública (art. 37, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A administração pública direta e indireta de qualquer dos Poderes obedecerá aos princípios de legalidade, impessoalidade, moralidade, publicidade e eficiência.$q$,
  'C',
  $q$Certo. O art. 37, caput, da Constituição Federal elenca os cinco princípios expressos (conhecidos pelo mnemônico LIMPE) que regem toda a atuação administrativa, em qualquer esfera federativa ou Poder, servindo de parâmetro de validade e controle dos atos praticados pela Administração Pública. Exemplo: a divulgação de editais de concurso público em veículo oficial de comunicação concretiza o princípio da publicidade.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 37, caput','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-05',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Concurso público — investidura em cargo público (art. 37, II, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A investidura em cargo ou emprego público depende de aprovação prévia em concurso público de provas ou de provas e títulos, ressalvadas as nomeações para cargo em comissão declarado em lei de livre nomeação e exoneração.$q$,
  'C',
  $q$Certo. O art. 37, inciso II, da Constituição Federal consagra o concurso público como regra geral para a investidura em cargos e empregos públicos efetivos, garantindo a observância dos princípios da isonomia e da impessoalidade no acesso aos quadros da Administração, ressalvando apenas os cargos em comissão, destinados a atribuições de direção, chefia e assessoramento, de livre nomeação e exoneração. Exemplo: um secretário de estado pode ser nomeado diretamente pelo governador, sem concurso, por ocupar cargo em comissão de livre nomeação.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 37, II','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-06',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Consequências da improbidade administrativa (art. 37, § 4º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Os atos de improbidade administrativa importarão a suspensão dos direitos políticos, a perda da função pública, a indisponibilidade dos bens e o ressarcimento ao erário, na forma e gradação previstas em lei, sem prejuízo da ação penal cabível.$q$,
  'C',
  $q$Certo. O art. 37, § 4º, da Constituição Federal estabelece as sanções aplicáveis ao agente que pratica ato de improbidade administrativa, deixando à lei ordinária (atualmente a Lei nº 8.429/1992, com as alterações da Lei nº 14.230/2021) a definição da gradação dessas penalidades conforme a gravidade da conduta, sem prejuízo de eventual responsabilização penal pelo mesmo fato, quando também configurar crime. Exemplo: um gestor condenado por improbidade que causou dano ao erário pode ter seus bens tornados indisponíveis e perder a função pública, independentemente de eventual condenação criminal pelo mesmo fato.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 37, § 4º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-05',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Inimputabilidade por doença mental (art. 26, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
É isento de pena o agente que, por doença mental ou desenvolvimento mental incompleto ou retardado, era, ao tempo da ação ou omissão, inteiramente incapaz de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento.$q$,
  'C',
  $q$Certo. O art. 26, caput, do Código Penal trata da inimputabilidade por causa patológica, isentando de pena o agente que, no momento do fato, era inteiramente incapaz de compreender a ilicitude de sua conduta ou de se autodeterminar conforme esse entendimento, hipótese em que, verificada a periculosidade, aplica-se medida de segurança em vez de pena. Exemplo: um agente com transtorno mental grave que, comprovadamente, não compreendia a ilicitude do ato no momento do crime pode ser considerado inimputável e submetido a medida de segurança.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 26, caput','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-06',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Crime omissivo impróprio — posição de garantidor (art. 13, § 2º, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
A omissão é penalmente relevante quando o omitente devia e podia agir para evitar o resultado, nas hipóteses de dever legal de cuidado, de assunção da responsabilidade de impedir o resultado, ou de ter, com seu comportamento anterior, criado o risco da ocorrência do resultado.$q$,
  'C',
  $q$Certo. O art. 13, § 2º, do Código Penal estabelece as três hipóteses em que a omissão pode gerar responsabilidade penal por resultado que o agente tinha o dever jurídico de evitar (posição de garantidor): dever legal, assunção voluntária de cuidado, proteção ou vigilância, ou criação de risco por conduta anterior, permitindo, nesses casos, a responsabilização do omitente como se tivesse causado o resultado. Exemplo: um salva-vidas que, por dever legal e assunção da função, deixa de socorrer um banhista em perigo pode responder pelo resultado morte, ainda que não tenha praticado a conduta ativa que colocou a vítima em risco.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 13, § 2º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-07',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Roubo — distinção do furto (art. 157, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de roubo consiste em subtrair coisa móvel alheia, para si ou para outrem, mediante grave ameaça ou violência a pessoa, ou depois de havê-la, por qualquer meio, reduzido a vítima à impossibilidade de resistência, distinguindo-se do furto justamente pelo emprego de violência, grave ameaça ou outro meio que anule a capacidade de resistência da vítima.$q$,
  'C',
  $q$Certo. O art. 157 do Código Penal tipifica o roubo, crime complexo que reúne a subtração patrimonial (elemento comum ao furto) e o emprego de violência, grave ameaça ou outro meio de anulação da resistência da vítima, elemento que o diferencia do furto (art. 155), praticado sem violência ou grave ameaça contra a pessoa. Exemplo: subtrair um celular mediante ameaça de uma arma configura roubo; subtrair o mesmo celular sem que a vítima perceba configura furto.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 157','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-08',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Crime de dano — ação penal (art. 163, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de dano, consistente em destruir, inutilizar ou deteriorar coisa alheia, é, em regra, de ação penal privada, tornando-se de ação penal pública condicionada à representação nas hipóteses qualificadas previstas em lei, como o emprego de violência ou grave ameaça, ou a prática contra o patrimônio público.$q$,
  'C',
  $q$Certo. O art. 163 do Código Penal tipifica o crime de dano como, em regra, de ação penal privada (art. 167 do CP), cabendo à vítima promover a queixa-crime, mas o parágrafo único do próprio art. 163 prevê qualificadoras (violência ou grave ameaça, emprego de substância inflamável ou explosiva, contra patrimônio público, ou por motivo egoístico com prejuízo considerável) que tornam a ação pública condicionada à representação do ofendido. Exemplo: destruir um bem particular por mera implicância pessoal, sem qualificadoras, exige queixa-crime da vítima para a persecução penal.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, arts. 163 e 167','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-04',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Prisão preventiva — requisitos (art. 312, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A prisão preventiva poderá ser decretada como garantia da ordem pública, da ordem econômica, por conveniência da instrução criminal, ou para assegurar a aplicação da lei penal, quando houver prova da existência do crime e indício suficiente de autoria, além de perigo gerado pelo estado de liberdade do imputado.$q$,
  'C',
  $q$Certo. O art. 312 do Código de Processo Penal estabelece os fundamentos (fumus comissi delicti e periculum libertatis) e as hipóteses autorizadoras da prisão preventiva, exigindo, cumulativamente, prova da materialidade, indícios de autoria e a demonstração concreta de que a liberdade do investigado ou réu representa risco a um dos bens jurídicos tutelados pela medida. Exemplo: a prisão preventiva pode ser decretada quando há risco concreto de o investigado destruir provas ou intimidar testemunhas, o que compromete a conveniência da instrução criminal.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 312','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-05',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Inviolabilidade domiciliar (art. 5º, XI, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.$q$,
  'C',
  $q$Certo. O art. 5º, inciso XI, da Constituição Federal assegura a inviolabilidade domiciliar, permitindo o ingresso sem consentimento do morador apenas em situações excepcionais: flagrante delito, desastre, prestação de socorro (a qualquer hora do dia ou da noite, nessas três hipóteses) ou, especificamente durante o dia, por determinação judicial. Exemplo: uma equipe policial pode ingressar em uma residência, mesmo de madrugada e sem mandado judicial, se estiver em curso um crime em flagrante naquele local.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, XI','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-06',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Indiciamento — ato privativo do delegado de polícia (Lei 12.830/2013)',
  $q$Julgue o item a seguir, com base na Lei nº 12.830/2013.
O indiciamento é ato privativo do delegado de polícia, formalizado mediante análise técnico-jurídica do fato, que deverá indicar a autoria, a materialidade e suas circunstâncias, sendo vedada sua realização por outras autoridades no curso do inquérito policial.$q$,
  'C',
  $q$Certo. O art. 2º, § 6º, da Lei nº 12.830/2013 atribui exclusivamente ao delegado de polícia a competência para o indiciamento, exigindo ato fundamentado, com análise técnico-jurídica que aponte a autoria, a materialidade do fato investigado e as circunstâncias relevantes, reforçando a autonomia técnico-jurídica da autoridade policial na condução do inquérito. Exemplo: mesmo diante de pressão externa, apenas o delegado responsável pode formalizar o indiciamento de um suspeito, com base em análise fundamentada dos elementos colhidos na investigação.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.830/2013, art. 2º, § 6º','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12830.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-04',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Lei Maria da Penha — conceito de violência doméstica (art. 5º)',
  $q$Julgue o item a seguir, com base na Lei nº 11.340/2006 (Lei Maria da Penha).
Configura violência doméstica e familiar contra a mulher qualquer ação ou omissão baseada no gênero que lhe cause morte, lesão, sofrimento físico, sexual ou psicológico e dano moral ou patrimonial, no âmbito da unidade doméstica, da família, ou em qualquer relação íntima de afeto.$q$,
  'C',
  $q$Certo. O art. 5º da Lei nº 11.340/2006 traz conceito amplo de violência doméstica e familiar contra a mulher, abrangendo diferentes espécies de violência (física, sexual, psicológica, moral e patrimonial) e diferentes contextos relacionais (unidade doméstica, família ou relação íntima de afeto, mesmo sem coabitação), o que confere proteção ampla independentemente do vínculo formal entre agressor e vítima. Exemplo: a violência psicológica praticada por um ex-namorado, mesmo sem coabitação, pode se enquadrar na Lei Maria da Penha, por se tratar de relação íntima de afeto.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.340/2006, art. 5º','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-05',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'ECA — conceito de ato infracional (art. 103)',
  $q$Julgue o item a seguir, com base na Lei nº 8.069/1990 (Estatuto da Criança e do Adolescente).
Considera-se ato infracional a conduta descrita como crime ou contravenção penal quando praticada por criança ou adolescente, sujeitando-se apenas o adolescente, e não a criança, às medidas socioeducativas previstas no Estatuto.$q$,
  'C',
  $q$Certo. O art. 103 do Estatuto da Criança e do Adolescente define ato infracional como a conduta tipificada como crime ou contravenção penal quando praticada por menor de 18 anos; contudo, apenas o adolescente (entre 12 e 18 anos incompletos) está sujeito às medidas socioeducativas do art. 112, ao passo que a criança (até 12 anos incompletos) que pratica ato infracional recebe medidas de proteção, e não medidas socioeducativas. Exemplo: um adolescente de 15 anos que pratica ato equiparado a roubo pode receber medida socioeducativa de internação; uma criança de 10 anos que pratica o mesmo ato recebe apenas medidas de proteção.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.069/1990, arts. 103, 105 e 112','url','https://www.planalto.gov.br/ccivil_03/leis/l8069.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-06',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Lei de Tortura — modalidade de castigo pessoal (art. 1º, § 1º)',
  $q$Julgue o item a seguir, com base na Lei nº 9.455/1997.
Também configura o crime de tortura submeter alguém sob sua guarda, poder ou autoridade, com emprego de violência ou grave ameaça, a intenso sofrimento físico ou mental, como forma de aplicar castigo pessoal ou medida de caráter preventivo, ainda que sem a finalidade de obter informação, declaração ou confissão.$q$,
  'C',
  $q$Certo. O art. 1º, § 1º, da Lei nº 9.455/1997 prevê modalidade autônoma do crime de tortura, distinta da finalidade probatória do inciso I, caracterizada pelo emprego de violência ou grave ameaça contra pessoa sob guarda, poder ou autoridade do agente, com o intuito de aplicar castigo pessoal ou medida preventiva, independentemente de o agente buscar obter confissão ou informação da vítima. Exemplo: um agente que, tendo sob sua guarda uma pessoa detida, a submete a sofrimento físico intenso apenas para "corrigi-la" ou puni-la, comete tortura mesmo sem buscar qualquer confissão.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.455/1997, art. 1º, § 1º','url','https://www.planalto.gov.br/ccivil_03/leis/l9455.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-05',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Putrefação — fenômenos transformativos destrutivos',
  $q$Julgue o item a seguir, com base na tanatologia forense.
A putrefação é fase sucessiva à instalação dos fenômenos abióticos consecutivos, caracterizada pela ação de bactérias e enzimas que decompõem os tecidos, manifestando-se inicialmente pela mancha verde abdominal, seguida de gaseificação, coliquação e, por fim, esqueletização, cuja velocidade de instalação varia conforme fatores ambientais como temperatura e umidade.$q$,
  'C',
  $q$Certo. A putrefação é o principal fenômeno transformativo destrutivo do cadáver, resultante da ação de micro-organismos e enzimas sobre os tecidos, evoluindo em fases características (mancha verde abdominal, gaseificação, coliquação e esqueletização), cuja velocidade é fortemente influenciada por variáveis ambientais como temperatura, umidade e exposição a insetos, dados relevantes para a estimativa pericial do tempo de morte. Exemplo: em clima quente e úmido, como o do Acre, os fenômenos putrefativos tendem a se instalar e evoluir mais rapidamente do que em climas frios e secos.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Fenômenos Transformativos','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-06',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Asfixias mecânicas — enforcamento e estrangulamento',
  $q$Julgue o item a seguir, com base na medicina legal.
No enforcamento, a constrição do pescoço decorre do peso do próprio corpo suspenso por um laço fixado a um ponto de apoio, ao passo que, no estrangulamento, a constrição resulta da força muscular do agressor ou de mecanismo diverso do peso corporal da vítima, distinção relevante para a perícia diferenciar suicídio de homicídio.$q$,
  'C',
  $q$Certo. A medicina legal distingue o enforcamento (em que o peso do próprio corpo da vítima, suspensa por um laço, provoca a constrição cervical, compatível, em regra, com suicídio) do estrangulamento (em que a constrição decorre de força externa aplicada por terceiro, compatível com homicídio), sendo essa distinção fundamental na perícia de morte por asfixia mecânica para orientar a linha de investigação. Exemplo: sinais periciais de sulco cervical oblíquo e incompleto, compatível com suspensão do corpo, sugerem enforcamento; um sulco horizontal e completo, sem apoio de suspensão, sugere estrangulamento por terceiro.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Asfixiologia Forense','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-07',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Prova pericial de embriaguez ao volante (art. 306, CTB)',
  $q$Julgue o item a seguir, com base no Código de Trânsito Brasileiro (Lei 9.503/1997).
A comprovação da embriaguez ao volante pode ser feita mediante teste de alcoolemia, exame clínico, perícia, vídeo, prova testemunhal ou outros meios de prova em direito admitidos, não sendo o teste do etilômetro (bafômetro) o único meio de prova admitido para caracterizar o crime.$q$,
  'C',
  $q$Certo. O art. 306, § 2º, do Código de Trânsito Brasileiro, com a redação dada pela Lei nº 12.760/2012, ampliou os meios de prova admitidos para comprovar a embriaguez ao volante, permitindo, além do teste do etilômetro, outros meios como exame clínico, perícia, imagens e testemunhas, justamente para viabilizar a persecução penal nos casos em que o condutor se recusa a realizar o teste do bafômetro. Exemplo: mesmo que o condutor se recuse a soprar o bafômetro, sinais evidentes de embriaguez observados e relatados pelos policiais, somados a outras provas, podem fundamentar a caracterização do crime.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.503/1997 (CTB), art. 306, § 2º','url','https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-08',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Identificação humana — princípios da papiloscopia',
  $q$Julgue o item a seguir, com base na medicina legal e na papiloscopia.
A identificação datiloscópica fundamenta-se nos princípios da perenidade (as cristas papilares se formam ainda na vida intrauterina e permanecem inalteradas até a decomposição do corpo), da imutabilidade e da variabilidade individual, segundo o qual não existem duas pessoas com impressões digitais idênticas, nem mesmo gêmeos univitelinos.$q$,
  'C',
  $q$Certo. A papiloscopia (identificação por impressões digitais) baseia-se cientificamente nos princípios da perenidade (formação intrauterina e permanência das cristas papilares durante toda a vida, até a decomposição do cadáver), da imutabilidade (não se alteram naturalmente com o tempo) e da variabilidade ou unicidade (cada indivíduo possui um padrão papilar exclusivo, mesmo entre gêmeos idênticos), sustentando sua confiabilidade como método de identificação civil e criminal. Exemplo: mesmo gêmeos univitelinos, geneticamente idênticos, apresentam impressões digitais diferentes entre si, o que reforça a confiabilidade da papiloscopia para identificação individual.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Papiloscopia','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-05',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Coesão referencial — anáfora e catáfora',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A anáfora ocorre quando um termo retoma um elemento já mencionado anteriormente no texto, promovendo a continuidade referencial e evitando repetições desnecessárias, diferentemente da catáfora, que antecipa uma referência a ser explicitada posteriormente.$q$,
  'C',
  $q$Certo. Na coesão referencial, a anáfora é o mecanismo mais comum de retomada textual, em que um pronome ou expressão remete a um elemento já citado (referente anterior), enquanto a catáfora aponta para um elemento que ainda será mencionado no texto (referente posterior), ambas contribuindo para a articulação coesa das ideias sem repetições desnecessárias. Exemplo: em "O delegado chegou; ele assinou o auto de prisão", o pronome "ele" retoma anaforicamente "o delegado"; já em "Ele chegou: o delegado assinou o auto", o pronome "ele" catafórico antecipa "o delegado".$q$,
  jsonb_build_array(jsonb_build_object('title','Linguística textual — Coesão referencial','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-06',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Uso de "porque" e "por que"',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
"Por que" (separado, sem acento) é empregado, entre outros casos, em perguntas diretas ou indiretas e antes de substantivo oculto equivalente a "razão", enquanto "porque" (junto, sem acento) é empregado em respostas ou orações explicativas e causais.$q$,
  'C',
  $q$Certo. A norma-padrão distingue quatro formas do vocábulo: "por que" (pergunta direta/indireta, ou equivalente a "pelo qual"), "porque" (resposta, explicação ou causa), "por quê" (final de frase, tônico) e "porquê" (substantivo, precedido de artigo), sendo comum a confusão entre "por que" e "porque" em provas de concurso. Exemplo: "Por que o suspeito fugiu?" (pergunta direta) tem resposta "Ele fugiu porque estava sendo perseguido" (explicação causal).$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Porquês','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-07',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Uso do hífen com o prefixo "sub"',
  $q$Julgue o item a seguir, com base no Acordo Ortográfico da Língua Portuguesa vigente.
Emprega-se o hífen em palavras formadas com o prefixo "sub" quando o segundo elemento começa por "b" ou por "r", como em "sub-base" e "sub-região".$q$,
  'C',
  $q$Certo. O Acordo Ortográfico vigente determina o uso do hífen com o prefixo "sub" diante de palavras iniciadas por "b" (para evitar o encontro de duas letras "b", como em "sub-base") e por "r" (para preservar a pronúncia da consoante, como em "sub-região"), regra que segue o padrão geral de emprego do hífen com prefixos terminados em consoante diante de palavras iniciadas por consoante idêntica ou por "h", "r" e "s". Exemplo: escreve-se "sub-região" com hífen, mas "subsolo" sem hífen, pois o segundo elemento não começa por "b" ou "r".$q$,
  jsonb_build_array(jsonb_build_object('title','Acordo Ortográfico da Língua Portuguesa — Uso do hífen','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-08',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Figuras de linguagem — metonímia',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A metonímia consiste no emprego de uma palavra no lugar de outra com a qual mantém relação de contiguidade ou proximidade de sentido, como o uso da parte pelo todo, do autor pela obra, ou do continente pelo conteúdo, distinguindo-se da metáfora, que se baseia em relação de semelhança.$q$,
  'C',
  $q$Certo. A metonímia é figura de linguagem que substitui um termo por outro relacionado a ele por contiguidade lógica (causa/efeito, parte/todo, autor/obra, continente/conteúdo, entre outras relações), enquanto a metáfora se fundamenta em uma comparação implícita baseada em semelhança de características entre os elementos comparados. Exemplo: em "bebi dois copos", o termo "copos" está no lugar de "líquido contido nos copos" (continente pelo conteúdo), configurando metonímia, diferente de "seus olhos são duas estrelas", que é metáfora por semelhança.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Figuras de linguagem','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-04',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Validade de argumentos — silogismo categórico',
  $q$Julgue o item a seguir, com base na lógica proposicional.
Um argumento composto por duas premissas e uma conclusão é válido quando a conclusão decorre necessariamente da verdade das premissas, sendo essa validade uma propriedade da forma lógica do argumento, e não do conteúdo material ou da verdade factual das proposições envolvidas.$q$,
  'C',
  $q$Certo. Em lógica, a validade de um argumento é uma questão estrutural (formal): um argumento é válido quando, admitida a verdade de todas as premissas, a conclusão necessariamente também é verdadeira, independentemente de as premissas corresponderem ou não à realidade factual, distinguindo-se, assim, validade lógica de verdade material. Exemplo: o argumento "todo peixe voa; o tubarão é um peixe; logo, o tubarão voa" é logicamente válido em sua estrutura, ainda que a primeira premissa seja factualmente falsa.$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Validade de argumentos','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-05',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Princípio da não contradição',
  $q$Julgue o item a seguir, com base na lógica clássica.
Pelo princípio da não contradição, uma proposição e sua negação não podem ser simultaneamente verdadeiras, constituindo, ao lado dos princípios da identidade e do terceiro excluído, um dos princípios fundamentais da lógica clássica.$q$,
  'C',
  $q$Certo. O princípio da não contradição é um dos pilares da lógica clássica, ao lado do princípio da identidade (uma proposição verdadeira é sempre verdadeira em relação a si mesma) e do princípio do terceiro excluído (uma proposição só pode ser verdadeira ou falsa, não havendo uma terceira possibilidade), estabelecendo que é impossível que uma proposição P e sua negação ¬P sejam ambas verdadeiras ao mesmo tempo. Exemplo: as afirmações "o suspeito estava no local do crime" e "o suspeito não estava no local do crime" não podem ser ambas verdadeiras simultaneamente.$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica clássica — Princípios fundamentais','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-06',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Sequências lógicas numéricas — identificação de padrões',
  $q$Julgue o item a seguir, com base em raciocínio lógico-matemático.
Em uma sequência lógica numérica, a identificação do padrão de formação entre termos consecutivos, seja por razão aritmética, razão geométrica ou regra mais complexa, permite determinar os próximos elementos da sequência.$q$,
  'C',
  $q$Certo. A resolução de questões de sequências lógicas numéricas depende da identificação do critério que relaciona os termos consecutivos, podendo esse critério envolver uma progressão aritmética (soma de uma razão constante), uma progressão geométrica (multiplicação por uma razão constante) ou padrões mais elaborados (alternância, combinação de operações, entre outros), a partir dos quais se torna possível prever os termos seguintes. Exemplo: na sequência 2, 4, 8, 16, o padrão é a multiplicação por 2 a cada termo (progressão geométrica de razão 2), permitindo prever que o próximo termo é 32.$q$,
  jsonb_build_array(jsonb_build_object('title','Raciocínio lógico-matemático — Sequências numéricas','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-04',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Criptografia simétrica e assimétrica',
  $q$Julgue o item a seguir, com base em noções de informática.
Na criptografia simétrica, a mesma chave é utilizada tanto para cifrar quanto para decifrar a informação, exigindo compartilhamento seguro entre as partes, ao passo que, na criptografia assimétrica, utiliza-se um par de chaves distintas, uma pública e outra privada, sendo que o que uma cifra somente a outra pode decifrar.$q$,
  'C',
  $q$Certo. A criptografia simétrica utiliza uma única chave compartilhada entre remetente e destinatário para cifrar e decifrar mensagens, o que exige um canal seguro para a troca inicial dessa chave, enquanto a criptografia assimétrica emprega um par de chaves matematicamente relacionadas (pública e privada), permitindo que a chave pública seja livremente divulgada, já que apenas a chave privada correspondente consegue decifrar o que foi cifrado com ela. Exemplo: um sistema de e-mail seguro pode usar a chave pública do destinatário para cifrar a mensagem, garantindo que apenas ele, com sua chave privada, consiga lê-la.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Criptografia','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-05',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Correio eletrônico — campos CC e CCO',
  $q$Julgue o item a seguir, com base em noções de informática.
No envio de uma mensagem de correio eletrônico, os destinatários incluídos no campo "CC" (com cópia) são visíveis a todos os demais destinatários, ao passo que os incluídos no campo "CCO" (com cópia oculta) não têm seu endereço revelado aos demais destinatários da mensagem.$q$,
  'C',
  $q$Certo. Nos programas de correio eletrônico, o campo "CC" (com cópia) exibe os endereços de todos os destinatários incluídos nesse campo a todos os demais que receberam a mensagem, enquanto o campo "CCO" (com cópia oculta) mantém o sigilo do endereço dos destinatários nele incluídos, que não são revelados nem aos destinatários principais nem aos demais destinatários em cópia oculta. Exemplo: ao enviar um comunicado interno com vários destinatários em CCO, cada um recebe a mensagem sem saber quem mais a recebeu por esse campo.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Correio eletrônico','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-06',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Armazenamento em nuvem (cloud computing)',
  $q$Julgue o item a seguir, com base em noções de informática.
O armazenamento em nuvem permite que arquivos sejam salvos em servidores remotos, acessíveis pela internet a partir de diferentes dispositivos, sem que seja necessário manter uma cópia local no dispositivo do usuário, embora, por segurança e disponibilidade offline, seja recomendável manter cópias de segurança adicionais.$q$,
  'C',
  $q$Certo. O armazenamento em nuvem (cloud storage) desloca a guarda dos arquivos para servidores remotos gerenciados por provedores especializados, permitindo o acesso a partir de múltiplos dispositivos conectados à internet, sem depender de armazenamento físico local, mas isso não elimina a recomendação de boas práticas de segurança, como a manutenção de cópias de segurança adicionais, dada a possibilidade de indisponibilidade temporária do serviço ou de falhas de conexão. Exemplo: um documento salvo em um serviço de nuvem pode ser acessado tanto do computador do trabalho quanto do celular pessoal, desde que haja conexão com a internet.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Computação em nuvem','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
);
