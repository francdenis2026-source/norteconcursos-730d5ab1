import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Award, Flame, Gem, Loader2, Medal, Star, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { PageHero } from "@/components/dashboard/PageHero";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/ranking")({ component: RankingPage });

const TABS = [
  ["questions", "Questões", "Pontos das questões do Treinador, conferidos com o gabarito oficial."],
  ["simulators", "Simulados", "Pontos dos simulados concluídos, com bônus de precisão."],
  ["general", "Geral", "Tudo que você faz: questões, simulados, estudo, flashcards, redação e constância."],
] as const;

interface Row {
  rank_position: number;
  user_id: string;
  display_name: string;
  points: number;
  question_points: number;
  simulator_points: number;
  study_points: number;
  extra_points: number;
  study_hours: number;
  questions: number;
  accuracy: number;
  simulators: number;
  is_me: boolean;
  stars: number;
  level_name: string;
}

interface Profile {
  display_name: string; stars: number; level_name: string; general_points: number; next_level_at: number | null;
  general_position: number; participants: number; question_points: number; simulator_points: number;
  study_points: number; flashcard_points: number; essay_points: number; consistency_points: number;
  study_hours: number; questions: number; accuracy: number; simulators: number;
  best_accuracy: number; streak: number; medals: string[];
}

/** 1º = diamante, 2º = ouro, 3º = prata, 4º–10º = bronze; depois, só o número. */
function PositionBadge({ pos }: { pos: number }) {
  const tier = pos === 1 ? { Icon: Gem, cls: "bg-sky-100 text-sky-600 ring-sky-300" }
    : pos === 2 ? { Icon: Medal, cls: "bg-yellow-100 text-yellow-600 ring-yellow-300" }
    : pos === 3 ? { Icon: Medal, cls: "bg-slate-100 text-slate-500 ring-slate-300" }
    : pos <= 10 ? { Icon: Award, cls: "bg-amber-100 text-amber-700 ring-amber-300" } : null;
  if (!tier)
    return <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-black text-muted-foreground">{pos}</span>;
  return (
    <span className={cn("relative flex h-9 w-9 items-center justify-center rounded-full ring-2", tier.cls)} title={`${pos}º lugar`}>
      <tier.Icon className="h-5 w-5" />
      <span className="absolute -bottom-1 -right-1 rounded-full bg-background px-1 text-[10px] font-black text-foreground ring-1 ring-border">{pos}</span>
    </span>
  );
}

