/** A real open platform loses its connection: no refresh/navigation is allowed.
 * Run with the dev server on BASE_URL (default localhost:3000). */
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const uid = '11111111-1111-4111-8111-111111111111';
function session() {
  const exp = Math.floor(Date.now() / 1000) + 86400;
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
  return { access_token: `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: uid, exp, role: 'authenticated', session_id: uid })}.test`, refresh_token: 'test-refresh', token_type: 'bearer', expires_in: 86400, expires_at: exp,
    user: { id: uid, email: 'qa@example.test', aud: 'authenticated', role: 'authenticated', user_metadata: { full_name: 'ALUNO TESTE' }, app_metadata: { provider: 'email' } } };
}
try {
  for (const authenticated of [false, true]) {
    const context = await browser.newContext({ viewport: { width: authenticated ? 1440 : 390, height: authenticated ? 900 : 844 } });
    let disconnected = false;
    if (authenticated) await context.addInitScript(value => localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token', JSON.stringify(value)), session());
    await context.route('https://gkwphadbveiyjcwiiizw.supabase.co/**', async route => {
      if (disconnected) return route.abort('internetdisconnected');
      const path = new URL(route.request().url()).pathname;
      let body = [];
      if (path.endsWith('/profiles') && route.request().headers()['accept']?.includes('object')) body = { id: uid, full_name: 'ALUNO TESTE', onboarding_completed: true, subscription_tier: 'premium', is_activated: true, created_at: new Date().toISOString() };
      else if (path.endsWith('/user_roles')) body = [{ user_id: uid, role: 'user' }];
      else if (path.endsWith('/verify_account_session')) body = true;
      else if (path.endsWith('/has_role')) body = false;
      else if (path.endsWith('/user')) body = session().user;
      else if (path.endsWith('/server_now')) body = new Date().toISOString();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
    });
    const page = await context.newPage();
    await page.goto(`${base}${authenticated ? '/dashboard/profile' : '/auth?recovery=false'}`);
    await page.locator('#norte-initial-loading').waitFor({ state: 'hidden', timeout: 25000 });
    if (authenticated) await page.locator('.app-shell').waitFor({ timeout: 25000 });
    else await page.getByLabel('E-mail', { exact: true }).fill('draft@example.test', { timeout: 15000 }).catch(async error => { console.log('INITIAL PAGE', page.url(), (await page.locator('body').innerText()).slice(0, 2000)); throw error; });
    const frame = page.frameLocator('iframe[data-norte-offline]');
    await frame.locator('.badge-front').evaluate(img => img.decode());
    assert.equal(await page.locator('.offline-connection').isVisible(), false);
    const originalURL = page.url(); let navigations = 0;
    page.on('framenavigated', frame => { if (frame === page.mainFrame()) navigations++; });
    disconnected = true;
    await context.setOffline(true);
    await page.getByRole('dialog', { name: 'Você está sem conexão' }).waitFor({ timeout: 4000 });
    await frame.getByRole('heading', { name: 'Você está sem conexão.' }).waitFor();
    assert.equal(await frame.locator('.scene').evaluate(img => img.naturalWidth), 1942);
    assert.equal(await page.locator('#norte-platform-surface').evaluate(node => node.inert), true);
    assert.equal(navigations, 0, 'connection loss cannot navigate or replay startup');
    assert.equal(page.url(), originalURL);
    await frame.getByRole('button', { name: 'Tentar reconectar' }).click();
    await frame.getByText('Conexão ainda indisponível.').waitFor();
    assert.equal(navigations, 0, 'embedded retry must not reload the host page');
    if (authenticated) {
      // The root overlay must survive the auth guard replacing its own children.
      await page.getByRole('heading', { name: 'Não foi possível confirmar seu acesso', includeHidden: true }).waitFor({ state: 'attached', timeout: 15000 });
      assert.equal(await page.locator('.offline-connection').isVisible(), true);
    } else {
      assert.equal(await page.getByLabel('E-mail', { exact: true }).inputValue(), 'draft@example.test', 'keep the same mounted form and its draft');
    }
    disconnected = false;
    await context.setOffline(false);
    await page.locator('.offline-connection').waitFor({ state: 'hidden', timeout: 12000 });
    assert.equal(navigations, 0, 'reconnection restores the existing page without a reload');
    assert.equal(page.url(), originalURL);
    assert.equal(await page.locator('#norte-platform-surface').evaluate(node => node.inert), false);
    if (!authenticated) assert.equal(await page.getByLabel('E-mail', { exact: true }).inputValue(), 'draft@example.test');
    // HTTP detection covers internet loss while navigator.onLine remains true.
    let headReachable = false;
    await context.route('**/favicon.svg', route => route.request().method() === 'HEAD'
      ? headReachable ? route.fulfill({ status: 200, body: '' }) : route.abort('internetdisconnected')
      : route.continue());
    await page.getByRole('dialog', { name: 'Você está sem conexão' }).waitFor({ timeout: 16000 });
    assert.equal(await page.evaluate(() => navigator.onLine), true);
    headReachable = true;
    await frame.getByRole('button', { name: 'Tentar reconectar' }).click();
    await page.locator('.offline-connection').waitFor({ state: 'hidden', timeout: 10000 });
    assert.equal(navigations, 0);
    await context.close();
    console.log(`PASS ${authenticated ? 'authenticated' : 'public'}: automatic offline screen, loaded images, guarded session, manual retry, HTTP detection and recovery without navigation`);
  }
} finally { await browser.close(); }
