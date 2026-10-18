import * as React from "react";
import { ExternalLink, PlayCircle } from "lucide-react";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { ENEM_VIDEO_SUBJECTS } from "@/data/enem";
import { youtubeEmbedUrl } from "@/data/mediaCatalog";
import { isPlaylistId } from "@/lib/arsenal";
import { useMediaCatalog } from "@/lib/mediaStore";
import { cn } from "@/lib/utils";
import { enemVideoSelection } from "@/lib/enemScope";

/** Videoaulas gratuitas de ENEM por matéria e assunto (catálogo da Central de mídia). */
export function EnemVideos({
  subject,
  onSubject,
  topic,
  onTopic,
}: {
  subject: string;
  onSubject: (s: string) => void;
  topic?: string;
  onTopic?: (t: string) => void;
}) {
  const { catalog } = useMediaCatalog();
  const [localTopic, setLocalTopic] = React.useState("all");
  const t = topic ?? localTopic;
  const setT = onTopic ?? setLocalTopic;
  const [playing, setPlaying] = React.useState<string | null>(null);

  const subjects = ENEM_VIDEO_SUBJECTS;
  const {
    current: cur,
    topics,
    videos: list,
  } = enemVideoSelection(catalog.topicVideos, subject, t);
  const video = list.find((x) => x.id === playing) ?? list[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Matérias do ENEM">
        {subjects.map((s) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={cur?.name === s.name}
            onClick={() => {
              onSubject(s.name);
              setT("all");
              setPlaying(null);
            }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-[border-color,transform,box-shadow] hover:-translate-y-px hover:shadow-sm",
              cur?.name === s.name
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:border-primary/50",
            )}
          >
            <SubjectIcon
              subject={
                s.name === "Redação" || s.name === "Como estudar" ? "Língua Portuguesa" : s.name
              }
            />{" "}
            {s.name}
          </button>
        ))}
      </div>

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Assuntos">
          {["all", ...topics].map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={t === k}
              onClick={() => {
                setT(k);
                setPlaying(null);
              }}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                t === k
                  ? "bg-amber-400 text-slate-900"
                  : "bg-muted text-muted-foreground hover:bg-muted/70",
              )}
            >
              {k === "all" ? "Todos os assuntos" : k}
            </button>
          ))}
        </div>
      )}

      {video ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <div className="space-y-2">
            <div className="overflow-hidden rounded-2xl border bg-black shadow-lg">
              <div className="aspect-video w-full">
                {video.embeddable === false ? (
                  <p className="p-6 text-sm text-white">
                    Esta aula está disponível pelo botão “Abrir no YouTube”.
                  </p>
                ) : (
                  <iframe
                    key={`${subject}:${t}:${video.id}`}
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
                )}
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
          <ul className="max-h-[460px] space-y-1.5 overflow-y-auto pr-1">
            {list.map((x) => (
              <li key={x.id}>
                <button
                  type="button"
                  onClick={() => setPlaying(x.id)}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-xl border p-2.5 text-left text-sm transition-colors hover:bg-muted/60",
                    x.id === video.id && "border-amber-400/60 bg-amber-400/10",
                  )}
                >
                  <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 !text-rose-500" />
                  <span className="min-w-0">
                    <span className="block font-medium leading-snug">{x.title}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {x.channel}
                      {isPlaylistId(x.id) ? " · playlist" : ""}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Nenhuma videoaula cadastrada para {subject}
          {t === "all" ? "" : ` — ${t}`} ainda.
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Conteúdo gratuito e público do YouTube, de canais que não pertencem à Norte Concurso. Se
        algum vídeo não carregar aqui, use “Abrir no YouTube”.
      </p>
    </div>
  );
}
