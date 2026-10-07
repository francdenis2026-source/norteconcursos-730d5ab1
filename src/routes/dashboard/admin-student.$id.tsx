import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  Clock,
  Compass,
  FileStack,
  Flame,
  Loader2,
  Target,
  Trophy,
  UserRound,
  ListChecks,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { fmtClock } from "@/lib/studyClock";
import { fmtDateTime } from "@/lib/displayFormat";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/admin-student/$id")({
  head: () => ({
    meta: [
      { title: "Progresso do aluno | Norte Concurso" },
      { name: "description", content: "Central completa de métricas de um aluno." },
      { property: "og:title", content: "Progresso do aluno | Norte Concurso" },
      { property: "og:description", content: "Acompanhamento individual do aluno." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StudentDetailPage,
});

interface Profile {
  full_name: string | null;
  email: string | null;
  subscription_tier: string | null;
  created_at: string;
}
interface Sim {
  id: string;
  title: string;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  blank_answers: number;
  accuracy: number;
  finished_at: string;
}
interface Subject {
  subject: string;
  answered: number;
  correct: number;
}
interface Day {
  day: string;
  questions: number;
  correct: number;
  seconds: number;
}
interface CutoffGap {
  contest_name: string;
  contest_year: string;
  cutoff_score: number;
  best_score: number;
  gap: number;
}
interface Progress {
  simulators: Sim[];
  subjects: Subject[];
  days: Day[];
  days_window: number;
  total_answered: number;
  total_correct: number;
  practice_split: {
    treino: { answered: number; correct: number };
    simulado: { answered: number; correct: number };
  };
  streak: { current: number; longest: number } | null;
  rank: { total_points: number; stars: number; level_name: string } | null;
  cutoff_gaps: CutoffGap[];
}
interface Doc {
  contest_name: string | null;
  contest_year: string | null;
  exam_board: string | null;
  score_net: number | null;
  correct_count: number | null;
  wrong_count: number | null;
}
interface Details {
  cpf: string | null;
  email_confirmed_at: string | null;
  last_sign_in_at: string | null;
  is_activated: boolean;
  expires_at: string | null;
  is_admin: boolean;
  medals: number;
  essays: number;
  paid_total_cents: number;
  payments: {
    entry_date: string;
    category: string;
    description: string | null;
    amount_cents: number;
    plan_id: string | null;
  }[];
  plan_history: {
    event_type: string;
    old_tier: string | null;
    new_tier: string;
    created_at: string;
    reason: string | null;
  }[];
}
interface TimeStats {
  total_seconds: number;
  today_seconds: number;
  sessions: number;
  online: boolean;
}
interface Data {
  profile: Profile | null;
  progress: Progress | null;
  docs: Doc[];
  details: Details | null;
  time: TimeStats | null;
}

const fmtDate = (iso?: string | null) =>
  iso ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString("pt-BR") : "—";
const money = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const planName = (id?: string | null) =>
  SUBSCRIPTION_PLANS.find((p) => p.id === id)?.name ?? id ?? "—";
const formatCpf = (c?: string | null) =>
  c && c.length === 11 ? c.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : (c ?? "—");

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

function StudentDetailPage() {
  const { id } = Route.useParams();
  const { isAdmin } = useAuthStatus();
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [p, r, d, det, time] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, email, subscription_tier, created_at")
          .eq("id", id)
          .maybeSingle(),
        supabase.rpc("admin_student_progress", { _user_id: id, _days: 30 }),
        supabase
          .from("student_exam_documents")
          .select("contest_name, contest_year, exam_board, score_net, correct_count, wrong_count")
          .eq("user_id", id),
        supabase.rpc("admin_student_details", { _user_id: id }),
        supabase.rpc("admin_student_time", { _user_id: id }),
      ]);
      if (!alive) return;
      if (p.error) {
        setError("Não foi possível carregar este aluno.");
        return;
      }
      setData({
        profile: p.data as Profile | null,
        progress: r.error ? null : (r.data as unknown as Progress),
        docs: (d.data as Doc[]) ?? [],
        details: det.error ? null : (det.data as unknown as Details),
        time: time.error ? null : (time.data as unknown as TimeStats),
      });
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const summary = useMemo(() => {
    if (!data) return null;
    const pg = data.progress;
    const total = pg?.total_answered ?? 0;
    const correct = pg?.total_correct ?? 0;
    // Agrupa páginas enviadas por prova (concurso + ano + banca).
    const exams = new Map<string, Doc>();
    for (const doc of data.docs) {
      const key = `${doc.contest_name ?? "Prova"}|${doc.contest_year ?? ""}|${doc.exam_board ?? ""}`;
      const prev = exams.get(key);
      if (!prev || (doc.correct_count ?? -1) > (prev.correct_count ?? -1)) exams.set(key, doc);
    }
    const days = pg?.days ?? [];
    return {
      pct: total ? Math.round((correct / total) * 100) : 0,
      total,
      exams: [...exams.values()],
      days,
      maxQ: Math.max(1, ...days.map((d) => d.questions)),
    };
  }, [data]);

  const pending = useMemo(() => {
    const det = data?.details;
    if (!det) return [];
    const list: string[] = [];
    if (!det.email_confirmed_at) list.push("E-mail ainda não confirmado.");
    if (det.expires_at && new Date(det.expires_at) < new Date())
      list.push(`Plano vencido em ${fmtDate(det.expires_at)}.`);
    if (!det.last_sign_in_at) list.push("Nunca fez login.");
    return list;
  }, [data]);

  if (!isAdmin)
    return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;
  if (error) return <p className="p-6 text-destructive">{error}</p>;
  if (!data || !summary)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
      </div>
    );

  const plan =
    SUBSCRIPTION_PLANS.find((p) => p.id === (data.profile?.subscription_tier ?? "free"))?.name ??
    "Gratuito";
  const streak = data.progress?.streak ?? { current: 0, longest: 0 };
  const rank = data.progress?.rank ?? null;
  const split = data.progress?.practice_split ?? {
    treino: { answered: 0, correct: 0 },
    simulado: { answered: 0, correct: 0 },
  };
  const cutoffGaps = data.progress?.cutoff_gaps ?? [];
  const daysWindow = data.progress?.days_window ?? 30;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Button asChild variant="ghost" size="sm" className="gap-2">
        <Link to="/dashboard/admin-students">
          <ArrowLeft className="h-4 w-4" /> Voltar para alunos
        </Link>
      </Button>
      <PageHero
        image="study-desk"
        size="sm"
        kicker={`Plano ${plan}${data.time?.online ? " · online agora" : ""}`}
        icon={UserRound}
        title={<>{data.profile?.full_name || "Aluno"}</>}
        description={data.profile?.email ?? ""}
      >
        <div className="page-hero__stats">
          <HeroStat
            icon={Clock}
            label="Tempo total na plataforma"
            value={data.time ? fmtClock(data.time.total_seconds) : "—"}
          />
          <HeroStat icon={ListChecks} label="Questões resolvidas" value={summary.total} />
          <HeroStat icon={Target} label="Acertos" value={`${summary.pct}%`} />
          <HeroStat
            icon={Flame}
            label="Sequência"
            value={`${streak.current} dia${streak.current === 1 ? "" : "s"}`}
          />
          <HeroStat
            icon={Trophy}
            label={rank ? rank.level_name : "Nível"}
            value={rank ? `${rank.total_points} pts` : "—"}
          />
          <HeroStat icon={FileStack} label="Provas enviadas" value={summary.exams.length} />
        </div>
      </PageHero>

      <Card>
        <CardHeader>
          <CardTitle>Pendências</CardTitle>
          <CardDescription>Itens que podem precisar de atenção do administrador.</CardDescription>
        </CardHeader>
        <CardContent>
          {pending.length === 0 ? (
            <p className="flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle2 className="h-4 w-4" /> Nenhuma pendência.
            </p>
          ) : (
            <ul className="space-y-1">
              {pending.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertTriangle className="h-4 w-4" /> {p}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cadastro, acesso e plano</CardTitle>
            <CardDescription>Dados de conta e situação do plano atual.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <dl className="grid grid-cols-2 gap-3">
              <Field label="CPF" value={formatCpf(data.details?.cpf)} />
              <Field label="Cadastro em" value={fmtDateTime(data.profile?.created_at ?? null)} />
              <Field
                label="E-mail confirmado"
                value={
                  data.details?.email_confirmed_at ? (
                    fmtDateTime(data.details.email_confirmed_at)
                  ) : (
                    <Badge variant="outline">Não</Badge>
                  )
                }
              />
              <Field
                label="Último login"
                value={fmtDateTime(data.details?.last_sign_in_at ?? null)}
              />
              <Field label="Plano vigente" value={<Badge>{plan}</Badge>} />
              <Field
                label="Vencimento"
                value={
                  data.details?.expires_at ? fmtDate(data.details.expires_at) : "Sem vencimento"
                }
              />
            </dl>
            {(data.details?.plan_history.length ?? 0) > 0 && (
              <ul className="space-y-1 border-t border-border pt-2 text-xs text-muted-foreground">
                {data.details!.plan_history.map((h) => (
                  <li key={h.created_at + h.new_tier}>
                    {fmtDateTime(h.created_at)} · {planName(h.old_tier)} →{" "}
                    <strong className="text-foreground">{planName(h.new_tier)}</strong>
                    {h.reason ? ` · ${h.reason}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pagamentos</CardTitle>
            <CardDescription>
              Lançamentos registrados no Financeiro para este aluno.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              Total recebido: <strong>{money(data.details?.paid_total_cents ?? 0)}</strong>
            </p>
            {(data.details?.payments.length ?? 0) === 0 ? (
              <p className="text-xs text-muted-foreground">Nenhum pagamento lançado.</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {data.details!.payments.map((p, i) => (
                  <li key={i} className="flex justify-between gap-2">
                    <span className="text-muted-foreground">
                      {fmtDate(p.entry_date)} · {p.description || p.category}
                      {p.plan_id ? ` · ${planName(p.plan_id)}` : ""}
                    </span>
                    <strong>{money(p.amount_cents)}</strong>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução nos simulados</CardTitle>
            <CardDescription>
              Percentual de acertos em cada simulado, do mais antigo ao mais recente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {!data.progress || data.progress.simulators.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum simulado concluído.</p>
            ) : (
              data.progress.simulators.map((r) => {
                const pct = Math.round(Number(r.accuracy));
                return (
                  <div key={r.id} className="flex items-center gap-3 text-xs">
                    <span className="w-20 shrink-0 text-muted-foreground">
                      {new Date(r.finished_at).toLocaleDateString("pt-BR")}
                    </span>
                    <div className="h-3 flex-1 rounded bg-muted">
                      <div className="h-3 rounded bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-24 shrink-0 text-right text-foreground">
                      {r.correct_answers}/{r.total_questions} · {pct}%
                    </span>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade — últimos {daysWindow} dias</CardTitle>
            <CardDescription>
              Dias em que o aluno estudou na plataforma: questões resolvidas e minutos de estudo.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-80 space-y-1.5 overflow-y-auto">
            {summary.days.every((d) => d.questions === 0 && d.seconds === 0) ? (
              <p className="text-sm text-muted-foreground">
                Nenhuma atividade registrada neste período.
              </p>
            ) : (
              summary.days.map((d) => (
                <div key={d.day} className="flex items-center gap-3 text-xs">
                  <span className="w-12 shrink-0 text-muted-foreground">
                    {d.day.slice(8, 10)}/{d.day.slice(5, 7)}
                  </span>
                  <div className="h-3 flex-1 rounded bg-muted">
                    <div
                      className="h-3 rounded bg-secondary"
                      style={{ width: `${(d.questions / summary.maxQ) * 100}%` }}
                    />
                  </div>
                  <span className="w-32 shrink-0 text-right text-foreground">
                    {d.questions} questões · {Math.round(d.seconds / 60)} min
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-primary" aria-hidden /> Teoria x prática
            </CardTitle>
            <CardDescription>
              Questões avulsas no Treinador (estudo dirigido por matéria) comparadas às respondidas
              dentro de simulados cronometrados (prática de prova).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Treino (questões avulsas)", v: split.treino },
              { label: "Simulado (prática de prova)", v: split.simulado },
            ].map(({ label, v }) => {
              const pct = v.answered ? Math.round((v.correct / v.answered) * 100) : 0;
              return (
                <div key={label} className="flex items-center gap-3 text-xs">
                  <span className="w-44 shrink-0 text-foreground">{label}</span>
                  <div className="h-3 flex-1 rounded bg-muted">
                    <div
                      className={cn("h-3 rounded", pct < 60 ? "bg-rose-500" : "bg-emerald-500")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-28 shrink-0 text-right text-foreground">
                    {v.correct}/{v.answered} · {pct}%
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Desempenho por matéria</CardTitle>
            <CardDescription>
              Acertos por disciplina, da mais praticada à menos. Em vermelho: abaixo de 60%.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {!data.progress || data.progress.subjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma questão resolvida ainda.</p>
            ) : (
              data.progress.subjects.map((m) => {
                const pct = m.answered ? Math.round((m.correct / m.answered) * 100) : 0;
                return (
                  <div key={m.subject} className="flex items-center gap-3 text-xs">
                    <span className="w-44 shrink-0 truncate text-foreground" title={m.subject}>
                      {m.subject}
                    </span>
                    <div className="h-3 flex-1 rounded bg-muted">
                      <div
                        className={
                          pct < 60 ? "h-3 rounded bg-rose-500" : "h-3 rounded bg-emerald-500"
                        }
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-28 shrink-0 text-right text-foreground">
                      {m.correct}/{m.answered} · {pct}%
                    </span>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-primary" aria-hidden /> Quanto falta para a aprovação
            </CardTitle>
            <CardDescription>
              Compara a melhor nota líquida enviada pelo aluno com a nota de corte do mesmo concurso
              (quando conhecida).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {cutoffGaps.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Sem nota de corte conhecida para cruzar com as provas enviadas por este aluno.
              </p>
            ) : (
              cutoffGaps
                .sort((a, b) => a.gap - b.gap)
                .map((g) => (
                  <div
                    key={`${g.contest_name}-${g.contest_year}`}
                    className="rounded-xl border p-3 text-sm"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-semibold">
                        {g.contest_name} — {g.contest_year}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-bold",
                          g.gap >= 0
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300"
                            : "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300",
                        )}
                      >
                        {g.gap >= 0
                          ? `+${g.gap.toFixed(1)} acima do corte`
                          : `${Math.abs(g.gap).toFixed(1)} pontos para o corte`}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Melhor nota: {g.best_score.toFixed(1)} · Nota de corte:{" "}
                      {g.cutoff_score.toFixed(1)}
                    </p>
                  </div>
                ))
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Provas enviadas</CardTitle>
            <CardDescription>
              Concursos que o aluno já fez, com acertos e nota quando informados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {summary.exams.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma prova enviada.</p>
            ) : (
              <ul className="divide-y divide-border text-sm">
                {summary.exams.map((e, i) => (
                  <li
                    key={`${e.contest_name}-${e.contest_year}-${i}`}
                    className="flex flex-wrap justify-between gap-2 py-2"
                  >
                    <span className="font-medium text-foreground">
                      {e.contest_name ?? "Prova"} {e.contest_year ? `(${e.contest_year})` : ""}{" "}
                      {e.exam_board ? `· ${e.exam_board}` : ""}
                    </span>
                    <span className="text-muted-foreground">
                      {e.correct_count != null ? `${e.correct_count} acertos` : ""}
                      {e.wrong_count != null ? ` · ${e.wrong_count} erros` : ""}
                      {e.score_net != null ? ` · nota ${e.score_net}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
