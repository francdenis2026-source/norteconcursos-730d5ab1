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
  AlertCircle,
  LogOut,
  Moon,
  Sun,
  Flame,
  Star,
  ShieldCheck,
  FileStack,
  BookMarked,
  PenLine,
  Timer,
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

const menuItems = [
  { label: "Visão Geral", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Carreiras", icon: ShieldCheck, href: "/dashboard/careers" },
  { label: "Meu Concurso", icon: Target, href: "/dashboard/my-contest" },
  { label: "Minhas Provas", icon: FileStack, href: "/dashboard/student-exams" },
  { label: "Banco de Questões", icon: BookMarked, href: "/dashboard/question-bank" },
  { label: "Redação", icon: PenLine, href: "/dashboard/essays" },
  { label: "Central de Estudos", icon: Timer, href: "/dashboard/study-tools" },
  { label: "Plano de Estudos", icon: ClipboardList, href: "/dashboard/study-plan" },
  { label: "Questões (simulado)", icon: Search, href: "/dashboard/questions" },
  { label: "Cadernos", icon: BookOpen, href: "/dashboard/notebooks" },
  { label: "Simulados", icon: Trophy, href: "/dashboard/mock-exams" },
  { label: "Caderno de Erros", icon: History, href: "/dashboard/errors" },
  { label: "Histórico", icon: History, href: "/dashboard/history" },
  { label: "Cronômetro", icon: Clock, href: "/dashboard/timer" },
  { label: "Desempenho", icon: Layers, href: "/dashboard/performance" },
  { label: "Perfil", icon: User, href: "/dashboard/profile" },
  { label: "Painel Admin", icon: Settings, href: "/dashboard/admin", adminOnly: true },
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
    <div className="app-shell flex min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-white/8 bg-[#071a2f] text-white transition-all duration-300 sticky top-0 h-screen shadow-2xl shadow-slate-950/10 z-30",
          isCollapsed ? "w-[84px]" : "w-[272px]",
        )}
      >
        <div className="h-[82px] px-5 flex items-center justify-between border-b border-white/8">
          {!isCollapsed ? (
            <Link to="/dashboard" className="brand-lockup">
              <span className="brand-mark">
                <Star aria-hidden="true" />
              </span>
              <span className="text-white">
                Norte<span>Concurso</span>
              </span>
            </Link>
          ) : (
            <span className="brand-mark mx-auto">
              <Star aria-hidden="true" />
            </span>
          )}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 text-white/50 hover:bg-white/10 hover:text-white"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 text-white/50 hover:bg-white/10 hover:text-white"
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        </div>

        {!isCollapsed && (
          <div className="px-5 pt-6 pb-2 text-[9px] font-black uppercase tracking-[.18em] text-white/30">
            Sua preparação
          </div>
        )}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-2">
          {menuItems.map((item) => {
            if (item.adminOnly && user?.role !== "admin") return null;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200",
                  location.pathname === item.href
                    ? "bg-emerald-400/15 text-emerald-300 shadow-sm ring-1 ring-emerald-400/15"
                    : "text-white/52 hover:bg-white/7 hover:text-white",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
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
        <div className="h-[82px] bg-white/85 dark:bg-card/85 backdrop-blur-xl border-b px-5 md:px-8 flex items-center justify-between no-print sticky top-0 z-20">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[.16em] text-emerald-600">
              Ambiente de estudos
            </p>
            <p className="text-sm font-extrabold text-primary mt-0.5">Sua central de preparação</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Dados
              sincronizados
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl relative">
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

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          <div className="mx-auto max-w-[1440px]">{children}</div>
        </div>

        {/* Bottom Nav Mobile */}
        <nav className="md:hidden border-t border-white/10 bg-[#071a2f] px-4 py-2.5 flex items-center justify-between sticky bottom-0 z-50 no-print shadow-2xl">
          <Link
            to="/dashboard"
            className="flex flex-col items-center gap-1 text-[10px] text-emerald-300"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Início</span>
          </Link>
          <Link
            to="/dashboard/study-plan"
            className="flex flex-col items-center gap-1 text-[10px] text-white/50"
          >
            <ClipboardList className="h-5 w-5" />
            <span>Plano</span>
          </Link>
          <Link
            to="/dashboard/questions"
            className="flex flex-col items-center gap-1 text-[10px] text-white/50"
          >
            <Search className="h-5 w-5" />
            <span>Questões</span>
          </Link>
          <Link
            to="/dashboard/performance"
            className="flex flex-col items-center gap-1 text-[10px] text-white/50"
          >
            <Layers className="h-5 w-5" />
            <span>Desempenho</span>
          </Link>
          <Link
            to="/dashboard/profile"
            className="flex flex-col items-center gap-1 text-[10px] text-white/50"
          >
            <User className="h-5 w-5" />
            <span>Mais</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
