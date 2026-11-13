// Cache do acervo de questões no próprio navegador (IndexedDB).
// Evita baixar o acervo inteiro a cada visita ou recarregamento. O conteúdo é limpo quando o banco
// muda (realtime), quando o aluno pede recarga e quando sai da conta, para não deixar dados pessoais
// no aparelho. Falhas de armazenamento nunca impedem o treino: sem cache, carrega-se do banco.

const DB_NAME = "norte-catalogo";
const STORE = "acervo";
const VERSION = 1;
export const CATALOG_CACHE_TTL_MS = 6 * 60 * 60_000;

type Entry<T> = { savedAt: number; value: T };

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof indexedDB === "undefined") return resolve(null);
    try {
      const request = indexedDB.open(DB_NAME, VERSION);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T | undefined> {
  const db = await openDb();
  if (!db) return undefined;
  return new Promise((resolve) => {
    try {
      const transaction = db.transaction(STORE, mode);
      const request = run(transaction.objectStore(STORE));
      transaction.oncomplete = () => {
        db.close();
        resolve(request.result);
      };
      transaction.onerror = transaction.onabort = () => {
        db.close();
        resolve(undefined);
      };
    } catch {
      db.close();
      resolve(undefined);
    }
  });
}

export async function readCatalogCache<T>(userId: string): Promise<T | undefined> {
  const entry = (await withStore("readonly", (store) => store.get(userId))) as
    | Entry<T>
    | undefined;
  if (!entry || Date.now() - entry.savedAt > CATALOG_CACHE_TTL_MS) return undefined;
  return entry.value;
}

export async function writeCatalogCache<T>(userId: string, value: T): Promise<void> {
  const entry: Entry<T> = { savedAt: Date.now(), value };
  await withStore("readwrite", (store) => store.put(entry, userId));
}

/** Apaga todo o cache do aparelho (troca de banco, recarga manual ou saída da conta). */
export async function clearCatalogCache(): Promise<void> {
  await withStore("readwrite", (store) => store.clear());
}

/** Lê do cache do aparelho; se não houver (ou estiver vencido), carrega e guarda para a próxima visita. */
export async function withCatalogCache<T>(key: string, load: () => Promise<T>): Promise<T> {
  const cached = await readCatalogCache<T>(key);
  if (cached !== undefined) return cached;
  const fresh = await load();
  void writeCatalogCache(key, fresh);
  return fresh;
}
