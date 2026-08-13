import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { useDashboardData } from '@/hooks/useDashboard';

export const Route = createFileRoute('/dashboard/performance')({
  component: PerformancePage
});

function PerformancePage() {
  const { stats, isLoading } = useDashboardData();

  if (isLoading) return <div>Carregando...</div>;

  const disciplineData = stats?.byDiscipline.map(d => ({
    name: d.disciplineId === '1' ? 'Português' : 
          d.disciplineId === '4' ? 'Constitucional' : 'Outras',
    acertos: d.correct,
    total: d.total
  })) || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Análise de Desempenho</h1>
      
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
                <Bar dataKey="acertos" fill="oklch(0.45 0.15 150)" radius={[4, 4, 0, 0]} />
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
    </div>
  );
}
