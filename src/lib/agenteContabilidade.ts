// Plano de estudo de Contabilidade Geral para o cargo de Agente de Polícia Federal.
// Base: Bloco III do edital da PF 2025 (24 itens, só Contabilidade Geral) e as questões de Agente
// cadastradas (PF 2014, 2018, 2021 e 2025). O tópico de cada questão foi atribuído por palavra-chave
// do enunciado (classificação automática, aproximada); o desempenho do aluno vem dos itens dele.

export interface AgenteTopic {
  id: number;
  label: string;
  materials: { slug: string; title: string }[];
}

export const AGENTE_TOPICS: AgenteTopic[] = [
  {
    id: 12,
    label: "NBC TSP e estrutura conceitual",
    materials: [
      { slug: "contabilidade-nbc-tsp-estrutura-conceitual", title: "NBC TSP Estrutura Conceitual" },
      { slug: "contabilidade-bases-de-mensuracao", title: "Bases de mensuração" },
      {
        slug: "contabilidade-estrutura-conceitual-informacao-util",
        title: "Estrutura conceitual (CPC 00)",
      },
    ],
  },
  {
    id: 4,
    label: "Contas: natureza e saldos",
    materials: [
      { slug: "contabilidade-contas-plano-de-contas", title: "Contas e plano de contas" },
    ],
  },
  {
    id: 7,
    label: "Operações diversas",
    materials: [
      {
        slug: "contabilidade-lancamentos-operacoes-diversas",
        title: "Lançamentos de operações diversas",
      },
      { slug: "contabilidade-provisoes-passivo-contingente-epcld", title: "Provisões e EPCLD" },
      { slug: "contabilidade-mercadorias-cmv-resultado-bruto", title: "Mercadorias e CMV" },
      {
        slug: "contabilidade-depreciacao-amortizacao-exaustao",
        title: "Depreciação, amortização e exaustão",
      },
    ],
  },
  {
    id: 8,
    label: "Balancete de verificação",
    materials: [{ slug: "contabilidade-balancete-verificacao", title: "Balancete de verificação" }],
  },
  {
    id: 6,
    label: "Escrituração e regimes",
    materials: [
      {
        slug: "contabilidade-escrituracao-partidas-dobradas-livros",
        title: "Escrituração e partidas dobradas",
      },
      { slug: "contabilidade-regimes-caixa-competencia", title: "Regimes de caixa e competência" },
    ],
  },
  {
    id: 2,
    label: "Patrimônio e equação",
    materials: [
      {
        slug: "contabilidade-patrimonio-equacao-fundamental",
        title: "Patrimônio e equação fundamental",
      },
    ],
  },
  {
    id: 10,
    label: "Demonstração do resultado",
    materials: [
      { slug: "contabilidade-mercadorias-cmv-resultado-bruto", title: "Resultado bruto" },
      { slug: "contabilidade-dre-dfc-dva-lei-6404", title: "DRE, DFC e DVA" },
    ],
  },
  {
    id: 3,
    label: "Atos e fatos administrativos",
    materials: [{ slug: "contabilidade-atos-fatos-contabeis", title: "Atos e fatos contábeis" }],
  },
  {
    id: 11,
    label: "Lei 6.404 e pronunciamentos CPC",
    materials: [
      {
        slug: "contabilidade-demonstracoes-contabeis-lei-6404",
        title: "Demonstrações e Lei 6.404",
      },
      {
        slug: "contabilidade-instrumentos-financeiros-cpc-48",
        title: "Instrumentos financeiros (CPC 48)",
      },
      {
        slug: "contabilidade-imobilizado-intangivel-reconhecimento",
        title: "Imobilizado e intangível",
      },
      { slug: "contabilidade-dlpa-dmpl-dra", title: "DLPA, DMPL e DRA" },
    ],
  },
  {
    id: 9,
    label: "Balanço patrimonial",
    materials: [
      { slug: "contabilidade-balanco-patrimonial-estrutura", title: "Balanço patrimonial" },
    ],
  },
  {
    id: 5,
    label: "Plano de contas",
    materials: [
      { slug: "contabilidade-contas-plano-de-contas", title: "Contas e plano de contas" },
    ],
  },
  {
    id: 1,
    label: "Conceitos e finalidades",
    materials: [
      { slug: "contabilidade-conceito-objeto-usuarios", title: "Conceito, objeto e usuários" },
    ],
  },
];

