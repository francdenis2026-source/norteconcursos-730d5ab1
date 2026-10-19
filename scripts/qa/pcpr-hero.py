"""Browser fixtures only: no production account or database writes."""
import asyncio,json,base64,time
from datetime import datetime,timezone,timedelta
from pathlib import Path
from urllib.parse import urlparse,parse_qs
from playwright.async_api import async_playwright
UID='00000000-0000-4000-8000-000000000123'
user={'id':UID,'aud':'authenticated','role':'authenticated','email':'pcpr@example.invalid','user_metadata':{'full_name':'ALUNO DE TESTE'},'created_at':'2026-01-01T00:00:00Z'}
def enc(x):return base64.urlsafe_b64encode(json.dumps(x).encode()).decode().rstrip('=')
token=enc({'alg':'HS256','typ':'JWT'})+'.'+enc({'sub':UID,'aud':'authenticated','role':'authenticated','exp':int(time.time())+3600})+'.test-signature'
session={'access_token':token,'refresh_token':'local-test-only','expires_in':3600,'expires_at':int(time.time())+3600,'token_type':'bearer','user':user}
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  context=await browser.new_context(reduced_motion='reduce')
  logged={'value':False}
  await context.add_init_script("if(location.hostname==='localhost') { localStorage.setItem('norte_intro_seen','1'); }")
  async def backend(route):
   table=urlparse(route.request.url).path.split('/')[-1]
   if '/auth/v1/' in route.request.url:data=user if '/user' in route.request.url else session
   elif table=='profiles':data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'free','created_at':'2026-01-01T00:00:00Z','onboarding_completed':True,'is_activated':True}
   elif table=='board_exam_questions' and route.request.method=='HEAD':
    await route.fulfill(status=200,headers={'content-range':'0-0/300','access-control-expose-headers':'content-range'},body='');return
   elif table=='get_current_acre_date':data='2026-10-19'
   else:data=[]
   await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
  await context.route('**/*.supabase.co/**',backend)
  page=await context.new_page()
  for theme in ['light','dark']:
   for width in [320,390,768,1024,1440]:
    await page.set_viewport_size({'width':width,'height':1000});await page.goto('http://localhost:8080/',wait_until='domcontentloaded',timeout=60000)
    await page.evaluate("document.documentElement.classList.toggle('dark',"+str(theme=='dark').lower()+")")
    intro=page.get_by_role('button',name='Pular introdução',exact=True)
    if await intro.count() and await intro.is_visible():await intro.click()
    card=page.locator('#prova-pcpr');await card.wait_for(timeout=30000);await card.scroll_into_view_if_needed()
    await page.wait_for_function("document.querySelector('#prova-pcpr img').naturalWidth>0")
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    assert await card.get_by_role('link',name='Resolver a prova grátis').get_attribute('href')=='/auth?mode=register'
    await card.locator('summary').click();assert await card.locator('details').evaluate('e=>e.open')
    assert await card.locator('img').first.evaluate("e=>getComputedStyle(e).objectFit")=='contain'
    assert (await card.locator('img').first.get_attribute('src')).endswith('pcpr-capa.webp')
    await card.screenshot(path=f'/tmp/pcpr-home-{theme}-{width}.png')
    acre=page.locator('.home-opportunity--acre');await acre.scroll_into_view_if_needed()
    await page.wait_for_function("document.querySelector('.home-opportunity--acre img').naturalWidth>0")
    image=acre.locator('.home-opportunity__image > img')
    assert (await image.get_attribute('src')).endswith('pcac-capa.webp')
    assert await image.evaluate("e=>getComputedStyle(e).objectFit")=='contain'
    image_box=await image.bounding_box();status_box=await acre.locator('.home-status').bounding_box()
    assert status_box['y']>=image_box['y']+image_box['height']-1
    if width<=700:assert (await acre.bounding_box())['height'] < (await card.bounding_box())['height']
    await acre.screenshot(path=f'/tmp/pcac-home-{theme}-{width}.png')
  await context.add_init_script("if(location.hostname==='localhost')localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
  for route,kind in [('dashboard','full'),('dashboard/question-trainer','compact')]:
   for theme,width in [('light',1440),('light',768),('light',390),('light',320),('dark',1024),('dark',390)]:
    await page.set_viewport_size({'width':width,'height':1000});await page.goto('http://localhost:8080/'+route,wait_until='domcontentloaded',timeout=60000)
    await page.evaluate("document.documentElement.classList.toggle('dark',"+str(theme=='dark').lower()+")")
    card=page.locator('.pcpr-spot');await card.wait_for(timeout=30000);await card.scroll_into_view_if_needed()
    await page.wait_for_function("document.querySelector('.pcpr-spot__hero').naturalWidth>0")
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    link=card.get_by_role('link',name='Resolver a prova',exact=True);params=parse_qs(urlparse(await link.get_attribute('href')).query)
    assert params['contest']==['Polícia Civil do Estado do Paraná'] and params['mode']==['catalog'] and json.loads(params['go'][0])=='1'
    assert (await link.bounding_box())['height']>=44
    assert await card.locator('.pcpr-spot__hero').evaluate("e=>getComputedStyle(e).objectFit")=='contain'
    await card.screenshot(path=f'/tmp/pcpr-{kind}-{theme}-{width}.png')
  print('PASS: Paraná and Acre text-bearing covers, no crops or status overlap; both authenticated hero variants; images load; 320/390/768/1024/1440 widths, light/dark; no overflow; registration and exact exam links preserved')
  await browser.close()
asyncio.run(main())
