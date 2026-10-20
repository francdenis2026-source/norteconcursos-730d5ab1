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

export type ScoringRuleId = "net_one_to_one" | "simple";

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
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

/** Só reconhece a regra de desconto 1 para 1 escrita no registro; o resto fica como não verificado. */
export function ruleFromRegistry(text: string | null | undefined): ScoringRule | null {
  if (!text) return null;
  return /nota\s+l[ií]quida/i.test(text) && /corretas?\s*-\s*erradas?/i.test(text) ? NET_RULE : null;
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
  const names = new Set([
    fold(questionCareerLabel(paper.career, paper.contest, paper.year)),
    fold(questionContestLabel(paper.contest)),
  ]);
  const board = fold(paper.board);
  const matches = registry.filter(
    (row) =>
      String(row.contest_year) === String(paper.year) &&
      names.has(fold(row.contest_name)) &&
      (!row.exam_board || fold(row.exam_board) === board),
  );
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

export function scoreAttempt(counts: AttemptCounts, rule: ScoringRule = SIMPLE_RULE): AttemptScore {
  const total = Math.max(0, counts.total);
  const answered = counts.correct + counts.wrong;
  const score = rule.id === "net_one_to_one" ? counts.correct - counts.wrong : counts.correct;
  return {
    rule,
    answered,
    score,
    maxScore: total,
    accuracyOfTotal: total ? Math.round((counts.correct / total) * 100) : 0,
    accuracyOfAnswered: answered ? Math.round((counts.correct / answered) * 100) : 0,
    completion: total ? Math.round((answered / total) * 100) : 0,
  };
}

/** "56,00" no padrão brasileiro. */
export function formatScore(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
