-- Auditoria PC-ES 2022 Delegado de Polícia — lote 2 (19 itens de Direito
-- Penal, Direito Processual Penal, Direito Administrativo e Direito
-- Constitucional). Itens 28 (causa de aumento roubo em transporte
-- coletivo) e 32 (prazo de 3 dias para destino de fiança em dinheiro)
-- ficam de fora por exigirem verificação mais específica que não
-- consegui confirmar com segurança nesta rodada. Itens 31 e 45 já estão
-- anulados.

update public.official_exam_questions
set review_note=$q$Correto (opção C). Pelo art. 116, II, do Código Penal, não corre o prazo prescricional enquanot não transitar em julgado a decisão final nos casos de recurso pendente de julgamento perante tribunais superiores (causa impeditiva da prescrição).
Fonte oficial: art. 116, II, Código Penal (Decreto-Lei 2.848/1940), planalto.gov.br.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=26;

update public.official_exam_questions
set review_note=$q$Correto (opção A). Quando sobrevém causa superveniente relativamente independente que, por si só, produz o resultado (como uma explosão acidental no hospital), o agente responde apenas pelos atos já praticados — no caso, tentativa de homicídio — e não pelo resultado morte, por força do art. 13, §1º, do Código Penal (teoria da causalidade adequada/concausa superveniente).
Fonte oficial: art. 13, §1º, Código Penal (Decreto-Lei 2.848/1940), planalto.gov.br.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=27;

update public.official_exam_questions
set review_note=$q$Correto (opção E). De acordo com a jurisprudência consolidada do STJ, não é admitido o indiciamento após o recebimento da denúncia — o indiciamento é ato próprio da fase investigativa (pode ocorrer no auto de prisão em flagrante ou no relatório final do inquérito), incompatível com a fase processual já iniciada.
Fonte oficial: jurisprudência do STJ sobre indiciamento formal e seus limites temporais.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=29;

update public.official_exam_questions
set review_note=$q$Correto (opção A). Havendo repercussão interestadual que exija repressão uniforme, a Polícia Federal pode apurar, em caráter residual, crimes cuja competência seria originariamente da justiça estadual, sem que isso macule a validade das provas produzidas, nos termos do art. 144, §1º, I, da CF/1988, interpretado em conjunto com a legislação que disciplina a atuação residual da PF.
Fonte oficial: art. 144, §1º, I, CF/1988; doutrina sobre atribuição residual da Polícia Federal.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=30;

update public.official_exam_questions
set review_note=$q$Correto (opção E). A condução coercitiva do investigado para submetê-lo a procedimento de reconhecimento de pessoa não viola o princípio nemo tenetur se detegere (direito de não produzir prova contra si mesmo): diferentemente da condução coercitiva para interrogatório (declarada inconstitucional pelo STF nas ADPFs 395 e 444), o reconhecimento de pessoa é ato de natureza probatória que não exige colaboração ativa/testemunhal do investigado.
Fonte oficial: jurisprudência do STF (ADPF 395 e ADPF 444) sobre condução coercitiva, por distinção com o reconhecimento de pessoa.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=33;

update public.official_exam_questions
set review_note=$q$Correto (opção B). Um trailer estacionado onde uma pessoa efetivamente reside é equiparado a "casa" para fins de proteção constitucional contra buscas sem mandado (art. 5º, XI, CF) — o conceito constitucional de domicílio é amplo e abrange qualquer compartimento habitado, ainda que não convencional.
Fonte oficial: art. 5º, XI, CF/1988; jurisprudência sobre o conceito amplo de domicílio para fins de proteção constitucional.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=34;

update public.official_exam_questions
set review_note=$q$Correto (opção C). Diante de notícia-crime inqualificada (de origem incerta ou não identificada), a autoridade policial deve, antes de instaurar o inquérito, promover diligência preliminar de verificação da procedência das informações (VPI), para evitar a abertura de investigação com base em delação inescrupulosa ou infundada.
Fonte oficial: doutrina e prática processual penal sobre notitia criminis inqualificada e verificação de procedência das informações.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=35;

update public.official_exam_questions
set review_note=$q$Correto (opção B). Pelo art. 4º, VIII e IX, da Lei 10.520/2002, após a classificação das propostas, o autor da oferta de menor preço e os autores das ofertas com valores até 10% superiores a ele poderão fazer novos lances verbais e sucessivos, na sessão de disputa do pregão.
Fonte oficial: art. 4º, VIII-IX, Lei 10.520/2002, planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 4º, VIII-IX, Lei 10.520/2002","url":"https://www.planalto.gov.br/ccivil_03/leis/2002/l10520.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=36;

update public.official_exam_questions
set review_note=$q$Correto (opção C — itens I e III certos). A principal diferença entre descentralização e desconcentração está no número de pessoas jurídicas envolvidas (item I correto); a desconcentração ocorre dentro de uma mesma pessoa jurídica, repartindo atribuições entre órgãos internos (item III correto). O item II está errado: é a DESCONCENTRAÇÃO (não a descentralização) que ocorre no âmbito de uma única pessoa jurídica — a descentralização pressupõe duas pessoas jurídicas distintas.
Fonte oficial: doutrina consolidada de Direito Administrativo (descentralização x desconcentração).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - descentralização e desconcentração administrativa"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=37;

