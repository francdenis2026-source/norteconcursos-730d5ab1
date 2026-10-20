// Sessão em andamento na CONTA (tabela study_session_snapshots), com o navegador como cópia local.
//
// O treinador e o simulado continuam gravando no navegador a cada resposta (é o que faz a atualização da
// página funcionar sem rede). Este módulo espelha esse registro na conta e, ao abrir em outro aparelho,
// traz de volta a sessão mais recente. Regras:
//  - vence sempre o registro com data de gravação mais nova (o banco também recusa trocar por um mais antigo);
//  - encerrar a sessão grava uma linha "closed" (sem apagar), para os outros aparelhos limparem a cópia;
//  - sem a tabela no banco, tudo segue só no navegador e nada quebra.
export type SnapshotKind = "trainer" | "simulator";
export type SnapshotScope = "trainer" | "contests" | "enem";

export interface SnapshotRow {
  kind: SnapshotKind;
  scope: SnapshotScope;
  payload: unknown | null;
  closed: boolean;
  client_saved_at: string;
}
export interface SnapshotPort {
  fetchRows(): Promise<SnapshotRow[]>;
  upsertRow(row: SnapshotRow): Promise<void>;
}
export interface SnapshotStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const SNAPSHOT_SLOTS: { kind: SnapshotKind; scope: SnapshotScope }[] = [
  { kind: "trainer", scope: "trainer" },
  { kind: "simulator", scope: "contests" },
  { kind: "simulator", scope: "enem" },
];

export const snapshotKey = (kind: SnapshotKind, userId: string, scope: SnapshotScope) =>
  kind === "trainer" ? `trainer-bookmark:${userId}` : `norte:simulator:v1:${userId}:${scope}`;
export const stampKey = (kind: SnapshotKind, userId: string, scope: SnapshotScope) =>
  `norte:session-stamp:${kind}:${userId}:${scope}`;

export const isMissingSnapshotTable = (error: unknown) =>
  /PGRST205|42P01|does not exist|schema cache/i.test(
    `${(error as { code?: string })?.code ?? ""} ${(error as { message?: string })?.message ?? ""}`,
  );

const parse = (raw: string | null): Record<string, unknown> | null => {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
};

/** Quando a cópia deste navegador foi gravada pela última vez (0 = sem registro). */
export function localSavedAt(
  store: SnapshotStore,
  kind: SnapshotKind,
  userId: string,
  scope: SnapshotScope,
): number {
  const stamped = Number(store.getItem(stampKey(kind, userId, scope)));
  if (Number.isFinite(stamped) && stamped > 0) return stamped;
  const value = parse(store.getItem(snapshotKey(kind, userId, scope)));
  const own = Number(kind === "trainer" ? value?.["savedAt"] : value?.["startedAt"]);
  return Number.isFinite(own) && own > 0 ? own : 0;
}

export function recordLocalSave(
  store: SnapshotStore,
  kind: SnapshotKind,
  userId: string,
  scope: SnapshotScope,
  at: number,
) {
  try {
    store.setItem(stampKey(kind, userId, scope), String(at));
  } catch {
    /* O carimbo é só um auxiliar: sem ele vale a data gravada dentro do próprio registro. */
  }
}

export const openRow = (
  kind: SnapshotKind,
  scope: SnapshotScope,
  payload: unknown,
  at: number,
): SnapshotRow => ({
  kind,
  scope,
  payload,
  closed: false,
  client_saved_at: new Date(at).toISOString(),
});
export const closedRow = (kind: SnapshotKind, scope: SnapshotScope, at: number): SnapshotRow => ({
  kind,
  scope,
  payload: null,
  closed: true,
  client_saved_at: new Date(at).toISOString(),
});

/**
 * Traz da conta a sessão mais nova e sobe o que só existe neste navegador.
 * `account` é false quando a tabela ainda não existe no banco.
 */
