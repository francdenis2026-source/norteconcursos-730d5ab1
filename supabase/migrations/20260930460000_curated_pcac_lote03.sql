-- Curated (authored) questions for Polícia Civil do Acre (edital 2017, base
-- para a campanha PCAC 2026), lote 03: 30 questões cobrindo as 9 disciplinas
-- do edital com subtemas inéditos. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-07',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Extradição (art. 5º, LI, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Nenhum brasileiro será extraditado, salvo o naturalizado, em caso de crime comum, praticado antes da naturalização, ou de comprovado envolvimento em tráfico ilícito de entorpecentes e drogas afins, na forma da lei.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LI, da Constituição Federal veda a extradição do brasileiro nato em qualquer hipótese, permitindo, excepcionalmente, a do brasileiro naturalizado em duas situações: crime comum praticado antes da naturalização, ou comprovado envolvimento em tráfico ilícito de entorpecentes, independentemente do momento em que o crime foi praticado. Exemplo: um brasileiro naturalizado que praticou crime comum em outro país antes de obter a nacionalidade brasileira pode, em tese, ser extraditado para responder por esse fato.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LI','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-08',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Vedação à tortura e a tratamento desumano (art. 5º, III, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Ninguém será submetido a tortura nem a tratamento desumano ou degradante.$q$,
  'C',
  $q$Certo. O art. 5º, inciso III, da Constituição Federal consagra a vedação absoluta à tortura e a tratamentos desumanos ou degradantes, tratando-se de direito fundamental sem exceções, refletindo a proteção constitucional à integridade física e moral da pessoa humana, inclusive daquela submetida a prisão ou investigação. Exemplo: qualquer forma de agressão física ou psicológica utilizada para obter confissão de um preso viola esse dispositivo constitucional, independentemente da gravidade do crime investigado.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, III','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-09',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Princípio da presunção de inocência (art. 5º, LVII, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LVII, da Constituição Federal consagra o princípio da presunção de inocência (ou não culpabilidade), segundo o qual o acusado deve ser tratado como inocente durante todo o processo, até que sobrevenha decisão condenatória definitiva, da qual não caiba mais recurso, o que impacta diretamente questões como a distribuição do ônus da prova e a excepcionalidade das prisões cautelares. Exemplo: um investigado, ainda que denunciado pelo Ministério Público, não pode ser tratado publicamente como culpado antes do trânsito em julgado de eventual condenação.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LVII','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-07',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Atos vinculados e atos discricionários',
  $q$Julgue o item a seguir, com base na doutrina de direito administrativo.
Atos vinculados são aqueles em que a lei estabelece todos os requisitos e condições de sua realização, sem margem de escolha para o administrador, enquanto os atos discricionários permitem juízo de conveniência e oportunidade dentro dos limites legais.$q$,
  'C',
  $q$Certo. A distinção entre atos vinculados e discricionários é central na teoria dos atos administrativos: nos primeiros, a lei não deixa espaço de valoração subjetiva, cabendo ao administrador apenas verificar o preenchimento dos requisitos legais para praticar o ato; nos segundos, a lei confere margem de liberdade para que o administrador escolha, entre opções igualmente válidas, a que melhor atenda ao interesse público, sempre dentro dos limites da legalidade. Exemplo: a concessão de aposentadoria por tempo de contribuição, uma vez preenchidos os requisitos legais, é ato vinculado; já a decisão sobre remover ou não um servidor por interesse do serviço, dentro dos limites legais, é ato discricionário.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Direito Administrativo — Atos vinculados e discricionários','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-08',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Bens públicos — classificação quanto à destinação',
  $q$Julgue o item a seguir, com base na doutrina de direito administrativo.
Bens de uso comum do povo são os destinados ao uso indiscriminado da coletividade, como ruas e praças; bens de uso especial são os afetados à prestação de serviço público, como prédios de repartições; e bens dominicais constituem o patrimônio disponível do Estado, sem destinação pública específica.$q$,
  'C',
  $q$Certo. O Código Civil e a doutrina administrativista classificam os bens públicos, quanto à destinação, em bens de uso comum do povo (utilização geral e indiscriminada, como praças e vias públicas), bens de uso especial (afetados a uma finalidade pública específica, como prédios de órgãos públicos) e bens dominicais (integram o patrimônio disponível do Estado, sem afetação a uma finalidade pública, podendo ser alienados observadas as formalidades legais). Exemplo: um terreno público sem uso definido, que poderia ser alienado pelo Estado mediante licitação, é classificado como bem dominical.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Civil, arts. 99-101','url','https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-09',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Cláusulas exorbitantes dos contratos administrativos',
  $q$Julgue o item a seguir, com base na Lei nº 14.133/2021.
São cláusulas exorbitantes dos contratos administrativos, entre outras, a possibilidade de alteração e rescisão unilateral pela Administração, a fiscalização da execução contratual, a aplicação de sanções e a ocupação provisória de bens, prerrogativas que não encontram equivalente nos contratos regidos exclusivamente pelo direito privado.$q$,
  'C',
  $q$Certo. As cláusulas exorbitantes representam prerrogativas especiais conferidas à Administração Pública nos contratos administrativos, justificadas pela supremacia do interesse público, permitindo à Administração alterar unilateralmente o contrato (respeitados os limites legais), rescindi-lo unilateralmente em determinadas hipóteses, fiscalizar sua execução, aplicar sanções ao contratado e, em casos de serviços essenciais, ocupar provisoriamente bens do contratado. Exemplo: em um contrato de prestação de serviço essencial, a Administração pode, em caso de rescisão por inadimplemento do contratado, ocupar provisoriamente os equipamentos utilizados na prestação do serviço, para garantir sua continuidade.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021, art. 104','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-09',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Erro de tipo (art. 20, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
O erro sobre elemento constitutivo do tipo legal de crime exclui o dolo, mas permite a punição por crime culposo, se previsto em lei.$q$,
  'C',
  $q$Certo. O art. 20, caput, do Código Penal disciplina o erro de tipo, situação em que o agente desconhece ou tem falsa percepção acerca de um elemento essencial do tipo penal, o que afasta o dolo (pois o agente não tinha consciência e vontade de praticar o fato típico tal como ele realmente ocorreu), mas não afasta eventual punição a título de culpa, se essa modalidade estiver prevista para o crime em questão e o erro decorrer de falta de cuidado do agente. Exemplo: um caçador que, por engano razoável, atira contra um vulto que confunde com um animal e acaba atingindo uma pessoa pode ser isento de dolo, mas responder por homicídio culposo, se demonstrada a falta de cautela.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 20, caput','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-10',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Estado de necessidade (art. 24, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Considera-se em estado de necessidade quem pratica o fato para salvar de perigo atual, que não provocou por sua vontade, nem podia de outro modo evitar, direito próprio ou alheio, cujo sacrifício, nas circunstâncias, não era razoável exigir-se.$q$,
  'C',
  $q$Certo. O art. 24 do Código Penal define o estado de necessidade como causa excludente de ilicitude, exigindo perigo atual não provocado voluntariamente pelo agente, inevitabilidade do sacrifício de outro bem jurídico e razoabilidade da conduta diante da ponderação entre os interesses em conflito. Exemplo: um motorista que, para evitar atropelar um pedestre que surge repentinamente na via, desvia o veículo e danifica um muro alheio pode ser amparado pelo estado de necessidade, desde que não houvesse outra forma razoável de evitar o dano.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 24','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-11',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Concurso de agentes — coautoria e participação (art. 29, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Quem, de qualquer modo, concorre para o crime incide nas penas a este cominadas, na medida de sua culpabilidade, podendo o juiz reduzir a pena do participante de menor importância.$q$,
  'C',
  $q$Certo. O art. 29, caput e § 1º, do Código Penal adota a teoria monista temperada no concurso de agentes, segundo a qual todos que contribuem para o crime respondem pelo mesmo tipo penal, mas na medida de sua culpabilidade individual, permitindo a redução de pena para o partícipe de menor importância na execução do fato, o que evita tratamento idêntico entre condutas de gravidade distinta dentro do mesmo evento criminoso. Exemplo: quem apenas fornece informações de menor relevância para a prática de um roubo, sem participar da execução, pode ter sua pena reduzida em relação aos executores diretos do crime.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 29','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-12',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Crimes contra a honra — calúnia, difamação e injúria',
  $q$Julgue o item a seguir, com base no Código Penal.
Calúnia consiste em imputar falsamente a alguém fato definido como crime; difamação consiste em imputar a alguém fato ofensivo à sua reputação; e injúria consiste em ofender a dignidade ou o decoro de alguém, sem imputação de fato específico.$q$,
  'C',
  $q$Certo. Os arts. 138 a 140 do Código Penal tipificam os três crimes contra a honra, distinguindo-os pelo conteúdo da ofensa: a calúnia exige a imputação falsa de fato criminoso, a difamação exige a imputação de fato (verdadeiro ou não) que ofenda a reputação da vítima perante terceiros, e a injúria dispensa a imputação de fato específico, bastando a ofensa direta à dignidade ou ao decoro da pessoa. Exemplo: dizer publicamente que alguém "roubou dinheiro da empresa" (fato criminoso falso) configura calúnia; chamar alguém de "incompetente" sem imputar fato específico configura injúria.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, arts. 138-140','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-07',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Citação por edital (arts. 361-364, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A citação será feita por edital quando o réu não for encontrado, contendo o nome do acusado, a designação da infração penal e o local em que deve comparecer, começando a correr o prazo processual a partir do efetivo comparecimento do réu ou da constituição de defensor.$q$,
  'C',
  $q$Certo. Os arts. 361 e seguintes do Código de Processo Penal disciplinam a citação por edital, modalidade excepcional utilizada quando o réu não é localizado por outros meios, e o art. 366 do CPP determina que, não comparecendo o réu citado por edital nem constituindo advogado, o processo e o curso do prazo prescricional ficam suspensos até que ele compareça ou constitua defensor, evitando processo à revelia sem conhecimento efetivo da acusação. Exemplo: se um réu citado por edital não comparece nem constitui defensor, o processo fica suspenso, sem produção antecipada de provas urgentes, até que ele apareça ou nomeie advogado.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, arts. 361 e 366','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-08',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Audiência de custódia',
  $q$Julgue o item a seguir, com base no Código de Processo Penal e na Resolução nº 213/2015 do CNJ.
Toda pessoa presa em flagrante deve ser apresentada, no prazo de até vinte e quatro horas, à autoridade judicial, para que esta avalie a legalidade e a necessidade da prisão, podendo relaxá-la, convertê-la em prisão preventiva ou conceder liberdade provisória.$q$,
  'C',
  $q$Certo. A audiência de custódia, prevista no art. 310 do Código de Processo Penal e regulamentada pela Resolução nº 213/2015 do CNJ, assegura que toda pessoa presa em flagrante seja apresentada pessoalmente a um juiz em até 24 horas, permitindo o controle judicial imediato sobre a legalidade da prisão, a verificação de eventuais maus-tratos e a decisão sobre a manutenção da prisão, sua conversão em preventiva, ou a concessão de liberdade, com ou sem medidas cautelares diversas. Exemplo: um suspeito preso em flagrante à noite deve ser apresentado a um juiz em audiência de custódia dentro das 24 horas seguintes, para que a prisão seja submetida a controle judicial imediato.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 310; Resolução CNJ nº 213/2015','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-09',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Cadeia de custódia da prova (arts. 158-A a 158-F, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A cadeia de custódia consiste no conjunto de procedimentos destinados a manter e documentar a história cronológica do vestígio coletado em locais de crime, permitindo rastrear sua posse e manuseio desde o reconhecimento até o eventual descarte.$q$,
  'C',
  $q$Certo. Os arts. 158-A a 158-F do Código de Processo Penal, incluídos pela Lei nº 13.964/2019 (Pacote Anticrime), disciplinam a cadeia de custódia como mecanismo de garantia da idoneidade e da rastreabilidade da prova material, exigindo o registro documentado de cada etapa pela qual passa o vestígio (reconhecimento, coleta, acondicionamento, transporte, análise, armazenamento e descarte), a fim de assegurar sua integridade probatória. Exemplo: uma arma apreendida em um local de crime deve ter todo o seu trajeto documentado, desde a coleta pela perícia até seu armazenamento, para que sua idoneidade como prova não seja questionada em juízo.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, arts. 158-A a 158-F','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-07',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Lei do SUSP — Sistema Único de Segurança Pública (Lei 13.675/2018)',
  $q$Julgue o item a seguir, com base na Lei nº 13.675/2018.
A Lei do Sistema Único de Segurança Pública institui a Política Nacional de Segurança Pública e Defesa Social e cria o Sistema Único de Segurança Pública, com o objetivo de preservar a ordem pública e a incolumidade das pessoas e do patrimônio por meio de atuação conjunta, coordenada, sistêmica e integrada dos órgãos de segurança pública.$q$,
  'C',
  $q$Certo. A Lei nº 13.675/2018 estabelece a estrutura normativa do SUSP, buscando integrar a atuação dos diversos órgãos de segurança pública (federais, estaduais e municipais) por meio de diretrizes e objetivos comuns, planejamento estratégico e cooperação federativa, superando a atuação fragmentada e isolada de cada instituição na promoção da segurança pública. Exemplo: a integração de bancos de dados entre a Polícia Civil de um estado e a Polícia Federal, para compartilhamento de informações sobre organizações criminosas, é uma das finalidades do sistema de cooperação instituído pela lei.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.675/2018, arts. 1º-2º','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13675.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-08',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Lei de Execução Penal — trabalho do preso (art. 28)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
O trabalho do condenado, como dever social e condição de dignidade humana, terá finalidade educativa e produtiva, não estando, entretanto, sua remuneração submetida às regras da Consolidação das Leis do Trabalho.$q$,
  'C',
  $q$Certo. O art. 28 da Lei de Execução Penal reconhece o trabalho prisional como dever social do condenado e instrumento de ressocialização, com finalidade educativa e produtiva, mas o § 2º do mesmo artigo expressamente afasta a aplicação do regime celetista, tratando-se de relação jurídica de natureza especial, sujeita a regras próprias da execução penal, e não a um vínculo empregatício comum. Exemplo: o preso que trabalha dentro do sistema prisional recebe remuneração e pode ter parte de sua pena remida, mas não possui os mesmos direitos trabalhistas de um empregado regido pela CLT, como férias remuneradas nos moldes celetistas.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 28','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-09',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Estatuto do Idoso — prioridade absoluta (Lei 10.741/2003)',
  $q$Julgue o item a seguir, com base na Lei nº 10.741/2003 (Estatuto do Idoso).
É obrigação da família, da comunidade, da sociedade e do Poder Público assegurar ao idoso, com absoluta prioridade, a efetivação dos direitos referentes à vida, à saúde, à liberdade, entre outros direitos fundamentais.$q$,
  'C',
  $q$Certo. O art. 3º do Estatuto do Idoso estabelece o princípio da prioridade absoluta na garantia dos direitos fundamentais da pessoa idosa, atribuindo responsabilidade compartilhada entre família, comunidade, sociedade e Estado, em paralelo à proteção conferida a crianças e adolescentes, reconhecendo a vulnerabilidade etária como fator que justifica tratamento prioritário. Exemplo: em filas de atendimento público, o idoso tem prioridade de atendimento em relação às demais pessoas, em concretização desse princípio de prioridade absoluta.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 10.741/2003, art. 3º','url','https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-09',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Lesões por instrumento perfurocortante e contundente',
  $q$Julgue o item a seguir, com base na traumatologia forense.
Instrumentos perfurocortantes produzem lesões com bordas regulares e nítidas, geralmente com profundidade maior que a extensão superficial, enquanto instrumentos contundentes produzem lesões com bordas irregulares e equimóticas, resultantes de impacto sem penetração cortante.$q$,
  'C',
  $q$Certo. A traumatologia forense classifica os instrumentos causadores de lesões conforme o mecanismo de ação: os perfurocortantes (como facas) combinam penetração e corte, produzindo lesões profundas de bordas regulares, enquanto os contundentes (como bastões) atuam por impacto e compressão, gerando lesões de bordas irregulares, com equimoses e escoriações associadas, sem o corte característico dos instrumentos afiados. Exemplo: uma facada produz lesão com bordas nítidas e profundidade acentuada, enquanto uma pancada com um objeto rombudo produz lesão contusa, com hematoma e bordas irregulares.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Traumatologia Forense','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-10',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Morte real e morte aparente',
  $q$Julgue o item a seguir, com base na tanatologia forense.
Os sinais de morte real, representados pelos fenômenos cadavéricos abióticos e transformativos, diferenciam-se da morte aparente, situação clínica em que as funções vitais estão extremamente reduzidas, mas ainda presentes, podendo simular o óbito e exigindo cautela pericial para não confundir os dois estados.$q$,
  'C',
  $q$Certo. A distinção entre morte real (cessação definitiva e irreversível das funções vitais, comprovada pelos fenômenos cadavéricos) e morte aparente (estado de profunda depressão das funções vitais, ainda presentes embora quase imperceptíveis, como em certos afogamentos, intoxicações ou estados de choque) é fundamental na medicina legal, para evitar erros graves de diagnóstico de óbito. Exemplo: em situações de hipotermia extrema, uma vítima pode apresentar sinais vitais tão reduzidos que simule a morte, sendo necessária avaliação médica cuidadosa antes de se declarar o óbito.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Tanatologia Forense','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-11',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Preservação do local de crime (art. 6º, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Logo que tiver conhecimento da prática da infração penal, a autoridade policial deverá dirigir-se ao local, providenciando para que não se alterem o estado e a conservação das coisas, até a chegada dos peritos criminais.$q$,
  'C',
  $q$Certo. O art. 6º, inciso I, do Código de Processo Penal impõe à autoridade policial o dever de preservar o local de crime, evitando alterações que comprometam a integridade dos vestígios até a chegada da perícia técnica, medida essencial para a correta elucidação do fato e para a validade da cadeia de custódia da prova material. Exemplo: ao chegar primeiro a uma cena de crime, um policial deve isolar a área e evitar que curiosos ou até mesmo outros agentes toquem em objetos, preservando o local até a atuação da equipe pericial.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 6º, I','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-12',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Necropsia — finalidade pericial',
  $q$Julgue o item a seguir, com base na medicina legal.
A necropsia é procedimento pericial realizado no cadáver com o objetivo de determinar a causa da morte, o mecanismo e as circunstâncias que a envolveram, sendo essencial para a elucidação de mortes violentas ou suspeitas.$q$,
  'C',
  $q$Certo. A necropsia (ou autópsia médico-legal) é exame pericial minucioso do cadáver, envolvendo exame externo e interno, que busca estabelecer a causa mortis, o mecanismo que a produziu e as circunstâncias correlatas, fornecendo elementos técnicos indispensáveis para a investigação de mortes violentas, suspeitas ou de causa não esclarecida. Exemplo: em um caso de morte súbita sem testemunhas, a necropsia pode revelar se houve causa natural, acidental, suicida ou homicida, orientando o rumo da investigação policial.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Necropsia','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-09',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Funções da linguagem — referencial e emotiva',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A função referencial (ou denotativa) da linguagem centra-se no contexto ou referente, predominando em textos informativos e objetivos, enquanto a função emotiva (ou expressiva) centra-se no emissor, predominando em textos que exprimem sentimentos e opiniões pessoais.$q$,
  'C',
  $q$Certo. A teoria das funções da linguagem de Roman Jakobson identifica seis funções conforme o elemento da comunicação enfatizado: a função referencial prioriza o contexto/referente e é típica de textos informativos e científicos, enquanto a função emotiva enfatiza o emissor e é característica de textos que exprimem estados de ânimo, opiniões e sentimentos pessoais. Exemplo: um relatório policial objetivo, focado nos fatos, exemplifica a função referencial; um desabafo pessoal em um diário exemplifica a função emotiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Linguística — Funções da linguagem','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-10',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Orações subordinadas adverbiais causal e concessiva',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A oração subordinada adverbial causal expressa a causa ou o motivo do fato expresso na oração principal, enquanto a concessiva expressa um fato que, apesar de contrariar a ideia da oração principal, não impede sua realização.$q$,
  'C',
  $q$Certo. As orações subordinadas adverbiais causais (introduzidas, por exemplo, por "porque", "já que", "uma vez que") indicam o motivo do fato relatado na oração principal, ao passo que as concessivas (introduzidas, por exemplo, por "embora", "ainda que", "apesar de") introduzem uma ideia contrária que, no entanto, não impede a realização do fato principal, revelando uma relação de contraste sem anular a ação. Exemplo: "Ele foi preso porque cometeu o crime" (causal); "Embora tivesse álibi, ele foi preso" (concessiva).$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Orações subordinadas adverbiais','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-11',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Voz passiva sintética',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Na voz passiva sintética, o sujeito paciente aparece após o verbo na terceira pessoa, acompanhado da partícula apassivadora "se", como em "vendem-se casas", construção equivalente à voz passiva analítica "casas são vendidas".$q$,
  'C',
  $q$Certo. A voz passiva sintética (ou pronominal) é formada por verbo transitivo direto na terceira pessoa acompanhado do pronome apassivador "se", com o sujeito paciente posposto ao verbo, sendo construção equivalente, em sentido, à voz passiva analítica formada com o verbo "ser" mais particípio; a concordância verbal, nessa estrutura, deve seguir o número do sujeito paciente. Exemplo: "Alugam-se apartamentos" (voz passiva sintética, verbo no plural concordando com "apartamentos") equivale a "Apartamentos são alugados" (voz passiva analítica).$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Vozes verbais','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-12',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Uso de "mal" e "mau"',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
"Mal" é advérbio (antônimo de "bem") ou substantivo (quando precedido de artigo, sinônimo de doença ou dano), enquanto "mau" é adjetivo (antônimo de "bom"), concordando em gênero e número com o substantivo a que se refere.$q$,
  'C',
  $q$Certo. A distinção entre "mal" e "mau" é frequente em provas de concurso: "mal" funciona como advérbio de modo (oposto de "bem", como em "ele se comportou mal") ou como substantivo masculino (como em "o mal da sociedade"), sendo invariável nesses usos; já "mau" é adjetivo, opondo-se a "bom", e concorda em gênero e número com o substantivo qualificado, como em "um mau policial" e "más notícias". Exemplo: "O aluno se saiu mal na prova" (advérbio) versus "Ele é um mau aluno" (adjetivo).$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Parônimos "mal" e "mau"','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-07',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Negação de proposições universais',
  $q$Julgue o item a seguir, com base na lógica proposicional.
A negação da proposição universal "todo A é B" é "existe pelo menos um A que não é B", e não "nenhum A é B".$q$,
  'C',
  $q$Certo. Em lógica, a negação de uma proposição universal afirmativa ("todo A é B") não é a proposição universal negativa ("nenhum A é B"), mas sim a proposição particular negativa ("existe pelo menos um A que não é B"), bastando um único contraexemplo para tornar falsa a afirmação universal original. Exemplo: a negação de "todos os policiais civis do Acre usam farda" é "existe pelo menos um policial civil do Acre que não usa farda", e não "nenhum policial civil do Acre usa farda".$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Negação de quantificadores','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-08',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Relação de inclusão entre conjuntos',
  $q$Julgue o item a seguir, com base na teoria dos conjuntos.
Se todo elemento do conjunto A pertence também ao conjunto B, diz-se que A está contido em B (A é subconjunto de B), o que pode ser representado por um diagrama de Venn em que o círculo de A está totalmente dentro do círculo de B.$q$,
  'C',
  $q$Certo. A relação de inclusão (ou continência) entre conjuntos, representada por A ⊂ B, ocorre quando todo elemento de A também pertence a B, podendo A e B serem iguais (inclusão não estrita) ou A ser um subconjunto próprio de B (inclusão estrita), sendo essa relação frequentemente ilustrada em diagramas de Venn, nos quais o círculo do conjunto menor fica integralmente dentro do círculo do conjunto maior. Exemplo: o conjunto dos policiais civis do Acre está contido no conjunto dos servidores públicos do Acre, pois todo policial civil é servidor público, mas nem todo servidor público é policial civil.$q$,
  jsonb_build_array(jsonb_build_object('title','Teoria dos conjuntos — Relação de inclusão','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-09',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Proposições simples e proposições compostas',
  $q$Julgue o item a seguir, com base na lógica proposicional.
Proposição simples é aquela que não contém nenhum outro conectivo lógico e não pode ser decomposta em proposições menores, enquanto a proposição composta é formada pela combinação de duas ou mais proposições simples por meio de conectivos lógicos, como "e", "ou", "se...então" e "se e somente se".$q$,
  'C',
  $q$Certo. Na lógica proposicional, as proposições simples (ou atômicas) constituem a unidade básica de análise, não podendo ser subdivididas em outras proposições, enquanto as proposições compostas (ou moleculares) resultam da combinação de duas ou mais proposições simples por meio de conectivos lógicos (conjunção "e", disjunção "ou", condicional "se...então" e bicondicional "se e somente se"), cujo valor lógico depende do valor das proposições componentes e da tabela-verdade do conectivo utilizado. Exemplo: "o suspeito confessou" é proposição simples; "o suspeito confessou e a prova foi encontrada" é proposição composta, unida pelo conectivo "e".$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Proposições simples e compostas','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-07',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Firewall — função de segurança',
  $q$Julgue o item a seguir, com base em noções de informática.
O firewall é dispositivo de segurança, em hardware ou software, que monitora e controla o tráfego de rede de entrada e saída com base em regras de segurança predefinidas, atuando como barreira entre uma rede interna confiável e redes externas não confiáveis, como a internet.$q$,
  'C',
  $q$Certo. O firewall funciona como um filtro de tráfego de rede, aplicando regras predefinidas para permitir ou bloquear conexões e pacotes de dados, com o objetivo de proteger a rede interna de acessos não autorizados, ataques externos e tráfego malicioso originado tanto de fora quanto de dentro da rede protegida. Exemplo: um firewall corporativo pode ser configurado para bloquear todo o tráfego de entrada proveniente de um endereço IP identificado como fonte de tentativas de invasão.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Segurança de redes','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-08',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Atalhos de teclado — desfazer e refazer ações',
  $q$Julgue o item a seguir, com base em noções de informática.
No Windows e em diversos aplicativos, o atalho Ctrl+Z desfaz a última ação realizada, enquanto o atalho Ctrl+Y (ou, em alguns programas, Ctrl+Shift+Z) refaz a ação que havia sido desfeita anteriormente.$q$,
  'C',
  $q$Certo. Os atalhos de teclado Ctrl+Z (desfazer) e Ctrl+Y (refazer) são padrões amplamente adotados em sistemas operacionais e aplicativos de escritório, permitindo reverter uma ação indesejada ou, em seguida, reaplicar essa mesma ação caso o usuário reconsidere sua decisão de desfazer. Exemplo: ao excluir acidentalmente um parágrafo em um documento de texto, o usuário pode pressionar Ctrl+Z para restaurá-lo; se, em seguida, decidir que a exclusão era desejada, pode usar Ctrl+Y para refazer a exclusão.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Atalhos de teclado','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-09',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Formato de arquivo PDF',
  $q$Julgue o item a seguir, com base em noções de informática.
O formato PDF (Portable Document Format) foi desenvolvido para preservar a formatação original de um documento independentemente do software, do hardware ou do sistema operacional utilizado para visualizá-lo, sendo amplamente utilizado para a distribuição de documentos oficiais.$q$,
  'C',
  $q$Certo. O PDF é um formato de arquivo criado justamente para garantir a portabilidade e a fidelidade visual de documentos, preservando fontes, imagens e layout independentemente da plataforma utilizada para abri-lo, característica que o torna adequado para a distribuição de editais, laudos periciais e demais documentos oficiais que exigem uniformidade de apresentação. Exemplo: um edital de concurso público disponibilizado em PDF será exibido da mesma forma em um computador com Windows, em um Mac ou em um smartphone com Android.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Formatos de arquivo','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
);
