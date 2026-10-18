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
  await context.add_init_script("localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
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
  page=await context.new_page();await page.goto('http://localhost:5173/dashboard/profile',wait_until='domcontentloaded');await page.wait_for_selector('.app-shell',timeout=60000);await page.wait_for_timeout(2000)
  measurements=[]
  for index in range(2):
   counts.clear();start=time.monotonic()
   await page.locator('a[href="/dashboard/question-trainer"]').first.click()
   await page.locator('#trainer-title').wait_for(timeout=60000)
   panel=round((time.monotonic()-start)*1000)
   await page.get_by_role('button',name='Começar sessão',exact=True).wait_for()
   for _ in range(150):
    if await page.get_by_role('button',name='Começar sessão',exact=True).is_enabled():break
    await page.wait_for_timeout(100)
   ready=round((time.monotonic()-start)*1000)
   assert await page.get_by_role('button',name='Começar sessão',exact=True).is_enabled()
   measurements.append({'visit':index+1,'panel_ms':panel,'ready_ms':ready,'requests':dict(counts)})
   await page.locator('a[href="/dashboard/profile"]').first.click();await page.wait_for_timeout(1000)
  print(json.dumps(measurements,ensure_ascii=False),flush=True)
  await browser.close()
asyncio.run(main())
