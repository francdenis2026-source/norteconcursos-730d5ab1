import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { getActiveTheme, toggleTheme, type Theme } from "@/lib/theme";

/** Botão discreto de alternância de tema, visível apenas no header mobile
 * (o CSS esconde em telas largas). Aplica o tema no documento inteiro e
 * lembra a escolha em localStorage — ver src/lib/theme.ts.
 *
 * O tema real só é lido DEPOIS da hidratação: durante a renderização
 * inicial o servidor e o cliente precisam concordar (o script do <head>
 * em src/lib/theme.ts já pinta o tema correto antes disso), senão o React
 * reclama de mismatch e regenera a árvore. */
export function ThemeToggle() {
  // O script do head garante que a classe .dark já está no <html> antes da
  // hidratação; "dark" é o default estável do SSR (src/lib/theme.ts).
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    setTheme(getActiveTheme());
  }, []);
  return (
    <button
      type="button"
      className="lp-theme-toggle"
      onClick={() => setTheme(toggleTheme())}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
