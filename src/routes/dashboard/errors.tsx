import { matchesMaterialScope, materialTopic } from "@/lib/materialPractice";
import "@/styles/question-workspace.css";
import { questionIdentity } from "@/lib/questionIdentity";
import { QuestionText } from "@/components/dashboard/QuestionText";
import { QuestionCode } from "@/components/dashboard/QuestionCode";
import { QuestionFigures } from "@/components/dashboard/QuestionFigures";
// Caderno de erros: toda questão que o aluno errou no Treinador entra aqui
// automaticamente (vem de question_training_responses, a mesma fonte de
// verdade do Treinador — nada de mock). O aluno não responde de novo aqui;
// ele revisa e marca o progresso (pendente/revisado/dominado) pra focar no
// que ainda precisa estudar.
import { QuestionProse } from "@/components/dashboard/QuestionProse";
import { questionCode } from "@/lib/questionIdentity";
import { MissingTextNotice } from "@/components/library/MissingTextNotice";
import { needsMissingSupportText } from "@/lib/questionText";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  BookOpenCheck,
  ExternalLink,
  Filter,
  History,
  Loader2,
  Play,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { useLockedAnswers } from "@/hooks/useLockedAnswers";
import {
  DIFFICULTY_LABEL,
  DIFFICULTY_STYLE,
  basisHref,
  formatDate,
  parseQuestion,
  splitExplanation,
  type Question,
} from "@/lib/questionFormat";
import { PageHero, LockedState, HeroStat } from "@/components/dashboard/PageHero";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { canonicalSubject } from "@/lib/subjects";
import { type StudyMaterialSummary, useStudyMaterialList } from "@/lib/studyMaterials";
import { WorkedExamples } from "@/components/library/WorkedExamples";
import { LibraryVideos } from "@/components/library/LibraryVideos";
import { useMediaCatalog } from "@/lib/mediaStore";
import { relatedVideos } from "@/lib/relatedVideos";

export const Route = createFileRoute("/dashboard/errors")({
  component: ErrorsPage,
  validateSearch: (
    s: Record<string, unknown>,
  ): { subject?: string | undefined; topic?: string | undefined } => ({
    subject: typeof s["subject"] === "string" ? s["subject"] : undefined,
    topic: typeof s["topic"] === "string" ? s["topic"] : undefined,
  }),
});

type ReviewStatus = "pendente" | "revisado" | "dominado";
type ErrorEntry = { question: Question; status: ReviewStatus };

const STATUS_LABEL: Record<ReviewStatus, string> = {
  pendente: "Pendente",
  revisado: "Revisado",
  dominado: "Dominado",
};
const STATUS_STYLE: Record<ReviewStatus, string> = {
  pendente:
    "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300",
  revisado:
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-300",
  dominado:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300",
};

/**
 * Tudo que o aluno precisa pra reforçar o que errou: explicação, exemplo do dia a dia,
 * fontes oficiais, material da Biblioteca com exemplos/ilustrações e vídeo-aulas, e um
 * atalho para praticar mais questões do mesmo assunto.
 */
