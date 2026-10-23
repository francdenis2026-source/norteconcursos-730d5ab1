import { useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw, Type } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import "./PanelTextScale.css";

const LEVELS = [0.94, 0.97, 1, 1.04, 1.08, 1.12] as const;
const KEY = "norte:panel-text-scale";
function valid(value: number) { return LEVELS.find(v => Math.abs(v - value) < 0.001) ?? 1; }

export function PanelTextScale() {
  const [scale, setScale] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stored = 1;
    try { stored = valid(Number(window.localStorage.getItem(KEY))); } catch { /* Storage optional */ }
    setScale(stored);
    document.documentElement.style.setProperty("--panel-text-scale", String(stored));
    return () => document.documentElement.style.removeProperty("--panel-text-scale");
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false); };
    const esc = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", esc); };
  }, [open]);
  const change = (value: number) => {
    const next = valid(value);
    setScale(next);
    document.documentElement.style.setProperty("--panel-text-scale", String(next));
    try { window.localStorage.setItem(KEY, String(next)); } catch { /* Storage optional */ }
  };
  const index = LEVELS.findIndex(v => v === scale);
  return <div className="panel-text-control" ref={ref}>
    <Hint content="Ajustar textos do painel">
      <button type="button" className="panel-text-control__trigger" aria-label="Ajustar tamanho dos textos do painel" aria-expanded={open} onClick={() => setOpen(v => !v)}>
        <Type aria-hidden="true" />
      </button>
    </Hint>
    {open && <div className="panel-text-control__popover" role="group" aria-label="Tamanho dos textos do painel">
      <strong>Tamanho dos textos</strong>
      <p>Somente o conteúdo das páginas. Menus, botões e áreas permanecem no tamanho atual.</p>
      <div className="panel-text-control__steps">
        <button type="button" disabled={index === 0} aria-label="Diminuir textos" onClick={() => change(LEVELS[Math.max(0, index - 1)]!)}><Minus aria-hidden="true" /></button>
        <output aria-live="polite">{Math.round(scale * 100)}%</output>
        <button type="button" disabled={index === LEVELS.length - 1} aria-label="Aumentar textos" onClick={() => change(LEVELS[Math.min(LEVELS.length - 1, index + 1)]!)}><Plus aria-hidden="true" /></button>
      </div>
      <button type="button" className="panel-text-control__reset" disabled={scale === 1} onClick={() => change(1)}><RotateCcw aria-hidden="true" /> Restaurar 100%</button>
    </div>}
  </div>;
}
