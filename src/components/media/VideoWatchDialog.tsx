import * as React from "react";
import { ArrowLeft, ChevronDown, ExternalLink, ListVideo, PlayCircle } from "lucide-react";
import { isPlaylistId } from "@/lib/arsenal";
import { youtubeEmbedUrl, youtubePlaylistUrl } from "@/data/mediaCatalog";
import { useMediaCatalog } from "@/lib/mediaStore";
import { canonicalSubject, topicIdentity } from "@/lib/subjects";
import "@/styles/video-player-window.css";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export interface WatchableVideo {
  id: string;
  title: string;
  channel?: string;
  embeddable?: false;
  /** Disciplina e assunto de origem: habilitam a lista "Outros tópicos" dentro do player. */
  subject?: string;
  topic?: string;
}

const externalUrl = (video: WatchableVideo) =>
  isPlaylistId(video.id) ? youtubePlaylistUrl(video.id) : `https://www.youtube.com/watch?v=${video.id}`;

/**
 * Player da plataforma: janela única com o vídeo e, ao lado, os outros assuntos da disciplina.
 * "Voltar" fecha a janela e devolve o aluno exatamente à área em que ele estava (sem navegar).
 */
export function VideoWatchDialog({
  video,
  onClose,
  subject,
  topic,
  backLabel = "Voltar",
}: {
  video: WatchableVideo | null;
  onClose: () => void;
  subject?: string | undefined;
  topic?: string | undefined;
  backLabel?: string;
}) {
  const { catalog } = useMediaCatalog();
  const [current, setCurrent] = React.useState<WatchableVideo | null>(video);
  const [openTopic, setOpenTopic] = React.useState<string>("");
  React.useEffect(() => setCurrent(video), [video]);

  const originSubject = current?.subject ?? subject ?? video?.subject;
  const originTopic = current?.topic ?? topic ?? video?.topic;
  const subjectKey = originSubject
    ? Object.keys(catalog.topicVideos).find((key) => canonicalSubject(key) === canonicalSubject(originSubject))
    : undefined;
  const topics = subjectKey
    ? Object.entries(catalog.topicVideos[subjectKey] ?? {}).filter(([name, list]) => name !== "*" && list.length)
    : [];
  const currentTopic = topics.find(([name]) => originTopic && topicIdentity(name) === topicIdentity(originTopic))?.[0];
  React.useEffect(() => setOpenTopic(currentTopic ?? topics[0]?.[0] ?? ""), [currentTopic, subjectKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const play = (item: { id: string; title: string; channel?: string; embeddable?: false }, name: string) =>
    setCurrent({ ...item, ...(subjectKey ? { subject: subjectKey } : {}), topic: name });
  const external = current ? externalUrl(current) : "";
  return (
    <Dialog open={!!video} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="vp" data-has-side={topics.length > 0 || undefined}>
        {current && (
          <>
            <header className="vp__bar">
              <button type="button" className="vp__back" onClick={onClose}>
                <ArrowLeft size={16} aria-hidden="true" /> {backLabel}
              </button>
              <DialogTitle className="vp__title">
                <PlayCircle size={16} aria-hidden="true" />
                <span>{current.title}</span>
              </DialogTitle>
              <DialogDescription className="sr-only">Player de videoaula da plataforma</DialogDescription>
            </header>
            <div className="vp__body">
              <div className="vp__main">
                <div className="vp__screen">
                  {current.embeddable === false ? (
                    <div className="vp__blocked">
                      <p>Este canal não permite reproduzir a aula aqui.</p>
                      <a href={external} target="_blank" rel="noopener noreferrer">
                        Assistir no YouTube <ExternalLink size={14} aria-hidden="true" />
                      </a>
                    </div>
                  ) : (
                    <iframe
                      key={current.id}
                      title={current.title}
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      src={
                        isPlaylistId(current.id)
                          ? youtubeEmbedUrl(current.id)
                          : `https://www.youtube-nocookie.com/embed/${current.id}?rel=0&enablejsapi=1`
                      }
                    />
                  )}
                </div>
                <div className="vp__meta">
                  <div>
                    {originSubject && <small>{originSubject}{originTopic ? ` · ${originTopic === "*" ? "Revisões e aulas gerais" : originTopic}` : ""}</small>}
                    {current.channel && <span>Canal: {current.channel}</span>}
                  </div>
                  <a href={external} target="_blank" rel="noopener noreferrer">
                    Abrir no YouTube <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
              {topics.length > 0 && (
                <aside className="vp__side" aria-label="Outros tópicos do edital">
                  <h3><ListVideo size={15} aria-hidden="true" /> Outros tópicos do edital</h3>
                  <ul>
                    {topics.map(([name, list]) => (
                      <li key={name} data-open={openTopic === name || undefined}>
                        <button type="button" aria-expanded={openTopic === name} onClick={() => setOpenTopic(openTopic === name ? "" : name)}>
                          <span>{name}</span>
                          <small>{list.length}</small>
                          <ChevronDown size={14} aria-hidden="true" />
                        </button>
                        {openTopic === name && (
                          <ol>
                            {list.map((item) => (
                              <li key={`${name}:${item.id}`}>
                                <button
                                  type="button"
                                  aria-current={item.id === current.id || undefined}
                                  onClick={() => play(item, name)}
                                >
                                  <PlayCircle size={13} aria-hidden="true" />
                                  <span>{item.title}</span>
                                </button>
                              </li>
                            ))}
                          </ol>
                        )}
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
