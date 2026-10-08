import { Link } from "@tanstack/react-router";
import { ExternalLink, History } from "lucide-react";
import { isStudySourceUrl } from "@/lib/studySourceUrl";
import { CURATED_LEGAL_UPDATES } from "@/lib/legalUpdates";

export type LegalReview = {
  checked_at: string;
  scope: string;
  course_slug?: string | null | undefined;
  corrections: string[];
  sources: { title: string; url: string; sha256?: string }[];
  changes: {
    title: string;
    url: string;
    articles: string[];
    summary: string;
    vigency: string;
    state: "effective" | "future" | "reference" | "expired";
  }[];
};

const STATE_LABEL = {
  effective: "Em vigor",
  future: "Vigência futura",
  reference: "Conferir no caso concreto",
  expired: "Vigência encerrada",
} as const;

function UpdateRow({
  title,
  badge,
  what,
  where,
  since,
  url,
}: {
  title: string;
  badge?: string | undefined;
  what: string;
  where?: string | undefined;
  since?: string | undefined;
  url?: string | undefined;
}) {
  return (
    <li className="rounded-lg border p-3 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <strong>{title}</strong>
        {badge && <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{badge}</span>}
      </div>
      <dl className="mt-2 grid gap-1 sm:grid-cols-[7rem_1fr]">
        <dt className="text-muted-foreground">O que mudou</dt>
        <dd>{what}</dd>
        {where && (
          <>
            <dt className="text-muted-foreground">Onde</dt>
            <dd>{where}</dd>
          </>
        )}
        {since && (
          <>
            <dt className="text-muted-foreground">Desde</dt>
            <dd>{since}</dd>
          </>
        )}
      </dl>
      {url && isStudySourceUrl(url) && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs underline"
        >
          Texto oficial <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </li>
  );
}

export function LegalUpdateNotice({
  review,
  slug,
}: {
  review?: LegalReview | null | undefined;
  slug?: string | undefined;
}) {
  const curated = slug ? (CURATED_LEGAL_UPDATES[slug] ?? []) : [];
  if (!review && !curated.length) return null;
  const date = review
    ? new Date(review.checked_at).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" })
    : null;
  const others = review?.changes ?? [];
  const total = curated.length || others.length;
  return (
    <details className="surface-card p-4 sm:p-5" aria-label="Atualização legislativa">
      <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 font-semibold">
        <span className="inline-flex items-center gap-2">
          <History className="h-4 w-4" /> Atualizações da lei
        </span>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {total} {total === 1 ? "mudança" : "mudanças"}
        </span>
        {date && (
          <span className="text-xs font-normal text-muted-foreground">conferida em {date}</span>
        )}
      </summary>
      <div className="mt-4 space-y-4">
        {!!curated.length && (
          <ul className="space-y-3">
            {curated.map((item) => (
              <UpdateRow
                key={item.title}
                title={item.title}
                badge="Em vigor"
                what={item.what}
                where={item.where}
                since={item.since}
                url={item.url}
              />
            ))}
          </ul>
        )}
        {!!others.length &&
          (curated.length ? (
            <details>
              <summary className="cursor-pointer text-sm font-medium">
                Outras alterações registradas na conferência ({others.length})
              </summary>
              <ul className="mt-3 space-y-3">
                {others.map((change, index) => (
                  <UpdateRow
                    key={`${change.url}-${index}`}
                    title={change.title}
                    badge={STATE_LABEL[change.state]}
                    what={change.summary}
                    where={change.articles.join(", ")}
                    since={change.vigency}
                    url={change.url}
                  />
                ))}
              </ul>
            </details>
          ) : (
            <ul className="space-y-3">
              {others.map((change, index) => (
                <UpdateRow
                  key={`${change.url}-${index}`}
                  title={change.title}
                  badge={STATE_LABEL[change.state]}
                  what={change.summary}
                  where={change.articles.join(", ")}
                  since={change.vigency}
                  url={change.url}
                />
              ))}
            </ul>
          ))}
        {review && (
          <details>
            <summary className="cursor-pointer text-sm font-medium">Sobre esta conferência</summary>
            <div className="mt-3 space-y-3 text-sm">
              <p className="text-muted-foreground">{review.scope}</p>
              {!!review.corrections.length && (
                <div>
                  <p className="font-medium">O que foi corrigido neste material</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {review.corrections.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="font-medium">Fontes oficiais</p>
                <ul className="mt-1 space-y-1">
                  {review.sources.map((source) => (
                    <li key={source.url}>
                      {isStudySourceUrl(source.url) ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 underline"
                        >
                          {source.title} <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        source.title
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-muted-foreground">
                A data de corte do seu edital pode ser diferente da data desta conferência.
              </p>
            </div>
          </details>
        )}
        {review?.course_slug && (
          <Link
            to="/dashboard/legal-course/$slug"
            params={{ slug: review.course_slug }}
            className="inline-flex items-center gap-1 text-sm font-medium underline"
          >
            Abrir leitura dos dispositivos da lei
          </Link>
        )}
      </div>
    </details>
  );
}
