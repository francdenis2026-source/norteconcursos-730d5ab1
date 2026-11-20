import * as React from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Medalha 3D. Um único renderizador WebGL é compartilhado por todas as medalhas da página
 * (navegadores limitam os contextos WebGL); cada medalha só copia o quadro para o seu canvas 2D.
 * Gira com um giro de entrada e, ao apontar o mouse ou focar, balança refletindo a luz.
 * Medalha não conquistada: fosca e escura, parada.
 */

export type MedalTier = 0 | 1 | 2 | 3;

const SIZE = 128; // px do canvas de cada medalha (exibido em 56px; 2x para telas densas)

const TIER_LOOK: Record<MedalTier, { color: number; metal: number; rough: number; emissive: number }> = {
  0: { color: 0xb8733a, metal: 1, rough: 0.34, emissive: 0x2a1204 }, // bronze
  1: { color: 0xd5dbe3, metal: 1, rough: 0.22, emissive: 0x15181c }, // prata
  2: { color: 0xf2b92f, metal: 1, rough: 0.2, emissive: 0x2a1c02 }, // ouro
  3: { color: 0x8fe3f5, metal: 0.9, rough: 0.08, emissive: 0x06222a }, // diamante
};

interface Shared {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  pivot: THREE.Group;
  faceMat: THREE.MeshStandardMaterial;
  rimMat: THREE.MeshStandardMaterial;
  markMat: THREE.MeshStandardMaterial;
}

let shared: Shared | null | undefined;

function starShape(outer: number, inner: number) {
  const s = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = Math.PI / 2 + (i * Math.PI) / 5;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  return s;
}

function getShared(): Shared | null {
  if (shared !== undefined) return shared;
  try {
    const canvas = document.createElement("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(1);
    renderer.setSize(SIZE, SIZE, false);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(2, 3, 4);
    scene.add(key);

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 20);
    camera.position.set(0, 0, 5.6);

    const faceMat = new THREE.MeshStandardMaterial();
    const rimMat = new THREE.MeshStandardMaterial();
    const markMat = new THREE.MeshStandardMaterial();

    const pivot = new THREE.Group();
    // disco (eixo Z para a câmera)
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.14, 64), faceMat);
    disc.rotation.x = Math.PI / 2;
    pivot.add(disc);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.075, 20, 80), rimMat);
    pivot.add(rim);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.025, 12, 64), rimMat);
    ring.position.z = 0.075;
    const ringBack = ring.clone();
    ringBack.position.z = -0.075;
    pivot.add(ring, ringBack);
    // estrela em relevo nas duas faces
    const geo = new THREE.ExtrudeGeometry(starShape(0.42, 0.18), {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 2,
    });
    const star = new THREE.Mesh(geo, markMat);
    star.position.z = 0.07;
    const starBack = star.clone();
    starBack.rotation.y = Math.PI;
    starBack.position.z = -0.07;
    pivot.add(star, starBack);
    scene.add(pivot);

    shared = { renderer, scene, camera, pivot, faceMat, rimMat, markMat };
  } catch {
    shared = null;
  }
  return shared;
}

function applyLook(s: Shared, tier: MedalTier, earned: boolean) {
  if (earned) {
    const l = TIER_LOOK[tier];
    for (const m of [s.faceMat, s.rimMat, s.markMat]) {
      m.color.setHex(l.color);
      m.metalness = l.metal;
      m.roughness = l.rough;
      m.emissive.setHex(l.emissive);
      m.envMapIntensity = 1;
    }
    s.faceMat.roughness = l.rough + 0.14; // face levemente mais fosca: a estrela se destaca
    s.markMat.roughness = Math.max(0.08, l.rough - 0.08);
  } else {
    for (const m of [s.faceMat, s.rimMat, s.markMat]) {
      m.color.setHex(0x59606b);
      m.metalness = 0.15;
      m.roughness = 0.85;
      m.emissive.setHex(0x000000);
      m.envMapIntensity = 0.35;
    }
    s.markMat.color.setHex(0x4a505a);
  }
}

