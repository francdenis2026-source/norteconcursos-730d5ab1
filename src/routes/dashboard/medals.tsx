import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck,
  Crown,
  Flame,
  Loader2,
  Medal,
  PenLine,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MockService, type MedalProgress } from "@/services/mockService";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/button";
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/medals")({ component: MedalsPage });

interface Win {
  code: string;
  name: string;
  description: string | null;
}

interface Track {
  id: string;
  title: string;
  hint: string;
  unit: string;
  icon: LucideIcon;
  /** Cor da trilha: faixa do cartão e ícone. */
  tone: { tile: string; text: string; bar: string };
  to: string;
  cta: string;
  codes: string[];
}

/** Trilhas: a ordem dos códigos dá o nível (bronze → prata → ouro → diamante). */
const TRACKS: Track[] = [
  {
    id: "answered",
    title: "Questões resolvidas",
    hint: "Cada questão respondida no Treinador ou em simulado conta uma vez.",
    unit: "questões",
    icon: BookOpenCheck,
    tone: { tile: "bg-blue-500/12", text: "text-blue-600 dark:text-blue-400", bar: "bg-blue-500" },
    to: "/dashboard/question-trainer",
    cta: "Treinar questões",
    codes: ["FIRST_10", "ANSWERED_100", "ANSWERED_500", "ANSWERED_1000"],
  },
  {
    id: "correct",
    title: "Acertos",
    hint: "Acertos acumulados no Treinador e nos simulados.",
    unit: "acertos",
    icon: Target,
    tone: {
      tile: "bg-emerald-500/12",
      text: "text-emerald-600 dark:text-emerald-400",
      bar: "bg-emerald-500",
    },
    to: "/dashboard/question-trainer",
    cta: "Treinar questões",
    codes: ["CORRECT_50", "CORRECT_250", "CORRECT_1000"],
  },
  {
    id: "streak",
    title: "Constância",
    hint: "Conta o seu recorde de dias seguidos de estudo (fuso do Acre).",
    unit: "dias seguidos",
    icon: Flame,
    tone: {
      tile: "bg-orange-500/12",
      text: "text-orange-600 dark:text-orange-400",
      bar: "bg-orange-500",
    },
    to: "/dashboard/study-plan",
    cta: "Montar meu plano",
    codes: ["STREAK_3", "STREAK_7", "STREAK_30"],
  },
  {
    id: "mocks",
    title: "Simulados",
    hint: "Conclua simulados e busque o gabarito completo (100%).",
    unit: "simulados",
    icon: Trophy,
    tone: {
      tile: "bg-violet-500/12",
      text: "text-violet-600 dark:text-violet-400",
      bar: "bg-violet-500",
    },
    to: "/dashboard/mock-exams",
    cta: "Fazer um simulado",
    codes: ["MOCK_1", "PERFECT_SCORE"],
  },
  {
    id: "essays",
    title: "Redação",
    hint: "Salve suas redações no Caderno de 30 linhas.",
    unit: "redações",
    icon: PenLine,
    tone: { tile: "bg-rose-500/12", text: "text-rose-600 dark:text-rose-400", bar: "bg-rose-500" },
    to: "/dashboard/essays",
    cta: "Escrever redação",
    codes: ["ESSAY_1", "ESSAY_5"],
  },
];

const TIERS = [
  { name: "Bronze", grad: "from-amber-700 to-orange-400", shadow: "shadow-amber-700/30" },
  { name: "Prata", grad: "from-slate-400 to-slate-200", shadow: "shadow-slate-400/30" },
  { name: "Ouro", grad: "from-yellow-500 to-amber-300", shadow: "shadow-amber-400/40" },
  { name: "Diamante", grad: "from-sky-500 to-cyan-300", shadow: "shadow-sky-400/40" },
] as const;

const dateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" });

