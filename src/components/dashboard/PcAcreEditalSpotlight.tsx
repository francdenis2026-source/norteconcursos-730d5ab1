import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, FileText, ListChecks, ScanSearch } from "lucide-react";

export function PcAcreEditalSpotlight() {
  return (
    <article className="student-pcac-spotlight no-print" aria-labelledby="student-pcac-spotlight-title">
      <img
        className="student-pcac-spotlight__cover"
        src="/media/editais/edital-pcac-001-2026-capa.jpg"
        alt="Capa ilustrativa do guia do concurso PC-AC 2026"
        width={180}
        height={254}
        loading="lazy"
        decoding="async"
      />
      <div className="student-pcac-spotlight__copy">
        <h3 id="student-pcac-spotlight-title">PC-AC 2026 · Preparação por cargo</h3>
        <p>139 vagas · 6 cargos · IDECAN · prova objetiva em 24/01/2027. Acompanhe seu checklist e exporte o progresso em PDF.</p>
      </div>
      <svg
        className="student-pcac-spotlight__flag"
        viewBox="0 0 500 350"
        width={500}
        height={350}
        role="img"
        aria-label="Bandeira do Acre"
      >
        <path fill="#ffdf00" d="M0 0h500L0 350z" />
        <path fill="#009b3a" d="M500 0v350H0z" />
        <path fill="#ce1126" d="m83 40 9 26h27L97 82l8 26-22-16-22 16 8-26-22-16h27z" />
      </svg>
      <nav className="student-pcac-spotlight__actions" aria-label="Acessos do concurso PC-AC 2026">
        <div className="student-pcac-spotlight__action-group" aria-label="Ferramentas de preparação">
          <span className="student-pcac-spotlight__action-label">ESTUDAR</span>
          <Link to="/dashboard/pc-acre-edital" data-tone="gold">
            <ListChecks aria-hidden="true" />
            <span>Checklist do edital</span>
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link to="/dashboard/pc-acre-edital" hash="pcac-cronograma" data-tone="green">
            <CalendarDays aria-hidden="true" />
            <span>Cronograma pessoal</span>
          </Link>
          <Link to="/dashboard/inteligencia-idecan" data-tone="blue">
            <ScanSearch aria-hidden="true" />
            <span>Inteligência IDECAN</span>
          </Link>
        </div>
        <div className="student-pcac-spotlight__action-group student-pcac-spotlight__action-group--documents" aria-label="Documentos de consulta">
          <span className="student-pcac-spotlight__action-label">CONSULTAR</span>
          <Link to="/dashboard/pc-acre-edital" search={{ view: "digital" }} data-tone="teal">
            <BookOpen aria-hidden="true" />
            <span>Ler conteúdo programático</span>
          </Link>
          <a
            href="/media/editais/edital-pcac-001-2026-norte-concursos-v2.pdf"
            target="_blank"
            rel="noreferrer"
            data-tone="rose"
          >
            <FileText aria-hidden="true" />
            <span>Guia explicativo (PDF)</span>
          </a>
        </div>
      </nav>
    </article>
  );
}
