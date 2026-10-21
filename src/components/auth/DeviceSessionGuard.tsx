import { useEffect, useState, type ReactNode } from "react";
import { supabase, clearPersistedAuthSession } from "@/integrations/supabase/client";
import { monitorDeviceSession, type DeviceSessionState } from "@/lib/deviceSession";
import { stopStudyClock } from "@/lib/studyClock";
import { useLocation } from "@tanstack/react-router";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { ShieldCheck, LoaderCircle } from "lucide-react";
import "@/styles/session-access.css";
import { Button } from "@/components/ui/button";

/** Server ownership is verified before mounting any authenticated workspace. */
export function DeviceSessionGuard({ sessionKey, children, isAdmin }: { sessionKey: string | null; children: ReactNode; isAdmin: boolean }) {
  const { pathname } = useLocation();
  const [pendingInstallation, setPendingInstallation] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<{ key: string; state: DeviceSessionState } | null>(null);
  useEffect(() => {
    if (!sessionKey) return;
    const monitor = monitorDeviceSession({
      verify: async () => {
        const { data, error } = await supabase.rpc("is_current_device_session").abortSignal(AbortSignal.timeout(8000));
        // Code may reach Lovable before the database migration. Preserve the
        // existing login until that migration is installed; never mistake a
        // network/permission error for this explicitly missing RPC.
        if (error?.code === "PGRST202" && error.message.includes("is_current_device_session")) {
          setPendingInstallation(sessionKey);
          return true;
        }
        if (!error) setPendingInstallation(null);
        if (error || typeof data !== "boolean") throw error ?? new Error("Session verification unavailable");
        return data;
      },
      publish: state => setSnapshot({ key: sessionKey, state }),
      replaced: () => {
        // Never flush stale progress and never globally sign out the new device.
        stopStudyClock();
        clearPersistedAuthSession();
        void supabase.auth.signOut({ scope: "local" }).catch(() => {});
        window.location.replace("/auth?reason=another-device");
      },
    });
    const check = () => { void monitor.check(); };
    // Subscribe first, then verify again after subscription to close the handshake gap.
    const channel = supabase.channel(`device-session:${sessionKey}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "active_user_sessions", filter: `user_id=eq.${sessionKey.split(":")[1]}` }, check)
      .subscribe(status => { if (status === "SUBSCRIBED") check(); });
    check();
    const timer = window.setInterval(check, 2000);
    window.addEventListener("online", check);
    window.addEventListener("focus", check);
    window.addEventListener("pageshow", check);
    document.addEventListener("visibilitychange", check);
    return () => {
      monitor.stop();
      window.clearInterval(timer);
      window.removeEventListener("online", check);
      window.removeEventListener("focus", check);
      window.removeEventListener("pageshow", check);
      document.removeEventListener("visibilitychange", check);
      void supabase.removeChannel(channel);
    };
  }, [sessionKey]);
  const state = snapshot?.key === sessionKey ? snapshot.state : "checking";
  const allowed = !sessionKey || state === "active";
  const preserveForm = state === "checking" && (pathname === "/auth" || pathname === "/admin");
  return <>
    {allowed && sessionKey && pendingInstallation === sessionKey && isAdmin && <div role="alert" className="border-b border-amber-500/30 bg-amber-950 px-4 py-2 text-sm text-amber-100">Proteção entre dispositivos pendente: aplique a migração de sessão única no Supabase.</div>}
    <div style={{ display: allowed ? "contents" : "none" }}>{(allowed || preserveForm) && children}</div>
    {!allowed && <main className="session-access session-access--verification" aria-labelledby="device-session-title">
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
            <h1 id="device-session-title">{state === "unavailable" ? "Não foi possível confirmar seu acesso" : state === "replaced" ? "Sua conta foi conectada em outro dispositivo" : "Confirmando sua sessão…"}</h1>
            <p>{state === "unavailable" ? "Verifique sua conexão. Sua preparação será liberada assim que a sessão for validada." : "Sua conta permite um dispositivo por vez para proteger suas respostas e seu progresso."}</p>
          </div>
          {state === "unavailable" && <Button className="session-access__retry" onClick={() => window.location.reload()}>Tentar novamente</Button>}
          <span className="session-access__footer"><ShieldCheck size={13} aria-hidden="true" /> Norte Concursos · Sua próxima conquista</span>
        </section>
      </div>
    </main>}
  </>;
}
