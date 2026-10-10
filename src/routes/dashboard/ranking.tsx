import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/dashboard/PageHero";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/ranking")({ component: RankingPage });

const TABS = [
  ["questions", "Questões", "Pontos do Treinador: +1 por questão, +2 se acertar sem ajuda (só a 1ª resposta conta)."],
  ["simulators", "Simulados", "Pontos dos simulados: 10 por acerto, -2 por erro, mais bônus de precisão."],
  ["general", "Geral", "Soma de questões, simulados e horas de estudo (10 pontos por hora)."],
] as const;

interface Row {
  rank_position: number;
  user_id: string;
  display_name: string;
  points: number;
  question_points: number;
  simulator_points: number;
  study_points: number;
  study_hours: number;
  is_me: boolean;
}

function RankingPage() {
  const { user, isLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const [kind, setKind] = React.useState<(typeof TABS)[number][0]>("general");
  const [rows, setRows] = React.useState<Row[] | null>(null);

  React.useEffect(() => {
    if (isLoading || !real) return;
    let alive = true;
    setRows(null);
    void supabase.rpc("get_ranking_section", { _kind: kind, _limit: 50 }).then(({ data }) => {
      if (alive) setRows((data || []) as Row[]);
    });
    return () => {
      alive = false;
    };
  }, [kind, real, isLoading]);

  const tab = TABS.find((t) => t[0] === kind)!;

  return (
    <div className="space-y-6">
      <PageHero image="command-room" size="sm" kicker="Desempenho" icon={Trophy} title={<>Ranking <em>geral</em></>}
        description="Veja quem mais estuda. Administradores ficam fora e sobrenomes ficam protegidos." />
      <Card className="border-0 shadow-lg ring-1 ring-border/70">
        <CardHeader className="space-y-3">
          <div className="flex gap-1.5" role="tablist" aria-label="Seção do ranking">
            {TABS.map(([id, label]) => (
              <button key={id} type="button" role="tab" aria-selected={kind === id} onClick={() => setKind(id)}
                className={cn("rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                  kind === id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")}>
                {label}
              </button>
            ))}
          </div>
          <CardTitle className="text-xl">{tab[1]}</CardTitle>
          <CardDescription>{tab[2]}</CardDescription>
        </CardHeader>
        <CardContent>
          {!real ? (
            <p className="py-6 text-center text-sm text-muted-foreground">Entre na sua conta para ver o ranking.</p>
          ) : !rows ? (
            <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="Carregando" /></div>
          ) : rows.length ? (
            <ol className="space-y-2">
              {rows.map((r) => (
                <li key={r.user_id} className={cn("grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-xl border p-3",
                  r.is_me && "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20")}>
                  <span className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-black",
                    r.rank_position === 1 ? "bg-amber-400 text-white" : r.rank_position === 2 ? "bg-slate-300 text-slate-700"
                      : r.rank_position === 3 ? "bg-orange-400 text-white" : "bg-muted text-muted-foreground")}>
                    {r.rank_position}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{r.display_name}{r.is_me && " (você)"}</p>
                    {kind === "general" && (
                      <p className="text-xs text-muted-foreground">
                        {r.question_points} questões · {r.simulator_points} simulados · {r.study_hours} h de estudo
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-black tabular-nums">{r.points} pts</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">Ainda não há pontuação neste ranking.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
