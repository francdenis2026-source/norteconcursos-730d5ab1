import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  MapPin, 
  GraduationCap, 
  Calendar,
  Briefcase,
  Trophy,
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react';
import { MockService } from '@/services/mockService';
import { Contest } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuthStatus } from '@/hooks/useDashboard';
import { checkFeatureAccess } from '@/lib/subscriptions.config';
import { Link } from '@tanstack/react-router';


export const Route = createFileRoute('/dashboard/questions')({
  component: QuestionsCatalog
});

function QuestionsCatalog() {
  const { user } = useAuthStatus();
  const [searchTerm, setSearchTerm] = useState('');
  const [contests, setContests] = useState<Contest[]>([]);
  const [focusedContest, setFocusedContest] = useState<Contest | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  const featureAccess = checkFeatureAccess(user?.role || 'free', 'questions');


  useState(() => {
    const load = async () => {
      const c = await MockService.getContests();
      const f = await MockService.getFocusedContest();
      setContests(c);
      setFocusedContest(f);
      setLoading(false);
    };
    load();
  });

  const filteredContests = contests.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSetFocus = (contest: Contest) => {
    MockService.setFocusedContest(contest.id);
    toast.success(`${contest.agency} definido como seu concurso foco!`);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-primary">Catálogo de Concursos</h1>
        <p className="text-muted-foreground">
          {loading ? 'Carregando concursos...' : 'Encontre e foque no seu objetivo principal.'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Pesquisar por órgão, cargo ou banca..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContests.map((contest, index) => {
          const isLocked = !featureAccess.included || (featureAccess.limit !== 'unlimited' && index >= (featureAccess.limit || 0));
          return (
            <Card key={contest.id} className={cn(
              "flex flex-col border-2 transition-all hover:shadow-md relative",
              focusedContest?.id === contest.id ? "border-secondary" : "border-border",
              isLocked ? "opacity-75" : ""
            )}>
              {isLocked && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[1px] p-4 text-center rounded-lg">
                  <Lock className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-xs font-bold text-muted-foreground uppercase">Limite do Plano Atingido</p>
                  <Button asChild variant="link" size="sm" className="text-secondary h-auto p-0 mt-1">
                    <Link to="/dashboard/profile">Liberar Acesso</Link>
                  </Button>
                </div>
              )}

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/20">
                  {contest.career}
                </div>
                {focusedContest?.id === contest.id && (
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-secondary">
                    <CheckCircle2 className="h-3 w-3" />
                    FOCO ATUAL
                  </div>
                )}
              </div>
              <CardTitle className="text-lg leading-tight mt-2">{contest.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                <InfoItem icon={Briefcase} label="Banca" value={contest.examBoard} />
                <InfoItem icon={GraduationCap} label="Nível" value={contest.educationLevel} />
                <InfoItem icon={MapPin} label="Local" value={contest.location} />
                <InfoItem icon={Trophy} label="Vagas" value={contest.vacancies.toString()} />
                <InfoItem icon={Calendar} label="Prova" value={contest.examDate || 'A definir'} />
              </div>
              
              <div className="pt-2">
                <div className="text-xs text-muted-foreground mb-1">Remuneração estimada</div>
                <div className="text-xl font-bold text-primary">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contest.salary)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t gap-2">
              <Button variant="outline" className="flex-1 text-xs">Ver Detalhes</Button>
              <Button 
                className={cn(
                  "flex-1 text-xs",
                  focusedContest?.id === contest.id ? "bg-muted text-muted-foreground" : "bg-primary"
                )}
                disabled={focusedContest?.id === contest.id}
                onClick={() => handleSetFocus(contest)}
              >
                Definir Foco
              </Button>
            </CardFooter>
          </Card>
          );
        })}

      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <div className="flex flex-col">
        <span className="text-[10px] text-muted-foreground uppercase">{label}</span>
        <span className="font-medium truncate">{value}</span>
      </div>
    </div>
  );
}
