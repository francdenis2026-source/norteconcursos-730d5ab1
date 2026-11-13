/**
 * Linhas do tempo e do território de Realidade do Acre.
 * Só entram fatos de ampla divulgação e já presentes nos blocos de estudo com fonte;
 * datas incertas ficam sem dia. Revise sempre contra o edital e as fontes oficiais.
 */
export type AcreEra = "conflito" | "territorio" | "estado";

export interface AcreTimelineEvent {
  when: string;
  title: string;
  text: string;
  /** Dica para lembrar ou cobrança comum em prova. */
  tip: string;
  era: AcreEra;
}

export const ACRE_ERAS: Record<AcreEra, { label: string; range: string; color: string }> = {
  conflito: { label: "Ocupação e Questão do Acre", range: "1867–1903", color: "#C8841C" },
  territorio: { label: "Território Federal", range: "1904–1961", color: "#2F8FBF" },
  estado: { label: "Estado do Acre", range: "1962–hoje", color: "#2FA37A" },
};

export const ACRE_HISTORY_TIMELINE: AcreTimelineEvent[] = [
  {
    when: "1867",
    title: "Tratado de Ayacucho",
    text: "Brasil e Bolívia fixam a fronteira na região; a área do Acre fica reconhecida como boliviana.",
    tip: "É a origem jurídica da disputa: o território era boliviano no papel, mas ocupado por brasileiros.",
    era: "conflito",
  },
  {
    when: "Fim do séc. XIX",
    title: "Ciclo da borracha e migração nordestina",
    text: "A procura pela borracha atrai seringueiros, muitos deles nordestinos que fugiam da seca, para os rios do Acre.",
    tip: "Ligue a seca no Nordeste, o seringal e o povoamento brasileiro do território.",
    era: "conflito",
  },
  {
    when: "14/7/1899",
    title: "Estado Independente do Acre",
    text: "Luis Gálvez proclama o Estado Independente do Acre em Puerto Alonso, atual Porto Acre.",
    tip: "Primeira tentativa de separação do domínio boliviano; Porto Acre aparece em prova por isso.",
    era: "conflito",
  },
  {
    when: "1901",
    title: "Bolivian Syndicate",
    text: "A Bolívia arrenda a exploração do Acre a um consórcio estrangeiro, o Bolivian Syndicate.",
    tip: "A concessão acirrou a reação de brasileiros e do governo brasileiro.",
    era: "conflito",
  },
  {
    when: "6/8/1902",
    title: "Revolução Acreana começa em Xapuri",
    text: "Plácido de Castro lidera os seringueiros e toma a intendência boliviana de Xapuri.",
    tip: "Decore data, lugar e líder: 6 de agosto de 1902, Xapuri, Plácido de Castro.",
    era: "conflito",
  },
  {
    when: "17/11/1903",
    title: "Tratado de Petrópolis",
    text: "Brasil e Bolívia fecham o acordo: o Acre passa ao Brasil, que paga 2 milhões de libras e se compromete com a Madeira-Mamoré.",
    tip: "Desfecho diplomático da Questão do Acre; um acordo preliminar fora firmado em 21 de março de 1903.",
    era: "conflito",
  },
  {
    when: "1904",
    title: "Território Federal do Acre",
    text: "O Acre é organizado como Território Federal, administrado pela União.",
    tip: "De 1904 a 1962 o Acre não era estado: governo nomeado pela União.",
    era: "territorio",
  },
  {
    when: "15/6/1962",
    title: "Lei nº 4.070: nasce o Estado do Acre",
    text: "A lei eleva o Território do Acre à categoria de Estado; Rio Branco é a capital.",
    tip: "Memorize a lei e o ano: Lei nº 4.070, de 15 de junho de 1962.",
    era: "estado",
  },
  {
    when: "22/12/1988",
    title: "Assassinato de Chico Mendes",
    text: "O seringueiro e líder sindical Chico Mendes é morto em Xapuri; a luta dos seringueiros ganha repercussão mundial.",
    tip: "Chico Mendes liga história, cultura e meio ambiente: povos da floresta e extrativismo.",
    era: "estado",
  },
  {
    when: "3/10/1989",
    title: "Constituição do Estado do Acre",
    text: "A Constituição estadual é promulgada em 3 de outubro de 1989 e publicada em 5 de outubro.",
    tip: "Cuidado: promulgação (3/10) e publicação (5/10) são datas diferentes.",
    era: "estado",
  },
  {
    when: "12/3/1990",
    title: "Reserva Extrativista Chico Mendes",
    text: "O Decreto nº 99.144/1990 cria a Resex nos municípios de Xapuri, Rio Branco, Brasiléia e Assis Brasil.",
    tip: "Unidade de conservação federal ligada ao legado dos seringueiros.",
    era: "estado",
  },
  {
    when: "2017",
    title: "Nova divisão regional do IBGE",
    text: "O IBGE adota regiões geográficas imediatas e intermediárias, que substituem mesorregiões e microrregiões.",
    tip: "A prova pode usar o recorte antigo (2 meso, 5 micro) ou o vigente (2 intermediárias, 5 imediatas).",
    era: "estado",
  },
  {
    when: "6/10/2019",
    title: "Gefron",
    text: "Nasce o Grupo Especial de Operações de Fronteira, ligado à Sejusp, para atuar na faixa de fronteira.",
    tip: "Segurança pública e fronteira: Peru e Bolívia são as rotas citadas nas operações.",
    era: "estado",
  },
  {
    when: "2022",
    title: "Censo Demográfico",
    text: "O Acre tem 830.018 habitantes; Rio Branco, a capital, concentra a maior população.",
    tip: "Dado de população: use sempre o ano de referência.",
    era: "estado",
  },
];

