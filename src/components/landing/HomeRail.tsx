import { Children, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type RailState = { overflow: boolean; first: number; last: number; start: boolean; end: boolean };

/** Native swipe/trackpad scrolling, with equivalent buttons and keyboard access. No auto-advance. */
export function HomeRail({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className: string;
  label: string;
}) {
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [state, setState] = useState<RailState>({
    overflow: false,
    first: 1,
    last: count,
    start: true,
    end: true,
  });
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const measure = () => {
      const rect = element.getBoundingClientRect();
      const cards = Array.from(element.children);
      const visible = cards
        .map((card, index) => ({ index, rect: card.getBoundingClientRect() }))
        .filter(
          ({ rect: card }) =>
            Math.min(card.right, rect.right) - Math.max(card.left, rect.left) >= card.width * 0.5,
        );
      const next = {
        overflow: element.scrollWidth > element.clientWidth + 2,
        first: (visible[0]?.index ?? 0) + 1,
        last: (visible.at(-1)?.index ?? 0) + 1,
        start: element.scrollLeft <= 2,
        end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      };
      setState((old) =>
        Object.keys(next).every(
          (key) => old[key as keyof RailState] === next[key as keyof RailState],
        )
          ? old
          : next,
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    Array.from(element.children).forEach((child) => observer.observe(child));
    element.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", measure);
    };
  }, [count]);
  const move = (direction: number, fromKeyboard = false) => {
    const element = track.current;
    if (!element) return;
    const cards = Array.from(element.children);
    const left = element.getBoundingClientRect().left;
    const inset = Number.parseFloat(getComputedStyle(element).scrollPaddingInlineStart) || 0;
    const positions = cards.map(
      (card) => card.getBoundingClientRect().left - left + element.scrollLeft - inset,
    );
    const target =
      direction > 0
        ? (positions.find((position) => position > element.scrollLeft + 5) ?? element.scrollWidth)
        : (positions.filter((position) => position < element.scrollLeft - 5).at(-1) ?? 0);
    element.scrollTo({
      left: target,
      behavior:
        fromKeyboard || matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
    });
  };
  return (
    <div
      className="home-rail"
      role="region"
      aria-label={label}
      aria-roledescription={state.overflow ? "carrossel" : undefined}
    >
      <div
        id={id}
        ref={track}
        className={`home-rail__track ${className}`}
        tabIndex={state.overflow ? 0 : undefined}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget || !state.overflow) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1, true);
          }
        }}
      >
        {children}
      </div>
      {state.overflow && (
        <div className="home-rail__controls">
          <span className="home-rail__hint">Use as setas ou deslize</span>
          <span className="home-rail__position" role="status" aria-live="polite">
            {state.first === state.last ? state.first : `${state.first}–${state.last}`} de {count}
          </span>
          <button
            type="button"
            onClick={(event) => move(-1, event.detail === 0)}
            disabled={state.start}
            aria-controls={id}
            aria-label={`Anterior: ${label}`}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => move(1, event.detail === 0)}
            disabled={state.end}
            aria-controls={id}
            aria-label={`Próximo: ${label}`}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
