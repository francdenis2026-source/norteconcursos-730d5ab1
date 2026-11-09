import { useEffect, useRef } from "react";
import { platformNow } from "@/lib/platformClock";
import { backdropClockAngles } from "@/lib/backdropClock";

// Geometria medida na arte de fundo (1926×816): centro do mostrador do emblema e alcance dos ponteiros.
const W = 1926;
const H = 816;
const CX = 949;
const CY = 405;
/** Desloca a arte para o emblema ficar entre o texto e o cartão do desafio. */
const SHIFT = 135;

/**
 * Fundo do hero com os ponteiros no próprio emblema "Carreiras Policiais".
 * Imagem e ponteiros ficam no mesmo SVG, então continuam alinhados em qualquer recorte.
 */
export function HeroBackdropClock() {
  const hour = useRef<SVGLineElement>(null);
  const minute = useRef<SVGLineElement>(null);
  const second = useRef<SVGGElement>(null);

  useEffect(() => {
    let timeout = 0;
    let interval = 0;
    const tick = () => {
      const angles = backdropClockAngles(platformNow());
      hour.current?.setAttribute("transform", `rotate(${angles.hour} ${CX} ${CY})`);
      minute.current?.setAttribute("transform", `rotate(${angles.minute} ${CX} ${CY})`);
      second.current?.setAttribute("transform", `rotate(${angles.second} ${CX} ${CY})`);
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
    <svg
      className="sx-band__clock"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g transform={`translate(${SHIFT} 0)`}>
        <image href="/media/hero/carreiras-background.webp" width={W} height={H} />
        <g className="sx-band__hands">
          <line
            ref={hour}
            className="sx-band__hand sx-band__hand--hour"
            x1={CX}
            y1={CY + 16}
            x2={CX}
            y2={CY - 104}
          />
          <line
            ref={minute}
            className="sx-band__hand sx-band__hand--minute"
            x1={CX}
            y1={CY + 20}
            x2={CX}
            y2={CY - 162}
          />
          <g ref={second} className="sx-band__second">
            <line
              className="sx-band__hand sx-band__hand--second"
              x1={CX}
              y1={CY + 36}
              x2={CX}
              y2={CY - 178}
            />
          </g>
          <circle className="sx-band__pivot" cx={CX} cy={CY} r={11} />
          <circle className="sx-band__pivot-core" cx={CX} cy={CY} r={4} />
        </g>
      </g>
    </svg>
  );
}
