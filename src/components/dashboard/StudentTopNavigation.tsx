import { Link } from "@tanstack/react-router";
import * as React from "react";
import { activeNavigation, navigationKey } from "@/lib/dashboardNavigation";
import {
  House,
  ChartNoAxesCombined,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  BookOpenText,
  SlidersHorizontal,
  Sparkles,
  CalendarClock,
  Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NavigationItem } from "./DashboardNavigation";
import { MockService } from "@/services/mockService";
import { AreaHint } from "@/components/ui/area-hint";
import { navigationDetails } from "@/lib/navigationSearch";
import { hasActiveEdital } from "@/lib/cronogramaGuard";
import { useAuthStatus } from "@/hooks/useDashboard";
import { ACTIVE_STUDY_EDITION_EVENT, readActiveStudyEdition, type ActiveStudyEdition } from "@/lib/activeStudyEdition";
import "@/styles/active-study-edition.css";
import "@/styles/student-home-navigation-refinement.css";

const sections: {
  groups: string[];
  label: string;
  icon: LucideIcon;
  description: string;
  tone: string;
}[] = [
  {
    groups: ["Central de Estudos", "Material didático"],
    label: "Estudos",
    icon: BookOpenText,
    description: "Disciplinas, leis, videoaulas, sala de estudo e ferramentas de apoio.",
    tone: "sky",
  },
  {
    groups: ["Questões", "Provas"],
    label: "Treinos",
    icon: ClipboardList,
    description: "Treino de questões, revisão de erros, flashcards, simulados e provas.",
    tone: "emerald",
  },
  {
    groups: ["Desempenho"],
    label: "Desempenho",
    icon: ChartNoAxesCombined,
    description: "Sua evolução, histórico de estudos, ranking e medalhas.",
    tone: "teal",
  },
  {
    groups: ["ENEM"],
    label: "ENEM",
    icon: GraduationCap,
    description: "Questões e simulados organizados para o ENEM.",
    tone: "indigo",
  },
  {
    groups: ["Conta"],
    label: "Conta",
    icon: SlidersHorizontal,
    description: "Seus dados, preferências e plano de assinatura.",
    tone: "slate",
  },
];

const describe = (item: NavigationItem) => navigationDetails(item).description;
const listLabels = (labels: string[]) =>
  new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" }).format(labels);

