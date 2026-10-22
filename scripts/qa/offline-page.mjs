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
  for (const path of ['/media/hero/norte-atmosphere.webp', '/media/brand/distintivo-carreiras-hd.webp']) {
    assert.ok(await page.evaluate(async path => !!await caches.match(path), path), `${path}: precached before the offline screen is needed`);
  }
  await context.setOffline(true);
  await page.goto(`${base}/qa-uncached-offline-route`);
  await page.getByRole('heading', { name: 'Você está sem conexão.' }).waitFor();
  await page.waitForFunction(() => document.querySelector('.scene')?.naturalWidth > 0 && document.querySelector('.badge-front')?.naturalWidth === 768);
  for (const [name, width, height] of [['large-desktop', 1920, 1080], ['desktop', 1440, 900], ['laptop', 1366, 768], ['tablet', 820, 1180], ['small-tablet', 768, 1024], ['mobile', 390, 844], ['small-mobile', 360, 640], ['narrow-mobile', 320, 568], ['landscape', 844, 390], ['small-landscape', 568, 320]]) {
    await page.setViewportSize({ width, height });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: no horizontal overflow`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight + 1), `${name}: fits one window`);
    for (const selector of ['.scene', '.panel', '.badge-stage', '#retry', '.automatic']) {
      const bounds = await page.locator(selector).boundingBox();
      assert.ok(bounds && bounds.x >= -1 && bounds.y >= -1 && bounds.x + bounds.width <= width + 1 && bounds.y + bounds.height <= height + 1, `${name}: ${selector} fully within the viewport: ${JSON.stringify(bounds)}`);
    }
    const scene = await page.locator('.scene').boundingBox();
    assert.deepEqual(scene, { x: 0, y: 0, width, height }, `${name}: artwork fills the entire window`);
    assert.match(await page.locator('.panel-art').evaluate(n => getComputedStyle(n).backgroundImage), /norte-atmosphere/);
    await page.locator('.badge-rotor').evaluate(n => { const animation = n.getAnimations()[0]; animation?.pause(); if (animation) animation.currentTime = 0; });
    assert.ok(await page.getByRole('button', { name: 'Tentar reconectar' }).isVisible());
    await page.screenshot({ path: `/tmp/norte-offline-${name}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole('button', { name: 'Pausar animação do emblema' }).click();
  assert.equal(await page.locator('.badge-rotor').evaluate(n => getComputedStyle(n).animationPlayState), 'paused');
  await page.getByRole('button', { name: 'Retomar animação do emblema' }).click();
  assert.equal(await page.locator('.badge-rotor').evaluate(n => getComputedStyle(n).animationPlayState), 'running');
  assert.equal(await page.locator('.badge-rotor').evaluate(n => getComputedStyle(n).animationDuration), '14s');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('.badge-rotor').evaluate(n => getComputedStyle(n).animationName), 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
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
  console.log('PASS real service worker: cached artwork offline, ten responsive sizes, no clipped controls, HD gently swaying emblem, pause and reduced motion, manual retry and automatic reconnection');
} finally { await browser.close(); }
