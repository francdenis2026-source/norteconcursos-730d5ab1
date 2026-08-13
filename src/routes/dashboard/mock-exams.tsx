import { createFileRoute } from '@tanstack/react-router';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Clock, Trophy, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { MockService } from '@/services/mockService';
import { useAuthStatus } from '@/hooks/useDashboard';
import { checkFeatureAccess } from '@/lib/subscriptions.config';
import { Link } from '@tanstack/react-router';


export const Route = createFileRoute('/dashboard/mock-exams')({
  component: MockExamsPage
});

function MockExamsPage() {
  const { user } = useAuthStatus();
  const [isExamActive, setIsExamActive] = useState(false);
  const [examStartTime, setExamStartTime] = useState<number | null>(null);
  
  const featureAccess = checkFeatureAccess(user?.role || 'free', 'mockExams');


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
        ) : featureAccess.included ? (
          <Button onClick={startExam} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <PlayCircle className="mr-2 h-4 w-4" /> Iniciar Novo Simulado
          </Button>
        ) : (
          <Button disabled className="bg-muted text-muted-foreground">
            <Lock className="mr-2 h-4 w-4" /> Simulado Bloqueado
          </Button>
        )}
      </div>

      {!featureAccess.included && (
        <Card className="bg-secondary/5 border-secondary/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-full">
                <Lock className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Funcionalidade Exclusiva</h3>
                <p className="text-sm text-muted-foreground">
                  Simulados completos estão disponíveis apenas nos planos <strong>Essencial, Plus e Premium</strong>.
                </p>
              </div>
            </div>
            <Button asChild variant="secondary">
              <Link to="/dashboard/profile">Ver Planos</Link>
            </Button>
          </CardContent>
        </Card>
      )}


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
