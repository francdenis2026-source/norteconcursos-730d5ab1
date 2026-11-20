import * as React from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Props = {
  /** Lado que pesa mais (o prato desse lado desce): "left" = Certo, "right" = Errado. */
  tilt?: "left" | "right" | undefined;
  answered: boolean;
  caption: string;
  /** Mostrado se o navegador não tiver WebGL. */
  fallback?: React.ReactNode;
};

const PIVOT_Y = 2.4;
const ARM = 1.7;
const CHAIN = 1.5;
const SELECT_ANGLE = 0.075;
const ANSWER_ANGLE = 0.17;

function chainBetween(a: THREE.Vector3, b: THREE.Vector3, mat: THREE.Material) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, len, 6), mat);
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return mesh;
}

function contactShadow() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    grad.addColorStop(0, "rgba(0,0,0,0.55)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(c);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 1.5),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.005;
  return mesh;
}

/** Balança de Certo/Errado em 3D: metal com reflexos reais e física de pêndulo amortecido. */
export default function QxScale3D({ tilt, answered, caption, fallback }: Props) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const [failed, setFailed] = React.useState(false);
  // Alvo atual lido pelo laço de animação sem recriar a cena.
  const targetRef = React.useRef({ tilt, answered });
  targetRef.current = { tilt, answered };

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    const key = new THREE.DirectionalLight(0xfff1d6, 1.6);
    key.position.set(-3, 5, 4);
    scene.add(key);

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);

    const gold = new THREE.MeshStandardMaterial({ color: 0xd9ab3f, metalness: 1, roughness: 0.26 });
    const goldDark = new THREE.MeshStandardMaterial({ color: 0xa87a1c, metalness: 1, roughness: 0.38 });
    const steel = new THREE.MeshStandardMaterial({ color: 0xc9d3da, metalness: 1, roughness: 0.22, side: THREE.DoubleSide });
    const chainMat = new THREE.MeshStandardMaterial({ color: 0xc79a2e, metalness: 1, roughness: 0.3 });
    const inner = new THREE.MeshStandardMaterial({
      color: 0x55636c,
      metalness: 0.6,
      roughness: 0.4,
      emissive: new THREE.Color(0x2bd98a),
      emissiveIntensity: 0,
    });
    const innerL = inner.clone();
    const innerR = inner.clone();

    const root = new THREE.Group();
    scene.add(root);
    root.add(contactShadow());

    // Base e coluna
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.15, 0.16, 64), goldDark);
    base.position.y = 0.08;
    const base2 = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.95, 0.14, 64), gold);
    base2.position.y = 0.23;
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.12, PIVOT_Y - 0.28, 32), gold);
    column.position.y = 0.3 + (PIVOT_Y - 0.28) / 2 - 0.02;
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 24), gold);
    finial.position.y = PIVOT_Y + 0.12;
    root.add(base, base2, column, finial);

    // Travessa (gira no pino)
    const beam = new THREE.Group();
    beam.position.y = PIVOT_Y;
    root.add(beam);
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, ARM * 2, 24), gold);
    bar.rotation.z = Math.PI / 2;
    beam.add(bar);
    const hub = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 24), gold);
    beam.add(hub);

    const makePan = (side: -1 | 1) => {
      const hanger = new THREE.Group(); // pêndulo: gira no ponto de fixação
      hanger.position.set(side * ARM, 0, 0);
      beam.add(hanger);
      const knob = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 16), gold);
      knob.position.copy(hanger.position);
      beam.add(knob);
      const r = 0.66;
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
        hanger.add(chainBetween(new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * r, -CHAIN, Math.sin(a) * r), chainMat));
      }
      const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.028, 16, 64), steel);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = -CHAIN;
      const dish = new THREE.Mesh(new THREE.SphereGeometry(r, 56, 20, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), steel);
      dish.scale.y = 0.3;
      dish.position.y = -CHAIN;
      const floor = new THREE.Mesh(new THREE.CircleGeometry(r * 0.93, 48), inner);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -CHAIN - 0.005;
      hanger.add(rim, dish, floor);
      return { hanger, floor };
    };
    const left = makePan(-1);
    const right = makePan(1);

    // Física: mola amortecida para a travessa e um pêndulo para cada prato.
    const st = { th: 0, w: 0, pl: 0, pwl: 0, pr: 0, pwr: 0, prevW: 0 };
    let raf = 0;
    let last = performance.now();
    let running = true;
    let visible = true;

    const resize = () => {
      const w = Math.max(host.clientWidth, 1);
      const h = Math.max(host.clientHeight, 1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const need = Math.max(4.75 / (2 * Math.tan((camera.fov * Math.PI) / 360)), 5.6 / camera.aspect / (2 * Math.tan((camera.fov * Math.PI) / 360)));
      camera.position.set(0, 1.75, need);
      camera.lookAt(0, 1.62, 0);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;
      const t = targetRef.current;
      const mag = t.tilt ? (t.answered ? ANSWER_ANGLE : SELECT_ANGLE) : 0;
      const sign = t.tilt === "left" ? 1 : t.tilt === "right" ? -1 : 0;
      const idle = t.tilt ? 0 : Math.sin(now / 1900) * 0.028;
      const target = sign * mag + idle;
      if (reduce) {
        st.th = target;
        st.w = 0;
        st.pl = st.pr = 0;
      } else {
        // mola subamortecida (ζ ≈ 0,24): passa do ponto e assenta
        const k = 16;
        const c = 2.0;
        const acc = k * (target - st.th) - c * st.w;
        st.w += acc * dt;
        st.th += st.w * dt;
        // pratos: pêndulo curto, excitado pela aceleração da travessa
        const kp = 34;
        const cp = 1.3;
        const accL = -kp * st.pl - cp * st.pwl - acc * 0.55;
        st.pwl += accL * dt;
        st.pl += st.pwl * dt;
        const accR = -kp * st.pr - cp * st.pwr - acc * 0.55;
        st.pwr += accR * dt;
        st.pr += st.pwr * dt;
      }
      beam.rotation.z = st.th;
      // cada prato fica na vertical (contra-rotação) mais o balanço próprio
      left.hanger.rotation.z = -st.th + st.pl;
      right.hanger.rotation.z = -st.th + st.pr;
      renderer.render(scene, camera);
    };

    // Piso do prato vencedor: material próprio para acender só um lado.
    left.floor.material = innerL;
    right.floor.material = innerR;
    const loop = (now: number) => {
      if (!running) return;
      step(now);
      const t = targetRef.current;
      const wl = t.answered && t.tilt === "left" ? 1 : 0;
      const wr = t.answered && t.tilt === "right" ? 1 : 0;
      innerL.emissiveIntensity += (wl * 0.9 - innerL.emissiveIntensity) * 0.06;
      innerR.emissiveIntensity += (wr * 0.9 - innerR.emissiveIntensity) * 0.06;
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible && !raf && running) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(host);
    const onVis = () => {
      if (!document.hidden && !raf && running && visible) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      [gold, goldDark, steel, chainMat, inner, innerL, innerR].forEach((m) => m.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  if (failed) return <>{fallback ?? null}</>;
  const win = answered ? tilt : undefined;
  return (
    <figure className="qx-scale3d" data-tilt={tilt} data-answered={answered || undefined} aria-label={caption}>
      <div ref={hostRef} className="qx-scale3d__stage" aria-hidden="true" />
      <div className="qx-scale3d__labels" aria-hidden="true">
        <span data-win={win === "left" ? "" : undefined}>Certo</span>
        <span data-win={win === "right" ? "" : undefined}>Errado</span>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
