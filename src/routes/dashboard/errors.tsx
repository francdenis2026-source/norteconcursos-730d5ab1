import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MockService } from '@/services/mockService';
import { Button } from '@/components/ui/button';
import { Question } from '@/types';
import { AlertCircle, History, Filter, Play, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute('/dashboard/errors')({
  component: ErrorsPage
});

function ErrorsPage() {
  const navigate = useNavigate();
  const [errorQuestions, setErrorQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDiscipline, setFilterDiscipline] = useState('all');
  const [isRevisionMode, setIsRevisionMode] = useState(false);
  const [currentRevisionIndex, setCurrentRevisionIndex] = useState(0);
  const [revisionStatus, setRevisionStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadErrors = async () => {
      const responses = MockService.getUserResponses();
      const errorIds = [...new Set(responses.filter(r => !r.isCorrect).map(r => r.questionId))];
      const allQuestions = await MockService.getQuestions();
      const filtered = allQuestions.filter(q => errorIds.includes(q.id));
      setErrorQuestions(filtered);
      setIsLoading(false);
    };
    loadErrors();
  }, []);

  const filteredQuestions = useMemo(() => {
    if (filterDiscipline === 'all') return errorQuestions;
    return errorQuestions.filter(q => q.disciplineId === filterDiscipline);
  }, [errorQuestions, filterDiscipline]);

  const handleStartRevision = () => {
    if (filteredQuestions.length === 0) {
      toast.error("Nenhuma questão para revisar nesta disciplina");
      return;
    }
    setIsRevisionMode(true);
    setCurrentRevisionIndex(0);
    toast.success("Modo de Revisão Guiada Iniciado");
  };

  const handleUpdateStatus = async (questionId: string, status: string) => {
    setRevisionStatus(prev => ({ ...prev, [questionId]: status }));
    // Persistir no banco aqui via MockService/Supabase
    toast.success(`Status atualizado: ${status}`);
    
    if (isRevisionMode && currentRevisionIndex < filteredQuestions.length - 1) {
      setTimeout(() => setCurrentRevisionIndex(prev => prev + 1), 800);
    }
  };

  if (isLoading) return <div>Carregando...</div>;

  if (isRevisionMode && filteredQuestions[currentRevisionIndex]) {
    const q = filteredQuestions[currentRevisionIndex];
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => setIsRevisionMode(false)}>Voltar</Button>
          <div className="flex items-center gap-2 font-mono text-secondary">
            <Clock className="h-4 w-4 animate-pulse" /> 00:59
          </div>
          <span className="text-sm font-medium">{currentRevisionIndex + 1} / {filteredQuestions.length}</span>
        </div>

        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Revisão: {q.id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed">{q.text}</p>
            <div className="grid grid-cols-1 gap-2 pt-6">
              <Button 
                variant="outline" 
                className="justify-start hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                onClick={() => handleUpdateStatus(q.id, 'dominado')}
              >
                Dominado (Remover do Caderno)
              </Button>
              <Button 
                variant="outline" 
                className="justify-start hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                onClick={() => handleUpdateStatus(q.id, 'revisado')}
              >
                Revisado (Manter para Reforço)
              </Button>
              <Button 
                variant="outline" 
                className="justify-start hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"
                onClick={() => handleUpdateStatus(q.id, 'precisa voltar')}
              >
                Ainda tenho dúvida (Prioridade)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-primary">
          <AlertCircle className="text-destructive h-6 w-6" /> Caderno de Erros
        </h1>
        <div className="flex gap-2">
          <Select value={filterDiscipline} onValueChange={setFilterDiscipline}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Disciplinas</SelectItem>
              <SelectItem value="1">Português</SelectItem>
              <SelectItem value="4">Dir. Constitucional</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleStartRevision}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2"
          >
            <Play className="h-4 w-4" /> Revisão Sequencial
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {filteredQuestions.length > 0 ? filteredQuestions.map(q => (
          <Card key={q.id} className="hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-[10px] font-bold rounded uppercase">
                  Questão com Erro
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                  ID: {q.id}
                </span>
              </div>
              <p className="font-medium mb-4">{q.text}</p>
              <div className="flex justify-between items-center text-sm border-t pt-4">
                <div className="flex gap-4">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <History className="h-3 w-3" /> {q.difficulty}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">Refazer Agora</Button>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="text-center p-12 bg-muted/50 rounded-xl">
            <History className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">Parabéns! Você não possui erros registrados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
