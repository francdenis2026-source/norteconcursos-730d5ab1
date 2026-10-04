import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { getActiveTheme, toggleTheme } from "@/lib/theme";

/** Botão discreto de alternância de tema, visível apenas no header mobile
 * (o CSS esconde em telas largas). Aplica o tema no documento inteiro e
 * lembra a escolha em localStorage — ver src/lib/theme.ts. */
export function ThemeToggle() {
  const [theme, setTheme] = useState(getActiveTheme);
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
