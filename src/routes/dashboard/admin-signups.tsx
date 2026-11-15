import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * "Cadastros por dia" foi incorporado à Central de controle (gráfico de 30 dias e últimos cadastros)
 * e à lista de alunos (ordenada por data de cadastro). O endereço antigo continua funcionando.
 */
export const Route = createFileRoute("/dashboard/admin-signups")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard/admin-metrics", replace: true });
  },
});
