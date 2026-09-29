-- Explicações do dia a dia: PRF 2019 (Policial Rodoviário Federal, CEBRASPE,
-- aplicação 3/2/2019), Língua Portuguesa — lote 1: itens de reescrita, coesão
-- e correção gramatical dos itens 1-20 do caderno (textos-base ainda não
-- foram digitados na importação original, 20260926070000_prf_2019_official_exam_import.sql
-- — apenas o enunciado/afirmativa de cada item está gravado em question_text).
--
-- Este lote cobre só os itens cujo enunciado é autossuficiente (traz a
-- palavra, o trecho ou a reescrita completa a ser avaliada), de modo que a
-- explicação pode ser dada com segurança de regra gramatical, sem precisar
-- adivinhar o conteúdo do texto-base que falta no banco. Itens que dependem
-- do texto-base para verificação (ex.: 2, 3[anulado], 10, 11, 14, 17, 18, 19,
-- 20) e o item 16 (cuja análise de sujeito ficou ambígua sem o texto-base)
-- ficam de fora deste lote, propositalmente, para não arriscar uma explicação
-- não verificável — ver CONTENT_GOVERNANCE.md.
--
-- Nenhum destes itens é jurídico (Língua Portuguesa não exige legal_review);
-- gabarito oficial (official_answer) já gravado na importação original não foi
-- alterado — apenas review_note e content_status são atualizados aqui.

-- 1: "viceja" (de "viçar", florescer/estar viçoso) e "germina" (de "germinar")
-- pertencem ao mesmo campo semântico de crescimento/vida vegetal; a troca não
-- compromete nem a coerência nem a gramática do trecho.
update public.official_exam_questions set review_note=$q$Certo. "Viceja" vem do verbo "viçar" (estar viçoso, florescer, crescer com vigor) e "germina" vem de "germinar" (brotar, começar a crescer). Os dois verbos pertencem ao mesmo campo de sentido — o do crescimento e da vida das plantas —, por isso a troca de um pelo outro não compromete nem a coerência do trecho nem a correção gramatical, já que ambos são verbos regulares na 3.ª pessoa do singular do presente do indicativo.
Exemplo: é como trocar "a plantação floresceu" por "a plantação brotou" — mudam nuances, mas o sentido geral de crescimento vegetal e a estrutura da frase continuam corretos.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=1 and content_status='under_review';

-- 4: "como é que se fazia" → "como se fazia": "é que" é um realce enfático
-- (comum na fala), dispensável sem prejuízo de sentido ou gramática.
update public.official_exam_questions set review_note=$q$Certo. O trecho "é que", em "como é que se fazia", é uma construção de realce (enfática), muito comum na língua falada, que apenas destaca a pergunta sem acrescentar informação nova. Suprimi-lo — ficando "como se fazia" — não muda o sentido da pergunta nem quebra nenhuma regra gramatical, porque "é que" não exerce função sintática própria (não é sujeito, nem objeto, nem complemento de nada): é só uma partícula de ênfase.
Exemplo: "Quem é que chegou?" e "Quem chegou?" perguntam exatamente a mesma coisa — o "é que" só reforça a pergunta, sem mudar seu sentido.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=4 and content_status='under_review';

-- 5: "à nosso dispor" tem crase indevida, pois "nosso" é possessivo masculino
-- (não admite o artigo feminino "a" que forma a crase).
update public.official_exam_questions set review_note=$q$Errado. A reescrita proposta traz um erro de crase: "à nosso dispor" junta a preposição "a" com o artigo feminino "a", mas "nosso" é um possessivo masculino (concorda com "dispor", palavra masculina), então não há artigo feminino algum para se fundir com a preposição. O correto seria "a nosso dispor", sem o acento indicativo de crase.
Exemplo: dizemos "a meu ver" e "a nosso favor", sem crase, porque "meu" e "nosso" são possessivos masculinos — só haveria crase diante de palavra feminina, como em "à nossa disposição".$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=5 and content_status='under_review';

-- 6: isolar "que se infiltra no ambiente no qual dormimos" por vírgulas
-- transforma a oração restritiva em explicativa; a gramática continua
-- correta, mas o sentido muda (deixa de restringir "de especificar qual luz").
update public.official_exam_questions set review_note=$q$Certo. Sem vírgulas, "que se infiltra no ambiente no qual dormimos" é uma oração restritiva: ela delimita exatamente do que se está falando (só aquela luz específica que entra no quarto). Isolando-a entre vírgulas, ela passa a ser uma oração explicativa, que só acrescenta uma informação a mais sobre algo já identificado, sem restringir nada. As duas formas são gramaticalmente corretas — o que muda é o sentido: de "especificamente esse tipo de luz" para "essa luz, que, a propósito, se infiltra onde dormimos".
Exemplo: "Os alunos que faltaram terão prova extra" (só os faltosos) é diferente de "Os alunos, que faltaram, terão prova extra" (todos os alunos, e todos faltaram) — a vírgula muda o sentido, mas ambas as frases são gramaticalmente corretas.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=6 and content_status='under_review';

