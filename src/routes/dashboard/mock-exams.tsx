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

  const startExam = () => {
    setIsExamActive(true);
    toast.info("Simulado iniciado! Você tem 4 horas.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Simulados</h1>
        {!isExamActive && (
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
