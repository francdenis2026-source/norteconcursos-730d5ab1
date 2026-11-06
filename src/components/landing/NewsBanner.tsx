import { useEffect, useState } from "react";
import { ArrowUpRight, Banknote, CalendarClock, ShieldCheck, Users, X } from "lucide-react";

const DISMISS_KEY = "nc-news-banner-dismissed:pcac-edital-001-2026-11";

export function NewsBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === "true");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const close = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      /* localStorage indisponível (modo privado, etc.) — fecha só nesta sessão */
    }
  };

  return (
    <aside className="news-banner news-banner--spotlight" role="complementary" aria-label="Notícia em destaque">
      <div className="home-container news-banner__inner">
        <figure className="news-banner__media">
          <img
            src="/media/news/pcac-edital-publicado-banner.jpg"
            alt="Arte oficial do Edital nº 001 SEAD/PCAC com o brasão da Polícia Civil do Acre"
            width={960}
            height={600}
            loading="lazy"
            decoding="async"
          />
          <span className="news-banner__ribbon" aria-hidden="true">Novo</span>
          <figcaption>Edital nº 001 SEAD/PCAC · Diário Oficial do Acre nº 14.388</figcaption>
        </figure>
        <div className="news-banner__text">
          <span className="news-banner__tag"><ShieldCheck aria-hidden="true" /> Edital publicado · Polícia Civil do Acre</span>
          <strong className="news-banner__headline">
            Saiu o edital da PC-AC: <em>139 vagas</em> em 6 cargos
          </strong>
          <span className="news-banner__summary">
            Baixe o guia completo com cargos, provas, cronograma e checklist de estudo.
          </span>
          <ul className="news-banner__stats" aria-label="Resumo do edital">
            <li>
              <Users aria-hidden="true" />
              139 vagas · 6 cargos
            </li>
            <li>
              <Banknote aria-hidden="true" />
              R$ 6.342,07 a R$ 19.505,66
            </li>
            <li>
              <CalendarClock aria-hidden="true" />
              Inscrições até 14/12/2026
            </li>
          </ul>
        </div>
        <a
          className="news-banner__link news-banner__link--gold"
          href="/media/editais/edital-pcac-001-2026-norte-concursos.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Baixar o edital explicado
          <ArrowUpRight aria-hidden="true" />
        </a>
        <button
          type="button"
          className="news-banner__close"
          onClick={close}
          aria-label="Fechar notícia"
        >
          <X aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
