#!/usr/bin/env python3
"""Acrescenta questões autorais de Estatística aos assuntos com poucas questões (idempotente).
Depois rode scripts/build-pcac-area-catalog.py para gerar ids e SQLs."""
import json, pathlib, re

HTML = pathlib.Path(__file__).resolve().parent.parent / "src/estudo/estudo-pc-acre.html"
NEW = []

def Q(t, q, right, wrongs, steps, dica, pede):
    """right: texto certo; wrongs: [(texto, motivo)] x4; steps: passos; pede: o que a questão pede."""
    assert len(wrongs) == 4
    pos = (len(NEW) * 3 + 1) % 5
    ops = [w[0] for w in wrongs]
    ops.insert(pos, right)
    why = " ".join(f"{'ABCDE'[k]} ({o}): {dict(wrongs).get(o)}" for k, o in enumerate(ops) if k != pos)
    exp = " ".join(f"Passo {i+1}: {s}" for i, s in enumerate(steps)) + f" Resposta: <b>{'ABCDE'[pos]}</b>."
    NEW.append({"t": t, "q": q, "ops": ops, "c": pos, "exp": exp, "dica": dica,
                "ps": [pede, steps + [f"Resposta: <b>{'ABCDE'[pos]}</b>."], why]})

# ---------------- Correlação e regressão ----------------
C = "correlacao"
Q(C, "O coeficiente de correlação linear de Pearson (r) entre duas variáveis pode assumir valores:", "entre −1 e +1, inclusive.",
  [("entre 0 e 1, inclusive.", "só cobre a correlação positiva; r também pode ser negativo."), ("entre 0 e 100.", "isso seria uma porcentagem, não o r."),
   ("qualquer número real.", "r é limitado: nunca passa de 1 em módulo."), ("entre −100 e +100.", "r não é dado em porcentagem.")],
  ["O r mede a <b>direção</b> e a <b>força</b> da relação linear.", "<b>+1</b> é correlação positiva perfeita; <b>−1</b>, negativa perfeita; <b>0</b>, nenhuma relação linear.", "Portanto r fica sempre no intervalo de −1 a +1."],
  "r vai de −1 a +1. Sinal = direção; módulo = força.", "O intervalo possível do coeficiente r.")
Q(C, "Em uma pesquisa, a correlação entre as horas semanais de televisão e a nota em simulados foi r = −0,9. A interpretação correta é:", "há forte correlação linear negativa: mais horas de TV tendem a vir com notas menores.",
  [("há correlação fraca e negativa.", "0,9 em módulo é forte, não fraca."), ("há forte correlação positiva.", "o sinal negativo indica que as variáveis andam em sentidos opostos."),
   ("90% da variação das notas é explicada pela TV.", "isso confunde r com r². Aqui r² = 0,81, ou seja, 81%."), ("não há relação alguma entre as variáveis.", "r próximo de 0 indicaria ausência de relação linear.")],
  ["O <b>módulo</b> de r é 0,9: próximo de 1, portanto relação <b>forte</b>.", "O <b>sinal</b> é negativo: quando uma variável sobe, a outra tende a descer.", "Forte e negativa. Isso não prova que a TV <b>causa</b> a queda da nota."],
  "Sinal diz o sentido; o módulo diz a força.", "Interpretar r = −0,9.")
Q(C, "Dois conjuntos de dados têm covariância igual a 12, desvio-padrão de X igual a 4 e desvio-padrão de Y igual a 5. O coeficiente de correlação de Pearson é:", "0,6",
  [("0,36", "é o r² (0,6²), não o r."), ("2,4", "é cov ÷ DP de Y; faltou dividir também pelo DP de X."), ("3,0", "é cov ÷ DP de X; faltou dividir pelo DP de Y."), ("1,33", "r nunca passa de 1; dividir por 4 + 5 não é a fórmula.")],
  ["Fórmula: <b>r = cov(X,Y) ÷ (DP de X × DP de Y)</b>.", "Denominador: 4 × 5 = <b>20</b>.", "r = 12 ÷ 20 = <b>0,6</b>."],
  "r = covariância ÷ (produto dos desvios-padrão).", "Calcular r a partir de cov e dos DPs.")
