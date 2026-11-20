import { createFileRoute, redirect } from "@tanstack/react-router";

/** O Radar do edital foi removido; links antigos levam ao Mapa da prova. */
export const Route = createFileRoute("/dashboard/edital-radar")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard/mapa-idecan", replace: true });
  },
});
