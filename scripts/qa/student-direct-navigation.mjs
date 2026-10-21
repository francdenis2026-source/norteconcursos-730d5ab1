/** Student navigation regression with mocked authentication; no production writes.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/student-direct-navigation.mjs
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
async function seeded(role) {
 const context=await browser.newContext();const calls=await mock(context,role);
 await context.addInitScript(({key,value})=>{if(!sessionStorage.getItem('qa-seeded')){localStorage.setItem(key,JSON.stringify(value));sessionStorage.setItem('qa-seeded','1');}},{key:storageKey,value:session(role)});
 return {context,calls};
}

const sections=[['Planejamento','/dashboard/study-coach'],['Meu concurso','/dashboard/my-contest'],['Material didático','/dashboard/material'],['Ferramentas','/dashboard/study-tools'],['Questões','/dashboard/question-trainer'],['Provas','/dashboard/mock-exams'],['ENEM','/dashboard/enem'],['Desempenho','/dashboard/performance'],['Conta','/dashboard/profile']];
try {
 const {context}=await seeded('user');const p=await context.newPage();await p.setViewportSize({width:1366,height:900});await p.goto(base+'/dashboard/profile');await p.locator('.app-shell').waitFor();
 const sidebar=p.locator('.app-sidebar .student-direct-navigation');assert.equal(await sidebar.locator('button,[aria-expanded],.app-nav__entries').count(),0);assert.equal(await sidebar.getByRole('link').count(),10);
 for(const [group,path] of sections){console.log('Checking section',group);await sidebar.locator(`a.nav-section-link[href="${path}"]`).click();await p.waitForURL(url=>url.pathname===path);await sidebar.locator('.nav-section-link[data-active="true"]').waitFor();assert.equal(await sidebar.locator('button,[aria-expanded]').count(),0);if(group==='Planejamento'||group==='ENEM')assert.equal(await p.locator('.workspace-section-nav').count(),0);else assert.ok(await p.locator('.workspace-section-nav a').count()>=2);}
 await p.getByRole('button',{name:'Recolher menu lateral',exact:true}).click();
 await sidebar.locator('a[href="/dashboard/material"]').click();await p.waitForURL(url=>url.pathname==='/dashboard/material');assert.equal(await p.getByRole('menu').count(),0);assert.equal(await sidebar.locator('button,[aria-expanded]').count(),0);
 await p.locator('.workspace-section-nav a[href*="/dashboard/library"]').click();await p.waitForURL(url=>url.pathname==='/dashboard/library'&&url.searchParams.get('collection')==='laws');assert.equal(await p.locator('.workspace-section-nav a[aria-current="page"]').count(),1);
 await p.getByRole('button',{name:'Expandir menu lateral',exact:true}).click();
 await p.screenshot({path:'/tmp/norte-direct-navigation-desktop.png'});
 await p.goto(base+'/dashboard/study-plan');await p.locator('.app-shell').waitFor();assert.equal(await sidebar.locator('a[href="/dashboard/study-coach"]').getAttribute('data-active'),'true');assert.equal(await p.locator('.workspace-section-nav').count(),0);
 await context.close();console.log('PASS all nine section destinations, compact sidebar, exact library query and deep-route highlight; no student accordions or flyouts');
 for(const width of [390,820]) {
  const ctx=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true});await mock(ctx,'user');await ctx.addInitScript(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:storageKey,value:session('user')});
  const page=await ctx.newPage();await page.goto(base+'/dashboard/profile');await page.locator('.app-shell').waitFor();await page.getByRole('button',{name:'Abrir menu completo',exact:true}).click();
  const menu=page.locator('.app-sheet .student-direct-navigation');await menu.waitFor();assert.equal(await menu.locator('button,[aria-expanded]').count(),0);
  await menu.locator('a[href="/dashboard/material"]').click();await page.waitForURL(url=>url.pathname==='/dashboard/material');await page.locator('.app-sheet').waitFor({state:'hidden'});
  await page.locator('.workspace-section-nav a[href="/dashboard/media"]').click();await page.waitForURL(url=>url.pathname==='/dashboard/media');
  const m=await page.evaluate(()=>({content:document.getElementById('dashboard-content').getBoundingClientRect().toJSON(),dock:document.querySelector('.app-bottom-nav').getBoundingClientRect().toJSON(),overflow:document.documentElement.scrollWidth>innerWidth,active:document.querySelector('.workspace-section-nav a[aria-current="page"]').getBoundingClientRect().toJSON()}));
  assert.equal(m.overflow,false);assert.ok(m.content.bottom<=m.dock.top+1);assert.ok(m.active.left>=0&&m.active.right<=width+1,JSON.stringify(m));
  await page.screenshot({path:`/tmp/norte-direct-navigation-mobile-${width}.png`});await ctx.close();console.log('PASS mobile drawer direct navigation, closed after click, contextual selection and independent content scroll:',width);
 }
 {
  const {context:ctx}=await seeded('admin');const page=await ctx.newPage();await page.goto(base+'/dashboard/profile');await page.locator('.app-shell').waitFor();assert.equal(await page.locator('.student-direct-navigation,.workspace-section-nav').count(),0);
  const admin=page.locator('.app-sidebar .app-nav__heading').filter({hasText:'Administração'});await admin.click();assert.equal(await admin.getAttribute('aria-expanded'),'true');await page.locator('.app-sidebar a[href="/dashboard/admin-finance"]').click();await page.waitForURL(url=>url.pathname==='/dashboard/admin-finance');await ctx.close();console.log('PASS administrator navigation preserved');
 }
}finally{await browser.close();}
