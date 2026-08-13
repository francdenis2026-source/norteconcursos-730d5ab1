import { createFileRoute } from '@tanstack/react-router';
import { useDashboardData } from '@/hooks/useDashboard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Calendar, 
  Trophy, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/dashboard/my-contest')({
  component: MyContestPage
});

function MyContestPage() {
  const { focusedContest, isLoading } = useDashboardData();

  if (isLoading) return <div className="p-8">Carregando...</div>;

  if (!focusedContest) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <Target className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="text-xl font-bold">Nenhum concurso em foco</h2>
        <p className="text-muted-foreground max-w-md">
          Selecione um concurso no catálogo para acompanhar seu progresso detalhado.
        </p>
        <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <a href="/dashboard/questions">Ir para Catálogo</a>
        </Button>
      </div>
    );
  }

  const daysToExam = focusedContest.examDate 
    ? Math.ceil((new Date(focusedContest.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{focusedContest.agency}</h1>
          <p className="text-muted-foreground">{focusedContest.role} • {focusedContest.examBoard}</p>
        </div>
        {daysToExam !== null && (
          <div className={cn(
            "px-4 py-2 rounded-lg border-2 flex items-center gap-3",
            daysToExam < 30 ? "border-rose-500 bg-rose-50 text-rose-700" : "border-secondary bg-secondary/5 text-secondary"
          )}>
            <Calendar className="h-5 w-5" />
            <div>
              <p className="text-[10px] uppercase font-bold leading-tight">Dias para a Prova</p>
              <p className="text-xl font-black leading-tight">{daysToExam}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Edital Verticalizado
            </CardTitle>
            <CardDescription>Acompanhe a cobertura dos temas exigidos no edital.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Progresso Geral</span>
                <span className="font-bold">34%</span>
              </div>
              <Progress value={34} className="h-2" />
            </div>

            <div className="space-y-3">
              {['Língua Portuguesa', 'Direito Constitucional', 'Direito Administrativo', 'Informática'].map((topic, i) => {
                const status = ['Lido', 'Resumido', 'Revisado', 'Não Iniciado'][i];
                return (
                  <div key={topic} className="flex items-center gap-2">
                    <span className="text-sm flex-1">{topic}</span>
                    <Badge variant={status === 'Lido' ? 'default' : 'outline'}>{status}</Badge>
                    <Progress value={[65, 42, 15, 0][i]} className="h-1.5 w-20" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Análise de Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Média de Acertos</span>
                </div>
                <span className="font-bold">72.4%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Tempo p/ Questão</span>
                </div>
                <span className="font-bold">1m 12s</span>
              </div>
              <div className="p-3 border border-amber-200 bg-amber-50 rounded-lg flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-[11px] text-amber-800">
                  Sua performance em <strong>Informática</strong> está abaixo da meta (60%). Recomendamos priorizar este tema na próxima semana.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="h-4 w-4 text-gold" />
                Dicas do Mentor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs opacity-90 leading-relaxed italic">
                "Foque em simulados nesta reta final. A banca {focusedContest.examBoard} costuma repetir padrões de enunciados em {focusedContest.role}."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DisciplineProgress({ name, progress }: { name: string, progress: number }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border group hover:border-secondary transition-colors cursor-pointer">
      <div className="flex flex-col gap-1 flex-1 mr-4">
        <span className="text-sm font-bold">{name}</span>
        <Progress value={progress} className="h-1.5" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-muted-foreground">{progress}%</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary" />
      </div>
    </div>
  );
}
