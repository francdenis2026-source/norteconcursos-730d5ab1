import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { effectiveTier, planEndsAt, TESTING_OPENED_AT, TESTING_DAYS, TESTING_PHASE, TESTING_TIER } from "../src/lib/launch.config.ts";
import { checkFeatureAccess, FREE_DAILY_QUESTIONS, FREE_DAILY_LIBRARY } from "../src/lib/subscriptions.config.ts";

const DAY = 86_400_000;
const opened = new Date(TESTING_OPENED_AT).getTime();

test("durante os 30 dias de testes, conta nova usa o plano de testes (Plus)", () => {
  const created = new Date(opened + 2 * DAY).toISOString();
  assert.equal(TESTING_TIER, "plus");
  const eff = effectiveTier("free", created, null, opened + 10 * DAY);
  assert.equal(eff.tier, TESTING_TIER);
  assert.equal(eff.trial, true);
});

test("ao fim dos 30 dias, a conta é rebaixada ao Gratuito e o aviso lembra o plano de testes", () => {
  const created = new Date(opened).toISOString();
  const after = effectiveTier("essential", created, null, opened + 31 * DAY);
  assert.equal(after.tier, "free");
  assert.equal(after.expiredFrom, TESTING_TIER);
  assert.equal(after.trial, undefined);
  assert.equal(planEndsAt(created, "free", null), new Date(opened + 30 * DAY).toISOString());
});

test("quem cadastrou antes da abertura ganha 30 dias a partir da abertura", () => {
  const old = new Date(opened - 90 * DAY).toISOString();
  assert.equal(effectiveTier("free", old, null, opened + 29 * DAY).tier, TESTING_TIER);
  assert.equal(effectiveTier("free", old, null, opened + 31 * DAY).tier, "free");
});

test("plano pago com vencimento: vencido volta ao Gratuito, vigente continua", () => {
  const created = new Date(opened - 5 * DAY).toISOString();
  const future = new Date(opened + 60 * DAY).toISOString();
  const past = new Date(opened + 1 * DAY).toISOString();
  assert.equal(effectiveTier("plus", created, future, opened + 10 * DAY).tier, "plus");
  const lapsed = effectiveTier("plus", created, past, opened + 10 * DAY);
  assert.equal(lapsed.tier, "free");
  assert.equal(lapsed.expiredFrom, "plus");
});

test("plano Gratuito: 20 questões por dia e áreas pagas bloqueadas", () => {
  assert.equal(FREE_DAILY_QUESTIONS, 20);
  assert.equal(checkFeatureAccess("free", "questions").limit, 20);
  for (const feature of ["notebooks", "flashcards", "editalRadar", "essays", "mockExams", "studyPlan"])
    assert.equal(checkFeatureAccess("free", feature).included, false, feature);
  assert.deepEqual(
    [checkFeatureAccess("free", "library").included, checkFeatureAccess("free", "library").limit],
    [true, FREE_DAILY_LIBRARY],
  );
});

test("planos pagos mantêm as áreas liberadas", () => {
  for (const tier of ["essential", "plus", "premium"])
    for (const feature of ["notebooks", "flashcards", "editalRadar", "essays"])
      assert.equal(checkFeatureAccess(tier, feature).included, true, `${tier}:${feature}`);
});

test("o gatilho do servidor usa as mesmas regras do aplicativo (sem divergência)", () => {
  const sql = readFileSync("supabase/migrations/20261018110000_trial_tier_plus.sql", "utf8");
  const sqlOpened = /testing_opened_at constant timestamptz := timestamptz '([^']+)'/.exec(sql)?.[1];
  assert.equal(new Date(sqlOpened.replace(" ", "T") + ":00").getTime(), new Date(TESTING_OPENED_AT).getTime());
  assert.equal(Number(/testing_days constant integer := ([0-9]+)/.exec(sql)?.[1]), TESTING_DAYS);
  assert.equal(/testing_phase constant boolean := ([a-z]+)/.exec(sql)?.[1], String(TESTING_PHASE));
  assert.equal(/testing_tier constant text := '([a-z]+)'/.exec(sql)?.[1], TESTING_TIER);
  const limits = readFileSync("supabase/migrations/20261016160000_server_daily_question_limit.sql", "utf8");
  assert.match(limits, new RegExp("when 'free' then " + FREE_DAILY_QUESTIONS + " when 'essential' then " + checkFeatureAccess("essential", "questions").limit + " else null"));
});

test("na fase de testes, quem está no Plus de testes tem tudo menos a análise das provas", () => {
  for (const feature of ["questions", "mockExams", "cronograma", "bankProfile", "currencyFilter", "studyPlan", "editalRadar"])
    assert.equal(checkFeatureAccess(TESTING_TIER, feature).included, true, feature);
  assert.equal(checkFeatureAccess(TESTING_TIER, "questions").limit, "unlimited");
  assert.equal(checkFeatureAccess(TESTING_TIER, "examRegistration").included, false);
});
