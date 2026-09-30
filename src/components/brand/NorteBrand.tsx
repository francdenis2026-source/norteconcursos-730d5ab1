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
      aria-label="Norte Concursos"
    >
      <span className="norte-brand__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img">
          <circle className="norte-brand__frame" cx="24" cy="24" r="20" />
          <path className="norte-brand__orbit" d="M34.2 15.1a13.2 13.2 0 1 0 .2 17.6" />
          <path className="norte-brand__monogram" d="M17.5 33V15l13 18V15" />
          <path
            className="norte-brand__star"
            d="m24 4.8 1.55 4.05L29.6 10.4l-4.05 1.55L24 16l-1.55-4.05-4.05-1.55 4.05-1.55L24 4.8Z"
          />
          <path className="norte-brand__horizon" d="M13.2 37.2h21.6" />
        </svg>
      </span>
      {!compact && (
        <span className="norte-brand__type" aria-hidden="true">
          <strong>NORTE</strong>
          <span>CONCURSOS</span>
        </span>
      )}
    </span>
  );
}
