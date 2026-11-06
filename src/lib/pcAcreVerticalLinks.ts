/** Liga cada disciplina do edital verticalizado da PC-AC ao material que já existe na
 * plataforma (biblioteca por disciplina e treinador de questões), usando a mesma taxonomia
 * de matérias do restante do site (ver `canonicalSubject` em `./subjects`). Só entram aqui
 * disciplinas com correspondência confiável; o resto fica sem link em vez de levar a uma
 * busca vazia. */

export interface PcAcDisciplineLink {
  /** Matérias (taxonomia canônica) com teoria/questões já cadastradas para esta disciplina. */
  subjects?: string[];
  /** Âncora na própria página do edital (ex.: a seção de legislação institucional). */
  anchor?: string;
}

const SUBJECTS_BY_DISCIPLINE: Record<string, string[]> = {
  "raciocinio-logico": ["Raciocínio Lógico"],
  informatica: ["Informática"],
  portugues: ["Língua Portuguesa"],
  "direito-penal": ["Direito Penal"],
  "direito-processual-penal": ["Direito Processual Penal"],
  "direito-constitucional": ["Direito Constitucional"],
  "nocoes-constitucional": ["Direito Constitucional"],
  "direito-administrativo": ["Direito Administrativo"],
  "nocoes-administrativo": ["Direito Administrativo"],
  "nocoes-penal-processual": ["Direito Penal", "Direito Processual Penal"],
  "legislacao-penal-especial": ["Legislação Penal Extravagante"],
  criminalistica: ["Criminalística"],
  "nocoes-medicina-legal": ["Medicina Legal"],
  "medicina-legal-forense": ["Medicina Legal"],
  "criminologia-vitimologia": ["Criminologia"],
};

const ANCHOR_BY_DISCIPLINE: Record<string, string> = {
  "legislacao-institucional": "pcac-legislacao-institucional",
};

export function pcAcDisciplineLink(disciplineId: string): PcAcDisciplineLink | null {
  const subjects = SUBJECTS_BY_DISCIPLINE[disciplineId];
  if (subjects) return { subjects };
  const anchor = ANCHOR_BY_DISCIPLINE[disciplineId];
  if (anchor) return { anchor };
  return null;
}
