import { acreDateKey, acreDaysAgoKey } from "@/lib/acreTime";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  FileStack,
  Loader2,
  Radar,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { QuestionTotals } from "@/components/dashboard/QuestionTotals";
import { canonicalBoard } from "@/lib/subjects";
import { useQuestionStats } from "@/hooks/useQuestionStats";

export const Route = createFileRoute("/dashboard/admin-metrics")({
  head: () => ({
    meta: [
      { title: "Central de controle | Norte Concurso" },
      {
        name: "description",
        content: "Visão ao vivo da plataforma: cadastros, atividade e desempenho dos alunos.",
      },
      { property: "og:title", content: "Central de controle | Norte Concurso" },
      { property: "og:description", content: "Painel de controle da administração." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminMetricsPage,
});

interface Raw {
  profiles: {
    id: string;
    subscription_tier: string | null;
    created_at: string;
    full_name: string | null;
    email: string | null;
  }[];
  usage: { user_id: string; used_on: string }[];
  results: { user_id: string; created_at: string }[];
  docs: number;
  /** Simulados concluídos pelos alunos (simulador por disciplina/concurso). */
  simulados: number;
  /** Banca de cada prova enviada pelos alunos e de cada documento oficial. */
  sentBoards: string[];
  officialBoards: string[];
  roles: { user_id: string; role: string }[];
}

interface ActivityEvent {
  key: string;
  at: string;
  label: string;
  icon: LucideIcon;
}

/** Últimos N dias em ISO (yyyy-mm-dd), do mais antigo ao mais recente. */
const lastDays = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    return acreDaysAgoKey(n - 1 - i);
  });

/** Auto-atualização silenciosa da visão ao vivo, sem piscar a tela com um spinner. */
const LIVE_REFRESH_MS = 20_000;

/** Data e hora no fuso do Acre (America/Rio_Branco), ex.: 13/11/2026 18:42. */
function acreDateTime(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Rio_Branco",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.floor(ms / 60_000);
  if (min < 1) return "agora mesmo";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  return `há ${Math.floor(h / 24)} d`;
}

/** Gráfico de barras simples (SVG), uma ou duas séries por dia, com texto equivalente para leitores de tela. */
function MiniBars({
  series,
  labels,
  label,
}: {
  series: { name: string; tone: string; values: number[] }[];
  labels: string[];
  label: string;
}) {
  const n = labels.length;
  const max = Math.max(1, ...series.flatMap((s) => s.values));
  const W = 300;
  const H = 72;
  const slot = W / n;
  const bar = Math.max(1.5, (slot - 2) / series.length);
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H + 14}`} role="img" aria-label={label} className="w-full">
        <line x1="0" x2={W} y1={H} y2={H} className="stroke-border" strokeWidth="1" />
        {labels.map((_, i) =>
          series.map((s, k) => {
            const v = s.values[i] ?? 0;
            const h = (v / max) * (H - 4);
            return (
              <rect
                key={`${i}-${s.name}`}
                x={i * slot + 1 + k * bar}
                y={H - h}
                width={bar - 0.5}
                height={Math.max(v ? 1.5 : 0, h)}
                rx="1"
                className={`fill-current ${s.tone}`}
              >
                <title>{`${labels[i]} · ${s.name}: ${v}`}</title>
              </rect>
            );
          }),
        )}
        <text x="0" y={H + 11} className="fill-muted-foreground" fontSize="8">{labels[0]}</text>
        <text x={W} y={H + 11} textAnchor="end" className="fill-muted-foreground" fontSize="8">{labels[n - 1]}</text>
      </svg>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

function AdminMetricsPage() {
  const { isAdmin, user } = useAuthStatus();
  const [raw, setRaw] = useState<Raw | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) setLoading(true);
    setError(null);
    try {
      const [p, u, r, d, ro, sim, sent, off] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, subscription_tier, created_at, full_name, email")
          .limit(10000),
        supabase.from("ai_usage_logs").select("user_id, used_on").limit(50000),
        supabase.from("mock_exam_results").select("user_id, created_at").limit(50000),
        supabase.from("student_exam_documents").select("id", { count: "exact", head: true }),
        supabase.from("user_roles").select("user_id, role").limit(10000),
        supabase.from("simulator_attempts").select("id", { count: "exact", head: true }),
        supabase.from("student_exam_documents").select("exam_board").limit(50000),
        supabase.from("official_exam_documents").select("exam_board").limit(50000),
      ]);
      if (p.error) throw p.error;
      setRaw({
        profiles: p.data ?? [],
        usage: u.data ?? [],
        results: r.data ?? [],
        docs: d.count ?? 0,
        simulados: sim.count ?? 0,
        sentBoards: (sent.data ?? []).map((x) => x.exam_board ?? ""),
        officialBoards: (off.data ?? []).map((x) => x.exam_board ?? ""),
        roles: ro.data ?? [],
      });
    } catch {
      if (!opts?.silent)
        setError("Não foi possível carregar os números. Confirme que entrou como administrador.");
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!isAdmin) return;
    const id = setInterval(() => void load({ silent: true }), LIVE_REFRESH_MS);
    return () => clearInterval(id);
  }, [isAdmin, load]);

  const activity = useMemo<ActivityEvent[]>(() => {
    if (!raw) return [];
    const nameOf = (id: string) => {
      const p = raw.profiles.find((x) => x.id === id);
      return p?.full_name || p?.email || "Aluno";
    };
    const signups: ActivityEvent[] = raw.profiles.map((p) => ({
      key: `signup-${p.id}`,
      at: p.created_at,
      // Sem nome nem e-mail no perfil, mostra um trecho do identificador para distinguir os cadastros.
      label: `${p.full_name || p.email || `Cadastro sem nome (ID ${p.id.slice(0, 8)})`} se cadastrou`,
      icon: UserPlus,
    }));
    const exams: ActivityEvent[] = raw.results.map((r, i) => ({
      key: `exam-${r.user_id}-${r.created_at}-${i}`,
      at: r.created_at,
      label: `${nameOf(r.user_id)} concluiu um simulado`,
      icon: Trophy,
    }));
    return [...signups, ...exams].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 12);
  }, [raw]);

  const content = useQuestionStats(isAdmin);
  const byBoardDocs = useMemo(() => {
    const m = new Map<string, { board: string; sent: number; official: number }>();
    const bump = (list: string[], k: "sent" | "official") => {
      for (const raw of list) {
        const board = canonicalBoard(raw) || "NÃO INFORMADA";
        const row = m.get(board) ?? { board, sent: 0, official: 0 };
        row[k]++;
        m.set(board, row);
      }
    };
    bump(raw?.sentBoards ?? [], "sent");
    bump(raw?.officialBoards ?? [], "official");
    return [...m.values()].sort((a, b) => b.sent + b.official - (a.sent + a.official));
  }, [raw]);

  const stats = useMemo(() => {
    if (!raw) return null;
    // Tipo da conta: administrador > moderador > aluno.
    const roleOf = (id: string): "admin" | "moderator" | "student" => {
      const mine = raw.roles.filter((r) => r.user_id === id).map((r) => r.role);
      return mine.includes("admin")
        ? "admin"
        : mine.includes("moderator")
          ? "moderator"
          : "student";
    };
    const kind = new Map(raw.profiles.map((p) => [p.id, roleOf(p.id)]));
    const tierOf = new Map(raw.profiles.map((p) => [p.id, p.subscription_tier ?? "free"]));
    const count = (k: "admin" | "moderator" | "student") =>
      raw.profiles.filter((p) => kind.get(p.id) === k).length;
    const totals = {
      students: count("student"),
      admins: count("admin"),
      others: count("moderator"),
    };
    const days = lastDays(14);
    const inPlan = (id: string, plan: string) => (tierOf.get(id) ?? "free") === plan;
    const byPlan = SUBSCRIPTION_PLANS.map((plan) => ({
      name: plan.name,
      students: raw.profiles.filter((p) => kind.get(p.id) === "student" && inPlan(p.id, plan.id))
        .length,
      admins: raw.profiles.filter((p) => kind.get(p.id) === "admin" && inPlan(p.id, plan.id))
        .length,
      others: raw.profiles.filter((p) => kind.get(p.id) === "moderator" && inPlan(p.id, plan.id))
        .length,
      ai: raw.usage.filter((x) => kind.get(x.user_id) === "student" && inPlan(x.user_id, plan.id))
        .length,
    }));
    const byDay = days.map((day) => ({
      day,
      ai: raw.usage.filter((x) => x.used_on === day).length,
      exams: raw.results.filter((r) => acreDateKey(new Date(r.created_at)) === day).length,
      signups: raw.profiles.filter((p) => acreDateKey(new Date(p.created_at)) === day).length,
    }));
    // Aluno ativo = usou IA ou concluiu simulado nos últimos 7 dias.
    const since = lastDays(7)[0] ?? "";
    const active = new Set(
      [
        ...raw.usage.filter((x) => x.used_on >= since).map((x) => x.user_id),
        ...raw.results.filter((r) => acreDateKey(new Date(r.created_at)) >= since).map((r) => r.user_id),
      ].filter((id) => kind.get(id) === "student"),
    ).size;
    const days30 = lastDays(30).map((day) => ({
      day,
      n: raw.profiles.filter((p) => acreDateKey(new Date(p.created_at)) === day).length,
    }));
    const students = raw.profiles.filter((p) => kind.get(p.id) === "student");
    const paid = students.filter((p) => (p.subscription_tier ?? "free") !== "free").length;
    const sum = (list: { n: number }[]) => list.reduce((n, d) => n + d.n, 0);
    const signups = {
      today: days30[days30.length - 1]?.n ?? 0,
      d7: sum(days30.slice(-7)),
      d30: sum(days30),
    };
    return {
      byPlan,
      byDay,
      active,
      totals,
      paid,
      signups,
      days30,
      accounts: raw.profiles.length,
      maxAi: Math.max(1, ...byDay.map((d) => d.ai)),
    };
  }, [raw]);

  const recentSignups = useMemo(
    () =>
      raw
        ? [...raw.profiles].sort((x, y) => y.created_at.localeCompare(x.created_at)).slice(0, 6)
        : [],
    [raw],
  );

  if (!isAdmin)
    return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;

  const recentExams = activity.filter((ev) => ev.key.startsWith("exam-")).slice(0, 6);
  const planTotal = Math.max(1, stats?.totals.students ?? 1);

  return (
    <div className="mx-auto max-w-6xl space-y-3">
      <header className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Administração · ao vivo
          </p>
          <h1 className="text-xl font-black leading-tight m-0 font-sans!">Central de controle</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground sm:inline">Atualiza a cada 20 s</span>
          <Button size="sm" variant="outline" className="gap-2" onClick={() => void load()} disabled={loading}>
            <RefreshCw className="h-4 w-4" aria-hidden /> Atualizar
          </Button>
        </div>
      </header>

      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading || !stats ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
        </div>
      ) : (
        <>
          <section aria-label="Indicadores" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: Users, label: "Contas", value: stats.accounts, sub: `${stats.totals.students} alunos · ${stats.totals.admins + stats.totals.others} equipe` },
              { icon: UserPlus, label: "Novos (7 dias)", value: stats.signups.d7, sub: `hoje ${stats.signups.today} · 30 dias ${stats.signups.d30}` },
              { icon: Activity, label: "Ativos (7 dias)", value: stats.active, sub: `${Math.round((stats.active / planTotal) * 100)}% dos alunos` },
              { icon: ShieldCheck, label: "Planos pagos", value: stats.paid, sub: `${Math.round((stats.paid / planTotal) * 100)}% dos alunos` },
              { icon: Trophy, label: "Simulados", value: raw?.simulados ?? 0, sub: `${raw?.results.length ?? 0} provas resolvidas` },
              { icon: Sparkles, label: "Uso de IA", value: raw?.usage.length ?? 0, sub: `hoje ${stats.byDay[stats.byDay.length - 1]?.ai ?? 0}` },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="rounded-xl border border-border bg-card px-3 py-2.5">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" aria-hidden /> {label}
                </p>
                <p className="text-2xl font-black tabular-nums leading-tight text-foreground">{value.toLocaleString("pt-BR")}</p>
                <p className="truncate text-[11px] text-muted-foreground">{sub}</p>
              </div>
            ))}
          </section>

          <section aria-label="Gráficos" className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-3">
              <h2 className="text-sm font-bold m-0 font-sans!">Cadastros por dia</h2>
              <p className="mb-2 text-[11px] text-muted-foreground">{stats.signups.d30} nos últimos 30 dias · pico de {Math.max(0, ...stats.days30.map((d) => d.n))} em um dia</p>
              <MiniBars
                label={`Cadastros por dia nos últimos 30 dias: ${stats.signups.d30} no total`}
                series={[{ name: "Cadastros", tone: "text-primary", values: stats.days30.map((d) => d.n) }]}
                labels={stats.days30.map((d) => `${d.day.slice(8, 10)}/${d.day.slice(5, 7)}`)}
              />
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <h2 className="text-sm font-bold m-0 font-sans!">Alunos por plano</h2>
              <p className="mb-2 text-[11px] text-muted-foreground">{stats.totals.students} alunos · {stats.paid} em planos pagos</p>
              <ul className="space-y-2">
                {stats.byPlan.map((row) => (
                  <li key={row.name} className="text-xs">
                    <div className="flex justify-between gap-2">
                      <span className="font-medium text-foreground">{row.name}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {row.students} · {Math.round((row.students / planTotal) * 100)}%
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded bg-muted">
                      <div className="h-2 rounded bg-primary" style={{ width: `${(row.students / planTotal) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <h2 className="text-sm font-bold m-0 font-sans!">Atividade · 14 dias</h2>
              <p className="mb-2 flex gap-3 text-[11px] text-muted-foreground">
                <span><span className="text-primary">■</span> IA</span>
                <span><span className="text-amber-500">■</span> Provas</span>
                <span>pico de {Math.max(0, ...stats.byDay.map((d) => Math.max(d.ai, d.exams)))} por dia</span>
              </p>
              <MiniBars
                label="Uso de IA e provas resolvidas por dia nos últimos 14 dias"
                series={[
                  { name: "IA", tone: "text-primary", values: stats.byDay.map((d) => d.ai) },
                  { name: "Provas", tone: "text-amber-500", values: stats.byDay.map((d) => d.exams) },
                ]}
                labels={stats.byDay.map((d) => `${d.day.slice(8, 10)}/${d.day.slice(5, 7)}`)}
              />
            </div>
          </section>

          <section aria-label="Atividade recente" className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-3">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-bold m-0 font-sans!">Últimos cadastros</h2>
                <Link to="/dashboard/admin-students" className="text-xs font-semibold text-primary hover:underline">
                  Ver todos os alunos →
                </Link>
              </div>
              {recentSignups.length ? (
                <ul className="divide-y divide-border text-sm">
                  {recentSignups.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 py-1.5">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-foreground">{p.full_name || p.email || "Cadastro sem nome"}</span>
                        <span className="block truncate text-[11px] text-muted-foreground">{p.email}</span>
                      </span>
                      <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                        {SUBSCRIPTION_PLANS.find((pl) => pl.id === (p.subscription_tier ?? "free"))?.name ?? "Gratuito"}
                      </span>
                      <span className="w-20 shrink-0 whitespace-nowrap text-right text-[11px] text-muted-foreground">{timeAgo(p.created_at)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum cadastro ainda.</p>
              )}
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <h2 className="mb-2 text-sm font-bold m-0 font-sans!">Últimos simulados concluídos</h2>
              {recentExams.length ? (
                <ul className="divide-y divide-border text-sm">
                  {recentExams.map((ev) => (
                    <li key={ev.key} className="flex items-center gap-3 py-1.5">
                      <ev.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span className="min-w-0 flex-1 truncate text-foreground">{ev.label.replace(" concluiu um simulado", "")}</span>
                      <span className="w-20 shrink-0 whitespace-nowrap text-right text-[11px] text-muted-foreground">{timeAgo(ev.at)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum simulado concluído ainda.</p>
              )}
            </div>
          </section>
        </>
      )}

      <details className="rounded-xl border border-border bg-card">
        <summary className="cursor-pointer px-4 py-3 text-sm font-bold">
          Acervo de questões e provas enviadas
          <span className="ml-2 text-xs font-normal text-muted-foreground">conteúdo da plataforma (recolhido)</span>
        </summary>
        <div className="space-y-6 p-3">
      <QuestionTotals enabled={isAdmin} userId={user?.id} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Questões por disciplina</CardTitle>
            <CardDescription>
              Total = todas as cadastradas · No treino = liberadas aos alunos · Revisadas = com
              explicação e fonte verificadas · Oficiais + Autorais = Total.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {content.isPending ? (
              <Loader2
                className="mx-auto h-5 w-5 animate-spin text-muted-foreground"
                aria-label="Carregando"
              />
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground [&>th]:px-2 [&>th]:py-2 [&>th]:font-medium">
                    <th className="pl-0">Disciplina</th>
                    <Hint content="Todas as cadastradas"><th>Total</th></Hint>
                    <Hint content="Liberadas para treino dos alunos"><th>No treino</th></Hint>
                    <Hint content="Com explicação e fonte verificadas"><th>Revisadas</th></Hint>
                    <Hint content="De provas reais"><th>Oficiais</th></Hint>
                    <Hint content="Criadas pela plataforma"><th>Autorais</th></Hint>
                  </tr>
                </thead>
                <tbody>
                  {(content.data?.bySubject ?? []).map((s) => (
                    <tr key={s.subject} className="border-t border-border [&>td]:px-2 [&>td]:py-2">
                      <td className="pl-0 font-medium text-foreground">{s.subject}</td>
                      <td>{s.total}</td>
                      <td>{s.eligible}</td>
                      <td>{s.reviewed}</td>
                      <td>{s.official}</td>
                      <td>{s.curated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Questões por banca</CardTitle>
              <CardDescription>
                Quantas questões cada banca tem e quanto isso representa do acervo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {(content.data?.byBoard ?? []).map((b) => (
                <div key={b.board} className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-semibold text-foreground">{b.board}</span>
                    <span className="tabular-nums text-foreground">
                      {b.total.toLocaleString("pt-BR")}{" "}
                      <span className="text-xs text-muted-foreground">
                        ({Math.round((b.total / Math.max(1, content.data?.raw ?? 1)) * 100)}%)
                      </span>
                    </span>
                  </div>
                  <div
                    className="flex h-2.5 overflow-hidden rounded bg-muted"
                    style={{
                      width: `${Math.max(4, (b.total / Math.max(1, content.data?.byBoard[0]?.total ?? 1)) * 100)}%`,
                    }}
                  >
                    <div
                      className="bg-primary"
                      style={{ width: `${(b.official / b.total) * 100}%` }}
                    />
                    <div
                      className="bg-amber-500"
                      style={{ width: `${(b.curated / b.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {b.official.toLocaleString("pt-BR")} oficiais ·{" "}
                    {b.curated.toLocaleString("pt-BR")} autorais
                  </p>
                </div>
              ))}
              <p className="flex gap-4 border-t border-border pt-2 text-xs text-muted-foreground">
                <span>
                  <i className="mr-1 inline-block h-2 w-2 rounded-sm bg-primary" />
                  Oficiais
                </span>
                <span>
                  <i className="mr-1 inline-block h-2 w-2 rounded-sm bg-amber-500" />
                  Autorais
                </span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Provas enviadas por banca</CardTitle>
              <CardDescription>
                Provas enviadas pelos alunos e documentos oficiais (provas, gabaritos) cadastrados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2">Banca</th>
                    <th>Dos alunos</th>
                    <th>Oficiais</th>
                  </tr>
                </thead>
                <tbody>
                  {byBoardDocs.map((b) => (
                    <tr key={b.board} className="border-t border-border">
                      <td className="py-2 font-medium text-foreground">{b.board}</td>
                      <td>{b.sent}</td>
                      <td>{b.official}</td>
                    </tr>
                  ))}
                  {!byBoardDocs.length && (
                    <tr>
                      <td colSpan={3} className="py-3 text-muted-foreground">
                        Nenhuma prova enviada ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
      </details>
    </div>
  );
}
