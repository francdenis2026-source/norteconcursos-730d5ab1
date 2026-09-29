-- Explicações do dia a dia: Língua Portuguesa, lote 4 — PF 2018 (itens
-- 23-24, fim do texto "A Carta Roubada") e Feijó 2018/Professor-Pedagogo
-- (itens 1-12: Clarice Lispector, crônica de Jairo Marques, Antonio
-- Prata, Manoel de Barros, Esopo, Guilherme de Almeida). Gabarito destes
-- últimos já conferido contra o PDF oficial da Fundape em migration
-- anterior (20260927320000).

-- 23: as duas orações separadas por ponto e vírgula são independentes e completas — podem virar duas frases separadas por ponto final.
update public.official_exam_questions set review_note=$q$Correto. "Como poeta e matemático, raciocinaria bem" e "como mero matemático, não raciocinaria de modo algum" são duas ideias completas e independentes, ligadas por um ponto e vírgula pra mostrar contraste. Como as duas se sustentam sozinhas, dá pra separá-las em duas frases com ponto final, só ajustando a primeira letra da segunda pra maiúscula.
Exemplo: "Ele estudou muito; ela nem abriu o livro" pode virar "Ele estudou muito. Ela nem abriu o livro." — o ponto e vírgula aqui só marca uma pausa mais fraca entre duas frases que já são completas sozinhas.$q$
where exam_year=2018 and item_number=23 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 24: a vírgula antes de "e" ligando duas orações de mesmo sujeito é estilística/opcional — removê-la não quebra a gramática.
update public.official_exam_questions set review_note=$q$Correto. A vírgula antes do "e" que liga "não raciocinaria de modo algum" e "ficaria, assim, à mercê do delegado" é uma escolha de estilo (dar uma pausa antes de emendar a segunda ideia), não uma exigência gramatical — as duas orações têm o mesmo sujeito subentendido, e retirar essa vírgula mantém a frase perfeitamente correta.
Exemplo: "Ele correu bastante e chegou cansado" e "Ele correu bastante, e chegou cansado" são as duas versões aceitas — a vírgula aqui é opcional, uma questão de ritmo de leitura.$q$
where exam_year=2018 and item_number=24 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 1 (Feijó): "bordadíssima" termina em -íssima, sufixo clássico de superlativo absoluto SINTÉTICO (uma palavra só, sem precisar de "muito").
update public.official_exam_questions set review_note=$q$Correto. O sufixo "-íssimo/a" é a marca clássica do superlativo absoluto sintético — uma forma de dizer "extremamente bordada" numa palavra só, sem precisar do advérbio "muito" na frente (que seria a forma analítica: "muito bordada"). "Bordadíssima" é exatamente esse tipo de superlativo.
Exemplo: "lindíssima" (numa palavra) é sintético; "muito linda" (duas palavras) é analítico — os dois significam a mesma intensidade, só a estrutura muda.$q$
where exam_year=2018 and item_number=1 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='B';

-- 2: "magno" (grandioso, solene) pode ser trocado por "grandioso" sem perder o sentido.
update public.official_exam_questions set review_note=$q$Correto. "Magno" significa grande, solene, importante — "grandioso" carrega exatamente essa mesma ideia de grandeza e importância, então a substituição não muda o sentido da frase.
Exemplo: "o magno evento da faculdade" e "o grandioso evento da faculdade" comunicam a mesma solenidade — são praticamente sinônimos nesse contexto.$q$
where exam_year=2018 and item_number=2 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='C';

-- 3: "éramos" = pretérito imperfeito do indicativo; "bastasse" = pretérito imperfeito do subjuntivo (comum na expressão "como se não bastasse").
update public.official_exam_questions set review_note=$q$Correto. "Éramos" descreve uma característica contínua no passado (pretérito imperfeito do indicativo — "nós éramos assim"). "Bastasse" vem depois de "como se", uma expressão que sempre pede o subjuntivo — e no passado, esse é o pretérito imperfeito do subjuntivo.
Exemplo: "eu cantava" (imperfeito do indicativo, uma ação contínua no passado) e "como se eu cantasse" (imperfeito do subjuntivo, uma hipótese no passado) — mesma raiz verbal, modos diferentes.$q$
where exam_year=2018 and item_number=3 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='A';

