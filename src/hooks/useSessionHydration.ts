// Antes de reabrir um treino ou prova, traz da conta a sessão mais recente (outro aparelho, outra aba antiga).
// `ready` vira true quando a conferência termina, com ou sem sucesso: sem rede ou sem a tabela, vale o navegador.
import * as React from "react";
import { hydrateSnapshots } from "@/lib/sessionSnapshots";
import { accountSnapshotPort } from "@/lib/sessionSnapshotsAccount";

const done = new Map<string, Promise<void>>();

export function hydrateOnce(userId: string): Promise<void> {
  let promise = done.get(userId);
  if (!promise) {
    promise = hydrateSnapshots(localStorage, userId, accountSnapshotPort(userId)).then(
      () => undefined,
      () => undefined,
    );
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
