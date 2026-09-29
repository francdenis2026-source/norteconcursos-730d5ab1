-- Raciocínio Lógico, lote 3 — PF 2021 (itens 54-60, mesmo bloco de
-- argumentação do lote 2), SEFAZ-AC 2023/Especialista da Fazenda (itens
-- 11-15) e PF 2025 (itens 53-54).
--
-- CORREÇÕES DE DADOS encontradas ao reconferir o bloco do SEFAZ-AC 2023
-- (mesma prova que já tinha 2 erros corrigidos na migration
-- 20260928140000 — este bloco de "Conhecimentos Gerais" parece ter tido
-- problemas sistemáticos na importação):
-- - Item 11: gabarito estava 'A' (28%), oficial é 'B' (42%). Reconferido
--   contra o gabarito definitivo da CEBRASPE E recalculado (juros simples:
--   700 = 2.500 × i × 8/12 → i = 42%).
-- - Item 12: as ALTERNATIVAS deste item foram importadas em ORDEM
--   DIFERENTE da prova original (as letras A-E não correspondem às
--   mesmas da prova real). Usando o conteúdo lógico de cada alternativa
--   tal como está gravado no nosso banco (não a letra da prova original),
--   a opção logicamente equivalente a P2 é a nossa opção 'D' ("A demanda
--   ... não sofre retração OU ... diminuem preço e quantidade" = ~D∨(X∧Y),
--   equivalente a D→(X∧Y)); estava gravado como 'E'.
-- - Item 14: gabarito estava 'C' (15º termo), oficial é 'D' (16º termo).
--   Recalculado: termo_n = 2^(n-1) − 1; para superar 30.000 precisa de
--   2^(n-1) > 30.001, ou seja, n-1 ≥ 15, logo n = 16.
-- Itens 13 e 15 foram conferidos e já estavam certos.

update public.official_exam_questions set
  official_answer = 'B',
  review_note = $q$Correto (gabarito oficial CEBRASPE conferido em 29/09/2026, corrigindo erro de importação que constava 'A'). Juros simples: J = C × i × t, com t em anos (8 meses = 8/12 do ano, já que a taxa é anual). 700 = 2.500 × i × (8/12) → i = 700 ÷ (2.500 × 8/12) = 700 ÷ 1.666,67 = 0,42 = 42%.
Exemplo: é resolver de trás pra frente uma conta de juros simples que você já usa no dia a dia — sabendo quanto pagou de juro e por quanto tempo, isola a taxa na fórmula em vez de calcular o juro a partir da taxa.$q$
where exam_year=2023 and item_number=11 and career_name='Especialista da Fazenda Estadual' and official_answer='A';

update public.official_exam_questions set
  official_answer = 'D',
  review_note = $q$Correto (as alternativas deste item foram gravadas em ordem diferente da prova original; usando o texto de cada opção como está no nosso banco, a resposta certa é a nossa opção D). P2 diz "Se a demanda sofre retração, então diminuem preço E quantidade" (D→X∧Y). Toda implicação "SE A ENTÃO B" pode ser reescrita como "NÃO A OU B" — então D→(X∧Y) equivale exatamente a "a demanda NÃO sofre retração OU diminuem preço e quantidade" (~D∨(X∧Y)), que é a nossa opção D.
Exemplo: "se chove, eu levo guarda-chuva" significa exatamente o mesmo que "ou não chove, ou eu levo guarda-chuva" — são duas formas de dizer a mesma coisa, e essa troca (implicação vira "não A ou B") é uma regra fixa da lógica.$q$
where exam_year=2023 and item_number=12 and career_name='Especialista da Fazenda Estadual' and official_answer='E';

update public.official_exam_questions set
  official_answer = 'D',
  review_note = $q$Correto (gabarito oficial CEBRASPE conferido em 29/09/2026, corrigindo erro de importação que constava 'C'). Cada termo é 2 elevado a (posição−1), menos 1: termo 1=2⁰−1=0, termo 2=2¹−1=1, termo 3=2²−1=3, e assim por diante. Precisamos do primeiro termo maior que 30.000: 2^14−1=16.383 (ainda não passa) e 2^15−1=32.767 (já passa) — então é o termo de posição 16 (já que 2^(16−1)=2^15).
Exemplo: é a mesma lógica de "quantas vezes eu dobro uma folha de papel até ela ficar mais grossa que um prédio" — o crescimento é exponencial, então poucos passos a mais fazem uma diferença enorme no resultado.$q$
where exam_year=2023 and item_number=14 and career_name='Especialista da Fazenda Estadual' and official_answer='C';

