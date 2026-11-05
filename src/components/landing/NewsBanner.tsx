import { useEffect, useState } from "react";
import { ArrowUpRight, Play, ShieldCheck, X } from "lucide-react";

const DISMISS_KEY = "nc-news-banner-dismissed:guarda-municipal-rb-2026-11";

export function NewsBanner() {
  const [dismissed, setDismissed] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [allowVideo, setAllowVideo] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === "true");
    } catch {
      setDismissed(false);
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    setAllowVideo(!connection?.saveData && !/(^|-)2g$/.test(connection?.effectiveType ?? ""));
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
          {reducedMotion || !allowVideo || videoFinished ? (
            <img
              src={videoFinished ? "/media/news/guarda-municipal-rb-capa-final.webp" : "/media/news/guarda-municipal-rb-viatura.webp"}
              onError={(event) => {
                const image = event.currentTarget;
                if (!image.src.endsWith("/media/news/guarda-municipal-rb-viatura.webp")) {
                  image.src = "/media/news/guarda-municipal-rb-viatura.webp";
                }
              }}
              alt={videoFinished ? "Arte informativa sobre a criação da Guarda Municipal de Rio Branco, Acre" : "Imagem de uma viatura identificada como Guarda Municipal de Rio Branco"}
              width={640}
              height={429}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <video
              poster="/media/news/guarda-municipal-rb-viatura.webp"
              autoPlay
              muted
              playsInline
              onEnded={() => setVideoFinished(true)}
              onError={() => setVideoFinished(true)}
              preload="none"
              aria-label="Vídeo de uma viatura oficial da Guarda Municipal de Rio Branco, identificada com o brasão e o nome da corporação"
            >
              <source src="/media/news/guarda-municipal-rb-viatura.mp4" type="video/mp4" />
            </video>
          )}
          {videoFinished && allowVideo && !reducedMotion && (
            <button type="button" className="news-banner__replay" onClick={() => setVideoFinished(false)} aria-label="Reproduzir vídeo novamente"><Play aria-hidden="true" /> Rever vídeo</button>
          )}
          <figcaption>{videoFinished ? "Criação da Guarda Municipal · Rio Branco, AC" : "Guarda Municipal de Rio Branco · Imagem ilustrativa"}</figcaption>
        </figure>
        <div className="news-banner__text">
          <span className="news-banner__tag"><ShieldCheck aria-hidden="true" /> Radar de concursos · Segurança pública</span>
          <strong className="news-banner__headline">
            Guarda Municipal de Rio Branco: projeto de criação avança
          </strong>
          <span className="news-banner__summary">
            Comissão instituída para estruturar a corporação. Há previsão de cerca de 80 vagas e concurso em 2027; edital ainda não publicado.
          </span>
        </div>
        <a
          className="news-banner__link"
          href="https://www.riobranco.ac.gov.br/sdti/rio-branco-anuncia-criacao-da-guarda-municipal-com-previsao-de-80-vagas-e-reforco-na-seguranca-preventiva/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver notícia oficial
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
