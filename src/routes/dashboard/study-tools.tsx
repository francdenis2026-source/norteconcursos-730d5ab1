import React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowRight, BookOpenCheck, BrainCircuit, CalendarClock, CheckCircle2, ChevronDown, Coffee, Flame, Layers, ListChecks,
  Pause, Play, RotateCcw, Sparkles, Target, Timer,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { CAREERS, buildPlan, type CareerId, type Experience, type SubjectStat } from "@/lib/studyEngine";
import { topicsFor } from "@/data/studyTopics";
import { acreDateKey } from "@/lib/acreTime";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/study-tools")({
  head: () => ({ meta: [{ title: "Central de estudos | Norte Concurso" }] }),
  component: StudyToolsPage,
});

// ───────────────────────── Contexto do aluno ─────────────────────────

interface Profile {
  id: string;
  name: string | null;
  experience: Experience;
  career: CareerId;
  exam_date: string | null;
  hours_per_week: number;
  essay: boolean;
}
interface DueCard { id: string; subject: string; topic: string | null; front: string; back: string }

function useStudyContext() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [stats, setStats] = React.useState<SubjectStat[]>([]);
  const [hours, setHours] = React.useState(0);
  const [due, setDue] = React.useState<DueCard[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (authLoading) return;
    if (!real || !user) { setLoading(false); return; }
    let alive = true;
    void (async () => {
      const [p, s, h, d] = await Promise.all([
        supabase.from("study_profiles").select("id,name,experience,career,exam_date,hours_per_week,essay").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(1),
        supabase.rpc("my_subject_stats"),
        supabase.rpc("my_study_hours"),
        supabase.from("flashcards").select("id,subject,topic,front,back").eq("user_id", user.id).lte("due_at", new Date().toISOString()).order("due_at").limit(300),
      ]);
      if (!alive) return;
      setProfile(((p.data as Profile[] | null) ?? [])[0] ?? null);
      setStats((s.data as SubjectStat[] | null) ?? []);
      setHours(Number(h.data ?? 0));
      setDue((d.data as DueCard[] | null) ?? []);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [authLoading, real, user]);

  const career = CAREERS.find((c) => c.id === profile?.career) ?? CAREERS[CAREERS.length - 1]!;
  const plan = React.useMemo(
    () => profile ? buildPlan({ experience: profile.experience, career: profile.career, examDate: profile.exam_date, hoursPerWeek: profile.hours_per_week, stats, hoursStudied: hours }) : null,
    [profile, stats, hours],
  );
  const subjects = React.useMemo(() => plan ? plan.subjects.map((s) => s.name) : career.subjects.map((s) => s.name), [plan, career]);
  // Matéria mais urgente: pior aproveitamento (com amostra mínima); sem dados, a de maior peso no tempo.
  const suggested = React.useMemo(() => {
    if (!plan) return subjects[0] ?? "";
    const withData = plan.subjects.filter((s) => s.accuracy !== null && s.answered >= 10).sort((a, b) => (a.accuracy ?? 100) - (b.accuracy ?? 100));
    return (withData[0] ?? [...plan.subjects].sort((a, b) => b.share - a.share)[0])?.name ?? subjects[0] ?? "";
  }, [plan, subjects]);
  const daysToExam = profile?.exam_date ? Math.ceil((new Date(`${profile.exam_date}T12:00:00`).getTime() - Date.now()) / 86_400_000) : null;
  return { real, loading: loading || authLoading, profile, career, plan, subjects, suggested, due, daysToExam };
}

// ───────────────────────── Página ─────────────────────────

const DAY_KEY = "norte_focus_day";
function readDay(): { day: string; cycles: number; minutes: number } {
  const fresh = { day: acreDateKey(), cycles: 0, minutes: 0 };
  try {
    const v = JSON.parse(localStorage.getItem(DAY_KEY) ?? "null") as typeof fresh | null;
    return v && v.day === fresh.day ? v : fresh;
  } catch { return fresh; }
}

function StudyToolsPage() {
  const ctx = useStudyContext();
  const [pick, setPick] = React.useState<{ subject: string; topic: string }>({ subject: "", topic: "" });
  const [day, setDay] = React.useState({ day: "", cycles: 0, minutes: 0 });

  React.useEffect(() => {
    setDay(readDay());
    try {
      const saved = JSON.parse(localStorage.getItem("norte_focus_pick") ?? "null") as typeof pick | null;
      if (saved) setPick(saved);
    } catch { /* sem armazenamento */ }
  }, []);
  const subject = pick.subject && ctx.subjects.includes(pick.subject) ? pick.subject : ctx.suggested;
  const topics = React.useMemo(() => topicsFor(subject), [subject]);
  const topic = topics.includes(pick.topic) ? pick.topic : topics[0] ?? "";
  const choose = (next: { subject: string; topic: string }) => {
    setPick(next);
    try { localStorage.setItem("norte_focus_pick", JSON.stringify(next)); } catch { /* sem armazenamento */ }
  };
  const onFocusDone = (minutes: number) => {
    const d = readDay();
    const next = { ...d, cycles: d.cycles + 1, minutes: d.minutes + minutes };
    try { localStorage.setItem(DAY_KEY, JSON.stringify(next)); } catch { /* sem armazenamento */ }
    setDay(next);
  };

  return (
    <div className="space-y-6">
      <PageHero
        image="study-desk"
        kicker="Hoje"
        icon={Timer}
        title={<>Central de <em>estudos</em></>}
        description={
          ctx.profile
            ? `Montada para ${ctx.career.name}${ctx.daysToExam !== null && ctx.daysToExam > 0 ? ` · faltam ${ctx.daysToExam} dias para a prova` : ""}. Foco, revisão e checklist das suas disciplinas.`
            : "Foco, revisão e checklist das disciplinas. Configure o Assistente de estudos para personalizar com o seu concurso."
        }
        actions={!ctx.profile && !ctx.loading && ctx.real ? (
          <Button asChild className="hero-btn-primary gap-2"><Link to="/dashboard/study-coach"><Sparkles className="h-4 w-4" /> Configurar meu plano</Link></Button>
        ) : undefined}
      >
        <div className="page-hero__stats">
          <HeroStat icon={Target} label="Carreira" value={<span className="text-base">{ctx.career.id === "OUTRA" ? "Geral" : ctx.career.id}</span>} />
          <HeroStat icon={CalendarClock} label="Dias para a prova" value={ctx.daysToExam !== null ? Math.max(0, ctx.daysToExam) : "—"} />
          <HeroStat icon={Layers} label="Cartões a revisar" value={ctx.due.length} />
          <HeroStat icon={Flame} label="Foco hoje" value={`${day.minutes} min`} />
        </div>
      </PageHero>

      <FocusCard
        subjects={ctx.subjects}
        suggested={ctx.suggested}
        subject={subject}
        topic={topic}
        topics={topics}
        onPick={choose}
        day={day}
        onFocusDone={onFocusDone}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ReviewCard due={ctx.due} subject={subject} careerId={ctx.career.id} real={ctx.real} />
        <PlanLinkCard profile={ctx.profile} career={ctx.career.name} real={ctx.real} loading={ctx.loading} />
      </div>

      <ChecklistCard careerId={ctx.career.id} subjects={ctx.subjects} essay={ctx.profile?.essay ?? false} />
    </div>
  );
}

// ───────────────────────── Foco (Pomodoro persistente) ─────────────────────────

type Mode = 25 | 50 | 5;
interface Pomo { mode: Mode; endsAt: number | null; left: number }
const POMO_KEY = "norte_pomo_v2";
const FRESH: Pomo = { mode: 25, endsAt: null, left: 25 * 60 };

function usePomodoro(onDone: (mode: Mode) => void) {
  const [p, setP] = React.useState<Pomo>(FRESH);
  const [now, setNow] = React.useState(0);
  const done = React.useRef(onDone);
  done.current = onDone;
  const save = React.useCallback((next: Pomo) => {
    setP(next);
    try { localStorage.setItem(POMO_KEY, JSON.stringify(next)); } catch { /* sem armazenamento */ }
  }, []);

  React.useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(POMO_KEY) ?? "null") as Pomo | null;
      if (v) setP(v);
    } catch { /* sem armazenamento */ }
    setNow(Date.now());
  }, []);

  React.useEffect(() => {
    if (!p.endsAt) return;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (p.endsAt && t >= p.endsAt) {
        save({ mode: p.mode, endsAt: null, left: p.mode * 60 });
        done.current(p.mode);
      }
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [p, save]);

  const left = p.endsAt ? Math.max(0, Math.ceil((p.endsAt - now) / 1000)) : p.left;
  return {
    mode: p.mode,
    left,
    running: !!p.endsAt,
    setMode: (m: Mode) => save({ mode: m, endsAt: null, left: m * 60 }),
    toggle: () => save(p.endsAt ? { ...p, endsAt: null, left } : { ...p, endsAt: Date.now() + left * 1000 }),
    reset: () => save({ mode: p.mode, endsAt: null, left: p.mode * 60 }),
  };
}