update public.official_exam_questions
set review_note=$q$Correto (opção A). Ato administrativo é a declaração do Estado (ou de quem o represente), que produz efeitos jurídicos imediatos, com observância da lei, sob regime jurídico de direito público, e sujeita a controle pelo Poder Judiciário — definição clássica consolidada na doutrina de Direito Administrativo.
Fonte oficial: doutrina consolidada de Direito Administrativo (conceito de ato administrativo).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - conceito de ato administrativo"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=38;

update public.official_exam_questions
set review_note=$q$Correto (opção C — apenas o item III está certo). Pelo art. 8º da Lei 8.429/1992, os sucessores daquele que causar lesão ao patrimônio público ou se enriquecer ilicitamente estão sujeitos às cominações da lei até o limite do valor da herança (item III correto). O item I está errado: a suspensão dos direitos políticos por improbidade TEM previsão expressa na própria Constituição (art. 37, §4º, CF), não é mera criação da lei ordinária. O item II está errado: atos contra o decoro parlamentar e a dignidade da justiça configuram, respectivamente, infração político-administrativa e desacato/crime contra a administração da justiça — não são, em si, espécies de improbidade administrativa previstas na Lei 8.429/1992.
Fonte oficial: art. 8º, Lei 8.429/1992; art. 37, §4º, CF/1988, planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 8º, Lei 8.429/1992; art. 37, §4º, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/leis/l8429.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=39;

update public.official_exam_questions
set review_note=$q$Correto (opção C — apenas o item III está certo). No exercício do poder de polícia, o Município pode, dentro de sua competência de interesse local, estabelecer horários de funcionamento de estabelecimentos comerciais situados em seu território (item III correto). O item I está errado: o poder de polícia não é exercido exclusivamente por corporações policiais — diversos órgãos administrativos (vigilância sanitária, fiscalização ambiental, de posturas municipais etc.) também o exercem. O item II está errado: o exercício do poder de polícia administrativa, em regra, não depende de autorização judicial prévia.
Fonte oficial: doutrina consolidada de Direito Administrativo (poder de polícia); CF/1988, competência municipal de interesse local.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - poder de polícia; competência municipal de interesse local","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=40;

update public.official_exam_questions
set review_note=$q$Correto (opção A). Licença é o ato administrativo unilateral e vinculado pelo qual a administração pública faculta a quem preencha os requisitos legais o exercício de determinada atividade (ex.: licença para construir, licença para dirigir) — ato vinculado porque, preenchidos os requisitos, a administração não pode negá-la.
Fonte oficial: doutrina consolidada de Direito Administrativo (atos administrativos em espécie — licença).$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"doutrina consolidada - atos administrativos em espécie (licença)"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=41;

update public.official_exam_questions
set review_note=$q$Correto (opção D). O art. 56, §1º, da Lei 8.666/1993 prevê como modalidades de garantia em contratos administrativos a caução em dinheiro ou títulos da dívida pública, o seguro-garantia e a fiança bancária — seguro-garantia e fiança bancária estão entre as modalidades legalmente previstas.
Fonte oficial: art. 56, §1º, Lei 8.666/1993, planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 56, §1º, Lei 8.666/1993","url":"https://www.planalto.gov.br/ccivil_03/leis/l8666cons.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=42;

update public.official_exam_questions
set review_note=$q$Correto (opção D). O STF reconhece que a omissão injustificada da administração pública em prover condições mínimas de dignidade em estabelecimentos prisionais sob sua custódia (como acesso a banho quente) viola o princípio da dignidade da pessoa humana, sendo cabível a imposição judicial de providências corretivas, inclusive contra o argumento genérico da reserva do possível.
Fonte oficial: jurisprudência do STF sobre dignidade da pessoa humana e condições mínimas em estabelecimentos prisionais.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"jurisprudência STF sobre dignidade da pessoa humana em presídios"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=43;

update public.official_exam_questions
set review_note=$q$Correto (opção E). A garantia do desenvolvimento nacional é expressamente um dos objetivos fundamentais da República Federativa do Brasil, elencados no art. 3º, II, da CF/1988 — as demais opções correspondem a outras categorias constitucionais (fundamentos do art. 1º ou princípios das relações internacionais do art. 4º), não a objetivos fundamentais do art. 3º.
Fonte oficial: art. 3º, II, CF/1988, planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 3º, II, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=44;

update public.official_exam_questions
set review_note=$q$Correto (opção B). A intervenção do estado no município é autorizada quando não tiver sido aplicado o percentual mínimo exigido da receita municipal na manutenção e desenvolvimento do ensino, conforme hipótese prevista na Constituição Estadual (com base no modelo do art. 35, III, CF/1988, aplicável à intervenção da União nos estados e, por simetria, dos estados nos municípios).
Fonte oficial: art. 35, III, CF/1988 (por simetria constitucional), planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 35, III, CF/1988 (simetria constitucional)","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=46;

update public.official_exam_questions
set review_note=$q$Correto (opção A). Decretado o estado de defesa ou sua prorrogação, o Presidente da República, dentro de 24 horas, submeterá o ato com a respectiva justificação ao Congresso Nacional, que decidirá por maioria absoluta.
Fonte oficial: art. 136, §4º, CF/1988, planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 136, §4º, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=47;

update public.official_exam_questions
set review_note=$q$Correto (opção C). A criação e o desmembramento de municípios far-se-ão por lei estadual, dentro do período determinado por lei complementar federal, dependendo de consulta prévia, mediante plebiscito, às populações dos municípios envolvidos, após divulgação dos estudos de viabilidade municipal.
Fonte oficial: art. 18, §4º, CF/1988, planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 18, §4º, CF/1988","url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=48;
