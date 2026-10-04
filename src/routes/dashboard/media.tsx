import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FileAudio, Headphones, Info, ListVideo, PlayCircle, Search, Upload } from "lucide-react";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero } from "@/components/dashboard/PageHero";
import { AudioPlayer } from "@/components/media/AudioPlayer";
import { useMediaCatalog } from "@/lib/mediaStore";
import { isPlaylistId } from "@/lib/arsenal";
import { useAuthStatus } from "@/hooks/useDashboard";
import {
  DISCIPLINES,
  youtubeEmbedUrl,
  youtubePlaylistUrl,
  youtubeSearchUrl,
  type Podcast,
} from "@/data/mediaCatalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/media")({ component: MediaCenterPage });

function VideoStage({ playlistId, title }: { playlistId: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-lg">
      <div className="aspect-video w-full">
        <iframe
          key={playlistId}
          src={youtubeEmbedUrl(playlistId)}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-card px-4 py-3">
        <p className="min-w-0 truncate text-sm font-semibold">{title}</p>
        <a
          href={youtubePlaylistUrl(playlistId)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Abrir no YouTube <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function VideosTab() {
  const [discipline, setDiscipline] = React.useState<string>(DISCIPLINES[0]);
  const { catalog } = useMediaCatalog();
  const list = catalog.playlists.filter((p) => p.discipline === discipline);
  const [selected, setSelected] = React.useState<string | null>(null);
  const current = list.find((p) => p.id === selected) ?? list[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Disciplinas">
        {DISCIPLINES.map((d) => (
          <button
            key={d}
            type="button"
            role="tab"
            aria-selected={discipline === d}
            onClick={() => {
              setDiscipline(d);
              setSelected(null);
            }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all hover:-translate-y-px hover:shadow-sm",
              discipline === d ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50",
            )}
          >
            <SubjectIcon subject={d} /> {d}
          </button>
        ))}
      </div>

      {current ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <VideoStage playlistId={current.id} title={current.title} />
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Playlists gratuitas · {discipline}</p>
            {list.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                  p.id === current.id ? "border-primary bg-primary/10" : "hover:border-primary/50",
                )}
              >
                <PlayCircle className={cn("mt-0.5 h-5 w-5 shrink-0", p.id === current.id ? "text-primary" : "text-muted-foreground")} />
                <span className="text-sm font-medium leading-snug">{p.title}</span>
              </button>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full">
              <a href={youtubeSearchUrl(discipline)} target="_blank" rel="noopener noreferrer">
                <Search className="h-4 w-4" /> Buscar mais aulas grátis no YouTube
              </a>
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Nenhuma playlist cadastrada para esta disciplina ainda.</p>
      )}

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Somente conteúdo gratuito e público do YouTube, tocado pelo player oficial. Os vídeos pertencem aos canais de origem; a Norte
        Concurso apenas indica. Se um vídeo não carregar aqui, use "Abrir no YouTube".
      </p>
    </div>
  );
}

type TopicMap = Record<string, Record<string, import("@/data/topicVideos").TopicVideo[]>>;
const countVideos = (map: TopicMap, subject: string) => Object.values(map[subject] ?? {}).reduce((n, list) => n + list.length, 0);

