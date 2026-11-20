import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, BrainCircuit, Flame, Info, PlayCircle } from "lucide-react";
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
import "@/styles/pcac-exam-map-pro.css";
import { examDaysLeft } from "@/lib/examClock";
import { PCAC_EXAM_DATE } from "@/lib/pcAcreStudyPlan";

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
        const disciplineKey = canonicalSubject(discipline.name);
        const items = (materials.data ?? []).filter((material) => {
          const materialKey = canonicalSubject(material.discipline);
          return linkedKeys.includes(materialKey) || materialKey === disciplineKey;
        });
        const completed = items.filter((material) => read.has(material.slug)).length;
        const studied = items.length ? Math.round((completed / items.length) * 100) : 0;
        return [discipline.id, { studied, remaining: 100 - studied, completed, total: items.length }] as const;
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

  const levelLabel = active ? active.level : "";
  const topicActions = (t: { title: string }) => {
    const back = "/dashboard/mapa-idecan";
    const hit = active ? findTheory(theoryIndex, active.name, t.title, 1)[0] : undefined;
    const target = theoryTarget(hit, t.title, back);
    const vid = videoFor(t.title);
    return (
      <span className="px-acts">
        {target.direct ? (
          <Link to={target.to as never} params={target.params as never} search={target.search as never} title={`Estudar: ${target.label}`} aria-label={`Material didático: ${t.title}`} data-k="book"><BookOpen aria-hidden="true" /></Link>
        ) : subject ? (
          <Link to="/dashboard/library" search={{ collection: "subjects", discipline: subject, back }} title="Abrir o material da matéria" aria-label={`Material da matéria: ${t.title}`} data-k="book" data-generic="true"><BookOpen aria-hidden="true" /></Link>
        ) : null}
        {vid ? (
          <button type="button" data-k="play" title={vid.exact ? "Assistir videoaula deste assunto" : "Assistir videoaula da matéria"} aria-label={`Videoaula: ${t.title}`} onClick={() => setWatching(vid.video)}><PlayCircle aria-hidden="true" /></button>
        ) : (
          <span className="px-acts__none" title="Ainda não há videoaula cadastrada" aria-label="Sem videoaula cadastrada"><PlayCircle aria-hidden="true" /></span>
        )}
        {subject && (
          <Link to="/dashboard/question-trainer" search={{ subject }} title="Treinar questões da matéria" aria-label={`Questões de ${active?.name}`} data-k="brain"><BrainCircuit aria-hidden="true" /></Link>
        )}
      </span>
    );
  };

  return (
    <section className="px-root" aria-labelledby="pcmap-title">
      <h2 id="pcmap-title" className="sr-only">Mapa da prova IDECAN · PC-AC 2026</h2>
      <header className="px-bar">
        <div role="tablist" aria-label="Cargo" className="px-cargos">
          {pcAcVerticalCargos.map((c) => (
            <button key={c.id} type="button" role="tab" aria-selected={c.id === cargoId} onClick={() => { setCargoId(c.id); setSelected(null); }}>{c.label}</button>
          ))}
        </div>
        <div className="px-sum" title={pcAcDiscursiveBrief(cargo)}>
          <span><b><CountNum value={totalQ} /></b> questões</span>
          <span><b><CountNum value={totalP} /></b> pontos</span>
          <span className="px-sum__d"><b>{examDaysLeft(PCAC_EXAM_DATE) ?? 0}</b> dias p/ a prova</span>
        </div>
        <div role="group" aria-label="Medir por" className="px-seg">
          {(["questions", "points"] as const).map((m) => (
            <button key={m} type="button" aria-pressed={metric === m} onClick={() => setMetric(m)}>{m === "questions" ? "Questões" : "Pontos"}</button>
          ))}
        </div>
      </header>

      <div className="px-main">
        <div className="px-map" key={cargoId}>
          {blocks.map((b, bi) => (
            <section key={b.title} className="px-block" data-tone={bi % 4} style={{ flexGrow: Math.max(value(b), 1) }}>
              <header>
                <strong>{b.title}</strong>
                <span><b>{b.questions}</b> q · {fmt(b.points)} pts</span>
              </header>
              <ul>
                {b.disciplines.map((d, di) => {
                  const progress = materialProgress.get(d.id);
                  return (
                    <li key={d.id} style={{ flexGrow: Math.max(value(d), 0.6), animationDelay: `${(bi * 4 + di) * 40}ms` }}>
                      <button type="button" className="px-tile" data-level={d.level} aria-pressed={active?.id === d.id} onClick={() => setSelected(d.id)}>
                        <span className="px-tile__name">{d.name}</span>
                        <span className="px-tile__num"><CountNum value={value(d)} />{d.estimated && metric === "questions" && <abbr title="Estimado: o edital informa só o total do bloco">~</abbr>}<small>{metric === "questions" ? "q" : "pts"}</small></span>
                        <span className="px-tile__bar" aria-hidden="true"><i style={{ width: `${Math.round(d.share * 100)}%` }} /></span>
                        <span className="px-tile__prog" title={progress?.total ? `${progress.completed} de ${progress.total} materiais estudados` : "Nenhum material vinculado"}>
                          <i style={{ width: `${progress?.studied ?? 0}%` }} /><em>{progress?.studied ?? 0}% estudado</em>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        {active && (
          <article className="px-detail" aria-live="polite" key={active.id}>
            <header className="px-detail__h">
              <ShareRing share={active.share} />
              <div>
                <h3>{active.name}</h3>
                <p>{fmt(active.questions)} q × peso {active.weight} = <b>{fmt(active.points)} pts</b></p>
              </div>
              <span className="px-chance" data-level={active.level}><Flame aria-hidden="true" /> {levelLabel}</span>
            </header>
            <div className="px-detail__tools">
              <button type="button" aria-pressed={onlyHot} onClick={() => setOnlyHot((v) => !v)}><Flame aria-hidden="true" /> Só prováveis</button>
              <span>{topics.length} assuntos</span>
            </div>
            <ul className="px-topics">
              {topics.map((t, i) => (
                <li key={`${t.title}-${i}`} data-hot={t.hot} style={{ animationDelay: `${Math.min(i, 14) * 30}ms` }}>
                  <span>{t.title}{t.hot && <em>provável</em>}</span>
                  {topicActions(t)}
                </li>
              ))}
              {topics.length === 0 && <li className="px-topics__empty">Nenhum assunto marcado nesta disciplina.</li>}
            </ul>
            <footer className="px-detail__f">
              {subject && <Link to="/dashboard/question-trainer" search={{ subject }}>Treinar <ArrowRight aria-hidden="true" /></Link>}
              <Link to="/dashboard/inteligencia-idecan">Estatísticas IDECAN <ArrowRight aria-hidden="true" /></Link>
            </footer>
          </article>
        )}
      </div>

      <VideoWatchDialog video={watching} onClose={() => setWatching(null)} />
      <p className="px-legend" aria-label="Escala de chance de cair na prova">
        <span><i style={{ "--c": "var(--p1)" } as import("react").CSSProperties} />Muito alta</span>
        <span><i style={{ "--c": "var(--p2)" } as import("react").CSSProperties} />Alta</span>
        <span><i style={{ "--c": "var(--p3)" } as import("react").CSSProperties} />Média</span>
        <span><i style={{ "--c": "var(--p4)" } as import("react").CSSProperties} />Baixa</span>
      </p>
      <p className="px-note" title={`Questões e pesos: Anexo II do edital.${hasEstimate ? " “~” indica estimativa: o edital informa só o total do bloco específico." : ""} “Provável” é estimativa da plataforma com base no padrão da IDECAN; não é garantia.`}>
        <Info aria-hidden="true" /> Anexo II do edital{hasEstimate ? " · ~ = estimado" : ""} · “provável” é estimativa da plataforma, não garantia.
      </p>
    </section>
  );
}

/** Número que sobe até o valor ao aparecer (respeita reduzir movimento). */
function CountNum({ value }: { value: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(value); return; }
    const t0 = performance.now(); let raf = 0;
    const tick = (n: number) => { const p = Math.min(1, (n - t0) / 600); setV(value * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{fmt(Math.round(v * 10) / 10)}</>;
}

function ShareRing({ share }: { share: number }) {
  const r = 20, c = 2 * Math.PI * r;
  return (
    <span className="px-ring" role="img" aria-label={`${Math.round(share * 100)}% da prova`}>
      <svg viewBox="0 0 50 50"><circle cx="25" cy="25" r={r} className="px-ring__t" /><circle cx="25" cy="25" r={r} className="px-ring__v" strokeDasharray={c} style={{ strokeDashoffset: c * (1 - share) }} /></svg>
      <b>{Math.round(share * 100)}%</b>
    </span>
  );
}
