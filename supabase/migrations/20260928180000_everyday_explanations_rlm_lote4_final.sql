-- Explicações do dia a dia: Raciocínio Lógico, lote 4 (FINAL) — PF 2025,
-- itens 55-60. Fecha as 46 questões da matéria.

-- 55: cadeia de contrapositivas: ~Exterior→~Parente(de P)→~Sangue(de Q).
update public.official_exam_questions set review_note=$q$Correto. Vira a premissa P do avesso: "se Paulo NÃO é inocente OU NÃO estava no exterior, então ele NÃO é parente da vítima" — e "não estava no exterior" já basta pra ativar essa condição. Isso leva a "Paulo não é parente". Agora vira Q do avesso: "se Paulo NÃO é parente, então ele não tem nem o mesmo sobrenome nem o mesmo tipo sanguíneo". Encadeando as duas: não estava no exterior → não é parente → não tem o mesmo tipo sanguíneo. Bate exatamente com o item.
Exemplo: é seguir uma trilha de "se não isso, então não aquilo" em cadeia — cada elo te leva ao próximo, até chegar na conclusão final sem pular nenhum passo.$q$
where exam_year=2025 and item_number=55 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 56: contrapositiva de (Af∨Bf)→(Dpai_E∧Dpai_F): ~Dpai_E já basta (fortalece o antecedente da disjunção) pra concluir ~Af∧~Bf.
update public.official_exam_questions set review_note=$q$Correto. A frase original diz: "se Aldo OU Bruno é filho de Carlos, então Daniel é pai dos DOIS (Elza e Fernanda)". Virando do avesso: "se Daniel NÃO é pai de um dos dois (Elza OU Fernanda), então Carlos não é pai nem de Aldo nem de Bruno". Como "Elza não ser filha de Daniel" já é um caso de "não ser pai de um dos dois", a conclusão segue direto: Carlos não é pai de nenhum dos dois.
Exemplo: se a regra é "se X ou Y acontece, os DOIS resultados A e B têm que acontecer juntos", basta UM dos resultados falhar (só o A, por exemplo) pra já garantir que nem X nem Y aconteceram.$q$
where exam_year=2025 and item_number=56 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 57: a negação certa de "todo X é P" é "existe algum X que não é P", não "nenhum X é P" (que é uma afirmação bem mais forte e diferente).
update public.official_exam_questions set review_note=$q$Errado. A negação de "TODO condutor era brasileiro ou estrangeiro" não é "NENHUM condutor era" — é "PELO MENOS UM condutor não era nem brasileiro nem estrangeiro" (só precisa de UM caso pra derrubar um "todo"). "Nenhum" e "existe pelo menos um que não" são coisas bem diferentes.
Exemplo: pra provar que a frase "toda fruta dessa cesta é vermelha" é falsa, basta achar UMA fruta que não é vermelha — não é preciso mostrar que NENHUMA fruta da cesta é vermelha.$q$
where exam_year=2025 and item_number=57 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 58: P(1 irregular + 1 regular, sem reposição) = (200×800)/C(1000,2) = 160.000/499.500 ≈ 0,32 > 0,3.
update public.official_exam_questions set review_note=$q$Correto. A chance de sair uma placa irregular E uma regular (nas duas escolhidas) é: (200 × 800) dividido pelo total de duplas possíveis entre as 1.000 placas, C(1000,2)=499.500. Isso dá 160.000/499.500 ≈ 0,32 — mais que 0,3.
Exemplo: é a mesma lógica de tirar 2 bolinhas de uma urna com bolinhas de duas cores — a chance de sair "uma de cada cor" se calcula multiplicando as quantidades de cada cor e dividindo pelo total de pares possíveis.$q$
where exam_year=2025 and item_number=58 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 59: só existem 4 combinações possíveis de dígitos com soma≥26 (permutações de 999 e de 998); com 1000 veículos e só 4 "gavetas", alguma tem pelo menos 250 (princípio da casa dos pombos).
update public.official_exam_questions set review_note=$q$Correto. Com 3 dígitos de 0 a 9, a soma máxima é 27 (só com 9,9,9). Pra somar 26 ou mais, só existem 4 combinações possíveis nas posições: "999" (soma 27) e as 3 formas de organizar "9,9,8" (soma 26, com o 8 em cada uma das 3 posições). Ou seja, todas as 1.000 placas só podem ter uma dessas 4 sequências de dígitos. Espalhando 1.000 veículos em só 4 "gavetas" possíveis, pelo princípio da casa dos pombos, pelo menos uma gaveta tem 1.000÷4 = 250 ou mais.
Exemplo: se você tem 1.000 cartas pra guardar em só 4 gavetas, não tem como todas as gavetas terem menos de 250 cartas — pelo menos uma vai ter 250 ou mais, só pela quantidade não caber de forma mais espalhada.$q$
where exam_year=2025 and item_number=59 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 60: |V∪C| ≤ 160 (os 200 irregulares menos os 40 exclusivos de carga) força |V∩C| = 120+85-|V∪C| ≥ 205-160 = 45, que não é inferior a 40.
update public.official_exam_questions set review_note=$q$Errado. Como quem tem problema na carga (40 veículos) nunca tem problema no veículo nem no condutor, as irregularidades de veículo (120) e de condutor (85) precisam caber todas dentro dos 200−40=160 veículos restantes. Usando a fórmula da união (|V∪C| = |V|+|C|−|V∩C|) e sabendo que |V∪C| não pode passar de 160: 120+85−|V∩C| ≤ 160 → |V∩C| ≥ 45. Ou seja, o mínimo possível de veículos com os dois problemas ao mesmo tempo já é 45 — nunca menos que 40, como o item afirma.
Exemplo: se duas listas de problemas (120 e 85 itens) precisam caber dentro de uma caixa que só tem espaço pra 160, uma boa parte delas obrigatoriamente tem que se sobrepor — não dá pra encaixar 205 itens (120+85) numa caixa de 160 sem repetir pelo menos 45.$q$
where exam_year=2025 and item_number=60 and career_name='Agente de Polícia Federal' and official_answer='E';
