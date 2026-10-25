/** Acre is UTC−5 throughout the year; fractional seconds keep the hour and minute hands continuous. */
export function backdropClockAngles(epoch: number) {
  const seconds = (((epoch / 1000 - 5 * 3600) % 43200) + 43200) % 43200;
  return { hour: seconds / 120, minute: (seconds % 3600) / 10, second: (seconds % 60) * 6 };
}

/** A quartz-style tick stays aligned to wall-clock seconds, even when mounted mid-second. */
export function backdropClockTick(epoch: number) {
  const wholeSecond = Math.floor(epoch / 1000);
  return { angle: (((wholeSecond % 60) + 60) % 60) * 6, delay: -(epoch / 1000 - wholeSecond) };
}