-- 4: texto de jornal com reflexão pessoal/opinativa sobre a vida (Jairo Marques, Folha de S.Paulo) é uma CRÔNICA — gênero típico de jornal, curto e reflexivo.
update public.official_exam_questions set review_note=$q$Correto. Crônica é justamente esse tipo de texto: curto, publicado em jornal ou revista, que parte de um fato cotidiano (aqui, o aniversário do autor e a notícia da morte de uma jovem) pra fazer uma reflexão mais pessoal sobre a vida. Não é conto (ficção estruturada), nem poesia, nem diário íntimo — é um gênero típico do jornalismo literário.
Exemplo: os textos de opinião que fecham cadernos de jornal, misturando um fato do dia a dia com uma reflexão mais filosófica, são exemplos clássicos de crônica.$q$
where exam_year=2018 and item_number=4 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='D';

-- 5: o motivo da reflexão foi saber da morte de uma jovem americana vítima de doença grave, que coincidiu com o aniversário do autor.
update public.official_exam_questions set review_note=$q$Correto. O texto liga a reflexão do autor sobre a própria vida (no dia do aniversário dele) ao fato de saber que uma jovem americana, mais nova que ele, tinha morrido de uma doença grave naquele mesmo dia — foi esse contraste entre vidas que motivou a crônica.
Exemplo: saber que alguém mais jovem enfrentou uma perda grave no mesmo dia do seu aniversário é o tipo de coincidência que naturalmente puxa uma reflexão sobre a própria vida — exatamente o gatilho que o texto descreve.$q$
where exam_year=2018 and item_number=5 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='E';

-- 6: "amado" é particípio de "amar" usado como adjetivo — diferente dos demais, que são adjetivos "primários" (não vêm de um verbo dessa forma).
update public.official_exam_questions set review_note=$q$Correto. "Amado" vem do verbo "amar" (particípio empregado como adjetivo — "o filho QUE FOI amado"); as outras palavras destacadas (avassalador, profundas, molhada, escandaloso) são adjetivos que não seguem esse mesmo padrão de derivação direta de um particípio verbal tão evidente. É essa origem diferente que torna "amado" o item fora do padrão dos demais.
Exemplo: "um copo quebrado" (particípio de "quebrar" virando adjetivo) tem uma origem gramatical diferente de "um copo bonito" (adjetivo "puro", sem vir de um verbo) — mesmo os dois funcionando como adjetivo na frase.$q$
where exam_year=2018 and item_number=6 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='A';

-- 7: apenas I e III estão incorretas — a crônica de Antonio Prata usa observação cotidiana com toque inusitado (II certa) e o pedestre desperta alteridade no narrador (IV certa), mas a linguagem NÃO é composta só de frases curtas/simples com trechos "adversos à fala cotidiana" — essa descrição se contradiz.
update public.official_exam_questions set review_note=$q$Correto. A crônica realmente traz aspectos típicos do gênero, com uma visão inusitada de uma cena comum (item II correto) e o pedestre observado desperta no narrador a reflexão sobre a alteridade (item IV correto). Já o item III se contradiz: dizer que a linguagem é "curta e simples" mas ao mesmo tempo tem "expressões adversas à fala cotidiana" mistura duas ideias que não combinam — e o item I erra ao descrever o tipo de narrador, já que boa parte das crônicas de Prata usa a primeira pessoa, não a terceira.
Exemplo: dizer que um texto usa "vocabulário simples, mas cheio de palavras difíceis" é uma contradição interna — não dá pra ser as duas coisas ao mesmo tempo, é esse tipo de erro que o item III comete.$q$
where exam_year=2018 and item_number=7 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='C';