const Stars = ({ n }: { n: number }) => (
  <span className="inline-flex" aria-label={`${n} de 5 estrelas`}>
    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={cn("h-3 w-3", i <= n ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40")} />)}
  </span>
);

function ProfileDialog({ userId, onClose }: { userId: string | null; onClose: () => void }) {
  const [p, setP] = React.useState<Profile | null | undefined>(undefined);
  React.useEffect(() => {
    if (!userId) return;
    let alive = true;
    setP(undefined);
    void supabase.rpc("get_ranking_profile", { _user: userId }).maybeSingle().then(({ data }) => {
      if (alive) setP((data as Profile | null) ?? null);
    });
    return () => { alive = false; };
  }, [userId]);
  const Row2 = ({ k, v }: { k: string; v: React.ReactNode }) => (
    <div className="flex justify-between border-b py-1.5 text-sm last:border-0"><span className="text-muted-foreground">{k}</span><b className="tabular-nums">{v}</b></div>
  );
  return (
    <Dialog open={!!userId} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        {p === undefined ? (
          <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="Carregando" /></div>
        ) : p === null ? (
          <DialogHeader><DialogTitle>Perfil indisponível</DialogTitle><DialogDescription>Não foi possível carregar este candidato.</DialogDescription></DialogHeader>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{p.display_name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2"><Stars n={p.stars} /> Nível {p.level_name} · {p.general_position}º de {p.participants}</DialogDescription>
            </DialogHeader>
            <div className="space-y-1">
              <div className="flex justify-between text-xs"><span>{p.general_points} pts</span><span>{p.next_level_at ? `próximo nível em ${p.next_level_at} pts` : "nível máximo"}</span></div>
              <Progress value={p.next_level_at ? Math.min(100, (100 * p.general_points) / p.next_level_at) : 100} className="h-2" />
            </div>
            <div>
              <Row2 k="Questões resolvidas" v={`${p.questions} (${p.accuracy}% de acertos)`} />
              <Row2 k="Simulados concluídos" v={`${p.simulators} (melhor ${Math.round(Number(p.best_accuracy))}%)`} />
              <Row2 k="Horas de estudo" v={`${p.study_hours} h`} />
              <Row2 k="Pontos de questões" v={p.question_points} />
              <Row2 k="Pontos de simulados" v={p.simulator_points} />
              <Row2 k="Pontos de estudo (horas)" v={p.study_points} />
              <Row2 k="Flashcards / redação / constância" v={`${p.flashcard_points} / ${p.essay_points} / ${p.consistency_points}`} />
              <Row2 k="Maior sequência de dias" v={<span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-orange-500" />{p.streak}</span>} />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-muted-foreground">Medalhas ({p.medals.length})</p>
              {p.medals.length ? <div className="flex flex-wrap gap-1.5">{p.medals.map((m) => <span key={m} className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">{m}</span>)}</div>
                : <p className="text-xs text-muted-foreground">Ainda sem medalhas.</p>}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function RankingPage() {
  const { user, isLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const [kind, setKind] = React.useState<(typeof TABS)[number][0]>("general");
  const [rows, setRows] = React.useState<Row[] | null>(null);
  const [viewing, setViewing] = React.useState<string | null>(null);

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
          <details className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            <summary className="cursor-pointer font-semibold text-foreground">Como a pontuação funciona (e por que é justa)</summary>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li><b>Questões:</b> certo sem ajuda +3, com ajuda +1, errado -2. O acerto é conferido no servidor com o gabarito oficial. Só vale por inteiro com 70% ou mais de acertos no dia (50% ou menos não pontua), então chutar não compensa. Até 100 questões pontuadas por dia.</li>
              <li><b>Cada questão conta uma vez só</b>, somando Treinador e Simulados: refazer a mesma questão não rende ponto. Respostas em menos de 4 segundos não contam.</li>
              <li><b>Simulados:</b> mesma conta das questões; a tentativa precisa durar pelo menos 10 s por questão. Bônus de precisão (+25, +50, +100 com 70%, 80%, 90%) a partir de 20 questões inéditas.</li>
              <li><b>Estudo:</b> 5 pontos por hora ativa, até 3 horas por dia. <b>Flashcards:</b> +1 por cartão revisado (até 50 por dia). <b>Redação:</b> +20 por texto de 150 palavras ou mais (1 por dia). <b>Constância:</b> +5 por dia de estudo real (20 min ou 10 questões).</li>
              <li>Níveis na pontuação geral: Competidor 250, Avançado 750, Especialista 1.500, Elite 3.000. Administradores ficam fora.</li>
            </ul>
          </details>
        </CardHeader>
        <CardContent>
          {!real ? (
            <p className="py-6 text-center text-sm text-muted-foreground">Entre na sua conta para ver o ranking.</p>
          ) : !rows ? (
            <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="Carregando" /></div>
          ) : rows.length ? (
            <ol className="space-y-2">
              {rows.map((r) => (
                <li key={r.user_id}>
                  <button type="button" onClick={() => setViewing(r.user_id)} aria-label={`Ver perfil de ${r.display_name}`}
                    className={cn("grid w-full grid-cols-[42px_1fr_auto] items-center gap-3 rounded-xl border p-3 text-left transition hover:border-primary",
                      r.is_me && "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20")}>
                    <PositionBadge pos={Number(r.rank_position)} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{r.display_name}{r.is_me && " (você)"}</p>
                      <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                        <Stars n={r.stars} /> {r.level_name}
                        <span>· {r.questions} questões ({r.accuracy}%) · {r.simulators} simulados · {r.study_hours} h</span>
                      </p>
                    </div>
                    <span className="text-sm font-black tabular-nums">{r.points} pts</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">Ainda não há pontuação neste ranking.</p>
          )}
        </CardContent>
      </Card>
      <ProfileDialog userId={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}
