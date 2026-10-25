import { useEffect, useRef, type PointerEvent } from "react";

import { PoliceInsignia } from "@/components/brand/PoliceInsignia";
const THICKNESS = [1, 2, 3, 4, 5];

/** Intentional brand interaction, with restrained depth and an accessible replay. */
export function HeroBadge({ show = true }: { show?: boolean }) {
  const root = useRef<HTMLButtonElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const spin = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const rotation = useRef<Animation | null>(null);
  const next = useRef({ x: 0, y: 0 });
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
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => {
      if (reduce.matches) {
        rest();
        rotation.current?.cancel();
      }
    };
    reduce.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduce.removeEventListener("change", onPreference);
      cancelAnimationFrame(frame.current);
      rotation.current?.cancel();
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
  const replay = () => {
    if (
      !spin.current ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      rotation.current?.playState === "running"
    )
      return;
    // One deliberate 360° brand replay; no forced layout or repeated restarts.
    rotation.current = spin.current.animate(
      [{ transform: "rotateY(0deg)" }, { transform: "rotateY(360deg)" }],
      {
        duration: 600,
        easing: getComputedStyle(spin.current).getPropertyValue("--ease-out").trim() || "ease-out",
      },
    );
  };
  return (
    <button
      ref={root}
      type="button"
      className="hero-badge"
      aria-label="Animar brasão Norte Concursos"
      data-visible="false"
      data-reveal={show ? "in" : "pending"}
      onPointerMove={move}
      onPointerLeave={rest}
      onBlur={rest}
      onClick={replay}
    >
      <div className="hero-badge__float" aria-hidden="true">
        <span className="hero-badge__shadow" />
        <div className="hero-badge__tilt" ref={tilt}>
          <div className="hero-badge__enter">
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
              <PoliceInsignia
                className="hero-badge__face"
                alt=""
                width={768}
                height={811}
                decoding="async"
                draggable={false}
              />
              <span className="hero-badge__glare">
                <span className="hero-badge__shine" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
