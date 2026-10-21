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
async function seeded(role) {
 const context=await browser.newContext();const calls=await mock(context,role);
 await context.addInitScript(({key,value})=>{if(!sessionStorage.getItem('qa-seeded')){localStorage.setItem(key,JSON.stringify(value));sessionStorage.setItem('qa-seeded','1');}},{key:storageKey,value:session(role)});
 return {context,calls};
}
const blocked = page => page.getByRole('heading',{name:'Sua sessão já está aberta em outra aba'});
try {
 for(const role of ['user','admin']){
  const {context,calls}=await seeded(role);const first=await context.newPage();first.on('pageerror',e=>console.log('PAGE ERROR',e.message));await first.goto(base+'/dashboard/profile');await first.locator('.app-shell').waitFor({timeout:20000}).catch(async e=>{console.log((await first.locator('body').innerText()).slice(0,1800));console.log(await first.evaluate(()=>navigator.locks.query()));throw e;});
  const second=await context.newPage();await second.goto(base+'/dashboard/profile');await blocked(second).waitFor();
  assert.equal(await second.locator('.app-shell').count(),0);assert.equal(calls.logout,0);assert.ok(await first.evaluate(key=>!!localStorage.getItem(key),storageKey));
  await second.getByRole('button',{name:'Tentar novamente'}).click();await blocked(second).waitFor();assert.equal(calls.logout,0);
  await first.reload();await first.locator('.app-shell').waitFor({timeout:20000}).catch(async e=>{console.log('RELOAD',role,(await first.locator('body').innerText()).slice(0,1200));console.log(await first.evaluate(()=>navigator.locks.query()));throw e;});await blocked(second).waitFor();
  await first.goto(base+'/dashboard/library');await first.locator('.app-shell').waitFor();await blocked(second).waitFor();
  await second.screenshot({path:`/tmp/norte-duplicate-tab-${role}.png`});
  await first.close();await second.getByRole('button',{name:'Tentar novamente'}).click();await second.locator('.app-shell').waitFor();
  assert.equal(calls.logout,0);assert.equal(calls.ownership,0);await context.close();
  console.log('PASS',role,'duplicate blocked, first retains auth, reload, navigation and close/retry');
 }
 {
  const {context,calls}=await seeded('user');const pages=await Promise.all([context.newPage(),context.newPage()]);
  await Promise.all(pages.map(page=>page.goto(base+'/dashboard/profile')));
  await Promise.all(pages.map(page=>page.locator('.app-shell, [data-session-tab-state="blocked"]').waitFor()));
  const owners=await Promise.all(pages.map(page=>page.locator('.app-shell').count()));assert.equal(owners.reduce((a,b)=>a+b,0),1);assert.equal(calls.logout,0);
  await context.close();console.log('PASS simultaneous opening: exactly one active panel');
 }
 {
  // A fresh login can issue another JWT session_id even in the same browser.
  // Separate per-page seeded tokens reproduce that without production auth writes.
  const context=await browser.newContext();await mock(context,'user');
  const first=await context.newPage();
  await first.addInitScript(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:storageKey,value:session('user')});
  await first.goto(base+'/dashboard/profile');await first.locator('.app-shell').waitFor();
  const second=await context.newPage();const fresh=session('user');
  const payload=JSON.parse(Buffer.from(fresh.access_token.split('.')[1],'base64url').toString());
  payload.session_id='33333333-3333-4333-8333-333333333333';
  fresh.access_token=fresh.access_token.split('.')[0]+'.'+Buffer.from(JSON.stringify(payload)).toString('base64url')+'.test';
  await second.addInitScript(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:storageKey,value:fresh});
  await second.goto(base+'/dashboard/profile');await blocked(second).waitFor();
  await first.locator('.app-shell').waitFor();assert.equal(await second.locator('.app-shell').count(),0);
  // Auth broadcasts / token rotation must not release the original document lock.
  await first.evaluate(value=>window.dispatchEvent(new StorageEvent('storage',{key:'sb-gkwphadbveiyjcwiiizw-auth-token',newValue:JSON.stringify(value)})),fresh);
  await second.getByRole('button',{name:'Tentar novamente'}).click();await blocked(second).waitFor();
  await first.close();await second.getByRole('button',{name:'Tentar novamente'}).click();await second.locator('.app-shell').waitFor();
  await context.close();console.log('PASS fresh login with a different session_id cannot bypass browser tab ownership');
 }
 {
  const {context}=await seeded('user');await context.addInitScript(()=>Object.defineProperty(navigator,'locks',{value:undefined}));
  const page=await context.newPage();await page.goto(base+'/dashboard/profile');await page.locator('[data-session-tab-state="unavailable"]').waitFor();
  assert.equal(await page.locator('.app-shell').count(),0);await context.close();console.log('PASS unavailable lock service: access remains blocked');
 }
}finally{await browser.close();}
