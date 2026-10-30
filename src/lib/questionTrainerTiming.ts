export type QuestionTimerState = {
  startedAt: number;
  pausedMs: number;
  pausedAt: number | null;
};

export function elapsedQuestionSeconds(state: QuestionTimerState, now: number): number {
  const pausedUntil = state.pausedAt ?? now;
  const activeMs = Math.max(0, pausedUntil - state.startedAt - state.pausedMs);
  return Math.floor(activeMs / 1000);
}
