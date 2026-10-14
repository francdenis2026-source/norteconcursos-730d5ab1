import { TRACKS } from "@/data/tracks";
import { editalLessonLinks } from "@/lib/editalStudy";
import { useLegalCourses } from "@/lib/legalCourses";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { syllabusQuestions, isEnemContest } from "@/lib/trainerFilters";
import { needsMissingSupportText } from "@/lib/questionText";
import { hasReviewedExplanation } from "@/lib/questionFormat";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { buildTheoryIndex, findTheory } from "@/lib/cronogramaTeoria";
import { libraryCollection } from "@/lib/libraryOrganization";
import { canonicalSubject } from "@/lib/subjects";
import React from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpenCheck, GraduationCap, Layers3, Loader2, Scale } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { LockedState } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/button";
import { BackToPlan } from "@/components/cronograma/BackToPlan";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LibraryVideos } from "@/components/library/LibraryVideos";
import { useMediaCatalog } from "@/lib/mediaStore";
import { relatedVideos } from "@/lib/relatedVideos";
import {
  basisHref,
  parseBasis,
  splitExplanation,
  isEligibleQuestion,
  type LegalBasis,
} from "@/lib/questionFormat";

export const Route = createFileRoute("/dashboard/edital/$topicId")({
  component: TopicPage,
  validateSearch: (
    s: Record<string, unknown>,
  ): { back?: string | undefined; tema?: string | undefined } => ({
    back: typeof s["back"] === "string" ? s["back"] : undefined,
    tema: typeof s["tema"] === "string" ? s["tema"] : undefined,
  }),
});

interface TopicRow {
  id: string;
  discipline: string;
  topic_text: string;
  edition_id: string;
}
interface EditionRow {
  contest_name: string;
  role_name: string;
  contest_year: number;
  exam_board: string | null;
  source: { url: string; title: string; source_type: string; status: string } | null;
}
interface StudyCard {
  id: string;
  subtopic: string | null;
  subject: string;
  explanation: string;
  legalBasis: LegalBasis[];
  difficulty: string;
}

