import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MockService } from '@/services/mockService';
import { UserResponse, Contest } from '@/types';
import { CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react';

export const Route = createFileRoute('/dashboard/history')({
  component: HistoryPage,
  head: () => ({
    meta: [{ title: 'Histórico de Respostas | Norte Concurso' }],
  })
});

function HistoryPage() {
  const [responses, setResponses] = React.useState<UserResponse[]>([]);
  const [examHistory, setExamHistory] = React.useState<any[]>([]);
  const [ranking, setRanking] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = useAuthStatus();

  React.useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true);
      const [history, exams, rank] = await Promise.all([
        MockService.getUserResponses(),
        MockService.getMockExams(),
        MockService.getMockExamRanking()
      ]);
      
      setResponses(history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setExamHistory(exams.sort((a, b) => new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime()));
      setRanking(rank);
      setIsLoading(false);
    };

    loadHistory();
  }, []);

  if (isLoading) return <div className="p-8">Carregando histórico...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Estudos</h1>
        <p className="text-muted-foreground">Acompanhe sua evolução, tentativas em simulados e posição no ranking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Histórico de Simulados
            </CardTitle>
            <CardDescription>Suas tentativas completas e pontuações consolidadas.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Simulado</TableHead>
                    <TableHead>Acertos</TableHead>
                    <TableHead>Desempenho</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Nenhum simulado realizado ainda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    examHistory.map((exam, idx) => (
                      <TableRow key={exam.id || idx}>
                        <TableCell className="text-xs">
                          {new Date(exam.finishedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium text-sm">
                          Simulado #{exam.id?.substring(0, 6) || idx + 1}
                        </TableCell>
                        <TableCell className="font-bold text-secondary">
                          {exam.correct}/{exam.total}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-secondary" 
                                style={{ width: `${(exam.correct / exam.total) * 100}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-bold">
                              {Math.round((exam.correct / exam.total) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-gold">
              <Trophy className="h-5 w-5" />
              Seu Ranking Histórico
            </CardTitle>
            <CardDescription>Posição em relação a outros estudantes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ranking.map((item, idx) => (
                <div key={item.id} className={cn(
                  "flex items-center justify-between p-2 rounded-lg text-sm",
                  item.id === user?.id ? "bg-secondary/10 border border-secondary" : "hover:bg-muted/50"
                )}>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold",
                      idx === 0 ? "bg-gold text-white" : "bg-muted text-muted-foreground"
                    )}>
                      {idx + 1}
                    </span>
                    <span className="font-medium truncate max-w-[100px]">{item.name}</span>
                  </div>
                  <span className="font-black text-secondary">{item.score}/{item.total}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Minhas Respostas Recentes
          </CardTitle>
          <CardDescription>
            Últimas {responses.length} questões resolvidas individualmente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Questão</TableHead>
                  <TableHead>Resultado</TableHead>
                  <TableHead>Tempo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Você ainda não respondeu nenhuma questão.
                    </TableCell>
                  </TableRow>
                ) : (
                  responses.slice(0, 20).map((resp, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs whitespace-nowrap">
                        {new Date(resp.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-medium">#{resp.questionId.substring(0, 8)}</span>
                      </TableCell>
                      <TableCell>
                        {resp.isCorrect ? (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-[10px] h-5">Correto</Badge>
                        ) : (
                          <Badge variant="destructive" className="bg-rose-100 text-rose-800 text-[10px] h-5">Erro</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-xs font-mono">{resp.timeSpent}s</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}