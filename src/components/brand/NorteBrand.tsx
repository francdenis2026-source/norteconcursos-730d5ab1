import { cn } from "@/lib/utils";

type NorteBrandProps = {
  className?: string;
  compact?: boolean;
  light?: boolean;
};

export function NorteBrand({ className, compact = false, light = false }: NorteBrandProps) {
  return (
    <span
      className={cn(
        "norte-brand",
        compact && "norte-brand--compact",
        light && "is-light",
        className,
      )}
      aria-label="Norte Concurso"
    >
      <span className="norte-brand__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img">
          <path
            className="norte-brand__shield"
            d="M24 3.5 41 10v11.6c0 10.6-6.8 18.6-17 22.9C13.8 40.2 7 32.2 7 21.6V10l17-6.5Z"
          />
          <path className="norte-brand__north" d="m24 9 9.1 23.2L24 28.7l-9.1 3.5L24 9Z" />
          <path className="norte-brand__cut" d="M24 14.2v10.2l-4.1 2.1L24 14.2Z" />
          <circle className="norte-brand__point" cx="24" cy="36.2" r="2.1" />
        </svg>
      </span>
      {!compact && (
        <span className="norte-brand__type" aria-hidden="true">
          <strong>NORTE</strong>
          <span>CONCURSO</span>
        </span>
      )}
    </span>
  );
}
