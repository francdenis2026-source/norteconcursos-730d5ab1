import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BookOpenCheck,
  CalendarCheck,
  Crown,
  Flame,
  Lock,
  Loader2,
  Medal,
  PenLine,
  Target,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MockService, type MedalProgress } from "@/services/mockService";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/medals")({ component: MedalsPage });

/** Trilha de cada medalha, pelo código; a ordem dentro da trilha dá o nível (bronze → prata → ouro). */
interface Win {
  code: string;
  name: string;
  description: string | null;
}

const TRACKS: {
  id: string;
  title: string;
  hint: string;
  icon: LucideIcon;
  to: string;
  codes: string[];
}[] = [
  {
    id: "answered",
    title: "Questões resolvidas",
    hint: "Cada questão respondida no Treinador conta, uma vez por questão.",
    icon: BookOpenCheck,
    to: "/dashboard/question-trainer",
    codes: ["FIRST_10", "ANSWERED_100", "ANSWERED_500", "ANSWERED_1000"],
  },
  {
    id: "correct",
    title: "Acertos",
    hint: "Acertos acumulados nas questões e nos simulados.",
    icon: Target,
    to: "/dashboard/question-trainer",
    codes: ["CORRECT_50", "CORRECT_250", "CORRECT_1000"],
  },
  {
    id: "streak",
    title: "Constância",
    hint: "Dias seguidos em que você entrou para estudar (fuso do Acre). Perder um dia zera a sequência.",
    icon: Flame,
    to: "/dashboard/study-coach",
    codes: ["STREAK_3", "STREAK_7", "STREAK_30"],
  },
  {
    id: "mocks",
    title: "Simulados",
    hint: "Conclua simulados e busque o gabarito completo (100%).",
    icon: Trophy,
    to: "/dashboard/mock-exams",
    codes: ["MOCK_1", "PERFECT_SCORE"],
  },
  {
    id: "essays",
    title: "Redação",
    hint: "Salve suas redações no Caderno de 30 linhas.",
    icon: PenLine,
    to: "/dashboard/essays",
    codes: ["ESSAY_1", "ESSAY_5"],
  },
];

const TIERS = [
  {
    name: "Bronze",
    ring: "ring-amber-700/40",
    chip: "bg-amber-700/15 text-amber-800 dark:text-amber-300",
    bar: "bg-amber-600",
  },
  {
    name: "Prata",
    ring: "ring-slate-400/60",
    chip: "bg-slate-400/20 text-slate-700 dark:text-slate-200",
    bar: "bg-slate-400",
  },
  {
    name: "Ouro",
    ring: "ring-yellow-500/60",
    chip: "bg-yellow-500/20 text-yellow-800 dark:text-yellow-300",
    bar: "bg-yellow-500",
  },
  {
    name: "Diamante",
    ring: "ring-sky-400/60",
    chip: "bg-sky-400/20 text-sky-800 dark:text-sky-300",
    bar: "bg-sky-500",
  },
];

function MedalCard({
  m,
  tier,
  Icon,
}: {
  m: MedalProgress;
  tier: (typeof TIERS)[number];
  Icon: LucideIcon;
}) {
  const pct = Math.round((100 * m.current) / m.target);
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-card p-3 ring-2 ring-offset-0",
        m.earned ? tier.ring : "ring-transparent",
      )}
    >
      <span
        className={cn(
          "grid h-12 w-12 shrink-0 place-items-center rounded-full",
          m.earned ? tier.chip : "bg-muted text-muted-foreground",
        )}
        aria-hidden
      >
        {m.earned ? <Icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2">
          <p className={cn("text-sm font-bold", !m.earned && "text-muted-foreground")}>{m.name}</p>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide",
              tier.chip,
            )}
          >
            {tier.name}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{m.description}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full", m.earned ? tier.bar : "bg-primary/60")}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[0.68rem] font-semibold tabular-nums text-muted-foreground">
            {m.earned ? "Conquistada" : `${m.current}/${m.target}`}
          </span>
        </div>
      </div>
    </li>
  );
}

function MedalsPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const [list, setList] = React.useState<MedalProgress[] | null>(null);
  const [wins, setWins] = React.useState<Win[] | null>(null);

  React.useEffect(() => {
    if (authLoading || !real) return;
    void MockService.awardAchievements()
      .then(() => MockService.getMedalProgress())
      .then(setList);
    // Conquistas = medalhas sem meta automática (aprovações reais registradas pela administração).
    void supabase
      .from("user_achievements")
      .select("achievement:achievements(code,name,description,target)")
      .then(({ data }) => {
        const rows = (
          (data ?? []) as unknown as { achievement: (Win & { target: number | null }) | null }[]
        )
          .map((r) => r.achievement)
          .filter((a): a is Win & { target: number | null } => !!a && a.target === null);
        setWins(rows);
      });
  }, [authLoading, real]);

  if (authLoading)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
      </div>
    );
  if (!real)
    return (
      <LockedState
        image="command-room"
        title={
          <>
            Minhas <em>medalhas</em>
          </>
        }
        description="Entre na sua conta para acompanhar as medalhas e ver quanto falta para a próxima."
      />
    );

  const byCode = new Map((list ?? []).map((m) => [m.code, m]));
  const earned = (list ?? []).filter((m) => m.earned).length;
  const total = (list ?? []).length;
  // Próxima medalha: a não conquistada mais perto da meta.
  const next = (list ?? [])
    .filter((m) => !m.earned)
    .sort((a, b) => b.current / b.target - a.current / a.target)[0];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Desempenho"
        icon={Medal}
        title={
          <>
            Minhas <em>medalhas</em>
          </>
        }
        description="Medalhas marcam o seu progresso real. Elas são concedidas sozinhas quando você atinge a meta."
      />

      {!list ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
        </div>
      ) : (
        <>
          <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
            <div className="rounded-xl border bg-card p-4">
              <p className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">
                <Award className="h-3.5 w-3.5" /> Conquistadas
              </p>
              <p className="text-3xl font-black tabular-nums">
                {earned}
                <span className="text-lg font-semibold text-muted-foreground"> / {total}</span>
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{ width: `${total ? (100 * earned) / total : 0}%` }}
                />
              </div>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <p className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">
                <Crown className="h-3.5 w-3.5" /> Próxima medalha
              </p>
              {next ? (
                <>
                  <p className="text-lg font-bold">{next.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {next.description} Faltam <strong>{next.target - next.current}</strong>.
                  </p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.round((100 * next.current) / next.target)}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-sm font-semibold">
                  Você conquistou todas as medalhas disponíveis. Novas trilhas virão.
                </p>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Como funcionam</CardTitle>
              <CardDescription>Três regras simples.</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="grid gap-3 text-sm md:grid-cols-3">
                {[
                  [
                    "1",
                    "Cada medalha tem uma meta",
                    "Por exemplo, resolver 100 questões ou estudar 7 dias seguidos.",
                  ],
                  [
                    "2",
                    "O progresso é automático",
                    "Tudo que você faz na plataforma é contado. Não precisa pedir nem marcar nada.",
                  ],
                  [
                    "3",
                    "Elas sobem de nível",
                    "Dentro de cada trilha, a meta cresce: bronze, prata, ouro e diamante.",
                  ],
                ].map(([n, t, d]) => (
                  <li key={n} className="flex gap-3 rounded-lg border p-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-black text-primary">
                      {n}
                    </span>
                    <span>
                      <strong>{t}</strong>
                      <span className="block text-xs text-muted-foreground">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {TRACKS.map((track) => {
            const medals = track.codes
              .map((c) => byCode.get(c))
              .filter((m): m is MedalProgress => !!m);
            if (medals.length === 0) return null;
            return (
              <section key={track.id} aria-label={track.title} className="space-y-2">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <h2 className="flex items-center gap-2 text-base font-bold">
                      <track.icon className="h-4 w-4 text-primary" /> {track.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">{track.hint}</p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to={track.to}>Ir fazer</Link>
                  </Button>
                </div>
                <ul className="grid gap-2 md:grid-cols-2">
                  {medals.map((m, i) => (
                    <MedalCard
                      key={m.code}
                      m={m}
                      tier={TIERS[Math.min(i, TIERS.length - 1)]!}
                      Icon={track.icon}
                    />
                  ))}
                </ul>
              </section>
            );
          })}

          <section aria-label="Conquistas" className="space-y-2">
            <div>
              <h2 className="flex items-center gap-2 text-base font-bold">
                <Crown className="h-4 w-4 text-amber-500" /> Conquistas
              </h2>
              <p className="text-xs text-muted-foreground">
                Aprovações em concursos reais. São registradas pela administração, depois de
                conferidas.
              </p>
            </div>
            {wins && wins.length > 0 ? (
              <ul className="grid gap-3 md:grid-cols-2">
                {wins.map((w) => (
                  <li
                    key={w.code}
                    className="flex items-start gap-3 rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-50 to-card p-4 dark:from-amber-950/20"
                  >
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amber-400/25 text-amber-700 dark:text-amber-300"
                      aria-hidden
                    >
                      <Trophy className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <Badge className="mb-1 bg-amber-500 hover:bg-amber-500">Aprovado</Badge>
                      <p className="text-sm font-bold leading-snug">
                        {w.name.replace(/^Aprovado\s+—\s+/i, "")}
                      </p>
                      {w.description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{w.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-dashed p-5 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">
                  Sua primeira aprovação vai aparecer aqui.
                </p>
                <p className="mt-1 text-xs">
                  Quando você for aprovado em um concurso, a administração registra a conquista (com
                  o edital e a classificação) e ela ganha um lugar de destaque neste painel.
                </p>
              </div>
            )}
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarCheck className="h-3.5 w-3.5" /> As medalhas acima vêm do seu uso real da
              plataforma.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
