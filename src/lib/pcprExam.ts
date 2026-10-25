// Prova da Polícia Civil do Paraná aplicada em 11/10/2026 (banca FGV), em destaque na plataforma.
export const PCPR_EXAM = {
  contest: "Polícia Civil do Estado do Paraná",
  year: "2026",
  board: "FGV",
  appliedOn: "11/10/2026",
  roles: ["Delegado de Polícia", "Agente de Polícia Judiciária", "Papiloscopista Policial"],
  officialPage: "https://conhecimento.fgv.br/concursos/pcpr26",
} as const;

/** Abre todos os itens elegíveis disponíveis; não promete que o caderno esteja completo. */
export const PCPR_TRAINER_SEARCH = {
  contest: PCPR_EXAM.contest,
  year: PCPR_EXAM.year,
  career: "Agente de Polícia Judiciária",
  go: "1",
  mode: "catalog",
  limit: "all",
} as const;
