import type { MediaCatalog } from "@/lib/mediaStore";
import type { TopicVideo } from "@/data/topicVideos";

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/\bgeral\b/g, "")
    .replace(/[-–—:/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Duas matérias/assuntos "correlacionam" quando, normalizados, um contém o outro. */
const correlates = (a: string, b: string) => {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return false;
  return na === nb || na.includes(nb) || nb.includes(na);
};

export type RelatedVideo = TopicVideo & { subject: string; topic: string };

/**
 * Vídeo-aulas da Central de mídia que correlacionam com um material da Biblioteca, por
 * matéria (sempre exigida) e, quando possível, pelo assunto do material — nunca retorna nada
 * se a matéria do vídeo não bater com a do material (sem correlação, sem link).
 */
export function relatedVideos(
  catalog: MediaCatalog,
  discipline: string,
  topicLabel: string,
  limit = 4,
): RelatedVideo[] {
  const matchingSubjects = Object.keys(catalog.topicVideos).filter((subject) =>
    correlates(subject, discipline),
  );
  if (matchingSubjects.length === 0) return [];

  const bySpecificTopic: RelatedVideo[] = [];
  const general: RelatedVideo[] = [];
  for (const subject of matchingSubjects) {
    const byTopic = catalog.topicVideos[subject] ?? {};
    for (const [topic, videos] of Object.entries(byTopic)) {
      const bucket = topic !== "*" && correlates(topic, topicLabel) ? bySpecificTopic : general;
      if (bucket === general && topic !== "*" && !correlates(topic, topicLabel)) continue;
      for (const video of videos) bucket.push({ ...video, subject, topic });
    }
  }
  return [...bySpecificTopic, ...general].slice(0, limit);
}
