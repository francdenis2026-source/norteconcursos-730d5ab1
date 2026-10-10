import { useEffect, useMemo } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Clock3,
  ExternalLink,
  Library,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { LockedState } from "@/components/dashboard/PageHero";
import { LibraryVideos } from "@/components/library/LibraryVideos";
import { Markdown } from "@/components/library/Markdown";
import { LegalStudyReading } from "@/components/library/LegalStudyReading";
import { LawPracticeLink } from "@/components/library/LawPracticeLink";
import { materialLawSlug } from "@/lib/legalLibrary";
import { StudyPractice } from "@/components/library/StudyPractice";
import { WorkedExamples } from "@/components/library/WorkedExamples";
import { LegalUpdateNotice } from "@/components/library/LegalUpdateNotice";
import { Button } from "@/components/ui/button";
import { BackToPlan } from "@/components/cronograma/BackToPlan";
import { Skeleton } from "@/components/ui/skeleton";
import { isStudySourceUrl } from "@/lib/studySourceUrl";
import { useMediaCatalog } from "@/lib/mediaStore";
import { relatedVideos } from "@/lib/relatedVideos";
import {
  markSlugRead,
  readingMinutes,
  useStudyMaterial,
  useStudyMaterialList,
} from "@/lib/studyMaterials";

export const Route = createFileRoute("/dashboard/library/$slug")({
  component: MaterialPage,
  validateSearch: (s: Record<string, unknown>): { back?: string | undefined; tema?: string | undefined } => ({
    back: typeof s["back"] === "string" ? s["back"] : undefined,
    tema: typeof s["tema"] === "string" ? s["tema"] : undefined,
  }),
});

function MaterialPage() {
  const { slug } = useParams({ from: "/dashboard/library/$slug" });
  const { back: backToPlan, tema } = Route.useSearch();
  const { user, isLoading: authLoading } = useAuthStatus();
  const signedIn = !!user && user.id !== "demo-user";
  const { data: material, isPending, isError } = useStudyMaterial(slug, signedIn);
  const { data: list } = useStudyMaterialList(signedIn);
  const { catalog } = useMediaCatalog();

  useEffect(() => {
    if (material) markSlugRead(material.slug);
  }, [material]);

  const videos = useMemo(() => {
    if (!material) return [];
    return relatedVideos(catalog, material.discipline, material.topic_label ?? material.title);
  }, [catalog, material]);

  const siblings = useMemo(() => {
    if (!material || !list) return { prev: null, next: null };
    const same = list.filter((item) => item.discipline === material.discipline);
    const index = same.findIndex((item) => item.slug === material.slug);
    return {
      prev: index > 0 ? (same[index - 1] ?? null) : null,
      next: index >= 0 && index < same.length - 1 ? (same[index + 1] ?? null) : null,
    };
  }, [material, list]);

  if (!authLoading && !signedIn) {
    return (
      <LockedState
        image="study-desk"
        title={
          <>
            Material de <em>estudo</em>
          </>
        }
        description="Entre na sua conta para ler este material."
      />
    );
  }

  const back = (
    <Link to="/dashboard/library" className="library-back">
      <ArrowLeft /> Biblioteca de estudo
    </Link>
  );

  if (isPending && signedIn) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        {back}
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (isError || !material) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        {back}
        <div className="surface-card library-empty">
          <span className="metric-tile__icon h-12 w-12 rounded-2xl">
            <Library />
          </span>
          <div>
            <p className="font-semibold">Material não encontrado</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
              Ele pode ter sido despublicado ou ainda estar em revisão.
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/library">Ver a biblioteca</Link>
          </Button>
        </div>
      </div>
    );
  }

  const sources = (material.legal_basis ?? []).filter((item) => item.title || item.url);

  return (
    <article className="mx-auto max-w-3xl space-y-6 pb-10">
      <BackToPlan back={backToPlan} topic={tema} />
      {back}

      <header className="library-header">
        <span className="hero-chip">
          <ScrollText /> {material.discipline}
        </span>
        <h1>{material.title}</h1>
        {material.summary && <p>{material.summary}</p>}
        <ul className="library-meta">
          <li>{material.topic_label}</li>
          <li>
            <Clock3 /> {readingMinutes(material.body_md)} min de leitura
          </li>
          {material.law_version_checked_at && (
            <li>
              <ShieldCheck /> Fontes conferidas em{" "}
              {new Date(material.law_version_checked_at).toLocaleDateString("pt-BR")}
            </li>
          )}
        </ul>
      </header>

      <LegalUpdateNotice review={material.legal_review} slug={material.slug} />

      <div className="surface-card library-body">
        {materialLawSlug(material) || material.legal_review ? <LegalStudyReading source={material.body_md} markdown /> : <Markdown source={material.body_md} />}
      </div>

      <WorkedExamples
        key={`${user?.id}:${material.slug}`}
        slug={material.slug}
        enabled={signedIn}
      />

      <LibraryVideos videos={videos} />

      {(sources.length > 0 || material.source_note) && (
        <aside className="surface-card library-sources" aria-label="Fontes">
          <h2>Fontes e transparência</h2>
          <p>{material.source_note}</p>
          {sources.length > 0 && (
            <ul>
              {sources.map((source, index) => (
                <li key={`${source.url ?? source.title}-${index}`}>
                  {source.url && isStudySourceUrl(source.url) ? (
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title || source.url} <ExternalLink />
                    </a>
                  ) : (
                    <span>{source.title}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </aside>
      )}

      <StudyPractice
        flashcards={material.flashcards ?? []}
        quiz={material.quiz ?? []}
        slug={material.slug}
        subject={material.discipline}
        topic={material.topic_label ?? material.title}
      />

      {materialLawSlug(material) ? <LawPracticeLink law={materialLawSlug(material)!} userId={user!.id} /> : <div className="library-cta no-print">
        <div>
          <strong>Hora de fixar</strong>
          <span>Resolva questões de {material.discipline} para testar o que acabou de ler.</span>
        </div>
        <Button asChild className="hero-btn-primary gap-2">
          <Link
            to="/dashboard/question-trainer"
            search={{ subject: material.discipline, go: "1", reinforce: "1" }}
          >
            <BrainCircuit className="h-4 w-4" /> Treinar questões
          </Link>
        </Button>
      </div>}

      <nav className="library-pager no-print" aria-label="Outros materiais da matéria">
        {siblings.prev ? (
          <Link to="/dashboard/library/$slug" params={{ slug: siblings.prev.slug }}>
            <span>
              <ArrowLeft /> Anterior
            </span>
            <strong>{siblings.prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {siblings.next ? (
          <Link
            to="/dashboard/library/$slug"
            params={{ slug: siblings.next.slug }}
            className="is-next"
          >
            <span>
              Próximo <ArrowRight />
            </span>
            <strong>{siblings.next.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
