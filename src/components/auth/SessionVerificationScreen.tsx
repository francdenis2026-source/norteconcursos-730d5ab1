import { NorteBrand } from "@/components/brand/NorteBrand";
import { ShieldCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import type { AccountSessionState } from "@/lib/accountSession";
import "@/styles/session-access.css";

export function SessionVerificationScreen({ state, onRetry }: { state: AccountSessionState; onRetry: () => void }) {
  return <main className="session-access session-access--verification" aria-labelledby="device-session-title">
      <div className="session-access__scene" aria-hidden="true" />
      <div className="session-access__layout">
        <aside className="session-access__editorial" aria-hidden="true">
          <span className="session-access__eyebrow">Norte Concursos · Carreiras policiais</span>
          <div className="session-access__signature">
            <span className="session-access__rule" />
            <p>Sua preparação,<br />em boas mãos.</p>
            <span>Foco na conquista. Segurança no acesso.</span>
          </div>
        </aside>
        <section className="session-access__card">
          <NorteBrand className="session-access__brand" />
          <div className="session-access__status session-access__verification-status">
            {state === "checking" ? <LoaderCircle className="session-access__spinner" size={16} aria-hidden="true" /> : <ShieldCheck size={16} aria-hidden="true" />}
            <span>Acesso protegido</span>
          </div>
          <div className="session-access__message" role="status" aria-live="polite">
            <h1 id="device-session-title">{state === "unavailable" ? "Não foi possível confirmar seu acesso" : state === "revoked" ? "Sua conta foi conectada em outro dispositivo" : "Confirmando sua sessão…"}</h1>
            <p>{state === "unavailable" ? "Verifique sua conexão. Sua preparação será liberada assim que a sessão for validada." : "Sua conta permite um dispositivo por vez para proteger suas respostas e seu progresso."}</p>
          </div>
          {state === "unavailable" && <Button className="session-access__retry" onClick={onRetry}>Tentar novamente</Button>}
          <Link to="/" className="session-access__footer"><ShieldCheck size={13} aria-hidden="true" /> Voltar à página inicial</Link>
        </section>
      </div>
    </main>;
}
