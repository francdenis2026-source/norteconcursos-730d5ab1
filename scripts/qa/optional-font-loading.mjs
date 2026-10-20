// Start the dev server first. Hold external fonts indefinitely and assert the app still paints.
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require = createRequire(`${process.env.NORTE_TEST_DEPS_DIR ?? process.cwd()}/package.json`);
const { chromium } = require('@playwright/test');
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try {
 for(const mode of ['desktop-stalled','mobile-stalled','loaded','failed']) {
  const mobile=mode==='mobile-stalled';
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},isMobile:mobile,hasTouch:mobile});
  const page=await context.newPage();
  await page.route('https://fonts.googleapis.com/**',async route=>{
   if(mode==='loaded')await route.fulfill({status:200,contentType:'text/css',body:'/* Optional typography test */'});
   else if(mode==='failed')await route.abort('failed');
   // Stalled request is intentionally left pending; no real request is sent.
  });
  await page.goto(process.env.NORTE_TEST_BASE_URL ?? 'http://localhost:3000/',{waitUntil:'domcontentloaded',timeout:45000});
  await page.getByRole('heading',{level:1}).first().waitFor();
  await page.waitForFunction(()=>performance.getEntriesByName('first-contentful-paint').length>0,{},{timeout:15000});
  const fonts=page.locator('link[href*="fonts.googleapis.com/css"]');
  await fonts.waitFor({state:'attached'});
  await page.waitForFunction(expected=>document.querySelector('link[href*="fonts.googleapis.com/css"]')?.media===expected,mode==='loaded'?'all':'print');
  const paint=await page.evaluate(()=>performance.getEntriesByName('first-contentful-paint')[0].startTime);
  assert.ok(Number.isFinite(paint));
  console.log(`PASS ${mode}: first contentful paint ${Math.round(paint)}ms; heading visible while fonts are optional.`);
  await context.close();
 }
} finally {await browser.close()}
