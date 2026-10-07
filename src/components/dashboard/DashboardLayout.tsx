import React from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { SoonBadge } from "@/components/SoonBadge";
import { AI_ENABLED, SOON_LABEL, TESTING_PHASE, isTestingTier } from "@/lib/launch.config";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { getActiveTheme, toggleTheme as toggleStoredTheme } from "@/lib/theme";
import {
  BookMarked,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  FlaskConical,
  GraduationCap,
  ClipboardList,
  Clock,
  FileStack,
  Flag,
  Flame,
  History,
  Layers,
  Library,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Moon,
  NotebookPen,
  BarChart3,
  PenLine,
  PlayCircle,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Timer,
  Trophy,
  User,
  Wallet,
  Medal,
  Radar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useAuthStatus } from "@/hooks/useDashboard";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PlanCountdownInline, PlanCountdownShort } from "@/components/dashboard/PlanCountdown";
import { AcreClock } from "@/components/dashboard/AcreClock";
import { FarewellDialog } from "@/components/dashboard/FarewellDialog";
import { flushStudyClock, getStudyToday, stopStudyClock } from "@/lib/studyClock";
import { SessionClock } from "@/components/dashboard/SessionClock";
import { RenewPlanDialog } from "@/components/dashboard/RenewPlanDialog";
import { MockService, type MedalProgress } from "@/services/mockService";
import type { Achievement, UserStreak } from "@/types";
import { NorteBrand } from "@/components/brand/NorteBrand";

type MenuItem = {
  group: string;
  label: string;
  icon: LucideIcon;
  href: string;
  adminOnly?: boolean;
  soon?: boolean;
};

type Hue = "gold" | "sky" | "violet" | "emerald" | "rose" | "orange" | "teal";
const GROUP_HUE: Record<string, Hue> = {
  Hoje: "gold",
  Objetivo: "sky",
  "Edital e conteúdo": "violet",
  ENEM: "sky",
  Questões: "emerald",
  Provas: "rose",
  Desempenho: "orange",
  Conta: "teal",
  Administração: "gold",
};
const MOBILE_HUE: Record<string, Hue> = {
  "/dashboard": "gold",
  "/dashboard/question-trainer": "emerald",
  "/dashboard/mock-exams": "rose",
  "/dashboard/performance": "orange",
  "/dashboard/profile": "teal",
  "/dashboard/admin-students": "sky",
  "/dashboard/admin-finance": "emerald",
  "/dashboard/admin-metrics": "violet",
  "/dashboard/admin": "gold",
};

