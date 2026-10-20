"""Verify native cursor states with all Supabase requests intercepted."""
import asyncio,json
from playwright.async_api import async_playwright

async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  results=[]
  for touch in [False,True]:
   context=await browser.new_context(viewport={'width':390 if touch else 1280,'height':900},is_mobile=touch,has_touch=touch)
   await context.route('**/*.supabase.co/**',lambda r:r.fulfill(status=200,content_type='application/json',body='[]'))
   page=await context.new_page()
   await page.goto('http://localhost:8080/',wait_until='domcontentloaded')
   home=page.locator('.home');await home.wait_for()
   cursor=lambda el:el.evaluate('(el)=>getComputedStyle(el).cursor')
   if touch:
    assert 'cursor-cartridge' not in await cursor(home)
    results.append({'touch':True,'native_touch_preserved':True})
   else:
    for theme in ['light','dark']:
     await page.locator('html').evaluate('(el,dark)=>el.classList.toggle("dark",dark)',theme=='dark')
     assert 'cursor-cartridge-photo.png' in await cursor(home)
     action=page.locator('.home-header button').filter(visible=True).first
     await action.hover()
     assert 'cursor-target.svg' in await cursor(action)
     child=action.locator('svg,span').first
     assert 'cursor-target.svg' in await cursor(child)
     await page.mouse.down()
     assert 'cursor-target-pressed.svg' in await cursor(action)
     assert 'cursor-target-pressed.svg' in await cursor(child)
     await page.mouse.up()
     assert 'cursor-target.svg' in await cursor(action)
     # Exercise text and disabled controls in the same real stylesheet.
     await home.evaluate('el=>{const n=document.createElement("div");n.id="cursor-fixture";n.innerHTML="<input><button disabled><span>Indisponível</span></button>";el.append(n)}')
     assert await cursor(page.locator('#cursor-fixture input'))=='text'
     assert await cursor(page.locator('#cursor-fixture button span'))=='not-allowed'
     await page.locator('#cursor-fixture').evaluate('el=>el.remove()')
     results.append({'theme':theme,'bullet':True,'hover_target':True,'pressed_target':True,'child_elements':True,'text_and_disabled':True})
    for asset in ['cursor-cartridge-photo.png','cursor-target.svg','cursor-target-pressed.svg']:
     response=await page.request.get('http://localhost:8080/media/'+asset)
     assert response.ok,asset
   await context.close()
  page=await browser.new_page(viewport={'width':720,'height':240})
  await page.set_content('''<style>body{margin:0;display:flex;font-family:Arial}section{width:360px;height:240px;display:flex;gap:24px;align-items:center;justify-content:center;background:#f8fafc}section+section{background:#121820}img{object-fit:contain}.large{width:62px;height:88px}</style>'''+''.join('<section><img class="large" src="http://localhost:8080/media/cursor-cartridge-photo.png"><img src="http://localhost:8080/media/cursor-cartridge-photo.png"><img src="http://localhost:8080/media/cursor-target.svg"><img src="http://localhost:8080/media/cursor-target-pressed.svg"></section>' for _ in range(2)))
  await page.wait_for_function('Array.from(document.images).every(i=>i.complete && i.naturalWidth>0)')
  await page.screenshot(path='/tmp/norte-cursor-photo-preview.png')
  print(json.dumps(results))
  await browser.close()
asyncio.run(main())
