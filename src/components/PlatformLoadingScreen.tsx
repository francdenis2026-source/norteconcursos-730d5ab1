import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useAuthStatus } from "@/components/auth/AuthStatusProvider";
import { documentStartup } from "@/lib/startupSequence";
export { finishInitialLoading } from "@/lib/startupSequence";

export const INITIAL_LOADING_ART = "/media/hero/hero-norte-impacto.webp";

/** Inline critical styles keep the initial server-rendered screen independent of route JS/fonts.
 *  Tela cheia: imagem de fundo cobrindo tudo, véu escuro para legibilidade e a logomarca ao centro com a barra de carregamento. */
export const INITIAL_LOADING_CSS = `
html:not([data-norte-boot=ready]){overflow:hidden;scrollbar-gutter:auto!important;background:#080a09}
html:not([data-norte-boot=ready]) #norte-app-content{visibility:hidden;opacity:0;pointer-events:none}
#norte-initial-loading{position:fixed;inset:0;width:100vw;height:100dvh;z-index:10000;overflow:hidden;background:#080a09;color:#f5f1e8;opacity:1;visibility:visible;transition:opacity .24s ease,visibility .24s ease;font-family:system-ui,-apple-system,Segoe UI,sans-serif;pointer-events:auto}
#norte-initial-loading picture{position:absolute;inset:0;display:block;width:100%;height:100%;pointer-events:none}
#norte-initial-loading>picture img{display:block;width:100%;height:100%;object-fit:cover;object-position:72% 50%}
#norte-initial-loading:after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(70% 55% at 50% 46%,#080a0999 0%,#080a09cc 55%,#080a09f0 100%),linear-gradient(180deg,#080a0966 0%,transparent 30%,#080a09d9 100%)}
#norte-initial-loading .norte-boot-copy{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;padding:max(24px,env(safe-area-inset-top)) 24px max(24px,env(safe-area-inset-bottom));text-align:center;margin:0}
#norte-initial-loading .norte-boot-logo{display:block;width:clamp(150px,30vmin,260px);height:auto;filter:drop-shadow(0 6px 24px #000a);opacity:0;transform:translateY(7px) scale(.985);animation:norte-boot-logo-enter .48s cubic-bezier(.2,.7,.2,1) .04s both}
#norte-initial-loading .norte-boot-rule,#norte-initial-loading .norte-boot-motto,#norte-initial-loading .norte-boot-tagline,#norte-initial-loading .norte-boot-status,#norte-initial-loading .norte-boot-track{opacity:0;animation:norte-boot-copy-enter .38s ease-out .16s both}
#norte-initial-loading .norte-boot-rule{display:block;width:48px;height:1px;margin-top:clamp(18px,3.4vmin,28px);background:linear-gradient(90deg,transparent,#efd090,transparent)}#norte-initial-loading .norte-boot-motto{display:block;margin:clamp(14px,2.6vmin,20px) 0 0;font-size:clamp(13px,3.4vmin,17px);font-weight:750;letter-spacing:.3em;padding-left:.3em;text-transform:uppercase;color:#efd090;text-shadow:0 2px 14px #000}#norte-initial-loading .norte-boot-tagline{display:block;margin-top:8px;font-size:clamp(12px,2.6vmin,14px);letter-spacing:.03em;color:#e1ddd3;text-shadow:0 2px 12px #000}#norte-initial-loading .norte-boot-status{display:block;margin-top:clamp(22px,4vmin,32px);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#b9b19d}#norte-initial-loading .norte-boot-sign{position:absolute;z-index:1;left:0;right:0;bottom:max(18px,env(safe-area-inset-bottom));display:flex;flex-direction:column;align-items:center;gap:5px;padding:0 20px;text-align:center;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#a39c89;pointer-events:none}#norte-initial-loading .norte-boot-sign strong{font-size:11px;font-weight:700;letter-spacing:.2em;color:#e8e0cc}#norte-initial-loading .norte-boot-sign:before{content:'';display:block;width:28px;height:1px;margin-bottom:5px;background:#efd09099}
#norte-initial-loading .norte-boot-track{display:block;position:relative;overflow:hidden;width:120px;height:2px;border-radius:2px;background:rgba(239,208,144,.2);margin:12px 0 0}
#norte-initial-loading .norte-boot-track:after{content:'';position:absolute;inset:0;width:35%;background:#efd090;animation:norte-boot-progress 1.6s ease-in-out infinite}
@keyframes norte-boot-progress{from{transform:translateX(-100%)}to{transform:translateX(390%)}}
@keyframes norte-boot-logo-enter{from{opacity:0;transform:translateY(7px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes norte-boot-copy-enter{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
#norte-initial-loading .norte-boot-mark{position:relative;display:block;line-height:0}
#norte-initial-loading .norte-boot-logo{animation:norte-boot-logo-enter .7s cubic-bezier(.16,1,.3,1) .05s both}
#norte-initial-loading .norte-boot-rule{animation:norte-boot-rule-enter .55s cubic-bezier(.16,1,.3,1) .32s both}
#norte-initial-loading .norte-boot-motto{animation:norte-boot-motto-enter .6s cubic-bezier(.16,1,.3,1) .4s both}
#norte-initial-loading .norte-boot-tagline{animation-delay:.52s}
#norte-initial-loading .norte-boot-status,#norte-initial-loading .norte-boot-track{animation-delay:.62s}
#norte-initial-loading .norte-boot-track{width:148px;border-radius:99px}
#norte-initial-loading .norte-boot-track:after{width:42%;border-radius:99px;background:linear-gradient(90deg,transparent,#efd090,#fff3cf,#efd090,transparent);animation:norte-boot-progress 1.25s cubic-bezier(.45,0,.55,1) infinite}
#norte-initial-loading .norte-boot-copy{transition:transform .34s cubic-bezier(.4,0,.2,1),opacity .28s ease}
#norte-initial-loading{transition:opacity .34s ease,visibility .34s ease}
html[data-norte-boot=ready] #norte-initial-loading .norte-boot-copy{transform:scale(1.035);opacity:0}
@keyframes norte-boot-logo-enter{from{opacity:0;transform:translateY(10px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes norte-boot-rule-enter{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}
@keyframes norte-boot-motto-enter{from{opacity:0;transform:translateY(6px);letter-spacing:.42em}to{opacity:1;transform:translateY(0);letter-spacing:.3em}}
@keyframes norte-boot-sheen{0%{background-position:150% 0}60%,100%{background-position:-50% 0}}
@keyframes norte-boot-progress{from{transform:translateX(-110%)}to{transform:translateX(250%)}}
@media(prefers-reduced-motion:reduce){#norte-initial-loading .norte-boot-copy{transition:none}}
html[data-norte-boot=ready] #norte-initial-loading{opacity:0;visibility:hidden;pointer-events:none}
html[data-norte-startup-stage=intro] #norte-initial-loading>:is(.norte-boot-copy,.norte-boot-sign){visibility:hidden}
@media(orientation:portrait){#norte-initial-loading>picture img{object-position:70% 50%}}
@media(max-height:500px){#norte-initial-loading .norte-boot-logo{width:clamp(90px,34vh,150px)}#norte-initial-loading .norte-boot-status{margin-top:10px}#norte-initial-loading .norte-boot-rule,#norte-initial-loading .norte-boot-tagline,#norte-initial-loading .norte-boot-sign:before{display:none}#norte-initial-loading .norte-boot-motto{margin-top:10px}}
@media(prefers-reduced-motion:reduce){#norte-initial-loading{transition:none}#norte-initial-loading :is(.norte-boot-logo,.norte-boot-rule,.norte-boot-motto,.norte-boot-tagline,.norte-boot-status,.norte-boot-track){animation:none!important;opacity:1!important;transform:none!important;filter:none!important}#norte-initial-loading .norte-boot-track:after{animation:none;left:32%}}
@media(forced-colors:active){#norte-initial-loading{background:Canvas;color:CanvasText}#norte-initial-loading picture,#norte-initial-loading:after{display:none}#norte-initial-loading :is(.norte-boot-status,.norte-boot-motto,.norte-boot-tagline,.norte-boot-sign,.norte-boot-sign strong){color:CanvasText}}
#norte-initial-loading .norte-boot-compass{display:block;width:clamp(52px,11vmin,72px);height:clamp(52px,11vmin,72px);margin-top:clamp(16px,3vmin,24px);opacity:0;perspective:260px;animation:norte-boot-copy-enter .5s ease-out .58s both;filter:drop-shadow(0 10px 14px #000c)}
#norte-initial-loading .norte-boot-compass svg{display:block;width:100%;height:100%;overflow:visible;transform:rotateX(18deg);transform-origin:50% 60%}
#norte-initial-loading .norte-boot-needle{transform-origin:32px 32px;animation:norte-boot-needle 2.6s cubic-bezier(.2,.7,.2,1) .7s both,norte-boot-needle-idle 3.2s ease-in-out 3.3s infinite}
@keyframes norte-boot-needle{0%{transform:rotate(-140deg)}22%{transform:rotate(58deg)}42%{transform:rotate(-30deg)}60%{transform:rotate(16deg)}78%{transform:rotate(-7deg)}90%{transform:rotate(3deg)}100%{transform:rotate(0)}}
@keyframes norte-boot-needle-idle{0%,100%{transform:rotate(0)}30%{transform:rotate(2.2deg)}65%{transform:rotate(-1.8deg)}}
@media(max-height:500px){#norte-initial-loading .norte-boot-compass{display:none}}
@media(prefers-reduced-motion:reduce){#norte-initial-loading .norte-boot-needle{animation:none!important}#norte-initial-loading .norte-boot-compass{animation:none!important;opacity:1!important}}
@media(forced-colors:active){#norte-initial-loading .norte-boot-compass{display:none}}
@media print{#norte-initial-loading{display:none}}
`;

