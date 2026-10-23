import { useEffect, useRef, type PointerEvent } from "react";

const MAX_TILT = 8;
// Dial geometry measured on the 656×856 art (bullets cropped out): pivot and hand reach in art pixels.
const CX = 309;
const CY = 459;
const HOUR_LEN = 118;
const MINUTE_LEN = 178;
const SECOND_LEN = 196;
const SECOND_TAIL = 34;

/** Brand showcase for the "Carreiras Policiais" clock art: real hands, a restrained 3D tilt, no required motion. */
export function ClockShowcase() {
  const stage = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const next = useRef({ x: 0, y: 0 });
  const hourHand = useRef<SVGGElement>(null);
  const minuteHand = useRef<SVGGElement>(null);
  const secondHand = useRef<SVGGElement>(null);

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

  // Real wall-clock hands: updated once a second, aligned to the second boundary.
  useEffect(() => {
    let timeout = 0;
    let interval = 0;
    const tick = () => {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const hourDeg = (hours + minutes / 60) * 30;
      const minuteDeg = (minutes + seconds / 60) * 6;
      const secondDeg = seconds * 6;
      hourHand.current?.setAttribute("transform", `rotate(${hourDeg} ${CX} ${CY})`);
      minuteHand.current?.setAttribute("transform", `rotate(${minuteDeg} ${CX} ${CY})`);
      secondHand.current?.setAttribute("transform", `rotate(${secondDeg} ${CX} ${CY})`);
    };
    tick();
    timeout = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 1000);
    }, 1000 - new Date().getMilliseconds());
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
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
            foco tático e disciplina até o dia da prova. Os ponteiros marcam a hora real, agora.
          </p>
        </div>
        <div className="home-clock__plate">
          <div
            ref={stage}
            className="home-clock__stage"
            data-visible="false"
            onPointerMove={move}
            onPointerLeave={rest}
            onBlur={rest}
          >
            <span className="home-clock__pedestal" aria-hidden="true" />
            <span className="home-clock__glow" aria-hidden="true" />
            <span className="home-clock__shadow" aria-hidden="true" />
            <div className="home-clock__tilt" ref={tilt}>
              <img
                className="home-clock__image"
                src="/media/brand/relogio-carreiras-policiais.webp"
                alt="Relógio Carreiras Policiais da Norte Concursos, com caveira e pistola em metal escovado"
                width={656}
                height={856}
                loading="lazy"
                decoding="async"
              />
              <svg
                className="home-clock__hands"
                viewBox="0 0 656 856"
                aria-hidden="true"
                focusable="false"
              >
                <g ref={hourHand} className="home-clock__hand home-clock__hand--hour">
                  <line x1={CX} y1={CY} x2={CX} y2={CY - HOUR_LEN} />
                </g>
                <g ref={minuteHand} className="home-clock__hand home-clock__hand--minute">
                  <line x1={CX} y1={CY} x2={CX} y2={CY - MINUTE_LEN} />
                </g>
                <g ref={secondHand} className="home-clock__hand home-clock__hand--second">
                  <line x1={CX} y1={CY + SECOND_TAIL} x2={CX} y2={CY - SECOND_LEN} />
                </g>
                <circle className="home-clock__pivot" cx={CX} cy={CY} r={9} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
