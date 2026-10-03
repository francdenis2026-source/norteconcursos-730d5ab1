import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileStack, Loader2, Sparkles, Target, Trophy, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";

export const Route = createFileRoute("/dashboard/admin-student/$id")({
  head: () => ({
    meta: [
      { title: "Progresso do aluno | Norte Concurso" },
      { name: "description", content: "Provas, acertos e uso de IA de um aluno." },
      { property: "og:title", content: "Progresso do aluno | Norte Concurso" },
      { property: "og:description", content: "Acompanhamento individual do aluno." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StudentDetailPage,
});

interface Profile { full_name: string | null; email: string | null; subscription_tier: string | null; created_at: string }
interface Result { id: string; total_questions: number | null; correct_answers: number | null; finished_at: string | null; created_at: string }
interface Doc { contest_name: string | null; contest_year: string | null; exam_board: string | null; score_net: number | null; correct_count: number | null; wrong_count: number | null }
interface Data { profile: Profile | null; results: Result[]; docs: Doc[]; usage: string[] }

function StudentDetailPage() {
  const { id } = Route.useParams();
  const { isAdmin } = useAuthStatus();
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [p, r, d, u] = await Promise.all([
        supabase.from("profiles").select("full_name, email, subscription_tier, created_at").eq("id", id).maybeSingle(),
        supabase.from("mock_exam_results").select("id, total_questions, correct_answers, finished_at, created_at").eq("user_id", id).order("created_at"),
        supabase.from("student_exam_documents").select("contest_name, contest_year, exam_board, score_net, correct_count, wrong_count").eq("user_id", id),
        supabase.from("ai_usage_logs").select("used_on").eq("user_id", id),
      ]);
      if (!alive) return;
      if (p.error) { setError("Não foi possível carregar este aluno."); return; }
      setData({
        profile: p.data as Profile | null,
        results: (r.data as Result[]) ?? [],
        docs: (d.data as Doc[]) ?? [],
        usage: (u.data ?? []).map((x) => x.used_on as string),
      });
    })();
    return () => { alive = false; };
  }, [id]);

  const summary = useMemo(() => {
    if (!data) return null;
    const total = data.results.reduce((s, r) => s + (r.total_questions ?? 0), 0);
    const correct = data.results.reduce((s, r) => s + (r.correct_answers ?? 0), 0);
    // Agrupa páginas enviadas por prova (concurso + ano + banca).
    const exams = new Map<string, Doc>();
    for (const doc of data.docs) {
      const key = `${doc.contest_name ?? "Prova"}|${doc.contest_year ?? ""}|${doc.exam_board ?? ""}`;
      const prev = exams.get(key);
      if (!prev || (doc.correct_count ?? -1) > (prev.correct_count ?? -1)) exams.set(key, doc);
    }
    const days = Array.from({ length: 14 }, (_, i) => {
      const dt = new Date(); dt.setDate(dt.getDate() - (13 - i));
      const iso = dt.toISOString().slice(0, 10);
      return { iso, n: data.usage.filter((x) => x === iso).length };
    });
    return { pct: total ? Math.round((correct / total) * 100) : 0, exams: [...exams.values()], days, maxDay: Math.max(1, ...days.map((d) => d.n)) };
  }, [data]);

  if (!isAdmin) return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;
  if (error) return <p className="p-6 text-destructive">{error}</p>;
  if (!data || !summary) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>;

  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === (data.profile?.subscription_tier ?? "free"))?.name ?? "Gratuito";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Button asChild variant="ghost" size="sm" className="gap-2"><Link to="/dashboard/admin-students"><ArrowLeft className="h-4 w-4" /> Voltar para alunos</Link></Button>
      <PageHero image="study-desk" size="sm" kicker={`Plano ${plan}`} icon={UserRound}
        title={<>{data.profile?.full_name || "Aluno"}</>} description={data.profile?.email ?? ""}>
        <div className="page-hero__stats">
          <HeroStat icon={Trophy} label="Simulados feitos" value={data.results.length} />
          <HeroStat icon={Target} label="Acertos" value={`${summary.pct}%`} />
          <HeroStat icon={FileStack} label="Provas enviadas" value={summary.exams.length} />
          <HeroStat icon={Sparkles} label="Uso de IA" value={data.usage.length} />
        </div>
      </PageHero>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Evolução nos simulados</CardTitle><CardDescription>Percentual de acertos em cada simulado, do mais antigo ao mais recente.</CardDescription></CardHeader>
          <CardContent className="space-y-2">
            {data.results.length === 0 ? <p className="text-sm text-muted-foreground">Nenhum simulado concluído.</p> : data.results.map((r) => {
              const pct = r.total_questions ? Math.round(((r.correct_answers ?? 0) / r.total_questions) * 100) : 0;
              return (
                <div key={r.id} className="flex items-center gap-3 text-xs">
                  <span className="w-20 shrink-0 text-muted-foreground">{new Date(r.finished_at ?? r.created_at).toLocaleDateString("pt-BR")}</span>
                  <div className="h-3 flex-1 rounded bg-muted"><div className="h-3 rounded bg-primary" style={{ width: `${pct}%` }} /></div>
                  <span className="w-24 shrink-0 text-right text-foreground">{r.correct_answers ?? 0}/{r.total_questions ?? 0} · {pct}%</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Uso de IA — 14 dias</CardTitle><CardDescription>Resoluções pedidas ao Treinador por dia.</CardDescription></CardHeader>
          <CardContent className="space-y-1.5">
            {summary.days.map((d) => (
              <div key={d.iso} className="flex items-center gap-3 text-xs">
                <span className="w-12 shrink-0 text-muted-foreground">{d.iso.slice(8, 10)}/{d.iso.slice(5, 7)}</span>
                <div className="h-3 flex-1 rounded bg-muted"><div className="h-3 rounded bg-secondary" style={{ width: `${(d.n / summary.maxDay) * 100}%` }} /></div>
                <span className="w-8 shrink-0 text-right text-foreground">{d.n}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Provas enviadas</CardTitle><CardDescription>Concursos que o aluno já fez, com acertos e nota quando informados.</CardDescription></CardHeader>
          <CardContent>
            {summary.exams.length === 0 ? <p className="text-sm text-muted-foreground">Nenhuma prova enviada.</p> : (
              <ul className="divide-y divide-border text-sm">
                {summary.exams.map((e, i) => (
                  <li key={`${e.contest_name}-${e.contest_year}-${i}`} className="flex flex-wrap justify-between gap-2 py-2">
                    <span className="font-medium text-foreground">{e.contest_name ?? "Prova"} {e.contest_year ? `(${e.contest_year})` : ""} {e.exam_board ? `· ${e.exam_board}` : ""}</span>
                    <span className="text-muted-foreground">
                      {e.correct_count != null ? `${e.correct_count} acertos` : ""}{e.wrong_count != null ? ` · ${e.wrong_count} erros` : ""}{e.score_net != null ? ` · nota ${e.score_net}` : ""}
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
