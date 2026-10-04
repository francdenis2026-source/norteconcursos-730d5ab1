export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** "danger" (padrão) para ações destrutivas; "default" para confirmações comuns. */
  tone?: "danger" | "default" | "info";
  /** Só o botão de confirmar (usado nos avisos). */
  hideCancel?: boolean;
}

type Host = ((opts: ConfirmOptions) => Promise<boolean>) | null;
let host: Host = null;

export function registerConfirmHost(h: Host) {
  host = h;
}

/**
 * Confirmação em caixa própria da plataforma. Se a caixa ainda não estiver montada,
 * NÃO executa a ação (mais seguro que confirmar sozinho).
 */
export function confirmDialog(opts: ConfirmOptions): Promise<boolean> {
  return host ? host(opts) : Promise.resolve(false);
}

/** Aviso informativo com um botão só ("Entendi"). */
export async function alertDialog(opts: { title: string; message: string; okLabel?: string }): Promise<void> {
  await confirmDialog({ title: opts.title, message: opts.message, confirmLabel: opts.okLabel ?? "Entendi", tone: "info", hideCancel: true });
}
