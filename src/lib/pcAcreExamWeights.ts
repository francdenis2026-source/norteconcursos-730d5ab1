import type { PcAcVerticalCargo } from "@/data/pcAcreVerticalizado";

/** Pesos oficiais da prova objetiva — ANEXO II do Edital nº 001 SEAD/PCAC (05/11/2026, banca
 * IDECAN): número de questões e peso de cada disciplina. São esses números, e não a quantidade de
 * itens do conteúdo programático, que definem quanto cada matéria vale na nota final, então é por
 * eles que o cronograma distribui o tempo de estudo.
 *
 * Delegado de Polícia Civil: 100 questões / 155 pontos — 15 básicas (peso 1), 55 jurídicas
 * (peso 2) e 30 específicas (peso 1).
 * Demais cargos: 100 questões / 160 pontos — 24 básicas (peso 1), 16 jurídicas (peso 1) e
 * 60 específicas (peso 2). */

interface DisciplineExamWeight {
  /** Questões da disciplina na prova objetiva. */
  questions: number;
  /** Peso de cada questão. */
  weight: number;
}

const DELEGADO_QUESTIONS: Record<string, DisciplineExamWeight> = {
  "raciocinio-logico": { questions: 5, weight: 1 },
  informatica: { questions: 6, weight: 1 },
  "realidade-acre": { questions: 4, weight: 1 },
  "direito-penal": { questions: 10, weight: 2 },
  "direito-processual-penal": { questions: 10, weight: 2 },
  "legislacao-penal-especial": { questions: 10, weight: 2 },
  "direito-constitucional": { questions: 10, weight: 2 },
  "direito-administrativo": { questions: 10, weight: 2 },
  "legislacao-institucional": { questions: 5, weight: 2 },
};

const OTHER_QUESTIONS: Record<string, DisciplineExamWeight> = {
  portugues: { questions: 6, weight: 1 },
  "raciocinio-logico": { questions: 6, weight: 1 },
  informatica: { questions: 8, weight: 1 },
  "realidade-acre": { questions: 4, weight: 1 },
  "nocoes-constitucional": { questions: 3, weight: 1 },
  "nocoes-administrativo": { questions: 3, weight: 1 },
  "nocoes-penal-processual": { questions: 6, weight: 1 },
  "legislacao-institucional-nocoes": { questions: 4, weight: 1 },
};

/** Bloco de conhecimentos específicos: o edital traz um total único para o bloco, sem abrir por
 * disciplina, então o total é dividido entre as disciplinas específicas do cargo. */
const SPECIFIC_BLOCK: Record<"delegado" | "outros", DisciplineExamWeight> = {
  delegado: { questions: 30, weight: 1 },
  outros: { questions: 60, weight: 2 },
};

const isSpecificBlock = (title: string) => /espec[ií]fic/i.test(title);

export interface PcAcDisciplinePoints {
  id: string;
  name: string;
  blockTitle: string;
  /** Questões atribuídas à disciplina (fração, quando o bloco é dividido). */
  questions: number;
  weight: number;
  /** Pontos máximos da disciplina na prova objetiva. */
  points: number;
  /** Fatia da disciplina no total de pontos da prova objetiva (0 a 1). */
  share: number;
  /** true quando o número vem do total do bloco dividido entre as disciplinas específicas. */
  estimated: boolean;
}

/** Pontos de cada disciplina do cargo na prova objetiva, com a fatia que representa no total. */
export function pcAcDisciplinePoints(cargo: PcAcVerticalCargo): PcAcDisciplinePoints[] {
  const isDelegado = cargo.id === "delegado";
  const table = isDelegado ? DELEGADO_QUESTIONS : OTHER_QUESTIONS;
  const specific = SPECIFIC_BLOCK[isDelegado ? "delegado" : "outros"];
  const specificCount = cargo.blocks
    .filter((block) => isSpecificBlock(block.title))
    .reduce((sum, block) => sum + block.disciplines.length, 0);

  const rows = cargo.blocks.flatMap((block) =>
    block.disciplines.map((discipline) => {
      const known = table[discipline.id];
      const entry = known ?? (isSpecificBlock(block.title) && specificCount
        ? { questions: specific.questions / specificCount, weight: specific.weight }
        : { questions: 1, weight: 1 });
      return {
        id: discipline.id,
        name: discipline.name,
        blockTitle: block.title,
        questions: entry.questions,
        weight: entry.weight,
        points: entry.questions * entry.weight,
        share: 0,
        estimated: !known,
      };
    }),
  );

  const total = rows.reduce((sum, row) => sum + row.points, 0) || 1;
  return rows.map((row) => ({ ...row, share: row.points / total }));
}

export interface PcAcBlockPoints {
  title: string;
  questions: number;
  points: number;
  share: number;
}

/** Resumo por bloco (básicos, jurídicos, específicos) para explicar a lógica ao aluno. */
export function pcAcBlockPoints(cargo: PcAcVerticalCargo): PcAcBlockPoints[] {
  const rows = pcAcDisciplinePoints(cargo);
  const byBlock = new Map<string, PcAcBlockPoints>();
  for (const row of rows) {
    const current = byBlock.get(row.blockTitle) ?? { title: row.blockTitle, questions: 0, points: 0, share: 0 };
    current.questions += row.questions;
    current.points += row.points;
    current.share += row.share;
    byBlock.set(row.blockTitle, current);
  }
  return [...byBlock.values()].map((block) => ({ ...block, questions: Math.round(block.questions) }));
}

/** Prova discursiva de cada cargo, conforme o quadro do edital. Todos os cargos têm prova
 * discursiva: estudo de caso jurídico para Delegado (10 pontos) e redação sobre conhecimentos
 * específicos da carreira para os demais (40 pontos), de 20 a 30 linhas. */
export function pcAcDiscursiveBrief(cargo: PcAcVerticalCargo): string {
  if (cargo.exam?.discursive?.trim()) return cargo.exam.discursive.trim();
  return cargo.id === "delegado"
    ? "Estudo de caso baseado em conhecimentos jurídicos, valendo 10 pontos, em até 30 linhas."
    : "Redação sobre conhecimentos específicos da carreira, valendo 40 pontos, de 20 a 30 linhas.";
}