const selectCls = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium";

function FocusCard({ subjects, suggested, subject, topic, topics, onPick, day, onFocusDone }: {
  subjects: string[]; suggested: string; subject: string; topic: string; topics: string[];
  onPick: (v: { subject: string; topic: string }) => void;
  day: { cycles: number; minutes: number };
  onFocusDone: (minutes: number) => void;
}) {
  const pomo = usePomodoro((mode) => {
    if (mode === 5) toast.success("Pausa concluída. Hora de voltar ao foco.");
    else {
      onFocusDone(mode);
      toast.success(`Ciclo de ${mode} min concluído. Faça uma pausa de 5 min.`);
    }
  });
  const total = pomo.mode * 60;
  const pct = total ? (total - pomo.left) / total : 0;
  const R = 92;
  const C = 2 * Math.PI * R;
  const mm = String(Math.floor(pomo.left / 60)).padStart(2, "0");
  const ss = String(pomo.left % 60).padStart(2, "0");
  const isBreak = pomo.mode === 5;
  const trainer = { area: subject, go: "1", ...(topic ? { topic } : {}) };

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
        <div className="space-y-5 p-6">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg"><Target className="h-5 w-5" /> Sessão de foco</CardTitle>
            <CardDescription className="mt-1">Escolha o que vai estudar agora. O cronômetro continua correndo se você mudar de tela.</CardDescription>
          </div>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground">Disciplina</span>
            <select className={selectCls} value={subject} onChange={(e) => onPick({ subject: e.target.value, topic: "" })}>
              {subjects.map((s) => <option key={s} value={s}>{s === suggested ? `${s} — sugerida pelo seu plano` : s}</option>)}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground">Assunto</span>
            <select className={selectCls} value={topic} onChange={(e) => onPick({ subject, topic: e.target.value })}>
              {topics.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <SubjectIcon subject={subject} />
            <span className="font-semibold">{subject}</span>
            <span className="text-muted-foreground">· {topic}</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <Button asChild variant="outline" className="justify-start gap-2"><Link to="/dashboard/study-room" search={{ subject, topic }}><BookOpenCheck className="h-4 w-4" /> Sala de estudo</Link></Button>
            <Button asChild variant="outline" className="justify-start gap-2"><Link to="/dashboard/question-trainer" search={trainer}><BrainCircuit className="h-4 w-4" /> Questões</Link></Button>
            <Button asChild variant="outline" className="justify-start gap-2"><Link to="/dashboard/flashcards" search={{ subject, topic }}><Layers className="h-4 w-4" /> Flashcards</Link></Button>
          </div>
        </div>

        <div className={cn("flex flex-col items-center justify-center gap-4 border-t bg-gradient-to-b p-6 lg:border-l lg:border-t-0", isBreak ? "from-emerald-500/10 to-transparent" : "from-amber-400/10 to-transparent")}>
          <div className="flex gap-2" role="tablist" aria-label="Tipo de bloco">
            {([25, 50, 5] as const).map((m) => (
              <button key={m} type="button" role="tab" aria-selected={pomo.mode === m} onClick={() => pomo.setMode(m)}
                className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all", pomo.mode === m ? (m === 5 ? "bg-emerald-500 text-white shadow" : "bg-amber-400 text-slate-900 shadow") : "bg-muted text-muted-foreground hover:bg-muted/70")}>
                {m === 5 ? <><Coffee className="h-3.5 w-3.5" /> Pausa 5 min</> : <><Timer className="h-3.5 w-3.5" /> Foco {m} min</>}
              </button>
            ))}
          </div>
          <div className="relative grid place-items-center">
            <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90" aria-hidden>
              <circle cx="110" cy="110" r={R} fill="none" strokeWidth="10" className="stroke-muted" />
              <circle cx="110" cy="110" r={R} fill="none" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)}
                className={cn("transition-[stroke-dashoffset] duration-300", isBreak ? "stroke-emerald-500" : "stroke-amber-400")} />
            </svg>
            <div className="absolute text-center" role="timer" aria-label="Tempo restante">
              <div className="text-5xl font-black tabular-nums">{mm}:{ss}</div>
              <div className="mt-1 text-xs font-semibold text-muted-foreground">{isBreak ? "Descanse a mente" : pomo.running ? "Em foco" : "Pronto para começar"}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={pomo.toggle} className={cn("min-w-32 gap-2", isBreak ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-amber-400 text-slate-900 hover:bg-amber-300")}>
              {pomo.running ? <><Pause className="h-4 w-4" /> Pausar</> : <><Play className="h-4 w-4" /> Iniciar</>}
            </Button>
            <Button variant="outline" onClick={pomo.reset} className="gap-2"><RotateCcw className="h-4 w-4" /> Zerar</Button>
          </div>
          <p className="text-xs text-muted-foreground">Hoje: <b className="text-foreground">{day.cycles}</b> {day.cycles === 1 ? "ciclo" : "ciclos"} · <b className="text-foreground">{day.minutes} min</b> de foco</p>
        </div>
      </div>
    </Card>
  );
}

