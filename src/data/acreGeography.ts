/**
 * Regionalização geográfica do Acre para a disciplina Realidade do Acre.
 * Mantém separados: recorte histórico IBGE (1989/1990), recorte IBGE vigente (2017)
 * e regionais de desenvolvimento usadas no edital PC-AC 2026.
 */
export const ACRE_MICROREGIONS = [
  {
    id: "brasileia",
    name: "Brasiléia",
    mesoregion: "Vale do Acre",
    developmentRegion: "Alto Acre",
    municipalities: ["Assis Brasil", "Brasiléia", "Epitaciolândia", "Xapuri"],
  },
  {
    id: "rio-branco",
    name: "Rio Branco",
    mesoregion: "Vale do Acre",
    developmentRegion: "Baixo Acre",
    municipalities: [
      "Acrelândia",
      "Bujari",
      "Capixaba",
      "Plácido de Castro",
      "Porto Acre",
      "Rio Branco",
      "Senador Guiomard",
    ],
  },
  {
    id: "sena-madureira",
    name: "Sena Madureira",
    mesoregion: "Vale do Acre",
    developmentRegion: "Purus",
    municipalities: ["Manoel Urbano", "Santa Rosa do Purus", "Sena Madureira"],
  },
  {
    id: "cruzeiro-do-sul",
    name: "Cruzeiro do Sul",
    mesoregion: "Vale do Juruá",
    developmentRegion: "Juruá",
    municipalities: [
      "Cruzeiro do Sul",
      "Mâncio Lima",
      "Marechal Thaumaturgo",
      "Porto Walter",
      "Rodrigues Alves",
    ],
  },
  {
    id: "tarauaca",
    name: "Tarauacá",
    mesoregion: "Vale do Juruá",
    developmentRegion: "Envira (Tarauacá-Envira)",
    municipalities: ["Feijó", "Jordão", "Tarauacá"],
  },
] as const;

export const ACRE_MESOREGIONS = [
  {
    id: "vale-do-acre",
    name: "Vale do Acre",
    microregions: ["Brasiléia", "Rio Branco", "Sena Madureira"],
    municipalityCount: 14,
  },
  {
    id: "vale-do-jurua",
    name: "Vale do Juruá",
    microregions: ["Cruzeiro do Sul", "Tarauacá"],
    municipalityCount: 8,
  },
] as const;

/** Divisão regional vigente do IBGE desde 2017. */
export const ACRE_CURRENT_IBGE_REGIONS = [
  {
    id: "rio-branco",
    level: "Intermediária",
    name: "Rio Branco",
    immediateRegions: [
      { name: "Rio Branco", municipalities: 7 },
      { name: "Brasiléia", municipalities: 4 },
      { name: "Sena Madureira", municipalities: 3 },
    ],
    municipalityCount: 14,
  },
  {
    id: "cruzeiro-do-sul",
    level: "Intermediária",
    name: "Cruzeiro do Sul",
    immediateRegions: [
      { name: "Cruzeiro do Sul", municipalities: 5 },
      { name: "Tarauacá", municipalities: 3 },
    ],
    municipalityCount: 8,
  },
] as const;

/** Regionalização de desenvolvimento indicada no conteúdo do edital PC-AC 2026. */
export const ACRE_EDITAL_REGIONS = [
  {
    name: "Alto Acre",
    municipalities: ["Assis Brasil", "Brasiléia", "Epitaciolândia", "Xapuri"],
  },
  {
    name: "Baixo Acre",
    municipalities: [
      "Acrelândia",
      "Bujari",
      "Capixaba",
      "Plácido de Castro",
      "Porto Acre",
      "Rio Branco",
      "Senador Guiomard",
    ],
  },
  {
    name: "Purus",
    municipalities: ["Manoel Urbano", "Santa Rosa do Purus", "Sena Madureira"],
  },
  {
    name: "Envira",
    municipalities: ["Feijó", "Jordão", "Tarauacá"],
  },
  {
    name: "Juruá",
    municipalities: [
      "Cruzeiro do Sul",
      "Mâncio Lima",
      "Marechal Thaumaturgo",
      "Porto Walter",
      "Rodrigues Alves",
    ],
  },
] as const;

export const ACRE_GEOGRAPHY_SOURCES = [
  {
    label: "IBGE — Divisão Regional do Brasil: regiões geográficas de 2017",
    url: "https://www.ibge.gov.br/geociencias/cartas-e-mapas/redes-geograficas/15778-divisoes-regionais-do-brasil.html",
  },
  {
    label: "IBGE — Quadro sistemático das Regiões Geográficas Imediatas e Intermediárias",
    url: "https://www.ibge.gov.br/apps/regioes_geograficas/pdfs-extra/O%20recorte%20das%20Regi%C3%B5es%20Geogr%C3%A1ficas%20Imediatas%20e%20Intermedi%C3%A1rias%20de%202017.pdf",
  },
  {
    label: "SEAD Acre — Tabela de mesorregiões, regionais e municípios",
    url: "https://sead.ac.gov.br/tabela-01-divisa%CC%83o-territorial/",
  },
  {
    label: "UFAC — As mesorregiões acreanas",
    url: "https://www2.ufac.br/editora/livros/Umageografia_publicar.pdf",
  },
  {
    label: "IBGE — Mapa do estado do Acre",
    url: "https://educa.ibge.gov.br/images/mapas/pdf/estados-acre.pdf",
  },
  {
    label: "Lei Complementar estadual nº 126/2003 — regionais do Acre",
    url: "https://www.legis.ac.gov.br/detalhar/635",
  },
] as const;
