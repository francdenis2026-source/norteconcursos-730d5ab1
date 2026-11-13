import * as React from "react";
import { Compass, History, Lightbulb, MapPin, Waves } from "lucide-react";
import { ACRE_ERAS, ACRE_GEOGRAPHY_TRANSECT, ACRE_HISTORY_TIMELINE, type AcreEra } from "@/data/acreTimeline";

type Track = "history" | "geography";

/** Linha histórica (por época) e viagem geográfica (oeste → leste) com dica de prova em cada ponto. */
export function AcreTimeline({ initial = "history" }: { initial?: Track }) {
  const [track, setTrack] = React.useState<Track>(initial);
  const [era, setEra] = React.useState<AcreEra | "all">("all");
  const events = ACRE_HISTORY_TIMELINE.filter((event) => era === "all" || event.era === era);
  return (
    <section className="acre-tl" aria-labelledby="acre-tl-title">
      <header className="acre-tl__head">
        <Compass aria-hidden="true" size={20} />
        <div>
          <h2 id="acre-tl-title">{track === "history" ? "Linha do tempo do Acre" : "Viagem pelo território, de oeste a leste"}</h2>
          <p>
            {track === "history"
              ? "Dos conflitos pela borracha ao Estado de hoje, com a dica de prova de cada marco."
              : "Cinco paradas ligam regional, rio e história, para memorizar a geografia do Estado."}
          </p>
        </div>
      </header>

      <div className="acre-tl__tabs" role="group" aria-label="Tipo de linha">
        <button type="button" aria-pressed={track === "history"} onClick={() => setTrack("history")}>
          <History size={15} aria-hidden="true" /> Histórica
        </button>
        <button type="button" aria-pressed={track === "geography"} onClick={() => setTrack("geography")}>
          <MapPin size={15} aria-hidden="true" /> Geográfica
        </button>
      </div>

      {track === "history" ? (
        <>
          <div className="acre-tl__eras" role="group" aria-label="Filtrar por época">
            <button type="button" aria-pressed={era === "all"} onClick={() => setEra("all")}>Todas</button>
            {(Object.keys(ACRE_ERAS) as AcreEra[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={era === key}
                style={{ "--tl": ACRE_ERAS[key].color } as React.CSSProperties}
                onClick={() => setEra(key)}
              >
                <i aria-hidden="true" /> {ACRE_ERAS[key].label} <small>{ACRE_ERAS[key].range}</small>
              </button>
            ))}
          </div>
          <ol className="acre-tl__list">
            {events.map((event) => (
              <li key={`${event.when}-${event.title}`} style={{ "--tl": ACRE_ERAS[event.era].color } as React.CSSProperties}>
                <time>{event.when}</time>
                <article>
                  <h3>{event.title}</h3>
                  <p>{event.text}</p>
                  <p className="acre-tl__tip"><Lightbulb size={13} aria-hidden="true" /> {event.tip}</p>
                </article>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <ol className="acre-tl__list acre-tl__list--geo">
          {ACRE_GEOGRAPHY_TRANSECT.map((stop, index) => (
            <li key={stop.place} style={{ "--tl": ["#39A6D8", "#9B83E8", "#E6A64A", "#70C58A", "#D8799D"][index % 5] } as React.CSSProperties}>
              <time>{index + 1}</time>
              <article>
                <h3>{stop.place}</h3>
                <p className="acre-tl__where"><MapPin size={12} aria-hidden="true" /> {stop.region} <Waves size={12} aria-hidden="true" /> {stop.rivers}</p>
                <p>{stop.text}</p>
                <p className="acre-tl__tip"><Lightbulb size={13} aria-hidden="true" /> {stop.tip}</p>
              </article>
            </li>
          ))}
        </ol>
      )}
      <p className="acre-tl__note">Linha de apoio ao estudo: confira datas e números nas fontes oficiais e no edital.</p>
    </section>
  );
}
