import { Link } from "@tanstack/react-router";
import { activeNavigation, navigationKey } from "@/lib/dashboardNavigation";
import { BookOpen, ChartNoAxesCombined, ChevronDown, ClipboardCheck, GraduationCap, LayoutDashboard, LibraryBig, Settings2, Target, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { NavigationItem } from "./DashboardNavigation";

const sections: { group: string; label: string; icon: LucideIcon; description: string; tone: string }[] = [
  { group: "Planejamento", label: "Painel", icon: LayoutDashboard, description: "Resumo e próximos passos", tone: "slate" },
  { group: "Minha Preparação", label: "Preparação", icon: Target, description: "Objetivo, plano e agenda", tone: "blue" },
  { group: "Central de Estudos", label: "Estudar", icon: BookOpen, description: "Ferramentas de aprendizagem", tone: "cyan" },
  { group: "Material didático", label: "Materiais", icon: LibraryBig, description: "Biblioteca e conteúdos", tone: "violet" },
  { group: "Questões", label: "Questões", icon: ClipboardCheck, description: "Treinos, erros e flashcards", tone: "emerald" },
  { group: "Provas", label: "Provas", icon: Trophy, description: "Simulados e provas realizadas", tone: "amber" },
  { group: "Desempenho", label: "Desempenho", icon: ChartNoAxesCombined, description: "Resultados e evolução", tone: "rose" },
  { group: "ENEM", label: "ENEM", icon: GraduationCap, description: "Preparação para o ENEM", tone: "indigo" },
  { group: "Conta", label: "Conta", icon: Settings2, description: "Perfil e assinatura" },
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
          const entries = items.filter(item => item.group === section.group);
          if (!entries.length) return null;
          const active = current?.group === section.group;
          const Icon = section.icon;
          return (
            <DropdownMenu key={section.group}>
              <DropdownMenuTrigger asChild>
                <button type="button" className="student-top-navigation__trigger" data-tone={section.tone} data-active={active} aria-label={section.label} aria-expanded={undefined}>
                  <span className="student-top-navigation__icon-wrap" aria-hidden="true"><Icon /></span>
                  <span>{section.label}</span>
                  <ChevronDown aria-hidden="true" className="student-top-navigation__chevron" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={10} className="student-top-navigation__menu">
                <DropdownMenuLabel>
                  <span className="student-top-navigation__menu-title">{section.group}</span>
                  <span className="student-top-navigation__menu-description">{section.description}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {entries.map(item => {
                  const selected = !!current && navigationKey(current) === navigationKey(item);
                  return (
                    <DropdownMenuItem key={navigationKey(item)} asChild>
                      <Link to={item.href} search={item.search ?? {}} activeOptions={{ exact: true, includeSearch: true }} aria-current={selected ? "page" : undefined} data-current={selected}>
                        <item.icon aria-hidden="true" />
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
