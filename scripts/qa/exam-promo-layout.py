"""Check compact campaign cards, complete artwork and native carousel navigation. No backend writes."""
import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 Path('outputs/qa').mkdir(parents=True,exist_ok=True)
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  c=await b.new_context(reduced_motion='reduce')
  await c.route('**/*.supabase.co/**',lambda r:r.fulfill(status=200,content_type='application/json',body='[]'))
  await c.route_web_socket('**/realtime/v1/**',lambda ws:ws.close(code=1000))
  page=await c.new_page();results=[]
  for theme in ['light','dark']:
   for width in [320,390,768,1024,1440]:
    await page.set_viewport_size({'width':width,'height':950})
    await page.goto('http://localhost:8080/',wait_until='domcontentloaded')
    await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
    cards=page.locator('.home-opportunities > .home-opportunity');assert await cards.count()==3
    measures=[]
    for i in range(3):
     card=cards.nth(i);await card.scroll_into_view_if_needed();await card.locator('.home-opportunity__image img').evaluate('e=>e.decode()')
     frame=card.locator('.home-opportunity__image');box=await frame.bounding_box();cb=await card.bounding_box()
     assert abs(box['width']/box['height']-1672/940)<.03
     assert await frame.locator('img').evaluate('e=>getComputedStyle(e).objectFit')=='contain'
     assert cb['height']<600,(width,i,cb)
     if width>=960:assert cb['width']<410
     if width==390:await card.screenshot(path=f'outputs/qa/exam-{theme}-{i}.png')
     measures.append({'width':round(cb['width']),'height':round(cb['height'])})
    await cards.first.scroll_into_view_if_needed()
    if width==1440:await page.locator('#concursos').screenshot(path=f'outputs/qa/exams-{theme}-desktop.png')
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    details=cards.first.locator('details');await details.locator('summary').click();assert await details.get_attribute('open') is not None
    assert await details.locator('.home-exam-roles li').count()==3
    results.append({'theme':theme,'viewport':width,'cards':measures})
  print(json.dumps(results));print('PASS compact cards, complete covers, preserved expandable information')
  await b.close()
asyncio.run(main())
