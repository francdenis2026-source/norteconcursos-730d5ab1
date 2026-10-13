-- Auditoria PRF 2021 — lote 2 (17 itens autossuficientes de Direito
-- Administrativo, Direito Constitucional, Direito Penal e Processual
-- Penal e Direitos Humanos). Itens 88 (depende de cenário "essa situação"
-- não capturado), 91-92 (normativa interna específica da carreira PRF,
-- sem fonte oficial segura para verificar), 100-109 (dependem de um
-- cenário compartilhado sobre blitz/remarcação de chassi, cujo texto
-- completo não foi capturado na importação) e 110 (classificação como
-- crime hediondo incerta sem fonte específica) ficam de fora. Itens 89,
-- 97, 98 já estão anulados.
--
-- Item 94 (confisco de bem do tráfico condicionado à comprovação de
-- habitualidade) foi EXCLUÍDO desta auditoria: o gabarito oficial marca
-- 'C' (correto), mas o Tema 647 de Repercussão Geral do STF (RE 638.491)
-- fixou tese exatamente contrária — é possível o confisco de bem do
-- tráfico SEM necessidade de comprovar habitualidade do uso. Há conflito
-- direto entre o gabarito da banca e a jurisprudência vinculante do STF;
-- por governança de conteúdo, não resolvo esse conflito por adivinhação.

update public.official_exam_questions
set review_note=$q$Errado. A impetração de mandado de segurança para questionar ato administrativo analisa a LEGALIDADE do ato (existência de direito líquido e certo violado por ilegalidade ou abuso de poder) — não configura controle judicial do MÉRITO administrativo (conveniência e oportunidade), que permanece, em regra, fora do alcance do Judiciário.
Fonte oficial: art. 5º, LXIX, CF/1988; doutrina consolidada sobre limites do controle judicial do mérito administrativo.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, LXIX, CF/1988; doutrina sobre controle judicial de legalidade x mérito"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=86;

update public.official_exam_questions
set review_note=$q$Errado. Órgão público NÃO possui personalidade jurídica própria — é uma unidade de atuação integrante da estrutura de uma pessoa jurídica (centro de competência despersonalizado). Quem possui personalidade jurídica de direito público são as entidades da administração indireta (autarquias, fundações públicas), não os órgãos que as compõem.
Fonte oficial: doutrina consolidada de Direito Administrativo (teoria do órgão público).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - teoria do órgão público (ausência de personalidade jurídica)"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=87;

update public.official_exam_questions
set review_note=$q$Correto. O princípio da sindicabilidade (ou inafastabilidade da jurisdição) assegura que os atos da administração pública possam sempre ser submetidos a controle judicial — o ajuizamento de ação para conter abusos administrativos é justamente a aplicação prática desse princípio.
Fonte oficial: art. 5º, XXXV, CF/1988 (princípio da inafastabilidade/sindicabilidade); doutrina de Direito Administrativo.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, XXXV, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=90;

update public.official_exam_questions
set review_note=$q$Errado. A liberdade de reunião protege manifestações pacíficas mesmo quando defendem ideias minoritárias, impopulares ou a mudança de leis vigentes (incluindo defender a abolição ou descriminalização de uma conduta) — isso é distinto de efetivamente incitar/instigar a prática de um crime concreto. Defender, em tese, a mudança da lei penal não equivale, por si só, a incitação criminosa, e segue protegido pela liberdade de expressão e de reunião.
Fonte oficial: art. 5º, XVI, CF/1988 (liberdade de reunião); jurisprudência do STF sobre liberdade de expressão e defesa de mudanças legislativas.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, XVI, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=93;

update public.official_exam_questions
set review_note=$q$Correto. As hipóteses de perda da nacionalidade brasileira previstas no art. 12, §4º, da Constituição Federal são consideradas taxativas (rol fechado) pela doutrina majoritária — tratados ou convenções internacionais não podem criar novas hipóteses de perda de nacionalidade além das expressamente previstas no texto constitucional.
Fonte oficial: art. 12, §4º, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 12, §4º, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=95;

update public.official_exam_questions
set review_note=$q$Errado. O voto é obrigatório para maiores de 18 e menores de 70 anos, mas a Constituição NÃO veda a escusa de consciência: o art. 5º, VIII, CF assegura que ninguém será privado de direitos por motivo de crença religiosa ou de convicção filosófica/política, salvo se as invocar para eximir-se de obrigação legal e recusar-se a cumprir prestação alternativa — a legislação eleitoral prevê, inclusive, a possibilidade de justificar a ausência às urnas por objeção de consciência, mediante prestação alternativa.
Fonte oficial: art. 5º, VIII, CF/1988; art. 14, §1º, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, VIII e art. 14, §1º, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=96;

update public.official_exam_questions
set review_note=$q$Errado. Mesmo durante o estado de sítio decretado por comoção grave de repercussão nacional, a Constituição NÃO autoriza a suspensão de TODAS as garantias constitucionais — o art. 139, CF/1988 relaciona um rol específico e limitado de medidas que podem ser adotadas (como restrições a reunião, sigilo de correspondência, liberdade de imprensa), preservando o núcleo de direitos fundamentais não listados no dispositivo.
Fonte oficial: art. 139, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 139, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=99;