Q(C, "Uma reta de regressão linear simples é ŷ = 2 + 3x. O valor previsto de y quando x = 4 é:", "14",
  [("12", "faltou somar o intercepto 2."), ("9", "somou os números (2 + 3 + 4) em vez de aplicar a equação."), ("20", "multiplicou (2 + 3) por 4; a conta é 2 + 3 × 4."), ("24", "multiplicou os três números.")],
  ["Substitua x = 4 na equação: ŷ = 2 + 3 × 4.", "Multiplicação primeiro: 3 × 4 = 12.", "Depois some o intercepto: 2 + 12 = <b>14</b>."],
  "Previsão: troque x na equação e respeite a ordem das operações.", "Prever y pela reta ŷ = 2 + 3x.")
Q(C, "Sabe-se que r = 0,8, o desvio-padrão de Y é 10 e o desvio-padrão de X é 4. O coeficiente angular (inclinação) da reta de regressão de Y sobre X é:", "2",
  [("3,2", "é r × DP de X; a fórmula usa DP de Y ÷ DP de X."), ("0,32", "é r × DP de X ÷ DP de Y: a razão dos desvios está invertida."), ("8", "é r × DP de Y; faltou dividir pelo DP de X."), ("2,5", "é só DP de Y ÷ DP de X; esqueceu de multiplicar por r.")],
  ["Fórmula: <b>b = r × (DP de Y ÷ DP de X)</b>.", "Razão dos desvios: 10 ÷ 4 = 2,5.", "Multiplique por r: 0,8 × 2,5 = <b>2</b>."],
  "Inclinação b = r × DP(Y) ÷ DP(X).", "Calcular a inclinação da reta de regressão.")
Q(C, "Se o coeficiente de correlação entre duas variáveis é r = 0,7, o coeficiente de determinação (R²) vale:", "0,49, isto é, 49%.",
  [("0,70, isto é, 70%.", "R² não é igual a r; é o quadrado de r."), ("0,07, isto é, 7%.", "dividiu por 10 em vez de elevar ao quadrado."), ("0,30, isto é, 30%.", "é 1 − r, que não tem esse significado."), ("0,35, isto é, 35%.", "dividiu r por 2; a conta é elevar ao quadrado.")],
  ["O coeficiente de determinação é <b>R² = r²</b>.", "0,7 × 0,7 = <b>0,49</b>.", "Leitura: 49% da variação de Y é explicada pela relação linear com X."],
  "R² = r². Para r = 0,7, R² = 0,49.", "Calcular R² a partir de r.")
Q(C, "Uma cidade registra forte correlação positiva entre as vendas de sorvete e o número de afogamentos em piscinas. A conclusão mais adequada é:", "pode existir uma terceira variável, como o calor, associada às duas; correlação não prova causalidade.",
  [("o consumo de sorvete causa afogamentos.", "associação não é causa; falta evidência de que um provoque o outro."), ("os afogamentos fazem as vendas de sorvete subirem.", "também confunde correlação com causa."), ("o coeficiente r mede a relação de causa e efeito.", "r mede só a associação linear."), ("as variáveis são independentes.", "correlação forte indica associação, não independência.")],
  ["Correlação forte significa que as variáveis <b>andam juntas</b>.", "Isso não diz quem causa quem. Pode haver uma variável oculta: o <b>calor</b> aumenta o sorvete e também o uso de piscinas.", "Conclusão: correlação <b>não implica</b> causalidade."],
  "Correlação não prova causa. Procure a terceira variável.", "Interpretar uma correlação sem inferir causa.")
Q(C, "Somando 10 unidades a todos os valores de X (e mantendo Y igual), o coeficiente de correlação r entre X e Y:", "não se altera.",
  [("aumenta em 10 unidades.", "r é adimensional e limitado a [−1, 1]; não soma constantes."), ("é multiplicado por 10.", "isso valeria para a covariância se multiplicássemos, não para r."), ("passa a ser zero.", "deslocar X não apaga a relação linear."), ("troca de sinal.", "o sinal só mudaria se multiplicássemos por um número negativo.")],
  ["Somar uma constante apenas <b>desloca</b> X; o formato da nuvem de pontos não muda.", "A covariância e o DP de X não mudam com o deslocamento.", "Logo r permanece o mesmo."],
  "Somar constante não muda r. Multiplicar por negativo troca o sinal.", "Efeito de somar constante sobre r.")
