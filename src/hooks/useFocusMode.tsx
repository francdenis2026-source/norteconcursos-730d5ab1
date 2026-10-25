import { platformDate } from "@/lib/platformClock";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useBlocker, useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Clock3, Maximize2, Pause, Play, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import type { ToolsArea } from "@/components/study/StudyTools";
import { confirmDialog } from "@/lib/confirm";
import {
  beginFocus,
  endFocus,
  getFocusSession,
  goAway,
  setFocusPaused,
  subscribeFocusSession,
  tickFocus,
} from "@/lib/focusSession";

// O painel de ferramentas só abre sob demanda: fora do pacote inicial de todas as páginas do painel.
const StudyToolsPanel = lazy(() =>
  import("@/components/study/StudyTools").then((m) => ({ default: m.StudyToolsPanel })),
);

const pad = (n: number) => String(n).padStart(2, "0");
export const hms = (s: number) =>
  `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;

/** Áreas para onde o aluno pode ir sem encerrar o foco: o relógio pausa e volta de onde parou. */
const PAUSE_DESTINATIONS = [
  { path: "/dashboard/question-trainer", name: "Questões" },
  { path: "/dashboard/question-bank", name: "o Acervo de questões" },
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
  const [now, setNow] = useState(() => platformDate());
  const [toolsOpen, setToolsOpen] = useState(false);
  const [barHeight, setBarHeight] = useState(64);
  const barRef = useRef<HTMLElement | null>(null);
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
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      void document.documentElement.requestFullscreen().catch(() => {});
    }
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
        if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
      }
    } finally {
      exiting.current = false;
    }
  }, []);

  useEffect(() => {
    if (!focus) {
      setToolsOpen(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") void requestExit();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setInterval(() => {
      setNow(platformDate());
      tickFocus();
    }, 1000);
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

  useEffect(() => {
    if (!focus || !barRef.current) return;
    const header = barRef.current;
    const measure = () => {
      const height = Math.ceil(header.getBoundingClientRect().height);
      setBarHeight(height);
      header
        .closest<HTMLElement>(".focus-study-container")
        ?.style.setProperty("--focus-bar-height", `${height}px`);
    };
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(header);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [focus]);

  /** Classes do contêiner do conteúdo: tela cheia, abaixo da faixa fixa do topo. */
  const containerClass = focus
    ? [
        "focus-study-container fixed inset-0 z-[60] max-w-none! overflow-y-auto bg-background px-4 pb-10 pt-0 sm:px-8 text-[17px] leading-8",
        // explicação do artigo em duas colunas, sem quebrar os blocos no meio
        "lg:[&_section[aria-label='Entenda_este_artigo']]:columns-2 lg:[&_section[aria-label='Entenda_este_artigo']]:gap-10",
        "[&_section[aria-label='Entenda_este_artigo']>*]:break-inside-avoid [&_section[aria-label='Entenda_este_artigo']>*]:mb-4",
        "[&_.library-body]:max-w-none",
      ].join(" ")
    : "";

  /** Botão para entrar no modo foco (fora dele). */
  const button = (
    <Button type="button" size="sm" variant="outline" className="no-print" onClick={enter}>
      <Maximize2 className="mr-1 h-4 w-4" /> Tela cheia de leitura
    </Button>
  );

  /** Faixa colorida fixa do topo, com relógio, navegação e ferramentas. Só existe em foco. */
  const bar = (p: FocusBarProps) =>
    !focus ? null : (
      <>
        <header
          ref={barRef}
          className="focus-study-bar sticky top-0 z-[61] bg-gradient-to-r from-slate-900 to-sky-900 text-white shadow-md"
          aria-label="Controles do modo foco"
          role="banner"
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 lg:grid-cols-[minmax(120px,1fr)_auto_auto]">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold uppercase tracking-widest text-white/75">
                {p.kicker}
              </p>
              <p className="truncate text-sm font-bold leading-tight sm:text-base">{p.title}</p>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-xl bg-black/20 px-2 py-1"
              aria-label="Tempo de estudo nesta sessão"
            >
              <Clock3 className="h-4 w-4 text-amber-300" aria-hidden />
              <div className="leading-tight">
                <p className="font-mono text-sm font-bold tabular-nums" aria-live="off">
                  {hms(elapsed)}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-white/70">
                  {paused ? "pausado" : "tempo de estudo"} ·{" "}
                  {now.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "America/Rio_Branco",
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFocusPaused(!paused)}
                className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-white/15 hover:bg-white/25"
                aria-label={paused ? "Retomar contagem" : "Pausar contagem"}
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            </div>
            <div className="focus-study-actions col-span-2 flex min-w-0 flex-wrap items-center justify-end gap-1.5 lg:col-span-1">
              <nav className="flex items-center gap-1.5" aria-label="Navegação do modo foco">
                <Hint content={p.prevLabel ?? "Anterior"}>
                  <button
                    type="button"
                    disabled={!p.onPrev}
                    onClick={p.onPrev}
                    aria-label={p.prevLabel ?? "Anterior"}
                    className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/25 disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />{" "}
                    <span className="hidden sm:inline">Anterior</span>
                  </button>
                </Hint>
                {p.position && (
                  <span className="hidden whitespace-nowrap px-1 text-xs font-medium text-white/85 xl:inline">
                    {p.position}
                  </span>
                )}
                <Hint content={p.nextLabel ?? "Próxima"}>
                  <button
                    type="button"
                    disabled={!p.onNext}
                    onClick={p.onNext}
                    aria-label={p.nextLabel ?? "Próxima"}
                    className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-bold text-amber-800 hover:bg-white/90 disabled:opacity-40"
                  >
                    <span className="hidden sm:inline">Próxima</span>{" "}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </Hint>
              </nav>
              {p.tools && (
                <button
                  type="button"
                  onClick={() => setToolsOpen((v) => !v)}
                  aria-pressed={toolsOpen}
                  aria-label="Ferramentas"
                  className="flex items-center gap-1.5 rounded-lg bg-amber-400 px-3 py-2 text-sm font-bold text-amber-950 hover:bg-amber-300"
                >
                  <Wrench className="h-4 w-4" />{" "}
                  <span className="hidden sm:inline">Ferramentas</span>
                </button>
              )}
              {p.extra}
              <Hint content="Sair do modo foco (Esc)">
                <button
                  type="button"
                  onClick={() => void requestExit()}
                  aria-label="Sair do modo foco"
                  className="flex items-center gap-1 rounded-lg border border-white/40 px-3 py-2 text-sm font-semibold hover:bg-white/15"
                >
                  <X className="h-4 w-4" /> <span className="hidden sm:inline">Sair</span>
                </button>
              </Hint>
            </div>
          </div>
          {p.progress !== undefined && (
            <div
              className="h-1 bg-black/25"
              role="progressbar"
              aria-valuenow={Math.round(p.progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progresso do curso"
            >
              <div
                className="h-full bg-gradient-to-r from-amber-300 to-emerald-300 transition-[width]"
                style={{ width: `${Math.min(100, Math.max(0, p.progress))}%` }}
              />
            </div>
          )}
        </header>
        {p.tools && toolsOpen && (
          <Suspense fallback={null}>
            <StudyToolsPanel
              area={p.tools}
              notesKey={p.notesKey}
              topOffset={barHeight}
              onClose={() => setToolsOpen(false)}
            />
          </Suspense>
        )}
      </>
    );

  return { focus, setFocus, containerClass, button, bar };
}
