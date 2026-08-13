import React, { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  BookOpen, 
  Trash2, 
  Edit3, 
  MoreVertical, 
  FileText,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Download,
  Printer
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MockService } from '@/services/mockService';
import { Notebook, Question } from '@/types';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/dashboard/notebooks')({
  component: NotebooksPage
});

function NotebooksPage() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [disciplineFilter, setDisciplineFilter] = useState<string>('all');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    // Load Notebooks
    const storedNbs = localStorage.getItem('norte_notebooks');
    if (storedNbs) {
      setNotebooks(JSON.parse(storedNbs));
    } else {
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

    // Load All Questions for searching context
    const questions = await MockService.getQuestions();
    setAllQuestions(questions);
    
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
    loadData();
  };

  const handleExportPDF = (notebook: Notebook) => {
    toast.success(`Gerando PDF do caderno: ${notebook.name}`);
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const filteredNotebooks = notebooks.filter(nb => 
    nb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nb.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Meus Cadernos</h1>
          <p className="text-muted-foreground">Organize suas questões favoritas para revisão personalizada.</p>
        </div>
        <Button onClick={handleCreateNotebook} className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Plus className="h-4 w-4" /> Criar Caderno
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por nome ou assunto..." 
            className="pl-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="gap-2 shrink-0">
            <Filter className="h-4 w-4" /> Filtros
          </Button>
          <Badge variant="secondary" className="hidden md:block">
            {filteredNotebooks.length} cadernos
          </Badge>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-40 bg-muted animate-pulse rounded-lg" />)}
        </div>
      ) : filteredNotebooks.length === 0 ? (
        <Card className="border-dashed py-12 flex flex-col items-center justify-center text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-bold">Nenhum caderno encontrado</h3>
          <p className="text-sm text-muted-foreground max-w-[250px] mt-1">
            {searchTerm ? "Tente mudar os termos da busca." : "Crie cadernos para separar questões por temas ou concursos."}
          </p>
          {searchTerm && (
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => setSearchTerm('')}>
              Limpar Busca
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotebooks.map(nb => (
            <Card key={nb.id} className="hover:border-secondary/50 transition-all group shadow-sm hover:shadow-md">
              <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden">
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
                    <DropdownMenuItem className="gap-2" onClick={() => handleExportPDF(nb)}>
                      <Printer className="h-4 w-4" /> Imprimir / PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Edit3 className="h-4 w-4" /> Renomear
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex flex-wrap gap-1 mb-4">
                  <Badge variant="outline" className="text-[9px] uppercase tracking-tighter py-0">
                    Sintaxe
                  </Badge>
                  <Badge variant="outline" className="text-[9px] uppercase tracking-tighter py-0">
                    PF
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    {nb.questionIds.length} questões
                  </span>
                  <Button variant="ghost" size="sm" className="h-8 text-xs font-black uppercase tracking-widest text-secondary hover:text-secondary hover:bg-secondary/10">
                    Estudar
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