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



  fixtures={'count':12,'mode':'ok'}
  async def presence(route):
   if fixtures['mode']=='error':await route.fulfill(status=404,content_type='application/json',body=json.dumps({'code':'PGRST202','message':'missing function'}))
   else:await route.fulfill(status=200,content_type='application/json',body=json.dumps({'studying_now':fixtures['count'],'as_of':__import__('datetime').datetime.now(__import__('datetime').timezone.utc).isoformat(),'window_seconds':90}))
  await context.route('**/rest/v1/rpc/get_public_study_presence',presence)
  page=await context.new_page();await page.emulate_media(reduced_motion='reduce')
  for width in [1440,1280,1150,1024,768,600,390,320]:
   await page.set_viewport_size({'width':width,'height':900});await page.goto('http://localhost:5173/',wait_until='networkidle')
   indicator=page.locator('.home-presence[data-available=true]');await indicator.wait_for()
   assert await indicator.get_attribute('aria-label')=='12 pessoas estudando agora'
   assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
   header=await page.locator('.home-header').bounding_box();assert header['height']<=80
   for selector in ['.home-presence','.home-header__register']:
    box=await page.locator(selector).bounding_box();assert box['x']>=0 and box['x']+box['width']<=width
   await page.screenshot(path=f'/tmp/study-presence-{width}.png')
   print(f'presence {width}: label, header height and bounds OK',flush=True)
  for count in [0,1,12500]:
   fixtures['count']=count;await page.reload(wait_until='networkidle');await page.locator('.home-presence[data-available=true]').wait_for()
   assert str(count).replace('12500','12.500') in await page.locator('.home-presence').get_attribute('aria-label')
  fixtures['mode']='error';await page.reload(wait_until='networkidle');await page.wait_for_timeout(200)
  indicator=page.locator('.home-presence');assert await indicator.get_attribute('aria-hidden')=='true';assert not await indicator.is_visible()
  fixtures['mode']='ok';fixtures['count']=12;await page.reload(wait_until='networkidle');await page.locator('.home-presence[data-available=true]').wait_for()
  await page.evaluate("document.documentElement.classList.add('dark')");await page.screenshot(path='/tmp/study-presence-dark-mobile.png')
  print('PASS: responsive header, genuine zero, singular/large counts, unavailable count hidden, dark mode',flush=True)
  await browser.close()
asyncio.run(main())
