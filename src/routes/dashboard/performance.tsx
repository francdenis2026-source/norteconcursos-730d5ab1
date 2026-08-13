import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import { useDashboardData } from '@/hooks/useDashboard';
import { Button } from '@/components/ui/button';
import { Download, FileText, Target, TrendingUp, Filter, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { MockService } from '@/services/mockService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute('/dashboard/performance')({
  component: PerformancePage
});

function PerformancePage() {
  const { stats, contests, isLoading } = useDashboardData();
  const [selectedContest, setSelectedContest] = useState('all');
  const [timeRange, setTimeRange] = useState('weekly');

  if (isLoading) return <div>Carregando...</div>;

  const filteredByContest = selectedContest === 'all' 
    ? stats?.byDiscipline 
    : stats?.byDiscipline; // In a real app, this would filter by contestId in the query

  const disciplineData = filteredByContest?.map(d => ({
    name: d.disciplineId === '1' ? 'Português' : 
          d.disciplineId === '4' ? 'Constitucional' : 'Outras',
    acertos: d.correct,
    total: d.total,
    previous: Math.floor(d.correct * 0.8) // Simulated comparison data
  })) || [];

  const handleExportCSV = () => {
    const responses = MockService.getUserResponses();
    if (responses.length === 0) {
      toast.error("Nenhum dado para exportar");
      return;
    }

    const contestLabel = selectedContest === 'all' ? 'Geral' : contests.find(c => c.id === selectedContest)?.agency || 'Concurso';
    const periodLabel = timeRange === 'weekly' ? 'Semanal' : timeRange === 'monthly' ? 'Mensal' : 'Anual';

    const headers = ["Concurso", "Período", "Disciplina", "Acertos", "Total", "Tendência"];
    const csvContent = [
      headers.join(","),
      ...disciplineData.map(d => [
        contestLabel,
        periodLabel,
        d.name,
        d.acertos,
        d.total,
        d.previous > 0 ? (((d.acertos - d.previous) / d.previous) * 100).toFixed(1) + "%" : "N/A"
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `relatorio_norte_${contestLabel}_${periodLabel}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Relatório consolidado exportado com sucesso!");
  };

  const handleExportPDF = () => {
    toast.info("Gerando relatório consolidado com gráficos e variações...");
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const checkGoals = () => {
    const laggingDiscipline = disciplineData.find(d => d.total > 0 && d.acertos < d.previous);
    if (laggingDiscipline) {
      toast.warning(`Alerta de Meta: Você está com desempenho inferior em ${laggingDiscipline.name} comparado ao período anterior.`, {
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (!isLoading && disciplineData.length > 0) {
      const timer = setTimeout(checkGoals, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, selectedContest]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Análise de Desempenho</h1>
        <div className="flex gap-2 no-print">
          <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-2">
            <FileText className="h-4 w-4" /> CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF} className="gap-2">
            <Download className="h-4 w-4" /> PDF
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 no-print mb-6">
        <div className="flex-1 flex gap-2">
          <Select value={selectedContest} onValueChange={setSelectedContest}>
            <SelectTrigger className="w-full md:w-[280px]">
              <Target className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por Concurso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Concursos</SelectItem>
              {contests.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.agency} - {c.role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Acertos por Disciplina</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={disciplineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="acertos" name="Período Atual" fill="oklch(0.45 0.15 150)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="previous" name="Período Anterior" fill="oklch(0.7 0.1 150)" radius={[4, 4, 0, 0]} opacity={0.5} />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução Temporal</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <p className="text-muted-foreground text-sm italic">Simule a resolução de mais questões para ver sua evolução.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Metas por Disciplina</CardTitle>
            <Button variant="ghost" size="sm" className="text-secondary gap-1">
              <TrendingUp className="h-4 w-4" /> Definir Metas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disciplineData.map(d => (
              <div key={d.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{d.name}</span>
                  <span className="text-muted-foreground">Progresso: {d.total > 0 ? ((d.acertos / d.total) * 100).toFixed(0) : 0}% / Meta: 85%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary transition-all" 
                    style={{ width: `${Math.min(d.total > 0 ? (d.acertos / d.total) * 100 : 0, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
