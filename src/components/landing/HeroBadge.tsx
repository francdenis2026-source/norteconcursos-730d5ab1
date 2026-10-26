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
  const fx = useRef<HTMLSpanElement>(null);
  const turn = useRef(0);
  const busy = useRef(false);
  const GOLD = "232 205 153";

  /** Elemento de efeito descartável dentro da camada de luzes. */
  const piece = (css: string, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
    const layer = fx.current;
    if (!layer) return Promise.resolve();
    const el = document.createElement("i");
    el.style.cssText = `position:absolute;pointer-events:none;${css}`;
    layer.appendChild(el);
    const done = el
      .animate(keyframes, { fill: "forwards", ...options })
      .finished.catch(() => undefined);
    return done.then(() => el.remove());
  };
  const ring = (delay = 0, color = GOLD) =>
    piece(
      `left:50%;top:50%;width:60%;aspect-ratio:1;margin:-30% 0 0 -30%;border-radius:50%;border:2px solid rgb(${color} / 90%);box-shadow:0 0 18px rgb(${color} / 70%), inset 0 0 14px rgb(${color} / 45%)`,
      [
        { transform: "scale(.4)", opacity: 0.95 },
        { transform: "scale(2.6)", opacity: 0 },
      ],
      { duration: 800, delay, easing: "cubic-bezier(.16,1,.3,1)" },
    );
  const flash = (color = GOLD, peak = 0.85) =>
    piece(
      `inset:8%;border-radius:50%;background:radial-gradient(circle, rgb(${color} / ${peak}) 0%, rgb(${color} / 0%) 68%);mix-blend-mode:screen`,
      [
        { opacity: 0, transform: "scale(.6)" },
        { opacity: 1, transform: "scale(1.25)", offset: 0.25 },
        { opacity: 0, transform: "scale(1.7)" },
      ],
      { duration: 700, easing: "ease-out" },
    );
  const sparks = (count = 16, power = 1) => {
    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const dist = (60 + Math.random() * 70) * power;
      const size = 2 + Math.random() * 3;
      void piece(
        `left:50%;top:50%;width:${size}px;height:${size * 3}px;margin:-${size}px;border-radius:2px;background:linear-gradient(#fff6d8,#e8cd99);box-shadow:0 0 8px rgb(${GOLD} / 90%);transform-origin:center`,
        [
          { transform: `rotate(${angle + Math.PI / 2}rad) translateY(0)`, opacity: 1 },
          { transform: `rotate(${angle + Math.PI / 2}rad) translateY(${-dist}px)`, opacity: 0 },
        ],
        { duration: 550 + Math.random() * 450, easing: "cubic-bezier(.1,.8,.3,1)" },
      );
    }
  };
  const sweep = (angle = 20) =>
    piece(
      `inset:-10%;overflow:hidden;background:linear-gradient(${105 + angle}deg, transparent 38%, rgb(255 244 214 / 85%) 50%, transparent 62%);mix-blend-mode:screen;border-radius:12%`,
      [
        { transform: "translateX(-120%)", opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: "translateX(120%)", opacity: 0 },
      ],
      { duration: 750, easing: "ease-in-out" },
    );
  const beam = () =>
    piece(
      `left:50%;bottom:-8%;width:46%;height:150%;margin-left:-23%;background:linear-gradient(0deg, rgb(${GOLD} / 85%), rgb(${GOLD} / 0%));filter:blur(10px);transform-origin:bottom;mix-blend-mode:screen`,
      [
        { opacity: 0, transform: "scaleY(.1)" },
        { opacity: 0.9, transform: "scaleY(1)", offset: 0.35 },
        { opacity: 0, transform: "scaleY(1.1)" },
      ],
      { duration: 900, easing: "ease-out" },
    );
  const scan = () =>
    piece(
      `inset:0;background:repeating-linear-gradient(0deg, rgb(255 80 60 / 0%) 0 3px, rgb(120 255 240 / 28%) 3px 4px);mix-blend-mode:screen`,
      [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 0.6, offset: 0.7 }, { opacity: 0 }],
      { duration: 650, easing: "steps(8)" },
    );

  /** Sequência de brasão: cada clique roda um efeito diferente, sempre combinando luz e movimento. */
  const effects: Array<(node: HTMLElement) => Animation[]> = [
    // 1. giro completo + onda de choque dourada
    (node) => {
      void flash();
      void ring();
      void ring(140);
      return [
        node.animate([{ transform: "rotateY(0deg)" }, { transform: "rotateY(360deg)" }], {
          duration: 750,
          easing: "cubic-bezier(.22,1,.36,1)",
        }),
      ];
    },
    // 2. giro duplo vertical + varredura de luz
    (node) => {
      void sweep();
      window.setTimeout(() => void sweep(-25), 220);
      return [
        node.animate(
          [
            { transform: "rotateX(0deg) scale(1)" },
            { transform: "rotateX(360deg) scale(1.12)", offset: 0.55 },
            { transform: "rotateX(720deg) scale(1)" },
          ],
          { duration: 1100, easing: "cubic-bezier(.65,0,.35,1)" },
        ),
      ];
    },
    // 3. glitch digital: tremor, divisão RGB e linhas de varredura
    (node) => {
      scan();
      return [
        node.animate(
          [
            { transform: "translate(0,0)", filter: "none" },
            {
              transform: "translate(-6px,2px) skewX(-6deg)",
              filter:
                "drop-shadow(4px 0 0 rgb(255 60 80 / 80%)) drop-shadow(-4px 0 0 rgb(60 240 255 / 80%))",
              offset: 0.15,
            },
            {
              transform: "translate(5px,-3px) skewX(5deg)",
              filter:
                "drop-shadow(-4px 0 0 rgb(255 60 80 / 80%)) drop-shadow(4px 0 0 rgb(60 240 255 / 80%))",
              offset: 0.3,
            },
            { transform: "translate(-3px,1px)", filter: "none", offset: 0.45 },
            {
              transform: "translate(4px,2px) skewX(-3deg)",
              filter:
                "drop-shadow(3px 0 0 rgb(255 60 80 / 70%)) drop-shadow(-3px 0 0 rgb(60 240 255 / 70%))",
              offset: 0.6,
            },
            { transform: "translate(0,0)", filter: "none" },
          ],
          { duration: 650, easing: "steps(12)" },
        ),
      ];
    },
    // 4. batimento + explosão de faíscas
    (node) => {
      sparks(22, 1.1);
      void ring(0, "255 214 128");
      return [
        node.animate(
          [
            { transform: "scale(1)", filter: "brightness(1)" },
            {
              transform: "scale(1.22)",
              filter: `brightness(1.7) drop-shadow(0 0 22px rgb(${GOLD} / 90%))`,
              offset: 0.2,
            },
            { transform: "scale(.96)", filter: "brightness(1)", offset: 0.4 },
            {
              transform: "scale(1.12)",
              filter: `brightness(1.4) drop-shadow(0 0 16px rgb(${GOLD} / 80%))`,
              offset: 0.6,
            },
            { transform: "scale(1)", filter: "brightness(1)" },
          ],
          { duration: 800, easing: "ease-out" },
        ),
      ];
    },
    // 5. subida com feixe de luz + giro lento
    (node) => {
      void beam();
      void flash("255 244 214", 0.6);
      return [
        node.animate(
          [
            { transform: "translateY(0) rotateY(0deg)", filter: "brightness(1)" },
            {
              transform: "translateY(-16px) rotateY(180deg) scale(1.08)",
              filter: `brightness(1.5) drop-shadow(0 0 24px rgb(${GOLD} / 90%))`,
              offset: 0.5,
            },
            { transform: "translateY(0) rotateY(360deg)", filter: "brightness(1)" },
          ],
          { duration: 1000, easing: "cubic-bezier(.34,1.3,.64,1)" },
        ),
      ];
    },
    // 6. impacto: recuo seco + clarão + ondas em sequência
    (node) => {
      void flash("255 250 235", 1);
      void ring(0);
      void ring(110, "255 214 128");
      void ring(220);
      sparks(10, 0.8);
      return [
        node.animate(
          [
            { transform: "translate(0,0) scale(1)" },
            { transform: "translate(0,10px) scale(.88)", offset: 0.12 },
            { transform: "translate(0,-6px) scale(1.06) rotate(-3deg)", offset: 0.3 },
            { transform: "translate(0,3px) scale(.98) rotate(2deg)", offset: 0.5 },
            { transform: "translate(0,0) scale(1) rotate(0)" },
          ],
          { duration: 700, easing: "cubic-bezier(.2,.9,.3,1)" },
        ),
      ];
    },
  ];
  const replay = () => {
    if (!spin.current || busy.current || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    busy.current = true;
    const run = effects[turn.current % effects.length]!;
    turn.current += 1;
    const animations = run(spin.current);
    void Promise.allSettled(animations.map((a) => a.finished)).then(() => {
      busy.current = false;
    });
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
      <span
        ref={fx}
        aria-hidden="true"
        className="hero-badge__fx"
        style={{
          position: "absolute",
          inset: "-35%",
          pointerEvents: "none",
          zIndex: 4,
          overflow: "visible",
        }}
      />
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
