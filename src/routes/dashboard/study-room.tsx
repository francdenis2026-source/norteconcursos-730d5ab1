import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft, BookOpenCheck, BrainCircuit, CheckCircle2, Coffee, ExternalLink, FileText, Layers, Library, Loader2,
  MapPin, Pause, Play, PlayCircle, RotateCcw, SkipForward, Timer as TimerIcon,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Markdown } from "@/components/library/Markdown";
import { StudyPractice } from "@/components/library/StudyPractice";
import { LockedState } from "@/components/dashboard/PageHero";
import { PLAYLISTS, youtubePlaylistUrl, youtubeSearchUrl } from "@/data/mediaCatalog";
import { readingMinutes, useStudyMaterial, useStudyMaterialList, type StudyMaterialSummary } from "@/lib/studyMaterials";
import { areaOfSubject, subjectInArea } from "@/lib/questionTopics";
import { advance, fmtClock, initialState, makeSegments, pause, skip, start, type Segment, type TimerState } from "@/lib/studyTimer";
import { cn } from "@/lib/utils";

type Search = {
  subject?: string | undefined; topic?: string | undefined; kind?: string | undefined; minutes?: string | undefined;
  plan?: string | undefined; week?: string | undefined; key?: string | undefined;
};
// O roteador converte "60" em número ao ler a URL: aceita os dois.
const pick = (v: unknown) => (typeof v === "string" && v ? v : typeof v === "number" ? String(v) : undefined);

export const Route = createFileRoute("/dashboard/study-room")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    subject: pick(s["subject"]), topic: pick(s["topic"]), kind: pick(s["kind"]), minutes: pick(s["minutes"]),
    plan: pick(s["plan"]), week: pick(s["week"]), key: pick(s["key"]),
  }),
  component: StudyRoomPage,
});

const strip = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const tokens = (v: string) => strip(v).split(/[^a-z0-9]+/).filter((t) => t.length >= 5);

/** Materiais da matéria, com os do assunto primeiro (mais palavras em comum). */
function rank(list: StudyMaterialSummary[], subject: string, topic: string) {
  const want = new Set(tokens(topic));
  return list
    .filter((m) => subjectInArea(subject, m.discipline))
    .map((m) => ({ m, score: tokens(`${m.topic_label} ${m.title} ${m.summary ?? ""}`).filter((t) => want.has(t)).length }))
    .sort((a, b) => b.score - a.score || a.m.sort_order - b.m.sort_order);
}

const DISCIPLINE_OF_AREA: Record<string, string> = {
  portugues: "Língua Portuguesa", raciocinio: "Raciocínio Lógico", constitucional: "Direito Constitucional",
  penal: "Direito Penal", processual: "Direito Processual Penal", informatica: "Informática",
};

// ───────────────────────── Cronômetro ─────────────────────────

function useBlockTimer(storageKey: string, segments: Segment[]) {
  const load = React.useCallback((): TimerState => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as TimerState;
        if (segments[parsed.seg]) return advance(parsed, segments, Date.now()).state;
      }
    } catch { /* sem storage */ }
    return initialState(segments);
  }, [storageKey, segments]);
  const [state, setState] = React.useState<TimerState>(load);
  // Se o bloco (ou o tempo programado) mudar, recarrega o estado daquele bloco.
  const loaded = React.useRef(storageKey);
  React.useEffect(() => {
    if (loaded.current !== storageKey) {
      loaded.current = storageKey;
      setState(load());
    }
  }, [storageKey, load]);
  const ref = React.useRef(state);
  ref.current = state;

  const beep = React.useCallback(() => {
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      gain.gain.value = 0.08;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch { /* sem áudio */ }
  }, []);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      if (!ref.current.running) return; // parado: nada a atualizar
      const r = advance(ref.current, segments, Date.now());
      if (r.changed) beep();
      setState(r.state);
    }, 250);
    return () => window.clearInterval(id);
  }, [segments, beep]);

  React.useEffect(() => {
    if (loaded.current !== storageKey) return;
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* ignora */ }
  }, [state, storageKey]);

  return {
    state,
    toggle: () => setState((s) => (s.running ? pause(s, segments, Date.now()) : start(s, Date.now()))),
    skip: () => setState((s) => skip(s, segments, Date.now())),
    reset: () => setState(initialState(segments)),
  };
}

