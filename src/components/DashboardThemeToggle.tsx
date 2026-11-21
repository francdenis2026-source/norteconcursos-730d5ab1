import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { getActiveTheme, toggleTheme, type Theme } from "@/lib/theme";

/** Seletor global de tema nas áreas de estudo, inclusive leitura de materiais. */
export function DashboardThemeToggle() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getActiveTheme());
  }, []);

  if (!pathname.startsWith("/dashboard")) return null;

  const dark = theme === "dark";
  return (
    <button
      type="button"
      className="nc-dashboard-theme-toggle"
      onClick={() => setTheme(toggleTheme())}
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={dark}
      title={dark ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      <span>{dark ? "Modo claro" : "Modo escuro"}</span>
    </button>
  );
}
