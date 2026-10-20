// Linha do tempo de provas e simulados: nota da tentativa, aproveitamento e pontos de ranking,
// cada um no seu lugar (ver src/lib/attemptHistory.ts).
import { Clock, Medal } from "lucide-react";
import { acreDate } from "@/lib/acreTime";
import { formatScore } from "@/lib/examScoring";
import { formatDuration, type AttemptWithDetails } from "@/lib/attemptDetails";
import { cn } from "@/lib/utils";

export function AttemptHistoryItem({ item }: { item: AttemptWithDetails }) {
  const { details } = item;
  const answered = item.correct_answers + item.wrong_answers;
  const ofAnswered = answered ? Math.round((item.correct_answers / answered) * 100) : 0;
  return (
    <li className="rounded-xl border bg-card p-3 text-sm" data-attempt-id={item.id}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-bold">{item.title}</p>
          <p className="flex flex-wrap items-center gap-x-2 text-[11px] text-muted-foreground">
            <span>
              {acreDate(item.finished_at).toLocaleDateString("pt-BR", {
                timeZone: "America/Rio_Branco",
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {formatDuration(item.duration_seconds)}
            </span>
            <span className="font-mono">#{item.id.slice(0, 8).toUpperCase()}</span>
          </p>
        </div>
        <div className="text-right">
          <p
            className={cn(
              "text-lg font-black leading-none",
              details.score < 0 ? "text-red-600" : "text-foreground",
            )}
            title={details.rule.description}
          >
            {formatScore(details.score)}
            <span className="text-xs font-semibold text-muted-foreground">
              {" "}
              / {formatScore(details.maxScore)}
            </span>
          </p>
          <p className="text-[10px] text-muted-foreground">nota · {details.rule.label}</p>
        </div>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs sm:grid-cols-5">
        <Stat label="Questões" value={item.total_questions} />
        <Stat label="Respondidas" value={answered} />
        <Stat label="Acertos" value={item.correct_answers} />
        <Stat label="Erros" value={item.wrong_answers} />
        <Stat label="Em branco" value={item.blank_answers} />
      </dl>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Aproveitamento: {Math.round(item.accuracy)}% do total · {ofAnswered}% das respondidas.
        {!details.ruleRecorded &&
          " Esta tentativa não tem regra de correção registrada; a nota foi calculada sem desconto por erro."}
      </p>
      {details.ranking ? (
        <p className="mt-1 flex flex-wrap items-center gap-1 text-[11px]">
          <Medal className="h-3 w-3 text-amber-600" aria-hidden="true" />
          <span className="font-semibold">Ranking: +{details.ranking.points} pts</span>
          <span className="text-muted-foreground">
            ·{" "}
            {details.ranking.repeated > 0
              ? `${details.ranking.repeated} ${details.ranking.repeated === 1 ? "resposta era" : "respostas eram"} de questões já respondidas e não ${details.ranking.repeated === 1 ? "gerou" : "geraram"} pontos`
              : "todas as respostas eram inéditas"}
            {!details.ranking.attemptValid && " · tempo insuficiente para pontuar no ranking"}
          </span>
        </p>
      ) : (
        <p className="mt-1 text-[11px] text-muted-foreground">
          Pontos de ranking desta tentativa indisponíveis no momento.
        </p>
      )}
    </li>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-bold">{value}</dd>
    </div>
  );
}

export function AttemptHistoryList({ items }: { items: AttemptWithDetails[] }) {
  return (
    <ul className="space-y-3" aria-label="Tentativas de provas e simulados">
      {items.map((item) => (
        <AttemptHistoryItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
