import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { lazy, Suspense, type ComponentType } from "react";

// Import dinâmico: um import estático da rota irmã arrastava a biblioteca inteira (guias do CTB,
// glossários, navegação) para o pacote inicial de TODAS as páginas.
const LibraryIndex = lazy(() =>
  import("./library.index").then((m) => ({
    default: m.Route.options.component as ComponentType,
  })),
);

function LibraryBoundary() {
  const { pathname } = useLocation();
  // O índice com barra é um filho gerado pelo roteador. O fallback direto
  // evita que /dashboard/library fique apenas com um Outlet vazio quando
  // o navegador preserva a URL sem a barra final.
  return pathname.replace(/\/$/, "") === "/dashboard/library" ? (
    <Suspense fallback={null}>
      <LibraryIndex />
    </Suspense>
  ) : (
    <Outlet />
  );
}

export const Route = createFileRoute("/dashboard/library")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    collection?: "subjects" | "laws";
    q?: string | undefined;
    back?: string | undefined;
    discipline?: string | undefined;
  } => ({
    collection: search["collection"] === "subjects" ? ("subjects" as const) : ("laws" as const),
    q:
      typeof search["q"] === "string" || typeof search["q"] === "number"
        ? String(search["q"])
        : undefined,
    back: typeof search["back"] === "string" ? search["back"] : undefined,
    discipline: typeof search["discipline"] === "string" ? search["discipline"] : undefined,
  }),
  component: LibraryBoundary,
});
