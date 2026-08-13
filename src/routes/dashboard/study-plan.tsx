import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Calendar as CalendarIcon, 
  BookOpen, 
  CheckCircle, 
  GripVertical, 
  Sparkles, 
  Info, 
  Settings2,
  Lock,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStatus } from '@/hooks/useDashboard';
import { checkFeatureAccess } from '@/lib/subscriptions.config';

export const Route = createFileRoute('/dashboard/study-plan')({
  component: StudyPlanPage
});

const WEEK_DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

function StudyPlanPage() {
  const { user } = useAuthStatus();
  const featureAccess = checkFeatureAccess(user?.role || 'free', 'studyPlan');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Plano de Estudos</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" disabled={!featureAccess.included}>
            <Settings2 className="h-4 w-4" /> Ajustar Pesos
          </Button>
          <Button variant="outline" size="sm" className="text-secondary border-secondary/50 gap-2 bg-secondary/5 shadow-sm" disabled={!featureAccess.included}>
            <Sparkles className="h-4 w-4" /> Gerar Recomendações
          </Button>
        </div>
      </div>

      <div className="relative">
        {!featureAccess.included && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px] rounded-xl border-2 border-dashed border-muted p-6">
            <Card className="max-w-md mx-auto shadow-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-secondary/10 rounded-full w-fit mb-4">
                  <Lock className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>Plano de Estudos Bloqueado</CardTitle>
                <CardDescription>
                  Organize sua rotina com cronogramas adaptativos baseados no seu edital.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-left">
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-500" />
                    <span>Cronograma semanal personalizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-500" />
                    <span>Recomendações baseadas em performance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-500" />
                    <span>Gestão adaptativa de carga horária</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link to="/dashboard/profile">Ver Planos de Assinatura</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        <div className={featureAccess.included ? "" : "opacity-30 pointer-events-none grayscale"}>
          <Card className="bg-secondary/5 border-secondary/20 mb-6">
            <CardContent className="py-4 flex gap-4 items-start">
              <Info className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold text-secondary mb-1">Por que estas recomendações?</p>
                <p className="text-muted-foreground leading-relaxed">
                  Baseado no seu histórico de <span className="text-foreground font-medium">Português (62% acerto)</span>, priorizamos temas de Sintaxe. 
                  A carga horária de <span className="text-foreground font-medium">Dir. Constitucional</span> foi aumentada para compensar o tempo reduzido na última semana.
                </p>
              </div>
            </CardContent>
          </Card>
          
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
      </div>
    </div>
  );
}
