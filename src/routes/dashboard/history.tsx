import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, History, Loader2, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/history")({
  component: HistoryPage,
  head: () => ({ meta: [{ title: "Histórico de estudos | Norte Concurso" }] }),
});

interface Attempt { id: string; title: string; total_questions: number; correct_answers: number; accuracy: number; finished_at: string }
interface Answer { id: string; subject: string; contest_name: string; is_correct: boolean; response_seconds: number; created_at: string }
interface RankRow { rank_position: number; display_name: string; points: number; stars: number; level_name: string; is_me: boolean }
interface Me { rank_position: number | null; total_points: number; level_name: string }

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" });

function HistoryPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const [attempts, setAttempts] = React.useState<Attempt[]>([]);
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [top, setTop] = React.useState<RankRow[]>([]);
  const [me, setMe] = React.useState<Me | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (authLoading) return;
    if (!real || !user) { setLoading(false); return; }
    let alive = true;
    void Promise.all([
      supabase.from("simulator_attempts").select("id,title,total_questions,correct_answers,accuracy,finished_at").eq("user_id", user.id).order("finished_at", { ascending: false }).limit(20),
      supabase.from("question_training_responses").select("id,subject,contest_name,is_correct,response_seconds,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20),
      supabase.rpc("get_ranking", { _period: "all", _metric: "points", _limit: 5 }),
      supabase.rpc("my_rank_summary", { _period: "all", _metric: "points" }).maybeSingle(),
    ]).then(([a, r, t, m]) => {
      if (!alive) return;
      setAttempts((a.data as Attempt[] | null) ?? []);
      setAnswers((r.data as Answer[] | null) ?? []);
      setTop((t.data as RankRow[] | null) ?? []);
      setMe((m.data as Me | null) ?? null);
      setLoading(false);
    });
    return () => { alive = false; };
  }, [authLoading, real, user]);

  if (authLoading || loading) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>;
  if (!real) return <LockedState image="command-room" title={<>Histórico de <em>estudos</em></>} description="Entre na sua conta para ver seus simulados, respostas e posição no ranking." />;

  return (
    <div className="space-y-6">
      <PageHero image="command-room" kicker="Desempenho" icon={History} title={<>Histórico de <em>estudos</em></>}
        description="Seus simulados, suas respostas recentes e a sua posição no ranking." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /> Histórico de simulados</CardTitle>
            <CardDescription>Suas tentativas completas e a precisão em cada uma.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Data</TableHead><TableHead>Simulado</TableHead><TableHead>Acertos</TableHead><TableHead>Desempenho</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {attempts.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">Nenhum simulado realizado ainda.</TableCell></TableRow>
                  ) : attempts.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="whitespace-nowrap text-xs">{fmtDate(a.finished_at)}</TableCell>
                      <TableCell className="text-sm font-medium">{a.title}</TableCell>
                      <TableCell className="font-bold tabular-nums">{a.correct_answers}/{a.total_questions}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{ width: `${Math.round(Number(a.accuracy))}%` }} /></div>
                          <span className="text-[10px] font-bold tabular-nums">{Math.round(Number(a.accuracy))}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Trophy className="h-5 w-5 text-amber-500" /> Ranking geral</CardTitle>
            <CardDescription>
              {me?.rank_position ? <>Você está em <strong>{me.rank_position}º lugar</strong> · {me.total_points} pts · {me.level_name}</> : "Pontue em simulados e questões para entrar no ranking."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {top.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">O ranking aparece assim que os primeiros alunos pontuarem.</p>
            ) : top.map((t) => (
              <div key={t.rank_position} className={cn("flex items-center justify-between rounded-lg p-2 text-sm", t.is_me ? "border border-amber-400 bg-amber-50 dark:bg-amber-950/20" : "hover:bg-muted/50")}>
                <span className="flex items-center gap-2">
                  <span className={cn("grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold", t.rank_position === 1 ? "bg-amber-400 text-white" : "bg-muted text-muted-foreground")}>{t.rank_position}</span>
                  <span className="max-w-[120px] truncate font-medium">{t.display_name}{t.is_me ? " (você)" : ""}</span>
                </span>
                <span className="font-black tabular-nums text-amber-600">{t.points} pts</span>
              </div>
            ))}
            <Link to="/dashboard/mock-exams" className="block pt-2 text-xs font-semibold text-primary hover:underline">Ver ranking por semana e mês</Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Respostas recentes</CardTitle>
          <CardDescription>Suas últimas {answers.length || 20} questões do Treinador.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Data</TableHead><TableHead>Matéria</TableHead><TableHead>Concurso</TableHead><TableHead>Resultado</TableHead><TableHead>Tempo</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {answers.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">Você ainda não respondeu nenhuma questão no Treinador.</TableCell></TableRow>
                ) : answers.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="whitespace-nowrap text-xs">{fmtDate(a.created_at)}</TableCell>
                    <TableCell className="text-xs font-medium">{a.subject}</TableCell>
                    <TableCell className="max-w-[160px] truncate text-xs text-muted-foreground">{a.contest_name}</TableCell>
                    <TableCell>
                      {a.is_correct
                        ? <Badge variant="secondary" className="h-5 bg-emerald-100 text-[10px] text-emerald-800">Correto</Badge>
                        : <Badge variant="destructive" className="h-5 bg-rose-100 text-[10px] text-rose-800">Erro</Badge>}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{a.response_seconds}s</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
