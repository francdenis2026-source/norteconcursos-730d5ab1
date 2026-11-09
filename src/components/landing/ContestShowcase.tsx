import "./ContestShowcase.css";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, CalendarDays, Users, BriefcaseBusiness, Bell } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { PCSC_TRAINER_SEARCH } from "@/lib/pcscExam";

function Ficha({ items }: { items: [string, string][] }) {
  return (
    <dl className="contest-ficha">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
/** Public references are dated; signed-in counts continue to use the eligible catalogue. */
export function ContestShowcase({ mobile = false }: { mobile?: boolean }) {
  const suffix = mobile ? '-mobile' : '';
  const { isAuthenticated } = useAuthStatus();
  return (
    <div className="contest-showcase">
      <article className="contest-spotlight hr-contest-card contest-spotlight--artwork" aria-label="Destaque do concurso da Polícia Civil do Estado do Acre">
        <img
          className="contest-spotlight-artwork__image"
          src="/media/hero/pc-ac-homepage.webp"
          alt="Polícia Civil do Estado do Acre — edital 001/2026: 139 vagas, 6 cargos, prova objetiva em 24 de janeiro de 2027 e simulado complementar com 92 questões da PC-SC."
          width={1024}
          height={323}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {isAuthenticated ? (
          <Link
            to="/dashboard/pc-acre-edital"
            className="contest-spotlight-artwork__action contest-spotlight-artwork__action--edit"
            aria-label="Abrir edital PC-AC"
            title="Abrir edital PC-AC"
          />
        ) : (
          <Link
            to="/auth"
            search={{ mode: "register" }}
            className="contest-spotlight-artwork__action contest-spotlight-artwork__action--edit"
            aria-label="Abrir edital PC-AC"
            title="Abrir edital PC-AC"
          />
        )}
        {isAuthenticated ? (
          <Link
            to="/dashboard/question-trainer"
            search={PCSC_TRAINER_SEARCH}
            className="contest-spotlight-artwork__action contest-spotlight-artwork__action--train"
            aria-label="Realizar simulado PC-SC"
            title="Realizar simulado PC-SC"
          />
        ) : (
          <Link
            to="/auth"
            search={{ mode: "register" }}
            className="contest-spotlight-artwork__action contest-spotlight-artwork__action--train"
            aria-label="Realizar simulado PC-SC"
            title="Realizar simulado PC-SC"
          />
        )}
      </article>

      <section className="contest-catalog__feature-band" aria-labelledby={"contest-catalog-title" + suffix}>
        <div className="contest-catalog__feature-intro">
          <span className="contest-catalog__feature-eyebrow"><Sparkles size={14} aria-hidden="true" /> OPORTUNIDADES EM DESTAQUE</span>
          <h3 id={"contest-catalog-title" + suffix}>Outros concursos <em>para acompanhar</em></h3>
          <p>Fique por dentro das oportunidades na área policial. Editais, datas e vagas — tudo em um só lugar.</p>
          <div className="contest-catalog__feature-emblem" aria-hidden="true">
            <ShieldCheck size={22} />
            <span>NORTE CONCURSOS</span>
          </div>
          <div className="contest-catalog__feature-points">
            <span><Bell aria-hidden="true" /> Editais e novidades</span>
            <span><CalendarDays aria-hidden="true" /> Datas e prazos</span>
            <span><Users aria-hidden="true" /> Vagas e remunerações</span>
          </div>
        </div>
        <div className="contest-catalog__feature-cards">
          <div className="contest-upcoming-grid">

            <article className="contest-upcoming-card">
              <div className="contest-upcoming-card__art">
                <img src="/media/hero/pcsc-viatura.webp" alt="Polícia Civil de Santa Catarina" width={1672} height={950} loading="lazy" decoding="async" />
                <span className="contest-upcoming-card__status contest-upcoming-card__status--previsto">
                  <CalendarDays size={10} aria-hidden="true" /> Edital previsto
                </span>
              </div>
              <div className="contest-upcoming-card__content">
                <p className="contest-upcoming-card__sigla"><strong>PC-SC</strong> / POLÍCIA CIVIL DE SANTA CATARINA</p>
                <Ficha items={[
                  ["Cargo", "Agente de Polícia"],
                  ["Banca", "FCC"],
                  ["Prova Prevista", "13/04/2025"],
                  ["Vagas", "400"],
                  ["Remuneração", "R$ 6.935,09"],
                ]} />
                {isAuthenticated ? (
                  <Link to="/dashboard" className="contest-action contest-action--gold">
                    Acompanhar concurso <ArrowRight aria-hidden="true" />
                  </Link>
                ) : (
                  <Link to="/auth" search={{ mode: "register" }} className="contest-action contest-action--gold">
                    Acompanhar concurso <ArrowRight aria-hidden="true" />
                  </Link>
                )}
              </div>
            </article>

            <article className="contest-upcoming-card">
              <div className="contest-upcoming-card__art">
                <img src="/media/hero/auth-seguranca-full.webp" alt="Polícia Federal" width={1920} height={1280} loading="lazy" decoding="async" />
                <span className="contest-upcoming-card__status contest-upcoming-card__status--em-breve">
                  <Bell size={10} aria-hidden="true" /> Edital em breve
                </span>
              </div>
              <div className="contest-upcoming-card__content">
                <p className="contest-upcoming-card__sigla"><strong>PF</strong> / POLÍCIA FEDERAL</p>
                <Ficha items={[
                  ["Cargo", "Agente de Polícia Federal"],
                  ["Banca", "Cebraspe"],
                  ["Prova Prevista", "29/06/2025"],
                  ["Vagas", "1.800"],
                  ["Remuneração", "R$ 13.900,54"],
                ]} />
                {isAuthenticated ? (
                  <Link to="/dashboard" className="contest-action contest-action--gold">
                    Acompanhar concurso <ArrowRight aria-hidden="true" />
                  </Link>
                ) : (
                  <Link to="/auth" search={{ mode: "register" }} className="contest-action contest-action--gold">
                    Acompanhar concurso <ArrowRight aria-hidden="true" />
                  </Link>
                )}
              </div>
            </article>

            <article className="contest-upcoming-card">
              <div className="contest-upcoming-card__art">
                <img src="/media/hero/meu-concurso-seguranca-publica.webp" alt="Polícia Militar de São Paulo" width={1920} height={1280} loading="lazy" decoding="async" />
                <span className="contest-upcoming-card__status contest-upcoming-card__status--aberto">
                  <ShieldCheck size={10} aria-hidden="true" /> Edital aberto
                </span>
              </div>
              <div className="contest-upcoming-card__content">
                <p className="contest-upcoming-card__sigla"><strong>PM-SP</strong> / POLÍCIA MILITAR DE SÃO PAULO</p>
                <Ficha items={[
                  ["Cargo", "Soldado PM"],
                  ["Banca", "Vunesp"],
                  ["Prova", "09/03/2025"],
                  ["Vagas", "2.700"],
                  ["Remuneração", "R$ 4.852,21"],
                ]} />
                {isAuthenticated ? (
                  <Link to="/dashboard" className="contest-action contest-action--gold">
                    Acompanhar concurso <ArrowRight aria-hidden="true" />
                  </Link>
                ) : (
                  <Link to="/auth" search={{ mode: "register" }} className="contest-action contest-action--gold">
                    Acompanhar concurso <ArrowRight aria-hidden="true" />
                  </Link>
                )}
              </div>
            </article>

          </div>
        </div>
      </section>
      <p className="contest-independence">
        Iniciativa educacional independente, sem vínculo ou endosso das Polícias Civis, governos ou
        bancas. Artes ilustrativas. Consulte os documentos oficiais de cada concurso.
      </p>
    </div>
  );
}
