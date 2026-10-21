// Isolated design fixtures. These values never enter the application's query cache.
export const DATASETS = ["demo", "worst", "zero", "one", "unavailable"] as const;
export type Dataset = (typeof DATASETS)[number];
export function getFixture(mode: Dataset) {
  const worst = mode === "worst";
  return {
    title: worst
      ? "Preparação para carreiras policiais, perícia criminal e segurança pública em todo o Brasil."
      : "Sua preparação tem um norte.",
    description: worst
      ? "Organize os estudos para Oficial Investigador de Polícia, Delegado, Perito Criminal e Polícia Rodoviária Federal, com legislação, simulados e análise do que precisa reforçar."
      : "Questões, legislação e simulados para carreiras policiais. Entenda suas prioridades e avance com direção.",
    image:
      mode === "unavailable"
        ? "/media/hero/indisponivel-no-teste.webp"
        : "/media/hero/auth-carreiras-composicao.webp",
    summary:
      mode === "unavailable"
        ? null
        : mode === "zero"
          ? { available: 0, registered: 0 }
          : mode === "one"
            ? { available: 1, registered: 1 }
            : worst
              ? { available: Number.MAX_SAFE_INTEGER, registered: Number.MAX_SAFE_INTEGER }
              : { available: 6148, registered: 8286 },
  };
}
export type HeroFixture = ReturnType<typeof getFixture>;
