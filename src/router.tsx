import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    scrollToTopSelectors: ["#dashboard-content"],
    // Mantém as rotas pré-carregadas por um curto período. Com zero, cada
    // passagem do cursor pelo menu refazia o carregamento do chunk e deixava
    // a navegação interna perceptivelmente lenta.
    defaultPreloadStaleTime: 30_000,
  });

  return router;
};
