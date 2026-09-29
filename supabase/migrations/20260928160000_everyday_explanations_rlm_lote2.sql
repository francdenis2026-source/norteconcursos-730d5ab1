-- Explicações do dia a dia: Raciocínio Lógico, lote 2 — PF 2018 (itens
-- 52-60) e PF 2021 (itens 49-53). Cada proposição lógica foi reconferida
-- (tabela-verdade, contrapositiva, combinatória) antes de escrever.

-- 52: "Se Paulo é mentiroso então Maria é culpada" = (~Q)→(~R), uma IMPLICAÇÃO — o item troca por ↔ (bicondicional), errado.
update public.official_exam_questions set review_note=$q$Errado. "Paulo é mentiroso" é a negação de Q (~Q), e "Maria é culpada" é a negação de R (~R). A frase "SE Paulo é mentiroso ENTÃO Maria é culpada" é uma implicação simples: (~Q)→(~R). O item troca a seta de implicação (→) pelo símbolo de "se e somente se" (↔), que é bem mais forte — exigiria que as duas coisas sempre andassem juntas nos dois sentidos, o que a frase original não afirma.
Exemplo: "se chove, a rua molha" não significa "chove se e somente se a rua molha" — a rua pode molhar por outro motivo (mangueira, por exemplo) sem estar chovendo. Implicação simples só garante um sentido.$q$
where exam_year=2018 and item_number=52 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 53: qualquer que seja o único culpado dentre os 4, a proposição (~P)→(~Q∨R) sempre dá verdadeiro.
update public.official_exam_questions set review_note=$q$Correto. Testando as 4 possibilidades de quem seria o único culpado: se for João ou Carlos, P fica falso (~P verdadeiro), mas como Maria não é a culpada nesse caso, R ("Maria é inocente") é verdadeiro — e isso já basta pra fechar a implicação como verdadeira. Se for Paulo ou Maria o único culpado, P continua verdadeiro (João e Carlos seguem inocentes), então ~P é falso — e uma implicação com a parte "se" falsa é sempre verdadeira, não importa o resto. Em todos os quatro cenários, a proposição dá certo.
Exemplo: é testar uma regra em cada cenário possível, um por um, pra confirmar que ela nunca falha — como testar um guarda-chuva em quatro situações de chuva diferentes e ver que ele sempre funciona.$q$
where exam_year=2018 and item_number=53 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 54: o consequente Q∨(~Q)∨R já é sempre verdadeiro (Q∨~Q é tautologia), então a implicação toda é tautologia.
update public.official_exam_questions set review_note=$q$Correto. Repara na parte depois da segunda seta: Q∨[(~Q)∨R] contém "Q ou não-Q", que é sempre verdadeiro sozinho (uma coisa ou é verdadeira ou não é — não tem terceira opção). Como uma parte do "ou" já garante verdade sempre, a expressão inteira do lado direito é sempre verdadeira — e uma implicação cujo resultado final é sempre verdadeiro é, por definição, uma tautologia.
Exemplo: dizer "vai chover ou não vai chover" é sempre verdade, não importa o clima — é esse tipo de frase "auto garantida" que está escondida no meio da expressão.$q$
where exam_year=2018 and item_number=54 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 55: a contrapositiva certa de P∧~Q→~R é R→(~P∨Q) — o item troca por R→(Q∧~P), AND em vez de OR, não são equivalentes.
update public.official_exam_questions set review_note=$q$Errado. Pra inverter uma implicação (contrapositiva), nega-se e troca-se a ordem: de P∧(~Q)→(~R) chega-se em R→~[P∧(~Q)], que pelas regras de negação de "E" vira R→[(~P)∨Q] — um "OU". O item escreveu R→[Q∧(~P)], com um "E" no lugar do "OU". Trocar "E" por "OU" muda completamente o significado, então as duas proposições não são equivalentes.
Exemplo: "não estou triste e cansado" (nego os dois juntos) é bem diferente de "não estou triste ou não estou cansado" (só preciso que um dos dois não seja verdade) — E e OU não se comportam igual quando você nega uma frase composta.$q$
where exam_year=2018 and item_number=55 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 56: P,Q,R falsas → pelo menos um de João/Carlos culpado (de P falsa) + Maria culpada (de R falsa) = já 2 culpados garantidos.
update public.official_exam_questions set review_note=$q$Correto. Se R é falsa, "Maria é inocente" é falso, ou seja, Maria é culpada — 1 pessoa confirmada. Se P é falsa, "João e Carlos não são culpados" é falso, ou seja, pelo menos um dos dois (João ou Carlos) é culpado — mais 1 pessoa confirmada, diferente de Maria. Somando, já temos pelo menos 2 pessoas culpadas garantidas, só com essas duas informações.
Exemplo: é como juntar duas pistas independentes de uma investigação — uma aponta que "pelo menos um dos irmãos" é culpado, outra que "a vizinha" é culpada — juntando as duas, você já tem pelo menos 2 suspeitos confirmados, mesmo sem saber os detalhes de cada um.$q$
where exam_year=2018 and item_number=56 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 57: |A∪B|=25=|A|+|B|-6 → |A|+|B|=31; se |B|=11, |A|=20>15.
update public.official_exam_questions set review_note=$q$Correto. A fórmula da união é: total em A ou B = (total em A) + (total em B) − (total nos dois ao mesmo tempo). Substituindo: 25 = |A| + |B| − 6, então |A| + |B| = 31. Se 11 estiveram em B, então |A| = 31 − 11 = 20, que é mais que 15.
Exemplo: é a mesma lógica de somar quem tem Instagram, quem tem TikTok, e descontar quem tem os dois (senão eles seriam contados duas vezes) — a fórmula da união sempre desconta a sobreposição.$q$
where exam_year=2018 and item_number=57 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 58: P(2 escolhidos ambos do grupo A∩B, 6 pessoas) = C(6,2)/C(30,2) = 15/435 = 1/29, que é MAIOR que 1/30, não inferior.
update public.official_exam_questions set review_note=$q$Errado. "Estiveram em 2 desses países" só pode ser quem esteve em A e B ao mesmo tempo — são 6 pessoas. A chance de escolher 2 pessoas, ambas desse grupo de 6, entre as 30: C(6,2)/C(30,2) = 15/435 = 1/29. Só que 1/29 é MAIOR que 1/30 (quanto menor o número embaixo da fração, maior o valor) — o item afirma o contrário, que seria "inferior".
Exemplo: 1/29 de uma pizza é uma fatia um pouquinho MAIOR que 1/30 da mesma pizza — quando o denominador diminui, cada fatia fica maior, não menor.$q$
where exam_year=2018 and item_number=58 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 59: pessoas exclusivas de C = 30-25=5; maneiras com pelo menos 1 de C = C(30,2)-C(25,2)=435-300=135>100.
update public.official_exam_questions set review_note=$q$Correto. Como 25 dos 30 estiveram só em A ou B (nenhum desses esteve em C), sobram 5 pessoas que só estiveram em C. O jeito mais rápido de calcular "pelo menos 1 do país C" é pelo caminho contrário: total de duplas possíveis (C(30,2)=435) menos as duplas que NÃO têm ninguém de C (C(25,2)=300) = 435 − 300 = 135, que é mais que 100.
Exemplo: é mais fácil calcular "quantas duplas têm pelo menos uma pessoa de chapéu" fazendo "todas as duplas" menos "duplas sem ninguém de chapéu", em vez de tentar montar cada combinação válida uma por uma.$q$
where exam_year=2018 and item_number=59 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 60: usando as 6 pessoas de A∩B eficientemente (contam pra cota de A e de B ao mesmo tempo), dá pra montar um cenário válido com mais de 14 mulheres — o "no máximo 14" não é garantido.
update public.official_exam_questions set review_note=$q$Errado. O truque aqui é perceber que as 6 pessoas que estiveram em A e B ao mesmo tempo contam pra cota de "pelo menos metade homens" dos DOIS grupos ao mesmo tempo — usar homens nesse grupo "rende mais" que usar homens só num grupo. Fazendo as contas com essa folga (por exemplo, com |A|=16 e |B|=15), dá pra satisfazer as três exigências de "pelo menos metade homens" usando só 10 homens no total de A∪B, sobrando até 15 mulheres aí — mais que os 14 que o item afirma ser o máximo. Como existe pelo menos um cenário válido com mais de 14 mulheres, a conclusão do item não pode ser garantida.
Exemplo: é como cumprir duas cotas de "pelo menos metade" usando a mesma pessoa pras duas listas ao mesmo tempo (ela está nas duas equipes) — isso "economiza" homens comparado a cumprir cada cota com gente diferente, sobrando mais espaço pra mulheres do que pareceria à primeira vista.$q$
where exam_year=2018 and item_number=60 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 49 (2021): com exatamente 2 delegados/2 escrivães/4 agentes (o total exato pras 2 equipes), escolher a 1ª equipe já determina a 2ª — por isso o número de jeitos de montar as duas equipes é igual ao de montar só uma.
update public.official_exam_questions set review_note=$q$Correto. Como o total disponível (2 delegados, 2 escrivães, 4 agentes) é EXATAMENTE o que as duas equipes juntas precisam, escolher quem vai pra primeira equipe já decide automaticamente quem sobra pra segunda — não tem escolha extra. Por isso contar "de quantos jeitos monto as duas equipes" dá o mesmo resultado que "de quantos jeitos monto só uma equipe" (2 delegados × 2 escrivães × C(4,2) agentes = 24 dos dois jeitos).
Exemplo: se você tem exatamente 8 alunos pra formar 2 times de 4, escolher quem entra no time A já decide quem fica no time B automaticamente — contar os times A possíveis é a mesma conta que contar as duas equipes juntas.$q$
where exam_year=2021 and item_number=49 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 50: número de maneiras = 2×2×C(4,2) = 2×2×6 = 24 = 4!.
update public.official_exam_questions set review_note=$q$Correto. Multiplicando as escolhas: 2 opções de delegado para a 1ª equipe × 2 opções de escrivão × C(4,2)=6 opções de dupla de agentes = 2 × 2 × 6 = 24. E 4! (fatorial de 4) = 4×3×2×1 = 24 também — os dois valores batem, é coincidência numérica que a questão explora.
Exemplo: é só multiplicar as escolhas independentes em sequência, como escolher roupa (2 camisas × 2 calças × 6 combinações de acessórios) e comparar o total com outro número dado.$q$
where exam_year=2021 and item_number=50 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 51: com pool maior que o necessário, equipe1: 3×4×C(6,2)=180; equipe2 (restante): 2×3×C(4,2)=36; total=180×36=6.480, que NÃO é superior a 6.500.
update public.official_exam_questions set review_note=$q$Errado. Agora sobra gente (3 delegados, 4 escrivães, 6 agentes pra só 2 equipes), então as escolhas não ficam "presas" como no item anterior. Pra 1ª equipe: 3 delegados × 4 escrivães × C(6,2)=15 duplas de agentes = 180 jeitos. Pra 2ª equipe, com quem sobrou (2 delegados, 3 escrivães, 4 agentes): 2 × 3 × C(4,2)=6 = 36 jeitos. Total: 180 × 36 = 6.480 — menos que 6.500, não mais como o item afirma.
Exemplo: é multiplicar as opções da primeira escolha pelas opções da segunda escolha (já com gente a menos disponível) — como escolher um time titular e depois um time reserva do que sobrou, nessa ordem.$q$
where exam_year=2021 and item_number=51 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 52 (2021, novo bloco): a equivalência certa de C→~M é ~M→~C (contrapositiva), não ~C→M como o item propõe.
update public.official_exam_questions set review_note=$q$Errado. P2 diz "Se as falhas foram corrigidas, os mutuários não tiveram prejuízo" (C→~M). A forma equivalente correta é a contrapositiva: invertendo e negando os dois lados, fica "Se os mutuários TIVERAM prejuízo, as falhas NÃO foram corrigidas" (M→~C). O item propõe "Se as falhas NÃO foram corrigidas, os mutuários tiveram prejuízo" (~C→M) — isso é outra coisa (chamada de "inversa"), que não tem o mesmo valor lógico da frase original.
Exemplo: "se estudei, passei na prova" garante "se não passei, não estudei" (contrapositiva, sempre junto) — mas NÃO garante "se não estudei, não passei" (posso ter passado sem estudar, por sorte ou conhecimento prévio).$q$
where exam_year=2021 and item_number=52 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 53 (2021, novo bloco): a negação de uma implicação F→~C não é outra implicação — é a conjunção F∧C.
update public.official_exam_questions set review_note=$q$Errado. A negação de uma implicação nunca é outra implicação — é uma conjunção ("E"): a negação de "Se a fiscalização foi deficiente, as falhas não foram corrigidas" (F→~C) é "A fiscalização foi deficiente E as falhas foram corrigidas" (F∧C). O item propõe "Se a fiscalização não foi deficiente, as falhas foram corrigidas" (~F→C), que continua sendo uma implicação — e por isso já está errado de cara, não é assim que se nega um "se... então".
Exemplo: a única forma de provar que "se chove, a rua molha" é FALSA é mostrar um caso em que choveu E a rua NÃO molhou — não adianta propor outra regra de "se... então" pra contradizer a primeira.$q$
where exam_year=2021 and item_number=53 and career_name='Agente de Polícia Federal' and official_answer='E';
