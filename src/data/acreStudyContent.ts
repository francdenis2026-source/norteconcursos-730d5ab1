/**
 * Conteúdo de estudo de Realidade do Acre por área, com a fonte de cada bloco.
 * Cada item foi conferido em fonte pública em CHECKED_ON. Dados que mudam (população, notícias,
 * operações) trazem o ano de referência e devem ser revistos a cada nova divulgação oficial.
 */
export const ACRE_CONTENT_CHECKED_ON = "2026-11-13";

export interface AcreSource {
  label: string;
  url: string;
}

export interface AcreStudyCard {
  title: string;
  /** Ano ou data a que o dado se refere. */
  reference: string;
  points: string[];
  source: AcreSource;
  /** Cuidado de leitura: divergência entre fontes, dado a conferir ou natureza da fonte. */
  caution?: string;
}

export const ACRE_STUDY_CONTENT: Record<string, AcreStudyCard[]> = {
  historia: [
    {
      title: "Revolução Acreana e a Questão do Acre",
      reference: "1902–1903",
      points: [
        "A resistência armada liderada por José Plácido de Castro começou em 6 de agosto de 1902, com a tomada de Xapuri.",
        "O conflito opôs seringueiros e brasileiros instalados no território à Bolívia e ao Bolivian Syndicate, que recebera a concessão da região.",
        "O desfecho foi diplomático: o Tratado de Petrópolis incorporou o território ao Brasil.",
      ],
      source: { label: "Museu Histórico Nacional — A Questão do Acre", url: "https://atom-mhn.museus.gov.br/downloads/questao-acreana.pdf" },
      caution: "As fontes divergem quanto à data de término dos combates e às áreas envolvidas; para a prova, memorize o início (1902) e o tratado (1903).",
    },
    {
      title: "Tratado de Petrópolis",
      reference: "17 de novembro de 1903",
      points: [
        "Foi firmado entre Brasil e Bolívia.",
        "O Brasil se comprometeu a pagar 2 milhões de libras esterlinas e a construir a Estrada de Ferro Madeira-Mamoré.",
        "Um acordo preliminar havia sido assinado em 21 de março de 1903.",
      ],
      source: { label: "Museu Histórico Nacional — A Questão do Acre", url: "https://atom-mhn.museus.gov.br/downloads/questao-acreana.pdf" },
    },
    {
      title: "De Território Federal a Estado",
      reference: "1904–1962",
      points: [
        "O Acre foi organizado como Território Federal em 1904.",
        "A Lei nº 4.070, de 15 de junho de 1962, erigiu o Território do Acre em Estado do Acre; foi publicada no DOU de 22/6/1962.",
        "Rio Branco é a capital do Estado.",
      ],
      source: { label: "Planalto — Lei nº 4.070/1962", url: "https://www.planalto.gov.br/ccivil_03/leis/1950-1969/l4070.htm" },
    },
    {
      title: "Chico Mendes e as reservas extrativistas",
      reference: "Decreto de 12 de março de 1990",
      points: [
        "O Decreto nº 99.144/1990 criou a Reserva Extrativista Chico Mendes, nos municípios de Xapuri, Rio Branco, Brasiléia e Assis Brasil.",
        "A área aproximada fixada no decreto é de 970.570 hectares.",
        "A reserva é uma unidade de conservação federal, administrada pelo ICMBio.",
      ],
      source: { label: "Planalto — Decreto nº 99.144/1990", url: "https://planalto.gov.br/ccivil_03/decreto/1990-1994/D99144.htm" },
      caution: "A área atual pode diferir da do decreto; confira o valor vigente no cadastro do ICMBio/CNUC antes de citar números.",
    },
  ],
  economia: [
    {
      title: "População do Acre",
      reference: "Censo 2022 (IBGE)",
      points: [
        "O Acre tinha 830.018 habitantes: 414.686 mulheres (50,0%) e 415.332 homens (50,0%).",
        "A densidade demográfica foi de 5,06 habitantes por km².",
        "A estimativa do IBGE para 2025 é de 884.372 pessoas.",
        "Mais de 66% da população se declarou parda.",
      ],
      source: { label: "IBGE — Cidades e Estados: Acre", url: "https://www.ibge.gov.br/cidades-e-estados/ac" },
      caution: "O percentual de pessoas pardas vem de reportagem sobre o Censo (A Gazeta do Acre); confirme na tabela de cor ou raça do Censo 2022 no SIDRA.",
    },
    {
      title: "Estrutura da economia",
      reference: "Contas Regionais 2023 (IBGE)",
      points: [
        "Os serviços, puxados pela administração pública, defesa, educação, saúde e seguridade social, são o principal setor da economia acreana.",
        "A agropecuária aparece em seguida entre as maiores contribuições ao PIB estadual.",
        "Em anos anteriores (2016 e 2017), os serviços já respondiam por cerca de 80% do valor adicionado.",
      ],
      source: { label: "IBGE — PIB cresce em todos os 27 estados em 2023", url: "https://agenciadenoticias.ibge.gov.br/pt/agencia-noticias/45142-pib-cresce-em-todos-os-27-estados-do-pais-em-2023.html?lang=pt-BR" },
      caution: "Percentuais por setor mudam a cada divulgação das Contas Regionais; use-os com o ano de referência.",
    },
  ],
  cultura: [
    {
      title: "Povos indígenas do Acre",
      reference: "Censo 2022 (IBGE)",
      points: [
        "Os indígenas são 3,82% da população do Acre.",
        "O número de etnias registradas passou de 57 (2010) para 80 (2022), alta de 40,35%.",
        "A população indígena acreana tem a menor idade mediana do país, 17 anos.",
        "Em 15 dos 22 municípios houve queda da população indígena rural.",
      ],
      source: { label: "Portal Amazônia — dados do IBGE sobre etnias no Acre", url: "https://portalamazonia.com/cultura/acre-crescimento-etnias-ibge/" },
      caution: "Fonte jornalística que reproduz dados do IBGE. A mudança de método do Censo 2022 (autodeclaração fora das terras indígenas) afeta a comparação com 2010.",
    },
    {
      title: "Como estudar povos e cultura",
      reference: "Edital PC-AC 2026",
      points: [
        "Separe quatro blocos do edital: povos indígenas, povos isolados, populações tradicionais e extrativismo.",
        "Para cada povo ou comunidade, estude localização, atividade e a política pública relacionada.",
        "Povos isolados e terras indígenas por povo: consulte a Funai; este módulo não os detalha.",
      ],
      source: { label: "IBGE — Censo 2022: povos e comunidades tradicionais", url: "https://www.ibge.gov.br/cidades-e-estados/ac" },
    },
  ],
  politica: [
    {
      title: "Constituição do Estado do Acre",
      reference: "Promulgada em 5 de outubro de 1989",
      points: [
        "São Poderes do Estado, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário.",
        "Rio Branco é a capital; o governador pode transferir temporariamente a sede para outra cidade do Estado.",
        "O Art. 8º traz os símbolos estaduais: a bandeira, o hino e as armas adotados pelo Estado Independente do Acre, com modificações, além de outros que a lei estabelecer.",
        "As sessões da Assembleia Legislativa são públicas (Art. 74).",
      ],
      source: { label: "Constituição do Estado do Acre (texto)", url: "https://www.dhnet.org.br/dados/lex/a_pdf/constituicao_ac.pdf" },
      caution: "O texto consultado pode não incluir emendas posteriores. Número de deputados e duração dos mandatos: confirme no site da Assembleia Legislativa antes de estudar.",
    },
  ],
  seguranca: [
    {
      title: "Fronteira e operações recentes",
      reference: "2024–2026",
      points: [
        "O Acre faz fronteira com Peru e Bolívia, países produtores de cocaína; as rotas do tráfico pela fronteira são alvo de operações.",
        "O Gefron (Grupo Especial de Operações de Fronteira) fez 335 operações entre janeiro e outubro de 2026, contra crimes transfronteiriços.",
        "Em agosto de 2026, a Polícia Federal, pelo CCPI-Amazônia, coordenou com a Sejusp a Operação Atalaia do Juruá, na fronteira com o Peru.",
        "Em 2024, uma operação do Ministério da Justiça com a Sejusp apreendeu 101 kg de drogas no interior do Estado.",
      ],
      source: { label: "Correio da Manhã — Acre registra 335 operações nas áreas de fronteira", url: "https://www.correiodamanha.com.br/nacional/norte/2026/11/332526-acre-registra-335-operacoes-nas-areas-de-fronteira.html" },
      caution: "Notícias servem de atualidade, não de conteúdo fixo. Para a estrutura da Polícia Civil e as competências, use a lei orgânica e o edital.",
    },
    {
      title: "Operação integrada no Vale do Juruá",
      reference: "Agosto de 2026",
      points: [
        "Ação preventiva e repressiva na faixa de fronteira entre Brasil e Peru.",
        "Coordenada pela Polícia Federal, por meio do CCPI-Amazônia, em conjunto com a Sejusp.",
      ],
      source: { label: "Gov.br — Forças de segurança realizam operação integrada no Vale do Juruá", url: "https://www.gov.br/pf/pt-br/assuntos/noticias/2026/08/forcas-de-seguranca-realizam-operacao-integrada-no-vale-do-jurua" },
    },
  ],
};

