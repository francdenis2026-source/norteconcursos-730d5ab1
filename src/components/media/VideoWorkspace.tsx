import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Film,
  GraduationCap,
  Layers,
  ListVideo,
  Search,
  Target,
} from "lucide-react";
import { useMediaCatalog } from "@/lib/mediaStore";
import { canonicalSubject } from "@/lib/subjects";
import { isPlaylistId } from "@/lib/arsenal";
import { findPcAcStudyResource, pcAcStudyResourceUrl } from "@/lib/pcAcStudyResources";
import { pcAcDisciplineLink } from "@/lib/pcAcreVerticalLinks";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import { LessonPlayer, type LessonSource } from "./LessonPlayer";
import "./video-library.css";

const fold = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const label = (text: string) => text.replace(/^ENEM\s*[—-]\s*/, "");
const TONES = ["#2563eb", "#059669", "#d97706", "#7c3aed", "#db2777", "#0891b2", "#dc2626", "#4f46e5"];
const WATCHED_KEY = "norte-video-watched:v1";

interface RailItem {
  key: string;
  label: string;
  group: string;
  subjects: string[];
  count: number;
  written: ReturnType<typeof findPcAcStudyResource>;
}
type Scope = "edital" | "all";

function readWatched(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(WATCHED_KEY) ?? "[]") as string[]);
  } catch {
    return new Set();
  }
}

