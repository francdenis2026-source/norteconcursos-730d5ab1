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
    else if (path.endsWith('/profiles')) body = { id: uid, full_name: 'CONTA DE TESTE', onboarding_completed: true, subscription_tier: 'premium', subscription_expires_at: '2030-01-01T00:00:00Z', is_activated: true, created_at: new Date().toISOString() };
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
 await context.addInitScript(({key,value})=>{localStorage.setItem(key,JSON.stringify(value));},{key:storageKey,value:session(role)});
 return {context,calls};
}


const sections=[
 ['Meu planejamento','/dashboard/study-coach',['/dashboard/study-coach','/dashboard/cronograma','/dashboard/study-plan','/dashboard/study-tools']],
 ['Meu objetivo','/dashboard/my-contest',['/dashboard/my-contest','/dashboard/edital','/dashboard/careers','/dashboard/questions','/dashboard/edital-radar','/dashboard/exam-panorama','/dashboard/perfil-bancas']],
 ['Materiais','/dashboard/material',['/dashboard/material','/dashboard/library','/dashboard/leis','/dashboard/ctb','/dashboard/calculadora-penal','/dashboard/disciplinas','/dashboard/media','/dashboard/dicionario','/dashboard/essays']],
 ['Questões e revisão','/dashboard/question-trainer',['/dashboard/question-trainer','/dashboard/errors','/dashboard/flashcards','/dashboard/notebooks','/dashboard/question-bank']],
 ['Provas','/dashboard/mock-exams',['/dashboard/mock-exams','/dashboard/student-exams']],
 ['Desempenho','/dashboard/performance',['/dashboard/performance','/dashboard/history','/dashboard/ranking','/dashboard/medals']],
 ['Conta','/dashboard/profile',['/dashboard/profile','/dashboard/subscriptions']],
 ['ENEM','/dashboard/enem',['/dashboard/enem']],
];
async function ready(p) {await p.locator('.app-shell').waitFor({timeout:30000});await p.locator('#norte-initial-loading').waitFor({state:'hidden',timeout:30000});}
try {
 const {context}=await seeded('user');const p=await context.newPage();await p.setViewportSize({width:1440,height:1000});await p.goto(base+'/dashboard/profile');await ready(p);
 const sidebar=p.locator('.app-sidebar .student-direct-navigation');assert.equal(await sidebar.getByRole('link').count(),9);
 for(const [name,entry,destinations] of sections){
  await sidebar.locator(`a[href="${entry}"]`).click();await p.waitForURL(url=>url.pathname===entry);
  assert.ok((await sidebar.locator('[data-active=true]').innerText()).includes(name),name);
  assert.equal(await sidebar.getByText('Ferramentas',{exact:true}).count(),0);
  for(const path of destinations){
   const nav=name==='Meu planejamento'?p.getByRole('navigation',{name:'Planejamento de estudos',exact:true}):p.locator('.workspace-section-nav');
   if(destinations.length>1){await nav.locator(`a[href^="${path}"]`).filter({hasText:/./}).first().click();await p.waitForURL(url=>url.pathname===path);}
   if(path==='/dashboard/library') assert.equal(new URL(p.url()).searchParams.get('collection'),'laws');
   if(path==='/dashboard/study-tools') assert.equal(await p.getByRole('navigation',{name:'Planejamento de estudos',exact:true}).getByRole('link').count(),4);
   if(path==='/dashboard/student-exams') await p.getByRole('heading',{level:1,name:'Provas realizadas e diagnóstico'}).waitFor();
   if(path==='/dashboard/profile') assert.equal(await p.locator('#dashboard-content').getByRole('button',{name:'Gerenciar Assinatura',exact:true}).count(),0);
   if(path==='/dashboard/subscriptions') await p.getByRole('region',{name:'Gestão da assinatura'}).waitFor();
  }
  console.log('PASS section and all destinations:',name,destinations.length);
 }
 // Legacy terms are still useful after the names change.
 await p.keyboard.press('Control+k');const dialog=p.getByRole('dialog',{name:'Navegue com direção.'});await dialog.waitFor();const input=dialog.getByRole('combobox');await input.fill('meus cadernos');await dialog.getByRole('option',{name:/Coleções de questões/}).click();await p.waitForURL(url=>url.pathname==='/dashboard/notebooks');
 await sidebar.locator('a[href="/dashboard/enem"]').click();await p.getByRole('link',{name:'Sessão de foco',exact:true}).click();await p.waitForURL(url=>url.pathname==='/dashboard/study-tools'&&url.searchParams.get('context')==='enem');await p.getByRole('link',{name:'Voltar à área ENEM'}).waitFor();
 assert.ok((await sidebar.locator('[data-active=true]').innerText()).includes('ENEM'));
 assert.ok((await p.locator('select').first().locator('option').allTextContents()).includes('Biologia'));
 assert.equal(await p.locator('#dashboard-content').getByRole('link',{name:'Configuração do estudo',exact:true}).count(),0);
 const questionURL=new URL(await p.locator('#dashboard-content').getByRole('link',{name:'Questões',exact:true}).getAttribute('href'),base);assert.equal(questionURL.searchParams.get('contest'),'ENEM');
 await p.screenshot({path:'/tmp/norte-organized-enem.png'});
 await p.getByRole('link',{name:'Voltar à área ENEM'}).click();await p.waitForURL(url=>url.pathname==='/dashboard/enem');
 await sidebar.locator('a[href="/dashboard/material"]').click();await p.waitForURL(url=>url.pathname==='/dashboard/material');await p.screenshot({path:'/tmp/norte-organized-desktop.png'});
 await context.close();console.log('PASS legacy menu search, exact legislation query, empty-exam title, single billing home and ENEM focus context');
 for(const width of [390,820]){
  const {context:ctx}=await seeded('user');const page=await ctx.newPage();await page.setViewportSize({width,height:844});await page.goto(base+'/dashboard/profile');await ready(page);
  const trigger=page.getByRole('button',{name:'Abrir menu completo',exact:true});
  if(await trigger.isVisible()) await trigger.click();
  const mobile=page.locator(await trigger.isVisible()?'.app-sheet .student-direct-navigation':'.app-sidebar .student-direct-navigation');await mobile.waitFor();assert.equal(await mobile.getByRole('link').count(),9);
  await mobile.locator('a[href="/dashboard/material"]').click();await page.waitForURL(url=>url.pathname==='/dashboard/material');
  const tabs=page.locator('.workspace-section-nav');await tabs.locator('a[href="/dashboard/ctb"]').click();await page.waitForURL(url=>url.pathname==='/dashboard/ctb');
  const selected=tabs.locator('a[aria-current="page"]');await selected.waitFor();await page.waitForTimeout(200);const rect=await selected.boundingBox();assert.ok(rect.x>=0&&rect.x+rect.width<=width+1,JSON.stringify(rect));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:`/tmp/norte-organized-${width}.png`});await ctx.close();console.log('PASS responsive menu and relocated CTB, active tab within viewport:',width);
 }
 const {context:admin}=await seeded('admin');const page=await admin.newPage();await page.goto(base+'/dashboard/profile');await ready(page);assert.equal(await page.locator('.student-direct-navigation').count(),0);await admin.close();console.log('PASS student navigation remains separate from administration');
}finally{await browser.close();}