// ───────────────────────── Revisão rápida ─────────────────────────

const TRAPS: { f: string; b: string; tags: string[] }[] = [
  { f: "CEBRASPE: item ANULADO vale quanto ponto?", b: "+1 ponto para TODOS os candidatos (crédito automático), independente da resposta marcada.", tags: ["banca"] },
  { f: "Item em BRANCO (sem marcação) vale quanto?", b: "0 pontos — não soma nem subtrai. Só “certa” (+1) e “errada” (−1) alteram a nota.", tags: ["banca"] },
  { f: "Lei 13.869/2019 revogou qual lei antiga?", b: "A Lei nº 4.898/1965 (antiga lei de abuso de autoridade).", tags: ["penal", "humanos"] },
  { f: "CF art. 144: quantos são os órgãos de segurança pública hoje?", b: "6 órgãos desde a EC 104/2019 (inclui as polícias penais). Material antigo ainda fala em 5 — desatualizado.", tags: ["constitucional"] },
  { f: "Regime de competência x regime de caixa: qual a diferença?", b: "Competência: registra quando o fato gerador ocorre. Caixa: registra só quando o dinheiro entra ou sai de fato.", tags: ["contabilidade"] },
  { f: "Em uma tabela-verdade, quando um “OU” (∨) é falso?", b: "Só quando AMBAS as proposições são falsas.", tags: ["raciocinio"] },
  { f: "Modelo OSI: quais as 7 camadas, de baixo para cima?", b: "Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação.", tags: ["informatica"] },
  { f: "Lei de Migração: o que NÃO pode motivar deportação sozinho?", b: "A mera situação migratória irregular — a deportação é medida administrativa, não penal.", tags: ["humanos"] },
  { f: "Lei 12.850/2013 revogou qual lei antiga?", b: "A Lei nº 9.034/1995 (antiga lei de organização criminosa).", tags: ["penal", "humanos"] },
];
const TAG_OF: [RegExp, string][] = [
  [/constitucional/, "constitucional"], [/penal|criminal|legisla/, "penal"], [/humanos|legisla|etica/, "humanos"],
  [/contab/, "contabilidade"], [/racioc|estat/, "raciocinio"], [/inform/, "informatica"],
];
const plain = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

