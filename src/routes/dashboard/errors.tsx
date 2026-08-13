import { createFileRoute } from '@tanstack/react-router';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MockService } from '@/services/mockService';
import { Button } from '@/components/ui/button';
import { Question } from '@/types';
import { AlertCircle, History, Filter, Play } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute('/dashboard/errors')({
  component: ErrorsPage
});

function ErrorsPage() {
  const [errorQuestions, setErrorQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDiscipline, setFilterDiscipline] = useState('all');

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

  if (isLoading) return <div>Carregando...</div>;

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
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
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
