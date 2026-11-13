import "@/styles/student-library-media-workspaces.css";
import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Archive,
  Atom,
  BarChart3,
  BookA,
  BookMarked,
  BookOpen,
  Building2,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  Cpu,
  FlaskConical,
  Landmark,
  Languages,
  Library,
  MapPin,
  PenLine,
  PlayCircle,
  Scale,
  ScrollText,
  Search,
  X,
  Sigma,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { LockedState } from "@/components/dashboard/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { hubLaws, type SubjectIcon } from "@/lib/materialHub";
import { disciplineCards, type DisciplineCard } from "@/lib/disciplineHub";
import { TRACKS } from "@/data/tracks";
import { PLAYLISTS } from "@/data/mediaCatalog";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import { PCAC_EXAM_DATE } from "@/lib/pcAcreStudyPlan";
import { LAW_ROWS, searchLaws } from "@/lib/lawFinder";
import { normalizeLibrarySearch } from "@/lib/librarySearch";
import { canonicalSubject } from "@/lib/subjects";
import "@/styles/study-area-compact.css";
import "@/styles/student-area-kit.css";

export const Route = createFileRoute("/dashboard/material")({
  component: MaterialHub,
  head: () => ({ meta: [{ title: "Material didático | Norte Concurso" }] }),
});

const SUBJECT_ICONS: Record<SubjectIcon, LucideIcon> = {
  portugues: PenLine,
  matematica: Calculator,
  logica: Sigma,
  informatica: Cpu,
  quimica: FlaskConical,
  fisica: Atom,
  estatistica: BarChart3,
  contabilidade: Wallet,
  ingles: Languages,
  geral: BookOpen,
};

const OTHER_RESOURCES: {
  to: string;
  search?: Record<string, string>;
  icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    to: "/dashboard/media",
    icon: PlayCircle,
    title: "Videoaulas",
    text: "Playlists e aulas organizadas por assunto.",
  },
  {
    to: "/dashboard/dicionario",
    icon: BookA,
    title: "Dicionário de estudo",
    text: "Termos das leis e das matérias explicados.",
  },
  {
    to: "/dashboard/essays",
    icon: PenLine,
    title: "Redação para concursos",
    text: "Modelos e prática de escrita.",
  },
  {
    to: "/dashboard/enem",
    search: { tab: "materiais" },
    icon: BookMarked,
    title: "Materiais do ENEM",
    text: "Área dedicada ao exame.",
  },
  {
    to: "/dashboard/edital",
    icon: MapPin,
    title: "Meu edital",
    text: "Estude seguindo o que será cobrado.",
  },
];

const SUBJECT_GUIDES: { id: string; name: string; text: string; icon: LucideIcon }[] = [
  { id: "arquivologia", name: "Arquivologia", text: "Gestão de documentos e arquivos", icon: Archive },
  { id: "administracao-geral", name: "Noções de Administração", text: "Planejamento, organização e controle", icon: ClipboardList },
  { id: "administracao-publica", name: "Administração Pública", text: "Evolução e modelos de gestão", icon: Building2 },
];
const GUIDE_NAMES = new Set(SUBJECT_GUIDES.map((guide) => canonicalSubject(guide.name)));

const summary = (card: DisciplineCard) =>
  [
    card.materials > 0 && `${card.materials} ${card.materials === 1 ? "material" : "materiais"}`,
    card.lessons > 0 && `${card.lessons} ${card.lessons === 1 ? "aula" : "aulas"}`,
    card.videos > 0 && `${card.videos} ${card.videos === 1 ? "videoaula" : "videoaulas"}`,
  ]
    .filter(Boolean)
    .join(" · ") || "Em preparação";

type Suggestion = { key: string; label: string; hint: string; go: () => void; icon: LucideIcon };

