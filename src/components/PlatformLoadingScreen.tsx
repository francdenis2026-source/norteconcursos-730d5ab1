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
#norte-initial-loading .norte-boot-logo-wrap{position:relative;isolation:isolate;display:block;width:clamp(150px,30vmin,260px);height:auto;flex:none}
#norte-initial-loading .norte-boot-logo-wrap:before{content:'';position:absolute;z-index:-1;inset:16%;border-radius:50%;background:radial-gradient(ellipse,rgba(239,208,144,.28),rgba(198,173,118,.1) 42%,transparent 72%);filter:blur(18px);opacity:0;animation:norte-boot-aura 1.4s ease-out .2s both,norte-boot-aura-breathe 4s ease-in-out 1.8s infinite}
#norte-initial-loading .norte-boot-logo{position:relative;display:block;width:100%;height:auto;filter:drop-shadow(0 8px 28px #000b);opacity:0;clip-path:inset(0 100% 0 0);transform:translateY(18px) scale(.92);animation:norte-boot-logo-in 1.25s cubic-bezier(.16,1,.3,1) .08s both}
#norte-initial-loading .norte-boot-logo-wrap:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(112deg,transparent 34%,rgba(255,255,255,.7) 47%,rgba(239,208,144,.82) 51%,transparent 64%);mix-blend-mode:screen;-webkit-mask:url('/media/brand/norte-identity/logo-vertical-escuro.svg') center/contain no-repeat;mask:url('/media/brand/norte-identity/logo-vertical-escuro.svg') center/contain no-repeat;transform:translateX(-125%);animation:norte-boot-shine 1.05s cubic-bezier(.2,.75,.25,1) 1.08s both}
#norte-initial-loading .norte-boot-rule,#norte-initial-loading .norte-boot-motto,#norte-initial-loading .norte-boot-tagline,#norte-initial-loading .norte-boot-status,#norte-initial-loading .norte-boot-track{opacity:0;animation:norte-boot-copy-in .65s cubic-bezier(.2,.75,.25,1) both}
#norte-initial-loading .norte-boot-rule{animation-delay:.68s}
#norte-initial-loading .norte-boot-motto{animation-delay:.76s}
#norte-initial-loading .norte-boot-tagline{animation-delay:.84s}
#norte-initial-loading .norte-boot-status{animation-delay:.98s}
#norte-initial-loading .norte-boot-track{animation-delay:1.04s}
#norte-initial-loading .norte-boot-rule{display:block;width:48px;height:1px;margin-top:clamp(18px,3.4vmin,28px);background:linear-gradient(90deg,transparent,#efd090,transparent)}#norte-initial-loading .norte-boot-motto{display:block;margin:clamp(14px,2.6vmin,20px) 0 0;font-size:clamp(13px,3.4vmin,17px);font-weight:750;letter-spacing:.3em;padding-left:.3em;text-transform:uppercase;color:#efd090;text-shadow:0 2px 14px #000}#norte-initial-loading .norte-boot-tagline{display:block;margin-top:8px;font-size:clamp(12px,2.6vmin,14px);letter-spacing:.03em;color:#e1ddd3;text-shadow:0 2px 12px #000}#norte-initial-loading .norte-boot-status{display:block;margin-top:clamp(22px,4vmin,32px);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#b9b19d}#norte-initial-loading .norte-boot-sign{position:absolute;z-index:1;left:0;right:0;bottom:max(18px,env(safe-area-inset-bottom));display:flex;flex-direction:column;align-items:center;gap:5px;padding:0 20px;text-align:center;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#a39c89;pointer-events:none}#norte-initial-loading .norte-boot-sign strong{font-size:11px;font-weight:700;letter-spacing:.2em;color:#e8e0cc}#norte-initial-loading .norte-boot-sign:before{content:'';display:block;width:28px;height:1px;margin-bottom:5px;background:#efd09099}
#norte-initial-loading .norte-boot-track{display:block;position:relative;overflow:hidden;width:120px;height:2px;border-radius:2px;background:rgba(239,208,144,.2);margin:12px 0 0}
#norte-initial-loading .norte-boot-track:after{content:'';position:absolute;inset:0;width:35%;background:#efd090;animation:norte-boot-progress 1.6s ease-in-out infinite}
@keyframes norte-boot-progress{from{transform:translateX(-100%)}to{transform:translateX(390%)}}
@keyframes norte-boot-logo-in{0%{opacity:0;clip-path:inset(0 100% 0 0);transform:translateY(18px) scale(.92);filter:blur(8px) drop-shadow(0 8px 28px #000b)}65%{opacity:1;clip-path:inset(0 0 0 0);filter:blur(0) drop-shadow(0 8px 28px #000b)}100%{opacity:1;clip-path:inset(0 0 0 0);transform:translateY(0) scale(1);filter:blur(0) drop-shadow(0 8px 28px #000b)}}
@keyframes norte-boot-shine{0%{transform:translateX(-125%);opacity:0}12%{opacity:1}100%{transform:translateX(125%);opacity:0}}
@keyframes norte-boot-aura{0%{opacity:0;transform:scale(.55)}70%{opacity:.9;transform:scale(1.08)}100%{opacity:.48;transform:scale(1)}}
@keyframes norte-boot-aura-breathe{0%,100%{opacity:.34;transform:scale(.96)}50%{opacity:.62;transform:scale(1.06)}}
@keyframes norte-boot-copy-in{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:translateY(0)}}
html[data-norte-boot=ready] #norte-initial-loading{opacity:0;visibility:hidden;pointer-events:none}
html[data-norte-startup-stage=intro] #norte-initial-loading>:is(.norte-boot-copy,.norte-boot-sign){visibility:hidden}
@media(orientation:portrait){#norte-initial-loading>picture img{object-position:70% 50%}}
@media(max-height:500px){#norte-initial-loading .norte-boot-logo-wrap{width:clamp(90px,34vh,150px)}#norte-initial-loading .norte-boot-status{margin-top:10px}#norte-initial-loading .norte-boot-rule,#norte-initial-loading .norte-boot-tagline,#norte-initial-loading .norte-boot-sign:before{display:none}#norte-initial-loading .norte-boot-motto{margin-top:10px}}
@media(prefers-reduced-motion:reduce){#norte-initial-loading{transition:none}#norte-initial-loading :is(.norte-boot-logo-wrap:before,.norte-boot-logo,.norte-boot-rule,.norte-boot-motto,.norte-boot-tagline,.norte-boot-status,.norte-boot-track){animation:none!important;opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}#norte-initial-loading .norte-boot-logo-wrap:after{display:none!important}#norte-initial-loading .norte-boot-track:after{animation:none;left:32%}}
@media(forced-colors:active){#norte-initial-loading{background:Canvas;color:CanvasText}#norte-initial-loading picture,#norte-initial-loading:after{display:none}#norte-initial-loading :is(.norte-boot-status,.norte-boot-motto,.norte-boot-tagline,.norte-boot-sign,.norte-boot-sign strong){color:CanvasText}}
@media print{#norte-initial-loading{display:none}}
`;

// If hydration fails entirely, reveal SSR/error content instead of trapping the visitor.
export const INITIAL_LOADING_WATCHDOG = `(()=>{const t=setTimeout(()=>{document.documentElement.dataset.norteBoot='ready'},20000);window.addEventListener('norte:boot-ready',()=>clearTimeout(t),{once:true})})();`;

export function InitialLoadingScreen() {
  return (
    <div id="norte-initial-loading" role="status" aria-label="Preparando a plataforma Norte Concursos">
      <picture aria-hidden="true">
        <img src={INITIAL_LOADING_ART} width={1774} height={887} alt="" loading="eager" fetchPriority="high" decoding="sync" />
      </picture>
      <div className="norte-boot-copy">
        <span className="norte-boot-logo-wrap"><img className="norte-boot-logo" src="/media/brand/norte-identity/logo-vertical-escuro.svg" width={512} height={700} alt="Norte Concursos" decoding="sync" /></span>
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
