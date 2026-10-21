/** Navigation command regression with mocked Supabase accounts; no production writes.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/navigation-command.mjs
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
 for(const width of [1366,390,320]) for(const theme of ['light','dark']) {
  const {context}=await seeded('user');const page=await context.newPage();await page.setViewportSize({width,height:844});
  await page.goto(base+'/dashboard/profile');await page.locator('.app-shell').waitFor();
  await page.evaluate(theme=>document.documentElement.classList.toggle('dark',theme==='dark'),theme);
  await page.getByRole('button',{name:'Buscar área (Ctrl+K)',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'Navegue com direção.'});await dialog.waitFor();
  await dialog.locator('.nav-command__hero img').evaluate(img=>img.decode());
  const input=dialog.getByRole('combobox');await input.waitFor();assert.equal(await input.evaluate(el=>document.activeElement===el),true);
  const layout=await dialog.evaluate(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:innerWidth,height:innerHeight,overflow:el.scrollWidth>el.clientWidth};});
  assert.ok(layout.left>=0&&layout.right<=layout.width+1&&layout.top>=0&&layout.bottom<=layout.height+1,JSON.stringify(layout));assert.equal(layout.overflow,false);
  assert.equal(await dialog.getByRole('option').filter({hasText:'Financeiro'}).count(),0);
  await page.screenshot({path:`/tmp/norte-command-${width}-${theme}.png`});
  await input.fill('revisar erros');await page.getByRole('option',{name:/Caderno de erros/}).waitFor();assert.equal(await dialog.getByRole('option').count(),1);
  await page.keyboard.press('Enter');await page.waitForURL(url=>url.pathname==='/dashboard/errors');await dialog.waitFor({state:'hidden'});
  await page.keyboard.press('Control+k');await dialog.waitFor();await dialog.getByText('Acessos recentes',{exact:true}).waitFor();
  await input.fill('zzzzinexistente');await dialog.getByText('Nenhum destino encontrado').waitFor();await dialog.getByRole('button',{name:'Limpar busca e filtros'}).click();
  await dialog.getByRole('button',{name:/^Provas/}).click();assert.equal(await dialog.getByRole('option').count(),2);
  await input.focus();const selected=await input.getAttribute('aria-activedescendant');await page.keyboard.press('ArrowDown');assert.notEqual(await input.getAttribute('aria-activedescendant'),selected);
  await input.fill('lei seca');await dialog.getByText('Nenhum destino encontrado').waitFor();
  await dialog.getByRole('button',{name:/Todas as áreas/}).click();await dialog.getByRole('option',{name:/Legislação e súmulas/}).click();
  await page.waitForURL(url=>url.pathname==='/dashboard/library'&&url.searchParams.get('collection')==='laws');
  await page.keyboard.press('Control+k');await dialog.waitFor();await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
  assert.equal(await page.getByRole('button',{name:'Buscar área (Ctrl+K)',exact:true}).evaluate(el=>document.activeElement===el),true,'focus returns to the search trigger');
  await context.close();console.log('PASS',width,theme,'responsive artwork, autofocus, aliases, Enter navigation, recent history, categories, empty-state recovery and query target');
 }
 {
  const {context}=await seeded('admin');const page=await context.newPage();await page.goto(base+'/dashboard/profile');await page.locator('.app-shell').waitFor();await page.keyboard.press('Control+k');
  const dialog=page.getByRole('dialog',{name:'Navegue com direção.'});await dialog.waitFor();await dialog.getByRole('combobox').fill('financeiro');await dialog.getByRole('option',{name:/Financeiro/}).click();await page.waitForURL(url=>url.pathname==='/dashboard/admin-finance');await context.close();console.log('PASS admin-only destinations and navigation');
 }
{
 const {context}=await seeded('user');const p=await context.newPage();await p.setViewportSize({width:390,height:844});await p.goto(base+'/dashboard/profile');await p.locator('.app-shell').waitFor();await p.keyboard.press('Control+k');
 const dialog=p.getByRole('dialog',{name:'Navegue com direção.'});await dialog.waitFor();
 await p.evaluate(()=>{document.documentElement.dataset.appKeyboard='true';document.documentElement.style.setProperty('--app-viewport-height','360px');});
 await dialog.getByRole('combobox').fill('simulados');await p.waitForTimeout(250);
 const layout=await dialog.evaluate(el=>({box:el.getBoundingClientRect().toJSON(),list:el.querySelector('[cmdk-list]').getBoundingClientRect().toJSON(),focus:document.activeElement.hasAttribute('cmdk-input')}));
 console.log(layout);assert.ok(layout.box.top>=0&&layout.box.bottom<=360);assert.ok(layout.list.height>=60);assert.equal(layout.focus,true);
 await p.screenshot({path:'/tmp/norte-command-keyboard.png'});await p.keyboard.press('Enter');await p.waitForURL(url=>url.pathname==='/dashboard/mock-exams');await context.close();console.log('PASS compact visual viewport: search and Enter remain usable');
}
}finally{await browser.close();}
