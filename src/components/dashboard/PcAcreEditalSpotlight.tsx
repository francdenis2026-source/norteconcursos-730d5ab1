import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, CheckSquare, ScanSearch } from "lucide-react";

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
      <img
        className="pcpr-spot__art"
        src="/media/editais/edital-pcac-001-2026-capa.jpg"
        alt="Capa do Edital PC-AC 001/2026"
        width={180}
        height={254}
        loading="lazy"
        decoding="async"
      />
      <div className="pcpr-spot__summary">
        <div>
          <h2>PC-AC 2026 · Edital verticalizado</h2>
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
            Cronograma
          </Link>
          <Link to="/dashboard/pc-acre-edital" className="pcpr-spot__cta">
            <CheckSquare aria-hidden="true" />
            Abrir agora <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
