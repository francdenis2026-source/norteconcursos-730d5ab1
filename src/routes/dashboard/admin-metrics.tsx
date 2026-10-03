import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, BarChart3, FileStack, Loader2, RefreshCw, Sparkles, Trophy, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";

export const Route = createFileRoute("/dashboard/admin-metrics")({
  head: () => ({
    meta: [
      { title: "Números gerais | Norte Concurso" },
      { name: "description", content: "Alunos cadastrados, provas resolvidas e uso de IA por plano e por dia." },
      { property: "og:title", content: "Números gerais | Norte Concurso" },
      { property: "og:description", content: "Painel de métricas da administração." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminMetricsPage,
});

interface Raw {
  profiles: { id: string; subscription_tier: string | null; created_at: string }[];
  usage: { user_id: string; used_on: string }[];
  results: { user_id: string; created_at: string }[];
  docs: number;
}

/** Últimos N dias em ISO (yyyy-mm-dd), do mais antigo ao mais recente. */
const lastDays = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toISOString().slice(0, 10);
  });

function AdminMetricsPage() {
  const { isAdmin } = useAuthStatus();
  const [raw, setRaw] = useState<Raw | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, u, r, d] = await Promise.all([
        supabase.from("profiles").select("id, subscription_tier, created_at").limit(10000),
        supabase.from("ai_usage_logs").select("user_id, used_on").limit(50000),
        supabase.from("mock_exam_results").select("user_id, created_at").limit(50000),
        supabase.from("student_exam_documents").select("id", { count: "exact", head: true }),
      ]);
      if (p.error) throw p.error;
      setRaw({ profiles: p.data ?? [], usage: u.data ?? [], results: r.data ?? [], docs: d.count ?? 0 });
    } catch {
      setError("Não foi possível carregar os números. Confirme que entrou como administrador.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const stats = useMemo(() => {
    if (!raw) return null;
    const tierOf = new Map(raw.profiles.map((p) => [p.id, p.subscription_tier ?? "free"]));
    const days = lastDays(14);
    const byPlan = SUBSCRIPTION_PLANS.map((plan) => ({
      name: plan.name,
      students: raw.profiles.filter((p) => (p.subscription_tier ?? "free") === plan.id).length,
      ai: raw.usage.filter((x) => (tierOf.get(x.user_id) ?? "free") === plan.id).length,
    }));
    const byDay = days.map((day) => ({
      day,
      ai: raw.usage.filter((x) => x.used_on === day).length,
      exams: raw.results.filter((r) => r.created_at.slice(0, 10) === day).length,
      signups: raw.profiles.filter((p) => p.created_at.slice(0, 10) === day).length,
    }));
    // Aluno ativo = usou IA ou concluiu simulado nos últimos 7 dias.
    const since = lastDays(7)[0] ?? "";
    const active = new Set([
      ...raw.usage.filter((x) => x.used_on >= since).map((x) => x.user_id),
      ...raw.results.filter((r) => r.created_at.slice(0, 10) >= since).map((r) => r.user_id),
    ]).size;
    return { byPlan, byDay, active, maxAi: Math.max(1, ...byDay.map((d) => d.ai)) };
  }, [raw]);

  if (!isAdmin) return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Administração"
        icon={BarChart3}
        title={<>Números <em>gerais</em></>}
        description="Visão consolidada de alunos, provas e uso de IA na plataforma."
        actions={<Button className="hero-btn-ghost gap-2" onClick={() => void load()} disabled={loading}><RefreshCw className="h-4 w-4" aria-hidden /> Atualizar</Button>}
      >
        <div className="page-hero__stats">
          <HeroStat icon={Users} label="Alunos cadastrados" value={raw?.profiles.length ?? 0} />
          <HeroStat icon={Activity} label="Ativos (7 dias)" value={stats?.active ?? 0} />
          <HeroStat icon={Trophy} label="Provas resolvidas" value={raw?.results.length ?? 0} />
          <HeroStat icon={FileStack} label="Páginas enviadas" value={raw?.docs ?? 0} />
          <HeroStat icon={Sparkles} label="Uso de IA total" value={raw?.usage.length ?? 0} />
        </div>
      </PageHero>

      {error && <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      {loading || !stats ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Por plano</CardTitle>
              <CardDescription>Alunos e resoluções com IA em cada plano.</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead><tr className="text-left text-muted-foreground"><th className="py-2">Plano</th><th>Alunos</th><th>Uso de IA</th></tr></thead>
                <tbody>
                  {stats.byPlan.map((row) => (
                    <tr key={row.name} className="border-t border-border"><td className="py-2 font-medium text-foreground">{row.name}</td><td>{row.students}</td><td>{row.ai}</td></tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Últimos 14 dias</CardTitle>
              <CardDescription>Uso de IA por dia (barras), provas resolvidas e novos cadastros.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {stats.byDay.map((d) => (
                <div key={d.day} className="flex items-center gap-3 text-xs">
                  <span className="w-12 shrink-0 text-muted-foreground">{d.day.slice(8, 10)}/{d.day.slice(5, 7)}</span>
                  <div className="h-3 flex-1 rounded bg-muted">
                    <div className="h-3 rounded bg-primary" style={{ width: `${(d.ai / stats.maxAi) * 100}%` }} />
                  </div>
                  <span className="w-36 shrink-0 text-right text-foreground">{d.ai} IA · {d.exams} provas · {d.signups} cad.</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