Q(C, "Em uma regressão, a média de Y é 20, a média de X é 5 e a inclinação é b = 2. O intercepto a da reta ŷ = a + bx é:", "10",
  [("30", "somou b × média de X em vez de subtrair."), ("15", "subtraiu só a média de X."), ("18", "subtraiu só a inclinação."), ("4", "dividiu a média de Y pela média de X.")],
  ["A reta passa pelo ponto das médias: <b>ȳ = a + b × x̄</b>.", "Logo a = ȳ − b × x̄ = 20 − 2 × 5.", "a = 20 − 10 = <b>10</b>."],
  "Intercepto: a = média de Y − b × média de X.", "Achar o intercepto da reta de regressão.")
Q(C, "Para os pares (x, y): (1, 2), (2, 4), (3, 5), (4, 4), (5, 5), a inclinação da reta de regressão de y sobre x é:", "0,6",
  [("0,8", "o numerador correto, Σ(x−x̄)(y−ȳ), é 6 e não 8."), ("1,0", "seria 10 ÷ 10; o numerador correto é 6, não 10."), ("0,4", "seria 4 ÷ 10; o numerador correto é 6."), ("6", "é só o numerador (6); faltou dividir por Σ(x − x̄)² = 10.")],
  ["Médias: x̄ = 3 e ȳ = 4.", "Produtos dos desvios: (−2)(−2) + (−1)(0) + (0)(1) + (1)(0) + (2)(1) = 4 + 0 + 0 + 0 + 2 = <b>6</b>. Soma dos quadrados de x: 4 + 1 + 0 + 1 + 4 = <b>10</b>.", "b = 6 ÷ 10 = <b>0,6</b>."],
  "b = Σ(x−x̄)(y−ȳ) ÷ Σ(x−x̄)².", "Calcular b a partir dos pares.")
Q(C, "Um ponto muito afastado da nuvem de pontos (outlier) em um diagrama de dispersão tende a:", "alterar bastante o coeficiente r e a reta de regressão.",
  [("não influenciar nem r nem a reta.", "pontos extremos têm grande influência nas duas medidas."), ("afetar apenas a média de X.", "afeta também a reta e o r."), ("sempre aumentar o valor de r.", "pode aumentar ou diminuir, dependendo da posição."), ("tornar r igual a zero.", "não há efeito fixo; depende do ponto.")],
  ["Pearson e a reta de mínimos quadrados usam <b>todos</b> os pontos, com peso pelos desvios ao quadrado.", "Um ponto distante tem desvio grande e puxa a reta e o r.", "Por isso se deve olhar o diagrama de dispersão antes de confiar no r."],
  "Outlier distorce r e a reta. Olhe o gráfico.", "Efeito de outlier na correlação.")
Q(C, "Todos os pontos de um diagrama de dispersão estão exatamente sobre uma reta decrescente. O coeficiente r vale:", "−1",
  [("0", "zero indicaria ausência de relação linear."), ("+1", "seria uma reta crescente."), ("−0,5", "correlação perfeita não é intermediária."), ("−2", "r nunca passa de −1.")],
  ["Pontos exatamente alinhados significam relação linear <b>perfeita</b>: |r| = 1.", "A reta é <b>decrescente</b>: o sinal é negativo.", "Logo r = <b>−1</b>."],
  "Reta perfeita: |r| = 1. Decrescente = −1.", "Valor de r para pontos sobre reta decrescente.")
Q(C, "A reta ajustada é ŷ = 5 − 2x. Para x = 3, o valor previsto de y é:", "−1",
  [("11", "somou 2 × 3 em vez de subtrair."), ("1", "tirou o sinal do resultado."), ("−6", "esqueceu o intercepto 5."), ("−11", "trocou todos os sinais.")],
  ["Substitua x = 3: ŷ = 5 − 2 × 3.", "Multiplique: 2 × 3 = 6.", "5 − 6 = <b>−1</b>."],
  "Respeite o sinal do coeficiente.", "Prever y com inclinação negativa.")

