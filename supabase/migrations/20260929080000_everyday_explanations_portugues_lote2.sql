-- Explicações do dia a dia: Língua Portuguesa, lote 2 — PF 2014 (itens
-- 15-24, textos sobre narcotráfico e uso indevido de drogas) e PF 2018
-- (itens 1-5, texto sobre o Nudetective). Interpretação e gramática
-- conferidas linha a linha contra o texto-base.

-- 15: o texto trata Igreja e unidades de combate ao tráfico como exemplos PARALELOS da mesma influência dos traficantes, não como uma discrepância/contradição.
update public.official_exam_questions set review_note=$q$Errado. O texto apresenta a Igreja recebendo contribuições e as unidades de combate ao tráfico sendo controladas pelos traficantes como dois exemplos PARECIDOS do mesmo fenômeno (a influência generalizada dos traficantes em toda a sociedade) — não como uma contradição ou discrepância entre os dois casos. São exemplos que reforçam a mesma ideia, não que se opõem.
Exemplo: dizer que "a corrupção chegou até a escola e até o hospital" não é apontar uma discrepância entre escola e hospital — é mostrar que os dois foram afetados pelo mesmo problema, do mesmo jeito.$q$
where exam_year=2014 and item_number=15 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 16: na Bolívia, US$1,5bi (narcotráfico) é MENOS que US$2,5bi (exportações legais); na Colômbia, US$2-4bi é MENOS que US$5,25bi — narcotráfico não é o dobro em nenhum dos dois casos, é sempre menor.
update public.official_exam_questions set review_note=$q$Errado. Conferindo os números do texto: na Bolívia, o narcotráfico gera US$ 1,5 bilhão CONTRA US$ 2,5 bilhões das exportações legais — ou seja, o narcotráfico é MENOR, não o dobro. Na Colômbia, US$ 2 a 4 bilhões do narcotráfico contra US$ 5,25 bilhões das exportações oficiais — de novo, o narcotráfico é menor. Em nenhum dos dois países o lucro do narcotráfico chega a ser o dobro das exportações legais.
Exemplo: é como ler "recebi R$150 de bônus contra R$250 do salário" e concluir errado que o bônus é o dobro do salário — quando na verdade ele é BEM menor. Conferir os números evita esse tipo de erro de leitura.$q$
where exam_year=2014 and item_number=16 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 17: texto explica/argumenta (dissertativo) sobre a ligação entre narcotráfico e sistema financeiro mundial — classificação e conteúdo corretos.
update public.official_exam_questions set review_note=$q$Correto. O texto explica e argumenta sobre como o dinheiro do narcotráfico se encaixa na lógica especulativa do sistema financeiro mundial — essa característica de expor e defender um ponto de vista sobre um tema é justamente o que define um texto dissertativo.
Exemplo: um texto que só narra fatos sem explicar "por quê" seria narrativo; aqui, o autor está explicando a RELAÇÃO entre dois fenômenos (narcotráfico e sistema financeiro) — típico de texto dissertativo/argumentativo.$q$
where exam_year=2014 and item_number=17 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 18: "infligir" normalmente se associa a causar dano/sofrimento/prejuízo grave (infligir uma derrota, uma dor) — não é o termo usual pra "aplicar uma multa", uma penalidade administrativa rotineira.
update public.official_exam_questions set review_note=$q$Errado. "Infligir" costuma acompanhar palavras ligadas a dano, sofrimento ou prejuízo mais grave — como "infligir uma derrota" ou, no texto, "infligir prejuízo". Já "aplicar" ou "impor" multas é a colocação mais natural pra uma penalidade administrativa de trânsito — "infligir multas" soa estranho/não é o uso mais adequado da palavra nesse contexto, então não tem exatamente o mesmo sentido de uso do texto.
Exemplo: dizemos "o adversário infligiu uma derrota humilhante" (dano grande), mas não é comum dizer "o guarda infligiu uma multa" — o certo seria "aplicou" ou "impôs" a multa; "infligir" carrega um peso maior de gravidade.$q$
where exam_year=2014 and item_number=18 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 19: o "com" em "associação... com a criminalidade" é exigido por "associação" (associar algo COM algo), não por "conexos" (que pede a preposição "a").
update public.official_exam_questions set review_note=$q$Errado. A preposição "com" nesse trecho é exigida pelo verbo/substantivo "associação" (associar-se COM algo), não por "conexos" — "conexos" pede a preposição "a" (conexo A algo). O item atribui a regência à palavra errada.
Exemplo: em "a mistura de água com óleo", o "com" é exigido por "mistura" (misturar algo COM algo), não por qualquer outra palavra próxima — cada palavra tem sua própria regência específica, e é preciso identificar a certa.$q$
where exam_year=2014 and item_number=19 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 20: o sujeito oculto de "articulando-se" é o mesmo de "adotar" na oração anterior: "o governo".
update public.official_exam_questions set review_note=$q$Correto. A frase diz "devendo O GOVERNO adotar uma postura firme..., articulando-se internamente..." — o sujeito de "articulando-se" fica implícito (elíptico) porque já foi mencionado antes na mesma frase: é o próprio governo quem se articula, não outro elemento do texto.
Exemplo: em "Maria saiu de casa, correndo pra não se atrasar", quem está "correndo" é a Maria, mesmo sem repetir o nome dela — o sujeito fica subentendido pela continuidade da frase.$q$
where exam_year=2014 and item_number=20 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 22: o contexto ("avançam por todos os cantos da sociedade e por todos os espaços geográficos") mostra que "fronteiras" vai além do sentido literal/geográfico, incluindo barreiras sociais.
update public.official_exam_questions set review_note=$q$Correto. O texto deixa claro que as consequências do uso de drogas "avançam por todos os cantos da sociedade" — não só por espaços geográficos. Isso mostra que "fronteiras" está sendo usado num sentido mais amplo, que inclui barreiras sociais, não apenas limites territoriais entre países (o sentido denotativo/literal da palavra).
Exemplo: dizer que "o problema não respeita fronteiras" pode significar tanto limites entre países quanto barreiras sociais, econômicas ou culturais — o contexto do texto puxa pro sentido mais amplo.$q$
where exam_year=2014 and item_number=22 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 23: a crase em "à humanidade e à estabilidade" é OBRIGATÓRIA (o verbo "ameaça" pede a preposição "a" + artigo feminino "a"), não facultativa — tirar mudaria a correção gramatical.
update public.official_exam_questions set review_note=$q$Errado. Essa crase é OBRIGATÓRIA, não facultativa: "ameaça A humanidade" (a preposição "a" é exigida pelo verbo) se encontra com "A estabilidade" (artigo feminino) — quando a preposição exigida encontra o artigo feminino "a", o acento de crase é obrigatório, não uma opção de estilo. Tirar o acento aqui seria um erro gramatical, não uma alternativa válida.
Exemplo: "vou à escola" tem crase obrigatória (fui a + a escola) — tirar o acento e escrever "vou a escola" seria erro, e não uma escolha facultativa de quem escreve.$q$
where exam_year=2014 and item_number=23 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 24: "Suas" (as consequências) refere-se a "uso indevido de drogas", o sujeito da primeira frase — não a "Estados e sociedades", que são só quem SOFRE essas consequências.
update public.official_exam_questions set review_note=$q$Errado. "Suas consequências" se refere ao "uso indevido de drogas" (o assunto principal da primeira frase), não a "Estados e sociedades" — que na verdade são quem SOFRE essas consequências, não quem as "possui". Faz mais sentido lógico que as consequências sejam DO uso de drogas, e não dos próprios Estados afetados por elas.
Exemplo: em "a poluição prejudica as cidades; suas consequências são graves", o "suas" se refere à poluição (a causa), não às cidades (quem sofre) — a mesma lógica se aplica ao texto.$q$
where exam_year=2014 and item_number=24 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 1 (2018): texto afirma diretamente que o Nudetective foi criado pra ajudar no combate à pornografia infantil.
update public.official_exam_questions set review_note=$q$Correto. O texto conta que "peritos criminais federais desenvolveram... o Nudetective" justamente pra substituir o método manual e lento de combate à pornografia infantil — a finalidade específica do programa está declarada com bastante clareza logo no início do texto.
Exemplo: é como ler que um remédio "foi desenvolvido pra tratar uma doença específica" e concluir corretamente que essa é a finalidade dele — a informação está explícita, não é uma suposição arriscada.$q$
where exam_year=2018 and item_number=1 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 2: o texto destaca explicitamente que o programa faz em minutos o que levaria meses — ganho de velocidade é um benefício claro.
update public.official_exam_questions set review_note=$q$Correto. O texto diz que o programa "executa em minutos uma busca que poderia levar meses" — é exatamente essa rapidez que torna a investigação mais célere, um benefício direto e explícito descrito no texto.
Exemplo: trocar uma busca manual demorada por uma automática rápida é benefício claro em qualquer área — aqui, o texto já afirma esse ganho de tempo com números concretos (minutos em vez de meses).$q$
where exam_year=2018 and item_number=2 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 3: a "selva sem mapas, só com facão" é uma METÁFORA pra dificuldade do processo manual — não uma afirmação literal de que a PF não tinha NENHUM dispositivo tecnológico pra internet.
update public.official_exam_questions set review_note=$q$Errado. A comparação com uma "operação de busca na selva... somente com um facão" é uma METÁFORA pra descrever como o processo era trabalhoso e manual antes do Nudetective — não é uma afirmação literal de que a Polícia Federal não tinha absolutamente nenhum recurso tecnológico pra investigar crimes na internet. Interpretar a metáfora ao pé da letra é o erro do item.
Exemplo: dizer que alguém "trabalhava no escuro" antes de uma nova ferramenta não significa que faltava luz elétrica literalmente — é uma forma figurada de descrever dificuldade, não uma afirmação sobre iluminação de verdade.$q$
where exam_year=2018 and item_number=3 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 4: o texto diz explicitamente que a licença é GRATUITA e nunca houve intuito de venda — contradiz diretamente a ideia de países "comprando" a licença.
update public.official_exam_questions set review_note=$q$Errado. O texto afirma claramente o contrário do que o item diz: a licença do Nudetective é GRATUITA, disponibilizada só pra forças da lei e pesquisa acadêmica, e "nunca houve o intuito de venda". Os países mencionados receberam o programa compartilhado, não compraram nada — o item inventa uma transação comercial que o texto nega explicitamente.
Exemplo: é como ler que um médico "doou seus serviços" e concluir, errado, que ele "cobrou caro pelos serviços" — o texto diz o oposto do que o item afirma.$q$
where exam_year=2018 and item_number=4 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 5: o texto diz que a varredura busca em computadores, pendrives, smartphones e "demais mídias de armazenamento" — dispositivos LOCAIS, sem exigir conexão com a internet.
update public.official_exam_questions set review_note=$q$Errado. O texto lista computadores, pendrives, smartphones e outras mídias de ARMAZENAMENTO como alvo da varredura — são dispositivos que guardam arquivos localmente, e a busca funciona neles independentemente de estarem conectados à internet ou não. Nada no texto restringe o programa a dispositivos online.
Exemplo: procurar arquivos suspeitos num pendrive apreendido não depende de internet nenhuma — é uma busca local, direto no dispositivo físico, exatamente como o texto descreve.$q$
where exam_year=2018 and item_number=5 and career_name='Agente de Polícia Federal' and official_answer='E';
