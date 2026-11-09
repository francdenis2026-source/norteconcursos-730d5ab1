/** Startup QA: the homepage must reveal after route hydration without downloading an intro film. */
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.BASE_URL||'http://127.0.0.1:3000';
const videoPattern=/\/media\/hero\/hero-intro[^/]*\.(mp4|webm)(?:\?.*)?$/;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
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
const ready=async p=>{
  await p.waitForFunction(()=>document.documentElement.dataset.norteBoot==='ready',{timeout:10000});
  await p.locator('#norte-initial-loading').waitFor({state:'hidden'});
};
async function assertTrace(p,expected) {
  const {trace,leaks}=await p.evaluate(()=>({trace:window.__startupTrace,leaks:window.__startupLeaks}));
  assert.deepEqual(leaks,[],'homepage must remain covered until route hydration completes');
  assert.deepEqual(trace,expected);
}
try {
  for(const width of [1366,390,820]) {
    const ctx=await context(width);const videos=[];const errors=[];
    ctx.on('request',request=>{if(videoPattern.test(request.url()))videos.push(request.url());});
    const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
    try {
      await p.goto(base+'/',{waitUntil:'domcontentloaded'});
      await ready(p);
      assert.equal(await p.locator('.home').isVisible(),true);
      assert.equal(await p.locator('.startup-intro').count(),0);
      assert.deepEqual(videos,[],'startup must not request intro video files');
      await assertTrace(p,['preparing','ready']);
      assert.deepEqual(errors,[]);
      console.log('PASS homepage reveals after route hydration without intro media:',width);
    } finally {await ctx.close();}
  }
  {
    const ctx=await context(390);const p=await ctx.newPage();await p.clock.install();let release;
    const gate=new Promise(resolve=>release=resolve);
    await ctx.route('**/*',async route=>{if(route.request().resourceType()==='script')await gate;await route.continue();});
    try {
      await p.goto(base+'/',{waitUntil:'commit'});await p.locator('#norte-initial-loading').waitFor();
      await p.clock.fastForward(10_100);await ready(p);release();
      await p.waitForTimeout(350);
      assert.equal(await p.locator('.startup-intro').count(),0);
      assert.equal(await p.locator('.home').isVisible(),true);
      console.log('PASS ten-second watchdog reveals SSR if JavaScript hydration stalls');
    } finally {release();await ctx.close();}
  }
} finally {await browser.close();}
