/** Chromium regression with mocked API responses; never writes production accounts. */
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:3000';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
async function context(viewport,reducedMotion='no-preference') {
 const ctx=await browser.newContext({viewport,reducedMotion});
 await ctx.route('https://gkwphadbveiyjcwiiizw.supabase.co/**',route=>route.fulfill({contentType:'application/json',body:'[]'}));
 return ctx;
}
try {
 for(const width of [1366,390]) {
  const ctx=await context({width,height:844});const page=await ctx.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  let mounts=0;await page.exposeFunction('recordIntroMount',()=>{mounts++;});
  await page.addInitScript(()=>new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node instanceof Element&&(node.matches('.home-intro')||node.querySelector('.home-intro')))window.recordIntroMount();}).observe(document,{childList:true,subtree:true}));
  await page.goto(base+'/');
  await page.locator('.home-intro[data-phase="playing"]').waitFor();
  await page.locator('.home-intro video').evaluate(el=>el.pause());
  await page.locator('.tactical-intro__identity img').evaluate(img=>img.decode());
  const layout=await page.locator('.home-intro').evaluate(el=>({rect:el.getBoundingClientRect().toJSON(),video:getComputedStyle(el.querySelector('video')).opacity,overflow:document.documentElement.scrollWidth>innerWidth}));
  assert.equal(layout.video,'1');assert.equal(layout.overflow,false);assert.ok(layout.rect.width<=width);
  await page.waitForTimeout(400);await page.screenshot({path:`/tmp/norte-tactical-intro-${width}.png`});
  await page.getByRole('button',{name:'Pular introdução'}).click();await page.locator('.home-intro').waitFor({state:'detached'});
  const initialMounts=mounts;
  await page.locator('a[href="/auth"]:visible').first().click();await page.waitForURL(url=>url.pathname==='/auth');
  await page.locator('.auth-back').click();await page.waitForURL(base+'/');await page.waitForTimeout(500);
  assert.equal(await page.locator('.home-intro').count(),0);assert.equal(mounts,initialMounts);
  await page.locator('.home-hero__study-links .daily-badge').click();await page.waitForURL('**/desafio-diario');
  await page.goBack();await page.waitForURL(base+'/');await page.waitForTimeout(500);
  assert.equal(await page.locator('.home-intro').count(),0);assert.equal(mounts,initialMounts);
  assert.equal(await page.locator('#norte-initial-loading').isVisible(),false);
  await page.reload();await page.locator('.home-intro[data-phase="playing"]').waitFor();assert.ok(mounts>initialMounts);
  assert.deepEqual(errors,[]);await ctx.close();console.log('PASS initial video, tactical frame, auth return, menu/back navigation and refresh:',width);
 }
 {
  const ctx=await context({width:390,height:844});const p=await ctx.newPage();await p.goto(base+'/auth');await p.locator('.auth-back').click();await p.waitForURL(base+'/');await p.waitForTimeout(800);assert.equal(await p.locator('.home-intro').count(),0);await ctx.close();console.log('PASS direct login then homepage: no late intro');
 }
 {
  const ctx=await browser.newContext({viewport:{width:1366,height:844}});
  const uid='11111111-1111-4111-8111-111111111111',exp=Math.floor(Date.now()/1000)+86400;
  const encode=value=>Buffer.from(JSON.stringify(value)).toString('base64url');
  const user={id:uid,email:'qa@example.test',aud:'authenticated',role:'authenticated',user_metadata:{full_name:'TESTE LOCAL'},app_metadata:{provider:'email'}};
  const session={access_token:`${encode({alg:'HS256',typ:'JWT'})}.${encode({sub:uid,exp,role:'authenticated',session_id:uid})}.test`,refresh_token:'test-refresh',token_type:'bearer',expires_in:86400,expires_at:exp,user};
  await ctx.addInitScript(value=>localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',JSON.stringify(value)),session);
  await ctx.route('https://gkwphadbveiyjcwiiizw.supabase.co/**',route=>{
   const path=new URL(route.request().url()).pathname;
   const body=path.endsWith('/profiles')?{id:uid,full_name:'TESTE LOCAL',subscription_tier:'premium',onboarding_completed:true,is_activated:true,created_at:new Date().toISOString()}:path.endsWith('/user_roles')?[{role:'user'}]:path.endsWith('/verify_account_session')?true:path.endsWith('/user')?user:path.endsWith('/server_now')?new Date().toISOString():[];
   return route.fulfill({contentType:'application/json',body:JSON.stringify(body)});
  });
  const p=await ctx.newPage();await p.goto(base+'/dashboard/profile');await p.locator('.app-shell').waitFor();
  await p.locator('a[href="/dashboard"]:visible').first().click();await p.waitForURL(url=>url.pathname==='/dashboard');
  assert.equal(await p.locator('#norte-initial-loading').isVisible(),false);
  await p.locator('button[aria-label="Menu da conta"]:visible').first().click();
  await p.getByRole('menuitem',{name:'Sair',exact:true}).click();await p.getByRole('button',{name:'Encerrar sessão',exact:true}).click();
  await p.waitForURL(base+'/');await p.waitForTimeout(500);assert.equal(await p.locator('.home-intro').count(),0);assert.equal(await p.locator('#norte-initial-loading').isVisible(),false);
  await ctx.close();console.log('PASS panel menu navigation and logout to homepage: no repeated intro or startup');
 }
 {
  const ctx=await context({width:390,height:844},'reduce');const p=await ctx.newPage();await p.goto(base+'/');await p.waitForFunction(()=>document.documentElement.dataset.norteBoot==='ready');assert.equal(await p.locator('.home-intro').count(),0);await ctx.close();console.log('PASS reduced motion: no intro download or playback');
 }
}finally{await browser.close();}
