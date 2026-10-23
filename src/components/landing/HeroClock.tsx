import { useEffect, useRef } from "react";

// Dial geometry measured on the 656×856 art (bullets cropped out): pivot and hand reach in art pixels.
const CX = 309;
const CY = 459;
const HOUR_LEN = 118;
const MINUTE_LEN = 178;
const SECOND_LEN = 196;
const SECOND_TAIL = 34;

/**
 * The "Carreiras Policiais" clock, merged into the hero's own background artwork (fixed,
 * watermark-style, behind the copy) instead of living in a separate card further down the page.
 * Real wall-clock hands keep it "functional"; the dial art is dimmed into the hero's dark wash.
 */
export function HeroClock() {
  const hourHand = useRef<SVGGElement>(null);
  const minuteHand = useRef<SVGGElement>(null);
  const secondHand = useRef<SVGGElement>(null);

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

  return (
    <div className="home-hero__clock" aria-hidden="true">
      <img
        className="home-hero__clock-art"
        src="/media/brand/relogio-carreiras-policiais.webp"
        alt=""
        width={656}
        height={856}
        loading="eager"
        decoding="async"
      />
      <svg className="home-hero__clock-hands" viewBox="0 0 656 856" focusable="false">
        <g ref={hourHand} className="home-hero__clock-hand home-hero__clock-hand--hour">
          <line x1={CX} y1={CY} x2={CX} y2={CY - HOUR_LEN} />
        </g>
        <g ref={minuteHand} className="home-hero__clock-hand home-hero__clock-hand--minute">
          <line x1={CX} y1={CY} x2={CX} y2={CY - MINUTE_LEN} />
        </g>
        <g ref={secondHand} className="home-hero__clock-hand home-hero__clock-hand--second">
          <line x1={CX} y1={CY + SECOND_TAIL} x2={CX} y2={CY - SECOND_LEN} />
        </g>
        <circle className="home-hero__clock-pivot" cx={CX} cy={CY} r={9} />
      </svg>
    </div>
  );
}
