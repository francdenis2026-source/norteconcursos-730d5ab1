import { useEffect, useRef } from "react";

const SRC = "/media/hero/distintivo-carreiras.webp";
// Camadas atrás da face: dão espessura ao distintivo quando ele inclina.
const THICKNESS = [1, 2, 3, 4, 5];

/**
 * Distintivo "Carreiras Policiais" em 3D leve, como vitrine da hero: inclina acompanhando o cursor,
 * reflete a luz, flutua devagar e gira uma vez ao ser clicado. Puramente decorativo (sem foco, sem
 * leitor de tela). Sem movimento quando o usuário prefere menos animação.
 */
export function HeroBadge() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    const hero = node?.closest<HTMLElement>(".home-hero");
    if (!node || !hero) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let next: { rx: number; ry: number; gx: number; gy: number } | null = null;
    const apply = () => {
      frame = 0;
      if (!next) return;
      node.style.setProperty("--rx", `${next.rx.toFixed(2)}deg`);
      node.style.setProperty("--ry", `${next.ry.toFixed(2)}deg`);
      node.style.setProperty("--gx", `${next.gx.toFixed(1)}%`);
      node.style.setProperty("--gy", `${next.gy.toFixed(1)}%`);
    };
    const onMove = (event: PointerEvent) => {
      if (reduce.matches || event.pointerType === "touch") return;
      const box = node.getBoundingClientRect();
      // -1..1 a partir do centro do distintivo, suavizado para não "travar" nas bordas da tela.
      const dx = Math.max(-1, Math.min(1, (event.clientX - (box.left + box.width / 2)) / 520));
      const dy = Math.max(-1, Math.min(1, (event.clientY - (box.top + box.height / 2)) / 360));
      next = { rx: -dy * 14, ry: dx * 18, gx: 50 + dx * 38, gy: 50 + dy * 38 };
      node.dataset["live"] = "true";
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      next = { rx: 0, ry: 0, gx: 50, gy: 40 };
      node.dataset["live"] = "false";
      if (!frame) frame = requestAnimationFrame(apply);
    };
    // Fora da tela, a animação pausa (economiza bateria).
    const watch = new IntersectionObserver(([entry]) => {
      node.dataset["visible"] = entry?.isIntersecting ? "true" : "false";
    });
    watch.observe(node);
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      watch.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const spin = () => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.dataset["spin"] = "false";
    void node.offsetWidth;
    node.dataset["spin"] = "true";
  };

  return (
    <div className="hero-badge" ref={root} aria-hidden="true" onClick={spin} data-visible="true">
      <div className="hero-badge__float">
        <span className="hero-badge__shadow" />
        <div className="hero-badge__tilt">
          <div
            className="hero-badge__spin"
            onAnimationEnd={() => {
              if (root.current) root.current.dataset["spin"] = "false";
            }}
          >
            {THICKNESS.map((depth) => (
              <img
                key={depth}
                className="hero-badge__edge"
                src={SRC}
                alt=""
                width={460}
                height={531}
                style={{ transform: `translateZ(${-depth}px)` }}
                draggable={false}
              />
            ))}
            <img
              className="hero-badge__face"
              src={SRC}
              alt=""
              width={460}
              height={531}
              decoding="async"
              draggable={false}
            />
            <span className="hero-badge__glare" />
            <span className="hero-badge__sweep" />
          </div>
        </div>
      </div>
    </div>
  );
}
