import { useEffect, useRef, type PointerEvent } from "react";

const MAX_TILT = 8;

/** Brand showcase for the "Carreiras Policiais" clock art: a restrained 3D tilt, no required motion. */
export function ClockShowcase() {
  const stage = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const next = useRef({ x: 0, y: 0 });

  const rest = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (tilt.current) tilt.current.style.transform = "";
  };

  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const setVisible = (visible: boolean) => {
      node.dataset["visible"] = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting));
    observer.observe(node);
    const onVisibilityChange = () => setVisible(node.dataset["visible"] === "true");
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches
    )
      return;
    const box = event.currentTarget.getBoundingClientRect();
    next.current = {
      x: Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1)),
      y: Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1)),
    };
    if (!frame.current)
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        if (tilt.current)
          tilt.current.style.transform = `rotateX(${-next.current.y * MAX_TILT}deg) rotateY(${next.current.x * MAX_TILT}deg)`;
      });
  };

  return (
    <section id="assinatura" className="home-section home-clock" aria-labelledby="clock-title">
      <div className="home-container home-clock__inner">
        <div className="home-clock__copy">
          <span className="home-eyebrow home-signal">Identidade Norte Concursos</span>
          <h2 id="clock-title">
            Disciplina que <em>se mede</em> em cada minuto.
          </h2>
          <p>
            O relógio Carreiras Policiais é a nossa assinatura: tempo de estudo bem investido,
            foco tático e disciplina até o dia da prova.
          </p>
        </div>
        <div
          ref={stage}
          className="home-clock__stage"
          data-visible="false"
          onPointerMove={move}
          onPointerLeave={rest}
          onBlur={rest}
        >
          <span className="home-clock__glow" aria-hidden="true" />
          <span className="home-clock__shadow" aria-hidden="true" />
          <div className="home-clock__tilt" ref={tilt}>
            <img
              className="home-clock__image"
              src="/media/brand/relogio-carreiras-policiais.webp"
              alt="Relógio Carreiras Policiais da Norte Concursos, com caveira, pistola e munições em metal escovado"
              width={742}
              height={907}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
