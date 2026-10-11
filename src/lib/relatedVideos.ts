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

/** Leis do percurso de estudo → matéria e assuntos do catálogo de vídeo-aulas (null = todos os assuntos da matéria). */
const LAW_VIDEO_MAP: Record<string, { subject: string; topics: string[] | null }> = {
  "codigo-penal": { subject: "Direito Penal", topics: null },
  "codigo-processo-penal": { subject: "Direito Processual Penal", topics: null },
  transito: { subject: "Legislação de Trânsito", topics: null },
  drogas: { subject: "Legislação Especial e Direitos Humanos", topics: ["drogas"] },
  abuso: { subject: "Legislação Especial e Direitos Humanos", topics: ["abuso de autoridade"] },
  organizacoes: { subject: "Legislação Especial e Direitos Humanos", topics: ["organizacoes criminosas"] },
  eca: { subject: "Legislação Especial e Direitos Humanos", topics: ["crianca e do adolescente"] },
  migracao: { subject: "Legislação Especial e Direitos Humanos", topics: ["migracao"] },
  armas: { subject: "Legislação Especial e Direitos Humanos", topics: ["desarmamento"] },
  hediondos: { subject: "Legislação Especial e Direitos Humanos", topics: ["hediondos"] },
  tortura: { subject: "Legislação Especial e Direitos Humanos", topics: ["tortura"] },
  "maria-penha": { subject: "Legislação Especial e Direitos Humanos", topics: ["maria da penha"] },
  interceptacao: { subject: "Legislação Especial e Direitos Humanos", topics: ["interceptacao"] },
  lavagem: { subject: "Legislação Especial e Direitos Humanos", topics: ["lavagem"] },
};

/** Vídeo-aulas da Central de mídia para uma lei do percurso de estudo (só o que realmente trata dela). */
export function lawVideos(catalog: MediaCatalog, lawSlug: string, limit = 12): RelatedVideo[] {
  const rule = LAW_VIDEO_MAP[lawSlug];
  if (!rule) return [];
  const byTopic = catalog.topicVideos[rule.subject] ?? {};
  const out: RelatedVideo[] = [];
  for (const [topic, videos] of Object.entries(byTopic)) {
    if (topic === "*") continue;
    if (rule.topics && !rule.topics.some((key) => normalize(topic).includes(key))) continue;
    for (const video of videos) out.push({ ...video, subject: rule.subject, topic });
  }
  return out.slice(0, limit);
}
