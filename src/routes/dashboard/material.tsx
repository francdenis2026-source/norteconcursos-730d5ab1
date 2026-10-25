import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Atom,
  BarChart3,
  BookA,
  BookMarked,
  BookOpen,
  Calculator,
  ClipboardCheck,
  Cpu,
  FlaskConical,
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
import { LockedState, PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
import { hubLaws, type SubjectIcon } from "@/lib/materialHub";
import { disciplineCards, type DisciplineCard } from "@/lib/disciplineHub";
import { TRACKS } from "@/data/tracks";
import { PLAYLISTS } from "@/data/mediaCatalog";
import { LAW_ROWS, searchLaws } from "@/lib/lawFinder";
import { normalizeLibrarySearch } from "@/lib/librarySearch";

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
    title: "Videoaulas e podcasts",
    text: "Aprenda vendo ou ouvindo, no seu ritmo.",
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
  const lawTotal = laws.reduce((sum, entry) => sum + entry.count, 0);
  const subjectTotal = subjects.filter((entry) => entry.hasContent).length;

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
    <div className="material-hub space-y-8 pb-10">
      <PageHero
        image="study-desk"
        kicker="Material didático"
        icon={Library}
        title={
          <>
            Materiais <em>de estudo</em>
          </>
        }
        description="Estude por legislação, disciplina ou formato."
      >
        <div className="page-hero__stats max-w-xl">
          <HeroStat icon={Scale} label="Materiais de leis" value={isPending ? "—" : lawTotal} />
          <HeroStat
            icon={BookOpen}
            label="Disciplinas com conteúdo"
            value={isPending ? "—" : subjectTotal}
          />
        </div>
      </PageHero>

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

      <section aria-labelledby="hub-subjects" className="space-y-3">
        <header className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="hub-subjects" className="text-xl font-bold">
              Disciplinas
            </h2>
            <p className="text-sm text-muted-foreground">
              Língua Portuguesa, Matemática, Raciocínio Lógico, Química, Física, Estatística,
              Contabilidade e mais.
            </p>
          </div>
          <Link
            to="/dashboard/disciplinas"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Abrir todas as disciplinas →
          </Link>
        </header>
        {isPending && signedIn ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <Skeleton key={n} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((entry) => {
              const Icon = SUBJECT_ICONS[entry.icon];
              const content = (
                <>
                  <span className="material-card__icon" data-subject={entry.icon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="material-card__body">
                    <strong>{entry.name}</strong>
                    <span>{summary(entry)}</span>
                  </span>
                </>
              );
              return (
                <li key={entry.name}>
                  {entry.hasContent ? (
                    <Link
                      to="/dashboard/disciplinas"
                      search={{ d: entry.name }}
                      className="material-card"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="material-card" data-empty="true" aria-disabled="true">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
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
