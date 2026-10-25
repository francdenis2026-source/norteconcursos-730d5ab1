import { createFileRoute, Navigate } from "@tanstack/react-router";

/**
 * Compatibilidade para favoritos e links antigos.
 *
 * O cronômetro integrado fica em /dashboard/study-tools, onde a sessão recebe
 * disciplina, assunto e registro de estudo. Manter uma segunda implementação
 * aqui faria o aluno alternar entre dois relógios com históricos diferentes.
 */
export const Route = createFileRoute("/dashboard/timer")({
  component: LegacyTimerRedirect,
});

function LegacyTimerRedirect() {
  return <Navigate to="/dashboard/study-tools" replace />;
}