export function StudentTopNavigation({
  items,
  pathname,
  search,
}: {
  items: NavigationItem[];
  pathname: string;
  search: Record<string, unknown>;
}) {
  const { user } = useAuthStatus();
  const [studyEdition, setStudyEdition] = React.useState<ActiveStudyEdition | null>(null);
  React.useEffect(() => {
    const sync = () => setStudyEdition(readActiveStudyEdition(user?.id));
    sync();
    window.addEventListener(ACTIVE_STUDY_EDITION_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ACTIVE_STUDY_EDITION_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [user?.id]);
  const current = activeNavigation(items, pathname, search);
  const isHome = pathname === "/dashboard" || pathname === "/dashboard/";
  const isPlanningPage =
    pathname === "/dashboard/study-coach" || pathname === "/dashboard/cronograma";
  const isCoachActive = isPlanningPage && pathname === "/dashboard/study-coach";
  const isScheduleActive = isPlanningPage && pathname === "/dashboard/cronograma";
  const section = sections.find((candidate) => current && candidate.groups.includes(current.group));
  const [activeEdital, setActiveEdital] = React.useState(false);
  React.useEffect(() => {
    let mounted = true;
    void MockService.getFocusedContest()
      .then((contest) => { if (mounted) setActiveEdital(hasActiveEdital(contest)); })
      .catch(() => { if (mounted) setActiveEdital(false); });
    return () => { mounted = false; };
  }, []);
  // Na home, as categorias abrem os seus submenus. Dentro das páginas, apenas
  // os links do grupo atual permanecem visíveis, sem misturar outras áreas.
  const entries =
    !isHome && section
      ? items.filter((item) => section.groups.includes(item.group) && item.href !== "/dashboard")
      : [];

  return (
    <nav
      className="student-top-navigation no-print"
      aria-label={isHome ? "Áreas da plataforma" : "Submenus da área atual"}
    >
      <Link
        to="/dashboard"
        className="student-top-navigation__brand"
        aria-label="Voltar à área principal do aluno"
      >
        <img
          className="student-top-navigation__brand-emblem"
          src="/media/brand/norte-identity/emblema.svg"
          width={64}
          height={64}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <span className="student-top-navigation__brand-word">
          NORTE <strong>CONCURSOS</strong>
        </span>
      </Link>
      <div className="student-top-navigation__links" data-contextual={!isHome}>
        {studyEdition && (
          <AreaHint
            title="Edital ativo"
            description={studyEdition.contestName + " · " + studyEdition.roleName + ". Abre o programa com as disciplinas e os assuntos deste edital."}
          >
          <Link
            to="/dashboard/edital"
            search={{ edition: studyEdition.id }}
            className="student-top-navigation__active-edition"
            aria-label={"Edital ativo: " + studyEdition.contestName + ", " + studyEdition.roleName + ". Abrir programa."}
          >
            <span className="student-top-navigation__active-edition-dot" aria-hidden="true" />
            <span className="student-top-navigation__active-edition-copy">
              <span>Edital ativo</span>
              <strong>{studyEdition.contestName} · {studyEdition.roleName}</strong>
            </span>
          </Link>
          </AreaHint>
        )}
        {!isHome && (
          <AreaHint title="Área principal" description="Volte ao painel com suas prioridades e o resumo da preparação.">
          <Link
            to="/dashboard"
            className="student-top-navigation__trigger student-top-navigation__home"
            data-tone="gold"
            aria-label="Voltar à área principal"
          >
            <span className="student-top-navigation__icon-wrap" aria-hidden="true">
              <House size={18} />
            </span>
            <span className="student-top-navigation__label">Área principal</span>
          </Link>
          </AreaHint>
        )}
        {isHome && (
          <>
            {activeEdital ? (
              <button
                type="button"
                className="student-top-navigation__trigger student-top-navigation__trigger--locked"
                data-tone="gold"
                disabled
                aria-label="Meu plano bloqueado enquanto há um edital ativo"
                title="O Meu plano fica bloqueado enquanto um edital ativo estiver em foco."
              >
                <span className="student-top-navigation__icon-wrap" aria-hidden="true"><Lock size={16} /></span>
                <span className="student-top-navigation__label">Meu plano</span>
              </button>
            ) : (
              <AreaHint title="Meu plano" description="Defina sua disponibilidade e receba a distribuição da semana.">
              <Link
                to="/dashboard/study-coach"
                className="student-top-navigation__trigger"
                data-tone="gold"
                data-active={isCoachActive}
                aria-current={isCoachActive ? "page" : undefined}
              >
                <span className="student-top-navigation__icon-wrap" aria-hidden="true"><Sparkles size={18} /></span>
                <span className="student-top-navigation__label">Meu plano</span>
              </Link>
              </AreaHint>
            )}
            <AreaHint title="Agenda de estudos" description="Distribua o conteúdo do edital nos dias e horários da sua rotina.">
            <Link
              to="/dashboard/cronograma"
              className="student-top-navigation__trigger"
              data-tone="gold"
              data-active={isScheduleActive}
              aria-current={isScheduleActive ? "page" : undefined}
            >
              <span className="student-top-navigation__icon-wrap" aria-hidden="true">
                <CalendarClock size={18} />
              </span>
              <span className="student-top-navigation__label">Agenda de estudos</span>
            </Link>
            </AreaHint>
          </>
        )}
        {isHome || (!section && !isPlanningPage)
          ? sections.map((candidate) => {
              const groupEntries = items.filter(
                (item) => candidate.groups.includes(item.group) && item.href !== "/dashboard",
              );
              if (!groupEntries.length) return null;
              const Icon = candidate.icon;
              return (
                <DropdownMenu key={candidate.label}>
                  <AreaHint title={candidate.label} description={candidate.description}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="student-top-navigation__trigger"
                      data-tone={candidate.tone}
                      aria-label={candidate.label}
                    >
                      <span className="student-top-navigation__icon-wrap" aria-hidden="true">
                        <Icon size={18} strokeWidth={2.15} absoluteStrokeWidth />
                      </span>
                      <span className="student-top-navigation__label">{candidate.label}</span>
                      <ChevronDown
                        size={14}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className="student-top-navigation__chevron"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  </AreaHint>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={10}
                    className="student-top-navigation__menu"
                  >
                    <DropdownMenuLabel className="flex flex-col gap-1">
                      <span className="student-top-navigation__menu-title">{candidate.label}</span>
                      <span className="student-top-navigation__menu-description">
                        {candidate.description}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {groupEntries.map((item) => (
                      <AreaHint key={navigationKey(item)} side="right" align="start" description={describe(item)}>
                        <DropdownMenuItem asChild>
                          <Link to={item.href} search={item.search ?? {}}>
                            <item.icon size={17} aria-hidden="true" />
                            <span>{item.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      </AreaHint>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })
          : [...new Set(entries.map((item) => item.group))].map((group) => {
              const groupEntries = entries.filter((item) => item.group === group);
              // A single destination opens directly; it needs no menu around it.
              if (groupEntries.length === 1) {
                const item = groupEntries[0];
                if (!item) return null;
                const selected = navigationKey(current!) === navigationKey(item);
                return (
                  <AreaHint key={group} title={item.label} description={describe(item)}>
                  <Link
                    to={item.href}
                    search={item.search ?? {}}
                    className="student-top-navigation__trigger student-top-navigation__submenu"
                    data-tone={section?.tone}
                    data-active={selected}
                    aria-current={selected ? "page" : undefined}
                  >
                    <span className="student-top-navigation__icon-wrap" aria-hidden="true">
                      <item.icon size={17} strokeWidth={2.1} />
                    </span>
                    <span className="student-top-navigation__label">{item.label}</span>
                  </Link>
                  </AreaHint>
                );
              }
              const groupActive = groupEntries.some(
                (item) => navigationKey(current!) === navigationKey(item),
              );
              const GroupIcon = groupEntries[0]?.icon;
              if (!GroupIcon) return null;
              return (
                <DropdownMenu key={group}>
                  <AreaHint title={group} description={listLabels(groupEntries.map((item) => item.label)) + "."}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="student-top-navigation__trigger student-top-navigation__submenu"
                      data-tone={section?.tone}
                      data-active={groupActive}
                      aria-label={group}
                    >
                      <span className="student-top-navigation__icon-wrap" aria-hidden="true">
                        <GroupIcon size={17} strokeWidth={2.1} />
                      </span>
                      <span className="student-top-navigation__label">{group}</span>
                      <ChevronDown
                        size={14}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className="student-top-navigation__chevron"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  </AreaHint>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={10}
                    className="student-top-navigation__menu"
                  >
                    <DropdownMenuLabel className="flex flex-col gap-1">
                      <span className="student-top-navigation__menu-title">{group}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {groupEntries.map((item) => {
                      const selected = navigationKey(current!) === navigationKey(item);
                      return (
                        <AreaHint key={navigationKey(item)} side="right" align="start" description={describe(item)}>
                          <DropdownMenuItem asChild data-current={selected}>
                            <Link
                              to={item.href}
                              search={item.search ?? {}}
                              aria-current={selected ? "page" : undefined}
                            >
                              <item.icon size={17} aria-hidden="true" />
                              <span>{item.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        </AreaHint>
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
