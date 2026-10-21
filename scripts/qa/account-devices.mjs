/** Independent browser storage simulates web, mobile and tablet. All auth/API calls are mocked. */
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
const uid = '11111111-1111-4111-8111-111111111111';
const storageKey = 'sb-gkwphadbveiyjcwiiizw-auth-token';
const session = id => {
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
  const exp = Math.floor(Date.now()/1000)+86400;
  return { access_token: `${encode({alg:'HS256',typ:'JWT'})}.${encode({sub:uid,exp,role:'authenticated',session_id:id})}.test`, refresh_token:`refresh-${id}`, token_type:'bearer',expires_in:86400,expires_at:exp,
    user:{id:uid,email:'device@example.test',role:'authenticated',aud:'authenticated',user_metadata:{full_name:'CONTA TESTE'},app_metadata:{provider:'email'},created_at:new Date().toISOString()} };
};
try {
  for (const mode of ['legacy','rpc']) {
    let row = null, unavailable = false;
    const calls = { writes:0, logout:0 };
    const contexts=[];
    async function device(id,width,seed) {
      const value=session(id);
      const context=await browser.newContext({viewport:{width,height:900},...(width<1000?{isMobile:true,hasTouch:true}:{})});
      contexts.push(context);
      await context.addInitScript(({key,value,seed})=>{
        localStorage.setItem('theme','light');
        if(seed&&!sessionStorage.getItem('qa-seeded')) { localStorage.setItem(key,JSON.stringify(value)); sessionStorage.setItem('qa-seeded','1'); }
      },{key:storageKey,value,seed});
      await context.route('https://gkwphadbveiyjcwiiizw.supabase.co/**',async route=>{
        const req=route.request(), path=new URL(req.url()).pathname;
        if(process.env.DEBUG_QA && /token|active_user_sessions|verify_account_session|logout/.test(path)) console.log(mode,id,req.method(),path,req.postData());
        let status=200,body=[];
        if(path.endsWith('/verify_account_session')) {
          if(unavailable){status=503;body={message:'temporarily unavailable'};}
          else if(mode==='legacy'){status=404;body={code:'PGRST202',message:'function not found'};}
          else {const claim=req.postDataJSON()?.p_claim; if(claim||!row){row=`norte_auth_activity:${uid}:${id}`;calls.writes++;} body=row===`norte_auth_activity:${uid}:${id}`;}
        }
        else if(path.endsWith('/active_user_sessions')) {
          if(unavailable){status=503;body={message:'temporarily unavailable'};}
          else if(req.method()==='POST') {
            if(!row||!req.headers().prefer?.includes('ignore-duplicates')){row=req.postDataJSON().session_key;calls.writes++;}
            status=201; body=null;
          } else body=row?{session_key:row}:null;
        }
        else if(path.endsWith('/token')) body=value;
        else if(path.endsWith('/user')) body=value.user;
        else if(path.endsWith('/logout')){calls.logout++;status=204;body=null;}
        else if(path.endsWith('/profiles')) body={id:uid,full_name:'CONTA TESTE',onboarding_completed:true,subscription_tier:'premium',is_activated:true,created_at:new Date().toISOString()};
        else if(path.endsWith('/user_roles')) body=[{role:'user'}];
        else if(path.endsWith('/has_role')) body=false;
        else if(path.endsWith('/server_now')) body=new Date().toISOString();
        await route.fulfill({status,contentType:'application/json',body:status===204?'':JSON.stringify(body),headers:{'access-control-allow-origin':'*'}});
      });
      return await context.newPage();
    }
    const oldId='22222222-2222-4222-8222-222222222222', nextId='33333333-3333-4333-8333-333333333333';
    const desktop=await device(oldId,1366,true);
    await desktop.clock.install();
    await desktop.goto(`${base}/dashboard/profile`);
    await desktop.locator('.app-shell').waitFor({timeout:20000});
    const mobile=await device(nextId,390,false);
    await mobile.goto(`${base}/auth`);
    await mobile.locator('html[data-norte-boot="ready"]').waitFor();
    await mobile.getByLabel('E-mail', { exact: true }).fill('device@example.test');
    await mobile.locator('#pin').fill('test-password');
    await mobile.getByRole('button',{name:'Entrar na plataforma'}).click();
    await mobile.locator('.app-shell').waitFor({timeout:20000}).catch(async error=>{console.log('Mobile URL',mobile.url(),'row',row,'calls',calls,(await mobile.locator('body').innerText()).slice(0,2500));throw error;});
    assert.equal(row,`norte_auth_activity:${uid}:${nextId}`,'actual password sign-in claims server ownership');
    await desktop.clock.fastForward(16_000);
    await desktop.waitForURL(/auth\?reason=another-device/,{timeout:15000});
    assert.equal(await desktop.evaluate(key=>localStorage.getItem(key),storageKey),null,'old device tokens removed');
    assert.equal(await mobile.evaluate(key=>!!localStorage.getItem(key),storageKey),true,'winner remains logged in');
    const writes=calls.writes;
    await mobile.reload();
    await mobile.locator('.app-shell').waitFor();
    assert.equal(calls.writes,writes,'reload verifies without taking ownership again');
    const tablet=await device(oldId,820,true);
    await tablet.goto(`${base}/dashboard/profile`);
    await tablet.waitForURL(/auth\?reason=another-device/,{timeout:15000});
    assert.equal(await tablet.locator('.app-shell').count(),0,'revoked tablet cannot restore old login');
    assert.equal(row,`norte_auth_activity:${uid}:${nextId}`,'old tablet cannot steal ownership');

    // Light-mode mobile close button, keyboard focus and immediate search presentation.
    await mobile.evaluate(()=>document.documentElement.classList.remove('dark'));
    await mobile.getByRole('button',{name:'Abrir menu',exact:true}).click();
    const close=mobile.locator('.app-sheet .surface-close');
    await close.waitFor();
    const styles=await close.evaluate(node=>{const s=getComputedStyle(node),r=node.getBoundingClientRect();return {color:s.color,bg:s.backgroundColor,opacity:s.opacity,width:r.width,height:r.height};});
    assert.notEqual(styles.color,'rgb(255, 255, 255)');
    assert.equal(styles.opacity,'1');
    assert.ok(styles.width>=44&&styles.height>=44);
    await mobile.screenshot({path:`/tmp/norte-device-close-${mode}.png`});
    await close.click();
    await mobile.getByRole('button',{name:'Buscar área (Ctrl+K)',exact:true}).click();
    await mobile.locator('.navigation-command').waitFor();
    const motions=await mobile.locator('[data-dialog-motion="instant"]').evaluateAll(nodes=>nodes.map(node=>{const s=getComputedStyle(node);return {animation:s.animationName,duration:s.transitionDuration,opacity:s.opacity};}));
    assert.equal(motions.length,2);
    for(const m of motions){assert.equal(m.animation,'none');assert.equal(m.duration,'0s');assert.equal(m.opacity,'1');}
    assert.ok(await mobile.locator('.navigation-command input').evaluate(n=>n===document.activeElement));
    const rect=await mobile.locator('.navigation-command').boundingBox();
    assert.ok(rect.x>=0&&rect.x+rect.width<=390);
    await mobile.getByRole('button',{name:'Fechar busca',exact:true}).click();

    unavailable=true;
    await mobile.evaluate(()=>window.dispatchEvent(new Event('online')));
    await mobile.getByRole('heading',{name:'Não foi possível confirmar seu acesso'}).waitFor();
    assert.equal(await mobile.locator('.app-shell').count(),0,'unverified ownership blocks protected screens');
    assert.ok(await mobile.evaluate(key=>!!localStorage.getItem(key),storageKey),'temporary network errors do not erase auth');
    unavailable=false;
    await mobile.getByRole('button',{name:'Tentar novamente',exact:true}).click();
    await mobile.locator('.app-shell').waitFor();
    assert.equal(calls.writes,writes,'recovery verifies instead of reclaiming');
    console.log(`PASS ${mode}: actual login replaces device, polling logs out desktop, reload/tablet cannot reclaim, network recovery, mobile close contrast and instant responsive search`);
    for(const context of contexts)await context.close();
  }
} finally {await browser.close();}
