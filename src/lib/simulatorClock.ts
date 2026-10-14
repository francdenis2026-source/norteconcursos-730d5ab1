/** Wall clock prevents browser timer throttling from extending the exam duration. */
export function simulatorClock(startedAt: number, durationSeconds: number, now: number) {
  const elapsed = Math.min(durationSeconds, Math.max(0, Math.floor((now - startedAt) / 1000)));
  return { elapsed, remaining: Math.max(0, durationSeconds - elapsed) };
}
