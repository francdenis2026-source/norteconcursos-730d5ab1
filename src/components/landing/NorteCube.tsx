import { useEffect, useMemo, useRef } from "react";
import "@/styles/norte-cube.css";

/** Cubo 3×3×3 em CSS 3D (sem biblioteca): duas fatias opostas giram em intervalos; arrastar gira o cubo todo.
 * Pausa fora da tela e com a aba oculta; com "reduzir movimento" fica parado numa pose fixa. */

type Mat = number[]; // 4×4, ordem de coluna (como matrix3d)
const I: Mat = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
const mul = (a: Mat, b: Mat): Mat => {
  const r = new Array<number>(16).fill(0);
  for (let c = 0; c < 4; c++)
    for (let row = 0; row < 4; row++)
      for (let k = 0; k < 4; k++) r[c * 4 + row]! += a[k * 4 + row]! * b[c * 4 + k]!;
  return r;
};
const rot = (axis: 0 | 1 | 2, deg: number): Mat => {
  const t = (deg * Math.PI) / 180;
  const c = Math.cos(t);
  const s = Math.sin(t);
  const m = [...I];
  const [i, j] = axis === 0 ? [1, 2] : axis === 1 ? [2, 0] : [0, 1];
  m[i! * 4 + i!] = c;
  m[j! * 4 + i!] = s;
  m[i! * 4 + j!] = -s;
  m[j! * 4 + j!] = c;
  return m;
};
const move = (x: number, y: number, z: number): Mat => {
  const m = [...I];
  m[12] = x;
  m[13] = y;
  m[14] = z;
  return m;
};

const SIZE = 56;
const GAP = 2;
const STEP = SIZE + GAP;
// Adesivos nas faces externas (tons do Norte); o corpo é preto fosco.
const STICKER: Record<string, string> = {
  px: "#d3ad68",
  nx: "#3f8f86",
  py: "#5b7fb8",
  ny: "#8a6fb0",
  pz: "#b8686f",
  nz: "#6f9b6a",
};
const FACES: { key: string; transform: string }[] = [
  { key: "pz", transform: `translateZ(${SIZE / 2}px)` },
  { key: "nz", transform: `rotateY(180deg) translateZ(${SIZE / 2}px)` },
  { key: "px", transform: `rotateY(90deg) translateZ(${SIZE / 2}px)` },
  { key: "nx", transform: `rotateY(-90deg) translateZ(${SIZE / 2}px)` },
  { key: "py", transform: `rotateX(90deg) translateZ(${SIZE / 2}px)` },
  { key: "ny", transform: `rotateX(-90deg) translateZ(${SIZE / 2}px)` },
];

interface Cubie {
  el: HTMLDivElement | null;
  m: Mat;
}

export function NorteCube({ size = 1 }: { size?: number }) {
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const cubies = useRef<Cubie[]>([]);
  const positions = useMemo(() => {
    const list: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) list.push([x, y, z]);
    return list;
  }, []);

  useEffect(() => {
    const host = root.current;
    const sceneEl = scene.current;
    if (!host || !sceneEl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cubies.current.forEach((c, i) => {
      const [x, y, z] = positions[i]!;
      c.m = move(x * STEP, y * STEP, z * STEP);
      if (c.el) c.el.style.transform = `matrix3d(${c.m.join(",")})`;
    });
    // Pose do cubo inteiro (arrastável).
    let rx = -24;
    let ry = 34;
    const applyView = () => {
      sceneEl.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    applyView();
    if (reduce) return;

    let visible = true;
    let dragging = false;
    let last = { x: 0, y: 0 };
    let raf = 0;
    let timer = 0;
    let animating = false;

    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
    });
    io.observe(host);

    const idle = (t: number) => {
      if (visible && !document.hidden && !dragging) {
        ry += 0.12;
        applyView();
      }
      raf = requestAnimationFrame(idle);
      void t;
    };
    raf = requestAnimationFrame(idle);

    const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
    const turn = () => {
      if (!visible || document.hidden || animating) return;
      animating = true;
      const axis = Math.floor(Math.random() * 3) as 0 | 1 | 2;
      const dir = Math.random() < 0.5 ? 1 : -1;
      // Duas fatias opostas (as da ponta) giram juntas.
      const sel = cubies.current.filter((c) => Math.abs(Math.round(c.m[12 + axis]! / STEP)) === 1);
      const start = performance.now();
      const dur = 900;
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const r = rot(axis, 90 * dir * ease(p));
        for (const c of sel) if (c.el) c.el.style.transform = `matrix3d(${mul(r, c.m).join(",")})`;
        if (p < 1) requestAnimationFrame(step);
        else {
          const done = rot(axis, 90 * dir);
          for (const c of sel) {
            const next = mul(done, c.m).map((v, i) =>
              i < 12 ? Math.round(v) : Math.round(v / STEP) * STEP,
            );
            next[15] = 1;
            c.m = next;
            if (c.el) c.el.style.transform = `matrix3d(${next.join(",")})`;
          }
          animating = false;
        }
      };
      requestAnimationFrame(step);
    };
    timer = window.setInterval(turn, 2000);

    const down = (e: PointerEvent) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      host.setPointerCapture(e.pointerId);
    };
    const moveP = (e: PointerEvent) => {
      if (!dragging) return;
      ry += (e.clientX - last.x) * 0.5;
      rx = Math.max(-80, Math.min(80, rx - (e.clientY - last.y) * 0.5));
      last = { x: e.clientX, y: e.clientY };
      applyView();
    };
    const up = () => {
      dragging = false;
    };
    host.addEventListener("pointerdown", down);
    host.addEventListener("pointermove", moveP);
    host.addEventListener("pointerup", up);
    host.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
      io.disconnect();
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointermove", moveP);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointercancel", up);
    };
  }, [positions]);

  return (
    <div
      ref={root}
      className="ncube"
      style={{ ["--ncube-scale" as string]: size }}
      role="img"
      aria-label="Cubo decorativo do Norte Concursos. Arraste para girar."
    >
      <div ref={scene} className="ncube__scene">
        {positions.map(([x, y, z], i) => (
          <div
            key={i}
            ref={(el) => {
              cubies.current[i] = cubies.current[i] ?? { el: null, m: I };
              cubies.current[i]!.el = el;
            }}
            className="ncube__cubie"
          >
            {FACES.map((f) => {
              const outer =
                (f.key === "px" && x === 1) ||
                (f.key === "nx" && x === -1) ||
                (f.key === "py" && y === 1) ||
                (f.key === "ny" && y === -1) ||
                (f.key === "pz" && z === 1) ||
                (f.key === "nz" && z === -1);
              return (
                <i
                  key={f.key}
                  className="ncube__face"
                  style={{
                    transform: f.transform,
                    ...(outer ? { ["--sticker" as string]: STICKER[f.key]! } : null),
                  }}
                  data-sticker={outer ? "true" : undefined}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
