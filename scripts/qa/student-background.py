"""Student identity layout with mocked auth/backend; no production data or login is used."""
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
     assert await page.locator('.app-brand-background').count()==0,'Standalone top image must be removed'
     bg=await page.locator('.app-content').evaluate('e=>getComputedStyle(e).backgroundImage')
     assert 'carreiras-' in bg
     assert '780px' not in await page.locator('.app-content').evaluate('e=>getComputedStyle(e).backgroundSize')
     if path=='/dashboard':
      hero=page.locator('.student-hub__masthead');image=hero.locator('img')
      await image.evaluate('e=>e.decode()');await page.evaluate('document.fonts.ready')
      assert (await hero.locator('h1').text_content()).strip()=='Área do aluno'
      assert await image.get_attribute('src')=='/media/hero/area-aluno-emblema.webp'
      assert await hero.locator('source').count()==0,'Mobile must use the new artwork too'
      assert await image.evaluate('e=>getComputedStyle(e).objectFit')=='contain'
      assert await hero.locator('.student-hub__welcome').is_visible()
      assert await hero.locator('.student-hub__date').is_visible()
      assert await hero.get_by_role('link',name='Meu desempenho').get_attribute('href')=='/dashboard/performance'
      assert 'Norte Insignia' in await hero.locator('h1').evaluate('e=>getComputedStyle(e).fontFamily')
      # Reading copy must retain the on-image token in both themes.
      for target in ['h1 + p','.student-hub__date']:
       assert await hero.locator(target).evaluate('e=>{const s=getComputedStyle(e);const c=document.createElement("span");c.style.color="var(--on-ink-muted)";e.append(c);const expected=getComputedStyle(c).color;c.remove();return s.color===expected}')
      box=await hero.bounding_box();assert box['width']<=w and box['height']<650,box
      assert await hero.evaluate('e=>e.scrollWidth<=e.clientWidth')
      await hero.screenshot(path=f'outputs/qa/student-identity-{theme}-{w}.png')
     results.append({'path':path,'theme':theme,'width':w})
  await page.goto('http://localhost:8080/dashboard/enem',wait_until='domcontentloaded');await page.locator('.app-shell').wait_for()
  assert await page.locator('.app-shell').get_attribute('data-brand-bg')=='off'
  print(json.dumps({'checked':len(results),'single_hero':True,'new_art_mobile_and_desktop':True,'title_and_actions_preserved':True}))
  await c.close();await browser.close()
asyncio.run(main())
