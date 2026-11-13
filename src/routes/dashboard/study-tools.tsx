import { createFileRoute, Navigate } from "@tanstack/react-router";

/**
 * A Central de Estudos foi unificada à Sala de estudo, que já tem a escolha de
 * disciplina e assunto, o cronômetro de foco e o material. Esta rota continua
 * existindo para favoritos e links antigos.
 */
export const Route = createFileRoute("/dashboard/study-tools")({
  validateSearch: (search: Record<string, unknown>): { context?: "enem" | undefined } => ({
    context: search["context"] === "enem" ? "enem" : undefined,
  }),
  component: StudyToolsRedirect,
});

function StudyToolsRedirect() {
  const { context } = Route.useSearch();
  if (context === "enem") return <Navigate to="/dashboard/enem" search={{ tab: "materiais" }} replace />;
  return <Navigate to="/dashboard/study-room" replace />;
}
