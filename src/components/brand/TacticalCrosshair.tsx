import { useEffect, useRef, useState } from "react";
import { onAimFeedback, type AimFeedbackType } from "@/lib/aimFeedback";
import "./TacticalCrosshair.css";

type Rect = { x: number; y: number; width: number; height: number };

const BASE_SIZE = 56;
const LOCK_PADDING = 14;

/**
 * Mira tática: um retículo que acompanha o cursor dentro do contêiner, "trava" ao passar
 * sobre qualquer elemento marcado com data-aim (crescendo até os cantos do alvo), e pisca
 * verde/vermelho quando a página dispara um feedback de acerto/erro (ver lib/aimFeedback).
 * Fica puramente decorativa (pointer-events: none) e nunca interfere no clique real.
 */
export function TacticalCrosshair() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const nextRect = useRef<Rect | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const [locked, setLocked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [feedback, setFeedback] = useState<AimFeedbackType | null>(null);
  const [canTrack, setCanTrack] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanTrack(query.matches);
    const onChange = () => setCanTrack(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // O feedback (acerto/erro) funciona em qualquer dispositivo; o rastreio do cursor, só com mouse real.
  useEffect(
    () =>
      onAimFeedback((type) => {
        setFeedback(type);
        setVisible(true);
        const timeout = window.setTimeout(() => setFeedback(null), 760);
        return () => window.clearTimeout(timeout);
      }),
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !canTrack) return;

    const schedule = (next: Rect, isLocked: boolean) => {
      nextRect.current = next;
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        if (nextRect.current) setRect(nextRect.current);
        setLocked(isLocked);
      });
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      setVisible(true);
      const bounds = container.getBoundingClientRect();
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-aim]");
      if (target && container.contains(target)) {
        const box = target.getBoundingClientRect();
        schedule(
          {
            x: box.left - bounds.left - LOCK_PADDING,
            y: box.top - bounds.top - LOCK_PADDING,
            width: box.width + LOCK_PADDING * 2,
            height: box.height + LOCK_PADDING * 2,
          },
          true,
        );
        return;
      }
      schedule(
        {
          x: event.clientX - bounds.left - BASE_SIZE / 2,
          y: event.clientY - bounds.top - BASE_SIZE / 2,
          width: BASE_SIZE,
          height: BASE_SIZE,
        },
        false,
      );
    };

    const handleLeave = () => setVisible(false);

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [canTrack]);

  const showFrame = canTrack && visible && rect;

  return (
    <div
      ref={containerRef}
      className="tactical-crosshair"
      aria-hidden="true"
      data-visible={showFrame || undefined}
      data-locked={locked || undefined}
      data-feedback={feedback ?? undefined}
    >
      {showFrame && (
        <div
          className="tactical-crosshair__frame"
          style={{
            transform: `translate(${rect.x}px, ${rect.y}px)`,
            width: rect.width,
            height: rect.height,
          }}
        >
          <svg className="tactical-crosshair__ring" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" className="tactical-crosshair__scale" />
            <circle cx="50" cy="50" r="38" className="tactical-crosshair__dial" />
            <line x1="50" y1="4" x2="50" y2="18" className="tactical-crosshair__tick" />
            <line x1="50" y1="96" x2="50" y2="82" className="tactical-crosshair__tick" />
            <line x1="4" y1="50" x2="18" y2="50" className="tactical-crosshair__tick" />
            <line x1="96" y1="50" x2="82" y2="50" className="tactical-crosshair__tick" />
            <circle cx="50" cy="50" r="2.6" className="tactical-crosshair__pip" />
          </svg>
          <span className="tactical-crosshair__bracket tactical-crosshair__bracket--tl" />
          <span className="tactical-crosshair__bracket tactical-crosshair__bracket--tr" />
          <span className="tactical-crosshair__bracket tactical-crosshair__bracket--bl" />
          <span className="tactical-crosshair__bracket tactical-crosshair__bracket--br" />
          {locked && <span className="tactical-crosshair__tag">ALVO</span>}
        </div>
      )}
      {feedback && <span className={`tactical-crosshair__flash tactical-crosshair__flash--${feedback}`} />}
    </div>
  );
}
