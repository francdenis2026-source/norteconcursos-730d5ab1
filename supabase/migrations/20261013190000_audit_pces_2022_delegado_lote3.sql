-- Auditoria PC-ES 2022 Delegado de Polícia — lote 3 (9 itens de Direitos
-- Humanos e Direito Civil). Itens 63-80 (Medicina Legal, Criminologia,
-- Legislação Penal Especial) ficam de fora desta rodada por exigirem
-- verificação contra literatura técnica forense especializada que não
-- consegui confirmar com segurança. Itens 56 e 60 já estão anulados.

update public.official_exam_questions
set review_note=$q$Correto (opção C). O parágrafo único, II, da Lei 13.060/2014 dispõe que não é legítimo o uso de arma de fogo contra veículo que desrespeite bloqueio policial em via pública, exceto quando o ato represente risco de morte ou lesão aos agentes de segurança pública ou a terceiros — o que a opção C restitui corretamente, por exceção. As demais opções distorcem o texto legal: o art. 2º só permite priorizar instrumentos de menor potencial ofensivo quando o uso NÃO colocar em risco a integridade dos policiais (não "mesmo que" ponha em risco, como diz a opção A); o parágrafo único, I, veda o uso de arma de fogo contra pessoa em fuga DESARMADA (não "armada", como diz a opção B); o art. 6º exige a comunicação do ocorrido à família, mesmo havendo assistência médica (opção D distorce); e o art. 4º fala em "baixa probabilidade" de causar mortes ou lesões permanentes, sem mencionar "média probabilidade" (opção E acrescenta termo inexistente na lei).
Fonte oficial: art. 2º, parágrafo único, II, e art. 4º e 6º, Lei 13.060/2014, planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 2º, parágrafo único, II; arts. 4º e 6º, Lei 13.060/2014","url":"https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13060.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=52;

update public.official_exam_questions
set review_note=$q$Correto (opção A). A doutrina que interpreta a Convenção contra a Tortura (Decreto 40/1991) identifica quatro elementos definidores do conceito de tortura: a natureza do ato (sofrimento físico/mental agudo), o dolo do agente, a finalidade específica (obter informação/confissão, punir, intimidar, discriminar) e o envolvimento direto ou indireto de agente público — critério consolidado na literatura de Direitos Humanos sobre o art. 1º da Convenção.
Fonte oficial: art. 1º, Convenção contra a Tortura (Decreto 40/1991); doutrina de Direitos Humanos.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"art. 1º, Convenção contra a Tortura (Decreto 40/1991); doutrina","url":"https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0040.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=53;

update public.official_exam_questions
set review_note=$q$Correto (opção E). A jurisprudência da Corte Interamericana de Direitos Humanos (desde o caso Velásquez Rodríguez vs. Honduras) consolidou que, a partir da notitia criminis, as autoridades estatais (incluindo as policiais) devem iniciar, de ofício e sem demora, uma investigação séria, imparcial e efetiva por todos os meios legais disponíveis, como desdobramento do dever de garantia dos direitos humanos.
Fonte oficial: jurisprudência da Corte IDH (caso Velásquez Rodríguez vs. Honduras e subsequentes) sobre o dever de investigar.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"jurisprudência da Corte IDH sobre o dever de investigar (caso Velásquez Rodríguez)"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=54;

update public.official_exam_questions
set review_note=$q$Correto (opção D). A Convenção Americana de Direitos Humanos prevê, em seus arts. 76 e 77, uma cláusula de abertura que permite a inclusão de outros direitos e liberdades por meio de emendas propostas pelos Estados-partes ou protocolos adicionais (como o Protocolo de San Salvador, sobre direitos econômicos, sociais e culturais).
Fonte oficial: arts. 76-77, Convenção Americana de Direitos Humanos (Decreto 678/1992), planalto.gov.br.$q$,
    legal_audit_completed=true, current_syllabus_topic_id=syllabus_topic_id, law_version_checked_at=now(),
    legal_basis='[{"fonte":"arts. 76-77, CADH (Decreto 678/1992)","url":"https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm"}]'::jsonb
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=55;

update public.official_exam_questions
set review_note=$q$Correto (opção D). Pelo art. 200 do Código Civil, quando a ação cível se originar de fato que deva ser apurado no juízo criminal, não corre a prescrição antes da respectiva sentença penal definitiva — no caso, a sentença penal transitou em julgado em janeiro/2021, marco inicial do prazo prescricional de 3 anos para a reparação civil do dano (art. 206, §3º, V, CC), que se encerra em janeiro/2024.
Fonte oficial: art. 200 c/c art. 206, §3º, V, Código Civil (Lei 10.406/2002), planalto.gov.br.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=57;

update public.official_exam_questions
set review_note=$q$Correto (opção B). Pelo art. 256 do Código Civil, se, nas obrigações alternativas, todas as prestações se tornarem impossíveis sem culpa do devedor, extinguir-se-á a obrigação. As demais opções contrariam o Código: a escolha cabe ao devedor, salvo estipulação em contrário (art. 252); em prestações periódicas, a opção pode ser exercida em cada período, não apenas na primeira (art. 253); o devedor não pode obrigar o credor a receber parte em uma prestação e parte em outra (art. 252, §1º); havendo pluralidade de credores sem unanimidade, decide-se por sorteio, não pelo juiz (art. 252, §3º).
Fonte oficial: arts. 252-256, Código Civil (Lei 10.406/2002), planalto.gov.br.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=58;

update public.official_exam_questions
set review_note=$q$Correto (opção E). Pelo art. 138 do Código Civil, são anuláveis os negócios jurídicos cujas declarações de vontade emanarem de erro substancial que poderia ser percebido por pessoa de diligência normal, em face das circunstâncias do negócio. As demais opções contrariam o Código: a manifestação de vontade com reserva mental SUBSISTE, salvo se o destinatário dela tinha conhecimento (art. 110); são três (não dois) os requisitos de validade — agente capaz, objeto lícito/possível/determinado e forma prescrita ou não defesa em lei (art. 104); a confirmação deve conter a substância do negócio (art. 144); a invalidade do instrumento não induz a do negócio jurídico, quando este puder provar-se por outro meio (art. 183).
Fonte oficial: arts. 104, 110, 138, 144 e 183, Código Civil (Lei 10.406/2002), planalto.gov.br.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=59;

update public.official_exam_questions
set review_note=$q$Correto (opção B). Pelo art. 167 do Código Civil, é nulo o negócio jurídico simulado. As demais hipóteses listadas (agente relativamente incapaz, estado de perigo, lesão, dolo) configuram causas de ANULABILIDADE (art. 171, I e II; art. 156; art. 157), não de nulidade absoluta.
Fonte oficial: arts. 156, 157, 167 e 171, Código Civil (Lei 10.406/2002), planalto.gov.br.$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=61;

update public.official_exam_questions
set review_note=$q$Correto (opção C). O STJ firmou entendimento no sentido de ser admissível a exclusão administrativa (perante o cartório de registro civil, sem necessidade de ação judicial) do prenome da criança quando o pai informou nome diferente do previamente combinado com a mãe, por violação ao dever de lealdade familiar e à boa-fé objetiva.
Fonte oficial: jurisprudência do STJ (informativo de jurisprudência sobre exclusão de prenome por violação à boa-fé objetiva no registro civil).$q$
where exam_year=2022 and career_name='Delegado de Polícia' and contest_name='Polícia Civil do Estado do Espírito Santo' and item_number=62;