update public.official_exam_questions
set review_note=$q$Correto. A Lei de Abuso de Autoridade (Lei 13.869/2019) adota conceito amplo de agente público para fins de sujeito ativo do crime: abrange qualquer servidor ou titular de cargo, emprego ou função em órgão ou entidade da administração, inclusive sem vínculo formal/remuneração, desde que no exercício de função pública, ainda que transitoriamente ou sem remuneração.
Fonte oficial: art. 2º, Lei 13.869/2019 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 2º, Lei 13.869/2019","url":"https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=111;

update public.official_exam_questions
set review_note=$q$Correto. Mesmo diante da apresentação de documento de identificação civil, a Lei 12.037/2009 autoriza a identificação criminal quando constar de registros policiais o uso de outros nomes ou diferentes qualificações pelo indiciado — uma das hipóteses expressas de exceção à regra geral de dispensa da identificação criminal.
Fonte oficial: art. 3º, V, Lei 12.037/2009 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 3º, V, Lei 12.037/2009","url":"https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12037.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=112;

update public.official_exam_questions
set review_note=$q$Correto. A Lei 11.343/2006 (Lei de Drogas), ao tratar das atividades de prevenção do uso indevido, inclui expressamente o fortalecimento da autonomia e da responsabilidade individual em relação ao uso indevido de drogas como um dos princípios/diretrizes do Sistema Nacional de Políticas Públicas sobre Drogas.
Fonte oficial: art. 19, Lei 11.343/2006 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 19, Lei 11.343/2006","url":"https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=113;

update public.official_exam_questions
set review_note=$q$Correto. O Estatuto do Desarmamento (Lei 10.826/2003) tipifica como comércio ilegal de arma de fogo a conduta de, entre outras hipóteses, conduzir ou transportar arma de fogo no exercício de atividade comercial ou industrial sem a devida autorização ou em desacordo com determinação legal/regulamentar.
Fonte oficial: art. 17, Lei 10.826/2003 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 17, Lei 10.826/2003","url":"https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=114;

update public.official_exam_questions
set review_note=$q$Errado. O crime de tortura (Lei 9.455/1997) exige, como elementar do tipo, a submissão da vítima a SOFRIMENTO FÍSICO OU MENTAL — a intensidade/gravidade desse sofrimento é justamente um dos elementos que distinguem a tortura de outras condutas mais brandas (como maus-tratos ou constrangimento ilegal); dizer que a intensidade é irrelevante contraria a própria estrutura do tipo penal.
Fonte oficial: art. 1º, Lei 9.455/1997 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 1º, Lei 9.455/1997","url":"https://www.planalto.gov.br/ccivil_03/leis/l9455.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=115;

update public.official_exam_questions
set review_note=$q$Correto. A mera intuição ou suspeita genérica de que há tráfico de drogas em uma residência não configura, por si só, justa causa para o ingresso policial no domicílio sem mandado judicial ou sem o consentimento do morador — a inviolabilidade domiciliar só cede, fora do consentimento, em caso de flagrante delito, desastre, prestação de socorro ou, durante o dia, por determinação judicial.
Fonte oficial: art. 5º, XI, CF/1988; jurisprudência do STF sobre entrada forçada em domicílio e justa causa.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, XI, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=116;

update public.official_exam_questions
set review_note=$q$Errado. O STF entende que o aviso prévio às autoridades sobre uma reunião/manifestação pública é mero dever de comunicação (para fins de compatibilização com outras reuniões no mesmo local), não condição de validade do direito: a ausência de aviso prévio NÃO torna, por si só, ilegal a manifestação, desde que ela permaneça pacífica e sem armas.
Fonte oficial: art. 5º, XVI, CF/1988; jurisprudência do STF sobre direito de reunião e aviso prévio (ADPF 187, ADI 1969).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, XVI, CF/1988; jurisprudência STF (ADPF 187, ADI 1969)","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=117;

update public.official_exam_questions
set review_note=$q$Correto. O STF (ADI 4275) fixou entendimento de que a alteração de gênero nos assentamentos de registro civil independe da realização de cirurgia de transgenitalização ou da comprovação de tratamentos hormonais/patologizantes, bastando a autoidentificação da pessoa interessada.
Fonte oficial: jurisprudência do STF, ADI 4275 (planalto.gov.br/STF — alteração de nome e gênero no registro civil).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"STF, ADI 4275 (alteração de gênero no registro civil)"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=118;

update public.official_exam_questions
set review_note=$q$Correto. A Declaração Universal dos Direitos Humanos (1948), um dos primeiros instrumentos normativos gerais de direitos humanos adotados por uma organização internacional (ONU), consagrou a dignidade da pessoa humana como fundamento valorativo central do sistema internacional de proteção dos direitos humanos, ponto de convergência da ética universal.
Fonte oficial: Declaração Universal dos Direitos Humanos (1948), ONU.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"Declaração Universal dos Direitos Humanos, ONU, 1948"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=119;

update public.official_exam_questions
set review_note=$q$Errado. A Convenção Internacional sobre os Direitos das Pessoas com Deficiência foi aprovada no Brasil pelo rito do art. 5º, §3º, da Constituição (quórum qualificado de emenda constitucional, Decreto nº 6.949/2009) — isso lhe confere status de EMENDA CONSTITUCIONAL, não "status supraconstitucional" (acima da própria Constituição), categoria que não existe no ordenamento jurídico brasileiro para tratados internacionais.
Fonte oficial: art. 5º, §3º, CF/1988; Decreto nº 6.949/2009 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, §3º, CF/1988; Decreto nº 6.949/2009","url":"https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/decreto/d6949.htm"}]'::jsonb
where exam_year=2021 and career_name='Policial Rodoviário Federal' and item_number=120;
