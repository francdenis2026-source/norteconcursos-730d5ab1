import { Link } from "@tanstack/react-router";
import { activeNavigation, navigationKey } from "@/lib/dashboardNavigation";
import { PanelsTopLeft, ChartNoAxesCombined, ChevronDown, ClipboardList, GraduationCap, BookOpenText, Library, SlidersHorizontal, Compass, Medal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { NavigationItem } from "./DashboardNavigation";

const sections: { groups: string[]; label: string; icon: LucideIcon; description: string; tone: string }[] = [
  { groups: ["Planejamento", "Minha Preparação"], label: "Preparação", icon: Compass, description: "Painel, objetivo, plano, agenda e evolução", tone: "blue" },
  { groups: ["Central de Estudos", "Material didático"], label: "Estudos", icon: BookOpenText, description: "Ferramentas, biblioteca, leis e conteúdos", tone: "cyan" },
  { groups: ["Questões", "Provas"], label: "Treinos", icon: ClipboardList, description: "Questões, simulados, flashcards e provas", tone: "emerald" },
  { groups: ["Desempenho"], label: "Desempenho", icon: ChartNoAxesCombined, description: "Resultados, histórico, ranking e evolução", tone: "rose" },
  { groups: ["ENEM"], label: "ENEM", icon: GraduationCap, description: "Preparação para o ENEM", tone: "indigo" },
  { groups: ["Conta"], label: "Conta", icon: SlidersHorizontal, description: "Perfil e assinatura", tone: "slate" },
];

export function StudentTopNavigation({ items, pathname, search }: { items: NavigationItem[]; pathname: string; search: Record<string, unknown> }) {
  const current = activeNavigation(items, pathname, search);
  return (
    <nav className="student-top-navigation no-print" aria-label="Navegação principal">
      <Link to="/dashboard" className="student-top-navigation__brand" aria-label="Norte Concurso — Painel">
        <span className="student-top-navigation__brand-mark">N</span>
        <span>NORTE <strong>CONCURSOS</strong></span>
      </Link>
      <div className="student-top-navigation__links">
        {sections.map(section => {
          const entries = items.filter(item => section.groups.includes(item.group));
          if (!entries.length) return null;
          const active = !!current && section.groups.includes(current.group);
          const Icon = section.icon;
          return (
            <DropdownMenu key={section.label}>
              <DropdownMenuTrigger asChild>
                <button type="button" className="student-top-navigation__trigger" data-tone={section.tone} data-active={active} aria-label={section.label} aria-expanded={undefined}>
                  <span className="student-top-navigation__icon-wrap" aria-hidden="true"><Icon size={18} strokeWidth={2.15} absoluteStrokeWidth aria-hidden="true" focusable="false" /></span>
                  <span className="student-top-navigation__label">{section.label}</span>
                  <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" focusable="false" className="student-top-navigation__chevron" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={10} className="student-top-navigation__menu">
                <DropdownMenuLabel>
                  <span className="student-top-navigation__menu-title">{section.label}</span>
                  <span className="student-top-navigation__menu-description">{section.description}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {entries.map(item => {
                  const selected = !!current && navigationKey(current) === navigationKey(item);
                  return (
                    <DropdownMenuItem key={navigationKey(item)} asChild>
                      <Link to={item.href} search={item.search ?? {}} activeOptions={{ exact: true, includeSearch: true }} aria-current={selected ? "page" : undefined} data-current={selected}>
                        <item.icon size={17} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" focusable="false" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>
    </nav>
  );
}
