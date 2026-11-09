import { useRef, type PointerEvent, type KeyboardEvent } from "react";
import { PoliceInsignia } from "@/components/brand/PoliceInsignia";

const DEPTH_LAYERS = [1, 2];

/**
 * Emblema interativo da homepage.
 * Repouso limpo; responde ao cursor com perspectiva discreta e ao clique com um pulso curto.
 * Sem animações contínuas, brilho artificial ou movimento automático.
 */
export function HeroBadge({ show = true }: { show?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLDivElement>(null);
  const ambient = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  const applyTilt = (x: number, y: number) => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      if (tilt.current) {
        tilt.current.style.transform = `rotateX(${-y * 2.8}deg) rotateY(${x * 3.6}deg)`;
      }
    });
  };

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" ||
      !matchMedia("(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1)),
      y: Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1)),
    };
    applyTilt(target.current.x, target.current.y);
  };

  const reset = () => {
    target.current = { x: 0, y: 0 };
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (tilt.current) tilt.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (root.current) root.current.dataset.hover = "false";
  };

  const activate = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    face.current?.animate(
      [
        { transform: "translateZ(0) scale(1) rotateY(0deg)" },
        { transform: "translateZ(5px) scale(1.025) rotateY(7deg)", offset: 0.42 },
        { transform: "translateZ(2px) scale(1.01) rotateY(-3deg)", offset: 0.72 },
        { transform: "translateZ(0) scale(1) rotateY(0deg)" },
      ],
      { duration: 560, easing: "cubic-bezier(.2,.75,.25,1)" },
    );
    ambient.current?.animate(
      [
        { opacity: 0, transform: "scale(.82)" },
        { opacity: .7, transform: "scale(1.04)", offset: .42 },
        { opacity: 0, transform: "scale(1.18)" },
      ],
      { duration: 680, easing: "ease-out" },
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  };

  return (
    <div
      ref={root}
      className="hero-badge hero-badge--premium"
      style={{ position: "relative", left: 0, top: 0, right: "auto", zIndex: 5 }}
      role="button"
      tabIndex={0}
      aria-label="Interagir com o brasão Norte Concursos"
      title="Mova o cursor ou clique no brasão"
      data-hover="false"
      data-reveal={show ? "in" : "pending"}
      onPointerEnter={() => { if (root.current) root.current.dataset.hover = "true"; }}
      onPointerMove={move}
      onPointerLeave={reset}
      onClick={activate}
      onKeyDown={handleKeyDown}
    >
      <span ref={ambient} className="hero-badge__ambient" aria-hidden="true" />
      <div className="hero-badge__float" aria-hidden="true">
        <div className="hero-badge__tilt" ref={tilt}>
          <div className="hero-badge__spin" ref={face}>
            {DEPTH_LAYERS.map((depth) => (
              <PoliceInsignia
                key={depth}
                className="hero-badge__edge"
                alt=""
                width={768}
                height={811}
                style={{ transform: `translateZ(${-depth}px)` }}
                draggable={false}
              />
            ))}
            <PoliceInsignia
              className="hero-badge__face"
              alt=""
              width={768}
              height={811}
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
