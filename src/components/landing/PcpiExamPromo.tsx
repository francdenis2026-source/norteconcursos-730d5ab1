import { Link } from "@tanstack/react-router";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useExamAvailability } from "@/hooks/useExamAvailability";
import { PCPI_EXAM, pcpiTrainerSearch } from "@/lib/pcpiExam";

const PUBLIC_CHECK = { checkedAt: "19/10/2026", counts: [80, 74] };
export function PcpiExamPromo() {
  const { isAuthenticated } = useAuthStatus();
  const { counts, checkedAt, loading } = useExamAvailability(PCPI_EXAM, PUBLIC_CHECK);
  return (
    <article
      id="prova-pcpi"
      className="home-opportunity home-opportunity--pcpi"
      aria-labelledby="pcpi-title"
    >
      <div className="home-opportunity__header">
        <div className="home-opportunity__image">
          <img
            src="/media/hero/pcpi-capa.webp"
            alt="PC-PI — Polícia Civil do Piauí, capa ilustrativa Norte Concursos"
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="home-opportunity__intro">
          <div className="home-opportunity__identity">
            <span className="home-eyebrow">Provas disponíveis · PC-PI 2026</span>
            <FileCheck2 className="home-exam-icon" aria-hidden="true" />
          </div>
          <h3 id="pcpi-title">Polícia Civil do Piauí</h3>
          <p>
            Provas FGV. Escolha o cargo e entre direto nas questões, com correção após cada
            resposta.
          </p>
        </div>
      </div>
      <div className="home-opportunity__body">
        <div className="home-pcpi-actions" aria-label="Resolver provas do Piauí por cargo">
          {PCPI_EXAM.roles.map((role, index) => (
            <div key={role}>
              <p className="text-sm">
                <strong>{role}</strong>
                <br />
                {counts
                  ? `${counts[index]} questões disponíveis`
                  : loading
                    ? "Conferindo disponibilidade…"
                    : "Disponibilidade não confirmada"}
              </p>
              {isAuthenticated ? (
                <Link
                  to="/dashboard/question-trainer"
                  search={pcpiTrainerSearch(role)}
                  className={`home-button ${index === 0 ? "home-button--primary" : "home-button--secondary"}`}
                >
                  Resolver {index === 0 ? "Delegado" : "Investigador"}
                  <ArrowRight aria-hidden="true" />
                </Link>
              ) : (
                <Link
                  to="/auth"
                  search={{ mode: "register" }}
                  className={`home-button ${index === 0 ? "home-button--primary" : "home-button--secondary"}`}
                >
                  Treinar {index === 0 ? "Delegado" : "Investigador"}
                  <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          ))}
        </div>
        <details className="home-exam-details">
          <summary>Sobre as questões disponíveis</summary>
          <p>
            {checkedAt
              ? `Conferência de ${checkedAt}. Verifique a quantidade atual ao iniciar o treino.`
              : "Contagem do acervo elegível carregado nesta sessão."}{" "}
            A quantidade disponível pode ser menor que a prova original. Questões arquivadas ou
            bloqueadas não entram; os cargos não são misturados. Os limites do seu plano continuam
            valendo.
          </p>
        </details>
        <div className="home-opportunity__bottom">
          <small>
            Campanha educacional independente, sem vínculo ou endosso da Polícia Civil do Piauí ou
            da FGV. Arte ilustrativa.
          </small>
        </div>
      </div>
    </article>
  );
}
