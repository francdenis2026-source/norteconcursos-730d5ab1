import { classifyTopic } from "@/lib/questionTopics";

/** Disciplina de questões correspondente a cada curso por disciplina. */
export const TRACK_SUBJECT: Record<string, string> = {
  portugues: "Língua Portuguesa",
  "raciocinio-logico": "Raciocínio Lógico",
  constitucional: "Direito Constitucional",
  administrativo: "Direito Administrativo",
  "direitos-humanos": "Direitos Humanos",
  estatistica: "Estatística",
  contabilidade: "Contabilidade Geral",
  informatica: "Informática",
};

/**
 * Parâmetros do treinador para praticar o assunto em estudo: a matéria (e o assunto, quando o texto o identifica)
 * já vão filtrados, o treino começa sozinho e as questões já respondidas ficam de fora.
 */
export function practiceSearch(subject: string, text?: string) {
  const topic = text ? classifyTopic(subject, text) : null;
  return { area: subject, ...(topic ? { topic } : {}), go: "1", reinforce: "1" } as const;
}
