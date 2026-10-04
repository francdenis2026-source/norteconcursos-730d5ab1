import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  Coffee,
  ExternalLink,
  FileText,
  Headphones,
  Layers,
  Library,
  Loader2,
  MapPin,
  Minus,
  Pause,
  Play,
  PlayCircle,
  RotateCcw,
  SkipForward,
  Timer as TimerIcon,
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
import { youtubeEmbedUrl, youtubePlaylistUrl, youtubeSearchUrl } from "@/data/mediaCatalog";
import { readingMinutes, useStudyMaterial, useStudyMaterialList } from "@/lib/studyMaterials";
import {
  isPlaylistId,
  loadArsenal,
  mediaDisciplineOf,
  rankMaterials,
  type Arsenal,
} from "@/lib/arsenal";
import { AudioPlayer } from "@/components/media/AudioPlayer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  advance,
  fmtClock,
  initialState,
  makeSegments,
  pause,
  skip,
  start,
  type Segment,
  type TimerState,
} from "@/lib/studyTimer";
import { cn } from "@/lib/utils";

type Search = {
  subject?: string | undefined;
  topic?: string | undefined;
  kind?: string | undefined;
  minutes?: string | undefined;
  plan?: string | undefined;
  week?: string | undefined;
  key?: string | undefined;
};
// O roteador converte "60" em número ao ler a URL: aceita os dois.
const pick = (v: unknown) =>
  typeof v === "string" && v ? v : typeof v === "number" ? String(v) : undefined;

export const Route = createFileRoute("/dashboard/study-room")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    subject: pick(s["subject"]),
    topic: pick(s["topic"]),
    kind: pick(s["kind"]),
    minutes: pick(s["minutes"]),
    plan: pick(s["plan"]),
    week: pick(s["week"]),
    key: pick(s["key"]),
  }),
  component: StudyRoomPage,
});

// ───────────────────────── Cronômetro ─────────────────────────

function useBlockTimer(storageKey: string, segments: Segment[]) {
  const load = React.useCallback((): TimerState => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as TimerState;
        if (segments[parsed.seg]) return advance(parsed, segments, Date.now()).state;
      }
    } catch {
      /* sem storage */
    }
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
      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      gain.gain.value = 0.08;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      /* sem áudio */
    }
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
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* ignora */
    }
  }, [state, storageKey]);

  return {
    state,
    toggle: () =>
      setState((s) => (s.running ? pause(s, segments, Date.now()) : start(s, Date.now()))),
    skip: () => setState((s) => skip(s, segments, Date.now())),
    reset: () => setState(initialState(segments)),
  };
}

