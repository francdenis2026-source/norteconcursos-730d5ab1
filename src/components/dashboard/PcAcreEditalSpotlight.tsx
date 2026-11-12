import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Download, ListChecks, ScanSearch } from "lucide-react";

export function PcAcreEditalSpotlight() {
  return (
    <article className="student-pcac-spotlight no-print" aria-labelledby="student-pcac-spotlight-title">
      <img
        className="student-pcac-spotlight__cover"
        src="/media/editais/edital-pcac-001-2026-capa.jpg"
        alt=""
        width={180}
        height={254}
        loading="lazy"
        decoding="async"
      />
      <div className="student-pcac-spotlight__copy">
        <h3 id="student-pcac-spotlight-title">PC-AC 2026 · Edital verticalizado</h3>
        <p>139 vagas em 6 cargos · IDECAN · prova em 24/01/2027. Acompanhe o que já estudou.</p>
      </div>
      {/* Bandeira do Acre, conforme a referência visual do Wikimedia Commons. */}
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
      <nav className="student-pcac-spotlight__actions" aria-label="Ações do edital PC-AC 2026">
        <Link to="/dashboard/pc-acre-edital" data-tone="gold">
          <ListChecks aria-hidden="true" />
          <span>Abrir edital</span>
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link to="/dashboard/pc-acre-edital" hash="pcac-cronograma" data-tone="green">
          <CalendarDays aria-hidden="true" />
          <span>Cronograma de estudos</span>
        </Link>
        <Link to="/dashboard/inteligencia-idecan" data-tone="blue">
          <ScanSearch aria-hidden="true" />
          <span>Radar IDECAN</span>
        </Link>
        <a
          href="/media/editais/edital-pcac-001-2026-norte-concursos-v2.pdf"
          target="_blank"
          rel="noreferrer"
          data-tone="rose"
        >
          <Download aria-hidden="true" />
          <span>PDF do edital</span>
        </a>
      </nav>
    </article>
  );
}
