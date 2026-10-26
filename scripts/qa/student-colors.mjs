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
 for(const width of [1366,820,390]){
  const context=await contextFor(width,1000,{coarse:width<1024});const page=await context.newPage();
  await page.goto(base+'/dashboard/study-plan');
  await page.getByText('Defina seu objetivo').waitFor();
  const careers=page.locator('button[data-control-tone][aria-pressed]').filter({hasText:/PF|PRF|PC/});
  assert.equal(await careers.count(),3);
  const colors=await careers.evaluateAll(nodes=>nodes.map(n=>getComputedStyle(n).getPropertyValue('--control-accent').trim()));
  assert.equal(new Set(colors).size,3);
  await careers.filter({hasText:'PRF'}).click();
  assert.equal(await careers.filter({hasText:'PRF'}).getAttribute('aria-pressed'),'true');
  await page.getByRole('button',{name:'15h',exact:true}).click();
  assert.equal(await page.getByRole('button',{name:'15h',exact:true}).getAttribute('aria-pressed'),'true');
  const ratios=await page.locator('button[data-control-tone][aria-pressed="true"],.study-planning-nav a[aria-current="page"]').evaluateAll(nodes=>{
   const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d');
   const lum=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);const px=ctx.getImageData(0,0,1,1).data;const c=[...px].slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return .2126*c[0]+.7152*c[1]+.0722*c[2]};
   return nodes.map(n=>{const s=getComputedStyle(n),a=lum(s.color),b=lum(s.backgroundColor);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)});
  });
  assert.ok(ratios.every(r=>r>=4.5),JSON.stringify(ratios));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:`/tmp/student-colors-${width}.png`,fullPage:false});
  await context.close();console.log('PASS',width,'career and time selection, distinct colors, text contrast >=4.5, no overflow');
 }
} finally {await browser.close();}
