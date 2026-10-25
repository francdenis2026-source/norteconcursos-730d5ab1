import { PortugueseStudyReading } from "@/components/library/PortugueseStudyReading";
import { MaterialStudyTabs } from "@/components/library/MaterialStudyTabs";
import { MaterialPractice } from "@/components/library/MaterialPractice";
import { materialPracticeSearch, materialTopic } from "@/lib/materialPractice";
import { LibraryDailyGate } from "@/components/dashboard/LibraryDailyGate";
import { useEffect, useMemo } from "react";
import { createFileRoute, useNavigate, Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
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
import { materialLawSlug } from "@/lib/legalLibrary";
import { StudyPractice } from "@/components/library/StudyPractice";
import { WorkedExamples } from "@/components/library/WorkedExamples";
import { HighlightToggle } from "@/components/library/StudyText";
import { useFocusMode } from "@/hooks/useFocusMode";
import { toolsAreaFor } from "@/components/study/StudyTools";
import { LegalUpdateNotice } from "@/components/library/LegalUpdateNotice";
import { Button } from "@/components/ui/button";
import { BackToPlan } from "@/components/cronograma/BackToPlan";
import { Skeleton } from "@/components/ui/skeleton";
import { isStudySourceUrl } from "@/lib/studySourceUrl";
import { useMediaCatalog } from "@/lib/mediaStore";
import { libraryCollection } from "@/lib/libraryOrganization";
import { relatedVideos } from "@/lib/relatedVideos";
import {
  markSlugRead,
  readingMinutes,
  useStudyMaterial,
  useStudyMaterialList,
} from "@/lib/studyMaterials";

export const Route = createFileRoute("/dashboard/library/$slug")({
  component: MaterialPageGated,
  validateSearch: (
    s: Record<string, unknown>,
  ): { back?: string | undefined; tema?: string | undefined; edital?: string | undefined } => ({
    back: typeof s["back"] === "string" ? s["back"] : undefined,
    tema: typeof s["tema"] === "string" ? s["tema"] : undefined,
    edital: typeof s["edital"] === "string" ? s["edital"] : undefined,
  }),
});

function MaterialPageGated() {
  const { slug } = useParams({ from: "/dashboard/library/$slug" });
  return (
    <LibraryDailyGate slug={slug}>
      <MaterialPage />
    </LibraryDailyGate>
  );
}

function MaterialPage() {
  const fm = useFocusMode();
  const navigate = useNavigate();
  const { slug } = useParams({ from: "/dashboard/library/$slug" });
  const { back: backToPlan, tema, edital } = Route.useSearch();
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
    return relatedVideos(
      catalog,
      material.discipline,
      material.topic_label ?? material.title,
      4,
      libraryCollection(material) === "enem" ? "enem" : "general",
    );
  }, [catalog, material]);

  const siblings = useMemo(() => {
    if (!material || !list) return { prev: null, next: null };
    const same = list.filter(
      (item) =>
        item.discipline === material.discipline &&
        libraryCollection(item) === libraryCollection(material),
    );
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

  const back = edital ? (
    <Link to="/dashboard/edital/$topicId" params={{ topicId: edital }} className="library-back">
      <ArrowLeft /> Voltar ao assunto do edital
    </Link>
  ) : material && libraryCollection(material) === "enem" ? (
    <Link to="/dashboard/enem" search={{ tab: "materiais" }} className="library-back">
      <ArrowLeft /> Materiais do ENEM
    </Link>
  ) : (
    <Link
      to="/dashboard/library"
      search={{
        collection: material && libraryCollection(material) === "subjects" ? "subjects" : "laws",
      }}
      className="library-back"
    >
      <ArrowLeft />{" "}
      {material && libraryCollection(material) === "subjects"
        ? `Materiais · ${material?.discipline ?? "disciplina"}`
        : `Legislação · ${material?.discipline ?? "biblioteca"}`}
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
    <article className={`mx-auto max-w-3xl space-y-6 pb-10 ${fm.containerClass}`}>
      {fm.bar({
        kicker: material.discipline,
        title: material.title,
        onPrev: siblings.prev
          ? () =>
              void navigate({
                to: "/dashboard/library/$slug",
                params: { slug: siblings.prev!.slug },
              })
          : undefined,
        onNext: siblings.next
          ? () =>
              void navigate({
                to: "/dashboard/library/$slug",
                params: { slug: siblings.next!.slug },
              })
          : undefined,
        prevLabel: "Material anterior",
        nextLabel: "Próximo material",
        tools: toolsAreaFor(material.discipline),
        notesKey: `material:${material.slug}`,
        extra: (
          <Link
            to="/dashboard/question-trainer"
            search={
              {
                ...materialPracticeSearch({
                  subject: material.discipline,
                  topic: materialTopic(material.discipline, material.topic_label ?? material.title),
                  ...(materialLawSlug(material) ? { law: materialLawSlug(material)! } : {}),
                }),
                ...(libraryCollection(material) === "enem" ? { contest: "ENEM" } : {}),
              } as never
            }
            className="flex items-center gap-1 rounded-lg bg-emerald-400 px-3 py-2 text-sm font-bold text-emerald-950 hover:bg-emerald-300"
          >
            Questões
          </Link>
        ),
      })}
      {!fm.focus && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <BackToPlan back={backToPlan} topic={tema} />
            {back}
          </div>
          {fm.button}
        </div>
      )}

      <header className="library-header workspace-banner">
        <span className="hero-chip">
          <ScrollText /> {material.discipline}
        </span>
        <h1>{material.title}</h1>
        {material.summary && <p>{material.summary}</p>}
        <ul className="library-meta">
          <li><strong>Assunto:</strong> {material.topic_label}</li>
          <li>
            <Clock3 /> {readingMinutes(material.body_md)} min de leitura
          </li>
        </ul>
      </header>

      <LegalUpdateNotice review={material.legal_review} slug={material.slug} />
      <MaterialStudyTabs
        key={material.slug}
        text={
          <>
            <HighlightToggle
              legend={!!materialLawSlug(material) || /direito|legisla/i.test(material.discipline)}
            />
            {materialLawSlug(material) && (
              <Link
                to="/dashboard/legal-course/$slug"
                params={{ slug: materialLawSlug(material)! }}
                className="inline-flex min-h-11 items-center rounded-xl border px-3 text-sm font-semibold"
              >
                Estudar o texto oficial por artigo →
              </Link>
            )}

            <div
              className={`surface-card library-body ${material.discipline === "Língua Portuguesa" ? "library-body--portuguese" : ""}`}
            >
              {material.discipline === "Língua Portuguesa" ? (
                <PortugueseStudyReading source={material.body_md} />
              ) : materialLawSlug(material) || material.legal_review ? (
                <LegalStudyReading source={material.body_md} markdown />
              ) : (
                <Markdown source={material.body_md} />
              )}
            </div>

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
          </>
        }
        explanation={
          <>
            {material.summary && (
              <section className="surface-card p-4">
                <h2 className="font-bold">Visão didática do assunto</h2>
                <p className="mt-2 leading-7">{material.summary}</p>
              </section>
            )}
            <WorkedExamples
              key={`${user?.id}:${material.slug}`}
              slug={material.slug}
              languageStudy={material.discipline === "Língua Portuguesa"}
              enabled={signedIn}
            />

            <LibraryVideos
              videos={videos}
              {...(materialLawSlug(material)
                ? { law: { slug: materialLawSlug(material)!, materialSlug: material.slug } }
                : {})}
            />

            <p className="text-sm text-muted-foreground">
              O texto-base reúne o material publicado. Exemplos e vídeos desta aba são complementos;
              sua disponibilidade varia por assunto.
            </p>
          </>
        }
        practice={
          <>
            <MaterialPractice
              key={material.slug}
              userId={user!.id}
              authoredQuiz={material.quiz ?? []}
              authoredReview={material.practice_review}
              authoredKey={material.slug}
              label={material.topic_label ?? material.title}
              scope={{
                subject: material.discipline,
                topic: materialTopic(material.discipline, material.topic_label ?? material.title),
                ...(materialLawSlug(material) ? { law: materialLawSlug(material)! } : {}),
                ...(libraryCollection(material) === "enem" ? { contest: "ENEM" } : {}),
              }}
            />
            {(() => {
              const flashcards = material.flashcards ?? [];
              return flashcards.length > 0 ? (
                <details className="rounded-xl border p-3">
                  <summary className="cursor-pointer font-semibold">
                    Flashcards de revisão ({flashcards.length})
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Revise os conceitos essenciais ou salve os cartões no seu baralho. As questões
                    ficam somente na atividade acima, sem repetição.
                  </p>
                  <StudyPractice
                    flashcards={flashcards}
                    quiz={[]}
                    slug={material.slug}
                    subject={material.discipline}
                    topic={material.topic_label ?? material.title}
                  />
                </details>
              ) : null;
            })()}
          </>
        }
      />

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
