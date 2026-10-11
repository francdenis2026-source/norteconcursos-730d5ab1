import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroImage =
  | "dashboard"
  | "journey"
  | "study-desk"
  | "trainer"
  | "exam-hall"
  | "command-room"
  | "careers-team"
  | "field-map"
  | "auth"
  | "toolkit";

type PageHeroProps = {
  image: HeroImage;
  kicker: string;
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function PageHero({
  image,
  kicker,
  icon: Icon,
  title,
  description,
  actions,
  children,
  size = "md",
  className,
}: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;
    const onMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--hero-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      hero.style.setProperty("--hero-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };
    const onLeave = () => {
      hero.style.setProperty("--hero-x", "78%");
      hero.style.setProperty("--hero-y", "22%");
    };
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={cn("page-hero", size !== "md" && `page-hero--${size}`, className)}
      data-hero={image}
    >
      <div className="page-hero__row">
        <div className="page-hero__text">
          <span className="hero-chip">
            {Icon && <Icon />}
            {kicker}
          </span>
          <h1>{title}</h1>
          {description && <p className="page-hero__desc">{description}</p>}
        </div>
        {actions && <div className="page-hero__actions no-print">{actions}</div>}
      </div>
      {children}
    </section>
  );
}

export function LockedState({
  image,
  title,
  description,
}: {
  image: HeroImage;
  title: ReactNode;
  description: ReactNode;
}) {
  return (
    <PageHero
      image={image}
      size="lg"
      kicker="Área exclusiva para alunos"
      icon={Lock}
      title={title}
      description={description}
      actions={
        <>
          <Link
            to="/auth"
            search={{ mode: "register" }}
            className="hero-btn-ghost inline-flex items-center px-4 text-sm"
          >
            Criar conta grátis
          </Link>
          <Link
            to="/auth"
            search={{ mode: undefined }}
            className="hero-btn-primary inline-flex items-center gap-2 px-4 text-sm"
          >
            Entrar com CPF <ArrowRight className="h-4 w-4" />
          </Link>
        </>
      }
    />
  );
}

export function HeroStat({
  icon: Icon,
  label,
  value,
}: {
  icon?: LucideIcon;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="hero-stat">
      <span>
        {Icon && <Icon />}
        {label}
      </span>
      <strong className="tabular">{value}</strong>
    </div>
  );
}
