import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { 
  Target, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  Zap,
  Download,
  FileText
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardData, useAuthStatus } from '@/hooks/useDashboard';
import { Button } from '@/components/ui/button';
import { MockService } from '@/services/mockService';
import { toast } from 'sonner';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndex
});

function DashboardIndex() {
  const { stats, focusedContest, isLoading, refreshStats } = useDashboardData();
  const { user } = useAuthStatus();
  const [showTour, setShowTour] = React.useState(false);
  const [checklist, setChecklist] = React.useState({
    contest: false,
    notebook: false,
    plan: false
  });
  const [isUpdatingTour, setIsUpdatingTour] = React.useState(false);
  const [dailyQuota, setDailyQuota] = React.useState({ used: 0, total: 0 });
  const [blockedAttempts, setBlockedAttempts] = React.useState<any[]>([]);
  const [isLoadingAttempts, setIsLoadingAttempts] = React.useState(false);

  React.useEffect(() => {
    const fetchOnboarding = async () => {
      const status = await MockService.getOnboardingStatus();
      if (!status.onboarding_done) {
        setShowTour(true);
      }

      const storedContest = localStorage.getItem('norte_focused_contest');
      const storedNotebooks = JSON.parse(localStorage.getItem('norte_notebooks') || '[]');
      
      const currentSteps = {
        contest: !!storedContest,
        notebook: storedNotebooks.length > 0,
        plan: user?.role !== 'free'
      };

      setChecklist(currentSteps);

      if (user && JSON.stringify(status.onboarding_steps) !== JSON.stringify(currentSteps)) {
        MockService.updateOnboardingStatus({ onboarding_steps: currentSteps });
      }

      // Calculate daily quota
      const responses = MockService.getUserResponses();
      const today = new Date().toISOString().split('T')[0];
      const todayCount = responses.filter(r => (r as any).createdAt?.split('T')[0] === today).length;
      const userRole = (user?.role || 'free') as string;
      const limit = userRole === 'free' ? 10 : (userRole === 'essential' ? 100 : Infinity);
      setDailyQuota({ used: todayCount, total: limit === Infinity ? 9999 : limit });

      // Notify about quota
      if (limit !== Infinity) {
        const usagePercent = (todayCount / (limit as number)) * 100;
        const lastNotified = localStorage.getItem('norte_last_quota_notify');
        const todayStr = new Date().toDateString();
        
        if (usagePercent >= 100 && lastNotified !== `100_${todayStr}`) {
          toast.error("Quota diária esgotada! Considere um upgrade para continuar respondendo.");
          localStorage.setItem('norte_last_quota_notify', `100_${todayStr}`);
        } else if (usagePercent >= 80 && lastNotified !== `80_${todayStr}` && lastNotified !== `100_${todayStr}`) {
          toast.warning("Você atingiu 80% da sua quota diária de questões.");
          localStorage.setItem('norte_last_quota_notify', `80_${todayStr}`);
        }
      }

      // Fetch audit logs
      setIsLoadingAttempts(true);
      const logs = await MockService.getAccessAuditLogs();
      setBlockedAttempts(logs.filter((l: any) => l.was_blocked));
      setIsLoadingAttempts(false);
    };

    fetchOnboarding();

    // Real-time synchronization
    if (user) {
      const channel = supabase
        .channel('profile_sync')
        .on('postgres_changes', { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'profiles',
          filter: `id=eq.${user.id}`
        }, (payload: any) => {
          if (payload.new.onboarding_steps) {
            setChecklist(payload.new.onboarding_steps);
          }
          if (payload.new.onboarding_done !== undefined) {
            setShowTour(!payload.new.onboarding_done);
          }
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
    return undefined;
  }, [user]);

  const completeTour = async () => {
    setIsUpdatingTour(true);
    await MockService.updateOnboardingStatus({ onboarding_done: true });
    setShowTour(false);
    setIsUpdatingTour(false);
    toast.success("Tour finalizado! Boa sorte nos estudos.");
  };

  if (isLoading) return <div>Carregando...</div>;

  const handleExportCSV = () => {
    const responses = MockService.getUserResponses();
    if (responses.length === 0) {
      toast.error("Nenhum dado para exportar");
      return;
    }

    const headers = ["Data", "Questão ID", "Acertou", "Tempo (seg)"];
    const csvContent = [
      headers.join(","),
      ...responses.map(r => [
        new Date(r.createdAt).toLocaleString(),
        r.questionId,
        r.isCorrect ? "Sim" : "Não",
        r.timeSpent
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `resultados_norte_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exportação CSV concluída!");
  };

  const handleExportPDF = () => {
    toast.success("Gerando PDF com resultados detalhados...");
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const handleLoadDemo = () => {
    MockService.saveResponse({
      questionId: 'q1',
      isCorrect: true,
      timeSpent: 45,
      createdAt: new Date().toISOString()
    });
    MockService.saveResponse({
      questionId: 'q2',
      isCorrect: false,
      timeSpent: 60,
      createdAt: new Date().toISOString()
    });
    refreshStats();
    toast.success("Dados de demonstração carregados");
  };

  const chartData = stats?.byDiscipline.map(d => ({
    name: d.disciplineId === '1' ? 'Português' : 
          d.disciplineId === '4' ? 'Constitucional' : 'Outras',
    acertos: d.correct,
    total: d.total
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-print">
        <div>
          <h1 className="text-2xl font-bold text-primary">Olá, {user?.name?.split(' ')[0] || 'Estudante'}</h1>
          <p className="text-muted-foreground">Bem-vindo ao seu ambiente de estudos.</p>
        </div>
        <div className="flex items-center gap-2 no-print">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" /> Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Formato de Exportação</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer gap-2">
                <FileText className="h-4 w-4" /> CSV (Excel)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer gap-2">
                <Download className="h-4 w-4" /> PDF (Relatório)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" onClick={handleLoadDemo}>
            Demonstração
          </Button>
          
          <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <TrendingUp className="mr-2 h-4 w-4" />
            Meta: 65%
          </Button>
        </div>
      </div>

      {showTour && (
        <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative animate-in fade-in zoom-in duration-300">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  🚀 Comece sua Jornada no Norte
                </h2>
                <p className="text-primary-foreground/80 max-w-lg">
                  Complete os passos iniciais para otimizar sua preparação.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <CheckItem label="Definir Concurso" done={checklist.contest} />
                  <CheckItem label="Criar Caderno" done={checklist.notebook} />
                  <CheckItem label="Ajustar Plano" done={checklist.plan} />
                </div>
              </div>
              <Button onClick={completeTour} variant="secondary" className="shrink-0" disabled={isUpdatingTour}>
                {isUpdatingTour ? "Sincronizando..." : "Entendi, vamos lá!"}
              </Button>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Foco Atual" 
          value={focusedContest?.agency || "Não definido"} 
          icon={Target}
          description={focusedContest?.role || "Selecione um concurso"}
        />
        <MetricCard 
          title="Cota Diária" 
          value={`${dailyQuota.used}/${dailyQuota.total === 9999 ? '∞' : dailyQuota.total}`} 
          icon={Zap}
          description="Questões hoje"
          progress={(dailyQuota.used / dailyQuota.total) * 100}
        />
        <MetricCard 
          title="Taxa de Acerto" 
          value={`${stats?.accuracyRate.toFixed(1) || 0}%`} 
          icon={CheckCircle2}
          description="Geral acumulada"
        />
        <MetricCard 
          title="Tempo Estudado" 
          value={`${Math.floor((stats?.timeSpent || 0) / 60)}m`} 
          icon={Clock}
          description="Efetivo hoje"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Evolução por Disciplina</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="acertos" name="Acertos" fill="oklch(0.45 0.15 150)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <AlertCircle className="h-12 w-12 mb-2 opacity-20" />
                <p>Nenhum dado para exibir ainda.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="no-print">
          <CardHeader>
            <CardTitle className="text-lg">Próximas Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem 
                title="Português - Sintaxe" 
                type="Questões" 
                time="14:00 - 15:30" 
                status="Pendente"
              />
              <ActivityItem 
                title="Dir. Constitucional - Art 5º" 
                type="Teoria" 
                time="16:00 - 18:00" 
                status="Pendente"
              />
              <ActivityItem 
                title="Simulado Semanal" 
                type="Simulado" 
                time="Amanhã" 
                status="Pendente"
                priority
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Alertas de Acesso do Plano
              <Badge variant="outline" className="text-[10px]">{blockedAttempts.length} bloqueios</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingAttempts ? (
              <div className="space-y-2">
                <div className="h-10 bg-muted animate-pulse rounded" />
                <div className="h-10 bg-muted animate-pulse rounded" />
              </div>
            ) : blockedAttempts.length > 0 ? (
              <div className="space-y-3">
                {blockedAttempts.slice(0, 3).map((attempt: any) => (
                  <div key={attempt.id} className="flex items-center justify-between p-2 rounded border bg-destructive/5 border-destructive/10">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-destructive">Limite atingido: {attempt.feature_key}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(attempt.attempt_time).toLocaleString()}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] h-auto p-1" asChild>
                      <Link to="/dashboard/profile">Ver Planos</Link>
                    </Button>
                  </div>
                ))}
                {blockedAttempts.length > 3 && (
                  <p className="text-[10px] text-center text-muted-foreground italic">Exibindo os 3 bloqueios mais recentes</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-2 opacity-20" />
                <p className="text-xs text-muted-foreground">Nenhum bloqueio registrado recentemente.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, description, progress }: any) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-6 relative">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-secondary" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-primary">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {progress !== undefined && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-muted">
            <div 
              className={cn(
                "h-full transition-all duration-500",
                progress > 90 ? "bg-destructive" : progress > 70 ? "bg-orange-500" : "bg-emerald-500"
              )}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityItem({ title, type, time, status, priority }: any) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-lg border bg-card",
      priority ? "border-l-4 border-l-secondary" : ""
    )}>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold">{title}</span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="px-1.5 py-0.5 rounded bg-muted font-medium">{type}</span>
          <span>{time}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="h-8 text-xs">
        Iniciar
      </Button>
    </div>
  );
}

function CheckItem({ label, done }: { label: string; done: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-2 text-xs px-2 py-1 rounded-full border",
      done ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-100" : "bg-white/10 border-white/20 text-white/70"
    )}>
      <CheckCircle2 className={cn("h-3 w-3", done ? "text-emerald-400" : "opacity-30")} />
      {label}
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
