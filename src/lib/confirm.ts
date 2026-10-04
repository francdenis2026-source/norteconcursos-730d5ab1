export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** "danger" (padrão) para ações destrutivas; "default" para confirmações comuns. */
  tone?: "danger" | "default";
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
