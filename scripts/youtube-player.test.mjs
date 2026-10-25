import test, { afterEach } from "node:test";
import assert from "node:assert/strict";

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
let sequence = 0;
afterEach(() => {
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
  if (originalDocument === undefined) delete globalThis.document;
  else globalThis.document = originalDocument;
});
async function fixture() {
  const scripts = [],
    deadlines = [];
  globalThis.window = {
    setTimeout(callback) {
      deadlines.push(callback);
      return 0;
    },
  };
  globalThis.document = {
    createElement() {
      return {
        src: "",
        async: false,
        onerror: null,
        removed: false,
        remove() {
          this.removed = true;
        },
      };
    },
    head: {
      appendChild(script) {
        scripts.push(script);
      },
    },
  };
  const { loadYoutubePlayer } = await import(`../src/lib/youtubePlayer.ts?review=${++sequence}`);
  return { loadYoutubePlayer, scripts, deadlines };
}
test("existing official API is reused without injecting a script", async () => {
  const { loadYoutubePlayer, scripts } = await fixture();
  const api = { Player: class {} };
  window.YT = api;
  assert.equal(await loadYoutubePlayer(), api);
  assert.equal(scripts.length, 0);
});
test("concurrent players share loading and a failing prior subscriber cannot break readiness", async () => {
  const { loadYoutubePlayer, scripts } = await fixture();
  const previous = () => {
    throw new Error("another subscriber");
  };
  window.onYouTubeIframeAPIReady = previous;
  const first = loadYoutubePlayer(),
    second = loadYoutubePlayer();
  assert.equal(first, second);
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, "https://www.youtube.com/iframe_api");
  const api = { Player: class {} };
  window.YT = api;
  window.onYouTubeIframeAPIReady();
  assert.equal(await first, api);
  assert.equal(await second, api);
  assert.equal(window.onYouTubeIframeAPIReady, previous);
});
test("a blocked script rejects cleanly and retry can load a new script", async () => {
  const { loadYoutubePlayer, scripts } = await fixture();
  const first = loadYoutubePlayer();
  scripts[0].onerror();
  await assert.rejects(first, /YouTube/);
  assert.equal(scripts[0].removed, true);
  const second = loadYoutubePlayer();
  assert.equal(scripts.length, 2);
  const api = { Player: class {} };
  window.YT = api;
  window.onYouTubeIframeAPIReady();
  assert.equal(await second, api);
});
test("a stalled request times out and releases the shared request for retry", async () => {
  const { loadYoutubePlayer, scripts, deadlines } = await fixture();
  const request = loadYoutubePlayer();
  deadlines[0]();
  await assert.rejects(request, /YouTube/);
  assert.equal(scripts[0].removed, true);
  const retry = loadYoutubePlayer();
  assert.equal(scripts.length, 2);
  window.YT = { Player: class {} };
  window.onYouTubeIframeAPIReady();
  assert.equal(await retry, window.YT);
});
