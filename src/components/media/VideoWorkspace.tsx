import { useId, useMemo, useState } from "react";
import { BookOpen, ListVideo, PanelRightClose, PanelRightOpen, Search } from "lucide-react";
import { useMediaCatalog } from "@/lib/mediaStore";
import { canonicalSubject, topicIdentity } from "@/lib/subjects";
import { isPlaylistId } from "@/lib/arsenal";
import { findPcAcStudyResource, pcAcStudyResources, pcAcStudyResourceUrl } from "@/lib/pcAcStudyResources";
import { LessonPlayer, type LessonSource } from "./LessonPlayer";

const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const label = (text: string) => text.replace(/^ENEM\s*[—-]\s*/, "");
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
  const id = useId();
  const [pickedSubject, setSubject] = useState(initialSubject ?? "");
  const [picked, setPicked] = useState("");
  const [topic, setTopic] = useState(initialTopic ?? "all");
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const subjects = useMemo(() => {
    if (mode === "enem") return Object.keys(catalog.topicVideos).filter((s) => s.startsWith("ENEM"));
    // Todas as disciplinas com vídeo aparecem nas duas abas; as do edital que só têm aulas
    // escritas entram no fim, para o aluno saber onde estudá-las.
    const withVideo = [
      ...(mode === "playlists" ? catalog.playlists.map((p) => p.discipline) : []),
      ...Object.keys(catalog.topicVideos).filter((s) => !s.startsWith("ENEM")),
    ];
    const seen = new Set<string>();
    return [...withVideo, ...pcAcStudyResources.map((r) => r.subject)].filter((s) => {
      const key = canonicalSubject(s);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [catalog, mode]);
  // A disciplina pedida é a que o aluno escolheu; a do link só vale até ele escolher outra.
  const requestedSubject = canonicalSubject(pickedSubject || undefined);
  const matchedSubject = subjects.find((candidate) => canonicalSubject(candidate) === requestedSubject);
  const subject = pickedSubject
    ? (matchedSubject ?? (pickedSubject === initialSubject ? "" : subjects[0] || ""))
    : subjects[0] || "";
  const usePlaylists = mode === "playlists" && catalog.playlists.some((p) => p.discipline === subject);
  const writtenLessons = findPcAcStudyResource(subject);
  const topics = Object.keys(catalog.topicVideos[subject] || {}).filter((t) => t !== "*");
  const topicFilter = topic === "all"
    ? "all"
    : topics.find((candidate) => topicIdentity(candidate) === topicIdentity(topic)) ?? "__no_topic_match__";
  const entries: LessonSource[] = useMemo(
    () =>
      usePlaylists
        ? catalog.playlists
            .filter((p) => p.discipline === subject)
            .map((p) => ({ ...p, subject, topic: "Curso completo" }))
        : Object.entries(catalog.topicVideos[subject] || {})
            .filter(([t]) => topicFilter === "all" || t === topicFilter)
            .flatMap(([t, videos]) =>
              videos.map((v) => ({
                ...v,
                subject,
                topic: t === "*" ? "Revisões e aulas gerais" : t,
              })),
            ),
    [catalog, usePlaylists, subject, topicFilter],
  );
  // Keep the current lesson mounted when search only filters the sidebar.
  const current = entries.find((p) => `${p.topic}:${p.id}` === picked) || entries[0];
  const index = current ? entries.indexOf(current) : -1;
  const visible = entries.filter((p) =>
    fold(`${p.title} ${p.topic} ${p.channel || ""}`).includes(fold(search)),
  );
  const groups = [...new Set(visible.map((p) => p.topic || "Conteúdos"))];
  const select = (entry: LessonSource) => setPicked(`${entry.topic}:${entry.id}`);
  return (
    <section className="video-study" data-focus={focus} aria-label="Sala de videoaulas">
      <div className="video-study__toolbar">
        <div className="video-study__discipline">
          <BookOpen size={20} aria-hidden="true" />
          <div>
            <span>Disciplina em estudo</span>
            <h2>{label(subject) || "Seu estudo"}</h2>
          </div>
        </div>
        <button
          type="button"
          className="video-study__focus"
          aria-pressed={focus}
          onClick={() => setFocus((value) => !value)}
        >
          {focus ? <PanelRightOpen size={18} /> : <PanelRightClose size={18} />}
          {focus ? "Mostrar playlist" : "Modo foco"}
        </button>
      </div>
      {subjects.length > 1 && (
        <nav className="video-study__subjects" hidden={focus} aria-label="Disciplinas">
          {subjects.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={s === subject}
              onClick={() => {
                setSubject(s);
                setPicked("");
                setTopic("all");
                setSearch("");
              }}
            >
              {label(s)}
            </button>
          ))}
        </nav>
      )}
      <div className="video-study__filters" hidden={focus}>
        <label htmlFor={`${id}-subject`}>
          Disciplina
          <select
            id={`${id}-subject`}
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setPicked("");
              setTopic("all");
              setSearch("");
            }}
          >
            {subjects.map((s) => (
              <option value={s} key={s}>
                {label(s)}
              </option>
            ))}
          </select>
        </label>
        {!usePlaylists && topics.length > 0 && (
          <label htmlFor={`${id}-topic`}>
            Conteúdo
            <select
              id={`${id}-topic`}
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setPicked("");
                setSearch("");
              }}
            >
              <option value="all">Todos os assuntos</option>
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        )}
        <span>
          {entries.length}{" "}
          {usePlaylists
            ? entries.length === 1
              ? "playlist"
              : "playlists"
            : entries.length === 1
              ? "conteúdo"
              : "conteúdos"}
        </span>
      </div>
      <div className="video-study__layout">
        <div className="video-study__main">
          {current ? (
            <LessonPlayer
              source={current}
              onPrevious={
                !usePlaylists && index > 0 ? () => select(entries[index - 1]!) : undefined
              }
              onNext={
                !usePlaylists && index < entries.length - 1
                  ? () => select(entries[index + 1]!)
                  : undefined
              }
            />
          ) : (
            <div className="video-study__empty">
              <ListVideo size={32} />
              <h3>{writtenLessons ? "Ainda sem videoaulas nesta disciplina" : "Nenhuma aula disponível"}</h3>
              {writtenLessons ? (
                <>
                  <p>
                    {writtenLessons.label} estão disponíveis em texto no material de estudo, com
                    exemplo e questão comentada.
                  </p>
                  <a className="video-study__written" href={pcAcStudyResourceUrl(writtenLessons.courseId)}>
                    <BookOpen size={16} aria-hidden="true" /> Abrir as aulas escritas
                  </a>
                </>
              ) : (
                <p>Escolha outra disciplina ou conteúdo para continuar.</p>
              )}
            </div>
          )}
        </div>
        <aside className="video-study__playlist" hidden={focus} aria-label="Playlist de estudo">
          <div className="video-study__playlist-heading">
            <ListVideo size={18} />
            <div>
              <h3>
                {usePlaylists ? "Playlists da disciplina" : "Conteúdos da disciplina"}
              </h3>
              <p>
                {visible.length} de {entries.length} disponíveis
              </p>
            </div>
          </div>
          <label className="video-study__search" htmlFor={`${id}-search`}>
            <Search size={16} />
            <input
              id={`${id}-search`}
              type="search"
              placeholder="Buscar nesta disciplina"
              aria-label="Buscar na playlist"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <div className="video-study__queue">
            {groups.map((group) => (
              <div className="video-study__group" key={group}>
                <h4>{group}</h4>
                <ol>
                  {visible
                    .filter((p) => (p.topic || "Conteúdos") === group)
                    .map((p) => {
                      const selected = p.id === current?.id && p.topic === current.topic;
                      return (
                        <li key={`${p.topic}:${p.id}`}>
                          <button
                            type="button"
                            aria-current={selected ? "true" : undefined}
                            onClick={() => select(p)}
                          >
                            <span className="video-study__order">
                              {String(entries.indexOf(p) + 1).padStart(2, "0")}
                            </span>
                            <span>
                              <strong>{p.title}</strong>
                              <small>
                                {isPlaylistId(p.id) ? "Playlist" : "Videoaula"}
                                {p.channel ? ` · ${p.channel}` : ""}
                              </small>
                            </span>
                            {selected && <span className="video-study__selected">Em estudo</span>}
                          </button>
                        </li>
                      );
                    })}
                </ol>
              </div>
            ))}
            {!visible.length && (
              <p className="video-study__no-results">Nenhum resultado. Tente outro termo.</p>
            )}
          </div>
        </aside>
      </div>
      <p className="video-study__attribution">
        Aulas públicas de canais independentes, reproduzidas pelo player oficial do YouTube.
        Legendas, qualidade e configurações permanecem disponíveis no vídeo.
      </p>
    </section>
  );
}
