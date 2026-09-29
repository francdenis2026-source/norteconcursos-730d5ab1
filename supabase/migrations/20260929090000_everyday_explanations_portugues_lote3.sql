-- Explicações do dia a dia: Língua Portuguesa, lote 3 — PF 2018, itens
-- 6-8 (texto Nudetective) e 12-22 (texto "A Carta Roubada", Edgar Allan
-- Poe). Gramática e interpretação conferidas linha a linha.

-- 6: sem vírgula, "Assim" liga-se ao verbo como advérbio de modo ("eram feitas desse jeito"); com vírgula, vira conectivo de conclusão ("portanto") — muda a função e o sentido.
update public.official_exam_questions set review_note=$q$Correto. Sem vírgula, "Assim eram feitas as operações" tem "assim" como advérbio de modo, ligado bem de perto ao verbo — quer dizer "eram feitas DESSE JEITO" (retomando a cena sem mapas, só com facão). Colocando uma vírgula logo depois, "assim" passa a funcionar mais como um conector de conclusão (tipo "portanto", "logo") — muda de "modo como" pra "consequência de". É uma mudança sutil, mas real, de função e sentido.
Exemplo: "assim ele resolveu o problema" (modo: resolveu desse jeito específico) é diferente de "assim, ele resolveu o problema" (conclusão: por isso, ele resolveu) — a vírgula muda o papel da palavra na frase.$q$
where exam_year=2018 and item_number=6 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 7: "Logo" em "Logo nos primeiros testes" tem sentido TEMPORAL (logo cedo, desde já), não de conclusão (portanto).
update public.official_exam_questions set review_note=$q$Errado. "Logo" é uma palavra que pode ter dois sentidos bem diferentes: de conclusão ("logo, ele está certo" = portanto) ou de tempo ("logo eu vou" = em breve/cedo). No texto, "Logo nos primeiros testes" usa o sentido TEMPORAL — quer dizer "já nos primeiros testes", "desde cedo" — não uma ideia de conclusão como o item afirma.
Exemplo: "logo de manhã ele já estava trabalhando" usa "logo" no sentido de tempo (cedo), bem diferente de "ele chegou atrasado, logo, perdeu a reunião" (conclusão) — o texto usa o primeiro sentido.$q$
where exam_year=2018 and item_number=7 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 8: "a uma paleta" tem "a" preposição + "uma" artigo INDEFINIDO — não há artigo definido feminino pra crase se juntar; colocar o acento aqui seria erro, não algo que "mantém a correção".
update public.official_exam_questions set review_note=$q$Errado. Crase só acontece quando a preposição "a" encontra o ARTIGO DEFINIDO feminino "a" (a+a = à). Em "calibrados a uma paleta", o que vem depois da preposição é o artigo INDEFINIDO "uma", não o artigo definido "a" — não tem com o que a preposição se fundir. Colocar o acento de crase aqui seria um erro, ao contrário do que o item afirma.
Exemplo: "fui a uma festa" nunca leva crase (é artigo indefinido "uma"); já "fui à festa da Maria" pode levar (é o artigo definido "a") — a diferença entre "uma" e "a" decide se existe ou não crase possível.$q$
where exam_year=2018 and item_number=8 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 12: o primeiro parágrafo mistura descrição das qualidades da polícia com narrativa/diálogo sobre o caso do delegado — não é predominantemente descritivo.
update public.official_exam_questions set review_note=$q$Errado. Embora o parágrafo cite algumas características da polícia parisiense (hábil, perseverante, engenhosa), boa parte dele já avança a narrativa — contando que o delegado relatou como conduziu a investigação, e trazendo o diálogo entre os personagens. Não dá pra classificar o parágrafo como "predominantemente descritivo": ele já está narrando um episódio, não só listando características.
Exemplo: um texto que diz "João era gentil e cuidadoso. Naquele dia, ele contou como ajudou o vizinho" mistura descrição (gentil, cuidadoso) com narrativa (o que ele contou) — não dá pra chamar o trecho de "predominantemente descritivo" só pela primeira frase.$q$
where exam_year=2018 and item_number=12 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 13: o texto atribui explicitamente o fracasso do delegado à suposição errada de que "poeta = idiota".
update public.official_exam_questions set review_note=$q$Correto. O texto é direto: "a fonte remota de seu fracasso reside na suposição de que o ministro é um idiota, pois adquiriu renome de poeta". Ou seja, foi exatamente esse preconceito do delegado contra poetas que o levou a subestimar o ministro e, por isso, não encontrar a carta.
Exemplo: é como um investigador subestimar um suspeito só porque ele tem uma profissão que o investigador julga "sem inteligência" — esse preconceito pode ser exatamente o que faz ele errar a investigação.$q$
where exam_year=2018 and item_number=13 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 14: o texto não estabelece que o elogio inicial já era irônico — Dupin parece reconhecer sinceramente a habilidade da polícia, e só depois aponta uma limitação específica do método deles nesse caso.
update public.official_exam_questions set review_note=$q$Errado. Nada no texto indica que Dupin já estava sendo irônico desde o primeiro parágrafo — ele parece reconhecer de fato a habilidade da polícia parisiense em geral. A crítica que vem depois (sobre o método ser inadequado PRA ESSE CASO específico) é um argumento separado, não uma "prova" de que o elogio inicial era falso ou irônico. O item força uma conexão entre as duas partes que o texto não confirma.
Exemplo: elogiar um mecânico como "muito competente" e depois dizer que ele "não soube resolver esse carro específico" não significa que o elogio inicial era irônico — são duas afirmações compatíveis, sobre competência geral e uma falha pontual.$q$
where exam_year=2018 and item_number=14 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 15: texto diz que a engenhosidade da polícia "representa fielmente a da massa" — ou seja, uma inteligência mediana/comum, exatamente como o item descreve.
update public.official_exam_questions set review_note=$q$Correto. O texto explica que a polícia só acerta quando o criminoso tem uma astúcia parecida com a "da massa" (a média das pessoas) — e erra quando o criminoso é mais esperto OU menos esperto que essa média. Isso confirma que "da massa" significa uma inteligência mediana, comum, nem muito alta nem muito baixa.
Exemplo: é como um teste padronizado que só funciona bem pra identificar alunos "na média" — alunos muito acima ou muito abaixo da média escapam do padrão esperado pelo teste.$q$
where exam_year=2018 and item_number=15 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 16: o narrador expressa surpresa e cita a opinião corrente ("a voz do mundo"), mas isso não configura, de forma clara e inequívoca, uma discordância pessoal e explícita dele — é mais nuançado que uma discordância categórica.
update public.official_exam_questions set review_note=$q$Errado. O narrador demonstra surpresa e menciona que a opinião de Dupin "tem sido desmentida pela voz do mundo" — mas isso é citar uma visão comum/tradicional, não necessariamente afirmar sua própria discordância de forma categórica. O texto é mais sutil do que uma discordância explícita e definitiva do narrador; ele questiona, mas não fecha posição contrária com clareza absoluta.
Exemplo: dizer "isso é surpreendente, e vai contra o que todo mundo pensa" é reportar uma tensão de ideias — não é o mesmo que declarar abertamente "eu discordo completamente disso".$q$
where exam_year=2018 and item_number=16 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 17: a reescrita troca "escreveu" (ação concluída) por "escrevia" (ação habitual/contínua) — muda o aspecto verbal e, com isso, o sentido original.
update public.official_exam_questions set review_note=$q$Errado. Na reescrita, "escreveu eruditamente" (uma ação concluída, um fato específico) vira "escrevia eruditamente" (uma ação habitual, repetida ao longo do tempo) — essa troca de tempo verbal muda o aspecto da ação, alterando o sentido original do trecho, ao contrário do que o item afirma.
Exemplo: "ele escreveu um livro sobre o assunto" (um livro específico, ação pontual) é diferente de "ele escrevia sobre o assunto" (um hábito, várias vezes) — mesmo verbo, sentidos diferentes.$q$
where exam_year=2018 and item_number=17 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 18: "ele" refere-se ao DELEGADO (quem cometeu a falácia lógica de inferir "todos os poetas são idiotas"), não ao ministro (que é só o alvo do preconceito).
update public.official_exam_questions set review_note=$q$Errado. Quem comete o erro de lógica (a "non distributio medii", uma falácia de generalizar mal um argumento) é o DELEGADO, ao concluir que "todos os poetas são idiotas" e aplicar isso ao ministro. O "ele" se refere a quem faz essa inferência errada — o delegado — não ao ministro, que é só o alvo (a vítima) desse raciocínio falho.
Exemplo: se alguém pensa "todo político mente; fulano é político; logo, fulano mente", quem "erra" na lógica é quem fez essa generalização, não o político que foi injustamente julgado por ela.$q$
where exam_year=2018 and item_number=18 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 19: trocar "compreenderá" (futuro) por "compreende" (presente) mantém a gramática, mas muda o sentido de expectativa futura pra uma afirmação mais imediata.
update public.official_exam_questions set review_note=$q$Correto. O futuro do presente ("compreenderá") passa a ideia de uma expectativa de Dupin sobre algo que vai acontecer com seu interlocutor — "você vai entender, quando eu terminar de explicar". Trocando pelo presente ("compreende"), essa expectativa desaparece, e a frase soa como uma afirmação sobre algo que já está acontecendo, não uma previsão — os dois tempos são gramaticalmente corretos, mas carregam nuances de sentido diferentes.
Exemplo: "você vai entender" (expectativa de algo futuro) soa diferente de "você entende" (afirmação no presente) — mesma ideia geral, timing e certeza diferentes.$q$
where exam_year=2018 and item_number=19 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 20: "E ambas as coisas" completa a pergunta anterior sobre ser poeta/matemático — fica subentendido "[ele é] ambas as coisas".
update public.official_exam_questions set review_note=$q$Correto. A fala anterior questiona se o ministro é matemático ou poeta; a resposta "E ambas as coisas" só faz sentido completo se a gente entender que está subentendido "[Ele é] ambas as coisas" — a elipse evita repetir "ele é", que já tinha aparecido antes na conversa.
Exemplo: se alguém pergunta "você prefere praia ou montanha?" e a resposta é só "as duas!", fica implícito "[eu prefiro] as duas coisas" — sem precisar repetir o verbo.$q$
where exam_year=2018 and item_number=20 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 21: "que" em "alguma coisa que se ache escondida" é o SUJEITO de "se ache" (a coisa que ESTÁ escondida), não complemento do verbo.
update public.official_exam_questions set review_note=$q$Errado. O pronome "que" retoma "alguma coisa" e funciona como SUJEITO da oração "se ache escondida" — é "a coisa" que está escondida, não um complemento (objeto) do verbo "ache". O item inverte a função gramatical do pronome.
Exemplo: em "o livro que está na mesa", o "que" é sujeito de "está" (é o livro que está lá) — a mesma estrutura do texto, só que com outro verbo.$q$
where exam_year=2018 and item_number=21 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 22: crase antes de pronome possessivo ("à sua maneira") é FACULTATIVA — tirar o acento continua gramaticalmente correto.
update public.official_exam_questions set review_note=$q$Correto. Diferente da crase exigida antes de substantivos femininos comuns (que costuma ser obrigatória), a crase antes de pronomes possessivos femininos (minha, sua, nossa) é uma exceção conhecida: é facultativa. Ou seja, "à sua maneira" e "a sua maneira" são as duas formas gramaticalmente aceitas.
Exemplo: "ele fez à sua moda" e "ele fez a sua moda" são igualmente corretos — o acento de crase, nesse caso específico (antes de possessivo), é uma questão de escolha, não de obrigação.$q$
where exam_year=2018 and item_number=22 and career_name='Agente de Polícia Federal' and official_answer='C';
