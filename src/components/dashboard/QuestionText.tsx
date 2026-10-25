import { QuestionProse } from "@/components/dashboard/QuestionProse";

/**
 * Texto de questão (enunciado, comentário). Mantido por compatibilidade: a disposição do texto —
 * corrido justificado em telas largas, curto à esquerda, poema e tabela preservados — é decidida
 * por QuestionProse a partir do conteúdo.
 */
export function QuestionText({ text, className }: { text: string; className?: string }) {
  return <QuestionProse as="div" text={text} {...(className ? { className } : {})} />;
}
