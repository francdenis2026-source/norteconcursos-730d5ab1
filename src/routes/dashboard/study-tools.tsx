import { plannedPractice } from "@/lib/plannedStudy";
import { StudyPlanningNav } from "@/components/dashboard/StudyPlanningNav";
import { ENEM_AREAS } from "@/data/enem";
import { platformDate } from "@/lib/platformClock";
import { libraryCollection } from "@/lib/libraryOrganization";
import React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowRight,
  BookOpenCheck,
  LibraryBig,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Coffee,
  Flame,
  Layers,
  ListChecks,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { SubjectIcon } from "@/components/ui/subject-icon";
import {
  CAREERS,
  buildPlan,
  type CareerId,
  type Experience,
  norm,
  type SubjectStat,
} from "@/lib/studyEngine";
import { topicsFor } from "@/data/studyTopics";
import { TRACKS } from "@/data/tracks";
import { ContentSearchResults } from "@/components/library/ContentSearchResults";
import { acreDateKey } from "@/lib/acreTime";
import { cn } from "@/lib/utils";
import { useWorkspaceFullscreen } from "@/hooks/useWorkspaceFullscreen";
import { userStorageKey } from "@/lib/userStorage";

export const Route = createFileRoute("/dashboard/study-tools")({
  head: () => ({ meta: [{ title: "Sessão de foco | Norte Concurso" }] }),
  validateSearch: (search: Record<string, unknown>): { context?: "enem" | undefined; tool?: "handwritten" | "guide" | "simplify" | "compare" | "quiz" | undefined } => ({ context: search["context"] === "enem" ? "enem" : undefined, tool: ["handwritten", "guide", "simplify", "compare", "quiz"].includes(String(search["tool"])) ? search["tool"] as "handwritten" | "guide" | "simplify" | "compare" | "quiz" : undefined }),
  component: StudyToolsPage,
});

const ALL_SUBJECTS = [
  "Língua Portuguesa", "Raciocínio Lógico", "Matemática", "Estatística", "Informática",
  "Direito Constitucional", "Direito Administrativo", "Direito Penal", "Direito Processual Penal",
  "Legislação Especial", "Legislação de Trânsito", "Direitos Humanos", "Contabilidade",
  "Atualidades", "Ética", "Medicina Legal",
];

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
interface DueCard {
  id: string;
  subject: string;
  topic: string | null;
  front: string;
  back: string;
}

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
    if (!real || !user) {
      setLoading(false);
      return;
    }
    let alive = true;
    void (async () => {
      const [p, s, h, d] = await Promise.all([
        supabase
          .from("study_profiles")
          .select("id,name,experience,career,exam_date,hours_per_week,essay")
          .eq("user_id", user.id)
          .order("updated_at", { ascending: false })
          .limit(1),
        supabase.rpc("my_subject_stats"),
        supabase.rpc("my_study_hours"),
        supabase
          .from("flashcards")
          .select("id,subject,topic,front,back")
          .eq("user_id", user.id)
          .lte("due_at", platformDate().toISOString())
          .order("due_at")
          .limit(300),
      ]);
      if (!alive) return;
      setProfile(((p.data as Profile[] | null) ?? [])[0] ?? null);
      setStats((s.data as SubjectStat[] | null) ?? []);
      setHours(Number(h.data ?? 0));
      setDue((d.data as DueCard[] | null) ?? []);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [authLoading, real, user]);

  const career = CAREERS.find((c) => c.id === profile?.career) ?? CAREERS[CAREERS.length - 1]!;
  const plan = React.useMemo(
    () =>
      profile
        ? buildPlan({
            experience: profile.experience,
            career: profile.career,
            examDate: profile.exam_date,
            hoursPerWeek: profile.hours_per_week,
            stats,
            hoursStudied: hours,
          })
        : null,
    [profile, stats, hours],
  );
  // Disciplinas do plano primeiro; as demais da plataforma ficam disponíveis para estudo livre.
  const subjects = React.useMemo(() => {
    const own = plan ? plan.subjects.map((s) => s.name) : career.subjects.map((s) => s.name);
    const seen = new Set(own.map(norm));
    return [...own, ...ALL_SUBJECTS.filter((n) => !seen.has(norm(n)) && topicsFor(n).length)];
  }, [plan, career]);
  // Matéria mais urgente: pior aproveitamento (com amostra mínima); sem dados, a de maior peso no tempo.
  const suggested = React.useMemo(() => {
    if (!plan) return subjects[0] ?? "";
    const withData = plan.subjects
      .filter((s) => s.accuracy !== null && s.answered >= 10)
      .sort((a, b) => (a.accuracy ?? 100) - (b.accuracy ?? 100));
    return (
      (withData[0] ?? [...plan.subjects].sort((a, b) => b.share - a.share)[0])?.name ??
      subjects[0] ??
      ""
    );
  }, [plan, subjects]);
  const daysToExam = profile?.exam_date
    ? Math.ceil((new Date(`${profile.exam_date}T12:00:00-05:00`).getTime() - Date.now()) / 86_400_000)
    : null;
  return {
    real,
    loading: loading || authLoading,
    profile,
    career,
    plan,
    subjects,
    suggested,
    due,
    daysToExam,
  };
}

