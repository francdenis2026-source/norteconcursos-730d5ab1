export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
let transitionCleanup: number | null = null;

/** Script embutido no <head>, antes de qualquer renderização, para o tema
 * já nascer correto (sem piscar entre claro e escuro ao carregar a página). */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');var d=t?t==='dark':true;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';var m=document.querySelector('meta[name="theme-color"]')||document.createElement('meta');m.setAttribute('name','theme-color');m.setAttribute('content',d?'#141414':'#f4f5f6');if(!m.parentNode)document.head.appendChild(m);if(!t)localStorage.setItem('${STORAGE_KEY}',d?'dark':'light');}catch(e){}})();`;

export function getActiveTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (transitionCleanup !== null) window.cancelAnimationFrame(transitionCleanup);
  root.setAttribute("data-theme-switching", "");
  // Keep transitions disabled through the first paint, including React's icon updates.
  // No forced layout, timer delay, or wait for image/network work is needed.
  transitionCleanup = window.requestAnimationFrame(() => {
    transitionCleanup = window.requestAnimationFrame(() => {
      root.removeAttribute("data-theme-switching");
      transitionCleanup = null;
    });
  });
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor?.setAttribute("content", theme === "dark" ? "#141414" : "#f4f5f6");
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
