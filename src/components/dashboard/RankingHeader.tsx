import { ShieldCheck } from "lucide-react";
import { TrophyEmblem } from "@/components/dashboard/RankEmblems";

export function RankingHeader({ participants }: { participants?: number | undefined }) {
  return (
    <header className="rk-hero" aria-labelledby="ranking-page-title">
      <div className="rk-hero__trophy">
        <TrophyEmblem size={84} />
      </div>
      <div className="rk-hero__copy">
        <p className="rk-hero__kicker">Arena Norte · Desempenho</p>
        <h1 id="ranking-page-title">
          Ranking <span>geral</span>
        </h1>
        <p className="rk-hero__desc">
          Compare seu desempenho, suba de nível e acompanhe sua posição entre os candidatos.
        </p>
      </div>
      <ul className="rk-hero__facts">
        {participants ? (
          <li>
            <strong>{participants.toLocaleString("pt-BR")}</strong> candidatos
          </li>
        ) : null}
        <li>
          <ShieldCheck aria-hidden="true" /> Sobrenomes protegidos · admins fora
        </li>
      </ul>
    </header>
  );
}
