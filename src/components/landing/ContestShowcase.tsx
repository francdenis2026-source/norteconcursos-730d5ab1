import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { PCPI_EXAM } from "@/lib/pcpiExam";
import { PCPR_EXAM } from "@/lib/pcprExam";
import { PCSC_EXAM } from "@/lib/pcscExam";

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

/** Provas recentes já disponíveis para treinar. */
export function ContestShowcase({ mobile = false }: { mobile?: boolean } = {}) {
  const { isAuthenticated } = useAuthStatus();
  return (
    <div className="sx sx-contests">
      <header className="sx-head sx-head--plain">
        <div>
          <span className="sx-eyebrow">Provas recentes</span>
          <h2>Treine com provas de 2026.</h2>
        </div>
      </header>
      {mobile && (
        <p className="sx-carousel-hint">Deslize para ver outros concursos <ArrowUpRight aria-hidden="true" /></p>
      )}
      <ul className={mobile ? "sx-exams sx-exams--mobile-carousel" : "sx-exams"}>
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
