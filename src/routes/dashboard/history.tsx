import { acreDate, acreDateKey, acreDayRangeISO } from "@/lib/acreTime";
import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, History, Loader2, Trophy, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LockedState, PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { AttemptHistoryList } from "@/components/dashboard/AttemptHistoryList";
import { fetchAttemptHistory, type AttemptWithDetails } from "@/lib/attemptHistory";

export const Route = createFileRoute("/dashboard/history")({
  validateSearch: (search: Record<string, unknown>) => ({
    day: typeof search["day"] === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search["day"])
      ? search["day"]
      : undefined,
  }),
  component: HistoryPage,
  head: () => ({ meta: [{ title: "Histórico de estudos | Norte Concurso" }] }),
});

interface Answer {
  id: string;
  subject: string;
  contest_name: string;
  is_correct: boolean;
  response_seconds: number;
  created_at: string;
}
interface Me {
  rank_position: number | null;
  total_points: number;
  level_name: string;
}

const fmtDate = (iso: string) =>
  acreDate(iso).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" });

function HistoryPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const { day } = Route.useSearch();
  const real = !!user && user.id !== "demo-user";
  const [attempts, setAttempts] = React.useState<AttemptWithDetails[]>([]);
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [me, setMe] = React.useState<Me | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (authLoading) return;
    if (!real || !user) {
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    let answersQuery = supabase
      .from("question_training_responses")
      .select("id,subject,contest_name,is_correct,response_seconds,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    answersQuery = day
      ? (() => {
          const [start, end] = acreDayRangeISO(day);
          return answersQuery.gte("created_at", start).lt("created_at", end);
        })()
      : answersQuery.limit(20);
    void Promise.all([
      fetchAttemptHistory(user.id, day ? 200 : 20).then(
        (data) => ({ data, error: null }),
        (error: unknown) => ({ data: [] as AttemptWithDetails[], error }),
      ),
      answersQuery,
      supabase.rpc("my_rank_summary", { _period: "all", _metric: "points" }).maybeSingle(),
    ]).then(([a, r, m]) => {
      if (!alive) return;
      setAttempts(
        day ? a.data.filter((x) => acreDateKey(acreDate(x.finished_at)) === day) : a.data,
      );
      setAnswers((r.data as Answer[] | null) ?? []);
      setMe((m.data as Me | null) ?? null);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [authLoading, real, user, day]);

  if (authLoading || loading)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
      </div>
    );
  if (!real)
    return (
      <LockedState
        image="dashboard"
        title={
          <>
            Histórico de <em>atividades</em>
          </>
        }
        description="Entre na sua conta para ver seus simulados, respostas e posição no ranking."
      />
    );

  return (
    <div className="space-y-6">
      <PageHero
        image="dashboard"
        kicker="Desempenho"
        icon={History}
        title={
          <>
            Histórico de <em>estudos</em>
          </>
        }
        description="Seus simulados e as últimas questões respondidas no Treinador, em ordem cronológica."
      >
        <div className="page-hero__stats">
          <HeroStat
            icon={Trophy}
            label="Posição no ranking"
            value={me?.rank_position ? `#${me.rank_position}` : "—"}
          />
          <HeroStat icon={Clock} label="Pontos de ranking" value={me?.total_points ?? 0} />
        </div>
      </PageHero>

      {day && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-card px-4 py-2.5 text-sm">
          <span>
            Mostrando atividades de{" "}
            <strong>{acreDate(day).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" })}</strong>
          </span>
          <Link
            to="/dashboard/history"
            search={{ day: undefined }}
            className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <X className="h-3.5 w-3.5" aria-hidden /> Ver tudo
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" /> Histórico de simulados
            </CardTitle>
            <CardDescription>
              Cada tentativa mostra a nota pela regra de correção, o aproveitamento e os pontos de
              ranking — três medidas diferentes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {attempts.length === 0 ? (
              <p className="rounded-md border py-8 text-center text-sm text-muted-foreground">
                {day ? "Nenhum simulado nesse dia." : "Nenhum simulado realizado ainda."}
              </p>
            ) : (
              <AttemptHistoryList items={attempts} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5 text-amber-500" /> Sua posição
            </CardTitle>
            <CardDescription>
              {me?.rank_position ? (
                <>
                  Você está em <strong>{me.rank_position}º lugar</strong> · {me.total_points} pts ·{" "}
                  {me.level_name}
                </>
              ) : (
                "Pontue em simulados e questões para entrar no ranking."
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              A tabela completa, com filtros por semana e mês e a busca de candidatos, fica na
              página do Ranking.
            </p>
            <Button asChild size="sm">
              <Link
                to="/dashboard/ranking"
                search={{ section: "general", page: 1, size: 20, q: "" }}
              >
                Abrir o ranking
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" /> {day ? "Respostas nesse dia" : "Respostas recentes"}
          </CardTitle>
          <CardDescription>
            {day
              ? `${answers.length} questão${answers.length === 1 ? "" : "ões"} do Treinador nesse dia.`
              : `Suas últimas ${answers.length || 20} questões do Treinador.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Matéria</TableHead>
                  <TableHead>Concurso</TableHead>
                  <TableHead>Resultado</TableHead>
                  <TableHead>Tempo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {answers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      {day
                        ? "Nenhuma questão do Treinador respondida nesse dia."
                        : "Você ainda não respondeu nenhuma questão no Treinador."}
                    </TableCell>
                  </TableRow>
                ) : (
                  answers.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="whitespace-nowrap text-xs">
                        {fmtDate(a.created_at)}
                      </TableCell>
                      <TableCell className="text-xs font-medium">{a.subject}</TableCell>
                      <TableCell className="max-w-[160px] truncate text-xs text-muted-foreground">
                        {a.contest_name}
                      </TableCell>
                      <TableCell>
                        {a.is_correct ? (
                          <Badge
                            variant="secondary"
                            className="h-5 bg-emerald-100 text-[10px] text-emerald-800"
                          >
                            Correto
                          </Badge>
                        ) : (
                          <Badge
                            variant="destructive"
                            className="h-5 bg-rose-100 text-[10px] text-rose-800"
                          >
                            Erro
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{a.response_seconds}s</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
