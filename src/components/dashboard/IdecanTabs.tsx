import { Link, useLocation } from "@tanstack/react-router";
import { BarChart3, BookOpenCheck, Layers, Radar, Scale, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "@/styles/idecan-hub.css";

const TABS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/dashboard/mapa-idecan", label: "Mapa da prova", icon: Target },
  { to: "/dashboard/pc-acre-edital", label: "Edital por cargo", icon: BookOpenCheck },
  { to: "/dashboard/inteligencia-idecan", label: "Estatísticas da banca", icon: BarChart3 },
  { to: "/dashboard/edital-radar", label: "Radar do edital", icon: Radar },
  { to: "/dashboard/exam-panorama", label: "Panorama das provas", icon: Layers },
  { to: "/dashboard/perfil-bancas", label: "Perfil das bancas", icon: Scale },
];

/** Abas do menu "Mapa IDECAN": o mesmo conjunto aparece no topo de cada página da área. */
export function IdecanTabs() {
  const { pathname } = useLocation();
  return (
    <nav className="idx-tabs no-print" aria-label="Mapa IDECAN">
      <ul>
        {TABS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname === `${to}/`;
          return (
            <li key={to}>
              <Link to={to} aria-current={active ? "page" : undefined} data-active={active}>
                <Icon aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
