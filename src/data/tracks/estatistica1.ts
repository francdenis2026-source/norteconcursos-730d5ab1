import type { TrackLesson } from "./types";

/** Estatística: noções básicas recorrentes em editais policiais. */
export const ESTATISTICA_1: TrackLesson[] = [
  {
    id: "est-basico",
    group: "Fundamentos",
    title: "Conceitos básicos: população, amostra e variáveis",
    edital: "Estatística descritiva: população, amostra, tipos de variáveis",
    simples: "População é o conjunto de todos os elementos que se quer estudar. Amostra é uma parte dessa população, escolhida para análise. Variável é a característica observada. As variáveis são qualitativas (categorias, como sexo ou cor) ou quantitativas (números, como idade ou altura). As quantitativas podem ser discretas (contagens, como número de filhos) ou contínuas (medidas, como peso).",
    pontos: ["População: todos os elementos de interesse.", "Amostra: parte da população usada na análise.", "Qualitativa: categorias; quantitativa: números.", "Discreta: valores contáveis; contínua: valores em intervalos.", "Frequência absoluta: quantas vezes o valor aparece; relativa: a proporção em relação ao total."],
    exemplo: "Em uma pesquisa com 200 policiais de uma corporação de 5 000, os 5 000 são a população e os 200 são a amostra.",
    atencao: ["Nem toda variável numérica é quantitativa no sentido de medir: o número do CPF é só um rótulo.", "A amostra deve representar bem a população para as conclusões valerem."],
    quiz: [
      { q: "O número de filhos de uma família é uma variável quantitativa discreta.", a: true, why: "É um número obtido por contagem." },
      { q: "A amostra é o conjunto de todos os elementos que se deseja estudar.", a: false, why: "Esse conjunto é a população; a amostra é uma parte dela." },
    ],
  },
  {
    id: "est-medidas-posicao",
    group: "Medidas",
    title: "Média, mediana e moda",
    edital: "Medidas de posição (tendência central)",
    simples: "Média aritmética é a soma dos valores dividida pelo número de valores. Mediana é o valor do meio quando os dados estão em ordem; se o número de dados é par, é a média dos dois valores centrais. Moda é o valor que mais se repete. A média é sensível a valores extremos; a mediana, não.",
    pontos: ["Média: soma dos valores dividida pela quantidade.", "Mediana: valor central dos dados ordenados.", "Moda: valor mais frequente.", "Valores extremos puxam a média, mas pouco afetam a mediana.", "Somar uma constante a todos os valores soma a mesma constante à média."],
    exemplo: "Nos valores 2, 3, 3, 5, 12: média = 25/5 = 5; mediana = 3; moda = 3. O valor 12 puxa a média para cima.",
    atencao: ["Ordene os dados antes de achar a mediana.", "Pode haver mais de uma moda, ou nenhuma."],
    quiz: [
      { q: "Nos valores 2, 3, 3, 5 e 12, a média é 5 e a mediana é 3.", a: true, why: "A soma é 25 e o valor central, depois de ordenar, é 3." },
      { q: "A mediana é muito afetada por valores extremos.", a: false, why: "Quem é sensível a extremos é a média; a mediana não." },
    ],
  },
  {
    id: "est-dispersao",
    group: "Medidas",
    title: "Variância e desvio padrão",
    edital: "Medidas de dispersão",
    simples: "Medidas de dispersão mostram o quanto os dados se espalham em torno da média. A variância é a média dos quadrados dos desvios em relação à média. O desvio padrão é a raiz quadrada da variância e tem a mesma unidade dos dados. Quanto maior o desvio padrão, mais espalhados os dados. O coeficiente de variação é o desvio padrão dividido pela média, e compara a dispersão entre conjuntos diferentes.",
    pontos: ["Variância: média dos quadrados dos desvios.", "Desvio padrão: raiz quadrada da variância.", "Se todos os valores forem iguais, a dispersão é zero.", "Somar uma constante a todos os valores não muda o desvio padrão.", "Multiplicar todos os valores por uma constante multiplica o desvio padrão pelo valor absoluto dessa constante."],
    exemplo: "Dois turnos têm média 10 ocorrências por dia. No primeiro os valores variam entre 9 e 11; no segundo, entre 2 e 18. O segundo tem desvio padrão maior.",
    atencao: ["A variância está em unidade ao quadrado; o desvio padrão volta à unidade original.", "Um reajuste fixo em todos os salários mexe na média, mas não na dispersão."],
    quiz: [
      { q: "Somar o mesmo valor a todos os dados não altera o desvio padrão.", a: true, why: "A distância entre os valores e a média permanece a mesma." },
      { q: "O desvio padrão é o quadrado da variância.", a: false, why: "O desvio padrão é a raiz quadrada da variância." },
    ],
  },
  {
    id: "est-probabilidade-normal",
    group: "Probabilidade",
    title: "Probabilidade e distribuição normal",
    edital: "Noções de probabilidade; distribuição normal",
    simples: "A probabilidade de um evento é a razão entre os casos favoráveis e os casos possíveis, e vai de 0 a 1. A distribuição normal tem forma de sino, é simétrica em torno da média e nela média, mediana e moda coincidem. Cerca de 68% dos valores ficam a até um desvio padrão da média, 95% a até dois e 99,7% a até três.",
    pontos: ["Probabilidade: entre 0 e 1.", "Normal: simétrica, em forma de sino; média = mediana = moda.", "Regra empírica: cerca de 68%, 95% e 99,7% a um, dois e três desvios padrão.", "Escore padrão (z): quantos desvios padrão o valor está da média.", "Eventos independentes: a probabilidade de ocorrerem juntos é o produto."],
    exemplo: "Em uma prova com notas distribuídas normalmente, média 70 e desvio padrão 10, cerca de 68% dos candidatos tiraram entre 60 e 80.",
    atencao: ["A regra dos 68-95-99,7 vale para a distribuição normal.", "Distribuição assimétrica tem média diferente da mediana."],
    quiz: [
      { q: "Na distribuição normal, a média, a mediana e a moda coincidem.", a: true, why: "Isso ocorre porque a curva é simétrica." },
      { q: "Em uma distribuição normal, cerca de 99,7% dos valores ficam a até um desvio padrão da média.", a: false, why: "Cerca de 68% ficam a um desvio padrão; 99,7% ficam a até três." },
    ],
  },
];
