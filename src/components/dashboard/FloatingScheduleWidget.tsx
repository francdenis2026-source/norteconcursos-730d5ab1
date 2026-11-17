import * as React from "react";
import { Link } from "@tanstack/react-router";
import { CalendarClock, ChevronDown, Clock3, Coffee, GripHorizontal } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useFloatingSchedule } from "@/hooks/useFloatingSchedule";
import "@/styles/floating-schedule-widget.css";

const two = (n: number) => String(n).padStart(2, "0");
const fmtRemaining = (min: number) => (min >= 60 ? `${Math.floor(min / 60)}h${min % 60 ? two(min % 60) : ""}` : `${min} min`);

const STORAGE_PREFIX = "norte:floating-schedule:v1:";

interface StoredState { minimized: boolean; x: number; y: number }

function readStored(userId: string): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + userId);
    if (!raw) return { minimized: false, x: 0, y: 0 };
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      minimized: !!parsed.minimized,
      x: Number.isFinite(parsed.x) ? Number(parsed.x) : 0,
      y: Number.isFinite(parsed.y) ? Number(parsed.y) : 0,
    };
  } catch {
    return { minimized: false, x: 0, y: 0 };
  }
}

function writeStored(userId: string, state: StoredState) {
  try {
    localStorage.setItem(STORAGE_PREFIX + userId, JSON.stringify(state));
  } catch {
    /* preferência opcional */
  }
}

/**
 * Widget flutuante do cronograma: mostra o bloco de estudo de agora (ou o intervalo/próximo
 * horário) sem o aluno precisar abrir e fechar a página do cronograma. Só aparece quando há
 * um cronograma por edital configurado e válido. Recolhível, arrastável e com posição/estado
 * lembrados por aluno. Escondido em telas de tela cheia (simulado, leitura) para não distrair.
 */
export function FloatingScheduleWidget({ hidden }: { hidden?: boolean }) {
  const { user } = useAuthStatus();
  const userId = user?.id;
  const { ready, plan, status } = useFloatingSchedule(userId);

  const [stored, setStored] = React.useState<StoredState>({ minimized: false, x: 0, y: 0 });
  React.useEffect(() => {
    if (userId) setStored(readStored(userId));
  }, [userId]);

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const dragState = React.useRef<{ startX: number; startY: number; baseX: number; baseY: number; moved: boolean } | null>(null);

  const clamp = React.useCallback((x: number, y: number) => {
    const el = rootRef.current;
    const margin = 8;
    if (!el) return { x, y };
    const rect = el.getBoundingClientRect();
    const maxX = margin;
    const minX = -(window.innerWidth - rect.width - margin);
    const maxY = -margin;
    const minY = -(window.innerHeight - rect.height - margin);
    return { x: Math.min(maxX, Math.max(minX, x)), y: Math.min(maxY, Math.max(minY, y)) };
  }, []);

  const persist = React.useCallback(
    (next: StoredState) => {
      setStored(next);
      if (userId) writeStored(userId, next);
    },
    [userId],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragState.current = { startX: e.clientX, startY: e.clientY, baseX: stored.x, baseY: stored.y, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragState.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.moved = true;
    const next = clamp(drag.baseX + dx, drag.baseY + dy);
    setStored((prev) => ({ ...prev, ...next }));
  };
  const onPointerUp = () => {
    const drag = dragState.current;
    dragState.current = null;
    if (drag) persist({ ...stored });
  };

  const toggleMinimized = () => persist({ ...stored, minimized: !stored.minimized });

  if (!userId || !ready || !status || status.state === "vazio" || hidden) return null;

  const style: React.CSSProperties = { transform: `translate(${stored.x}px, ${stored.y}px)` };

  const summary = (() => {
    switch (status.state) {
      case "estudando": {
        const total = status.block.endMin - status.block.startMin;
        const elapsed = Math.min(total, Math.max(0, total - status.remainingMin));
        return {
          icon: <Clock3 aria-hidden />,
          label: "Agora",
          title: status.block.nome ?? "Estudo",
          detail: status.block.topic,
          chip: `faltam ${fmtRemaining(status.remainingMin)}`,
          progress: total > 0 ? elapsed / total : 0,
          next: status.next ? `Depois: ${status.next.nome} às ${status.next.start}` : null,
        };
      }
      case "intervalo":
        return {
          icon: <Coffee aria-hidden />,
          label: "Intervalo",
          title: "Fora do horário de estudo",
          detail: null,
          chip: status.next ? `volta em ${fmtRemaining(status.remainingMin)}` : null,
          progress: null,
          next: status.next ? `Próximo: ${status.next.nome} às ${status.next.start}` : null,
        };
      case "antes":
        return {
          icon: <Coffee aria-hidden />,
          label: "Ainda não começou",
          title: `Seu estudo começa às ${status.next.start}`,
          detail: status.next.nome,
          chip: null,
          progress: null,
          next: null,
        };
      case "concluido":
      default:
        return {
          icon: <CalendarClock aria-hidden />,
          label: "Hoje",
          title: "Cronograma de hoje concluído",
          detail: "Bom descanso. Volte no próximo dia programado.",
          chip: null,
          progress: null,
          next: null,
        };
    }
  })();

  return (
    <div
      ref={rootRef}
      className="floating-schedule"
      data-minimized={stored.minimized}
      data-state={status.state}
      style={style}
    >
      {stored.minimized ? (
        <button
          type="button"
          className="floating-schedule__chip"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onClick={() => {
            if (dragState.current?.moved) return;
            toggleMinimized();
          }}
          aria-label="Abrir o cronograma de agora"
        >
          {summary.icon}
          <span className="floating-schedule__chip-text">{summary.chip ?? summary.label}</span>
        </button>
      ) : (
        <section className="floating-schedule__card" role="status" aria-label="Cronograma de agora">
          <header
            className="floating-schedule__head"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <GripHorizontal className="floating-schedule__grip" aria-hidden />
            <span className="floating-schedule__head-label">{summary.label}</span>
            <button type="button" className="floating-schedule__iconbtn" onClick={toggleMinimized} aria-label="Recolher">
              <ChevronDown aria-hidden />
            </button>
          </header>
          <div className="floating-schedule__body">
            {summary.progress !== null && (
              <div
                className="floating-schedule__ring"
                style={{ "--fsw-progress": String(Math.max(0, Math.min(1, summary.progress))) } as React.CSSProperties}
                aria-hidden
              >
                {summary.icon}
              </div>
            )}
            <div className="floating-schedule__text">
              <p className="floating-schedule__title">{summary.title}</p>
              {summary.detail && <p className="floating-schedule__detail">{summary.detail}</p>}
              {summary.chip && <p className="floating-schedule__chip-inline">{summary.chip}</p>}
              {summary.next && <p className="floating-schedule__next">{summary.next}</p>}
            </div>
          </div>
          <footer className="floating-schedule__foot">
            <Link to="/dashboard/cronograma" search={{ plano: plan?.id ?? "", painel: "1" }}>
              Ver cronograma completo
            </Link>
          </footer>
        </section>
      )}
    </div>
  );
}