function ReviewCard({ due, subject, real }: { due: DueCard[]; subject: string; careerId: CareerId; real: boolean }) {
  const mine = React.useMemo(() => {
    const key = plain(subject).split(" ")[0] ?? "";
    const same = due.filter((c) => plain(c.subject).includes(key));
    return same.length ? same : due;
  }, [due, subject]);
  const tag = TAG_OF.find(([re]) => re.test(plain(subject)))?.[1];
  const traps = React.useMemo(() => {
    const rel = TRAPS.filter((t) => t.tags.includes("banca") || (tag && t.tags.includes(tag)));
    return rel.length > 2 ? rel : TRAPS;
  }, [tag]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg"><Layers className="h-5 w-5" /> Revisão rápida</CardTitle>
        <CardDescription>Seus cartões vencidos e as pegadinhas mais comuns de {tag ? "esta disciplina" : "prova"}.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={mine.length ? "mine" : "traps"}>
          <TabsList>
            <TabsTrigger value="mine" className="gap-1.5">Meus cartões <Badge variant="secondary">{due.length}</Badge></TabsTrigger>
            <TabsTrigger value="traps">Pegadinhas</TabsTrigger>
          </TabsList>
          <TabsContent value="mine" className="mt-4">
            {mine.length ? (
              <Flip cards={mine.map((c) => ({ f: c.front, b: c.back, meta: c.topic ? `${c.subject} · ${c.topic}` : c.subject }))} />
            ) : (
              <div className="grid place-items-center gap-3 rounded-xl border border-dashed p-8 text-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                <p className="text-sm font-semibold">{real ? "Nenhum cartão vencido agora." : "Entre na sua conta para revisar seus cartões."}</p>
                <Button asChild variant="outline" size="sm" className="gap-2"><Link to="/dashboard/flashcards" search={{ subject, topic: undefined }}>Abrir meu baralho <ArrowRight className="h-4 w-4" /></Link></Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="traps" className="mt-4"><Flip cards={traps.map((t) => ({ f: t.f, b: t.b, meta: "Pegadinha recorrente" }))} /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function Flip({ cards }: { cards: { f: string; b: string; meta: string }[] }) {
  const [i, setI] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const idx = Math.min(i, cards.length - 1);
  const c = cards[idx]!;
  const go = (d: number) => { setFlipped(false); setI((idx + d + cards.length) % cards.length); };
  return (
    <div className="space-y-3">
      <button type="button" onClick={() => setFlipped((f) => !f)} aria-label="Virar cartão"
        className={cn("flex min-h-[150px] w-full flex-col items-center justify-center gap-2 rounded-xl border p-5 text-center transition-colors", flipped ? "border-amber-400/50 bg-amber-400/10" : "bg-muted/50 hover:bg-muted")}>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{flipped ? "Resposta" : c.meta}</span>
        <p className="text-sm font-semibold leading-relaxed">{flipped ? c.b : c.f}</p>
      </button>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{idx + 1} / {cards.length} · toque no cartão para virar</span>
        <span className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => go(-1)}>‹ Anterior</Button>
          <Button variant="outline" size="sm" onClick={() => go(1)}>Próximo ›</Button>
        </span>
      </div>
    </div>
  );
}

// ───────────────────────── Plano do aluno ─────────────────────────

function PlanLinkCard({ profile, career, real, loading }: { profile: Profile | null; career: string; real: boolean; loading: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5" /> Seu plano de estudos</CardTitle>
        <CardDescription>{profile ? `${profile.name ?? career} · ${profile.hours_per_week} h por semana` : "Ainda sem plano configurado."}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? null : profile ? (
          <>
            <p className="text-sm text-muted-foreground">O cronograma da semana, as horas por matéria e o ajuste conforme seu desempenho ficam no Assistente de estudos. Aqui você executa: foca, revisa e confere o conteúdo.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="gap-2"><Link to="/dashboard/study-coach">Ver cronograma da semana <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild variant="outline" className="gap-2"><Link to="/dashboard/mock-exams"><Timer className="h-4 w-4" /> Fazer simulado</Link></Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">{real ? "Informe sua carreira, a data da prova e as horas disponíveis. A Central passa a sugerir a disciplina mais urgente e a montar o checklist do seu concurso." : "Entre na sua conta para personalizar a Central com o seu concurso."}</p>
            <Button asChild className="gap-2"><Link to={real ? "/dashboard/study-coach" : "/auth"} {...(real ? {} : { search: { mode: undefined } })}>{real ? "Configurar meu plano" : "Entrar"} <ArrowRight className="h-4 w-4" /></Link></Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ───────────────────────── Checklist do edital ─────────────────────────

function ChecklistCard({ careerId, subjects, essay }: { careerId: CareerId; subjects: string[]; essay: boolean }) {
  const key = `norte_review_v2:${careerId}`;
  const [state, setState] = React.useState<Record<string, true>>({});
  React.useEffect(() => {
    try { setState(JSON.parse(localStorage.getItem(key) ?? "{}") as Record<string, true>); } catch { setState({}); }
  }, [key]);
  const toggle = (k: string) => {
    setState((prev) => {
      const next = { ...prev };
      if (next[k]) delete next[k]; else next[k] = true;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* sem armazenamento */ }
      return next;
    });
  };
  const groups = React.useMemo(() => [
    ...subjects.map((s) => ({ name: s, items: topicsFor(s).map((t) => ({ k: `${s}|${t}`, label: t })) })),
    { name: "Treino geral", items: [
      { k: "geral|simulado", label: "Fiz pelo menos 1 simulado completo cronometrado" },
      ...(essay ? [{ k: "geral|redacao", label: "Pratiquei 1 redação discursiva completa" }] : []),
      { k: "geral|erros", label: "Revisei meu caderno de erros" },
    ] },
  ], [subjects, essay]);
  const all = groups.flatMap((g) => g.items);
  const done = all.filter((i) => state[i.k]).length;
  const pct = all.length ? Math.round((100 * done) / all.length) : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-wrap items-center justify-between gap-2 text-lg">
          <span className="flex items-center gap-2"><ListChecks className="h-5 w-5" /> Checklist do edital</span>
          <Badge variant="outline">{done} de {all.length} · {pct}%</Badge>
        </CardTitle>
        <CardDescription>Assuntos de cada disciplina da sua carreira. Marque o que já revisou.</CardDescription>
        <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all" style={{ width: `${pct}%` }} /></div>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        {groups.map((g) => {
          const n = g.items.filter((i) => state[i.k]).length;
          return (
            <details key={g.name} className="group rounded-xl border bg-card open:shadow-sm" open={g.name === groups[0]?.name}>
              <summary className="flex cursor-pointer list-none items-center gap-2.5 px-3.5 py-3 [&::-webkit-details-marker]:hidden">
                {g.name === "Treino geral" ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <SubjectIcon subject={g.name} className="h-7 w-7" />}
                <span className="flex-1 text-sm font-semibold">{g.name}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums", n === g.items.length ? "bg-emerald-500/15 text-emerald-600" : "bg-muted text-muted-foreground")}>{n}/{g.items.length}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-1.5 border-t px-3.5 py-3">
                {g.items.map((i) => (
                  <label key={i.k} className="flex cursor-pointer items-start gap-2.5 text-sm">
                    <input type="checkbox" checked={!!state[i.k]} onChange={() => toggle(i.k)} className="mt-0.5 h-4 w-4 shrink-0 accent-amber-500" />
                    <span className={cn(state[i.k] && "text-muted-foreground line-through")}>{i.label}</span>
                  </label>
                ))}
              </div>
            </details>
          );
        })}
      </CardContent>
      <p className="px-6 pb-5 text-[11px] text-muted-foreground">Fica salvo neste navegador, separado por carreira.</p>
    </Card>
  );
}
