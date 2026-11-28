import { useEffect, useState } from "react";
import { isChristmasSeason } from "@/lib/christmas.config";

const FLAKES = 14;

/** Neve leve e discreta sobre o hero, só na época de Natal. Nada se o visitante pedir menos movimento. */
export function ChristmasSnow() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isChristmasSeason()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="xmas-snow" aria-hidden="true">
      {Array.from({ length: FLAKES }, (_, i) => (
        <span key={i} className="xmas-snow__flake" style={{ "--xi": i } as React.CSSProperties} />
      ))}
    </div>
  );
}
