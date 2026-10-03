import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOON_LABEL } from "@/lib/launch.config";

/** Selo discreto "Em breve" para recursos ainda não liberados. */
export function SoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300",
        className,
      )}
    >
      <Clock className="h-3 w-3" aria-hidden /> {SOON_LABEL}
    </span>
  );
}
