import { Link } from "@tanstack/react-router";
import { ExternalLink, PlayCircle, Search, Tv } from "lucide-react";
import {
  ACRE_VIDEO_GUIDE,
  acreVideoLibraryTopic,
  acreVideosFor,
  youtubeSearchUrl,
  youtubeWatchUrl,
} from "@/data/acreVideoGuide";

/** Vídeos de uma área de Realidade do Acre: aulas já cadastradas, buscas prontas e fontes oficiais. */
export function AcreVideoPanel({ axisId, title = "Vídeos desta área" }: { axisId: string; title?: string }) {
  const guide = ACRE_VIDEO_GUIDE[axisId];
  if (!guide) return null;
  const videos = acreVideosFor(axisId);
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
              <a href={youtubeWatchUrl(video.id)} target="_blank" rel="noopener noreferrer">
                <PlayCircle aria-hidden="true" size={15} />
                <span>{video.title}</span>
                {video.channel && <small>{video.channel}</small>}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="ak-video__empty">Ainda não há aulas desta área na videoteca. Use as buscas abaixo.</p>
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
    </section>
  );
}
