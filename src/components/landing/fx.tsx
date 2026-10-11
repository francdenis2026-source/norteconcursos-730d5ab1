import { useEffect, useRef } from "react";

/** Editorial geometric mesh: quiet lines, stable points, and no cursor-following light. */
export function HeroGeometry() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    const parent = canvas?.parentElement;
    if (!canvas || !context || !parent) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    if (reduceMotion || saveData) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let phase = 0;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    let columns = 11;
    let points: { x: number; y: number; seed: number }[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = width < 720 ? 7 : 11;
      const rows = width < 720 ? 4 : 6;
      points = Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const seed = (index * 37) % 19;
        return {
          x: ((column + 0.5 + (seed % 5) / 10) / columns) * width,
          y: ((row + 0.5 + (seed % 7) / 13) / rows) * height,
          seed,
        };
      });
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      phase += 0.006;
      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;
      context.clearRect(0, 0, width, height);
      const drifted = points.map((point) => ({
        ...point,
        x: point.x + Math.sin(phase + point.seed) * 2.5,
        y: point.y + Math.cos(phase * 0.8 + point.seed) * 2,
      }));
      if (pointer.active) {
        for (const point of drifted) {
          const dx = point.x - pointer.x;
          const dy = point.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - distance / 220);
          if (influence > 0) {
            const direction = distance || 1;
            point.x += (dx / direction) * influence * 7;
            point.y += (dy / direction) * influence * 7;
          }
        }
      }
      context.lineWidth = 0.8;
      for (let index = 0; index < drifted.length; index += 1) {
        const point = drifted[index]!;
        const right = drifted[index + 1];
        const below = drifted[index + columns];
        const diagonal = drifted[index + columns + 1];
        for (const target of [right, below, diagonal]) {
          if (!target || (target === right && (index + 1) % columns === 0)) continue;
          const midpointDistance = Math.hypot(
            (point.x + target.x) / 2 - pointer.x,
            (point.y + target.y) / 2 - pointer.y,
          );
          const localResponse = pointer.active ? Math.max(0, 1 - midpointDistance / 260) * 0.045 : 0;
          context.strokeStyle = `rgba(212, 168, 83, ${0.08 + localResponse + 0.025 * Math.sin(phase * 2 + index)})`;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(target.x, target.y);
          context.stroke();
        }
      }
      for (const point of drifted) {
        context.fillStyle = "rgba(231, 193, 108, 0.42)";
        context.beginPath();
        context.arc(point.x, point.y, 1.25, 0, Math.PI * 2);
        context.fill();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
    });
    observer.observe(parent);
    resize();
    window.addEventListener("resize", resize);
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onPointerMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.targetX = width * 0.5;
      pointer.targetY = height * 0.5;
    };
    if (canHover) {
      parent.addEventListener("pointermove", onPointerMove, { passive: true });
      parent.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }
    draw();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (canHover) {
        parent.removeEventListener("pointermove", onPointerMove);
        parent.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, []);

  return <canvas ref={ref} className="fx-geometry" aria-hidden="true" />;
}