# ---------------- Análise combinatória e progressões ----------------
M = "comb"
Q(M, "O número de anagramas da palavra CASA é:", "12",
  [("24", "é 4!, que ignora a letra A repetida."), ("6", "dividiu por 4 em vez de por 2!."), ("8", "não corresponde à contagem."), ("16", "é 4², contagem errada.")],
  ["A palavra tem 4 letras, com o <b>A repetido 2 vezes</b>.", "Permutação com repetição: 4! ÷ 2!.", "24 ÷ 2 = <b>12</b>."],
  "Letras repetidas: divida por (repetições)!.", "Anagramas com letra repetida.")
Q(M, "Uma comissão de 3 delegados será escolhida entre 8 candidatos, sem funções distintas. O número de comissões possíveis é:", "56",
  [("336", "é o arranjo A(8,3), que conta a ordem."), ("24", "multiplicou 8 × 3."), ("512", "é 8³, que permitiria repetição."), ("28", "é C(8,2), uma comissão de 2 pessoas.")],
  ["Sem funções distintas, a <b>ordem não importa</b>: combinação.", "C(8,3) = 8 × 7 × 6 ÷ (3 × 2 × 1).", "336 ÷ 6 = <b>56</b>."],
  "Ordem não importa: combinação. Ordem importa: arranjo.", "Combinação C(8,3).")
Q(M, "De um grupo de 7 policiais serão escolhidos um coordenador e um vice-coordenador. De quantas maneiras isso pode ser feito?", "42",
  [("21", "é C(7,2); aqui as funções diferem, então a ordem importa."), ("49", "permitiria a mesma pessoa nas duas funções."), ("14", "somou 7 + 7."), ("5040", "é 7!, ordenando todos.")],
  ["As funções são diferentes: a <b>ordem importa</b>, é arranjo.", "Coordenador: 7 escolhas. Vice: 6 escolhas (a pessoa já escolhida sai).", "7 × 6 = <b>42</b>."],
  "Funções diferentes: ordem importa, arranjo.", "Arranjo A(7,2).")
Q(M, "Em uma progressão aritmética, o primeiro termo é 5 e a razão é 3. O décimo termo é:", "32",
  [("35", "somou 10 razões; o 10º termo tem 9 razões."), ("29", "usou 8 razões."), ("26", "usou 7 razões."), ("45", "multiplicou 5 × 9 em vez de somar 9 razões ao primeiro termo.")],
  ["Fórmula: <b>aₙ = a₁ + (n − 1) × r</b>.", "a₁₀ = 5 + 9 × 3.", "5 + 27 = <b>32</b>."],
  "n-ésimo termo: a1 + (n − 1)·r.", "Termo geral da PA.")
Q(M, "A soma dos 10 primeiros termos de uma PA com a₁ = 2 e a₁₀ = 20 é:", "110",
  [("220", "esqueceu de dividir por 2."), ("22", "somou só os extremos."), ("100", "não corresponde à fórmula da soma."), ("55", "dividiu a soma por 2 duas vezes.")],
  ["Fórmula: <b>S = n × (a₁ + aₙ) ÷ 2</b>.", "Soma dos extremos: 2 + 20 = 22.", "S = 10 × 22 ÷ 2 = <b>110</b>."],
  "Soma da PA = n × (primeiro + último) ÷ 2.", "Soma dos termos de uma PA.")
Q(M, "Em uma progressão geométrica, o primeiro termo é 3 e a razão é 2. O sexto termo é:", "96",
  [("192", "é o sétimo termo; usou 6 razões."), ("48", "é o quinto termo."), ("18", "multiplicou 3 × 6 em vez de usar potência."), ("384", "é o oitavo termo (3 × 2⁷).")],
  ["Fórmula: <b>aₙ = a₁ × q^(n − 1)</b>.", "a₆ = 3 × 2⁵ = 3 × 32.", "3 × 32 = <b>96</b>."],
  "PG: expoente é n − 1.", "Termo geral da PG.")
