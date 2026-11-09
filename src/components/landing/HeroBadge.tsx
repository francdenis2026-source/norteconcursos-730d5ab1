import { useRef, type PointerEvent, type KeyboardEvent } from "react";
import { PoliceInsignia } from "@/components/brand/PoliceInsignia";

/**
 * Brasão interativo da homepage.
 * Repouso limpo, sem brilho, flutuação ou rotação automática.
 * O cursor cria uma perspectiva muito leve; clique/teclado produz um único gesto curto.
 */
export function HeroBadge({ show = true }: { show?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const emblem = useRef<HTMLDivElement>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches
    ) return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height || !emblem.current) return;
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    emblem.current.style.transform =
      `perspective(900px) rotateX(${-y * 2.2}deg) rotateY(${x * 2.8}deg) translateY(-2px)`;
  };

  const reset = () => {
    if (emblem.current) {
      emblem.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    }
  };

  const activate = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !emblem.current) return;
    emblem.current.animate(
      [
        { transform: "perspective(900px) scale(1) rotateY(0deg)" },
        { transform: "perspective(900px) scale(1.035) rotateY(5deg)", offset: 0.45 },
        { transform: "perspective(900px) scale(1.012) rotateY(-2deg)", offset: 0.72 },
        { transform: "perspective(900px) scale(1) rotateY(0deg)" },
      ],
      { duration: 460, easing: "cubic-bezier(.2,.72,.25,1)" },
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
      className="hero-badge hero-badge--interactive"
      role="button"
      tabIndex={0}
      aria-label="Interagir com o brasão Norte Concursos"
      title="Mova o cursor ou clique no brasão"
      data-reveal={show ? "in" : "pending"}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
      onClick={activate}
      onKeyDown={handleKeyDown}
      style={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        perspective: "900px",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div
        ref={emblem}
        className="hero-badge__interactive-art"
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
          transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
          transformOrigin: "center",
          transition: "transform 360ms cubic-bezier(.2,.72,.25,1)",
          willChange: "transform",
        }}
      >
        <PoliceInsignia
          className="hero-badge__interactive-image"
          alt=""
          width={768}
          height={811}
          decoding="async"
          draggable={false}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            imageRendering: "auto",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
      </div>
    </div>
  );
}
