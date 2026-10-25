// Mede a precisão da ligação por conteúdo usando as questões que citam o artigo de forma explícita (verdade conhecida).
import { readFileSync } from "node:fs";
import { buildRefIndex, splitRefs } from "../../src/lib/legalRefs.ts";
import { buildMatcher, matchQuestion } from "./match.mjs";

const env = readFileSync(".env.local", "utf8");
const get = (k) => env.match(new RegExp(`${k}=(.*)`))[1].trim().replace(/^"|"$/g, "");
const url = get("VITE_SUPABASE_URL"), key = get("SUPABASE_SERVICE_ROLE_KEY");
async function all(path) { const rows = []; for (let off = 0; ; off += 1000) { const r = await fetch(`${url}/rest/v1/${path}`, { headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${off}-${off + 999}` } }); const d = await r.json(); rows.push(...d); if (d.length < 1000) return rows; } }

const courses = await all("legal_courses?select=id,slug,title&status=eq.active");
const slugOf = Object.fromEntries(courses.map((c) => [c.id, c.slug]));
const units = (await all("legal_course_units?select=course_id,unit_key,label,body_text&content_status=eq.current")).map((u) => ({ ...u, slug: slugOf[u.course_id] }));
const index = buildRefIndex(courses, units.map((u) => ({ course_id: u.course_id, unit_key: u.unit_key })));
const matcher = buildMatcher(units);

const rows = [
  ...(await all("official_exam_questions?select=question_text,legal_basis,review_note&content_status=eq.active")),
  ...(await all("curated_question_catalog?select=question_text,legal_basis,explanation&content_status=eq.active")),
];
const truth = [];
for (const q of rows) {
  const basis = Array.isArray(q.legal_basis) ? q.legal_basis.map((b) => b?.title ?? "").join("; ") : "";
  const found = new Set();
  for (const p of splitRefs([basis, q.explanation, q.review_note].filter(Boolean).join("\n"), "", index)) if (p.href) found.add(`${p.href.slug}|${p.href.art}`);
  if (found.size) truth.push({ q, found });
}
console.log("com verdade conhecida (cita artigo em base legal/comentário):", truth.length);
for (const [min, margin] of [[0.15, 1.15], [0.2, 1.25], [0.25, 1.3], [0.3, 1.4]]) {
  let tried = 0, hit = 0, lawHit = 0;
  for (const { q, found } of truth) {
    const m = matchQuestion(matcher, q.question_text, { min, margin });
    if (!m) continue;
    tried++;
    if (found.has(`${m.slug}|${m.art}`)) hit++;
    if ([...found].some((f) => f.split("|")[0] === m.slug)) lawHit++;
  }
  console.log(`min=${min} margem=${margin}: ligou ${tried}/${truth.length} (${Math.round((tried / truth.length) * 100)}%), artigo certo ${Math.round((hit / Math.max(1, tried)) * 100)}%, lei certa ${Math.round((lawHit / Math.max(1, tried)) * 100)}%`);
}
