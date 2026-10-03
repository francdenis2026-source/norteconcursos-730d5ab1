-- Curated (authored) questions for Polícia Federal — Delegado de Polícia
-- Federal (2025): 30 questões baseadas nos itens REAIS já importados em
-- official_exam_questions (mesmo texto e gabarito oficial do caderno,
-- CEBRASPE), com explicação pedagógica escrita para cada um. Cobre Direito
-- Constitucional, Processual Penal, Administrativo, Ambiental e Penal.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'aff2b5d2-ead4-4031-a13b-3372e9631b1b', 'pfdel25-const-01',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'ADI por omissão — cautelar sem prévia audiência (Lei 9.868/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.868/1999.
Na ADI por omissão, pode o STF, excepcionalmente, em caso de urgência e relevância da matéria, conceder medida cautelar sem a prévia audiência dos órgãos ou das autoridades responsáveis pela omissão inconstitucional.$q$,
  'C',
  $q$Certo. O art. 12-F, § 1º, da Lei nº 9.868/1999 (incluído pela Lei nº 12.063/2009) autoriza o STF a conceder medida cautelar na ação direta de inconstitucionalidade por omissão, por decisão da maioria absoluta de seus membros, podendo fazê-lo excepcionalmente sem a audiência prévia dos órgãos ou autoridades responsáveis pela omissão, quando presentes urgência e relevância da matéria, hipótese que busca evitar dano irreparável enquanto se aguarda a manifestação regular dos órgãos envolvidos. Exemplo: diante de uma omissão legislativa extremamente urgente que ameace direito fundamental, o STF pode conceder cautelar de imediato, adiando a oitiva do órgão omisso para momento posterior.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.868/1999, art. 12-F, § 1º','url','https://www.planalto.gov.br/ccivil_03/leis/l9868.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'aff2b5d2-ead4-4031-a13b-3372e9631b1b', 'pfdel25-const-02',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Liberdade de imprensa e responsabilização por imputação falsa de crime',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988 e na jurisprudência do STF.
