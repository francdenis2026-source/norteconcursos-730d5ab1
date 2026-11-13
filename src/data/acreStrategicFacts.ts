/**
 * Radar de provas: nomes, cargos e datas de Realidade do Acre que bancas costumam cobrar
 * (vice-governador, personagens da Questão do Acre, diplomatas, presidente da Bolívia, primeiro jornal).
 * Cada item cita a fonte e a divergência entre fontes quando existe. Conferido em 13/11/2026.
 * Não foram encontradas questões da banca IDECAN sobre o Acre; os padrões vêm de provas de outras bancas.
 */
export interface AcreFact {
  question: string;
  answer: string;
  care?: string;
  sources: { label: string; url: string }[];
}

export interface AcreFactGroup {
  id: "poder" | "questao" | "imprensa" | "banca";
  title: string;
  intro: string;
  facts: AcreFact[];
}

const SRC = {
  brasil61: { label: "Brasil 61 — Mailza Assis reeleita", url: "https://brasil61.com/n/acre-reelege-mailza-assis-pp-como-governadora-bras2617372.amp" },
  correio: { label: "Correio da Manhã — reeleição no 2º turno", url: "https://www.correiodamanha.com.br/nacional/norte/2026/10/amp/329820-mailza-assis-e-reeleita-governadora-do-acre-no-2-turno.html" },
  onu: { label: "ONU (UNTS 888) — texto do Tratado de Petrópolis", url: "https://treaties.un.org/doc/Publication/UNTS/Volume%20888/volume-888-II-698-English.pdf" },
  jus: { label: "Jus.com.br — A Questão do Acre", url: "https://jus.com.br/artigos/69625/a-questao-do-acre" },
  warWiki: { label: "Wikipédia — Acre War (fonte secundária)", url: "https://www.wikipedia.org/wiki/Acre_War" },
  tropos: { label: "UFAC (Tropos) — imprensa acreana", url: "https://periodicos.ufac.br/index.php/tropos/article/view/17/pdf_8" },
  intercom: { label: "Intercom — El Acre em Xapuri", url: "https://portalintercom.org.br/anais/norte2015/resumos/R44-0356-1.pdf" },
  penal: { label: "Estratégia — Polícia Penal do Acre (estrutura da prova)", url: "https://www.estrategiaconcursos.com.br/blog/concurso-policia-penal-ac/amp/" },
  golpe: { label: "Portal Amazônia — primeiro governador deposto", url: "https://portalamazonia.com/acre/60-anos-do-golpe-militar-acre-teve-1-governador-deposto-e-resistencia-de-seringueiros/" },
} as const;

