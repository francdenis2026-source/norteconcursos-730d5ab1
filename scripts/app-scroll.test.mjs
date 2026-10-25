import test from 'node:test';
import assert from 'node:assert/strict';
import { scrollAppToTop } from '../src/lib/appScroll.ts';

test('scroll commands target the mobile workspace and the desktop window', () => {
  const originalWindow = globalThis.window, originalDocument = globalThis.document;
  const calls = [];
  let mobile = true, mounted = true;
  const content = { scrollTo: (options) => calls.push(['content', options]) };
  globalThis.window = { matchMedia: () => ({matches: mobile}), scrollTo: options => calls.push(['window', options]) };
  globalThis.document = { getElementById: () => mounted ? content : null };
  try {
    scrollAppToTop();
    mobile = false; scrollAppToTop('instant');
    mobile = true; mounted = false; scrollAppToTop('auto');
    assert.deepEqual(calls, [
      ['content', {top:0, behavior:'smooth'}],
      ['window', {top:0, behavior:'instant'}],
      ['window', {top:0, behavior:'auto'}],
    ]);
  } finally {
    if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow;
    if (originalDocument === undefined) delete globalThis.document; else globalThis.document = originalDocument;
  }
});
