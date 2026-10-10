import { Input } from "@/components/ui/input";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export function PasswordRecovery({
  hasSession,
  onBack,
  onComplete,
}: {
  hasSession: boolean;
  onBack: () => void;
  onComplete: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (hasSession) {
        if (password.length < 8 || password !== confirm)
          throw new Error("Use pelo menos 8 caracteres e repita a mesma senha.");
        const { error: failure } = await supabase.auth.updateUser({ password });
        if (failure) throw failure;
        onComplete();
      } else {
        const { error: failure } = await supabase.auth.resetPasswordForEmail(
          email.trim().toLowerCase(),
          { redirectTo: `${window.location.origin}/auth?recovery=true` },
        );
        if (failure) throw failure;
        setSent(true);
      }
    } catch {
      setError(
        "Não foi possível concluir. Confira os dados e tente novamente em alguns instantes.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="space-y-4">
      <div className="auth-heading">
        <h2>{hasSession ? "Defina sua nova senha" : "Recuperar acesso"}</h2>
        <p>
          {hasSession
            ? "Escolha uma senha com pelo menos 8 caracteres."
            : "Informe o e-mail cadastrado para receber um link seguro."}
        </p>
      </div>
      {sent ? (
        <p role="status">
          Se houver uma conta com este e-mail, você receberá o link de recuperação. Confira também o
          spam.
        </p>
      ) : (
        <form onSubmit={submit} className="auth-form">
          {hasSession ? (
            <>
              <label htmlFor="recovery-password">Nova senha</label>
              <Input
                className="institutional-input"
                id="recovery-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="recovery-confirm">Repita a nova senha</label>
              <Input
                className="institutional-input"
                id="recovery-confirm"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </>
          ) : (
            <>
              <label htmlFor="recovery-email">E-mail cadastrado</label>
              <Input
                className="institutional-input"
                id="recovery-email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}
          {error && <p role="alert">{error}</p>}
          <button className="btn-brass auth-submit" disabled={busy} type="submit">
            {busy ? "Aguarde…" : hasSession ? "Salvar nova senha" : "Enviar link de recuperação"}
          </button>
        </form>
      )}
      {!hasSession && (
        <p className="text-sm text-muted-foreground">
          Conta antiga vinculada somente ao CPF?{" "}
          <a href="/suporte" className="auth-link">
            Envie um pedido ao suporte
          </a>{" "}
          para regularizar o e-mail.
        </p>
      )}
      <button type="button" className="auth-link" onClick={onBack}>
        Voltar para entrar
      </button>
    </section>
  );
}
