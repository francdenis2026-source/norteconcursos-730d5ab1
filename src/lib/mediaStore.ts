/**
 * Catálogo da Central de mídia lido do banco (tabelas `media_videos` e `media_podcasts`, geridas por
 * Admin → Central de mídia). Se o banco ainda não tiver as tabelas (migration não aplicada) ou estiver
 * indisponível, cai na cópia estática do app — nunca deixa o aluno sem conteúdo por falha técnica.
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PLAYLISTS, PODCASTS, type Podcast, type VideoPlaylist } from "@/data/mediaCatalog";
import { TOPIC_VIDEOS, type TopicVideo } from "@/data/topicVideos";

export interface MediaCatalog {
  /** matéria → assunto → vídeos ("*" = gerais da matéria). */
  topicVideos: Record<string, Record<string, TopicVideo[]>>;
  /** Playlists gerais por disciplina (aba "Videoaulas gratuitas"). */
  playlists: VideoPlaylist[];
  podcasts: Podcast[];
  fromDb: boolean;
}

export interface VideoRow {
  id: string;
  subject: string;
  topic: string;
  youtube_id: string;
  title: string;
  channel: string | null;
  is_playlist: boolean;
  embeddable: boolean;
  status: "ok" | "blocked" | "gone" | "unchecked";
  checked_at: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
}
export interface PodcastRow {
  id: string;
  title: string;
  subject: string;
  description: string | null;
  audio_url: string;
  audio_path: string | null;
  duration_seconds: number | null;
  active: boolean;
  sort_order: number;
  created_at: string;
}

export const MEDIA_KEY = ["media-catalog"] as const;

export function buildCatalog(videos: VideoRow[], podcasts: PodcastRow[]): MediaCatalog {
  const topicVideos: MediaCatalog["topicVideos"] = {};
  const playlists: VideoPlaylist[] = [];
  for (const v of videos) {
    const item: TopicVideo = { id: v.youtube_id, title: v.title, ...(v.channel ? { channel: v.channel } : {}), ...(v.embeddable ? {} : { embeddable: false as const }) };
    ((topicVideos[v.subject] ??= {})[v.topic] ??= []).push(item);
    if (v.topic === "*" && v.is_playlist) playlists.push({ id: v.youtube_id, title: v.title, discipline: v.subject });
  }
  return {
    topicVideos,
    playlists,
    podcasts: podcasts.map((p) => ({ id: p.id, title: p.title, discipline: p.subject, src: p.audio_url, ...(p.description ? { description: p.description } : {}) })),
    fromDb: true,
  };
}

export const STATIC_CATALOG: MediaCatalog = { topicVideos: TOPIC_VIDEOS, playlists: PLAYLISTS, podcasts: PODCASTS, fromDb: false };

export async function fetchMediaCatalog(): Promise<MediaCatalog> {
  try {
    const [v, p] = await Promise.all([
      supabase.from("media_videos").select("*").eq("active", true).order("sort_order").limit(5000),
      supabase.from("media_podcasts").select("*").eq("active", true).order("sort_order").limit(1000),
    ]);
    if (v.error) return STATIC_CATALOG; // tabela ausente ou banco fora do ar
    return buildCatalog((v.data ?? []) as VideoRow[], p.error ? [] : ((p.data ?? []) as PodcastRow[]));
  } catch {
    return STATIC_CATALOG;
  }
}

export function useMediaCatalog() {
  const q = useQuery({ queryKey: MEDIA_KEY, queryFn: fetchMediaCatalog, staleTime: 5 * 60_000 });
  // Enquanto o banco responde (ou se estiver lento/fora do ar) mostra o catálogo padrão do app.
  return { catalog: q.data ?? STATIC_CATALOG, isLoading: q.isPending };
}

/** Extrai o id de um vídeo ou playlist de um link do YouTube (ou aceita o id puro). */
export function parseYoutube(input: string): { id: string; isPlaylist: boolean } | null {
  const text = input.trim();
  if (!text) return null;
  const plain = text.match(/^[A-Za-z0-9_-]{11}$/);
  if (plain) return { id: text, isPlaylist: false };
  const list = text.match(/[?&]list=(PL[A-Za-z0-9_-]{10,})/);
  const video = text.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  if (list && !video) return { id: list[1]!, isPlaylist: true };
  if (video) return { id: video[1]!, isPlaylist: false };
  if (list) return { id: list[1]!, isPlaylist: true };
  if (/^PL[A-Za-z0-9_-]{10,}$/.test(text)) return { id: text, isPlaylist: true };
  return null;
}

export interface OEmbedResult {
  status: "ok" | "blocked" | "gone";
  title?: string;
  channel?: string;
}

/** Confere no YouTube (oEmbed): 200 = disponível; 401/403 = não permite exibir fora do YouTube; 404/400 = removido. */
export async function checkYoutube(id: string): Promise<OEmbedResult | null> {
  const playlist = id.startsWith("PL") && id.length > 12;
  const url = playlist ? `https://www.youtube.com/playlist?list=${id}` : `https://www.youtube.com/watch?v=${id}`;
  try {
    const r = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    if (r.ok) {
      const j = (await r.json()) as { title?: string; author_name?: string };
      return { status: "ok", ...(j.title ? { title: j.title } : {}), ...(j.author_name ? { channel: j.author_name } : {}) };
    }
    if (r.status === 401 || r.status === 403) return { status: "blocked" };
    if (r.status === 404 || r.status === 400) return { status: "gone" };
    return null;
  } catch {
    return null; // sem rede / bloqueado: não altera o status
  }
}
