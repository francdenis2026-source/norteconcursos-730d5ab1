import test from 'node:test';
import assert from 'node:assert/strict';

const store = new Map();
globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
globalThis.document = { visibilityState: 'visible' };
const activity = await import('../src/lib/activity.ts');
const f = await import('../src/lib/focusSession.ts');

test('o relógio de foco conta, pausa ao ir a Questões e retoma de onde parou', () => {
  activity.markActive(true);
  f.beginFocus('/dashboard/trilhas?t=portugues', 'Português');
  f.tickFocus(); f.tickFocus(); f.tickFocus();
  assert.equal(f.getFocusSession().elapsed, 3);
  f.goAway('/dashboard/trilhas?t=portugues&l=pt-classes');
  f.tickFocus(); f.tickFocus();
  assert.equal(f.getFocusSession().elapsed, 3, 'fora da área o relógio não anda');
  assert.equal(f.getFocusSession().away, true);
  f.beginFocus('/dashboard/trilhas?t=portugues&l=pt-classes', 'Português');
  assert.equal(f.getFocusSession().away, false);
  assert.equal(f.getFocusSession().elapsed, 3, 'retoma do ponto em que parou');
  f.tickFocus();
  assert.equal(f.getFocusSession().elapsed, 4);
});

test('pausa manual e hora parada, aba oculta e inatividade não contam', () => {
  f.setFocusPaused(true);
  const before = f.getFocusSession().elapsed;
  f.tickFocus();
  assert.equal(f.getFocusSession().elapsed, before);
  f.setFocusPaused(false);
  globalThis.document.visibilityState = 'hidden';
  f.tickFocus();
  assert.equal(f.getFocusSession().elapsed, before, 'aba oculta não conta');
  globalThis.document.visibilityState = 'visible';
  const realNow = Date.now;
  Date.now = () => realNow() + 130_000;
  assert.ok(activity.idleSeconds() >= 120);
  f.tickFocus();
  assert.equal(f.getFocusSession().elapsed, before, 'parado há mais de 2 minutos não conta');
  Date.now = realNow;
  activity.markActive(true);
  f.tickFocus();
  assert.equal(f.getFocusSession().elapsed, before + 1);
});

test('encerrar limpa a sessão e outra área começa do zero', () => {
  f.endFocus();
  assert.equal(f.getFocusSession(), null);
  f.beginFocus('/dashboard/library/x', 'Material');
  assert.equal(f.getFocusSession().elapsed, 0);
});
