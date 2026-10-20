// Parte pura do histórico de tentativas (sem acesso ao banco), testável em Node.
// Três coisas diferentes, nunca misturadas: nota da tentativa (regra da edição), aproveitamento
// (acertos sobre o total / respondidas) e pontos de ranking (servidor, só 1ª resposta).
import { scoreAttempt, SIMPLE_RULE, NET_RULE, type ScoringRule } from "./examScoring";

export interface AttemptRow {
  id: string;
  title: string;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  blank_answers: number;
  accuracy: number;
  duration_seconds: number;
  finished_at: string;
}

export interface AttemptRanking {
  answered: number;
  counted: number;
  repeated: number;
  points: number;
  attemptValid: boolean;
}

export interface AttemptDetails {
  rule: ScoringRule;
  score: number;
  maxScore: number;
  /** false quando a regra/nota vêm do padrão da plataforma (tentativa sem registro de regra). */
  ruleRecorded: boolean;
  skipped: number | null;
  ranking: AttemptRanking | null;
}

export interface AttemptWithDetails extends AttemptRow {
  details: AttemptDetails;
}

export type ResultRow = {
  attempt_id: string;
  scoring_rule: string;
  rule_verified: boolean;
  score: number | string;
  max_score: number | string;
  skipped_count: number;
};
export type RankingRow = {
  attempt_id: string;
  answered: number;
  counted: number;
  repeated: number;
  points: number;
  attempt_valid: boolean;
};

export function attemptDetails(
  row: AttemptRow,
  result: ResultRow | undefined,
  ranking: RankingRow | undefined,
): AttemptDetails {
  const rule = result
    ? result.scoring_rule === "net_one_to_one"
      ? { ...NET_RULE, verified: !!result.rule_verified }
      : SIMPLE_RULE
    : SIMPLE_RULE;
  const fallback = scoreAttempt(
    {
      total: row.total_questions,
      correct: row.correct_answers,
      wrong: row.wrong_answers,
      blank: row.blank_answers,
    },
    rule,
  );
  return {
    rule,
    score: result ? Number(result.score) : fallback.score,
    maxScore: result ? Number(result.max_score) : fallback.maxScore,
    ruleRecorded: !!result,
    skipped: result ? result.skipped_count : null,
    ranking: ranking
      ? {
          answered: ranking.answered,
          counted: ranking.counted,
          repeated: ranking.repeated,
          points: ranking.points,
          attemptValid: ranking.attempt_valid,
        }
      : null,
  };
}
