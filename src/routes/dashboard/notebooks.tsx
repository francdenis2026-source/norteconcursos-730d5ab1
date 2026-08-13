import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Trash2, Edit3, MoreVertical, FileText } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MockService } from '@/services/mockService';
import { Notebook } from '@/types';
import { toast } from 'sonner';

export const Route = createFileRoute('/dashboard/notebooks')({
  component: NotebooksPage
});

function NotebooksPage() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotebooks();
  }, []);

  const loadNotebooks = async () => {
    setIsLoading(true);
    // Simulação ou busca do service
    const stored = localStorage.getItem('norte_notebooks');
    if (stored) {
      setNotebooks(JSON.parse(stored));
    } else {
      // Mock inicial
      const initial: Notebook[] = [
        {
          id: 'nb-1',
          name: 'Revisão Português - Sintaxe',
          description: 'Questões focadas em análise sintática para o concurso da PF',
          questionIds: ['q1', 'q3', 'q5'],
          createdAt: new Date().toISOString()
        }
      ];
      setNotebooks(initial);
      localStorage.setItem('norte_notebooks', JSON.stringify(initial));
    }
    setIsLoading(false);
  };

  const handleCreateNotebook = () => {
    const newNb: Notebook = {
      id: 'nb-' + Date.now(),
      name: 'Novo Caderno',
      description: 'Descrição do caderno',
      questionIds: [],
      createdAt: new Date().toISOString()
    };
    const updated = [...notebooks, newNb];
    setNotebooks(updated);
    localStorage.setItem('norte_notebooks', JSON.stringify(updated));
    toast.success("Caderno criado com sucesso!");
  };

  const handleDelete = (id: string) => {
    const updated = notebooks.filter(n => n.id !== id);
    setNotebooks(updated);
    localStorage.setItem('norte_notebooks', JSON.stringify(updated));
    toast.success("Caderno excluído.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Meus Cadernos</h1>
          <p className="text-muted-foreground">Organize suas questões favoritas para revisão.</p>
        </div>
        <Button onClick={handleCreateNotebook} className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Plus className="h-4 w-4" /> Criar Caderno
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />)}
        </div>
      ) : notebooks.length === 0 ? (
        <Card className="border-dashed py-12 flex flex-col items-center justify-center text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-bold">Nenhum caderno ainda</h3>
          <p className="text-sm text-muted-foreground max-w-[250px] mt-1">
            Crie cadernos para separar questões por temas ou concursos.
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={handleCreateNotebook}>
            Começar Agora
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notebooks.map(nb => (
            <Card key={nb.id} className="hover:border-secondary/50 transition-colors group">
              <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base truncate max-w-[150px]">{nb.name}</CardTitle>
                    <CardDescription className="text-xs line-clamp-1">{nb.description}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Edit3 className="h-4 w-4" /> Renomear
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="gap-2 text-destructive focus:text-destructive" 
                      onClick={() => handleDelete(nb.id)}
                    >
                      <Trash2 className="h-4 w-4" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-muted-foreground">
                    {nb.questionIds.length} questões
                  </span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs font-bold hover:text-secondary group-hover:bg-secondary/10">
                    Estudar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}