import { useEffect, useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  LayoutDashboard,
  Target,
  BookOpen,
  BrainCircuit,
  ClipboardList,
  BarChart3,
  UserRound,
  ShieldCheck,
  GraduationCap,
  Wrench,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { activeNavigation, navigationKey } from "@/lib/dashboardNavigation";
export { navigationActive } from "@/lib/dashboardNavigation";
export type NavigationItem = {
  group: string;
  label: string;
  icon: LucideIcon;
  href: string;
  search?: Record<string, string>;
  adminOnly?: boolean;
  soon?: boolean;
  primary?: boolean;
};
const groupIcons: Record<string, LucideIcon> = {
  Planejamento: LayoutDashboard,
  "Meu concurso": Target,
  Estudar: BookOpen,
  Ferramentas: Wrench,
  Questões: BrainCircuit,
  Provas: ClipboardList,
  Desempenho: BarChart3,
  ENEM: GraduationCap,
  Conta: UserRound,
  Administração: ShieldCheck,
};
const groupDetails: Record<string, string> = {
  Planejamento: "Estratégia, cronograma e metas",
  "Meu concurso": "Edital, carreira e tendências",
  Estudar: "Leis, disciplinas e videoaulas",
  Ferramentas: "Foco, calculadora e painéis",
  Questões: "Treino, revisão e acervo",
  Provas: "Simulados e suas provas",
  Desempenho: "Evolução, ranking e medalhas",
  ENEM: "Preparação para o exame",
  Conta: "Perfil, plano e assinatura",
  Administração: "Operação da plataforma",
};
/** Rótulo curto do grupo quando a barra lateral está recolhida. */
const collapsedLabels: Record<string, string> = {
  Planejamento: "Planejar",
  "Meu concurso": "Concurso",
  Desempenho: "Evolução",
  Administração: "Gestão",
};
const shortLabels: Record<string, string> = {
  "/dashboard": "Painel",
  "/dashboard/question-trainer": "Treinar",
  "/dashboard/mock-exams": "Simular",
  "/dashboard/enem": "ENEM",
};
export function DashboardNavigation({
  items,
  pathname,
  search = {},
  collapsed,
  hues,
  onNavigate,
}: {
  items: NavigationItem[];
  pathname: string;
  search?: Record<string, unknown>;
  collapsed: boolean;
  hues: Record<string, string>;
  onNavigate?: () => void;
}) {
  const available = items.filter((item) => !item.soon);
  const current = activeNavigation(available, pathname, search);
  const primaryOrder = [
    "/dashboard",
    "/dashboard/question-trainer",
    "/dashboard/mock-exams",
    "/dashboard/enem",
  ];
  const primary = available
    .filter((item) => item.primary)
    .sort((a, b) => primaryOrder.indexOf(a.href) - primaryOrder.indexOf(b.href));
  const groups = [...new Set(available.filter((item) => !item.primary).map((item) => item.group))];
  const [expanded, setExpanded] = useState<string[]>(() => [current?.group ?? "Planejamento"]);
  const instance = useId();
  useEffect(() => {
    if (current?.group)
      setExpanded((previous) =>
        previous.includes(current.group) ? previous : [...previous, current.group],
      );
  }, [current?.group]);
  const isCurrent = (item: NavigationItem) =>
    !!current && navigationKey(current) === navigationKey(item);
  function link(item: NavigationItem, compact = false) {
    const Icon = item.icon;
    return (
      <Link
        key={navigationKey(item)}
        to={item.href}
        preload={item.href === "/dashboard/question-trainer" || item.href === "/dashboard" ? "viewport" : "intent"}
        activeOptions={{ exact: true, includeSearch: true }}
        search={item.search ?? {}}
        className="app-nav__link"
        data-active={isCurrent(item)}
        aria-current={isCurrent(item) ? "page" : undefined}
        aria-label={compact ? item.label : undefined}
        title={compact ? item.label : undefined}
        onClick={onNavigate}
      >
        <span className="app-ico" data-hue={hues[item.group] ?? "gold"}>
          <Icon aria-hidden="true" />
        </span>
        <span className={compact ? "app-nav__compact-label" : "app-nav__label"}>
          {compact ? (shortLabels[item.href] ?? item.label) : item.label}
        </span>
        {!compact && isCurrent(item) && <span className="nav-current-dot" aria-hidden="true" />}
      </Link>
    );
  }
  return (
    <nav className="app-nav scroll-dark navigation-workspace" aria-label="Menu principal">
      {primary.length > 0 && (
        <div className="nav-primary" aria-label="Acessos principais">
          {primary.map((item) => link(item, collapsed))}
        </div>
      )}
      {!collapsed && (
        <p className="nav-section-label">
          {available.some((item) => item.adminOnly)
            ? "Gestão da plataforma"
            : "Explore sua preparação"}
        </p>
      )}
      {groups.map((group, i) => {
        const entries = available.filter((item) => item.group === group && !item.primary);
        const Icon = groupIcons[group] ?? BookOpen;
        const open = expanded.includes(group);
        const active = current?.group === group;
        const id = `${instance}-group-${i}`;
        if (collapsed)
          return (
            <DropdownMenu key={group}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="nav-group-trigger"
                  data-active={active}
                  aria-label={`Abrir ${group}`}
                  title={group}
                >
                  <Icon aria-hidden="true" />
                  <span>
                    {collapsedLabels[group] ?? group}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="start"
                sideOffset={12}
                collisionPadding={12}
                className="nav-flyout"
              >
                <DropdownMenuLabel>
                  {group}
                  <small>{groupDetails[group]}</small>
                </DropdownMenuLabel>
                {entries.map((item) => (
                  <DropdownMenuItem key={navigationKey(item)} asChild>
                    <Link
                      to={item.href}
                      activeOptions={{ exact: true, includeSearch: true }}
                      search={item.search ?? {}}
                      aria-current={isCurrent(item) ? "page" : undefined}
                      onClick={onNavigate}
                    >
                      <item.icon aria-hidden="true" />
                      <span>{item.label}</span>
                      <ChevronRight aria-hidden="true" />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        return (
          <section key={group} className="app-nav__section" aria-label={group}>
            <button
              type="button"
              className="app-nav__heading"
              data-active={active}
              aria-expanded={open}
              aria-controls={id}
              onClick={() =>
                setExpanded((previous) =>
                  open ? previous.filter((value) => value !== group) : [...previous, group],
                )
              }
            >
              <Icon aria-hidden="true" />
              <span>
                {group}
                <small>{groupDetails[group]}</small>
              </span>
              <ChevronDown aria-hidden="true" data-open={open} />
            </button>
            <div id={id} hidden={!open} className="app-nav__entries">
              {entries.map((item) => link(item))}
            </div>
          </section>
        );
      })}
    </nav>
  );
}
