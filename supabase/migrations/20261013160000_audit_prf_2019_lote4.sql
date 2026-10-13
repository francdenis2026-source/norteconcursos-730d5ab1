-- Auditoria PRF 2019 — lote 4 (16 itens autossuficientes de Direito
-- Administrativo, Direito Constitucional, Direito Penal e Processual
-- Penal e Direitos Humanos). Itens 101-105, 108-109, 111-113, 115
-- dependem de cenários nomeados (motorista do descaminho, Sandro,
-- Eurípedes, João) cujo texto-base não foi capturado. Item 109 já está
-- anulado, assim como o 113.

update public.official_exam_questions
set review_note=$q$Errado. O poder de polícia, em seu núcleo coercitivo/fiscalizador, é atividade EXCLUSIVA da Administração Pública — segundo a jurisprudência do STF, os atos de consentimento e fiscalização podem, em certas hipóteses, ser desempenhados por delegatários, mas os atos de ORDEM e SANÇÃO (a parcela coercitiva do poder de polícia) não são delegáveis a pessoas jurídicas de direito privado.
Fonte oficial: jurisprudência do STF (RE 633.782) sobre delegação do poder de polícia.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"jurisprudência STF (RE 633.782) sobre indelegabilidade do núcleo coercitivo do poder de polícia"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=93;

update public.official_exam_questions
set review_note=$q$Errado. O abuso de poder PODE decorrer de conduta omissiva do agente público (por exemplo, a omissão abusiva no dever de agir) — não se restringe a condutas comissivas; doutrina reconhece tanto o excesso de poder quanto o desvio de finalidade por ação ou por omissão.
Fonte oficial: doutrina consolidada de Direito Administrativo (teoria do abuso de poder).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - abuso de poder (excesso de poder e desvio de finalidade)"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=94;

update public.official_exam_questions
set review_note=$q$Errado. A responsabilidade civil do Estado por atos COMISSIVOS de seus agentes é OBJETIVA, fundada na teoria do risco administrativo — o particular lesado não precisa comprovar culpa ou dolo do agente, bastando demonstrar o nexo causal entre a conduta estatal e o dano. A exigência de comprovação de culpa/dolo aplica-se à responsabilidade SUBJETIVA (hipóteses de omissão, conforme entendimento majoritário), não à responsabilidade por ato comissivo.
Fonte oficial: art. 37, §6º, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 37, §6º, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=95;

update public.official_exam_questions
set review_note=$q$Errado. Na requisição administrativa de propriedade particular em caso de iminente perigo público (art. 5º, XXV, CF), a indenização é devida posteriormente e CONDICIONADA à comprovação de que houve dano efetivo — o dano não é presumido automaticamente pela simples requisição; o que é imediato é o USO do bem, não o dever de indenizar, que depende de dano comprovado.
Fonte oficial: art. 5º, XXV, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, XXV, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=96;

update public.official_exam_questions
set review_note=$q$Errado. A competência constitucional da Polícia Rodoviária Federal abrange o patrulhamento ostensivo das RODOVIAS federais — não das ferrovias, atribuição que não integra o rol constitucional da PRF.
Fonte oficial: art. 144, §2º, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 144, §2º, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=97;

update public.official_exam_questions
set review_note=$q$Correto. O policial, como militar/servidor em atividade de segurança pública, pode candidatar-se a cargo eletivo, mas, se eleito, deve passar para a inatividade (ou afastamento equivalente) a partir da diplomação, conforme as regras constitucionais de alistabilidade e elegibilidade.
Fonte oficial: art. 142, §3º, V, CF/1988 (aplicável por extensão/regras específicas de elegibilidade de servidores de segurança pública).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 142, §3º, V, CF/1988 e regras de elegibilidade de servidores públicos","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=98;

update public.official_exam_questions
set review_note=$q$Correto. A Constituição assegura ao preso o direito à identificação dos responsáveis por sua prisão ou por seu interrogatório policial, e o direito de permanecer calado (direito ao silêncio).
Fonte oficial: art. 5º, LXIV e LXIII, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, LXIV e LXIII, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=99;

update public.official_exam_questions
set review_note=$q$Correto. A segurança viária compreende, entre outros vetores, a educação para o trânsito, a engenharia de tráfego e a fiscalização de trânsito, conjunto de medidas voltadas a assegurar ao cidadão o direito à mobilidade eficiente e segura.
Fonte oficial: CTB (Lei 9.503/1997); Política Nacional de Trânsito (Contran).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"CTB (Lei 9.503/1997); Política Nacional de Trânsito"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=100;

