import { PCAC_VIDEOS } from "@/data/pcAcVideos";
import type { TopicVideo } from "@/data/topicVideos";

/**
 * Guia de vídeos de Realidade do Acre por área de estudo.
 * - `topics`: assuntos da videoteca (PCAC_VIDEOS) ligados à área; só entram vídeos já cadastrados.
 * - `searches`: buscas prontas no YouTube, para achar aulas novas sem depender de um endereço que pode sair do ar.
 * - `official`: vídeos de fontes públicas (ex.: TV Câmara).
 */
export interface AcreVideoSearch {
  label: string;
  query: string;
}
export interface AcreVideoGuide {
  topics: string[];
  searches: AcreVideoSearch[];
  official?: { label: string; url: string }[];
}

export const ACRE_VIDEO_GUIDE: Record<string, AcreVideoGuide> = {
  historia: {
    topics: ["Formação histórica e ciclos da borracha", "Revolução Acreana e anexação ao Brasil"],
    searches: [
      { label: "História do Acre para concurso", query: "história do Acre aula concurso" },
      { label: "Revolução Acreana e Plácido de Castro", query: "Revolução Acreana Plácido de Castro aula" },
      { label: "Tratado de Petrópolis", query: "Tratado de Petrópolis 1903 Acre aula" },
      { label: "Chico Mendes e as Resex", query: "Chico Mendes reservas extrativistas Acre" },
    ],
    official: [{ label: "TV Câmara — Chico Mendes: Cartas da Floresta (documentário, 44 min)", url: "https://www.camara.leg.br/tv/documentarios/195338-chico-mendes-cartas-da-floresta" }],
  },
  geografia: {
    topics: ["Geografia, limites, fronteiras e hidrografia"],
    searches: [
      { label: "Geografia do Acre para concurso", query: "geografia do Acre aula concurso" },
      { label: "Mesorregiões e microrregiões do Acre", query: "mesorregiões microrregiões do Acre aula" },
      { label: "Municípios e regionais do Acre", query: "municípios do Acre regionais de desenvolvimento" },
      { label: "Rios, relevo e clima do Acre", query: "Acre hidrografia relevo clima vegetação aula" },
    ],
  },
  economia: {
    topics: ["Aspectos sociais e econômicos"],
    searches: [
      { label: "Economia do Acre", query: "economia do Acre PIB aula concurso" },
      { label: "Indicadores socioeconômicos do Acre", query: "Acre indicadores socioeconômicos IBGE" },
      { label: "Atualidades do Acre", query: "atualidades do Acre concurso" },
    ],
  },
  cultura: {
    topics: ["Aspectos étnicos, culturais e populações tradicionais"],
    searches: [
      { label: "Povos indígenas do Acre", query: "povos indígenas do Acre aula" },
      { label: "Cultura e populações tradicionais", query: "cultura acreana populações tradicionais seringueiros" },
      { label: "Indígenas isolados no Acre", query: "indígenas isolados Acre Funai" },
    ],
  },
  politica: {
    topics: [],
    searches: [
      { label: "Constituição do Estado do Acre", query: "Constituição do Estado do Acre aula concurso" },
      { label: "Organização política do Acre", query: "organização política do Acre Poderes aula" },
    ],
  },
  seguranca: {
    topics: ["Segurança pública e regiões de fronteira"],
    searches: [
      { label: "Segurança pública no Acre", query: "segurança pública Acre Sejusp Gefron" },
      { label: "Fronteira do Acre", query: "fronteira Acre Peru Bolívia tráfico operação" },
      { label: "Polícia Civil do Acre", query: "Polícia Civil do Acre concurso 2026 aula" },
    ],
  },
  atualidades: {
    topics: [],
    searches: [
      { label: "Atualidades do Acre", query: "atualidades do Acre concurso" },
      { label: "Notícias do Acre", query: "notícias do Acre esta semana" },
    ],
  },
};

export const youtubeSearchUrl = (query: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
export const youtubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;

/** Vídeos já cadastrados para a área (sem repetir o mesmo vídeo em dois assuntos). */
export function acreVideosFor(axisId: string): TopicVideo[] {
  const guide = ACRE_VIDEO_GUIDE[axisId];
  const catalog = PCAC_VIDEOS["Realidade do Acre"] ?? {};
  const seen = new Set<string>();
  const out: TopicVideo[] = [];
  for (const topic of guide?.topics ?? [])
    for (const video of catalog[topic] ?? [])
      if (!video.id.startsWith("PL") && !seen.has(video.id)) {
        seen.add(video.id);
        out.push(video);
      }
  return out;
}

export const acreVideoLibraryTopic = (axisId: string) => ACRE_VIDEO_GUIDE[axisId]?.topics[0];
