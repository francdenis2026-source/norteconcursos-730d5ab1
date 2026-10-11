import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { LibraryIndex } from "./library.index";

function LibraryBoundary() {
  const { pathname } = useLocation();
  // O índice com barra é um filho gerado pelo roteador. O fallback direto
  // evita que /dashboard/library fique apenas com um Outlet vazio quando
  // o navegador preserva a URL sem a barra final.
  return pathname.replace(/\/$/, "") === "/dashboard/library" ? <LibraryIndex /> : <Outlet />;
}

export const Route = createFileRoute("/dashboard/library")({
  component: LibraryBoundary,
});
