import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";

const PCAC_EDITAL = "/media/editais/edital-pcac-001-2026-norte-concursos-v2.pdf";
const PCAC_VAGAS = pcAcVerticalCargos.reduce((total, cargo) => total + cargo.vagas, 0);

/** Destaque da homepage: edital aberto da Polícia Civil do Acre, com dados do próprio edital. */
export function PcacBanner({ mobile = false }: { mobile?: boolean }) {
  const suffix = mobile ? "-mobile" : "";
  const { isAuthenticated } = useAuthStatus();
  return (
    <div className="sx sx-banner-wrap">
      <article className="sx-banner" aria-labelledby={"sx-pcac-title" + suffix}>
        <img
          className="sx-banner__art"
          src="/media/photos/pcac-pericia.webp"
          alt=""
          width={1800}
          height={1200}
          loading="lazy"
          decoding="async"
        />
        <img
          className="sx-banner__crest"
          src="/media/brasao-pcac-oficial.jpg"
          alt="Brasão da Polícia Civil do Acre"
          width={347}
          height={418}
          loading="lazy"
          decoding="async"
        />
        <div className="sx-banner__copy">
          <span className="sx-banner__tag">
            <i aria-hidden="true" /> Edital aberto
          </span>
          <h2 id={"sx-pcac-title" + suffix}>Concurso da Polícia Civil do Acre</h2>
          <p>Edital nº 001 SEAD/PCAC · Banca IDECAN · publicado em 05/11/2026</p>
          <dl className="sx-banner__facts">
            <div>
              <dt>Vagas</dt>
              <dd>{PCAC_VAGAS}</dd>
            </div>
            <div>
              <dt>Cargos</dt>
              <dd>{pcAcVerticalCargos.length}</dd>
            </div>
            <div>
              <dt>Salário inicial até</dt>
              <dd>{pcAcVerticalCargos[0]?.salario}</dd>
            </div>
          </dl>
          <div className="sx-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="sx-btn sx-btn--primary">
                Estudar para a PC-AC <ArrowRight aria-hidden="true" />
              </Link>
            ) : (
              <Link to="/auth" search={{ mode: "register" }} className="sx-btn sx-btn--primary">
                Estudar para a PC-AC <ArrowRight aria-hidden="true" />
              </Link>
            )}
            <a
              href={PCAC_EDITAL}
              target="_blank"
              rel="noopener noreferrer"
              className="sx-btn sx-btn--onimage"
            >
              <FileText aria-hidden="true" /> Ver edital
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
