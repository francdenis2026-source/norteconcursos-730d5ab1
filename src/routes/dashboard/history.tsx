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
  const [contests, setContests] = React.useState<Record<string, Contest>>({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true);
      const history = MockService.getUserResponses();
      
      // Carregar concursos para exibir nomes
      const allContests = await MockService.getContests();
      const contestMap = allContests.reduce((acc, c) => {
        acc[c.id] = c;
        return acc;
      }, {} as Record<string, Contest>);
      
      setResponses(history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setContests(contestMap);
      setIsLoading(false);
    };

    loadHistory();
  }, []);

  if (isLoading) return <div className="p-8">Carregando histórico...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Respostas</h1>
        <p className="text-muted-foreground">Visualize seu progresso e revise suas respostas anteriores.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Minhas Tentativas
          </CardTitle>
          <CardDescription>
            Total de {responses.length} questões respondidas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Questão / Concurso</TableHead>
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
                  responses.map((resp, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(resp.createdAt).toLocaleDateString()} {new Date(resp.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium line-clamp-1">Questão #{resp.questionId.substring(0, 8)}</span>
                          <span className="text-[10px] text-muted-foreground uppercase">
                             Local / Simulado
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {resp.isCorrect ? (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Correto
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="bg-rose-100 text-rose-800 hover:bg-rose-100 gap-1">
                            <XCircle className="h-3 w-3" /> Incorreto
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-xs font-mono">
                        {resp.timeSpent}s
                      </TableCell>
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