import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

const DISMISS_KEY = "nc-news-banner-dismissed:guarda-municipal-rb-2026-11";

export function NewsBanner() {
  const [dismissed, setDismissed] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === "true");
    } catch {
      setDismissed(false);
    }
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
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
    <aside className="news-banner" role="complementary" aria-label="Notícia em destaque">
      <div className="home-container news-banner__inner">
        <figure className="news-banner__media">
          {reducedMotion ? (
            <img
              src="/media/news/guarda-municipal-rb-viatura.webp"
              alt="Viatura oficial da Guarda Municipal de Rio Branco, identificada com o brasão e o nome da corporação"
              width={640}
              height={429}
              loading="lazy"
            />
          ) : (
            <video
              poster="/media/news/guarda-municipal-rb-viatura.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Vídeo em loop de uma viatura oficial da Guarda Municipal de Rio Branco, identificada com o brasão e o nome da corporação"
            >
              <source src="/media/news/guarda-municipal-rb-viatura.mp4" type="video/mp4" />
            </video>
          )}
          <figcaption>Viatura oficial · Guarda Municipal de Rio Branco</figcaption>
        </figure>
        <p className="news-banner__text">
          <span className="news-banner__tag">Notícia · Segurança pública</span>
          <span className="news-banner__headline">
            Rio Branco anuncia criação da Guarda Municipal
          </span>
          <span className="news-banner__summary">
            Prefeitura instituiu comissão para estruturar a corporação, com previsão de cerca de
            80 vagas e concurso público em 2027. Edital ainda não foi publicado.
          </span>
        </p>
        <a
          className="news-banner__link"
          href="https://www.riobranco.ac.gov.br/sdti/rio-branco-anuncia-criacao-da-guarda-municipal-com-previsao-de-80-vagas-e-reforco-na-seguranca-preventiva/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ler matéria completa
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
