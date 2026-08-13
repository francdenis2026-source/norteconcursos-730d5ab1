import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
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
  Flame
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStatus } from '@/hooks/useDashboard';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MockService } from '@/services/mockService';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const menuItems = [
  { label: 'Visão Geral', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Meu Concurso', icon: Target, href: '/dashboard/my-contest' },
  { label: 'Plano de Estudos', icon: ClipboardList, href: '/dashboard/study-plan' },
  { label: 'Questões', icon: Search, href: '/dashboard/questions' },
  { label: 'Cadernos', icon: BookOpen, href: '/dashboard/notebooks' },
  { label: 'Simulados', icon: Trophy, href: '/dashboard/mock-exams' },
  { label: 'Caderno de Erros', icon: History, href: '/dashboard/errors' },
  { label: 'Histórico', icon: History, href: '/dashboard/history' },
  { label: 'Cronômetro', icon: Clock, href: '/dashboard/timer' },
  { label: 'Desempenho', icon: Layers, href: '/dashboard/performance' },
  { label: 'Perfil', icon: User, href: '/dashboard/profile' },
  { label: 'Painel Admin', icon: Settings, href: '/dashboard/admin' },
];


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();
  const { user } = useAuthStatus();
  const [streak, setStreak] = React.useState<any>(null);
  const [achievements, setAchievements] = React.useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Sync theme on mount
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    const loadGamification = async () => {
      const [s, a] = await Promise.all([
        MockService.getUserStreak(),
        MockService.getAchievements()
      ]);
      setStreak(s);
      setAchievements(a);

      // Simple real-time achievement listener simulation
      const interval = setInterval(async () => {
        const currentA = await MockService.getAchievements();
        if (currentA.length > a.length) {
          const newA = currentA[currentA.length - 1];
          if (newA) {
            const { showAchievementNotification } = await import('@/components/dashboard/AchievementNotification');
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
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <aside 
        className={cn(
          "hidden md:flex flex-col border-r bg-card transition-all duration-300 sticky top-0 h-screen",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && <span className="text-xl font-bold text-primary">Norte</span>}
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="h-8 w-8"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8"
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.href 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          {!isCollapsed && (
            <div className="mb-4 space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between px-3 py-2 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800/50">
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                        <span className="text-xs font-bold text-orange-700 dark:text-orange-400">Ofensiva</span>
                      </div>
                      <span className="text-sm font-black text-orange-700 dark:text-orange-400">{streak?.currentStreak || 0}d</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-[10px]">Continue estudando diariamente para manter sua ofensiva!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50 cursor-pointer hover:bg-emerald-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-emerald-500 fill-emerald-500" />
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Medalhas</span>
                      </div>
                      <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">{achievements.length}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="p-1">
                      <p className="text-[10px] font-bold mb-1">Suas Conquistas:</p>
                      {achievements.length > 0 ? (
                        achievements.map(a => (
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
              {user?.full_name?.substring(0, 2).toUpperCase() || 'JS'}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold truncate">{user?.full_name || 'João Silva'}</span>
                <span className="text-[10px] text-muted-foreground uppercase">{user?.subscription_tier || 'Free'}</span>
              </div>
            )}
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Banner Demonstrativo */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-1.5 text-center flex items-center justify-center gap-2 no-print">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-[10px] md:text-xs text-emerald-800 font-bold uppercase tracking-wider">
            Conexão Supabase Ativa — Sincronização Híbrida
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>

        {/* Bottom Nav Mobile */}
        <nav className="md:hidden border-t bg-card px-4 py-2 flex items-center justify-between sticky bottom-0 z-50 no-print">
          <Link to="/dashboard" className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground">
            <LayoutDashboard className="h-5 w-5" />
            <span>Início</span>
          </Link>
          <Link to="/dashboard/study-plan" className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground">
            <ClipboardList className="h-5 w-5" />
            <span>Plano</span>
          </Link>
          <Link to="/dashboard/questions" className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground">
            <Search className="h-5 w-5" />
            <span>Questões</span>
          </Link>
          <Link to="/dashboard/performance" className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground">
            <Layers className="h-5 w-5" />
            <span>Desempenho</span>
          </Link>
          <Link to="/dashboard/profile" className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground">
            <User className="h-5 w-5" />
            <span>Mais</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
