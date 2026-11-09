import { useEffect, useRef, type PointerEvent } from "react";
import { PoliceInsignia } from "@/components/brand/PoliceInsignia";

const THICKNESS = [1, 2, 3, 4];

/**
 * Premium brand signature: restrained 3D depth, a soft ambient glow and
 * pointer-responsive parallax. No click spectacle, glitch, particles or drag mode.
 */
export function HeroBadge({ show = true }: { show?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const spin = useRef<HTMLDivElement>(null);
  const ambient = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let inView = false;
    const update = () => { node.dataset.visible = String(inView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => {
      inView = !!entry?.isIntersecting;
      update();
    }, { threshold: 0.05 });
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" ||
      !matchMedia("(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1)),
      y: Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1)),
    };
    if (!frame.current) frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      if (tilt.current) tilt.current.style.transform =
        `rotateX(${-target.current.y * 5}deg) rotateY(${target.current.x * 7}deg)`;
    });
  };

  const reset = () => {
    target.current = { x: 0, y: 0 };
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = 0;
    if (tilt.current) tilt.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  const activate = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    spin.current?.animate(
      [
        { transform: "rotateY(0deg) rotateX(0deg) scale(1)", filter: "brightness(1)" },
        { transform: "rotateY(16deg) rotateX(-5deg) scale(1.045)", filter: "brightness(1.18) drop-shadow(0 0 13px rgb(224 184 103 / 42%))", offset: 0.38 },
        { transform: "rotateY(-9deg) rotateX(3deg) scale(1.02)", filter: "brightness(1.1) drop-shadow(0 0 8px rgb(224 184 103 / 28%))", offset: 0.7 },
        { transform: "rotateY(0deg) rotateX(0deg) scale(1)", filter: "brightness(1)" },
      ],
      { duration: 720, easing: "cubic-bezier(.2,.8,.25,1)" },
    );
    ambient.current?.animate(
      [{ opacity: .45, transform: "scale(.92)" }, { opacity: 1, transform: "scale(1.2)", offset: .45 }, { opacity: .55, transform: "scale(1)" }],
      { duration: 760, easing: "ease-out" },
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
      aria-label="Ativar animação do brasão Norte Concursos"
      title="Clique para ativar o efeito do brasão"
      data-visible="false"
      data-reveal={show ? "in" : "pending"}
      onPointerMove={move}
      onPointerLeave={reset}
      onClick={activate}
      onKeyDown={handleKeyDown}
    >
      <span ref={ambient} className="hero-badge__ambient" aria-hidden="true" />
      <div className="hero-badge__float" aria-hidden="true">
        <div className="hero-badge__tilt" ref={tilt}>
          <div className="hero-badge__spin" ref={spin}>
            {THICKNESS.map((depth) => (
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
            <PoliceInsignia className="hero-badge__face" alt="" width={768} height={811} decoding="async" draggable={false} />
            <span className="hero-badge__glare" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