function ErrorArsenal({
  question,
  relatedMaterial,
  videos,
}: {
  question: Question;
  relatedMaterial: StudyMaterialSummary | null;
  videos: ReturnType<typeof relatedVideos>;
}) {
  const explanation = question.explanation ? splitExplanation(question.explanation) : null;
  return (
    <div className="space-y-4">
      {explanation?.main && (
        <div className="rounded-xl border bg-muted/30 p-4">
          <p className="mb-1 text-xs font-black uppercase tracking-wider text-primary">
            Comentário da questão
          </p>
          <p className="text-sm leading-6">{explanation.main}</p>
        </div>
      )}
      {explanation?.example && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:bg-amber-950/30">
          <p className="mb-1 text-xs font-black uppercase tracking-wider text-amber-700">
            Exemplo do dia a dia
          </p>
          <p className="text-sm leading-6">{explanation.example}</p>
        </div>
      )}
      {question.preliminaryKey && (
        <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs font-semibold text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          Gabarito preliminar da banca: pode mudar após recursos. Confira o definitivo quando sair.
        </p>
      )}
      {question.checkedAt && question.legalBasis.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Vigência conferida na fonte oficial em {formatDate(question.checkedAt)}.
        </p>
      )}
      {question.legalBasis.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
            Fontes oficiais vinculadas
          </p>
          <div className="space-y-2">
            {question.legalBasis.map((basis, basisIndex) =>
              basis.url ? (
                <a
                  key={`${basis.url}-${basisIndex}`}
                  href={basisHref(basis)}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border p-3 text-sm font-medium text-primary hover:bg-muted"
                >
                  {basis.title || basis.lei || "Fonte oficial"}
                  {basis.artigo ? ` · ${basis.artigo}` : ""}
                </a>
              ) : (
                <div key={basisIndex} className="rounded-lg border p-3 text-sm">
                  {basis.title || basis.lei || "Fonte oficial"}
                </div>
              ),
            )}
          </div>
        </div>
      )}
      {relatedMaterial && (
        <div className="space-y-3 rounded-xl border p-4">
          <Link
            to="/dashboard/library/$slug"
            params={{ slug: relatedMaterial.slug }}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <BookOpenCheck className="h-4 w-4" />
            Reforçar com "{relatedMaterial.title}" na Biblioteca
            <ExternalLink className="h-3 w-3" />
          </Link>
          <details>
            <summary className="cursor-pointer text-xs font-semibold text-muted-foreground hover:text-primary">
              Ver exemplos, ilustrações e vídeo-aulas aqui mesmo
            </summary>
            <div className="mt-3 space-y-3">
              <WorkedExamples slug={relatedMaterial.slug} enabled />
              {videos.length > 0 && <LibraryVideos videos={videos} />}
            </div>
          </details>
        </div>
      )}
      <Button asChild className="w-full gap-2">
        <Link
          to="/dashboard/question-trainer"
          search={{ subject: question.subject, go: "1", mode: "reforco" }}
        >
          <Target className="h-4 w-4" /> Refazer meus erros
        </Link>
      </Button>
      <Button asChild variant="outline" className="w-full gap-2">
        <Link
          to="/dashboard/question-trainer"
          search={{ subject: question.subject, go: "1", reinforce: "1" }}
        >
          <Target className="h-4 w-4" /> Treinar esta disciplina
        </Link>
      </Button>
    </div>
  );
}

/** As três decisões possíveis ao revisar um erro, lado a lado; a atual fica desativada. */
function ReviewActions({
  status,
  onChange,
}: {
  status: ReviewStatus;
  onChange: (status: ReviewStatus) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t pt-4 sm:grid-cols-3">
      <Button
        variant="outline"
        disabled={status === "dominado"}
        className="justify-center hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
        onClick={() => onChange("dominado")}
      >
        Dominado
      </Button>
      <Button
        variant="outline"
        disabled={status === "revisado"}
        className="justify-center hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        onClick={() => onChange("revisado")}
      >
        Revisado, manter para reforço
      </Button>
      <Button
        variant="outline"
        disabled={status === "pendente"}
        className="justify-center hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
        onClick={() => onChange("pendente")}
      >
        Ainda tenho dúvida
      </Button>
    </div>
  );
}

function ErrorsPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const userId = real ? user?.id : undefined;
  const { catalog, loading: catalogLoading } = useQuestionCatalog(userId, real);
  const { locked, loading: lockedLoading } = useLockedAnswers(userId, real, catalog);
  const { data: libraryMaterials } = useStudyMaterialList(real);
  const { catalog: mediaCatalog } = useMediaCatalog();
  const libraryByDiscipline = useMemo(() => {
    const map = new Map<string, StudyMaterialSummary[]>();
    for (const item of libraryMaterials ?? []) {
      const key = canonicalSubject(item.discipline);
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    return map;
  }, [libraryMaterials]);

  const [reviewStatus, setReviewStatus] = useState<Record<string, ReviewStatus>>({});
  const [statusLoading, setStatusLoading] = useState(true);
  const [filterSubject, setFilterSubject] = useState(
    Route.useSearch().subject ? canonicalSubject(Route.useSearch().subject) : "all",
  );
  const [detail, setDetail] = useState<Question | null>(null);
  const [revisionMode, setRevisionMode] = useState(false);
  const [revisionIndex, setRevisionIndex] = useState(0);

  useEffect(() => {
    if (!userId) {
      setStatusLoading(false);
      return;
    }
    let active = true;
    void supabase
      .from("question_error_reviews")
      .select("question_id,question_source,status")
      .eq("user_id", userId)
      .then(({ data }) => {
        if (!active) return;
        const map: Record<string, ReviewStatus> = {};
        for (const row of (data as Array<{
          question_id: string;
          question_source: string;
          status: ReviewStatus;
        }> | null) ?? [])
          map[`${row.question_source}:${row.question_id}`] = row.status;
        setReviewStatus(map);
        setStatusLoading(false);
      });
    return () => {
      active = false;
    };
  }, [userId]);

  const catalogById = useMemo(() => {
    const map = new Map<string, Question>();
    for (const question of catalog) map.set(questionIdentity(question), question);
    return map;
  }, [catalog]);

  const allErrors = useMemo<ErrorEntry[]>(() => {
    const entries: ErrorEntry[] = [];
    for (const [key, answer] of locked.entries()) {
      if (answer.isCorrect) continue;
      const question = catalogById.get(key);
      if (!question) continue; // questão saiu de circulação (inativada) desde o erro
      entries.push({
        question,
        status: reviewStatus[`${question.source}:${question.id}`] ?? "pendente",
      });
    }
    return entries;
  }, [locked, catalogById, reviewStatus]);

  const subjects = useMemo(
    () =>
      Array.from(new Set(allErrors.map((e) => e.question.subject))).sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [allErrors],
  );
  const plannedSearch = Route.useSearch();
  useEffect(
    () => setFilterSubject(plannedSearch.subject ? canonicalSubject(plannedSearch.subject) : "all"),
    [plannedSearch.subject],
  );
  const plannedTopic = plannedSearch.topic
    ? materialTopic(plannedSearch.subject ?? filterSubject, plannedSearch.topic)
    : undefined;
  const visibleErrors = useMemo(
    () =>
      allErrors
        .filter(
          (e) =>
            (filterSubject === "all" || e.question.subject === filterSubject) &&
            matchesMaterialScope(e.question, { topic: plannedTopic }),
        )
        .sort((a, b) => a.question.subject.localeCompare(b.question.subject, "pt-BR")),
    [allErrors, filterSubject, plannedTopic],
  );
  const reviewQueue = useMemo(
    () => visibleErrors.filter((e) => e.status !== "dominado"),
    [visibleErrors],
  );

  const updateStatus = async (question: Question, status: ReviewStatus) => {
    if (!userId) return;
    const key = `${question.source}:${question.id}`;
    setReviewStatus((prev) => ({ ...prev, [key]: status }));
    const { error } = await supabase.from("question_error_reviews").upsert(
      {
        user_id: userId,
        question_id: question.id,
        question_source: question.source,
        status,
      },
      { onConflict: "user_id,question_id,question_source" },
    );
    if (error) {
      toast.error("Não foi possível salvar o status. Tente novamente.");
      return;
    }
    toast.success(`Status atualizado: ${STATUS_LABEL[status]}`);
  };

  const loading = authLoading || catalogLoading || lockedLoading || statusLoading;

  if (!authLoading && !real)
    return (
      <LockedState
        image="trainer"
        title={
          <>
            Caderno de <em>erros</em>
          </>
        }
        description="Entre na sua conta pra ver as questões que você errou no Treinador e revisar com método."
      />
    );

  if (loading)
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );

  if (revisionMode && reviewQueue[revisionIndex]) {
    const { question } = reviewQueue[revisionIndex];
    const parsed = parseQuestion(question.text);
    const correctOption = parsed.options.find((o) => o.letter === question.answer);
    const relatedMaterial =
      libraryByDiscipline.get(canonicalSubject(question.subject))?.[0] ?? null;
    const videos = relatedMaterial
      ? relatedVideos(
          mediaCatalog,
          question.subject,
          relatedMaterial.topic_label ?? relatedMaterial.title,
        )
      : [];
    return (
      <div className="question-workspace question-errors question-errors--review mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setRevisionMode(false)}>
            Voltar ao caderno
          </Button>
          <span className="text-sm font-medium">
            {revisionIndex + 1} / {reviewQueue.length}
          </span>
        </div>
        <Card className="border-2 border-primary/20">
          <CardContent className="space-y-4 pt-6">
            {needsMissingSupportText(question) && <MissingTextNotice />}
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline">{question.subject}</Badge>
              <Badge variant="outline">{question.board}</Badge>
              <Badge
                variant="outline"
                className={cn("font-bold", DIFFICULTY_STYLE[question.difficulty])}
              >
                {DIFFICULTY_LABEL[question.difficulty]}
              </Badge>
              <QuestionCode question={question} />
            </div>
            <QuestionProse text={parsed.stem} className="text-base" />
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-950/30">
              <p className="mb-1 text-xs font-black uppercase tracking-wider text-emerald-700">
                Resposta correta
              </p>
              <p className="text-sm font-bold">{question.answer}</p>
              {correctOption && <p className="mt-1 text-sm leading-6">{correctOption.text}</p>}
            </div>
            <ErrorArsenal question={question} relatedMaterial={relatedMaterial} videos={videos} />
            <ReviewActions
              status={reviewQueue[revisionIndex]!.status}
              onChange={async (next) => {
                await updateStatus(question, next);
                if (revisionIndex < reviewQueue.length - 1) setRevisionIndex((i) => i + 1);
                else setRevisionMode(false);
              }}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="question-workspace question-errors">
      <PageHero
        image="trainer"
        kicker="Questões"
        icon={AlertCircle}
        title={
          <>
            Caderno de <em>erros</em>
          </>
        }
        description="Revise as questões que você errou e acompanhe o que já dominou."
      >
        <div className="page-hero__stats">
          <HeroStat icon={AlertCircle} label="No caderno" value={allErrors.length} />
          <HeroStat icon={History} label="Para revisar" value={reviewQueue.length} />
        </div>
      </PageHero>
      <div className="question-workspace__toolbar" aria-label="Filtrar e revisar erros">
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-full sm:w-[210px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Disciplina" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as disciplinas</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className="question-workspace__primary gap-2"
          disabled={reviewQueue.length === 0}
          onClick={() => {
            setRevisionIndex(0);
            setRevisionMode(true);
            toast.success("Revisão guiada iniciada");
          }}
        >
          <Play className="h-4 w-4" /> Revisão sequencial
        </Button>
      </div>

      {visibleErrors.length > 0 && (
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 font-semibold text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300">
            {visibleErrors.filter((e) => e.status === "pendente").length} pendentes
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-semibold text-amber-700 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-300">
            {visibleErrors.filter((e) => e.status === "revisado").length} revisadas
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
            {visibleErrors.filter((e) => e.status === "dominado").length} dominadas
          </span>
        </div>
      )}

      <div className="grid gap-4">
        {visibleErrors.length > 0 ? (
          visibleErrors.map(({ question, status }) => (
            <Card
              key={questionIdentity(question)}
              className="hover:border-primary/50 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className={cn("font-bold", STATUS_STYLE[status])}>
                      {STATUS_LABEL[status]}
                    </Badge>
                    <Badge variant="outline">{question.subject}</Badge>
                    <Badge variant="outline">{question.board}</Badge>
                    <QuestionCode question={question} />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {question.contest} · {question.year}
                  </span>
                </div>
                <p className="mb-4 line-clamp-3 font-medium">{parseQuestion(question.text).stem}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-sm">
                  <span className="text-muted-foreground">
                    {DIFFICULTY_LABEL[question.difficulty]}
                  </span>
                  <Button variant="outline" onClick={() => setDetail(question)}>
                    Revisar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center p-12 bg-muted/50 rounded-xl">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-emerald-500/60" />
            <p className="text-muted-foreground">
              {allErrors.length === 0
                ? "Parabéns! Você não possui erros registrados no Treinador."
                : "Nenhum erro para essa disciplina."}
            </p>
          </div>
        )}
      </div>

      <Dialog open={!!detail} onOpenChange={(open) => !open && setDetail(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          {detail &&
            (() => {
              const detailRelatedMaterial =
                libraryByDiscipline.get(canonicalSubject(detail.subject))?.[0] ?? null;
              const detailVideos = detailRelatedMaterial
                ? relatedVideos(
                    mediaCatalog,
                    detail.subject,
                    detailRelatedMaterial.topic_label ?? detailRelatedMaterial.title,
                  )
                : [];
              return (
                <>
                  <DialogHeader>
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 sm:mx-0">
                      <XCircle />
                    </div>
                    <DialogTitle>Revisão da questão</DialogTitle>
                    <DialogDescription>
                      Esta questão já foi respondida; a resposta não pode ser enviada de novo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {needsMissingSupportText(detail) && <MissingTextNotice />}
                    <QuestionProse text={parseQuestion(detail.text).stem} className="text-sm" />
                    <QuestionCode question={detail} />
                    <QuestionFigures
                      urls={detail.figures}
                      illustrations={parseQuestion(detail.text).illustrations}
                    />
                    <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-950/30">
                      <p className="mb-1 text-xs font-black uppercase tracking-wider text-emerald-700">
                        Resposta correta
                      </p>
                      <p className="text-sm font-bold">{detail.answer}</p>
                      {parseQuestion(detail.text).options.find(
                        (o) => o.letter === detail.answer,
                      ) && (
                        <p className="mt-1 text-sm leading-6">
                          {
                            parseQuestion(detail.text).options.find(
                              (o) => o.letter === detail.answer,
                            )?.text
                          }
                        </p>
                      )}
                    </div>
                    <ErrorArsenal
                      question={detail}
                      relatedMaterial={detailRelatedMaterial}
                      videos={detailVideos}
                    />
                    <ReviewActions
                      status={reviewStatus[`${detail.source}:${detail.id}`] ?? "pendente"}
                      onChange={async (next) => {
                        await updateStatus(detail, next);
                        setDetail(null);
                      }}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setDetail(null)}>
                      Fechar
                    </Button>
                  </DialogFooter>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
