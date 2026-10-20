"""Verify full artwork visibility in the student shell. Auth and all backend traffic are mocked."""
import asyncio,json,runpy
from pathlib import Path
from playwright.async_api import async_playwright
fixture=runpy.run_path(str(Path(__file__).with_name('brand-surfaces.py')),run_name='qa_fixture')
async def main():
 Path('outputs/qa').mkdir(parents=True,exist_ok=True)
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  c=await browser.new_context(reduced_motion='reduce')
  await c.add_init_script("localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(fixture['session']))+");")
  await c.route('**/*.supabase.co/**',fixture['backend'])
  await c.route_web_socket('**/realtime/v1/**',lambda ws:ws.close(code=1000))
  page=await c.new_page();results=[]
  for path in ['/dashboard','/dashboard/subscriptions','/dashboard/library','/dashboard/question-trainer']:
   await page.goto('http://localhost:8080'+path,wait_until='domcontentloaded');await page.locator('.app-shell').wait_for()
   for theme in ['light','dark']:
    await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
    for w in [320,390,768,1024,1440]:
     await page.set_viewport_size({'width':w,'height':950})
     art=page.locator('.app-brand-background');await art.wait_for(state='visible')
     style=await art.evaluate('e=>{const s=getComputedStyle(e);return {size:s.backgroundSize,opacity:s.opacity,ratio:s.aspectRatio,image:s.backgroundImage,mask:s.maskImage}}')
     assert style['size']=='contain' and style['opacity']=='1' and style['mask']=='none',style
     assert 'carreiras-' in style['image']
     a,b=map(float,style['ratio'].split('/'));box=await art.bounding_box()
     assert abs(box['width']/box['height']-a/b)<.02,box
     assert box['x']>=0 and box['x']+box['width']<=w+1,box
     inner=await page.locator('.app-content__inner').bounding_box()
     assert box['y']+box['height']<=inner['y']+1,'Reading content covers the artwork'
     assert '780px' not in await page.locator('.app-content').evaluate('e=>getComputedStyle(e).backgroundSize')
     if path in ['/dashboard','/dashboard/subscriptions'] and w in [390,1440]:
      await art.scroll_into_view_if_needed()
      await art.screenshot(path=f'outputs/qa/student-art-{path.rsplit("/",1)[-1]}-{theme}-{w}.png')
      if path=='/dashboard':await page.screenshot(path=f'outputs/qa/student-art-page-{theme}-{w}.png')
     results.append({'path':path,'theme':theme,'width':w,'full_art':True})
   await page.emulate_media(media='print');assert not await page.locator('.app-brand-background').is_visible();await page.emulate_media(media='screen')
  await page.goto('http://localhost:8080/dashboard/enem',wait_until='domcontentloaded');await page.locator('.app-shell').wait_for()
  assert await page.locator('.app-brand-background').count()==0
  await page.goto('http://localhost:8080/dashboard',wait_until='domcontentloaded');await page.locator('.app-shell').wait_for()
  await page.locator('.app-shell').evaluate('e=>e.dataset.area="admin"')
  assert not await page.locator('.app-brand-background').is_visible()
  print(json.dumps({'checked':len(results),'full_art':True,'no_content_overlap':True,'print_enem_admin_excluded':True}))
  await c.close();await browser.close()
asyncio.run(main())
