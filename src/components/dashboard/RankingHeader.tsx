import { Trophy } from "lucide-react";

export function RankingHeader() {
  return (
    <header className="ranking-glass-header workspace-banner" aria-labelledby="ranking-page-title">
      <p className="ranking-glass-header__kicker">
        <Trophy aria-hidden="true" /> Desempenho
      </p>
      <h1 id="ranking-page-title">Ranking <span>geral</span></h1>
      <p className="ranking-glass-header__description">
        Compare seu desempenho, encontre candidatos e acompanhe sua posição.
      </p>
      <p className="ranking-glass-header__privacy">
        Sobrenomes ficam protegidos e administradores não participam.
      </p>
    </header>
  );
}