// ───────────────────────── Página ─────────────────────────

const DAY_KEY = "norte_focus_day";
const HISTORY_KEY = "norte_focus_history_v1";
type FocusRecord = {
  id: string;
  completedAt: string;
  minutes: number;
  subject: string;
  topic: string;
};

function readDay(): { day: string; cycles: number; minutes: number } {
  const fresh = { day: acreDateKey(), cycles: 0, minutes: 0 };
  try {
    const v = JSON.parse(localStorage.getItem(userStorageKey(DAY_KEY)) ?? "null") as typeof fresh | null;
    return v && v.day === fresh.day ? v : fresh;
  } catch {
    return fresh;
  }
}

function readFocusHistory(): FocusRecord[] {
  try {
    const value = JSON.parse(localStorage.getItem(userStorageKey(HISTORY_KEY)) ?? "[]") as FocusRecord[];
    return Array.isArray(value) ? value.slice(0, 30) : [];
  } catch {
    return [];
  }
}

function StudyToolsPage() {
  const ctx = useStudyContext();
  const fullscreen = useWorkspaceFullscreen(true);
  const { context } = Route.useSearch();
  const enem = context === "enem";
  const enemSubjects = React.useMemo(() => ENEM_AREAS.flatMap(area => area.subjects), []);
  const subjects = enem ? enemSubjects.map(item => item.name) : ctx.subjects;
  const suggested = enem ? (subjects[0] ?? "") : ctx.suggested;
  const pickKey = enem ? "norte_focus_pick_enem" : "norte_focus_pick";
  const [pick, setPick] = React.useState<{ subject: string; topic: string }>({ subject: "", topic: "" });
  const [day, setDay] = React.useState({ day: "", cycles: 0, minutes: 0 });

  React.useEffect(() => {
    setDay(readDay());
    try {
      const saved = JSON.parse(localStorage.getItem(pickKey) ?? "null") as typeof pick | null;
      if (saved) setPick(saved);
    } catch {
      /* armazenamento indisponível */
    }
  }, [pickKey, ctx.real]);

  const subject = pick.subject && subjects.includes(pick.subject) ? pick.subject : suggested;
  const topics = React.useMemo(
    () => enem ? (enemSubjects.find(item => item.name === subject)?.topics ?? []) : topicsFor(subject),
    [subject, enem, enemSubjects],
  );
  const topic = topics.includes(pick.topic) ? pick.topic : (topics[0] ?? "");
  const choose = (next: { subject: string; topic: string }) => {
    setPick(next);
    try {
      localStorage.setItem(pickKey, JSON.stringify(next));
    } catch {
      /* armazenamento indisponível */
    }
  };
  const onFocusDone = (minutes: number) => {
    const current = readDay();
    const next = { ...current, cycles: current.cycles + 1, minutes: current.minutes + minutes };
    try {
      localStorage.setItem(userStorageKey(DAY_KEY), JSON.stringify(next));
    } catch {
      /* armazenamento indisponível */
    }
    setDay(next);
  };
  const trainer = { ...plannedPractice(subject, topic), ...(enem ? { contest: "ENEM" } : {}) };
  const track = TRACKS.find(item => norm(subject).includes(norm(item.discipline)));

  return (
    <div className="study-tools-page space-y-5" data-focus-session={fullscreen.active ? "true" : undefined}>
      <header className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Seu ambiente de aprendizagem</p>
            <h1 className="text-2xl font-bold tracking-tight">Central de Estudos</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Um fluxo simples: escolha o assunto, estude o conteúdo e pratique com questões.
            </p>
          </div>
          {!enem && !ctx.profile && !ctx.loading && ctx.real && (
            <Button asChild variant="outline" size="sm">
              <Link to="/dashboard/study-coach"><Sparkles className="mr-2 h-4 w-4" />Configurar meu plano</Link>
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-y py-3 text-sm">
          <span className="text-muted-foreground">Hoje: <strong className="text-foreground">{day.minutes} min</strong> de estudo</span>
          <span className="text-muted-foreground"><strong className="text-foreground">{day.cycles}</strong> {day.cycles === 1 ? "sessão concluída" : "sessões concluídas"}</span>
          {!enem && <span className="text-muted-foreground"><strong className="text-foreground">{ctx.due.length}</strong> cartões aguardando revisão</span>}
          {ctx.profile && !enem && ctx.daysToExam !== null && ctx.daysToExam >= 0 && (
            <span className="text-muted-foreground"><strong className="text-foreground">{ctx.daysToExam}</strong> dias até a prova</span>
          )}
        </div>
      </header>

      <section className="rounded-2xl border bg-card p-4 sm:p-5" aria-labelledby="study-selection-title">
        <div className="mb-4">
          <h2 id="study-selection-title" className="text-base font-semibold">1. O que você vai estudar?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {ctx.loading ? "Carregando suas disciplinas…" : suggested ? "Sua disciplina prioritária já vem selecionada. Você pode alterá-la quando quiser." : "Selecione a disciplina e o assunto para personalizar seus atalhos."}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Disciplina</span>
            <select className={selectCls} value={subject} onChange={event => choose({ subject: event.target.value, topic: "" })}>
              {subjects.map(name => <option key={name} value={name}>{name}{name === suggested && !enem ? " · prioridade" : ""}</option>)}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Assunto</span>
            <select className={selectCls} value={topic} onChange={event => choose({ subject, topic: event.target.value })}>
              {topics.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <SubjectIcon subject={subject} />
          <span className="font-medium text-foreground">{subject || "Disciplina não selecionada"}</span>
          {topic && <><span aria-hidden="true">·</span><span>{topic}</span></>}
        </div>
      </section>

      <section aria-labelledby="study-actions-title" className="space-y-3">
        <div>
          <h2 id="study-actions-title" className="text-base font-semibold">2. Continue seu estudo</h2>
          <p className="mt-1 text-sm text-muted-foreground">Acesse diretamente a ferramenta certa para esta etapa.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {enem ? (
            <Link to="/dashboard/enem" search={{ tab: "materiais" }} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40">
              <BookOpenCheck className="mb-3 h-5 w-5 text-primary" />
              <span className="block font-semibold">Estudar conteúdo</span>
              <span className="mt-1 block text-xs text-muted-foreground">Materiais e explicações do ENEM</span>
              <span className="mt-3 block text-xs font-semibold text-primary">Abrir materiais →</span>
            </Link>
          ) : (
            <Link to="/dashboard/study-room" search={{ subject, topic }} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40">
              <BookOpenCheck className="mb-3 h-5 w-5 text-primary" />
              <span className="block font-semibold">Estudar conteúdo</span>
              <span className="mt-1 block text-xs text-muted-foreground">Sala de estudo, explicações e materiais</span>
              <span className="mt-3 block text-xs font-semibold text-primary">Abrir sala de estudo →</span>
            </Link>
          )}
          <Link to="/dashboard/question-trainer" search={trainer} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40">
            <BrainCircuit className="mb-3 h-5 w-5 text-primary" />
            <span className="block font-semibold">Praticar questões</span>
            <span className="mt-1 block text-xs text-muted-foreground">Treine com foco na disciplina selecionada</span>
            <span className="mt-3 block text-xs font-semibold text-primary">Começar treino →</span>
          </Link>
          {!enem && <Link to="/dashboard/flashcards" search={{ subject, topic }} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40">
            <Layers className="mb-3 h-5 w-5 text-primary" />
            <span className="block font-semibold">Revisar flashcards</span>
            <span className="mt-1 block text-xs text-muted-foreground">{ctx.due.length ? `${ctx.due.length} cartões aguardando revisão` : "Memorize conceitos e pontos-chave"}</span>
            <span className="mt-3 block text-xs font-semibold text-primary">Abrir revisões →</span>
          </Link>}
          <Link to="/dashboard/library" search={{ q: topic || subject, back: undefined, collection: libraryCollection({ slug: "", discipline: subject }) === "subjects" ? "subjects" : "laws" }} className="group rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40">
            <LibraryBig className="mb-3 h-5 w-5 text-primary" />
            <span className="block font-semibold">Consultar biblioteca</span>
            <span className="mt-1 block text-xs text-muted-foreground">Localize legislação e materiais de referência</span>
            <span className="mt-3 block text-xs font-semibold text-primary">Pesquisar material →</span>
          </Link>
        </div>
        {!enem && track && <p className="text-xs text-muted-foreground">Trilha relacionada: <Link className="font-semibold text-primary underline-offset-4 hover:underline" to="/dashboard/trilhas" search={{ t: track.slug, l: undefined }}>{track.discipline}</Link></p>}
      </section>

      <details className="rounded-xl border bg-card">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="block text-sm font-semibold">Cronômetro de foco</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">Opcional · ciclos de 25 ou 50 minutos e pausa</span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </summary>
        <div className="border-t p-3 sm:p-4">
          <FocusCard
            enem={enem}
            subjects={subjects}
            suggested={suggested}
            subject={subject}
            topic={topic}
            topics={topics}
            onPick={choose}
            day={day}
            focusMode={fullscreen.active}
            onEnterFocus={fullscreen.enter}
            onExitFocus={fullscreen.exit}
            onFocusDone={onFocusDone}
          />
        </div>
      </details>
    </div>
  );
}

function StudyCentralCard({ subject, topic, initialTool }: { subject: string; topic: string; initialTool?: "handwritten" | "guide" | "simplify" | "compare" | "quiz" }) {
  const [tab, setTab] = React.useState<"notes" | "guide" | "simplify" | "compare" | "quiz">("notes");
  React.useEffect(() => { setTab(initialTool === "handwritten" ? "notes" : initialTool ?? "notes"); }, [initialTool]);
  const title = topic || subject || "Direitos fundamentais";
  const tabs = [
    ["notes", "Notas didáticas"],
    ["guide", "Study Guide"],
    ["simplify", "Simplify"],
    ["compare", "Compare"],
    ["quiz", "Quiz Me"],
  ] as const;
  return (
    <Card className="study-central-card overflow-hidden">
      <CardHeader className="border-b pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardDescription className="uppercase tracking-[0.12em]">Central de estudo</CardDescription>
            <CardTitle className="mt-1 text-xl">Aprenda {title}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">Conceito, exemplo, pegadinha e revisão em um só lugar.</p>
          </div>
          <Badge variant="secondary">Piloto didático</Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Ferramentas da Central de estudo">
          {tabs.map(([key, label]) => (
            <Button key={key} type="button" size="sm" variant={tab === key ? "default" : "outline"} onClick={() => setTab(key)} role="tab" aria-selected={tab === key}>
              {label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        {tab === "notes" && (
          <div className="grid gap-3 md:grid-cols-2">
            <StudyNote tone="blue" label="Conceito" title="O que você precisa saber" text="Leia a definição principal do assunto em poucas linhas, com linguagem direta e foco no que costuma ser cobrado." />
            <StudyNote tone="yellow" label="Atenção" title="Pegadinha de prova" text="Nenhum direito fundamental é absoluto: os limites dependem da Constituição e do caso concreto." />
            <StudyNote tone="green" label="Exemplo" title="Como aparece na prática" text="A liberdade de expressão protege ideias, mas não autoriza ameaça, calúnia ou discriminação." />
            <StudyNote tone="purple" label="Memorização" title="Frase para revisar" text="Conceito → exemplo → limite. Use essa sequência antes de resolver questões." />
          </div>
        )}
        {tab === "guide" && <StudyToolPanel title="Study Guide" text="1. Leia a nota de conceito. 2. Revise a pegadinha. 3. Resolva cinco questões. 4. Refaça amanhã as questões erradas." />}
        {tab === "simplify" && <StudyToolPanel title="Simplify" text={`Reescreva ${title} em linguagem simples: identifique a ideia central, explique cada termo técnico e confira a explicação no material de estudo antes de memorizar.`} />}
        {tab === "compare" && <StudyToolPanel title="Compare" text="Coloque dois conceitos lado a lado e veja a diferença em definição, exemplo e erro mais comum." />}
        {tab === "quiz" && <StudyToolPanel title="Quiz Me" text="A Constituição trata os direitos fundamentais como ilimitados? Não. Eles podem sofrer limitações proporcionais e justificadas." action="Responder outra questão" />}
      </CardContent>
    </Card>
  );
}

function StudyNote({ tone, label, title, text }: { tone: "blue" | "yellow" | "green" | "purple"; label: string; title: string; text: string }) {
  return <div className={`study-note study-note--${tone}`}><span className="study-note__label">{label}</span><h3>{title}</h3><p>{text}</p></div>;
}

function StudyToolPanel({ title, text, action }: { title: string; text: string; action?: string }) {
  return <div className="rounded-xl border border-border bg-muted/20 p-5"><h3 className="font-semibold">{title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{text}</p>{action && <Button className="mt-4" size="sm">{action}</Button>}</div>;
}

// ───────────────────────── Material da plataforma (integra Biblioteca, trilhas e questões) ─────────────────────────

function PlatformMaterialCard({ subject, topic }: { subject: string; topic: string }) {
  const { user } = useAuthStatus();
  const track = TRACKS.find((t) => norm(subject).includes(norm(t.discipline)));
  const q = topic || subject;
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <LibraryBig className="h-5 w-5" /> Material para estudar agora
        </CardTitle>
        <CardDescription>
          {subject}
          {topic ? ` · ${topic}` : ""}: onde este assunto aparece na Biblioteca, nas trilhas e nas questões.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button asChild className="gap-2">
            <Link to="/dashboard/library" search={{ q, back: undefined, collection: libraryCollection({ slug: "", discipline: subject }) === "subjects" ? "subjects" : "laws" }}>
              <LibraryBig className="h-4 w-4" /> Biblioteca
            </Link>
          </Button>
          {track && (
            <Button asChild variant="outline" className="gap-2">
              <Link to="/dashboard/trilhas" search={{ t: track.slug, l: undefined }}>
                <BookOpenCheck className="h-4 w-4" /> Trilha de {track.discipline}
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" className="gap-2">
            <Link to="/dashboard/question-bank">
              <ListChecks className="h-4 w-4" /> Questões
            </Link>
          </Button>
        </div>
        {user && user.id !== "demo-user" && <ContentSearchResults query={q} userId={user.id} />}
      </CardContent>
    </Card>
  );
}

// ───────────────────────── Foco (Pomodoro persistente) ─────────────────────────

type Mode = 25 | 50 | 5;
interface Pomo {
  mode: Mode;
  endsAt: number | null;
  left: number;
}
const POMO_KEY = "norte_pomo_v2";
const FRESH: Pomo = { mode: 25, endsAt: null, left: 25 * 60 };

function usePomodoro(onDone: (mode: Mode) => void) {
  const [p, setP] = React.useState<Pomo>(FRESH);
  const [now, setNow] = React.useState(0);
  const done = React.useRef(onDone);
  done.current = onDone;
  const save = React.useCallback((next: Pomo) => {
    setP(next);
    try {
      localStorage.setItem(POMO_KEY, JSON.stringify(next));
    } catch {
      /* sem armazenamento */
    }
  }, []);

  React.useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(POMO_KEY) ?? "null") as Pomo | null;
      if (v) setP(v);
    } catch {
      /* sem armazenamento */
    }
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
    toggle: () =>
      save(p.endsAt ? { ...p, endsAt: null, left } : { ...p, endsAt: Date.now() + left * 1000 }),
    reset: () => save({ mode: p.mode, endsAt: null, left: p.mode * 60 }),
  };
}

const selectCls =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm font-medium";

function FocusHistoryCard({ history }: { history: FocusRecord[] }) {
  return (
    <Card className="focus-history-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Histórico de sessões
        </CardTitle>
        <CardDescription>
          Cada ciclo concluído fica associado à disciplina e ao assunto estudado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {history.length ? (
          <div className="focus-history-list" aria-label="Sessões concluídas">
            {history.slice(0, 6).map((item) => (
              <div className="focus-history-row" key={item.id}>
                <div className="min-w-0">
                  <strong>{item.subject}</strong>
                  <span>{item.topic || "Revisão geral"}</span>
                </div>
                <div className="focus-history-meta">
                  <b>{item.minutes} min</b>
                  <time dateTime={item.completedAt}>
                    {new Date(item.completedAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </time>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Seus ciclos concluídos aparecerão aqui depois da primeira sessão.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function FocusCard({
  enem = false,
  subjects,
  suggested,
  subject,
  topic,
  topics,
  onPick,
  day,
  focusMode,
  onEnterFocus,
  onExitFocus,
  onFocusDone,
}: {
  enem?: boolean;
  subjects: string[];
  suggested: string;
  subject: string;
  topic: string;
  topics: string[];
  onPick: (v: { subject: string; topic: string }) => void;
  day: { cycles: number; minutes: number };
  focusMode: boolean;
  onEnterFocus: () => void;
  onExitFocus: () => void;
  onFocusDone: (minutes: number) => void;
}) {
  const pomo = usePomodoro((mode) => {
    if (mode === 5) toast.success("Pausa concluída. Hora de voltar ao foco.");
    else {
      onFocusDone(mode);
      toast.success(`Ciclo de ${mode} min concluído. Faça uma pausa de 5 min.`);
    }
  });
  const startFocus = () => {
    onEnterFocus();
    if (!pomo.running) pomo.toggle();
  };
  const total = pomo.mode * 60;
  const pct = total ? (total - pomo.left) / total : 0;
  const R = 92;
  const C = 2 * Math.PI * R;
  const mm = String(Math.floor(pomo.left / 60)).padStart(2, "0");
  const ss = String(pomo.left % 60).padStart(2, "0");
  const isBreak = pomo.mode === 5;
  const trainer = { ...plannedPractice(subject, topic), ...(enem ? { contest: "ENEM" } : {}) };

  return (
    <Card className={cn("focus-session-card overflow-hidden", focusMode && "focus-session-card--active")}>
      <div className="focus-session-layout">
        <div className="focus-session-context">
          <div className="focus-session-heading">
            <div>
              <span className="focus-session-kicker">{focusMode ? "MODO FOCO ATIVO" : "PREPARE SUA SESSÃO"}</span>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" /> Sessão de foco
              </CardTitle>
            </div>
            {focusMode ? (
              <Button type="button" variant="outline" size="sm" onClick={onExitFocus} className="gap-2">
                <Minimize2 className="h-4 w-4" /> Sair da tela cheia
              </Button>
            ) : (
              <Button type="button" variant="outline" size="sm" onClick={startFocus} className="gap-2">
                <Maximize2 className="h-4 w-4" /> Ativar modo foco
              </Button>
            )}
          </div>

          <div>
            <CardDescription className="mt-1">
              {focusMode
                ? "Apenas o assunto e os atalhos de estudo ficam na tela. Use Esc ou o botão acima para sair."
                : "Escolha o que vai estudar agora. Ao iniciar, o cronômetro abre o modo foco em tela cheia."}
            </CardDescription>
          </div>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground">Disciplina</span>
            <select
              className={selectCls}
              value={subject}
              onChange={(e) => onPick({ subject: e.target.value, topic: "" })}
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s === suggested ? `${s} — sugerida pelo seu plano` : s}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground">Assunto</span>
            <select
              className={selectCls}
              value={topic}
              onChange={(e) => onPick({ subject, topic: e.target.value })}
            >
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <SubjectIcon subject={subject} />
            <span className="font-semibold">{subject}</span>
            <span className="text-muted-foreground">· {topic}</span>
          </div>
          <div className="focus-session-links">
            <Button asChild variant="outline" className="justify-start gap-2">
              {enem ? <Link to="/dashboard/enem" search={{ tab: "materiais" }}><BookOpenCheck className="h-4 w-4" /> Materiais ENEM</Link> : <Link to="/dashboard/study-room" search={{ subject, topic }}><BookOpenCheck className="h-4 w-4" /> Sala de estudo</Link>}
            </Button>
            <Button asChild variant="outline" className="justify-start gap-2">
              <Link to="/dashboard/question-trainer" search={trainer}>
                <BrainCircuit className="h-4 w-4" /> Questões
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start gap-2">
              <Link to="/dashboard/flashcards" search={{ subject, topic }}>
                <Layers className="h-4 w-4" /> Flashcards
              </Link>
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "focus-session-clock focus-timer-panel",
            isBreak ? "focus-session-clock--break" : "",

          )}
        >
          <div className="flex gap-2" role="tablist" aria-label="Tipo de bloco">
            {([25, 50, 5] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={pomo.mode === m}
                onClick={() => pomo.setMode(m)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-[color,background-color,box-shadow]",
                  pomo.mode === m
                    ? m === 5
                      ? "bg-emerald-500 text-white shadow"
                      : "bg-amber-400 text-slate-900 shadow"
                    : "bg-muted text-muted-foreground hover:bg-muted/70",
                )}
              >
                {m === 5 ? (
                  <>
                    <Coffee className="h-3.5 w-3.5" /> Pausa 5 min
                  </>
                ) : (
                  <>
                    <Timer className="h-3.5 w-3.5" /> Foco {m} min
                  </>
                )}
              </button>
            ))}
          </div>
          <div className="relative grid place-items-center">
            <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90" aria-hidden>
              <circle
                cx="110"
                cy="110"
                r={R}
                fill="none"
                strokeWidth="10"
                className="stroke-muted"
              />
              <circle
                cx="110"
                cy="110"
                r={R}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - pct)}
                className={cn(
                  "transition-[stroke-dashoffset] duration-300",
                  isBreak ? "stroke-emerald-500" : "stroke-amber-400",
                )}
              />
            </svg>
            <div className="absolute text-center" role="timer" aria-label="Tempo restante">
              <div className="text-5xl font-black tabular-nums">
                {mm}:{ss}
              </div>
              <div className="mt-1 text-xs font-semibold text-muted-foreground">
                {isBreak ? "Descanse a mente" : pomo.running ? "Em foco" : "Pronto para começar"}
              </div>
            </div>
          </div>
          <div className="focus-progress" aria-label="Progresso do ciclo">
            <div className="focus-progress__label">
              <span>Progresso do ciclo</span>
              <strong>{Math.round(pct * 100)}%</strong>
            </div>
            <div
              className="focus-progress__track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pct * 100)}
            >
              <span style={{ width: `${Math.round(pct * 100)}%` }} />
            </div>
            <div className="focus-progress__meta">
              <span>{Math.floor((total - pomo.left) / 60)} min concluídos</span>
              <span>{Math.ceil(pomo.left / 60)} min restantes</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={pomo.running ? pomo.toggle : startFocus}
              className={cn(
                "min-w-32 gap-2",
                isBreak
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-amber-400 text-slate-900 hover:bg-amber-300",
              )}
            >
              {pomo.running ? (
                <>
                  <Pause className="h-4 w-4" /> Pausar
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> {focusMode ? "Iniciar" : "Iniciar em tela cheia"}
                </>
              )}
            </Button>
            <Button variant="outline" onClick={pomo.reset} className="gap-2">
              <RotateCcw className="h-4 w-4" /> Zerar
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Hoje: <b className="text-foreground">{day.cycles}</b>{" "}
            {day.cycles === 1 ? "ciclo" : "ciclos"} ·{" "}
            <b className="text-foreground">{day.minutes} min</b> de foco
          </p>
        </div>
      </div>
    </Card>
  );
}

// ───────────────────────── Revisão rápida ─────────────────────────

const TRAPS: { f: string; b: string; tags: string[] }[] = [
  {
    f: "CEBRASPE: item ANULADO vale quanto ponto?",
    b: "+1 ponto para TODOS os candidatos (crédito automático), independente da resposta marcada.",
    tags: ["banca"],
  },
  {
    f: "Item em BRANCO (sem marcação) vale quanto?",
    b: "0 pontos — não soma nem subtrai. Só “certa” (+1) e “errada” (−1) alteram a nota.",
    tags: ["banca"],
  },
  {
    f: "Lei 13.869/2019 revogou qual lei antiga?",
    b: "A Lei nº 4.898/1965 (antiga lei de abuso de autoridade).",
    tags: ["penal", "humanos"],
  },
  {
    f: "CF art. 144: quantos são os órgãos de segurança pública hoje?",
    b: "6 órgãos desde a EC 104/2019 (inclui as polícias penais). Material antigo ainda fala em 5 — desatualizado.",
    tags: ["constitucional"],
  },
  {
    f: "Regime de competência x regime de caixa: qual a diferença?",
    b: "Competência: registra quando o fato gerador ocorre. Caixa: registra só quando o dinheiro entra ou sai de fato.",
    tags: ["contabilidade"],
  },
  {
    f: "Em uma tabela-verdade, quando um “OU” (∨) é falso?",
    b: "Só quando AMBAS as proposições são falsas.",
    tags: ["raciocinio"],
  },
  {
    f: "Modelo OSI: quais as 7 camadas, de baixo para cima?",
    b: "Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação.",
    tags: ["informatica"],
  },
  {
    f: "Lei de Migração: o que NÃO pode motivar deportação sozinho?",
    b: "A mera situação migratória irregular — a deportação é medida administrativa, não penal.",
    tags: ["humanos"],
  },
  {
    f: "Lei 12.850/2013 revogou qual lei antiga?",
    b: "A Lei nº 9.034/1995 (antiga lei de organização criminosa).",
    tags: ["penal", "humanos"],
  },
];
const TAG_OF: [RegExp, string][] = [
  [/constitucional/, "constitucional"],
  [/penal|criminal|legisla/, "penal"],
  [/humanos|legisla|etica/, "humanos"],
  [/contab/, "contabilidade"],
  [/racioc|estat/, "raciocinio"],
  [/inform/, "informatica"],
];
const plain = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

function ReviewCard({
  due,
  subject,
  real,
}: {
  due: DueCard[];
  subject: string;
  careerId: CareerId;
  real: boolean;
}) {
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
        <CardTitle className="flex items-center gap-2 text-lg">
          <Layers className="h-5 w-5" /> Revisão rápida
        </CardTitle>
        <CardDescription>
          Seus cartões vencidos e as pegadinhas mais comuns de {tag ? "esta disciplina" : "prova"}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={mine.length ? "mine" : "traps"}>
          <TabsList>
            <TabsTrigger value="mine" className="gap-1.5">
              Meus cartões <Badge variant="secondary">{due.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="traps">Pegadinhas</TabsTrigger>
          </TabsList>
          <TabsContent value="mine" className="mt-4">
            {mine.length ? (
              <Flip
                cards={mine.map((c) => ({
                  f: c.front,
                  b: c.back,
                  meta: c.topic ? `${c.subject} · ${c.topic}` : c.subject,
                }))}
              />
            ) : (
              <div className="grid place-items-center gap-3 rounded-xl border border-dashed p-8 text-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                <p className="text-sm font-semibold">
                  {real
                    ? "Nenhum cartão vencido agora."
                    : "Entre na sua conta para revisar seus cartões."}
                </p>
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link to="/dashboard/flashcards" search={{ subject, topic: undefined }}>
                    Abrir meu baralho <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="traps" className="mt-4">
            <Flip cards={traps.map((t) => ({ f: t.f, b: t.b, meta: "Pegadinha recorrente" }))} />
          </TabsContent>
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
  const go = (d: number) => {
    setFlipped(false);
    setI((idx + d + cards.length) % cards.length);
  };
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label="Virar cartão"
        className={cn(
          "flex min-h-[150px] w-full flex-col items-center justify-center gap-2 rounded-xl border p-5 text-center transition-colors",
          flipped ? "border-amber-400/50 bg-amber-400/10" : "bg-muted/50 hover:bg-muted",
        )}
      >
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {flipped ? "Resposta" : c.meta}
        </span>
        <p className="text-sm font-semibold leading-relaxed">{flipped ? c.b : c.f}</p>
      </button>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {idx + 1} / {cards.length} · toque no cartão para virar
        </span>
        <span className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => go(-1)}>
            ‹ Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => go(1)}>
            Próximo ›
          </Button>
        </span>
      </div>
    </div>
  );
}

// ───────────────────────── Plano do aluno ─────────────────────────

function PlanLinkCard({
  profile,
  career,
  real,
  loading,
}: {
  profile: Profile | null;
  career: string;
  real: boolean;
  loading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5" /> Seu plano de estudos
        </CardTitle>
        <CardDescription>
          {profile
            ? `${profile.name ?? career} · ${profile.hours_per_week} h por semana`
            : "Ainda sem plano configurado."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? null : profile ? (
          <>
            <p className="text-sm text-muted-foreground">
              O cronograma da semana, as horas por matéria e o ajuste conforme seu desempenho ficam
              na Estratégia de estudos. Aqui você executa: foca, revisa e confere o conteúdo.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="gap-2">
                <Link to="/dashboard/study-coach">
                  Ver cronograma da semana <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link to="/dashboard/mock-exams">
                  <Timer className="h-4 w-4" /> Fazer simulado
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              {real
                ? "Informe sua carreira, a data da prova e as horas disponíveis. A Central passa a sugerir a disciplina mais urgente e a montar o checklist do seu concurso."
                : "Entre na sua conta para personalizar a Central com o seu concurso."}
            </p>
            <Button asChild className="gap-2">
              <Link
                to={real ? "/dashboard/study-coach" : "/auth"}
                {...(real ? {} : { search: { mode: undefined } })}
              >
                {real ? "Configuração do estudo" : "Entrar"} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ───────────────────────── Checklist do edital ─────────────────────────

function ChecklistCard({
  careerId,
  subjects,
  essay,
}: {
  careerId: CareerId;
  subjects: string[];
  essay: boolean;
}) {
  const key = `norte_review_v2:${careerId}`;
  const [state, setState] = React.useState<Record<string, true>>({});
  React.useEffect(() => {
    try {
      setState(JSON.parse(localStorage.getItem(key) ?? "{}") as Record<string, true>);
    } catch {
      setState({});
    }
  }, [key]);
  const toggle = (k: string) => {
    setState((prev) => {
      const next = { ...prev };
      if (next[k]) delete next[k];
      else next[k] = true;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* sem armazenamento */
      }
      return next;
    });
  };
  const groups = React.useMemo(
    () => [
      ...subjects.map((s) => ({
        name: s,
        items: topicsFor(s).map((t) => ({ k: `${s}|${t}`, label: t })),
      })),
      {
        name: "Treino geral",
        items: [
          { k: "geral|simulado", label: "Fiz pelo menos 1 simulado completo cronometrado" },
          ...(essay
            ? [{ k: "geral|redacao", label: "Pratiquei 1 redação discursiva completa" }]
            : []),
          { k: "geral|erros", label: "Revisei meu caderno de erros" },
        ],
      },
    ],
    [subjects, essay],
  );
  const all = groups.flatMap((g) => g.items);
  const done = all.filter((i) => state[i.k]).length;
  const pct = all.length ? Math.round((100 * done) / all.length) : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-wrap items-center justify-between gap-2 text-lg">
          <span className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" /> Checklist do edital
          </span>
          <Badge variant="outline">
            {done} de {all.length} · {pct}%
          </Badge>
        </CardTitle>
        <CardDescription>
          Assuntos de cada disciplina da sua carreira. Marque o que já revisou.
        </CardDescription>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-[width]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        {groups.map((g) => {
          const n = g.items.filter((i) => state[i.k]).length;
          return (
            <details
              key={g.name}
              className="group rounded-xl border bg-card open:shadow-sm"
              open={g.name === groups[0]?.name}
            >
              <summary className="flex cursor-pointer list-none items-center gap-2.5 px-3.5 py-3 [&::-webkit-details-marker]:hidden">
                {g.name === "Treino geral" ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <SubjectIcon subject={g.name} className="h-7 w-7" />
                )}
                <span className="flex-1 text-sm font-semibold">{g.name}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums",
                    n === g.items.length
                      ? "bg-emerald-500/15 text-emerald-600"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {n}/{g.items.length}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-1.5 border-t px-3.5 py-3">
                {g.items.map((i) => (
                  <label key={i.k} className="flex cursor-pointer items-start gap-2.5 text-sm">
                    <input
                      type="checkbox"
                      checked={!!state[i.k]}
                      onChange={() => toggle(i.k)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-amber-500"
                    />
                    <span className={cn(state[i.k] && "text-muted-foreground line-through")}>
                      {i.label}
                    </span>
                  </label>
                ))}
              </div>
            </details>
          );
        })}
      </CardContent>
      <p className="px-6 pb-5 text-[11px] text-muted-foreground">
        Fica salvo neste navegador, separado por carreira.
      </p>
    </Card>
  );
}
