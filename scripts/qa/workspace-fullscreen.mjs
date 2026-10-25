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
async function assertFocus(page,desktop) {
  await page.locator('.app-shell[data-focus-mode="true"]').waitFor();
  assert.equal(await page.locator('.app-topbar').isVisible(),false);
  assert.equal(await page.locator('.workspace-section-nav').isVisible(),false);
  assert.equal(await page.locator('.app-bottom-nav').isVisible(),false);
  assert.equal(await page.locator('.workspace-focus-controls button').count(),2);
  assert.equal(await page.locator('.app-sidebar').isVisible(),false);
  const c=await page.locator('#dashboard-content').boundingBox(), controls=await page.locator('.workspace-focus-controls').boundingBox();
  assert.ok(c.y>=controls.y+controls.height-1,'controls never overlap study content');
  const dimensions=await page.evaluate(()=>({w:innerWidth,h:innerHeight,sw:document.documentElement.scrollWidth}));
  assert.ok(c.x+c.width<=dimensions.w+1&&c.y+c.height<=dimensions.h+1,'content fits viewport');
  assert.ok(dimensions.sw<=dimensions.w,'no horizontal page overflow');
}
try {
  for(const native of [false,true]) {
    const context=await contextFor(1366,900,{noNative:!native});
    const p=await context.newPage();await p.goto(base+'/dashboard/profile');await p.locator('.app-shell').waitFor();
    await p.evaluate(()=>{const node=document.createElement('div');node.style.height='1800px';node.dataset.qaFiller='1';document.querySelector('.app-content__inner').append(node);window.scrollTo(0,220);});
    const entry=p.getByRole('button',{name:'Expandir área de estudo em tela cheia',exact:true});
    await entry.click();await assertFocus(p,true);
    if(native)await p.waitForFunction(()=>document.fullscreenElement===document.documentElement);
    await p.getByRole('button',{name:'Ativar tema claro',exact:true}).click();
    assert.equal(await p.evaluate(()=>document.documentElement.classList.contains('dark')),false);
    await p.keyboard.press('Control+k');await p.locator('.navigation-command').waitFor();await p.keyboard.press('Escape');
    await p.locator('.navigation-command').waitFor({state:'hidden'});
    assert.equal(await p.locator('.app-shell').getAttribute('data-focus-mode'),'true','closing a dialog must not leave focus mode');
    if(native)await p.evaluate(()=>document.exitFullscreen());
    else await p.getByRole('button',{name:'Restaurar visualização',exact:true}).click();
    await p.locator('.app-shell[data-focus-mode="false"]').waitFor();assert.equal(await p.locator('.app-topbar').isVisible(),true);
    assert.equal(await p.locator('.app-sidebar').getAttribute('data-collapsed'),'false','original sidebar preference restored');
    assert.equal(await p.evaluate(()=>localStorage.getItem('norte_sidebar_collapsed')),'0');
    await entry.click();await assertFocus(p,true);
    await p.screenshot({path:`/tmp/norte-focus-desktop-${native?'native':'fallback'}.png`});
    await p.keyboard.press('Escape');await p.locator('.app-shell[data-focus-mode="false"]').waitFor();
    await context.close();console.log(`PASS desktop ${native?'native Fullscreen API':'CSS fallback'}: hidden sidebar, full-width content, theme, modal Escape, browser exit and preference restoration`);
  }
  for(const width of [320,390,820,1180]) {
    const context=await contextFor(width,900,{coarse:true});const p=await context.newPage();
    const cdp=await context.newCDPSession(p);await cdp.send('Emulation.setSafeAreaInsetsOverride',{insets:{top:44,bottom:24,left:0,right:0}});
    await p.goto(base+'/dashboard/profile');await p.locator('.app-shell').waitFor();
    const back=p.locator('.platform-back');const rect=await back.boundingBox();
    assert.ok(rect.y>=44&&rect.height>=44,'back target below simulated notch');
    await back.click();await p.waitForURL(base+'/dashboard');
    await p.locator('.app-shell').waitFor();
    if(width<1024){await p.getByRole('button',{name:'Abrir menu',exact:true}).click();await p.getByRole('button',{name:'Expandir área de estudo',exact:true}).click();}
    else await p.getByRole('button',{name:'Expandir área de estudo em tela cheia',exact:true}).click();
    await assertFocus(p,width>=1024);
    const controls=await p.getByRole('button',{name:'Restaurar visualização',exact:true}).boundingBox();assert.ok(controls.y>=44);
    await p.screenshot({path:`/tmp/norte-focus-touch-${width}.png`});
    await p.getByRole('button',{name:'Restaurar visualização',exact:true}).click();
    await p.locator('.app-shell[data-focus-mode="false"]').waitFor();
    if(width<1024)assert.equal(await p.locator('.app-bottom-nav').isVisible(),true);
    await context.close();console.log(`PASS touch ${width}: 44px cutout, reachable back, focus layout, safe restore and normal navigation`);
  }
  for(const width of [320,390,820]) {
    const context=await contextFor(width,740,{seed:false,coarse:true});const p=await context.newPage();
    const cdp=await context.newCDPSession(p);await cdp.send('Emulation.setSafeAreaInsetsOverride',{insets:{top:44,bottom:24,left:0,right:0}});
    await p.goto(base+'/auth?reason=inactive');await p.locator('html[data-norte-boot="ready"]').waitFor();
    const home=p.getByRole('link',{name:'Página inicial',exact:true});await home.waitFor();
    let rect=await home.boundingBox();assert.ok(rect.y>=44&&rect.height>=44&&rect.x>=0&&rect.x+rect.width<=width,'homepage link safely positioned after logout');
    await p.getByRole('tab',{name:'Criar conta',exact:true}).click();
    await p.locator('.auth-panel').evaluate(node=>{node.scrollTop=300;});
    rect=await home.boundingBox();assert.ok(rect.y>=44,'homepage link stays below notch when scrolling registration');
    await home.click();await p.waitForURL(base+'/');
    await context.close();console.log(`PASS auth ${width}: visible homepage button after logout and during form scrolling`);
  }
  {
    const context=await contextFor(390,844,{coarse:true});const owner=await context.newPage();
    await owner.goto(base+'/dashboard/profile');await owner.locator('.app-shell').waitFor();
    const blocked=await context.newPage();await blocked.goto(base+'/dashboard/profile');
    await blocked.getByRole('heading',{name:'Sua sessão já está aberta em outra aba'}).waitFor();
    await blocked.getByRole('link',{name:'Página inicial',exact:true}).click();await blocked.waitForURL(base+'/');
    await blocked.locator('.home').waitFor();assert.equal(await blocked.locator('.app-shell').count(),0);
    assert.equal(await owner.locator('.app-shell').count(),1,'public-home escape does not log out the owner');
    await context.close();console.log('PASS blocked session can reach public homepage while protected dashboard stays blocked');
  }
} finally {await browser.close();}
