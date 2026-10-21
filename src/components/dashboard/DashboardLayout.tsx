import "@/styles/dashboard-glass.css";
import "@/styles/dashboard-light.css";
import "@/styles/student-canvas.css";
import "@/styles/dashboard-artwork.css";
import "@/styles/student-navigation.css";
import { createAchievementMonitor } from "@/lib/achievementMonitor";
import { activeNavigation, navigationKey } from "@/lib/dashboardNavigation";
import React from "react";
import { useMobileAppShell } from "@/hooks/useMobileAppShell";
import { PlatformBack } from "./PlatformBack";
import { ReadingSizeControl } from "@/components/accessibility/ReadingSizeControl";
import { showsReadingControl } from "@/lib/readingScale";
import { Link, useLocation, useNavigate, useRouter } from "@tanstack/react-router";
import {
  DashboardNavigation,
  navigationActive as isActive,
  type NavigationItem,
} from "./DashboardNavigation";
import { AI_ENABLED, TESTING_PHASE } from "@/lib/launch.config";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { getActiveTheme, toggleTheme as toggleStoredTheme } from "@/lib/theme";
import {
  BookMarked,
  BookOpen,
  CalendarClock,
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
  Landmark,
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
  Gavel,
  Scale,
  BookA,
  Headphones,
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
import { ActivityTracker } from "@/components/dashboard/ActivityTracker";
import { FocusReturnBar } from "@/components/dashboard/FocusReturnBar";
import { RenewPlanDialog } from "@/components/dashboard/RenewPlanDialog";
import { MockService } from "@/services/mockService";
import type { Achievement, UserStreak } from "@/types";
import { NorteBrand } from "@/components/brand/NorteBrand";

type MenuItem = NavigationItem;

type Hue = "gold" | "sky" | "violet" | "emerald" | "rose" | "orange" | "teal";
const GROUP_HUE: Record<string, Hue> = {
  Planejamento: "gold",
  "Meu concurso": "sky",
  "Material didático": "violet",
  Ferramentas: "teal",
  Questões: "emerald",
  Provas: "rose",
  ENEM: "sky",
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
  {
    group: "Administração",
    label: "Concursos — curadoria",
    icon: Search,
    href: "/dashboard/admin-contests",
    adminOnly: true,
  },
  { group: "Planejamento", label: "Área do aluno", icon: LayoutDashboard, href: "/dashboard", primary: true },
  { group: "Planejamento", label: "Estratégia de estudos", icon: Sparkles, href: "/dashboard/study-coach" },
  { group: "Planejamento", label: "Cronograma por edital", icon: CalendarClock, href: "/dashboard/cronograma" },
  { group: "Planejamento", label: "Plano por resultados", icon: ClipboardList, href: "/dashboard/study-plan" },
  { group: "Meu concurso", label: "Meu concurso", icon: Target, href: "/dashboard/my-contest" },
  { group: "Meu concurso", label: "Meu edital", icon: MapPin, href: "/dashboard/edital" },
  { group: "Meu concurso", label: "Carreiras", icon: ShieldCheck, href: "/dashboard/careers" },
  { group: "Meu concurso", label: "Concursos e editais", icon: Search, href: "/dashboard/questions" },
  { group: "Meu concurso", label: "Radar do edital", icon: Radar, href: "/dashboard/edital-radar" },
  { group: "Meu concurso", label: "Panorama das provas", icon: BarChart3, href: "/dashboard/exam-panorama" },
  { group: "Meu concurso", label: "Perfil das bancas", icon: Landmark, href: "/dashboard/perfil-bancas" },
  { group: "Material didático", label: "Visão geral do material", icon: Library, href: "/dashboard/material" },
  { group: "Material didático", label: "Legislação e súmulas", icon: Scale, href: "/dashboard/library", search: { collection: "laws" } },
  { group: "Material didático", label: "Leis extravagantes", icon: Gavel, href: "/dashboard/leis" },
  { group: "Material didático", label: "Disciplinas", icon: BookOpen, href: "/dashboard/disciplinas" },
  { group: "Material didático", label: "Videoaulas e podcasts", icon: PlayCircle, href: "/dashboard/media" },
  { group: "Material didático", label: "Dicionário de estudo", icon: BookA, href: "/dashboard/dicionario" },
  { group: "Material didático", label: "Redação para concursos", icon: PenLine, href: "/dashboard/essays" },
  { group: "Ferramentas", label: "Foco e revisão", icon: Timer, href: "/dashboard/study-tools" },
  { group: "Ferramentas", label: "Calculadora penal", icon: Scale, href: "/dashboard/calculadora-penal" },
  { group: "Ferramentas", label: "Painel do CTB", icon: Gavel, href: "/dashboard/ctb" },
  { group: "Questões", label: "Treinador de questões", icon: BrainCircuit, href: "/dashboard/question-trainer", primary: true },
  { group: "Questões", label: "Caderno de erros", icon: NotebookPen, href: "/dashboard/errors" },
  { group: "Questões", label: "Flashcards", icon: Layers, href: "/dashboard/flashcards" },
  { group: "Questões", label: "Meus cadernos", icon: BookOpen, href: "/dashboard/notebooks" },
  { group: "Questões", label: "Acervo de questões", icon: BookMarked, href: "/dashboard/question-bank" },
  {
    group: "Questões",
    label: "Resolver com IA",
    icon: Sparkles,
    href: "/dashboard/ai-solver",
    soon: !AI_ENABLED,
  },
  { group: "Provas", label: "Simulador de provas", icon: Trophy, href: "/dashboard/mock-exams", primary: true },
  { group: "Provas", label: "Minhas provas e diagnóstico", icon: FileStack, href: "/dashboard/student-exams" },
  { group: "ENEM", label: "ENEM", icon: GraduationCap, href: "/dashboard/enem", primary: true },
  { group: "Desempenho", label: "Meu desempenho", icon: Layers, href: "/dashboard/performance" },
  { group: "Desempenho", label: "Histórico de atividades", icon: History, href: "/dashboard/history" },
  { group: "Desempenho", label: "Ranking", icon: Trophy, href: "/dashboard/ranking" },
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
    label: "Leitura em voz alta",
    icon: Headphones,
    href: "/dashboard/admin-voice-studio",
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
  { label: "Evolução", href: "/dashboard/performance", icon: Layers },
  { label: "Perfil", href: "/dashboard/profile", icon: User },
];

const normalize = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

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

/* Variantes da identidade visual; demais áreas de concursos usam azul. ENEM e administração têm identidade própria.
   "blue" = imagem azul-marinho; "gold" = imagem preto e dourado (planos e premiação). */
const BRAND_BG_ROUTES: Record<string, "blue" | "gold"> = {
  "/dashboard": "blue",
  "/dashboard/my-contest": "blue",
  "/dashboard/careers": "blue",
  "/dashboard/cronograma": "blue",
  "/dashboard/study-plan": "blue",
  "/dashboard/trilhas": "blue",
  "/dashboard/study-tools": "blue",
  "/dashboard/timer": "blue",
  "/dashboard/profile": "blue",
  "/dashboard/edital-radar": "blue",
  "/dashboard/exam-panorama": "blue",
  "/dashboard/perfil-bancas": "blue",
  "/dashboard/performance": "blue",
  "/dashboard/subscriptions": "gold",
  "/dashboard/medals": "gold",
  "/dashboard/ranking": "gold",
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  useMobileAppShell();
  const location = useLocation();
  const navigate = useNavigate();
  const router = useRouter();
  const { user } = useAuthStatus();
  // Depois que a tela principal já está pronta, baixa em segundo plano o código das seções mais
  // usadas, uma por vez, para o clique no menu abrir na hora. Respeita "economia de dados".
  React.useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "")) return;
    const sections = [
      "/dashboard/question-trainer",
      "/dashboard/mock-exams",
      "/dashboard/study-plan",
      "/dashboard/my-contest",
      "/dashboard/performance",
      "/dashboard/ranking",
      "/dashboard/history",
      "/dashboard/medals",
      "/dashboard/enem",
      "/dashboard/library",
      "/dashboard/study-tools",
      "/dashboard/questions",
      "/dashboard/student-exams",
      "/dashboard/profile",
    ];
    let cancelled = false;
    let handle = 0;
    const idle = (callback: () => void) =>
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(callback, { timeout: 4000 })
        : window.setTimeout(callback, 800);
    const next = (index: number) => {
      if (cancelled || index >= sections.length) return;
      handle = idle(() => {
        void router
          .preloadRoute({ to: sections[index] as never })
          .catch(() => undefined)
          .finally(() => next(index + 1));
      });
    };
    const start = window.setTimeout(() => next(0), 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(handle);
      window.clearTimeout(handle);
    };
  }, [router]);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  // Default estável igual ao SSR ("dark"); o tema real é sincronizado depois
  // da hidratação para não gerar mismatch (ver src/lib/theme.ts).
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  React.useEffect(() => setIsDarkMode(getActiveTheme() === "dark"), []);
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

  const isAdmin = user?.role === "admin";
  const brandPath = location.pathname.replace(/\/+$/, "") || "/";
  const brandBg = isAdmin || brandPath === "/dashboard/enem" || brandPath.startsWith("/dashboard/enem/")
    ? undefined
    : BRAND_BG_ROUTES[brandPath] ?? "blue";
  // Administrador vê só a administração (e o próprio perfil); aluno vê só a área de estudo.
  const items = React.useMemo(
    () =>
      isAdmin
        ? [
            ...MENU.filter((item) => item.adminOnly),
            ...MENU.filter((item) => item.href === "/dashboard/profile"),
          ]
        : MENU.filter((item) => !item.adminOnly && !item.soon),
    [isAdmin],
  );

  React.useEffect(() => {
    if (!isAdmin) return;
    const path = normalize(location.pathname);
    if (path.startsWith("/dashboard/admin") || path === "/dashboard/profile") return;
    navigate({ to: "/dashboard/admin-students", replace: true });
  }, [isAdmin, location.pathname, navigate]);
  const current = activeNavigation(items, location.pathname, location.search);

  React.useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
    try {
      setIsCollapsed(localStorage.getItem("norte_sidebar_collapsed") === "1");
    } catch {
      /* storage unavailable */
    }
  }, []);

  React.useEffect(() => {
    setStreak(null);
    setAchievements([]);
    // Each account owns its monitor; administrators do not earn study awards.
    if (isAdmin || !user?.id || user.id === "demo-user") return;
    let cancelled = false;
    const monitor = createAchievementMonitor({
      award: () => MockService.awardAchievements({ strict: true }),
      load: () => MockService.getAchievements({ strict: true }),
      onSnapshot: setAchievements,
      onEarned: (achievement) => {
        void import("@/components/dashboard/AchievementNotification").then(({ showAchievementNotification }) => {
          if (!cancelled) showAchievementNotification(achievement);
        }).catch(() => { /* The saved achievement remains available in the collection. */ });
      },
    });
    void MockService.registerStudyVisit().then((v) => v ?? MockService.getUserStreak())
      .then((s) => { if (!cancelled) setStreak(s); }).catch(() => {});
    const refresh = () => {
      if (document.visibilityState === "hidden" || !navigator.onLine) return;
      // Retain the last confirmed snapshot on failure; retry without overlapping requests.
      void monitor.refresh().catch(() => {});
    };
    refresh();
    const interval = window.setInterval(refresh, 30000);
    return () => {
      cancelled = true;
      monitor.stop();
      window.clearInterval(interval);
    };
  }, [isAdmin, user?.id]);

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
  }, [location.href]);

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
    await flushStudyClock();
    stopStudyClock();
    await supabase.auth.signOut();
    await navigate({ to: "/", replace: true });
  };
  const signOut = async () => {
    await flushStudyClock();
    if (isAdmin) await reallySignOut();
    else setFarewell({ spent: getStudyToday() });
  };

  const go = (item: MenuItem) => {
    setPaletteOpen(false);
    navigate({ to: item.href, search: item.search ?? {} });
  };

  const tier = user?.subscription_tier ? String(user.subscription_tier) : "free";
  const displayName = user?.full_name || (isAdmin ? "Administrador" : "Estudante");
  const planName = SUBSCRIPTION_PLANS.find((p) => p.id === tier)?.name ?? tier;
  const planLabel = isAdmin ? "Administrador" : `Plano ${planName}`;

  const nav = (collapsed: boolean) => (
    <DashboardNavigation
      items={items}
      pathname={location.pathname}
      search={location.search}
      collapsed={collapsed}
      hues={GROUP_HUE}
      appearance={isAdmin ? "default" : "student"}
      onNavigate={() => setMobileOpen(false)}
    />
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
      <div
        className="app-shell navigation-v2"
        data-area={isAdmin ? "admin" : "student"}
        data-brand-bg={brandBg ?? "off"}
      >
        {!isAdmin && brandBg && <div className="app-study-backdrop" aria-hidden="true" />}
        {user && user.id !== "demo-user" && <ActivityTracker />}
        <FocusReturnBar />
        <aside className={`app-sidebar no-print${isAdmin ? "" : " student-navigation"}`} data-collapsed={isCollapsed}>
          <div className="app-sidebar__head">
            <Link
              to="/dashboard"
              activeOptions={{ exact: true, includeSearch: false }}
              aria-label="Norte Concurso — visão geral"
            >
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
            aria-label="Buscar área da plataforma"
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

        <div className="app-main">
          <header className="app-topbar no-print">
            <PlatformBack />
            <div className="app-mobile-bar min-w-0 gap-2">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button type="button" className="app-top-btn" aria-label="Abrir menu">
                    <Menu />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" menuMotion="drawer" className={`app-sheet${isAdmin ? "" : " student-navigation"}`}>
                  <SheetTitle className="sr-only">Menu principal</SheetTitle>
                  <div className="app-sidebar__head">
                    <NorteBrand light />
                  </div>
                  <button
                    type="button"
                    className="app-sidebar__search"
                    onClick={() => {
                      setMobileOpen(false);
                      setPaletteOpen(true);
                    }}
                  >
                    <Search aria-hidden="true" />
                    <span>Buscar área da plataforma</span>
                  </button>
                  {nav(false)}
                  <div className="app-sidebar__foot">{userMenu(false)}</div>
                </SheetContent>
              </Sheet>
              <Link
                to="/dashboard"
                activeOptions={{ exact: true, includeSearch: false }}
                aria-label="Norte Concurso — visão geral"
              >
                <NorteBrand light compact />
              </Link>
              <span className="app-mobile-title">{current?.label ?? (isAdmin ? "Administração" : "Minha preparação")}</span>
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
              <div className="app-chips">
                <AcreClock />
                {!isAdmin && user && user.id !== "demo-user" && <SessionClock userId={user.id} />}
                {TESTING_PHASE && !isAdmin && !!user?.on_trial && !!user?.plan_ends_at && (
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
                      Fase de testes: você usa o plano Plus de graça. Depois, a conta segue no
                      plano Gratuito.
                    </TooltipContent>
                  </Tooltip>
                )}
                {!isAdmin && (
                  <span className="app-streak" title="Dias seguidos de estudo">
                    <Flame />
                    <span className="tabular">{streak?.currentStreak ?? 0}</span>
                  </span>
                )}
              </div>
              <button
                type="button"
                className="app-top-btn app-theme-toggle"
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}
                title={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}
              >
                {isDarkMode ? <Sun /> : <Moon />}
              </button>
            </div>
          </header>

          <main
            id="dashboard-content"
            data-header-style={brandPath === "/dashboard" ? "original" : "glass"}
            data-section-art={current?.group ?? "Planejamento"}
            data-scroll-restoration-id="dashboard-content"
            tabIndex={-1}
            className="app-content"
            data-hue={GROUP_HUE[current?.group ?? "Planejamento"] ?? "gold"}
          >
            <div className="app-content__inner">
              {children}
            </div>
            {showsReadingControl(location.pathname) && <ReadingSizeControl />}
            <footer className="app-footer no-print">
              <span>© 2026 Norte Concurso</span>
              <span>
                Desenvolvido por <strong className="text-foreground">Franc Denis</strong> ·
                Feijó-AC
              </span>
            </footer>
          </main>

          <nav className="app-bottom-nav no-print" aria-label="Navegação rápida">
            {(isAdmin ? ADMIN_MOBILE_NAV : MOBILE_NAV).slice(0, 4).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                preload="viewport"
                activeOptions={{ exact: true, includeSearch: false }}
                data-active={isActive(location.pathname, item.href)}
                aria-current={isActive(location.pathname, item.href) ? "page" : undefined}
              >
                <span className="app-ico" data-hue={MOBILE_HUE[item.href] ?? "gold"}>
                  <item.icon />
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu completo"
              aria-expanded={mobileOpen}
            >
              <span className="app-ico" data-hue="teal">
                <Menu aria-hidden="true" />
              </span>
              <span>Menu</span>
            </button>
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
                          key={navigationKey(item)}
                          value={`${item.label} ${item.group}`}
                          onSelect={() => go(item)}
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
