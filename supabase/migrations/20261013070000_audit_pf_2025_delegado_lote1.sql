-- Auditoria PF 2025 Delegado de Polícia Federal — lote 1 (29 itens
-- autossuficientes de Direito Administrativo, Direito Constitucional e
-- Direitos Humanos). Itens anulados (2,3,10,14,35) não são tocados. Itens
-- dependentes de cenário com informação faltante (33,34,55-57) ficam para
-- lote posterior com verificação dedicada.

update public.official_exam_questions
set review_note=$q$Correto. Pela autotutela administrativa (Súmula 473, STF), a administração pública pode/deve anular, de ofício ou por provocação, seus próprios atos ilegais, e pode revogar atos válidos por conveniência e oportunidade, respeitados os direitos adquiridos.
Fonte oficial: Súmula 473, STF; art. 53, Lei 9.784/1999 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"Súmula 473, STF; art. 53, Lei 9.784/1999","url":"https://www.planalto.gov.br/ccivil_03/leis/l9784.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=1;

update public.official_exam_questions
set review_note=$q$Errado. A Lei de Improbidade Administrativa (Lei 8.429/1992, com a redação da Lei 14.230/2021) exige, para os atos que atentam contra os princípios da administração, a comprovação de dolo — a mera dispensa indevida de licitação com perda patrimonial efetiva, por si só, não configura automaticamente improbidade por atentado aos princípios sem a demonstração do elemento subjetivo doloso.
Fonte oficial: art. 11, Lei 8.429/1992, na redação da Lei 14.230/2021 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 11, Lei 8.429/1992 (red. Lei 14.230/2021)","url":"https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=4;

update public.official_exam_questions
set review_note=$q$Errado. A Lei 14.230/2021 alterou a Lei de Improbidade para excluir expressamente a modalidade culposa: desde então, a lei exige DOLO para a configuração de improbidade administrativa — "erro grosseiro" não basta, sendo necessária a demonstração de dolo específico de alcançar resultado ilícito.
Fonte oficial: art. 1º, §§1º-2º, Lei 8.429/1992, na redação da Lei 14.230/2021 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 1º, §§1º-2º, Lei 8.429/1992 (red. Lei 14.230/2021)","url":"https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=5;

update public.official_exam_questions
set review_note=$q$Correto. Frustrar ou fraudar, mediante ajuste, combinação ou qualquer outro expediente, o caráter competitivo de procedimento licitatório, com o intuito de obter vantagem para si ou para outrem, é conduta expressamente tipificada como ato de improbidade que atenta contra os princípios da administração pública.
Fonte oficial: art. 11, inciso IV, Lei 8.429/1992, na redação da Lei 14.230/2021 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 11, IV, Lei 8.429/1992 (red. Lei 14.230/2021)","url":"https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=6;

update public.official_exam_questions
set review_note=$q$Errado. Como regra geral, a Lei de Improbidade exige DOLO (não "dolo ou culpa") para todas as modalidades de improbidade, após a Lei 14.230/2021 ter abolido a modalidade culposa, inclusive para os atos que causam prejuízo ao erário (art. 10).
Fonte oficial: art. 1º, §§1º-2º, Lei 8.429/1992, na redação da Lei 14.230/2021 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 1º, §§1º-2º, Lei 8.429/1992 (red. Lei 14.230/2021)","url":"https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=7;

update public.official_exam_questions
set review_note=$q$Errado. O terceiro que, mesmo não sendo agente público, induz ou concorre dolosamente para a prática de ato de improbidade, ou dele se beneficia, está sim sujeito às sanções da Lei 8.429/1992, nos limites de sua participação — não fica isento, respondendo apenas pela legislação penal comum.
Fonte oficial: art. 3º, Lei 8.429/1992 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 3º, Lei 8.429/1992","url":"https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=8;

