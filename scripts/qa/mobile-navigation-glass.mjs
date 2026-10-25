/** Mobile dock regression: scroll shielding, touch targets and panel navigation.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/mobile-navigation-glass.mjs
 * Supabase responses and account data are mocked; no production writes.
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
async function seeded(role) {
 const context=await browser.newContext({isMobile:true,hasTouch:true});const calls=await mock(context,role);
 await context.addInitScript(({key,value})=>{if(!sessionStorage.getItem('qa-seeded')){localStorage.setItem(key,JSON.stringify(value));sessionStorage.setItem('qa-seeded','1');}},{key:storageKey,value:session(role)});
 return {context,calls};
}

try {
 for(const width of [320,390,820]) {
  const {context}=await seeded('user');const page=await context.newPage();await page.setViewportSize({width,height:844});
  await page.goto(base+'/');await page.waitForFunction(()=>document.documentElement.dataset.norteBoot==='ready');
  await page.waitForFunction(()=>document.documentElement.dataset.norteIntroConsumed==='true');await page.locator('.home-intro').waitFor({state:'detached',timeout:15000});
  for(const theme of ['light','dark']) {
   await page.evaluate(theme=>document.documentElement.classList.toggle('dark',theme==='dark'),theme);await page.waitForTimeout(350);
   for(const ratio of [0,.5,1]) {
    await page.evaluate(r=>scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*r),ratio);await page.waitForTimeout(150);
    const m=await page.locator('.mobile-nav-shelf').evaluate(el=>{const r=el.getBoundingClientRect(),nav=el.querySelector('nav'),links=[...nav.querySelectorAll('a')].map(a=>a.getBoundingClientRect().toJSON());return {bottom:r.bottom,width:r.width,screen:innerHeight,viewport:innerWidth,links,bg:getComputedStyle(el).backgroundColor,overflow:document.documentElement.scrollWidth>innerWidth};});
    assert.ok(Math.abs(m.bottom-m.screen)<1);assert.equal(m.width,m.viewport);assert.equal(m.overflow,false);assert.ok(m.links.every(l=>l.height>=44&&l.width>=44));
   }
   const footerBottom=await page.locator('.home-footer__bottom').evaluate(el=>el.getBoundingClientRect().bottom);
   const shelfTop=await page.locator('.mobile-nav-shelf').evaluate(el=>el.getBoundingClientRect().top);assert.ok(footerBottom<=shelfTop+1,'last content remains above the dock');
   await page.evaluate(()=>{const marker=document.createElement('div');marker.id='qa-under-dock';Object.assign(marker.style,{position:'fixed',inset:'auto 0 0',height:'180px',background:'#ff0000',zIndex:'1'});document.querySelector('.home').append(marker);});
   await page.waitForTimeout(100);const red=await page.locator('.mobile-nav-shelf').screenshot();
   await page.evaluate(()=>document.getElementById('qa-under-dock').style.background='#0000ff');await page.waitForTimeout(100);const blue=await page.locator('.mobile-nav-shelf').screenshot();
   assert.ok(red.equals(blue),'moving content colors cannot show through the protected shelf');
   await page.evaluate(()=>document.getElementById('qa-under-dock').remove());await page.screenshot({path:`/tmp/norte-mobile-dock-home-${width}-${theme}.png`});
   console.log('PASS homepage',width,theme,'scroll protection, glass, touch targets and footer clearance');
  }
  await page.goto(base+'/dashboard/profile');await page.locator('.app-shell').waitFor();
  for(const theme of ['light','dark']) {
   await page.evaluate(theme=>document.documentElement.classList.toggle('dark',theme==='dark'),theme);await page.waitForTimeout(350);
   const nav=page.locator('.app-bottom-nav');await nav.waitFor();
   await page.locator('#dashboard-content').evaluate(el=>el.scrollTop=el.scrollHeight);
   const layout=await page.evaluate(()=>{const nav=document.querySelector('.app-bottom-nav'),content=document.getElementById('dashboard-content');return {nav:nav.getBoundingClientRect().toJSON(),content:content.getBoundingClientRect().toJSON(),position:getComputedStyle(nav).position,glass:getComputedStyle(nav).backdropFilter,overflow:document.documentElement.scrollWidth>innerWidth};});
   assert.ok(layout.content.bottom<=layout.nav.top+1);assert.equal(layout.position,'relative');assert.equal(layout.overflow,false);assert.ok(layout.glass.includes('blur'));
   await page.screenshot({path:`/tmp/norte-mobile-dock-panel-${width}-${theme}.png`});console.log('PASS panel',width,theme,'scrollport stays above glass dock');
  }
  await page.getByRole('button',{name:'Abrir menu completo',exact:true}).click();await page.locator('.app-sheet').waitFor();await page.keyboard.press('Escape');
  await context.close();
 }
}finally {await browser.close();}
