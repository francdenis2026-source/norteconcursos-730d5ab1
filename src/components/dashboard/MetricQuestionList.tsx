// Painel que abre ao tocar em Acertos, Erros, Respondidas ou Puladas: lista as questões por trás do número
// e, ao tocar numa delas, mostra a questão com a sua resposta, o gabarito, o tempo e o comentário.
import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Loader2,
  SkipForward,
  XCircle,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuestionCode } from "@/components/dashboard/QuestionCode";
import { QuestionProse } from "@/components/dashboard/QuestionProse";
import { ReportQuestionButton } from "@/components/dashboard/ReportQuestionButton";
import { QuestionSupportText } from "@/components/library/QuestionSupportText";
import { formatAnswerTime } from "@/components/dashboard/AnswerFeedback";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { useFirstResponse } from "@/hooks/useFirstResponse";
import {
  catalogById,
  METRIC_LIST_LABEL,
  type MetricListItem,
  type MetricListKind,
} from "@/lib/metricQuestionLists";
import {
  parseQuestion,
  questionAnswerLabel,
  type Answer,
  type Question,
} from "@/lib/questionFormat";
import { questionCode } from "@/lib/questionIdentity";
import { canonicalSubject } from "@/lib/subjects";
import { cn } from "@/lib/utils";

const PAGE = 25;
const date = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" });

const RESULT = {
  correct: { label: "Acertou", icon: CheckCircle2, tone: "text-emerald-600 dark:text-emerald-400" },
  wrong: { label: "Errou", icon: XCircle, tone: "text-rose-600 dark:text-rose-400" },
  skipped: { label: "Pulada", icon: SkipForward, tone: "text-amber-600 dark:text-amber-400" },
} as const;

function subjectOf(item: MetricListItem, question: Question | undefined) {
  return canonicalSubject(question?.subject ?? item.subject) || "Sem disciplina identificada";
}

