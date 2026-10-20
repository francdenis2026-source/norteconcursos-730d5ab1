"""Responsive homepage smoke check; Supabase is mocked and no student data is changed."""
import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 Path("outputs/qa").mkdir(parents=True,exist_ok=True)
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  c=await b.new_context(reduced_motion='reduce')
  await c.route('**/*.supabase.co/**',lambda r:r.fulfill(status=200,content_type='application/json',body='[]'))
  page=await c.new_page(); results=[]
  for theme in ['light','dark']:
   for w in [320,390,768,1440]:
    await page.set_viewport_size({'width':w,'height':950})
    await page.goto('http://localhost:8080/',wait_until='domcontentloaded')
    await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
    await page.locator('#home-title').wait_for()
    await page.wait_for_timeout(350)
    await page.wait_for_function('document.querySelector(".home-hero__image").naturalWidth>0')
    assert await page.locator('.home-hero__image').get_attribute('src')=='/media/hero/hero-norte-impacto.webp'
    assert 'carreiras-background.webp' in await page.locator('.home').evaluate('e=>getComputedStyle(e).backgroundImage')
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),f'overflow {w}'
    assert await page.locator('.home-hero').evaluate('e=>e.offsetHeight')<550
    assert await page.locator('.home-interstitial').count()==0
    await page.evaluate('async()=>{for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}window.scrollTo(0,0)}')
    await page.locator('.home img').evaluate_all('imgs=>imgs.forEach(i=>i.loading="eager")')
    await page.wait_for_function('Array.from(document.querySelectorAll(".home img")).every(i=>i.complete && i.naturalWidth>0)',timeout=20000)
    await page.screenshot(path=f'outputs/qa/remodel-{theme}-{w}.png',full_page=True)
    results.append({'theme':theme,'width':w,'height':await page.locator('.home').evaluate('e=>e.offsetHeight'),'footer':await page.locator('.home-footer').evaluate('e=>e.offsetHeight')})
  print(json.dumps(results))
  await page.set_viewport_size({'width':390,'height':844})
  await page.get_by_role('button',name='Abrir menu',exact=True).click()
  await page.get_by_role('navigation',name='Navegação móvel').wait_for(state='visible')
  await page.get_by_role('button',name='Fechar menu',exact=True).click()
  await page.locator('#como').scroll_into_view_if_needed()
  print('PASS responsive layout, themes, image loads, mobile menu')
  await b.close()
asyncio.run(main())