export const ACRE_FACT_GROUPS: AcreFactGroup[] = [
  {
    id: "poder",
    title: "Governo e Poder Executivo",
    intro: "Perguntas sobre quem governa mudam com a data da prova: confira sempre a data a que o enunciado se refere.",
    facts: [
      {
        question: "Quem é a governadora do Acre?",
        answer: "Mailza Assis (PP), no cargo desde abril de 2026, quando Gladson Cameli renunciou para disputar o Senado. Ela foi reeleita no 2º turno, em 25 de outubro de 2026, com 66,21% dos votos válidos, contra Alan Rick (Republicanos).",
        care: "A posse de Mailza é citada como 2 de abril de 2026; o mandato novo começa em janeiro de 2027.",
        sources: [SRC.brasil61, SRC.correio],
      },
      {
        question: "Quem era o vice-governador e quem é a vice eleita?",
        answer: "Mailza Assis foi a vice de Gladson Cameli (governador de 2019 a abril de 2026) e assumiu o governo quando ele renunciou. A vice da chapa reeleita é a médica Jéssica Alves (MDB).",
        care: "Ao assumir, a vice deixou o cargo de vice sem titular até a posse da nova chapa; se a questão pedir \"o vice\" em 2026, leia a data com atenção.",
        sources: [SRC.brasil61],
      },
      {
        question: "Quem foi o primeiro governador eleito do Estado?",
        answer: "José Augusto de Araújo (PTB), eleito em 1962, tomou posse em 1º de março de 1963 e deixou o cargo em 8 de maio de 1964, depois do golpe militar.",
        care: "Fonte secundária; confirme datas em fonte oficial.",
        sources: [SRC.golpe],
      },
    ],
  },
  {
    id: "questao",
    title: "Questão do Acre: quem é quem",
    intro: "Pergunta clássica de prova: o presidente, os diplomatas e os líderes de cada lado.",
    facts: [
      {
        question: "Quem era o presidente da Bolívia na época do conflito?",
        answer: "José Manuel Pando, presidente de 1899 a 1904, que comandou pessoalmente a expedição contra os revoltosos de Plácido de Castro.",
        care: "O dado vem de fonte secundária (Wikipédia e artigo jurídico); o período de mandato é o mais citado.",
        sources: [SRC.warWiki, SRC.jus],
      },
      {
        question: "Quem eram os presidentes do Brasil e o chanceler?",
        answer: "Campos Sales (1898–1902) e, a partir de 1902, Rodrigues Alves. O Barão do Rio Branco (José Maria da Silva Paranhos Júnior) assumiu o Itamaraty em dezembro de 1902.",
        care: "Rio Branco voltou de Berlim em 1º de dezembro de 1902 a convite de Rodrigues Alves.",
        sources: [SRC.warWiki],
      },
      {
        question: "Quem assinou o Tratado de Petrópolis (17/11/1903)?",
        answer: "Pelo Brasil: o Barão do Rio Branco, ministro das Relações Exteriores, e Joaquim Francisco de Assis Brasil, ministro plenipotenciário. Pela Bolívia: Fernando Guachalla e Claudio Pinilla.",
        care: "Rui Barbosa não consta como signatário no texto do tratado; não o inclua sem a questão pedir.",
        sources: [SRC.onu, SRC.jus],
      },
      {
        question: "Quem foi Luis Gálvez?",
        answer: "Espanhol (Luis Gálvez Rodríguez de Arias) que proclamou o Estado Independente do Acre em 14 de julho de 1899, com capital em Puerto Alonso (atual Porto Acre). A República durou até março de 1900.",
        sources: [SRC.warWiki],
      },
      {
        question: "O que foi o Bolivian Syndicate?",
        answer: "Consórcio estrangeiro, o chamado Contrato Aramayo, aprovado pelo Congresso boliviano em 20 de dezembro de 1901, com arrendamento do Acre por 30 anos. O Brasil o desfez mediante indenização de cerca de 110 a 114 mil libras.",
        care: "As fontes divergem no valor da indenização; memorize só o que a aula indicar.",
        sources: [SRC.warWiki],
      },
      {
        question: "Quando Plácido de Castro proclamou a Terceira República do Acre?",
        answer: "Em janeiro de 1903; fontes citam o dia 24 ou o dia 27. A tomada de Xapuri, que abriu a revolução, é de 6 de agosto de 1902 (uma fonte cita o dia 7).",
        care: "Datas divergem entre fontes; no gabarito costuma valer 6/8/1902 e o Tratado de 17/11/1903.",
        sources: [SRC.warWiki, SRC.jus],
      },
    ],
  },
  {
    id: "imprensa",
    title: "Imprensa acreana",
    intro: "A pergunta sobre o primeiro jornal é ambígua: o enunciado precisa dizer se fala do primeiro a circular ou do primeiro acreano.",
    facts: [
      {
        question: "Qual foi o primeiro jornal a circular no Acre?",
        answer: "O El Acre, jornal boliviano, citado como o primeiro a circular no território. Uma fonte o situa em Puerto Alonso (1901); outra, em Mariscal Sucre, atual Xapuri, no primeiro semestre de 1902.",
        care: "Fontes divergem sobre data e local; só há fontes secundárias, sem exemplar original conferido.",
        sources: [SRC.tropos, SRC.intercom],
      },
      {
        question: "E o primeiro jornal essencialmente acreano?",
        answer: "O Acre, de 1904, no seringal Capatará (Tropos). Em Xapuri houve um O Acre em 1907; em Rio Branco, O Rio Acre (1908) e, depois, O Acre (1929), órgão oficial do governo do Território.",
        care: "Há vários títulos \"O Acre\"; observe a data e o local do enunciado.",
        sources: [SRC.tropos],
      },
    ],
  },
  {
    id: "banca",
    title: "Como a banca costuma cobrar",
    intro: "Não encontrei questões da IDECAN sobre o Acre; este quadro usa o que se sabe de outras provas do Estado.",
    facts: [
      {
        question: "Que tipo de pergunta aparece?",
        answer: "Nomes (governador, vice, diplomatas, presidente da Bolívia), datas (1902, 1903, 1962, 1989), localização de municípios e regionais, e a Constituição estadual. Provas do Estado trazem cerca de 10 questões de História e Geografia do Acre.",
        care: "Os dados vêm de provas de outras bancas (como a do Polícia Penal, em 2023); confirme sempre a banca no seu edital.",
        sources: [SRC.penal],
      },
      {
        question: "Como estudar nomes e datas?",
        answer: "Monte uma ficha por personagem (quem, cargo, lado, data) e treine por pares: Pando–Bolívia, Rodrigues Alves–Brasil, Rio Branco–Itamaraty, Plácido de Castro–Xapuri, Gálvez–Porto Acre.",
        sources: [SRC.warWiki],
      },
    ],
  },
];
