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
#norte-initial-loading .norte-boot-logo{display:block;width:clamp(150px,30vmin,260px);height:auto;filter:drop-shadow(0 6px 24px #000a);animation:norte-boot-breathe 2.4s ease-in-out infinite}
#norte-initial-loading .norte-boot-status{display:block;margin-top:clamp(22px,4vmin,34px);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#cfc7b4}
#norte-initial-loading .norte-boot-track{display:block;position:relative;overflow:hidden;width:120px;height:2px;border-radius:2px;background:rgba(239,208,144,.2);margin:12px 0 0}
#norte-initial-loading .norte-boot-track:after{content:'';position:absolute;inset:0;width:35%;background:#efd090;animation:norte-boot-progress 1.6s ease-in-out infinite}
@keyframes norte-boot-progress{from{transform:translateX(-100%)}to{transform:translateX(390%)}}
@keyframes norte-boot-breathe{0%,100%{opacity:.92}50%{opacity:1}}
html[data-norte-boot=ready] #norte-initial-loading{opacity:0;visibility:hidden;pointer-events:none}
html[data-norte-startup-stage=intro] #norte-initial-loading>.norte-boot-copy{visibility:hidden}
@media(orientation:portrait){#norte-initial-loading>picture img{object-position:70% 50%}}
@media(max-height:500px){#norte-initial-loading .norte-boot-logo{width:clamp(90px,34vh,150px)}#norte-initial-loading .norte-boot-status{margin-top:12px}}
@media(prefers-reduced-motion:reduce){#norte-initial-loading{transition:none}#norte-initial-loading .norte-boot-logo{animation:none}#norte-initial-loading .norte-boot-track:after{animation:none;left:32%}}
@media(forced-colors:active){#norte-initial-loading{background:Canvas;color:CanvasText}#norte-initial-loading picture,#norte-initial-loading:after{display:none}#norte-initial-loading .norte-boot-status{color:CanvasText}}
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
        <img className="norte-boot-logo" src="/media/brand/norte-identity/logo-vertical-escuro.svg" width={512} height={700} alt="Norte Concursos" decoding="sync" />
        <span className="norte-boot-status">Carregando…</span>
        <span className="norte-boot-track" aria-hidden="true" />
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
