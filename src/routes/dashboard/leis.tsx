import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink, Library, Scale, Search, SearchX, X } from "lucide-react";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/button";
import {
  LAW_ROWS,
  LAW_THEMES,
  lawsByTheme,
  searchLaws,
  sortLaws,
  type LawRow,
  type LawSort,
} from "@/lib/lawFinder";
import { libraryMatchParts } from "@/lib/librarySearch";

export const Route = createFileRoute("/dashboard/leis")({
  component: LawFinderPage,
  validateSearch: (
    s: Record<string, unknown>,
  ): { q?: string | undefined; tema?: string | undefined } => ({
    q: typeof s["q"] === "string" || typeof s["q"] === "number" ? String(s["q"]) : undefined,
    tema: typeof s["tema"] === "string" ? s["tema"] : undefined,
  }),
  head: () => ({ meta: [{ title: "Leis extravagantes e especiais | Norte Concurso" }] }),
});

const EXAMPLES = [
  "11.343",
  "Maria da Penha",
  "armas",
  "LEP",
  "organização criminosa",
  "ECA",
  "2006",
];
const SORTS: { id: LawSort; label: string }[] = [
  { id: "relevancia", label: "Mais relevantes" },
  { id: "az", label: "Ordem alfabética" },
  { id: "numero", label: "Número da lei" },
  { id: "recentes", label: "Mais recentes" },
  { id: "antigas", label: "Mais antigas" },
];

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  return (
    <>
      {libraryMatchParts(text, query).map((part, index) =>
        part.match ? (
          <mark key={index} className="law-finder__mark">
            {part.text}
          </mark>
        ) : (
          <React.Fragment key={index}>{part.text}</React.Fragment>
        ),
      )}
    </>
  );
}

