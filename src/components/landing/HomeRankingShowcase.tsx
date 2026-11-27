import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { MedalEmblem, TrophyEmblem } from "@/components/dashboard/RankEmblems";
import { supabase } from "@/integrations/supabase/client";
import "@/styles/ranking-arena-v2.css";
import "./HomeRankingArena.css";

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

const Stars = ({ n }: { n: number }) => (
  <span className="hra-stars" aria-label={`${n} de 5 estrelas`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} aria-hidden="true" data-on={i <= n} />
    ))}
  </span>
);

import { StrengthBars, parseStrengths, type Strength } from "@/components/ranking/StrengthBars";
import { RankingPodiumModal } from "@/components/landing/RankingPodiumModal";

export function HomeRankingShowcase({ anchorId }: { anchorId?: string }) {
  const [candidates, setCandidates] = useState<Candidate[] | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [updated, setUpdated] = useState<Date | null>(null);
  const [strengths, setStrengths] = useState<Record<number, Strength[]>>({});
  const [open, setOpen] = useState<Candidate | null>(null);
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
      // Pontos fortes: opcional; se a função ainda não existir no banco, os cartões ficam como antes.
      void supabase.rpc("get_public_ranking_strengths" as never).then(({ data: st, error: stErr }) => {
        if (!alive || stErr || !Array.isArray(st)) return;
        const map: Record<number, Strength[]> = {};
        for (const row of st as { rank_position: number; strengths: unknown }[]) {
          if (Number.isInteger(row.rank_position) && !map[row.rank_position]) map[row.rank_position] = parseStrengths(row.strengths);
        }
        setStrengths(map);
      });
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

  const emptyMessage = unavailable
    ? "O ranking está temporariamente indisponível."
    : candidates
      ? `Os candidatos aparecerão aqui quando alcançarem pelo menos ${MIN_SHOWCASE_POINTS} pontos.`
      : "Consultando a classificação da plataforma…";
  const titleId = `${anchorId ?? "home-ranking"}-title`;
  const list = candidates ?? [];
  const podium = list.filter((c) => c.rank_position <= 3).slice(0, 3);
  const showPodium = podium.length === 3;
  const rest = showPodium ? list.filter((c) => !podium.includes(c)) : list;
  const leader = list[0]?.points ?? 0;
  const rankingSearch = { section: "general", period: "all", page: 1, size: 20, q: "" } as const;
  return (
    <section id={anchorId} className="home-ranking-arena" aria-labelledby={titleId}>
      <div className="hra-wrap">
        <div className="ranking-workspace rka hra">
          <header className="rka-hero">
            <img className="rka-hero__bg" src="/media/hero/careers-team.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <div className="rka-hero__copy">
              <span className="rka-hero__trophy" aria-hidden="true">
                <TrophyEmblem size={56} />
              </span>
              <p className="rka-kicker">Arena Norte · Destaque da comunidade</p>
              <h2 id={titleId} className="hra-title">
                Ranking <span>geral</span>
              </h2>
              <p className="rka-hero__desc">Os primeiros colocados da plataforma. O próximo nome aqui pode ser o seu.</p>
              <p className="rka-chip hra-live">
                <i aria-hidden="true" /> {updated && !unavailable ? "Atualizado periodicamente" : "Classificação da plataforma"}
              </p>
            </div>
            <div className="hra-hero-cta">
              <p><ShieldCheck aria-hidden="true" /> Pontos e acertos reais. Empates legítimos compartilham a posição.</p>
              <Link to="/dashboard/ranking" search={rankingSearch} className="hra-cta">
                Ver ranking completo <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </header>

          <section className="rka-board" aria-label="Candidatos em destaque">
            {list.length > 0 ? (
              <>
                {showPodium && (
                  <ol className="rka-podium" aria-label="Pódio">
                    {podium.map((c) => {
                      const pos = c.rank_position;
                      const name = c.display_name.trim() || "Candidato";
                      return (
                        <li key={`${pos}-${name}`} data-place={pos}>
                          <button
                            type="button"
                            className="rka-podium__card"
                            aria-haspopup="dialog"
                            aria-label={`${pos}º lugar: ${name}, ${c.points} pontos. Ver detalhes`}
                            onClick={() => setOpen(c)}
                          >
                            <span className="rka-podium__glow" aria-hidden="true" />
                            <span className="rka-podium__medal">
                              <MedalEmblem tier={pos === 1 ? "gold" : pos === 2 ? "silver" : "bronze"} label={pos} size={pos === 1 ? 76 : 60} />
                            </span>
                            <span className="rka-podium__name">{name}</span>
                            <Stars n={c.stars} />
                            <span className="rka-podium__points">
                              {number.format(c.points)} <small>pts</small>
                            </span>
                            <span className="rka-podium__stats">
                              {number.format(c.questions)} questões · {c.accuracy}%
                            </span>
                            <StrengthBars items={strengths[pos] ?? []} compact />
                            <span className="rka-podium__step" aria-hidden="true">{pos}º</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                )}
                {rest.length > 0 && (
                  <ol className="rka-list" aria-label="Classificação">
                    {rest.map((c, index) => {
                      const name = c.display_name.trim() || "Candidato";
                      const initial = name.charAt(0).toLocaleUpperCase("pt-BR");
                      const best = strengths[c.rank_position]?.[0];
                      return (
                        <li key={`${c.rank_position}-${name}`} style={{ "--i": index } as CSSProperties}>
                          <Link to="/dashboard/ranking" search={rankingSearch} className="rka-row" aria-label={`${c.rank_position}º lugar: ${name}`}>
                            <span className="hra-pos">{c.rank_position}º</span>
                            <span className="rka-avatar" aria-hidden="true" data-hue={initial.charCodeAt(0) % 6}>{initial}</span>
                            <span className="rka-row__who">
                              <span className="rka-row__name">{name}</span>
                              <span className="rka-row__meta">
                                <Stars n={c.stars} />
                                <span className="rka-row__stats">
                                  {number.format(c.questions)} questões · {c.accuracy}% · {c.simulators} simulados
                                </span>
                              </span>
                            </span>
                            {best && (
                              <span className="rka-row__best" title={`Ponto forte: ${best.s}`}>
                                {best.s} · <b>{best.pct}%</b>
                              </span>
                            )}
                            <span className="rka-row__score">
                              <b>{number.format(c.points)}<small> pts</small></b>
                              <span className="rka-bar" aria-hidden="true">
                                <i style={{ width: `${leader > 0 ? Math.max(4, (c.points / leader) * 100) : 0}%` }} />
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </>
            ) : (
              <p className="rka-empty" role="status">{emptyMessage}</p>
            )}
            <details className="hra-details">
              <summary>Como funciona a classificação?</summary>
              <p>Esta vitrine pública exibe somente candidatos com pelo menos {MIN_SHOWCASE_POINTS} pontos válidos; o ranking completo mantém suas regras próprias. O ranking Geral considera os pontos registrados na plataforma. Quando há empate em pontos, utiliza taxa de acertos, número de acertos, questões válidas e pontos de simulados. Empates completos compartilham a mesma posição. Repetições de questões não somam novos pontos. Nomes são exibidos de forma abreviada; não são divulgados dados pessoais.</p>
            </details>
          </section>
        </div>
      </div>
      <RankingPodiumModal
        candidate={open}
        strengths={open ? (strengths[open.rank_position] ?? []) : []}
        leaderPoints={leader}
        onClose={() => setOpen(null)}
      />
    </section>
  );
}
