import { createFileRoute } from '@tanstack/react-router';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Clock, Trophy } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/dashboard/mock-exams')({
  component: MockExamsPage
});

function MockExamsPage() {
  const [isExamActive, setIsExamActive] = useState(false);
  const [examStartTime, setExamStartTime] = useState<number | null>(null);

  const startExam = () => {
    setIsExamActive(true);
    setExamStartTime(Date.now());
    toast.info("Simulado iniciado! Você tem 4 horas.");
  };

  const finishExam = async () => {
    if (!examStartTime) return;
    const duration = Math.floor((Date.now() - examStartTime) / 1000);
    
    // Simulação de resultado
    const result = {
      total: 50,
      correct: 38,
      duration
    };

    await MockService.saveResponse({
      questionId: 'mock-exam-' + Date.now(),
      isCorrect: true, // Simulado simplificado
      timeSpent: duration,
      createdAt: new Date().toISOString()
    });

    setIsExamActive(false);
    toast.success(`Simulado concluído! Acertos: ${result.correct}/${result.total}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Simulados</h1>
        {isExamActive ? (
          <div className="flex gap-2">
             <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 text-destructive rounded-md text-sm font-bold animate-pulse">
              <Clock className="h-4 w-4" /> 03:59:45
            </div>
            <Button onClick={finishExam} variant="destructive">
              Finalizar Agora
            </Button>
          </div>
        ) : (
          <Button onClick={startExam} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <PlayCircle className="mr-2 h-4 w-4" /> Iniciar Novo Simulado
          </Button>
        )}
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Simulados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
              <Trophy className="h-12 w-12 mb-4 opacity-20" />
              <p>Você ainda não completou nenhum simulado.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