Q(M, "Uma senha tem 3 dígitos distintos, escolhidos entre 0 e 9. O número de senhas possíveis é:", "720",
  [("1000", "permitiria repetir dígitos."), ("504", "é 9 × 8 × 7: começou com 9 opções, mas o primeiro dígito também pode ser 0."), ("120", "é C(10,3); a ordem importa em senha."), ("90", "conta só 2 dígitos.")],
  ["Em senha a <b>ordem importa</b> e os dígitos são <b>distintos</b>.", "1º dígito: 10 opções; 2º: 9; 3º: 8.", "10 × 9 × 8 = <b>720</b>."],
  "Senha sem repetição: arranjo.", "Princípio multiplicativo sem repetição.")
Q(M, "Uma equipe terá 2 homens escolhidos entre 5 e 2 mulheres escolhidas entre 4. O número de equipes possíveis é:", "60",
  [("126", "é C(9,4), que ignora a divisão por sexo."), ("16", "somou os números de escolhas."), ("20", "é 5 × 4, que escolheria 1 de cada."), ("36", "usou 6 × 6, isto é, C(4,2) para os dois grupos.")],
  ["Homens: C(5,2) = <b>10</b>.", "Mulheres: C(4,2) = <b>6</b>.", "Escolhas independentes: multiplique, 10 × 6 = <b>60</b>."],
  "Escolhas independentes: multiplique.", "Combinações em etapas.")
Q(M, "Uma senha de 4 dígitos pode repetir dígitos, escolhidos entre 0 e 9. O número de senhas possíveis é:", "10.000",
  [("5.040", "é a conta sem repetição (10 × 9 × 8 × 7)."), ("40", "somou os dígitos."), ("210", "é C(10,4)."), ("1.000", "é 10³, que são só 3 dígitos.")],
  ["Cada uma das 4 posições tem <b>10 opções</b>, e pode repetir.", "Princípio multiplicativo: 10 × 10 × 10 × 10.", "10⁴ = <b>10.000</b>."],
  "Com repetição: base^posições.", "Arranjo com repetição.")
Q(M, "De quantas maneiras 5 agentes podem formar uma fila única?", "120",
  [("25", "é 5², que permitiria repetir agentes."), ("5", "só um agente na fila."), ("60", "é 5!/2, sem motivo."), ("720", "é 6!, que serve para 6 agentes.")],
  ["Todos os agentes entram e a <b>ordem importa</b>: permutação.", "P(5) = 5! = 5 × 4 × 3 × 2 × 1.", "= <b>120</b>."],
  "Permutação de n: n!.", "Permutação simples.")

# ---------------- Conceitos fundamentais ----------------
K = "conceitos"
Q(K, "Em um levantamento com os investigadores de uma delegacia, a variável 'número de filhos' é classificada como:", "quantitativa discreta.",
  [("qualitativa nominal.", "é uma contagem numérica, não uma categoria."), ("qualitativa ordinal.", "não há categorias ordenadas, e sim números."), ("quantitativa contínua.", "o número de filhos é contado, não medido; só assume inteiros."), ("qualitativa dicotômica.", "tem mais de duas opções, e é numérica.")],
  ["O número de filhos é <b>numérico</b>: variável quantitativa.", "Resulta de <b>contagem</b> e só assume valores inteiros (0, 1, 2…): discreta.", "Logo é quantitativa discreta."],
  "Contagem = discreta. Medição = contínua.", "Classificar a variável.")
Q(K, "A variável 'grau de escolaridade' (fundamental, médio, superior), em um cadastro, é:", "qualitativa ordinal.",
  [("qualitativa nominal.", "nominal não tem ordem natural; aqui há ordem."), ("quantitativa discreta.", "não é contagem numérica."), ("quantitativa contínua.", "não é medida."), ("quantitativa intervalar.", "categorias não têm distância numérica.")],
  ["Os valores são <b>categorias</b>: qualitativa.", "Mas existe uma <b>ordem natural</b> entre elas: fundamental < médio < superior.", "Qualitativa com ordem é <b>ordinal</b>."],
  "Categoria com ordem: ordinal. Sem ordem: nominal.", "Classificar variável qualitativa.")
