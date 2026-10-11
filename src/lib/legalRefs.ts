/**
 * Referências legais clicáveis: "art. 4º, §16", "art. 10-A", "art. 342 do Código Penal", "art. 9º da Lei nº 9.807/1999"
 * viram links que abrem EXATAMENTE aquele dispositivo (e o parágrafo, quando citado).
 * Só vira link se o artigo existir no percurso da lei de destino (índice de dispositivos); do contrário fica como texto.
 */
export interface RefCourse { id: string; slug: string; title: string }
export interface RefIndex {
  keys: Map<string, Set<string>>; // slug -> unit_keys existentes
  /** identificações da lei: números ("12850", "2848") e nomes por extenso -> slug */
  byNumber: Map<string, string>;
  byName: [RegExp, string][];
}
export type RefPart = { text: string; href?: { slug: string; art: string; par?: string } };

const NAMED: [RegExp, string][] = [
  [/c[oó]digo\s+penal\b/i, "codigo-penal"],
  [/c[oó]digo\s+de\s+processo\s+penal|\bCPP\b/i, "codigo-processo-penal"],
  [/lei\s+de\s+execu[cç][aã]o\s+penal|\bLEP\b/i, "lep"],
  [/estatuto\s+da\s+crian[cç]a|\bECA\b/i, "eca"],
  [/c[oó]digo\s+de\s+tr[aâ]nsito|\bCTB\b/i, "transito"],
];

export function buildRefIndex(courses: RefCourse[], unitKeys: { course_id: string; unit_key: string }[]): RefIndex {
  const slugById = new Map(courses.map((c) => [c.id, c.slug]));
  const keys = new Map<string, Set<string>>();
  for (const u of unitKeys) {
    const slug = slugById.get(u.course_id);
    if (!slug) continue;
    (keys.get(slug) ?? keys.set(slug, new Set()).get(slug)!).add(u.unit_key);
  }
  const byNumber = new Map<string, string>();
  for (const c of courses) for (const m of c.title.matchAll(/(\d{1,2}\.\d{3}|\d{3,5})(?=\s*(?:\/|\s|—|-|$))/g)) byNumber.set(m[1]!.replace(/\./g, ""), c.slug);
  // Decreto-Lei 2.848 / 3.689 já entram pelo título do Código; garante os apelidos conhecidos
  byNumber.set("2848", "codigo-penal");
  byNumber.set("3689", "codigo-processo-penal");
  return { keys, byNumber, byName: NAMED };
}

/** "10", "A" -> "art-10-a"; ("3", "") -> "art-3". */
export const unitKeyOf = (num: string, suffix?: string) => `art-${num.replace(/\./g, "")}${suffix ? "-" + suffix.toLowerCase() : ""}`;

const ART = /\bart(?:igo)?s?\.?\s*(\d{1,4}(?:\.\d{3})?)\s*[º°o]?(?:\s*-\s*([A-Za-z]))?(?:\s*,?\s*(?:§|par[aá]grafo)\s*(\d{1,3}|[úu]nico)\s*[º°o]?(?:\s*-\s*([A-Za-z]))?)?/gi;
const LAW_AFTER = /^\s*,?\s*(?:do|da|dos|das)\s+((?:Decreto-Lei|Lei(?:\s+Complementar)?|C[oó]digo|Estatuto)[^;:()]{0,70}?)(?=[;:,)\n]|\.(?=\s|$)|\s+(?:e|ou)\s|$)/i;

function resolveLaw(lawText: string, index: RefIndex): string | null {
  for (const [re, slug] of index.byName) if (re.test(lawText)) return slug;
  const n = lawText.match(/n?[º°o.]?\s*(\d{1,2}\.\d{3}|\d{3,5})/);
  return n ? (index.byNumber.get(n[1]!.replace(/\./g, "")) ?? null) : null;
}

/** Quebra o texto em pedaços; os que citam artigo existente trazem o destino exato. */
export function splitRefs(text: string, currentSlug: string, index: RefIndex): RefPart[] {
  const parts: RefPart[] = [];
  let last = 0;
  for (const m of text.matchAll(ART)) {
    const start = m.index!;
    if (start < last) continue; // já consumido como parte de uma citação anterior
    let end = start + m[0].length;
    let slug = currentSlug;
    const after = LAW_AFTER.exec(text.slice(end));
    let lawEnd = end;
    if (after) {
      const target = resolveLaw(after[1]!, index);
      if (!target) continue; // lei desconhecida: não arrisca ligar ao artigo errado
      slug = target;
      lawEnd = end + after[0].length;
    }
    const art = unitKeyOf(m[1]!, m[2]);
    if (!index.keys.get(slug)?.has(art)) continue;
    const par = m[3] ? (/[úu]nico/i.test(m[3]) ? "unico" : m[3] + (m[4] ? "-" + m[4].toLowerCase() : "")) : undefined;
    if (start > last) parts.push({ text: text.slice(last, start) });
    end = lawEnd;
    parts.push({ text: text.slice(start, end), href: { slug, art, ...(par ? { par } : {}) } });
    last = end;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts.length ? parts : [{ text }];
}

/** O parágrafo pedido (?par=16 / 4-a / unico) aparece neste trecho do dispositivo? */
export function paragraphMatches(paragraphText: string, par: string): boolean {
  const t = paragraphText.trimStart();
  if (par === "unico") return /^par[aá]grafo\s+[úu]nico/i.test(t);
  const [n, suf] = par.split("-");
  return new RegExp(`^§\\s*${n}\\s*[º°o]?${suf ? `\\s*-\\s*${suf}` : "(?![\\w-])"}`, "i").test(t);
}

/** Self-check (scripts/cronograma.test.mjs não cobre; ver scripts/legal-refs.test.mjs). */
export function selfCheckRefs() {
  const idx = buildRefIndex(
    [{ id: "1", slug: "organizacoes", title: "Lei 12.850/2013 — Organizações Criminosas" }, { id: "2", slug: "codigo-penal", title: "CP · Código Penal — Decreto-Lei 2.848" }, { id: "3", slug: "lei-9807", title: "Lei 9.807/1999 — Proteção" }],
    [{ course_id: "1", unit_key: "art-4" }, { course_id: "1", unit_key: "art-10-a" }, { course_id: "2", unit_key: "art-342" }, { course_id: "3", unit_key: "art-9" }],
  );
  const a = splitRefs("Veja o art. 4º, §16 e o art. 10-A.", "organizacoes", idx).filter((p) => p.href);
  if (a.length !== 2 || a[0]!.href!.art !== "art-4" || a[0]!.href!.par !== "16" || a[1]!.href!.art !== "art-10-a") throw new Error("mesma lei");
  const b = splitRefs("conforme o art. 342 do Código Penal", "organizacoes", idx).find((p) => p.href);
  if (b?.href?.slug !== "codigo-penal" || b.href.art !== "art-342") throw new Error("outra lei");
  const c = splitRefs("aplicando-se o art. 9º da Lei nº 9.807, de 13 de julho de 1999", "organizacoes", idx).find((p) => p.href);
  if (c?.href?.slug !== "lei-9807") throw new Error("lei por número");
  if (splitRefs("o art. 99 desta lei", "organizacoes", idx).some((p) => p.href)) throw new Error("artigo inexistente não vira link");
  if (!paragraphMatches("§ 16. Nenhuma das seguintes medidas", "16") || paragraphMatches("§ 160 x", "16")) throw new Error("parágrafo");
  if (!paragraphMatches("Parágrafo único. A pena", "unico")) throw new Error("parágrafo único");
  return true;
}