/** Atualidades do Acre: acontecimentos recentes ligados aos temas do edital, em ordem decrescente de data. */
export const ACRE_CURRENT_AFFAIRS: { date: string; axis: string; title: string; summary: string; source: AcreSource }[] = [
  {
    date: "2026-11",
    axis: "seguranca",
    title: "Gefron: 335 operações de fronteira em 2026",
    summary: "Balanço de janeiro a outubro de 2026 contra crimes transfronteiriços.",
    source: { label: "Correio da Manhã", url: "https://www.correiodamanha.com.br/nacional/norte/2026/11/332526-acre-registra-335-operacoes-nas-areas-de-fronteira.html" },
  },
  {
    date: "2026-08",
    axis: "seguranca",
    title: "Operação Atalaia do Juruá",
    summary: "Polícia Federal e Sejusp atuam na fronteira com o Peru, no Vale do Juruá.",
    source: { label: "Gov.br — Polícia Federal", url: "https://www.gov.br/pf/pt-br/assuntos/noticias/2026/08/forcas-de-seguranca-realizam-operacao-integrada-no-vale-do-jurua" },
  },
  {
    date: "2025",
    axis: "economia",
    title: "Estimativa de 884.372 habitantes",
    summary: "Projeção do IBGE para a população do Acre em 2025, acima dos 830.018 do Censo 2022.",
    source: { label: "IBGE — Cidades e Estados", url: "https://www.ibge.gov.br/cidades-e-estados/ac" },
  },
  {
    date: "2023",
    axis: "economia",
    title: "Contas Regionais: serviços lideram a economia",
    summary: "Administração pública e agropecuária são as atividades de maior contribuição ao PIB do Acre.",
    source: { label: "IBGE — Agência de Notícias", url: "https://agenciadenoticias.ibge.gov.br/pt/agencia-noticias/45142-pib-cresce-em-todos-os-27-estados-do-pais-em-2023.html?lang=pt-BR" },
  },
];
