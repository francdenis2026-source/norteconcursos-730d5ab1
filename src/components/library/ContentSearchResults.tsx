import { Link } from "@tanstack/react-router";
import { BookOpen, CornerDownRight } from "lucide-react";
import { useContentSearch } from "@/lib/contentSearch";
import { searchGlossary } from "@/lib/glossary";

/** Resultados da busca dentro das leis: mostra a lei (matéria), o capítulo (assunto) e o artigo, e abre direto no ponto certo. */
export function ContentSearchResults({ query, userId }: { query: string; userId: string }) {
  const { data, isFetching, isError } = useContentSearch(query, userId);
  const terms = query.trim().length >= 3 ? searchGlossary(query).slice(0, 3) : [];
  if (query.trim().length < 3) return null;
  return (
    <section className="surface-card space-y-3 p-4" aria-label="Resultados nos artigos">
      <header className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Direto ao ponto: onde “{query.trim()}” aparece</h2>
        {isFetching && <span className="text-xs text-muted-foreground">Buscando…</span>}
      </header>
      {isError && <p className="text-sm text-muted-foreground">A busca nos artigos não carregou agora. Os guias abaixo continuam disponíveis.</p>}
      {data && data.length === 0 && !isFetching && <p className="text-sm text-muted-foreground">Nenhum artigo encontrado. Tente outra palavra, ou o número do artigo (ex.: art. 33).</p>}
      <ul className="divide-y">
        {(data ?? []).map((h) => (
          <li key={h.key}>
            <Link to="/dashboard/legal-course/$slug" params={{ slug: h.slug }} search={{ art: h.unitKey } as never} className="flex gap-3 py-2.5 hover:bg-muted/50">
              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-sm"><strong>{h.label}</strong><span className="text-muted-foreground"> · {h.lawTitle}</span></span>
                <span className="block truncate text-xs text-muted-foreground">Assunto: {h.chapter || "—"}</span>
                <span className="mt-0.5 block text-xs leading-5">{h.snippet}</span>
              </span>
              <span className="hidden shrink-0 self-center text-xs font-medium text-primary sm:block">Abrir <CornerDownRight className="inline h-3 w-3" aria-hidden /></span>
            </Link>
          </li>
        ))}
      </ul>
      {terms.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Significado: {terms.map((t, i) => <span key={t.term}>{i > 0 && " · "}<Link to="/dashboard/dicionario" search={{ q: t.term } as never} className="underline">{t.term}</Link></span>)}
        </p>
      )}
    </section>
  );
}
