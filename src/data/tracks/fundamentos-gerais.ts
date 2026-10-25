import quiz from "./fundamentos-gerais-quiz.json" with { type: "json" };
import type { TrackLesson, TrackQuiz } from "./types";

const practice = (slug: keyof typeof quiz) => ({
  quiz: quiz[slug].quiz as TrackQuiz[],
  syllabusTopicId: quiz[slug].syllabusTopicId,
});
export const MATEMATICA_BASICA: TrackLesson[] = [
  {
    id: "mat-proporcoes",
    group: "Quantidades e relações",
    title: "Razão, proporção, porcentagem e unidades",
    edital: "Razões, proporções e situações-problema",
    simples:
      "Uma razão compara grandezas por divisão. Antes de operar, confira o que cada número representa e compatibilize as unidades. Proporcionalidade direta mantém a razão constante; a inversa mantém constante um produto nas condições do modelo. Porcentagem expressa uma fração de base 100, e o resultado depende da base escolhida.",
    pontos: [
      "Identifique a unidade e a base de comparação antes de calcular.",
      "Na proporção direta, duplicar uma grandeza duplica a outra; na inversa, o modelo pode reduzir a outra à metade.",
      "Para calcular p% de uma quantidade Q, use Q × p/100.",
      "Conversões de comprimento, área e volume usam potências diferentes do fator linear.",
      "Confira o resultado substituindo-o no problema original.",
    ],
    exemplo:
      "Três cadernos custam R$ 24. O preço por caderno é 24/3 = R$ 8; cinco cadernos custam 5 × 8 = R$ 40, se o preço unitário permanecer constante.",
    atencao: [
      "Uma regra de três exige analisar a relação entre as grandezas; não faça multiplicações cruzadas sem interpretar.",
      "Um aumento de 20 unidades não é automaticamente um aumento de 20%.",
      "Compare medidas apenas depois de convertê-las para unidades compatíveis.",
    ],
    ...practice("enem-matematica-fundamentos"),
  },
  {
    id: "mat-geometria",
    group: "Espaço e medidas",
    title: "Geometria: áreas, perímetros, volumes e escalas",
    edital: "Geometria e medidas",
    simples:
      "Comprimento, área e volume descrevem grandezas distintas. Perímetro mede o contorno; área mede a superfície; volume mede o espaço ocupado. Um desenho em escala mantém uma razão linear entre representação e realidade. Ao ampliar uma figura, áreas variam com o quadrado do fator e volumes com o cubo, quando todas as dimensões são ampliadas igualmente.",
    pontos: [
      "Retângulo: área = base × altura e perímetro = 2 × (base + altura).",
      "Triângulo: área = base × altura correspondente / 2.",
      "Círculo: área = πr² e comprimento da circunferência = 2πr.",
      "Bloco retangular: volume = comprimento × largura × altura.",
      "Em triângulo retângulo, hipotenusa² = cateto² + cateto².",
      "Na escala 1:n, multiplique a medida do desenho por n para obter a medida real na mesma unidade.",
    ],
    exemplo:
      "Uma sala de 4 m por 3 m tem área de 12 m² e perímetro de 14 m. Comprar piso e colocar rodapé exigem cálculos diferentes.",
    atencao: [
      "1 m² equivale a 10.000 cm²; 1 m³ equivale a 1.000 litros.",
      "Use a altura perpendicular à base na área do triângulo.",
      "Não confunda raio com diâmetro.",
    ],
    ...practice("enem-geometria-aplicacoes"),
  },
  {
    id: "mat-dados",
    group: "Dados e incerteza",
    title: "Estatística e leitura de dados",
    edital: "Estatística descritiva e gráficos",
    simples:
      "Uma tabela ou gráfico precisa ser lido com atenção aos rótulos, unidades, universo e período. A média resume valores por uma divisão; a mediana depende da ordem dos dados; a moda indica frequência. Medidas de dispersão acrescentam informação que uma média sozinha não mostra.",
    pontos: [
      "Média aritmética = soma dos valores / quantidade de observações.",
      "Na média ponderada, divida a soma dos produtos pela soma dos pesos.",
      "Ordene os dados para encontrar a mediana; com quantidade par, use a média dos dois valores centrais.",
      "Moda é o valor de maior frequência; um conjunto pode ter mais de uma.",
      "Amplitude = maior valor − menor valor.",
      "No cálculo populacional da variância, divida a soma dos desvios quadráticos por N; a variância amostral usual usa N−1.",
    ],
    exemplo:
      "Nos valores 2, 3, 3, 5 e 12, a média é 5, a mediana é 3 e a moda é 3. O valor 12 influencia a média sem ocupar a posição central.",
    atencao: [
      "Frequência absoluta é contagem; frequência relativa é proporção.",
      "Uma média agregada não descreve cada indivíduo.",
      "Mudanças no eixo de um gráfico podem alterar a impressão visual sem alterar os dados.",
    ],
    ...practice("enem-estatistica-aplicacoes"),
  },
  {
    id: "mat-probabilidade",
    group: "Dados e incerteza",
    title: "Probabilidade e contagem",
    edital: "Princípios de contagem e probabilidade",
    simples:
      "Conte primeiro os resultados possíveis e esclareça se a ordem importa, se há repetição e se os casos são equiprováveis. A razão entre casos favoráveis e possíveis vale no modelo finito equiprovável. Reposição, condicionamento e independência mudam o cálculo e não devem ser presumidos.",
    pontos: [
      "Etapas sucessivas com opções combinadas usam o princípio multiplicativo.",
      "Alternativas disjuntas podem ser contadas pelo princípio aditivo.",
      "Sem cargos ou ordem, seleções de elementos distintos podem exigir combinações.",
      "P(complemento de A) = 1 − P(A).",
      "Para eventos independentes, P(A ∩ B) = P(A) × P(B).",
      "Em retiradas sem reposição, o universo e as quantidades podem mudar.",
    ],
    exemplo:
      "Escolher duas pessoas entre cinco para o mesmo comitê gera 5×4/2 = 10 duplas. Escolher presidente e vice gera 5×4 = 20 resultados porque os cargos distinguem a ordem.",
    atencao: [
      "Não trate três quantidades de caras como três resultados equiprováveis ao lançar duas moedas.",
      "Independência não é o mesmo que disjunção.",
      "Uma condição pode reduzir o espaço amostral relevante.",
    ],
    ...practice("enem-probabilidade-aplicacoes"),
  },
  {
    id: "mat-funcoes",
    group: "Modelos e decisões",
    title: "Funções, taxas e matemática financeira",
    edital: "Funções e matemática financeira",
    simples:
      "Uma função relaciona entradas a saídas segundo uma regra. No modelo afim f(x)=ax+b, a representa a variação da saída por unidade da entrada e b o valor em x=0. Em problemas financeiros, separe capital, juros e montante, e compatibilize o período da taxa com o tempo.",
    pontos: [
      "Substitua a entrada na expressão para calcular o valor da função.",
      "A raiz é uma entrada em que a saída é zero.",
      "Em função afim, a>0 indica crescimento e a<0 indica decrescimento.",
      "Aumentos e descontos sucessivos usam fatores multiplicativos.",
      "Juros simples: J = C × i × t; montante = C + J.",
      "Juros compostos: M = C × (1+i)^t, no modelo de taxa constante por período.",
    ],
    exemplo:
      "Uma tarifa de R$ 8 mais R$ 3 por unidade é modelada por C(x)=8+3x. Para cinco unidades, C(5)=23. O valor fixo não deve ser multiplicado por cinco.",
    atencao: [
      "Aumento de 20% seguido de desconto de 20% não restaura, em geral, o preço inicial.",
      "Use taxa decimal nas fórmulas: 2% = 0,02.",
      "Diferencie o valor dos juros do montante total.",
    ],
    ...practice("enem-funcoes-aplicacoes"),
  },
];
export const FISICA_BASICA: TrackLesson[] = [
  {
    id: "fis-grandezas-energia",
    group: "Fundamentos e aplicações",
    title: "Grandezas, movimento, energia e circuitos",
    edital: "Grandezas e energia",
    simples:
      "Modelos físicos relacionam grandezas sob condições explícitas. Identifique as unidades, o intervalo de tempo, o referencial e as simplificações do enunciado antes de aplicar uma fórmula. Energia pode mudar de forma; potência relaciona energia ou trabalho ao tempo; rendimento compara a parcela útil ao que foi recebido.",
    pontos: [
      "Velocidade escalar média = distância percorrida / intervalo de tempo.",
      "Aceleração média = variação de velocidade / intervalo de tempo.",
      "Na mecânica newtoniana, força resultante = massa × aceleração.",
      "Trabalho de força constante: W = F × d × cos(ângulo).",
      "Energia cinética: Ec = mv²/2; variação de potencial gravitacional próximo à superfície: ΔEp = mgΔh.",
      "Potência média = energia transferida / tempo.",
      "Em resistor ôhmico, V = R × I; resistências em série se somam.",
    ],
    exemplo:
      "Transferir 600 J em 20 s corresponde a 30 W. Uma máquina pode receber mais energia do que entrega na forma útil pretendida, sem contrariar a conservação da energia.",
    atencao: [
      "Divida km/h por 3,6 para obter m/s.",
      "kW é potência; kWh é energia.",
      "Não aplique uma expressão sem conferir suas condições, como força constante ou comportamento ôhmico.",
    ],
    ...practice("enem-fisica-fundamentos"),
  },
];
export const QUIMICA_BASICA: TrackLesson[] = [
  {
    id: "qui-materia-quantidades",
    group: "Matéria e transformação",
    title: "Matéria, soluções e relações quantitativas",
    edital: "Transformações e quantidades",
    simples:
      "Distinguir substância, mistura e mudança de estado evita confundir aparência com composição. Nas reações, o balanceamento preserva os átomos no modelo químico usual. Nos cálculos, massa, quantidade de matéria, volume e concentração têm definições próprias e precisam de unidades compatíveis.",
    pontos: [
      "Número atômico Z é o número de prótons; no átomo neutro, elétrons e prótons têm a mesma quantidade.",
      "Número de massa A = prótons + nêutrons.",
      "Quantidade de matéria n = massa / massa molar.",
      "Concentração comum = massa do soluto / volume final da solução.",
      "Em diluição sem reação nem perda de soluto, C1V1 = C2V2.",
      "Coeficientes da reação balanceada expressam proporções entre quantidades de matéria.",
      "Densidade = massa / volume.",
    ],
    exemplo:
      "Dissolver 10 g de um soluto e completar o volume final da solução para 2 L produz concentração comum de 5 g/L. Não se deve confundir esse volume final com o volume inicial do solvente.",
    atencao: [
      "Uma mistura homogênea não é necessariamente substância pura.",
      "Filtração usual de partículas não remove automaticamente soluto dissolvido.",
      "Uma mudança física, como a fusão de gelo, não exige formação de nova substância.",
    ],
    ...practice("enem-quimica-fundamentos"),
  },
];
export const INGLES_BASICO: TrackLesson[] = [
  {
    id: "ing-leitura-contexto",
    group: "Leitura e comunicação",
    title: "Leitura em inglês: finalidade, contexto e referências",
    edital: "Leitura em língua estrangeira",
    simples:
      "Comece identificando gênero, finalidade, interlocutores e informação procurada. Use título, imagens, repetições e conectores como pistas, sem tratar cada palavra parecida com o português como tradução segura. Confirme referências pronominais e o alcance de negações, comparações e marcadores de tempo.",
    pontos: [
      "Um aviso orienta uma ação; uma notícia pode relatar um acontecimento; um anúncio pode persuadir.",
      "Because pode introduzir razão; although pode introduzir concessão; until pode marcar limite temporal.",
      "Comparativos como cheaper than relacionam duas referências.",
      "Pronomes como it e they precisam de referentes recuperáveis no texto.",
      "Actually, no uso comum, significa na verdade ou de fato, não atualmente.",
      "A interpretação deve apoiar-se no contexto e não em uma tradução isolada.",
    ],
    exemplo:
      "Tickets are available until Friday informa um limite de disponibilidade até sexta-feira. Não significa que a disponibilidade comece obrigatoriamente na sexta.",
    atencao: [
      "Reconhecer um cognato não resolve a função do trecho inteiro.",
      "Do not enter é uma proibição, não uma autorização.",
      "Não infira informação permanente a partir de um aviso limitado a today.",
    ],
    ...practice("enem-ingles-fundamentos"),
  },
];