function LawCard({
  row,
  query,
  reason,
}: {
  row: LawRow;
  query: string;
  reason?: string | undefined;
}) {
  const themes = row.themes.map((id) => LAW_THEMES.find((t) => t.id === id)?.label).filter(Boolean);
  return (
    <li className="law-finder__item">
      <Link
        to="/dashboard/legal-course/$slug"
        params={{ slug: row.slug }}
        className="law-finder__card"
      >
        <span className="law-finder__badge" aria-hidden="true">
          <small>{row.kind}</small>
          <strong>{row.numberLabel ?? "—"}</strong>
        </span>
        <span className="law-finder__main">
          <strong>
            <Highlight text={row.nickname} query={query} />
          </strong>
          <span className="law-finder__meta">
            {row.kind !== "Outro" && row.numberLabel ? `${row.kind} ${row.numberLabel} · ` : ""}
            {row.group}
          </span>
          {themes.length > 0 && (
            <span className="law-finder__tags">
              {themes.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </span>
          )}
        </span>
        <span className="law-finder__go">
          {reason && <em>{reason}</em>}
          Estudar <ArrowUpRight aria-hidden="true" size={16} />
        </span>
      </Link>
    </li>
  );
}

function LawFinderPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = React.useState(search.q ?? "");
  const [theme, setTheme] = React.useState(search.tema ?? "all");
  const [sort, setSort] = React.useState<LawSort>("recentes");
  const input = React.useRef<HTMLInputElement>(null);

  // Mantém o endereço em sincronia (compartilhável) sem recarregar a página.
  React.useEffect(() => {
    const timer = window.setTimeout(
      () =>
        void navigate({
          search: { q: query.trim() || undefined, tema: theme === "all" ? undefined : theme },
          replace: true,
        }),
      250,
    );
    return () => window.clearTimeout(timer);
  }, [query, theme, navigate]);

  // "/" leva direto ao campo de busca, como em outros sites de consulta.
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName ?? "")) {
        event.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const searching = query.trim() !== "";
  const scoped = lawsByTheme(LAW_ROWS, theme);
  const hits = React.useMemo(
    () => (searching ? searchLaws(query, scoped) : []),
    [searching, query, scoped],
  );
  const rows = searching
    ? hits.map((hit) => hit.row)
    : sortLaws(scoped, sort === "relevancia" ? "recentes" : sort);
  const sorted = searching && sort !== "relevancia" ? sortLaws(rows, sort) : rows;
  const reasonOf = (slug: string) => hits.find((hit) => hit.row.slug === slug)?.reason;
  const reset = () => {
    setQuery("");
    setTheme("all");
    input.current?.focus();
  };

  return (
    <div className="law-finder space-y-6 pb-10">
      <PageHero
        image="study-desk"
        size="lg"
        kicker="Material didático"
        icon={Scale}
        title={
          <>
            Leis <em>especiais</em>
          </>
        }
        description="Localize leis especiais, também chamadas de extravagantes, por número, nome, sigla ou tema. Este localizador complementa a área de Legislação e súmulas."
      >
        <div className="page-hero__stats">
          <HeroStat icon={Scale} label="Leis no acervo" value={LAW_ROWS.length} />
          <HeroStat icon={Library} label="Temas" value={LAW_THEMES.length} />
        </div>
      </PageHero>

      <section className="law-finder__panel" aria-label="Buscar lei">
        <label htmlFor="law-search" className="law-finder__label">
          Digite o número, o nome ou o assunto da lei
        </label>
        <div className="law-finder__search">
          <Search aria-hidden="true" size={22} />
          <input
            id="law-search"
            ref={input}
            type="search"
            inputMode="search"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex.: 11.343 · Maria da Penha · armas · LEP"
            aria-describedby="law-search-help"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Limpar a busca">
              <X aria-hidden="true" size={18} />
            </button>
          )}
          <kbd aria-hidden="true">/</kbd>
        </div>
        <p id="law-search-help" className="law-finder__help">
          Aceita número com ou sem pontos (11.343 ou 11343), com ano (11343/2006), siglas e termos
          do dia a dia, sem se preocupar com acentos.
        </p>
        <div className="law-finder__examples" aria-label="Exemplos de busca">
          <span>Experimente:</span>
          {EXAMPLES.map((example) => (
            <button key={example} type="button" onClick={() => setQuery(example)}>
              {example}
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Filtrar por tema" className="law-finder__themes">
        <button type="button" aria-pressed={theme === "all"} onClick={() => setTheme("all")}>
          Todas <b>{LAW_ROWS.length}</b>
        </button>
        {LAW_THEMES.map((item) => {
          const count = lawsByTheme(LAW_ROWS, item.id).length;
          if (!count) return null;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={theme === item.id}
              onClick={() => setTheme(theme === item.id ? "all" : item.id)}
            >
              {item.label} <b>{count}</b>
            </button>
          );
        })}
      </section>

      <div className="law-finder__bar">
        <p role="status" aria-live="polite">
          <strong>{sorted.length}</strong>{" "}
          {sorted.length === 1 ? "lei encontrada" : "leis encontradas"}
          {searching ? ` para “${query.trim()}”` : ""}
        </p>
        <label>
          Ordenar
          <select value={sort} onChange={(event) => setSort(event.target.value as LawSort)}>
            {SORTS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {sorted.length > 0 ? (
        <ul className="law-finder__list">
          {sorted.map((row) => (
            <LawCard
              key={row.slug}
              row={row}
              query={query}
              reason={searching ? reasonOf(row.slug) : undefined}
            />
          ))}
        </ul>
      ) : (
        <div className="law-finder__empty" role="status">
          <SearchX aria-hidden="true" size={30} />
          <h2>Nenhuma lei encontrada</h2>
          <p>
            Confira o número ou tente o nome popular (por exemplo, “drogas” ou “Maria da Penha”). A
            lei pode ainda não estar publicada na biblioteca.
          </p>
          <div className="law-finder__empty-actions">
            <Button variant="outline" onClick={reset}>
              Limpar a busca
            </Button>
            {searching && (
              <Button asChild>
                <Link to="/dashboard/library" search={{ collection: "laws", q: query.trim() }}>
                  <Library className="mr-2 h-4 w-4" aria-hidden="true" /> Pesquisar nos textos das
                  leis
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}

      <p className="law-finder__source">
        <ExternalLink aria-hidden="true" size={14} /> Os textos seguem as versões compiladas
        oficiais (Planalto). Dentro de cada lei você acessa a fonte.
      </p>
    </div>
  );
}
