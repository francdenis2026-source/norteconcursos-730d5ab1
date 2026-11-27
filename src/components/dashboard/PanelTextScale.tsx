import { useEffect, useRef, useState } from "react";
import { RotateCcw, Type } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import "./PanelTextScale.css";

/** Só aumenta a partir do padrão (100%). Cada passo muda apenas o texto de leitura. */
const LEVELS = [1, 1.08, 1.16, 1.25, 1.35] as const;
const LABELS = ["Padrão", "Médio", "Grande", "Maior", "Máximo"] as const;
const KEY = "norte:panel-text-scale";
function valid(value: number) {
  return LEVELS.find((v) => Math.abs(v - value) < 0.001) ?? 1;
}
function apply(value: number) {
  document.documentElement.style.setProperty("--panel-text-scale", String(value));
}

export function PanelTextScale() {
  const [scale, setScale] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stored = 1;
    try {
      stored = valid(Number(window.localStorage.getItem(KEY)));
    } catch {
      /* Storage optional */
    }
    setScale(stored);
    apply(stored);
    return () => {
      document.documentElement.style.removeProperty("--panel-text-scale");
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const esc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const change = (value: number) => {
    const next = valid(value);
    setScale(next);
    apply(next);
    try {
      window.localStorage.setItem(KEY, String(next));
    } catch {
      /* Storage optional */
    }
  };
  const index = LEVELS.findIndex((v) => v === scale);

  return (
    <div className="panel-text-control" ref={ref}>
      <Hint content="Tamanho dos textos">
        <button
          type="button"
          className="panel-text-control__trigger"
          data-active={scale > 1 || undefined}
          aria-label="Ajustar tamanho dos textos do painel"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Type aria-hidden="true" />
        </button>
      </Hint>
      {open && (
        <div className="panel-text-control__popover" role="group" aria-label="Tamanho dos textos do painel">
          <header>
            <strong>Tamanho dos textos</strong>
            <output aria-live="polite">{Math.round(scale * 100)}%</output>
          </header>
          <div className="panel-text-control__preview" style={{ fontSize: `${scale}em` }} aria-hidden="true">
            Aa <span>{LABELS[index]}</span>
          </div>
          <div className="panel-text-control__scale" role="radiogroup" aria-label="Nível do texto">
            {LEVELS.map((level, i) => (
              <button
                key={level}
                type="button"
                role="radio"
                aria-checked={i === index}
                aria-label={`${LABELS[i]}, ${Math.round(level * 100)}%`}
                data-on={i <= index || undefined}
                onClick={() => change(level)}
              >
                <i aria-hidden="true" style={{ fontSize: `${11 + i * 2.5}px` }}>A</i>
              </button>
            ))}
          </div>
          <footer>
            <span>Só o texto muda; cards, menus e botões ficam como estão.</span>
            <button type="button" className="panel-text-control__reset" disabled={scale === 1} onClick={() => change(1)}>
              <RotateCcw aria-hidden="true" /> 100%
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}
