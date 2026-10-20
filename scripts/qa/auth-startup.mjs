// Start the dev server first. Uses only synthetic local storage and intercepts all auth requests.
import { createRequire } from 'node:module';
const require = createRequire(`${process.env.NORTE_TEST_DEPS_DIR ?? process.cwd()}/package.json`);
const { chromium } = require('@playwright/test');
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const context=await browser.newContext();const page=await context.newPage();
await context.addInitScript(()=>localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',JSON.stringify({access_token:'test.expired.session',refresh_token:'norte-loading-test-not-a-real-token',expires_at:1,expires_in:3600,token_type:'bearer',user:{id:'11111111-1111-1111-1111-111111111111',aud:'authenticated',role:'authenticated',email:'loading-test@example.invalid',app_metadata:{},user_metadata:{},created_at:'2026-01-01T00:00:00Z'}})));
await page.route('**/auth/v1/**',()=>{});
await page.goto(`${process.env.NORTE_TEST_BASE_URL ?? 'http://localhost:3000'}/dashboard`,{waitUntil:'domcontentloaded',timeout:60000});
await page.getByText('Verificando seu acesso…',{exact:true}).waitFor({timeout:30000});
await page.getByRole('alert').filter({hasText:'Não foi possível verificar seu acesso'}).waitFor({timeout:25000});
assert.equal(new URL(page.url()).pathname,'/dashboard');
assert.ok(await page.evaluate(()=>!!localStorage.getItem('sb-gkwphadbveiyjcwiiizw-auth-token')));
await page.getByRole('button',{name:'Tentar novamente',exact:true}).click();
await page.getByText('Verificando seu acesso…',{exact:true}).waitFor();
console.log('PASS: stalled refresh becomes recoverable after 15s; token preserved; no redirect; retry restarts loading.');

await context.close();
const clean=await browser.newPage();await clean.goto(`${process.env.NORTE_TEST_BASE_URL ?? 'http://localhost:3000'}/dashboard`);
await clean.waitForURL(url=>url.pathname==='/',{timeout:25000});
console.log('PASS: clean guest still redirects out of protected dashboard.');
await browser.close();