function TimerPanel({
  segments,
  storageKey,
  planned,
  onFinish,
  canRegister,
  registering,
  registered,
}: {
  segments: Segment[];
  storageKey: string;
  planned: number;
  onFinish: (studiedSeconds: number) => void;
  canRegister: boolean;
  registering: boolean;
  registered: boolean;
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
    document.title = state.running
      ? `${fmtClock(state.remainingMs)} · ${onBreak ? "Pausa" : "Foco"} — Norte Concurso`
      : "Sala de estudo — Norte Concurso";
    return () => {
      document.title = "Norte Concurso";
    };
  }, [state.running, state.remainingMs, onBreak]);

  return (
    <Card
      className={cn(
        "border-2",
        onBreak ? "border-emerald-500/50" : state.running ? "border-primary/60" : "",
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <TimerIcon className="h-5 w-5 text-primary" /> Cronômetro de estudo
        </CardTitle>
        <CardDescription>
          {planned} min de estudo programados · foco{" "}
          {focusSegs.length > 1 ? "com pausas" : "contínuo"}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center" role="timer" aria-live="off">
          <Badge
            className={cn("mb-2 gap-1", onBreak ? "bg-emerald-600" : "")}
            variant={onBreak ? "default" : "secondary"}
          >
            {onBreak ? (
              <>
                <Coffee className="h-3.5 w-3.5" /> Pausa
              </>
            ) : (
              <>
                <BrainCircuit className="h-3.5 w-3.5" /> Foco {focusIndex}/{focusSegs.length}
              </>
            )}
          </Badge>
          <p className="text-6xl font-black tabular-nums tracking-tight">
            {state.finished ? "00:00" : fmtClock(state.remainingMs)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {state.finished
              ? "Tempo programado concluído"
              : onBreak
                ? "Levante, beba água, descanse os olhos"
                : state.running
                  ? "Concentração total no assunto"
                  : "Pronto para começar"}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span>Estudado</span>
            <span className="tabular-nums">
              {studiedMin} de {planned} min · {pct}%
            </span>
          </div>
          <Progress value={pct} className="h-2.5" />
        </div>

        <ol className="flex gap-1" aria-label="Fases do bloco">
          {segments.map((s, i) => (
            <li
              key={i}
              title={`${s.type === "focus" ? "Foco" : "Pausa"} ${s.ms / 60_000} min`}
              className={cn(
                "h-1.5 rounded-full",
                i < state.seg || state.finished
                  ? s.type === "focus"
                    ? "bg-primary"
                    : "bg-emerald-500"
                  : i === state.seg
                    ? "bg-primary/60"
                    : "bg-muted",
              )}
              style={{ flexGrow: s.ms }}
            />
          ))}
        </ol>

        <div className="grid grid-cols-3 gap-2">
          <Button onClick={t.toggle} disabled={state.finished} className="col-span-3 h-11">
            {state.running ? (
              <>
                <Pause className="h-4 w-4" /> Pausar
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> {state.studiedMs > 0 ? "Continuar" : "Iniciar estudo"}
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="col-span-2"
            onClick={t.skip}
            disabled={state.finished}
          >
            <SkipForward className="h-4 w-4" /> Pular fase
          </Button>
          <Button variant="outline" size="sm" onClick={t.reset} aria-label="Reiniciar cronômetro">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {canRegister && (
          <Button
            variant={state.finished ? "default" : "secondary"}
            className="w-full"
            disabled={registering || registered || state.studiedMs < 60_000}
            onClick={() => onFinish(Math.round(state.studiedMs / 1000))}
          >
            {registered ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Registrado no cronograma
              </>
            ) : registering ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Concluir e marcar como estudado"
            )}
          </Button>
        )}
        <p className="text-[0.7rem] text-muted-foreground">
          O tempo de pausa não conta como estudo. O cronômetro continua se você trocar de página e
          voltar.
        </p>
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
  const ranked = React.useMemo(
    () => rankMaterials(list ?? [], subject, topic),
    [list, subject, topic],
  );
  const [slug, setSlug] = React.useState<string | null>(null);
  const currentSlug = slug ?? ranked[0]?.m.slug ?? "";
  const { data: material, isPending: loadingMaterial } = useStudyMaterial(
    currentSlug,
    real && !!currentSlug,
  );
  const exact = ranked.filter((r) => r.score > 0);

  const qc = useQueryClient();
  const { data: arsenal } = useQuery<Arsenal>({
    queryKey: ["arsenal", user?.id, subject, topic],
    enabled: real && !!subject,
    staleTime: 5 * 60_000,
    queryFn: () => loadArsenal(qc, user!.id, subject, topic),
  });
  const discipline = mediaDisciplineOf(subject);
  const playlists = arsenal?.playlists ?? [];
  // Videoaulas catalogadas por assunto; sem elas, as gerais da matéria e, por fim, as playlists da disciplina.
  const topicVideos = arsenal?.videos ?? [];
  const [videoId, setVideoId] = React.useState<string | null>(null);
  const activeVideo = topicVideos.find((v) => v.id === videoId) ?? topicVideos[0];
  const podcasts = arsenal?.podcasts ?? [];
  const [playlistId, setPlaylistId] = React.useState<string | null>(null);
  const activePlaylist = playlists.find((p) => p.id === playlistId) ?? playlists[0];
  const [podcastId, setPodcastId] = React.useState<string | null>(null);
  const activePodcast = podcasts.find((p) => p.id === podcastId) ?? podcasts[0];

  const [notes, setNotes] = React.useState(() => {
    try {
      return localStorage.getItem(`${storageKey}_notes`) ?? "";
    } catch {
      return "";
    }
  });
  React.useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(`${storageKey}_notes`, notes);
      } catch {
        /* ignora */
      }
    }, 400);
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
        user_id: user.id,
        plan_id: sp.plan,
        week_start: sp.week,
        block_key: sp.key,
        subject,
        kind: sp.kind ?? "Teoria",
        topics: topic ? [topic] : [],
        minutes: planned,
        actual_seconds: studiedSeconds,
      },
      { onConflict: "user_id,plan_id,week_start,block_key" },
    );
    setRegistering(false);
    if (error) {
      toast.error("Não foi possível registrar. Tente novamente.");
      return;
    }
    setRegistered(true);
    toast.success("Bloco registrado no seu cronograma.");
  }

  if (authLoading)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
      </div>
    );
  if (!real)
    return (
      <LockedState
        image="study-desk"
        title={
          <>
            Sala de <em>estudo</em>
          </>
        }
        description="Entre na sua conta para estudar com o cronômetro e o material do seu cronograma."
      />
    );
  if (!subject) {
    return (
      <div className="mx-auto max-w-xl space-y-4 py-10 text-center">
        <p className="text-lg font-bold">Escolha um assunto no seu cronograma.</p>
        <Button asChild>
          <Link to="/dashboard/study-coach">Abrir o Assistente de estudos</Link>
        </Button>
      </div>
    );
  }

  const questionSearch = { area: subject, go: "1", ...(topic ? { topic } : {}) };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-2 gap-1.5">
          <Link to="/dashboard/study-coach">
            <ArrowLeft className="h-4 w-4" /> Voltar ao cronograma
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{sp.kind ?? "Estudo"}</Badge>
          <Badge variant="secondary">{planned} min</Badge>
        </div>
        <h1 className="mt-2 text-2xl font-black leading-tight md:text-3xl">{topic || subject}</h1>
        <p className="text-sm text-muted-foreground">{subject}</p>
        <ul
          className="mt-3 flex flex-wrap gap-2 text-xs"
          aria-label="Recursos disponíveis para este assunto"
        >
          {(
            [
              [
                "Material",
                (arsenal?.topicMaterials.length ?? 0) || (arsenal?.subjectMaterials.length ?? 0),
                arsenal
                  ? (arsenal.topicMaterials.length ?? 0) > 0
                    ? "do assunto"
                    : "da matéria"
                  : "",
              ],
              [
                "Videoaulas",
                topicVideos.length || playlists.length,
                topicVideos.length
                  ? arsenal?.videosAreTopic
                    ? "do assunto"
                    : "da matéria"
                  : "playlists",
              ],
              ["Podcasts", podcasts.length, ""],
              ["Flashcards", arsenal?.cards ?? 0, "seus"],
              ["Questões", arsenal?.questions ?? 0, "na matéria"],
            ] as [string, number, string][]
          ).map(([label, n, hint]) => (
            <li
              key={label}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1 font-semibold",
                n > 0 ? "border-emerald-500/40 bg-emerald-500/10" : "text-muted-foreground",
              )}
            >
              {n > 0 ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Minus className="h-3.5 w-3.5" />
              )}
              {label}
              {n > 0 ? ` · ${n}${hint ? ` ${hint}` : ""}` : " · indisponível"}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="order-2 space-y-5 lg:order-1">
          {/* Material */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-5 w-5 text-primary" /> Material de estudo
              </CardTitle>
              <CardDescription>
                {isPending
                  ? "Buscando na Biblioteca…"
                  : exact.length
                    ? `${exact.length} ${exact.length === 1 ? "material encontrado" : "materiais encontrados"} para este assunto.`
                    : ranked.length
                      ? "Ainda não há material específico deste assunto. Abaixo, os materiais da matéria."
                      : "A Biblioteca ainda não tem material desta matéria."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ranked.length > 1 && (
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Materiais">
                  {ranked.slice(0, 8).map(({ m, score }) => (
                    <button
                      key={m.slug}
                      type="button"
                      role="tab"
                      aria-selected={m.slug === currentSlug}
                      onClick={() => setSlug(m.slug)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-semibold",
                        m.slug === currentSlug
                          ? "border-primary bg-primary text-primary-foreground"
                          : "hover:border-primary/50",
                      )}
                    >
                      {score > 0 && "★ "}
                      {m.title}
                    </button>
                  ))}
                </div>
              )}
              {currentSlug && loadingMaterial && (
                <Loader2
                  className="mx-auto h-5 w-5 animate-spin text-muted-foreground"
                  aria-label="Carregando material"
                />
              )}
              {material && (
                <article>
                  <h2 className="text-lg font-bold">{material.title}</h2>
                  <p className="mb-3 text-xs text-muted-foreground">
                    {material.topic_label} · {readingMinutes(material.body_md)} min de leitura
                  </p>
                  <div className="surface-card library-body">
                    <Markdown source={material.body_md} />
                  </div>
                  <Link
                    to="/dashboard/library/$slug"
                    params={{ slug: material.slug }}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Abrir na Biblioteca <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  <StudyPractice
                    flashcards={material.flashcards ?? []}
                    quiz={material.quiz ?? []}
                    slug={material.slug}
                    subject={material.discipline}
                    topic={material.topic_label}
                  />
                </article>
              )}
              {!isPending && ranked.length === 0 && (
                <div className="rounded-xl border border-dashed p-5 text-sm text-muted-foreground">
                  Use o edital e as videoaulas ao lado para estudar este assunto, e registre o que
                  aprendeu nas anotações.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Videoaulas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <PlayCircle className="h-5 w-5 text-primary" /> Videoaulas gratuitas
              </CardTitle>
              <CardDescription>
                {activeVideo
                  ? arsenal?.videosAreTopic
                    ? `Selecionadas para "${topic}". Todas gratuitas, do YouTube.`
                    : "Videoaulas gerais da matéria. Ainda não catalogamos vídeos específicos deste assunto."
                  : activePlaylist
                    ? `Playlists de ${discipline} (por matéria, não por assunto). Procure o tema "${topic || subject}" na lista do vídeo.`
                    : "Ainda não há videoaulas cadastradas para esta matéria."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeVideo ? (
                <>
                  <div className="overflow-hidden rounded-xl border bg-black">
                    <div className="aspect-video w-full">
                      <iframe
                        key={activeVideo.id}
                        src={
                          isPlaylistId(activeVideo.id)
                            ? youtubeEmbedUrl(activeVideo.id)
                            : `https://www.youtube-nocookie.com/embed/${activeVideo.id}?rel=0`
                        }
                        title={activeVideo.title}
                        className="h-full w-full"
                        loading="lazy"
                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  </div>
                  <ul className="max-h-64 space-y-1 overflow-y-auto pr-1">
                    {topicVideos.map((v) => (
                      <li key={v.id}>
                        <button
                          type="button"
                          onClick={() => setVideoId(v.id)}
                          className={cn(
                            "flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium",
                            v.id === activeVideo.id
                              ? "border-primary bg-primary/10"
                              : "hover:border-primary/50",
                          )}
                        >
                          <PlayCircle
                            className={cn(
                              "mt-0.5 h-4 w-4 shrink-0",
                              v.id === activeVideo.id ? "text-primary" : "text-muted-foreground",
                            )}
                          />
                          <span className="flex-1">{v.title}</span>
                          {isPlaylistId(v.id) && (
                            <Badge variant="secondary" className="shrink-0 text-[0.6rem]">
                              Curso
                            </Badge>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={
                      isPlaylistId(activeVideo.id)
                        ? youtubePlaylistUrl(activeVideo.id)
                        : `https://www.youtube.com/watch?v=${activeVideo.id}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Abrir no YouTube <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </>
              ) : activePlaylist ? (
                <>
                  <div className="overflow-hidden rounded-xl border bg-black">
                    <div className="aspect-video w-full">
                      <iframe
                        key={activePlaylist.id}
                        src={youtubeEmbedUrl(activePlaylist.id)}
                        title={activePlaylist.title}
                        className="h-full w-full"
                        loading="lazy"
                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {playlists.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlaylistId(p.id)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold",
                          p.id === activePlaylist.id
                            ? "border-primary bg-primary text-primary-foreground"
                            : "hover:border-primary/50",
                        )}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                  <a
                    href={youtubePlaylistUrl(activePlaylist.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Abrir no YouTube <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </>
              ) : (
                <a
                  href={youtubeSearchUrl(topic || subject)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Buscar aulas grátis deste assunto no YouTube{" "}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </CardContent>
          </Card>

          {/* Podcasts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Headphones className="h-5 w-5 text-primary" /> Podcasts de estudo
              </CardTitle>
              <CardDescription>
                {activePodcast
                  ? "Reforce o assunto em áudio."
                  : "Ainda não há podcasts desta matéria. Os episódios gerados no NotebookLM chegam em breve."}
              </CardDescription>
            </CardHeader>
            {activePodcast && (
              <CardContent className="space-y-3">
                <AudioPlayer
                  src={activePodcast.src}
                  title={activePodcast.title}
                  subtitle={activePodcast.discipline}
                  resumeKey={activePodcast.id}
                />
                {podcasts.length > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {podcasts.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPodcastId(p.id)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold",
                          p.id === activePodcast.id
                            ? "border-primary bg-primary text-primary-foreground"
                            : "hover:border-primary/50",
                        )}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Anotações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Anotações da sessão</CardTitle>
              <CardDescription>
                Salvas neste aparelho, só para você. Ao final, escreva 3 pontos que não pode
                esquecer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                aria-label="Anotações"
                rows={6}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Resumo com as suas palavras, dúvidas, pegadinhas da banca…"
              />
            </CardContent>
          </Card>
        </div>

        <aside className="order-1 space-y-5 lg:order-2 lg:sticky lg:top-4 lg:self-start">
          <TimerPanel
            segments={segments}
            storageKey={storageKey}
            planned={planned}
            canRegister={canRegister}
            registering={registering}
            registered={registered}
            onFinish={(s) => void register(s)}
          />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Mais recursos do assunto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-sm">
              <Link
                to="/dashboard/question-trainer"
                search={questionSearch}
                className="flex items-center gap-2 rounded-lg border p-2.5 font-medium hover:border-primary/50"
              >
                <BookOpenCheck className="h-4 w-4 text-emerald-600" /> Praticar questões deste
                assunto
              </Link>
              <Link
                to="/dashboard/flashcards"
                search={{ subject, ...(topic ? { topic } : {}) }}
                className="flex items-center gap-2 rounded-lg border p-2.5 font-medium hover:border-primary/50"
              >
                <Layers className="h-4 w-4 text-cyan-600" /> Flashcards do assunto
              </Link>
              <Link
                to="/dashboard/edital"
                className="flex items-center gap-2 rounded-lg border p-2.5 font-medium hover:border-primary/50"
              >
                <MapPin className="h-4 w-4 text-sky-600" /> Ver no edital
              </Link>
              <Link
                to="/dashboard/library"
                className="flex items-center gap-2 rounded-lg border p-2.5 font-medium hover:border-primary/50"
              >
                <Library className="h-4 w-4 text-violet-600" /> Biblioteca completa
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