// If hydration fails entirely, reveal SSR/error content instead of trapping the visitor.
export const INITIAL_LOADING_WATCHDOG = `(()=>{const t=setTimeout(()=>{document.documentElement.dataset.norteBoot='ready'},6000);window.addEventListener('norte:boot-ready',()=>clearTimeout(t),{once:true})})();`;

export function InitialLoadingScreen() {
  return (
    <div id="norte-initial-loading" role="status" aria-label="Preparando a plataforma Norte Concursos">
      <picture aria-hidden="true">
        <img src={INITIAL_LOADING_ART} width={1774} height={887} alt="" loading="eager" fetchPriority="high" decoding="sync" />
      </picture>
      <div className="norte-boot-copy">
        <span className="norte-boot-mark">
          <img className="norte-boot-logo" src="/media/brand/norte-identity/logo-vertical-escuro.svg" width={512} height={700} alt="Norte Concursos" decoding="sync" />
        </span>
        <span className="norte-boot-rule" aria-hidden="true" />
        <p className="norte-boot-motto">Direção. Disciplina. Conquista.</p>
        <span className="norte-boot-tagline">Sua preparação tem um norte.</span>
        <span className="norte-boot-compass" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <defs>
              <radialGradient id="nbc-bezel" cx="35%" cy="28%" r="85%">
                <stop offset="0" stopColor="#fff3cf" />
                <stop offset=".45" stopColor="#efd090" />
                <stop offset="1" stopColor="#7a5a1c" />
              </radialGradient>
              <radialGradient id="nbc-face" cx="50%" cy="42%" r="65%">
                <stop offset="0" stopColor="#1d2622" />
                <stop offset="1" stopColor="#0a0f0d" />
              </radialGradient>
              <linearGradient id="nbc-glass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity=".28" />
                <stop offset=".5" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="31" fill="url(#nbc-bezel)" />
            <circle cx="32" cy="32" r="26.5" fill="url(#nbc-face)" stroke="#5c4413" strokeWidth=".8" />
            <g stroke="#efd090" strokeLinecap="round" opacity=".75">
              <path d="M32 7.5v4M32 52.5v4M7.5 32h4M52.5 32h4" strokeWidth="1.4" />
              <path d="M14.7 14.7l2.4 2.4M46.9 46.9l2.4 2.4M49.3 14.7l-2.4 2.4M17.1 46.9l-2.4 2.4" strokeWidth=".9" />
            </g>
            <g className="norte-boot-needle">
              <path d="M32 11.5l4.6 20.5h-9.2z" fill="#e0533f" />
              <path d="M32 52.5L27.4 32h9.2z" fill="#d9d4c4" />
              <path d="M32 11.5l2.3 20.5H32z" fill="#000" opacity=".22" />
            </g>
            <circle cx="32" cy="32" r="2.6" fill="url(#nbc-bezel)" stroke="#5c4413" strokeWidth=".5" />
            <ellipse cx="32" cy="19" rx="20" ry="13" fill="url(#nbc-glass)" />
          </svg>
        </span>
        <span className="norte-boot-status">Carregando</span>
        <span className="norte-boot-track" aria-hidden="true" />
      </div>
      <div className="norte-boot-sign">
        <span>Desenvolvido por</span>
        <strong>Franc D’nis</strong>
        <span>Feijó · Acre · Brasil</span>
      </div>
    </div>
  );
}

/** Called only inside the auth provider; public pages never wait for account requests. */
export function InitialLoadingReady() {
  const { isLoading, error } = useAuthStatus();
  const { pathname, status } = useRouterState({ select: state => ({ pathname: state.location.pathname, status: state.status }) });
  useEffect(() => {
    if (status === "pending") return;
    if (pathname.startsWith("/dashboard") && isLoading && !error) return;
    documentStartup().routeReady(pathname);
  }, [pathname, status, isLoading, error]);
  return null;
}