const MENU: MenuItem[] = [
  {
    group: "Administração",
    label: "Atendimento",
    icon: FileStack,
    href: "/dashboard/admin-support",
    adminOnly: true,
  },
  { group: "Hoje", label: "Painel do aluno", icon: LayoutDashboard, href: "/dashboard" },
  { group: "Hoje", label: "Assistente de estudos", icon: Sparkles, href: "/dashboard/study-coach" },
  { group: "Hoje", label: "Plano de estudos", icon: ClipboardList, href: "/dashboard/study-plan" },
  { group: "Hoje", label: "Central de estudos", icon: Timer, href: "/dashboard/study-tools" },
  { group: "Objetivo", label: "Meu concurso", icon: Target, href: "/dashboard/my-contest" },
  { group: "Objetivo", label: "Carreiras", icon: ShieldCheck, href: "/dashboard/careers" },
  {
    group: "Objetivo",
    label: "Panorama das provas",
    icon: BarChart3,
    href: "/dashboard/exam-panorama",
  },
  { group: "Objetivo", label: "Concursos disponíveis", icon: Search, href: "/dashboard/questions" },
  {
    group: "Edital e conteúdo",
    label: "Edital eletrônico",
    icon: MapPin,
    href: "/dashboard/edital",
  },
  {
    group: "Edital e conteúdo",
    label: "Mudanças no edital",
    icon: Radar,
    href: "/dashboard/edital-radar",
  },
  { group: "Edital e conteúdo", label: "Biblioteca", icon: Library, href: "/dashboard/library" },
  {
    group: "Edital e conteúdo",
    label: "Central de mídia",
    icon: PlayCircle,
    href: "/dashboard/media",
  },
  { group: "ENEM", label: "Área ENEM", icon: GraduationCap, href: "/dashboard/enem" },
  {
    group: "Questões",
    label: "Treinador de questões",
    icon: BrainCircuit,
    href: "/dashboard/question-trainer",
  },
  {
    group: "Questões",
    label: "Resolver com IA",
    icon: Sparkles,
    href: "/dashboard/ai-solver",
    soon: !AI_ENABLED,
  },
  {
    group: "Questões",
    label: "Banco de questões",
    icon: BookMarked,
    href: "/dashboard/question-bank",
  },
  { group: "Questões", label: "Flashcards", icon: Layers, href: "/dashboard/flashcards" },
  { group: "Questões", label: "Meus cadernos", icon: BookOpen, href: "/dashboard/notebooks" },
  { group: "Questões", label: "Revisar erros", icon: NotebookPen, href: "/dashboard/errors" },
  { group: "Provas", label: "Simulador", icon: Trophy, href: "/dashboard/mock-exams" },
  { group: "Provas", label: "Minhas provas", icon: FileStack, href: "/dashboard/student-exams" },
  { group: "Provas", label: "Redação", icon: PenLine, href: "/dashboard/essays" },
  {
    group: "Desempenho",
    label: "Visão de desempenho",
    icon: Layers,
    href: "/dashboard/performance",
  },
  {
    group: "Desempenho",
    label: "Histórico de atividades",
    icon: History,
    href: "/dashboard/history",
  },
  { group: "Desempenho", label: "Medalhas", icon: Medal, href: "/dashboard/medals" },
  { group: "Conta", label: "Plano e uso", icon: Sparkles, href: "/dashboard/subscriptions" },
  { group: "Conta", label: "Perfil", icon: User, href: "/dashboard/profile" },
  {
    group: "Administração",
    label: "Conteúdo da plataforma",
    icon: Settings,
    href: "/dashboard/admin",
    adminOnly: true,
  },
  {
    group: "Administração",
    label: "Alunos, planos e IA",
    icon: User,
    href: "/dashboard/admin-students",
    adminOnly: true,
  },
  {
    group: "Administração",
    label: "Números gerais",
    icon: Layers,
    href: "/dashboard/admin-metrics",
    adminOnly: true,
  },
  {
    group: "Administração",
    label: "Questões de bancas",
    icon: BookMarked,
    href: "/dashboard/admin-questions",
    adminOnly: true,
  },
  {
    group: "Administração",
    label: "Central de mídia (admin)",
    icon: PlayCircle,
    href: "/dashboard/admin-media",
    adminOnly: true,
  },
  {
    group: "Administração",
    label: "Financeiro",
    icon: Wallet,
    href: "/dashboard/admin-finance",
    adminOnly: true,
  },
  {
    group: "Administração",
    label: "Cadastros por dia",
    icon: User,
    href: "/dashboard/admin-signups",
    adminOnly: true,
  },
  {
    group: "Administração",
    label: "Questões reportadas",
    icon: Flag,
    href: "/dashboard/admin-question-reports",
    adminOnly: true,
  },
];

const ADMIN_MOBILE_NAV: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Alunos", href: "/dashboard/admin-students", icon: User },
  { label: "Financeiro", href: "/dashboard/admin-finance", icon: Wallet },
  { label: "Números", href: "/dashboard/admin-metrics", icon: Layers },
  { label: "Conteúdo", href: "/dashboard/admin", icon: Settings },
  { label: "Perfil", href: "/dashboard/profile", icon: User },
];

const MOBILE_NAV: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Painel", href: "/dashboard", icon: LayoutDashboard },
  { label: "Questões", href: "/dashboard/question-trainer", icon: BrainCircuit },
  { label: "Simulados", href: "/dashboard/mock-exams", icon: Trophy },
  { label: "Desempenho", href: "/dashboard/performance", icon: Layers },
  { label: "Perfil", href: "/dashboard/profile", icon: User },
];

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

function isActive(pathname: string, href: string) {
  const current = normalize(pathname);
  if (href === "/dashboard") return current === "/dashboard";
  return current === href || current.startsWith(`${href}/`);
}