-- 8: os pronomes destacados na frase (eu, sua, eu/você, sua tia avó) classificam-se como pessoal, possessivo, possessivo e pessoal de tratamento, respectivamente.
update public.official_exam_questions set review_note=$q$Correto. Na frase, aparecem pronomes de tipos diferentes: pronome pessoal (referindo-se diretamente a pessoas, como "eu"), pronome possessivo (indicando posse, como "sua"), e pronome de tratamento (formas indiretas de se referir a alguém, como em expressões de cortesia). Reconhecer cada tipo depende de identificar a função de cada palavra na frase.
Exemplo: "eu" aponta diretamente pra pessoa que fala (pessoal); "sua casa" indica posse (possessivo); "Vossa Senhoria" seria de tratamento — são categorias diferentes de pronome, cada uma com sua função própria.$q$
where exam_year=2018 and item_number=8 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='A';

-- 9: Manoel de Barros é conhecido por unir sinestesia (misturar sentidos, como "cor quente") e paradoxo (ideias aparentemente contraditórias que fazem sentido juntas) em sua poesia.
update public.official_exam_questions set review_note=$q$Correto. Manoel de Barros é famoso por essas duas figuras de linguagem: sinestesia (misturar sentidos diferentes numa mesma imagem, tipo "um silêncio verde") e paradoxo (juntar ideias que parecem se contradizer, mas revelam um sentido poético mais profundo). Os versos citados exploram exatamente esse estilo característico do autor.
Exemplo: dizer que algo tem "um cheiro azul" mistura olfato e visão (sinestesia); dizer "ele encontrou a palavra no silêncio dela" une conceitos opostos de um jeito que faz sentido poético (paradoxo) — a marca registrada da poesia de Manoel de Barros.$q$
where exam_year=2018 and item_number=9 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='B';

-- 10: todas as afirmações sobre a "despalavra" e o "antesmente" no poema de Manoel de Barros são verdadeiras — tema central e conhecido da obra do autor.
update public.official_exam_questions set review_note=$q$Correto. Manoel de Barros tem um projeto poético conhecido de buscar uma "palavra original", anterior à própria linguagem — a "despalavra" — algo paradoxal por definição (buscar uma palavra que não é palavra). O "antesmente" reforça essa ideia de origem, de "antes de tudo", que é justamente o que o eu lírico persegue nesse poema. As quatro afirmações descrevem corretamente esse projeto poético.
Exemplo: é como buscar "o silêncio antes da primeira palavra que alguém já disse" — uma busca por algo anterior à própria linguagem, o coração da poesia de Manoel de Barros.$q$
where exam_year=2018 and item_number=10 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='E';

-- 11: "uns – outros – outros ainda" são expressões usadas pra retomar "animal" sem repetir a palavra — recurso clássico de coesão textual.
update public.official_exam_questions set review_note=$q$Correto. Em vez de repetir "animal" várias vezes, o texto usa "uns", "outros" e "outros ainda" pra ir se referindo aos diferentes animais mencionados, evitando repetição e deixando o texto mais fluido — um recurso clássico de coesão textual.
Exemplo: "alguns alunos foram ao museu, outros ficaram na escola, e outros ainda preferiram faltar" — usar "outros" evita repetir "alunos" toda vez, mantendo a referência clara.$q$
where exam_year=2018 and item_number=11 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='B';

-- 12: o haicai é de origem JAPONESA, não americana — esse é o único item falso entre os três.
update public.official_exam_questions set review_note=$q$Correto. O texto é mesmo um haicai de um poeta brasileiro (verdadeiro), e a coerência de um haicai realmente depende do leitor integrar elementos aparentemente soltos, ligado ao gênero (verdadeiro) — mas o haicai é uma forma poética de origem JAPONESA, não americana (falso). É esse último erro que define a sequência V, V, F.
Exemplo: confundir a origem do haicai com "americana" é como dizer que o samba é uma dança europeia — o gênero tem uma origem cultural bem definida (Japão, no caso do haicai), que não pode ser trocada.$q$
where exam_year=2018 and item_number=12 and career_name='Professor - Licenciatura Plena - Pedagogo' and official_answer='D';
