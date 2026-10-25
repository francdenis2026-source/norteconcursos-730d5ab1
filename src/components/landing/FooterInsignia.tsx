import { useEffect, useRef, type PointerEvent } from "react";

// Dial geometry measured on the 656×856 art (bullets cropped out): pivot and hand reach in art pixels.
const CX = 309;
const CY = 459;
const HOUR_LEN = 118;
const MINUTE_LEN = 178;
const SECOND_LEN = 196;
const SECOND_TAIL = 34;

/**
 * The "Carreiras Policiais" clock in the footer's brand corner: the same restrained 3D tilt-on-hover
 * interaction as the hero badge, but with the clock art and real, functioning hands.
 */
export function FooterInsignia() {
  const root = useRef<HTMLButtonElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const next = useRef({ x: 0, y: 0 });
  const hourHand = useRef<SVGGElement>(null);
  const minuteHand = useRef<SVGGElement>(null);
  const secondHand = useRef<SVGGElement>(null);

  const rest = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (tilt.current) tilt.current.style.transform = "rotateY(-6deg)";
  };

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let inView = false;
    const update = () => {
      node.dataset["visible"] = String(inView && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = !!entry?.isIntersecting;
      update();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
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

  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !matchMedia("(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)")
        .matches
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
          tilt.current.style.transform = `rotateX(${-next.current.y * 7}deg) rotateY(${next.current.x * 10}deg)`;
      });
  };

  return (
    <button
      ref={root}
      type="button"
      className="home-footer__insignia"
      aria-label="Relógio Carreiras Policiais"
      data-visible="false"
      onPointerMove={move}
      onPointerLeave={rest}
      onBlur={rest}
    >
      <div className="home-footer__insignia-float" aria-hidden="true">
        <div className="home-footer__insignia-tilt" ref={tilt}>
          <img
            className="home-footer__insignia-face"
            src="/media/brand/relogio-carreiras-policiais.webp"
            alt=""
            width={656}
            height={856}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <svg className="home-footer__insignia-hands" viewBox="0 0 656 856" focusable="false">
            <g ref={hourHand} className="home-footer__insignia-hand home-footer__insignia-hand--hour">
              <line x1={CX} y1={CY} x2={CX} y2={CY - HOUR_LEN} />
            </g>
            <g ref={minuteHand} className="home-footer__insignia-hand home-footer__insignia-hand--minute">
              <line x1={CX} y1={CY} x2={CX} y2={CY - MINUTE_LEN} />
            </g>
            <g ref={secondHand} className="home-footer__insignia-hand home-footer__insignia-hand--second">
              <line x1={CX} y1={CY + SECOND_TAIL} x2={CX} y2={CY - SECOND_LEN} />
            </g>
            <circle className="home-footer__insignia-pivot" cx={CX} cy={CY} r={9} />
          </svg>
        </div>
      </div>
    </button>
  );
}
