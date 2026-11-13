import type { AnyRouter } from "@tanstack/react-router";

/**
 * Na área logada, a barra de endereços mostra só a seção (ex.: /dashboard/material), sem parâmetros longos.
 * O endereço completo fica guardado por entrada do histórico (sessionStorage) e é devolvido antes de o
 * roteador ler a URL, então recarregar a página e os botões Voltar/Avançar continuam abrindo o item certo.
 * Só vale para /dashboard: rotas de autenticação e links de e-mail não são tocados.
 */
const STORE = "norte:full-urls";
// O roteador intercepta history.replaceState e releria a URL abreviada; o método nativo troca só o texto da barra.
const nativeReplace = (state: unknown, url: string) => History.prototype.replaceState.call(window.history, state, "", url);
const SCOPE = "/dashboard";

type Saved = Record<string, string>;
const read = (): Saved => {
  try { return JSON.parse(sessionStorage.getItem(STORE) || "{}") as Saved; } catch { return {}; }
};
const write = (data: Saved) => {
  const keys = Object.keys(data);
  // Limita o tamanho guardado; as entradas mais antigas saem primeiro.
  for (const k of keys.slice(0, Math.max(0, keys.length - 300))) delete data[k];
  try { sessionStorage.setItem(STORE, JSON.stringify(data)); } catch { /* sem armazenamento: só perde a restauração */ }
};
const entryKey = (): string | null => {
  const s = window.history.state as { key?: string; __TSR_key?: string; norteKey?: string } | null;
  return s?.key ?? s?.__TSR_key ?? s?.norteKey ?? null;
};

/** Devolve o endereço completo da entrada atual do histórico, se a barra estiver abreviada. */
let pendingFull: string | null = null;
const CURRENT = "norte:current-url";
const isReload = () => {
  try { return (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type === "reload"; } catch { return false; }
};
export function restoreFullUrl() {
  const key = entryKey();
  let full = key ? read()[key] : undefined;
  if (!full && isReload()) {
    // Ao recarregar, alguns navegadores devolvem o histórico sem estado: usa o último endereço completo desta seção.
    try {
      const cur = JSON.parse(sessionStorage.getItem(CURRENT) || "null") as { clean: string; full: string } | null;
      if (cur && cur.clean === window.location.pathname.replace(/\/$/, "")) full = cur.full;
    } catch { /* sem armazenamento */ }
  }
  if (!full) return;
  const here = window.location.pathname + window.location.search + window.location.hash;
  if (full && full !== here && full.split(/[?#]/)[0]!.startsWith(window.location.pathname.replace(/\/$/, ""))) {
    nativeReplace(window.history.state, full);
    pendingFull = full;
  }
}

function sectionPath(router: AnyRouter): string | null {
  const matches = router.state.matches;
  const id = matches[matches.length - 1]?.routeId;
  if (!id || id.startsWith("__")) return null;
  const parts = id.split("/").filter((p) => p && !p.startsWith("$") && !p.startsWith("_") && p !== "*");
  return parts.length ? `/${parts.join("/")}` : null;
}

let prepared = false;
/** Deve rodar antes de createRouter: o listener de popstate precisa ser registrado antes do roteador. */
export function prepareCleanAddressBar() {
  if (typeof window === "undefined" || prepared) return;
  prepared = true;
  restoreFullUrl();
  window.addEventListener("popstate", restoreFullUrl);
}

export function installCleanAddressBar(router: AnyRouter) {
  if (typeof window === "undefined") return;
  // O servidor só vê a URL abreviada e renderiza a seção; o cliente reabre o item completo logo após hidratar.
  const toOpen = pendingFull;
  pendingFull = null;
  if (toOpen) window.setTimeout(() => router.history.replace(toOpen), 0);
  const apply = () => {
    const { href } = router.state.location;
    if (!href.startsWith(SCOPE)) return;
    const clean = sectionPath(router);
    if (!clean) return;
    let key = entryKey();
    if (!key) {
      // Primeira entrada (abertura direta): ainda sem chave do roteador, cria uma própria.
      key = Math.random().toString(36).slice(2);
      nativeReplace({ ...(window.history.state ?? {}), norteKey: key }, window.location.href);
    }
    const full = href;
    if (full === clean) return;
    const saved = read();
    saved[key] = full;
    write(saved);
    try { sessionStorage.setItem(CURRENT, JSON.stringify({ clean, full })); } catch { /* ignore */ }
    if (window.location.pathname + window.location.search + window.location.hash !== clean) {
      nativeReplace(window.history.state, clean);
    }
  };
  for (const event of ["onResolved", "onRendered"] as const) router.subscribe(event, apply);
  // A abertura direta já chega resolvida, sem novo evento: aplica também uma vez após a hidratação.
  window.setTimeout(apply, 0);
  window.setTimeout(apply, 800);
}
