import { useEffect, useId, useRef, useState } from "react";
import { Minus, Plus, RotateCcw, Type } from "lucide-react";
import { useReadingScale } from "@/hooks/useReadingScale";
import { READING_SCALES, readingScalePercent, stepReadingScale } from "@/lib/readingScale";

/**
 * Controle de tamanho do texto de leitura (questões, simulados e materiais). Só aumenta a partir do
 * padrão: o botão de diminuir para em 100%. A preferência fica salva neste aparelho.
 */
export function ReadingSizeControl() {
  const { scale, change } = useReadingScale();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (box.current && !box.current.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  const index = READING_SCALES.findIndex((step) => step === scale);
  const percent = readingScalePercent(scale);

  return (
    <div className="reading-size" ref={box} data-open={open}>
      {open && (
        <div
          className="reading-size__panel"
          id={panelId}
          role="group"
          aria-label="Tamanho do texto"
        >
          <p className="reading-size__title">Tamanho do texto</p>
          <div className="reading-size__row">
            <button
              type="button"
              className="reading-size__step"
              onClick={() => change(stepReadingScale(scale, -1))}
              disabled={index <= 0}
              aria-label="Diminuir o texto"
            >
              <Minus aria-hidden="true" />
            </button>
            <output className="reading-size__value" aria-live="polite">
              {percent}
            </output>
            <button
              type="button"
              className="reading-size__step"
              onClick={() => change(stepReadingScale(scale, 1))}
              disabled={index >= READING_SCALES.length - 1}
              aria-label="Aumentar o texto"
            >
              <Plus aria-hidden="true" />
            </button>
          </div>
          <input
            className="reading-size__range"
            type="range"
            min={0}
            max={READING_SCALES.length - 1}
            step={1}
            value={Math.max(0, index)}
            onChange={(event) => change(READING_SCALES[Number(event.target.value)] ?? 1)}
            aria-label="Tamanho do texto"
            aria-valuetext={percent}
          />
          <div className="reading-size__ends" aria-hidden="true">
            <span>Padrão</span>
            <span>Máximo</span>
          </div>
          <p className="reading-size__hint">
            Aumenta só as letras de questões, alternativas e materiais; as caixas e botões continuam
            do mesmo tamanho.
          </p>
          <button
            type="button"
            className="reading-size__reset"
            onClick={() => change(1)}
            disabled={scale === 1}
          >
            <RotateCcw aria-hidden="true" /> Voltar ao tamanho padrão
          </button>
        </div>
      )}
      <button
        type="button"
        className="reading-size__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={`Tamanho do texto: ${percent}. ${open ? "Fechar" : "Ajustar"}`}
        title="Tamanho do texto"
      >
        <Type aria-hidden="true" />
        {scale > 1 && <span className="reading-size__badge">{percent}</span>}
      </button>
    </div>
  );
}
