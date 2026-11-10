import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { LockedState } from "@/components/dashboard/PageHero";
import { useAuthStatus } from "@/hooks/useDashboard";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { canonicalBoard, canonicalCareerName, canonicalSubject } from "@/lib/subjects";
import { unifiedCareer, type BancaQuestion } from "@/lib/bancaProfile";
import { IdecanIntelligenceWorkspace } from "@/components/dashboard/IdecanIntelligenceWorkspace";

export const Route = createFileRoute("/dashboard/inteligencia-idecan")({
  component: InteligenciaIdecan,
  head: () => ({
    meta: [
      { title: "Inteligência IDECAN | Norte Concursos" },
      {
        name: "description",
        content:
          "Análise estatística real das provas da IDECAN no acervo, com foco nas provas de Polícia Civil para preparar a PC-AC.",
      },
    ],
  }),
});

type Row = Record<string, unknown>;
type Page = PromiseLike<{ data: Row[] | null; error: unknown }>;

function rowToQuestion(r: Row): BancaQuestion | null {
  const board = canonicalBoard(String(r["board"] ?? ""));
  if (!board || board === "Não informada") return null;
  return {
    board,
    contest: String(r["contest_name"] ?? ""),
    career: unifiedCareer(
      canonicalCareerName(String(r["career_name"] ?? "")),
      String(r["contest_name"] ?? ""),
    ),
    rawCareer: String(r["career_name"] ?? ""),
    year: Number(r["exam_year"]),
    subject: canonicalSubject(String(r["subject"] ?? "")),
    topic: r["tested_topic"] ? String(r["tested_topic"]) : null,
    answer: String(r["official_answer"] ?? ""),
    item: r["item_number"] == null ? null : Number(r["item_number"]),
    text: String(r["stem"] ?? ""),
  };
}

async function loadIdecanQuestions(): Promise<BancaQuestion[]> {
  const rows = await fetchAllRows<Row>(
    (from, to) =>
      supabase
        .from("board_exam_questions")
        .select(
          "board,contest_name,career_name,exam_year,subject,tested_topic,official_answer,item_number,stem",
        )
        .ilike("board", "%IDECAN%")
        .eq("content_status", "active")
        .neq("official_answer", "X")
        .order("id")
        .range(from, to) as unknown as Page,
  );
  const out: BancaQuestion[] = [];
  for (const r of rows) {
    const q = rowToQuestion(r);
    if (q) out.push(q);
  }
  return out;
}

function InteligenciaIdecan() {
  const { user, isLoading: authLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const query = useQuery({ queryKey: ["inteligencia-idecan"], enabled: real, staleTime: 10 * 60_000, queryFn: loadIdecanQuestions });
  if (!authLoading && !real) return <LockedState image="field-map" title="Inteligência IDECAN" description="Entre na sua conta para ver a análise real das provas da IDECAN no acervo." />;
  return <IdecanIntelligenceWorkspace rows={query.data ?? []} loading={authLoading || query.isLoading} error={query.isError} onRetry={() => void query.refetch()} />;
}
