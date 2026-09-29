-- Explicações do dia a dia: matérias jurídicas, lote 1 — PF 2014 (itens
-- 105, 115) e PF 2021 (itens 25, 27, 29, 30, 31, 33, 34, 35, 36), todos
-- Agente de Polícia Federal. Esses itens JÁ tinham auditoria jurídica
-- completa (legal_audit_completed=true, legal_basis com fonte oficial do
-- Planalto/STF/STJ, law_version_checked_at preenchido) feita em migrations
-- anteriores (20260927400100 e 20260927400500) — esta migration só
-- acrescenta o exemplo do dia a dia por cima da verificação jurídica já
-- feita, sem mexer em legal_basis/content_status/law_version_checked_at.
--
-- Itens 26 e 32 (PF 2021) ficaram de fora de propósito: já estão marcados
-- "Bloqueado" no review_note porque dependem de doutrina/jurisprudência
-- sem fonte oficial confirmada — não escrevo explicação didática em cima
-- de um gabarito que a própria auditoria anterior marcou como não
-- totalmente verificável.

-- PF2014 — item 105: autoridade policial deve determinar perícias necessárias e proceder acareações assim que souber do crime (CPP art. 6º, VI e VII).
update public.official_exam_questions set review_note=$q$Correto. Assim que toma conhecimento de um crime, a autoridade policial tem, entre suas obrigações legais, determinar as perícias necessárias (art. 6º, VII, do CPP) e proceder a acareações (art. 6º, VI) — colocar pessoas com depoimentos diferentes frente a frente pra confrontar as versões. Redação conferida como vigente no texto compilado do Planalto (27/09/2026), sem alteração nesses incisos.
Exemplo: se duas testemunhas contam histórias diferentes sobre o mesmo assalto, o delegado pode chamar as duas juntas pra confrontar os depoimentos — essa é a acareação; e mandar analisar uma arma apreendida em laboratório é a perícia.$q$
where exam_year=2014 and item_number=105 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF2014 — item 115: com mandado judicial, é permitido entrar em escritório profissional durante o dia mesmo sem consentimento do dono (CF art.5,XI + CPP arts. 245/246).
update public.official_exam_questions set review_note=$q$Correto. Um escritório profissional (fechado ao público, onde alguém exerce sua profissão) recebe a mesma proteção constitucional da "casa" — só se pode entrar sem consentimento do dono durante o dia e com determinação judicial (CF, art. 5º, XI). Como o agente tinha mandado judicial de busca e apreensão e a entrada ocorreu durante o dia, a ação é permitida mesmo sem autorização do proprietário. Redação conferida como vigente no texto compilado do Planalto (27/09/2026).
Exemplo: mesmo sem a autorização do dono, a polícia pode entrar no consultório ou escritório dele de dia se tiver um mandado judicial válido — o mandado supera a falta de consentimento, mas só durante o dia (à noite, a regra é ainda mais restrita).$q$
where exam_year=2014 and item_number=115 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF2021 — item 25: revelar segredo de que se apropriou em razão do cargo comina demissão (Lei 8.112/1990, art. 132, IX).
update public.official_exam_questions set review_note=$q$Correto. A Lei 8.112/1990 (Estatuto dos Servidores Públicos Federais), no art. 132, IX, prevê demissão para quem revela segredo do qual se apropriou em razão do cargo — é uma falta considerada gravíssima, porque quebra a confiança que o cargo público exige. Redação conferida como vigente no texto compilado do Planalto (27/09/2026).
Exemplo: um funcionário de banco que descobre uma senha por trabalhar lá e vaza essa informação pra fora comete uma falta gravíssima pelo mesmo motivo — usar informação privilegiada do cargo contra o próprio serviço é considerado quebra de confiança séria o suficiente pra justificar a demissão.$q$
where exam_year=2021 and item_number=25 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF2021 — item 27: abrir PAD é controle INTERNO (a própria Administração se fiscalizando), não externo.
update public.official_exam_questions set review_note=$q$Errado. Controle externo é feito por um Poder fiscalizando outro (como o Congresso Nacional e o TCU fiscalizando o Executivo, conforme os arts. 70 e 74 da CF). Quando a própria Polícia Federal abre processo disciplinar contra um servidor dela mesma, isso é controle INTERNO — a Administração exercendo seu dever de apurar (Lei 8.112, art. 143) e de rever seus próprios atos (autotutela, Lei 9.784, art. 53). Redação conferida como vigente no texto compilado do Planalto (27/09/2026).
Exemplo: quando uma escola pública abre uma sindicância contra o próprio professor dela, é a escola controlando a si mesma (controle interno) — diferente de o Ministério da Educação fiscalizar essa escola de fora (controle externo).$q$
where exam_year=2021 and item_number=27 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF2021 — item 29: tráfico ilícito de entorpecentes é crime inafiançável (CF art.5,XLIII).
update public.official_exam_questions set review_note=$q$Correto. A Constituição Federal, no art. 5º, XLIII, lista o tráfico ilícito de entorpecentes entre os crimes considerados inafiançáveis — junto com racismo, tortura, terrorismo e crimes hediondos. São crimes tratados como graves o suficiente pra a pessoa presa não poder simplesmente pagar fiança pra responder em liberdade. Redação conferida como vigente no texto compilado do Planalto (27/09/2026).
Exemplo: diferente de um furto simples, em que muitas vezes cabe fiança, o tráfico de drogas está naquela lista de crimes que a Constituição considera graves demais pra permitir esse tipo de liberdade provisória mediante pagamento.$q$
where exam_year=2021 and item_number=29 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF2021 — item 30: naturalizado pode ser extraditado por tráfico de drogas comprovado, mesmo que o crime seja posterior à naturalização (CF art.5,LI).
update public.official_exam_questions set review_note=$q$Errado. A regra geral é que brasileiro naturalizado só pode ser extraditado por crime comum praticado ANTES da naturalização. Mas a Constituição (art. 5º, LI) prevê uma segunda exceção: envolvimento comprovado com tráfico ilícito de entorpecentes, e essa exceção vale independentemente de quando o crime aconteceu. O item ignora essa segunda hipótese ao afirmar que o traficante não pode ser extraditado só porque o crime foi depois da naturalização. Redação conferida como vigente no texto compilado do Planalto (27/09/2026).
Exemplo: normalmente virar brasileiro protege a pessoa contra extradição por crimes cometidos depois disso — mas essa proteção tem uma brecha específica pra tráfico de drogas, que funciona diferente das outras regras e vale mesmo com o crime ocorrendo após a naturalização.$q$
where exam_year=2021 and item_number=30 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF2021 — item 31: a descrição dada é do "acondicionamento" da prova, não do "armazenamento" (CPP art.158-B, V e IX).
update public.official_exam_questions set review_note=$q$Errado. Na cadeia de custódia da prova, "acondicionamento" (art. 158-B, V, do CPP) é o ato de embalar cada vestígio individualmente, de acordo com suas características; "armazenamento" (art. 158-B, IX) é uma etapa diferente — guardar esse material já embalado em condições adequadas de conservação. O item descreve o acondicionamento, mas chama isso de "armazenamento", trocando os dois conceitos. Redação conferida como vigente no texto compilado do Planalto (27/09/2026).
Exemplo: é a diferença entre embalar um objeto frágil em plástico-bolha (acondicionamento) e depois guardar essa caixa já embalada num depósito com temperatura controlada (armazenamento) — são dois passos distintos do mesmo processo de cuidar da prova.$q$
where exam_year=2021 and item_number=31 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF2021 — item 33: flagrante preparado é quando a própria polícia provoca/induz o crime (Súmula 145 do STF).
update public.official_exam_questions set review_note=$q$Correto. A Súmula 145 do STF diz que não há crime quando a polícia prepara o flagrante de um jeito que torna impossível a consumação — ou seja, quando os próprios policiais provocam ou induzem a pessoa a cometer o crime só pra poder prendê-la em flagrante. Esse é justamente o conceito de flagrante preparado, e é considerado ilegal. Redação conferida no portal oficial do STF (27/09/2026).
Exemplo: se um policial disfarçado insiste várias vezes pra alguém vender droga a ele, e essa pessoa não venderia se não fosse insistida, isso é flagrante preparado — a "armadilha" foi montada pela própria polícia, o que invalida a prisão.$q$
where exam_year=2021 and item_number=33 and career_name='Agente de Polícia Federal' and official_answer='C';

