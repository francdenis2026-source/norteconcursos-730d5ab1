import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStatus } from '@/hooks/useDashboard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PenLine, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/dashboard/essays')({
  component: EssaysPage,
});

interface Topico { descricao: string; valor_pontos: number | null; abordado: boolean | null; obs?: string; }
interface Correcao { nota_estimada: number | null; pontos_fortes: string[]; pontos_fracos: string[]; comentario: string; confianca: string; }
interface Essay {
  id: string;
  contest_name: string;
  contest_year: string;
  tema: string;
  topicos: Topico[];
  nota_maxima: number | null;
  status: string;
  transcricao: string | null;
  correcao: Correcao;
}

const statusLabel: Record<string, { label: string; color: string }> = {
  texto_completo: { label: 'Texto completo', color: 'bg-emerald-500' },
  rascunho_incompleto: { label: 'Rascunho incompleto', color: 'bg-amber-500' },
  corrigida: { label: 'Corrigida', color: 'bg-secondary' },
};

function EssaysPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [essays, setEssays] = React.useState<Essay[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (authLoading || !user || user.id === 'demo-user') { setIsLoading(false); return; }
    const load = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('essay_submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('contest_year', { ascending: true });
      setEssays((data as Essay[]) || []);
      setIsLoading(false);
    };
    load();
  }, [user, authLoading]);

  if (authLoading || isLoading) return <div className="p-8">Carregando redações...</div>;

  if (!user || user.id === 'demo-user') {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <PenLine className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="text-xl font-bold">Faça login para ver suas redações</h2>
      </div>
    );
  }

  if (essays.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <PenLine className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="text-xl font-bold">Nenhuma redação registrada</h2>
        <p className="text-muted-foreground max-w-md">Envie a foto do rascunho ou da folha definitiva da sua discursiva para começar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Treino de Redação</h1>
        <p className="text-muted-foreground">Discursivas registradas, com aderência aos tópicos exigidos pelo edital.</p>
      </div>

      <div className="space-y-4">
        {essays.map(e => {
          const st = statusLabel[e.status] || { label: e.status, color: 'bg-muted' };
          const abordados = e.topicos?.filter(t => t.abordado === true).length || 0;
          const totalTopicos = e.topicos?.length || 0;
          return (
            <Card key={e.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <CardTitle className="text-lg">"{e.tema}"</CardTitle>
                    <CardDescription>{e.contest_name} · {e.contest_year} {e.nota_maxima ? `· Nota máxima: ${e.nota_maxima} pts` : ''}</CardDescription>
                  </div>
                  <Badge className={cn('text-white', st.color)}>{st.label}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {totalTopicos > 0 && (
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-2">
                      Tópicos exigidos ({abordados}/{totalTopicos} abordados)
                    </p>
                    <div className="space-y-2">
                      {e.topicos.map((t, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                          {t.abordado === true ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> :
                           t.abordado === false ? <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" /> :
                           <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />}
                          <div className="flex-1">
                            <p>{t.descricao} {t.valor_pontos ? <span className="text-muted-foreground text-xs">({t.valor_pontos} pts)</span> : null}</p>
                            {t.obs && <p className="text-xs text-muted-foreground mt-0.5">{t.obs}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {e.correcao && (e.correcao.pontos_fortes?.length > 0 || e.correcao.pontos_fracos?.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {e.correcao.pontos_fortes?.length > 0 && (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                        <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase mb-1.5">Pontos fortes</p>
                        <ul className="text-xs space-y-1 list-disc list-inside text-emerald-900 dark:text-emerald-300">
                          {e.correcao.pontos_fortes.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>
                    )}
                    {e.correcao.pontos_fracos?.length > 0 && (
                      <div className="p-3 bg-rose-50 dark:bg-rose-950/20 rounded-lg">
                        <p className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase mb-1.5">Pontos fracos</p>
                        <ul className="text-xs space-y-1 list-disc list-inside text-rose-900 dark:text-rose-300">
                          {e.correcao.pontos_fracos.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {e.correcao?.comentario && (
                  <p className="text-xs italic text-muted-foreground border-l-2 pl-3">{e.correcao.comentario}</p>
                )}

                {e.transcricao && (
                  <details className="text-sm">
                    <summary className="cursor-pointer font-bold text-xs uppercase text-muted-foreground">Ver transcrição</summary>
                    <p className="mt-2 whitespace-pre-wrap text-muted-foreground leading-relaxed">{e.transcricao}</p>
                  </details>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
