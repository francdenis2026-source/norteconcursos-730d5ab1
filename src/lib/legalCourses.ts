import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LegalProgress } from "./legalLearning";

export type LegalCourse = {
  id: string; slug: string; title: string; source_url: string; source_sha256: string;
  checked_at: string; material_slug: string; syllabus_topic_id: string;
  overview: {
    intro: string; contest: string; objectives: string[]; alerts: string;
    editorial_scope: string; current_units: number; excluded_units: number;
    chapters: { title: string; count: number }[];
    jurisprudence: { title: string; explanation: string; url: string; articles: string[] }[];
  };
};
export type LegalUnit = {
  id: string; course_id: string; unit_key: string; label: string; chapter: string;
  position: number; body_text: string; content_sha256: string;
  content_status: "current" | "excluded";
  recall: { prompts: string[]; checklist: string[]; figures?: { title: string; url: string }[] };
};

export function useLegalCourses(userId?: string) {
  return useQuery({ queryKey: ["legal-courses", userId], enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase.from("legal_courses").select("*").eq("status", "active").order("title");
      if (error) throw error;
      return (data ?? []) as LegalCourse[];
    }, staleTime: 5 * 60 * 1000 });
}
export function useLegalUnits(courseId?: string, userId?: string) {
  return useQuery({ queryKey: ["legal-units", courseId, userId], enabled: !!courseId && !!userId,
    queryFn: async () => {
      const rows: LegalUnit[] = [];
      for (let start = 0; ; start += 200) {
        const { data, error } = await supabase.from("legal_course_units").select("*").eq("course_id", courseId!).order("position").range(start, start + 199);
        if (error) throw error;
        rows.push(...(data ?? []) as LegalUnit[]);
        if (!data?.length) break;
        // Continue even if a server cap yields less than the requested page.
        if (data.length < 200) {
          const { count, error: countError } = await supabase.from("legal_course_units").select("id", { count: "exact", head: true }).eq("course_id", courseId!);
          if (countError) throw countError;
          if (rows.length >= (count ?? Infinity)) break;
          start -= 200 - data.length;
        }
      }
      return rows;
    }, staleTime: 5 * 60 * 1000 });
}
export function useLegalProgress(userId?: string) {
  return useQuery({ queryKey: ["legal-progress", userId], enabled: !!userId,
    queryFn: async () => {
      const rows: LegalProgress[] = [];
      for (let start = 0; ; ) {
        const { data, error } = await supabase.from("legal_course_progress").select("unit_id,read_at,recall_attempts,review_step,last_rating,notes,due_at").eq("user_id", userId!).order("unit_id").range(start, start + 199);
        if (error) throw error;
        if (!data?.length) break;
        rows.push(...data as LegalProgress[]); start += data.length;
      }
      return rows;
    } });
}
