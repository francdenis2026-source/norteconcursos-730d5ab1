/**
 * População indígena do Acre, Censo 2022 (IBGE). Os valores municipais vieram de reportagens que
 * reproduzem a divulgação do IBGE (ac24horas, 2023 e 2025); confirme na tabela do IBGE (SIDRA).
 * Municípios sem valor na fonte ficam fora do ranking.
 */
export const ACRE_INDIGENOUS_TOTAL_2022 = 31694;
export const ACRE_INDIGENOUS_TOTAL_2010 = 17578;
export const ACRE_INDIGENOUS_SHARE_STATE = 3.8;

/** Pessoas indígenas por município, em 2022. */
export const ACRE_INDIGENOUS_BY_MUNICIPALITY: Record<string, number> = {
  "Feijó": 4436,
  "Santa Rosa do Purus": 4297,
  "Jordão": 4115,
  "Tarauacá": 3775,
  "Marechal Thaumaturgo": 3355,
  "Rio Branco": 1827,
  "Sena Madureira": 1681,
  "Cruzeiro do Sul": 1678,
  "Assis Brasil": 1207,
  "Manoel Urbano": 962,
  "Porto Walter": 868,
  "Brasiléia": 282,
  "Porto Acre": 82,
  "Xapuri": 43,
  "Epitaciolândia": 26,
  "Capixaba": 7,
};

/** Percentual da população municipal que é indígena (municípios acima da média estadual de 3,8%). */
export const ACRE_INDIGENOUS_SHARE: Record<string, number> = {
  "Santa Rosa do Purus": 63.9,
  "Jordão": 44.6,
  "Marechal Thaumaturgo": 19.6,
  "Assis Brasil": 14.9,
  "Mâncio Lima": 14.6,
  "Feijó": 12.5,
  "Tarauacá": 8.7,
  "Porto Walter": 8.1,
  "Manoel Urbano": 8.0,
  "Sena Madureira": 4.1,
};

export const ACRE_INDIGENOUS_FACTS: { label: string; value: string }[] = [
  { label: "Crescimento 2010–2022", value: "de 17.578 para 31.694 pessoas, alta de mais de 80% (a população total cresceu 13,2%)" },
  { label: "Peso na população", value: "3,8% dos habitantes do Estado; o Acre é o 13º estado em população indígena" },
  { label: "Terras Indígenas", value: "cerca de 61,8% dos indígenas vivem em Terras Indígenas e 38,2% fora delas" },
  { label: "Alfabetização", value: "76,01% dos indígenas do Acre são alfabetizados" },
  { label: "Municípios", value: "há indígenas nos 22 municípios, e todos tiveram aumento entre 2010 e 2022" },
];

export const ACRE_PEOPLES: { name: string; note: string }[] = [
  { name: "Huni Kuĩ (Kaxinawá)", note: "Povo da família linguística Pano, um dos mais numerosos do Estado." },
  { name: "Yawanawá", note: "Povo Pano, conhecido pelo manejo de produtos da floresta e por festivais culturais." },
  { name: "Puyanawa", note: "Povo Pano, com terra indígena na região do Vale do Juruá." },
  { name: "Katukina", note: "Povo Pano, presente no Vale do Juruá." },
  { name: "Ashaninka", note: "Povo da família Aruak, com presença na fronteira com o Peru." },
  { name: "Manchineri", note: "Povo da família Aruak; a Funai atua na Terra Indígena Mamoadate, onde também há registro de isolados." },
];

export const ACRE_INDIGENOUS_SOURCES = [
  { label: "ac24horas — Feijó, Santa Rosa e Jordão têm maior população indígena (2023)", url: "https://ac24horas.com/2023/08/21/feijo-santa-rosa-e-jordao-sao-os-municipios-com-maior-populacao-indigena-do-acre/" },
  { label: "ac24horas — 77% dos indígenas vivem em 7 municípios (2023)", url: "https://ac24horas.com/2023/08/10/77-dos-indigenas-do-acre-vivem-em-7-municipios-dos-22/" },
  { label: "ac24horas — população indígena ultrapassa 31 mil (2025)", url: "https://ac24horas.com/2025/06/09/populacao-indigena-cresce-no-acre-e-ultrapassa-31-mil-pessoas/" },
  { label: "Comissão Pró-Índio do Acre — povos indígenas", url: "https://cpiacre.org.br/povos-indigenas-isolados-2/" },
] as const;
