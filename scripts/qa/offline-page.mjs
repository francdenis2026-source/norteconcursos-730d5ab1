/** Exercise the real service-worker fallback and its precached artwork without an internet connection. */
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4311';
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${base}/offline.html`);
  await page.evaluate(async () => {
    await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }));
  });
  assert.ok(await page.evaluate(async () => !!await caches.match('/media/loading/norte-abertura-hd.webp')), 'artwork is precached before the offline screen is needed');
  await context.setOffline(true);
  await page.goto(`${base}/qa-uncached-offline-route`);
  await page.getByRole('heading', { name: 'Você está sem conexão.' }).waitFor();
  await page.waitForFunction(() => document.querySelector('.art img')?.naturalWidth > 0);
  for (const [name, width, height] of [['desktop', 1440, 900], ['tablet', 820, 1180], ['mobile', 390, 844], ['small-mobile', 360, 640], ['landscape', 844, 390]]) {
    await page.setViewportSize({ width, height });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: no horizontal overflow`);
    if (height >= 640) assert.ok(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight + 1), `${name}: fits one window`);
    assert.ok(await page.getByRole('button', { name: 'Tentar reconectar' }).isVisible());
    await page.screenshot({ path: `/tmp/norte-offline-${name}.png`, fullPage: true });
  }
  const retried = page.waitForEvent('framenavigated', { predicate: frame => frame === page.mainFrame() });
  await page.getByRole('button', { name: 'Tentar reconectar' }).click();
  await retried;
  await page.waitForLoadState();
  await page.getByRole('heading', { name: 'Você está sem conexão.' }).waitFor();
  assert.ok(page.url().endsWith('/qa-uncached-offline-route'), `offline retry preserves the originally requested route: ${page.url()}`);
  const returned = page.waitForEvent('framenavigated', { predicate: frame => frame === page.mainFrame() });
  await context.setOffline(false);
  await returned;
  assert.ok(page.url().endsWith('/qa-uncached-offline-route'), 'reconnection retries the original route automatically');
  await context.close();
  console.log('PASS real service worker: cached artwork offline, five responsive sizes, manual retry and automatic reconnection');
} finally { await browser.close(); }
