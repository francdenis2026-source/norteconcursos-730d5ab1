/** Fullscreen and mobile safe-area regression with mocked authentication; no production writes.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/workspace-fullscreen.mjs
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
    else if (path.endsWith('/verify_account_session')) body = true;
    else if (path.endsWith('/server_now')) body = new Date().toISOString();
    else if (path.endsWith('/active_user_sessions')) body = { session_key: 'another-tab-old-key' };
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body), headers: { 'access-control-allow-origin': '*' } });
  });
  return calls;
}

async function contextFor(width,height,{seed=true,coarse=false,noNative=true}={}) {
  const context=await browser.newContext({viewport:{width,height},...(coarse?{isMobile:true,hasTouch:true}:{})});
  await mock(context,'user');
  await context.addInitScript(({key,value,seed,noNative})=>{
    localStorage.setItem('theme','dark');
    localStorage.setItem('norte_sidebar_collapsed','0');
    if(noNative) Object.defineProperty(document,'fullscreenEnabled',{configurable:true,get:()=>false});
    if(seed&&!sessionStorage.getItem('qa-seeded')){localStorage.setItem(key,JSON.stringify(value));sessionStorage.setItem('qa-seeded','1');}
  },{key:storageKey,value:session('user'),seed,noNative});
  return context;
}
try {
for(const width of [1366,820,390,320]){
 const c=await contextFor(width,950,{coarse:width<1024});const p=await c.newPage();await p.goto(base+'/dashboard/study-tools');
 await p.locator('.focus-session-clock').waitFor();
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await p.getByRole('tab',{name:'Foco 50 min',exact:true}).click();
 assert.equal(await p.getByRole('tab',{name:'Foco 50 min',exact:true}).getAttribute('aria-selected'),'true');
 await p.getByRole('tab',{name:'Pausa 5 min',exact:true}).click();
 assert.equal(await p.getByRole('tab',{name:'Pausa 5 min',exact:true}).getAttribute('aria-selected'),'true');
 await p.getByRole('button',{name:'Ativar modo foco',exact:true}).click();
 await p.locator('.app-shell[data-focus-mode="true"]').waitFor();
 assert.equal(await p.locator('.app-sidebar').isVisible(),false);
 await p.getByRole('button',{name:'Sair da tela cheia',exact:true}).click();
 await p.locator('.app-shell[data-focus-mode="false"]').waitFor();
 await p.locator('.focus-session-card').screenshot({path:'/tmp/focus-redesign-'+width+'.png'});
 if(width===1366)await p.locator('.app-sidebar').screenshot({path:'/tmp/sidebar-redesign.png'});
 await c.close();console.log('PASS focus',width,'mode selection, layout and no overflow');
}
}finally{await browser.close()}
