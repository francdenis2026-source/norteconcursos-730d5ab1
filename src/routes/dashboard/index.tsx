import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";
import { Target, Clock, CheckCircle2, AlertCircle, TrendingUp, Zap } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/button";
import { DataService } from "@/services/dataService";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { stats, focusedContest, isLoading, refreshStats } = useDashboardData();

  if (isLoading) return <div>Carregando...</div>;

  const handleLoadDemo = async () => {
    if (DataService.isRemote) return;
    // Simulate loading demo data
    await DataService.saveResponse({
      questionId: "q1",
      isCorrect: true,
      timeSpent: 45,
      createdAt: new Date().toISOString(),
    });
    await DataService.saveResponse({
      questionId: "q2",
      isCorrect: false,
      timeSpent: 60,
      createdAt: new Date().toISOString(),
    });
    refreshStats();
  };

  const chartData =
    stats?.byDiscipline.map((d) => ({
      name:
        d.disciplineId === "1" ? "Português" : d.disciplineId === "4" ? "Constitucional" : "Outras",
      acertos: d.correct,
      total: d.total,
    })) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Olá, João Silva</h1>
          <p className="text-muted-foreground">Bem-vindo ao seu ambiente de estudos.</p>
        </div>
        <div className="flex items-center gap-2">
          {!DataService.isRemote && (
            <Button variant="outline" size="sm" onClick={handleLoadDemo}>
              Carregar demonstração
            </Button>
          )}
          <Button
            size="sm"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Meta Semanal: 65%
          </Button>
        </div>
      </div>

      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Foco Atual"
          value={focusedContest?.agency || "Não definido"}
          icon={Target}
          description={focusedContest?.role || "Selecione um concurso"}
        />
        <MetricCard
          title="Tempo Estudado"
          value={`${Math.floor((stats?.timeSpent || 0) / 60)}m`}
          icon={Clock}
          description="Efetivo hoje"
        />
        <MetricCard
          title="Taxa de Acerto"
          value={`${stats?.accuracyRate.toFixed(1) || 0}%`}
          icon={CheckCircle2}
          description="Geral acumulada"
        />
        <MetricCard
          title="Questões"
          value={stats?.totalQuestions || 0}
          icon={Zap}
          description="Respondidas"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Desempenho */}
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
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                  <Bar
                    dataKey="acertos"
                    name="Acertos"
                    fill="oklch(0.45 0.15 150)"
                    radius={[4, 4, 0, 0]}
                  />
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

        {/* Próximas Atividades */}
        <Card>
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
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: ReactNode;
  icon: LucideIcon;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-secondary" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-primary">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({
  title,
  type,
  time,
  status,
  priority = false,
}: {
  title: string;
  type: string;
  time: string;
  status: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border bg-card",
        priority ? "border-l-4 border-l-secondary" : "",
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold">{title}</span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="px-1.5 py-0.5 rounded bg-muted font-medium">{type}</span>
          <span>{time}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="h-8 text-xs">
        {status === "Pendente" ? "Iniciar" : status}
      </Button>
    </div>
  );
}
