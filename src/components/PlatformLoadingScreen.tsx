import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useAuthStatus } from "@/components/auth/AuthStatusProvider";

/** Inline critical styles keep the initial server-rendered screen independent of route JS/fonts. */
export const INITIAL_LOADING_CSS = `
html:not([data-norte-boot=ready]){overflow:hidden}
#norte-initial-loading{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;align-content:center;gap:clamp(16px,4vh,36px);padding:clamp(12px,3vh,28px) 16px;overflow:hidden;background:#080a09;color:#f5f1e8;opacity:1;visibility:visible;transition:opacity .24s ease,visibility .24s ease;font-family:system-ui,-apple-system,Segoe UI,sans-serif;pointer-events:auto}
#norte-initial-loading picture{position:relative;width:min(100%,1280px);height:min(64vh,calc((100vw - 32px)*2/3));max-height:calc(100dvh - 172px);display:flex;align-items:center;justify-content:center;pointer-events:none}
#norte-initial-loading img{display:block;width:100%;height:100%;object-fit:contain;object-position:center;opacity:.9}
#norte-initial-loading:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(0deg,#080a09 0%,rgba(8,10,9,.45) 12%,transparent 30%)}
#norte-initial-loading .norte-boot-copy{position:relative;z-index:1;text-align:center;max-width:calc(100% - 48px);padding-bottom:0;margin:0}
#norte-initial-loading .norte-boot-brand{display:block;color:#efd090;font-size:clamp(20px,3vw,30px);font-weight:750;letter-spacing:.28em;padding-left:.28em;line-height:1.2}
#norte-initial-loading .norte-boot-tagline{display:block;margin-top:10px;font-size:13px;letter-spacing:.025em;color:#e1ddd3}
#norte-initial-loading .norte-boot-status{display:block;margin-top:22px;font-size:11px;color:#bdb8ad}
#norte-initial-loading .norte-boot-track{display:block;position:relative;overflow:hidden;width:100px;height:2px;border-radius:2px;background:rgba(239,208,144,.18);margin:12px auto 0}
#norte-initial-loading .norte-boot-track:after{content:'';position:absolute;inset:0;width:35%;background:#efd090;animation:norte-boot-progress 1.6s ease-in-out infinite}
@keyframes norte-boot-progress{from{transform:translateX(-100%)}to{transform:translateX(390%)}}
html[data-norte-boot=ready] #norte-initial-loading{opacity:0;visibility:hidden;pointer-events:none}
@media(max-width:640px){#norte-initial-loading{padding: max(20px,env(safe-area-inset-top)) 12px max(20px,env(safe-area-inset-bottom))}#norte-initial-loading picture{height:min(64vh,calc((100vw - 24px)*2/3))}}
@media(max-height:500px){#norte-initial-loading picture{max-height:calc(100dvh - 140px)}#norte-initial-loading .norte-boot-brand{font-size:20px}#norte-initial-loading .norte-boot-tagline{margin-top:5px;font-size:12px}#norte-initial-loading .norte-boot-status{margin-top:10px}}
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
        <source media="(max-width: 640px)" srcSet="/media/loading/norte-abertura-mobile-hd.webp 1x, /media/loading/norte-abertura-hd.webp 2x" />
        <img src="/media/loading/norte-abertura-hd.webp" width={1536} height={1024} alt="" fetchPriority="high" decoding="async" />
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
