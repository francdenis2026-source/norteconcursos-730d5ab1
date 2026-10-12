import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useBlocker, useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Clock3, Maximize2, Pause, Play, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudyToolsPanel, type ToolsArea } from "@/components/study/StudyTools";
import { confirmDialog } from "@/lib/confirm";
import { beginFocus, endFocus, getFocusSession, goAway, setFocusPaused, subscribeFocusSession, tickFocus } from "@/lib/focusSession";

const pad = (n: number) => String(n).padStart(2, "0");
export const hms = (s: number) => `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;

/** Áreas para onde o aluno pode ir sem encerrar o foco: o relógio pausa e volta de onde parou. */
const PAUSE_DESTINATIONS = [
  { path: "/dashboard/question-trainer", name: "Questões" },
  { path: "/dashboard/question-bank", name: "o Banco de questões" },
  { path: "/dashboard/dicionario", name: "o Dicionário" },
];

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
 * Traz relógio de estudo com pausa, faixa colorida, navegação e ferramentas.
 * Sair da área pede confirmação; ir a Questões ou Dicionário pausa o relógio, que continua de onde parou ao voltar.
 */
export function useFocusMode() {
  const router = useRouter();
  const [focus, setFocus] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [toolsOpen, setToolsOpen] = useState(false);
  const session = useSyncExternalStore(subscribeFocusSession, getFocusSession, () => null);
  const exiting = useRef(false);
  const href = useCallback(() => router.state.location.href, [router]);
  const elapsed = session?.elapsed ?? 0;
  const paused = session?.paused ?? false;

  // Voltou de Questões ou Dicionário para a mesma área: retoma o foco e o relógio de onde pararam.
  useEffect(() => {
    const s = getFocusSession();
    if (s?.away && s.returnTo === href()) {
      beginFocus(s.returnTo, s.title);
      setFocus(true);
    }
  }, [href]);

  const enter = useCallback(() => {
    beginFocus(href(), "");
    setFocus(true);
  }, [href]);

  const requestExit = useCallback(async () => {
    if (exiting.current) return;
    exiting.current = true;
    try {
      const ok = await confirmDialog({
        title: "Encerrar o modo foco?",
        message: `O tempo de estudo desta sessão (${hms(getFocusSession()?.elapsed ?? 0)}) será encerrado.`,
        confirmLabel: "Encerrar",
        cancelLabel: "Continuar estudando",
        tone: "default",
      });
      if (ok) {
        endFocus();
        setFocus(false);
      }
    } finally {
      exiting.current = false;
    }
  }, []);

  useEffect(() => {
    if (!focus) { setToolsOpen(false); return; }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") void requestExit(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setInterval(() => { setNow(new Date()); tickFocus(); }, 1000);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearInterval(id);
    };
  }, [focus, requestExit]);

  // Avisa ao tentar sair da área (fechar a aba, recarregar ou navegar para outra tela).
  useBlocker({
    disabled: !focus,
    enableBeforeUnload: () => focus,
    shouldBlockFn: async ({ current, next }) => {
      if (next.routeId === current.routeId) return false; // trocar de aula, artigo ou material não sai da área
      const pause = PAUSE_DESTINATIONS.find((d) => next.pathname.startsWith(d.path));
      if (pause) {
        const ok = await confirmDialog({
          title: "Pausar o relógio de estudo?",
          message: `Você vai para ${pause.name}. O relógio de estudo ficará parado e continuará de onde parou quando você voltar à área de estudo. O horário exibido segue o real. Um botão no topo leva você de volta.`,
          confirmLabel: "Ir e pausar o relógio",
          cancelLabel: "Continuar estudando",
          tone: "default",
        });
        if (ok) {
          goAway(href());
          setFocus(false);
        }
        return !ok;
      }
      const ok = await confirmDialog({
        title: "Sair da área de estudo?",
        message: `Seu tempo de estudo (${hms(getFocusSession()?.elapsed ?? 0)}) está sendo contabilizado. Se sair, a sessão de foco será encerrada.`,
        confirmLabel: "Sair e encerrar",
        cancelLabel: "Continuar estudando",
        tone: "default",
      });
      if (ok) {
        endFocus();
        setFocus(false);
      }
      return !ok;
    },
  });

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

  /** Chamada visual para entrar no modo foco (fora dele): o relógio de estudo começa a contar ao clicar. */
  const button = (
    <button
      type="button"
      onClick={enter}
      className="no-print group relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-4 py-2.5 text-left text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
      aria-label="Começar a estudar em modo foco: tela cheia com relógio de estudo"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/20 transition group-hover:bg-white/30"><Play className="h-4 w-4 fill-current" aria-hidden /></span>
      <span className="leading-tight">
        <span className="block text-sm font-bold">Começar a estudar</span>
        <span className="block text-[11px] text-white/80">Modo foco · tela cheia e relógio de estudo</span>
      </span>
      <Maximize2 className="h-4 w-4 text-white/70" aria-hidden />
      <span className="absolute -right-1 -top-1 flex h-3 w-3" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400" />
      </span>
    </button>
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
              <button type="button" onClick={() => setFocusPaused(!paused)} className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25" aria-label={paused ? "Retomar contagem" : "Pausar contagem"}>
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
            <button type="button" onClick={() => void requestExit()} className="flex items-center gap-1 rounded-lg border border-white/40 px-3 py-2 text-sm font-semibold hover:bg-white/15">
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
