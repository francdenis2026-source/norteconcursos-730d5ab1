"""Real Supabase Realtime, anonymous browsers + a locally mocked authenticated dashboard.
No real user account or production database write is created by this test.
"""
import asyncio,json,base64,time
from playwright.async_api import async_playwright, expect
ID_KEY='norte-presence-browser:v1'
UID='00000000-0000-4000-8000-000000000123'
user={'id':UID,'aud':'authenticated','role':'authenticated','email':'qa@example.invalid','user_metadata':{'full_name':'ALUNO DE TESTE'},'created_at':'2026-01-01T00:00:00Z'}
def enc(x):return base64.urlsafe_b64encode(json.dumps(x).encode()).decode().rstrip('=')
token=enc({'alg':'HS256','typ':'JWT'})+'.'+enc({'sub':UID,'aud':'authenticated','role':'authenticated','exp':int(time.time())+3600})+'.test-signature'
session={'access_token':token,'refresh_token':'local-test-only','expires_in':3600,'expires_at':int(time.time())+3600,'token_type':'bearer','user':user}
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  anonymous=await browser.new_context(viewport={'width':1440,'height':900},reduced_motion='reduce')
  home=await anonymous.new_page();await home.goto('http://localhost:5173/',wait_until='domcontentloaded')
  indicator=home.locator('.home-presence[data-available=true]');await indicator.wait_for(timeout=30000)
  baseline=int(await indicator.locator('strong').inner_text());assert baseline>=1
  key=await home.evaluate('localStorage.getItem("'+ID_KEY+'")')
  for width in [1440,1280,1150,1024,768,600,390,320]:
   await home.set_viewport_size({'width':width,'height':900});await home.wait_for_timeout(100)
   assert await home.evaluate('document.documentElement.scrollWidth<=innerWidth')
   bounds=await indicator.bounding_box();assert bounds['x']>=0 and bounds['x']+bounds['width']<=width
   assert (await home.locator('.home-header').bounding_box())['height']<=80
   await home.screenshot(path=f'/tmp/online-presence-{width}.png')
  duplicate=await anonymous.new_page();await duplicate.goto('http://localhost:5173/',wait_until='domcontentloaded')
  await duplicate.locator('.home-presence[data-available=true]').wait_for(timeout=30000)
  assert await duplicate.evaluate('localStorage.getItem("'+ID_KEY+'")')==key
  await expect(duplicate.locator('.home-presence strong')).to_have_text(str(baseline),timeout=10000)
  print('PASS anonymous browser visible across desktop/tablet/mobile; duplicate tab counts once',flush=True)
  authenticated=await browser.new_context(reduced_motion='reduce')
  await authenticated.add_init_script("localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
  async def auth_backend(route):
   path=route.request.url.split('?')[0].split('/')[-1]
   if '/auth/v1/' in route.request.url:data=user if path=='user' else session
   elif path=='profiles':data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'free','onboarding_completed':True,'is_activated':True,'created_at':'2026-10-01T00:00:00Z'}
   elif path=='active_user_sessions':data=None
   elif '/rpc/' in route.request.url:data=0
   else:data=[]
   await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
  await authenticated.route('**/*.supabase.co/**',auth_backend)
  panel=await authenticated.new_page();await panel.goto('http://localhost:5173/dashboard/profile',wait_until='domcontentloaded')
  await panel.wait_for_selector('.app-shell',timeout=30000)
  await expect(duplicate.locator('.home-presence strong')).to_have_text(str(baseline+1),timeout=30000)
  assert await panel.evaluate('localStorage.getItem("'+ID_KEY+'")')!=key
  print('PASS authenticated panel and anonymous homepage counted together; no authenticated token required for presence',flush=True)
  await authenticated.close()
  await expect(duplicate.locator('.home-presence strong')).to_have_text(str(baseline),timeout=30000)
  await duplicate.close()
  await expect(home.locator('.home-presence strong')).to_have_text(str(baseline),timeout=10000)
  await anonymous.set_offline(True)
  await expect(home.locator('.home-presence')).to_have_attribute('data-state','unavailable',timeout=15000)
  assert await home.locator('.home-presence').is_visible()
  assert await home.locator('.home-presence strong').count()==0
  await anonymous.set_offline(False)
  await home.locator('.home-presence[data-available=true]').wait_for(timeout=45000)
  print('PASS disconnect removes browser; offline never fabricates zero; connection recovers',flush=True)
  await anonymous.close();await browser.close()
asyncio.run(main())
