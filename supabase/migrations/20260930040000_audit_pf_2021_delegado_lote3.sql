-- Auditoria PF 2021 Delegado de Polícia Federal — lote 3 (24 itens de Direito
-- Penal e Legislação Penal Especial, itens 56-80, todos autossuficientes).
-- Item 75 foi deixado de fora deste lote: seu texto reproduz quase
-- literalmente a Súmula 415 do STJ ("suspensão do processo e do curso do
-- prazo prescricional são efeitos legais da citação por edital..."), que
-- apontaria para Certo, mas o gabarito oficial do PF 2021 marca Errado —
-- divergência real entre a fonte e o gabarito que exige conferência manual
-- do enunciado completo (pode haver um recorte de contexto que altera a
-- análise) antes de qualquer publicação; não resolvida por adivinhação,
-- conforme a política de nunca inventar justificativa quando a fonte não
-- bate com o gabarito.

update public.official_exam_questions
set review_note=$q$Errado. A extorsão (CP, art. 158) é crime formal, mas admite tentativa: embora a consumação não dependa da obtenção da vantagem (basta o constrangimento com o fim de obtê-la), é possível haver fracionamento do iter criminis — por exemplo, quando a carta/mensagem de ameaça com exigência de vantagem é interceptada antes de chegar à vítima.
Exemplo: se o criminoso envia uma carta de extorsão que é interceptada pelos Correios antes de chegar ao destinatário, o constrangimento nunca chegou a ocorrer — isso é uma tentativa, não um crime consumado nem uma conduta impune.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=56;

update public.official_exam_questions
set review_note=$q$Errado. A escolha entre internação em hospital de custódia e tratamento psiquiátrico (medida de segurança) deve considerar a periculosidade do agente — não a gravidade abstrata do delito cometido. O próprio tempo de duração da medida é limitado pelo máximo da pena abstratamente cominada ao delito (Súmula 527, STJ), mas o TIPO de medida aplicada depende de laudo pericial sobre a periculosidade.
Fonte oficial: Súmula 527, STJ.
Exemplo: duas pessoas podem ter cometido o mesmo crime, mas uma pode precisar de internação e outra só de tratamento ambulatorial — depende do grau de periculosidade de cada uma, avaliado por perícia, não da "gravidade" do crime em si.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=57;

update public.official_exam_questions
set review_note=$q$Correto. O art. 117, IV, do Código Penal prevê expressamente que o acórdão confirmatório da condenação interrompe a prescrição, reiniciando a contagem do prazo.
Fonte oficial: art. 117, IV, Código Penal (Decreto-Lei nº 2.848/1940).
Exemplo: se o réu recorre da condenação e o tribunal confirma a sentença, o "relógio" da prescrição começa a contar de novo a partir dessa confirmação, não continua de onde parou.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=58;

update public.official_exam_questions
set review_note=$q$Errado (à época do concurso — 2021). Na jurisprudência vigente quando esta prova foi aplicada, o entendimento dominante do STJ/STF era de que o inadimplemento da pena de multa IMPEDIA a extinção da punibilidade, mesmo já cumprida a pena privativa de liberdade ou restritiva de direitos — então a afirmação "não obsta" estava errada para o padrão da época.
ATUALIZAÇÃO POSTERIOR AO CONCURSO: em 2024, a Terceira Seção do STJ revisou esse entendimento no Tema Repetitivo 931: hoje, para o condenado reconhecido como hipossuficiente, a falta de pagamento da multa NÃO impede mais a extinção da punibilidade (salvo decisão motivada demonstrando capacidade de pagar). Ou seja, a resposta mudou depois deste concurso — mantenha isto em mente para concursos futuros, mas para a prova PF 2021 o gabarito "Errado" reflete corretamente o entendimento da época.
Fonte oficial: STJ, Tema Repetitivo 931 (notícia institucional de 22/03/2024).$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=59;

update public.official_exam_questions
set review_note=$q$Correto. As agravantes genéricas do art. 61 do Código Penal (entre elas, o crime cometido contra idoso) exigem que o agente tenha conhecimento da circunstância agravante no momento da conduta — caso contrário, aplicá-la seria uma forma de responsabilidade penal objetiva, vedada pelo princípio da culpabilidade. Se os autores do furto desconheciam que a vítima era idosa, a agravante não incide.
Exemplo: a agravante não é automática só porque a vítima "é" idosa — o agente precisa saber disso no momento do crime, senão não há como responsabilizá-lo por uma circunstância que ele nem sabia que existia.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=60;

update public.official_exam_questions
set review_note=$q$Errado. Na teoria finalista da ação (Welzel), o dolo é elemento do tipo subjetivo e exige apenas consciência e vontade de realizar a conduta típica. A consciência da ilicitude — e, mais precisamente, a consciência POTENCIAL (não atual) da ilicitude — é elemento da CULPABILIDADE, não do dolo.
Exemplo: uma pessoa pode querer e saber exatamente o que está fazendo (dolo) sem, no momento, estar pensando "isso é proibido" — essa reflexão sobre a proibição é avaliada depois, na culpabilidade, não dentro do próprio dolo.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=61;

update public.official_exam_questions
set review_note=$q$Errado. O crime culposo também exige uma conduta humana voluntária — a diferença para o crime doloso está na ausência de vontade dirigida ao RESULTADO (e não à conduta em si). Se a conduta não for voluntária (por exemplo, em caso de força física irresistível ou ato reflexo), não há sequer conduta penalmente relevante, nem dolosa nem culposa.
Exemplo: dirigir distraído e atropelar alguém é conduta voluntária (a pessoa escolheu dirigir daquele jeito), só não quis o resultado — já um espirro incontrolável que faz a pessoa bater o carro não é nem conduta voluntária, então nem entra na análise de culpa.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=62;

update public.official_exam_questions
set review_note=$q$Correto. Imputabilidade penal é exatamente a capacidade de se atribuir a alguém a responsabilidade por um fato típico e ilícito — pressupõe capacidade de entendimento (saber que o ato é ilícito) e de autodeterminação (conseguir agir conforme esse entendimento).
Exemplo: é a capacidade de "responder" pelos próprios atos perante a lei penal — por isso menores de 18 anos e pessoas com certas doenças mentais graves são consideradas inimputáveis.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=63;

update public.official_exam_questions
set review_note=$q$Errado. A doutrina e a jurisprudência majoritária (inclusive do STJ) admitem a compatibilidade entre dolo eventual e tentativa: o agente pode assumir o risco de produzir o resultado (dolo eventual) e, ainda assim, não consegui-lo por circunstâncias alheias à sua vontade, caracterizando a tentativa.
Exemplo: alguém que atira no meio de uma multidão assumindo o risco de matar alguém (dolo eventual) e erra o alvo, sem atingir ninguém, pode responder por tentativa de homicídio — o fato de o dolo ser "eventual" não impede que o crime fique só na tentativa.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=64;

update public.official_exam_questions
set review_note=$q$Correto. Na "autoria de escritório" (Organisationsherrschaft, teoria de Claus Roxin sobre domínio da organização), tanto quem ordena o crime de dentro de uma estrutura organizada de poder quanto quem efetivamente o executa respondem como autores — o executor não é mero instrumento (como na autoria mediata clássica), pois age com plena consciência e vontade, mas o mandante também domina o fato por controlar a organização.
Exemplo: numa organização criminosa hierarquizada, tanto o chefe que dá a ordem quanto o subordinado que a cumpre são tratados como autores do crime, não um como autor e o outro como mero instrumento sem culpa.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=65;

update public.official_exam_questions
set review_note=$q$Correto. O STF e o STJ equiparam a funcionário público, para fins penais (CP, art. 327, § 1º), quem exerce função delegada do poder público, ainda que em entidade privada — como médicos de hospitais particulares conveniados ao SUS, no exercício dessa função conveniada.
Fonte oficial: art. 327, § 1º, Código Penal; jurisprudência do STF/STJ sobre equiparação funcional.
Exemplo: um médico de hospital particular que atende paciente pelo SUS está, naquele momento, exercendo uma função pública delegada — por isso pode responder por crimes como peculato ou corrupção do mesmo jeito que um servidor público "de carteirinha".$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=66;

update public.official_exam_questions
set review_note=$q$Errado. No peculato DOLOSO (CP, art. 312), o ressarcimento do dano não exclui a punibilidade — ele pode, no máximo, funcionar como atenuante genérica (reparação do dano, CP art. 65, III, "b") se ocorrer antes do julgamento. A extinção da punibilidade pelo ressarcimento só existe expressamente para o PECULATO CULPOSO (CP, art. 312, § 3º), e mesmo assim só se a reparação ocorrer antes da sentença irrecorrível.
Fonte oficial: art. 312, § 3º, Código Penal (contraste entre peculato doloso e culposo).
Exemplo: devolver o dinheiro desviado não "apaga" o crime de peculato doloso — pode ajudar a reduzir a pena, mas o crime continua existindo e sendo punido.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=67;

update public.official_exam_questions
set review_note=$q$Correto. O crime de facilitação de contrabando ou descaminho (CP, art. 318) é crime formal: consuma-se com a própria conduta de facilitar (por exemplo, o funcionário que afrouxa a fiscalização), independentemente de o contrabando ou descaminho chegar a se consumar de fato.
Exemplo: um fiscal que deliberadamente "faz vista grossa" para uma carga irregular já comete esse crime, mesmo que a mercadoria acabe sendo apreendida antes de entrar no país.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=68;

update public.official_exam_questions
set review_note=$q$Correto (posição predominante à época do concurso). Em 2021, a posição majoritária era a de que a fuga do abordado após ordem legal de parada configurava, em regra, crime de desobediência (CP, art. 330), por descumprir ordem legal de agente público no exercício de suas funções.
AVISO IMPORTANTE: este é um tema de jurisprudência dividida e que evoluiu depois desta prova — decisões mais recentes do STJ (2024) entendem que a mera fuga, sem resistência ativa, pode não configurar desobediência, por proteção ao direito de não autoincriminação (nemo tenetur se detegere), especialmente quando o único objetivo é evitar a própria prisão. Para a prova de 2021, o gabarito "Correto" reflete o entendimento então vigente; em provas futuras, vale a pena confirmar a jurisprudência mais atual sobre o tema.
Fonte oficial: jurisprudência do STJ sobre crime de desobediência em contexto de abordagem policial (posição histórica e revisão posterior).$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=69;

update public.official_exam_questions
set review_note=$q$Errado. Diferentemente dos crimes tributários da Lei nº 8.137/1990 (em que o pagamento do tributo antes do recebimento da denúncia extingue a punibilidade), o STJ entende que, no crime de descaminho (CP, art. 334), o pagamento do tributo devido NÃO extingue a punibilidade — porque o bem jurídico protegido não é apenas a arrecadação, mas também a própria atividade de controle aduaneiro e fiscalização de mercadorias pelo Estado.
Fonte oficial: jurisprudência consolidada do STJ sobre a distinção de bens jurídicos entre descaminho e crimes tributários comuns.
Exemplo: pagar o imposto depois de ser pego não "desfaz" o crime de descaminho, porque o problema não foi só deixar de pagar — foi tentar burlar o controle da fronteira.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=70;

update public.official_exam_questions
set review_note=$q$Correto. O crime de moeda falsa (CP, art. 289) tutela a fé pública, um bem jurídico coletivo e indisponível — por isso a jurisprudência do STJ entende que não é compatível com o instituto do arrependimento posterior (CP, art. 16), que pressupõe a reparação do dano a uma vítima certa e determinada, o que não existe nesse tipo de crime.
Exemplo: não há como "devolver" a confiança da sociedade na moeda circulante do mesmo jeito que se devolve um bem roubado a uma vítima específica — por isso esse instituto não se aplica aqui.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=71;

update public.official_exam_questions
set review_note=$q$Errado. A Súmula 522 do STJ é expressa: "A conduta de atribuir-se falsa identidade perante autoridade policial é típica, ainda que em situação de alegada autodefesa." Ou seja, mesmo que o objetivo seja só evitar a própria prisão, usar documento ou identidade falsa configura, sim, o crime de falsa identidade (CP, art. 307) — o direito ao silêncio e à não autoincriminação não chega a autorizar a criação de uma identidade falsa.
Fonte oficial: Súmula 522, STJ.
Exemplo: ficar calado é direito do investigado; já inventar um nome falso ou usar documento de outra pessoa para enganar o policial é crime à parte, não protegido pela autodefesa.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=72;

update public.official_exam_questions
set review_note=$q$Correto. O advogado não tem imunidade irrestrita: se induzir ou instruir uma testemunha a prestar depoimento falso, pode responder como partícipe do crime de falso testemunho (CP, art. 342), já que sua conduta de induzimento vai além do exercício regular da defesa técnica.
Exemplo: orientar a testemunha sobre como se comportar na audiência é normal; instruí-la a mentir sobre fatos é crime, e quem induziu também responde por isso.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=73;

update public.official_exam_questions
set review_note=$q$Correto. Pelo princípio da especialidade, o funcionário público que faz afirmação falsa em procedimento de autorização, licença ou permissão ambiental responde pelo crime específico do art. 68 (ou tipos correlatos) da Lei nº 9.605/1998 (Lei de Crimes Ambientais), e não pela falsidade ideológica genérica do Código Penal (art. 299).
Fonte oficial: Lei nº 9.605/1998 (planalto.gov.br) — tipos penais ambientais específicos.
Exemplo: quando existe uma lei específica tratando exatamente daquela situação (licenciamento ambiental), ela "toma a frente" da regra geral do Código Penal — é a mesma lógica de "lei especial afasta lei geral".$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=74;

update public.official_exam_questions
set review_note=$q$Errado. O requisito legal específico da denúncia por lavagem de dinheiro (Lei nº 9.613/1998, art. 2º, § 1º) é a existência de indícios suficientes da existência do crime ANTECEDENTE — mas a própria lei dispensa a necessidade de que a punibilidade desse crime antecedente não esteja extinta: a lavagem é punível ainda que o autor do crime antecedente seja desconhecido, isento de pena, ou tenha sua punibilidade extinta. Essa é justamente a autonomia do delito de lavagem de dinheiro.
Fonte oficial: art. 2º, § 1º, Lei nº 9.613/1998 (planalto.gov.br).
Exemplo: mesmo que o crime que gerou o dinheiro sujo já esteja "prescrito" ou o autor não possa mais ser punido por ele, isso não impede que outra pessoa seja processada por lavar esse dinheiro.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=76;

update public.official_exam_questions
set review_note=$q$Correto. O art. 15 da Lei nº 12.850/2013 (Lei das Organizações Criminosas) autoriza o delegado de polícia e o Ministério Público a terem acesso, independentemente de autorização judicial, aos dados cadastrais do investigado que informem exclusivamente qualificação pessoal, filiação e endereço, mantidos pela Justiça Eleitoral, empresas telefônicas, instituições financeiras, provedores de internet e administradoras de cartão de crédito.
Fonte oficial: art. 15, Lei nº 12.850/2013 (planalto.gov.br).
Exemplo: saber o endereço e o nome dos pais de um investigado é informação cadastral básica, que a lei permite obter direto dessas instituições, sem precisar pedir autorização prévia ao juiz.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=77;

update public.official_exam_questions
set review_note=$q$Correto. O art. 4º-B da Lei nº 9.613/1998 (Lei de Lavagem de Dinheiro) permite que o juiz, de ofício ou a requerimento do Ministério Público ou da autoridade policial, ouvido o Ministério Público em 24 horas, suspenda o cumprimento de ordem de prisão ou de medidas assecuratórias de bens quando a execução imediata puder comprometer as investigações.
Fonte oficial: art. 4º-B, Lei nº 9.613/1998 (planalto.gov.br).
Exemplo: às vezes é melhor "deixar o peixe nadar" um pouco mais para mapear toda a rede antes de prender ou bloquear bens — essa suspensão temporária serve exatamente para isso, sem perder a possibilidade de agir depois.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=78;

update public.official_exam_questions
set review_note=$q$Errado. A Lei nº 8.072/1990 (Lei dos Crimes Hediondos) e a própria Constituição Federal (art. 5º, XLIII) equiparam a hediondo, para fins de regime mais rigoroso, apenas o tráfico de drogas, o terrorismo e a tortura — a lavagem de dinheiro (Lei nº 9.613/1998) não consta desse rol taxativo.
Fonte oficial: art. 5º, XLIII, CF/1988; art. 1º, Lei nº 8.072/1990 (planalto.gov.br).
Exemplo: lavagem de dinheiro é um crime grave, mas não entra na mesma "categoria especial" (com regras mais duras de progressão de pena, por exemplo) que crimes hediondos e equiparados — são listas diferentes.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=79;

update public.official_exam_questions
set review_note=$q$Errado. O art. 2º, III, da Lei nº 9.296/1996 veda a interceptação telefônica quando o fato investigado constituir infração penal punida, no máximo, com pena de DETENÇÃO. O crime de evasão de divisas por operação de câmbio não autorizada (Lei nº 7.492/1986, art. 22) é punido com RECLUSÃO de 2 a 6 anos — logo, a interceptação não é vedada para esse crime.
Fonte oficial: art. 2º, III, Lei nº 9.296/1996; art. 22, Lei nº 7.492/1986 (planalto.gov.br).
Exemplo: a lei só proíbe grampo para crimes "mais leves" (pena de detenção); evasão de divisas é crime de reclusão, então entra na lista dos crimes para os quais o grampo pode, sim, ser autorizado.$q$
where exam_year=2021 and career_name='Delegado de Polícia Federal' and item_number=80;
