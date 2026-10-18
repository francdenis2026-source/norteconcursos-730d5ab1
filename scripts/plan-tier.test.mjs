import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  effectiveTier,
  planEndsAt,
  TESTING_OPENED_AT,
  TESTING_DAYS,
  TESTING_PHASE,
  TESTING_TIER,
} from "../src/lib/launch.config.ts";
import {
  checkFeatureAccess,
  FREE_DAILY_QUESTIONS,
  FREE_DAILY_LIBRARY,
  FREE_MONTHLY_MOCKS,
  ESSENTIAL_MONTHLY_MOCKS,
  FREE_MOCK_MAX_QUESTIONS,
  SUBSCRIPTION_PLANS,
} from "../src/lib/subscriptions.config.ts";

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
  for (const feature of [
    "notebooks",
    "flashcards",
    "editalRadar",
    "essays",
    "studyPlan",
    "cronograma",
    "bankProfile",
    "currencyFilter",
    "aiSolver",
    "examRegistration",
  ])
    assert.equal(checkFeatureAccess("free", feature).included, false, feature);
  // simulado: 1 curto por mês
  assert.deepEqual(
    [
      checkFeatureAccess("free", "mockExams").included,
      checkFeatureAccess("free", "mockExams").limit,
    ],
    [true, 1],
  );
  assert.deepEqual(
    [checkFeatureAccess("free", "library").included, checkFeatureAccess("free", "library").limit],
    [true, FREE_DAILY_LIBRARY],
  );
});

test("planos pagos mantêm as áreas liberadas", () => {
  for (const tier of ["essential", "plus", "premium"])
    for (const feature of [
      "notebooks",
      "flashcards",
      "editalRadar",
      "essays",
      "cronograma",
      "currencyFilter",
    ])
      assert.equal(checkFeatureAccess(tier, feature).included, true, `${tier}:${feature}`);
});

test("o gatilho do servidor usa as mesmas regras do aplicativo (sem divergência)", () => {
  const sql = readFileSync("supabase/migrations/20261018110000_trial_tier_plus.sql", "utf8");
  const sqlOpened = /testing_opened_at constant timestamptz := timestamptz '([^']+)'/.exec(
    sql,
  )?.[1];
  assert.equal(
    new Date(sqlOpened.replace(" ", "T") + ":00").getTime(),
    new Date(TESTING_OPENED_AT).getTime(),
  );
  assert.equal(Number(/testing_days constant integer := ([0-9]+)/.exec(sql)?.[1]), TESTING_DAYS);
  assert.equal(/testing_phase constant boolean := ([a-z]+)/.exec(sql)?.[1], String(TESTING_PHASE));
  assert.equal(/testing_tier constant text := '([a-z]+)'/.exec(sql)?.[1], TESTING_TIER);
  const limits = readFileSync("supabase/migrations/20261018160000_market_plan_limits.sql", "utf8");
  assert.match(limits, new RegExp("when 'free' then " + FREE_DAILY_QUESTIONS));
  for (const tier of ["essential", "plus"]) {
    assert.match(
      limits,
      new RegExp("when '" + tier + "' then " + checkFeatureAccess(tier, "questions").limit),
    );
  }
});

test("na fase de testes, quem está no Plus de testes tem tudo menos a análise das provas", () => {
  for (const feature of [
    "questions",
    "mockExams",
    "cronograma",
    "bankProfile",
    "currencyFilter",
    "studyPlan",
    "editalRadar",
  ])
    assert.equal(checkFeatureAccess(TESTING_TIER, feature).included, true, feature);
  assert.equal(checkFeatureAccess(TESTING_TIER, "questions").limit, 180);
  assert.equal(checkFeatureAccess(TESTING_TIER, "examRegistration").included, false);
});

test("estrutura aprovada: preços, anual com 2 meses grátis e degraus de recursos", () => {
  const plan = (id) => SUBSCRIPTION_PLANS.find((p) => p.id === id);
  assert.deepEqual(
    ["free", "essential", "plus", "premium"].map((id) => plan(id).price),
    [0, 19.9, 34.9, 49.9],
  );
  for (const id of ["essential", "plus", "premium"])
    assert.equal(
      plan(id).annualPrice,
      Math.round(plan(id).price * 10),
      `${id}: anual = 10 mensalidades`,
    );
  // Perfil das bancas só do Plus em diante; análise das próprias provas só no Premium
  assert.deepEqual(
    ["free", "essential", "plus", "premium"].map(
      (t) => checkFeatureAccess(t, "bankProfile").included,
    ),
    [false, false, true, true],
  );
  assert.deepEqual(
    ["free", "essential", "plus", "premium"].map(
      (t) => checkFeatureAccess(t, "examRegistration").included,
    ),
    [false, false, false, true],
  );
  // IA nunca é ilimitada em plano pago: cota crescente
  assert.deepEqual(
    ["essential", "plus", "premium"].map((t) => checkFeatureAccess(t, "aiSolver").limit),
    [10, 30, "unlimited"],
  );
  assert.deepEqual(
    ["free", "essential", "plus", "premium"].map((t) => checkFeatureAccess(t, "questions").limit),
    [20, 60, 180, "unlimited"],
  );
  assert.deepEqual(
    ["free", "essential", "plus", "premium"].map((t) => checkFeatureAccess(t, "mockExams").limit),
    [1, 2, 4, "unlimited"],
  );
});

test("o gatilho de simulados do servidor repete os limites do aplicativo", () => {
  const sql = readFileSync("supabase/migrations/20261018160000_market_plan_limits.sql", "utf8");
  assert.match(sql, new RegExp("when 'free' then " + FREE_MONTHLY_MOCKS));
  assert.match(sql, new RegExp("when 'essential' then " + ESSENTIAL_MONTHLY_MOCKS));
  assert.match(sql, /when 'plus' then 4[\s\S]*else null/);
  const mockGuard = readFileSync(
    "supabase/migrations/20261018100000_plan_structure_limits.sql",
    "utf8",
  );
  assert.match(mockGuard, new RegExp("total_questions > " + FREE_MOCK_MAX_QUESTIONS));
});