export async function hydrateSnapshots(
  store: SnapshotStore,
  userId: string,
  port: SnapshotPort,
): Promise<{ account: boolean; pulled: number; pushed: number }> {
  let rows: SnapshotRow[];
  try {
    rows = await port.fetchRows();
  } catch (error) {
    if (isMissingSnapshotTable(error)) return { account: false, pulled: 0, pushed: 0 };
    throw error;
  }
  let pulled = 0;
  let pushed = 0;
  for (const slot of SNAPSHOT_SLOTS) {
    const remote = rows.find((row) => row.kind === slot.kind && row.scope === slot.scope);
    const key = snapshotKey(slot.kind, userId, slot.scope);
    const localRaw = store.getItem(key);
    const localAt = localRaw ? localSavedAt(store, slot.kind, userId, slot.scope) : 0;
    const remoteAt = remote ? Date.parse(remote.client_saved_at) : 0;
    if (remote && remoteAt > localAt) {
      if (remote.closed) {
        // Sessão encerrada em outro aparelho depois da última gravação daqui.
        if (localRaw) {
          store.removeItem(key);
          store.removeItem(stampKey(slot.kind, userId, slot.scope));
        }
      } else if (remote.payload) {
        store.setItem(key, JSON.stringify(remote.payload));
        recordLocalSave(store, slot.kind, userId, slot.scope, remoteAt);
        pulled++;
      }
      continue;
    }
    // Só existe aqui (ou é mais novo aqui): sobe para a conta.
    const payload = parse(localRaw);
    if (payload && localAt > remoteAt) {
      await port.upsertRow(openRow(slot.kind, slot.scope, payload, localAt));
      pushed++;
    }
  }
  return { account: true, pulled, pushed };
}

/**
 * Envio com espera: a tela grava o marcador a cada renderização, mas a conta recebe no máximo
 * uma gravação por intervalo e só quando o conteúdo mudou. `close` envia na hora.
 */
export function createSnapshotUploader(
  port: SnapshotPort,
  options: {
    wait?: number;
    setTimer?: (fn: () => void, ms: number) => unknown;
    clearTimer?: (handle: unknown) => void;
    onError?: (error: unknown) => void;
  } = {},
) {
  const wait = options.wait ?? 2000;
  const setTimer = options.setTimer ?? ((fn, ms) => setTimeout(fn, ms));
  const clearTimer = options.clearTimer ?? ((handle) => clearTimeout(handle as never));
  const pending = new Map<string, { row: SnapshotRow; handle: unknown }>();
  const sent = new Map<string, string>();
  let available = true;
  const id = (kind: SnapshotKind, scope: SnapshotScope) => `${kind}:${scope}`;
  const send = async (row: SnapshotRow) => {
    if (!available) return;
    try {
      await port.upsertRow(row);
    } catch (error) {
      if (isMissingSnapshotTable(error)) available = false;
      else options.onError?.(error);
    }
  };
  return {
    /** `signature` identifica o conteúdo sem datas/relógios; igual ao último enviado = nada a fazer. */
    schedule(row: SnapshotRow, signature: string) {
      const key = id(row.kind, row.scope);
      if (sent.get(key) === signature && !pending.has(key)) return;
      const current = pending.get(key);
      if (current) clearTimer(current.handle);
      const handle = setTimer(() => {
        pending.delete(key);
        sent.set(key, signature);
        void send(row);
      }, wait);
      pending.set(key, { row, handle });
    },
    async close(kind: SnapshotKind, scope: SnapshotScope, at: number) {
      const key = id(kind, scope);
      const current = pending.get(key);
      if (current) clearTimer(current.handle);
      pending.delete(key);
      sent.delete(key);
      await send(closedRow(kind, scope, at));
    },
    async flush() {
      const rows = [...pending.values()];
      for (const { handle } of rows) clearTimer(handle);
      pending.clear();
      for (const { row } of rows) await send(row);
    },
    get available() {
      return available;
    },
  };
}
