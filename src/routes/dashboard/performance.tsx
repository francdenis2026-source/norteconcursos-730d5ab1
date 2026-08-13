import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, Legend,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { useDashboardData, useAuthStatus } from '@/hooks/useDashboard';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  FileText, 
  Target, 
  TrendingUp, 
  Filter, 
  Calendar,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { MockService } from '@/services/mockService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Route = createFileRoute('/dashboard/performance')({
  component: PerformancePage
});

function PerformancePage() {
  const { stats, contests, isLoading } = useDashboardData();
  const { user } = useAuthStatus();
  const [selectedContest, setSelectedContest] = useState('all');
  const [timeRange, setTimeRange] = useState('monthly');

  if (isLoading) return <div className="p-8">Carregando...</div>;

  const monthlyEvolution = [
    { month: 'Jan', acertos: 45, total: 100 },
    { month: 'Fev', acertos: 52, total: 100 },
    { month: 'Mar', acertos: 61, total: 100 },
    { month: 'Abr', acertos: 58, total: 100 },
    { month: 'Mai', acertos: 74, total: 100 },
    { month: 'Jun', acertos: 72, total: 100 },
  ];

  const disciplineData = stats?.byDiscipline.map(d => ({
    name: d.disciplineId === '1' ? 'Português' : 
          d.disciplineId === '4' ? 'Constitucional' : 
          d.disciplineId === '5' ? 'Administrativo' : 'Outras',
    acertos: d.correct,
    total: d.total,
    previous: Math.floor(d.correct * 0.8)
  })) || [];

  const handleExportPDF = () => {
    toast.success("Gerando Relatório Mensal consolidado em PDF...");
    setTimeout(() => {
      window.print();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Relatório de Performance</h1>
          <p className="text-muted-foreground text-sm">Acompanhe sua evolução mensal e metas de estudo.</p>
        </div>
        <div className="flex gap-2 no-print">
          <Button variant="outline" size="sm" onClick={() => toast.success("Exportando CSV...")} className="gap-2">
            <FileText className="h-4 w-4" /> CSV
          </Button>
          <Button onClick={handleExportPDF} size="sm" className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Download className="h-4 w-4" /> Relatório PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 no-print">
        <Select value={selectedContest} onValueChange={setSelectedContest}>
          <SelectTrigger>
            <Target className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por Concurso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Geral (Todos)</SelectItem>
            {contests.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.agency}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger>
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Última Semana</SelectItem>
            <SelectItem value="monthly">Último Mês</SelectItem>
            <SelectItem value="yearly">Este Ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="evolution" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="evolution">Evolução Mensal</TabsTrigger>
          <TabsTrigger value="disciplines">Por Disciplina</TabsTrigger>
          <TabsTrigger value="goals">Metas e Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="evolution" className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Evolução de Acertos (%)
              </CardTitle>
              <CardDescription>Comparativo mensal do seu desempenho geral.</CardDescription>
            </CardHeader>
            <CardContent className="h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyEvolution}>
                  <defs>
                    <linearGradient id="colorAcertos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.7 0.1 150)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="oklch(0.7 0.1 150)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} unit="%" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="acertos" 
                    stroke="oklch(0.45 0.15 150)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorAcertos)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disciplines">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Precisão por Matéria</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={disciplineData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="acertos" name="Acertos" fill="oklch(0.45 0.15 150)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribuição de Estudo</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={disciplineData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="total"
                    >
                      {disciplineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#1E293B', '#10B981', '#F59E0B', '#64748B'][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Tendência e Metas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {disciplineData.map(d => (
                  <div key={d.name} className="space-y-2">
                    <div className="flex justify-between text-sm items-center">
                      <span className="font-bold">{d.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">Atual: {d.acertos} / Meta: 85</span>
                        {d.acertos >= d.previous ? (
                          <ChevronUp className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-rose-500" />
                        )}
                      </div>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-secondary" 
                        style={{ width: `${Math.min((d.acertos/85)*100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-gold" />
                  Insight da IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm opacity-90 leading-relaxed">
                  "Você teve um salto de <strong>12%</strong> em Direito Constitucional este mês. No entanto, seu ritmo em Português caiu. Foque em revisões de 15 min de Sintaxe antes de iniciar novas matérias."
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Status: Evoluindo</span>
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}