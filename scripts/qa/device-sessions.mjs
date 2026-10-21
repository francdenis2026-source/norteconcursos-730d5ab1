/** Independent browser/device contexts; mocked Auth only, no production writes.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/device-sessions.mjs
 */
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const uid = '11111111-1111-4111-8111-111111111111';
const storageKey = 'sb-gkwphadbveiyjcwiiizw-auth-token';
function session(id) {
  const exp = Math.floor(Date.now() / 1000) + 86400;
  const user = { id: uid, email: 'qa@example.test', role: 'authenticated', aud: 'authenticated', user_metadata: { full_name: 'ALUNO TESTE' }, app_metadata: { provider: 'email' }, created_at: new Date().toISOString() };
  const encode = x => Buffer.from(JSON.stringify(x)).toString('base64url');
  return { access_token: `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: uid, exp, role: 'authenticated', session_id: id })}.test`, refresh_token: 'qa-refresh', token_type: 'bearer', expires_in: 86400, expires_at: exp, user };
}
try {
  for (const role of ['user', 'admin']) {
    let owner = 'old', offline = false, missing = false;
    const logoutScopes = [];
    async function device(id) {
      const context = await browser.newContext();
      const value = session(id);
      await context.addInitScript(({ key, value }) => {
        if (!sessionStorage.getItem('qa-seeded')) {
          localStorage.setItem(key, JSON.stringify(value)); sessionStorage.setItem('qa-seeded', '1');
        }
      }, { key: storageKey, value });
      await context.route('https://gkwphadbveiyjcwiiizw.supabase.co/**', async route => {
        const request = route.request(), url = new URL(request.url()), path = url.pathname;
        let status = 200, body = [];
        if (path.endsWith('/is_current_device_session')) {
          status = missing ? 404 : offline && id === 'old' ? 503 : 200;
          body = missing ? { code: 'PGRST202', message: 'Could not find public.is_current_device_session' } : status === 503 ? { message: 'offline' } : owner === id;
        } else if (path.endsWith('/profiles')) body = request.headers()['accept']?.includes('object')
          ? { id: uid, full_name: 'ALUNO TESTE', onboarding_completed: true, subscription_tier: 'premium', is_activated: true, created_at: new Date().toISOString() } : [];
        else if (path.endsWith('/user_roles')) body = [{ user_id: uid, role }];
        else if (path.endsWith('/has_role')) body = role === 'admin';
        else if (path.endsWith('/user')) body = value.user;
        else if (path.endsWith('/token')) body = value;
        else if (path.endsWith('/server_now')) body = new Date().toISOString();
        else if (path.endsWith('/logout')) { logoutScopes.push(url.searchParams.get('scope')); body = {}; }
        await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
      });
      const page = await context.newPage();
      return { context, page };
    }
    const old = await device('old');
    await old.page.goto(`${base}/dashboard/profile`);
    await old.page.locator('.app-shell').waitFor({ timeout: 25000 });
    // Temporary outage pauses the workspace without deleting the login.
    offline = true;
    await old.page.evaluate(() => window.dispatchEvent(new Event('offline')));
    await old.page.getByRole('heading', { name: 'Não foi possível confirmar seu acesso' }).waitFor({ timeout: 12000 });
    assert.ok(await old.page.evaluate(key => !!localStorage.getItem(key), storageKey));
    assert.match(await old.page.locator('.session-access__scene').evaluate(node => getComputedStyle(node).backgroundImage), /carreiras-composicao/);
    if (role === 'user') {
      for (const [name, width, height] of [['desktop', 1440, 900], ['tablet', 820, 1180], ['mobile', 390, 844]]) {
        await old.page.setViewportSize({ width, height });
        await old.page.screenshot({ path: `/tmp/norte-session-${name}.png` });
        assert.ok(await old.page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: no horizontal overflow`);
      }
    }
    // Another physical device/browser signs in while the first is offline.
    owner = 'new';
    const latest = await device('new');
    await latest.page.goto(`${base}/dashboard/profile`);
    await latest.page.locator('.app-shell').waitFor({ timeout: 25000 });
    offline = false;
    await old.page.evaluate(() => window.dispatchEvent(new Event('online')));
    await old.page.waitForURL(/auth\?reason=another-device/, { timeout: 15000 });
    assert.equal(await old.page.locator('.app-shell').count(), 0);
    assert.equal(await old.page.evaluate(key => localStorage.getItem(key), storageKey), null);
    assert.ok(await latest.page.locator('.app-shell').count());
    assert.ok(await latest.page.evaluate(key => !!localStorage.getItem(key), storageKey));
    assert.ok(logoutScopes.every(scope => scope === 'local'), 'old device cannot globally revoke the new login');
    await old.context.close(); await latest.context.close();
    // Deploying frontend before SQL must report the pending migration without locking everyone out.
    owner = 'old'; missing = true;
    const legacy = await device('old');
    await legacy.page.goto(`${base}/dashboard/profile`);
    await legacy.page.locator('.app-shell').waitFor({ timeout: 25000 });
    if (role === 'admin') await legacy.page.getByRole('alert').filter({ hasText: 'Proteção entre dispositivos pendente' }).waitFor();
    await legacy.context.close();
    console.log(`PASS ${role}: separate devices, offline reconnect, takeover, local logout and database rollout`);
  }
} finally { await browser.close(); }
