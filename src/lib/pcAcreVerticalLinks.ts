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
  "contabilidade-analise-financeira": ["Contabilidade"],
  estatistica: ["Estatística"],
  "tecnologia-informacao-seguranca": ["Informática"],
  "analise-dados": ["Estatística"],
  criminalistica: ["Medicina Legal e Criminalística"],
  "criminalistica-1": ["Medicina Legal e Criminalística"],
  "criminalistica-2": ["Medicina Legal e Criminalística"],
  "criminalistica-3": ["Medicina Legal e Criminalística"],
  "criminalistica-4": ["Medicina Legal e Criminalística"],
  "criminalistica-5": ["Medicina Legal e Criminalística"],
  "criminalistica-6": ["Medicina Legal e Criminalística"],
  "criminalistica-7": ["Medicina Legal e Criminalística"],
  "criminalistica-8": ["Medicina Legal e Criminalística"],
  "criminalistica-9": ["Medicina Legal e Criminalística"],
  "nocoes-medicina-legal": ["Medicina Legal e Criminalística"],
  "medicina-legal-forense": ["Medicina Legal e Criminalística"],
  "medicina-legal-forense-delegado": ["Medicina Legal e Criminalística"],
  "medicina-legal-comum-pml": ["Medicina Legal e Criminalística"],
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
