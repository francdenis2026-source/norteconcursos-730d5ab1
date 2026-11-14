// Memória das telas já visitadas (índice do histórico do roteador → endereço). Fica também no
// sessionStorage, para o botão Voltar continuar sabendo a tela anterior depois de recarregar a página.
import { dashboardHref } from "@/lib/internalNavigation";

const KEY = "norte-nav-visited";
const visited = new Map<number, string>();
try {
  const saved = JSON.parse(sessionStorage.getItem(KEY) ?? "[]") as [number, string][];
  for (const [index, href] of saved) visited.set(index, href);
} catch {
  /* sem sessionStorage: segue só em memória */
}

export function recordVisit(index: number, href: string) {
  visited.set(index, href);
  try {
    // guarda só as 200 mais recentes
    const entries = [...visited.entries()].sort((a, b) => a[0] - b[0]).slice(-200);
    sessionStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    /* ignorado */
  }
}

/** Endereço da plataforma que está uma posição antes da atual no histórico (ou null). */
export function previousDashboardHref(index: number): string | null {
  return index > 0 ? dashboardHref(visited.get(index - 1) ?? "") : null;
}

/** Posição atual no histórico do roteador. */
export const currentHistoryIndex = () =>
  (window.history.state as { __TSR_index?: number } | null)?.__TSR_index ?? 0;
