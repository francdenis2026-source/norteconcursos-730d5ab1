/** Acre is UTC−5 throughout the year; fractional seconds keep all three hands continuous. */
export function backdropClockAngles(epoch: number) {
  const seconds = (((epoch / 1000 - 5 * 3600) % 43200) + 43200) % 43200;
  return { hour: seconds / 120, minute: (seconds % 3600) / 10, second: (seconds % 60) * 6 };
}
