-- Explicações do dia a dia: Língua Portuguesa, lote 1 — PF 2014, itens
-- 1-14 (quatro textos: Althusser/Marx, imigrantes ilegais na Itália,
-- tráfico de pessoas, narcotráfico). Interpretação de texto e gramática
-- conferidas linha a linha contra o texto-base de cada item.

-- 1: os três itens listados (matéria-prima, instalações, instrumentos) são exatamente os exemplos de "meios de produção" dados no texto.
update public.official_exam_questions set review_note=$q$Correto. O texto lista, logo depois de falar em "reprodução dos meios de produção", exatamente esses três exemplos: matéria-prima, instalações fixas e instrumentos de produção. É uma relação direta de exemplo-conceito dentro do próprio texto.
Exemplo: é como alguém dizer "preciso repor os insumos da fábrica: farinha, fermento e as formas de assar" — os itens citados depois dos dois pontos são exemplos do conceito geral mencionado antes.$q$
where exam_year=2014 and item_number=1 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 2: o texto só diz que economista e capitalista compartilham o mesmo "ponto de vista da empresa" — não afirma que um é subconjunto do outro, nem fala em "proprietário de empresa".
update public.official_exam_questions set review_note=$q$Errado. O texto diz que economista e capitalista "não se distinguem" NESSE PONTO ESPECÍFICO (o de saber prever o que precisa ser reposto na produção) — ele não afirma que "todo economista é capitalista" como categorias sociais, e muito menos discute quem é ou não "proprietário de empresa". O item cria uma relação lógica de conjuntos que o texto simplesmente não sustenta.
Exemplo: dizer que "professor e médico não se distinguem quanto a precisarem de formação superior" não significa que "todo professor é médico" — é só um ponto específico em comum, não uma equivalência total entre as duas categorias.$q$
where exam_year=2014 and item_number=2 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 3: a reescrita muda o que está sendo reconhecido — de "um fato, porque Marx provou" para "a razão pela qual Marx fez a demonstração" — dois sentidos diferentes.
update public.official_exam_questions set review_note=$q$Errado. No original, as pessoas reconhecem UM FATO (que não há produção sem reprodução dos meios), e o "porque Marx impôs" explica POR QUE elas reconhecem isso. Na reescrita, muda o alvo do reconhecimento: agora seria "a razão pela qual Marx fez a demonstração" — um objeto de reconhecimento diferente do original. A reformulação desloca o sentido, não é uma simples troca de palavras equivalente.
Exemplo: "sei que vai chover, porque vi as nuvens" é diferente de "sei o motivo pelo qual alguém observou as nuvens" — o primeiro é sobre o fato (vai chover), o segundo é sobre a ação de observar. São focos diferentes.$q$
where exam_year=2014 and item_number=3 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 4: "esta demonstração" refere-se exatamente ao trecho seguinte, sobre não haver produção sem reprodução dos meios de produção.
update public.official_exam_questions set review_note=$q$Correto. A expressão "esta demonstração" está anunciando o conteúdo que vem logo depois no texto ("que não há produção possível... dos meios de produção") — é exatamente essa afirmação que Marx teria demonstrado, segundo o autor.
Exemplo: quando alguém diz "como este exemplo mostra: 2+2=4", o "este exemplo" está apontando pra conta que vem na sequência — a mesma lógica de referência que aparece no texto.$q$
where exam_year=2014 and item_number=4 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 5: texto menciona filhos, pais e esposas que dependiam dos imigrantes pra enviar dinheiro — sustenta a inferência de busca por sustento financeiro.
update public.official_exam_questions set review_note=$q$Correto. O texto menciona explicitamente que familiares "dependiam deles para que enviassem dinheiro" e que havia anúncios representando "a esperança de uma vida melhor" — essas pistas sustentam a inferência de que a motivação da migração era melhorar a situação financeira da família.
Exemplo: é a mesma lógica de inferir o motivo de alguém viajar pra trabalhar fora ao ler que a família dele depende do dinheiro que ele manda — a informação não precisa estar dita com todas as letras pra ser uma inferência válida.$q$
where exam_year=2014 and item_number=5 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 6: "tinha sido" (mais-que-perfeito composto) e "fora" (mais-que-perfeito simples) são formas equivalentes do mesmo tempo verbal.
update public.official_exam_questions set review_note=$q$Correto. "Tinha sido" e "fora" são duas formas de expressar o mesmo tempo verbal — o pretérito mais-que-perfeito — só que uma composta (com auxiliar "tinha" + particípio) e outra simples (uma palavra só). Trocar uma pela outra não muda o sentido nem quebra a gramática.
Exemplo: "eu tinha terminado o trabalho" e "eu terminara o trabalho" dizem exatamente a mesma coisa — a segunda forma é só menos usada no dia a dia, mas igualmente correta.$q$
where exam_year=2014 and item_number=6 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 7: "série" e "história" são paroxítonas terminadas em ditongo (ie/ia) — mesma regra de acentuação.
update public.official_exam_questions set review_note=$q$Correto. As duas palavras seguem a mesma regra: são paroxítonas (a sílaba forte é a penúltima) terminadas em ditongo — "sé-rie" e "his-tó-ria" — e essa combinação específica exige acento gráfico. É a mesma categoria de regra ortográfica nos dois casos.
Exemplo: "espécie", "várzea" e "área" seguem essa mesma regra — todas paroxítonas terminadas nesse tipo de ditongo, todas acentuadas pelo mesmo motivo.$q$
where exam_year=2014 and item_number=7 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 8: o texto é narrativo, mas NÃO é autobiográfico — o narrador conta a história de Huang, não a própria vida dele; usar 1ª pessoa só pra narrar a entrevista não torna o texto autobiografia.
update public.official_exam_questions set review_note=$q$Errado. O texto é narrativo, sim — mas não é autobiográfico. Autobiografia seria o narrador contando a PRÓPRIA vida; aqui, ele usa a primeira pessoa só pra narrar COMO conseguiu a entrevista com Huang, mas o assunto principal do texto é a história de Huang, não a vida do narrador (que é um jornalista relatando o caso de outra pessoa).
Exemplo: um repórter que escreve "eu entrevistei o sobrevivente e ele me contou que..." está narrando em primeira pessoa, mas o texto é sobre a história do sobrevivente, não uma autobiografia do repórter.$q$
where exam_year=2014 and item_number=8 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 9: as palavras "febre", "antitérmico" e "paliativo" constroem exatamente a analogia médica que o item descreve, incluindo o "necessário, mas não suficiente" da libertação dos trabalhadores.
update public.official_exam_questions set review_note=$q$Correto. O texto usa uma metáfora médica completa: o tráfico não é "a doença" em si, é um "sintoma" (febre) de um problema maior; libertar trabalhadores seria como dar um antitérmico — ajuda a baixar a febre, mas não cura a doença de raiz (o modelo de desenvolvimento). A analogia bate exatamente com o que o item descreve.
Exemplo: tratar só a febre de alguém sem investigar a infecção que a está causando resolve o sintoma, mas não o problema real — é essa mesma lógica que o texto aplica ao tráfico de pessoas.$q$
where exam_year=2014 and item_number=9 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 10: o texto liga explicitamente "modelo de desenvolvimento predatório do meio ambiente e dos trabalhadores" — exatamente o que o item afirma.
update public.official_exam_questions set review_note=$q$Correto. O próprio texto usa a expressão "modelo de desenvolvimento predatório do meio ambiente e dos trabalhadores" — juntando exatamente os dois elementos que o item menciona (devastação ambiental e exploração de mão de obra) como características desse modelo.
Exemplo: é como reconhecer que um texto sobre "fast fashion" liga poluição e condições precárias de trabalho ao mesmo modelo de produção — os dois problemas vêm do mesmo sistema, segundo o texto.$q$
where exam_year=2014 and item_number=10 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 11: texto menciona iniciativa privada reduzindo custos (lucra) e intermediários como gatos/coiotes lucrando sobre quem busca vida melhor — os dois segmentos que o item cita.
update public.official_exam_questions set review_note=$q$Correto. O texto cita dois "tipos" de quem lucra: a iniciativa privada, que reduz custos forçando deslocamento de trabalhadores, e os intermediários (gatos, coiotes), que lucram diretamente sobre pessoas que buscam uma vida melhor. São exatamente os dois grupos que o item identifica.
Exemplo: é como separar, num esquema de exploração, quem lucra "por cima" (a empresa que paga menos) de quem lucra "no meio do caminho" (o intermediário que cobra pra facilitar a viagem) — os dois lucram, mas de formas diferentes.$q$
where exam_year=2014 and item_number=11 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 12: "eram capturados" (ação repetida/habitual no passado) vs "foram capturados" (ação pontual concluída) — mudam o sentido, não são intercambiáveis.
update public.official_exam_questions set review_note=$q$Errado. "Eram capturados" (pretérito imperfeito) passa a ideia de uma prática repetida, habitual, ao longo do tempo — "isso acontecia sempre". "Foram capturados" (pretérito perfeito) sugere um evento pontual, concluído — "isso aconteceu uma vez". Trocar um pelo outro muda a ideia de repetição pra um fato isolado, alterando o sentido.
Exemplo: "eu comia bolo todo domingo" (hábito repetido) é bem diferente de "eu comi bolo" (evento único) — mesmo verbo, sentidos diferentes, dependendo do tempo verbal escolhido.$q$
where exam_year=2014 and item_number=12 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 13: ambas expressões ("esses verbos" e "esse ciclo") são anafóricas — retomam algo já dito antes no texto.
update public.official_exam_questions set review_note=$q$Correto. Tanto "esses verbos" (retomando "migrar e trabalhar", citados na frase anterior) quanto "esse ciclo" (retomando a explicação do círculo de oferta e demanda de mão de obra descrita antes) cumprem a mesma função: apontar pra trás no texto, evitando repetir a informação já dada.
Exemplo: dizer "Maria e João chegaram atrasados. Esses dois sempre se atrasam" usa "esses dois" pra retomar quem já foi mencionado — a mesma função das expressões do texto.$q$
where exam_year=2014 and item_number=13 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 14: "dependência" passa de sentido literal (química, em usuários) pra sentido figurado (economias/grupos que dependem do dinheiro do tráfico) — ampliação de sentido.
update public.official_exam_questions set review_note=$q$Correto. O texto usa a palavra "dependência" primeiro no sentido literal (o vício químico causado pela droga) e depois estende esse mesmo termo, de forma figurada, pra descrever como grupos econômicos e até países inteiros "dependem" do dinheiro gerado pelo narcotráfico — uma ampliação do sentido original da palavra.
Exemplo: é a mesma palavra "vício" sendo usada tanto pro vício em cigarro (sentido literal) quanto pro "vício" de uma cidade em arrecadação de um imposto específico (sentido figurado, de dependência econômica) — o significado se estende pra uma nova situação.$q$
where exam_year=2014 and item_number=14 and career_name='Agente de Polícia Federal' and official_answer='C';
