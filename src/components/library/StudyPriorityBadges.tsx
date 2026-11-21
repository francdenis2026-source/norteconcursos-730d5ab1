import { studyPriorityFor, studyPriorityLabel } from "@/lib/studyPriority";

const styles = {
  "muito-alta": "border-rose-300/70 bg-rose-50 text-rose-800 dark:border-rose-400/25 dark:bg-rose-950/35 dark:text-rose-200",
  alta: "border-amber-300/70 bg-amber-50 text-amber-800 dark:border-amber-400/25 dark:bg-amber-950/35 dark:text-amber-200",
  media: "border-sky-300/70 bg-sky-50 text-sky-800 dark:border-sky-400/25 dark:bg-sky-950/35 dark:text-sky-200",
} as const;

/** Selo compacto, aplicado ao assunto conforme o edital associado ao conteúdo. */
export function StudyPriorityBadges({
  contestName,
  discipline,
  topic,
  className = "",
}: {
  contestName?: string | null;
  discipline: string;
  topic: string;
  className?: string;
}) {
  const priority = studyPriorityFor(contestName, discipline, topic);
  if (!priority) return null;
  return (
    <span className={`inline-flex flex-wrap items-center gap-1.5 ${className}`} aria-label={studyPriorityLabel(priority)}>
      <span className={`inline-flex min-h-5 items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold leading-none tracking-wide ${styles[priority.level]}`}>
        {priority.level === "muito-alta" ? "PRIORIDADE MUITO ALTA" : priority.level === "alta" ? "PRIORIDADE ALTA" : "PRIORIDADE MÉDIA"}
      </span>
      {priority.top20 && (
        <span className="inline-flex min-h-5 items-center rounded-md border border-yellow-500/40 bg-yellow-50 px-1.5 py-0.5 text-[10px] font-bold leading-none tracking-wide text-yellow-800 dark:bg-yellow-950/35 dark:text-yellow-200">
          TOP 20
        </span>
      )}
    </span>
  );
}
