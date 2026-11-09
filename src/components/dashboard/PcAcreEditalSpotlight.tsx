import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, CalendarClock, CheckSquare, Download, ScanSearch } from "lucide-react";

/** Destaque do edital verticalizado da PC-AC logo no topo da área do aluno, para acesso
 * imediato — reaproveita o padrão visual do spotlight de prova (ver PcprExamSpotlight). Os
 * botões extras levam direto ao raio-X da banca (IDECAN) e ao cronograma de estudos, ambos
 * dentro da própria área do edital verticalizado. */
export function PcAcreEditalSpotlight() {
  return (
    <section
      className="pcpr-spot pcpr-spot--notice pcpr-spot--book pcpr-spot--pcac no-print"
      aria-label="Edital verticalizado da Polícia Civil do Acre"
    >
      <div className="pcpr-spot__art-frame">
        <img
          className="pcpr-spot__art"
          src="/media/editais/edital-pcac-001-2026-capa.jpg"
          alt="Capa do Edital PC-AC 001/2026"
          width={180}
          height={254}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="pcpr-spot__summary">
        <div>
          <h2 className="flex items-center gap-2"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-300/60 bg-amber-400/15 text-amber-300" aria-hidden="true"><BookOpenCheck className="h-4 w-4" /></span><span>PC-AC 2026 · Edital verticalizado</span></h2>
          <p>139 vagas, 6 cargos · Marque o que já estudou e exporte em PDF.</p>
        </div>
        <div className="pcpr-spot__actions">
          <Link to="/dashboard/inteligencia-idecan" className="pcpr-spot__cta pcpr-spot__cta--ghost">
            <ScanSearch aria-hidden="true" />
            Raio-X da banca
          </Link>
          <Link
            to="/dashboard/pc-acre-edital"
            hash="pcac-cronograma"
            className="pcpr-spot__cta pcpr-spot__cta--ghost"
          >
            <CalendarClock aria-hidden="true" />
            Cronograma de estudos
          </Link>
          <Link to="/dashboard/pc-acre-edital" className="pcpr-spot__cta">
            <CheckSquare aria-hidden="true" />
            Abrir agora <ArrowRight aria-hidden="true" />
          </Link>
          <a href="/media/editais/edital-pcac-001-2026-norte-concursos-v2.pdf" target="_blank" rel="noreferrer" className="pcpr-spot__cta pcpr-spot__cta--ghost">
            <Download aria-hidden="true" />
            PDF do edital
          </a>
          <Link to="/dashboard/pc-acre-edital" search={{ view: "digital" }} className="pcpr-spot__cta pcpr-spot__cta--ghost">
            <BookOpenCheck aria-hidden="true" />
            Edital digital
          </Link>
        </div>
      </div>
    </section>
  );
}