-- 13: cadeia de 4 implicações (silogismo hipotético) leva de "crise" até "ação volátil" — argumento válido usando todas as premissas.
update public.official_exam_questions set review_note=$q$Correto. Encadeando as quatro premissas (crise→retração da demanda→queda de preço/quantidade→queda de faturamento→lucro afetado, investidor receoso E ação volátil), forma-se uma corrente lógica válida do início ao fim. Uma das conclusões que essa corrente garante é justamente "se há crise, a ação da empresa fica volátil" — pegando só o primeiro e o último elo da corrente.
Exemplo: é como um dominó bem montado — empurrando a primeira peça (crise), o efeito se propaga até a última (ação volátil), mesmo pulando as peças do meio na hora de descrever o resultado final.$q$
where exam_year=2023 and item_number=13 and career_name='Especialista da Fazenda Estadual' and official_answer='C';

-- 15: termo 10 = 2^9-1 = 511.
update public.official_exam_questions set review_note=$q$Correto. Cada termo é 2 elevado a (posição menos 1), menos 1. O décimo termo é 2^9 − 1 = 512 − 1 = 511.
Exemplo: é a mesma sequência de "1 vira 2, 2 vira 4, 4 vira 8..." (potências de 2) só que cada termo fica "faltando 1" pra completar a próxima potência.$q$
where exam_year=2023 and item_number=15 and career_name='Especialista da Fazenda Estadual' and official_answer='B';