update public.official_exam_questions
set review_note=$q$Errado. A vedação à analogia no Direito Penal NÃO é absoluta: é proibida a analogia IN MALAM PARTEM (para prejudicar o réu, criar tipo incriminador ou agravar a pena), mas é admitida a analogia IN BONAM PARTEM (em benefício do réu), em hipóteses de lacuna legal favoráveis ao acusado.
Fonte oficial: doutrina consolidada de Direito Penal (princípio da legalidade e analogia in bonam partem).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - princípio da legalidade penal e analogia in bonam partem"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=106;

update public.official_exam_questions
set review_note=$q$Errado. O art. 62, §1º, I, "b", da Constituição Federal VEDA, em qualquer hipótese, a edição de medida provisória sobre matéria relativa a direito penal — não há exceção que permita ao Presidente editar MP para agravar pena de crime, ainda que a aplicação fique condicionada à posterior aprovação do Congresso.
Fonte oficial: art. 62, §1º, I, b, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 62, §1º, I, b, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=107;

update public.official_exam_questions
set review_note=$q$Correto. A Política Nacional de Enfrentamento ao Tráfico de Pessoas é coordenada de forma articulada entre diferentes órgãos federais (com participação do Ministério da Justiça e Segurança Pública e órgãos vinculados), refletindo a natureza transversal do enfrentamento ao tráfico de pessoas.
Fonte oficial: Lei 13.344/2016 (Lei de Tráfico de Pessoas); Decreto sobre a Política Nacional de Enfrentamento ao Tráfico de Pessoas.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"Lei 13.344/2016 e Política Nacional de Enfrentamento ao Tráfico de Pessoas"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=114;

update public.official_exam_questions
set review_note=$q$Correto. A proteção dos direitos humanos independe da conduta da pessoa: mesmo quem viola direitos humanos de terceiros continua, ele próprio, protegido pelas normas internacionais e constitucionais de direitos humanos (princípio da universalidade e da dignidade da pessoa humana, aplicável a todos, inclusive a quem comete violações).
Fonte oficial: doutrina consolidada de Direitos Humanos (princípio da universalidade).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - princípio da universalidade dos direitos humanos"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=116;

update public.official_exam_questions
set review_note=$q$Errado. A responsabilidade internacional do Estado por violação de direitos humanos reconhecidos na Convenção Americana de Direitos Humanos não se limita a atos diretos de seus agentes: pode decorrer também de omissão estatal (falha no dever de prevenir, investigar e punir) e de condutas de particulares toleradas ou não prevenidas pelo Estado (teoria da responsabilidade por omissão e por aquiescência).
Fonte oficial: jurisprudência da Corte Interamericana de Direitos Humanos sobre responsabilidade estatal por omissão.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"jurisprudência da Corte Interamericana de Direitos Humanos sobre responsabilidade estatal"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=117;

update public.official_exam_questions
set review_note=$q$Errado. Os direitos humanos não foram afirmados em um único momento histórico: a doutrina reconhece sua afirmação em gerações/dimensões sucessivas ao longo do tempo (direitos de primeira geração — civis e políticos; segunda — sociais, econômicos e culturais; terceira — difusos e coletivos; e assim por diante), refletindo um processo histórico contínuo.
Fonte oficial: doutrina consolidada de Direitos Humanos (teoria das gerações/dimensões de direitos).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - gerações/dimensões dos direitos humanos"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=118;

update public.official_exam_questions
set review_note=$q$Correto. Conforme a forma de internalização prevista no art. 5º, §3º, da CF, os tratados internacionais de direitos humanos aprovados pelo rito de emenda constitucional (quórum qualificado, dois turnos, 3/5 dos votos) recebem status normativo-hierárquico CONSTITUCIONAL; os demais, aprovados pelo rito ordinário, recebem status supralegal (entendimento do STF) — ou seja, podem receber diferentes status conforme a forma de aprovação/internalização.
Fonte oficial: art. 5º, §3º, CF/1988; jurisprudência do STF (RE 466.343) sobre status supralegal dos tratados de direitos humanos.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, §3º, CF/1988; STF RE 466.343","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=119;

update public.official_exam_questions
set review_note=$q$Correto. Para que um tratado internacional de direitos humanos adquira hierarquia constitucional (equivalente a emenda constitucional), a Constituição exige aprovação, em cada Casa do Congresso Nacional, em dois turnos, por três quintos dos votos dos respectivos membros.
Fonte oficial: art. 5º, §3º, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, §3º, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=120;