Q(K, "A variável 'peso, em quilogramas, de cada apreensão' é classificada como:", "quantitativa contínua.",
  [("quantitativa discreta.", "peso é medido e pode assumir valores fracionários."), ("qualitativa nominal.", "é numérica."), ("qualitativa ordinal.", "é numérica."), ("quantitativa nominal.", "não existe essa classificação.")],
  ["Peso é uma <b>medida numérica</b>.", "Pode assumir qualquer valor em um intervalo (12,3; 12,35…).", "Logo é <b>contínua</b>."],
  "Medida (peso, altura, tempo) = contínua.", "Classificar variável quantitativa.")
Q(K, "A variável 'estado civil' (solteiro, casado, divorciado) é classificada como:", "qualitativa nominal.",
  [("qualitativa ordinal.", "não há ordem natural entre as categorias."), ("quantitativa discreta.", "não é número."), ("quantitativa contínua.", "não é número."), ("qualitativa intervalar.", "essa classificação não existe para categorias.")],
  ["Os valores são <b>categorias</b>: qualitativa.", "Não há ordem natural entre solteiro, casado e divorciado.", "Logo é <b>nominal</b>."],
  "Categoria sem ordem: nominal.", "Classificar variável qualitativa.")
Q(K, "Uma média calculada a partir de uma amostra, usada para estimar a média da população, é chamada de:", "estatística (estimativa).",
  [("parâmetro.", "parâmetro é a medida da população inteira, em geral desconhecida."), ("população.", "população é o conjunto de elementos, não uma medida."), ("censo.", "censo é a pesquisa com todos os elementos."), ("erro amostral.", "erro é a diferença entre estimativa e parâmetro.")],
  ["Medida calculada na <b>população</b> inteira: <b>parâmetro</b>.", "Medida calculada na <b>amostra</b>: <b>estatística</b> (estimativa).", "A questão fala de amostra: estatística."],
  "População → parâmetro. Amostra → estatística.", "Distinguir parâmetro e estatística.")
Q(K, "A pesquisa que examina todos os elementos de uma população é denominada:", "censo.",
  [("amostragem.", "amostragem examina só parte da população."), ("inferência.", "inferência é concluir sobre a população a partir da amostra."), ("estimação.", "estimação usa amostra."), ("experimento.", "experimento manipula fatores em estudo.")],
  ["Investigar <b>todos</b> os elementos é censo.", "Investigar só uma parte é amostragem.", "Logo, censo."],
  "Todos = censo. Parte = amostra.", "Conceito de censo.")
Q(K, "Em uma amostragem aleatória simples, é correto afirmar que:", "todo elemento da população tem a mesma chance de ser escolhido.",
  [("apenas os elementos mais acessíveis são escolhidos.", "isso é amostragem por conveniência."), ("a população é dividida em grupos e todos os grupos são pesquisados.", "isso descreve estratificação ou conglomerados."), ("escolhe-se um elemento a cada k posições.", "isso é amostragem sistemática."), ("o pesquisador escolhe os elementos que considera típicos.", "isso é amostragem intencional.")],
  ["Na aleatória simples o sorteio é feito <b>sem preferência</b>.", "Cada elemento tem a mesma probabilidade de ser selecionado.", "Isso evita viés de seleção."],
  "Aleatória simples = mesma chance para todos.", "Conceito de amostragem aleatória simples.")
Q(K, "Calcular a média de um grupo e concluir algo sobre uma população maior, com margem de erro, é típico da estatística:", "inferencial.",
  [("descritiva.", "descritiva só resume os dados observados, sem generalizar."), ("determinística.", "não é um ramo da estatística aplicada."), ("exploratória.", "organiza dados, mas sem generalizar com margem de erro."), ("probabilística pura.", "probabilidade modela chances, não infere a partir de dados.")],
  ["Resumir os dados em mãos é <b>descritiva</b>.", "Generalizar para a população com margem de erro é <b>inferencial</b>.", "A questão fala em concluir sobre a população."],
  "Generaliza com erro: inferencial.", "Descritiva versus inferencial.")

# ---------------- Distribuição de frequências ----------------
F = "frequencias"
Q(F, "Em uma distribuição com classes, a classe 10 |— 20 tem ponto médio igual a:", "15",
  [("10", "é o limite inferior."), ("20", "é o limite superior."), ("30", "é a soma dos limites, sem dividir por 2."), ("5", "é metade do limite inferior.")],
  ["Ponto médio = (limite inferior + limite superior) ÷ 2.", "(10 + 20) ÷ 2 = 15.", "O ponto médio representa a classe nos cálculos."],
  "Ponto médio = média dos limites da classe.", "Ponto médio de classe.")
