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
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuItems = [
  { label: 'Visão Geral', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Meu Concurso', icon: Target, href: '/dashboard/my-contest' },
  { label: 'Plano de Estudos', icon: ClipboardList, href: '/dashboard/study-plan' },
  { label: 'Questões', icon: Search, href: '/dashboard/questions' },
  { label: 'Cadernos', icon: BookOpen, href: '/dashboard/notebooks' },
  { label: 'Simulados', icon: Trophy, href: '/dashboard/mock-exams' },
  { label: 'Caderno de Erros', icon: History, href: '/dashboard/errors' },
  { label: 'Cronômetro', icon: Clock, href: '/dashboard/timer' },
  { label: 'Desempenho', icon: Layers, href: '/dashboard/performance' },
  { label: 'Perfil', icon: User, href: '/dashboard/profile' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();

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
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
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
          <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
              JS
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-xs font-bold truncate">João Silva</span>
                <span className="text-[10px] text-muted-foreground">Plano Plus</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Banner Demonstrativo */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-1.5 text-center flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-[10px] md:text-xs text-emerald-800 font-bold uppercase tracking-wider">
            Modo Local Ativo — Navegação e Dados Simulados
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>

        {/* Bottom Nav Mobile */}
        <nav className="md:hidden border-t bg-card px-4 py-2 flex items-center justify-between sticky bottom-0 z-50">
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
