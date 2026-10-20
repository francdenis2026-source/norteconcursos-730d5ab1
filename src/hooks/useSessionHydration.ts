// Antes de reabrir um treino ou prova, traz da conta a sessão mais recente (outro aparelho, outra aba antiga).
// `ready` vira true quando a conferência termina, com ou sem sucesso: sem rede ou sem a tabela, vale o navegador.
import * as React from "react";
import { hydrateSnapshots } from "@/lib/sessionSnapshots";
import { accountSnapshotPort } from "@/lib/sessionSnapshotsAccount";

const done = new Map<string, Promise<void>>();

/** Espera no máximo 8 s pela conta: sem rede, a tela segue com o que o navegador guardou. */
const HYDRATION_TIMEOUT_MS = 8000;

export function hydrateOnce(userId: string): Promise<void> {
  let promise = done.get(userId);
  if (!promise) {
    const work = hydrateSnapshots(localStorage, userId, accountSnapshotPort(userId)).then(
      () => undefined,
      () => undefined,
    );
    const limit = new Promise<void>((resolve) => setTimeout(resolve, HYDRATION_TIMEOUT_MS));
    promise = Promise.race([work, limit]);
    done.set(userId, promise);
  }
  return promise;
}

export function useSessionHydration(userId: string | undefined, enabled = true) {
  const [readyFor, setReadyFor] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!enabled || !userId || userId === "demo-user") return;
    let active = true;
    void hydrateOnce(userId).then(() => {
      if (active) setReadyFor(userId);
    });
    return () => {
      active = false;
    };
  }, [userId, enabled]);
  // Visitante ou demonstração não têm conta para consultar.
  return !enabled || !userId || userId === "demo-user" ? true : readyFor === userId;
}
