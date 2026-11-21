export type SessionTabState = "checking" | "owner" | "blocked" | "unavailable";

/** Quantas abas autenticadas o mesmo navegador (origem) pode manter ao mesmo tempo. */
export const SESSION_TAB_SLOTS = 2;

const slotName = (slot: number) => `norte:authenticated-tab:${slot}`;

/** Até SESSION_TAB_SLOTS abas autenticadas por navegador, mesmo com logins independentes.
 * Cada aba disputa um slot livre sem fila (ifAvailable). Uma aba bloqueada nunca fica
 * esperando para tomar o slot depois; ela só é liberada quando o usuário tenta de novo.
 * Não há token copiado, troca de token nem heartbeat no servidor. */
export function claimSessionTab(
  locks: Pick<LockManager, "request"> | undefined,
  publish: (state: SessionTabState) => void,
  slots: number = SESSION_TAB_SLOTS,
): () => void {
  let disposed = false;
  let release: (() => void) | undefined;
  publish("checking");
  if (!locks) {
    publish("unavailable");
    return () => { disposed = true; };
  }
  void (async () => {
    for (let slot = 0; slot < slots; slot++) {
      if (disposed) return;
      let owned = false;
      await locks.request(slotName(slot), { ifAvailable: true }, async lock => {
        if (disposed || !lock) return;
        owned = true;
        const held = new Promise<void>(resolve => { release = resolve; });
        publish("owner");
        await held;
      });
      if (owned) return;
    }
    if (!disposed) publish("blocked");
  })().catch(() => {
    if (!disposed) publish("unavailable");
  });
  return () => {
    disposed = true;
    release?.();
  };
}