type Item = {
  ctx: CanvasRenderingContext2D;
  tier: MedalTier;
  earned: boolean;
  yaw: number;
  vel: number;
  hover: boolean;
  intro: number; // giro de entrada restante (rad)
  t: number;
  visible: boolean;
  dirty: boolean;
};

const items = new Set<Item>();
let raf = 0;
let last = 0;

function draw(it: Item) {
  const s = getShared();
  if (!s) return;
  applyLook(s, it.tier, it.earned);
  s.pivot.rotation.y = it.yaw;
  s.pivot.rotation.x = it.earned ? -0.12 + Math.sin(it.t * 1.3) * (it.hover ? 0.1 : 0) : -0.08;
  s.renderer.render(s.scene, s.camera);
  it.ctx.clearRect(0, 0, SIZE, SIZE);
  it.ctx.drawImage(s.renderer.domElement, 0, 0, SIZE, SIZE);
  it.dirty = false;
}

function tick(now: number) {
  raf = 0;
  const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
  last = now;
  let any = false;
  items.forEach((it) => {
    if (!it.visible) return;
    if (it.intro > 0) {
      // giro de entrada: desacelera até parar levemente inclinada
      const step = Math.max(0.02, it.intro * 3.2 * dt);
      it.yaw += step;
      it.intro -= step;
      it.dirty = true;
      any = true;
    } else if (it.hover && it.earned) {
      it.t += dt;
      it.yaw = Math.sin(it.t * 1.6) * 0.75 + 0.2; // balança mostrando o reflexo
      it.dirty = true;
      any = true;
    } else if (Math.abs(it.yaw - 0.2) > 0.002 && it.earned) {
      it.yaw += (0.2 - it.yaw) * Math.min(1, dt * 8); // volta ao repouso
      it.dirty = true;
      any = true;
    }
    if (it.dirty) draw(it);
  });
  if (any) raf = requestAnimationFrame(tick);
}

function wake() {
  if (!raf) {
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }
}

export default function QxMedal3D({
  tier,
  earned,
  label,
  fallback,
}: {
  tier: MedalTier;
  earned: boolean;
  /** Texto acessível (nome da medalha). */
  label: string;
  fallback: React.ReactNode;
}) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const itemRef = React.useRef<Item | null>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!getShared()) {
      setFailed(true);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFailed(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const it: Item = {
      ctx,
      tier,
      earned,
      yaw: earned ? 0.2 : 0,
      vel: 0,
      hover: false,
      intro: earned && !reduce ? Math.PI * 2 : 0,
      t: 0,
      visible: false,
      dirty: true,
    };
    itemRef.current = it;
    items.add(it);
    const io = new IntersectionObserver(
      ([e]) => {
        it.visible = !!e?.isIntersecting;
        if (it.visible) {
          it.dirty = true;
          wake();
        }
      },
      { rootMargin: "80px" },
    );
    io.observe(canvas);
    const host = canvas.parentElement ?? canvas;
    const on = () => {
      if (reduce) return;
      it.hover = true;
      wake();
    };
    const off = () => {
      it.hover = false;
      wake();
    };
    host.addEventListener("pointerenter", on);
    host.addEventListener("pointerleave", off);
    host.addEventListener("focusin", on);
    host.addEventListener("focusout", off);
    return () => {
      io.disconnect();
      host.removeEventListener("pointerenter", on);
      host.removeEventListener("pointerleave", off);
      host.removeEventListener("focusin", on);
      host.removeEventListener("focusout", off);
      items.delete(it);
      itemRef.current = null;
    };
    // tier/earned mudam raramente; o efeito seguinte atualiza sem recriar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const it = itemRef.current;
    if (!it) return;
    it.tier = tier;
    it.earned = earned;
    it.dirty = true;
    wake();
  }, [tier, earned]);

  if (failed) return <>{fallback}</>;
  return (
    <canvas
      ref={ref}
      width={SIZE}
      height={SIZE}
      role="img"
      aria-label={label}
      className="h-14 w-14 select-none"
    />
  );
}
