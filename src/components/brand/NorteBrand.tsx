import { cn } from "@/lib/utils";
import wordmark from "@/assets/brand/norte-wordmark.json";
import "./NorteBrand.css";

type NorteBrandProps = {
  className?: string;
  compact?: boolean;
  light?: boolean;
};

/** The shared skull/pistol shield and outlined wordmark are identical to the downloadable identity. */
export function NorteBrand({ className, compact = false, light = false }: NorteBrandProps) {
  return (
    <span
      className={cn(
        "norte-brand",
        compact && "norte-brand--compact",
        light && "is-light",
        className,
      )}
      role="img"
      aria-label="Norte Concursos"
    >
      <img
        className="norte-brand__mark"
        src="/media/brand/norte-identity/emblema.svg"
        width={64}
        height={64}
        alt=""
        aria-hidden="true"
        decoding="async"
      />
      {!compact && (
        <span className="norte-brand__type" aria-hidden="true">
          <svg
            className="norte-brand__wordmark"
            viewBox={wordmark.viewBox}
            aria-hidden="true"
            focusable="false"
          >
            <g className="norte-brand__name">
              {wordmark.norte.map((path, index) => (
                <path key={index} d={path.d} transform={path.transform} />
              ))}
            </g>
            <g className="norte-brand__subtitle">
              {wordmark.concursos.map((path, index) => (
                <path key={index} d={path.d} transform={path.transform} />
              ))}
            </g>
          </svg>
        </span>
      )}
    </span>
  );
}
