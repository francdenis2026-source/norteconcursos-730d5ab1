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



  async def blocked(context,width,mode):
   page=await context.new_page();await page.set_viewport_size({'width':width,'height':900})
   await page.add_init_script("window.__playCalls=0;HTMLMediaElement.prototype.load=function(){};HTMLMediaElement.prototype.pause=function(){};HTMLMediaElement.prototype.play=function(){window.__playCalls++;"+("if(!window.__allowIntro)return Promise.reject(new DOMException('Blocked','NotAllowedError'));queueMicrotask(()=>this.dispatchEvent(new Event('playing')));return Promise.resolve()" if mode=='blocked' else "queueMicrotask(()=>this.dispatchEvent(new Event('playing')));return Promise.resolve()")+"}")
   await page.goto('http://localhost:5173/',wait_until='domcontentloaded')
   if mode=='blocked':
    button=page.get_by_role('button',name='Ver introdução',exact=True);await button.wait_for()
    assert not await page.locator('.home-hero__content').evaluate('e=>e.inert')
    await page.evaluate("window.__allowIntro=true")
    await button.click()
   await page.locator('.home-intro[data-phase=playing]').wait_for()
   assert await page.locator('video').evaluate("e=>e.muted&&e.defaultMuted&&e.playsInline&&e.querySelector('source').type==='video/mp4'")
   await page.locator('video').evaluate("e=>e.dispatchEvent(new Event('ended'))")
   await page.wait_for_function("!document.querySelector('.home-intro')")
   assert await page.locator('.home-hero__image').is_visible()
   assert not await page.locator('.home-hero__content').evaluate('e=>e.inert')
   await page.close();print(f'tablet {width}: {mode} -> image OK',flush=True)
  for width in [600,768,1024]:await blocked(context,width,'blocked')
  await blocked(context,768,'playing')
  page=await context.new_page();await page.set_viewport_size({'width':768,'height':1024})
  await page.goto('http://localhost:5173/',wait_until='domcontentloaded')
  try:
   await page.locator('.home-intro[data-phase=playing]').wait_for(timeout=6000)
   print('actual Chromium tablet playback OK',flush=True)
  except Exception:
   assert await page.locator('.home-hero__image').is_visible()
   print('actual media fallback visible',flush=True)
  await page.wait_for_timeout(9500)
  assert not await page.locator('.home-hero__content').evaluate('e=>e.inert')
  await page.emulate_media(reduced_motion='reduce')
  for width in [1440,1024,768,600,390,320]:
   await page.close();page=await context.new_page();await page.emulate_media(reduced_motion='reduce')
   await page.set_viewport_size({'width':width,'height':900});await page.goto('http://localhost:5173/',wait_until='domcontentloaded');await page.wait_for_selector('.home-rail');await page.wait_for_load_state('networkidle');await page.evaluate('document.fonts.ready')
   assert await page.locator('video').count()==0
   plans=page.get_by_role('region',name='Planos de estudo',exact=True);track=plans.locator('.home-rail__track')
   await plans.scroll_into_view_if_needed()
   await track.evaluate('e=>e.scrollTo({left:0,behavior:"instant"})');await page.wait_for_timeout(150)
   if width>1100:
    assert await plans.locator('.home-rail__controls button').count()==0
   else:
    next=plans.get_by_role('button',name='Próximo: Planos de estudo',exact=True)
    await next.wait_for();await next.click();await page.wait_for_timeout(300)
    assert await track.evaluate('e=>e.scrollLeft')>0
    await track.focus();await page.keyboard.press('ArrowLeft');await page.wait_for_timeout(300)
    await page.wait_for_function("id=>document.getElementById(id).scrollLeft<5",arg=await track.get_attribute('id'),timeout=5000)
    assert await track.evaluate('e=>e.scrollLeft')<5
    for _ in range(5):
     if await next.is_disabled():break
     await next.click();await page.wait_for_timeout(200)
    assert await next.is_disabled()
    assert '4' in await plans.locator('[role=status]').inner_text()
    # Native horizontal wheel and vertical page scrolling remain independent.
    await track.evaluate('e=>e.scrollTo({left:0,behavior:"instant"})');await page.wait_for_timeout(100)
    await track.hover();await page.mouse.wheel(await track.evaluate('e=>e.firstElementChild.getBoundingClientRect().width+16'),0);await page.wait_for_timeout(300)
    assert await track.evaluate('e=>e.scrollLeft')>0
   opportunities=page.get_by_role('region',name='Oportunidades de concursos',exact=True)
   if width<=700:
    await opportunities.scroll_into_view_if_needed();await opportunities.get_by_role('button',name='Próximo: Oportunidades de concursos',exact=True).click();await page.wait_for_timeout(300)
    assert await opportunities.locator('.home-rail__track').evaluate('e=>e.scrollLeft')>0
   assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
   await plans.scroll_into_view_if_needed();await page.screenshot(path=f'/tmp/home-rails-{width}.png')
   print(f'rails {width}: controls, keyboard, horizontal scrolling, page bounds OK',flush=True)
  # Small phones remain image-first; media failure never blocks the hero.
  await page.emulate_media(reduced_motion='no-preference');await page.set_viewport_size({'width':390,'height':844});await page.goto('http://localhost:5173/',wait_until='domcontentloaded');await page.wait_for_timeout(300);assert await page.locator('video').count()==0
  error_page=await context.new_page();await error_page.set_viewport_size({'width':768,'height':900})
  await error_page.add_init_script("HTMLMediaElement.prototype.load=function(){};HTMLMediaElement.prototype.pause=function(){};HTMLMediaElement.prototype.play=function(){window.__mediaFailed=true;return Promise.reject(new DOMException('No source','NotSupportedError'))}")
  await error_page.goto('http://localhost:5173/',wait_until='domcontentloaded');await error_page.wait_for_function("window.__mediaFailed && !document.querySelector('.home-intro')");assert not await error_page.locator('.home-hero__content').evaluate('e=>e.inert')
  print('PASS: tablet intro, blocked autoplay retry, media failure, reduced motion, native rails and responsive layout',flush=True)
  await browser.close()
asyncio.run(main())
