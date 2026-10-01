import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { NorteBrand } from "@/components/brand/NorteBrand";

export function InstitutionalLayout({
  title,
  eyebrow,
  intro,
  children,
}: {
  title: string;
  eyebrow: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="institutional-page">
      <header className="institutional-header lp-container">
        <Link to="/" aria-label="Norte Concursos — início">
          <NorteBrand light />
        </Link>
        <Link to="/auth" className="btn-brass">
          Entrar na plataforma
        </Link>
      </header>
      <main>
        <div className="institutional-heading lp-container">
          <span className="lp-kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        {children}
      </main>
      <footer className="institutional-footer lp-container">
        <span>Norte Concursos · De Feijó para todo o Brasil</span>
        <nav aria-label="Institucional">
          <Link to="/sobre">Nossa história</Link>
          <Link to="/suporte">Suporte</Link>
          <Link to="/privacy">Privacidade</Link>
          <Link to="/terms">Termos de uso</Link>
          <Link to="/">Voltar ao início</Link>
        </nav>
      </footer>
    </div>
  );
}