update public.official_exam_questions
set review_note=$q$Correto. Em razão da presunção de legitimidade e da imperatividade, o ato administrativo produz efeitos (cria obrigações) desde sua expedição, impondo-se aos administrados independentemente de sua concordância, até que seja anulado ou revogado pela própria administração ou pelo Judiciário.
Fonte oficial: doutrina consolidada de Direito Administrativo (atributos dos atos administrativos).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - atributos do ato administrativo (presunção de legitimidade e imperatividade)"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=9;

update public.official_exam_questions
set review_note=$q$Correto. Atos de gestão são aqueles em que a administração atua em situação de igualdade com o particular, sem exercício de supremacia (poder de império) — tipicamente na gestão de seu patrimônio e serviços, diferentemente dos atos de império, praticados com prerrogativas exorbitantes do direito comum.
Fonte oficial: doutrina consolidada de Direito Administrativo (classificação dos atos administrativos).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - classificação dos atos administrativos (atos de gestão x atos de império)"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=11;

update public.official_exam_questions
set review_note=$q$Errado. Nem todo desacordo com a lei em relação a qualquer requisito de validade torna o ato NULO de pleno direito: a doutrina distingue vícios que geram nulidade (insanáveis) de vícios que geram mera anulabilidade (sanáveis, por exemplo defeitos de forma ou competência que podem ser convalidados) — a afirmação generaliza indevidamente a consequência da invalidade.
Fonte oficial: doutrina consolidada de Direito Administrativo (teoria das nulidades do ato administrativo).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - teoria das nulidades do ato administrativo (nulidade x anulabilidade)"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=12;

update public.official_exam_questions
set review_note=$q$Correto. O STF admite, excepcionalmente, em caso de urgência e relevância da matéria, a concessão de medida cautelar em ADI por omissão sem a prévia audiência dos órgãos ou autoridades responsáveis pela omissão inconstitucional.
Fonte oficial: art. 12-F, §1º, Lei 9.868/1999 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 12-F, §1º, Lei 9.868/1999","url":"https://www.planalto.gov.br/ccivil_03/leis/l9868.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=13;

update public.official_exam_questions
set review_note=$q$Correto. O STF reconheceu a mora do Congresso Nacional na regulamentação do art. 7º, XI, da Constituição (participação dos trabalhadores na gestão da empresa), fixando prazo para a adoção das medidas legislativas pertinentes, em julgamento de ação direta de inconstitucionalidade por omissão.
Fonte oficial: jurisprudência do STF sobre a ADO relativa ao art. 7º, XI, CF/1988.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"jurisprudência STF - ADO sobre art. 7º, XI, CF/1988 (participação dos trabalhadores na gestão da empresa)"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=15;

update public.official_exam_questions
set review_note=$q$Errado. A liberdade de imprensa não é absoluta: segundo entendimento consolidado do STF, quando o veículo de imprensa publica imputação falsa de crime havendo, à época, indícios concretos de falsidade e descumprindo o dever de cuidado com a veracidade da informação, é possível a responsabilização civil da empresa jornalística — a proteção constitucional não blinda a publicação de informação falsa divulgada sem checagem mínima.
Fonte oficial: jurisprudência do STF sobre responsabilidade civil da imprensa e dever de veracidade.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"jurisprudência STF - responsabilidade civil da imprensa por informação falsa sem dever de cuidado"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=16;

update public.official_exam_questions
set review_note=$q$Correto. O STF considera inconstitucional lei de iniciativa parlamentar que cria órgão de fiscalização do Poder Executivo integrado à estrutura do Legislativo com poder de "acompanhar" atos do Executivo, por violação à separação de poderes (o controle externo tem forma e órgão constitucionalmente definidos — o Tribunal de Contas — não podendo ser criado livremente por lei ordinária parlamentar um novo órgão fiscalizador).
Fonte oficial: jurisprudência do STF sobre separação de poderes e controle externo do Executivo.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"jurisprudência STF - separação de poderes e controle externo do Executivo por lei de iniciativa parlamentar"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=17;

