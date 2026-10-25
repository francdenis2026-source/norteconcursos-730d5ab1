// Local homepage QA; API calls are mocked and no production data is written.
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{for(const theme of ['dark','light']){
 const c=await browser.newContext({reducedMotion:'reduce'});await c.addInitScript(t=>localStorage.setItem('theme',t),theme);
 await c.route('**/*.supabase.co/**',r=>r.fulfill({status:200,contentType:'application/json',body:'[]'}));
 const p=await c.newPage();
 for(const width of [1440,1024,768,390,320]){
  await p.setViewportSize({width,height:950});await p.goto(base+'/',{waitUntil:'domcontentloaded'});
  await p.locator('.home-daily-feature').waitFor();
  const daily=p.locator('.home-daily-feature');await daily.scrollIntoViewIfNeeded();
  assert.ok((await daily.innerText()).includes('10 questões oficiais por dia'));
  const contrast=await daily.evaluate(n=>{
   const ctx=document.createElement('canvas').getContext('2d');ctx.canvas.width=ctx.canvas.height=1;
   const lum=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);const c=[...ctx.getImageData(0,0,1,1).data].slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return .2126*c[0]+.7152*c[1]+.0722*c[2]};
   const bg=lum(getComputedStyle(n).backgroundColor);return [...n.querySelectorAll('.home-daily-feature__copy h2,.home-daily-feature__copy p')].map(e=>{const fg=lum(getComputedStyle(e).color);return (Math.max(bg,fg)+.05)/(Math.min(bg,fg)+.05)});
  });assert.ok(contrast.every(n=>n>=4.5),JSON.stringify({theme,width,contrast}));
  if(width===1440)await p.screenshot({path:`/tmp/home-after-daily-${theme}.png`});
  const platform=p.locator('#plataforma');if(width===1440)await p.locator('.home-nav a[href="#plataforma"]').click();else await platform.scrollIntoViewIfNeeded();
  await p.getByRole('tab',{name:'Como funciona',exact:true}).click();await p.getByRole('tabpanel').filter({visible:true}).waitFor();
  await p.getByRole('tab',{name:'Ferramentas',exact:true}).click();
  if(width===1440){await p.waitForFunction(()=>document.querySelector('.home-nav a[href="#plataforma"]')?.getAttribute('aria-current')==='location');await p.screenshot({path:`/tmp/home-after-platform-${theme}.png`});}
  if(width===1440)await p.locator('.home-nav a[href="#planos"]').click();else await p.locator('#planos').scrollIntoViewIfNeeded();
  if(width===1440)await p.waitForFunction(()=>document.querySelector('.home-nav a[href="#planos"]')?.getAttribute('aria-current')==='location');else await p.waitForFunction(()=>document.querySelector('.home-app-nav a[href="#planos"]')?.getAttribute('aria-current')==='location');
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${theme} ${width} overflow`);
  if(width===390)await p.screenshot({path:`/tmp/home-after-mobile-${theme}.png`});
  console.log('PASS',theme,width,'contrast',contrast.map(n=>n.toFixed(2)),'tabs, nav, no overflow');
 }
 await c.close();
}}finally{await browser.close()}
