import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type WorkedCase = {
  id: string;
  title: string;
  scenario: string;
  question: string;
  steps: string[];
  conclusion: string;
  variation: { scenario: string; answer: string };
  pitfall: string;
  articles: string[];
};
export type LedgerEntry = { label: string; value: number };
export type StudyEnrichment = {
  material_slug: string;
  checked_at: string;
  content: {
    illustrations: {
      kind: "truth" | "venn" | "probability" | "flow" | "ledger" | "matrix";
      title: string;
      caption: string;
      nodes?: string[];
      account?: string;
      nature?: "devedora" | "credora";
      debits?: LedgerEntry[];
      credits?: LedgerEntry[];
      cells?: string[];
      answer?: string;
    }[];
    cases: WorkedCase[];
  };
  sources: { title: string; url: string }[];
};
export function useStudyEnrichment(slug: string, enabled: boolean) {
  return useQuery({
    queryKey: ["study-enrichment", slug],
    enabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_material_enrichments")
        .select("material_slug,checked_at,content,sources")
        .eq("material_slug", slug)
        .eq("status", "active")
        .order("checked_at", { ascending: false })
        .limit(1);
      if (error) throw error;
      return (data?.[0] as StudyEnrichment | undefined) ?? null;
    },
    staleTime: 5 * 60 * 1000,
  });
}
