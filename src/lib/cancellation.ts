import { TESTING_PHASE, isTestingTier } from "@/lib/launch.config";

/** Frase que o aluno digita para confirmar. O banco confere a mesma frase (request_subscription_cancellation). */
export const CANCEL_PHRASE = "CANCELAR MEU PLANO";

export interface CancellationRecord {
  id: string;
  receipt_number: string;
  user_id: string;
  user_name: string | null;
  user_email: string | null;
  plan_tier: string;
  plan_name: string;
  requested_at: string;
  effective_until: string;
  reason: string | null;
  email_status: "pendente" | "enviado" | "falhou" | "nao_configurado";
  email_sent_at: string | null;
}

const squash = (value: string) => value.trim().replace(/\s+/g, " ").toUpperCase();

export const phraseMatches = (typed: string) => squash(typed) === CANCEL_PHRASE;

/**
 * Só quem tem assinatura paga pode cancelar. Na fase de testes todos usam o Essencial sem pagar:
 * Gratuito/Essencial sem vencimento definido não é assinatura.
 */
export function isPaidSubscriber(tier: string, expiresAt?: string | null): boolean {
  if (tier === "free") return false;
  if (TESTING_PHASE && isTestingTier(tier) && !expiresAt) return false;
  return true;
}

/** Cancelamento ainda em vigor (o plano segue até `effective_until`); o mais recente vence. */
export function scheduledCancellation(
  list: CancellationRecord[],
  now = Date.now(),
): CancellationRecord | null {
  return (
    [...list]
      .filter((c) => new Date(c.effective_until).getTime() > now)
      .sort((a, b) => b.requested_at.localeCompare(a.requested_at))[0] ?? null
  );
}

export const emailStatusLabel: Record<CancellationRecord["email_status"], string> = {
  pendente: "Aguardando envio",
  enviado: "Enviado",
  falhou: "Falhou",
  nao_configurado: "Não enviado (e-mail não configurado)",
};

const csvCell = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;

/** CSV (com BOM para abrir acentuado no Excel) dos cancelamentos, para o administrador exportar. */
export function cancellationsCsv(list: CancellationRecord[]): string {
  const head = [
    "Recibo",
    "Aluno",
    "E-mail",
    "Plano",
    "Solicitado em",
    "Vale até",
    "Motivo",
    "E-mail de confirmação",
  ];
  const rows = list.map((c) => [
    c.receipt_number,
    c.user_name,
    c.user_email,
    c.plan_name,
    c.requested_at,
    c.effective_until,
    c.reason,
    emailStatusLabel[c.email_status],
  ]);
  return "﻿" + [head, ...rows].map((r) => r.map(csvCell).join(";")).join("\r\n");
}

export function downloadText(filename: string, text: string, type = "text/csv;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
