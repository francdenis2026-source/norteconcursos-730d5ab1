import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  BookOpen, 
  GraduationCap,
  ShieldCheck,
  Settings,
  CreditCard,
  History,
  UserCheck,
  FileText
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
    meta: [{ title: 'Painel Administrativo | Norte Concurso' }],
  })
});


import { useAuthStatus } from '@/hooks/useDashboard';

function AdminPanel() {
  const { user } = useAuthStatus();
  const [contests, setContests] = React.useState<Contest[]>([]);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = React.useState<any[]>([]);
  const [auditLogs, setAuditLogs] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // States for Edit Modal
  const [editingContest, setEditingContest] = React.useState<Contest | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const loadData = async () => {
    setIsLoading(true);
    const [c, q, p, logs] = await Promise.all([
      MockService.getContests(),
      MockService.getQuestions(),
      (MockService as any).getSubscriptionPlans?.() || [],
      (MockService as any).getAdminAuditLogs?.() || []
    ]);
    setContests(c);
    setQuestions(q);
    setSubscriptionPlans(p);
    setAuditLogs(logs);
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

  const handleEditContest = (contest: Contest) => {
    setEditingContest({ ...contest });
    setIsEditModalOpen(true);
  };

  const handleSaveContest = async () => {
    if (!editingContest) return;
    setIsSaving(true);
    const success = await MockService.updateContest(editingContest.id, editingContest);
    if (success) {
      toast.success('Concurso atualizado com sucesso');
      setIsEditModalOpen(false);
      loadData();
    } else {
      toast.error('Erro ao atualizar concurso');
    }
    setIsSaving(false);
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
        <TabsList className="grid w-full max-w-3xl grid-cols-4">
          <TabsTrigger value="contests">Concursos</TabsTrigger>
          <TabsTrigger value="questions">Questões</TabsTrigger>
          <TabsTrigger value="subscriptions">Planos</TabsTrigger>
          <TabsTrigger value="audit">Histórico/Auditoria</TabsTrigger>
        </TabsList>

        <TabsContent value="contests" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Concursos Cadastrados</CardTitle>
                <CardDescription>Visualize e gerencie todos os concursos disponíveis.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2" onClick={() => document.getElementById('csv-import')?.click()}>
                  <FileText className="h-4 w-4" /> Importar Questões (CSV)
                  <input 
                    id="csv-import" 
                    type="file" 
                    accept=".csv" 
                    className="hidden" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      toast.info("Processando arquivo CSV...");
                      // Simulação de processamento
                      setTimeout(() => {
                        toast.success("50 questões importadas com sucesso!");
                        loadData();
                      }, 1500);
                    }}
                  />
                </Button>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> Novo Concurso
                </Button>
              </div>
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
                      <TableHead>Período</TableHead>
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
                          <TableCell className="text-xs">
                            {contest.startDate ? new Date(contest.startDate).toLocaleDateString() : '∞'} - 
                            {contest.endDate ? new Date(contest.endDate).toLocaleDateString() : '∞'}
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
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleEditContest(contest)}
                              >
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

        <TabsContent value="subscriptions" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Gestão de Planos e Entitlements
              </CardTitle>
              <CardDescription>
                Gerencie os valores, limites e funcionalidades de cada nível de assinatura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plano</TableHead>
                      <TableHead>Preço (R$)</TableHead>
                      <TableHead>Funcionalidades (JSON)</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptionPlans.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          {isLoading ? 'Carregando planos do banco...' : 'Configuração de planos apenas via banco de dados.'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      subscriptionPlans.map((plan) => (
                        <TableRow key={plan.id}>
                          <TableCell className="font-bold uppercase">{plan.id}</TableCell>
                          <TableCell>
                            <Input 
                              type="number" 
                              className="w-24" 
                              defaultValue={plan.price} 
                              onBlur={async (e) => {
                                const val = parseFloat(e.target.value);
                                await (MockService as any).updateSubscriptionPlan(plan.id, { price: val }, user?.id);
                                toast.success(`Preço do plano ${plan.id} atualizado`);
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[400px]">
                              <code className="text-[10px] block p-2 bg-muted rounded truncate">
                                {JSON.stringify(plan.features)}
                              </code>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="gap-2">
                              <Settings className="h-4 w-4" /> Detalhes
                            </Button>
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

        <TabsContent value="audit" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Logs de Auditoria
              </CardTitle>
              <CardDescription>
                Histórico completo de alterações realizadas por administradores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Ação</TableHead>
                      <TableHead>Entidade</TableHead>
                      <TableHead>Mudanças</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Nenhum log de auditoria encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      auditLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-xs whitespace-nowrap">
                            {new Date(log.created_at).toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{log.admin?.full_name || 'Admin'}</span>
                              <span className="text-[10px] text-muted-foreground">{log.admin?.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">
                              {log.action}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs">
                            {log.entity_type}: {log.entity_id}
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[300px]">
                              <code className="text-[10px] block p-2 bg-muted rounded truncate" title={JSON.stringify(log.new_values)}>
                                {JSON.stringify(log.new_values)}
                              </code>
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
      </Tabs>

      {/* Edit Contest Modal */}
      {isEditModalOpen && editingContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader>
              <CardTitle>Editar Período do Concurso</CardTitle>
              <CardDescription>
                {editingContest.agency} - {editingContest.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data de Início</label>
                  <Input 
                    type="date" 
                    value={editingContest.startDate ? editingContest.startDate.split('T')[0] : ''} 
                    onChange={(e) => setEditingContest({...editingContest, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data de Fim</label>
                  <Input 
                    type="date" 
                    value={editingContest.endDate ? editingContest.endDate.split('T')[0] : ''} 
                    onChange={(e) => setEditingContest({...editingContest, endDate: e.target.value})}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                * Concursos fora deste período não serão exibidos para os alunos.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
                <Button onClick={handleSaveContest} disabled={isSaving}>
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
