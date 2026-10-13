import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, CornerDownRight } from "lucide-react";
import { useContentSearch, type ContentHit } from "@/lib/contentSearch";
import { searchGlossary } from "@/lib/glossary";
import { legalArticleSearchKey } from "@/lib/legalCourseSearch";
import { normalizeLibrarySearch } from "@/lib/librarySearch";
import { compareLawChronology } from "@/lib/legalChronology";
import { LibrarySearchMatch } from "./LibrarySearchMatch";

type SearchResult = {data?: ContentHit[] | undefined; isFetching: boolean; isError: boolean; refetch: () => unknown};
export function ContentSearchResults({ query, userId, hideEmpty = false, result }: { query: string; userId: string; hideEmpty?: boolean; result?: SearchResult }) {
  const own = useContentSearch(query, result ? undefined : userId);
  const { data, isFetching, isError, refetch } = result ?? own;
  if (normalizeLibrarySearch(query).length < 2 && !legalArticleSearchKey(query)) return null;
  if (hideEmpty && data?.length === 0 && !isFetching && !isError) return null;
  const groups = [...new Set((data ?? []).map(hit => hit.slug))].map(slug => {
    const hits = data!.filter(hit => hit.slug === slug);
    return {slug, title: hits[0]!.lawTitle, hits};
  }).sort(compareLawChronology);
  const terms = query.trim().length >= 3 ? searchGlossary(query).slice(0, 3) : [];
  return <section className="surface-card space-y-3 p-4" aria-label="Resultados nos artigos">
    <header className="flex flex-wrap items-center justify-between gap-2">
      <h2 className="text-sm font-semibold">Onde “{query.trim()}” aparece nas leis da seleção</h2>
      {isFetching ? <span role="status" className="text-xs text-muted-foreground">Buscando em todas as leis da seleção…</span>
        : !isError && data && <span className="text-xs text-muted-foreground">{groups.length} {groups.length === 1 ? "lei encontrada" : "leis encontradas"} · {data.length} artigos</span>}
    </header>
    {isError && <p role="alert" className="text-sm">Não foi possível completar a busca nos artigos. <button type="button" className="underline" onClick={() => void refetch()}>Tentar novamente</button></p>}
    {data?.length === 0 && !isFetching && !isError && <p className="text-sm text-muted-foreground">Nenhum artigo encontrado nesta seleção. Tente outro termo ou limpe os filtros.</p>}
    {groups.map(group => <details key={`${query}:${group.slug}`} open={groups.length === 1} className="rounded-xl border p-3">
      <summary className="cursor-pointer text-sm font-semibold">{group.title}<span className="ml-2 font-normal text-muted-foreground">{group.hits.length} artigos</span></summary>
      <LawArticleResults hits={group.hits} query={query} />
    </details>)}
    {terms.length > 0 && <p className="text-xs text-muted-foreground">Significado: {terms.map((t, i) => <span key={t.term}>{i > 0 && " · "}<Link to="/dashboard/dicionario" search={{ q: t.term } as never} className="underline">{t.term}</Link></span>)}</p>}
  </section>;
}
function LawArticleResults({hits, query}: {hits: ContentHit[]; query: string}) {
  const [count, setCount] = useState(5);
  return <><ul className="divide-y">{hits.slice(0, count).map(h => <li key={h.key}>
    <Link to="/dashboard/legal-course/$slug" params={{slug:h.slug}} search={{art:h.unitKey,find:query.trim()} as never} className="flex gap-3 py-2.5 hover:bg-muted/50">
      <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
      <span className="min-w-0 flex-1"><strong className="block text-sm">{h.label}</strong>
        <span className="block truncate text-xs text-muted-foreground">Assunto: {h.chapter || "—"} · {h.via === "texto" ? "Texto oficial" : "Explicação ou exemplo"}</span>
        <span className="mt-0.5 block text-xs leading-5"><LibrarySearchMatch text={h.snippet} query={query} /></span>
      </span><span className="hidden shrink-0 self-center text-xs font-medium text-primary sm:block">Abrir <CornerDownRight className="inline h-3 w-3" aria-hidden /></span>
    </Link>
  </li>)}</ul>{count < hits.length && <button type="button" className="mt-2 text-sm underline" onClick={() => setCount(value => value + 20)}>Mostrar mais artigos ({hits.length-count} restantes)</button>}</>;
}
