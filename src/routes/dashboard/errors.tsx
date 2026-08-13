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

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <AlertCircle className="text-destructive" /> Caderno de Erros
      </h1>
      
      <div className="grid gap-4">
        {errorQuestions.length > 0 ? errorQuestions.map(q => (
          <Card key={q.id}>
            <CardContent className="pt-6">
              <p className="font-medium mb-4">{q.text}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{q.difficulty}</span>
                <Button variant="outline" size="sm">Tentar Novamente</Button>
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
