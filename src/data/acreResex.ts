/**
 * Reservas extrativistas (Resex) federais do Acre.
 * Fonte: Cadastro Nacional de Unidades de Conservação (CNUC/MMA), relatórios exportados em 12/11/2026.
 * "area" = área calculada por geoprocessamento; "legalArea" = área do ato de criação.
 * A Resex do Alto Juruá não teve relatório utilizável no CNUC: aparece sem área e sem municípios.
 */
export interface AcreResex {
  id: string;
  name: string;
  created: string;
  act: string;
  area?: number;
  legalArea?: number;
  municipalities: string[];
  color: string;
  note?: string;
}

export const ACRE_RESEX: AcreResex[] = [
  {
    id: "chico-mendes",
    name: "Chico Mendes",
    created: "12/03/1990",
    act: "Decreto nº 99.144/1990",
    area: 931452.27,
    legalArea: 970570,
    municipalities: ["Assis Brasil", "Brasiléia", "Capixaba", "Epitaciolândia", "Rio Branco", "Sena Madureira", "Xapuri"],
    color: "#2FA37A",
    note: "O decreto de 1990 cita Xapuri, Rio Branco, Brasiléia e Assis Brasil; o CNUC hoje lista sete municípios, porque Capixaba e Epitaciolândia foram criados depois.",
  },
  {
    id: "cazumba-iracema",
    name: "Cazumbá-Iracema",
    created: "19/09/2002",
    act: "Decreto s/n de 19/9/2002",
    area: 756926.53,
    legalArea: 750794.7,
    municipalities: ["Manoel Urbano", "Sena Madureira"],
    color: "#E0813B",
  },
  {
    id: "riozinho-da-liberdade",
    name: "Riozinho da Liberdade",
    created: "17/02/2005",
    act: "Decreto s/n de 17/2/2005",
    area: 324899.93,
    legalArea: 325602.66,
    municipalities: ["Cruzeiro do Sul", "Marechal Thaumaturgo", "Porto Walter", "Tarauacá"],
    color: "#3E8FD1",
  },
  {
    id: "alto-tarauaca",
    name: "Alto Tarauacá",
    created: "08/11/2000",
    act: "Decreto s/n de 8/11/2000",
    area: 154131.6,
    legalArea: 151199.64,
    municipalities: ["Jordão", "Marechal Thaumaturgo", "Tarauacá"],
    color: "#8E7CD8",
  },
  {
    id: "alto-jurua",
    name: "Alto Juruá",
    created: "23/01/1990",
    act: "Decreto de 23/1/1990",
    municipalities: [],
    color: "#D9657F",
    note: "Sem relatório utilizável no CNUC: a data vem de fonte secundária e a área e os municípios não foram confirmados.",
  },
];

/** Área do Acre em hectares (cerca de 164,2 mil km², IBGE). */
export const ACRE_TOTAL_HECTARES = 16_417_300;
