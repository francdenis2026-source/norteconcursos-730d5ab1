import { createFileRoute } from '@tanstack/react-router';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Clock, Trophy, Lock, Eye } from 'lucide-react';
import { MediaViewer } from '@/components/dashboard/MediaViewer';
import { toast } from 'sonner';
import { MockService } from '@/services/mockService';
import { useAuthStatus } from '@/hooks/useDashboard';
import { checkFeatureAccess } from '@/lib/subscriptions.config';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';


export const Route = createFileRoute('/dashboard/mock-exams')({
  component: MockExamsPage
});

function MockExamsPage() {
  const { user } = useAuthStatus();
  const [isExamActive, setIsExamActive] = useState(false);
  const [examStartTime, setExamStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(4 * 60 * 60); // 4 hours
  const [examId, setExamId] = useState<string | null>(null);
  const [examHistory, setExamHistory] = useState<any[]>([]);
  const [ranking, setRanking] = useState<any[]>([]);
  const [isLoadingRanking, setIsLoadingRanking] = useState(false);

  
  const featureAccess = checkFeatureAccess(user?.subscription_tier || 'free', 'mockExams');

  useEffect(() => {
    const loadHistory = async () => {
      const history = await MockService.getMockExams();
      setExamHistory(history);
    };
    
    const loadRanking = async () => {
      setIsLoadingRanking(true);
      const r = await MockService.getMockExamRanking();
      setRanking(r);
      setIsLoadingRanking(false);
    };

    loadHistory();
    loadRanking();

    
    // Resume active exam if any
    const active = localStorage.getItem('norte_active_exam');
    if (active) {
      const parsed = JSON.parse(active);
      const elapsed = Math.floor((Date.now() - parsed.startTime) / 1000);
      const remaining = (4 * 60 * 60) - elapsed;
      if (remaining > 0) {
        setIsExamActive(true);
        setExamStartTime(parsed.startTime);
        setTimeLeft(remaining);
        setExamId(parsed.id);
      } else {
        localStorage.removeItem('norte_active_exam');
      }
    }
  }, []);

  useEffect(() => {
    let timer: any;
    if (isExamActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isExamActive) {
      finishExam();
    }
    return () => clearInterval(timer);
  }, [isExamActive, timeLeft]);

  const startExam = () => {
    const id = 'mock-' + Date.now();
    const startTime = Date.now();
    setIsExamActive(true);
    setExamStartTime(startTime);
    setExamId(id);
    localStorage.setItem('norte_active_exam', JSON.stringify({ id, startTime }));
    toast.info("Simulado iniciado! Você tem 4 horas.");
  };

  const finishExam = async () => {
    if (!examStartTime || !examId) return;
    const duration = Math.floor((Date.now() - examStartTime) / 1000);
    
    const result = {
      id: examId,
      total: 50,
      correct: Math.floor(Math.random() * 20) + 30, // Mocked score
      duration,
      finishedAt: new Date().toISOString()
    };

    await MockService.saveMockExam(result);
    await MockService.saveResponse({
      questionId: examId,
      isCorrect: true,
      timeSpent: duration,
      createdAt: new Date().toISOString()
    });

    setIsExamActive(false);
    localStorage.removeItem('norte_active_exam');
    setExamHistory(prev => [result, ...prev]);
    toast.success(`Simulado concluído! Acertos: ${result.correct}/${result.total}`);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Simulados</h1>
        {isExamActive ? (
          <div className="flex gap-2">
             <div className="flex items-center gap-2 px-3 py-1 bg-destructive/10 text-destructive rounded-md text-sm font-bold animate-pulse">
              <Clock className="h-4 w-4" /> {formatTime(timeLeft)}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Histórico de Simulados</CardTitle>
          </CardHeader>
          <CardContent>
            {examHistory.length > 0 ? (
              <div className="space-y-4">
                {examHistory.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-bold">Simulado {new Date(exam.finishedAt).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">Duração: {Math.floor(exam.duration / 60)} min</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-secondary">{exam.correct}/{exam.total}</p>
                      <p className="text-[10px] uppercase font-bold text-emerald-600">Concluído</p>
                      <MediaViewer 
                        type="video" 
                        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                        title="Resolução em Vídeo" 
                        triggerLabel="Ver Vídeo"
                        className="mt-1 h-6 text-[9px] px-2 py-0 border-emerald-500/20 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                <Trophy className="h-12 w-12 mb-4 opacity-20" />
                <p>Você ainda não completou nenhum simulado.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gold" />
              Ranking Geral (Anônimo)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingRanking ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-10 w-full bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                ranking.map((item, idx) => (
                  <div key={item.id} className={cn(
                    "flex items-center justify-between p-2 rounded-lg",
                    item.id === user?.id ? "bg-secondary/10 border border-secondary" : "hover:bg-muted/50"
                  )}>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "flex items-center justify-center h-6 w-6 rounded-full text-[10px] font-bold",
                        idx === 0 ? "bg-amber-400 text-white" : 
                        idx === 1 ? "bg-slate-300 text-slate-700" :
                        idx === 2 ? "bg-amber-600/50 text-white" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm font-black text-secondary">{item.score}/{item.total}</span>
                  </div>
                ))
              )}
            </div>

            <p className="text-[10px] text-muted-foreground text-center mt-4 italic">
              O ranking é atualizado a cada 24 horas.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