-- PF2021 — item 34: tráfico transnacional não exige transposição efetiva da fronteira, basta prova da destinação internacional (Súmula 607 do STJ).
update public.official_exam_questions set review_note=$q$Errado. Pela Súmula 607 do STJ, a majorante da transnacionalidade do tráfico de drogas (Lei 11.343/2006, art. 40, I) se configura com a prova de que o destino da droga era outro país — mesmo que a pessoa seja presa antes de efetivamente cruzar a fronteira. O item erra ao dizer que a configuração "depende da comprovação da transposição da fronteira": não depende, basta provar a destinação internacional. Redação conferida (27/09/2026) no repositório oficial do STJ.
Exemplo: é possível ser pego ainda dentro do território brasileiro, perto da fronteira, mas com provas claras (rota, contatos, destino combinado) de que a carga ia pra outro país — não é preciso ter cruzado a fronteira de fato pra a pena aumentar por esse motivo.$q$
where exam_year=2021 and item_number=34 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF2021 — item 35: impedimento de reingresso após expulsão tem prazo DETERMINADO, proporcional à pena e nunca maior que o dobro dela (Lei 13.445/2017, art.54).
update public.official_exam_questions set review_note=$q$Errado. A Lei de Migração (art. 54, caput e §4º) não prevê banimento eterno: o impedimento de reingresso após uma expulsão tem prazo DETERMINADO, calculado de forma proporcional à pena aplicada e nunca superior ao dobro dela. O item erra ao dizer que o prazo seria "indeterminado". Redação conferida como vigente no texto compilado do Planalto (27/09/2026).
Exemplo: se a pena pelo crime foi de 4 anos, o impedimento de voltar ao Brasil não pode ultrapassar 8 anos (o dobro da pena) — nunca é "pra sempre", por mais grave que o caso pareça.$q$
where exam_year=2021 and item_number=35 and career_name='Agente de Polícia Federal' and official_answer='E';

-- PF2021 — item 36: crime ambiental de caça/captura tem pena aumentada se cometido à noite ou em unidade de conservação (Lei 9.605/1998, art.29,§4º).
update public.official_exam_questions set review_note=$q$Correto. A Lei de Crimes Ambientais (art. 29, §4º, III e V) prevê aumento de metade da pena quando o crime contra a fauna silvestre é cometido durante a noite ou dentro de uma unidade de conservação — exatamente as duas circunstâncias descritas no item (à noite E numa unidade de conservação), o que reforça ainda mais o aumento. Redação conferida como vigente no texto compilado do Planalto (27/09/2026).
Exemplo: caçar um animal silvestre sem permissão já é crime em qualquer situação, mas fazer isso de noite ou dentro de um parque nacional pesa ainda mais na hora de calcular a pena — são agravantes específicas previstas na própria lei.$q$
where exam_year=2021 and item_number=36 and career_name='Agente de Polícia Federal' and official_answer='C';
