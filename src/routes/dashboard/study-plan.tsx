import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useDashboardData } from '@/hooks/useDashboard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  GripVertical,
  ChevronRight,
  Info,
  Save,
  Trash2,
  Sparkles,
  Lock,
  Zap
} from 'lucide-react';
import { checkFeatureAccess } from '@/lib/subscriptions.config';
import { useAuthStatus } from '@/hooks/useDashboard';
import { toast } from 'sonner';

export const Route = createFileRoute('/dashboard/study-plan')({
  component: StudyPlanPage
});

const WEEK_DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

type Block = {
  id: string;
  day: string;
  time: string;
  subject: string;
  type: 'Teoria' | 'Questões' | 'Revisão';
};

const INITIAL_BLOCKS: Block[] = [
  { id: '1', day: 'Segunda', time: '08:00 - 10:00', subject: 'Português', type: 'Teoria' },
  { id: '2', day: 'Segunda', time: '10:30 - 12:30', subject: 'Constitucional', type: 'Questões' },
  { id: '3', day: 'Terça', time: '08:00 - 10:00', subject: 'Raciocínio Lógico', type: 'Teoria' },
  { id: '4', day: 'Terça', time: '10:30 - 12:30', subject: 'Português', type: 'Revisão' },
];

function StudyPlanPage() {
  const { user } = useAuthStatus();
  const { focusedContest } = useDashboardData();
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
  const featureAccess = checkFeatureAccess(user?.subscription_tier || 'free', 'studyPlan');

  const handleSave = () => {
    toast.success("Plano de estudos salvo com sucesso!");
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Plano de Estudos</h1>
          <p className="text-muted-foreground">
            {focusedContest ? `Foco: ${focusedContest.agency}` : "Defina seu cronograma semanal."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleSave} disabled={!featureAccess.included}>
            <Save className="h-4 w-4" /> Salvar Plano
          </Button>
          <Button variant="outline" size="sm" className="text-secondary border-secondary/50 gap-2 bg-secondary/5 shadow-sm" disabled={!featureAccess.included}>
            <Sparkles className="h-4 w-4" /> Gerar Recomendações AI
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

        <div className={featureAccess.included ? "grid grid-cols-1 md:grid-cols-7 gap-4" : "grid grid-cols-1 md:grid-cols-7 gap-4 opacity-30 pointer-events-none grayscale"}>
          {WEEK_DAYS.map((day) => (
            <div key={day} className="space-y-3">
              <div className="text-center pb-2 border-b">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">{day}</h3>
              </div>
              
              <div className="space-y-2">
                {blocks.filter(b => b.day === day).map(block => (
                  <Card key={block.id} className="group hover:border-secondary transition-all cursor-default overflow-hidden">
                    <div className="p-2 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {block.time}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 opacity-0 group-hover:opacity-100 text-destructive"
                          onClick={() => handleRemoveBlock(block.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black truncate">{block.subject}</span>
                        <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-tighter">{block.type}</span>
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Button 
                  variant="ghost" 
                  className="w-full border-dashed border-2 h-16 text-muted-foreground hover:text-secondary hover:border-secondary/50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-secondary/5 border-secondary/20">
        <CardContent className="py-4 flex gap-4 items-start">
          <Info className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold text-secondary mb-1">Dica de Produtividade</p>
            <p className="text-muted-foreground leading-relaxed">
              Tente intercalar matérias de raciocínio lógico com matérias de leitura densa para evitar a fadiga. 
              Mantenha os blocos de <strong>Questões</strong> sempre após a <strong>Teoria</strong> para fixação imediata.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}