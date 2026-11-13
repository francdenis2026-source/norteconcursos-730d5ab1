import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { canonicalBoard } from "@/lib/subjects";
import type { IdecanGroup } from "@/lib/topicIncidence";

type Row = Record<string, unknown>;
type Page = PromiseLike<{ data: Row[] | null; error: unknown }>;

const toGroup = (r: Row): IdecanGroup | null => {
  const year = Number(r["exam_year"]);
  const n = Number(r["n"] ?? 1);
  if (!Number.isFinite(year) || !(n > 0)) return null;
  return {
    contest: String(r["contest_name"] ?? ""),
    career: String(r["career_name"] ?? ""),
    year,
    subject: String(r["subject"] ?? ""),
    topic: r["tested_topic"] ? String(r["tested_topic"]) : null,
    n,
  };
};

/** Questões ativas da IDECAN por prova, matéria e assunto. Uma linha por grupo, não por questão. */
export async function loadIdecanTopicGroups(): Promise<IdecanGroup[]> {
  // Caminho leve: o banco já devolve os grupos.
  const { data, error } = await supabase.rpc("get_idecan_topic_groups" as never);
  if (!error && Array.isArray(data)) {
    return (data as Row[]).map(toGroup).filter((g): g is IdecanGroup => g !== null);
  }
  // Antes de a função existir no banco: lê só as colunas necessárias e agrupa aqui.
  const rows = await fetchAllRows<Row>(
    (from, to) =>
      supabase
        .from("board_exam_questions")
        .select("board,contest_name,career_name,exam_year,subject,tested_topic")
        .ilike("board", "%IDECAN%")
        .eq("content_status", "active")
        .neq("official_answer", "X")
        .order("id")
        .range(from, to) as unknown as Page,
  );
  const grouped = new Map<string, IdecanGroup>();
  for (const r of rows) {
    const board = canonicalBoard(String(r["board"] ?? ""));
    if (!board || board === "Não informada") continue;
    const g = toGroup({ ...r, n: 1 });
    if (!g) continue;
    const key = `${g.contest}|${g.career}|${g.year}|${g.subject}|${g.topic ?? ""}`;
    const current = grouped.get(key);
    if (current) current.n += 1;
    else grouped.set(key, g);
  }
  return [...grouped.values()];
}
