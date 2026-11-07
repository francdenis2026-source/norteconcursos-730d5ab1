import test from "node:test";
import assert from "node:assert/strict";
import {
  CANCEL_PHRASE,
  phraseMatches,
  isPaidSubscriber,
  scheduledCancellation,
  cancellationsCsv,
} from "../src/lib/cancellation.ts";

const DAY = 86_400_000;
const rec = (over = {}) => ({
  id: "1", receipt_number: "CANC-2026-000001", user_id: "u", user_name: 'Ana "A"', user_email: "a@x.com",
  plan_tier: "plus", plan_name: "Plus", requested_at: "2026-10-01T10:00:00Z",
  effective_until: new Date(Date.now() + 10 * DAY).toISOString(), reason: null, email_status: "pendente", email_sent_at: null,
  ...over,
});

test("a frase de confirmação ignora caixa e espaços extras, mas exige as palavras", () => {
  assert.equal(CANCEL_PHRASE, "CANCELAR MEU PLANO");
  assert.ok(phraseMatches("  cancelar   meu plano "));
  assert.ok(!phraseMatches("cancelar plano"));
  assert.ok(!phraseMatches(""));
});

test("liberação geral: sem vencimento gravado não é assinatura paga, nenhum plano escapa da varredura", () => {
  assert.equal(isPaidSubscriber("free", null), false);
  assert.equal(isPaidSubscriber("essential", null), false);
  assert.equal(isPaidSubscriber("essential", "2026-12-01T00:00:00Z"), true);
  assert.equal(isPaidSubscriber("premium", "2026-12-01T00:00:00Z"), true);
  // Licenças pagas foram revogadas: mesmo um Plus/Premium sem vencimento gravado não tem
  // assinatura real pra cancelar enquanto a fase de testes varrer todos os planos (isTestingTier).
  assert.equal(isPaidSubscriber("plus", null), false);
  assert.equal(isPaidSubscriber("plus", null, true), false);
});

test("cancelamento agendado vale até o vencimento; depois disso a renovação é liberada", () => {
  const now = Date.now();
  assert.equal(scheduledCancellation([rec()], now)?.receipt_number, "CANC-2026-000001");
  assert.equal(scheduledCancellation([rec({ effective_until: new Date(now - DAY).toISOString() })], now), null);
  const newer = rec({ id: "2", receipt_number: "CANC-2026-000002", requested_at: "2026-10-05T10:00:00Z" });
  assert.equal(scheduledCancellation([rec(), newer], now)?.id, "2");
});

test("o CSV do administrador escapa aspas e começa com BOM", () => {
  const csv = cancellationsCsv([rec({ reason: 'caro; "demais"' })]);
  assert.ok(csv.startsWith("﻿"));
  assert.ok(csv.includes('"Ana ""A"""'));
  assert.ok(csv.includes('"caro; ""demais"""'));
  assert.equal(csv.split("\r\n").length, 2);
});
