import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  // gcTime maior: voltar ao treinador/simulador na mesma sessão reaproveita o acervo já baixado
  // (a atualização em segundo plano continua regida pelo staleTime de cada consulta).
  const queryClient = new QueryClient({ defaultOptions: { queries: { gcTime: 30 * 60_000 } } });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    scrollToTopSelectors: ["#dashboard-content"],
    // Mantém as rotas pré-carregadas por um curto período. Com zero, cada
    // passagem do cursor pelo menu refazia o carregamento do chunk e deixava
    // a navegação interna perceptivelmente lenta.
    defaultPreloadStaleTime: 30_000,
    defaultPreload: "intent",
    defaultPreloadDelay: 50,
  });

  return router;
};
