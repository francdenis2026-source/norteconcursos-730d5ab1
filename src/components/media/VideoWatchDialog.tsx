import { ExternalLink, PlayCircle } from "lucide-react";
import { isPlaylistId } from "@/lib/arsenal";
import { youtubeEmbedUrl, youtubePlaylistUrl } from "@/data/mediaCatalog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface WatchableVideo {
  id: string;
  title: string;
  channel?: string;
  embeddable?: false;
}

/**
 * Modal de vídeo-aula: mantém o aluno na página (ex.: o edital verticalizado) em vez de abrir o
 * YouTube numa aba nova. Fechar o modal volta direto para onde ele estava, sem navegação.
 */
export function VideoWatchDialog({
  video,
  onClose,
}: {
  video: WatchableVideo | null;
  onClose: () => void;
}) {
  const external = video
    ? isPlaylistId(video.id)
      ? youtubePlaylistUrl(video.id)
      : `https://www.youtube.com/watch?v=${video.id}`
    : "";
  return (
    <Dialog open={!!video} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl gap-3 p-4 sm:p-5">
        {video && (
          <>
            <DialogHeader className="gap-1 text-left">
              <DialogTitle className="flex items-center gap-2 text-base">
                <PlayCircle className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="truncate">{video.title}</span>
              </DialogTitle>
              {video.channel && (
                <p className="text-xs text-muted-foreground">Canal: {video.channel}</p>
              )}
            </DialogHeader>
            <div className="overflow-hidden rounded-xl border bg-black shadow-lg">
              <div className="aspect-video w-full">
                {video.embeddable === false ? (
                  <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-white">
                    <p>Este canal não permite reproduzir a aula aqui.</p>
                    <a
                      href={external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    >
                      Assistir no YouTube <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ) : (
                  <iframe
                    key={video.id}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    src={
                      isPlaylistId(video.id)
                        ? youtubeEmbedUrl(video.id)
                        : `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&enablejsapi=1`
                    }
                  />
                )}
              </div>
            </div>
            <a
              href={external}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 self-start text-xs font-semibold text-primary hover:underline"
            >
              Abrir no YouTube <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
