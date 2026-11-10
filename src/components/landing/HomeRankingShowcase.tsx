import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Gem, Medal, ShieldCheck, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import "./HomeRankingShowcase.css";

type Candidate = {
  rank_position: number;
  display_name: string;
  points: number;
  accuracy: number;
  questions: number;
  simulators: number;
  stars: number;
};
const number = new Intl.NumberFormat("pt-BR");
const REFRESH_MS = 30 * 60 * 1000;
const MIN_SHOWCASE_POINTS = 50;

export function HomeRankingShowcase({ anchorId }: { anchorId?: string }) {
  const [candidates, setCandidates] = useState<Candidate[] | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [updated, setUpdated] = useState<Date | null>(null);
  useEffect(() => {
    let alive = true;
    let lastLoadedAt = 0;
    async function reload() {
      const { data, error } = await supabase.rpc("get_public_ranking_showcase");
      if (!alive) return;
      if (error || !Array.isArray(data)) {
        setUnavailable(true);
        return;
      }
      const valid = (data as Candidate[]).filter(
        (r) => Number.isInteger(r.rank_position) && r.rank_position > 0 &&
          typeof r.display_name === "string" && r.display_name.trim().length > 0 &&
          Number.isInteger(r.points) && r.points >= MIN_SHOWCASE_POINTS &&
          Number.isInteger(r.accuracy) && r.accuracy >= 0 && r.accuracy <= 100 &&
          Number.isInteger(r.questions) && r.questions >= 0 &&
          Number.isInteger(r.simulators) && r.simulators >= 0 &&
          Number.isInteger(r.stars) && r.stars >= 0 && r.stars <= 5,
      ).slice(0, 4);
      setCandidates(valid);
      setUnavailable(false);
      const now = new Date();
      lastLoadedAt = now.getTime();
      setUpdated(now);
    }
    void reload();
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void reload();
    }, REFRESH_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible" && Date.now() - lastLoadedAt >= REFRESH_MS) void reload();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      alive = false;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const titleId = anchorId === "ranking-destaque-mobile" ? "home-ranking-title-mobile" : "home-ranking-title";
  const icon = (position: number) =>
    position === 1 ? <Gem aria-hidden="true" /> :
    position === 2 || position === 3 ? <Medal aria-hidden="true" /> : <Award aria-hidden="true" />;
  return (
    <section
      id={anchorId}
      className="home-ranking hr-section"
      data-mobile-showcase={anchorId === "ranking-destaque-mobile" ? "true" : undefined}
      aria-labelledby={titleId}
    >
      <div className="home-container">
        <div className="home-ranking__shell">
          <div className="home-ranking__heading">
            <div>
              <p className="home-ranking__eyebrow"><Trophy aria-hidden="true" /> DESTAQUE DA COMUNIDADE</p>
              <h2 id={titleId}>Quem está no <em>topo da preparação?</em></h2>
              <p>Acompanhe os quatro primeiros candidatos do ranking Geral do Norte Concurso.</p>
            </div>
            <span className="home-ranking__status">
              <span className="home-ranking__status-dot" />
              {updated && !unavailable ? "Atualizado periodicamente" : "Classificação da plataforma"}
            </span>
          </div>
          {candidates && candidates.length > 0 ? (
            <ol className="home-ranking__grid" aria-label="Candidatos em destaque">
              {candidates.map((candidate) => {
                const displayName = candidate.display_name.trim() || "Candidato";
                return (
                  <li
                    className="home-ranking__card hr-ranking-card"
                    data-medal={candidate.rank_position <= 4 ? candidate.rank_position : "other"}
                    key={`${candidate.rank_position}-${displayName}`}
                  >
                    <span className="home-ranking__position">
                      {icon(candidate.rank_position)} {candidate.rank_position}º
                    </span>
                    <div className="home-ranking__identity">
                      <span className="home-ranking__avatar" aria-hidden="true">
                        {displayName.charAt(0).toLocaleUpperCase("pt-BR")}
                      </span>
                      <strong className="home-ranking__name">{displayName}</strong>
                      <span className="home-ranking__stars" aria-label={`Nível: ${candidate.stars} estrelas`}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} aria-hidden="true">
                            {i < candidate.stars ? "★" : "☆"}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="home-ranking__points">
                      <strong>{number.format(candidate.points)}</strong>
                      <span>pontos</span>
                    </div>
                    <dl className="home-ranking__stats">
                      <div><dt>Acertos</dt><dd>{candidate.accuracy}%</dd></div>
                      <div><dt>Questões</dt><dd>{number.format(candidate.questions)}</dd></div>
                      <div><dt>Simulados</dt><dd>{candidate.simulators}</dd></div>
                    </dl>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="home-ranking__empty" role="status">
              {unavailable ? "O ranking está temporariamente indisponível." : candidates ? `Os candidatos aparecerão aqui quando alcançarem pelo menos ${MIN_SHOWCASE_POINTS} pontos.` : "Consultando a classificação da plataforma…"}
            </div>
          )}
          <div className="home-ranking__bottom">
            <div><ShieldCheck aria-hidden="true"/><span><strong>Classificação transparente</strong> Pontos, acertos e desempenho real. Empates legítimos compartilham a posição.</span></div>
            <Link to="/dashboard/ranking" search={{ section: "general", period: "all", page: 1, size: 20, q: "" }} className="home-ranking__cta">
              Ver ranking completo <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <details className="home-ranking__details">
            <summary>Como funciona a classificação?</summary>
            <p>Esta vitrine pública exibe somente candidatos com pelo menos 50 pontos válidos; o ranking completo mantém suas regras próprias. O ranking Geral considera os pontos registrados na plataforma. Quando há empate em pontos, utiliza taxa de acertos, número de acertos, questões válidas e pontos de simulados. Empates completos compartilham a mesma posição. Repetições de questões não somam novos pontos. Nomes são exibidos de forma abreviada; não são divulgados dados pessoais.</p>
          </details>
        </div>
      </div>
    </section>
  );
}
