// Caderno de erros: toda questão que o aluno errou no Treinador entra aqui
// automaticamente (vem de question_training_responses, a mesma fonte de
// verdade do Treinador — nada de mock). O aluno não responde de novo aqui;
// ele revisa e marca o progresso (pendente/revisado/dominado) pra focar no
// que ainda precisa estudar.
import { createFileRoute } from "@tanstack/react-router";
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
  Check,
  History,
  Filter,
  Loader2,
  Play,
  Sparkles,
  XCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { useLockedAnswers } from "@/hooks/useLockedAnswers";
import {
  DIFFICULTY_LABEL,
  DIFFICULTY_STYLE,
  parseQuestion,
  type Question,
} from "@/lib/questionFormat";
import { PageHero, LockedState } from "@/components/dashboard/PageHero";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/errors")({
  component: ErrorsPage,
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

function ErrorsPage() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const userId = real ? user?.id : undefined;
  const { catalog, loading: catalogLoading } = useQuestionCatalog(userId, real);
  const { locked, loading: lockedLoading } = useLockedAnswers(userId, real);

  const [reviewStatus, setReviewStatus] = useState<Record<string, ReviewStatus>>({});
  const [statusLoading, setStatusLoading] = useState(true);
  const [filterSubject, setFilterSubject] = useState("all");
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
    for (const question of catalog) map.set(`${question.source}:${question.id}`, question);
    return map;
  }, [catalog]);

  const allErrors = useMemo<ErrorEntry[]>(() => {
    const entries: ErrorEntry[] = [];
    for (const [key, answer] of locked.entries()) {
      if (answer.isCorrect) continue;
      const question = catalogById.get(key);
      if (!question) continue; // questão saiu de circulação (inativada) desde o erro
      entries.push({ question, status: reviewStatus[key] ?? "pendente" });
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
  const visibleErrors = useMemo(
    () =>
      allErrors
        .filter((e) => filterSubject === "all" || e.question.subject === filterSubject)
        .sort((a, b) => a.question.subject.localeCompare(b.question.subject, "pt-BR")),
    [allErrors, filterSubject],
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
        image="study-desk"
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
    return (
      <div className="mx-auto max-w-2xl space-y-6">
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
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline">{question.subject}</Badge>
              <Badge variant="outline">{question.board}</Badge>
              <Badge
                variant="outline"
                className={cn("font-bold", DIFFICULTY_STYLE[question.difficulty])}
              >
                {DIFFICULTY_LABEL[question.difficulty]}
              </Badge>
            </div>
            <p className="whitespace-pre-line text-base leading-6">{parsed.stem}</p>
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-950/30">
              <p className="mb-1 text-xs font-black uppercase tracking-wider text-emerald-700">
                Resposta correta
              </p>
              <p className="text-sm font-bold">{question.answer}</p>
              {correctOption && <p className="mt-1 text-sm leading-6">{correctOption.text}</p>}
            </div>
            {question.explanation && (
              <div className="rounded-xl border bg-muted/30 p-4">
                <p className="mb-1 text-xs font-black uppercase tracking-wider text-primary">
                  Comentário da questão
                </p>
                <p className="text-sm leading-6">{question.explanation}</p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-2 pt-2">
              <Button
                variant="outline"
                className="justify-start hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                onClick={async () => {
                  await updateStatus(question, "dominado");
                  if (revisionIndex < reviewQueue.length - 1) setRevisionIndex((i) => i + 1);
                  else setRevisionMode(false);
                }}
              >
                Dominado (sair da revisão)
              </Button>
              <Button
                variant="outline"
                className="justify-start hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                onClick={async () => {
                  await updateStatus(question, "revisado");
                  if (revisionIndex < reviewQueue.length - 1) setRevisionIndex((i) => i + 1);
                  else setRevisionMode(false);
                }}
              >
                Revisado (manter para reforço)
              </Button>
              <Button
                variant="outline"
                className="justify-start hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"
                onClick={async () => {
                  await updateStatus(question, "pendente");
                  if (revisionIndex < reviewQueue.length - 1) setRevisionIndex((i) => i + 1);
                  else setRevisionMode(false);
                }}
              >
                Ainda tenho dúvida (prioridade)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHero
        image="study-desk"
        kicker="Treinamento"
        icon={AlertCircle}
        title={
          <>
            Caderno de <em>erros</em>
          </>
        }
        description="Cada falha do Treinador vira uma ordem de revisão clara. Você revisa o gabarito e marca o que já domina; não é possível responder de novo a uma questão já respondida."
        actions={
          <>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="hero-btn-ghost w-[190px]">
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
              className="hero-btn-primary gap-2"
              disabled={reviewQueue.length === 0}
              onClick={() => {
                setRevisionIndex(0);
                setRevisionMode(true);
                toast.success("Revisão guiada iniciada");
              }}
            >
              <Play className="h-4 w-4" /> Revisão sequencial
            </Button>
          </>
        }
      />

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
              key={`${question.source}:${question.id}`}
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
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                    {question.contest} · {question.year}
                  </span>
                </div>
                <p className="mb-4 line-clamp-3 font-medium">{parseQuestion(question.text).stem}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <History className="h-3 w-3" /> {DIFFICULTY_LABEL[question.difficulty]}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => setDetail(question)}>
                      Revisar
                    </Button>
                    {status !== "dominado" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                        onClick={() => updateStatus(question, "dominado")}
                      >
                        <Check className="mr-1 h-3.5 w-3.5" /> Marcar dominada
                      </Button>
                    )}
                  </div>
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
          {detail && (
            <>
              <DialogHeader>
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 sm:mx-0">
                  <XCircle />
                </div>
                <DialogTitle>Revisão da questão</DialogTitle>
                <DialogDescription>
                  Esta questão já foi respondida; a resposta não pode ser enviada de novo.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="whitespace-pre-line text-sm leading-6">
                  {parseQuestion(detail.text).stem}
                </p>
                <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-950/30">
                  <p className="mb-1 text-xs font-black uppercase tracking-wider text-emerald-700">
                    Resposta correta
                  </p>
                  <p className="text-sm font-bold">{detail.answer}</p>
                  {parseQuestion(detail.text).options.find((o) => o.letter === detail.answer) && (
                    <p className="mt-1 text-sm leading-6">
                      {
                        parseQuestion(detail.text).options.find((o) => o.letter === detail.answer)
                          ?.text
                      }
                    </p>
                  )}
                </div>
                {detail.explanation && (
                  <div className="rounded-xl border bg-muted/30 p-4">
                    <p className="mb-1 text-xs font-black uppercase tracking-wider text-primary">
                      Comentário da questão
                    </p>
                    <p className="text-sm leading-6">{detail.explanation}</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={() => setDetail(null)}>Fechar</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
