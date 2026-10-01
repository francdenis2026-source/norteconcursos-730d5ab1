-- Auditoria PF 2021 Delegado de Polícia Federal — lote 4 (16 itens de
-- Legislação Penal Especial e Direito Processual Penal, itens 81-100,
-- autossuficientes). Itens 86-89 ficaram de fora: dependem do caso
-- hipotético "José" (texto-base não capturado na importação).

update public.official_exam_questions
set review_note=$q$Correto. Os crimes contra o Sistema Financeiro Nacional previstos na Lei nº 7.492/1986 são, em regra, de competência da Justiça Federal, por envolverem interesse direto de órgãos federais de regulação e fiscalização do mercado financeiro (Banco Central, CVM), nos termos do art. 109, VI, da Constituição Federal.
Fonte oficial: art. 109, VI, CF/1988; Lei nº 7.492/1986 (planalto.gov.br).$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=81;

update public.official_exam_questions
set review_note=$q$Correto. A gestão fraudulenta (art. 4º, caput) e a gestão temerária (art. 4º, parágrafo único) de instituição financeira, previstas na Lei nº 7.492/1986, não constam do rol taxativo de crimes inafiançáveis da Constituição Federal (art. 5º, XLII e XLIII: racismo, tortura, tráfico de drogas, terrorismo e crimes hediondos) nem há vedação expressa de fiança na própria Lei nº 7.492/1986 — portanto, são, em princípio, afiançáveis.
Fonte oficial: art. 5º, XLII e XLIII, CF/1988; Lei nº 7.492/1986 (planalto.gov.br).$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=82;

update public.official_exam_questions
set review_note=$q$Correto. Os crimes contra a ordem tributária, econômica e as relações de consumo da Lei nº 8.137/1990 se submetem à regra geral do Código de Processo Penal: ação penal pública incondicionada, não havendo exigência de representação do ofendido para o início da persecução penal.
Fonte oficial: Lei nº 8.137/1990 (planalto.gov.br); regra geral de ação penal pública do CPP.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=83;

update public.official_exam_questions
set review_note=$q$Errado. O STF entende que a Súmula Vinculante nº 24 PODE ser aplicada a fatos anteriores à sua edição: como o enunciado apenas sintetiza jurisprudência que já era dominante na Corte antes de sua formalização, sua aplicação retroativa não configura retroação de norma mais gravosa ao réu — ao contrário, até favorece o acusado, ao condicionar a tipificação do crime tributário material ao lançamento definitivo do tributo.
Fonte oficial: Súmula Vinculante 24, STF; jurisprudência do STF (ex. HC 257.598 AgR) sobre sua aplicação retroativa.
Exemplo: como a regra só confirma o que os tribunais já vinham decidindo, aplicá-la a fatos anteriores não pega ninguém de surpresa nem piora a situação do acusado — por isso pode, sim, ser usada mesmo para fatos de antes de 2009 (ano da súmula).$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=84;

update public.official_exam_questions
set review_note=$q$Errado. O STF já admitiu, em casos concretos, a mitigação (flexibilização) da Súmula Vinculante nº 24 — por exemplo, quando há indícios de fraude destinada a impedir deliberadamente a própria constituição definitiva do crédito tributário, hipótese em que a exigência do lançamento definitivo não pode ser usada como escudo para a prática fraudulenta.
Fonte oficial: jurisprudência do STF sobre "mitigação da SV 24 ante as peculiaridades do caso concreto".
Exemplo: a regra existe para proteger quem está discutindo honestamente o valor do imposto devido — não para proteger quem manipula o sistema propositalmente para nunca deixar o crédito ser definitivamente constituído.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=85;

update public.official_exam_questions
set review_note=$q$Correto. O STF entende que compete à Justiça Federal processar e julgar o crime de redução a condição análoga à de escravo (CP, art. 149), por atingir bens jurídicos ligados à organização do trabalho e a compromissos internacionais de direitos humanos assumidos pelo Brasil, atraindo a competência do art. 109, VI, da CF.
Fonte oficial: STF, RE 459.510 e precedentes de repercussão geral sobre competência para o art. 149 do CP.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=90;

update public.official_exam_questions
set review_note=$q$Errado. Em regra, os crimes ambientais são de competência da Justiça ESTADUAL — a competência só passa para a Justiça Federal quando houver lesão a bens, serviços ou interesse direto e específico da União, suas autarquias ou empresas públicas (por exemplo, dano em unidade de conservação federal ou terra indígena), nos termos do art. 109, IV, da CF.
Fonte oficial: art. 109, IV, CF/1988; jurisprudência consolidada sobre competência em crimes ambientais.
Exemplo: poluir um rio dentro de um parque estadual, em regra, é um caso para a Justiça Estadual — só vai para a Federal se o dano atingir algo sob responsabilidade direta da União, como uma floresta nacional ou terra indígena.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=91;

update public.official_exam_questions
set review_note=$q$Errado. O STJ (Tema 393) firmou que a competência da Justiça Federal para os crimes de pornografia infantil pela internet depende da transnacionalidade/internacionalidade do delito (por exemplo, quando o material é disponibilizado em redes sociais ou sites de acesso público e irrestrito, com potencial alcance internacional). Quando a troca ocorre de forma PRIVADA entre pessoas determinadas (como uma conversa direta por aplicativo de mensagens), sem esse alcance público internacional, a competência é, em regra, da Justiça Estadual.
Fonte oficial: STJ, Tema 393 (RHC 68.903 e precedentes correlatos).
Exemplo: postar esse material num site aberto ao mundo todo atrai a Justiça Federal; já mandar numa conversa privada entre duas pessoas específicas, sem esse alcance público, tende a ficar na Justiça Estadual.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=92;

