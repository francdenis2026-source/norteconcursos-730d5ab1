import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useAuthStatus } from "@/components/auth/AuthStatusProvider";
import { documentStartup } from "@/lib/startupSequence";
export { finishInitialLoading } from "@/lib/startupSequence";

export const INITIAL_LOADING_ART = "/media/hero/home-bg-texture.webp";

/** Inline critical styles keep the initial server-rendered screen independent of route JS/fonts. */
export const INITIAL_LOADING_CSS = `
html:not([data-norte-boot=ready]){overflow:hidden;scrollbar-gutter:auto!important;background:#080a09}
html:not([data-norte-boot=ready]) #norte-app-content{visibility:hidden;opacity:0;pointer-events:none}
#norte-initial-loading{position:fixed;inset:0;width:100vw;z-index:10000;overflow:hidden;background:#080a09 url("${INITIAL_LOADING_ART}") center/cover no-repeat;color:#f5f1e8;opacity:1;visibility:visible;transition:opacity .24s ease,visibility .24s ease;font-family:system-ui,-apple-system,Segoe UI,sans-serif;pointer-events:auto}
#norte-initial-loading picture{position:absolute;inset:0;display:block;width:100%;height:100%;pointer-events:none}
#norte-initial-loading>picture img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 50%}
#norte-initial-loading:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(0deg,#080a09f5 0%,#080a09c9 12%,#080a0933 32%,transparent 55%)}
#norte-initial-loading .norte-boot-watermark{position:absolute;top:max(24px,env(safe-area-inset-top));right:max(24px,env(safe-area-inset-right));width:clamp(150px,20vw,280px);height:auto;opacity:.42;z-index:1;pointer-events:none;filter:drop-shadow(0 2px 8px #0008)}
#norte-initial-loading .norte-boot-copy{position:absolute;inset:auto auto max(28px,6dvh,env(safe-area-inset-bottom)) clamp(24px,5vw,96px);width:min(420px,calc(100% - 48px));z-index:1;text-align:left;padding:0;margin:0;text-shadow:0 2px 16px #000}
#norte-initial-loading .norte-boot-brand{display:block;color:#efd090;font-size:clamp(20px,3vw,30px);font-weight:750;letter-spacing:.28em;padding-left:0;line-height:1.2}
#norte-initial-loading .norte-boot-tagline{display:block;margin-top:10px;font-size:13px;letter-spacing:.025em;color:#e1ddd3}
#norte-initial-loading .norte-boot-status{display:block;margin-top:22px;font-size:11px;color:#bdb8ad}
#norte-initial-loading .norte-boot-track{display:block;position:relative;overflow:hidden;width:100px;height:2px;border-radius:2px;background:rgba(239,208,144,.18);margin:12px 0 0}
#norte-initial-loading .norte-boot-track:after{content:'';position:absolute;inset:0;width:35%;background:#efd090;animation:norte-boot-progress 1.6s ease-in-out infinite}
@keyframes norte-boot-progress{from{transform:translateX(-100%)}to{transform:translateX(390%)}}
html[data-norte-boot=ready] #norte-initial-loading{opacity:0;visibility:hidden;pointer-events:none}
html[data-norte-startup-stage=intro] #norte-initial-loading>.norte-boot-copy{visibility:hidden}
@media(orientation:portrait){#norte-initial-loading>picture img{object-position:50% 50%}#norte-initial-loading .norte-boot-copy{inset:auto 20px max(32px,7dvh,env(safe-area-inset-bottom));width:auto;text-align:center}#norte-initial-loading .norte-boot-brand{padding-left:.28em}#norte-initial-loading .norte-boot-track{margin-inline:auto}}
@media(max-height:500px){#norte-initial-loading .norte-boot-copy{bottom:max(16px,env(safe-area-inset-bottom))}#norte-initial-loading .norte-boot-brand{font-size:20px}#norte-initial-loading .norte-boot-tagline{margin-top:5px;font-size:12px}#norte-initial-loading .norte-boot-status{margin-top:10px}}
#norte-initial-loading .norte-boot-mobile-logo{display:none}
@media(max-width:1024px),(max-width:1366px) and (pointer:coarse){
#norte-initial-loading{background:linear-gradient(155deg,#14232b,#101b23 60%,#0b131a)}
#norte-initial-loading>picture{display:block;inset:0;overflow:hidden}
#norte-initial-loading>picture img{width:100%;height:100%;object-fit:contain;object-position:center 40%;opacity:.92}
#norte-initial-loading>.norte-boot-watermark{display:none}
#norte-initial-loading:before{content:'';position:absolute;inset:clamp(16px,4vw,40px);border:1px solid #c6ad762b;border-radius:24px;pointer-events:none;background:linear-gradient(90deg,transparent,#c6ad7655,transparent) center top/60% 1px no-repeat}
#norte-initial-loading:after{background:linear-gradient(180deg,#0b131a38 0%,transparent 28%,#0b131a33 62%,#0b131aea 100%);pointer-events:none}
#norte-initial-loading .norte-boot-mobile-logo{display:none}
#norte-initial-loading .norte-boot-copy{inset:auto 28px max(52px,12dvh,env(safe-area-inset-bottom));width:auto;text-align:center}
#norte-initial-loading .norte-boot-brand{display:none}
#norte-initial-loading .norte-boot-tagline{font-size:clamp(12px,2vw,15px);color:#f3eee2;letter-spacing:.035em}
#norte-initial-loading .norte-boot-status{color:#c0c8cd;margin-top:18px}
#norte-initial-loading .norte-boot-track{width:112px;margin-inline:auto;background:#c6ad762e}
html[data-norte-startup-stage=intro] #norte-initial-loading>.norte-boot-mobile-logo{visibility:hidden}
}
@media(max-height:500px) and (max-width:1366px){
#norte-initial-loading .norte-boot-mobile-logo{top:37%;max-height:42dvh}
#norte-initial-loading .norte-boot-copy{bottom:max(30px,env(safe-area-inset-bottom))}
#norte-initial-loading .norte-boot-status{margin-top:10px}
}
@media(prefers-reduced-motion:reduce){#norte-initial-loading{transition:none}#norte-initial-loading .norte-boot-track:after{animation:none;left:32%}}
@media(forced-colors:active){#norte-initial-loading{background:Canvas;color:CanvasText}#norte-initial-loading picture,#norte-initial-loading:after{display:none}#norte-initial-loading .norte-boot-brand,#norte-initial-loading .norte-boot-tagline,#norte-initial-loading .norte-boot-status{color:CanvasText}}
@media print{#norte-initial-loading{display:none}}
`;

// If hydration fails entirely, reveal SSR/error content instead of trapping the visitor.
export const INITIAL_LOADING_WATCHDOG = `(()=>{const t=setTimeout(()=>{document.documentElement.dataset.norteBoot='ready'},20000);window.addEventListener('norte:boot-ready',()=>clearTimeout(t),{once:true})})();`;

export function InitialLoadingScreen() {
  return (
    <div id="norte-initial-loading" role="status" aria-label="Preparando a plataforma Norte Concursos">
      <picture aria-hidden="true">
        <img src={INITIAL_LOADING_ART} width={2087} height={753} alt="" loading="eager" fetchPriority="high" decoding="sync" />
      </picture>
      <img className="norte-boot-watermark" src="/media/brand/norte-identity/logo-horizontal-escuro.svg" width={1000} height={320} alt="" aria-hidden="true" decoding="sync" />
      <div className="norte-boot-copy">
        <strong className="norte-boot-brand">NORTE</strong>
        <span className="norte-boot-tagline">Sua preparação tem um norte.</span>
        <span className="norte-boot-status">Preparando sua plataforma…</span>
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
