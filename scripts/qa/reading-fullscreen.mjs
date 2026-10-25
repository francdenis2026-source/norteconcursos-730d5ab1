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
 const scenarios=[{width:1366,native:true,expanded:false},{width:1366,native:false,expanded:false},{width:1366,native:true,expanded:true},{width:390,native:false,expanded:false},{width:820,native:false,expanded:false}];
 for(const scenario of scenarios){
  const context=await contextFor(scenario.width,900,{coarse:scenario.width<1024,noNative:!scenario.native});
  const material={id:'qa-material',slug:'portugues-qa',discipline:'Língua Portuguesa',topic_label:'Leitura',title:'Leitura de teste',summary:'Material local para validar o espaço de leitura.',sort_order:1,content_status:'active',contest_name:null,syllabus_topic_order:null,law_version_checked_at:null,updated_at:'2026-10-25T00:00:00Z',body_md:'## Compreensão\n\nIdentifique a informação expressa.\n\n### Exemplo resolvido\n\n**Conclusão:** considere o texto completo.\n\n## Inferência\n\nUse as pistas do texto.',quiz:[],flashcards:[],legal_basis:[],source_note:'Teste local.',legal_review:null,practice_review:null};
  await context.route('https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/study_materials*',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(new URL(route.request().url()).searchParams.get('slug')?material:[material])}));
  const p=await context.newPage();
  await p.goto(base+'/dashboard/library/portugues-qa');
  const start=p.getByRole('button',{name:'Iniciar leitura cronometrada',exact:true});await start.waitFor();
  assert.equal(await p.getByRole('button',{name:'Tela cheia de leitura',exact:true}).count(),0);
  if(scenario.expanded)await p.getByRole('button',{name:'Expandir área de estudo em tela cheia',exact:true}).click();
  await start.click();
  await p.locator('html[data-reading-focus="true"]').waitFor({state:'attached'});
  assert.equal(await p.locator('.app-shell').getAttribute('data-focus-mode'),'true');
  assert.equal(await p.locator('.app-sidebar').isVisible(),false);
  assert.equal(await p.locator('.workspace-focus-controls').isVisible(),false);
  if(scenario.native)await p.waitForFunction(()=>document.fullscreenElement===document.documentElement);
  const bounds=await p.locator('.focus-study-container').boundingBox();
  const dimensions=await p.evaluate(()=>({width:innerWidth,height:innerHeight}));
  assert.ok(bounds.x<=1&&bounds.width>=dimensions.width-2,'reading uses entire viewport width');
  assert.ok(bounds.y<=1&&bounds.height>=dimensions.height-2,'reading uses entire viewport height');
  const clock=p.locator('.focus-study-bar .font-mono');
  await p.waitForFunction(()=>document.querySelector('.focus-study-bar .font-mono')?.textContent!=='00:00:00');
  await p.getByRole('button',{name:'Pausar contagem',exact:true}).click();
  const paused=await clock.innerText();await p.waitForTimeout(1100);assert.equal(await clock.innerText(),paused);
  await p.getByRole('button',{name:'Retomar contagem',exact:true}).click();
  // A denied exit keeps the timer, layout and the material mounted.
  await p.getByRole('button',{name:'Encerrar leitura cronometrada',exact:true}).click();
  await p.screenshot({path:'/tmp/reading-confirm-debug.png'});
  await p.getByRole('button',{name:'Continuar estudando',exact:true}).click();
  assert.equal(await p.locator('.focus-study-container').count(),1);
  await p.screenshot({path:`/tmp/norte-reading-full-${scenario.width}-${scenario.native}-${scenario.expanded}.png`});
  if(scenario.native&&!scenario.expanded){
   await p.evaluate(()=>document.exitFullscreen());
   await p.getByRole('button',{name:'Continuar estudando',exact:true}).click();
   assert.equal(await p.locator('.app-shell').getAttribute('data-focus-mode'),'true','cancel browser exit keeps expanded reading');
  }
  await p.getByRole('button',{name:'Encerrar leitura cronometrada',exact:true}).click();
  await p.getByRole('button',{name:'Encerrar',exact:true}).click();
  await p.locator('.focus-study-container').waitFor({state:'detached'});
  await p.locator('html[data-reading-focus="true"]').waitFor({state:'detached'});
  assert.equal(await p.locator('.app-shell').getAttribute('data-focus-mode'),String(scenario.expanded));
  assert.equal(await p.evaluate(()=>localStorage.getItem('norte_sidebar_collapsed')),'0');
  if(!scenario.expanded)assert.equal(await p.locator('.app-topbar').isVisible(),true);
  await context.close();console.log('PASS reading',JSON.stringify(scenario),'timer, pause, confirmation, viewport, prior layout restoration');
 }
} finally {await browser.close();}