-- 54 (2021): tabela-verdade de 3 variáveis simples tem sempre 2³=8 linhas, menos de 10.
update public.official_exam_questions set review_note=$q$Correto. Como o argumento usa 3 proposições simples diferentes (fiscalização, falhas corrigidas, prejuízo dos mutuários), a tabela-verdade tem 2³ = 8 linhas — uma pra cada combinação possível de verdadeiro/falso entre as três. Oito é menos que dez.
Exemplo: é a mesma lógica de "quantas combinações de cara ou coroa existem jogando 3 moedas" — cada moeda dobra as possibilidades, então 3 moedas dão 2×2×2=8 resultados possíveis.$q$
where exam_year=2021 and item_number=54 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 55: negação de (F∧C) é ~F∨~C, que é exatamente F→~C (definição de implicação) — P1 é mesmo equivalente a essa negação.
update public.official_exam_questions set review_note=$q$Correto. Toda implicação "SE A ENTÃO B" pode ser escrita como "NÃO A OU B". Aplicando em P1 (fiscalização deficiente → falhas não corrigidas): "NÃO fiscalização deficiente OU falhas não corrigidas" — que, por sua vez, é exatamente a negação de "fiscalização foi deficiente E as falhas foram corrigidas" (as duas coisas juntas). É outra forma de dizer a mesma coisa.
Exemplo: dizer "não é verdade que estudei e fui mal na prova" é o mesmo que dizer "ou eu não estudei, ou eu não fui mal" — são frases equivalentes, só organizadas de formas diferentes.$q$
where exam_year=2021 and item_number=55 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 56: validade da forma do argumento não garante que a conclusão seja de fato verdadeira — precisa também que as premissas sejam realmente verdadeiras (soundness ≠ validity).
update public.official_exam_questions set review_note=$q$Errado. Validade é sobre a FORMA do raciocínio: um argumento é válido quando, SE as premissas forem verdadeiras, a conclusão tem que ser verdadeira também. Mas isso não garante, sozinho, que a conclusão seja verdadeira DE FATO — só garante isso condicionado a as premissas serem realmente verdadeiras. "O argumento ser válido" e "as premissas serem verdadeiras" são coisas diferentes; o item confunde as duas.
Exemplo: o argumento "todo peixe voa; um tubarão é peixe; logo, tubarão voa" tem uma FORMA perfeitamente válida — mas a conclusão é falsa, porque a primeira premissa (peixes voam) é mentira. Validade não é garantia de verdade.$q$
where exam_year=2021 and item_number=56 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 57: seguindo P3(F verdadeira)+P1 chega-se a ~Corrig, o que torna o antecedente de P2 falso — P2 fica vazia de informação sobre M, então a conclusão C não decorre validamente das premissas.
update public.official_exam_questions set review_note=$q$Correto. De P3 (a fiscalização foi deficiente) e P1 (fiscalização deficiente → falhas não corrigidas), conclui-se que as falhas NÃO foram corrigidas. Só que P2 só fala alguma coisa sobre os mutuários SE as falhas TIVEREM sido corrigidas — como isso não aconteceu, P2 simplesmente não se aplica, não dá nenhuma informação sobre M. Sem uma premissa que realmente conecte a essas informações à conclusão C, o argumento não consegue provar C — por isso não é válido.
Exemplo: é como um argumento que promete "se chover, eu levo guarda-chuva" — mas descobrimos que NÃO choveu. Essa premissa não te diz nada sobre se a pessoa levou ou não o guarda-chuva; ela simplesmente "não entra em ação" nesse cenário.$q$
where exam_year=2021 and item_number=57 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 58: P é a união infinita de P1,P2,P3,... pois todo policial tem uma quantidade finita de anos de experiência, que cabe em algum Pn.
update public.official_exam_questions set review_note=$q$Correto. Cada policial tem uma quantidade de experiência bem definida (2 anos, 7 anos, 30 anos...), e por maior que seja esse número, sempre existe um Pn grande o suficiente pra incluir aquele policial (Pn = "até n anos"). Juntando TODOS os Pn possíveis, cada policial acaba entrando em algum deles — e a soma de todos esses conjuntos é exatamente P, o conjunto de todos os policiais.
Exemplo: é como dizer "todo número natural cabe em algum 'os números até N'" — não importa quão grande o número seja, existe sempre um N maior que ele; juntando todos os "até N" possíveis, você cobre todos os números.$q$
where exam_year=2021 and item_number=58 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 59: P1 (até 1 ano) é que está DENTRO de P2 (até 2 anos), não o contrário.
update public.official_exam_questions set review_note=$q$Errado. É o contrário do que o item afirma: P1 (até 1 ano de experiência) é que está DENTRO de P2 (até 2 anos de experiência) — todo policial com até 1 ano também tem, obviamente, até 2 anos. P2 é o conjunto maior, P1 é o menor.
Exemplo: quem tem carteira de motorista há 1 ano também "tem carteira há até 2 anos" — o grupo "até 1 ano" está contido no grupo "até 2 anos", nunca o inverso.$q$
where exam_year=2021 and item_number=59 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 60: probabilidade certa é n(P3-P2)/n(P) — o item erra o subconjunto (troca P2-P3, que é vazio, já que P2⊆P3) e o denominador (usa n(P3) em vez do total da população n(P)).
update public.official_exam_questions set review_note=$q$Errado. Duas coisas erradas no item: primeiro, "entre 2 e 3 anos" deveria ser P3−P2 (quem tem até 3 anos, mas não até 2), não P2−P3 — e como P2 está DENTRO de P3, o conjunto P2−P3 nem existe (é vazio)! Segundo, a probabilidade de um evento sempre se divide pelo TOTAL da população (n(P)), não por um subconjunto específico como n(P3).
Exemplo: calcular "a chance de tirar uma carta de copas" sempre divide pelo baralho inteiro (52 cartas), nunca só pelas cartas vermelhas — dividir por um grupo menor infla artificialmente a probabilidade.$q$
where exam_year=2021 and item_number=60 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 53 (2025): tabela-verdade de P∨Q→~R dá 5 V's e 3 F's, não 4-4.
update public.official_exam_questions set review_note=$q$Errado. Preenchendo as 8 linhas (P∨Q)→(~R): o resultado só dá falso quando P∨Q é verdadeiro E R também é verdadeiro (aí ~R é falso, quebrando a implicação) — isso acontece em 3 das 8 linhas (as que têm R=V e pelo menos um de P/Q verdadeiro). As outras 5 linhas dão verdadeiro. Então o placar real é 5 V's e 3 F's, não 4 e 4 como o item afirma.
Exemplo: contar quantas vezes uma regra "falha" numa tabela é mais rápido do que testar tudo de novo — aqui, a regra só falha quando R é verdadeiro e (P ou Q) também — 3 combinações específicas, não metade das linhas.$q$
where exam_year=2025 and item_number=53 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 54 (2025): das 3 negações, deduz-se X inocente, Z inocente, Y culpado — o culpado é Y, não X.
update public.official_exam_questions set review_note=$q$Errado. Como todos mentiram, cada afirmação vira o contrário do que foi dito. Y disse "o culpado foi Z ou X" — mentira, então Z E X são inocentes, os dois. X disse "nem Y nem Z são culpados" — mentira, então Y OU Z é culpado; como Z já é inocente (acabamos de descobrir), sobra Y como culpado. Conferindo com a mentira de Z ("os culpados foram Y e X" — mentira, então Y é inocente OU X é inocente — como X é mesmo inocente, a frase de Z bate como mentira sem problema). O culpado é Y, não X como o item afirma.
Exemplo: é resolver como um quebra-cabeça de detetive — cada mentira "abre uma porta" pra próxima dedução, começando pela afirmação que dá a informação mais direta (a de Y, que já descarta dois suspeitos de uma vez).$q$
where exam_year=2025 and item_number=54 and career_name='Agente de Polícia Federal' and official_answer='E';
