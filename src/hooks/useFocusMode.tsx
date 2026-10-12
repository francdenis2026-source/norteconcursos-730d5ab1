import { useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Clock3, Maximize2, Pause, Play, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudyToolsPanel, type ToolsArea } from "@/components/study/StudyTools";

const pad = (n: number) => String(n).padStart(2, "0");
const hms = (s: number) => `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;

export type FocusBarProps = {
  /** Linha pequena acima do título (matéria, lei, curso). */
  kicker: string;
  title: string;
  /** Ex.: "aula 3 de 9". */
  position?: string;
  /** Progresso de 0 a 100, exibido como barra. */
  progress?: number;
  onPrev?: (() => void) | undefined;
  onNext?: (() => void) | undefined;
  prevLabel?: string;
  nextLabel?: string;
  tools?: ToolsArea;
  /** Chave para guardar as anotações (por página). */
  notesKey: string;
  extra?: ReactNode;
};

/**
 * Modo foco: o conteúdo em estudo ocupa a tela inteira, sem menu, topo nem listas laterais.
 * O mesmo elemento só troca de classe (não remonta), então respostas e anotações não se perdem.
 * Traz relógio de estudo (tempo da sessão com pausa), faixa colorida, navegação e ferramentas. Esc sai.
 */
export function useFocusMode() {
  const [focus, setFocus] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    if (!focus) { setToolsOpen(false); return; }
    setElapsed(0);
    setPaused(false);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFocus(false); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [focus]);

  useEffect(() => {
    if (!focus) return;
    const id = window.setInterval(() => { setNow(new Date()); if (!document.hidden) setElapsed((s) => (paused ? s : s + 1)); }, 1000);
    return () => window.clearInterval(id);
  }, [focus, paused]);

  /** Classes do contêiner do conteúdo: tela cheia, abaixo da faixa fixa do topo. */
  const containerClass = focus
    ? [
        "fixed inset-0 z-[60] max-w-none! overflow-y-auto bg-background px-4 pb-10 pt-24 sm:px-10 text-[17px] leading-8",
        "[&>*]:mx-auto [&>*]:max-w-6xl",
        // explicação do artigo em duas colunas, sem quebrar os blocos no meio
        "lg:[&_section[aria-label='Entenda_este_artigo']]:columns-2 lg:[&_section[aria-label='Entenda_este_artigo']]:gap-10",
        "[&_section[aria-label='Entenda_este_artigo']>*]:break-inside-avoid [&_section[aria-label='Entenda_este_artigo']>*]:mb-4",
        "[&_.library-body]:max-w-none",
      ].join(" ")
    : "";

  /** Botão para entrar no modo foco (fora dele). */
  const button = (
    <Button type="button" size="sm" variant="outline" className="no-print" onClick={() => setFocus(true)}>
      <Maximize2 className="mr-1 h-4 w-4" /> Modo foco
    </Button>
  );

  /** Faixa colorida fixa do topo, com relógio, navegação e ferramentas. Só existe em foco. */
  const bar = (p: FocusBarProps) =>
    !focus ? null : (
      <>
        <header className="fixed inset-x-0 top-0 z-[61] bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white shadow-lg" role="banner">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-8">
            <div className="min-w-0 flex-1 basis-60">
              <p className="truncate text-[11px] font-semibold uppercase tracking-widest text-white/75">{p.kicker}</p>
              <p className="truncate text-base font-bold leading-tight sm:text-lg">{p.title}</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-black/25 px-3 py-1.5" aria-label="Tempo de estudo nesta sessão">
              <Clock3 className="h-4 w-4 text-amber-300" aria-hidden />
              <div className="leading-tight">
                <p className="font-mono text-lg font-bold tabular-nums" aria-live="off">{hms(elapsed)}</p>
                <p className="text-[10px] uppercase tracking-wider text-white/70">{paused ? "pausado" : "tempo de estudo"} · {now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Rio_Branco" })}</p>
              </div>
              <button type="button" onClick={() => setPaused((v) => !v)} className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25" aria-label={paused ? "Retomar contagem" : "Pausar contagem"}>
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            </div>
            <nav className="flex items-center gap-1.5" aria-label="Navegação do modo foco">
              <button type="button" disabled={!p.onPrev} onClick={p.onPrev} className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/25 disabled:opacity-40">
                <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">{p.prevLabel ?? "Anterior"}</span>
              </button>
              {p.position && <span className="hidden px-1 text-sm font-medium text-white/85 md:inline">{p.position}</span>}
              <button type="button" disabled={!p.onNext} onClick={p.onNext} className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-bold text-indigo-800 hover:bg-white/90 disabled:opacity-40">
                <span className="hidden sm:inline">{p.nextLabel ?? "Próxima"}</span> <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
            {p.tools && (
              <button type="button" onClick={() => setToolsOpen((v) => !v)} aria-pressed={toolsOpen} className="flex items-center gap-1.5 rounded-lg bg-amber-400 px-3 py-2 text-sm font-bold text-amber-950 hover:bg-amber-300">
                <Wrench className="h-4 w-4" /> Ferramentas
              </button>
            )}
            {p.extra}
            <button type="button" onClick={() => setFocus(false)} className="flex items-center gap-1 rounded-lg border border-white/40 px-3 py-2 text-sm font-semibold hover:bg-white/15">
              <X className="h-4 w-4" /> Sair <span className="hidden text-white/70 lg:inline">(Esc)</span>
            </button>
          </div>
          {p.progress !== undefined && (
            <div className="h-1.5 bg-black/25" role="progressbar" aria-valuenow={Math.round(p.progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso do curso">
              <div className="h-full bg-gradient-to-r from-amber-300 to-emerald-300 transition-all" style={{ width: `${Math.min(100, Math.max(0, p.progress))}%` }} />
            </div>
          )}
        </header>
        {p.tools && toolsOpen && <StudyToolsPanel area={p.tools} notesKey={p.notesKey} onClose={() => setToolsOpen(false)} />}
      </>
    );

  return { focus, setFocus, containerClass, button, bar };
}
