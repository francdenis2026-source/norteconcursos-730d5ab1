-- Explicações do dia a dia: Língua Portuguesa, lote 7 — bloco de Redação
-- Oficial (Manual de Redação da Presidência da República) espalhado por
-- PF 2014 itens 25-30, PF 2018 itens 9-11 e PF 2021 itens 21-24 (todos
-- Agente de Polícia Federal), mais PF 2025 item 9 (já ativo, só faltava
-- a explicação com exemplo) e Feijó 2018/Pedagogo itens 13-15 (texto
-- sobre o filme "Hoje eu quero voltar sozinho" e a Pont des Arts).
--
-- Os itens de Redação Oficial de 2014/2018/2021 estavam com
-- content_status='under_review' desde a importação original (nunca
-- passaram por triagem individual) — como são itens autossuficientes
-- (não dependem de nenhum texto-base compartilhado) e o conteúdo é regra
-- do Manual de Redação da Presidência da República (não é legislação
-- federal sujeita a revogação, então não exige a conferência no
-- Planalto do CONTENT_GOVERNANCE.md), esta migration também promove
-- content_status para 'active' junto com a explicação, depois de
-- reconferir cada regra contra o MRPR e o gabarito oficial CEBRASPE.

-- PF 2014 — item 25: memorando permite despachos sequenciais no próprio documento, com folha de continuação se faltar espaço.
update public.official_exam_questions set content_status='active', review_note=$q$Correto. O memorando é feito pra tramitação rápida e simples: os despachos (respostas, encaminhamentos) vão sendo registrados no próprio documento, sem precisar de um novo ofício a cada resposta. Se o espaço da página acabar, aí sim se usa uma folha de continuação — mas a regra geral é despachar ali mesmo, no memorando original.
Exemplo: é como um bilhete que várias pessoas vão respondendo por baixo, uma embaixo da outra, na mesma folha — só quando a folha lota é que se agrega uma página extra.$q$
where exam_year=2014 and item_number=25 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF 2014 — item 26: comunicação oficial é sempre em nome do serviço público, nunca da pessoa que ocupa o cargo (princípio da impessoalidade).
update public.official_exam_questions set content_status='active', review_note=$q$Errado. Pelo princípio da impessoalidade, que rege toda a redação oficial, as comunicações são SEMPRE feitas em nome do serviço público — nunca em nome da pessoa física que, no momento, ocupa aquele cargo. O item erra ao apresentar as duas opções como válidas ("em nome do serviço público OU da pessoa que ocupa o cargo"): só a primeira é correta.
Exemplo: um ofício assinado pelo diretor de um órgão representa o órgão, não a opinião pessoal daquele diretor — se ele for substituído amanhã, o ofício continua valendo do mesmo jeito, porque fala em nome da instituição, não da pessoa.$q$
where exam_year=2014 and item_number=26 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF 2014 — item 27: padrão ofício reúne ofício, aviso e memorando — "mensagem" tem formato próprio, não segue o padrão ofício.
update public.official_exam_questions set content_status='active', review_note=$q$Errado. O padrão ofício (mesma estrutura e diagramação) é seguido por três expedientes: o ofício, o aviso e o memorando. A "mensagem" é um tipo diferente de comunicação (usada, por exemplo, entre os Poderes) e tem formato próprio, não incluído no padrão ofício — o item erra ao listar "mensagem" como um dos exemplos.
Exemplo: é como dizer que "os documentos no formato A4 são o relatório, o memorando e a planilha" quando na verdade a planilha segue um formato totalmente diferente — colar um item que não pertence ao grupo é o erro clássico desse tipo de questão.$q$
where exam_year=2014 and item_number=27 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF 2014 — item 28: signatário de expediente (exceto o presidente da República) deve ser identificado por nome e cargo.
update public.official_exam_questions set content_status='active', review_note=$q$Correto. Toda comunicação oficial precisa identificar quem assina, com nome e cargo, exatamente pra não deixar dúvida sobre a autoridade responsável — a única exceção é o presidente da República, cuja assinatura dispensa essa identificação abaixo dela, por ser a mais alta autoridade do país.
Exemplo: um e-mail institucional assinado só com "Atenciosamente, João" não deixa claro quem é João nem por que aquilo vale — por isso a regra pede nome completo e cargo, pra qualquer pessoa que assine, menos o presidente.$q$
where exam_year=2014 and item_number=28 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF 2014 — item 29: "Vossa Excelência" é adequado para se dirigir a secretário de segurança pública estadual.
update public.official_exam_questions set content_status='active', review_note=$q$Correto. "Vossa Excelência" é o pronome de tratamento reservado às altas autoridades dos três Poderes — no caso do Executivo, isso inclui ministros de Estado e secretários estaduais, como o secretário de segurança pública de um estado. Usar essa forma pra se dirigir a ele está correto.
Exemplo: assim como se usa "Vossa Excelência" para um governador ou um ministro, o mesmo vale para um secretário de Estado — ambos ocupam cargos de alto escalão do Executivo que recebem esse tratamento.$q$
where exam_year=2014 and item_number=29 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF 2014 — item 30: "Respeitosamente" é reservado a autoridades de hierarquia superior — não serve pra "qualquer expediente, independente de quem envia e recebe".
update public.official_exam_questions set content_status='active', review_note=$q$Errado. O fecho "Respeitosamente" é usado especificamente quando o expediente é dirigido a uma autoridade de hierarquia SUPERIOR à de quem assina. Para autoridades de mesma hierarquia ou de hierarquia inferior, usa-se "Atenciosamente". Ou seja, a escolha do fecho depende, sim, de quem envia e de quem recebe — o item erra ao dizer que ele serve "independentemente" disso.
Exemplo: um servidor escrevendo ao seu superior usa "Respeitosamente"; esse mesmo servidor escrevendo a um colega de mesmo nível usa "Atenciosamente" — o fecho muda conforme a relação hierárquica entre remetente e destinatário.$q$
where exam_year=2014 and item_number=30 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF 2018 — item 9: redação de atos normativos deve ter interpretação clara e única, não "cada cidadão interpreta do seu jeito".
update public.official_exam_questions set content_status='active', review_note=$q$Errado. Um dos objetivos centrais da redação de atos normativos é a clareza e a precisão: o texto deve ser compreendido da mesma forma por qualquer cidadão, evitando múltiplas interpretações. O item inverte esse princípio ao dizer que a redação deve "permitir que cada cidadão atribua sua própria interpretação" — isso é exatamente o que uma boa redação normativa busca evitar.
Exemplo: uma lei que pudesse ser lida de formas diferentes por pessoas diferentes geraria insegurança jurídica — por isso o texto legal busca uma única leitura possível, não múltiplas interpretações pessoais.$q$
where exam_year=2018 and item_number=9 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF 2018 — item 10: o Manual de Redação da Presidência da República rejeita um "burocratês" desconectado da evolução natural da língua.
update public.official_exam_questions set content_status='active', review_note=$q$Correto. O Manual de Redação da Presidência da República (MRPR) estabelece parâmetros pra redação oficial (clareza, formalidade, impessoalidade), mas não defende a criação de um jargão administrativo isolado ("burocratês") desligado de como a língua realmente é usada e evolui. A ideia é seguir a norma culta, não inventar uma linguagem artificial só pra documentos oficiais.
Exemplo: é a diferença entre escrever formalmente mas de um jeito que qualquer pessoa entende, e escrever num "juridiquês" cheio de expressões arcaicas que só quem é da área decifra — o MRPR recomenda o primeiro caminho, não o segundo.$q$
where exam_year=2018 and item_number=10 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF 2018 — item 11: concisão = transmitir o máximo de informação com o mínimo de palavras, sem redundância.
update public.official_exam_questions set content_status='active', review_note=$q$Correto. Concisão, na redação oficial, é exatamente isso: dizer o necessário da forma mais direta possível, cortando palavras e trechos que não acrescentam informação nova — sem virar um texto incompleto, só um texto sem gordura.
Exemplo: trocar "no momento presente em que vivemos atualmente" por simplesmente "atualmente" é aplicar concisão — a mesma informação, sem repetir a mesma ideia três vezes.$q$
where exam_year=2018 and item_number=11 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF 2021 — item 21: no endereçamento (envelope/cabeçalho), usa-se "Sua Excelência" (fala-se SOBRE a pessoa), não "Vossa Excelência" (usado ao falar DIRETAMENTE com ela).
update public.official_exam_questions set review_note=$q$Errado. Existe uma distinção importante entre "Vossa Excelência" e "Sua Excelência": usa-se "Vossa Excelência" quando se fala DIRETAMENTE com a autoridade (no vocativo e no corpo do texto); no endereçamento, porém, que apenas indica QUEM vai receber o documento (fala-se SOBRE a pessoa, não com ela), a forma correta é "A Sua Excelência o Senhor" ou "a Senhora" — não "A Vossa Excelência".
Exemplo: é a diferença entre "Vossa Excelência decidirá" (falando com a autoridade) e "este ofício se destina a Sua Excelência o Ministro" (falando sobre ela, ao identificar o destinatário) — o endereçamento usa a segunda forma.$q$
where exam_year=2021 and item_number=21 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF 2021 — item 22: data em documento oficial não é grafada com números e zero à esquerda (02/04/2021) — deve ser por extenso.
update public.official_exam_questions set review_note=$q$Errado. O Manual de Redação da Presidência da República recomenda grafar a data por extenso, sem zero à esquerda no dia e sem abreviar o mês em números — o certo seria algo como "Brasília, 2 de abril de 2021", não "Brasília, 02/04/2021". O formato totalmente numérico com zero à esquerda não segue esse padrão.
Exemplo: em vez de escrever "05/03/2024" num documento oficial, o correto é escrever "5 de março de 2024" — por extenso e sem zero à esquerda no dia.$q$
where exam_year=2021 and item_number=22 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF 2021 — item 23: foram abolidos os vocativos "Digníssimo" (DD) e "Ilustríssimo" (Ilmo.) nas comunicações oficiais.
update public.official_exam_questions set review_note=$q$Correto. O Manual de Redação da Presidência da República efetivamente aboliu o uso de "Digníssimo" (abreviado DD) para altas autoridades — a lógica é que a dignidade já é pressuposta pelo cargo ocupado, não precisando ser reafirmada — e simplificou o uso de "Ilustríssimo" (Ilmo.), hoje dispensado na maior parte das comunicações oficiais.
Exemplo: hoje em dia se escreve só "Excelentíssimo Senhor Ministro", sem acrescentar "Digníssimo" na frente — essa palavra a mais foi cortada por ser considerada redundante.$q$
where exam_year=2021 and item_number=23 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF 2021 — item 24: o cabeçalho do padrão ofício aparece só na primeira página, não em todas as páginas do documento.
update public.official_exam_questions set review_note=$q$Errado. O cabeçalho do padrão ofício (com o brasão e a identificação do órgão) é usado apenas na PRIMEIRA página do documento, centralizado na área determinada pela formatação — ele não se repete nas páginas seguintes. O item erra ao afirmar que ele deve "constar em todas as páginas".
Exemplo: é como a capa de um relatório, que tem um cabeçalho especial só na primeira folha — as páginas seguintes seguem outro padrão de identificação (numeração, sigla do documento), sem repetir o cabeçalho completo.$q$
where exam_year=2021 and item_number=24 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF 2025 — item 9: redação oficial é sempre impessoal, em nome do serviço público e do interesse geral dos cidadãos.
update public.official_exam_questions set review_note=$q$Correto. A impessoalidade é um dos pilares da redação oficial: o texto trata sempre do interesse público, nunca de interesses pessoais de quem escreve ou de quem lê, e é redigido em nome do serviço público — não em nome de quem ocupa o cargo naquele momento.
Exemplo: um ofício de um órgão público não defende opiniões pessoais do servidor que o assina — ele comunica algo em nome da instituição, pensando no interesse de todos os cidadãos atendidos por ela.$q$
where exam_year=2025 and item_number=9 and career_name='Agente de Polícia Federal' and official_answer='C';

