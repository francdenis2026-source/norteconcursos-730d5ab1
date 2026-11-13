/**
 * Notas estratégicas por município do Acre para a prova (Realidade do Acre, PC-AC 2026).
 * Só entram fatos conferidos em fonte pública; municípios sem destaque seguro ficam sem nota,
 * e a tela mostra apenas a posição na divisão regional. População: IBGE, Censo 2022.
 */
export interface AcreMunicipalityNote {
  highlight: string;
  exam: string;
}

export const ACRE_MUNICIPALITY_NOTES: Record<string, AcreMunicipalityNote> = {
  "Rio Branco": {
    highlight: "Capital do Estado e município mais populoso: 364.756 habitantes no Censo 2022.",
    exam: "Sede da microrregião e do Baixo Acre; é o ponto de partida para estudar a rede urbana do Estado.",
  },
  "Cruzeiro do Sul": {
    highlight: "Segundo município mais populoso do Estado (prévia do Censo 2022).",
    exam: "Polo do Vale do Juruá e sede da microrregião de Cruzeiro do Sul.",
  },
  "Tarauacá": {
    highlight: "Terceiro município mais populoso do Estado (prévia do Censo 2022).",
    exam: "Sede da microrregião de Tarauacá; a regional do edital é Envira (Tarauacá-Envira).",
  },
  "Sena Madureira": {
    highlight: "Sede da microrregião de Sena Madureira, na regional do Purus.",
    exam: "Uma das três sedes de microrregião do Vale do Acre; a banca costuma pedir a localização por regional.",
  },
  "Xapuri": {
    highlight: "Palco da tomada da intendência boliviana em 6 de agosto de 1902, marco da Revolução Acreana, e cidade onde Chico Mendes foi assassinado, em 1988.",
    exam: "Liga história e geografia: Xapuri aparece na Reserva Extrativista Chico Mendes (Decreto nº 99.144/1990).",
  },
  "Brasiléia": {
    highlight: "Município de fronteira com a Bolívia, na região do Alto Acre.",
    exam: "Sede da microrregião de Brasiléia; faz parte da Resex Chico Mendes (Decreto nº 99.144/1990).",
  },
  "Assis Brasil": {
    highlight: "Município de fronteira, no extremo sudeste do Acre, junto a Peru e Bolívia.",
    exam: "Também integra a Resex Chico Mendes (Decreto nº 99.144/1990); é ponto de ligação rodoviária com o Peru.",
  },
  "Epitaciolândia": {
    highlight: "Município de fronteira com a Bolívia, vizinho de Brasiléia, no Alto Acre.",
    exam: "Memorize os quatro municípios do Alto Acre: Assis Brasil, Brasiléia, Epitaciolândia e Xapuri.",
  },
  "Mâncio Lima": {
    highlight: "Abriga o ponto extremo oeste do Brasil, na nascente do rio Moa (Serra da Contamana).",
    exam: "Fica no Vale do Juruá, microrregião de Cruzeiro do Sul; aparece em questões de limites do território brasileiro.",
  },
  "Porto Acre": {
    highlight: "Local do antigo Puerto Alonso, onde o aventureiro Luis Gálvez proclamou o Estado Independente do Acre, em 1899.",
    exam: "Está no Baixo Acre; conecta-se ao tema do Estado Independente e da Questão do Acre.",
  },
  "Plácido de Castro": {
    highlight: "O nome do município homenageia José Plácido de Castro, líder da Revolução Acreana.",
    exam: "Integra o Baixo Acre; relacione o nome ao personagem central da Revolução Acreana.",
  },
  "Capixaba": {
    highlight: "Município cuja regional diverge entre fontes: edital e SEAD o colocam no Baixo Acre.",
    exam: "Atenção: use o Baixo Acre se a questão seguir o edital; confira o enunciado se citar a Lei Complementar nº 126/2003.",
  },
};

export const ACRE_MUNICIPALITY_STRATEGY: { title: string; text: string }[] = [
  { title: "Decore pelas regionais, não pela lista", text: "Alto Acre (4), Baixo Acre (7), Purus (3), Envira (3) e Juruá (5) somam os 22 municípios. Conte sempre 4+7+3+3+5." },
  { title: "Duas mesorregiões", text: "Vale do Acre: 14 municípios (Alto Acre, Baixo Acre e Purus). Vale do Juruá: 8 (Envira e Juruá)." },
  { title: "Município e história caminham juntos", text: "Xapuri, Porto Acre e Plácido de Castro aparecem em questões de história; Brasiléia, Epitaciolândia e Assis Brasil, em fronteira." },
  { title: "Cuidado com divisões diferentes", text: "O IBGE mudou a divisão em 2017 (regiões imediatas e intermediárias); o edital usa regionais de desenvolvimento. Leia qual recorte a questão pede." },
];
