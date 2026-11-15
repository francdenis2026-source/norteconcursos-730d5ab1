// Nota de uma tentativa de prova/simulado, separada do aproveitamento de estudo
// e da pontuação do ranking.
//
// Nota da prova  -> depende da regra da edição (aqui).
// Aproveitamento -> acertos sobre o total / sobre as respondidas (estudo).
// Ranking        -> calculado no servidor, só com a 1ª resposta de cada questão.
//
// Nenhuma regra é presumida por banca: o desconto "um erro anula um acerto" só
// é aplicado quando a edição tem essa regra registrada em contest_reference_info.
// Qualquer outra situação usa pontuação simples e diz isso ao aluno.
import { questionCareerLabel, questionContestLabel } from "./questionFilterIdentity";

export type ScoringRuleId = "net_one_to_one" | "simple" | "pcac_2026_weighted";

export interface ScoringRule {
  id: ScoringRuleId;
  /** true quando a regra vem de registro da edição; false quando é a pontuação padrão da plataforma. */
  verified: boolean;
  label: string;
  description: string;
}

export const SIMPLE_RULE: ScoringRule = {
  id: "simple",
  verified: false,
  label: "Pontuação simples",
  description:
    "1 ponto por acerto, sem desconto por erro. A regra oficial desta prova não está registrada na plataforma, por isso nada foi descontado.",
};

export const NET_RULE: ScoringRule = {
  id: "net_one_to_one",
  verified: true,
  label: "Nota líquida (um erro anula um acerto)",
  description:
    "Regra registrada para esta edição: cada acerto vale +1, cada erro vale −1 e questões em branco valem 0.",
};

export const PCAC_WEIGHTED_RULE: ScoringRule = {
  id: "pcac_2026_weighted",
  verified: true,
  label: "Pontuação ponderada — PC-AC 2026",
  description:
    "Regra do edital: conhecimentos básicos e jurídicos valem 1 ponto por acerto; conhecimentos específicos valem 2 pontos. A prova completa soma até 160 pontos. Não há desconto por erro; questão anulada recebe pontuação para todos os candidatos.",
};

export function scoringRuleFromId(id: unknown): ScoringRule {
  if (id === "net_one_to_one") return NET_RULE;
  if (id === "pcac_2026_weighted") return PCAC_WEIGHTED_RULE;
  return SIMPLE_RULE;
}

export interface ReferenceRuleRow {
  contest_name: string;
  contest_year: string | number;
  exam_board?: string | null;
  scoring_rule?: string | null;
}

export interface PaperIdentity {
  contest: string;
  career: string;
  board: string;
  year: number | string;
}

const fold = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

/** Só reconhece a regra de desconto 1 para 1 escrita no registro; o resto fica como não verificado. */
export function ruleFromRegistry(text: string | null | undefined): ScoringRule | null {
  if (!text) return null;
  const normalized = fold(text);
  if (
    /conhecimentos basicos\s*24\s*[×x]\s*peso\s*1/.test(normalized) &&
    /conhecimentos juridicos\s*16\s*[×x]\s*peso\s*1/.test(normalized) &&
    /conhecimentos especificos\s*60\s*[×x]\s*peso\s*2/.test(normalized) &&
    /maximo\s*160/.test(normalized)
  )
    return PCAC_WEIGHTED_RULE;
  return /nota\s+l[ií]quida/i.test(text) && /corretas?\s*-\s*erradas?/i.test(text)
    ? NET_RULE
    : null;
}

/**
 * Regra de uma prova específica. Só devolve desconto quando a edição (concurso/cargo + ano + banca)
 * consta no registro; qualquer dúvida cai na pontuação simples.
 */
