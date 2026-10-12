import { useMemo, useSyncExternalStore } from "react";
import { Highlighter } from "lucide-react";
import { STUDY_LABELS, studyTextParts, type StudyKind } from "@/lib/studyHighlight";

const KEY = "norte_destaques";
let enabled = true;
try { enabled = localStorage.getItem(KEY) !== "0"; } catch { /* sem armazenamento: destaques ligados */ }
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };

/** Preferência global do aluno: destaques didáticos ligados ou desligados em todas as telas. */
export function useHighlightEnabled() {
  return useSyncExternalStore(subscribe, () => enabled, () => true);
}
export function setHighlightEnabled(value: boolean) {
  enabled = value;
  try { localStorage.setItem(KEY, value ? "1" : "0"); } catch { /* sem armazenamento */ }
  listeners.forEach((fn) => fn());
}

/** Texto com requisitos, exceções, números, penas, proibições e rótulos (ATUALIZAÇÃO, Exemplo...) destacados. */
export function StudyText({ text }: { text: string }) {
  const on = useHighlightEnabled();
  const parts = useMemo(() => (on ? studyTextParts(text) : null), [on, text]);
  if (!parts || (parts.length === 1 && !parts[0]!.kind && !parts[0]!.tag)) return <>{text}</>;
  return (
    <>
      {parts.map((p, i) =>
        p.tag ? <span key={i} className={`study-tag study-tag-${p.tag}`}>{p.text}</span>
        : p.kind ? <mark key={i} className={`legal-highlight legal-highlight-${p.kind}`} title={STUDY_LABELS[p.kind]}>{p.text}</mark>
        : <span key={i}>{p.text}</span>,
      )}
    </>
  );
}

const LEGEND: StudyKind[] = ["quantity", "requirement", "exception", "prohibition", "obligation", "sanction"];

/** Chave para ligar e desligar os destaques, com a legenda das cores. */
export function HighlightToggle({ legend = true }: { legend?: boolean }) {
  const on = useHighlightEnabled();
  return (
    <div className="no-print flex flex-wrap items-center gap-2 text-xs">
      <button type="button" aria-pressed={on} onClick={() => setHighlightEnabled(!on)} className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 font-semibold hover:bg-muted">
        <Highlighter className="h-3.5 w-3.5" aria-hidden /> {on ? "Destaques ligados" : "Destaques desligados"}
      </button>
      {on && legend && LEGEND.map((k) => <span key={k} className={`legal-highlight legal-highlight-${k}`}>{STUDY_LABELS[k]}</span>)}
    </div>
  );
}
