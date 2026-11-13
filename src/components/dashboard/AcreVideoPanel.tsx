import * as React from "react";
import { Link } from "@tanstack/react-router";
import { VideoWatchDialog, type WatchableVideo } from "@/components/media/VideoWatchDialog";
import { ExternalLink, PlayCircle, Search, Tv } from "lucide-react";
import {
  ACRE_VIDEO_GUIDE,
  acreVideoLibraryTopic,
  acreVideosFor,
  youtubeSearchUrl,
} from "@/data/acreVideoGuide";

/** Vídeos de uma área de Realidade do Acre: aulas já cadastradas, buscas prontas e fontes oficiais. */
export function AcreVideoPanel({ axisId, title = "Vídeos desta área" }: { axisId: string; title?: string }) {
  const guide = ACRE_VIDEO_GUIDE[axisId];
  const [watching, setWatching] = React.useState<WatchableVideo | null>(null);
  if (!guide) return null;
  const all = acreVideosFor(axisId);
  const videos = all.slice(0, 6);
  const topic = acreVideoLibraryTopic(axisId);
  return (
    <section className="ak-video" aria-labelledby={`acre-video-${axisId}`}>
      <header className="ak-video__head">
        <PlayCircle aria-hidden="true" size={20} />
        <div>
          <h2 id={`acre-video-${axisId}`}>{title}</h2>
          <p>Aulas cadastradas na videoteca e buscas prontas para achar vídeos novos.</p>
        </div>
        {topic && (
          <Link
            to="/dashboard/media"
            search={{ tab: "assuntos", subject: "Realidade do Acre", topic }}
            className="ak-video__cta"
          >
            Abrir na videoteca
          </Link>
        )}
      </header>
      {videos.length ? (
        <ul className="ak-video__list">
          {videos.map((video) => (
            <li key={video.id}>
              <button type="button" onClick={() => setWatching({ ...video, subject: "Realidade do Acre", topic: topic ?? "*" })}>
                <PlayCircle aria-hidden="true" size={15} />
                <span>{video.title}</span>
                {video.channel && <small>{video.channel}</small>}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="ak-video__empty">Ainda não há aulas desta área na videoteca. Use as buscas abaixo.</p>
      )}
      {all.length > videos.length && topic && (
        <p className="ak-video__more">
          Mostrando {videos.length} de {all.length} aulas. <Link to="/dashboard/media" search={{ tab: "assuntos", subject: "Realidade do Acre", topic }}>Ver todas na videoteca</Link>
        </p>
      )}
      <div className="ak-video__searches" aria-label="Buscar no YouTube">
        <span><Search aria-hidden="true" size={13} /> Buscar no YouTube</span>
        {guide.searches.map((item) => (
          <a key={item.query} href={youtubeSearchUrl(item.query)} target="_blank" rel="noopener noreferrer">
            {item.label} <ExternalLink aria-hidden="true" size={11} />
          </a>
        ))}
      </div>
      {guide.official?.map((item) => (
        <a key={item.url} className="ak-video__official" href={item.url} target="_blank" rel="noopener noreferrer">
          <Tv aria-hidden="true" size={14} /> {item.label} <ExternalLink aria-hidden="true" size={11} />
        </a>
      ))}
      <VideoWatchDialog video={watching} onClose={() => setWatching(null)} subject="Realidade do Acre" backLabel="Voltar à área" />
    </section>
  );
}
