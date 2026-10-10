import { useEffect, useRef, useState } from "react";

/**
 * Efeitos da homepage (sem bibliotecas). Tudo respeita "reduzir movimento" e economia de dados,
 * pausa fora da tela e só mexe em transform/opacity.
 *
 *  - ScrollProgress: fio dourado no topo que enche com a rolagem
 *  - HeroRadar: constelação + radar na hero, reage ao cursor (a "bússola" do Norte)
 *  - Odometer: números que rolam como odômetro (inspirado na Cruzeiro Expresso)
 *  - useHomeFx: títulos palavra a palavra, rota do Método que se desenha ao rolar,
 *    cartões que inclinam com brilho que segue o cursor e botões magnéticos
 */
const reducedMotion = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const saveData = () =>
  !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
const canHover = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="fx-progress" aria-hidden="true" />;
}

interface Dot { x: number; y: number; vx: number; vy: number; r: number }

/** Constelação de pontos ligados por linhas finas, com um radar girando sobre a "estrela do Norte". */
export function HeroRadar() {
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
      // radar sobre a "estrela do Norte"
      const cx = w * 0.78 + ox * 1.5, cy = h * 0.36 + oy * 1.5;
      const R = Math.min(w, h) * 0.34;
      ctx.strokeStyle = `rgba(${BRASS}, 0.14)`;
      for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.arc(cx, cy, (R * k) / 3, 0, 7); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
      const ang = t * 1.4;
      const g = ctx.createConicGradient(ang - 0.9, cx, cy);
      g.addColorStop(0, `rgba(${BRASS}, 0)`);
      g.addColorStop(0.14, `rgba(${BRASS}, 0.22)`);
      g.addColorStop(0.15, `rgba(${BRASS}, 0)`);
      g.addColorStop(1, `rgba(${BRASS}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
      const pulse = (t * 0.6) % 1; // onda saindo da estrela
      ctx.strokeStyle = `rgba(${BRASS}, ${0.5 * (1 - pulse)})`;
      ctx.beginPath(); ctx.arc(cx, cy, 4 + pulse * R * 0.5, 0, 7); ctx.stroke();
      ctx.fillStyle = `rgb(${BRASS})`;
      ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, 7); ctx.fill();
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
  return <canvas ref={ref} className="fx-radar" aria-hidden="true" />;
}

/** Número que "rola" dígito a dígito até o valor, como um odômetro. */
export function Odometer({ value, className }: { value: number; className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (reducedMotion()) { setOn(true); return; }
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const text = value.toLocaleString("pt-BR");
  return (
    <span className={className} aria-label={text}>
      <span className="fx-odo" aria-hidden="true">
        {[...text].map((ch, i) =>
          /\d/.test(ch) ? (
            <span className="fx-odo__col" key={i}>
              <span className="fx-odo__strip" style={{ transform: `translateY(${on ? -Number(ch) : 0}em)`, transitionDelay: `${i * 70}ms` }}>
                {"0123456789".split("").map((d) => <span key={d}>{d}</span>)}
              </span>
            </span>
          ) : <span key={i}>{ch}</span>,
        )}
      </span>
    </span>
  );
}

/** Efeitos que atuam sobre o HTML já renderizado da homepage (delegação de eventos, sem re-render). */
export function useHomeFx() {
  useEffect(() => {
    const root = document.documentElement;
    if (reducedMotion()) return;
    root.classList.add("fx-ready");
    const cleanups: (() => void)[] = [() => root.classList.remove("fx-ready")];

    // 1) Títulos palavra a palavra (só nós de texto; <em> e demais tags ficam como estão).
    const headings = document.querySelectorAll<HTMLElement>("main .lp-h2");
    headings.forEach((h) => {
      if (h.dataset["fxWords"]) return;
      h.dataset["fxWords"] = "1";
      let n = 0;
      const walk = (node: Node) => {
        for (const c of [...node.childNodes]) {
          if (c.nodeType === Node.TEXT_NODE && c.textContent?.trim()) {
            const frag = document.createDocumentFragment();
            for (const part of c.textContent.split(/(\s+)/)) {
              if (!part) continue;
              if (/^\s+$/.test(part)) { frag.append(" "); continue; }
              const o = document.createElement("span");
              o.className = "fx-w";
              const i = document.createElement("span");
              i.textContent = part;
              i.style.transitionDelay = `${n++ * 55}ms`;
              o.append(i);
              frag.append(o);
            }
            c.replaceWith(frag);
          } else if (c.nodeType === Node.ELEMENT_NODE) walk(c);
        }
      };
      walk(h);
    });

    // 2) Rota do Método: a linha dourada enche com a rolagem e cada etapa acende ao ser alcançada.
    const steps = document.querySelector<HTMLElement>(".lp-steps");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!steps) return;
      const r = steps.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / Math.max(1, r.height * 0.9)));
      steps.style.setProperty("--p", p.toFixed(3));
      const items = steps.querySelectorAll(".lp-step");
      items.forEach((s, i) => s.classList.toggle("is-lit", p >= (i / items.length) * 0.85 + 0.05));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); });

    // 3) Inclinação 3D + brilho que segue o cursor, e botões magnéticos (só com mouse).
    if (canHover()) {
      const CARD = ".lp-bento .lp-tile, .lp-step__card, .lp-career";
      const onMove = (e: PointerEvent) => {
        const t = e.target as Element | null;
        const card = t?.closest<HTMLElement>(CARD);
        if (card) {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
          card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
          card.style.setProperty("--ry", `${((x - 0.5) * 7).toFixed(2)}deg`);
          card.style.setProperty("--rx", `${((0.5 - y) * 7).toFixed(2)}deg`);
          card.classList.add("fx-tilt");
        }
        const btn = t?.closest<HTMLElement>(".btn-brass");
        if (btn) {
          const r = btn.getBoundingClientRect();
          btn.style.setProperty("--bx", `${((e.clientX - (r.left + r.width / 2)) * 0.18).toFixed(1)}px`);
          btn.style.setProperty("--by", `${((e.clientY - (r.top + r.height / 2)) * 0.28).toFixed(1)}px`);
          btn.classList.add("fx-magnet");
        }
      };
      const onOut = (e: PointerEvent) => {
        const t = e.target as Element | null;
        const el = t?.closest<HTMLElement>(`${CARD}, .btn-brass`);
        if (!el || el.contains(e.relatedTarget as Node | null)) return;
        el.classList.remove("fx-tilt", "fx-magnet");
        for (const k of ["--rx", "--ry", "--bx", "--by"]) el.style.removeProperty(k);
      };
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onOut);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerout", onOut);
      });
    }

    // 4) Palavras entram quando o título aparece.
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) { e.target.classList.add("fx-in"); io.unobserve(e.target); }
    }, { threshold: 0.4 });
    headings.forEach((h) => io.observe(h));
    cleanups.push(() => io.disconnect());

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
