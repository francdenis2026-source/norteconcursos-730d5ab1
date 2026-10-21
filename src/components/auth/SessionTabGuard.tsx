import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { SessionIdleGuard } from "./SessionIdleGuard";
import { Copy, ShieldCheck } from "lucide-react";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { Button } from "@/components/ui/button";
import { claimSessionTab, type SessionTabState } from "@/lib/sessionTab";

/** Block the duplicate before mounting protected screens, timers or the inactivity monitor. */
export function SessionTabGuard({ sessionKey, children }: { sessionKey: string | null; children: ReactNode }) {
  const { pathname } = useLocation();
  const [snapshot, setSnapshot] = useState<{ key: string | null; state: SessionTabState }>({ key: sessionKey, state: "checking" });
  const [attempt, setAttempt] = useState(0);
  const state = sessionKey === null ? "owner" : snapshot.key === sessionKey ? snapshot.state : "checking";
  const setState = (next: SessionTabState) => setSnapshot({ key: sessionKey, state: next });
  useEffect(() => {
    if (!sessionKey) return;
    return claimSessionTab(navigator.locks, sessionKey, next => setSnapshot({ key: sessionKey, state: next }));
  }, [sessionKey, attempt]);
  // Preserve an in-flight login/recovery form while claiming its new session. Protected
  // routes are never mounted during checking, and blocked tabs mount no idle monitor.
  const authForm = pathname === "/auth" || pathname === "/admin";
  const showChildren = state === "owner" || (state === "checking" && authForm);
  const checking = state === "checking";
  const blocked = state === "blocked";
  return (
    <>
      {sessionKey && state === "owner" && <SessionIdleGuard key={sessionKey} sessionKey={sessionKey} />}
      <div style={{ display: checking ? "none" : "contents" }}>{showChildren && children}</div>
      {state !== "owner" && <main className="grid min-h-svh place-items-center bg-background px-6 py-10 text-foreground" data-session-tab-state={state}>
      <section className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-6 shadow-lg sm:p-8" aria-labelledby="session-tab-title">
        <NorteBrand />
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
          {blocked ? <Copy /> : <ShieldCheck />}
        </div>
        <div className="space-y-3" role="status" aria-live="polite">
          <h1 id="session-tab-title" className="text-2xl font-bold">
            {checking ? "Verificando sua sessão…" : blocked ? "Sua sessão já está aberta em outra aba" : "Não foi possível verificar suas abas"}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {checking ? "Aguarde enquanto confirmamos seu acesso nesta janela."
              : blocked ? "Continue na aba que já está em uso. Para usar esta, feche a outra aba e toque em Tentar novamente. Sua conta permanece conectada."
              : "Tente novamente. Se o problema continuar, abra a plataforma em uma versão atualizada do navegador."}
          </p>
        </div>
        {!checking && <Button className="w-full" onClick={() => { setState("checking"); setAttempt(value => value + 1); }}>Tentar novamente</Button>}
      </section>
    </main>}
    </>
  );
}
