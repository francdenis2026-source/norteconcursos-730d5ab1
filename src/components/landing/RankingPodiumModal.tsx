import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, Target, Timer, Star, X } from "lucide-react";
import { MedalEmblem } from "@/components/dashboard/RankEmblems";
import { useAuthStatus } from "@/components/auth/AuthStatusProvider";
import type { Strength } from "@/components/ranking/StrengthBars";
import "@/styles/ranking-podium-modal.css";

export type PodiumCandidate = {
  rank_position: number;
  display_name: string;
  points: number;
  accuracy: number;
  questions: number;
  simulators: number;
  stars: number;
};

const number = new Intl.NumberFormat("pt-BR");
const tone = (p: number) => (p >= 80 ? "hi" : p >= 60 ? "mid" : "lo");

/** Detalhes de um dos 3 primeiros do ranking, aberto pelo cartão do pódio (público, sem login). */
export function RankingPodiumModal({
  candidate,
  strengths,
  leaderPoints,
  onClose,
}: {
  candidate: PodiumCandidate | null;
  strengths: Strength[];
  leaderPoints: number;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { isAuthenticated } = useAuthStatus();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (candidate && !d.open) d.showModal();
    if (!candidate && d.open) d.close();
  }, [candidate]);

  const c = candidate;
  const pos = c?.rank_position ?? 1;
  const tier = pos === 1 ? "gold" : pos === 2 ? "silver" : "bronze";
  const name = c?.display_name.trim() || "Candidato";
  const gap = c && pos > 1 && leaderPoints > c.points ? leaderPoints - c.points : 0;

  return (
    <dialog
      ref={ref}
      className="rkm"
      data-tier={tier}
      aria-labelledby="rkm-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {c && (
        <div className="rkm__box">
          <button type="button" className="rkm__close" onClick={onClose} aria-label="Fechar">
            <X aria-hidden="true" />
          </button>
          <header className="rkm__head">
            <span className="rkm__medal">
              <MedalEmblem tier={tier} label={pos} size={64} />
            </span>
            <div className="rkm__who">
              <span className="rkm__place">{pos}º lugar no ranking</span>
              <h2 id="rkm-title">{name}</h2>
              <span className="rkm__stars" aria-label={`Nível: ${c.stars} de 5 estrelas`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} aria-hidden="true" data-on={i <= c.stars || undefined} />
                ))}
              </span>
            </div>
            <div className="rkm__pts">
              <b>{number.format(c.points)}</b>
              <small>pontos</small>
            </div>
          </header>

          <dl className="rkm__stats">
            <div>
              <dt>
                <BrainCircuit aria-hidden="true" /> Questões
              </dt>
              <dd>{number.format(c.questions)}</dd>
            </div>
            <div>
              <dt>
                <Target aria-hidden="true" /> Acerto
              </dt>
              <dd>{c.accuracy}%</dd>
            </div>
            <div>
              <dt>
                <Timer aria-hidden="true" /> Simulados
              </dt>
              <dd>{number.format(c.simulators)}</dd>
            </div>
          </dl>
          {gap > 0 && (
            <p className="rkm__gap">
              A <b>{number.format(gap)} pontos</b> do 1º lugar.
            </p>
          )}

          <section className="rkm__strong" aria-labelledby="rkm-strong">
            <h3 id="rkm-strong">Pontos fortes</h3>
            {strengths.length ? (
              <ul>
                {strengths.map((s) => (
                  <li key={s.s} data-tone={tone(s.pct)}>
                    <span className="rkm__sname">{s.s}</span>
                    <span className="rkm__bar" aria-hidden="true">
                      <i style={{ width: `${s.pct}%` }} />
                    </span>
                    <b>{s.pct}%</b>
                    <small>{s.c !== undefined ? `${s.c} de ${s.n} questões` : `${s.n} questões`}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rkm__empty">Ainda sem disciplinas com respostas suficientes.</p>
            )}
          </section>

          <footer className="rkm__foot">
            <p>Pontos de questões respondidas pela primeira vez, simulados e constância nos estudos.</p>
            {isAuthenticated ? (
              <Link
                to="/dashboard/ranking"
                search={{ section: "general", period: "all", page: 1, size: 20, q: "" }}
                className="rkm__cta"
              >
                Ver ranking completo <ArrowRight aria-hidden="true" />
              </Link>
            ) : (
              <Link to="/auth" search={{ mode: "register" }} className="rkm__cta">
                Criar conta grátis <ArrowRight aria-hidden="true" />
              </Link>
            )}
          </footer>
        </div>
      )}
    </dialog>
  );
}
