// Prova da Polícia Civil de Santa Catarina aplicada em 2026 (banca IDECAN), importada em
// board_exam_questions. A mesma banca (IDECAN) foi escolhida para a PC do Acre: a chamada
// na home usa essa prova real como treino preparatório, sem prometer vínculo entre os concursos.
export const PCSC_EXAM = {
  contest: "PC SC - Agente de Polícia Civil 2026",
  year: "2026",
  board: "IDECAN",
  roles: ["Agente de Polícia Civil"],
  itemsOriginal: 100,
} as const;

/** Abre todos os itens elegíveis da prova; não promete caderno completo. */
export const PCSC_TRAINER_SEARCH = {
  contest: PCSC_EXAM.contest,
  career: PCSC_EXAM.roles[0],
  year: PCSC_EXAM.year,
  board: PCSC_EXAM.board,
  go: "1",
  mode: "catalog",
  limit: "all",
} as const;