update public.official_exam_questions
set review_note=$q$Errado. O art. 62, §1º, I, "b", da Constituição Federal VEDA expressamente a edição de medida provisória sobre matéria relativa a direito penal, processual penal e processual civil — a afirmação de que seria "possível" editar MP sobre essas matérias contraria o texto constitucional (ainda que cidadania, direito civil, tributário, urbanístico e financeiro não estejam, em regra, na vedação geral, direito processual penal e processual civil estão expressamente vedados).
Fonte oficial: art. 62, §1º, I, "b", CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 62, §1º, I, b, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=18;

update public.official_exam_questions
set review_note=$q$Correto. O deputado ou senador que assume o cargo de ministro de Estado pode optar pela remuneração do mandato ou do cargo, mas, segundo entendimento do STF, não goza da imunidade parlamentar em relação aos atos praticados na função ministerial, respondendo por eles nos termos aplicáveis a qualquer ministro.
Fonte oficial: art. 56, I, CF/1988; jurisprudência do STF sobre imunidade parlamentar e exercício de cargo ministerial.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 56, I, CF/1988; jurisprudência STF sobre imunidade parlamentar em cargo ministerial","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=19;

update public.official_exam_questions
set review_note=$q$Correto. Compete privativamente ao Senado Federal aprovar previamente, por voto secreto, após arguição pública, a escolha de chefes de missão diplomática de caráter permanente.
Fonte oficial: art. 52, IV, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 52, IV, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=20;

update public.official_exam_questions
set review_note=$q$Errado. Pelo art. 193 da Constituição, a ordem social tem como BASE o primado do trabalho, e como OBJETIVOS o bem-estar e a justiça sociais — "justiça social" é objetivo, não fundamento, e "distribuição de renda" não é o termo constitucional (é "justiça social"); o item inverte/mistura os elementos corretos do dispositivo.
Fonte oficial: art. 193, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 193, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=21;

update public.official_exam_questions
set review_note=$q$Correto. O art. 231, §1º, da Constituição define as terras tradicionalmente ocupadas pelos índios como as habitadas em caráter permanente, as utilizadas para suas atividades produtivas, as imprescindíveis à preservação dos recursos ambientais necessários a seu bem-estar e as necessárias à sua reprodução física e cultural, segundo seus usos, costumes e tradições.
Fonte oficial: art. 231, §1º, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 231, §1º, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=22;

update public.official_exam_questions
set review_note=$q$Errado. A descrição apresentada (complexo normativo estabelecido de uma só vez, de forma total/exaustiva/sistemática) corresponde à concepção JURÍDICA (ou normativista/formal) de Constituição — não à concepção POLÍTICA (de Carl Schmitt), que define Constituição como decisão política fundamental do titular do poder constituinte, distinta das leis constitucionais.
Fonte oficial: doutrina consolidada de Direito Constitucional (concepções de Constituição: sociológica, política, jurídica/normativa).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - concepções de Constituição (política x jurídica), Carl Schmitt"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=23;

update public.official_exam_questions
set review_note=$q$Correto. O sociologismo constitucional (concepção sociológica, de Ferdinand Lassalle) entende a Constituição como fato social, imanência das estruturas e relações de poder reais e efetivas da sociedade em determinado momento, não se sustentando em uma norma jurídica transcendente às forças sociais.
Fonte oficial: doutrina consolidada de Direito Constitucional (concepção sociológica de Constituição, Ferdinand Lassalle).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - concepção sociológica de Constituição (Ferdinand Lassalle)"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=24;

