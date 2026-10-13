import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { legalArticleSearchKey, legalSearchExcerpt, matchesLegalUnit } from "./legalCourseSearch";
import { normalizeLibrarySearch } from "./librarySearch";

export type ContentHit = {
  key: string; slug: string; lawTitle: string; chapter: string;
  unitKey: string; label: string; snippet: string; via: "texto" | "explicação";
};
const ACCENTED = /[aeiouc\u00e0-\u00ff]/gi;
/** Candidate filter only: exact normalized matching is checked after fetching. */
export const accentInsensitivePattern = (q: string) => `*${q.trim().replace(/[%*,()_]/g, " ").replace(/\s+/g, " ").replace(ACCENTED, "_")}*`;
export const snippetAround = (text: string, q: string, size = 220) => legalSearchExcerpt(text, q, size);
export type SearchUnitRow = {
  unit_key: string; label: string; chapter: string; body_text?: string;
  content_status: string; legal_courses: { slug: string; title: string; status: string } | null;
};
export type SearchExplanationRow = { simples: string; exemplo: string; status: string; legal_course_units: SearchUnitRow | null };

export function collectContentHits(q: string, units: SearchUnitRow[], explanations: SearchExplanationRow[], allowedSlugs?: readonly string[]): ContentHit[] {
  const hits = new Map<string, ContentHit>();
  const add = (u: SearchUnitRow | null, text: string, via: ContentHit["via"]) => {
    if (!u?.legal_courses || u.content_status !== "current" || u.legal_courses.status !== "active") return;
    if (allowedSlugs && !allowedSlugs.includes(u.legal_courses.slug)) return;
    const key = `${u.legal_courses.slug}:${u.unit_key}`;
    if (hits.has(key)) return;
    hits.set(key, { key, slug: u.legal_courses.slug, lawTitle: u.legal_courses.title.replace(/ — leitura atualizada$/, ""), chapter: u.chapter, unitKey: u.unit_key, label: u.label, snippet: snippetAround(text, q) || `${u.label} · ${u.chapter}`, via });
  };
  // Prefer the official text when the term occurs in both sources.
  for (const u of units) if (matchesLegalUnit({ ...u, body_text: u.body_text ?? "" }, q)) add(u, u.body_text ?? u.label, "texto");
  for (const e of explanations) {
    const u = e.legal_course_units;
    const text = `${e.simples}\n${e.exemplo}`;
    if (e.status === "published" && u && matchesLegalUnit({ ...u, body_text: text }, q)) add(u, text, "explicação");
  }
  return [...hits.values()];
}

export async function searchContent(q: string, allowedSlugs?: readonly string[], signal?: AbortSignal): Promise<ContentHit[]> {
  if ((normalizeLibrarySearch(q).length < 2 && !legalArticleSearchKey(q)) || allowedSlugs?.length === 0) return [];
  const articleKey = legalArticleSearchKey(q);
  const token = normalizeLibrarySearch(q).split(" ").sort((a,b) => b.length - a.length)[0]!;
  const pat = accentInsensitivePattern(token);
  async function pages(explanation: boolean) {
    const rows: unknown[] = [];
    for (let offset = 0; ;) {
      let request = explanation
        ? supabase.from("legal_unit_explanations").select("unit_id,simples,exemplo,status,legal_course_units!inner(unit_key,label,chapter,content_status,legal_courses!inner(slug,title,status))")
          .eq("status", "published").eq("legal_course_units.content_status", "current").eq("legal_course_units.legal_courses.status", "active")
          .order("unit_id")
        : supabase.from("legal_course_units").select("id,unit_key,label,chapter,body_text,content_status,legal_courses!inner(slug,title,status)")
          .eq("content_status", "current").eq("legal_courses.status", "active")
          .order("id");
      if (articleKey) request = request.eq(explanation ? "legal_course_units.unit_key" : "unit_key", articleKey);
      else request = request.or(explanation ? `simples.ilike.${pat},exemplo.ilike.${pat}` : `body_text.ilike.${pat},label.ilike.${pat},chapter.ilike.${pat}`);
      if (allowedSlugs) request = request.in(explanation ? "legal_course_units.legal_courses.slug" : "legal_courses.slug", [...allowedSlugs]);
      if (signal) request = request.abortSignal(signal);
      const { data, error } = await request.range(offset, offset + 199);
      if (error) throw error;
      if (!data?.length) return rows;
      rows.push(...data); offset += data.length;
    }
  }
  const [units, explanations] = await Promise.all([pages(false), pages(true)]);
  return collectContentHits(q, units as SearchUnitRow[], explanations as SearchExplanationRow[], allowedSlugs);
}

export function useContentSearch(query: string, userId?: string, allowedSlugs?: readonly string[], enabled = true) {
  const [debounced, setDebounced] = useState("");
  const trimmed = query.trim();
  useEffect(() => { const t = setTimeout(() => setDebounced(trimmed), 350); return () => clearTimeout(t); }, [trimmed]);
  const active = enabled && !!userId && (normalizeLibrarySearch(trimmed).length >= 2 || !!legalArticleSearchKey(trimmed)) && allowedSlugs?.length !== 0;
  const result = useQuery({ queryKey: ["content-search", debounced, userId, allowedSlugs ? [...allowedSlugs].sort() : null], enabled: active && debounced === trimmed, staleTime: 60_000, queryFn: ({signal}) => searchContent(debounced, allowedSlugs, signal) });
  // Do not display the previous query's matches while the new query is debouncing.
  return { ...result, isError: active && debounced === trimmed && result.isError, data: !active ? [] : debounced === trimmed ? result.data : undefined, isFetching: active && (debounced !== trimmed || result.isFetching) };
}
