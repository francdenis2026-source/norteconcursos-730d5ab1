-- Explicações do dia a dia: PF 2014 (Agente), Raciocínio Lógico, itens 58-70.
-- Mesmo padrão da migration 20260928030000 (Português/Informática): explicação
-- didática + bloco "Exemplo:" com analogia do cotidiano, e a cláusula WHERE
-- só atualiza se o gabarito gravado bater com o esperado, pra nunca
-- sobrescrever um item cujo gabarito tenha sido corrigido depois.

update public.official_exam_questions set review_note=$q$Correto. Já sabemos: Pedro = azul, e quem usa verde pediu carne. Se João pediu peixe, sobra carne e frango pra Pedro e Rodrigo — e como Rodrigo não pediu frango, Rodrigo ficou com carne. Quem pediu carne usa verde, então Rodrigo é o verde, não o branco.
Exemplo: é como montar um quebra-cabeça de 3 peças sabendo 2 encaixes fixos — a terceira peça só tem um lugar possível, então dá pra afirmar com certeza onde ela não está.$q$
where exam_year=2014 and item_number=58 and career_name='Agente de Polícia Federal' and official_answer='C';

update public.official_exam_questions set review_note=$q$Errado. As informações fixas (Pedro=azul, verde=carne, Rodrigo≠frango) não bastam sozinhas pra saber o prato de Pedro — dá pra montar mais de uma combinação possível sem alguma pista extra (como "João pediu peixe"). Concluir algo que ainda tem mais de uma solução possível é o erro clássico desse tipo de questão.
Exemplo: é como tentar advinhar qual dos dois suspeitos restantes é o culpado só porque um terceiro já foi descartado — sem mais uma pista, os dois continuam possíveis.$q$
where exam_year=2014 and item_number=59 and career_name='Agente de Polícia Federal' and official_answer='E';

update public.official_exam_questions set review_note=$q$Errado. Ao contrário do que o item afirma, a pista "João pediu peixe" É suficiente: ela fecha o quebra-cabeça inteiro (Rodrigo=carne=verde, Pedro=frango=azul, João=peixe=branco). A questão testa se você percebe que uma única pista extra pode ser exatamente o que faltava pra resolver tudo.
Exemplo: numa investigação, às vezes falta só um depoimento pra fechar o caso todo — antes dele parecia complicado, com ele fica óbvio.$q$
where exam_year=2014 and item_number=60 and career_name='Agente de Polícia Federal' and official_answer='E';

update public.official_exam_questions set review_note=$q$Errado. A premissa 1 diz "Paulo inocente → João OU Jair culpado" — não garante que seja Jair especificamente. O item inventa uma ligação (com o depoimento de Maria) que as premissas originais não sustentam; pode muito bem ser o João o culpado, não o Jair.
Exemplo: se seu chefe diz "ou o Ricardo ou o Bruno vai cobrir o plantão", você não pode concluir que vai ser o Bruno só porque alguém comentou o nome dele no corredor — a fala do premissa continua sendo "um dos dois", não um deles específico.$q$
where exam_year=2014 and item_number=62 and career_name='Agente de Polícia Federal' and official_answer='E';

update public.official_exam_questions set review_note=$q$Correto. A premissa 3 diz que "Jair culpado" (R) leva a "José verdadeiro" (S), ou seja, R→S. Juntando isso com a premissa 1 (P→Q∨R), se trocarmos o R por S (já que R garante S), chegamos em P→Q∨S — e acrescentar mais uma opção no "ou" (o T) só deixa a afirmação ainda mais fácil de ser verdadeira, nunca mais difícil.
Exemplo: se "chove OU eu levo guarda-chuva" e "quando chove, a rua fica molhada", então "a rua fica molhada OU eu levo guarda-chuva" também é verdade — e "a rua fica molhada OU eu levo guarda-chuva OU eu uso boné" continua verdade, porque só ficou mais fácil de uma das opções acontecer.$q$
where exam_year=2014 and item_number=63 and career_name='Agente de Polícia Federal' and official_answer='C';

update public.official_exam_questions set review_note=$q$Correto. A premissa 2 diz "João culpado → Jair inocente". Invertendo essa frase ao contrário (contrapositiva, que tem sempre o mesmo valor lógico da original): "Jair culpado → João inocente". É exatamente o que o item afirma.
Exemplo: "se chove, a rua molha" garante que "se a rua NÃO molhou, não choveu" — é a mesma ideia virada do avesso, sempre verdadeira quando a frase original é verdadeira.$q$
where exam_year=2014 and item_number=64 and career_name='Agente de Polícia Federal' and official_answer='C';

