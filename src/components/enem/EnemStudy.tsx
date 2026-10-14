import { Link } from "@tanstack/react-router";
import { BookOpenCheck, ArrowRight } from "lucide-react";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { Button } from "@/components/ui/button";

const documents =
  "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/outros-documentos";
export function EnemStudy() {
  const materials = useStudyMaterialList(true);
  const items = (materials.data ?? []).filter((m) => m.contest_name === "ENEM");
  const disciplines = [...new Set(items.map((m) => m.discipline))];
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
      {disciplines.map((d) => (
        <section key={d} className="space-y-3">
          <h3 className="border-l-4 border-sky-500 pl-3 text-lg font-bold">{d}</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {items
              .filter((m) => m.discipline === d)
              .map((m) => (
                <article key={m.id} className="rounded-xl border bg-card p-4">
                  <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
                    {m.topic_label}
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
      ))}
    </section>
  );
}
