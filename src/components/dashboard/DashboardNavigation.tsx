import { studentSections } from "@/lib/studentNavigation";
import { useEffect, useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Hint } from "@/components/ui/hint";
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
  "Material didático": BookOpen,
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
  "Material didático": "Leis, súmulas, disciplinas e vídeos",
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
  "Material didático": "Materiais",
  Ferramentas: "Recursos",
  Desempenho: "Evolução",
  Administração: "Gestão",
};
const shortLabels: Record<string, string> = {
  "/dashboard": "Painel",
  "/dashboard/question-trainer": "Treinar",
  "/dashboard/mock-exams": "Simular",
  "/dashboard/enem": "ENEM",
};
type NavigationProps = {
  items: NavigationItem[];
  pathname: string;
  search?: Record<string, unknown>;
  collapsed: boolean;
  hues: Record<string, string>;
  onNavigate?: () => void;
  appearance?: "default" | "student";
};

export function DashboardNavigation(props: NavigationProps) {
  return props.appearance === "student" ? <StudentDashboardNavigation {...props} /> : <GroupedDashboardNavigation {...props} />;
}

function StudentDashboardNavigation({ items, pathname, search = {}, collapsed, hues, onNavigate }: NavigationProps) {
  const available = items.filter(item => !item.soon && !item.adminOnly);
  const current = activeNavigation(available, pathname, search);
  const home = available.find(item => item.href === "/dashboard");
  return (
    <nav className="app-nav scroll-dark navigation-workspace student-direct-navigation" aria-label="Menu principal">
      {home && (() => {
        const homeLink = (
          <Link to={home.href} search={home.search ?? {}} className="app-nav__link" data-hue="gold" aria-label={collapsed ? home.label : undefined} data-active={current?.href === home.href} aria-current={current?.href === home.href ? "page" : undefined} onClick={onNavigate}>
            <span className="app-ico" data-hue="gold"><home.icon aria-hidden="true" /></span>
            <span className={collapsed ? "app-nav__compact-label" : "app-nav__label"}>{collapsed ? "Painel" : home.label}</span>
          </Link>
        );
        return (
          <div className="nav-primary" aria-label="Área do aluno">
            {!collapsed && <p className="nav-primary__label">Minha preparação</p>}
            {/* The short "Painel" label only appears collapsed; the hint restores the full name instead of a native title tooltip. */}
            {collapsed ? <Hint content={home.label} side="right">{homeLink}</Hint> : homeLink}
          </div>
        );
      })()}
      {!collapsed && <p className="nav-section-label">Sua jornada</p>}
      {studentSections(available).map(({ group, entry }) => {
        const Icon = groupIcons[group] ?? BookOpen;
        const active = current?.href !== "/dashboard" && current?.group === group;
        const sectionLink = (
          <Link key={group} to={entry.href} search={entry.search ?? {}} className="app-nav__link nav-section-link" data-hue={hues[group] ?? "gold"} data-active={active} aria-current={active ? "location" : undefined} aria-label={collapsed ? group : undefined} onClick={onNavigate}>
            <span className="app-ico" data-hue={hues[group] ?? "gold"}><Icon aria-hidden="true" /></span>
            {collapsed ? <span className="app-nav__compact-label">{collapsedLabels[group] ?? group}</span> : <>
              <span className="app-nav__label"><strong>{group}</strong><small>{groupDetails[group]}</small></span>
              <ChevronRight className="nav-section-link__arrow" aria-hidden="true" />
            </>}
          </Link>
        );
        // Expanded, the group name and description already read on the card — a tooltip would only repeat them.
        return collapsed
          ? <Hint key={group} content={<>{group} — {groupDetails[group] ?? "Abrir área"}</>} side="right">{sectionLink}</Hint>
          : sectionLink;
      })}
    </nav>
  );
}

function GroupedDashboardNavigation({
  items,
  pathname,
  search = {},
  collapsed,
  hues,
  onNavigate,
  appearance = "default",
}: {
  items: NavigationItem[];
  pathname: string;
  search?: Record<string, unknown>;
  collapsed: boolean;
  hues: Record<string, string>;
  onNavigate?: () => void;
  appearance?: "default" | "student";
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
    const element = (
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
    // The compact rail abbreviates the label; the hint restores the full name.
    return compact ? <Hint key={navigationKey(item)} content={item.label} side="right">{element}</Hint> : element;
  }
  return (
    <nav className="app-nav scroll-dark navigation-workspace" aria-label="Menu principal">
      {primary.length > 0 && (
        <div className="nav-primary" aria-label="Acessos principais">
          {appearance === "student" && !collapsed && <p className="nav-primary__label">Acessos rápidos</p>}
          {primary.map((item) => link(item, collapsed))}
        </div>
      )}
      {!collapsed && (
        <p className="nav-section-label">
          {available.some((item) => item.adminOnly)
            ? "Gestão da plataforma"
            : appearance === "student" ? "Sua jornada" : "Explore sua preparação"}
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
                className={`nav-flyout${appearance === "student" ? " nav-flyout--student" : ""}`}
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
