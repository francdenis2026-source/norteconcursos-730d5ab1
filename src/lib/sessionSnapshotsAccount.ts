// Porta do espelho de sessões para o banco; a lógica (mesclagem, envio com espera) fica em sessionSnapshots.ts.
import { supabase } from "@/integrations/supabase/client";
import { createSnapshotUploader, type SnapshotPort, type SnapshotRow } from "./sessionSnapshots";

type Result = { data?: unknown; error: unknown };
// A tabela ainda não consta nos tipos gerados do Supabase.
const table = () =>
  supabase.from("study_session_snapshots" as never) as unknown as {
    select(columns: string): { eq(column: string, value: string): PromiseLike<Result> };
    upsert(row: unknown, options: { onConflict: string }): PromiseLike<Result>;
  };

export function accountSnapshotPort(userId: string): SnapshotPort {
  return {
    async fetchRows() {
      const { data, error } = await table()
        .select("kind,scope,payload,closed,client_saved_at")
        .eq("user_id", userId);
      if (error) throw error;
      return (data as SnapshotRow[] | null) ?? [];
    },
    async upsertRow(row) {
      const { error } = await table().upsert(
        { ...row, user_id: userId },
        { onConflict: "user_id,kind,scope" },
      );
      if (error) throw error;
    },
  };
}

const uploaders = new Map<string, ReturnType<typeof createSnapshotUploader>>();
/** Um enviador por usuário e por página: junta as gravações da tela em poucas idas ao banco. */
export function snapshotUploader(userId: string) {
  let uploader = uploaders.get(userId);
  if (!uploader) {
    uploader = createSnapshotUploader(accountSnapshotPort(userId));
    uploaders.set(userId, uploader);
  }
  return uploader;
}