update public.official_exam_questions
set review_note=$q$Errado. A Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher (CEDAW) determina que homens e mulheres tenham os MESMOS direitos e responsabilidades quanto à tutela, curatela, guarda e adoção de filhos — não que as mulheres recebam "prioridade", o que contrariaria o próprio princípio de igualdade que a Convenção busca assegurar.
Fonte oficial: art. 16, "d", CEDAW (Decreto 4.377/2002, planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 16, d, CEDAW","url":"https://www.planalto.gov.br/ccivil_03/decreto/2002/d4377.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=25;

update public.official_exam_questions
set review_note=$q$Errado. A Convenção Relativa ao Estatuto dos Refugiados determina que os Estados contratantes NÃO SUBMETERÃO os refugiados a direitos, taxas ou impostos, diversos ou mais elevados do que os exigidos de seus nacionais em situações análogas — ou seja, há sim equiparação tributária aos nacionais, não isenção total; a formulação "não devem impor despesas fiscais" generaliza indevidamente, pois o que é vedado é tratamento DIFERENCIADO e mais gravoso que o dado aos nacionais, não a cobrança em si.
Fonte oficial: art. 29, Convenção Relativa ao Estatuto dos Refugiados (Decreto 50.215/1961, planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 29, Convenção relativa ao Estatuto dos Refugiados","url":"https://www.planalto.gov.br/ccivil_03/decreto/1950-1969/d50215.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=26;

update public.official_exam_questions
set review_note=$q$Correto. A Convenção Relativa ao Estatuto dos Refugiados determina que os Estados contratantes concedam aos refugiados o mesmo tratamento dado aos nacionais no que concerne ao ensino primário (elementar).
Fonte oficial: art. 22, Convenção Relativa ao Estatuto dos Refugiados (Decreto 50.215/1961, planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 22, Convenção relativa ao Estatuto dos Refugiados","url":"https://www.planalto.gov.br/ccivil_03/decreto/1950-1969/d50215.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=27;

update public.official_exam_questions
set review_note=$q$Correto. A Convenção Internacional sobre a Eliminação de Todas as Formas de Discriminação Racial assegura a qualquer pessoa sob a jurisdição dos Estados-partes proteção e recurso efetivos perante os tribunais nacionais, incluindo o direito de pedir reparação justa e adequada por qualquer dano sofrido em decorrência de discriminação racial.
Fonte oficial: art. 6º, Convenção Internacional sobre a Eliminação de Todas as Formas de Discriminação Racial (Decreto 65.810/1969, planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 6º, Convenção sobre Eliminação de Todas as Formas de Discriminação Racial","url":"https://www.planalto.gov.br/ccivil_03/decreto/1950-1969/d65810.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=28;

update public.official_exam_questions
set review_note=$q$Errado. O STF adota entendimento amplo (não taxativo/restritivo) da expressão "grave violação de direitos humanos" (usada para o incidente de deslocamento de competência, art. 109, §5º, CF) — a interpretação não se limita a um rol fechado dos instrumentos internacionais ratificados pelo Brasil, cabendo avaliação em cada caso concreto conforme a gravidade e repercussão do fato.
Fonte oficial: jurisprudência do STF sobre o incidente de deslocamento de competência (IDC) e a expressão "grave violação de direitos humanos", art. 109, §5º, CF/1988.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"jurisprudência STF - IDC e grave violação de direitos humanos, art. 109, §5º, CF/1988"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=29;

update public.official_exam_questions
set review_note=$q$Correto. Entre os atributos/características dos direitos humanos, a inerência significa que tais direitos são inerentes à condição humana, extensíveis a todos sem distinção; a transnacionalidade (ou internacionalidade) significa que são reconhecidos independentemente de fronteiras, onde quer que o indivíduo se encontre.
Fonte oficial: doutrina consolidada de Direitos Humanos (atributos/características dos direitos humanos).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - atributos dos direitos humanos (inerência, transnacionalidade)"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=30;

update public.official_exam_questions
set review_note=$q$Correto. Tanto a Convenção contra a Tortura quanto a Convenção Interamericana sobre Desaparecimento Forçado de Pessoas proíbem a expulsão, devolução (refoulement) ou extradição de uma pessoa para Estado onde haja razões fundadas para crer que ela corra risco de ser submetida a tortura ou de ser vítima de desaparecimento forçado.
Fonte oficial: art. 3º, Convenção contra a Tortura (Decreto 40/1991); art. XIII, Convenção Interamericana sobre Desaparecimento Forçado de Pessoas (Decreto 8.766/2016), planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 3º, Convenção contra a Tortura; art. XIII, Convenção Interamericana sobre Desaparecimento Forçado de Pessoas","url":"https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0040.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=31;

update public.official_exam_questions
set review_note=$q$Correto. O crime de genocídio é expressamente excluído da categoria de crime político para fins de extradição, nos termos da Convenção para a Prevenção e a Repressão do Crime de Genocídio.
Fonte oficial: art. VII, Convenção para a Prevenção e a Repressão do Crime de Genocídio (Decreto 30.822/1952, planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. VII, Convenção para a Prevenção e a Repressão do Crime de Genocídio","url":"https://www.planalto.gov.br/ccivil_03/decreto/1950-1969/d30822.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=32;

update public.official_exam_questions
set review_note=$q$Errado. A concessão de asilo político É um dos princípios que regem as relações internacionais da República Federativa do Brasil (art. 4º, X, CF/1988) — já a vedação de extradição de estrangeiro por crime político ou de opinião (item relacionado ao art. 5º, LII, CF/1988) é uma garantia individual, não um dos princípios elencados no art. 4º; o item confunde as duas normas ao apresentar a não-extradição por crime político como um "princípio que rege as relações internacionais".
Fonte oficial: art. 4º, X, e art. 5º, LII, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 4º, X e art. 5º, LII, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=48;

update public.official_exam_questions
set review_note=$q$Correto. A concessão de asilo político é expressamente um dos princípios que regem as relações internacionais da República Federativa do Brasil.
Fonte oficial: art. 4º, X, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 4º, X, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=47;

update public.official_exam_questions
set review_note=$q$Errado. A vedação constitucional à distinção entre brasileiros natos e naturalizados é a regra geral (art. 12, §2º, CF), mas comporta exceções expressamente previstas na própria Constituição — entre elas, a extraditabilidade do naturalizado nas hipóteses do art. 5º, LI (crime comum anterior à naturalização, ou tráfico de drogas). Logo, "por ser vedada a distinção" não implica ausência total de extraditabilidade do naturalizado: a própria CF prevê a exceção.
Fonte oficial: art. 5º, LI, e art. 12, §2º, CF/1988 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 5º, LI e art. 12, §2º, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=49;

update public.official_exam_questions
set review_note=$q$Errado. O Brasil RATIFICOU a Convenção de Palermo (Convenção das Nações Unidas contra o Crime Organizado Transnacional), promulgada pelo Decreto nº 5.015, de 12 de março de 2004 — a afirmação de que "ainda não foi ratificada" é falsa.
Fonte oficial: Decreto nº 5.015/2004 (planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"Decreto nº 5.015/2004 (promulga a Convenção de Palermo)","url":"https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/decreto/d5015.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=50;

update public.official_exam_questions
set review_note=$q$Correto. O Protocolo de Assistência Jurídica Mútua em Assuntos Penais (Protocolo de São Luís, MERCOSUL), já ratificado pelo Brasil, destina-se a facilitar a cooperação jurídica mútua em matéria penal entre os Estados-partes do MERCOSUL.
Fonte oficial: Decreto nº 3.468/2000 (promulga o Protocolo de São Luís, planalto.gov.br).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"Decreto nº 3.468/2000 (Protocolo de São Luís)","url":"https://www.planalto.gov.br/ccivil_03/decreto/d3468.htm"}]'::jsonb
where exam_year=2025 and career_name='Delegado de Polícia Federal' and item_number=51;
