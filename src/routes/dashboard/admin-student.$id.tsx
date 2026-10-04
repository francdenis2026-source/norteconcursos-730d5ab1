import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, FileStack, Loader2, Target, Trophy, UserRound, ListChecks } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { fmtClock } from "@/components/dashboard/SessionClock";

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
interface Sim { id: string; title: string; total_questions: number; correct_answers: number; wrong_answers: number; blank_answers: number; accuracy: number; finished_at: string }
interface Subject { subject: string; answered: number; correct: number }
interface Day { day: string; questions: number; correct: number; seconds: number }
interface Progress { simulators: Sim[]; subjects: Subject[]; days: Day[]; total_answered: number; total_correct: number }
interface Doc { contest_name: string | null; contest_year: string | null; exam_board: string | null; score_net: number | null; correct_count: number | null; wrong_count: number | null }
interface Data { profile: Profile | null; progress: Progress | null; docs: Doc[] }

function StudentDetailPage() {
  const { id } = Route.useParams();
  const { isAdmin } = useAuthStatus();
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [p, r, d] = await Promise.all([
        supabase.from("profiles").select("full_name, email, subscription_tier, created_at").eq("id", id).maybeSingle(),
        supabase.rpc("admin_student_progress", { _user_id: id }),
        supabase.from("student_exam_documents").select("contest_name, contest_year, exam_board, score_net, correct_count, wrong_count").eq("user_id", id),
      ]);
      if (!alive) return;
      if (p.error) { setError("Não foi possível carregar este aluno."); return; }
      setData({
        profile: p.data as Profile | null,
        progress: r.error ? null : (r.data as unknown as Progress),
        docs: (d.data as Doc[]) ?? [],
      });
    })();
    return () => { alive = false; };
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
    const seconds = days.reduce((n, d) => n + d.seconds, 0);
    return {
      pct: total ? Math.round((correct / total) * 100) : 0,
      total,
      seconds,
      exams: [...exams.values()],
      days,
      maxQ: Math.max(1, ...days.map((d) => d.questions)),
    };
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
          <HeroStat icon={Trophy} label="Simulados feitos" value={data.progress?.simulators.length ?? 0} />
          <HeroStat icon={ListChecks} label="Questões resolvidas" value={summary.total} />
          <HeroStat icon={Target} label="Acertos" value={`${summary.pct}%`} />
          <HeroStat icon={Clock} label="Estudo (14 dias)" value={fmtClock(summary.seconds)} />
          <HeroStat icon={FileStack} label="Provas enviadas" value={summary.exams.length} />
        </div>
      </PageHero>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Evolução nos simulados</CardTitle><CardDescription>Percentual de acertos em cada simulado, do mais antigo ao mais recente.</CardDescription></CardHeader>
          <CardContent className="space-y-2">
            {!data.progress || data.progress.simulators.length === 0 ? <p className="text-sm text-muted-foreground">Nenhum simulado concluído.</p> : data.progress.simulators.map((r) => {
              const pct = Math.round(Number(r.accuracy));
              return (
                <div key={r.id} className="flex items-center gap-3 text-xs">
                  <span className="w-20 shrink-0 text-muted-foreground">{new Date(r.finished_at).toLocaleDateString("pt-BR")}</span>
                  <div className="h-3 flex-1 rounded bg-muted"><div className="h-3 rounded bg-primary" style={{ width: `${pct}%` }} /></div>
                  <span className="w-24 shrink-0 text-right text-foreground">{r.correct_answers}/{r.total_questions} · {pct}%</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Atividade — 14 dias</CardTitle><CardDescription>Questões resolvidas por dia e minutos de estudo na plataforma.</CardDescription></CardHeader>
          <CardContent className="space-y-1.5">
            {summary.days.map((d) => (
              <div key={d.day} className="flex items-center gap-3 text-xs">
                <span className="w-12 shrink-0 text-muted-foreground">{d.day.slice(8, 10)}/{d.day.slice(5, 7)}</span>
                <div className="h-3 flex-1 rounded bg-muted"><div className="h-3 rounded bg-secondary" style={{ width: `${(d.questions / summary.maxQ) * 100}%` }} /></div>
                <span className="w-32 shrink-0 text-right text-foreground">{d.questions} questões · {Math.round(d.seconds / 60)} min</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Desempenho por matéria</CardTitle><CardDescription>Acertos por disciplina, da mais praticada à menos. Em vermelho: abaixo de 60%.</CardDescription></CardHeader>
          <CardContent className="space-y-2">
            {!data.progress || data.progress.subjects.length === 0 ? <p className="text-sm text-muted-foreground">Nenhuma questão resolvida ainda.</p> : data.progress.subjects.map((m) => {
              const pct = m.answered ? Math.round((m.correct / m.answered) * 100) : 0;
              return (
                <div key={m.subject} className="flex items-center gap-3 text-xs">
                  <span className="w-44 shrink-0 truncate text-foreground" title={m.subject}>{m.subject}</span>
                  <div className="h-3 flex-1 rounded bg-muted"><div className={pct < 60 ? "h-3 rounded bg-rose-500" : "h-3 rounded bg-emerald-500"} style={{ width: `${pct}%` }} /></div>
                  <span className="w-28 shrink-0 text-right text-foreground">{m.correct}/{m.answered} · {pct}%</span>
                </div>
              );
            })}
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
