import { canonicalSubject } from "@/lib/subjects";
import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FileAudio, GraduationCap, Headphones, ListVideo, PlayCircle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AudioPlayer } from "@/components/media/AudioPlayer";
import { VideoWorkspace } from "@/components/media/VideoWorkspace";
import { useMediaCatalog } from "@/lib/mediaStore";
import { useAuthStatus } from "@/hooks/useDashboard";
import { type Podcast } from "@/data/mediaCatalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/media")({ component: MediaCenterPage, validateSearch: (s: Record<string, unknown>): { subject?: string | undefined; topic?: string | undefined } => ({ subject: typeof s["subject"] === "string" ? s["subject"] : undefined, topic: typeof s["topic"] === "string" ? s["topic"] : undefined }) });

function PodcastsTab({ canPreview }: { canPreview: boolean }) {
  const selection = Route.useSearch();
  const PODCASTS = useMediaCatalog().catalog.podcasts.filter(p => (!selection.subject || canonicalSubject(p.discipline) === canonicalSubject(selection.subject)) && (!selection.topic || `${p.title} ${p.description ?? ""}`.toLocaleLowerCase("pt-BR").includes(selection.topic.toLocaleLowerCase("pt-BR"))));
  const [pick, setSelected] = React.useState<Podcast | null>(null);
  const selected = pick ?? PODCASTS[0] ?? null;
  const [local, setLocal] = React.useState<{ url: string; name: string } | null>(null);
  const fileInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(
    () => () => {
      if (local) URL.revokeObjectURL(local.url);
    },
    [local],
  );

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
            Resumos em áudio das matérias, gerados no NotebookLM a partir do conteúdo da plataforma,
            para você aprender no trânsito, na academia ou antes de dormir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selected ? (
            <AudioPlayer
              src={selected.src}
              title={selected.title}
              subtitle={selected.discipline}
              resumeKey={selected.id}
            />
          ) : local ? (
            <AudioPlayer
              src={local.url}
              title={local.name}
              subtitle="Prévia local — só neste aparelho"
            />
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              <FileAudio className="mx-auto mb-2 h-8 w-8 opacity-50" />
              {selection.subject ? `Não há podcast disponível para ${selection.subject}${selection.topic ? ` — ${selection.topic}` : ""}. Nenhum conteúdo de outra área foi selecionado.` : "Os primeiros episódios chegam em breve."}
            </div>
          )}

          {PODCASTS.length > 0 && (
            <ul className="space-y-2">
              {PODCASTS.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-3 text-left",
                      selected?.id === p.id
                        ? "border-primary bg-primary/10"
                        : "hover:border-primary/50",
                    )}
                  >
                    <Headphones className="h-5 w-5 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{p.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {p.discipline}
                      </span>
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
              <p className="text-xs text-muted-foreground">
                Visível só para administradores. Nada é enviado: o arquivo toca localmente.
              </p>
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
    <div className="video-study-page">
      <header className="video-study-page__header workspace-banner">
        <PlayCircle size={28} aria-hidden="true" />
        <div>
          <h1>Videoaulas e podcasts</h1>
        </div>
      </header>
      <Tabs defaultValue={Route.useSearch().subject ? "podcasts" : "videos"}>
        <TabsList className="video-study-page__tabs" aria-label="Tipo de material">
          <TabsTrigger value="videos">
            <PlayCircle size={16} /> Playlists
          </TabsTrigger>
          <TabsTrigger value="assuntos">
            <ListVideo size={16} /> Assuntos do edital
          </TabsTrigger>
          <TabsTrigger value="enem">
            <GraduationCap size={16} /> ENEM
          </TabsTrigger>
          <TabsTrigger value="podcasts">
            <Headphones size={16} /> Podcasts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <VideoWorkspace mode="playlists" />
        </TabsContent>
        <TabsContent value="assuntos">
          <VideoWorkspace mode="topics" />
        </TabsContent>
        <TabsContent value="enem">
          <VideoWorkspace mode="enem" />
          <p className="mt-3 text-xs text-muted-foreground">
            Organize seu estudo na{" "}
            <Link className="underline" to="/dashboard/enem">
              área ENEM
            </Link>
            .
          </p>
        </TabsContent>
        <TabsContent value="podcasts">
          <PodcastsTab canPreview={isAdmin} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
