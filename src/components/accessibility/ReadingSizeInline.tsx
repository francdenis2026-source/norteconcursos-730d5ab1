import { Minus, Plus } from "lucide-react";
import { useReadingScale } from "@/hooks/useReadingScale";
import { READING_SCALES, readingScalePercent, stepReadingScale } from "@/lib/readingScale";
import { cn } from "@/lib/utils";

/**
 * Controle de tamanho do texto junto da questão: "Tamanho do texto  A−  100%  A+". Só aumenta a
 * partir do padrão (o botão de diminuir para em 100%). Fica salvo neste aparelho.
 */
export function ReadingSizeInline({ className }: { className?: string }) {
  const { scale, change } = useReadingScale();
  const index = READING_SCALES.findIndex((step) => step === scale);
  return (
    <div className={cn("reading-inline", className)} role="group" aria-label="Tamanho do texto">
      <span className="reading-inline__label">Tamanho do texto</span>
      <button
        type="button"
        className="reading-inline__btn"
        onClick={() => change(stepReadingScale(scale, -1))}
        disabled={index <= 0}
        aria-label="Diminuir o texto"
        title="Diminuir o texto (não passa do tamanho padrão)"
      >
        <span aria-hidden="true" className="reading-inline__small">
          A
        </span>
        <Minus aria-hidden="true" />
      </button>
      <output className="reading-inline__value" aria-live="polite">
        {readingScalePercent(scale)}
      </output>
      <button
        type="button"
        className="reading-inline__btn"
        onClick={() => change(stepReadingScale(scale, 1))}
        disabled={index >= READING_SCALES.length - 1}
        aria-label="Aumentar o texto"
        title="Aumentar o texto"
      >
        <span aria-hidden="true" className="reading-inline__big">
          A
        </span>
        <Plus aria-hidden="true" />
      </button>
    </div>
  );
}
