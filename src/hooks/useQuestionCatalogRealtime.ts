import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const WATCHED_TABLES = [
  "official_exam_questions",
  "board_exam_questions",
  "curated_question_catalog",
  "question_support_texts",
] as const;

/**
 * O acervo, o Treinador, os Simulados, o painel administrativo e o selo da home contam questões
 * cada um na sua própria consulta, com seu próprio cache (vários minutos, já que isto invalida na
 * hora). Sem isto, inserir, editar ou remover uma questão só aparecia em cada tela quando o cache
 * dela expirasse por conta própria. Uma única assinatura realtime nestas tabelas invalida todos os
 * caches assim que o banco muda, então os números ficam sempre consistentes entre si.
 */
export function useQuestionCatalogRealtime(enabled: boolean) {
  const queryClient = useQueryClient();
  React.useEffect(() => {
    if (!enabled) return;
    const invalidate = () => {
      void queryClient.invalidateQueries({ queryKey: ["question-catalog-view"] });
      void queryClient.invalidateQueries({ queryKey: ["question-catalog-metadata"] });
      void queryClient.invalidateQueries({ queryKey: ["question-catalog"] });
      void queryClient.invalidateQueries({ queryKey: ["official-year-questions"] });
      void queryClient.invalidateQueries({ queryKey: ["platform-question-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["public-question-summary"] });
      void queryClient.invalidateQueries({ queryKey: ["simulator-catalog"] });
    };
    let channel = supabase.channel("question-catalog-live");
    for (const table of WATCHED_TABLES)
      channel = channel.on("postgres_changes", { event: "*", schema: "public", table }, invalidate);
    channel.subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [enabled, queryClient]);
}
