/** Verify real SSR startup before hydration, without production writes.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/initial-loading.mjs
 */
import assert from 'node:assert/strict';
import {statSync,writeFileSync} from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:3000';
assert.ok(statSync('public/media/loading/norte-abertura-hd.webp').size<330_000);
assert.ok(statSync('public/media/loading/norte-abertura-mobile-hd.webp').size<230_000);
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
try{
 for(const [width,dpr] of [[1440,1],[390,1],[390,2]]){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:dpr,reducedMotion:'reduce'});
  let release;const gate=new Promise(resolve=>{release=resolve});const images=[];
  page.on('request',request=>{if(request.url().includes('/media/loading/'))images.push(request.url());});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*',async route=>{if(route.request().resourceType()==='script')await gate;await route.continue();});
  await page.goto(base+'/',{waitUntil:'commit'});
  const boot=page.locator('#norte-initial-loading');await boot.waitFor({state:'visible'});
  await boot.locator('img').evaluate(async img=>{await img.decode()});
  assert.ok(await boot.getByText('Preparando sua plataforma…').isVisible());
  assert.equal(await boot.locator('img').evaluate(img=>img.currentSrc.endsWith(innerWidth<=640&&devicePixelRatio<1.5?'norte-abertura-mobile-hd.webp':'norte-abertura-hd.webp')),true);
  assert.ok(await boot.locator('img').evaluate(img=>img.naturalWidth*(innerWidth<=640&&devicePixelRatio>=1.5?2:1)>=1280),'retain sufficient source resolution');
  assert.equal(new Set(images).size,1,'only the selected responsive image loads');
  // Hydration is intentionally paused; capture without waiting for pending font loaders.
  const cdp=await page.context().newCDPSession(page);
  const capture=await cdp.send('Page.captureScreenshot',{format:'png'});
  writeFileSync(`/tmp/norte-initial-loading-${width}.png`,Buffer.from(capture.data,'base64'));await cdp.detach();
  release();await boot.waitFor({state:'hidden',timeout:20000});
  assert.equal(errors.length,0,errors.join('\n'));
  await page.locator('.home-hero__study-links .daily-badge').click();await page.waitForURL('**/desafio-diario');assert.equal(await boot.isVisible(),false,'SPA navigation does not replay startup');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.querySelector('#norte-initial-loading')).pointerEvents),'none');
  await page.close();console.log('PASS pre-hydration artwork, responsive bytes, hydration and SPA:',width);
 }
 const context=await browser.newContext();const uid='11111111-1111-4111-8111-111111111111';const exp=Math.floor(Date.now()/1000)+86400;const enc=v=>Buffer.from(JSON.stringify(v)).toString('base64url');
await context.addInitScript(({uid,exp,token})=>localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',JSON.stringify({access_token:token,refresh_token:'synthetic',expires_at:exp,expires_in:86400,token_type:'bearer',user:{id:uid,email:'synthetic@example.test',aud:'authenticated',role:'authenticated',user_metadata:{full_name:'TESTE LOCAL'},app_metadata:{provider:'email'}}})),{uid,exp,token:`${enc({alg:'HS256',typ:'JWT'})}.${enc({sub:uid,exp,role:'authenticated',session_id:uid})}.test`});
let release,seen;const gate=new Promise(r=>release=r),requested=new Promise(r=>seen=r);
await context.route('https://gkwphadbveiyjcwiiizw.supabase.co/**',async route=>{const path=new URL(route.request().url()).pathname;let body=[];if(path.endsWith('/profiles')){seen();await gate;body={id:uid,full_name:'TESTE LOCAL',subscription_tier:'premium',onboarding_completed:true,is_activated:true,created_at:new Date().toISOString()}}else if(path.endsWith('/user_roles'))body=[{role:'user'}];await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(body)});});
try{const p=await context.newPage();await p.goto('http://127.0.0.1:3000/dashboard/profile');await requested;assert.ok(await p.locator('#norte-initial-loading').isVisible(),'keep artwork while private profile is pending');release();await p.locator('#norte-initial-loading').waitFor({state:'hidden'});await p.locator('.app-shell').waitFor();const second=await context.newPage();await second.goto('http://127.0.0.1:3000/dashboard/profile');await second.locator('[data-session-tab-state="blocked"]').waitFor();await second.locator('#norte-initial-loading').waitFor({state:'hidden'});console.log('PASS artwork during auth loading; clears for private content and blocked-tab state');}finally{release();await context.close();}

 const noJS=await browser.newPage({javaScriptEnabled:false});await noJS.goto(base+'/');assert.equal(await noJS.locator('#norte-initial-loading').isVisible(),false,'no-script users are not trapped');await noJS.close();
 const missing=await browser.newPage();await missing.goto(base+'/rota-inexistente-teste-inicial');await missing.locator('#norte-initial-loading').waitFor({state:'hidden'});assert.ok(await missing.getByText('Rota fora do mapa').isVisible());await missing.close();
 console.log('PASS no-script and 404 recovery');
}finally{await browser.close();}
