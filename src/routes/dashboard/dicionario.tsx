import React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookA, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { GLOSSARY, normalize, searchGlossary } from "@/lib/glossary";

export const Route = createFileRoute("/dashboard/dicionario")({
  component: DictionaryPage,
  validateSearch: (s: Record<string, unknown>): { q?: string | undefined } => ({ q: typeof s["q"] === "string" ? s["q"] : undefined }),
  head: () => ({ meta: [{ title: "Dicionário de estudo | Norte Concursos" }] }),
});

const AREAS = ["Direito", "Português", "Contabilidade", "Informática", "Estatística", "Raciocínio lógico"];

function DictionaryPage() {
  const { q = "" } = Route.useSearch();
  const navigate = useNavigate({ from: "/dashboard/dicionario" });
  const [area, setArea] = React.useState<string>("");
  const items = React.useMemo(() => searchGlossary(q, area || undefined), [q, area]);
  const letters = React.useMemo(() => [...new Set(items.map((e) => normalize(e.term)[0]!.toUpperCase()))], [items]);
  return (
    <div className="space-y-6">
      <PageHero image="study-desk" kicker="Material didático" icon={BookA} title="Dicionário de estudo" description="Significado, sinônimos e exemplo dos termos que aparecem nas leis e nas matérias. Nos textos de estudo, passe o mouse (ou toque) nos termos sublinhados.">
        <div className="page-hero__stats">
          <HeroStat icon={BookA} label="Termos encontrados" value={items.length} />
          <HeroStat icon={Search} label="Letras" value={letters.length} />
        </div>
      </PageHero>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => void navigate({ search: { q: e.target.value || undefined }, replace: true })} placeholder="Buscar termo, sinônimo ou parte do significado" className="pl-9" aria-label="Buscar no dicionário" />
        </div>
        <select value={area} onChange={(e) => setArea(e.target.value)} className="rounded-md border bg-background px-3 py-2 text-sm" aria-label="Filtrar por área">
          <option value="">Todas as áreas</option>
          {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      <p className="text-sm text-muted-foreground">{items.length} de {GLOSSARY.length} verbetes</p>
      <div className="flex flex-wrap gap-1.5" aria-label="Ir para a letra">
        {letters.map((l) => <a key={l} href={`#letra-${l}`} className="rounded-md border px-2 py-1 text-xs font-semibold hover:bg-muted">{l}</a>)}
      </div>
      <div className="space-y-2">
        {items.map((e, i) => {
          const L = normalize(e.term)[0]!.toUpperCase();
          const first = i === 0 || normalize(items[i - 1]!.term)[0]!.toUpperCase() !== L;
          return (
            <React.Fragment key={e.term}>
              {first && <h2 id={`letra-${L}`} className="pt-3 text-lg font-bold text-primary">{L}</h2>}
              <Card><CardContent className="space-y-1 p-4">
                <div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{e.term}</h3>{e.area && <Badge variant="secondary">{e.area}</Badge>}</div>
                <p className="text-sm leading-6">{e.meaning}</p>
                {e.synonyms?.length ? <p className="text-xs"><strong>Também: </strong>{e.synonyms.join(", ")}</p> : null}
                {e.example ? <p className="text-xs italic text-muted-foreground">Ex.: {e.example}</p> : null}
              </CardContent></Card>
            </React.Fragment>
          );
        })}
        {!items.length && <p className="text-sm text-muted-foreground">Nenhum verbete encontrado.</p>}
      </div>
    </div>
  );
}
