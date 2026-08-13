import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, BookOpen, CheckCircle, GripVertical, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/dashboard/study-plan')({
  component: StudyPlanPage
});

const WEEK_DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

function StudyPlanPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">Plano de Estudos</h1>
        <Button variant="outline" size="sm" className="text-secondary border-secondary/50 gap-2 bg-secondary/5">
          <Sparkles className="h-4 w-4" /> Gerar Recomendações (IA)
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {WEEK_DAYS.map((day, idx) => (
          <Card key={day} className={idx === new Date().getDay() ? 'border-secondary bg-secondary/5' : ''}>
            <CardHeader className="p-3">
              <CardTitle className="text-xs uppercase tracking-wider">{day}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-2">
                <div className="p-2 bg-primary/5 rounded border text-[10px] group cursor-grab active:cursor-grabbing hover:border-secondary/50 transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold">08:00 - 10:00</span>
                    <GripVertical className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  Português
                </div>
                <div className="p-2 bg-primary/5 rounded border text-[10px] group cursor-grab active:cursor-grabbing hover:border-secondary/50 transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold">10:30 - 12:30</span>
                    <GripVertical className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  Constitucional
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
