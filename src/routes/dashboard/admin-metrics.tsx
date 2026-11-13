import { acreDateKey, acreDaysAgoKey } from "@/lib/acreTime";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.floor(ms / 60_000);
  if (min < 1) return "agora mesmo";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  return `há ${Math.floor(h / 24)} d`;
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
      label: `${p.full_name || p.email || "Novo aluno"} se cadastrou`,
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
    return { byPlan, byDay, active, totals, maxAi: Math.max(1, ...byDay.map((d) => d.ai)) };
  }, [raw]);

  if (!isAdmin)
    return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Administração · ao vivo"
        icon={Radar}
        title={
          <>
            Central de <em>controle</em>
          </>
        }
        description="Visão ao vivo de cadastros, atividade e desempenho dos alunos na plataforma. Atualiza sozinha a cada 20 segundos."
        actions={
          <Button className="hero-btn-ghost gap-2" onClick={() => void load()} disabled={loading}>
            <RefreshCw className="h-4 w-4" aria-hidden /> Atualizar
          </Button>
        }
      >
        <div className="page-hero__stats">
          <HeroStat icon={Users} label="Alunos cadastrados" value={stats?.totals.students ?? 0} />
          <HeroStat icon={ShieldCheck} label="Administradores" value={stats?.totals.admins ?? 0} />
          <HeroStat icon={Activity} label="Ativos (7 dias)" value={stats?.active ?? 0} />
          <HeroStat icon={Trophy} label="Provas resolvidas" value={raw?.results.length ?? 0} />
          <HeroStat icon={Trophy} label="Simulados feitos" value={raw?.simulados ?? 0} />
          <HeroStat icon={FileStack} label="Provas enviadas" value={raw?.docs ?? 0} />
          <HeroStat icon={Sparkles} label="Uso de IA total" value={raw?.usage.length ?? 0} />
        </div>
      </PageHero>

      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Atividade ao vivo
          </CardTitle>
          <CardDescription>Últimos cadastros e simulados concluídos na plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          {activity.length ? (
            <ul className="space-y-2.5 text-sm">
              {activity.map((ev) => (
                <li key={ev.key} className="flex items-center gap-3">
                  <ev.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="flex-1 text-foreground">{ev.label}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(ev.at)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhuma atividade registrada ainda.</p>
          )}
        </CardContent>
      </Card>

      {loading || !stats ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Por plano</CardTitle>
              <CardDescription>
                Contas por tipo (aluno, administrador, outros) e resoluções com IA dos alunos em
                cada plano.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2">Plano</th>
                    <th>Alunos</th>
                    <th>Admins</th>
                    <th>Outros</th>
                    <th>Uso de IA</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.byPlan.map((row) => (
                    <tr key={row.name} className="border-t border-border">
                      <td className="py-2 font-medium text-foreground">{row.name}</td>
                      <td>{row.students}</td>
                      <td>{row.admins}</td>
                      <td>{row.others}</td>
                      <td>{row.ai}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-border font-semibold text-foreground">
                    <td className="py-2">Total</td>
                    <td>{stats.totals.students}</td>
                    <td>{stats.totals.admins}</td>
                    <td>{stats.totals.others}</td>
                    <td>{stats.byPlan.reduce((n, r) => n + r.ai, 0)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs text-muted-foreground">
                Outros = moderadores. Administradores não entram na contagem de alunos nem no uso de
                IA.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Últimos 14 dias</CardTitle>
              <CardDescription>
                Uso de IA por dia (barras), provas resolvidas e novos cadastros.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {stats.byDay.map((d) => (
                <div key={d.day} className="flex items-center gap-3 text-xs">
                  <span className="w-12 shrink-0 text-muted-foreground">
                    {d.day.slice(8, 10)}/{d.day.slice(5, 7)}
                  </span>
                  <div className="h-3 flex-1 rounded bg-muted">
                    <div
                      className="h-3 rounded bg-primary"
                      style={{ width: `${(d.ai / stats.maxAi) * 100}%` }}
                    />
                  </div>
                  <span className="w-36 shrink-0 text-right text-foreground">
                    {d.ai} IA · {d.exams} provas · {d.signups} cad.
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

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
  );
}
