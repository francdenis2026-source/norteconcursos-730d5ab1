import { useState } from "react";
import { StudyText } from "./StudyText";
import { LearningIllustration } from "./LearningIllustrations";
import { useStudyEnrichment, type StudyEnrichment, type WorkedCase } from "@/lib/studyEnrichment";
import { isStudySourceUrl } from "@/lib/studySourceUrl";

export function WorkedExamples({
  slug,
  enabled,
  articleLabel,
  languageStudy = false,
}: {
  slug: string;
  enabled: boolean;
  articleLabel?: string;
  languageStudy?: boolean;
}) {
  const query = useStudyEnrichment(slug, enabled);
  if (query.isPending)
    return (
      <p role="status" className="text-sm text-muted-foreground">
        Carregando exemplos e ilustrações…
      </p>
    );
  if (query.isError)
    return (
      <p role="alert" className="text-sm">
        Não foi possível carregar os exemplos.{" "}
        <button className="underline" onClick={() => void query.refetch()}>
          Tentar novamente
        </button>
      </p>
    );
  if (!query.data) return null;
  const cases = articleLabel
    ? query.data.content.cases.filter((c) => c.articles.includes(articleLabel))
    : query.data.content.cases;
  if (!cases.length) return null;
  return (
    <WorkedExampleContent
      languageStudy={languageStudy}
      enrichment={{
        ...query.data,
        content: {
          ...query.data.content,
          cases,
          illustrations: articleLabel ? [] : query.data.content.illustrations,
        },
      }}
    />
  );
}
export function WorkedExampleContent({
  enrichment,
  languageStudy = false,
}: {
  enrichment: StudyEnrichment;
  languageStudy?: boolean;
}) {
  return (
    <section
      className="surface-card worked-examples"
      aria-label="Exemplos resolvidos e ilustrações"
    >
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Entenda na prática
        </p>
        <h2 className="mt-2 text-2xl font-bold">
          {languageStudy ? "Entenda a frase, passo a passo" : "Do conceito ao caso concreto"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Leia o caso, identifique a regra e abra a resolução para conferir o raciocínio.
        </p>
      </header>
      {enrichment.content.illustrations.map((illustration, i) => (
        <LearningIllustration key={i} illustration={illustration} />
      ))}
      {enrichment.content.cases.map((example) => (
        <WorkedCaseCard key={example.id} example={example} languageStudy={languageStudy} />
      ))}
      {enrichment.sources.length > 0 && (
        <aside className="text-sm">
          <h3 className="font-semibold">Fontes destes exemplos</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Casos fictícios para estudo; a conclusão depende dos fatos e requisitos indicados.
          </p>
          <ul className="mt-2 space-y-2">
            {enrichment.sources
              .filter((s) => isStudySourceUrl(s.url))
              .map((source) => (
                <li key={source.url}>
                  <a
                    className="underline"
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
          </ul>
        </aside>
      )}
    </section>
  );
}
function WorkedCaseCard({
  example,
  languageStudy = false,
}: {
  example: WorkedCase;
  languageStudy?: boolean;
}) {
  return (
    <article className="worked-case">
      <span className="worked-case-badge">
        {languageStudy ? "Exemplo comentado" : "Exemplo aplicado"}
      </span>
      <h3 className="text-lg font-bold">{example.title}</h3>
      <p className="mt-3 leading-7"><StudyText text={example.scenario} /></p>
      <p className="mt-3 font-semibold"><StudyText text={example.question} /></p>
      <details className="worked-resolution mt-4">
        <summary className="cursor-pointer font-semibold text-primary">Abrir explicação</summary>
        <ol className="mt-3 list-decimal space-y-3 pl-5">
          {example.steps.map((step, i) => <li key={i} className="leading-7"><StudyText text={step} /></li>)}
        </ol>
        <p className="worked-result mt-4"><strong>Conclusão: </strong><StudyText text={example.conclusion} /></p>
        {example.articles.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            {languageStudy ? "Conceitos relacionados" : "Dispositivos relevantes"}: {example.articles.join("; ")}.
          </p>
        )}
        <p className="worked-pitfall mt-4 text-sm leading-6"><strong>Erro comum: </strong><StudyText text={example.pitfall} /></p>
        <div className="worked-variation mt-4 rounded-lg border p-3">
          <h4 className="font-semibold">E se o caso mudar?</h4>
          <p className="mt-2 text-sm leading-6"><StudyText text={example.variation.scenario} /></p>
          <p className="mt-2 text-sm leading-6"><strong>Resposta: </strong><StudyText text={example.variation.answer} /></p>
        </div>
      </details>
    </article>
  );
}