export function MetricQuestionList({
  kind,
  items,
  userId,
  onClose,
}: {
  kind: MetricListKind | null;
  items: MetricListItem[];
  userId: string;
  onClose: () => void;
}) {
  const catalog = useQuestionCatalog(userId, kind !== null);
  const index = React.useMemo(() => catalogById(catalog.catalog), [catalog.catalog]);
  const [subject, setSubject] = React.useState("all");
  const [shown, setShown] = React.useState(PAGE);
  const [selected, setSelected] = React.useState<MetricListItem | null>(null);
  React.useEffect(() => {
    setSubject("all");
    setShown(PAGE);
    setSelected(null);
  }, [kind]);

  const subjects = React.useMemo(
    () =>
      [...new Set(items.map((item) => subjectOf(item, index.get(item.questionId))))].sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [items, index],
  );
  const visible = items.filter(
    (item) => subject === "all" || subjectOf(item, index.get(item.questionId)) === subject,
  );
  const labels = kind ? METRIC_LIST_LABEL[kind] : null;

  return (
    <Dialog open={kind !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="metric-question-list flex max-h-[88dvh] max-w-2xl flex-col gap-0 overflow-hidden p-0">
        {labels && selected ? (
          <QuestionDetail
            item={selected}
            question={index.get(selected.questionId)}
            userId={userId}
            onBack={() => setSelected(null)}
          />
        ) : (
          labels && (
            <>
              <header className="border-b px-5 pb-4 pt-5">
                <DialogTitle className="text-lg font-bold">{labels.title}</DialogTitle>
                <DialogDescription className="mt-1 text-xs">
                  {visible.length.toLocaleString("pt-BR")}{" "}
                  {visible.length === 1 ? "questão" : "questões"}
                  {subject !== "all" ? ` em ${subject}` : ""}. Toque numa questão para abri-la.
                </DialogDescription>
                {subjects.length > 1 && (
                  <label className="mt-3 block text-xs font-semibold text-muted-foreground">
                    Disciplina
                    <select
                      className="mt-1 w-full rounded-md border bg-background p-2 text-sm font-normal text-foreground"
                      value={subject}
                      onChange={(event) => {
                        setSubject(event.target.value);
                        setShown(PAGE);
                      }}
                    >
                      <option value="all">Todas as disciplinas ({items.length})</option>
                      {subjects.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </header>
              <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
                {catalog.loading && (
                  <p
                    role="status"
                    className="flex items-center gap-2 px-2 pb-3 text-xs text-muted-foreground"
                  >
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    Carregando os enunciados…
                  </p>
                )}
                {catalog.error && (
                  <p role="alert" className="px-2 pb-3 text-xs text-destructive">
                    Não foi possível carregar os enunciados agora. A lista abaixo continua válida.
                  </p>
                )}
                {!visible.length ? (
                  <p className="px-2 py-8 text-center text-sm text-muted-foreground">
                    {labels.empty}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {visible.slice(0, shown).map((item) => {
                      const question = index.get(item.questionId);
                      const stem = question ? parseQuestion(question.text).stem : "";
                      const result = RESULT[item.result];
                      return (
                        <li key={item.key}>
                          <button
                            type="button"
                            onClick={() => setSelected(item)}
                            className="group flex w-full items-start gap-3 rounded-xl border bg-card p-3 text-left transition hover:border-primary/50 hover:bg-muted/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                          >
                            <result.icon
                              className={cn("mt-0.5 h-5 w-5 shrink-0", result.tone)}
                              aria-hidden="true"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-x-2 text-[11px] font-semibold text-muted-foreground">
                                <span className={result.tone}>{result.label}</span>
                                <span>{subjectOf(item, question)}</span>
                                <span className="font-normal">{date(item.at)}</span>
                              </span>
                              <span className="mt-1 line-clamp-2 block break-words text-sm font-medium">
                                {stem ||
                                  (catalog.loading
                                    ? "Carregando enunciado…"
                                    : "Enunciado indisponível: esta questão não está mais no acervo.")}
                              </span>
                              {question && (
                                <span className="mt-1 block truncate text-[11px] text-muted-foreground">
                                  {question.contest} · {question.year} · {question.board}
                                </span>
                              )}
                            </span>
                            <ChevronRight
                              className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {visible.length > shown && (
                  <Button
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => setShown((n) => n + PAGE)}
                  >
                    Mostrar mais ({visible.length - shown})
                  </Button>
                )}
              </div>
            </>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}

function QuestionDetail({
  item,
  question,
  userId,
  onBack,
}: {
  item: MetricListItem;
  question: Question | undefined;
  userId: string;
  onBack: () => void;
}) {
  const response = useFirstResponse(userId, item.questionId, item.result !== "skipped");
  const result = RESULT[item.result];
  const parsed = question ? parseQuestion(question.text) : null;
  const mine = response.data?.selected_answer as Answer | undefined;
  const code = question ? questionCode(question) : "";
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
          <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" /> Voltar à lista
        </Button>
        <DialogTitle className="sr-only">Questão</DialogTitle>
        <DialogDescription className="sr-only">
          Detalhes da questão e da sua resposta.
        </DialogDescription>
      </header>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={cn("gap-1 font-bold", result.tone)}>
            <result.icon className="h-3.5 w-3.5" aria-hidden="true" /> {result.label}
          </Badge>
          <Badge variant="outline">{subjectOf(item, question)}</Badge>
          {question && (
            <>
              <Badge variant="outline">{question.board}</Badge>
              <Badge variant="outline">
                {question.contest} · {question.year}
              </Badge>
            </>
          )}
        </div>
        <dl className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
          <Info
            label={item.result === "skipped" ? "Pulada em" : "Respondida em"}
            value={date(response.data?.created_at ?? item.at)}
          />
          {item.result !== "skipped" && (
            <Info
              label="Tempo"
              value={
                response.isPending
                  ? "…"
                  : response.data?.response_seconds
                    ? formatAnswerTime(response.data.response_seconds)
                    : "não medido"
              }
              icon={<Clock3 className="h-3 w-3" aria-hidden="true" />}
            />
          )}
          {item.result === "skipped" && <Info label="Situação" value="Ainda sem resposta" />}
        </dl>
        {!question || !parsed ? (
          <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
            O enunciado não está disponível: a questão saiu do acervo ou ainda está carregando. O
            registro da sua resposta continua na sua conta.
          </p>
        ) : (
          <>
            {code && <QuestionCode question={question} />}
            {parsed.base && (
              <details className="rounded-xl border bg-muted/30 p-3">
                <summary className="cursor-pointer text-sm font-semibold">
                  {parsed.baseLabel}
                </summary>
                <div className="mt-3 max-h-72 overflow-y-auto">
                  <QuestionSupportText
                    text={parsed.base}
                    citesLines={/linhas?\s+\d+/i.test(question.text)}
                  />
                </div>
              </details>
            )}
            <QuestionProse text={parsed.stem} className="text-[15px] font-medium" />
            {parsed.options.length ? (
              <ol className="space-y-2" aria-label="Alternativas">
                {parsed.options.map((option) => {
                  const right = option.letter === question.answer;
                  const chosen = option.letter === mine;
                  return (
                    <li
                      key={option.letter}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-3 text-sm",
                        right && "border-emerald-500/60 bg-emerald-500/10",
                        chosen && !right && "border-rose-500/60 bg-rose-500/10",
                      )}
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-muted text-xs font-bold">
                        {option.letter}
                      </span>
                      <span className="q-option-text min-w-0 flex-1">{option.text}</span>
                      {right && <Mark tone="ok">Gabarito</Mark>}
                      {chosen && !right && <Mark tone="bad">Sua resposta</Mark>}
                      {chosen && right && <Mark tone="ok">Sua resposta</Mark>}
                    </li>
                  );
                })}
              </ol>
            ) : (
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Info
                  label="Gabarito"
                  value={questionAnswerLabel(question.answer, question)}
                  strong
                />
                <Info
                  label="Sua resposta"
                  value={
                    mine
                      ? questionAnswerLabel(mine, question)
                      : item.result === "skipped"
                        ? "—"
                        : "…"
                  }
                  strong
                />
              </div>
            )}
            {question.explanation && (
              <section aria-label="Comentário" className="rounded-xl border bg-muted/30 p-4">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Comentário
                </h3>
                <QuestionProse text={question.explanation} className="text-sm" />
              </section>
            )}
            <div className="flex flex-wrap items-center gap-2 border-t pt-4">
              <Button asChild>
                <Link
                  to="/dashboard/question-trainer"
                  search={{ catalogQuery: code, mode: "catalog", limit: "all", go: "1" } as never}
                >
                  {item.result === "skipped" ? "Resolver agora" : "Treinar esta questão"}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <ReportQuestionButton question={question} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  icon,
  strong,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="rounded-lg border bg-muted/30 px-3 py-2">
      <dt className="flex items-center gap-1 text-[11px] text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className={cn("mt-0.5 font-semibold", strong && "text-base")}>{value}</dd>
    </div>
  );
}

function Mark({ tone, children }: { tone: "ok" | "bad"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        tone === "ok"
          ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
          : "bg-rose-500/20 text-rose-700 dark:text-rose-300",
      )}
    >
      {children}
    </span>
  );
}