function TopicPage() {
  const { back: backToPlan, tema } = Route.useSearch();
  const { topicId } = useParams({ from: "/dashboard/edital/$topicId" });
  const { user, isLoading: authLoading } = useAuthStatus();
  const [topic, setTopic] = React.useState<TopicRow | null>(null);
  const [edition, setEdition] = React.useState<EditionRow | null>(null);
  const real = !!user && user.id !== "demo-user";
  const {
    catalog: questionCatalog,
    loading: questionsLoading,
    error: questionsError,
    reload: reloadQuestions,
  } = useQuestionCatalog(user?.id, real);
  const library = useStudyMaterialList(real);
  const legalCourses = useLegalCourses(real ? user?.id : undefined);
  const learning = React.useMemo(
    () =>
      topic && edition && !isEnemContest(edition.contest_name)
        ? editalLessonLinks(topic.discipline, topic.topic_text, TRACKS)
        : { lessons: [], tracks: [] },
    [topic, edition],
  );
  const [showAllComments, setShowAllComments] = React.useState(false);
  const linkedQuestions = React.useMemo(
    () => syllabusQuestions(questionCatalog, topicId).filter((q) => !needsMissingSupportText(q)),
    [questionCatalog, topicId],
  );
  const cards = React.useMemo(
    () =>
      linkedQuestions.filter(hasReviewedExplanation).map((q) => ({
        id: `${q.source}:${q.id}`,
        subtopic: q.subtopic,
        subject: q.subject,
        explanation: q.explanation,
        legalBasis: q.legalBasis,
        difficulty: q.difficulty,
      })),
    [linkedQuestions],
  );
  const materials = React.useMemo(
    () =>
      topic && edition
        ? findTheory(
            buildTheoryIndex(
              (library.data ?? []).filter(
                (m) => (libraryCollection(m) === "enem") === isEnemContest(edition.contest_name),
              ),
              [],
            ),
            topic.discipline,
            topic.topic_text,
          )
        : [],
    [library.data, topic, edition],
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { catalog: mediaCatalog } = useMediaCatalog();
  const videos = React.useMemo(
    () =>
      topic
        ? relatedVideos(
            mediaCatalog,
            topic.discipline,
            topic.topic_text,
            4,
            edition && isEnemContest(edition.contest_name) ? "enem" : "general",
          )
        : [],
    [mediaCatalog, topic, edition],
  );

  React.useEffect(() => {
    if (authLoading || !user || user.id === "demo-user") {
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);
    setTopic(null);
    setEdition(null);
    setShowAllComments(false);
    void (async () => {
      const topicResult = await supabase
        .from("syllabus_topics")
        .select("id,discipline,topic_text,edition_id")
        .eq("id", topicId)
        .eq("content_status", "current")
        .maybeSingle();
      if (!active) return;
      if (topicResult.error || !topicResult.data) {
        setError(topicResult.error?.message || "Assunto não encontrado.");
        setLoading(false);
        return;
      }
      const topicRow = topicResult.data as TopicRow;
      setTopic(topicRow);
      const editionResult = await supabase
        .from("syllabus_editions")
        .select(
          "contest_name,role_name,contest_year,exam_board,source:content_sources(url,title,source_type,status)",
        )
        .eq("id", topicRow.edition_id)
        .eq("status", "active")
        .maybeSingle();
      if (!active) return;
      if (editionResult.error || !editionResult.data)
        setError("A edição deste assunto está indisponível ou não está ativa.");
      else setEdition(editionResult.data as unknown as EditionRow);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [authLoading, user, topicId]);

  if (authLoading || loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  if (!user || user.id === "demo-user")
    return (
      <LockedState
        image="field-map"
        title={
          <>
            Estude este <em>assunto</em>
          </>
        }
        description="Entre na sua conta para acessar o resumo, as explicações revisadas e o treino deste assunto do edital."
      />
    );
  if (error || !topic)
    return (
      <div className="space-y-4">
        <p className="text-destructive">{error || "Assunto não encontrado."}</p>
        <Button asChild variant="outline">
          <Link to="/dashboard/edital" search={{ edition: topic?.edition_id }}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao edital
          </Link>
        </Button>
      </div>
    );

  const materialSlugs = new Set(materials.map((material) => material.id));
  const relatedLawSlugs = new Set(
    (library.data ?? [])
      .filter((material) => materialSlugs.has(material.slug))
      .map((material) => material.law_course_slug)
      .filter(Boolean),
  );
  const lawCourses =
    edition && !isEnemContest(edition.contest_name)
      ? (legalCourses.data ?? []).filter(
          (course) => course.syllabus_topic_id === topic.id || relatedLawSlugs.has(course.slug),
        )
      : [];
  const practiceSearch = {
    syllabus: topic.id,
    ...(edition && isEnemContest(edition.contest_name) ? { contest: "ENEM" } : {}),
  };
  return (
    <div className="space-y-6 pb-8">
      <BackToPlan back={backToPlan} topic={tema} />
      <Button asChild variant="ghost" size="sm" className="gap-2">
        <Link to="/dashboard/edital" search={{ edition: topic?.edition_id }}>
          <ArrowLeft className="h-4 w-4" /> Voltar ao edital eletrônico
        </Link>
      </Button>

      <section className="page-hero" data-hero="field-map">
        <Badge className="hero-chip">
          <Layers3 className="mr-1 h-3.5 w-3.5" />
          {topic.discipline}
        </Badge>
        <h1 className="text-2xl font-bold md:text-3xl">{topic.topic_text}</h1>
        {edition && (
          <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
            <GraduationCap className="h-4 w-4" />
            {edition.contest_name} — {edition.role_name} ({edition.contest_year})
            {edition.exam_board ? ` · ${edition.exam_board}` : ""}
          </p>
        )}
        <a
          href="#edital-study-content"
          className="mt-5 mr-3 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0b3150] hover:bg-white/90"
        >
          <BookOpenCheck className="h-4 w-4" /> Estudar este assunto
        </a>
        {!questionsLoading && !questionsError && linkedQuestions.length > 0 && (
          <Button asChild className="mt-5 bg-white text-[#0b3150] hover:bg-white/90">
            <Link to="/dashboard/question-trainer" search={practiceSearch}>
              <BookOpenCheck className="mr-2 h-4 w-4" />
              Praticar questões desse assunto
            </Link>
          </Button>
        )}
      </section>

      <section className="grid gap-3 sm:grid-cols-3" aria-label="Etapas de estudo do assunto">
        <Card>
          <CardContent className="p-4">
            <p className="font-semibold">1. Consulte o programa</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Este tópico pertence à edição e ao cargo indicados acima.
            </p>
            {edition?.source?.source_type === "edital" &&
              edition.source.status === "vigente" &&
              /^https:\/\//.test(edition.source.url) && (
                <a
                  href={edition.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-primary underline"
                >
                  Consultar fonte do edital
                </a>
              )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="font-semibold">2. Estude o conteúdo</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Use os materiais relacionados e consulte as fontes das explicações.
            </p>
            <Button variant="outline" size="sm" className="mt-3" asChild>
              <a href="#edital-study-content">Ver conteúdos e cursos</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="font-semibold">3. Pratique e revise</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {questionsLoading
                ? "Consultando questões…"
                : questionsError
                  ? "Acervo temporariamente indisponível."
                  : `${linkedQuestions.length} questões elegíveis vinculadas a este tópico.`}
            </p>
          </CardContent>
        </Card>
      </section>
      <section
        id="edital-study-content"
        className="scroll-mt-24 space-y-5"
        aria-label="Conteúdo para estudar o assunto"
      >
        <div>
          <h2 className="text-xl font-semibold">Conteúdo para estudar</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Materiais, aulas e percursos disponíveis. Sugestões relacionadas não substituem o
            recorte do edital.
          </p>
        </div>
        {edition &&
          !isEnemContest(edition.contest_name) &&
          (materials.length > 0 || videos.length > 0) && (
            <Button asChild>
              <Link
                to="/dashboard/study-room"
                search={{
                  subject: topic.discipline,
                  topic: topic.topic_text,
                  kind: "Teoria",
                  minutes: "30",
                  edital: topic.id,
                }}
              >
                Abrir sessão de estudo de 30 minutos
              </Link>
            </Button>
          )}
        {learning.lessons.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aulas relacionadas ao assunto</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {learning.lessons.map((lesson) => (
                <Link
                  key={`${lesson.track}:${lesson.lesson}`}
                  to="/dashboard/trilhas"
                  search={{ t: lesson.track, l: lesson.lesson }}
                  className="rounded-xl border p-4 text-sm font-semibold hover:bg-muted"
                >
                  {lesson.title}
                  <span className="mt-1 block text-xs font-normal text-muted-foreground">
                    Aula com explicação, exemplos e exercícios
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
        {lawCourses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estudar a legislação</CardTitle>
              <CardDescription>
                Percursos vinculados ao tópico ou aos materiais relacionados. Confira quais artigos
                o edital exige.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {lawCourses.map((course) => (
                <Link
                  key={course.id}
                  to="/dashboard/legal-course/$slug"
                  params={{ slug: course.slug }}
                  className="rounded-xl border p-4 text-sm font-semibold hover:bg-muted"
                >
                  {course.title}
                  <span className="mt-1 block text-xs font-normal text-muted-foreground">
                    Texto normativo, explicações e revisão
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
        {learning.tracks.length > 0 && (
          <details className="rounded-xl border p-4">
            <summary className="cursor-pointer text-sm font-semibold">
              Trilhas da disciplina — conteúdo geral
            </summary>
            <p className="mt-2 text-xs text-muted-foreground">
              As trilhas podem abranger outros tópicos e concursos. Consulte o programa antes de
              ampliar o estudo.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {learning.tracks.map((track) => (
                <Button variant="outline" size="sm" key={track.slug} asChild>
                  <Link to="/dashboard/trilhas" search={{ t: track.slug }}>
                    {track.title}
                  </Link>
                </Button>
              ))}
            </div>
          </details>
        )}
        {materials.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Materiais relacionados</CardTitle>
              <CardDescription>
                Sugestões por disciplina e assunto; confira o recorte do edital ao estudar.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2">
              {materials.map((material) => (
                <Link
                  key={material.id}
                  to="/dashboard/library/$slug"
                  params={{ slug: material.id }}
                  search={{ back: backToPlan, tema: topic.topic_text }}
                  className="rounded-xl border p-3 text-sm font-semibold hover:bg-muted"
                >
                  {material.label}
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
        {videos.length > 0 && <LibraryVideos videos={videos} />}
        {!library.isLoading &&
          !legalCourses.isLoading &&
          !materials.length &&
          !learning.lessons.length &&
          !lawCourses.length &&
          !videos.length && (
            <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
              Ainda não há conteúdo específico relacionado automaticamente a este assunto. Consulte
              a fonte do edital e busque materiais na biblioteca.
            </p>
          )}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            {edition && isEnemContest(edition.contest_name) ? (
              <Link to="/dashboard/enem" search={{ tab: "materiais" }}>
                Buscar materiais do ENEM
              </Link>
            ) : (
              <Link
                to="/dashboard/library"
                search={{
                  collection:
                    libraryCollection({
                      slug: "",
                      discipline: topic.discipline,
                      law_course_slug: null,
                    }) === "subjects"
                      ? "subjects"
                      : "laws",
                  q: topic.discipline,
                }}
              >
                Buscar na biblioteca
              </Link>
            )}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/cronograma">Organizar no cronograma</Link>
          </Button>
        </div>
      </section>
      {questionsError && (
        <p role="status" className="text-sm text-muted-foreground">
          Não foi possível consultar o acervo agora. O tópico e os materiais continuam disponíveis.{" "}
          <Button variant="ghost" size="sm" onClick={reloadQuestions}>
            Tentar carregar questões
          </Button>
        </p>
      )}
      {questionsLoading ? (
        <p role="status" className="text-sm text-muted-foreground">
          Carregando comentários vinculados…
        </p>
      ) : cards.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sem comentários didáticos vinculados</CardTitle>
            <CardDescription>
              Não há comentários didáticos disponíveis neste tópico. Isso não significa que o
              conteúdo esteja fora do edital. Consulte a fonte e os materiais relacionados.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Comentários das questões ({cards.length})</h2>
          {(showAllComments ? cards : cards.slice(0, 6)).map((card) => {
            const { main, example } = splitExplanation(card.explanation);
            return (
              <Card key={card.id}>
                <CardHeader>
                  <CardTitle className="text-base">{card.subtopic || card.subject}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-relaxed">
                  <p className="whitespace-pre-line text-foreground/90">{main}</p>
                  {example && (
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <p className="whitespace-pre-line text-foreground/80">{example}</p>
                    </div>
                  )}
                  {card.legalBasis.length > 0 && (
                    <>
                      <Separator />
                      <div className="flex flex-wrap gap-2">
                        {card.legalBasis.map((basis, i) => (
                          <a
                            key={i}
                            href={basisHref(basis)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted"
                          >
                            <Scale className="h-3 w-3" />
                            {basis.title || (basis as { norma?: string }).norma || "Fonte legal"}
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {cards.length > 6 && (
            <Button variant="outline" onClick={() => setShowAllComments((value) => !value)}>
              {showAllComments
                ? "Mostrar menos comentários"
                : `Ver todos os ${cards.length} comentários`}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