function initials(name?: string) {
  if (!name) return "NC";
  const parts = name.trim().split(/\s+/);
  return (
    (parts[0]?.[0] ?? "") + (parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "")
  ).toUpperCase();
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStatus();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(() => getActiveTheme() === "dark");
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [streak, setStreak] = React.useState<UserStreak | null>(null);
  const [achievements, setAchievements] = React.useState<Achievement[]>([]);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  React.useEffect(() => setAvatarUrl(user?.avatar_url ?? null), [user?.avatar_url]);
  React.useEffect(() => {
    const on = (e: Event) => setAvatarUrl((e as CustomEvent<string | null>).detail);
    window.addEventListener("norte:avatar-changed", on);
    return () => window.removeEventListener("norte:avatar-changed", on);
  }, []);
  const [medalsOpen, setMedalsOpen] = React.useState(false);
  const [medalProgress, setMedalProgress] = React.useState<MedalProgress[]>([]);
  const openMedals = () => {
    setMedalsOpen(true);
    void MockService.getMedalProgress().then(setMedalProgress);
  };

  const isAdmin = user?.role === "admin";
  // Administrador vê só a administração (e o próprio perfil); aluno vê só a área de estudo.
  const items = React.useMemo(
    () =>
      isAdmin
        ? [
            ...MENU.filter((item) => item.adminOnly),
            ...MENU.filter((item) => item.href === "/dashboard/profile"),
          ]
        : MENU.filter((item) => !item.adminOnly),
    [isAdmin],
  );

  React.useEffect(() => {
    if (!isAdmin) return;
    const path = normalize(location.pathname);
    if (path.startsWith("/dashboard/admin") || path === "/dashboard/profile") return;
    navigate({ to: "/dashboard/admin-students", replace: true });
  }, [isAdmin, location.pathname, navigate]);
  const current = items.find((item) => isActive(location.pathname, item.href));

  React.useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    try {
      setIsCollapsed(localStorage.getItem("norte_sidebar_collapsed") === "1");
    } catch {
      /* storage unavailable */
    }
  }, []);

  React.useEffect(() => {
    let known = 0;
    let cancelled = false;
    Promise.all([
      MockService.registerStudyVisit().then((v) => v ?? MockService.getUserStreak()),
      MockService.awardAchievements().then(() => MockService.getAchievements()),
    ]).then(([s, a]) => {
      if (cancelled) return;
      setStreak(s);
      setAchievements(a);
      known = a.length;
    });
    const interval = window.setInterval(async () => {
      await MockService.awardAchievements();
      const latest = await MockService.getAchievements();
      if (cancelled || latest.length <= known) return;
      known = latest.length;
      setAchievements(latest);
      const newest = latest[latest.length - 1];
      if (newest) {
        const { showAchievementNotification } =
          await import("@/components/dashboard/AchievementNotification");
        showAchievementNotification(newest);
      }
    }, 5000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleCollapsed = () => {
    setIsCollapsed((value) => {
      try {
        localStorage.setItem("norte_sidebar_collapsed", value ? "0" : "1");
      } catch {
        /* storage unavailable */
      }
      return !value;
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(toggleStoredTheme() === "dark");
  };

  const [farewell, setFarewell] = React.useState<{ spent: number } | null>(null);
  const reallySignOut = async () => {
    stopStudyClock();
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };
  const signOut = async () => {
    await flushStudyClock();
    if (isAdmin) await reallySignOut();
    else setFarewell({ spent: getStudyToday() });
  };

  const go = (href: string) => {
    setPaletteOpen(false);
    navigate({ to: href });
  };

  const tier = user?.subscription_tier ? String(user.subscription_tier) : "free";
  const displayName = user?.full_name || (isAdmin ? "Administrador" : "Estudante");
  const planName = SUBSCRIPTION_PLANS.find((p) => p.id === tier)?.name ?? tier;
  const planLabel = isAdmin ? "Administrador" : `Plano ${planName}`;

  const nav = (collapsed: boolean) => (
    <nav className="app-nav scroll-dark" aria-label="Menu principal">
      {items.map((item, index) => {
        const showGroup = item.group !== items[index - 1]?.group;
        const active = isActive(location.pathname, item.href);
        const link = (
          <Link
            to={item.href}
            className="app-nav__link"
            data-active={active}
            aria-current={active ? "page" : undefined}
            aria-label={collapsed ? item.label : undefined}
          >
            <span className="app-ico" data-hue={GROUP_HUE[item.group] ?? "gold"}>
              <item.icon />
            </span>
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && item.soon && <SoonBadge className="ml-auto" />}
          </Link>
        );
        return (
          <React.Fragment key={item.href}>
            {showGroup && <div className="app-nav__group">{item.group}</div>}
            <div className={item.adminOnly ? "app-nav__admin" : undefined}>
              {collapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">
                    {item.soon ? `${item.label} — ${SOON_LABEL}` : item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                link
              )}
            </div>
          </React.Fragment>
        );
      })}
    </nav>
  );

  const userMenu = (collapsed: boolean) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="app-user" aria-label="Menu da conta">
          <span className="app-avatar">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                className="h-full w-full rounded-[inherit] object-cover"
              />
            ) : (
              initials(user?.full_name)
            )}
          </span>
          {!collapsed && (
            <>
              <span className="app-user__meta">
                <strong>{displayName}</strong>
                <span>{planLabel}</span>
              </span>
              <ChevronsUpDown />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <span className="block text-sm font-semibold">{displayName}</span>
          <span className="block text-xs text-muted-foreground">{planLabel}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer gap-2">
          <Link to="/dashboard/profile">
            <User className="h-4 w-4" /> Meu perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2" onClick={toggleTheme}>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDarkMode ? "Tema claro" : "Tema escuro"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 text-destructive" onClick={signOut}>
          <LogOut className="h-4 w-4" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <TooltipProvider delayDuration={150}>
      <div className="app-shell">
        <aside className="app-sidebar no-print" data-collapsed={isCollapsed}>
          <div className="app-sidebar__head">
            <Link to="/dashboard" aria-label="Norte Concurso — visão geral">
              <NorteBrand light compact={isCollapsed} />
            </Link>
            {!isCollapsed && (
              <button
                type="button"
                className="app-icon-btn"
                onClick={toggleCollapsed}
                aria-label="Recolher menu lateral"
              >
                <ChevronsLeft />
              </button>
            )}
          </div>

          <button
            type="button"
            className="app-sidebar__search"
            onClick={() => setPaletteOpen(true)}
          >
            <Search />
            {!isCollapsed && (
              <>
                <span>Buscar área</span>
                <span className="kbd">Ctrl K</span>
              </>
            )}
          </button>

          {nav(isCollapsed)}

          <div className="app-sidebar__foot">
            {!isCollapsed && (
              <div className="app-stats">
                <div className="app-stat">
                  <span>
                    <Flame /> Ofensiva
                  </span>
                  <strong className="tabular">{streak?.currentStreak ?? 0} dias</strong>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="app-stat cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onClick={openMedals}
                      onKeyDown={(e) => e.key === "Enter" && openMedals()}
                    >
                      <span>
                        <Medal /> Medalhas
                      </span>
                      <strong className="tabular">{achievements.length}</strong>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-56">
                    {achievements.length > 0
                      ? achievements.map((a) => a.name).join(" · ")
                      : "Nenhuma medalha ainda. Clique para ver como ganhar."}
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
            {isCollapsed && (
              <button
                type="button"
                className="app-icon-btn mx-auto mb-2"
                onClick={toggleCollapsed}
                aria-label="Expandir menu lateral"
              >
                <ChevronsRight />
              </button>
            )}
            {userMenu(isCollapsed)}
          </div>
        </aside>

        <RenewPlanDialog user={user} enabled={!isAdmin} />

        <Dialog open={medalsOpen} onOpenChange={setMedalsOpen}>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogTitle>Medalhas e progresso</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Cada medalha é concedida automaticamente ao atingir a meta. Continue estudando para
              avançar.
            </p>
            <ul className="space-y-3">
              {medalProgress.map((m) => (
                <li key={m.code} className={m.earned ? "" : "opacity-80"}>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-2 font-semibold">
                      <Medal
                        className={
                          m.earned ? "h-4 w-4 text-amber-500" : "h-4 w-4 text-muted-foreground"
                        }
                      />
                      {m.name}
                    </span>
                    <span className="tabular text-xs text-muted-foreground">
                      {m.earned ? "Conquistada" : `${m.current} / ${m.target}`}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{m.description}</p>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={m.earned ? "h-full bg-amber-500" : "h-full bg-primary"}
                      style={{ width: `${Math.round((m.current / m.target) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/dashboard/medals"
              onClick={() => setMedalsOpen(false)}
              className="block rounded-lg bg-primary/10 px-3 py-2 text-center text-sm font-semibold text-primary hover:bg-primary/15"
            >
              Ver todas as medalhas e como ganhar
            </Link>
          </DialogContent>
        </Dialog>

        <div className="app-main">
          <header className="app-topbar no-print">
            <div className="app-mobile-bar gap-2">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button type="button" className="app-top-btn" aria-label="Abrir menu">
                    <Menu />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="app-sheet">
                  <SheetTitle className="sr-only">Menu principal</SheetTitle>
                  <div className="app-sidebar__head">
                    <NorteBrand light />
                  </div>
                  {nav(false)}
                  <div className="app-sidebar__foot">{userMenu(false)}</div>
                </SheetContent>
              </Sheet>
              <Link to="/dashboard" aria-label="Norte Concurso — visão geral">
                <NorteBrand light compact />
              </Link>
            </div>

            <div className="app-crumbs">
              <span>{current?.group ?? "Norte"}</span>
              <ChevronRight />
              <strong>{current?.label ?? "Painel"}</strong>
            </div>

            <div className="app-topbar__actions">
              <button
                type="button"
                className="app-top-search"
                onClick={() => setPaletteOpen(true)}
                aria-label="Buscar área (Ctrl+K)"
              >
                <Search />
                <span>Ir para…</span>
                <span className="kbd">Ctrl K</span>
              </button>
              <AcreClock />
              {!isAdmin && user && user.id !== "demo-user" && <SessionClock userId={user.id} />}
              {TESTING_PHASE && !isAdmin && isTestingTier(tier) && !!user?.plan_ends_at && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/dashboard/subscriptions"
                      className="app-streak app-trial"
                      aria-label="Fase de testes: tempo restante de acesso"
                    >
                      <FlaskConical />
                      <span className="app-trial__label">Teste</span>
                      <span className="app-trial__full">
                        <PlanCountdownInline endsAt={user.plan_ends_at} />
                      </span>
                      <span className="app-trial__short">
                        <PlanCountdownShort endsAt={user.plan_ends_at} />
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    Fase de testes: você usa o plano Essencial de graça. Depois, a conta segue no
                    plano Gratuito.
                  </TooltipContent>
                </Tooltip>
              )}
              <span className="app-streak" title="Dias seguidos de estudo">
                <Flame />
                <span className="tabular">{streak?.currentStreak ?? 0}</span>
              </span>
              <button
                type="button"
                className="app-top-btn"
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}
              >
                {isDarkMode ? <Sun /> : <Moon />}
              </button>
            </div>
          </header>

          <main
            className="app-content"
            data-hue={
              GROUP_HUE[items.find((i) => isActive(location.pathname, i.href))?.group ?? "Hoje"] ??
              "gold"
            }
          >
            <div className="app-content__inner">{children}</div>
            <footer className="app-footer no-print">
              <span>© 2026 Norte Concurso</span>
              <span>
                Desenvolvido por <strong className="text-foreground">Franc D&apos;nis</strong> ·
                Feijó-AC
              </span>
            </footer>
          </main>

          <nav className="app-bottom-nav no-print" aria-label="Navegação rápida">
            {(isAdmin ? ADMIN_MOBILE_NAV : MOBILE_NAV).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                data-active={isActive(location.pathname, item.href)}
              >
                <span className="app-ico" data-hue={MOBILE_HUE[item.href] ?? "gold"}>
                  <item.icon />
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <FarewellDialog
          open={!!farewell}
          name={displayName}
          spent={farewell?.spent ?? 0}
          streak={streak?.currentStreak ?? 0}
          medals={achievements.length}
          onStay={() => setFarewell(null)}
          onLeave={() => void reallySignOut()}
        />

        <Dialog open={paletteOpen} onOpenChange={setPaletteOpen}>
          <DialogContent className="cmd-dialog max-w-xl overflow-hidden p-0">
            <DialogTitle className="sr-only">Buscar área da plataforma</DialogTitle>
            <Command className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:gap-3 [&_[cmdk-item]]:rounded-lg [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4">
              <CommandInput placeholder="Para onde vamos? Ex.: simulador, edital, erros…" />
              <CommandList className="max-h-[420px] p-2">
                <CommandEmpty>Nenhuma área encontrada.</CommandEmpty>
                {Array.from(new Set(items.map((item) => item.group))).map((group) => (
                  <CommandGroup key={group} heading={group}>
                    {items
                      .filter((item) => item.group === group)
                      .map((item) => (
                        <CommandItem
                          key={item.href}
                          value={`${item.label} ${item.group}`}
                          onSelect={() => go(item.href)}
                        >
                          <item.icon />
                          {item.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
