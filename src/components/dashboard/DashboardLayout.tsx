import React from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  BookMarked,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ClipboardList,
  Clock,
  FileStack,
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
  PenLine,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Target,
  Timer,
  Trophy,
  User,
  Medal,
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
import { MockService } from "@/services/mockService";
import type { Achievement, UserStreak } from "@/types";
import { NorteBrand } from "@/components/brand/NorteBrand";

type MenuItem = {
  group: string;
  label: string;
  icon: LucideIcon;
  href: string;
  adminOnly?: boolean;
};

const MENU: MenuItem[] = [
  { group: "Hoje", label: "Visão geral", icon: LayoutDashboard, href: "/dashboard" },
  { group: "Hoje", label: "Plano de estudos", icon: ClipboardList, href: "/dashboard/study-plan" },
  { group: "Hoje", label: "Central de estudos", icon: Timer, href: "/dashboard/study-tools" },
  { group: "Objetivo", label: "Meu concurso", icon: Target, href: "/dashboard/my-contest" },
  { group: "Objetivo", label: "Carreiras", icon: ShieldCheck, href: "/dashboard/careers" },
  { group: "Objetivo", label: "Catálogo de concursos", icon: Search, href: "/dashboard/questions" },
  { group: "Treinamento", label: "Edital eletrônico", icon: MapPin, href: "/dashboard/edital" },
  { group: "Treinamento", label: "Biblioteca de estudo", icon: Library, href: "/dashboard/library" },
  {
    group: "Treinamento",
    label: "Treinador de questões",
    icon: BrainCircuit,
    href: "/dashboard/question-trainer",
  },
  {
    group: "Treinamento",
    label: "Banco de questões",
    icon: BookMarked,
    href: "/dashboard/question-bank",
  },
  { group: "Treinamento", label: "Cadernos", icon: BookOpen, href: "/dashboard/notebooks" },
  { group: "Treinamento", label: "Caderno de erros", icon: NotebookPen, href: "/dashboard/errors" },
  { group: "Provas", label: "Simulador", icon: Trophy, href: "/dashboard/mock-exams" },
  { group: "Provas", label: "Minhas provas", icon: FileStack, href: "/dashboard/student-exams" },
  { group: "Provas", label: "Redação", icon: PenLine, href: "/dashboard/essays" },
  { group: "Inteligência", label: "Desempenho", icon: Layers, href: "/dashboard/performance" },
  { group: "Inteligência", label: "Histórico", icon: History, href: "/dashboard/history" },
  { group: "Inteligência", label: "Cronômetro", icon: Clock, href: "/dashboard/timer" },
  { group: "Conta", label: "Perfil", icon: User, href: "/dashboard/profile" },
  {
    group: "Conta",
    label: "Painel admin",
    icon: Settings,
    href: "/dashboard/admin",
    adminOnly: true,
  },
];

const MOBILE_NAV: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Hoje", href: "/dashboard", icon: LayoutDashboard },
  { label: "Treinar", href: "/dashboard/question-trainer", icon: BrainCircuit },
  { label: "Simular", href: "/dashboard/mock-exams", icon: Trophy },
  { label: "Evolução", href: "/dashboard/performance", icon: Layers },
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
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "")).toUpperCase();
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStatus();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [streak, setStreak] = React.useState<UserStreak | null>(null);
  const [achievements, setAchievements] = React.useState<Achievement[]>([]);

  const items = React.useMemo(
    () => MENU.filter((item) => !item.adminOnly || user?.role === "admin"),
    [user?.role],
  );
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
    Promise.all([MockService.getUserStreak(), MockService.getAchievements()]).then(([s, a]) => {
      if (cancelled) return;
      setStreak(s);
      setAchievements(a);
      known = a.length;
    });
    const interval = window.setInterval(async () => {
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
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const go = (href: string) => {
    setPaletteOpen(false);
    navigate({ to: href });
  };

  const tier = user?.subscription_tier ? String(user.subscription_tier) : "free";
  const displayName = user?.full_name || "Estudante";

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
            <item.icon />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        );
        return (
          <React.Fragment key={item.href}>
            {showGroup && <div className="app-nav__group">{item.group}</div>}
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              link
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );

  const userMenu = (collapsed: boolean) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="app-user" aria-label="Menu da conta">
          <span className="app-avatar">{initials(user?.full_name)}</span>
          {!collapsed && (
            <>
              <span className="app-user__meta">
                <strong>{displayName}</strong>
                <span>Plano {tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
              </span>
              <ChevronsUpDown />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <span className="block text-sm font-semibold">{displayName}</span>
          <span className="block text-xs text-muted-foreground">Plano {tier}</span>
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

          <button type="button" className="app-sidebar__search" onClick={() => setPaletteOpen(true)}>
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
                    <div className="app-stat">
                      <span>
                        <Medal /> Medalhas
                      </span>
                      <strong className="tabular">{achievements.length}</strong>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-56">
                    {achievements.length > 0
                      ? achievements.map((a) => a.name).join(" · ")
                      : "Nenhuma medalha ainda. Continue treinando."}
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

          <main className="app-content">
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
            {MOBILE_NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                data-active={isActive(location.pathname, item.href)}
              >
                <item.icon />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

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
