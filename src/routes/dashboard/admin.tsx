import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MockService } from '@/services/mockService';
import { Contest, Question } from '@/types';
import { toast } from 'sonner';

export const Route = createFileRoute('/dashboard/admin')({
  component: AdminPanel,
  head: () => ({
    title: 'Painel Administrativo | Norte Concurso',
  })
});

function AdminPanel() {
  const [contests, setContests] = React.useState<Contest[]>([]);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  const loadData = async () => {
    setIsLoading(true);
    const [c, q] = await Promise.all([
      MockService.getContests(),
      MockService.getQuestions()
    ]);
    setContests(c);
    setQuestions(q);
    setIsLoading(false);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleDeleteContest = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este concurso?')) return;
    const success = await MockService.deleteContest(id);
    if (success) {
      toast.success('Concurso excluído com sucesso');
      loadData();
    } else {
      toast.error('Erro ao excluir concurso');
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta questão?')) return;
    const success = await MockService.deleteQuestion(id);
    if (success) {
      toast.success('Questão excluída com sucesso');
      loadData();
    } else {
      toast.error('Erro ao excluir questão');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie os concursos e questões da plataforma.</p>
        </div>
      </div>

      <Tabs defaultValue="contests" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="contests">Concursos</TabsTrigger>
          <TabsTrigger value="questions">Questões</TabsTrigger>
        </TabsList>

        <TabsContent value="contests" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Concursos Cadastrados</CardTitle>
                <CardDescription>Visualize e gerencie todos os concursos disponíveis.</CardDescription>
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Novo Concurso
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar concurso..." className="pl-9" />
                </div>
              </div>
              
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Órgão / Nome</TableHead>
                      <TableHead>Banca</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Vagas</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Nenhum concurso encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      contests.map((contest) => (
                        <TableRow key={contest.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{contest.agency}</span>
                              <span className="text-xs text-muted-foreground">{contest.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{contest.examBoard}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                              {contest.status}
                            </span>
                          </TableCell>
                          <TableCell>{contest.vacancies}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteContest(contest.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
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
        </TabsContent>

        <TabsContent value="questions" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Banco de Questões</CardTitle>
                <CardDescription>Crie e edite o banco de dados de questões da plataforma.</CardDescription>
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Nova Questão
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por texto da questão..." className="pl-9" />
                </div>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">Enunciado</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Dificuldade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          Nenhuma questão encontrada.
                        </TableCell>
                      </TableRow>
                    ) : (
                      questions.slice(0, 10).map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="max-w-[400px]">
                            <p className="truncate text-sm" title={question.text}>{question.text}</p>
                          </TableCell>
                          <TableCell>{question.type}</TableCell>
                          <TableCell>
                             <span className={cn(
                               "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                               question.difficulty === 'Fácil' ? "bg-emerald-100 text-emerald-800" :
                               question.difficulty === 'Média' ? "bg-amber-100 text-amber-800" :
                               "bg-rose-100 text-rose-800"
                             )}>
                              {question.difficulty}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDeleteQuestion(question.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {questions.length > 10 && (
                  <div className="p-4 text-center border-t text-sm text-muted-foreground">
                    Exibindo as 10 primeiras questões de {questions.length} totais.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
