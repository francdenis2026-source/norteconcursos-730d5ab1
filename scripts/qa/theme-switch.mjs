/** Verify the actual buttons and first-frame palette in Chromium with mocked account data.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/theme-switch.mjs
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

try {
 for(const width of [1366,390]) {
  const {context}=await seeded('user');const page=await context.newPage();await page.setViewportSize({width,height:844});
  for(const path of ['/','/dashboard/profile']) {
   await page.goto(base+path);await page.waitForFunction(()=>document.documentElement.dataset.norteBoot==='ready');
   if(path==='/') {await page.waitForFunction(()=>document.documentElement.dataset.norteIntroConsumed==='true');await page.locator('.home-intro').waitFor({state:'detached',timeout:15000});}
   else await page.locator('.app-shell').waitFor();
   const selector=path==='/'?'.lp-theme-toggle':'.app-theme-toggle';await page.locator(selector).waitFor();
   // Warm both local artwork surfaces before measuring color transition behavior.
   await page.locator('.police-insignia').evaluateAll(async images=>Promise.all(images.map(img=>img.decode().catch(()=>{}))));
   for(let n=0;n<2;n++) {
    const result=await page.evaluate(async selector=>{
     const sample=()=>[...document.querySelectorAll('body,.home-header,.home-faq,.home-plan,.app-sidebar,.app-topbar,.app-top-btn,.student-profile-card,.app-shell')].map(el=>{const c=getComputedStyle(el);return [el.className,c.color,c.backgroundColor,c.borderColor,c.boxShadow];});
     sample();const old=document.documentElement.classList.contains('dark');const start=performance.now();document.querySelector(selector).click();
     const synchronous=document.documentElement.classList.contains('dark')!==old;
     await new Promise(requestAnimationFrame);const elapsed=performance.now()-start,first=sample();
     const transitions=document.getAnimations().filter(a=>a instanceof CSSTransition&&/color|background|border|shadow|fill|stroke/.test(a.transitionProperty)).map(a=>a.transitionProperty);
     await new Promise(r=>setTimeout(r,450));const final=sample();
     const artwork=[...document.querySelectorAll('.police-insignia[data-insignia-theme]')].filter(el=>{const c=getComputedStyle(el);return c.display!=='none'&&c.visibility!=='hidden';}).map(el=>el.dataset.insigniaTheme);
     return {artwork,synchronous,elapsed,transitions,changedAfterFirstFrame:JSON.stringify(first)!==JSON.stringify(final),theme:document.documentElement.classList.contains('dark')?'dark':'light',switching:document.documentElement.hasAttribute('data-theme-switching')};
    },selector);
    console.log(width,path,result);assert.ok(result.synchronous);
    assert.deepEqual(result.transitions,[]);assert.equal(result.changedAfterFirstFrame,false);assert.equal(result.switching,false);
    assert.ok(result.artwork.every(theme=>theme===result.theme));
   }
   const rapid=await page.evaluate(async selector=>{
    const button=document.querySelector(selector),sample=document.querySelector('.home-button,.app-top-btn');
    const before=getComputedStyle(sample).transitionDuration;
    for(let i=0;i<10;i++)button.click();
    await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);
    return {switching:document.documentElement.hasAttribute('data-theme-switching'),before,after:getComputedStyle(sample).transitionDuration,stored:localStorage.getItem('theme'),active:document.documentElement.classList.contains('dark')?'dark':'light'};
   },selector);
   assert.equal(rapid.switching,false);assert.equal(rapid.after,rapid.before);assert.equal(rapid.stored,rapid.active);
   console.log('PASS rapid switching and restored interactions',width,path);
  }
  await context.close();
 }
}finally{await browser.close();}
