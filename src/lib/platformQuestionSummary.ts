export type PlatformQuestionSummary = { registered: number; available: number };
export const QUESTION_COUNT_LABELS = {
  registered: "Total cadastrado",
  available: "Disponíveis para treinar",
  reviewed: "Revisadas com exemplo",
} as const;

/** Reject missing/stale schema responses instead of advertising a fabricated zero. */
export function parsePlatformQuestionSummary(value: unknown): PlatformQuestionSummary {
  const summary = value as Partial<PlatformQuestionSummary> | null;
  if (
    !summary ||
    !Number.isSafeInteger(summary.registered) ||
    !Number.isSafeInteger(summary.available) ||
    typeof summary.registered !== "number" ||
    typeof summary.available !== "number" ||
    summary.registered < 0 ||
    summary.available < 0 ||
    summary.available > summary.registered
  ) {
    throw new Error("Resumo de questões indisponível");
  }
  return { registered: summary.registered, available: summary.available };
}
