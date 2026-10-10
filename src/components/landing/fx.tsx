import { useEffect, useRef, useState } from "react";

/**
 * Efeitos da homepage (sem bibliotecas). Tudo respeita "reduzir movimento" e economia de dados,
 * pausa fora da tela e só mexe em transform/opacity.
 *
 *  - ScrollProgress: fio dourado no topo que enche com a rolagem
 *  - HeroContours: curvas de nível douradas que respiram na hero (relevo/mapa do Norte)
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

/**
 * Curvas de nível: linhas topográficas douradas que respiram devagar atrás do texto (mapa, relevo, "norte").
 * SVG puro, sem laço de animação em JavaScript: só CSS (transform) e um leve deslocamento pelo cursor.
 */
const CONTOURS = (() => {
  const out: string[] = [];
  const CX = 760, CY = 300;
  for (let i = 0; i < 16; i++) {
    const R = 40 + i * 30;
    const a1 = 0.05 + i * 0.004, a2 = 0.035 + (i % 4) * 0.006;
    const p1 = i * 0.55, p2 = i * 0.9 + 1.3;
    const pts: string[] = [];
    for (let k = 0; k <= 96; k++) {
      const t = (k / 96) * Math.PI * 2;
      const r = R * (1 + a1 * Math.sin(3 * t + p1) + a2 * Math.sin(5 * t + p2));
      pts.push(`${(CX + r * Math.cos(t) * 1.35).toFixed(1)},${(CY + r * Math.sin(t) * 0.85).toFixed(1)}`);
    }
    out.push(`M${pts.join("L")}Z`);
  }
  return out;
})();

export function HeroContours() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !canHover()) return;
    const parent = el.parentElement!;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = parent.getBoundingClientRect();
        el.style.setProperty("--px", (((e.clientX - r.left) / r.width - 0.5) * -28).toFixed(1) + "px");
        el.style.setProperty("--py", (((e.clientY - r.top) / r.height - 0.5) * -18).toFixed(1) + "px");
      });
    };
    parent.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      parent.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className="fx-contours" aria-hidden="true">
      <svg viewBox="0 0 1000 600" preserveAspectRatio="xMaxYMid slice">
        <defs>
          <linearGradient id="fx-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.92 0.08 86)" />
            <stop offset="1" stopColor="oklch(0.7 0.13 66)" />
          </linearGradient>
        </defs>
        <g className="fx-contours__g">
          {CONTOURS.map((d, i) => (
            <path key={i} d={d} style={{ animationDelay: `${-i * 1.1}s`, strokeOpacity: 0.18 + (i % 5) * 0.07 }} />
          ))}
        </g>
      </svg>
      <span className="fx-contours__sheen" />
    </div>
  );
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
