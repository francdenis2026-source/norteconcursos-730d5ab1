import asyncio,json,base64,time
from pathlib import Path
from playwright.async_api import async_playwright
UID='00000000-0000-4000-8000-000000000123'
user={'id':UID,'aud':'authenticated','role':'authenticated','email':'mobile-test@example.invalid','user_metadata':{'full_name':'ALUNO DE TESTE'},'created_at':'2026-01-01T00:00:00Z'}
def enc(x):return base64.urlsafe_b64encode(json.dumps(x).encode()).decode().rstrip('=')
token=enc({'alg':'HS256','typ':'JWT'})+'.'+enc({'sub':UID,'aud':'authenticated','role':'authenticated','exp':int(time.time())+3600})+'.test-signature'
session={'access_token':token,'refresh_token':'local-test-only','expires_in':3600,'expires_at':int(time.time())+3600,'token_type':'bearer','user':user}
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  context=await browser.new_context(viewport={'width':1280,'height':900})
  counts={}
  from urllib.parse import urlparse,parse_qs
  async def backend(route):
   url=route.request.url;table=urlparse(url).path.split('/')[-1];counts[table]=counts.get(table,0)+1
   if '/auth/v1/' in url:data=user if '/user' in url else session
   elif table=='profiles':
    await asyncio.sleep(.4);data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'free','created_at':'2026-01-01T00:00:00Z','onboarding_completed':True,'is_activated':True}
   elif table=='user_roles':await asyncio.sleep(.4);data=[]
   elif table in ['official_exam_questions','curated_question_catalog','question_bank','board_exam_questions','question_currency','question_training_responses']:
    await asyncio.sleep(1.2);offset=int(parse_qs(urlparse(url).query).get('offset',['0'])[0]);data=[]
    if table=='curated_question_catalog' and offset==0:data=[{'id':'00000000-0000-4000-8000-000000000999','contest_name':'Teste','contest_year':2025,'career_name':'Polícia Civil','exam_board':'CEBRASPE','subject':'Matemática','question_text':'A soma de um com um é igual a dois.','official_answer':'C','content_status':'active','legal_basis':[],'explanation':'Certo. Um mais um é dois.','difficulty':'facil'}]
   elif '/rpc/'in url:data=0
   else:data=[]
   await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
  await context.route('**/*.supabase.co/**',backend)


  page=await context.new_page()
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  metrics=[]
  for theme,width in [('light',1440),('light',768),('light',390),('light',320),('dark',1440),('dark',390)]:
   await context.add_init_script("localStorage.setItem('theme','"+theme+"')")
   await page.set_viewport_size({'width':width,'height':1000 if width>900 else 844})
   await page.goto('http://localhost:5173/',wait_until='domcontentloaded');await page.locator('#home-title').wait_for()
   await page.wait_for_timeout(1000)
   if width>767:
    skip=page.get_by_role('button',name='Pular introdução',exact=True)
    try:await skip.wait_for(timeout=5000);await skip.click()
    except Exception:pass
    await page.wait_for_function("!document.querySelector('.home-intro')",timeout=12000)
    assert not await page.locator('.home-hero__content').evaluate('e=>e.inert')
   else:assert await page.locator('.home-intro video').count()==0
   for y in range(0,10000,650):
    await page.evaluate('(y)=>scrollTo(0,y)',y);await page.wait_for_timeout(60)
    if await page.evaluate('innerHeight+scrollY>=document.documentElement.scrollHeight-2'):break
   await page.wait_for_function("Array.from(document.querySelectorAll('.home img')).every(i=>i.complete&&i.naturalWidth>0)",timeout=20000)
   comparison=page.locator('.home-plan-comparison');assert not await comparison.evaluate('e=>e.open')
   await comparison.locator('summary').click();assert await comparison.evaluate('e=>e.open')
   await page.locator('.home-compare table').wait_for()
   assert await page.locator('.home-compare').evaluate('e=>e.clientWidth<=innerWidth')
   await comparison.locator('summary').click()
   tool=page.locator('.home-tool').first;await tool.locator('summary').click();assert await tool.evaluate('e=>e.open');await tool.locator('summary').click()
   await page.evaluate('scrollTo(0,0)')
   assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(theme,width)
   assert await page.locator('.question-count-badge').evaluate("e=>getComputedStyle(e).marginTop")=='0px'
   assert await page.locator('h1').count()==1
   assert await page.locator('.home-core-tool').count()==3
   assert await page.locator('.home-tool').count()==4
   if width<900:
    await page.get_by_role('button',name='Abrir menu',exact=True).click()
    menu=page.get_by_role('navigation',name='Navegação móvel');await menu.wait_for()
    await menu.get_by_role('link',name='Ferramentas',exact=True).click()
    await page.wait_for_timeout(300);assert not await menu.is_visible()
    assert page.url.endswith('#ferramentas')
    await page.evaluate('scrollTo(0,0)')
   metrics.append({'theme':theme,'width':width,'height':await page.evaluate('document.documentElement.scrollHeight'),'footer':round(await page.locator('.home-footer').evaluate('e=>e.getBoundingClientRect().height'))})
   await page.screenshot(path=f'/tmp/home-redesign-{theme}-{width}.png',full_page=True)
   print(str(metrics[-1])+' OK',flush=True)
  # Controlled media events verify both the existing fade and removal, without relying on video duration.
  media=await context.new_page();await media.set_viewport_size({'width':1440,'height':900})
  await media.add_init_script("HTMLMediaElement.prototype.load=function(){};HTMLMediaElement.prototype.pause=function(){};HTMLMediaElement.prototype.play=function(){queueMicrotask(()=>this.dispatchEvent(new Event('playing')));return Promise.resolve()}")
  await media.goto('http://localhost:5173/',wait_until='domcontentloaded');await media.locator('.home-intro[data-phase=playing]').wait_for()
  await media.locator('.home-intro video').evaluate("e=>e.dispatchEvent(new Event('ended'))")
  await media.locator('.home-intro[data-phase=fading]').wait_for();await media.wait_for_function("!document.querySelector('.home-intro')")
  assert await media.locator('.home-hero__image').is_visible();assert not await media.locator('.home-hero__content').evaluate('e=>e.inert')
  assert not errors,errors
  print('PASS: desktop/tablet/mobile, both themes, all images, navigation, expandable content, intro fade/removal, no page errors',flush=True)
  await browser.close()
asyncio.run(main())
