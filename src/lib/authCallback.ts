import type { EmailOtpType, Session, SupabaseClient } from "@supabase/supabase-js";

export type CallbackError = "expired" | "invalid" | "failed";
export type EmailAuthCallback = {
  present: boolean;
  recovery: boolean;
  error?: CallbackError;
  tokenHash?: string;
  type?: EmailOtpType;
};

/** Capture before the SDK removes the fragment or the router changes the URL. */
export function readEmailAuthCallback(url: string): EmailAuthCallback {
  const parsed = new URL(url);
  const query = parsed.searchParams;
  const hash = new URLSearchParams(parsed.hash.slice(1));
  const value = (key: string) => hash.get(key) ?? query.get(key);
  const type = value("type");
  const recovery = type === "recovery" || query.get("recovery") === "true";
  if (value("error") || value("error_code")) {
    return { present: true, recovery, error: value("error_code") === "otp_expired" ? "expired" : "invalid" };
  }
  const tokenHash = value("token_hash");
  if (tokenHash) {
    if (!["signup", "email", "recovery", "invite", "email_change"].includes(type ?? ""))
      return { present: true, recovery, error: "invalid" };
    return { present: true, recovery, tokenHash, type: type as EmailOtpType };
  }
  return { present: !!(value("access_token") || query.get("code")), recovery };
}

export const callbackErrorMessage = (error: CallbackError) => error === "expired"
  ? "Este link expirou ou já foi usado. Se você já confirmou o e-mail, entre com sua senha. Caso contrário, reenvie a confirmação pela tela de entrada."
  : error === "invalid"
    ? "Não foi possível validar este link. Abra o e-mail mais recente ou entre com sua senha se a conta já estiver confirmada."
    : "Não foi possível concluir o acesso. Verifique sua conexão e tente novamente ou entre com sua senha.";

/** The SDK handles implicit tokens and PKCE codes. Only custom token_hash links need verifyOtp. */
export async function finishEmailAuthCallback(
  auth: Pick<SupabaseClient["auth"], "getSession" | "verifyOtp">,
  callback: EmailAuthCallback,
): Promise<{ session: Session | null; error: CallbackError | null; recovery: boolean }> {
  if (callback.error) return { session: null, error: callback.error, recovery: callback.recovery };
  try {
    const result = callback.tokenHash && callback.type
      ? await auth.verifyOtp({ token_hash: callback.tokenHash, type: callback.type })
      : await auth.getSession();
    const error = result.error
      ? (result.error.code === "otp_expired" ? "expired" : "failed")
      : callback.present && !result.data.session ? "invalid" : null;
    return { session: error ? null : result.data.session, error, recovery: callback.recovery };
  } catch {
    return { session: null, error: "failed", recovery: callback.recovery };
  }
}

/** A single-use verification is shared until navigation; later reads use the current session. */
export function createEmailAuthCallbackFlow(
  auth: Pick<SupabaseClient["auth"], "getSession" | "verifyOtp">,
  callback: EmailAuthCallback,
) {
  let handled = false;
  let completion: ReturnType<typeof finishEmailAuthCallback> | undefined;
  const hasPending = () => callback.present && !handled;
  return {
    hasPending,
    recoveryPending: () => hasPending() && callback.recovery,
    markHandled: () => { handled = true; },
    complete: () => hasPending()
      ? completion ??= finishEmailAuthCallback(auth, callback)
      : finishEmailAuthCallback(auth, { present: false, recovery: false }),
  };
}
