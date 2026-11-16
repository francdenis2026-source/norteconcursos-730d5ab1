import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, BrainCircuit, Flame, Info, PlayCircle, Target } from "lucide-react";
import { VideoWatchDialog, type WatchableVideo } from "@/components/media/VideoWatchDialog";
import { useMediaCatalog } from "@/lib/mediaStore";
import { relatedVideos } from "@/lib/relatedVideos";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { readSlugs, useStudyMaterialList } from "@/lib/studyMaterials";
import {
  buildTheoryIndex,
  findTheory,
  theoryTarget,
  type TheorySyllabus,
} from "@/lib/cronogramaTeoria";
import { pcAcVerticalCargos, type PcAcVerticalCargoId } from "@/data/pcAcreVerticalizado";
import { buildPcAcExamMap, type MapDiscipline } from "@/lib/pcAcExamMap";
import { pcAcDisciplineLink } from "@/lib/pcAcreVerticalLinks";
import { pcAcDiscursiveBrief } from "@/lib/pcAcreExamWeights";
import { canonicalSubject } from "@/lib/subjects";
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
  // Material exato do assunto: guia da Biblioteca ou assunto do edital eletrônico (mesmo critério do cronograma).
  const materials = useStudyMaterialList(true);
  const syllabus = useQuery({
    queryKey: ["cronograma-syllabus"],
    staleTime: 10 * 60_000,
    queryFn: async (): Promise<TheorySyllabus[]> => {
      const { data, error } = await supabase
        .from("syllabus_topics")
        .select("id,discipline,topic_text")
        .limit(1000);
      if (error) throw error;
      return (data ?? []) as TheorySyllabus[];
    },
  });
  const theoryIndex = useMemo(
    () => buildTheoryIndex(materials.data ?? [], syllabus.data ?? []),
    [materials.data, syllabus.data],
  );
  const [watching, setWatching] = useState<WatchableVideo | null>(null);
  const [cargoId, setCargoId] = useState<PcAcVerticalCargoId>(initialCargo);
  const [metric, setMetric] = useState<Metric>("questions");
  const [onlyHot, setOnlyHot] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [readVersion, setReadVersion] = useState(0);

  useEffect(() => {
    const refresh = () => setReadVersion((version) => version + 1);
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("norte:study-context", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("norte:study-context", refresh);
    };
  }, []);

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
  const materialProgress = useMemo(() => {
    const read = readSlugs();
    return new Map(
      all.map((discipline) => {
        const linkedSubjects = pcAcDisciplineLink(discipline.id)?.subjects ?? [];
        const linkedKeys = linkedSubjects.map(canonicalSubject);
        const items = (materials.data ?? []).filter((material) => linkedKeys.includes(canonicalSubject(material.discipline)));
        const completed = items.filter((material) => read.has(material.slug)).length;
        const studied = items.length ? Math.round((completed / items.length) * 100) : null;
        return [discipline.id, { studied, remaining: studied === null ? null : 100 - studied, completed, total: items.length }] as const;
      }),
    );
  }, [all, materials.data, readVersion]);
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
                    {(() => {
                      const progress = materialProgress.get(d.id);
                      return progress?.studied !== null && progress?.studied !== undefined ? (
                        <span className="pcmap__material-progress" title={`${progress.completed} de ${progress.total} materiais estudados`}>
                          <span><strong>{progress.studied}%</strong> estudado · falta {progress.remaining}%</span>
                          <i aria-hidden="true"><b style={{ width: `${progress.studied}%` }} /></i>
                        </span>
                      ) : null;
                    })()}
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
                  {(() => {
                    const back = "/dashboard/mapa-idecan";
                    const hit = findTheory(theoryIndex, active.name, t.title, 1)[0];
                    const target = theoryTarget(hit, t.title, back);
                    if (target.direct)
                      return (
                        <Link
                          to={target.to as never}
                          params={target.params as never}
                          search={target.search as never}
                          title={`Estudar: ${target.label}`}
                          aria-label={`Material didático: ${t.title}`}
                        >
                          <BookOpen aria-hidden="true" />
                        </Link>
                      );
                    return subject ? (
                      <Link
                        to="/dashboard/library"
                        search={{ collection: "subjects", discipline: subject, back }}
                        title="Abrir o material da matéria (sem guia específico deste assunto)"
                        aria-label={`Material da matéria: ${t.title}`}
                        data-generic="true"
                      >
                        <BookOpen aria-hidden="true" />
                      </Link>
                    ) : null;
                  })()}
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
