"""Homepage layout checks; requests use fixtures and do not modify production data."""
import asyncio,json,os
from playwright.async_api import async_playwright,expect
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  context=await browser.new_context(reduced_motion='reduce')
  async def backend(route):
   await route.fulfill(status=200,content_type='application/json',body='[]')
  await context.route('**/*.supabase.co/**',backend)
  for theme in ['light','dark']:
   if os.environ.get('HOME_THEME') and os.environ['HOME_THEME']!=theme:continue
   for width,height in [(320,568),(360,640),(390,844),(430,932),(600,960),(768,1024),(844,390)]:
    if os.environ.get('HOME_MAX_WIDTH') and width>int(os.environ['HOME_MAX_WIDTH']):continue
    if os.environ.get('HOME_MIN_WIDTH') and width<int(os.environ['HOME_MIN_WIDTH']):continue
    page=await context.new_page();await page.set_viewport_size({'width':width,'height':height})
    await page.goto('http://localhost:5173/',wait_until='networkidle');await page.evaluate('document.fonts.ready')
    await page.evaluate("document.documentElement.classList.toggle('dark',"+str(theme=='dark').lower()+")")
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(theme,width,'page overflow')
    rail=page.get_by_role('region',name='Planos de estudo',exact=True);await rail.scroll_into_view_if_needed()
    track=rail.locator('.home-rail__track');cards=track.locator('.home-plan')
    assert await cards.count()==4
    boxes=await cards.evaluate_all('els=>els.map(e=>e.getBoundingClientRect().toJSON())')
    assert max(b['height'] for b in boxes)-min(b['height'] for b in boxes)<2,(width,boxes)
    media=await cards.locator('.home-plan__media').evaluate_all('els=>els.map(e=>e.getBoundingClientRect().height)')
    assert max(media)-min(media)<2,(width,media)
    for selector in ['.home-plan__description','.home-plan__availability','.home-plan__features summary']:
     assert min(await cards.locator(selector).evaluate_all('els=>els.map(e=>parseFloat(getComputedStyle(e).fontSize))'))>=13,(width,selector)
    await cards.first.locator('summary').click()
    boxes=await cards.evaluate_all('els=>els.map(e=>e.getBoundingClientRect().toJSON())')
    assert max(b['height'] for b in boxes)-min(b['height'] for b in boxes)<2,(width,'expanded',boxes)
    await cards.first.locator('summary').click();await track.evaluate('e=>e.scrollTo({left:0,behavior:"instant"})')
    await rail.screenshot(path=f'/tmp/plans-mobile-{theme}-{width}.png')
    await page.get_by_role('button',name='Abrir menu',exact=True).click()
    menu=page.locator('.home-menu[role=dialog]');await menu.wait_for();await page.wait_for_timeout(150)
    bounds=await menu.bounding_box();assert bounds['x']>=0 and bounds['x']+bounds['width']<=width+1 and bounds['y']>=0 and bounds['y']+bounds['height']<=height+1,(width,height,bounds)
    assert await menu.evaluate('e=>e.scrollWidth<=e.clientWidth'),(width,'menu overflow')
    nav=await menu.locator('nav').bounding_box();access=await menu.locator('.home-menu__access').bounding_box()
    assert 0<=access['y']-(nav['y']+nav['height'])<=24,(width,'excess gap',nav,access)
    register=menu.get_by_role('link',name='Começar grátis',exact=True);await register.scroll_into_view_if_needed();assert await register.is_visible()
    login=menu.get_by_role('link',name='Já tenho conta',exact=True);await login.scroll_into_view_if_needed();assert await login.is_visible()
    await page.screenshot(path=f'/tmp/menu-mobile-{theme}-{width}x{height}.png')
    await page.keyboard.press('Escape');await expect(menu).not_to_be_visible()
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    print(f'PASS {theme} {width}x{height}: equal plan/media heights, readable text, viewport-bound menu, compact actions, keyboard dismissal',flush=True)
    await page.close()
  await context.close();await browser.close()
asyncio.run(main())
