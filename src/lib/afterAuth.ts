/** Destino pedido por um link compartilhado (só áreas de estudo do próprio site). */
const KEY = "nc_after_auth";
const OK = /^\/dashboard\/estudo-pc-acre(\?area=[a-z0-9_-]{1,40}(&topic=[a-z0-9_-]{1,60})?)?$/i;

export function rememberAfterAuth(path: string) {
  try {
    if (OK.test(path)) sessionStorage.setItem(KEY, path);
  } catch {
    /* sem armazenamento: o aluno cai no painel */
  }
}

export function takeAfterAuth(): { to: string; search?: Record<string, string> } {
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (raw && OK.test(raw)) {
      const url = new URL(raw, "https://x.invalid");
      const area = url.searchParams.get("area");
      return area
        ? { to: url.pathname, search: { area } }
        : { to: url.pathname };
    }
  } catch {
    /* ignora */
  }
  return { to: "/dashboard" };
}
