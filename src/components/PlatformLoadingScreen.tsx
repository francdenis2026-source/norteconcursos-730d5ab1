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
#norte-initial-loading .norte-boot-mark:before{content:'';position:absolute;left:50%;top:38%;width:128%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(closest-side,#efd09026,#efd09008 62%,transparent 72%);opacity:0;animation:norte-boot-halo 2.4s ease-in-out .3s infinite;pointer-events:none}
#norte-initial-loading .norte-boot-mark:after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,#fff6dcb3 50%,transparent 60%) 150% 0/260% 100% no-repeat;-webkit-mask:url(/media/brand/norte-identity/logo-vertical-escuro.svg) center/contain no-repeat;mask:url(/media/brand/norte-identity/logo-vertical-escuro.svg) center/contain no-repeat;animation:norte-boot-sheen 2.4s cubic-bezier(.4,0,.2,1) .6s infinite;pointer-events:none}
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
@keyframes norte-boot-halo{0%,100%{opacity:.35;transform:translate(-50%,-50%) scale(.96)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.04)}}
@keyframes norte-boot-sheen{0%{background-position:150% 0}60%,100%{background-position:-50% 0}}
@keyframes norte-boot-progress{from{transform:translateX(-110%)}to{transform:translateX(250%)}}
@media(prefers-reduced-motion:reduce){#norte-initial-loading .norte-boot-mark:before,#norte-initial-loading .norte-boot-mark:after{animation:none!important;display:none}#norte-initial-loading .norte-boot-copy{transition:none}}
html[data-norte-boot=ready] #norte-initial-loading{opacity:0;visibility:hidden;pointer-events:none}
html[data-norte-startup-stage=intro] #norte-initial-loading>:is(.norte-boot-copy,.norte-boot-sign){visibility:hidden}
@media(orientation:portrait){#norte-initial-loading>picture img{object-position:70% 50%}}
@media(max-height:500px){#norte-initial-loading .norte-boot-logo{width:clamp(90px,34vh,150px)}#norte-initial-loading .norte-boot-status{margin-top:10px}#norte-initial-loading .norte-boot-rule,#norte-initial-loading .norte-boot-tagline,#norte-initial-loading .norte-boot-sign:before{display:none}#norte-initial-loading .norte-boot-motto{margin-top:10px}}
@media(prefers-reduced-motion:reduce){#norte-initial-loading{transition:none}#norte-initial-loading :is(.norte-boot-logo,.norte-boot-rule,.norte-boot-motto,.norte-boot-tagline,.norte-boot-status,.norte-boot-track){animation:none!important;opacity:1!important;transform:none!important;filter:none!important}#norte-initial-loading .norte-boot-track:after{animation:none;left:32%}}
@media(forced-colors:active){#norte-initial-loading{background:Canvas;color:CanvasText}#norte-initial-loading picture,#norte-initial-loading:after{display:none}#norte-initial-loading :is(.norte-boot-status,.norte-boot-motto,.norte-boot-tagline,.norte-boot-sign,.norte-boot-sign strong){color:CanvasText}}
@media print{#norte-initial-loading{display:none}}
`;

// If hydration fails entirely, reveal SSR/error content instead of trapping the visitor.
export const INITIAL_LOADING_WATCHDOG = `(()=>{const t=setTimeout(()=>{document.documentElement.dataset.norteBoot='ready'},10000);window.addEventListener('norte:boot-ready',()=>clearTimeout(t),{once:true})})();`;

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
