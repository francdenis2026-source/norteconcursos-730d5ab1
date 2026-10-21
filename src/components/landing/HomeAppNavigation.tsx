import { useEffect, useState } from "react";
import { BookOpen, Home, Layers3, LogIn, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";

const SECTIONS = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "plataforma", label: "Preparação", icon: BookOpen },
  { id: "concursos", label: "Concursos", icon: Target },
  { id: "planos", label: "Planos", icon: Layers3 },
];

/** Anchor navigation for the compact layout, with the same sections as desktop. */
export function HomeAppNavigation() {
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const media = matchMedia("(max-width: 1100px)");
    let observer: IntersectionObserver | undefined;
    const update = () => {
      observer?.disconnect();
      if (!media.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                Math.abs(a.boundingClientRect.top - 90) - Math.abs(b.boundingClientRect.top - 90),
            );
          if (visible[0]) setActive(visible[0].target.id);
        },
        { rootMargin: "-90px 0px -55% 0px" },
      );
      SECTIONS.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) observer?.observe(section);
      });
    };
    update();
    media.addEventListener("change", update);
    return () => {
      observer?.disconnect();
      media.removeEventListener("change", update);
    };
  }, []);
  return (
    <div className="mobile-nav-shelf">
    <nav className="home-app-nav mobile-nav-glass" aria-label="Atalhos da homepage">
      {SECTIONS.map(({ id, label, icon: Icon }) => (
        <a href={`#${id}`} key={id} aria-current={active === id ? "location" : undefined}>
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
      <Link to="/auth" search={{ mode: undefined }}>
        <LogIn aria-hidden="true" />
        <span>Entrar</span>
      </Link>
    </nav>
    </div>
  );
}
