import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Compass,
  Fingerprint,
  Flame,
  HeartHandshake,
  Lock,
  Microscope,
  Shield,
  Siren,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Scope = "federal" | "estadual" | "municipal";

const CAREERS: {
  icon: LucideIcon;
  name: string;
  roles: string;
  scopes: Scope[];
}[] = [
  {
    icon: BadgeCheck,
    name: "Polícia Federal",
    roles: "Agente · Escrivão · Delegado · Perito",
    scopes: ["federal"],
  },
  {
    icon: Siren,
    name: "Polícia Rodoviária Federal",
    roles: "Policial Rodoviário Federal",
    scopes: ["federal"],
  },
  {
    icon: Fingerprint,
    name: "Polícia Civil",
    roles: "Investigador · Escrivão · Delegado",
    scopes: ["estadual"],
  },
  { icon: Shield, name: "Polícia Militar", roles: "Soldado · Oficial", scopes: ["estadual"] },
  { icon: Lock, name: "Polícia Penal", roles: "Policial Penal", scopes: ["federal", "estadual"] },
  { icon: Flame, name: "Corpo de Bombeiros", roles: "Soldado · Oficial", scopes: ["estadual"] },
  {
    icon: Microscope,
    name: "Perícia Oficial",
    roles: "Perito · Médico-legista · Papiloscopista",
    scopes: ["federal", "estadual"],
  },
  {
    icon: Building2,
    name: "Guarda Municipal",
    roles: "Guarda Civil Municipal",
    scopes: ["municipal"],
  },
  {
    icon: HeartHandshake,
    name: "Socioeducativo",
    roles: "Agente Socioeducativo",
    scopes: ["estadual"],
  },
];

const FILTERS: { id: "all" | Scope; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "federal", label: "Federais" },
  { id: "estadual", label: "Estaduais" },
  { id: "municipal", label: "Municipais" },
];

const SCOPE_LABEL: Record<Scope, string> = {
  federal: "Federal",
  estadual: "Estadual",
  municipal: "Municipal",
};

// Positions projected from real lon/lat onto the IBGE silhouette (percent of the stage).
const PINS: { name: string; left: number; top: number; side?: "left" }[] = [
  { name: "Cruzeiro do Sul", left: 18.3, top: 13.8 },
  // Tarauacá fica ~0,4° a oeste de Feijó: o rótulo vai para a esquerda para não sobrepor.
  { name: "Tarauacá", left: 43.8, top: 26.7, side: "left" },
  { name: "Feijó", left: 49.4, top: 26.8 },
  { name: "Sena Madureira", left: 72, top: 48.6 },
  { name: "Rio Branco", left: 83.4, top: 70.3 },
  { name: "Brasiléia", left: 71, top: 94.5 },
];

const delay = (n: number) => ({ "--reveal-delay": n }) as CSSProperties;

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1100, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return <b ref={ref}>{value}</b>;
}

function spotlight(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  card.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export function AcreSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scope, setScope] = useState<"all" | Scope>("all");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none)").matches
    )
      return;
    let raf = 0;
    const move = (event: globalThis.PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        stage.style.setProperty("--px", x.toFixed(3));
        stage.style.setProperty("--py", y.toFixed(3));
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      stage.style.setProperty("--px", "0");
      stage.style.setProperty("--py", "0");
    };
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section id="acre" className="lp-section lp-acre" aria-labelledby="acre-title">
      <div className="lp-acre__bg" aria-hidden="true" />
      <div className="lp-container">
        <div className="lp-acre__top">
          <div className="lp-acre__copy" data-reveal>
            <span className="lp-kicker">Segurança pública · Acre e Brasil</span>
            <h2 id="acre-title" className="lp-h2">
              Todas as carreiras. <em>Um só compromisso.</em>
            </h2>
            <p className="lp-lead">
              Polícias, bombeiros, perícia, guardas e socioeducativo. A Norte prepara você para
              servir o Acre e o Brasil, em qualquer farda.
            </p>
            <Link to="/auth" search={{ mode: "register" }} className="btn-brass lp-acre__cta">
              Escolher minha carreira <ArrowRight />
            </Link>
          </div>

          <div
            ref={stageRef}
            className="lp-acre__stage"
            data-reveal
            style={delay(1)}
            role="img"
            aria-label="Mapa do Acre com profissionais da segurança pública"
          >
            <div className="lp-acre__map" aria-hidden="true">
              <div className="lp-acre__fill" />
              <div className="lp-acre__sheen" />
            </div>
            <div className="lp-acre__pins">
              {PINS.map((pin) => (
                <span
                  key={pin.name}
                  className={pin.side === "left" ? "lp-pin lp-pin--left" : "lp-pin"}
                  style={{ left: `${pin.left}%`, top: `${pin.top}%` }}
                >
                  <i aria-hidden="true" />
                  <em>{pin.name}</em>
                </span>
              ))}
            </div>
            <img
              className="lp-acre__people"
              src="/media/acre-profissionais.webp"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div className="lp-acre__coords" aria-hidden="true">
              <span>
                <Compass /> AC · BRASIL
              </span>
              <span>70°W · 9°S</span>
            </div>
            <div className="lp-acre__badge">
              <CountUp to={CAREERS.length} />
              <span>
                carreiras da
                <br />
                segurança pública
              </span>
            </div>
          </div>
        </div>

        <div className="lp-acre__bar" data-reveal>
          <div className="lp-acre__filters" role="group" aria-label="Filtrar carreiras por esfera">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={scope === filter.id}
                onClick={() => setScope(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <span className="lp-acre__hint">Toque em uma carreira para começar a preparação</span>
        </div>

        <ul className="lp-acre__grid">
          {CAREERS.map(({ icon: Icon, name, roles, scopes }, index) => {
            const active = scope === "all" || scopes.includes(scope);
            return (
              <li key={name} data-reveal style={delay(index % 3)}>
                <Link
                  to="/auth"
                  search={{ mode: "register" }}
                  className="lp-card"
                  data-dim={!active}
                  tabIndex={active ? 0 : -1}
                  onPointerMove={spotlight}
                >
                  <span className="lp-card__head">
                    <span className="lp-card__icon">
                      <Icon />
                    </span>
                    <span className="lp-card__tag">
                      {scopes.map((item) => SCOPE_LABEL[item]).join(" · ")}
                    </span>
                  </span>
                  <strong>{name}</strong>
                  <small>{roles}</small>
                  <span className="lp-card__cta">
                    Preparar-me <ArrowRight />
                  </span>
                  <span className="lp-card__num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