update public.official_exam_questions
set review_note=$q$Correto. O art. 158 do CPP é expresso: quando a infração deixar vestígios (crime não transeunte), será indispensável o exame de corpo de delito, direto ou indireto, não podendo a confissão do acusado suprir essa prova técnica.
Fonte oficial: art. 158, CPP (planalto.gov.br).
Exemplo: mesmo que o suspeito confesse um homicídio, ainda é preciso o laudo pericial comprovando a causa da morte — a confissão sozinha não substitui a prova técnica quando ela é fisicamente possível de ser produzida.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=93;

update public.official_exam_questions
set review_note=$q$Correto. O art. 159, § 1º, do CPP prevê que, na falta de perito oficial, o exame poderá ser realizado por duas pessoas idôneas, portadoras de diploma de curso superior, preferencialmente com habilitação técnica relacionada à natureza do exame.
Fonte oficial: art. 159, § 1º, CPP (planalto.gov.br).$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=94;

update public.official_exam_questions
set review_note=$q$Correto. O art. 226, I, do CPP determina que, no reconhecimento de pessoas, aquele que tiver de fazer o reconhecimento será convidado a descrever a pessoa que deva ser reconhecida, e a pessoa a ser reconhecida será colocada, se possível, ao lado de outras que com ela tenham qualquer semelhança, convidando-se quem tiver de fazer o reconhecimento a apontá-la.
Fonte oficial: art. 226, I, CPP (planalto.gov.br).$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=95;

update public.official_exam_questions
set review_note=$q$Errado. O indeferimento de oitiva de testemunhas/vítimas arroladas pela defesa não gera nulidade automática: o art. 400, § 1º, do CPP autoriza o juiz a indeferir, de forma fundamentada, as provas consideradas irrelevantes, impertinentes ou protelatórias. A nulidade processual, em regra, depende da demonstração de efetivo prejuízo (princípio pas de nullité sans grief), não sendo absoluta e automática como o item afirma.
Fonte oficial: art. 400, § 1º, CPP (planalto.gov.br).
Exemplo: o juiz pode, sim, recusar ouvir uma testemunha se a defesa não explicar por que aquele depoimento é relevante para o caso — isso não anula o processo automaticamente, só seria nulo se ficasse provado que isso prejudicou a defesa.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=96;

update public.official_exam_questions
set review_note=$q$Correto (posição predominante à época do concurso). Em 2021, prevalecia o entendimento de que o mandado judicial de busca e apreensão domiciliar, ao autorizar a apreensão de aparelhos eletrônicos dentro do imóvel, também abrangia o acesso aos dados neles armazenados, salvo decisão judicial que limitasse expressamente esse alcance.
AVISO IMPORTANTE: esse entendimento evoluiu depois desta prova. Decisões mais recentes do STF e do STJ (2025/2026) têm exigido autorização judicial ESPECÍFICA para a quebra do sigilo dos dados armazenados no celular, tratando o acesso aos dados como algo distinto (e mais protegido) do que a simples apreensão física do aparelho durante a busca domiciliar — a apreensão do celular não exige ordem judicial própria, mas o acesso aos seus dados, em regra, exige consentimento do titular ou decisão judicial específica. Para a prova de 2021, mantenha o gabarito "Correto"; em provas mais recentes, verifique a jurisprudência atualizada sobre o tema, que está mais restritiva.
Fonte oficial: jurisprudência do STF/STJ sobre acesso a dados de celulares apreendidos (evolução 2021-2026).$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=97;

update public.official_exam_questions
set review_note=$q$Errado. O art. 50, § 1º, da Lei nº 11.343/2006 (Lei de Drogas) dispõe expressamente que o perito que subscrever o laudo de constatação provisório NÃO fica impedido de participar da elaboração do laudo definitivo de identificação da droga.
Fonte oficial: art. 50, § 1º, Lei nº 11.343/2006 (planalto.gov.br).$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=98;

update public.official_exam_questions
set review_note=$q$Correto. O art. 8º, § 1º, da Lei nº 12.850/2013 exige apenas a prévia COMUNICAÇÃO ao juiz competente (que pode estabelecer limites e deve comunicar ao Ministério Público) para o retardamento da intervenção policial na ação controlada — a lei não exige autorização judicial formal antecipada nem parecer prévio do Ministério Público como condição para a ação controlada.
Fonte oficial: art. 8º, § 1º, Lei nº 12.850/2013 (planalto.gov.br).
Exemplo: a polícia avisa o juiz que vai "deixar rolar" um pouco mais a investigação antes de agir, mas não precisa esperar uma autorização formal nem um parecer do MP para isso — só precisa comunicar com antecedência.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=99;

update public.official_exam_questions
set review_note=$q$Correto. O STF reconhece, em sua jurisprudência sobre o direito ao silêncio e à não autoincriminação (nemo tenetur se detegere), que a "entrevista" informal conduzida pela autoridade policial durante o cumprimento de mandado de busca e apreensão — sem a prévia comunicação do direito de permanecer calado — viola as garantias constitucionais do preso/investigado (CF, art. 5º, LXIII), por configurar um interrogatório informal disfarçado, sem as salvaguardas do direito de defesa.
Fonte oficial: jurisprudência do STF sobre direito ao silêncio e confissão informal colhida durante cumprimento de mandado de busca e apreensão.
Exemplo: perguntar "informalmente" ao morador durante a busca "então, você admite que é seu?" sem antes avisar que ele tem direito de ficar calado é, na prática, um interrogatório disfarçado — e isso fere a garantia constitucional do direito ao silêncio.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=100;
