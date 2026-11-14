/** Escolha de materiais e videoaulas por matéria e assunto (funções puras, sem acesso ao banco). */
import type { StudyMaterialSummary } from "@/lib/studyMaterials";
import { subjectInArea, subjectWithinArea } from "@/lib/questionTopics";
import { TOPIC_VIDEOS, type TopicVideo } from "@/data/topicVideos";

const strip = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const tokens = (v: string) =>
  strip(v)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 5);

/** O texto trata do assunto escolhido (palavras relevantes em comum)? */
export function mentionsTopic(topic: string, text: string): boolean {
  const want = new Set(tokens(topic));
  return tokens(text).some((t) => want.has(t));
}

/**
 * Materiais da matéria, com os do assunto primeiro (mais palavras em comum com o título/resumo).
 * Só entram materiais da matéria escolhida; um material de matéria composta ("Estatística e
 * Raciocínio Lógico") só aparece em uma das partes quando trata do assunto escolhido.
 */
export function rankMaterials(list: StudyMaterialSummary[], subject: string, topic: string) {
  const want = new Set(tokens(topic));
  return list
    .map((m) => ({
      m,
      score: tokens(`${m.topic_label} ${m.title} ${m.summary ?? ""}`).filter((t) => want.has(t))
        .length,
    }))
    .filter(
      ({ m, score }) =>
        subjectWithinArea(subject, m.discipline) ||
        (score > 0 && subjectInArea(subject, m.discipline)),
    )
    .sort((a, b) => b.score - a.score || a.m.sort_order - b.m.sort_order);
}

/** Videoaulas catalogadas por assunto ("exact") e as gerais da matéria. IDs com "PL" são playlists. */
export function topicVideosFor(
  subject: string,
  topic: string,
  source: Record<string, Record<string, TopicVideo[]>> = TOPIC_VIDEOS,
): { exact: TopicVideo[]; general: TopicVideo[] } {
  const exact: TopicVideo[] = [];
  const general: TopicVideo[] = [];
  for (const [key, topics] of Object.entries(source)) {
    if (key.startsWith("ENEM") || !subjectInArea(subject, key)) continue; // videoaulas de ENEM ficam na área ENEM
    // Do assunto: vale também o de matéria composta que o inclui. Gerais: só da própria matéria.
    if (topic) exact.push(...(topics[topic] ?? []));
    if (subjectWithinArea(subject, key)) general.push(...(topics["*"] ?? []));
  }
  return { exact, general };
}

