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
  {
    label: "SEMA Acre — Zoneamento Ecológico-Econômico, Fase II",
    url: "https://sema.ac.gov.br/wp-content/uploads/2022/02/ZEE-II.pdf",
  },
  {
    label: "Presidência da República — Lei nº 12.876/2013 (fusos horários)",
    url: "https://www.presidencia.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12876.htm",
  },
  {
    label: "SEMA Acre — Unidades de Conservação",
    url: "https://sema.ac.gov.br/departamentos-e-divisoes/divisao-de-areas-naturais-protegidas-e-biodiversidade/",
  },
  {
    label: "SEPLAN Acre/CEDEPLAR — Diagnóstico socioeconômico, infraestrutura de transportes",
    url: "https://seplan.ac.gov.br/wp-content/uploads/2024/02/CEDEPLAR-Diagnostico-Socieconomico-Acre-Livro1-1.pdf",
  },
  {
    label: "AGEAC — Transporte intermunicipal",
    url: "https://ageac.ac.gov.br/transporte-ditrans/",
  },
] as const;

export const ACRE_GEOGRAPHY_FACTS = [
  {
    id: "fuso-horario",
    title: "Localização e fuso horário",
    reference: "Lei nº 12.876/2013",
    points: [
      "O Acre está no extremo sudoeste da Região Norte, na Amazônia brasileira, e faz fronteira com Peru e Bolívia.",
      "O estado está no quarto fuso legal brasileiro: Greenwich menos cinco horas (UTC−5), duas horas atrás de Brasília (UTC−3).",
      "A Lei nº 12.876/2013 restabeleceu o fuso do Acre e revogou a alteração de 2008.",
    ],
    source: { label: "Presidência — Lei nº 12.876/2013", url: "https://www.presidencia.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12876.htm" },
    alternatives: [],
    caution: "Não confunda o horário vigente UTC−5 com o período entre 2008 e 2013, quando houve alteração legal.",
  },
  {
    id: "hidrografia",
    title: "Hidrografia e bacias",
    reference: "Zoneamento Ecológico-Econômico do Acre — Fase II",
    points: [
      "A drenagem do estado integra a Bacia Amazônica.",
      "As bacias do Juruá e do Purus são as duas grandes referências hidrográficas regionais.",
      "Juruá, Purus, Acre, Iaco, Tarauacá e Envira estão entre os rios relevantes para povoamento, abastecimento, pesca e transporte.",
    ],
    source: { label: "SEMA — Zoneamento Ecológico-Econômico, Fase II", url: "https://sema.ac.gov.br/wp-content/uploads/2022/02/ZEE-II.pdf" },
    alternatives: [],
    caution: "A navegabilidade varia por trecho e estação; não trate todos os rios como igualmente navegáveis durante todo o ano.",
  },
  {
    id: "relevo",
    title: "Relevo e Serra do Divisor",
    reference: "Zoneamento Ecológico-Econômico do Acre — Fase II",
    points: [
      "Predominam formas de relevo baixas e suavemente onduladas, associadas à Bacia Amazônica.",
      "As altitudes tendem a diminuir em direção ao leste; a Serra do Divisor se destaca no extremo oeste, junto à fronteira peruana.",
      "A Serra do Divisor concentra as maiores altitudes do estado e integra área de proteção ambiental federal.",
    ],
    source: { label: "SEMA — Zoneamento Ecológico-Econômico, Fase II", url: "https://sema.ac.gov.br/wp-content/uploads/2022/02/ZEE-II.pdf" },
    alternatives: [],
    caution: "Publicações apresentam cotas máximas diferentes para a Serra do Divisor; memorize o posicionamento geográfico e confira a cota quando o enunciado indicar uma fonte.",
  },
  {
    id: "clima-vegetacao",
    title: "Clima e vegetação",
    reference: "Zoneamento Ecológico-Econômico do Acre — Fase II",
    points: [
      "Predomina o clima equatorial quente e úmido, com temperaturas elevadas, umidade alta e chuvas abundantes.",
      "O regime anual apresenta período mais chuvoso e período relativamente mais seco; podem ocorrer friagens com quedas temporárias de temperatura.",
      "A cobertura vegetal pertence ao domínio amazônico, com formações de Floresta Tropical Aberta e Floresta Tropical Densa.",
    ],
    source: { label: "SEMA — Zoneamento Ecológico-Econômico, Fase II", url: "https://sema.ac.gov.br/wp-content/uploads/2022/02/ZEE-II.pdf" },
    alternatives: [],
    caution: "O período chuvoso e o mais seco variam regionalmente; não fixe meses exatos sem referência climatológica.",
  },
  {
    id: "unidades-conservacao",
    title: "Unidades de conservação e áreas protegidas",
    reference: "SEMA Acre — cadastro e gestão de unidades de conservação",
    points: [
      "O estado possui unidades de conservação federais, estaduais e municipais, de Proteção Integral e de Uso Sustentável.",
      "Exemplos de Proteção Integral: Parque Nacional da Serra do Divisor, Parque Estadual Chandless e Estação Ecológica Rio Acre.",
      "Exemplos de Uso Sustentável: Resex Chico Mendes, Alto Juruá, Cazumbá-Iracema, Alto Tarauacá e Riozinho da Liberdade, além de florestas e APAs.",
    ],
    source: { label: "SEMA Acre — Unidades de Conservação", url: "https://sema.ac.gov.br/departamentos-e-divisoes/divisao-de-areas-naturais-protegidas-e-biodiversidade/" },
    alternatives: [],
    caution: "Unidades de conservação e terras indígenas são categorias distintas; não some ou compare áreas sem verificar a metodologia e a data do cadastro.",
  },
  {
    id: "transportes",
    title: "Transportes e integração regional",
    reference: "SEPLAN/CEDEPLAR (2024) e AGEAC (2026)",
    points: [
      "A BR-364 é o principal eixo terrestre longitudinal, ligando Rio Branco ao Vale do Juruá e a Cruzeiro do Sul.",
      "A BR-317, Estrada do Pacífico/Interoceânica, conecta a região de Rio Branco a Assis Brasil e à fronteira com o Peru.",
      "O transporte fluvial é essencial para comunidades ribeirinhas e localidades com acesso rodoviário limitado; o modal aéreo complementa a integração.",
      "A AGEAC regula e fiscaliza o transporte intermunicipal rodoviário e fluvial.",
    ],
    source: { label: "SEPLAN/AC — Diagnóstico socioeconômico, infraestrutura de transportes", url: "https://seplan.ac.gov.br/wp-content/uploads/2024/02/CEDEPLAR-Diagnostico-Socieconomico-Acre-Livro1-1.pdf" },
    alternatives: [{ label: "AGEAC — Transporte intermunicipal", url: "https://ageac.ac.gov.br/transporte-ditrans/" }],
    caution: "Extensão, pavimentação e tempo de viagem mudam por trecho e ano; priorize a função dos corredores e os modais.",
  },
] as const;
