-- Explicações do dia a dia: Língua Portuguesa, lote 5 — PF 2021 (Agente),
-- Texto 2A1-I (Antônio Maria, "Com vocês, Antônio Maria", itens 1-8) e
-- início do Texto 2A1-II (Zygmunt Bauman, "Globalização: as consequências
-- humanas", itens 9-11).
--
-- Gabarito reconferido em 29/09/2026 item a item: análise gramatical
-- própria, cruzada com o gabarito extraoficial de fontes públicas (PF
-- 2021 Agente, CEBRASPE) para os itens 1-7 (conteúdo do texto de Antônio
-- Maria recuperado numa correção anterior, 20260927390000, cujo
-- official_answer nunca tinha sido reconferido contra o novo texto).
-- Os 11 itens conferem exatamente com o official_answer já gravado no
-- banco — nenhuma correção de gabarito foi necessária desta vez.

-- 1: a nostalgia das cartas só aparece no último parágrafo (não "ao longo de toda a narrativa") e o texto nunca diz que era a "primeira paixão" da personagem.
update public.official_exam_questions set review_note=$q$Errado. A nostalgia ligada às cartas de amor só aparece no último parágrafo do texto — nos dois primeiros parágrafos a personagem fala da casa e da mudança sem qualquer saudade desse tipo, então não é algo presente "ao longo de toda a narrativa". Além disso, o texto nunca afirma que esse amor das cartas era a "primeira paixão" da personagem: é só uma relação do passado, sem essa informação específica.
Exemplo: dizer que "o texto mostra, desde a primeira linha, a tristeza pela perda do emprego" quando essa tristeza só aparece no último parágrafo é o mesmo tipo de erro — generalizar para o texto inteiro algo que só acontece numa parte dele.$q$
where exam_year=2021 and item_number=1 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 2: "até" no sentido de "inclusive" é um advérbio que pode mudar de posição na frase sem alterar o sentido.
update public.official_exam_questions set review_note=$q$Correto. "Até" no sentido de "inclusive/mesmo" é um advérbio que costuma circular livremente na frase sem mudar o sentido nem quebrar a gramática. Em "Ia-se embora, com alegria até", o "até" reforça que havia alegria (era inesperado, mas havia até alegria) — deslocando para "até com alegria", no início do trecho, essa ideia de inclusão se mantém.
Exemplo: "Todos vieram, até o chefe" e "Até o chefe veio" comunicam a mesma ideia de inclusão surpreendente — o "até" pode migrar de posição sem alterar o sentido.$q$
where exam_year=2021 and item_number=2 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 3: "ali" retoma "aquela gaveta" (referente mais próximo), não "aquela casa" (citada bem antes, no início do texto).
update public.official_exam_questions set review_note=$q$Errado. "Ali" aparece em "Cinco ou seis cartas guardadas ali", logo depois de "Tinha de desocupar aquela gaveta" — o referente mais próximo e coerente é a gaveta, não a casa, que foi mencionada bem antes, lá no início do texto.
Exemplo: em "Ele abriu o armário e viu os sapatos guardados ali", "ali" remete ao armário (o lugar citado por perto), não a um cômodo mencionado várias frases atrás.$q$
where exam_year=2021 and item_number=3 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 4: "Claro, arejado" descrevem o apartamento novo (contraste com a casa escura), não o "navio".
update public.official_exam_questions set review_note=$q$Errado. "Claro" e "arejado" descrevem as características do outro apartamento — claro e arejado, em contraste com a casa escura e cheirando a comida do início do texto —, não o navio, que é apenas algo que talvez aparecesse na janela algum dia.
Exemplo: em "a casa nova tinha jardim e piscina. Ampla, iluminada", os adjetivos finais retomam a casa, não a piscina citada logo antes.$q$
where exam_year=2021 and item_number=4 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 5: mudar "ao mesmo tempo" de posição muda o que está sendo simultâneo — a reescrita altera o sentido original.
update public.official_exam_questions set review_note=$q$Errado. No texto original, "ao mesmo tempo" mostra que toda a vizinhança começava a fazer bife simultaneamente. Na reescrita proposta, a expressão foi deslocada para o fim da frase, passando a se referir (ou a ficar ambígua) à ação do ar cheirando a cebola e alho — isso muda o que estava sendo simultâneo, alterando o sentido original.
Exemplo: "todos gritaram, ao mesmo tempo, o nome dele" (o grito foi simultâneo) é diferente de "todos gritaram o nome dele e saíram ao mesmo tempo" (a simultaneidade passa a valer para outra ação) — só mudando a posição, o sentido já muda.$q$
where exam_year=2021 and item_number=5 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 6: "lhe" é complemento indireto de "mostrasse" e retoma a personagem sem repetir o nome — coesão textual.
update public.official_exam_questions set review_note=$q$Correto. "Lhe" retoma a personagem (a quem o navio "mostraria" algo) e funciona como complemento indireto do verbo "mostrasse". Ao retomar a personagem sem repetir o nome dela, "lhe" também cria coesão no texto, evitando repetição desnecessária.
Exemplo: "Dei o livro a ela. Emprestei-lhe também a caneta" — "lhe" é o complemento indireto que evita repetir "a ela", mantendo o texto coeso.$q$
where exam_year=2021 and item_number=6 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 7: "tinha" aparece com sentidos diferentes nas duas ocorrências: posse/existência na primeira, obrigação na segunda.
update public.official_exam_questions set review_note=$q$Errado. Em "Mas tinha a gaveta", "tinha" tem sentido de existência/posse (equivale a "havia a gaveta"). Já em "Tinha de desocupar aquela gaveta", "tinha de" é uma locução verbal de obrigação (equivale a "precisava desocupar"). São sentidos diferentes, mesmo repetindo a mesma forma verbal duas vezes seguidas.
Exemplo: "Ele tinha um carro" (posse) e "Ele tinha de sair cedo" (obrigação) usam o mesmo verbo "ter", mas com sentidos completamente diferentes.$q$
where exam_year=2021 and item_number=7 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 8: em "Cabia tudo em uma mala só", o verbo concorda com "tudo" — sujeito posposto ao verbo.
update public.official_exam_questions set review_note=$q$Correto. Na oração "Cabia tudo em uma mala só", o verbo "cabia" concorda com "tudo": perguntando "o que cabia?", a resposta é "tudo cabia" — ou seja, "tudo" é o sujeito, só que posposto (depois) do verbo, em vez de antes dele.
Exemplo: em "Sobrou pouco", "pouco" é sujeito de "sobrou", mesmo vindo depois do verbo — a ordem sujeito-verbo pode se inverter sem deixar de ser sujeito.$q$
where exam_year=2021 and item_number=8 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 9: o item resume fielmente a conclusão do texto de Bauman sobre o encarceramento como fenômeno universal apoiado pela opinião pública.
update public.official_exam_questions set review_note=$q$Correto. O texto diz que, apesar das diferenças culturais e históricas entre os países na forma de aplicar penas, o crescimento do encarceramento é "um fenômeno universal" nas regiões "mais desenvolvidas" do mundo, e que a ideia de disciplinar grupos populacionais "goza de amplo apoio na opinião pública" — exatamente o que o item resume, sem acrescentar nada que o texto não diga.
Exemplo: resumir um texto que fala em "aumento nas vendas em quase todo o mundo, apesar das diferenças econômicas de cada país" como "um crescimento praticamente universal, apoiado pelo público" é uma síntese fiel do que já está escrito.$q$
where exam_year=2021 and item_number=9 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 10: "em quase todos os países" é um adjunto intercalado isolado por duas vírgulas — suprimir só uma delas quebra a correção gramatical.
update public.official_exam_questions set review_note=$q$Errado. "Em quase todos os países" é um adjunto adverbial intercalado no meio da frase, isolado por DUAS vírgulas (uma antes e outra depois). Suprimir só a primeira vírgula, mantendo a segunda, quebra a simetria da pontuação — as duas vírgulas de um trecho intercalado precisam ficar juntas ou sair juntas, nunca só uma delas.
Exemplo: em "Ele chegou, sem pressa, ao trabalho", tirar só a vírgula antes de "sem pressa" e deixar a de depois deixa a frase gramaticalmente incorreta — o par de vírgulas que isola a expressão intercalada tem que ser respeitado como um par.$q$
where exam_year=2021 and item_number=10 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 11: "se ampliando" é verbo pronominal (o "se" é parte do próprio verbo "ampliar-se"), não partícula apassivadora.
update public.official_exam_questions set review_note=$q$Errado. Em "está se ampliando", o verbo é "ampliar-se" — um verbo pronominal, intransitivo, em que o "se" é parte integrante do próprio verbo. Partícula apassivadora só existe com verbo transitivo direto, formando uma voz passiva sintética (como em "vendem-se casas" = "casas são vendidas") — não é o caso aqui, já que "ampliar" está sendo usado de forma intransitiva/reflexiva, sem objeto direto que "sofra" a ação.
Exemplo: "a rede está se expandindo" (verbo pronominal, "se" integrante) é diferente de "vendem-se casas" (aqui sim, "se" é apassivadora, pois "vender casas" é transitivo direto) — só o segundo caso tem partícula apassivadora.$q$
where exam_year=2021 and item_number=11 and career_name='Agente de Polícia Federal' and official_answer='E';
