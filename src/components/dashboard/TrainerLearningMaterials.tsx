import * as React from "react";
import { Link } from "@tanstack/react-router";
import { BookOpenCheck, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudyMaterial, type StudyMaterialSummary } from "@/lib/studyMaterials";

export function TrainerLearningMaterials({
  materials,
  loading,
  error,
}: {
  materials: StudyMaterialSummary[];
  loading: boolean;
  error: boolean;
}) {
  const [selected, setSelected] = React.useState(materials[0]?.slug ?? "");
  const chosen = materials.find((item) => item.slug === selected) ?? materials[0];
  const detail = useStudyMaterial(chosen?.slug ?? "", !!chosen);
  return (
    <section
      className="space-y-3 rounded-xl border border-sky-200 bg-sky-50/60 p-4 dark:border-sky-800 dark:bg-sky-950/20"
      aria-label="Revisão na biblioteca"
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold text-sky-900 dark:text-sky-200">
        <BookOpenCheck className="h-4 w-4" /> Aprofunde na biblioteca
      </h3>
      {loading ? (
        <p role="status" className="text-sm text-muted-foreground">
          Buscando materiais relacionados…
        </p>
      ) : error ? (
        <p role="status" className="text-sm text-muted-foreground">
          Não foi possível consultar a biblioteca. Feche e abra a revisão para tentar novamente.
        </p>
      ) : !chosen ? (
        <p className="text-sm text-muted-foreground">
          Ainda não encontramos um material diretamente relacionado a este assunto. Use o comentário
          e as fontes da questão para revisar.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {materials.map((item) => (
              <Button
                key={item.slug}
                variant={chosen.slug === item.slug ? "secondary" : "outline"}
                className="h-auto max-w-full whitespace-normal text-left text-xs"
                aria-pressed={chosen.slug === item.slug}
                onClick={() => setSelected(item.slug)}
              >
                {item.title}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {chosen.discipline} · {chosen.topic_label}
          </p>
          {chosen.summary && <p className="text-sm leading-6">{chosen.summary}</p>}
          <Link
            to="/dashboard/library/$slug"
            params={{ slug: chosen.slug }}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
          >
            Estudar o material completo <ExternalLink className="h-3.5 w-3.5" />
            <span className="sr-only"> (abre em outra aba)</span>
          </Link>
          {detail.isLoading ? (
            <p role="status" className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Carregando exercícios de fixação…
            </p>
          ) : detail.isError ? (
            <p className="text-xs text-muted-foreground">
              Os exercícios não carregaram.{" "}
              <button className="underline" onClick={() => void detail.refetch()}>
                Tentar novamente
              </button>
            </p>
          ) : (
            <>
              {!!detail.data?.flashcards?.length && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-sky-800 dark:text-sky-200">
                    Fixe com flashcards do material
                  </h4>
                  {detail.data.flashcards.slice(0, 3).map((card, index) => (
                    <details
                      key={`${chosen.slug}-${index}`}
                      className="rounded-lg border border-violet-200 bg-violet-50 p-3 text-sm dark:border-violet-800 dark:bg-violet-950/30"
                    >
                      <summary className="cursor-pointer font-medium">{card.f}</summary>
                      <p className="mt-3 border-t border-violet-200 pt-3 leading-6 dark:border-violet-800">
                        {card.b}
                      </p>
                    </details>
                  ))}
                  <p className="text-xs text-muted-foreground">
                    Abra o material completo para acessar todos os flashcards e exercícios
                    disponíveis.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
