/**
 * Catálogo da Central de mídia.
 * - Vídeos: apenas playlists GRATUITAS e públicas do YouTube, tocadas pelo player oficial (embed).
 *   Os direitos pertencem aos autores dos canais; sempre exibimos o link para o original.
 * - Podcasts: áudios gerados no NotebookLM (ainda a vincular, ver `PODCASTS`).
 */

export interface VideoPlaylist {
  id: string; // id da playlist no YouTube
  title: string;
  discipline: string;
}

export const DISCIPLINES = [
  "Língua Portuguesa",
  "Raciocínio Lógico",
  "Direito Constitucional",
  "Direito Penal",
  "Direito Processual Penal",
  "Informática",
  "Carreiras (PRF, PF, PC)",
] as const;

export const PLAYLISTS: VideoPlaylist[] = [
  {
    id: "PLAzcWdLW0AoEuf22APsWkvR8WU3Si29qO",
    title: "Português para Concurso Público",
    discipline: "Língua Portuguesa",
  },
  {
    id: "PLqjSTsK75fSekJ1Lxon-iaj8md9Hl6S49",
    title: "Raciocínio Lógico e Matemático — questões resolvidas e comentadas",
    discipline: "Raciocínio Lógico",
  },
  {
    id: "PL-4cMc9KcAt6kbXyDgnsu2sWeGfjehF_y",
    title: "Raciocínio Lógico para Concursos — RLM completo",
    discipline: "Raciocínio Lógico",
  },
  {
    id: "PLw4wejdBxKWXOZujbP9EAMxACnPeXdK5J",
    title: "Raciocínio Lógico para Concursos",
    discipline: "Raciocínio Lógico",
  },
  {
    id: "PLbuo_BUvjP3MoVF_vLWPc0Qwqs6k9zSVm",
    title: "Direito Constitucional para Concursos",
    discipline: "Direito Constitucional",
  },
  {
    id: "PLBkozukn4cGUv5KpSOOmIK2ocE64em7N3",
    title: "Curso completo de Direito Constitucional 2025",
    discipline: "Direito Constitucional",
  },
  {
    id: "PLdarqF3CDzWHWQ93rc0MvJ4BYUxTXqab7",
    title: "Curso de Direito Constitucional",
    discipline: "Direito Constitucional",
  },
  {
    id: "PLnxEEWSVFtNJ6E54d8tGB4dMgBC9d5P4f",
    title: "Parte Geral do Direito Penal — assuntos mais cobrados",
    discipline: "Direito Penal",
  },
  {
    id: "PLZvSkVqe_ub5Sm8XowmRRYhSCBW3tQZGT",
    title: "Facilitando o Direito Penal para a Polícia Civil",
    discipline: "Direito Penal",
  },
  {
    id: "PLlcBAGSoN8MrP3cE3jz_fCOy4zhvTxnzV",
    title: "Curso de Direito Processual Penal",
    discipline: "Direito Processual Penal",
  },
  {
    id: "PLzMN3jVT58xo_JFbE7h4l9-mbgFhBg_Nr",
    title: "Curso Básico de Informática para Concursos",
    discipline: "Informática",
  },
  {
    id: "PLO3hBdfBc4pFjZGW8G3SNXc1emC55qXwR",
    title: "Informática para Concursos",
    discipline: "Informática",
  },
  {
    id: "PLpW0DXxdqP00PDY1mY_myKHvlZM2IWL57",
    title: "Informática para concursos 2026",
    discipline: "Informática",
  },
  {
    id: "PLbBHtaezfYYEcRJ8gHvG78ED6Jom_ESGU",
    title: "Concurso PRF",
    discipline: "Carreiras (PRF, PF, PC)",
  },
];

export const youtubePlaylistUrl = (id: string) => `https://www.youtube.com/playlist?list=${id}`;
export const youtubeEmbedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/videoseries?list=${id}&rel=0`;
export const youtubeSearchUrl = (discipline: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${discipline} concurso aula grátis`)}`;

export interface Podcast {
  id: string;
  title: string;
  discipline: string;
  description?: string;
  /** URL do áudio (arquivo .mp3/.m4a hospedado). Definido quando o episódio for vinculado. */
  src: string;
}

/**
 * Episódios gerados no NotebookLM. Vazio por enquanto: ao hospedar cada áudio, basta adicionar
 * um item aqui (ou ligar a uma tabela) e o player já toca.
 */
export const PODCASTS: Podcast[] = [];