/** Medalha em forma de selo: colorida quando conquistada, contorno com a meta quando ainda não. */
function Seal({
  m,
  tierIndex,
  Icon,
  when,
}: {
  m: MedalProgress;
  tierIndex: number;
  Icon: LucideIcon;
  when?: string | undefined;
}) {
  const tier = TIERS[Math.min(tierIndex, TIERS.length - 1)]!;
  return (
    <li
      className="flex w-[4.75rem] flex-col items-center gap-1 text-center"
      title={`${m.name} — ${m.description}${when ? ` (conquistada em ${when})` : ""}`}
    >
      <span
        className={cn(
          "grid h-14 w-14 place-items-center rounded-full",
          m.earned
            ? cn("bg-gradient-to-br text-white shadow-lg", tier.grad, tier.shadow)
            : "border-2 border-dashed border-muted-foreground/30 text-muted-foreground",
        )}
      >
        {m.earned ? (
          <Icon className="h-6 w-6 drop-shadow" aria-hidden />
        ) : (
          <span className="text-xs font-black tabular-nums">{m.target}</span>
        )}
      </span>
      <span
        className={cn(
          "text-[0.62rem] font-bold uppercase tracking-wide",
          m.earned ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {tier.name}
      </span>
      <span className="line-clamp-2 text-[0.62rem] leading-tight text-muted-foreground">
        {m.earned && when ? when : m.name}
      </span>
    </li>
  );
}

function TrackCard({
  track,
  medals,
  earnedAt,
}: {
  track: Track;
  medals: MedalProgress[];
  earnedAt: Map<string, string>;
}) {
  const done = medals.filter((m) => m.earned).length;
  const next = medals.find((m) => !m.earned);
  const current = Math.max(...medals.map((m) => m.current));
  const pct = next ? Math.round((100 * next.current) / next.target) : 100;
  return (
    <section
      aria-label={track.title}
      className="flex flex-col rounded-2xl border bg-card p-5 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
            track.tone.tile,
            track.tone.text,
          )}
        >
          <track.icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-bold">{track.title}</h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[0.68rem] font-bold tabular-nums">
              {done}/{medals.length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{track.hint}</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap justify-around gap-y-3">
        {medals.map((m, i) => (
          <Seal
            key={m.code}
            m={m}
            tierIndex={i}
            Icon={track.icon}
            when={earnedAt.has(m.code) ? dateLabel(earnedAt.get(m.code)!) : undefined}
          />
        ))}
      </ul>

      <div className="mt-5 space-y-1.5">
        <div className="flex items-baseline justify-between text-xs">
          <span className="font-semibold">
            {next ? `Próxima: ${next.name}` : "Trilha completa"}
          </span>
          <span className="tabular-nums text-muted-foreground">
            {next ? `${next.current}/${next.target} ${track.unit}` : `${current} ${track.unit}`}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", track.tone.bar)}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <Button asChild size="sm" variant={next ? "default" : "outline"} className="mt-4 self-start">
        <Link to={track.to}>
          {next ? track.cta : "Continuar praticando"} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Link>
      </Button>
    </section>
  );
}

function MedalsPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const [list, setList] = React.useState<MedalProgress[] | null>(null);
  const [wins, setWins] = React.useState<Win[]>([]);
  const [earnedAt, setEarnedAt] = React.useState<Map<string, string>>(new Map());
  const [streak, setStreak] = React.useState<{ current: number; longest: number } | null>(null);

  React.useEffect(() => {
    if (authLoading || !real) return;
    void MockService.awardAchievements()
      .then(() => MockService.getMedalProgress())
      .then(setList);
    // Datas das medalhas e conquistas manuais (aprovações registradas pela administração).
    void supabase
      .from("user_achievements")
      .select("attained_at, achievement:achievements(code,name,description,target)")
      .then(({ data }) => {
        const rows = (data ?? []) as unknown as {
          attained_at: string | null;
          achievement: (Win & { target: number | null }) | null;
        }[];
        const dates = new Map<string, string>();
        for (const r of rows)
          if (r.achievement && r.attained_at) dates.set(r.achievement.code, r.attained_at);
        setEarnedAt(dates);
        setWins(
          rows
            .map((r) => r.achievement)
            .filter((a): a is Win & { target: number | null } => !!a && a.target === null),
        );
      });
    void supabase
      .from("user_streaks")
      .select("current_streak,longest_streak")
      .eq("user_id", user!.id)
      .maybeSingle()
      .then(({ data }) =>
        setStreak({ current: data?.current_streak ?? 0, longest: data?.longest_streak ?? 0 }),
      );
  }, [authLoading, real, user]);

  if (authLoading)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
      </div>
    );
  if (!real)
    return (
      <LockedState
        image="careers-team"
        title={
          <>
            Minhas <em>medalhas</em>
          </>
        }
        description="Entre na sua conta para acompanhar as medalhas e ver quanto falta para a próxima."
      />
    );

  const byCode = new Map((list ?? []).map((m) => [m.code, m]));
  const earned = (list ?? []).filter((m) => m.earned);
  const total = (list ?? []).length;
  const upcoming = (list ?? [])
    .filter((m) => !m.earned)
    .sort((a, b) => b.current / b.target - a.current / a.target)
    .slice(0, 3);
  const recent = earned
    .filter((m) => earnedAt.has(m.code))
    .sort((a, b) => earnedAt.get(b.code)!.localeCompare(earnedAt.get(a.code)!))
    .slice(0, 3);
  const trackOf = (code: string) => TRACKS.find((t) => t.codes.includes(code));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHero
        image="careers-team"
        size="sm"
        kicker="Desempenho"
        icon={Medal}
        title={
          <>
            Minhas <em>medalhas</em>
          </>
        }
        description="Conquistadas automaticamente pelo que você faz na plataforma: questões, simulados, redações e dias seguidos de estudo."
      />

      {!list ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
        </div>
      ) : (
        <>
          <section className="grid gap-4 lg:grid-cols-[1fr_1.4fr_1fr]" aria-label="Resumo">
            <div className="rounded-2xl border bg-gradient-to-br from-amber-50 to-card p-5 dark:from-amber-950/20">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <Medal className="h-3.5 w-3.5" /> Conquistadas
              </p>
              <p className="mt-1 text-4xl font-black tabular-nums">
                {earned.length}
                <span className="text-xl font-semibold text-muted-foreground"> / {total}</span>
              </p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-300"
                  style={{ width: `${total ? (100 * earned.length) / total : 0}%` }}
                />
              </div>
              {recent.length > 0 && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Mais recente: <strong>{recent[0]!.name}</strong> em{" "}
                  {dateLabel(earnedAt.get(recent[0]!.code)!)}
                </p>
              )}
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" /> Perto de conquistar
              </p>
              {upcoming.length ? (
                <ul className="mt-3 space-y-3">
                  {upcoming.map((m) => {
                    const track = trackOf(m.code);
                    return (
                      <li key={m.code}>
                        <div className="flex items-baseline justify-between gap-2 text-sm">
                          <span className="font-semibold">{m.name}</span>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            faltam {m.target - m.current}
                          </span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn("h-full rounded-full", track?.tone.bar ?? "bg-primary")}
                            style={{ width: `${Math.round((100 * m.current) / m.target)}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-3 text-sm font-semibold">
                  Você conquistou todas as medalhas disponíveis. Novas trilhas virão.
                </p>
              )}
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <Flame className="h-3.5 w-3.5 text-orange-500" /> Constância
              </p>
              <p className="mt-1 text-4xl font-black tabular-nums">
                {streak?.current ?? 0}
                <span className="text-base font-semibold text-muted-foreground">
                  {" "}
                  {streak?.current === 1 ? "dia" : "dias"} seguidos
                </span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Recorde: <strong>{streak?.longest ?? 0}</strong>. Entrar para estudar todos os dias
                mantém a sequência; um dia sem estudar a zera.
              </p>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {TRACKS.map((track) => {
              const medals = track.codes
                .map((c) => byCode.get(c))
                .filter((m): m is MedalProgress => !!m);
              return medals.length ? (
                <TrackCard key={track.id} track={track} medals={medals} earnedAt={earnedAt} />
              ) : null;
            })}
          </div>

          <section aria-label="Conquistas" className="rounded-2xl border bg-card p-5">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <Crown className="h-4 w-4 text-amber-500" /> Conquistas
            </h2>
            <p className="text-xs text-muted-foreground">
              Aprovações em concursos reais, registradas pela administração depois de conferidas.
            </p>
            {wins.length > 0 ? (
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {wins.map((w) => (
                  <li
                    key={w.code}
                    className="flex items-start gap-3 rounded-xl border border-amber-400/50 bg-gradient-to-br from-amber-50 to-card p-4 dark:from-amber-950/20"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-yellow-500 to-amber-300 text-white shadow-lg shadow-amber-400/40">
                      <Trophy className="h-6 w-6" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-snug">
                        {w.name.replace(/^Aprovado\s+—\s+/i, "")}
                      </p>
                      {w.description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{w.description}</p>
                      )}
                      {earnedAt.has(w.code) && (
                        <p className="mt-1 flex items-center gap-1 text-[0.68rem] text-muted-foreground">
                          <CalendarCheck className="h-3 w-3" /> Registrada em{" "}
                          {dateLabel(earnedAt.get(w.code)!)}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                Sua primeira aprovação vai aparecer aqui. Quando você passar em um concurso, a
                administração registra a conquista (com edital e classificação) neste painel.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
