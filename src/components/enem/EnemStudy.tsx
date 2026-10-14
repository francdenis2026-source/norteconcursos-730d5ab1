import { useState } from "react";
import { ENEM_STUDY_GROUPS, matchesEnemMaterial } from "@/lib/enemStudy";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { BookOpenCheck, ArrowRight } from "lucide-react";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { Button } from "@/components/ui/button";

const documents =
  "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/outros-documentos";
export function EnemStudy() {
  const materials = useStudyMaterialList(true);
  const items = (materials.data ?? []).filter((m) => m.contest_name === "ENEM");
  const [area, setArea] = useState("all");
  const [search, setSearch] = useState("");
  const visible = items.filter((m) => matchesEnemMaterial(m, area, search));
  return (
    <section className="space-y-5" aria-label="Materiais de estudo do ENEM">
      <div className="rounded-2xl border bg-gradient-to-br from-sky-500/10 to-violet-500/10 p-5">
        <BookOpenCheck className="h-7 w-7 text-sky-600 dark:text-sky-400" />
        <h2 className="mt-3 text-xl font-bold">Entenda, aplique e revise</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Guias organizados por disciplina, com exemplos resolvidos, flashcards e perguntas de
          fixação. Comece pelo conceito, tente resolver o exemplo e revise os erros no treinador.
        </p>
        <a
          href={documents}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold underline"
        >
          Matriz de referência e cartilha de redação do Inep
        </a>
      </div>
      {materials.isPending && <p role="status">Carregando materiais…</p>}
      {materials.isError && (
        <div role="alert">
          Não foi possível carregar a biblioteca.{" "}
          <Button variant="outline" onClick={() => void materials.refetch()}>
            Tentar novamente
          </Button>
        </div>
      )}
      {!materials.isPending && !materials.isError && !items.length && (
        <p>Os materiais do ENEM ainda não foram publicados.</p>
      )}
      <div className="space-y-3">
        <label htmlFor="enem-material-search" className="text-sm font-semibold">
          Buscar material do ENEM
        </label>
        <Input
          id="enem-material-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Disciplina ou assunto, como genética, interpretação ou redação"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant={area === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setArea("all")}
            aria-pressed={area === "all"}
          >
            Todos · {items.length}
          </Button>
          {ENEM_STUDY_GROUPS.map((g) => (
            <Button
              key={g.id}
              size="sm"
              variant={area === g.id ? "default" : "outline"}
              onClick={() => setArea(g.id)}
              aria-pressed={area === g.id}
            >
              {g.name}
            </Button>
          ))}
        </div>
        <p role="status" className="text-xs text-muted-foreground">
          {visible.length} materiais encontrados
        </p>
      </div>
      {!materials.isPending && !materials.isError && items.length > 0 && !visible.length && (
        <p>Nenhum material corresponde à busca. Tente outro assunto ou selecione Todos.</p>
      )}
      {ENEM_STUDY_GROUPS.filter((g) => visible.some((m) => g.subjects.includes(m.discipline))).map(
        (g) => (
          <section key={g.id} className="space-y-3">
            <h3 className={`border-l-4 pl-3 text-lg font-bold ${g.color}`}>{g.name}</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {visible
                .filter((m) => g.subjects.includes(m.discipline))
                .map((m) => (
                  <article key={m.id} className="rounded-xl border bg-card p-4">
                    <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
                      {m.discipline} · {m.topic_label}
                    </p>
                    <h4 className="mt-1 font-bold">{m.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{m.summary}</p>
                    <Button asChild variant="outline" className="mt-3">
                      <Link to="/dashboard/library/$slug" params={{ slug: m.slug }}>
                        Estudar material <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </article>
                ))}
            </div>
          </section>
        ),
      )}
    </section>
  );
}
