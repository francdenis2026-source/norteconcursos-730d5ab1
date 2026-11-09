import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import { PCPI_EXAM } from "@/lib/pcpiExam";
import { PCPR_EXAM } from "@/lib/pcprExam";
import { PCSC_EXAM } from "@/lib/pcscExam";

const PCAC_EDITAL = "/media/editais/edital-pcac-001-2026-norte-concursos-v2.pdf";
const PCAC_VAGAS = pcAcVerticalCargos.reduce((total, cargo) => total + cargo.vagas, 0);

/** Provas já disponíveis no banco de questões; cada capa pertence ao próprio concurso. */
const EXAMS = [
  {
    sigla: "PC-SC",
    name: "Polícia Civil de Santa Catarina",
    image: "/media/hero/pcsc-capa.webp",
    meta: `${PCSC_EXAM.board} · ${PCSC_EXAM.year}`,
    roles: PCSC_EXAM.roles.join(" · "),
  },
  {
    sigla: "PC-PR",
    name: "Polícia Civil do Paraná",
    image: "/media/hero/pcpr-capa.webp",
    meta: `${PCPR_EXAM.board} · aplicada em ${PCPR_EXAM.appliedOn}`,
    roles: PCPR_EXAM.roles.join(" · "),
  },
  {
    sigla: "PC-PI",
    name: "Polícia Civil do Piauí",
    image: "/media/hero/pcpi-capa.webp",
    meta: `${PCPI_EXAM.board} · ${PCPI_EXAM.year}`,
    roles: PCPI_EXAM.roles.join(" · "),
  },
];

/** Concursos da homepage: banner do edital da PC-AC e provas recentes para treinar. */
export function ContestShowcase({ mobile = false }: { mobile?: boolean }) {
  const suffix = mobile ? "-mobile" : "";
  const { isAuthenticated } = useAuthStatus();
  return (
    <div className="sx sx-contests">
      <article className="sx-banner" aria-labelledby={"sx-pcac-title" + suffix}>
        <img
          className="sx-banner__art"
          src="/media/hero/landing-pcac.webp"
          alt=""
          width={1915}
          height={821}
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
            <i aria-hidden="true" /> Edital publicado · 05/11/2026
          </span>
          <h2 id={"sx-pcac-title" + suffix}>Polícia Civil do Acre</h2>
          <p>Edital nº 001 SEAD/PCAC · Banca IDECAN</p>
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

      <header className="sx-head sx-head--plain">
        <div>
          <span className="sx-eyebrow">Provas recentes</span>
          <h2>Treine com provas de 2026.</h2>
        </div>
      </header>
      <ul className="sx-exams">
        {EXAMS.map((exam) => (
          <li key={exam.sigla} className="sx-exam">
            <img
              src={exam.image}
              alt={`Capa ${exam.name}`}
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
            />
            <div className="sx-exam__body">
              <strong>
                {exam.sigla} <span>{exam.name}</span>
              </strong>
              <small>{exam.meta}</small>
              <p>{exam.roles}</p>
              {isAuthenticated ? (
                <Link to="/dashboard" className="sx-exam__link">
                  Treinar questões <ArrowUpRight aria-hidden="true" />
                </Link>
              ) : (
                <Link to="/auth" search={{ mode: "register" }} className="sx-exam__link">
                  Treinar questões <ArrowUpRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="sx-note">
        Iniciativa educacional independente, sem vínculo ou endosso das Polícias Civis, governos ou
        bancas. Artes ilustrativas. Consulte os documentos oficiais de cada concurso.
      </p>
    </div>
  );
}
