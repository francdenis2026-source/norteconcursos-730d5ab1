export type TrackQuiz = { q: string; a: boolean; why: string };

export type TrackLesson = {
  id: string;
  /** Tópico real do edital/matriz de referência, quando explicitamente vinculado. */
  syllabusTopicId?: string;
  /** Grupo do edital (ex.: "Patrimônio"). */
  group: string;
  title: string;
  /** Item do edital que esta aula cobre. */
  edital: string;
  simples: string;
  pontos: string[];
  exemplo: string;
  atencao: string[];
  quiz: TrackQuiz[];
};

export type Track = {
  slug: string;
  title: string;
  discipline: string;
  /** Origem do conteúdo programático. */
  source: string;
  lessons: TrackLesson[];
};