function TimerPanel({
  segments, storageKey, planned, onFinish, canRegister, registering, registered,
}: {
  segments: Segment[]; storageKey: string; planned: number; onFinish: (studiedSeconds: number) => void;
  canRegister: boolean; registering: boolean; registered: boolean;
}) {
  const t = useBlockTimer(storageKey, segments);
  const { state } = t;
  const seg = segments[state.seg];
  const focusSegs = segments.filter((s) => s.type === "focus");
  const focusIndex = segments.slice(0, state.seg + 1).filter((s) => s.type === "focus").length;
  const studiedMin = Math.floor(state.studiedMs / 60_000);
  const pct = Math.min(100, Math.round((100 * state.studiedMs) / (planned * 60_000)));
  const onBreak = seg?.type === "break";

  React.useEffect(() => {
    document.title = state.running ? `${fmtClock(state.remainingMs)} · ${onBreak ? "Pausa" : "Foco"} — Norte Concurso` : "Sala de estudo — Norte Concurso";
    return () => { document.title = "Norte Concurso"; };
  }, [state.running, state.remainingMs, onBreak]);

  return (
    <Card className={cn("border-2", onBreak ? "border-emerald-500/50" : state.running ? "border-primary/60" : "")}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base"><TimerIcon className="h-5 w-5 text-primary" /> Cronômetro de estudo</CardTitle>
        <CardDescription>
          {planned} min de estudo programados · foco {focusSegs.length > 1 ? "com pausas" : "contínuo"}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center" role="timer" aria-live="off">
          <Badge className={cn("mb-2 gap-1", onBreak ? "bg-emerald-600" : "")} variant={onBreak ? "default" : "secondary"}>
            {onBreak ? <><Coffee className="h-3.5 w-3.5" /> Pausa</> : <><BrainCircuit className="h-3.5 w-3.5" /> Foco {focusIndex}/{focusSegs.length}</>}
          </Badge>
          <p className="text-6xl font-black tabular-nums tracking-tight">{state.finished ? "00:00" : fmtClock(state.remainingMs)}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {state.finished ? "Tempo programado concluído" : onBreak ? "Levante, beba água, descanse os olhos" : state.running ? "Concentração total no assunto" : "Pronto para começar"}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold"><span>Estudado</span><span className="tabular-nums">{studiedMin} de {planned} min · {pct}%</span></div>
          <Progress value={pct} className="h-2.5" />
        </div>

        <ol className="flex gap-1" aria-label="Fases do bloco">
          {segments.map((s, i) => (
            <li key={i} title={`${s.type === "focus" ? "Foco" : "Pausa"} ${s.ms / 60_000} min`}
              className={cn("h-1.5 rounded-full", i < state.seg || state.finished ? (s.type === "focus" ? "bg-primary" : "bg-emerald-500") : i === state.seg ? "bg-primary/60" : "bg-muted")}
              style={{ flexGrow: s.ms }} />
          ))}
        </ol>

        <div className="grid grid-cols-3 gap-2">
          <Button onClick={t.toggle} disabled={state.finished} className="col-span-3 h-11">
            {state.running ? <><Pause className="h-4 w-4" /> Pausar</> : <><Play className="h-4 w-4" /> {state.studiedMs > 0 ? "Continuar" : "Iniciar estudo"}</>}
          </Button>
          <Button variant="outline" size="sm" className="col-span-2" onClick={t.skip} disabled={state.finished}><SkipForward className="h-4 w-4" /> Pular fase</Button>
          <Button variant="outline" size="sm" onClick={t.reset} aria-label="Reiniciar cronômetro"><RotateCcw className="h-4 w-4" /></Button>
        </div>

        {canRegister && (
          <Button
            variant={state.finished ? "default" : "secondary"}
            className="w-full"
            disabled={registering || registered || state.studiedMs < 60_000}
            onClick={() => onFinish(Math.round(state.studiedMs / 1000))}
          >
            {registered ? <><CheckCircle2 className="h-4 w-4" /> Registrado no cronograma</> : registering ? <Loader2 className="h-4 w-4 animate-spin" /> : "Concluir e marcar como estudado"}
          </Button>
        )}
        <p className="text-[0.7rem] text-muted-foreground">O tempo de pausa não conta como estudo. O cronômetro continua se você trocar de página e voltar.</p>
      </CardContent>
    </Card>
  );
}

