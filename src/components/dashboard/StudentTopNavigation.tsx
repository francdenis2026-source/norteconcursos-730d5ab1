import { Link } from "@tanstack/react-router";
import { activeNavigation, navigationKey } from "@/lib/dashboardNavigation";
import { House, ChartNoAxesCombined, ChevronDown, ClipboardList, GraduationCap, BookOpenText, SlidersHorizontal, Sparkles, CalendarClock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { NavigationItem } from "./DashboardNavigation";

const sections: { groups: string[]; label: string; icon: LucideIcon; description: string; tone: string }[] = [
  { groups: ["Central de Estudos", "Material didático"], label: "Estudos", icon: BookOpenText, description: "Ferramentas, biblioteca, leis e conteúdos", tone: "cyan" },
  { groups: ["Questões", "Provas"], label: "Treinos", icon: ClipboardList, description: "Questões, simulados, flashcards e provas", tone: "emerald" },
  { groups: ["Desempenho"], label: "Desempenho", icon: ChartNoAxesCombined, description: "Evolução, análises, histórico e conquistas", tone: "rose" },
  { groups: ["ENEM"], label: "ENEM", icon: GraduationCap, description: "Preparação para o ENEM", tone: "indigo" },
  { groups: ["Conta"], label: "Conta", icon: SlidersHorizontal, description: "Perfil e assinatura", tone: "slate" },
];

export function StudentTopNavigation({ items, pathname, search }: { items: NavigationItem[]; pathname: string; search: Record<string, unknown> }) {
  const current = activeNavigation(items, pathname, search);
  const isHome = pathname === "/dashboard" || pathname === "/dashboard/";
  const isPlanningPage = pathname === "/dashboard/study-coach" || pathname === "/dashboard/cronograma";
  const section = sections.find(candidate => current && candidate.groups.includes(current.group));
  // Na home, as categorias abrem os seus submenus. Dentro das páginas, apenas
  // os links do grupo atual permanecem visíveis, sem misturar outras áreas.
  const entries = !isHome && section
    ? items.filter(item => section.groups.includes(item.group) && item.href !== "/dashboard")
    : [];

  return (
    <nav className="student-top-navigation no-print" aria-label={isHome ? "Áreas da plataforma" : "Submenus da área atual"}>
      <Link to="/dashboard" className="student-top-navigation__brand" aria-label="Voltar à área principal do aluno">
        <span className="student-top-navigation__brand-mark">N</span>
        <span>NORTE <strong>CONCURSOS</strong></span>
      </Link>
      <div className="student-top-navigation__links" data-contextual={!isHome}>
        {!isHome && (
          <Link to="/dashboard" className="student-top-navigation__trigger student-top-navigation__home" aria-label="Voltar à área principal">
            <span className="student-top-navigation__icon-wrap" aria-hidden="true"><House size={18} /></span>
            <span className="student-top-navigation__label">Área principal</span>
          </Link>
        )}
        {(isHome || isPlanningPage) && <>
          <Link to="/dashboard/study-coach" className="student-top-navigation__trigger" data-tone="blue" data-active={pathname === "/dashboard/study-coach"} aria-current={pathname === "/dashboard/study-coach" ? "page" : undefined}>
            <span className="student-top-navigation__icon-wrap" aria-hidden="true"><Sparkles size={18} /></span>
            <span className="student-top-navigation__label">Meu plano</span>
          </Link>
          <Link to="/dashboard/cronograma" className="student-top-navigation__trigger" data-tone="blue" data-active={pathname === "/dashboard/cronograma"} aria-current={pathname === "/dashboard/cronograma" ? "page" : undefined}>
            <span className="student-top-navigation__icon-wrap" aria-hidden="true"><CalendarClock size={18} /></span>
            <span className="student-top-navigation__label">Agenda de estudos</span>
          </Link>
        </>}
        {isHome || (!section && !isPlanningPage) ? sections.map(candidate => {
          const groupEntries = items.filter(item => candidate.groups.includes(item.group) && item.href !== "/dashboard");
          if (!groupEntries.length) return null;
          const Icon = candidate.icon;
          return (
            <DropdownMenu key={candidate.label}>
              <DropdownMenuTrigger asChild>
                <button type="button" className="student-top-navigation__trigger" data-tone={candidate.tone} aria-label={candidate.label}>
                  <span className="student-top-navigation__icon-wrap" aria-hidden="true"><Icon size={18} strokeWidth={2.15} absoluteStrokeWidth /></span>
                  <span className="student-top-navigation__label">{candidate.label}</span>
                  <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" className="student-top-navigation__chevron" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={10} className="student-top-navigation__menu">
                <DropdownMenuLabel className="flex flex-col gap-1">
                  <span className="student-top-navigation__menu-title">{candidate.label}</span>
                  <span className="student-top-navigation__menu-description">{candidate.description}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {groupEntries.map(item => (
                  <DropdownMenuItem key={navigationKey(item)} asChild>
                    <Link to={item.href} search={item.search ?? {}}>
                      <item.icon size={17} aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }) : entries.map(item => {
          const selected = navigationKey(current!) === navigationKey(item);
          return (
            <Link
              key={navigationKey(item)}
              to={item.href}
              search={item.search ?? {}}
              className="student-top-navigation__trigger student-top-navigation__submenu"
              data-tone={section.tone}
              data-active={selected}
              aria-current={selected ? "page" : undefined}
              title={item.label}
            >
              <span className="student-top-navigation__icon-wrap" aria-hidden="true"><item.icon size={17} strokeWidth={2.1} /></span>
              <span className="student-top-navigation__label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
