import { PoliceInsignia } from "@/components/brand/PoliceInsignia";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { SessionIdleGuard } from "./SessionIdleGuard";
import { ArrowRight, Copy, ShieldCheck } from "lucide-react";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { Button } from "@/components/ui/button";
import { claimSessionTab, type SessionTabState } from "@/lib/sessionTab";
import "@/styles/session-access.css";

/** Block the duplicate before mounting protected screens, timers or the inactivity monitor. */
export function SessionTabGuard({ sessionKey, children }: { sessionKey: string | null; children: ReactNode }) {
  const { pathname } = useLocation();
  const authenticated = sessionKey !== null;
  const [snapshot, setSnapshot] = useState<{ authenticated: boolean; state: SessionTabState }>({ authenticated, state: "checking" });
  const [attempt, setAttempt] = useState(0);
  const state = !authenticated ? "owner" : snapshot.authenticated ? snapshot.state : "checking";
  const setState = (next: SessionTabState) => setSnapshot({ authenticated, state: next });
  useEffect(() => {
    if (!authenticated) { setSnapshot({ authenticated: false, state: "checking" }); return; }
    return claimSessionTab(navigator.locks, next => setSnapshot({ authenticated: true, state: next }));
  }, [authenticated, attempt]);
  // Preserve an in-flight login/recovery form while claiming its new session. Protected
  // routes are never mounted during checking, and blocked tabs mount no idle monitor.
  const authForm = pathname === "/auth" || pathname === "/admin";
  const publicHome = pathname === "/";
  const showChildren = publicHome || state === "owner" || (state === "checking" && authForm);
  const checking = state === "checking";
  const blocked = state === "blocked";
  return (
    <>
      {sessionKey && state === "owner" && <SessionIdleGuard key={sessionKey} sessionKey={sessionKey} />}
      <div style={{ display: checking && !publicHome ? "none" : "contents" }}>{showChildren && children}</div>
      {state !== "owner" && !publicHome && <main className="session-access" data-session-tab-state={state}>
        <div className="session-access__scene" aria-hidden="true" />
        <div className="session-access__layout">
          <aside className="session-access__editorial" aria-hidden="true">
            <span className="session-access__eyebrow">Norte Concursos · Carreiras policiais</span>
            <div className="session-access__signature">
              <span className="session-access__rule" />
              <p>Sua preparação,<br />com foco e segurança.</p>
              <span>Uma direção. A sua conquista.</span>
            </div>
          </aside>
          <section className="session-access__card" aria-labelledby="session-tab-title">
            <NorteBrand className="session-access__brand" />
            <div className="session-access__emblem" aria-hidden="true">
              <span className="session-access__halo" />
              <PoliceInsignia className="session-access__badge" alt="" width="768" height="811" decoding="async" />
              <span className="session-access__badge-shadow" />
            </div>
            <div className="session-access__status">
              {blocked ? <Copy size={14} aria-hidden="true" /> : <ShieldCheck size={14} aria-hidden="true" />}
              <span>{checking ? "Validando acesso" : blocked ? "Uma aba por vez" : "Verificação de acesso"}</span>
            </div>
            <div className="session-access__message" role="status" aria-live="polite">
              <h1 id="session-tab-title">
                {checking ? "Verificando sua sessão…" : blocked ? "Sua sessão já está aberta em outra aba" : "Não foi possível verificar suas abas"}
              </h1>
              <p>
                {checking ? "Aguarde enquanto confirmamos seu acesso nesta janela."
                  : blocked ? "Continue na aba que já está em uso. Para usar esta, feche a outra aba e toque em Tentar novamente. Sua conta permanece conectada."
                  : "Tente novamente. Se o problema continuar, abra a plataforma em uma versão atualizada do navegador."}
              </p>
            </div>
            {!checking && <Button className="session-access__retry" onClick={() => { setState("checking"); setAttempt(value => value + 1); }}>Tentar novamente <ArrowRight size={17} aria-hidden="true" /></Button>}
            <Link to="/" className="session-access__home">Página inicial</Link>
            <span className="session-access__footer"><ShieldCheck size={13} aria-hidden="true" /> Seu acesso permanece protegido</span>
          </section>
        </div>
      </main>}
    </>
  );
}
