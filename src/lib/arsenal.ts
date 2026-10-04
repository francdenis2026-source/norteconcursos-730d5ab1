/**
 * "Arsenal" de um assunto: tudo o que a plataforma tem para o aluno estudar aquele tema
 * (material escrito, videoaulas, podcasts, flashcards e questões). Usado para decidir se um bloco
 * do cronograma abre a Sala de estudo ou mostra um aviso de que ainda não há conteúdo.
 */
import type { QueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import { canonicalSubject } from "@/lib/subjects";
import type { Podcast, VideoPlaylist } from "@/data/mediaCatalog";
import { fetchStudyMaterialList, type StudyMaterialSummary } from "@/lib/studyMaterials";
import { areaOfSubject, subjectInArea } from "@/lib/questionTopics";
import { TOPIC_VIDEOS, type TopicVideo } from "@/data/topicVideos";
import { MEDIA_KEY, fetchMediaCatalog } from "@/lib/mediaStore";

const strip = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const tokens = (v: string) => strip(v).split(/[^a-z0-9]+/).filter((t) => t.length >= 5);

/** Disciplina da Central de mídia que corresponde à matéria do cronograma. */
const DISCIPLINE_OF_AREA: Record<string, string> = {
  portugues: "Língua Portuguesa",
  raciocinio: "Raciocínio Lógico",
  constitucional: "Direito Constitucional",
  penal: "Direito Penal",
  processual: "Direito Processual Penal",
  informatica: "Informática",
};

export function mediaDisciplineOf(subject: string): string | undefined {
  const area = areaOfSubject(subject);
  return area ? DISCIPLINE_OF_AREA[area] : undefined;
}

/** Materiais da matéria, com os do assunto primeiro (mais palavras em comum com o título/resumo). */
export function rankMaterials(list: StudyMaterialSummary[], subject: string, topic: string) {
  const want = new Set(tokens(topic));
  return list
    .filter((m) => subjectInArea(subject, m.discipline))
    .map((m) => ({ m, score: tokens(`${m.topic_label} ${m.title} ${m.summary ?? ""}`).filter((t) => want.has(t)).length }))
    .sort((a, b) => b.score - a.score || a.m.sort_order - b.m.sort_order);
}

/** Videoaulas catalogadas por assunto ("exact") e as gerais da matéria. IDs com "PL" são playlists. */
export function topicVideosFor(subject: string, topic: string, source: Record<string, Record<string, TopicVideo[]>> = TOPIC_VIDEOS): { exact: TopicVideo[]; general: TopicVideo[] } {
  const exact: TopicVideo[] = [];
  const general: TopicVideo[] = [];
  for (const [key, topics] of Object.entries(source)) {
    if (!subjectInArea(subject, key)) continue;
    if (topic) exact.push(...(topics[topic] ?? []));
    general.push(...(topics["*"] ?? []));
  }
  return { exact, general };
}

export const isPlaylistId = (id: string) => id.startsWith("PL") && id.length > 12;

export interface Arsenal {
  /** Materiais que casam com o assunto. */
  topicMaterials: StudyMaterialSummary[];
  /** Materiais da matéria em geral. */
  subjectMaterials: StudyMaterialSummary[];
  playlists: VideoPlaylist[];
  /** Videoaulas do assunto (e, na falta delas, as gerais da matéria). */
  videos: TopicVideo[];
  videosAreTopic: boolean;
  podcasts: Podcast[];
  /** Cartões do aluno naquela matéria/assunto. */
  cards: number;
  /** Questões do banco naquela matéria (a classificação por assunto é feita no Treinador). */
  questions: number;
}

async function questionCountBySubject(qc: QueryClient): Promise<Map<string, number>> {
  return qc.fetchQuery({
    queryKey: ["arsenal", "question-subjects"],
    staleTime: 10 * 60_000,
    queryFn: async () => {
      const counts = new Map<string, number>();
      const add = (rows: { subject: string | null }[]) => {
        for (const r of rows) {
          const s = canonicalSubject(String(r.subject ?? ""));
          counts.set(s, (counts.get(s) ?? 0) + 1);
        }
      };
      add(await fetchAllRows<{ subject: string | null }>((from, to) =>
        supabase.from("official_exam_questions").select("subject").eq("content_status", "active").neq("official_answer", "X").order("id").range(from, to)));
      add(await fetchAllRows<{ subject: string | null }>((from, to) =>
        supabase.from("curated_question_catalog").select("subject").eq("content_status", "active").order("id").range(from, to)));
      return counts;
    },
  });
}

export async function loadArsenal(qc: QueryClient, userId: string, subject: string, topic: string): Promise<Arsenal> {
  const [list, counts, cards, media] = await Promise.all([
    qc.fetchQuery({ queryKey: ["study-materials", "list"], staleTime: 5 * 60_000, queryFn: fetchStudyMaterialList }),
    questionCountBySubject(qc).catch(() => new Map<string, number>()),
    (async () => {
      let q = supabase.from("flashcards").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("subject", subject);
      if (topic) q = q.eq("topic", topic);
      const { count } = await q;
      return count ?? 0;
    })().catch(() => 0),
    qc.fetchQuery({ queryKey: MEDIA_KEY, staleTime: 5 * 60_000, queryFn: fetchMediaCatalog }),
  ]);

  const ranked = rankMaterials(list, subject, topic);
  const discipline = mediaDisciplineOf(subject);
  let questions = 0;
  for (const [s, n] of counts) if (subjectInArea(subject, s)) questions += n;

  const tv = topicVideosFor(subject, topic, media.topicVideos);
  return {
    videos: tv.exact.length ? tv.exact : tv.general,
    videosAreTopic: tv.exact.length > 0,
    topicMaterials: ranked.filter((r) => r.score > 0).map((r) => r.m),
    subjectMaterials: ranked.map((r) => r.m),
    playlists: discipline ? media.playlists.filter((p) => p.discipline === discipline) : [],
    podcasts: media.podcasts.filter((p) => (discipline ? p.discipline === discipline : strip(p.discipline).includes(strip(subject)))),
    cards,
    questions,
  };
}

/** Há ALGO para estudar? Só então vale abrir a Sala de estudo. */
export const hasAnyResource = (a: Arsenal) =>
  a.subjectMaterials.length + a.videos.length + a.playlists.length + a.podcasts.length + a.cards + a.questions > 0;

/** Texto do aviso profissional quando não há nada para o assunto. */
export function missingMessage(subject: string, topic: string): string {
  return `Ainda não temos material, videoaulas, podcasts nem questões cadastrados para "${topic || subject}". Use o edital eletrônico para localizar o conteúdo e anote o que estudou; assim que houver material desta matéria, ele aparece automaticamente na Sala de estudo.`;
}
