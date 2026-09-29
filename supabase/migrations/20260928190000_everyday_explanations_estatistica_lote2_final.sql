-- Explicações do dia a dia: Estatística, lote 2 (FINAL) — PF 2025, itens
-- 45-51. Fecha as 17 questões da matéria.

-- 45: S é um único número (a soma); "mediana" não se aplica a um valor só — o item confunde S (a soma) com a mediana da amostra ordenada.
update public.official_exam_questions set review_note=$q$Errado. S = X1+X2+X3+X4 é UM ÚNICO número (o resultado de somar as 4 observações) — não faz sentido falar da "mediana de S", porque mediana é uma medida que organiza VÁRIOS valores, não um valor só. O item confunde S (a soma) com "a mediana da amostra" (que aí sim, para 4 valores ordenados, seria a média dos dois do meio) — são cálculos diferentes, aplicados a coisas diferentes.
Exemplo: é como perguntar "qual a mediana do total da sua conta de mercado" — não faz sentido, mediana é pra organizar VÁRIOS preços de itens, não pro valor final somado.$q$
where exam_year=2025 and item_number=45 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 46: soma de normais é normal, não binomial (binomial é pra contar sucessos em tentativas discretas, não somar valores contínuos).
update public.official_exam_questions set review_note=$q$Errado. A soma de variáveis normais é sempre outra normal — nunca vira binomial. A distribuição binomial serve pra contar quantos "sucessos" aconteceram em várias tentativas de tudo-ou-nada (como caras em lançamentos de moeda); aqui estamos somando valores contínuos de uma distribuição normal, uma situação completamente diferente.
Exemplo: somar as alturas de 4 pessoas não vira uma "contagem de sucessos" — continua sendo uma medida contínua, só que agora somada. A natureza da variável (contínua) não muda por causa da soma.$q$
where exam_year=2025 and item_number=46 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 47: distribuição contínua tem P(valor exato)=0 sempre, inclusive P(S=4M)=0.
update public.official_exam_questions set review_note=$q$Correto. Em qualquer distribuição CONTÍNUA (e S, sendo soma de normais, também é contínua), a chance de acertar um valor exato específico é sempre zero — existem infinitos valores possíveis entre dois pontos quaisquer, então cada ponto isolado "pesa" zero na probabilidade. Isso vale pra 4M ou qualquer outro número específico.
Exemplo: é a mesma ideia de "qual a chance de alguém pesar exatamente 70,000000... kg" — tecnicamente zero, porque o peso pode assumir infinitos valores entre 69 e 71 kg; só faz sentido falar em intervalos ("entre 69 e 71kg"), não em pontos exatos.$q$
where exam_year=2025 and item_number=47 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 48: Var(S)=4V (soma de 4 iid), desvio padrão(S)=2√V; dividindo por √V sobra 2.
update public.official_exam_questions set review_note=$q$Correto. Quando se somam 4 variáveis independentes e idênticas, as VARIÂNCIAS se somam: Var(S) = V+V+V+V = 4V. O desvio padrão de S é a raiz disso: √(4V) = 2√V. Dividindo por √V, sobra exatamente 2.
Exemplo: é a mesma regra de juntar incertezas independentes — juntar 4 medições "tremidas" do mesmo jeito faz a incerteza total crescer, mas não 4 vezes: cresce pela raiz de 4, que é 2 vezes.$q$
where exam_year=2025 and item_number=48 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 49: 1,1 é o coeficiente ANGULAR (inclinação) da reta, não a correlação — e correlação nunca passa de 1 em valor absoluto, então 1,1 já é impossível de cara.
update public.official_exam_questions set review_note=$q$Errado. O valor 1,1 é o coeficiente ANGULAR da reta de regressão (o "quanto VL sobe pra cada unidade que VP sobe"), não a correlação de Pearson. Isso já dava pra perceber sem fazer conta nenhuma: a correlação de Pearson NUNCA passa de 1 (nem pra mais nem pra menos) — ela sempre fica entre −1 e 1. Como 1,1 está fora desse intervalo, já não poderia ser uma correlação de jeito nenhum.
Exemplo: é a diferença entre "quanto uma reta sobe" (pode ser qualquer número) e "quão bem os pontos se alinham nessa reta" (sempre entre -100% e 100% de alinhamento) — são medidas diferentes, uma sem limite e outra limitada.$q$
where exam_year=2025 and item_number=49 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 50: margem de erro real = z×erro padrão ≈ 1,96×(3000/6) ≈ 980, não os 500 (que seria só o erro padrão puro, sem multiplicar pelo z de 95%).
update public.official_exam_questions set review_note=$q$Errado. O erro padrão é 3.000 ÷ √36 = 500 — mas a margem de erro de um intervalo de 95% de confiança precisa multiplicar esse erro padrão pelo valor crítico (aproximadamente 1,96, pra uma amostra grande como essa): margem ≈ 1,96 × 500 ≈ 980, não os R$ 500 que o item usou. O item esqueceu de multiplicar pelo fator de confiança, usando só o erro padrão puro.
Exemplo: é como confundir "o tamanho do passo" com "a distância total percorrida" — o erro padrão é o "passo", mas a margem de confiança de 95% precisa de quase 2 passos, não só 1.$q$
where exam_year=2025 and item_number=50 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 51: b = r × (sd_VL/sd_VP); como r≤1 e b=1,1>0, sd_VL/sd_VP = 1,1/r ≥ 1,1 > 1, logo sd_VL sempre maior.
update public.official_exam_questions set review_note=$q$Correto. Na regressão, a inclinação da reta é b = correlação × (desvio padrão de VL ÷ desvio padrão de VP). Como a correlação nunca passa de 1, e aqui b=1,1 (positivo), a razão entre os desvios padrão (sd_VL ÷ sd_VP) tem que ser igual a 1,1 dividido pela correlação — e como a correlação é no máximo 1, essa razão é sempre maior ou igual a 1,1. Ou seja, sd_VL é sempre maior que sd_VP, não importa o valor exato da correlação.
Exemplo: se uma reta sobe "mais que 1 pra 1" (inclinação maior que 1) e o alinhamento dos pontos nunca é "perfeito demais" (correlação ≤1), a variável do eixo vertical (VL) tem que variar proporcionalmente mais que a do eixo horizontal (VP).$q$
where exam_year=2025 and item_number=51 and career_name='Agente de Polícia Federal' and official_answer='C';