export function resolveScoringRule(
  paper: PaperIdentity | null,
  registry: readonly ReferenceRuleRow[],
): ScoringRule {
  if (!paper) return SIMPLE_RULE;
  const career = fold(questionCareerLabel(paper.career, paper.contest, paper.year));
  const contest = fold(questionContestLabel(paper.contest));
  const names = new Set([career, contest]);
  const board = fold(paper.board);
  const pcacAuthorialAlias =
    String(paper.year) === "2026" &&
    /pc-?ac|policia civil do acre/i.test(paper.contest) &&
    /oficial investigador/.test(career);
  const matches = registry.filter((row) => {
    if (String(row.contest_year) !== String(paper.year)) return false;
    const rowName = fold(questionContestLabel(row.contest_name));
    const directMatch = names.has(rowName);
    const fullContestAndCareerMatch =
      Boolean(contest && career) && rowName.includes(contest) && rowName.includes(career);
    const pcacAliasMatch =
      pcacAuthorialAlias &&
      rowName.includes("policia civil do acre") &&
      rowName.includes("oficial investigador");
    const contestMatches = directMatch || fullContestAndCareerMatch || pcacAliasMatch;
    const boardMatches =
      !row.exam_board ||
      !board ||
      board === "all" ||
      fold(row.exam_board) === board ||
      (pcacAliasMatch && board === "autoral" && fold(row.exam_board) === "idecan");
    return contestMatches && boardMatches;
  });
  // Registros divergentes para a mesma edição: não escolhe um por conta própria.
  const rules = new Set(matches.map((row) => ruleFromRegistry(row.scoring_rule)?.id ?? "none"));
  if (rules.size !== 1) return SIMPLE_RULE;
  return ruleFromRegistry(matches[0]!.scoring_rule) ?? SIMPLE_RULE;
}

export interface AttemptCounts {
  total: number;
  correct: number;
  wrong: number;
  blank: number;
  /** Needed only by weighted editions; preserves each question's subject and result. */
  items?: { subject: string; correct: boolean }[];
}

export interface AttemptScore {
  rule: ScoringRule;
  answered: number;
  /** Nota conforme a regra (pode ser negativa na regra com desconto). */
  score: number;
  maxScore: number;
  /** Acertos / total de questões da tentativa (inteiro, 0–100). */
  accuracyOfTotal: number;
  /** Acertos / respondidas (inteiro, 0–100); 0 sem respostas. */
  accuracyOfAnswered: number;
  /** Respondidas / total (inteiro, 0–100). */
  completion: number;
}

const BASIC_SUBJECTS = new Set(
  [
    "Língua Portuguesa",
    "Raciocínio Lógico",
    "Raciocínio Lógico-Matemático",
    "Noções de Informática",
    "Informática",
    "Realidade do Estado do Acre",
    "Realidade étnica, social, geográfica, cultural, política e econômica do Estado do Acre",
  ].map(fold),
);
const LEGAL_SUBJECTS = new Set(
  [
    "Noções de Direito Constitucional",
    "Direito Constitucional",
    "Noções de Direito Administrativo",
    "Direito Administrativo",
    "Noções de Direito Penal e Processual Penal",
    "Direito Penal e Processual Penal",
    "Direito Penal",
    "Direito Processual Penal",
    "Legislação Penal e Processual Penal Especial",
    "Legislação Institucional",
  ].map(fold),
);

/** No edital PC-AC 2026, básicos/jurídicos valem 1 e os demais tópicos específicos valem 2. */
export function pcacWeightForSubject(subject: string): number {
  const normalized = fold(subject);
  return BASIC_SUBJECTS.has(normalized) || LEGAL_SUBJECTS.has(normalized) ? 1 : 2;
}

export function scoreAttempt(counts: AttemptCounts, rule: ScoringRule = SIMPLE_RULE): AttemptScore {
  const total = Math.max(0, counts.total);
  const answered = counts.correct + counts.wrong;
  const weightedItems = counts.items ?? [];
  // A weighted score is never guessed from aggregate counts: without the item subjects,
  // fall back explicitly to the standard rule rather than display a misleading weighted note.
  const appliedRule =
    rule.id === "pcac_2026_weighted" && weightedItems.length !== total ? SIMPLE_RULE : rule;
  const weightedMax =
    appliedRule.id === "pcac_2026_weighted"
      ? weightedItems.reduce((sum, item) => sum + pcacWeightForSubject(item.subject), 0)
      : total;
  const score =
    appliedRule.id === "net_one_to_one"
      ? counts.correct - counts.wrong
      : appliedRule.id === "pcac_2026_weighted"
        ? weightedItems.reduce(
            (sum, item) => sum + (item.correct ? pcacWeightForSubject(item.subject) : 0),
            0,
          )
        : counts.correct;
  return {
    rule: appliedRule,
    answered,
    score,
    maxScore: weightedMax,
    accuracyOfTotal: total ? Math.round((counts.correct / total) * 100) : 0,
    accuracyOfAnswered: answered ? Math.round((counts.correct / answered) * 100) : 0,
    completion: total ? Math.round((answered / total) * 100) : 0,
  };
}

/** "56,00" no padrão brasileiro. */
export function formatScore(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