/** Busca única do material: leis (por número, nome, sigla ou tema) e disciplinas, com resposta ao digitar. */
function HubSearch({ subjects }: { subjects: DisciplineCard[] }) {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const text = query.trim();
  const suggestions = React.useMemo<Suggestion[]>(() => {
    if (!text) return [];
    const normalized = normalizeLibrarySearch(text);
    const list: Suggestion[] = [];
    for (const subject of subjects) {
      if (!normalizeLibrarySearch(subject.name).includes(normalized) || !subject.hasContent)
        continue;
      list.push({
        key: `d:${subject.name}`,
        label: subject.name,
        hint: `Disciplina · ${summary(subject)}`,
        icon: SUBJECT_ICONS[subject.icon],
        go: () =>
          void navigate({
            to: "/dashboard/disciplinas",
            search: { d: subject.name },
          }),
      });
    }
    for (const { row } of searchLaws(text).slice(0, 6))
      list.push({
        key: `l:${row.slug}`,
        label: row.nickname,
        hint: `${row.kind !== "Outro" && row.numberLabel ? `${row.kind} ${row.numberLabel}` : row.group} · lei`,
        icon: Scale,
        go: () =>
          void navigate({ to: "/dashboard/legal-course/$slug", params: { slug: row.slug } }),
      });
    list.push({
      key: "all-laws",
      label: `Ver todas as leis para “${text}”`,
      hint: "Localizador de leis",
      icon: Search,
      go: () => void navigate({ to: "/dashboard/leis", search: { q: text } }),
    });
    list.push({
      key: "texts",
      label: `Pesquisar “${text}” nos textos`,
      hint: "Dentro dos guias e artigos",
      icon: Library,
      go: () =>
        void navigate({ to: "/dashboard/library", search: { collection: "laws", q: text } }),
    });
    return list;
  }, [text, subjects, navigate]);
  React.useEffect(() => setActive(0), [text]);
  const onKey = (event: React.KeyboardEvent) => {
    if (!suggestions.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => (value + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => (value - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      suggestions[active]?.go();
    } else if (event.key === "Escape") setQuery("");
  };
  return (
    <section className="hub-search" aria-label="Buscar no material didático">
      <label htmlFor="hub-search-input" className="hub-search__label">
        O que você quer estudar? Digite o número da lei, o nome ou a disciplina.
      </label>
      <div className="hub-search__box">
        <Search aria-hidden="true" size={22} />
        <input
          id="hub-search-input"
          type="search"
          role="combobox"
          aria-expanded={suggestions.length > 0}
          aria-controls="hub-search-list"
          aria-activedescendant={suggestions.length ? `hub-opt-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKey}
          placeholder="Ex.: 11.343 · Maria da Penha · armas · português · química"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Limpar a busca">
            <X aria-hidden="true" size={18} />
          </button>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="hub-search__list" id="hub-search-list" role="listbox">
          {suggestions.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={item.key}
                id={`hub-opt-${index}`}
                role="option"
                aria-selected={index === active}
                data-active={index === active}
                onMouseEnter={() => setActive(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  item.go();
                }}
              >
                <Icon aria-hidden="true" size={18} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.hint}</small>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function MaterialHub() {
  const { user, isLoading } = useAuthStatus();
  const signedIn = !!user && user.id !== "demo-user";
  const { data, isPending } = useStudyMaterialList(signedIn);
  const items = data ?? [];
  const laws = hubLaws(items);
  const subjects = disciplineCards(items, TRACKS, PLAYLISTS);
  const availableSubjects = subjects.filter(
    (entry) => entry.hasContent && !GUIDE_NAMES.has(entry.name),
  );
  const lawTotal = laws.reduce((sum, entry) => sum + entry.count, 0);
  const subjectTotal = availableSubjects.length;

  if (!isLoading && !signedIn)
    return (
      <LockedState
        image="study-desk"
        title={
          <>
            Material <em>didático</em>
          </>
        }
        description="Entre na sua conta para acessar a legislação e os materiais por disciplina."
      />
    );

  return (
    <div className="nc-learning-workspace material-hub space-y-4 pb-8">
      <header className="ak-hero">
        <img src="/media/hero/painel-aluno-estudo.webp" alt="" aria-hidden="true" decoding="async" />
        <div className="ak-hero__copy">
          <small>Material didático</small>
          <h1>Materiais de estudo</h1>
          <p>Estude por legislação, disciplina ou formato.</p>
        </div>
        <nav className="ak-quick" aria-label="Acesso rápido">
          <Link to="/dashboard/material" hash="hub-laws" style={{ "--ak-tone": "oklch(0.76 0.16 150)" } as React.CSSProperties}>
            <Scale aria-hidden="true" /> Leis <strong>{isPending ? "—" : lawTotal}</strong>
          </Link>
          <Link to="/dashboard/disciplinas" style={{ "--ak-tone": "oklch(0.74 0.16 300)" } as React.CSSProperties}>
            <BookOpen aria-hidden="true" /> Disciplinas <strong>{isPending ? "—" : subjectTotal}</strong>
          </Link>
          <Link to="/dashboard/pc-acre-edital" search={{ cargo: "investigador" }} style={{ "--ak-tone": "oklch(0.82 0.14 82)" } as React.CSSProperties}>
            <Library aria-hidden="true" /> Edital PC-AC
          </Link>
          <Link to="/dashboard/question-trainer" style={{ "--ak-tone": "oklch(0.72 0.15 255)" } as React.CSSProperties}>
            <ClipboardCheck aria-hidden="true" /> Treinar questões
          </Link>
        </nav>
      </header>

      <section className="ak-strip" aria-labelledby="hub-subjects">
        <header>
          <h2 id="hub-subjects">Disciplinas</h2>
          <Link to="/dashboard/disciplinas">Abrir todas as disciplinas →</Link>
        </header>
        {isPending && signedIn ? (
          <div className="ak-tiles">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <Skeleton key={n} className="h-[7.5rem] rounded-2xl" />
            ))}
          </div>
        ) : (
          <ul className="ak-tiles">
            <li>
              <Link to="/dashboard/disciplinas" search={{ d: "Realidade do Acre" }} className="ak-tile">
                <span className="ak-tile__icon">
                  <Landmark aria-hidden="true" />
                </span>
                <strong>Realidade do Acre</strong>
                <span>História, geografia, economia e atualidades</span>
              </Link>
            </li>
            {SUBJECT_GUIDES.map((guide) => (
              <li key={guide.id}>
                <Link
                  to="/dashboard/library"
                  search={{ collection: "subjects", guia: guide.id } as never}
                  hash="materiais-atualizados-pcac"
                  className="ak-tile"
                >
                  <span className="ak-tile__icon">
                    <guide.icon aria-hidden="true" />
                  </span>
                  <strong>{guide.name}</strong>
                  <span>{guide.text}</span>
                </Link>
              </li>
            ))}
            {availableSubjects.map((entry) => {
              const Icon = SUBJECT_ICONS[entry.icon];
              return (
                <li key={entry.name}>
                  <Link to="/dashboard/disciplinas" search={{ d: entry.name }} className="ak-tile">
                    <span className="ak-tile__icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <strong>{entry.name}</strong>
                    <span>{summary(entry)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="pcac-material-focus" aria-labelledby="pcac-material-focus-title">
        <div className="pcac-material-focus__glow" aria-hidden="true" />
        <div className="pcac-material-focus__body">
          <p className="pcac-material-focus__eyebrow">Rota recomendada · Edital nº 001/2026 SEAD/PCAC</p>
          <h2 id="pcac-material-focus-title">Prepare-se para a PC-AC 2026</h2>
          <p className="pcac-material-focus__description">
            Acesse o edital verticalizado, organize sua semana e estude cada disciplina com os materiais já disponíveis na plataforma.
          </p>
          <div className="pcac-material-focus__meta">
            <span>{pcAcVerticalCargos.find((cargo) => cargo.id === "investigador")?.label ?? "Oficial Investigador"}</span>
            <span>Prova objetiva: {new Date(`${PCAC_EXAM_DATE}T12:00:00`).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>
        <div className="pcac-material-focus__actions">
          <Link to="/dashboard/pc-acre-edital" search={{ cargo: "investigador" }} className="pcac-material-focus__primary">Abrir edital verticalizado →</Link>
          <Link to="/dashboard/pc-acre-edital" search={{ cargo: "investigador", view: "plan" }} className="pcac-material-focus__secondary">Ver plano de estudos</Link>
        </div>
        <div className="pcac-material-focus__disciplines" aria-label="Disciplinas do cargo de Oficial Investigador">
          <span className="pcac-material-focus__disciplines-label">No edital:</span>
          {(pcAcVerticalCargos.find((cargo) => cargo.id === "investigador")?.blocks ?? []).flatMap((block) => block.disciplines).slice(0, 7).map((discipline) => {
            const match = subjects.find((subject) => subject.name === discipline.name);
            return match ? (
              <Link key={discipline.id} to="/dashboard/disciplinas" search={{ d: match.name }} className="pcac-material-focus__discipline">{discipline.name}</Link>
            ) : <span key={discipline.id} className="pcac-material-focus__discipline pcac-material-focus__discipline--muted">{discipline.name}</span>;
          })}
        </div>
      </section>

      <HubSearch subjects={subjects} />

      <section aria-labelledby="hub-laws" className="space-y-3">
        <header className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="hub-laws" className="text-xl font-bold">
              Legislação, leis e súmulas
            </h2>
            <p className="text-sm text-muted-foreground">
              Textos oficiais, explicações e exercícios por lei e por assunto.
            </p>
          </div>
          <Link
            to="/dashboard/library"
            search={{ collection: "laws" }}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Abrir toda a legislação →
          </Link>
        </header>
        {isPending && signedIn ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((n) => (
              <Skeleton key={n} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <li className="sm:col-span-2 lg:col-span-3">
              <Link to="/dashboard/leis" className="material-card">
                <span className="material-card__icon" data-tone="law">
                  <Scale aria-hidden="true" />
                </span>
                <span className="material-card__body">
                  <strong>Leis extravagantes e especiais: {LAW_ROWS.length} leis, de A a Z</strong>
                  <span>
                    Localizador com busca por número, nome, sigla ou tema, e filtros por assunto
                    (drogas e armas, crime organizado, proteção de pessoas e outros).
                  </span>
                </span>
              </Link>
            </li>
            {laws.map((entry) => {
              const body = (
                <>
                  <span className="material-card__icon" data-tone="law">
                    <Scale aria-hidden="true" />
                  </span>
                  <span className="material-card__body">
                    <strong>{entry.name}</strong>
                    <span>
                      {entry.count} {entry.count === 1 ? "material" : "materiais"}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={entry.name}>
                  {entry.lawSlug ? (
                    <Link
                      to="/dashboard/legal-course/$slug"
                      params={{ slug: entry.lawSlug }}
                      className="material-card"
                    >
                      {body}
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard/library"
                      search={{ collection: "laws", discipline: entry.name }}
                      className="material-card"
                    >
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
            <li>
              <Link
                to="/dashboard/library"
                search={{ collection: "laws", q: "súmula" }}
                className="material-card"
              >
                <span className="material-card__icon" data-tone="law">
                  <ScrollText aria-hidden="true" />
                </span>
                <span className="material-card__body">
                  <strong>Súmulas e jurisprudência</strong>
                  <span>Súmulas citadas nos guias de estudo</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/ctb" className="material-card">
                <span className="material-card__icon" data-tone="law">
                  <BookOpen aria-hidden="true" />
                </span>
                <span className="material-card__body">
                  <strong>Painel do CTB</strong>
                  <span>Legislação de trânsito: multas, pontos, prazos e resoluções.</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/calculadora-penal" className="material-card">
                <span className="material-card__icon" data-tone="law">
                  <Calculator aria-hidden="true" />
                </span>
                <span className="material-card__body">
                  <strong>Calculadora penal</strong>
                  <span>Recurso de cálculo para acompanhar o estudo da legislação penal.</span>
                </span>
              </Link>
            </li>
          </ul>
        )}
      </section>

      <section aria-labelledby="hub-more" className="space-y-3">
        <header>
          <h2 id="hub-more" className="text-xl font-bold">
            Mais para estudar
          </h2>
          <p className="text-sm text-muted-foreground">Cursos, vídeos, dicionário e prática.</p>
        </header>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER_RESOURCES.map(({ to, search, icon: Icon, title, text }) => (
            <li key={title}>
              <Link to={to} search={(search ?? {}) as never} className="material-card">
                <span className="material-card__icon" data-tone="more">
                  <Icon aria-hidden="true" />
                </span>
                <span className="material-card__body">
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/dashboard/question-trainer" className="material-card">
              <span className="material-card__icon" data-tone="more">
                <ClipboardCheck aria-hidden="true" />
              </span>
              <span className="material-card__body">
                <strong>Praticar com questões</strong>
                <span>Fixe o que estudou no Treinador.</span>
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
