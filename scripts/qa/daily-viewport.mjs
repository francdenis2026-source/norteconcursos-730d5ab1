/** Browser regression with synthetic questions and intercepted Supabase calls only.
 * Run the dev server, then PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/daily-viewport.mjs
 */
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const base=process.env.BASE_URL||'http://127.0.0.1:3000';
const rows=Array.from({length:10},(_,i)=>({id:`00000000-0000-4000-8000-${String(i+1).padStart(12,'0')}`,contest_name:'Polícia Civil — TESTE LOCAL',career_name:'Agente',career_category:'policial',exam_year:2026,exam_board:'CEBRASPE',subject:'Informática',question_text:`Item sintético de interface ${i+1}. `+'Um arquivo de teste representa uma sequência de dados armazenados em um sistema computacional. '.repeat(24),official_answer:'C',content_status:'active',legal_basis:[],review_note:'Explicação sintética exclusiva deste teste de interface: arquivos organizam dados em dispositivos de armazenamento. Este texto não é conteúdo publicado na plataforma.'}));
try{
 for(const [width,height] of [[1366,630],[1024,768],[390,844],[320,568]])for(const theme of ['dark','light']){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
  await context.addInitScript(t=>localStorage.setItem('theme',t),theme);
  await context.route('https://gkwphadbveiyjcwiiizw.supabase.co/**',async route=>{
   const path=new URL(route.request().url()).pathname;
   let data=[];
   if(path.endsWith('/get_current_acre_date'))data='2026-10-21';
   else if(path.endsWith('/server_now'))data='2026-10-21T16:00:00Z';
   else if(path.endsWith('/get_daily_guest_questions'))data=rows;
   await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(data)});
  });
  const page=await context.newPage();await page.goto(`${base}/desafio-diario`);
  await page.getByRole('button',{name:'Iniciar meu desafio'}).waitFor();
  assert.equal(await page.locator('.daily-header').count(),0,'marketing header removed');
  const checkFrame=async()=>{assert.ok(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1),'document fits viewport');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal overflow');};
  await checkFrame();
  const start=await page.getByRole('button',{name:'Iniciar meu desafio'}).boundingBox();assert.ok(start.y>=0&&start.y+start.height<=height,'start visible without scrolling');
  if(theme==='dark')await page.screenshot({path:`/tmp/norte-daily-intro-${width}.png`});
  await page.getByRole('button',{name:'Iniciar meu desafio'}).click();
  const confirm=page.getByRole('button',{name:'Confirmar resposta'});await confirm.waitFor();assert.ok(await confirm.isDisabled(),'answer required');
  const clock=page.locator('.daily-question-card .tactical-clock--question');
  const art=await clock.locator('.tactical-clock__face').boundingBox();
  const display=await clock.locator('.tactical-clock__display').boundingBox();
  const timerRow=await page.locator('.question-timing-row').boundingBox();
  assert.ok(art.width>=70,'compact tactical dial');
  assert.ok(display.y>=art.y+art.height,'digital readout below the image without overlap');
  assert.ok(Math.abs(art.x+art.width/2-timerRow.x-timerRow.width/2)<1,'dial centered in question area');
  assert.equal(await clock.evaluate(n=>getComputedStyle(n).borderTopWidth),'0px','no surrounding box');
  assert.equal(await clock.evaluate(n=>getComputedStyle(n).backgroundColor),'rgba(0, 0, 0, 0)','transparent surround');
  await checkFrame();const dock=await page.locator('.daily-answer-dock').boundingBox();assert.ok(dock.y+dock.height<=height,'response controls stay inside viewport');
  assert.ok(await page.locator('.daily-reading').evaluate(el=>el.scrollHeight>el.clientHeight),'long stem scrolls internally');
  for(let i=0;i<10;i++){
   await page.getByRole('button',{name:'Certo',exact:true}).click();await confirm.click();
   await page.getByRole('region',{name:'Explicação da resposta',exact:true}).waitFor();
   await checkFrame();
   const next=page.getByRole('button',{name:i===9?'Ver resultado':'Próxima questão',exact:true});const rect=await next.boundingBox();assert.ok(rect.y+rect.height<=height,'next remains visible after feedback');
   if(i===0&&theme==='dark')await page.screenshot({path:`/tmp/norte-daily-player-${width}.png`});
   await next.click();
  }
  await page.getByText('Desafio diário concluído',{exact:true}).waitFor();await checkFrame();
  await page.reload();await page.getByText('MISSÃO DO DIA CONCLUÍDA',{exact:true}).waitFor();assert.equal(await page.getByRole('button',{name:'Iniciar meu desafio'}).count(),0,'daily quota still enforced');
  await page.getByRole('link',{name:'Sair do treino',exact:true}).click();await page.waitForURL(`${base}/`);
  console.log('PASS viewport, long question, 10 answers, quota and exit:',width,height,theme);await context.close();
 }
}finally{await browser.close();}
