import { useHomeSection } from "@/hooks/useHomeSection";
import { BookOpen, Home, Layers3, LogIn, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";

const SECTIONS = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "plataforma", label: "Estudo", icon: BookOpen },
  { id: "concursos", label: "Concursos", icon: Target },
  { id: "planos", label: "Planos", icon: Layers3 },
];

const HOME_NAV_IDS = SECTIONS.map(({ id }) => id);

/** Anchor navigation for the compact layout, with the same sections as desktop. */
export function HomeAppNavigation() {
  const active = useHomeSection(HOME_NAV_IDS) || "inicio";
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
