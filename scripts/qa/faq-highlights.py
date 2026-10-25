"""FAQ layout check with all backend and WebSocket connections intercepted."""
import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 Path("outputs/qa").mkdir(parents=True,exist_ok=True)
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  c=await b.new_context(reduced_motion='reduce')
  await c.route('**/*.supabase.co/**',lambda r:r.fulfill(status=200,content_type='application/json',body='[]'))
  await c.route_web_socket('**/realtime/v1/**',lambda ws:ws.close())
  page=await c.new_page();out=[]
  for theme in ['light','dark']:
   for w in [390,768,1440]:
    await page.set_viewport_size({'width':w,'height':950})
    await page.goto('http://localhost:8080/',wait_until='domcontentloaded')
    await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
    item=page.locator('.home-faq__list details').nth(1)
    await item.locator('summary').click()
    assert await item.get_attribute('open') is not None
    assert 'Gratuito' in await item.locator('p').inner_text()
    assert await item.locator('p').evaluate('e=>parseFloat(getComputedStyle(e).fontSize)')>=14
    await item.screenshot(path=f'outputs/qa/faq-{theme}-{w}.png')
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    out.append({'theme':theme,'width':w,'answer_color':await item.locator('p').evaluate('e=>getComputedStyle(e).color')})
  print(json.dumps(out));print('PASS FAQ response highlighted in six viewport/theme combinations')
  await b.close()
asyncio.run(main())
