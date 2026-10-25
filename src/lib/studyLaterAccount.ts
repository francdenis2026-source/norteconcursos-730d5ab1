// Porta do "Estudar depois" para o banco. Fica separada de studyLaterSync.ts para que a lógica de
// mesclagem seja testável sem o cliente do Supabase.
import { supabase } from "@/integrations/supabase/client";
import type { StudyLaterPort, StudyLaterRow } from "./studyLaterSync";

type Result = { data?: unknown; error: unknown };
// A tabela ainda não consta nos tipos gerados do Supabase.
const table = () =>
  supabase.from("study_later_items" as never) as unknown as {
    select(columns: string): { eq(column: string, value: string): PromiseLike<Result> };
    upsert(rows: unknown, options: { onConflict: string }): PromiseLike<Result>;
    delete(): {
      eq(
        column: string,
        value: string,
      ): {
        eq(
          column: string,
          value: string,
        ): { eq(column: string, value: string): PromiseLike<Result> };
      };
    };
  };

export function accountStudyLaterPort(userId: string): StudyLaterPort {
  return {
    async fetchRows() {
      const { data, error } = await table()
        .select("user_id,question_table,question_id,reason,payload,notes,reviewed,saved_at")
        .eq("user_id", userId);
      if (error) throw error;
      return (data as StudyLaterRow[] | null) ?? [];
    },
    async upsertRows(rows) {
      const { error } = await table().upsert(
        rows.map((row) => ({ ...row, updated_at: new Date().toISOString() })),
        { onConflict: "user_id,question_table,question_id" },
      );
      if (error) throw error;
    },
    async deleteRow(questionTable, questionId) {
      const { error } = await table()
        .delete()
        .eq("user_id", userId)
        .eq("question_table", questionTable)
        .eq("question_id", questionId);
      if (error) throw error;
    },
  };
}