// ───────────────────────── Página ─────────────────────────

function StudyRoomPage() {
  const sp = Route.useSearch();
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const subject = sp.subject ?? "";
  const topic = sp.topic ?? "";
  const planned = Math.max(5, Math.min(240, Number(sp.minutes) || 30));
  const segments = React.useMemo(() => makeSegments(planned), [planned]);
  const storageKey = `norte_room_${sp.key ?? `${subject}|${topic}`}_${planned}_${sp.week ?? ""}`;

  const { data: list, isPending } = useStudyMaterialList(real);
  const ranked = React.useMemo(() => rank(list ?? [], subject, topic), [list, subject, topic]);
  const [slug, setSlug] = React.useState<string | null>(null);
  const currentSlug = slug ?? ranked[0]?.m.slug ?? "";
  const { data: material, isPending: loadingMaterial } = useStudyMaterial(currentSlug, real && !!currentSlug);
  const exact = ranked.filter((r) => r.score > 0);

  const area = areaOfSubject(subject);
  const discipline = area ? DISCIPLINE_OF_AREA[area] : undefined;
  const playlists = discipline ? PLAYLISTS.filter((p) => p.discipline === discipline) : [];

  const [notes, setNotes] = React.useState(() => {
    try { return localStorage.getItem(`${storageKey}_notes`) ?? ""; } catch { return ""; }
  });
  React.useEffect(() => {
    const id = window.setTimeout(() => { try { localStorage.setItem(`${storageKey}_notes`, notes); } catch { /* ignora */ } }, 400);
    return () => window.clearTimeout(id);
  }, [notes, storageKey]);

  const [registering, setRegistering] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const canRegister = !!(user && sp.plan && sp.week && sp.key && sp.kind);

  async function register(studiedSeconds: number) {
    if (!user || !sp.plan || !sp.week || !sp.key) return;
    setRegistering(true);
    const { error } = await supabase.from("study_plan_checks").upsert(
      {
        user_id: user.id, plan_id: sp.plan, week_start: sp.week, block_key: sp.key, subject, kind: sp.kind ?? "Teoria",
        topics: topic ? [topic] : [], minutes: planned, actual_seconds: studiedSeconds,
      },
      { onConflict: "user_id,plan_id,week_start,block_key" },
    );
    setRegistering(false);
    if (error) { toast.error("Não foi possível registrar. Tente novamente."); return; }
    setRegistered(true);
    toast.success("Bloco registrado no seu cronograma.");
  }

  if (authLoading) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>;
  if (!real) return <LockedState image="study-desk" title={<>Sala de <em>estudo</em></>} description="Entre na sua conta para estudar com o cronômetro e o material do seu cronograma." />;
  if (!subject) {
    return (
      <div className="mx-auto max-w-xl space-y-4 py-10 text-center">
        <p className="text-lg font-bold">Escolha um assunto no seu cronograma.</p>
        <Button asChild><Link to="/dashboard/study-coach">Abrir o Assistente de estudos</Link></Button>
      </div>
    );
  }

  const questionSearch = { area: subject, go: "1", ...(topic ? { topic } : {}) };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-2 gap-1.5">
          <Link to="/dashboard/study-coach"><ArrowLeft className="h-4 w-4" /> Voltar ao cronograma</Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{sp.kind ?? "Estudo"}</Badge>
          <Badge variant="secondary">{planned} min</Badge>
        </div>
        <h1 className="mt-2 text-2xl font-black leading-tight md:text-3xl">{topic || subject}</h1>
        <p className="text-sm text-muted-foreground">{subject}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="order-2 space-y-5 lg:order-1">
          {/* Material */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><FileText className="h-5 w-5 text-primary" /> Material de estudo</CardTitle>
              <CardDescription>
                {isPending ? "Buscando na Biblioteca…" : exact.length ? `${exact.length} ${exact.length === 1 ? "material encontrado" : "materiais encontrados"} para este assunto.` : ranked.length ? "Ainda não há material específico deste assunto. Abaixo, os materiais da matéria." : "A Biblioteca ainda não tem material desta matéria."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ranked.length > 1 && (
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Materiais">
                  {ranked.slice(0, 8).map(({ m, score }) => (
                    <button key={m.slug} type="button" role="tab" aria-selected={m.slug === currentSlug} onClick={() => setSlug(m.slug)}
                      className={cn("rounded-full border px-3 py-1 text-xs font-semibold", m.slug === currentSlug ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}>
                      {score > 0 && "★ "}{m.title}
                    </button>
                  ))}
                </div>
              )}
              {currentSlug && loadingMaterial && <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" aria-label="Carregando material" />}
              {material && (
                <article>
                  <h2 className="text-lg font-bold">{material.title}</h2>
                  <p className="mb-3 text-xs text-muted-foreground">{material.topic_label} · {readingMinutes(material.body_md)} min de leitura</p>
                  <div className="surface-card library-body"><Markdown source={material.body_md} /></div>
                  <Link to="/dashboard/library/$slug" params={{ slug: material.slug }} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                    Abrir na Biblioteca <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  <StudyPractice flashcards={material.flashcards ?? []} quiz={material.quiz ?? []} slug={material.slug} subject={material.discipline} topic={material.topic_label} />
                </article>
              )}
              {!isPending && ranked.length === 0 && (
                <div className="rounded-xl border border-dashed p-5 text-sm text-muted-foreground">
                  Use o edital e as videoaulas ao lado para estudar este assunto, e registre o que aprendeu nas anotações.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Anotações */}
          <Card>
            <CardHeader><CardTitle className="text-base">Anotações da sessão</CardTitle><CardDescription>Salvas neste aparelho, só para você. Ao final, escreva 3 pontos que não pode esquecer.</CardDescription></CardHeader>
            <CardContent>
              <Textarea aria-label="Anotações" rows={6} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Resumo com as suas palavras, dúvidas, pegadinhas da banca…" />
            </CardContent>
          </Card>
        </div>

        <aside className="order-1 space-y-5 lg:order-2 lg:sticky lg:top-4 lg:self-start">
          <TimerPanel
            segments={segments} storageKey={storageKey} planned={planned}
            canRegister={canRegister} registering={registering} registered={registered} onFinish={(s) => void register(s)}
          />

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Mais recursos do assunto</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 text-sm">
              <Link to="/dashboard/question-trainer" search={questionSearch} className="flex items-center gap-2 rounded-lg border p-2.5 font-medium hover:border-primary/50"><BookOpenCheck className="h-4 w-4 text-emerald-600" /> Praticar questões deste assunto</Link>
              <Link to="/dashboard/flashcards" search={{ subject, ...(topic ? { topic } : {}) }} className="flex items-center gap-2 rounded-lg border p-2.5 font-medium hover:border-primary/50"><Layers className="h-4 w-4 text-cyan-600" /> Flashcards do assunto</Link>
              <Link to="/dashboard/edital" className="flex items-center gap-2 rounded-lg border p-2.5 font-medium hover:border-primary/50"><MapPin className="h-4 w-4 text-sky-600" /> Ver no edital</Link>
              <Link to="/dashboard/library" className="flex items-center gap-2 rounded-lg border p-2.5 font-medium hover:border-primary/50"><Library className="h-4 w-4 text-violet-600" /> Biblioteca completa</Link>
              {playlists.length > 0 && (
                <div className="pt-2">
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground"><PlayCircle className="h-3.5 w-3.5" /> Videoaulas gratuitas</p>
                  <ul className="space-y-1">
                    {playlists.slice(0, 3).map((p) => (
                      <li key={p.id}><a href={youtubePlaylistUrl(p.id)} target="_blank" rel="noopener noreferrer" className="flex items-start gap-1.5 text-xs font-medium text-primary hover:underline"><ExternalLink className="mt-0.5 h-3 w-3 shrink-0" /> {p.title}</a></li>
                    ))}
                  </ul>
                </div>
              )}
              {discipline && (
                <a href={youtubeSearchUrl(`${topic || discipline}`)} target="_blank" rel="noopener noreferrer" className="block pt-1 text-xs font-medium text-muted-foreground hover:text-primary hover:underline">Buscar aulas grátis deste assunto no YouTube</a>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