/** Biblioteca de videoaulas: disciplinas à esquerda, player ao centro e fila de conteúdos à direita, em uma janela só. */
export function VideoWorkspace({
  mode,
  initialSubject,
  initialTopic,
}: {
  mode: "playlists" | "topics" | "enem";
  initialSubject?: string | undefined;
  initialTopic?: string | undefined;
}) {
  const { catalog } = useMediaCatalog();
  const [scope, setScope] = useState<Scope>("edital");
  const [cargoId, setCargoId] = useState(pcAcVerticalCargos.find((c) => c.id === "investigador")?.id ?? pcAcVerticalCargos[0]!.id);
  const [pickedKey, setPickedKey] = useState("");
  const [topic, setTopic] = useState(initialTopic ?? "all");
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState("");
  const [watched, setWatched] = useState<Set<string>>(() => new Set());
  useEffect(() => setWatched(readWatched()), []);
  const toggleWatched = (id: string) =>
    setWatched((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      try {
        localStorage.setItem(WATCHED_KEY, JSON.stringify([...next]));
      } catch {
        /* sem armazenamento */
      }
      return next;
    });

  const countOf = (subject: string) =>
    mode === "playlists"
      ? catalog.playlists.filter((p) => p.discipline === subject).length
      : Object.values(catalog.topicVideos[subject] ?? {}).reduce((n, list) => n + list.length, 0);

  const catalogSubjects = useMemo(() => {
    if (mode === "enem") return Object.keys(catalog.topicVideos).filter((s) => s.startsWith("ENEM"));
    if (mode === "playlists") return [...new Set(catalog.playlists.map((p) => p.discipline))];
    return Object.keys(catalog.topicVideos).filter((s) => !s.startsWith("ENEM"));
  }, [catalog, mode]);
  const resolveSubject = (name: string) => catalogSubjects.find((candidate) => canonicalSubject(candidate) === canonicalSubject(name));

  const cargo = pcAcVerticalCargos.find((item) => item.id === cargoId) ?? pcAcVerticalCargos[0]!;
  const items: RailItem[] = useMemo(() => {
    if (mode === "topics" && scope === "edital") {
      const seen = new Set<string>();
      return cargo.blocks.flatMap((block) =>
        block.disciplines
          .filter((discipline) => !seen.has(discipline.name) && seen.add(discipline.name))
          .map((discipline) => {
            const subjects = [...new Set((pcAcDisciplineLink(discipline.id)?.subjects ?? []).map(resolveSubject).filter(Boolean) as string[])];
            return {
              key: discipline.id,
              label: discipline.name.replace(/\s*\(.*\)\s*$/, ""),
              group: block.title,
              subjects,
              count: subjects.reduce((n, s) => n + countOf(s), 0),
              written: findPcAcStudyResource(discipline.name),
            };
          }),
      );
    }
    return catalogSubjects
      .map((subject) => ({
        key: subject,
        label: label(subject),
        group: mode === "playlists" ? "Cursos completos" : mode === "enem" ? "Disciplinas do ENEM" : "Matérias com videoaulas",
        subjects: [subject],
        count: countOf(subject),
        written: findPcAcStudyResource(subject),
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "pt-BR"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, mode, scope, cargo, catalogSubjects]);

  const requested = initialSubject ? canonicalSubject(initialSubject) : "";
  const fromRequest = requested ? items.find((item) => item.subjects.some((s) => canonicalSubject(s) === requested)) : undefined;
  const selected = items.find((item) => item.key === pickedKey) ?? fromRequest ?? items.find((item) => item.count > 0) ?? items[0];
  const tone = (item: RailItem | undefined) => TONES[Math.max(0, items.indexOf(item as RailItem)) % TONES.length]!;

  const entries: LessonSource[] = useMemo(() => {
    if (!selected) return [];
    if (mode === "playlists")
      return catalog.playlists.filter((p) => selected.subjects.includes(p.discipline)).map((p) => ({ ...p, subject: p.discipline, topic: "Curso completo" }));
    return selected.subjects.flatMap((subject) =>
      Object.entries(catalog.topicVideos[subject] ?? {}).flatMap(([name, videos]) =>
        videos.map((video) => ({ ...video, subject, topic: name === "*" ? "Revisões e aulas gerais" : name })),
      ),
    );
  }, [catalog, mode, selected]);
  const topics = [...new Set(entries.map((entry) => entry.topic || "Conteúdos"))];
  const topicFilter = topic !== "all" && topics.includes(topic) ? topic : "all";
  const visible = entries.filter(
    (entry) =>
      (topicFilter === "all" || entry.topic === topicFilter) &&
      fold(`${entry.title} ${entry.topic ?? ""} ${entry.channel ?? ""}`).includes(fold(search)),
  );
  const current = visible.find((entry) => `${entry.topic}:${entry.id}` === picked) ?? visible[0];
  const index = current ? visible.indexOf(current) : -1;
  const groups = [...new Set(visible.map((entry) => entry.topic || "Conteúdos"))];
  const select = (entry: LessonSource) => setPicked(`${entry.topic}:${entry.id}`);
  const chooseItem = (key: string) => {
    setPickedKey(key);
    setPicked("");
    setTopic("all");
    setSearch("");
  };
  const watchedIn = (item: RailItem) =>
    item.subjects.reduce((n, subject) => n + (mode === "playlists" ? 0 : Object.values(catalog.topicVideos[subject] ?? {}).flat().filter((v) => watched.has(v.id)).length), 0);
  const totalVideos = items.reduce((n, item) => n + item.count, 0);
  const railGroups = [...new Set(items.map((item) => item.group))];
  const color = tone(selected);

  return (
    <section className="vl" aria-label="Biblioteca de videoaulas" style={{ "--vl-tone": color } as React.CSSProperties}>
      <header className="vl__top">
        {mode === "topics" ? (
          <div className="vl__scope" role="group" aria-label="Como estudar">
            <button type="button" aria-pressed={scope === "edital"} onClick={() => { setScope("edital"); setPickedKey(""); setPicked(""); }}>
              <Target size={16} aria-hidden="true" /> Pelo meu edital
            </button>
            <button type="button" aria-pressed={scope === "all"} onClick={() => { setScope("all"); setPickedKey(""); setPicked(""); }}>
              <Layers size={16} aria-hidden="true" /> Todas as matérias
            </button>
          </div>
        ) : (
          <p className="vl__heading"><Film size={16} aria-hidden="true" /> {mode === "playlists" ? "Cursos em playlist" : "Videoaulas do ENEM"}</p>
        )}
        {mode === "topics" && scope === "edital" && (
          <label className="vl__cargo">
            <span>Cargo</span>
            <select value={cargoId} onChange={(event) => { setCargoId(event.target.value as typeof cargoId); setPickedKey(""); setPicked(""); }}>
              {pcAcVerticalCargos.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </label>
        )}
        <p className="vl__stats">
          <strong>{totalVideos}</strong> {mode === "playlists" ? "playlists" : "videoaulas"} · <strong>{items.filter((item) => item.count > 0).length}</strong> de <strong>{items.length}</strong> disciplinas com vídeo
        </p>
      </header>

      <div className="vl__body">
        <nav className="vl__rail" aria-label="Disciplinas">
          {railGroups.map((group) => (
            <div key={group} className="vl__rail-group">
              <h3>{group}</h3>
              <ul>
                {items.filter((item) => item.group === group).map((item) => {
                  const itemTone = TONES[items.indexOf(item) % TONES.length]!;
                  const done = watchedIn(item);
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        aria-pressed={selected?.key === item.key}
                        data-empty={item.count === 0 || undefined}
                        style={{ "--dot": itemTone } as React.CSSProperties}
                        onClick={() => chooseItem(item.key)}
                      >
                        <i aria-hidden="true" />
                        <span>{item.label}</span>
                        <small title={item.count ? `${done} de ${item.count} assistidas` : "Sem videoaulas ainda"}>
                          {item.count ? (done ? `${done}/${item.count}` : item.count) : "—"}
                        </small>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          {!items.length && <p className="vl__empty-note">Nenhuma disciplina com vídeo nesta área.</p>}
        </nav>

        <div className="vl__stage">
          {current && selected ? (
            <>
              <LessonPlayer
                source={current}
                onPrevious={index > 0 ? () => select(visible[index - 1]!) : undefined}
                onNext={index < visible.length - 1 ? () => select(visible[index + 1]!) : undefined}
                onEnded={() => {
                  if (!isPlaylistId(current.id)) {
                    if (!watched.has(current.id)) toggleWatched(current.id);
                  }
                }}
              />
              <div className="vl__info">
                <div className="vl__info-text">
                  <span className="vl__crumb">{label(selected.label)} · {current.topic === "*" ? "Revisões e aulas gerais" : current.topic}</span>
                  <h2>{current.title}</h2>
                  <p>{isPlaylistId(current.id) ? "Playlist" : "Videoaula"}{current.channel ? ` · ${current.channel}` : ""} · aula {index + 1} de {visible.length}</p>
                </div>
                <div className="vl__info-actions">
                  <button type="button" className="vl__done" aria-pressed={watched.has(current.id)} onClick={() => toggleWatched(current.id)}>
                    {watched.has(current.id) ? <CheckCircle2 size={18} aria-hidden="true" /> : <Check size={18} aria-hidden="true" />}
                    {watched.has(current.id) ? "Assistida" : "Marcar como assistida"}
                  </button>
                  <Link to="/dashboard/question-trainer" search={{ area: label(selected.label), subject: selected.subjects[0] ?? selected.label, go: "1" } as never} className="vl__practice">
                    <GraduationCap size={18} aria-hidden="true" /> Praticar questões
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="vl__empty">
              <ListVideo size={34} aria-hidden="true" />
              <h3>{selected ? `${selected.label}: ainda sem videoaulas` : "Nenhuma aula disponível"}</h3>
              <p>
                {selected?.written
                  ? `${selected.written.label} estão disponíveis em texto, com exemplo e questão comentada.`
                  : "Esta disciplina do edital ainda não tem videoaulas na biblioteca. Estude pelo conteúdo e pelas questões."}
              </p>
              <div className="vl__empty-actions">
                {selected?.written && (
                  <a className="vl__practice" href={pcAcStudyResourceUrl(selected.written.courseId)}>
                    <BookOpen size={18} aria-hidden="true" /> Abrir as aulas escritas
                  </a>
                )}
                {selected && (
                  <Link className="vl__done" to="/dashboard/disciplinas" search={{ d: selected.label } as never}>
                    <GraduationCap size={18} aria-hidden="true" /> Estudar a disciplina
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        <aside className="vl__queue" aria-label="Conteúdos da disciplina">
          <div className="vl__queue-head">
            <h3><ListVideo size={16} aria-hidden="true" /> Conteúdos</h3>
            <small>{visible.length} de {entries.length}</small>
          </div>
          <label className="vl__search">
            <Search size={15} aria-hidden="true" />
            <input type="search" placeholder="Buscar nesta disciplina" aria-label="Buscar na disciplina" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          {topics.length > 1 && (
            <div className="vl__topics" role="group" aria-label="Filtrar por assunto">
              <button type="button" aria-pressed={topicFilter === "all"} onClick={() => setTopic("all")}>Todos</button>
              {topics.map((name) => (
                <button key={name} type="button" aria-pressed={topicFilter === name} onClick={() => setTopic(name)} title={name}>{name}</button>
              ))}
            </div>
          )}
          <div className="vl__list">
            {groups.map((group) => (
              <div key={group} className="vl__list-group">
                <h4>{group}</h4>
                <ol>
                  {visible.filter((entry) => (entry.topic || "Conteúdos") === group).map((entry) => {
                    const active = current && entry.id === current.id && entry.topic === current.topic;
                    return (
                      <li key={`${entry.topic}:${entry.id}`}>
                        <button type="button" aria-current={active ? "true" : undefined} data-done={watched.has(entry.id) || undefined} onClick={() => select(entry)}>
                          <span className="vl__num">{watched.has(entry.id) ? <Check size={14} aria-hidden="true" /> : String(visible.indexOf(entry) + 1).padStart(2, "0")}</span>
                          <span className="vl__item-text">
                            <strong>{entry.title}</strong>
                            <small>{isPlaylistId(entry.id) ? "Playlist" : "Videoaula"}{entry.channel ? ` · ${entry.channel}` : ""}</small>
                          </span>
                          {active && <ChevronRight size={16} aria-hidden="true" />}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
            {!visible.length && <p className="vl__empty-note">Nenhum resultado. Tente outro termo ou assunto.</p>}
          </div>
          {index > -1 && (
            <div className="vl__nav">
              <button type="button" disabled={index <= 0} onClick={() => select(visible[index - 1]!)}><ChevronLeft size={16} aria-hidden="true" /> Anterior</button>
              <button type="button" disabled={index >= visible.length - 1} onClick={() => select(visible[index + 1]!)}>Próxima <ChevronRight size={16} aria-hidden="true" /></button>
            </div>
          )}
        </aside>
      </div>
      <p className="vl__attribution">Aulas públicas de canais independentes, reproduzidas pelo player oficial do YouTube. Marque as aulas assistidas para acompanhar seu avanço.</p>
    </section>
  );
}