Q(F, "Os dados variam de 12 a 52 e serão agrupados em 5 classes de mesma amplitude. A amplitude de cada classe é:", "8",
  [("10", "dividiu 52 por 5 e arredondou; use a amplitude total."), ("40", "é a amplitude total, antes de dividir pelas classes."), ("5", "é o número de classes."), ("9", "somou 1 sem necessidade.")],
  ["Amplitude total = maior − menor = 52 − 12 = <b>40</b>.", "Amplitude de classe = amplitude total ÷ número de classes.", "40 ÷ 5 = <b>8</b>."],
  "Amplitude da classe = (máx − mín) ÷ nº de classes.", "Amplitude de classe.")
Q(F, "Em um conjunto de 60 laudos, 15 têm prazo acima de 30 dias. A frequência relativa percentual desse grupo é:", "25%",
  [("15%", "usou a frequência absoluta 15 como se fosse porcentagem."), ("4%", "dividiu 60 por 15, que dá 4, e escreveu como porcentagem."), ("45%", "somou 15 e 30; a conta é 15 ÷ 60."), ("75%", "é 45 ÷ 60, o grupo complementar (quem não passou de 30 dias).")],
  ["Frequência relativa = frequência do grupo ÷ total.", "15 ÷ 60 = 0,25.", "0,25 = <b>25%</b>."],
  "Relativa = parte ÷ total.", "Frequência relativa.")
Q(F, "As frequências absolutas de quatro classes são 4, 7, 9 e 5. A frequência acumulada na terceira classe é:", "20",
  [("9", "é só a frequência da terceira classe."), ("25", "é o total, que inclui a quarta classe."), ("16", "somou a 2ª e a 3ª apenas."), ("11", "é a acumulada da segunda classe.")],
  ["Acumulada = soma das frequências até a classe indicada.", "4 + 7 + 9.", "Total até a 3ª classe: <b>20</b>."],
  "Acumulada: vá somando da primeira até a classe pedida.", "Frequência acumulada.")
Q(F, "Em qualquer distribuição de frequências, a soma das frequências relativas é igual a:", "1 (ou 100%).",
  [("0", "zero seria a ausência de dados."), ("n, o número de observações.", "isso vale para a soma das frequências absolutas."), ("50%.", "não há essa regra."), ("a média dos dados.", "não tem relação com a média.")],
  ["Cada frequência relativa é a fração do total que a classe representa.", "Somando todas as frações, o total completo.", "Isso dá <b>1</b>, ou <b>100%</b>."],
  "Relativas somam 1; absolutas somam n.", "Propriedade das frequências relativas.")
Q(F, "O histograma é a representação gráfica mais adequada para:", "variável quantitativa contínua agrupada em classes.",
  [("variável qualitativa nominal.", "para categorias usa-se gráfico de barras ou de setores."), ("variável qualitativa ordinal com poucas categorias.", "melhor gráfico de barras."), ("dados de duas variáveis em pares.", "o diagrama de dispersão é o indicado."), ("evolução de uma variável no tempo.", "o gráfico de linhas é o indicado.")],
  ["O histograma usa <b>barras coladas</b>, uma por classe, com área proporcional à frequência.", "As classes são intervalos numéricos contínuos.", "Serve para quantitativas contínuas agrupadas."],
  "Histograma = quantitativa contínua em classes.", "Escolher o gráfico.")

# ---------------- Séries temporais ----------------
S = "series"
Q(S, "As vendas de uma loja sobem todo mês de dezembro, ano após ano. Esse movimento regular, que se repete em períodos fixos, é a componente:", "sazonal.",
  [("de tendência.", "tendência é a direção de longo prazo, sem repetição fixa."), ("cíclica.", "ciclo tem duração longa e irregular, em geral vários anos."), ("irregular (aleatória).", "irregular não segue padrão."), ("de média móvel.", "média móvel é um método de suavização, não uma componente.")],
  ["O movimento se <b>repete em período fixo</b> (todo dezembro).", "Isso caracteriza a <b>sazonalidade</b>.", "Tendência é a direção de longo prazo; ciclo é oscilação longa e irregular."],
  "Repete em período fixo: sazonalidade.", "Componentes da série temporal.")
