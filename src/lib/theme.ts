export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/** Script embutido no <head>, antes de qualquer renderização, para o tema
 * já nascer correto (sem piscar entre claro e escuro ao carregar a página). */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';var m=document.querySelector('meta[name="theme-color"]')||document.createElement('meta');m.setAttribute('name','theme-color');m.setAttribute('content',d?'#101b14':'#f4f6f3');if(!m.parentNode)document.head.appendChild(m);if(!t)localStorage.setItem('${STORAGE_KEY}',d?'dark':'light');}catch(e){}})();`;

export function getActiveTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  themeColor?.setAttribute("content", theme === "dark" ? "#101b14" : "#f4f6f3");
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
