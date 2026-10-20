import { useEffect, useRef } from "react";

const SRC = "/media/hero/distintivo-carreiras.webp";
// Camadas atrás da face: dão espessura ao distintivo quando ele inclina.
const THICKNESS = [1, 2, 3, 4, 5];
// Deslocamento (px) que separa um toque simples de um arrasto.
const TAP_SLOP = 8;

/**
 * Distintivo "Carreiras Policiais" em 3D leve, como vitrine da hero. Só entra depois da introdução
 * em vídeo (`show`), girando até a posição final. Inclina acompanhando o cursor (mouse) ou o dedo
 * (toque/caneta), reflete a luz, flutua devagar e gira uma vez ao ser tocado/clicado. Decorativo
 * (sem foco nem leitor de tela) e sem movimento quando o usuário prefere menos animação.
 */
export function HeroBadge({ show = true }: { show?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

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
    const queue = (value: NonNullable<typeof next>, live: boolean) => {
      next = value;
      node.dataset["live"] = live ? "true" : "false";
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const rest = () => queue({ rx: 0, ry: 0, gx: 50, gy: 40 }, false);

    // Mouse: a hero inteira conduz a inclinação, suavizada para não "travar" nas bordas da tela.
    const onHeroMove = (event: PointerEvent) => {
      if (reduce.matches || event.pointerType !== "mouse") return;
      const box = node.getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (event.clientX - (box.left + box.width / 2)) / 520));
      const dy = Math.max(-1, Math.min(1, (event.clientY - (box.top + box.height / 2)) / 360));
      queue({ rx: -dy * 14, ry: dx * 18, gx: 50 + dx * 38, gy: 50 + dy * 38 }, true);
    };

    // Toque/caneta: o dedo sobre o distintivo inclina-o (mais forte que o mouse, pois a área é curta).
    let touchStart: { x: number; y: number } | null = null;
    const tilt = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width - 0.5) * 2));
      const dy = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height - 0.5) * 2));
      queue({ rx: -dy * 22, ry: dx * 28, gx: 50 + dx * 42, gy: 50 + dy * 42 }, true);
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || reduce.matches) return;
      touchStart = { x: event.clientX, y: event.clientY };
      moved.current = false;
      tilt(event);
    };
    const onTouchMove = (event: PointerEvent) => {
      if (!touchStart) return;
      if (Math.hypot(event.clientX - touchStart.x, event.clientY - touchStart.y) > TAP_SLOP)
        moved.current = true;
      tilt(event);
    };
    const onUp = () => {
      if (!touchStart) return;
      touchStart = null;
      rest();
    };

    // Fora da tela, a animação pausa (economiza bateria).
    const watch = new IntersectionObserver(([entry]) => {
      node.dataset["visible"] = entry?.isIntersecting ? "true" : "false";
    });
    watch.observe(node);
    hero.addEventListener("pointermove", onHeroMove, { passive: true });
    hero.addEventListener("pointerleave", rest);
    node.addEventListener("pointerdown", onDown);
    node.addEventListener("pointermove", onTouchMove);
    node.addEventListener("pointerup", onUp);
    node.addEventListener("pointercancel", onUp);
    return () => {
      hero.removeEventListener("pointermove", onHeroMove);
      hero.removeEventListener("pointerleave", rest);
      node.removeEventListener("pointerdown", onDown);
      node.removeEventListener("pointermove", onTouchMove);
      node.removeEventListener("pointerup", onUp);
      node.removeEventListener("pointercancel", onUp);
      watch.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const spin = () => {
    const node = root.current;
    // Um arrasto só inclina; a volta completa fica para o toque/clique simples.
    if (moved.current) {
      moved.current = false;
      return;
    }
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.dataset["spin"] = "false";
    void node.offsetWidth;
    node.dataset["spin"] = "true";
  };

  return (
    <div
      className="hero-badge"
      ref={root}
      aria-hidden="true"
      onClick={spin}
      data-visible="true"
      data-reveal={show ? "in" : "pending"}
    >
      <div className="hero-badge__float">
        <span className="hero-badge__shadow" />
        <div className="hero-badge__tilt">
          <div className="hero-badge__enter">
            <div
              className="hero-badge__spin"
              onAnimationEnd={(event) => {
                if (event.target === event.currentTarget && root.current)
                  root.current.dataset["spin"] = "false";
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
    </div>
  );
}
