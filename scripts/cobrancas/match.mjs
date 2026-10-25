// Liga o texto de uma questão ao artigo que ela mais provavelmente cobra, por semelhança de vocabulário (TF-IDF).
// É um indício, não uma certeza: só aceita ligações com pontuação alta e folga sobre o 2º colocado.
const STOP = new Set(("a o as os um uma uns umas de do da dos das em no na nos nas por para com sem sob sobre entre ate ao aos pelo pela pelos pelas e ou mas se que qual quais quando como " +
  "ser ter ha foi sao era sera pode podem deve devem nao sim item assinale julgue alternativa correta incorreta certo errado seguir considerando acerca respeito conforme segundo lei artigo art " +
  "paragrafo inciso caput pena crime pessoa autoridade qualquer sendo sido seja tambem apenas ainda mais menos todo toda todos todas outro outra outros outras este esta estes estas esse essa isso").split(" "));
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
export function tokens(text) {
  return norm(text).split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !STOP.has(w) && !/^\d+$/.test(w)).map((w) => w.slice(0, 7));
}
export function buildMatcher(units) {
  const df = new Map();
  const docs = units.map((u) => {
    const tf = new Map();
    for (const t of tokens(`${u.label} ${u.body_text}`)) tf.set(t, (tf.get(t) ?? 0) + 1);
    for (const t of tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
    return { u, tf };
  });
  const N = docs.length;
  const idf = (t) => Math.log((N + 1) / ((df.get(t) ?? 0) + 1)) + 1;
  const vecs = docs.map(({ u, tf }) => {
    const v = new Map(); let norm2 = 0;
    for (const [t, c] of tf) { const w = (1 + Math.log(c)) * idf(t); v.set(t, w); norm2 += w * w; }
    return { u, v, n: Math.sqrt(norm2) || 1 };
  });
  const inverted = new Map();
  vecs.forEach((d, i) => { for (const t of d.v.keys()) (inverted.get(t) ?? inverted.set(t, []).get(t)).push(i); });
  return { vecs, inverted, idf };
}
export function matchQuestion(m, text, { min = 0.3, margin = 1.4, allow } = {}) {
  const tf = new Map();
  for (const t of tokens(text)) tf.set(t, (tf.get(t) ?? 0) + 1);
  const q = new Map(); let qn = 0;
  for (const [t, c] of tf) { if (!m.inverted.has(t)) continue; const w = (1 + Math.log(c)) * m.idf(t); q.set(t, w); qn += w * w; }
  if (q.size < 3) return null;
  qn = Math.sqrt(qn);
  const score = new Map();
  for (const [t, w] of q) for (const i of m.inverted.get(t)) score.set(i, (score.get(i) ?? 0) + w * m.vecs[i].v.get(t));
  const ranked = [...score.entries()]
    .map(([i, s]) => ({ i, s: s / (qn * m.vecs[i].n) }))
    .filter((r) => !allow || allow(m.vecs[r.i].u))
    .sort((a, b) => b.s - a.s);
  const [a, b] = ranked;
  if (!a || a.s < min) return null;
  if (b && a.s < b.s * margin) return null;
  const u = m.vecs[a.i].u;
  return { slug: u.slug, art: u.unit_key, score: a.s };
}
