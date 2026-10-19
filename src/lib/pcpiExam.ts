export const PCPI_EXAM = {
  contest: "Polícia Civil do Piauí",
  year: "2026",
  board: "FGV",
  roles: ["Delegado de Polícia Civil", "Oficial Investigador"],
} as const;

/** Each shortcut starts only its identified paper, never a pool mixing both roles. */
export function pcpiTrainerSearch(career: (typeof PCPI_EXAM.roles)[number]) {
  return {
    contest: `${PCPI_EXAM.contest} – ${career}`,
    career,
    year: PCPI_EXAM.year,
    board: PCPI_EXAM.board,
    mode: "catalog",
    go: "1",
    limit: "all",
  };
}
