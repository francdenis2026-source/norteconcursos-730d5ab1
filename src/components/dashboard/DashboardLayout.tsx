import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Search,
  BookOpen,
  Layers,
  Trophy,
  History,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Target,
  Settings,
  Bell,
  Moon,
  Sun,
  Flame,
  ShieldCheck,
  FileStack,
  BookMarked,
  BrainCircuit,
  PenLine,
  Timer,
  MapPin,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MockService } from "@/services/mockService";
import type { Achievement, UserStreak } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NorteBrand } from "@/components/brand/NorteBrand";

const menuItems = [
  { group: "Hoje", label: "Visão Geral", icon: LayoutDashboard, href: "/dashboard" },
  { group: "Hoje", label: "Plano de Estudos", icon: ClipboardList, href: "/dashboard/study-plan" },
  { group: "Hoje", label: "Central de Estudos", icon: Timer, href: "/dashboard/study-tools" },
  { group: "Objetivo", label: "Meu Concurso", icon: Target, href: "/dashboard/my-contest" },
  { group: "Objetivo", label: "Carreiras", icon: ShieldCheck, href: "/dashboard/careers" },
  { group: "Objetivo", label: "Catálogo de Concursos", icon: Search, href: "/dashboard/questions" },
  {
    group: "Treinamento",
    label: "Edital Eletrônico",
    icon: MapPin,
    href: "/dashboard/edital",
  },
  {
    group: "Treinamento",
    label: "Treinador de Questões",
    icon: BrainCircuit,
    href: "/dashboard/question-trainer",
  },
  {
    group: "Treinamento",
    label: "Banco de Questões",
    icon: BookMarked,
    href: "/dashboard/question-bank",
  },
  { group: "Treinamento", label: "Cadernos", icon: BookOpen, href: "/dashboard/notebooks" },
  { group: "Treinamento", label: "Caderno de Erros", icon: History, href: "/dashboard/errors" },
  { group: "Provas", label: "Simulador Profissional", icon: Trophy, href: "/dashboard/mock-exams" },
  { group: "Provas", label: "Minhas Provas", icon: FileStack, href: "/dashboard/student-exams" },
  { group: "Provas", label: "Redação", icon: PenLine, href: "/dashboard/essays" },
  { group: "Inteligência", label: "Desempenho", icon: Layers, href: "/dashboard/performance" },
  { group: "Inteligência", label: "Histórico", icon: History, href: "/dashboard/history" },
  { group: "Inteligência", label: "Cronômetro", icon: Clock, href: "/dashboard/timer" },
  { group: "Conta", label: "Perfil", icon: User, href: "/dashboard/profile" },
  {
    group: "Conta",
    label: "Painel Admin",
    icon: Settings,
    href: "/dashboard/admin",
    adminOnly: true,
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();
  const { user } = useAuthStatus();
  const [streak, setStreak] = React.useState<UserStreak | null>(null);
  const [achievements, setAchievements] = React.useState<Achievement[]>([]);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Sync theme on mount
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const loadGamification = async () => {
      const [s, a] = await Promise.all([
        MockService.getUserStreak(),
        MockService.getAchievements(),
      ]);
      setStreak(s);
      setAchievements(a);

      // Simple real-time achievement listener simulation
      const interval = setInterval(async () => {
        const currentA = await MockService.getAchievements();
        if (currentA.length > a.length) {
          const newA = currentA[currentA.length - 1];
          if (newA) {
            const { showAchievementNotification } =
              await import("@/components/dashboard/AchievementNotification");
            showAchievementNotification(newA);
            setAchievements(currentA);
          }
        }
      }, 5000);
      return () => clearInterval(interval);
    };
    loadGamification();
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="app-shell command-app flex min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <aside
        className={cn(
          "tactical-sidebar hidden md:flex flex-col border-r border-white/8 bg-[#071a2b] text-white transition-all duration-300 sticky top-0 h-screen shadow-2xl shadow-slate-950/10 z-30",
          isCollapsed ? "w-[84px]" : "w-[272px]",
        )}
      >
        <div className="h-[82px] px-5 flex items-center justify-between border-b border-white/8">
          {!isCollapsed ? (
            <Link to="/dashboard" aria-label="Norte Concurso — visão geral">
              <NorteBrand light />
            </Link>
          ) : (
            <NorteBrand compact light className="mx-auto" />
          )}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 text-white/50 hover:bg-white/10 hover:text-white"
              aria-label={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 text-white/50 hover:bg-white/10 hover:text-white"
              aria-label={isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-4" aria-label="Menu operacional">
          {menuItems.map((item, index) => {
            if (item.adminOnly && user?.role !== "admin") return null;
            const showGroup = !isCollapsed && item.group !== menuItems[index - 1]?.group;
            return (
              <React.Fragment key={item.href}>
                {showGroup && (
                  <div className="sidebar-group-label px-3 pb-1 pt-5 first:pt-1">{item.group}</div>
                )}
                <Link
                  to={item.href}
                  aria-label={item.label}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200",
                    location.pathname === item.href
                      ? "sidebar-link-active bg-amber-300/12 text-amber-200 shadow-sm ring-1 ring-amber-300/15"
                      : "text-white/60 hover:bg-white/7 hover:text-white",
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/8">
          {!isCollapsed && (
            <div className="mb-4 space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between px-3 py-2 bg-amber-400/8 rounded-xl border border-amber-300/10">
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                        <span className="text-xs font-bold text-amber-300">Ofensiva</span>
                      </div>
                      <span className="text-sm font-black text-amber-300">
                        {streak?.currentStreak || 0}d
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-[10px]">
                      Continue estudando diariamente para manter sua ofensiva!
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between px-3 py-2 bg-emerald-400/8 rounded-xl border border-emerald-300/10 cursor-pointer hover:bg-emerald-400/12 transition-colors">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-emerald-500 fill-emerald-500" />
                        <span className="text-xs font-bold text-emerald-300">Medalhas</span>
                      </div>
                      <span className="text-sm font-black text-emerald-300">
                        {achievements.length}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="p-1">
                      <p className="text-[10px] font-bold mb-1">Suas Conquistas:</p>
                      {achievements.length > 0 ? (
                        achievements.map((a) => (
                          <div key={a.id} className="text-[9px] flex items-center gap-1">
                            • {a.name}
                          </div>
                        ))
                      ) : (
                        <p className="text-[9px] text-muted-foreground">Nenhuma medalha ainda.</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
              {user?.full_name?.substring(0, 2).toUpperCase() || "JS"}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-white truncate">
                  {user?.full_name || "João Silva"}
                </span>
                <span className="text-[9px] text-white/35 uppercase tracking-wider">
                  Plano {user?.subscription_tier || "Free"}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="app-content flex-1 flex flex-col min-h-screen overflow-hidden">
        <div className="tactical-topbar h-[54px] bg-white/90 dark:bg-card/90 backdrop-blur-xl border-b px-2.5 sm:h-[68px] sm:px-5 md:h-[82px] md:px-8 flex items-center justify-between no-print sticky top-0 z-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.1em] text-amber-700 dark:text-amber-300 sm:text-xs">
              Centro de operações
            </p>
            <p className="mt-0.5 text-xs font-extrabold text-primary sm:text-sm">
              Preparação para carreiras policiais
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-md bg-sky-50 border border-sky-100 px-3 py-1.5 text-xs font-bold text-sky-800 dark:bg-sky-950/30 dark:border-sky-800/40 dark:text-sky-200">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> Dados sincronizados
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg relative"
              aria-label="Notificações"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl md:hidden"
              onClick={toggleTheme}
            >
              {isDarkMode ? <Sun /> : <Moon />}
            </Button>
          </div>
        </div>

        <div className="command-surface flex-1 overflow-y-auto p-2 sm:p-4 md:p-8 lg:p-10">
          <div className="mx-auto max-w-[1440px]">{children}</div>
          <footer className="mx-auto mt-6 hidden max-w-[1440px] border-t pt-3 text-center text-[10px] text-muted-foreground no-print sm:block sm:mt-10 sm:pt-4 sm:text-xs">
            Plataforma desenvolvida por{" "}
            <strong className="text-foreground">Franc D&apos;nis</strong> · Feijó-AC
          </footer>
        </div>

        {/* Bottom Nav Mobile */}
        <nav className="mobile-command-nav md:hidden border-t border-white/10 bg-[#071a2b] px-1 py-1 flex items-center justify-around sticky bottom-0 z-50 no-print shadow-2xl">
          {(
            [
              { label: "Hoje", href: "/dashboard", icon: LayoutDashboard },
              { label: "Treinar", href: "/dashboard/question-trainer", icon: BrainCircuit },
              { label: "Simular", href: "/dashboard/mock-exams", icon: Trophy },
              { label: "Evolução", href: "/dashboard/performance", icon: Layers },
              { label: "Perfil", href: "/dashboard/profile", icon: User },
            ] as const
          ).map((item) => {
            const active =
              item.href === "/dashboard"
                ? location.pathname === "/dashboard" || location.pathname === "/dashboard/"
                : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex min-h-10 min-w-12 flex-col items-center justify-center gap-0.5 rounded-md px-1.5 text-[10px] font-semibold transition-colors",
                  active ? "bg-amber-300/12 text-amber-200" : "text-white/55 hover:text-white",
                )}
              >
                <item.icon className="h-[18px] w-[18px]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
