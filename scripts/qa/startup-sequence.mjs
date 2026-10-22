/** Real video/layout with simulated loading failures; no production account writes. */
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:3000';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
const videoPattern=/\/media\/hero\/hero-intro[^/]*\.(mp4|webm)(?:\?.*)?$/;
async function context(width,options={}) {
  const ctx=await browser.newContext({viewport:{width,height:900},...options});
  await ctx.route('https://gkwphadbveiyjcwiiizw.supabase.co/**',route=>route.fulfill({contentType:'application/json',body:'[]'}));
  await ctx.addInitScript(()=>{
    window.__startupTrace=[];window.__startupLeaks=[];
    const sample=()=>{
      const root=document.documentElement,app=document.getElementById('norte-app-content');
      const stage=root?.dataset.norteStartupStage||'preparing';
      if(window.__startupTrace.at(-1)!==stage)window.__startupTrace.push(stage);
      if(app&&root.dataset.norteBoot!=='ready'){
        const s=getComputedStyle(app);
        if(s.visibility!=='hidden'&&s.opacity!=='0')window.__startupLeaks.push(stage);
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  return ctx;
}
const ready=async p=>{await p.waitForFunction(()=>document.documentElement.dataset.norteBoot==='ready');await p.locator('#norte-initial-loading').waitFor({state:'hidden'});};
async function assertTrace(p,expected) {
  const {trace,leaks}=await p.evaluate(()=>({trace:window.__startupTrace,leaks:window.__startupLeaks}));
  assert.deepEqual(leaks,[],'homepage must never flash through unfinished startup');
  assert.deepEqual(trace,expected);
}
try {
  for(const width of [1366,390,820]) {
    const ctx=await context(width);let release,seen;
    const gate=new Promise(resolve=>release=resolve),requested=new Promise(resolve=>seen=resolve);
    await ctx.route(videoPattern,async route=>{seen();await gate;await route.continue();});
    const p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
    try {
      await p.goto(base+'/',{waitUntil:'domcontentloaded'});await requested;
      assert.equal(await p.locator('#norte-initial-loading').isVisible(),true);
      assert.equal(await p.locator('.home').isVisible(),false,'site stays covered while film is preparing');
      await p.waitForTimeout(120);release();
      const intro=p.locator('.startup-intro[data-phase="playing"]');await intro.waitFor();
      await intro.locator('video').evaluate(el=>el.pause());
      assert.equal(await p.evaluate(()=>document.documentElement.dataset.norteBoot==='ready'),false,'playing film remains in the initial loading stage');
      assert.equal(await p.locator('.home').isVisible(),false);
      const bounds=await intro.boundingBox();assert.ok(bounds.x>=0&&bounds.y>=0&&bounds.width<=width&&bounds.height<=900);
      await intro.locator('.tactical-intro__identity img').evaluate(img=>img.decode());
      assert.equal(await intro.locator('.tactical-intro__identity img').evaluate(img=>getComputedStyle(img).objectFit),'contain');
      await p.waitForFunction(()=>getComputedStyle(document.querySelector('.startup-intro')).opacity==='1');
      await p.screenshot({path:`/tmp/norte-unified-opening-${width}.png`});
      if(width===390){await intro.locator('video').evaluate(el=>{el.currentTime=el.duration-.1;void el.play();});}
      else await p.getByRole('button',{name:'Pular introdução',exact:true}).click();
      await ready(p);await p.locator('.startup-intro').waitFor({state:'detached'});
      assert.equal(await p.locator('.home').isVisible(),true);
      await assertTrace(p,['preparing','intro','ready']);assert.deepEqual(errors,[]);
      console.log('PASS unified artwork → real film → homepage without intermediate homepage flash:',width);
    } finally {release();await ctx.close();}
  }
  for(const mode of ['missing-video','autoplay-blocked','save-data','reduced-motion','late-video']) {
    const ctx=await context(390,mode==='reduced-motion'?{reducedMotion:'reduce'}:{});
    let requests=0,release=()=>{};
    if(mode==='autoplay-blocked')await ctx.addInitScript(()=>{HTMLMediaElement.prototype.play=()=>Promise.reject(new DOMException('Blocked','NotAllowedError'));});
    if(mode==='save-data')await ctx.addInitScript(()=>{Object.defineProperty(navigator,'connection',{value:{saveData:true,effectiveType:'4g'}});});
    const gate=new Promise(resolve=>release=resolve);
    await ctx.route(videoPattern,async route=>{
      requests++;
      if(mode==='missing-video')await route.fulfill({status:404,body:''});
      else if(mode==='late-video'){await gate;await route.continue();}
      else await route.continue();
    });
    const p=await ctx.newPage();
    try {
      await p.goto(base+'/',{waitUntil:'domcontentloaded'});await ready(p);release();
      await p.waitForTimeout(350);
      assert.equal(await p.locator('.startup-intro').count(),0,'failed/late media never reappears over the site');
      assert.equal(await p.locator('.home').isVisible(),true);
      if(mode==='save-data'||mode==='reduced-motion')assert.equal(requests,0,'preferences avoid video download');
      await assertTrace(p,['preparing','ready']);
      console.log('PASS direct, irreversible fallback:',mode);
    } finally {release();await ctx.close();}
  }
  {
    const ctx=await context(390);const p=await ctx.newPage();await p.clock.install();let release;
    const gate=new Promise(resolve=>release=resolve);let videos=0;
    p.on('request',r=>{if(videoPattern.test(r.url()))videos++;});
    await ctx.route('**/*',async route=>{if(route.request().resourceType()==='script')await gate;await route.continue();});
    try {
      await p.goto(base+'/',{waitUntil:'commit'});await p.locator('#norte-initial-loading').waitFor();
      await p.clock.fastForward(20_100);await ready(p);release();
      await p.waitForTimeout(500);
      assert.equal(videos,0,'hydration after watchdog cannot start a late film');
      assert.equal(await p.locator('.startup-intro').count(),0);
      console.log('PASS stalled JavaScript watchdog reveals SSR and prevents a late intro');
    } finally {release();await ctx.close();}
  }
} finally {await browser.close();}
