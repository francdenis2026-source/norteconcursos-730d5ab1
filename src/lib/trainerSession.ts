/** Keep the announced session within the available catalog and first-answer allowance. */
export function trainerSessionSize(
  available: number,
  requested: string | number,
  remaining?: number,
): number {
  const stock = Number.isFinite(available) ? Math.max(0, Math.floor(available)) : 0;
  const size = Number(requested);
  const desired =
    requested === "all" ? stock : Number.isSafeInteger(size) && size > 0 ? Math.min(size, 50) : 20;
  const allowance =
    remaining === undefined
      ? stock
      : Number.isFinite(remaining)
        ? Math.max(0, Math.floor(remaining))
        : 0;
  return Math.min(stock, desired, allowance);
}

/** In catalog practice, limit only NEW answers; already answered items remain available for review. */
export function catalogSessionQuestions<T extends { source: string; id: string }>(
  questions: T[],
  answers: ReadonlyMap<string, unknown>,
  remaining?: number,
): T[] {
  if (remaining === undefined) return questions;
  let allowance = Number.isFinite(remaining) ? Math.max(0, Math.floor(remaining)) : 0;
  return questions.filter((q) => {
    if (answers.has(`${q.source}:${q.id}`)) return true;
    if (allowance <= 0) return false;
    allowance--;
    return true;
  });
}

/** "skipped" = o aluno pulou a questão: nada foi respondido, nada conta como erro e nenhum ponto é gerado. */
export type TrainerResult = "ok" | "err" | "skipped";

/** Sequential practice can revisit saved answers; the next unanswered item remains the frontier. A skipped item is passed, not answered. */
export function trainerReachableIndex(
  results: readonly (string | null | undefined)[],
  total: number,
) {
  const hole = results.findIndex((value) => value !== "ok" && value !== "err" && value !== "skipped");
  return Math.max(0, Math.min(total - 1, hole < 0 ? results.length : hole));
}

/** Contagens separadas: respondidas (acertos + erros) nunca incluem as puladas. */
export function trainerTally(results: readonly (string | null | undefined)[], total: number) {
  const correct = results.filter((value) => value === "ok").length;
  const wrong = results.filter((value) => value === "err").length;
  const skipped = results.filter((value) => value === "skipped").length;
  return {
    correct,
    wrong,
    skipped,
    answered: correct + wrong,
    remaining: Math.max(0, total - correct - wrong - skipped),
  };
}

/** The session can end when every item was answered or consciously skipped. */
export function trainerCanFinish(results: readonly (string | null | undefined)[], total: number) {
  const { answered, skipped } = trainerTally(results, total);
  return answered + skipped >= total;
}