export interface AcreGeoStop {
  place: string;
  region: string;
  rivers: string;
  text: string;
  tip: string;
}

/** Viagem de oeste a leste pelo território, ligando regional, rio e história. */
export const ACRE_GEOGRAPHY_TRANSECT: AcreGeoStop[] = [
  {
    place: "Extremo oeste: Mâncio Lima",
    region: "Juruá · Vale do Juruá",
    rivers: "Bacia do rio Juruá",
    text: "Na nascente do rio Moa, na Serra da Contamana, fica o ponto extremo oeste do Brasil. Cruzeiro do Sul é o polo urbano da região.",
    tip: "Juruá reúne 5 municípios: Cruzeiro do Sul, Mâncio Lima, Marechal Thaumaturgo, Porto Walter e Rodrigues Alves.",
  },
  {
    place: "Tarauacá e Envira",
    region: "Envira · Vale do Juruá",
    rivers: "Rios Tarauacá e Envira",
    text: "Região de Feijó, Jordão e Tarauacá, ligada à bacia do Juruá; Tarauacá é o terceiro município mais populoso.",
    tip: "Três municípios, nome da regional no edital: Envira (Tarauacá-Envira).",
  },
  {
    place: "Purus",
    region: "Purus · Vale do Acre",
    rivers: "Bacia do rio Purus",
    text: "Sena Madureira, Manoel Urbano e Santa Rosa do Purus formam a regional; a região tem ações da Funai ligadas a povos isolados.",
    tip: "A mesorregião Vale do Acre começa aqui e vai até a fronteira com a Bolívia.",
  },
  {
    place: "Baixo Acre",
    region: "Baixo Acre · Vale do Acre",
    rivers: "Rio Acre",
    text: "Sete municípios, com Rio Branco, a capital. Porto Acre lembra o Estado Independente de 1899; Plácido de Castro homenageia o líder da Revolução.",
    tip: "Baixo Acre: Acrelândia, Bujari, Capixaba, Plácido de Castro, Porto Acre, Rio Branco e Senador Guiomard.",
  },
  {
    place: "Alto Acre e fronteira",
    region: "Alto Acre · Vale do Acre",
    rivers: "Alto curso do rio Acre",
    text: "Xapuri (Revolução e Chico Mendes), Brasiléia, Epitaciolândia e Assis Brasil, junto às fronteiras com Bolívia e Peru.",
    tip: "Quatro municípios; Assis Brasil fica na tríplice fronteira com Peru e Bolívia.",
  },
];
