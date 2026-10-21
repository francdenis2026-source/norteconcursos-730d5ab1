/** Mocked auth regression: no production credentials or writes.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/auth-session-stability.mjs
 * Start the local dev server first (BASE_URL defaults to http://127.0.0.1:3000).
 */
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
const uid = '11111111-1111-4111-8111-111111111111';
const storageKey = 'sb-gkwphadbveiyjcwiiizw-auth-token';
const session = (role) => {
  const exp = Math.floor(Date.now() / 1000) + 86400;
  const user = { id: uid, email: `${role}@example.test`, role: 'authenticated', aud: 'authenticated', user_metadata: { full_name: 'CONTA DE TESTE' }, app_metadata: { provider: 'email' }, created_at: new Date().toISOString() };
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
  return { access_token: `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: uid, exp, role: 'authenticated', session_id: '22222222-2222-4222-8222-222222222222' })}.test`, refresh_token: 'test-refresh', token_type: 'bearer', expires_in: 86400, expires_at: exp, user };
};
async function mock(context, role, roleError = false, heldNetwork = false) {
  const calls = { logout: 0, ownership: 0 };
  await context.route('https://gkwphadbveiyjcwiiizw.supabase.co/**', async route => {
    const path = new URL(route.request().url()).pathname;
    if (process.env.DEBUG_QA) console.log(route.request().method(), path);
    if (path.includes('/logout')) calls.logout++;
    if (heldNetwork && (path.includes('/logout') || path.endsWith('/study_heartbeat'))) return;
    if (path.includes('/active_user_sessions')) calls.ownership++;
    let status = 200, body = [];
    if (path.endsWith('/token')) body = session(role);
    else if (path.endsWith('/user')) body = session(role).user;
    else if (path.endsWith('/profiles')) body = { id: uid, full_name: 'CONTA DE TESTE', onboarding_completed: true, subscription_tier: 'premium', is_activated: true, created_at: new Date().toISOString() };
    else if (path.endsWith('/user_roles')) body = [{ role }];
    else if (path.endsWith('/has_role')) { status = roleError ? 503 : 200; body = roleError ? { message: 'temporarily unavailable' } : role === 'admin'; }
    else if (path.endsWith('/server_now')) body = new Date().toISOString();
    else if (path.endsWith('/active_user_sessions')) body = { session_key: 'another-tab-old-key' };
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body), headers: { 'access-control-allow-origin': '*' } });
  });
  return calls;
}
try {
  for (const role of (process.env.ADMIN_ONLY ? [] : ['admin', 'user'])) {
    const context = await browser.newContext();
    const calls = await mock(context, role);
    await context.addInitScript(({ key, value }) => { if (!sessionStorage.getItem('qa-seeded')) { localStorage.setItem(key, JSON.stringify(value)); sessionStorage.setItem('qa-seeded', '1'); } }, { key: storageKey, value: session(role) });
    const first = await context.newPage();
    await first.goto(`${base}/dashboard/profile`);
    await first.locator('.app-shell').waitFor({timeout: 20000}).catch(async error => { console.log((await first.locator('body').innerText()).slice(0, 2200)); throw error; });
    assert.ok(first.url().includes('/dashboard'), `authenticated ${role} reaches dashboard`);
    assert.ok(await first.locator('.app-shell').count(), 'authenticated layout mounted');
    const second = await context.newPage();
    await second.goto(`${base}/dashboard/profile`);
    await second.getByRole('heading', { name: 'Sua sessão já está aberta em outra aba' }).waitFor();
    assert.equal(await second.locator('.app-shell').count(), 0, 'duplicate tab cannot mount protected screens');
    await first.clock.install();
    await first.clock.fastForward(4 * 60_000);
    await first.getByRole('dialog').waitFor();
    const activityBefore = await first.evaluate(() => Object.entries(localStorage).filter(([key]) => key.startsWith('norte_auth_activity:')));
    await second.getByRole('button', { name: 'Tentar novamente' }).click();
    const activityAfter = await first.evaluate(() => Object.entries(localStorage).filter(([key]) => key.startsWith('norte_auth_activity:')));
    assert.deepEqual(activityAfter, activityBefore, 'blocked tab cannot renew the active session');
    assert.ok(await first.evaluate(key => !!localStorage.getItem(key), storageKey), 'warning retains token');
    await first.getByRole('button', { name: 'Continuar estudando' }).click();
    await first.clock.fastForward(301_000);
    await first.clock.runFor(2000);
    await first.waitForURL(/auth\?reason=inactive/, { timeout: 15000 });
    await second.waitForFunction(key => !localStorage.getItem(key), storageKey);
    assert.equal(await second.locator('.app-shell').count(), 0, 'expired duplicate cannot access the panel');
    assert.equal(await first.evaluate(key => localStorage.getItem(key), storageKey), null, 'expired session tokens removed');
    assert.ok(calls.logout >= 1, 'auth sign-out requested');
    assert.equal(calls.ownership, 0, 'legacy tab ownership cannot interfere with auth');
    await first.reload();
    assert.ok(first.url().includes('/auth'), 'reload does not restore expired login');
    await context.close();
    console.log(`PASS ${role}: duplicate tab blocked, warning, real interaction, five-minute expiry and reload`);
  }
  {
    const context = await browser.newContext();
    await mock(context, 'user', false, true);
    await context.addInitScript(({ key, value }) => { if (!sessionStorage.getItem('qa-seeded')) { localStorage.setItem(key, JSON.stringify(value)); sessionStorage.setItem('qa-seeded', '1'); } }, { key: storageKey, value: session('user') });
    const page = await context.newPage();
    await page.goto(`${base}/dashboard/profile`);
    await page.locator('.app-shell').waitFor({ timeout: 20000 });
    await page.evaluate(() => {
      const video = document.createElement('video');
      Object.defineProperty(video, 'paused', { value: false });
      Object.defineProperty(video, 'readyState', { value: 4 });
      document.body.appendChild(video);
    });
    await page.clock.install();
    await page.clock.fastForward(301_000);
    await page.clock.runFor(2000);
    await page.waitForURL(/auth\?reason=inactive/, { timeout: 15000 });
    assert.equal(await page.evaluate(key => localStorage.getItem(key), storageKey), null, 'hung auth and progress requests cannot retain local tokens');
    await context.close();
    console.log('PASS blocked network and media playback: local expiry still enforced');
  }

  {
    const context = await browser.newContext();
    await mock(context, 'user');
    await context.addInitScript(({ key, value }) => { if (!sessionStorage.getItem('qa-seeded')) { localStorage.setItem(key, JSON.stringify(value)); sessionStorage.setItem('qa-seeded', '1'); } }, { key: storageKey, value: session('user') });
    const page = await context.newPage();
    await page.goto(`${base}/dashboard/profile`);
    await page.locator('.app-shell').waitFor({ timeout: 20000 });
    await page.clock.install();
    await page.clock.fastForward(240_000);
    await page.getByRole('dialog').waitFor();
    await page.reload();
    await page.getByRole('dialog').waitFor({ timeout: 20000 });
    await page.goto(base);
    await page.locator('.home').waitFor({ timeout: 20000 });
    await page.waitForLoadState('networkidle');
    const now = await page.evaluate(() => Date.now());
    await page.clock.setSystemTime(now + 61_000);
    await page.evaluate(() => {
      window.dispatchEvent(new Event('pointerdown'));
      window.dispatchEvent(new Event('focus'));
    });
    await page.clock.runFor(2000);
    await page.waitForURL(/auth\?reason=inactive/, { timeout: 15000 });
    assert.equal(await page.evaluate(key => localStorage.getItem(key), storageKey), null, 'return from suspension enforces the original deadline');
    await context.close();
    console.log('PASS reload, public page, synthetic input and return from suspension: deadline retained');
  }
  for (const unavailable of [true, false]) {
    const context = await browser.newContext();
    const calls = await mock(context, 'user', unavailable);
    const page = await context.newPage();
    await page.goto(`${base}/admin`);
    await page.waitForTimeout(1500);
    await page.locator('input[type=email]').fill('user@example.test');
    await page.locator('input[type=password]').fill('test-password');
    await page.getByRole('button', { name: /entrar/i }).click();
    await page.getByText(unavailable ? 'Não foi possível verificar seu acesso. Tente novamente em instantes.' : 'Esta conta não tem acesso de administrador.').waitFor({timeout: 12000}).catch(async error => { console.log((await page.locator('body').innerText()).slice(0,2200)); throw error; });
    assert.ok(page.url().endsWith('/admin'), 'unverified account is not granted administrator access');
    assert.equal(calls.logout, 0, 'failed role lookup or denied access does not revoke valid sessions');
    await context.close();
    console.log(`PASS admin gate: ${unavailable ? 'role lookup failure' : 'non-admin denial'} retains session and denies access`);
  }
} finally { await browser.close(); }
