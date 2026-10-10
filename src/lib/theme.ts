export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/** Script embutido no <head>, antes de qualquer renderização, para o tema
 * já nascer correto (sem piscar entre claro e escuro ao carregar a página). */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);if(!t)localStorage.setItem('${STORAGE_KEY}',d?'dark':'light');}catch(e){}})();`;

export function getActiveTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* localStorage indisponível (modo privado, etc.) */
  }
}

export function toggleTheme(): Theme {
  const next: Theme = getActiveTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}
