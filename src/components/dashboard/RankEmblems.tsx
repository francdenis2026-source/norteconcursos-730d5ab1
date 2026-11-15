import { useId } from "react";

/** Emblemas ilustrados (SVG) do ranking: medalha com fita, troféu e escudo de nível metálicos. */

type Tier = "gold" | "silver" | "bronze";

const METAL: Record<Tier, { hi: string; mid: string; lo: string; rim: string; ink: string }> = {
  gold: { hi: "#fff1a8", mid: "#f2b705", lo: "#a8690a", rim: "#7a4a05", ink: "#5a3600" },
  silver: { hi: "#ffffff", mid: "#c3ccd8", lo: "#7b8798", rim: "#4d5766", ink: "#2c3440" },
  bronze: { hi: "#ffd2a6", mid: "#cd7f45", lo: "#8a4a1f", rim: "#5b2f12", ink: "#41200a" },
};

export function MedalEmblem({
  tier,
  label,
  size = 56,
}: {
  tier: Tier;
  label?: string | number;
  size?: number;
}) {
  const id = useId().replace(/:/g, "");
  const m = METAL[tier];
  return (
    <svg
      className="rk-emblem"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={`${id}m`}
          x1="12"
          y1="14"
          x2="52"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={m.hi} />
          <stop offset=".5" stopColor={m.mid} />
          <stop offset="1" stopColor={m.lo} />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6384a" />
          <stop offset="1" stopColor="#8e1426" />
        </linearGradient>
        <radialGradient id={`${id}s`} cx=".32" cy=".25" r=".7">
          <stop offset="0" stopColor="#fff" stopOpacity=".75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M17 2h13l8 20-9 5z" fill={`url(#${id}r)`} />
      <path d="M47 2H34l-8 20 9 5z" fill="#2c4a8f" />
      <circle cx="32" cy="40" r="20" fill={m.rim} />
      <circle cx="32" cy="40" r="18" fill={`url(#${id}m)`} />
      <circle
        cx="32"
        cy="40"
        r="13.5"
        fill="none"
        stroke={m.rim}
        strokeOpacity=".45"
        strokeWidth="1.5"
      />
      <circle cx="32" cy="40" r="18" fill={`url(#${id}s)`} />
      {label !== undefined && (
        <text
          x="32"
          y="46.5"
          textAnchor="middle"
          fontSize="18"
          fontWeight="900"
          fill={m.ink}
          fontFamily="system-ui, sans-serif"
        >
          {label}
        </text>
      )}
    </svg>
  );
}

export function TrophyEmblem({ size = 72 }: { size?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className="rk-emblem"
      width={size}
      height={size}
      viewBox="0 0 72 72"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}g`} x1="14" y1="6" x2="58" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff1a8" />
          <stop offset=".45" stopColor="#f2b705" />
          <stop offset="1" stopColor="#a8690a" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4254" />
          <stop offset="1" stopColor="#151a26" />
        </linearGradient>
      </defs>
      <path
        d="M16 12H6c0 12 4 20 14 22M56 12h10c0 12-4 20-14 22"
        fill="none"
        stroke="#c98a0c"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M16 6h40v18c0 12-8 20-20 20S16 36 16 24z" fill={`url(#${id}g)`} />
      <path d="M22 9h6v17c0 8 2 13 6 15-9-1-12-8-12-17z" fill="#fff" opacity=".35" />
      <path d="M32 44h8v8h-8z" fill="#c98a0c" />
      <rect x="22" y="52" width="28" height="6" rx="2" fill={`url(#${id}g)`} />
      <rect x="18" y="58" width="36" height="8" rx="2.5" fill={`url(#${id}b)`} />
      <path
        d="m36 16 2.6 5.3 5.8.8-4.2 4.1 1 5.8L36 29.2l-5.2 2.8 1-5.8-4.2-4.1 5.8-.8z"
        fill="#fff8d6"
        opacity=".92"
      />
    </svg>
  );
}

const SHIELDS = [
  { hi: "#e3b58a", mid: "#b06a34", lo: "#6e3b17" }, // Aspirante
  { hi: "#ffffff", mid: "#c3ccd8", lo: "#6f7b8c" }, // Competidor
  { hi: "#fff1a8", mid: "#f2b705", lo: "#a8690a" }, // Avançado
  { hi: "#b8f3ea", mid: "#2fb8a8", lo: "#12665d" }, // Especialista
  { hi: "#d9ccff", mid: "#7c5cf0", lo: "#3d24a6" }, // Elite
] as const;

export function LevelEmblem({ stars, size = 40 }: { stars: number; size?: number }) {
  const id = useId().replace(/:/g, "");
  const n = Math.min(5, Math.max(1, stars));
  const c = SHIELDS[n - 1]!;
  return (
    <svg
      className="rk-emblem"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}l`} x1="8" y1="4" x2="40" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.hi} />
          <stop offset=".5" stopColor={c.mid} />
          <stop offset="1" stopColor={c.lo} />
        </linearGradient>
      </defs>
      <path d="M24 2 42 8v14c0 11-7.5 19-18 24C13.500 41 6 33 6 22V8z" fill={c.lo} />
      <path
        d="M24 5 39 10v12c0 9.500-6.300 16.500-15 21-8.700-4.500-15-11.500-15-21V10z"
        fill={`url(#${id}l)`}
      />
      <path d="M24 5 39 10v12c0 9.500-6.300 16.500-15 21z" fill="#000" opacity=".12" />
      <path d="M12 12 24 8v14c0 8-4 13-9 16-2.500-4-3-9-3-14z" fill="#fff" opacity=".28" />
      <g fill="#fff" stroke={c.lo} strokeWidth=".6">
        {Array.from({ length: n }, (_, i) => {
          const cx = 24 + (i - (n - 1) / 2) * 6.2;
          return (
            <polygon
              key={i}
              transform={`translate(${cx} 26)`}
              points="0,-4 1.2,-1.3 4,-1.1 1.9,0.9 2.5,3.8 0,2.3 -2.5,3.8 -1.9,0.9 -4,-1.1 -1.2,-1.3"
            />
          );
        })}
      </g>
    </svg>
  );
}
