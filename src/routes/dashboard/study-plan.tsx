import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, BookOpen, CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/dashboard/study-plan')({
  component: StudyPlanPage
});

const WEEK_DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

function StudyPlanPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Plano de Estudos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {WEEK_DAYS.map((day, idx) => (
          <Card key={day} className={idx === new Date().getDay() ? 'border-secondary bg-secondary/5' : ''}>
            <CardHeader className="p-3">
              <CardTitle className="text-xs uppercase tracking-wider">{day}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-2">
                <div className="p-2 bg-primary/5 rounded border text-[10px]">
                  <span className="font-bold block mb-1">08:00 - 10:00</span>
                  Português
                </div>
                <div className="p-2 bg-primary/5 rounded border text-[10px]">
                  <span className="font-bold block mb-1">10:30 - 12:30</span>
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
