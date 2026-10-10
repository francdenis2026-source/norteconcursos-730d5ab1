/**
 * Liga cada conteúdo do cronograma (item do edital) ao material de estudo da plataforma:
 *  1) guia da Biblioteca (study_materials) e 2) assunto do Edital eletrônico (syllabus_topics).
 * Casamento por texto (palavras com radical) + compatibilidade da disciplina; sem rede, testável sem navegador.
 */
import { canonicalDiscipline } from "@/lib/cronograma";

export interface TheoryMaterial { slug: string; discipline: string; topic_label: string; title: string; summary?: string | null }
export interface TheorySyllabus { id: string; discipline: string; topic_text: string; contest?: string | null }
export interface TheoryHit {
  kind: "material" | "edital";
  /** slug do material ou id do assunto do edital */
  id: string;
  label: string;
  score: number;
}

const strip = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const STOP = new Set(["de", "da", "do", "das", "dos", "e", "em", "a", "o", "as", "os", "para", "com", "por", "no", "na", "nos", "nas", "ao", "aos", "um", "uma", "ou", "que", "se", "sua", "seu", "sobre", "entre", "tais", "como", "lei", "art", "nao"]);
/** Radical de 5 letras: "constitucional"/"constituicao" e plurais/derivadas se encontram. */
export function stems(text: string): string[] {
  return [...new Set(strip(text).split(/[^a-z0-9]+/).filter((w) => w.length >= 3 && !STOP.has(w)).map((w) => w.slice(0, 5)))];
}

const DISC_NOISE = new Set(["direit", "nocoe", "basic", "geral", "matem"]);
const discStems = (name: string) => stems(canonicalDiscipline(name)).filter((s) => !DISC_NOISE.has(s));
/** Disciplinas compatíveis: uma contém a outra ("Legislação Especial" ≈ "Legislação Penal Especial"). */
export function disciplinesMatch(a: string, b: string): boolean {
  const x = discStems(a), y = discStems(b);
  if (!x.length || !y.length) return canonicalDiscipline(a) === canonicalDiscipline(b);
  const [small, big] = x.length <= y.length ? [x, y] : [y, x];
  return small.every((s) => big.includes(s));
}

interface Doc { kind: TheoryHit["kind"]; id: string; label: string; discipline: string; tokens: string[]; contest: string }
export interface TheoryIndex { docs: Doc[]; idf: Map<string, number> }

export function buildTheoryIndex(materials: TheoryMaterial[], syllabus: TheorySyllabus[]): TheoryIndex {
  const docs: Doc[] = [
    ...materials.map((m) => ({
      kind: "material" as const, id: m.slug, label: m.title, discipline: m.discipline,
      tokens: stems(`${m.title} ${m.topic_label} ${m.summary ?? ""}`), contest: "",
    })),
    ...syllabus.map((s) => ({
      kind: "edital" as const, id: s.id, label: s.topic_text, discipline: s.discipline, tokens: stems(s.topic_text), contest: s.contest ?? "",
    })),
  ];
  const df = new Map<string, number>();
  for (const d of docs) for (const t of new Set(d.tokens)) df.set(t, (df.get(t) ?? 0) + 1);
  const idf = new Map([...df].map(([t, n]) => [t, Math.log(1 + docs.length / n)]));
  return { docs, idf };
}

const MIN_SCORE = 0.3;

/** Melhor material para o conteúdo; biblioteca ganha um pequeno bônus (é o texto completo). */
export function findTheory(index: TheoryIndex, discipline: string, topic: string, limit = 3): TheoryHit[] {
  const q = stems(topic);
  if (!q.length) return [];
  const qw = (t: string) => index.idf.get(t) ?? 1;
  const qTotal = q.reduce((s, t) => s + qw(t), 0);
  const hits: TheoryHit[] = [];
  for (const d of index.docs) {
    if (!disciplinesMatch(discipline, d.discipline)) continue;
    const set = new Set(d.tokens);
    const shared = q.filter((t) => set.has(t));
    if (!shared.length) continue;
    const sharedW = shared.reduce((s, t) => s + qw(t), 0);
    const dTotal = d.tokens.reduce((s, t) => s + qw(t), 0) || 1;
    const score = (2 * sharedW) / (qTotal + dTotal) + (d.kind === "material" ? 0.05 : 0);
    // exige cobertura do assunto pedido (>= 40%) para não ligar a um tema só parecido
    if (sharedW / qTotal < 0.4 || score < MIN_SCORE) continue;
    hits.push({ kind: d.kind, id: d.id, label: d.label, score });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Self-check: casa assunto com material da mesma disciplina e ignora disciplinas incompatíveis. */
export function selfCheckTeoria() {
  const idx = buildTheoryIndex(
    [
      { slug: "lei-12850", discipline: "Legislação Penal Especial", topic_label: "Organizações criminosas", title: "Lei 12.850/2013 Organizações Criminosas guia de estudo" },
      { slug: "cpc-16", discipline: "Contabilidade Geral", topic_label: "Estoques", title: "Estoques (CPC 16): o que compõe o custo" },
    ],
    [{ id: "t1", discipline: "Informática", topic_text: "Conceitos de segurança da informação e backup", contest: "PF" }],
  );
  if (findTheory(idx, "Legislação Especial", "Organizações criminosas")[0]?.id !== "lei-12850") throw new Error("organização criminosa");
  if (findTheory(idx, "Direito Penal", "Organizações criminosas").length) throw new Error("disciplina diferente não casa");
  if (findTheory(idx, "Informática", "Segurança da informação")[0]?.kind !== "edital") throw new Error("edital");
  if (findTheory(idx, "Contabilidade", "Estoques CPC 16")[0]?.id !== "cpc-16") throw new Error("contabilidade");
  return true;
}

export interface TheoryTarget {
  to: string;
  params?: Record<string, string>;
  search: Record<string, string>;
  /** true = abre direto o material/assunto; false = só uma busca na Biblioteca */
  direct: boolean;
  label: string;
  kind: "material" | "edital" | "busca";
}

/** Palavras fortes do assunto para a busca da Biblioteca quando não há material específico. */
export const searchWords = (topic: string) =>
  topic.replace(/^[\d.\s-]+/, "").split(/[^\p{L}\p{N}]+/u).filter((w) => w.length >= 5).slice(0, 3).join(" ");

/** Destino do botão "Teoria": material específico > assunto do edital > busca na Biblioteca. `back` volta ao painel do dia. */
export function theoryTarget(hit: TheoryHit | undefined, topic: string, back: string): TheoryTarget {
  const tema = topic.slice(0, 140);
  if (hit?.kind === "material")
    return { to: "/dashboard/library/$slug", params: { slug: hit.id }, search: { back, tema }, direct: true, label: hit.label, kind: "material" };
  if (hit?.kind === "edital")
    return { to: "/dashboard/edital/$topicId", params: { topicId: hit.id }, search: { back, tema }, direct: true, label: hit.label, kind: "edital" };
  // "/dashboard/library/" = rota índice; sem a barra final o TanStack Router quebra ao navegar com ?search a partir de outra página
  return { to: "/dashboard/library/", search: { q: searchWords(topic), back }, direct: false, label: "Procurar na Biblioteca", kind: "busca" };
}
