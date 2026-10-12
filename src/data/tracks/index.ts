import type { Track } from "./types";
import { CONTABILIDADE_1 } from "./contabilidade1";
import { CONTABILIDADE_2 } from "./contabilidade2";

export type { Track, TrackLesson, TrackQuiz } from "./types";

export const TRACKS: Track[] = [
  {
    slug: "contabilidade",
    title: "Contabilidade Geral",
    discipline: "Contabilidade",
    source: "Edital da Polícia Federal 2025 (Cebraspe), Bloco III, itens 1 a 12",
    lessons: [...CONTABILIDADE_1, ...CONTABILIDADE_2],
  },
];
