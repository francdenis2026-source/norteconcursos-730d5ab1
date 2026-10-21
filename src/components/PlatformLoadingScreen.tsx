import loadingArtwork from "@/assets/auth/carreiras-composicao.webp";
import portraitArtwork from "@/assets/auth/carreiras-abertura-vertical.webp";
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useAuthStatus } from "@/components/auth/AuthStatusProvider";

export const INITIAL_LOADING_ART = loadingArtwork;
export const INITIAL_LOADING_PORTRAIT_ART = portraitArtwork;

/** Inline critical styles keep the initial server-rendered screen independent of route JS/fonts. */
export const INITIAL_LOADING_CSS = `
html:not([data-norte-boot=ready]){overflow:hidden;scrollbar-gutter:auto!important;background:#080a09}
#norte-initial-loading{position:fixed;inset:0;width:100vw;z-index:10000;overflow:hidden;background:#080a09;color:#f5f1e8;opacity:1;visibility:visible;transition:opacity .24s ease,visibility .24s ease;font-family:system-ui,-apple-system,Segoe UI,sans-serif;pointer-events:auto}
#norte-initial-loading picture{position:absolute;inset:0;display:block;width:100%;height:100%;pointer-events:none}
#norte-initial-loading img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 50%}
#norte-initial-loading:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(0deg,#080a09f5 0%,#080a09c9 12%,#080a0933 32%,transparent 55%)}
#norte-initial-loading .norte-boot-copy{position:absolute;inset:auto auto max(28px,6dvh,env(safe-area-inset-bottom)) clamp(24px,5vw,96px);width:min(420px,calc(100% - 48px));z-index:1;text-align:left;padding:0;margin:0;text-shadow:0 2px 16px #000}
#norte-initial-loading .norte-boot-brand{display:block;color:#efd090;font-size:clamp(20px,3vw,30px);font-weight:750;letter-spacing:.28em;padding-left:0;line-height:1.2}
#norte-initial-loading .norte-boot-tagline{display:block;margin-top:10px;font-size:13px;letter-spacing:.025em;color:#e1ddd3}
#norte-initial-loading .norte-boot-status{display:block;margin-top:22px;font-size:11px;color:#bdb8ad}
#norte-initial-loading .norte-boot-track{display:block;position:relative;overflow:hidden;width:100px;height:2px;border-radius:2px;background:rgba(239,208,144,.18);margin:12px 0 0}
#norte-initial-loading .norte-boot-track:after{content:'';position:absolute;inset:0;width:35%;background:#efd090;animation:norte-boot-progress 1.6s ease-in-out infinite}
@keyframes norte-boot-progress{from{transform:translateX(-100%)}to{transform:translateX(390%)}}
html[data-norte-boot=ready] #norte-initial-loading{opacity:0;visibility:hidden;pointer-events:none}
@media(orientation:portrait){#norte-initial-loading img{object-position:50% 35%}#norte-initial-loading .norte-boot-copy{inset:auto 20px max(32px,7dvh,env(safe-area-inset-bottom));width:auto;text-align:center}#norte-initial-loading .norte-boot-brand{padding-left:.28em}#norte-initial-loading .norte-boot-track{margin-inline:auto}}
@media(max-height:500px){#norte-initial-loading .norte-boot-copy{bottom:max(16px,env(safe-area-inset-bottom))}#norte-initial-loading .norte-boot-brand{font-size:20px}#norte-initial-loading .norte-boot-tagline{margin-top:5px;font-size:12px}#norte-initial-loading .norte-boot-status{margin-top:10px}}
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
        <source media="(orientation: portrait)" srcSet={INITIAL_LOADING_PORTRAIT_ART} type="image/webp" />
        <img src={INITIAL_LOADING_ART} width={1440} height={600} alt="" fetchPriority="high" decoding="async" />
      </picture>
      <div className="norte-boot-copy">
        <strong className="norte-boot-brand">NORTE</strong>
        <span className="norte-boot-tagline">Sua preparação tem um norte.</span>
        <span className="norte-boot-status">Preparando sua plataforma…</span>
        <span className="norte-boot-track" aria-hidden="true" />
      </div>
    </div>
  );
}

export function finishInitialLoading() {
  if (typeof document === "undefined" || document.documentElement.dataset["norteBoot"] === "ready") return;
  document.documentElement.dataset["norteBoot"] = "ready";
  window.dispatchEvent(new Event("norte:boot-ready"));
}

/** Called only inside the auth provider; public pages never wait for account requests. */
export function InitialLoadingReady() {
  const { isLoading, error } = useAuthStatus();
  const { pathname, status } = useRouterState({ select: state => ({ pathname: state.location.pathname, status: state.status }) });
  useEffect(() => {
    if (status === "pending") return;
    if (pathname.startsWith("/dashboard") && isLoading && !error) return;
    finishInitialLoading();
  }, [pathname, status, isLoading, error]);
  return null;
}
