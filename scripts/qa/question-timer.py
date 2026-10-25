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
  await context.add_init_script("if (location.hostname === 'localhost') localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
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
  page=await context.new_page();await page.goto('http://localhost:8080/dashboard/profile',wait_until='domcontentloaded');await page.wait_for_selector('.app-shell',timeout=60000);await page.wait_for_timeout(2000)
  await page.add_init_script("window.__spoken=[];window.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[],cancel:()=>{},speak:u=>window.__spoken.push(u.text),pause:()=>{},resume:()=>{}}});")
  await page.reload();await page.wait_for_selector('.app-shell')
  await page.locator('a[href="/dashboard/question-trainer"]').first.click()
  start=page.get_by_role('button',name='Começar sessão',exact=True)
  await start.wait_for()
  for _ in range(150):
   if await start.is_enabled():break
   await page.wait_for_timeout(100)
  await start.click()
  reader=page.get_by_role('button',name='Ler em voz alta',exact=True)
  await reader.wait_for()
  timer=page.locator('.question-stopwatch')
  await timer.wait_for()
  before=await timer.inner_text();await page.wait_for_timeout(1500);assert before != await timer.inner_text()
  for width in [320,390,768,1024,1280]:
   await page.set_viewport_size({'width':width,'height':900});await page.wait_for_timeout(300)
   await page.get_by_role('region',name='Orientação de estudo').wait_for()
   assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
   box=await timer.bounding_box();assert box['x']>=0 and box['x']+box['width']<=width
   await page.locator('#trainer-question').screenshot(path=f'/tmp/question-timer-{width}.png')
  await page.set_viewport_size({'width':1024,'height':1366});await page.screenshot(path='/tmp/trainer-tablet-portrait.png',full_page=True)
  print('PASS: stopwatch advances, fits 320/390/768/1024/1280px; screenshots captured')
  await browser.close()
asyncio.run(main())