-- 7: "existia" (indicativo, afirma um fato) x "existisse" (subjuntivo,
-- hipótese/dúvida) têm valores modais diferentes.
update public.official_exam_questions set review_note=$q$Errado. "Existia" está no pretérito imperfeito do indicativo, modo que apresenta o fato como real, certo, que de fato aconteceu. "Existisse" está no pretérito imperfeito do subjuntivo, modo usado para hipóteses, dúvidas ou coisas não confirmadas. Trocar um pelo outro muda o sentido da frase: deixa de ser uma afirmação sobre algo que de fato existia e passa a soar como uma suposição.
Exemplo: "Eu sabia que ele viajava" (fato, indicativo) é diferente de "Eu queria que ele viajasse" (desejo/hipótese, subjuntivo) — mesmo verbo, tempos parecidos, mas sentidos bem diferentes por causa do modo verbal.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=7 and content_status='under_review';

-- 8: "a cidade toda" (totalidade de UMA cidade específica, com artigo) x
-- "toda cidade" (qualquer cidade, sentido universal/genérico, sem artigo).
update public.official_exam_questions set review_note=$q$Errado. "A cidade toda" usa o artigo definido "a" e fala da totalidade de UMA cidade específica e já conhecida no texto. "Toda cidade", sem artigo, tem sentido universal/genérico — equivale a "qualquer cidade" ou "todas as cidades em geral". São sentidos bem diferentes: um fala de um lugar específico por inteiro, o outro fala de uma generalização sobre cidades quaisquer.
Exemplo: "a turma toda foi ao passeio" (aquela turma específica, todos os alunos dela) é diferente de "toda turma tem um aluno bagunceiro" (qualquer turma, em geral) — o artigo muda o sentido de específico para genérico.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=8 and content_status='under_review';

-- 9: "o homem da luz já deve ter se transferido para o mundo das trevas
-- eternas" é um eufemismo comum para "morreu".
update public.official_exam_questions set review_note=$q$Certo. "Transferir-se para o mundo das trevas eternas" é um eufemismo — uma forma indireta e mais suave de dizer que alguém morreu, em contraste com "o homem da luz" (quem trabalhava acendendo as luzes). "Trevas eternas" representa a escuridão definitiva, ou seja, a morte, opondo-se justamente à luz que essa pessoa cuidava de acender. Por isso é correto inferir que o texto está dizendo, de forma figurada, que esse funcionário provavelmente já morreu.
Exemplo: dizer que alguém "foi para um lugar melhor" ou "descansou em paz eterna" são eufemismos parecidos — jeitos indiretos e mais delicados de anunciar uma morte.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=9 and content_status='under_review';

-- 12: "em razão de" é uma locução prepositiva causal (equivale a "por causa
-- de", "devido a").
update public.official_exam_questions set review_note=$q$Certo. "Em razão de" é uma locução prepositiva que introduz uma causa, equivalendo a "por causa de" ou "devido a". Sempre que essa expressão aparece ligando duas ideias, ela está apontando o motivo, a razão pela qual algo acontece — por isso o item está correto ao dizer que ela expressa uma ideia de causa.
Exemplo: "Faltou à reunião em razão de um imprevisto" tem o mesmo sentido causal de "Faltou à reunião por causa de um imprevisto" — "em razão de" e "por causa de" são intercambiáveis, ambas causais.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=12 and content_status='under_review';

-- 13: "assim como" estabelece comparação (equivale a "da mesma forma que",
-- "tal qual").
update public.official_exam_questions set review_note=$q$Certo. "Assim como" é uma expressão comparativa: ela aproxima duas ideias mostrando que uma se parece com a outra, funcionando como "da mesma forma que" ou "tal qual". Sempre que conecta dois elementos dessa maneira, ela está estabelecendo uma relação de comparação entre eles — exatamente o que o item afirma.
Exemplo: "Ele estudou a noite toda, assim como sua irmã" compara o comportamento dos dois — "assim como" liga as duas situações mostrando semelhança entre elas.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=13 and content_status='under_review';

-- 15: isolar um advérbio como "praticamente" entre vírgulas (uso parentético)
-- é gramaticalmente permitido; não haveria "alteração da correção".
update public.official_exam_questions set review_note=$q$Errado. Isolar um advérbio como "praticamente" entre vírgulas, destacando-o como um comentário à parte (uso parentético), é um recurso gramaticalmente permitido em português — não torna a frase incorreta. A pontuação pode até mudar levemente a ênfase ou o ritmo da leitura, mas não fere nenhuma regra de correção gramatical, ao contrário do que o item afirma.
Exemplo: "Ele, certamente, virá à reunião" e "Ele certamente virá à reunião" são ambas frases gramaticalmente corretas — isolar o advérbio por vírgulas é uma opção estilística válida, não um erro.$q$, content_status='active'
where exam_year=2019 and career_name='Policial Rodoviário Federal' and item_number=15 and content_status='under_review';
