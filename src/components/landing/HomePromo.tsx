import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, CalendarCheck, Sparkles, Target, Trophy } from "lucide-react";
import { GUEST_DAILY_LIMIT } from "@/lib/guestQuota";

const PERKS = [
  { icon: Target, title: "Questões por banca", text: "Treine no estilo de quem vai aplicar a sua prova." },
  { icon: CalendarCheck, title: "Plano de estudos", text: "Cronograma pelo edital, com revisões no ritmo certo." },
  { icon: Trophy, title: "Ranking e medalhas", text: "Compare o seu desempenho com a comunidade." },
];

/** Faixa de divulgação da plataforma na home do desktop. */
export function HomePromo() {
  return (
    <section className="hp-promo" aria-labelledby="hp-promo-title">
      <div className="hp-promo__inner">
        <img
          className="hp-promo__art"
          src="/media/hero/careers-team.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <div className="hp-promo__copy">
          <span className="hp-promo__tag">
            <Sparkles aria-hidden="true" /> Comece hoje, sem cartão
          </span>
          <h2 id="hp-promo-title">
            Sua farda começa <em>no estudo de hoje.</em>
          </h2>
          <p>
            Questões oficiais, simulados cronometrados e desempenho por disciplina em um só lugar.
            Experimente agora com {GUEST_DAILY_LIMIT} questões grátis no Desafio diário.
          </p>
          <div className="hp-promo__actions">
            <Link to="/auth" search={{ mode: "register" }} className="hp-promo__primary">
              Criar conta grátis <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/desafio-diario" className="hp-promo__ghost">
              <BookOpenCheck aria-hidden="true" /> Fazer o Desafio diário
            </Link>
          </div>
        </div>
        <ul className="hp-promo__cards" aria-label="O que você encontra">
          {PERKS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="hp-promo__card">
              <span>
                <Icon aria-hidden="true" />
              </span>
              <strong>{title}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