Q(S, "A direção geral de longo prazo de uma série temporal, ignorando as oscilações curtas, chama-se:", "tendência.",
  [("sazonalidade.", "sazonalidade repete-se em períodos fixos."), ("variação irregular.", "é o resíduo aleatório."), ("amplitude.", "é a diferença entre maior e menor valor."), ("moda.", "é o valor mais frequente.")],
  ["As componentes são: <b>tendência</b>, <b>sazonalidade</b>, <b>ciclo</b> e <b>irregular</b>.", "A que mostra a direção de longo prazo é a tendência."],
  "Tendência = direção de longo prazo.", "Componentes da série temporal.")
Q(S, "Os valores de uma série são 10, 12, 14 e 16. A primeira média móvel de 3 períodos (centrada na segunda observação) é:", "12",
  [("14", "é a média móvel seguinte."), ("10", "é o primeiro valor da série."), ("36", "é a soma, sem dividir por 3."), ("13", "calculou a média dos 4 valores.")],
  ["Média móvel de 3 períodos: média de 3 valores consecutivos.", "Primeiros três: 10, 12 e 14.", "(10 + 12 + 14) ÷ 3 = 36 ÷ 3 = <b>12</b>."],
  "Média móvel: soma da janela ÷ tamanho da janela.", "Média móvel simples.")
Q(S, "O número de ocorrências passou de 80 para 100. A variação percentual foi de:", "+25%",
  [("+20%", "usou o valor final como base; a base é o valor inicial."), ("+80%", "confundiu com o valor inicial."), ("+125%", "é a razão 100/80, sem subtrair 1."), ("+0,25%", "escreveu 0,25 sem converter para percentual (× 100).")],
  ["Variação = (final − inicial) ÷ inicial.", "(100 − 80) ÷ 80 = 20 ÷ 80 = 0,25.", "0,25 = <b>+25%</b>."],
  "Base da variação é sempre o valor inicial.", "Variação percentual.")
Q(S, "O número de atendimentos caiu de 200 para 150. A variação percentual foi de:", "−25%",
  [("−33%", "usou o valor final como base."), ("+25%", "o sinal deve ser negativo, pois houve queda."), ("−50%", "é a diferença absoluta (50) tomada como %."), ("−75%", "é 150 ÷ 200 = 0,75, o valor final em relação ao inicial, e não a queda.")],
  ["Variação = (150 − 200) ÷ 200.", "−50 ÷ 200 = −0,25.", "Resultado: <b>−25%</b> (queda de um quarto)."],
  "Queda: variação negativa; base é o valor inicial.", "Variação percentual negativa.")
Q(S, "Um índice com base 100 em 2022 vale 120 em 2023. Isso significa que, de 2022 para 2023, a variável:", "cresceu 20%.",
  [("cresceu 120%.", "120 é o nível do índice, não a variação."), ("caiu 20%.", "valor acima de 100 indica crescimento."), ("permaneceu igual.", "igual seria 100."), ("cresceu 100%.", "100 é a base, não a variação.")],
  ["Na base 100, cada ponto acima de 100 é 1% de crescimento sobre 2022.", "120 − 100 = 20 pontos.", "Logo, crescimento de <b>20%</b>."],
  "Índice − 100 = variação percentual sobre a base.", "Leitura de número-índice.")

def main():
    html = HTML.read_text(encoding="utf-8")
    a = html.index("const DATA = ") + len("const DATA = ")
    data, end = json.JSONDecoder().raw_decode(html[a:])
    have = {q["q"] for q in data["questions"]}
    est = next(s for s in data["subjects"] if s["id"] == "estatistica")
    added = 0
    for n in NEW:
        if n["q"] in have:
            continue
        data["questions"].append(n)
        est["qs"].append(len(data["questions"]) - 1)
        added += 1
    HTML.write_text(html[:a] + json.dumps(data, ensure_ascii=False) + html[a + end:], encoding="utf-8")
    print("novas questões:", added, "| total:", len(data["questions"]))

if __name__ == "__main__":
    main()