Considere que uma empresa jornalística tenha publicado entrevista na qual o entrevistado tenha imputado falsamente a prática de crime a terceiro, mesmo havendo, à época da divulgação da informação, indícios concretos da falsidade da imputação, de modo que não fora observado o dever de cuidado da veracidade dos fatos. Nessa situação, em razão da proteção constitucional à liberdade de imprensa, a empresa jornalística que publicou a entrevista não será responsabilizada.$q$,
  'E',
  $q$Errado. A liberdade de imprensa, embora constitucionalmente protegida, não é absoluta nem afasta a responsabilização civil e penal quando a empresa jornalística deixa de observar o dever de cuidado com a veracidade das informações divulgadas, sobretudo quando já existiam, no momento da publicação, indícios concretos da falsidade da imputação; a liberdade de expressão não serve de escudo para a difusão consciente ou negligente de informações falsas que lesem a honra de terceiros. Exemplo: um veículo de imprensa que publica, sem qualquer verificação, uma acusação grave contra alguém, ignorando sinais evidentes de que a informação é falsa, pode ser responsabilizado civil e penalmente, não sendo protegido pela liberdade de imprensa nessa hipótese.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, IV, V, IX e X; jurisprudência do STF','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'aff2b5d2-ead4-4031-a13b-3372e9631b1b', 'pfdel25-const-03',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Vedação a medida provisória sobre cidadania (art. 62, § 1º, I, "a", CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É possível a edição de medida provisória que trate de matérias relacionadas a cidadania e a direito civil, tributário, urbanístico e financeiro.$q$,
  'E',
  $q$Errado. O art. 62, § 1º, inciso I, alínea "a", da Constituição Federal veda expressamente a edição de medida provisória sobre matéria relativa a nacionalidade, cidadania, direitos políticos, partidos políticos e direito eleitoral, de modo que a inclusão de "cidadania" entre as matérias passíveis de disciplina por medida provisória, como afirma o item, contraria diretamente essa vedação constitucional expressa. Exemplo: uma medida provisória não pode alterar regras sobre naturalização ou perda de cidadania, ainda que trate, ao mesmo tempo, de outras matérias que isoladamente poderiam ser objeto de MP, como certos aspectos financeiros.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 62, § 1º, I, "a"','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'aff2b5d2-ead4-4031-a13b-3372e9631b1b', 'pfdel25-const-04',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Objetivo da ordem social (art. 193, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A ordem social tem como fundamentos o trabalho e a justiça social e, como objetivos, o bem-estar e a distribuição de renda.$q$,
  'E',
  $q$Errado. O art. 193 da Constituição Federal estabelece que a ordem social tem como base o primado do trabalho, e como objetivo o bem-estar e a JUSTIÇA SOCIAL, e não "o bem-estar e a distribuição de renda" como afirma incorretamente o item, substituindo indevidamente a expressão constitucional "justiça social" por "distribuição de renda", conceitos relacionados mas não idênticos no texto constitucional. Exemplo: ao interpretar políticas de ordem social previstas na Constituição, deve-se ter em mente que o objetivo expresso é a justiça social como um todo, e não apenas a distribuição de renda em sentido estrito.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 193','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'aff2b5d2-ead4-4031-a13b-3372e9631b1b', 'pfdel25-const-05',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Concepção jurídica x concepção política de Constituição',
  $q$Julgue o item a seguir, com base na teoria constitucional.
Segundo a concepção política, a Constituição é um complexo normativo estabelecido de uma só vez, em que, de maneira total, exaustiva e sistemática, são estabelecidas as funções fundamentais do Estado e regulados os órgãos, o âmbito de suas competências e as relações entre eles.$q$,
  'E',
  $q$Errado. A descrição apresentada no item corresponde à concepção jurídica (ou normativa) de Constituição, e não à concepção política, defendida sobretudo por Carl Schmitt, para quem a Constituição é, em essência, uma decisão política fundamental do titular do poder constituinte sobre a forma e o modo de existência da unidade política, e não um sistema normativo exaustivo e completo como descrito no item. Exemplo: para a concepção política, o essencial da Constituição está nas decisões políticas fundamentais (como a forma de governo e de Estado), enquanto a concepção jurídica enfatiza o aspecto normativo-sistemático completo do texto constitucional.$q$,
  jsonb_build_array(jsonb_build_object('title','Teoria constitucional — Concepções de Constituição (Carl Schmitt)','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'aff2b5d2-ead4-4031-a13b-3372e9631b1b', 'pfdel25-const-06',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Mandado de segurança individual — inadequação para interesses coletivos',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Não cabe mandado de segurança individual para a proteção de interesses coletivos ou a defesa da ordem jurídica de forma abstrata.$q$,
  'C',
  $q$Certo. O mandado de segurança individual, previsto no art. 5º, LXIX, da Constituição Federal, destina-se à proteção de direito líquido e certo de titularidade do próprio impetrante, não sendo instrumento adequado para a tutela de interesses coletivos (para os quais existe o mandado de segurança coletivo, art. 5º, LXX) nem para a defesa abstrata da ordem jurídica, função que se aproxima do controle de constitucionalidade e de outras ações específicas. Exemplo: um cidadão não pode impetrar mandado de segurança individual alegando, de forma abstrata, que determinada lei viola a ordem jurídica em geral, sem demonstrar lesão a direito líquido e certo próprio.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LXIX e LXX','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'aff2b5d2-ead4-4031-a13b-3372e9631b1b', 'pfdel25-const-07',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Concessão de asilo político como princípio das relações internacionais (art. 4º, X, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A concessão de asilo político constitui princípio que rege as relações internacionais da República Federativa do Brasil.$q$,
  'C',
  $q$Certo. O art. 4º, inciso X, da Constituição Federal elenca a concessão de asilo político entre os princípios que regem as relações internacionais do Brasil, ao lado de outros princípios como a independência nacional, a prevalência dos direitos humanos, a autodeterminação dos povos e a defesa da paz, refletindo o compromisso do Estado brasileiro com a proteção de pessoas perseguidas por motivos políticos. Exemplo: o Brasil pode conceder asilo político a um cidadão estrangeiro perseguido em seu país de origem por suas convicções políticas, em concretização direta desse princípio constitucional.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 4º, X','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'c9fff08b-ba0d-43da-9412-6b3d354dd8b8', 'pfdel25-proc-01',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Instauração de inquérito policial com base em relatório do COAF',
  $q$Julgue o item a seguir, com base na jurisprudência dos tribunais superiores.
A instauração do inquérito policial, por iniciativa da autoridade policial, com base no relatório de inteligência financeira do COAF é nula, por ausência de notitia criminis formal.$q$,
  'E',
  $q$Errado. Os tribunais superiores reconhecem que o relatório de inteligência financeira produzido pelo COAF (Conselho de Controle de Atividades Financeiras) constitui notitia criminis idônea e suficiente para fundamentar a instauração de inquérito policial, tratando-se de instrumento legítimo de comunicação de indícios de ilícitos financeiros às autoridades competentes, e não de mera informação inábil a deflagrar a investigação. Exemplo: identificado, por meio de relatório do COAF, um padrão de movimentação financeira atípica compatível com lavagem de dinheiro, a autoridade policial pode legitimamente instaurar inquérito com base nessa comunicação, sem necessidade de outra notitia criminis formal adicional.$q$,
  jsonb_build_array(jsonb_build_object('title','Jurisprudência do STF e do STJ sobre relatórios do COAF','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'c9fff08b-ba0d-43da-9412-6b3d354dd8b8', 'pfdel25-proc-02',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Acesso do advogado a elementos já documentados no inquérito (Súmula Vinculante 14)',
  $q$Julgue o item a seguir, com base na Súmula Vinculante nº 14 do STF.
Eventual advogado do investigado terá acesso apenas aos documentos do inquérito policial em que haja prévia autorização judicial ou que digam respeito diretamente à defesa.$q$,
  'E',
  $q$Errado. A Súmula Vinculante nº 14 do STF assegura ao defensor, no interesse do representado, o direito de amplo acesso aos elementos de prova que, já documentados em procedimento investigatório, digam respeito ao exercício do direito de defesa, sem exigir autorização judicial específica para esse acesso; a restrição legítima recai apenas sobre diligências em andamento ainda não documentadas nos autos, cujo sigilo momentâneo pode ser necessário à eficácia da investigação. Exemplo: um advogado pode requerer e obter acesso a depoimentos e laudos já juntados ao inquérito, independentemente de autorização judicial específica para tanto, com base direta nessa súmula vinculante.$q$,
  jsonb_build_array(jsonb_build_object('title','Súmula Vinculante nº 14 do STF','url','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp')),
  'média', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'c9fff08b-ba0d-43da-9412-6b3d354dd8b8', 'pfdel25-proc-03',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Competência do STJ para dirimir conflito entre juízo estadual e federal (art. 105, I, "d", CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Conflito de competência entre um juiz estadual e um juiz federal deve ser resolvido pelo tribunal regional federal ao qual estiver vinculado o juiz federal.$q$,
  'E',
  $q$Errado. O art. 105, inciso I, alínea "d", da Constituição Federal atribui ao Superior Tribunal de Justiça, e não ao Tribunal Regional Federal, a competência para processar e julgar conflitos de competência entre juízos vinculados a Justiças distintas (como um juízo estadual e um juízo federal), reservando-se aos TRFs a resolução de conflitos apenas entre juízes federais a eles vinculados. Exemplo: se um juiz estadual e um juiz federal divergem sobre qual deles é competente para julgar determinado caso, cabe ao STJ, e não a um TRF, dirimir esse conflito.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 105, I, "d"','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'c9fff08b-ba0d-43da-9412-6b3d354dd8b8', 'pfdel25-proc-04',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Competência do STJ para conflito entre juízes federais de TRFs distintos',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Compete ao STF dirimir conflito de competência entre juízes federais vinculados a tribunais regionais federais distintos.$q$,
  'E',
  $q$Errado. Também nesse caso, a competência para dirimir o conflito é do Superior Tribunal de Justiça, com base no art. 105, inciso I, alínea "d", da Constituição Federal, e não do Supremo Tribunal Federal, que possui competências constitucionais distintas, relacionadas sobretudo ao controle de constitucionalidade e a hipóteses expressamente previstas de sua competência originária e recursal. Exemplo: um conflito de competência entre um juiz federal vinculado ao TRF da 1ª Região e outro vinculado ao TRF da 3ª Região deve ser resolvido pelo STJ, e não pelo STF.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 105, I, "d"','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'c9fff08b-ba0d-43da-9412-6b3d354dd8b8', 'pfdel25-proc-05',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Vedação à inversão do ônus da prova contra o réu',
  $q$Julgue o item a seguir, com base nos princípios do processo penal.
Em matéria penal, admite-se a inversão do ônus da prova contra o réu quando houver indícios consistentes de autoria e materialidade colhidos durante o inquérito policial.$q$,
  'E',
  $q$Errado. O ônus de provar a existência do crime e sua autoria recai, em regra, sobre a acusação, em decorrência do princípio da presunção de inocência (art. 5º, LVII, da Constituição Federal), não sendo admissível, no processo penal, a inversão desse ônus em desfavor do réu, ainda que existam indícios consistentes colhidos na fase investigativa, os quais, por si só, não dispensam a acusação de comprovar os fatos em juízo, sob o crivo do contraditório. Exemplo: mesmo que o inquérito policial reúna fortes indícios contra o investigado, cabe ao Ministério Público, e não ao réu, demonstrar em juízo a autoria e a materialidade do crime imputado.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LVII','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'c9fff08b-ba0d-43da-9412-6b3d354dd8b8', 'pfdel25-proc-06',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Direito de acompanhamento dos defensores no interrogatório de corréus',
  $q$Julgue o item a seguir, com base no princípio da ampla defesa.
Na fase do interrogatório, a defesa de corréus não pode acompanhar o ato referente aos demais acusados, salvo se houver prova de prejuízo concreto.$q$,
  'E',
  $q$Errado. Em regra, a defesa técnica de cada corréu deve poder acompanhar o interrogatório dos demais acusados no mesmo processo, como decorrência do princípio da ampla defesa e do contraditório, não se exigindo, para tanto, a prévia demonstração de prejuízo concreto; a exclusão indevida dos defensores desse acompanhamento é que pode, ao contrário, configurar cerceamento de defesa apto a gerar nulidade. Exemplo: em um processo com múltiplos réus, o advogado de um deles tem, em regra, o direito de acompanhar o interrogatório dos demais corréus, e não o contrário, como estabelece equivocadamente o item.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LV; Código de Processo Penal','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'c9fff08b-ba0d-43da-9412-6b3d354dd8b8', 'pfdel25-proc-07',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Vedação à valoração negativa do exercício parcial do direito ao silêncio',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
O interrogatório, como meio de defesa, assegura ao acusado a prerrogativa de responder a todas as perguntas, a nenhuma delas ou a apenas algumas delas, mas o exercício parcial do direito ao silêncio pode ser valorado negativamente pelo juiz em sua decisão, desde que ele o faça de forma motivada.$q$,
  'E',
  $q$Errado. Embora o acusado possa, de fato, optar por responder a todas, nenhuma ou apenas algumas das perguntas formuladas em seu interrogatório, o exercício do direito ao silêncio — total ou parcial — não pode, em nenhuma hipótese, ser valorado em prejuízo do réu, nos termos do art. 186, parágrafo único, do Código de Processo Penal, ainda que a decisão judicial seja motivada, pois se trata de garantia fundamental que não admite esse tipo de consequência processual negativa. Exemplo: se o réu decide responder apenas a algumas perguntas e permanecer em silêncio quanto às demais, o juiz não pode usar esse silêncio parcial como fundamento para reforçar uma condenação.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 186, parágrafo único','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '5554ba99-721b-49c0-a696-bf42e229034f', 'pfdel25-adm-01',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Anulação e revogação de licitações (Súmula 473, STF)',
  $q$Julgue o item a seguir, com base na Súmula nº 473 do STF.
Nas licitações, a administração pública deve anular, de ofício ou mediante provocação de terceiros, os próprios atos que contenham vício de legalidade, podendo revogar o procedimento licitatório por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos.$q$,
  'C',
  $q$Certo. A Súmula nº 473 do STF, aplicável também ao procedimento licitatório, reconhece o poder-dever da Administração de anular seus próprios atos eivados de ilegalidade, de ofício ou por provocação de terceiros, bem como a possibilidade de revogá-los por razões de conveniência e oportunidade, sempre respeitados os direitos adquiridos e ressalvada, em qualquer caso, a apreciação judicial. Exemplo: identificado vício de legalidade em um edital já publicado, a Administração deve anulá-lo, mesmo sem provocação externa, para restabelecer a legalidade do certame.$q$,
  jsonb_build_array(jsonb_build_object('title','Súmula nº 473 do STF','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '5554ba99-721b-49c0-a696-bf42e229034f', 'pfdel25-adm-02',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Improbidade — classificação correta do ato com prejuízo patrimonial efetivo',
  $q$Julgue o item a seguir, com base na Lei nº 8.429/1992.
Constitui ato de improbidade administrativa que atenta contra os princípios da administração pública a dispensa indevida de processo licitatório com consequente perda patrimonial efetiva.$q$,
  'E',
  $q$Errado. Quando a dispensa indevida de licitação resulta em efetiva perda patrimonial para o erário, a conduta se enquadra na categoria de ato de improbidade que causa prejuízo ao erário (art. 10 da Lei nº 8.429/1992), e não na categoria mais branda de ato que atenta apenas contra os princípios da administração pública (art. 11), reservada a condutas que, embora irregulares, não geram, necessariamente, dano patrimonial comprovado. Exemplo: se a dispensa indevida de licitação não causa qualquer prejuízo financeiro comprovado, pode configurar apenas ato que atenta contra os princípios; havendo prejuízo patrimonial efetivo e comprovado, a classificação correta é a de ato que causa dano ao erário.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.429/1992, arts. 10-11','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '5554ba99-721b-49c0-a696-bf42e229034f', 'pfdel25-adm-03',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Improbidade — erro grosseiro não configura ato ímprobo após a reforma de 2021',
  $q$Julgue o item a seguir, com base na Lei nº 8.429/1992, com a redação dada pela Lei nº 14.230/2021.
Consideram-se atos de improbidade administrativa as condutas dos agentes públicos eivadas de erros grosseiros.$q$,
  'E',
  $q$Errado. Após a reforma promovida pela Lei nº 14.230/2021, a Lei de Improbidade Administrativa passou a exigir a comprovação de dolo específico para a configuração de qualquer modalidade de ato ímprobo, tendo o art. 28 da lei reformada expressamente afastado a responsabilização por mera culpa, imperícia, negligência ou erro grosseiro, que, isoladamente, não caracterizam improbidade administrativa. Exemplo: um agente público que, por erro grosseiro mas sem intenção dolosa, toma uma decisão administrativa equivocada que gera algum prejuízo não responde, isoladamente por esse fato, por ato de improbidade administrativa após a reforma de 2021.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.429/1992, art. 28, com redação da Lei nº 14.230/2021','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '5554ba99-721b-49c0-a696-bf42e229034f', 'pfdel25-adm-04',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Frustração do caráter concorrencial da licitação (art. 11, § 1º, III, Lei 8.429/1992)',
  $q$Julgue o item a seguir, com base na Lei nº 8.429/1992.
A conduta de frustrar, em ofensa à imparcialidade, o caráter concorrencial de procedimento licitatório, com vistas à obtenção de benefício de terceiros, constitui ato de improbidade administrativa que atenta contra os princípios da administração pública.$q$,
  'C',
  $q$Certo. O art. 11, § 1º, inciso III, da Lei nº 8.429/1992, incluído pela reforma de 2021, tipifica especificamente como ato de improbidade que atenta contra os princípios da administração pública a conduta de frustrar a licitude e o caráter concorrencial de procedimento licitatório com o fim de obter benefício próprio ou de terceiros, hipótese que reforça a proteção à isonomia e à competitividade que devem orientar os certames licitatórios. Exemplo: um agente público que direciona indevidamente um edital para favorecer determinada empresa, restringindo artificialmente a concorrência, pratica esse ato de improbidade.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.429/1992, art. 11, § 1º, III','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm')),
  'média', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '5554ba99-721b-49c0-a696-bf42e229034f', 'pfdel25-adm-05',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Improbidade — exigência exclusiva de dolo (art. 1º, § 1º, Lei 8.429/1992)',
  $q$Julgue o item a seguir, com base na Lei nº 8.429/1992, com a redação dada pela Lei nº 14.230/2021.
A prática de ato de improbidade administrativa, por ação ou omissão, requer a demonstração de culpa ou dolo por parte do agente público.$q$,
  'E',
  $q$Errado. Após a reforma de 2021, a Lei de Improbidade Administrativa passou a exigir exclusivamente o dolo (específico) do agente para a configuração de qualquer ato de improbidade, tenha ele sido praticado por ação ou por omissão, afastando definitivamente a possibilidade de responsabilização a título de culpa, que anteriormente era admitida para os atos que causavam prejuízo ao erário. Exemplo: um agente que, por mera negligência (culpa), sem qualquer intenção deliberada, causa prejuízo ao erário não pratica, isoladamente por esse fato, ato de improbidade administrativa segundo a redação atual da lei.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.429/1992, art. 1º, § 1º, com redação da Lei nº 14.230/2021','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '5554ba99-721b-49c0-a696-bf42e229034f', 'pfdel25-adm-06',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Presunção de legitimidade e imperatividade do ato administrativo',
  $q$Julgue o item a seguir, com base na doutrina de direito administrativo.
Em decorrência dos atributos da presunção de legitimidade e da imperatividade, o ato administrativo cria obrigações aos administrados desde a sua expedição, produzindo normalmente os seus efeitos, até que — se for o caso — seja anulado pela própria administração pública, de ofício ou por provocação, ou pelo Poder Judiciário.$q$,
  'C',
  $q$Certo. Os atributos da presunção de legitimidade (presume-se, até prova em contrário, que o ato foi praticado em conformidade com a lei) e da imperatividade (o ato impõe obrigações unilateralmente aos administrados, independentemente de sua concordância) conferem ao ato administrativo eficácia imediata desde sua expedição, produzindo efeitos normalmente até que venha a ser anulado, seja pela própria Administração (autotutela), seja pelo Poder Judiciário, quando provocado. Exemplo: uma multa de trânsito aplicada por autoridade competente produz efeitos e deve ser cumprida desde sua notificação, ainda que o infrator discorde dela, até que seja eventualmente anulada em recurso administrativo ou ação judicial.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Direito Administrativo — Atributos do ato administrativo','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'e1b23f05-60eb-437e-8be7-3225a437cfcb', 'pfdel25-amb-01',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Ambiental', 'Incorporação empresarial e sucessão de responsabilidade penal (art. 54, Lei 9.605/1998)',
  $q$Julgue o item a seguir, com base na Lei nº 9.605/1998 e na jurisprudência do STJ.
Considere que a empresa fabricante de solventes XRT tenha sido denunciada pela prática do delito de poluição previsto no art. 54 da Lei nº 9.605/1998 e que, no curso da ação penal, tenha ocorrido a sua incorporação legítima e regular pela empresa ABC Química. Nessa situação, consoante entendimento do STJ, eventual sanção penal atingirá a empresa incorporadora.$q$,
  'E',
  $q$Errado. O STJ entende que a incorporação empresarial legítima e regular não transfere a responsabilidade penal da empresa incorporada para a incorporadora, em razão do princípio da pessoalidade da pena (que impede que a sanção penal ultrapasse a pessoa do condenado), ainda que a Lei nº 9.605/1998 preveja a responsabilização penal de pessoas jurídicas; a sucessão empresarial pode gerar consequências civis e administrativas, mas não penais, à empresa sucessora. Exemplo: mesmo que a empresa incorporadora assuma todo o patrimônio e as obrigações civis da incorporada, ela não pode ser condenada criminalmente por um crime ambiental cometido antes da incorporação pela empresa que deixou de existir.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.605/1998, art. 3º; jurisprudência do STJ','url','https://www.planalto.gov.br/ccivil_03/leis/l9605.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'e1b23f05-60eb-437e-8be7-3225a437cfcb', 'pfdel25-amb-02',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Ambiental', 'Crimes de acumulação na Lei de Crimes Ambientais',
  $q$Julgue o item a seguir, com base na Lei nº 9.605/1998 e na doutrina ambiental.
Diversos delitos previstos na Lei nº 9.605/1998 são classificados como crimes de acumulação, ou seja, crimes em que a lesividade da conduta individual é diminuta, todavia, quando há a demonstração de que o comportamento é repetido por um grande número de pessoas em um mesmo contexto de risco, a soma dessas ações permite a constatação de uma lesividade relevante; assim, projetando-se uma proteção ao bem jurídico para o longo prazo, pune-se a conduta individual.$q$,
  'C',
  $q$Certo. A categoria doutrinária dos "crimes de acumulação" (Kumulationsdelikte), aplicável a diversos tipos penais ambientais, justifica a punição de condutas individuais de lesividade aparentemente ínfima considerando o efeito cumulativo que essas condutas, se generalizadas e repetidas por múltiplos agentes, produziriam sobre o bem jurídico ambiental a longo prazo, fundamentando, assim, a tutela penal antecipada mesmo diante de danos individuais pouco expressivos. Exemplo: o descarte irregular de pequena quantidade de resíduos por um único indivíduo pode parecer pouco lesivo isoladamente, mas a repetição dessa conduta por milhares de pessoas produz dano ambiental cumulativo relevante, justificando a criminalização da conduta individual.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'e1b23f05-60eb-437e-8be7-3225a437cfcb', 'pfdel25-amb-03',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Ambiental', 'Princípio da responsabilidade ambiental intergeracional (art. 225, caput, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A CF consagra o princípio da responsabilidade ambiental entre as gerações, impondo às gerações presentes o dever de defender e preservar o meio ambiente ecologicamente equilibrado para si e para as gerações vindouras.$q$,
  'C',
  $q$Certo. O art. 225, caput, da Constituição Federal assegura a todos o direito ao meio ambiente ecologicamente equilibrado, impondo ao Poder Público e à coletividade o dever de defendê-lo e preservá-lo não apenas para a presente geração, mas também para as gerações futuras, consagrando expressamente o princípio da equidade (ou responsabilidade) intergeracional como fundamento do direito ambiental brasileiro. Exemplo: políticas de preservação de recursos naturais não renováveis, mesmo quando restringem seu uso imediato, concretizam esse compromisso constitucional com as gerações futuras.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 225, caput','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', 'e1b23f05-60eb-437e-8be7-3225a437cfcb', 'pfdel25-amb-04',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Ambiental', 'Destinação de instrumentos apreendidos em infração ambiental',
  $q$Julgue o item a seguir, com base na Lei nº 9.605/1998.
A Lei de Crimes Ambientais determina que os instrumentos utilizados na prática de infração ambiental sejam doados a instituições científicas e educacionais.$q$,
  'E',
  $q$Errado. A Lei nº 9.605/1998 não estabelece a doação automática a instituições científicas e educacionais como destinação obrigatória e exclusiva dos instrumentos utilizados na prática de infrações ambientais, prevendo, a depender do caso, outras destinações possíveis, como a venda em leilão, a incorporação ao patrimônio público de órgãos ambientais, ou mesmo a destruição, conforme a natureza do bem e a avaliação da autoridade competente. Exemplo: equipamentos apreendidos por uso irregular em extração mineral podem, conforme o caso, ser leiloados ou incorporados a órgãos de fiscalização ambiental, não havendo determinação legal de doação automática e exclusiva a instituições de ensino ou pesquisa.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.605/1998','url','https://www.planalto.gov.br/ccivil_03/leis/l9605.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '6e5ff84a-476a-454c-87bc-e7255fac3d60', 'pfdel25-penal-01',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crítica ao expansionismo penal a partir de bens jurídicos constitucionais',
  $q$Julgue o item a seguir, com base na doutrina penal.
Modernamente, defende-se que os bens jurídicos penais emanam da Constituição, de modo que todos os interesses ou valores constitucionalmente contemplados exigem proteção penal, ainda que essa tutela represente uma forma de paternalismo rígido e direto.$q$,
  'E',
  $q$Errado. Embora seja consolidado o entendimento de que os bens jurídicos penalmente relevantes devem guardar relação com valores constitucionalmente reconhecidos, a doutrina moderna critica justamente o expansionismo penal decorrente da ideia de que todo e qualquer interesse constitucional exigiria, automaticamente, tutela penal, rejeitando o chamado paternalismo penal rígido e direto, e defendendo, ao contrário, a intervenção penal como ultima ratio, reservada às lesões mais graves a bens jurídicos relevantes. Exemplo: o fato de a Constituição proteger determinado valor social não significa, por si só, que toda violação a esse valor deva ser criminalizada, sob pena de banalização e expansão excessiva do direito penal.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '6e5ff84a-476a-454c-87bc-e7255fac3d60', 'pfdel25-penal-02',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Ofensas relacionadas à deficiência e crime de injúria (jurisprudência do STF)',
  $q$Julgue o item a seguir, com base na jurisprudência do STF e no Código Penal.
Consoante jurisprudência do STF, o ato de dirigir a uma pessoa com deficiência ofensas vagas atreladas à deficiência com a qual ela convive constitui o crime de injúria tipificado no Código Penal e viola o bem jurídico da honra subjetiva.$q$,
  'C',
  $q$Certo. Segundo entendimento do STF, ofensas vagas e genéricas dirigidas a uma pessoa com deficiência, associadas à sua condição, configuram, em regra, o crime de injúria (art. 140 do Código Penal), que tutela a honra subjetiva (a autoestima, o sentimento de dignidade da vítima), distinguindo-se de outras condutas mais específicas relacionadas à discriminação, que podem configurar tipos penais próprios quando presentes elementos adicionais. Exemplo: xingar uma pessoa com deficiência com termos pejorativos genéricos relacionados à sua condição, sem imputação de fato específico, tipicamente configura injúria, ofendendo sua honra subjetiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 140; jurisprudência do STF','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '6e5ff84a-476a-454c-87bc-e7255fac3d60', 'pfdel25-penal-03',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Denunciação caluniosa — exigência de dolo direto (art. 339, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
No crime de denunciação caluniosa, é necessária, segundo a doutrina, a caracterização de dolo direto no que concerne ao fato imputado, pois o autor deve conhecer a inocência da pessoa a quem atribui sua prática; contudo, é possível o reconhecimento de culpa no tocante ao comportamento imprudente caracterizado como dar causa à instauração de inquérito policial, de procedimento investigatório criminal, de processo judicial, de processo administrativo disciplinar, de inquérito civil ou de ação de improbidade administrativa contra alguém.$q$,
  'E',
  $q$Errado. O crime de denunciação caluniosa (art. 339 do Código Penal) exige, em todos os seus elementos, dolo direto do agente, que deve ter ciência da inocência da pessoa a quem imputa falsamente a prática de infração, não existindo modalidade culposa para esse delito; a afirmação de que seria possível reconhecer culpa quanto ao comportamento de dar causa à instauração dos procedimentos mencionados contraria a natureza exclusivamente dolosa do tipo penal. Exemplo: quem, por engano de boa-fé (sem saber que a pessoa é inocente), atribui a alguém a prática de um crime, não comete denunciação caluniosa, por ausência do dolo direto exigido pelo tipo penal, e não porque a conduta seria punida a título de culpa.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 339','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '6e5ff84a-476a-454c-87bc-e7255fac3d60', 'pfdel25-penal-04',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Imitatio veri na falsificação de documento público (art. 297, CP)',
  $q$Julgue o item a seguir, com base no Código Penal e na doutrina penal.
No crime de falsificação de documento público, na situação em que o documento seja fabricado pelo sujeito ativo, exige-se como requisito para a configuração do delito a imitatio veri, sem a qual a conduta não terá aptidão para lesionar a fé pública.$q$,
  'C',
  $q$Certo. A doutrina penal exige, para a configuração do crime de falsificação de documento (art. 297 do Código Penal) na modalidade de fabricação integral do documento falso, a presença da imitatio veri, isto é, a imitação da verdade com aptidão mínima para enganar terceiros, sem a qual a conduta não teria potencial lesivo à fé pública, tratando-se, na ausência dessa aptidão, de crime impossível por absoluta ineficácia do meio. Exemplo: um documento tão grosseiramente falsificado que nenhuma pessoa razoável seria enganada por ele não possui imitatio veri suficiente, podendo configurar crime impossível, e não falsificação de documento público consumada.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 297','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '6e5ff84a-476a-454c-87bc-e7255fac3d60', 'pfdel25-penal-05',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Tráfico de pessoas — crime formal (art. 149-A, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Ao tipificar o crime de tráfico de pessoas, o Código Penal enumera uma série de finalidades especiais que devem se concretizar para que se repute consumado o delito.$q$,
  'E',
  $q$Errado. O crime de tráfico de pessoas (art. 149-A do Código Penal) é classificado como crime formal, consumando-se com a prática das condutas nucleares do tipo (agenciar, aliciar, recrutar, transportar, transferir, comprar, alojar ou acolher pessoa), desde que presente uma das finalidades especiais elencadas em lei (como exploração sexual, trabalho em condições análogas à de escravo, remoção de órgãos, entre outras), sendo dispensável, para a consumação, que essa finalidade efetivamente se concretize no plano fático. Exemplo: o agente que recruta uma vítima com a finalidade de submetê-la a trabalho escravo já consuma o crime de tráfico de pessoas, ainda que a exploração efetiva do trabalho, por qualquer razão, não chegue a ocorrer.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 149-A','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '2bc16d63-7351-4b3a-9267-41940be26594', '6e5ff84a-476a-454c-87bc-e7255fac3d60', 'pfdel25-penal-06',
  'Polícia Federal', 2025, 'Delegado de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Redução a condição análoga à de escravo — tipo misto alternativo (art. 149, CP)',
  $q$Julgue o item a seguir, com base na jurisprudência do STF e no Código Penal.
Segundo entendimento do STF, nem toda violação a direitos trabalhistas serve à caracterização do crime de redução à condição análoga à de escravo, exigindo-se, para tanto, que a violação a direitos seja intensa e persistente, embora se dispensem a coação física e o cerceamento da liberdade de locomoção, bastando, por exemplo, como meios executórios, a submissão a trabalhos forçados ou a jornada exaustiva, ou a sujeição a condições degradantes de trabalho, naquilo que constitui um tipo misto alternativo.$q$,
  'C',
  $q$Certo. O STF consolidou entendimento de que o crime de redução a condição análoga à de escravo (art. 149 do Código Penal) não exige, necessariamente, coação física direta ou cerceamento da liberdade de locomoção, bastando a demonstração de violação intensa e persistente a direitos trabalhistas básicos, por meio de qualquer dos núcleos alternativos do tipo (trabalhos forçados, jornada exaustiva ou condições degradantes de trabalho), configurando o dispositivo um tipo misto alternativo, em que a prática de qualquer uma dessas condutas já é suficiente para a consumação do delito. Exemplo: trabalhadores submetidos a condições degradantes de higiene e segurança, mesmo sem qualquer vigilância armada ou impedimento físico de saída, podem caracterizar o crime, desde que demonstrada a intensidade e a persistência da violação a seus direitos básicos.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 149; jurisprudência do STF','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
);
