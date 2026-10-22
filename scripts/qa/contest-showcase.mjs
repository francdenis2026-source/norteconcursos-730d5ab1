/** Local browser regression with intercepted Supabase data only. */
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{
for(const [width,height] of [[1440,1000],[820,1180],[390,844],[320,568]])for(const theme of ['dark','light']){
 const c=await b.newContext({viewport:{width,height},reducedMotion:'reduce'});await c.addInitScript(theme=>localStorage.setItem('theme',theme),theme);
 await c.route('https://gkwphadbveiyjcwiiizw.supabase.co/**',route=>route.fulfill({contentType:'application/json',body:JSON.stringify(new URL(route.request().url()).pathname.endsWith('/get_public_question_summary')?{registered:9084,available:5715}:[])}));
 const p=await c.newPage();await p.goto('http://localhost:3000/');await p.waitForFunction(()=>document.documentElement.dataset.norteBoot==='ready');const showcase=p.locator('.contest-showcase');await showcase.scrollIntoViewIfNeeded();for(const img of await showcase.locator('img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(n=>n.decode());}
 assert.equal(await showcase.locator('article').count(),4);assert.equal(await showcase.locator('.contest-catalog > article').count(),3);assert.match(await showcase.locator('article').first().innerText(),/Polícia Civil\s+do Acre/);
 assert.match(await showcase.locator('.contest-spotlight').innerText(),/Questões da prova de Agente da PC-SC de 2026/);
 assert.equal(await showcase.locator('.contest-spotlight .contest-availability strong').innerText(),await showcase.locator('#prova-pcsc .contest-availability strong').innerText());
 assert.equal(await showcase.locator('#prova-pcpr .contest-card__content > .contest-availability strong').innerText(),'100');
 assert.deepEqual(await showcase.locator('#prova-pcpi .contest-availability strong').allTextContents(),['80','74']);
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no page overflow');
 for(const node of await showcase.locator('.contest-action').all()){if(await node.isVisible()){const r=await node.boundingBox();assert.ok(r.x>=0&&r.x+r.width<=width+1,JSON.stringify(r));assert.ok(r.height>=44);assert.match(await node.getAttribute('href'),/^\/auth\?/);}}
 if(width===1440){const hero=await showcase.locator('.contest-spotlight').boundingBox(), card=await showcase.locator('.contest-card').first().boundingBox();assert.ok(hero.width>card.width*2);}
 await showcase.screenshot({path:`/tmp/norte-showcase-${width}-${theme}.png`});await c.close();console.log('PASS featured PC-AC, dated counts per role, registration CTAs and responsive layout:',width,theme);
}
const c=await b.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const uid='11111111-1111-4111-8111-111111111111',exp=Math.floor(Date.now()/1000)+86400;
const encode=value=>Buffer.from(JSON.stringify(value)).toString('base64url');
const user={id:uid,email:'showcase@example.test',aud:'authenticated',role:'authenticated',user_metadata:{full_name:'CONTA DE TESTE'},app_metadata:{provider:'email'}};
const session={access_token:`${encode({alg:'HS256',typ:'JWT'})}.${encode({sub:uid,exp,role:'authenticated',session_id:uid})}.test`,refresh_token:'test-refresh',token_type:'bearer',expires_in:86400,expires_at:exp,user};
await c.addInitScript(session=>localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',JSON.stringify(session)),session);
await c.route('https://gkwphadbveiyjcwiiizw.supabase.co/**',route=>{
 const path=new URL(route.request().url()).pathname;let body=[];
 if(path.endsWith('/user'))body=user;
 else if(path.endsWith('/profiles'))body={id:uid,full_name:'CONTA DE TESTE',subscription_tier:'premium',is_activated:true,onboarding_completed:true,created_at:new Date().toISOString()};
 else if(path.endsWith('/user_roles'))body=[{role:'user'}];
 else if(path.endsWith('/verify_account_session'))body=true;
 else if(path.endsWith('/has_role'))body=false;
 else if(path.endsWith('/get_public_question_summary'))body={registered:9084,available:5715};
 return route.fulfill({contentType:'application/json',body:JSON.stringify(body)});
});
const p=await c.newPage();await p.goto('http://localhost:3000/');await p.waitForFunction(()=>document.documentElement.dataset.norteBoot==='ready');
const showcase=p.locator('.contest-showcase');await showcase.locator('.contest-spotlight .contest-availability strong').filter({hasText:'0'}).waitFor();
assert.equal(await showcase.locator('.contest-spotlight__actions > a').first().getAttribute('href'),'/dashboard/inteligencia-idecan');
const target=new URL(await showcase.locator('#prova-pcsc .contest-card__content > a').getAttribute('href'),'http://localhost:3000');assert.equal(target.searchParams.get('board'),'IDECAN');assert.equal(target.searchParams.get('career'),'Agente de Polícia Civil');
const piLinks=await showcase.locator('.contest-pi-roles a').evaluateAll(nodes=>nodes.map(n=>n.href));assert.notEqual(new URL(piLinks[0]).searchParams.get('career'),new URL(piLinks[1]).searchParams.get('career'));
console.log('PASS authenticated counts do not fall back to the public reference; PC-AC preparation and exact paper/role links preserved');await c.close();
}finally{await b.close()}
