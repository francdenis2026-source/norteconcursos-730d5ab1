import { useId } from "react";
import { cn } from "@/lib/utils";

type NorteBrandProps = {
  className?: string;
  compact?: boolean;
  light?: boolean;
};

const SHIELD = "M32 4 54 11.5V30C54 44.5 45 55 32 60.5 19 55 10 44.5 10 30V11.5Z";

export function NorteBrand({ className, compact = false, light = false }: NorteBrandProps) {
  const uid = useId().replace(/:/g, "");
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
      <svg className="norte-brand__mark" viewBox="0 0 64 64" role="img" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}b`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1e2a48" />
            <stop offset="1" stopColor="#0a0f1e" />
          </linearGradient>
          <linearGradient id={`${uid}r`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6dc8a" />
            <stop offset=".5" stopColor="#d9a53a" />
            <stop offset="1" stopColor="#a3711a" />
          </linearGradient>
          <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f8df8f" />
            <stop offset="1" stopColor="#d49a2c" />
          </linearGradient>
        </defs>
        <path
          d={SHIELD}
          fill={`url(#${uid}b)`}
          stroke={`url(#${uid}r)`}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d={SHIELD}
          transform="translate(32 33) scale(.84) translate(-32 -33)"
          fill="none"
          stroke="#e9bd55"
          strokeOpacity=".35"
          strokeWidth=".8"
          strokeLinejoin="round"
        />
        <path d="M24.2 24H24.4L39.8 40V47H39.6L24.2 31Z" fill={`url(#${uid}g)`} />
        <path d="M20 47V24H24.2V47ZM39.8 24H44V47H39.8Z" fill="#f7f1df" />
        <path
          d="M32 10.8 33.5 15 37.7 16.5 33.5 18 32 22.2 30.5 18 26.3 16.5 30.5 15Z"
          fill={`url(#${uid}g)`}
        />
      </svg>
      {!compact && (
        <span className="norte-brand__type" aria-hidden="true">
          <strong>NORTE</strong>
          <span>CONCURSOS</span>
        </span>
      )}
    </span>
  );
}
