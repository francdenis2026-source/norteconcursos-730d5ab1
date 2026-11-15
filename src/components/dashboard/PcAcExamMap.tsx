import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, BrainCircuit, Flame, Info, PlayCircle, Target } from "lucide-react";
import { VideoWatchDialog, type WatchableVideo } from "@/components/media/VideoWatchDialog";
import { useMediaCatalog } from "@/lib/mediaStore";
import { relatedVideos } from "@/lib/relatedVideos";
import { pcAcVerticalCargos, type PcAcVerticalCargoId } from "@/data/pcAcreVerticalizado";
import { buildPcAcExamMap, type MapDiscipline } from "@/lib/pcAcExamMap";
import { pcAcDisciplineLink } from "@/lib/pcAcreVerticalLinks";
import { pcAcDiscursiveBrief } from "@/lib/pcAcreExamWeights";
import "@/styles/pcac-exam-map.css";

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(".", ","));
type Metric = "questions" | "points";

/** Mapa interativo da prova IDECAN da PC-AC 2026: quantas questões e quais assuntos por bloco. */
export function PcAcExamMap({
  initialCargo = "investigador",
  hideTitle = false,
}: {
  initialCargo?: PcAcVerticalCargoId;
  hideTitle?: boolean;
}) {
  const { catalog } = useMediaCatalog();
  const [watching, setWatching] = useState<WatchableVideo | null>(null);
  const [cargoId, setCargoId] = useState<PcAcVerticalCargoId>(initialCargo);
  const [metric, setMetric] = useState<Metric>("questions");
  const [onlyHot, setOnlyHot] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const cargo = pcAcVerticalCargos.find((c) => c.id === cargoId) ?? pcAcVerticalCargos[0]!;
  const blocks = useMemo(() => buildPcAcExamMap(cargo), [cargo]);
  const all = blocks.flatMap((b) => b.disciplines);
  const totalQ = Math.round(all.reduce((s, d) => s + d.questions, 0));
  const totalP = all.reduce((s, d) => s + d.points, 0);
  const active: MapDiscipline | undefined =
    all.find((d) => d.id === selected) ?? [...all].sort((a, b) => b.points - a.points)[0];
  const hasEstimate = all.some((d) => d.estimated);
  const value = (n: { questions: number; points: number }) =>
    metric === "questions" ? n.questions : n.points;

  const topics = active ? (onlyHot ? active.topics.filter((t) => t.hot) : active.topics) : [];
  const subjects = active ? (pcAcDisciplineLink(active.id)?.subjects ?? []) : [];
  const subject = subjects[0];
  // Vídeo exatamente do assunto; sem ele, a videoteca geral da matéria (nunca de outra matéria).
  const videoFor = (title: string) => {
    for (const sub of subjects) {
      const found = relatedVideos(catalog, sub, title, 3);
      const exact = found.find((v) => v.topic !== "*");
      if (exact) return { video: exact, exact: true };
      if (found[0]) return { video: found[0], exact: false };
    }
    return null;
  };

  return (
    <section className="pcmap" aria-labelledby="pcmap-title">
      <header className="pcmap__head">
        <div>
          {hideTitle ? (
            <h2 id="pcmap-title" className="sr-only">
              Mapa da prova IDECAN · PC-AC 2026
            </h2>
          ) : (
            <h2 id="pcmap-title" className="pcmap__title">
              <Target aria-hidden="true" /> Mapa da prova IDECAN · PC-AC 2026
            </h2>
          )}
          <p className="pcmap__sub">
            Edital nº 001 SEAD/PCAC · {totalQ} questões · {fmt(totalP)} pontos ·{" "}
            {pcAcDiscursiveBrief(cargo)}
          </p>
        </div>
        <div className="pcmap__tools">
          <div role="group" aria-label="Medir por" className="pcmap__seg">
            {(["questions", "points"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={metric === m}
                onClick={() => setMetric(m)}
              >
                {m === "questions" ? "Questões" : "Pontos"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div role="tablist" aria-label="Cargo" className="pcmap__cargos">
        {pcAcVerticalCargos.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === cargoId}
            onClick={() => {
              setCargoId(c.id);
              setSelected(null);
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="pcmap__blocks">
        {blocks.map((b, bi) => (
          <div
            key={b.title}
            className="pcmap__block"
            data-tone={bi % 4}
            style={{ flexGrow: value(b) }}
          >
            <div className="pcmap__block-head">
              <strong>{b.title}</strong>
              <span>
                {b.questions} questões · {fmt(b.points)} pts
              </span>
            </div>
            <ul className="pcmap__tiles">
              {b.disciplines.map((d) => (
                <li key={d.id} style={{ flexGrow: Math.max(value(d), 0.6) }}>
                  <button
                    type="button"
                    className="pcmap__tile"
                    data-level={d.level}
                    aria-pressed={active?.id === d.id}
                    onClick={() => setSelected(d.id)}
                  >
                    <span className="pcmap__tile-name">{d.name}</span>
                    <span className="pcmap__tile-num">
                      {fmt(value(d))}
                      <small>
                        {metric === "questions" ? (d.estimated ? "q (est.)" : "q") : "pts"}
                      </small>
                    </span>
                    <span className="pcmap__bar" aria-hidden="true">
                      <i style={{ width: `${Math.round(d.share * 100)}%` }} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {active && (
        <article className="pcmap__detail" aria-live="polite">
          <div className="pcmap__detail-head">
            <div>
              <h3>{active.name}</h3>
              <p>
                {fmt(active.questions)} questões × peso {active.weight} ={" "}
                <strong>{fmt(active.points)} pontos</strong> · {Math.round(active.share * 100)}% da
                prova objetiva
              </p>
            </div>
            <span className="pcmap__level" data-level={active.level}>
              <Flame aria-hidden="true" /> Chance {active.level.toLowerCase()}
            </span>
          </div>
          <label className="pcmap__check">
            <input
              type="checkbox"
              checked={onlyHot}
              onChange={(e) => setOnlyHot(e.target.checked)}
            />{" "}
            Só assuntos mais prováveis
          </label>
          <ul className="pcmap__topics">
            {topics.map((t, i) => (
              <li key={`${t.title}-${i}`} data-hot={t.hot}>
                <span className="pcmap__topic-text">
                  {t.title}
                  {t.hot && <em>provável</em>}
                </span>
                <span className="pcmap__topic-actions">
                  {subject && (
                    <Link
                      to="/dashboard/library"
                      search={{
                        collection: "subjects",
                        discipline: subject,
                        q: t.title.slice(0, 80),
                      }}
                      title="Abrir o material didático deste assunto"
                      aria-label={`Material didático: ${t.title}`}
                    >
                      <BookOpen aria-hidden="true" />
                    </Link>
                  )}
                  {(() => {
                    const hit = videoFor(t.title);
                    return hit ? (
                      <button
                        type="button"
                        data-exact={hit.exact}
                        title={
                          hit.exact
                            ? "Assistir videoaula deste assunto"
                            : "Assistir videoaula da matéria"
                        }
                        aria-label={`Videoaula: ${t.title}`}
                        onClick={() => setWatching(hit.video)}
                      >
                        <PlayCircle aria-hidden="true" />
                      </button>
                    ) : (
                      <span
                        className="pcmap__none"
                        title="Ainda não há videoaula cadastrada"
                        aria-label="Sem videoaula cadastrada"
                      >
                        <PlayCircle aria-hidden="true" />
                      </span>
                    );
                  })()}
                  {subject && (
                    <Link
                      to="/dashboard/question-trainer"
                      search={{ subject }}
                      title="Treinar questões da matéria"
                      aria-label={`Questões de ${active.name}`}
                    >
                      <BrainCircuit aria-hidden="true" />
                    </Link>
                  )}
                </span>
              </li>
            ))}
            {topics.length === 0 && (
              <li className="pcmap__empty">Nenhum assunto marcado nesta disciplina.</li>
            )}
          </ul>
          <div className="pcmap__actions">
            {subject && (
              <Link to="/dashboard/question-trainer" search={{ subject }}>
                Treinar {active.name} <ArrowRight aria-hidden="true" />
              </Link>
            )}
            <Link to="/dashboard/inteligencia-idecan">
              Estatísticas da IDECAN <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </article>
      )}

      <VideoWatchDialog video={watching} onClose={() => setWatching(null)} />
      <p className="pcmap__note">
        <Info aria-hidden="true" />
        <span>
          Questões e pesos: Anexo II do edital.
          {hasEstimate &&
            " “est.” = total do bloco específico dividido entre as disciplinas, pois o edital não abre por disciplina."}{" "}
          “Provável” é uma estimativa da plataforma com base no padrão da IDECAN em provas
          policiais; não é garantia.
        </span>
      </p>
    </section>
  );
}
