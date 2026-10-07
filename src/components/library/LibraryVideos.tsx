import { useState } from "react";
import { ExternalLink, PlayCircle } from "lucide-react";
import { youtubeEmbedUrl } from "@/data/mediaCatalog";
import { isPlaylistId } from "@/lib/arsenal";
import type { RelatedVideo } from "@/lib/relatedVideos";
import { cn } from "@/lib/utils";

/** Player embutido para as vídeo-aulas correlatas de um material da Biblioteca. */
export function LibraryVideos({ videos }: { videos: RelatedVideo[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const video = videos.find((v) => v.id === playingId) ?? videos[0];
  if (!video) return null;

  return (
    <section className="surface-card library-videos no-print" aria-label="Vídeo-aulas relacionadas">
      <h2>Vídeo-aulas relacionadas</h2>
      <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-2">
          <div className="overflow-hidden rounded-2xl border bg-black shadow-lg">
            <div className="aspect-video w-full">
              <iframe
                key={video.id}
                title={video.title}
                className="h-full w-full"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                src={
                  isPlaylistId(video.id)
                    ? youtubeEmbedUrl(video.id)
                    : `https://www.youtube-nocookie.com/embed/${video.id}?rel=0`
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <div>
              <p className="font-semibold">{video.title}</p>
              {video.channel && (
                <p className="text-xs text-muted-foreground">Canal: {video.channel}</p>
              )}
            </div>
            <a
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              target="_blank"
              rel="noreferrer"
              href={
                isPlaylistId(video.id)
                  ? `https://www.youtube.com/playlist?list=${video.id}`
                  : `https://www.youtube.com/watch?v=${video.id}`
              }
            >
              Abrir no YouTube <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        {videos.length > 1 && (
          <ul className="max-h-[320px] space-y-1.5 overflow-y-auto pr-1">
            {videos.map((v) => (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => setPlayingId(v.id)}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-xl border p-2.5 text-left text-sm transition-colors hover:bg-muted/60",
                    v.id === video.id && "border-amber-400/60 bg-amber-400/10",
                  )}
                >
                  <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 !text-rose-500" />
                  <span className="min-w-0">
                    <span className="block font-medium leading-snug">{v.title}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {v.topic === "*" ? v.subject : v.topic}
                      {v.channel ? ` · ${v.channel}` : ""}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Conteúdo gratuito e público do YouTube, de canais que não pertencem à Norte Concurso. Se o
        vídeo não carregar aqui, use "Abrir no YouTube".
      </p>
    </section>
  );
}