/** Tópico do edital (1 a 12) de cada questão de Contabilidade de Agente, por ano e número do item. */
export const ITEM_TOPIC: Record<number, Record<number, number>> = {
  2014: { 81: 4, 82: 0, 83: 3, 84: 4, 85: 11, 86: 3, 87: 9, 88: 10, 89: 11, 90: 8 },
  2018: {
    97: 4,
    98: 4,
    99: 4,
    100: 0,
    101: 3,
    102: 3,
    103: 4,
    104: 5,
    105: 4,
    106: 6,
    107: 6,
    108: 6,
    109: 7,
    110: 7,
    111: 4,
    112: 8,
    113: 8,
    114: 8,
    115: 2,
    116: 10,
    117: 2,
    118: 11,
    119: 12,
    120: 12,
  },
  2021: {
    97: 2,
    98: 4,
    99: 4,
    100: 0,
    101: 2,
    102: 3,
    103: 6,
    104: 2,
    105: 6,
    106: 11,
    107: 4,
    108: 3,
    109: 6,
    110: 12,
    111: 12,
    112: 12,
    113: 7,
    114: 4,
    115: 10,
    116: 10,
    117: 7,
    118: 2,
    119: 7,
    120: 11,
  },
  2025: {
    97: 4,
    98: 6,
    99: 11,
    100: 3,
    101: 11,
    102: 3,
    103: 6,
    104: 6,
    105: 6,
    106: 4,
    107: 8,
    108: 8,
    109: 8,
    110: 8,
    111: 8,
    112: 11,
    113: 10,
    114: 7,
    115: 7,
    116: 7,
    117: 11,
    118: 12,
    119: 12,
    120: 12,
  },
};

export interface WeekPlan {
  week: number;
  title: string;
  topics: number[];
  hours: number;
  practice: string;
}

// 8 horas por semana: 60% material, 30% questões do tópico, 10% revisão de erros (24 h e 7 dias).
export const AGENTE_WEEKS: WeekPlan[] = [
  {
    week: 1,
    title: "A norma do setor público e a base",
    topics: [12, 2],
    hours: 8,
    practice: "Refazer as questões de NBC TSP e estrutura conceitual",
  },
  {
    week: 2,
    title: "Contas e fatos",
    topics: [4, 3],
    hours: 8,
    practice: "Refazer as questões de contas e de atos e fatos",
  },
  {
    week: 3,
    title: "Escrituração e balancete",
    topics: [6, 8],
    hours: 8,
    practice: "Refazer as questões de escrituração e de balancete",
  },
  {
    week: 4,
    title: "Operações do dia a dia",
    topics: [7],
    hours: 8,
    practice: "Refazer as questões de operações diversas",
  },
  {
    week: 5,
    title: "Resultado e lei societária",
    topics: [10, 11],
    hours: 8,
    practice: "Refazer as questões de DRE, Lei 6.404 e CPC",
  },
  {
    week: 6,
    title: "Revisão e simulado",
    topics: [],
    hours: 8,
    practice: "As 24 questões de Contabilidade da PF 2025, sem consulta, e os erros que sobrarem",
  },
];

export interface TopicStat {
  topic: AgenteTopic;
  asked: number;
  askedByYear: Record<number, number>;
  correct: number;
  wrong: number;
  blank: number;
  pointsLost: number; // erro = 2 pontos perdidos (perde o acerto e leva a penalidade), branco = 1
  hasData: boolean;
}

export type ItemVerdicts = Record<number, Record<string, string>>; // ano -> { item: veredito }

export function computeAgenteStats(verdictsByYear: ItemVerdicts): TopicStat[] {
  const stats = new Map<number, TopicStat>();
  for (const topic of AGENTE_TOPICS)
    stats.set(topic.id, {
      topic,
      asked: 0,
      askedByYear: {},
      correct: 0,
      wrong: 0,
      blank: 0,
      pointsLost: 0,
      hasData: false,
    });
  for (const [yearText, items] of Object.entries(ITEM_TOPIC)) {
    const year = Number(yearText);
    for (const [itemText, topicId] of Object.entries(items)) {
      const stat = stats.get(topicId);
      if (!stat) continue;
      stat.asked += 1;
      stat.askedByYear[year] = (stat.askedByYear[year] ?? 0) + 1;
      const verdict = verdictsByYear[year]?.[itemText];
      if (!verdict) continue;
      stat.hasData = true;
      if (verdict === "correta") stat.correct += 1;
      if (verdict === "errada") stat.wrong += 1;
      if (verdict === "branco") stat.blank += 1;
    }
  }
  for (const stat of stats.values()) stat.pointsLost = stat.wrong * 2 + stat.blank;
  return [...stats.values()]
    .filter((stat) => stat.asked > 0)
    .sort((a, b) => b.pointsLost - a.pointsLost || b.asked - a.asked);
}
