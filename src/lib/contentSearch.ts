import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ContentHit = {
  key: string;
  slug: string;
  lawTitle: string;
  chapter: string;
  unitKey: string;
  label: string;
  snippet: string;
  via: "texto" | "explicação";
};

const ACCENTED = /[aeiouc\u00e0-\u00ff]/gi;
/** Padrão ilike que ignora acentos: cada vogal/c vira "_" (um caractere qualquer). */
export const accentInsensitivePattern = (q: string) => `*${q.trim().replace(/[%*,()]/g, " ").replace(/\s+/g, " ").replace(ACCENTED, "_")}*`;

const strip = (s: string) => [...s].map((c) => c.normalize("NFD")[0]!.toLowerCase()).join("");

/** Trecho do texto ao redor da primeira ocorrência (sem acento) da busca. */
export function snippetAround(text: string, q: string, size = 150): string {
  const clean = text.replace(/\s+/g, " ").trim();
  const at = strip(clean).indexOf(strip(q.trim()));
  if (at < 0) return clean.slice(0, size) + (clean.length > size ? "…" : "");
  const start = Math.max(0, at - 50);
  return (start > 0 ? "…" : "") + clean.slice(start, start + size) + (start + size < clean.length ? "…" : "");
}

type UnitRow = { unit_key: string; label: string; chapter: string; body_text?: string; legal_courses: { slug: string; title: string } | null };

export async function searchContent(q: string): Promise<ContentHit[]> {
  const pat = accentInsensitivePattern(q);
  const [units, expl] = await Promise.all([
    supabase.from("legal_course_units").select("unit_key,label,chapter,body_text,legal_courses(slug,title)").eq("content_status", "current").or(`body_text.ilike.${pat},label.ilike.${pat},chapter.ilike.${pat}`).limit(40),
    supabase.from("legal_unit_explanations").select("simples,legal_course_units(unit_key,label,chapter,legal_courses(slug,title))").ilike("simples", pat).limit(40),
  ]);
  const hits = new Map<string, ContentHit>();
  const add = (u: UnitRow | null, text: string, via: ContentHit["via"]) => {
    if (!u?.legal_courses) return;
    const key = `${u.legal_courses.slug}:${u.unit_key}`;
    if (hits.has(key)) return;
    hits.set(key, { key, slug: u.legal_courses.slug, lawTitle: u.legal_courses.title.replace(/ — leitura atualizada$/, ""), chapter: u.chapter, unitKey: u.unit_key, label: u.label, snippet: snippetAround(text, q), via });
  };
  for (const r of ((expl.data ?? []) as unknown as { simples: string; legal_course_units: UnitRow | null }[])) add(r.legal_course_units, r.simples, "explicação");
  for (const u of ((units.data ?? []) as unknown as UnitRow[])) add(u, u.body_text ?? u.label, "texto");
  const ql = strip(q.trim());
  // quem acertou o rótulo/capítulo ("art. 33") vem primeiro
  return [...hits.values()].sort((a, b) => Number(strip(b.label + b.chapter).includes(ql)) - Number(strip(a.label + a.chapter).includes(ql))).slice(0, 12);
}

export function useContentSearch(query: string, userId?: string) {
  const [debounced, setDebounced] = useState("");
  useEffect(() => { const t = setTimeout(() => setDebounced(query.trim()), 350); return () => clearTimeout(t); }, [query]);
  return useQuery({ queryKey: ["content-search", debounced, userId], enabled: !!userId && debounced.length >= 3, staleTime: 60_000, queryFn: () => searchContent(debounced) });
}
