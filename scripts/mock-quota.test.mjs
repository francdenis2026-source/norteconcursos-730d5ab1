import test from "node:test";
import assert from "node:assert/strict";
import { mockQuota, mockQuotaMessage, acreMonthStartISO } from "../src/lib/mockQuota.ts";

test("Gratuito: 1 simulado curto por mês", () => {
  assert.deepEqual(mockQuota("free", 0, 20), { allowed: true, limit: 1, remaining: 1 });
  assert.equal(mockQuota("free", 1, 10).allowed, false);
  const big = mockQuota("free", 0, 21);
  assert.equal(big.allowed, false);
  assert.equal(big.reason, "size");
  assert.match(mockQuotaMessage(big), /até 20 questões/);
});

test("Essencial: 2 por mês, sem teto de tamanho; Plus e Premium ilimitados", () => {
  assert.equal(mockQuota("essential", 1, 120).allowed, true);
  assert.equal(mockQuota("essential", 2, 20).allowed, false);
  assert.match(mockQuotaMessage(mockQuota("essential", 2, 20)), /2 simulados do mês/);
  for (const tier of ["plus", "premium"]) assert.deepEqual(mockQuota(tier, 99, 120), { allowed: true, limit: null, remaining: null });
});

test("o mês do Acre começa às 05:00 UTC do dia 1º, mesmo na virada do mês em UTC", () => {
  // 01/11 02:00 UTC ainda é 31/10 21:00 no Acre
  assert.equal(acreMonthStartISO(new Date("2026-11-01T02:00:00Z")), "2026-10-01T05:00:00.000Z");
  assert.equal(acreMonthStartISO(new Date("2026-11-01T06:00:00Z")), "2026-11-01T05:00:00.000Z");
});
