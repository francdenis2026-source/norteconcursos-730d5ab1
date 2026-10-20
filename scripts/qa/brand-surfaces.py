"""Read-only browser fixtures: every Supabase request is mocked, no production login or writes."""
import asyncio,base64,json,time
from pathlib import Path
from urllib.parse import urlparse
from playwright.async_api import async_playwright
UID='00000000-0000-4000-8000-000000000123'
user={'id':UID,'aud':'authenticated','role':'authenticated','email':'visual-test@example.invalid','user_metadata':{'full_name':'ALUNO DE TESTE'},'created_at':'2026-01-01T00:00:00Z'}
def enc(v):return base64.urlsafe_b64encode(json.dumps(v).encode()).decode().rstrip('=')
token=enc({'alg':'HS256','typ':'JWT'})+'.'+enc({'sub':UID,'aud':'authenticated','exp':int(time.time())+3600})+'.local-fixture'
session={'access_token':token,'refresh_token':'local-only','expires_in':3600,'expires_at':int(time.time())+3600,'token_type':'bearer','user':user}
async def backend(route):
 url=route.request.url;table=urlparse(url).path.split('/')[-1]
 if '/auth/v1/' in url:data=user if '/user' in url else session
 elif table=='profiles':data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'free','created_at':'2026-01-01T00:00:00Z','onboarding_completed':True,'is_activated':True}
 elif '/rpc/' in url:data=None
 else:data=[]
 await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
async def main():
 Path('outputs/qa').mkdir(parents=True,exist_ok=True)
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  context=await b.new_context(reduced_motion='reduce')
  await context.route('**/*.supabase.co/**',backend)
  page=await context.new_page()
  results=[]
  for theme in ['light','dark']:
   for w in [390,768,1440]:
    await page.set_viewport_size({'width':w,'height':950})
    await page.goto('http://localhost:8080/',wait_until='domcontentloaded')
    await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
    for plan in ['free','essential','plus','premium']:
     card=page.locator('.home-plan[data-plan="'+plan+'"]')
     await card.scroll_into_view_if_needed()
     await card.locator('img').evaluate('e=>e.decode()')
     frame=await card.locator('.home-plan__media').bounding_box()
     assert abs(frame['width']/frame['height']-1.6)<.03,frame
     assert await card.locator('img').evaluate('e=>e.naturalWidth>0')
     if plan=='free':assert '/auth' in await card.get_by_role('link',name='Criar conta grátis').get_attribute('href')
     else:assert await card.get_by_role('button',name='Em breve').is_disabled()
     await card.screenshot(path=f'outputs/qa/plan-{theme}-{w}-{plan}.png')
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    results.append({'theme':theme,'width':w,'four_plan_images':True})
  await context.close()
  context=await b.new_context(reduced_motion='reduce')
  await context.add_init_script("localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
  await context.route('**/*.supabase.co/**',backend)
  page=await context.new_page()
  for path,has_art in [('/dashboard',True),('/dashboard/performance',True),('/dashboard/subscriptions',True),('/dashboard/library',True),('/dashboard/question-trainer',True),('/dashboard/enem',False)]:
   await page.goto('http://localhost:8080'+path,wait_until='domcontentloaded')
   await page.locator('.app-shell').wait_for()
   actual=await page.locator('.app-shell').get_attribute('data-brand-bg')
   assert (actual in ['blue','gold'])==has_art,(path,actual)
   for theme in ['light','dark']:
    await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
    for w in [390,768,1440]:
     await page.set_viewport_size({'width':w,'height':950})
     bg=await page.locator('.app-content').evaluate('e=>getComputedStyle(e).backgroundImage')
     assert ('carreiras-' in bg)==has_art,(path,bg)
     if has_art:
      assert await page.locator('.app-main').evaluate('e=>getComputedStyle(e,"::after").content')=='none'
      await page.screenshot(path=f'outputs/qa/internal-{path.rsplit("/",1)[-1]}-{theme}-{w}.png')
   results.append({'path':path,'art':has_art})
  # The decoration is excluded from the admin identity.
  await page.goto('http://localhost:8080/dashboard',wait_until='domcontentloaded');await page.locator('.app-shell').wait_for()
  await page.locator('.app-shell').evaluate('e=>e.dataset.area="admin"')
  assert 'carreiras-' not in await page.locator('.app-content').evaluate('e=>getComputedStyle(e).backgroundImage')
  await context.close();await b.close()
  print(json.dumps(results));print('PASS: image framing, plan actions, student backgrounds and excluded identities')
if __name__=='__main__':
 asyncio.run(main())
