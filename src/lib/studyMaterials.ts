import { userStorageKey } from "@/lib/userStorage";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LegalReview } from "@/components/library/LegalUpdateNotice";
import type { LibrarySearchContent } from "./librarySearch";

export type StudyMaterialStatus = "under_review" | "active" | "obsolete" | "archived";

export type StudyMaterialSource = { title?: string; url?: string };

export type StudyMaterialSummary = {
  id: string;
  slug: string;
  discipline: string;
  topic_label: string;
  sort_order: number;
  title: string;
  summary: string | null;
  contest_name: string | null;
  syllabus_topic_order: number | null;
  law_version_checked_at: string | null;
  content_status: StudyMaterialStatus;
  updated_at?: string;
  law_course_slug?: string | null;
};

export type Flashcard = { f: string; b: string };
export type QuizItem = { q: string; a: boolean; why: string };

export type StudyMaterial = StudyMaterialSummary & {
  legal_review?: LegalReview | null;
  flashcards: Flashcard[] | null;
  quiz: QuizItem[] | null;
  body_md: string;
  source_note: string;
  legal_basis: StudyMaterialSource[];
  reviewed_at: string | null;
  updated_at: string;
};

const SUMMARY_COLUMNS =
  "id,slug,discipline,topic_label,sort_order,title,summary,contest_name,syllabus_topic_order,law_version_checked_at,content_status,updated_at,law_course_slug:legal_review->>course_slug";

export const STATUS_LABEL: Record<StudyMaterialStatus, string> = {
  under_review: "Em revisão",
  active: "Publicado",
  obsolete: "Obsoleto",
  archived: "Arquivado",
};

/** Active materials only (RLS also guarantees this for students). */
export async function fetchStudyMaterialList(): Promise<StudyMaterialSummary[]> {
  const { data, error } = await supabase
    .from("study_materials")
    .select(SUMMARY_COLUMNS)
    .eq("content_status", "active")
    .order("discipline")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as StudyMaterialSummary[];
}

export function useStudyMaterialList(enabled: boolean) {
  return useQuery({
    queryKey: ["study-materials", "list"],
    enabled,
    staleTime: 5 * 60 * 1000,
    queryFn: fetchStudyMaterialList,
  });
}

/** Loaded only when a student starts searching; RLS and active status still apply. */
export async function fetchLibrarySearchContent(): Promise<LibrarySearchContent[]> {
  const rows: LibrarySearchContent[] = [];
  for (let offset = 0; ; ) {
    const { data, error } = await supabase.from("study_materials").select("id,body_md,legal_basis")
      .eq("content_status", "active").order("id").range(offset, offset + 199);
    if (error) throw error;
    if (!data?.length) return rows;
    rows.push(...data as LibrarySearchContent[]);
    offset += data.length;
  }
}
export function useLibrarySearchContent(enabled: boolean, userId?: string) {
  return useQuery({queryKey:["library-search-content",userId],enabled:enabled&&!!userId,queryFn:fetchLibrarySearchContent,staleTime:5*60*1000});
}

export function useStudyMaterial(slug: string, enabled: boolean) {
  return useQuery({
    queryKey: ["study-materials", "detail", slug],
    enabled,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<StudyMaterial | null> => {
      const { data, error } = await supabase
        .from("study_materials")
        .select(
          `${SUMMARY_COLUMNS},flashcards,quiz,body_md,source_note,legal_basis,reviewed_at,legal_review`,
        )
        .eq("slug", slug)
        .eq("content_status", "active")
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as StudyMaterial | null;
    },
  });
}

export function groupByDiscipline(items: StudyMaterialSummary[]) {
  const map = new Map<string, StudyMaterialSummary[]>();
  for (const item of items) {
    const list = map.get(item.discipline) ?? [];
    list.push(item);
    map.set(item.discipline, list);
  }
  return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));
}

/** Rough reading time at ~200 words/minute, never below 1 minute. */
export function readingMinutes(markdown: string) {
  return Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 200));
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Materiais de uma matéria agrupados pelo tópico do edital a que respondem (syllabus_topic_order),
 * em ordem de estudo. Sem ordem de edital, tudo cai em um único grupo (order = null).
 */
export function groupByEditalTopic(items: StudyMaterialSummary[]) {
  const map = new Map<number | null, StudyMaterialSummary[]>();
  for (const item of items) {
    const key = item.syllabus_topic_order ?? null;
    map.set(key, [...(map.get(key) ?? []), item]);
  }
  return Array.from(map.entries())
    .sort((a, b) => (a[0] ?? 9999) - (b[0] ?? 9999))
    .map(([order, list]) => ({
      order,
      items: [...list].sort((a, b) => a.sort_order - b.sort_order),
    }));
}

const READ_KEY = "norte-library-read";

/** Materiais já abertos neste navegador (conveniência local, não é dado do aluno no servidor). */
export function readSlugs(): Set<string> {
  try {
    const raw = localStorage.getItem(userStorageKey(READ_KEY));
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return new Set(
      Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [],
    );
  } catch {
    return new Set();
  }
}

export function markSlugRead(slug: string) {
  try {
    const current = readSlugs();
    if (current.has(slug)) return;
    current.add(slug);
    localStorage.setItem(userStorageKey(READ_KEY), JSON.stringify([...current]));
  } catch {
    // sem armazenamento disponível: o marcador de lido simplesmente não persiste
  }
}