-- Feijó 2018/Pedagogo — item 13: as três afirmações sobre "panfletário" e o verbo "consegue" sem complemento estão corretas.
update public.official_exam_questions set review_note=$q$Correto (alternativa E: todas as afirmativas corretas). "Panfletário" realmente descreve algo feito pra defender uma causa de forma direta/radical (afirmativa I). No contexto, evitar ser panfletário é tratado como qualidade porque foge do previsível — um filme panfletário tende a repetir abordagens mais óbvias e conhecidas sobre o tema (afirmativa II). E o verbo "consegue", encerrando o parágrafo sozinho, sem nenhum complemento, reforça a ideia de que o objetivo (comunicar-se com todo tipo de público) foi plenamente alcançado — um "ponto final" que fecha a ideia com força (afirmativa III).
Exemplo: dizer só "E funcionou." no final de um texto, sem explicar o quê, dá mais força à afirmação do que "E funcionou muito bem para o público-alvo pretendido" — a frase seca e direta reforça a certeza do resultado.$q$
where exam_year=2018 and item_number=13 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='E';

-- Feijó 2018/Pedagogo — item 14: os casais prendiam cadeados na ponte por acreditarem que isso eternizaria o relacionamento.
update public.official_exam_questions set review_note=$q$Correto (alternativa B). Segundo o texto de Marcelo Rubens Paiva sobre os cadeados na Pont des Arts, em Paris, a tradição era prender um cadeado (às vezes jogando a chave no rio) como símbolo de que aquele amor seria eterno, selado ali para sempre — é essa crença popular que motivava o hábito, não os outros motivos listados nas demais alternativas.
Exemplo: é a mesma lógica de gravar iniciais dentro de um coração numa árvore ou banco de praça — um gesto simbólico pra tentar "eternizar" um relacionamento através de um objeto físico.$q$
where exam_year=2018 and item_number=14 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='B';

-- Feijó 2018/Pedagogo — item 15: a opinião contrária do autor aparece em expressões como "aberração urbana" e "ato pretensioso".
update public.official_exam_questions set review_note=$q$Correto (alternativa C). As expressões "aberração urbana" e "ato pretensioso" carregam claramente uma conotação negativa/crítica — é assim que o autor deixa transparecer sua opinião contrária ao hábito de prender cadeados na ponte, diferente das outras alternativas, que trazem expressões neutras ou até elogiosas (como "deslumbrantes" ou "prova de amor").
Exemplo: chamar algo de "aberração" ou de gesto "pretensioso" é um jeito claro de mostrar desaprovação — são palavras de carga negativa, ao contrário de termos neutros como "cadeado de bicicleta".$q$
where exam_year=2018 and item_number=15 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='C';
