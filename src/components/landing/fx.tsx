import { useEffect, useRef } from "react";

/**
 * Único efeito da homepage: constelação de pontos ligados na hero. Com o mouse, o cursor acende
 * as ligações próximas. Respeita "reduzir movimento"/economia de dados e pausa fora da tela.
 */
const reducedMotion = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const saveData = () =>
  !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
const canHover = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

interface Dot { x: number; y: number; vx: number; vy: number; r: number }

/** Constelação: pontos dourados ligados por linhas finas; o cursor acende as ligações próximas. */
export function HeroConstellation() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx || reducedMotion() || saveData()) return;
    const parent = cv.parentElement!;
    let w = 0, h = 0, raf = 0, visible = true, t = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let dots: Dot[] = [];
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(70, Math.max(24, (w * h) / 22000)));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: 0.8 + Math.random() * 1.4,
      }));
    };
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
    };
    const BRASS = "212, 168, 83";
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      t += 0.01;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      ctx.clearRect(0, 0, w, h);
      const ox = (mouse.x - 0.5) * -26, oy = (mouse.y - 0.5) * -18; // paralaxe suave
      const mx = mouse.x * w, my = mouse.y * h;
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < -10) d.x = w + 10; else if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10; else if (d.y > h + 10) d.y = -10;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]!;
        const ax = a.x + ox * a.r, ay = a.y + oy * a.r;
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]!;
          const bx = b.x + ox * b.r, by = b.y + oy * b.r;
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(${BRASS}, ${0.16 * (1 - dist / 130)})`;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
          }
        }
        const near = Math.hypot(ax - mx, ay - my);
        if (near < 160) { // o cursor acende as ligações próximas
          ctx.strokeStyle = `rgba(${BRASS}, ${0.5 * (1 - near / 160)})`;
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(mx, my); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${BRASS}, ${0.35 + 0.35 * Math.sin(t * 2 + i)})`;
        ctx.beginPath(); ctx.arc(ax, ay, a.r, 0, 7); ctx.fill();
      }
    };
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; });
    io.observe(parent);
    resize();
    addEventListener("resize", resize);
    if (canHover()) parent.addEventListener("pointermove", onMove, { passive: true });
    frame();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("resize", resize);
      parent.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="fx-constellation" aria-hidden="true" />;
}
