import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUp, CalendarDays, Compass, Gauge, Loader2, Minus, Settings2, Sparkles, Target } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
import {
  buildPlan,
  CAREERS,
  diffShares,
  type CareerId,
  type Experience,
  type SubjectStat,
} from "@/lib/studyEngine";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/study-coach")({ component: StudyCoachPage });

interface Profile {
  experience: Experience;
  career: CareerId;
  exam_date: string | null;
  hours_per_week: number;
  last_plan: { at: string; shares: Record<string, number> } | null;
}

const EXPERIENCE: [Experience, string, string][] = [
  ["first", "Meu primeiro concurso", "Nunca estudei para concurso público. Quero começar do jeito certo."],
  ["some", "Já estudei um pouco", "Já fiz provas ou estudei por conta, mas ainda não fui aprovado."],
  ["veteran", "Concurseiro experiente", "Já tenho base sólida e quero afinar a estratégia."],
];

const HOURS = [5, 8, 10, 15, 20, 25, 30, 40];

function Wizard({ initial, onSave, onCancel }: { initial: Profile | null; onSave: (p: Omit<Profile, "last_plan">) => Promise<void>; onCancel?: () => void }) {
  const [step, setStep] = React.useState(0);
  const [experience, setExperience] = React.useState<Experience | null>(initial?.experience ?? null);
  const [career, setCareer] = React.useState<CareerId>(initial?.career ?? "PF");
  const [examDate, setExamDate] = React.useState(initial?.exam_date ?? "");
  const [hours, setHours] = React.useState(initial?.hours_per_week ?? 10);
  const [busy, setBusy] = React.useState(false);

  const steps = ["Experiência", "Objetivo", "Disponibilidade"];
  const canNext = step === 0 ? !!experience : true;

  async function finish() {
    if (!experience) return;
    setBusy(true);
    await onSave({ experience, career, exam_date: examDate || null, hours_per_week: hours });
    setBusy(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Vamos montar o seu plano</CardTitle>
        <CardDescription>Três perguntas rápidas. Depois o plano se ajusta sozinho conforme você estuda.</CardDescription>
        <ol className="flex gap-2 pt-2 text-xs" aria-label="Etapas">
          {steps.map((s, i) => (
            <li key={s} className={cn("rounded-full px-3 py-1 font-semibold", i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")}>
              {i + 1}. {s}
            </li>
          ))}
        </ol>
      </CardHeader>
      <CardContent className="space-y-5">
        {step === 0 && (
          <div className="grid gap-3 md:grid-cols-3" role="radiogroup" aria-label="Sua experiência com concursos">
            {EXPERIENCE.map(([id, title, text]) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={experience === id}
                onClick={() => setExperience(id)}
                className={cn("rounded-xl border p-4 text-left transition-colors", experience === id ? "border-primary bg-primary/10" : "hover:border-primary/50")}
              >
                <p className="font-bold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="career">Carreira que você quer</Label>
              <select id="career" value={career} onChange={(e) => setCareer(e.target.value as CareerId)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {CAREERS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam">Data da prova (se já souber)</Label>
              <Input id="exam" type="date" value={examDate} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setExamDate(e.target.value)} />
              <p className="text-xs text-muted-foreground">Sem data? Deixe em branco: o plano assume 24 semanas e você ajusta depois.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Label>Quantas horas por semana você consegue estudar de verdade?</Label>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Horas por semana">
              {HOURS.map((h) => (
                <button key={h} type="button" role="radio" aria-checked={hours === h} onClick={() => setHours(h)}
                  className={cn("rounded-full border px-4 py-2 text-sm font-semibold", hours === h ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}>
                  {h} h/semana
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Seja realista: é melhor cumprir 8 horas do que prometer 25 e desistir.</p>
          </div>
        )}

        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex gap-2">
            {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)}>Voltar</Button>}
            {onCancel && <Button variant="ghost" onClick={onCancel}>Cancelar</Button>}
          </div>
          {step < 2 ? (
            <Button disabled={!canNext} onClick={() => setStep(step + 1)}>Continuar <ArrowRight className="h-4 w-4" /></Button>
          ) : (
            <Button disabled={busy || !experience} onClick={() => void finish()}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Gerar meu plano"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function TrendIcon({ t }: { t: "up" | "down" | "flat" | null }) {
  if (t === "up") return <ArrowUp className="h-3.5 w-3.5 text-emerald-600" aria-label="melhorando" />;
  if (t === "down") return <ArrowDown className="h-3.5 w-3.5 text-rose-600" aria-label="piorando" />;
  if (t === "flat") return <Minus className="h-3.5 w-3.5 text-muted-foreground" aria-label="estável" />;
  return null;
}

function StudyCoachPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [stats, setStats] = React.useState<SubjectStat[]>([]);
  const [hoursStudied, setHoursStudied] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(false);
  const real = !!user && user.id !== "demo-user";

  const load = React.useCallback(async () => {
    if (!user) return;
    const [p, s, h] = await Promise.all([
      supabase.from("study_profiles").select("experience,career,exam_date,hours_per_week,last_plan").eq("user_id", user.id).maybeSingle(),
      supabase.rpc("my_subject_stats"),
      supabase.rpc("my_study_hours"),
    ]);
    setProfile((p.data as Profile | null) ?? null);
    setStats((s.data as SubjectStat[] | null) ?? []);
    setHoursStudied(Number(h.data ?? 0));
    setLoading(false);
  }, [user]);

  React.useEffect(() => {
    if (authLoading) return;
    if (!real) { setLoading(false); return; }
    void load();
  }, [authLoading, real, load]);

  const plan = React.useMemo(
    () =>
      profile
        ? buildPlan({ experience: profile.experience, career: profile.career, examDate: profile.exam_date, hoursPerWeek: profile.hours_per_week, stats, hoursStudied })
        : null,
    [profile, stats, hoursStudied],
  );
  const changes = React.useMemo(() => (plan ? diffShares(profile?.last_plan?.shares, plan.subjects) : []), [plan, profile]);

  // Guarda uma "foto" do plano a cada 7 dias para mostrar o que mudou desde então.
  React.useEffect(() => {
    if (!plan || !profile || !user) return;
    const at = profile.last_plan?.at;
    if (at && Date.now() - new Date(at).getTime() < 7 * 86_400_000) return;
    const shares = Object.fromEntries(plan.subjects.map((s) => [s.name, s.share]));
    void supabase.from("study_profiles").update({ last_plan: { at: new Date().toISOString(), shares } }).eq("user_id", user.id);
  }, [plan, profile, user]);

  async function save(p: Omit<Profile, "last_plan">) {
    if (!user) return;
    const { error } = await supabase.from("study_profiles").upsert({ user_id: user.id, ...p }, { onConflict: "user_id" });
    if (error) { toast.error("Não foi possível salvar. Tente novamente."); return; }
    toast.success("Plano gerado.");
    setEditing(false);
    await load();
  }

  if (authLoading || loading) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>;
  if (!real) {
    return <LockedState image="study-desk" title={<>Assistente de <em>estudos</em></>} description="Entre na sua conta para montar um plano que se ajusta aos seus acertos, erros e tempo de estudo." />;
  }

  const careerName = CAREERS.find((c) => c.id === profile?.career)?.name ?? "";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero image="study-desk" size="sm" kicker="Hoje" icon={Compass} title={<>Assistente de <em>estudos</em></>}
        description="Um plano que começa pelo seu perfil e se reajusta a cada questão, simulado e hora de estudo." />

      {(!profile || editing) && (
        <Wizard initial={profile} onSave={save} {...(profile ? { onCancel: () => setEditing(false) } : {})} />
      )}

      {profile && plan && !editing && (
        <>
          <Card>
            <CardHeader className="gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <Badge variant="secondary" className="mb-2">{plan.phase.title}</Badge>
                <CardTitle className="text-xl">{careerName}</CardTitle>
                <CardDescription>{plan.phase.focus}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}><Settings2 className="h-4 w-4" /> Ajustar perfil</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-lg bg-muted/60 p-3"><p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> Tempo até a prova</p><p className="text-xl font-black">{plan.weeksLeft !== null ? `${plan.weeksLeft} semanas` : `~${plan.assumedWeeks} sem. (estimado)`}</p></div>
                <div className="rounded-lg bg-muted/60 p-3"><p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1"><Gauge className="h-3.5 w-3.5" /> Ritmo estimado</p><p className="text-xl font-black">{plan.neededHoursPerWeek} h/sem</p></div>
                <div className="rounded-lg bg-muted/60 p-3"><p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">Sua disponibilidade</p><p className="text-xl font-black">{plan.hoursPerWeek} h/sem</p></div>
                <div className="rounded-lg bg-muted/60 p-3"><p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1"><Target className="h-3.5 w-3.5" /> Acerto geral</p><p className="text-xl font-black">{plan.overallAccuracy !== null ? `${plan.overallAccuracy}%` : "—"}</p></div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs font-semibold">
                  <span>Sua disponibilidade cobre o ritmo estimado</span>
                  <span className={plan.feasible ? "text-emerald-600" : "text-amber-600"}>{plan.coverage}%</span>
                </div>
                <Progress value={plan.coverage} className="h-2.5" />
              </div>
              <p className="text-xs text-muted-foreground">
                Estimativa baseada na sua experiência, na carreira e no seu desempenho real. Serve para orientar o estudo e não garante aprovação.
              </p>
            </CardContent>
          </Card>

          {changes.length > 0 && (
            <Card className="border-primary/40">
              <CardHeader><CardTitle className="text-base">O plano foi reajustado</CardTitle><CardDescription>Mudanças desde a última revisão, pelo seu desempenho.</CardDescription></CardHeader>
              <CardContent className="space-y-1 text-sm">
                {changes.map((c) => (
                  <p key={c.name}>
                    <strong>{c.name}</strong>: {c.delta > 0 ? "ganhou" : "perdeu"} {Math.abs(c.delta)} p.p. do seu tempo (agora {c.now}%).
                  </p>
                ))}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Sua semana por matéria</CardTitle>
              <CardDescription>Minutos e questões sugeridos. Quem mais precisa recebe mais tempo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {plan.subjects.map((s) => (
                <div key={s.name} className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-1.5 font-semibold">{s.name} <TrendIcon t={s.trend} /></span>
                    <span className="tabular-nums text-muted-foreground">{s.minutes} min · {s.questions} questões · {s.share}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className={cn("h-full", s.accuracy === null ? "bg-primary/60" : s.accuracy < 60 ? "bg-rose-500" : s.accuracy < 75 ? "bg-amber-500" : "bg-emerald-500")} style={{ width: `${Math.min(100, s.share * 4)}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{s.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {plan.tips.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base">Recomendações</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1.5 pl-5 text-sm">
                  {plan.tips.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild size="sm"><Link to="/dashboard/question-trainer">Resolver questões <ArrowRight className="h-4 w-4" /></Link></Button>
                  <Button asChild size="sm" variant="outline"><Link to="/dashboard/mock-exams">Fazer um simulado</Link></Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
