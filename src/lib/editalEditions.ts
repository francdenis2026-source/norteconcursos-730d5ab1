import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "./catalog";
import type { EditalEdition } from "./editalCatalog";

export function fetchEditalEditions(): Promise<EditalEdition[]> {
  return fetchAllRows<EditalEdition>((from, to) =>
    supabase
      .from("syllabus_editions")
      .select(
        "id,contest_name,role_name,contest_year,exam_board,status,source:content_sources(title,url,source_type,status)",
      )
      .in("status", ["active", "archived"])
      .order("id")
      .range(from, to)
      .returns<EditalEdition[]>(),
  );
}