/** Biblioteca de videoaulas organizada por matéria e assunto (PF, PRF e Polícia Civil). */
function TopicsTab() {
  const { catalog } = useMediaCatalog();
  const TOPIC_VIDEOS = catalog.topicVideos;
  const SUBJECT_KEYS = Object.keys(TOPIC_VIDEOS);
  const [pick, setSubject] = React.useState("");
  const subject = pick || SUBJECT_KEYS[0] || "";
  const [video, setVideo] = React.useState<{ id: string; title: string } | null>(null);
  const topics = Object.entries(TOPIC_VIDEOS[subject] ?? {}).filter(([t]) => t !== "*");
  const general = TOPIC_VIDEOS[subject]?.["*"] ?? [];
  const total = SUBJECT_KEYS.reduce((n, s) => n + countVideos(TOPIC_VIDEOS, s), 0);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {total} videoaulas gratuitas organizadas por matéria e assunto, selecionadas para os editais de <strong>PF, PRF e Polícia Civil</strong>.
      </p>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Matérias">
        {SUBJECT_KEYS.map((s) => (
          <button key={s} type="button" role="tab" aria-selected={subject === s} onClick={() => { setSubject(s); setVideo(null); }}
            className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all hover:-translate-y-px hover:shadow-sm", subject === s ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50")}>
            <SubjectIcon subject={s} /> {s} <span className="opacity-70">· {countVideos(TOPIC_VIDEOS, s)}</span>
          </button>
        ))}
      </div>

      {video && (
        <div className="overflow-hidden rounded-2xl border bg-black shadow-lg">
          <div className="aspect-video w-full">
            <iframe key={video.id} src={isPlaylistId(video.id) ? youtubeEmbedUrl(video.id) : `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&autoplay=1`} title={video.title} className="h-full w-full"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-card px-4 py-3">
            <p className="min-w-0 truncate text-sm font-semibold">{video.title}</p>
            <a href={isPlaylistId(video.id) ? youtubePlaylistUrl(video.id) : `https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              Abrir no YouTube <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {topics.map(([topic, list]) => (
          <Card key={topic}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{topic}</CardTitle>
              <CardDescription className="text-xs">{list.length} {list.length === 1 ? "vídeo" : "vídeos"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {list.map((v) => (
                <button key={v.id} type="button" onClick={() => { setVideo(v); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={cn("flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-xs hover:bg-muted", video?.id === v.id && "bg-primary/10 font-semibold")}>
                  <PlayCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="flex-1">{v.title}</span>
                  {isPlaylistId(v.id) && <Badge variant="secondary" className="shrink-0 text-[0.6rem]">Curso</Badge>}
                </button>
              ))}
            </CardContent>
          </Card>
        ))}
        {general.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Gerais da matéria · questões e revisões</CardTitle></CardHeader>
            <CardContent className="grid gap-1 md:grid-cols-2">
              {general.map((v) => (
                <button key={v.id} type="button" onClick={() => { setVideo(v); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-left text-xs hover:bg-muted">
                  <PlayCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="flex-1">{v.title}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Vídeos gratuitos e públicos do YouTube, de canais que não pertencem à Norte Concurso. Se algum não carregar aqui, use "Abrir no YouTube".
      </p>
    </div>
  );
}

function PodcastsTab({ canPreview }: { canPreview: boolean }) {
  const PODCASTS = useMediaCatalog().catalog.podcasts;
  const [pick, setSelected] = React.useState<Podcast | null>(null);
  const selected = pick ?? PODCASTS[0] ?? null;
  const [local, setLocal] = React.useState<{ url: string; name: string } | null>(null);
  const fileInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => () => { if (local) URL.revokeObjectURL(local.url); }, [local]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Headphones className="h-5 w-5 text-primary" />
            <CardTitle>Podcasts de estudo</CardTitle>
            <Badge variant="secondary">Em breve</Badge>
          </div>
          <CardDescription>
            Resumos em áudio das matérias, gerados no NotebookLM a partir do conteúdo da plataforma, para você aprender no trânsito, na
            academia ou antes de dormir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selected ? (
            <AudioPlayer src={selected.src} title={selected.title} subtitle={selected.discipline} resumeKey={selected.id} />
          ) : local ? (
            <AudioPlayer src={local.url} title={local.name} subtitle="Prévia local — só neste aparelho" />
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              <FileAudio className="mx-auto mb-2 h-8 w-8 opacity-50" />
              Os primeiros episódios chegam em breve.
            </div>
          )}

          {PODCASTS.length > 0 && (
            <ul className="space-y-2">
              {PODCASTS.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className={cn("flex w-full items-center gap-3 rounded-xl border p-3 text-left", selected?.id === p.id ? "border-primary bg-primary/10" : "hover:border-primary/50")}
                  >
                    <Headphones className="h-5 w-5 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{p.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">{p.discipline}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {canPreview && (
            <div className="flex flex-wrap items-center gap-3 border-t pt-4">
              <input
                ref={fileInput}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setSelected(null);
                  setLocal({ url: URL.createObjectURL(f), name: f.name.replace(/\.[^.]+$/, "") });
                }}
              />
              <Button variant="outline" size="sm" onClick={() => fileInput.current?.click()}>
                <Upload className="h-4 w-4" /> Testar o player com um áudio do computador
              </Button>
              <p className="text-xs text-muted-foreground">Visível só para administradores. Nada é enviado: o arquivo toca localmente.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function MediaCenterPage() {
  const { isAdmin } = useAuthStatus();
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHero
        image="study-desk"
        size="sm"
        kicker="Conteúdo"
        icon={PlayCircle}
        title={<>Central de <em>mídia</em></>}
        description="Videoaulas gratuitas por disciplina e podcasts de estudo para aprender em áudio."
      />
      <Tabs defaultValue="videos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="videos" className="gap-1.5"><PlayCircle className="h-4 w-4 !text-rose-500" /> Videoaulas gratuitas</TabsTrigger>
          <TabsTrigger value="assuntos" className="gap-1.5"><ListVideo className="h-4 w-4 !text-violet-500" /> Por assunto</TabsTrigger>
          <TabsTrigger value="podcasts" className="gap-1.5"><Headphones className="h-4 w-4 !text-emerald-500" /> Podcasts</TabsTrigger>
        </TabsList>
        <TabsContent value="videos"><VideosTab /></TabsContent>
        <TabsContent value="assuntos"><TopicsTab /></TabsContent>
        <TabsContent value="podcasts"><PodcastsTab canPreview={isAdmin} /></TabsContent>
      </Tabs>
    </div>
  );
}