update public.official_exam_questions set review_note=$q$Correto. Numa tautologia, o resultado final da tabela-verdade dá sempre "verdadeiro", não importa a combinação de P, Q e R. Aqui, sempre que P∧Q∧R é verdadeiro, P e Q também são (então P∨Q também é); e quando P∧Q∧R é falso, a implicação já é automaticamente verdadeira (implicação com antecedente falso nunca falha). Ou seja, as 8 linhas da tabela dão sempre V.
Exemplo: uma promessa do tipo "se eu ganhar na loteria, te dou 10% do prêmio" nunca é quebrada quando você não ganha — só falharia se você ganhasse e não desse os 10%. Se isso nunca puder acontecer pela lógica da frase, ela é sempre verdadeira, isto é, uma tautologia.$q$
where exam_year=2014 and item_number=65 and career_name='Agente de Polícia Federal' and official_answer='C';

update public.official_exam_questions set review_note=$q$Errado. Total de pares possíveis entre 20 policiais: C(20,2) = 190. Pares do mesmo sexo: C(12,2) entre os homens + C(8,2) entre as mulheres = 66 + 28 = 94. Probabilidade = 94/190 ≈ 0,4947 — menor que 0,5, não maior como o item afirma.
Exemplo: é quase "cara ou coroa", mas levemente a favor de duplas mistas — em 190 combinações possíveis, 96 são mistas contra 94 do mesmo sexo, uma diferença pequena que já derruba a afirmação de "mais da metade".$q$
where exam_year=2014 and item_number=66 and career_name='Agente de Polícia Federal' and official_answer='E';

update public.official_exam_questions set review_note=$q$Errado. Se 15 dos 20 policiais têm no mínimo 10 anos de serviço, sobram no máximo 5 para "menos de 10 anos" (20 - 15 = 5). O item afirma "mais de 6", número que já ultrapassa o total de vagas restantes (5) — é fisicamente impossível com os dados dados.
Exemplo: se 15 de 20 alunos de uma turma já foram aprovados, no máximo 5 podem estar reprovados — não tem como "mais de 6" estarem reprovados, o total não fecha.$q$
where exam_year=2014 and item_number=67 and career_name='Agente de Polícia Federal' and official_answer='E';

update public.official_exam_questions set review_note=$q$Correto. Chamando de k a quantidade de mulheres admitidas (e 3k de homens), o novo total fica 20+4k e o novo total de homens 12+3k. Igualando à probabilidade de 0,7: (12+3k)/(20+4k) = 0,7 → k = 10. Isso dá 8+10 = 18 mulheres no batalhão — mais que as 15 que o item pede para confirmar.
Exemplo: é uma "regra de três" disfarçada de problema de probabilidade — troque a proporção por uma equação com uma incógnita só (k) e resolve como conta normal.$q$
where exam_year=2014 and item_number=68 and career_name='Agente de Polícia Federal' and official_answer='C';

update public.official_exam_questions set review_note=$q$Correto. A frase original é "(Vôlei OU Basquete) → Futebol". Virando essa implicação do avesso (contrapositiva) e aplicando De Morgan no "OU", chega-se em "NÃO Futebol → (NÃO Vôlei E NÃO Basquete)" — exatamente o que o item descreve. É a mesma regra lógica dos itens 64 e 69: inverter uma implicação sempre nega e troca a ordem dos dois lados.
Exemplo: "quem entra na área restrita usa crachá" garante que "quem não usa crachá não entra na área restrita" — a regra vale nos dois sentidos invertidos.$q$
where exam_year=2014 and item_number=69 and career_name='Agente de Polícia Federal' and official_answer='C';

update public.official_exam_questions set review_note=$q$Correto (conforme gabarito oficial). Com 10 quadras e uma dupla por quadra por dia, diversificar ao máximo as duplas significa não repetir a mesma dupla numa mesma quadra enquanto houver outra combinação ainda não usada ali — o que empurra qualquer repetição pra mais adiante no calendário.
Exemplo: é como revezar jogadores num time pra ninguém repetir a mesma posição toda rodada — quanto mais você varia, mais tempo demora pra "dar a volta" e repetir a mesma combinação de novo.$q$
where exam_year=2014 and item_number=70 and career_name='Agente de Polícia Federal' and official_answer='C';
