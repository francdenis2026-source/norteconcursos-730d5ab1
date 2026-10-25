"""Browser fixtures only: no production account or database writes."""
import asyncio,json,base64,time
from datetime import datetime,timezone,timedelta
from pathlib import Path
from urllib.parse import urlparse,parse_qs
from playwright.async_api import async_playwright
UID='00000000-0000-4000-8000-000000000123'
user={'id':UID,'aud':'authenticated','role':'authenticated','email':'progress@example.invalid','user_metadata':{'full_name':'ALUNO DE TESTE'},'created_at':'2026-01-01T00:00:00Z'}
def enc(x):return base64.urlsafe_b64encode(json.dumps(x).encode()).decode().rstrip('=')
token=enc({'alg':'HS256','typ':'JWT'})+'.'+enc({'sub':UID,'aud':'authenticated','role':'authenticated','exp':int(time.time())+3600})+'.test-signature'
session={'access_token':token,'refresh_token':'local-test-only','expires_in':3600,'expires_at':int(time.time())+3600,'token_type':'bearer','user':user}
now=datetime.now(timezone.utc)
rows=[{'id':f'a{i}','question_id':f'q{i}','question_source':'official','subject':'Direito Penal','is_correct':i%5==0,'response_seconds':30,'selected_answer':'C','official_answer':'E','created_at':(now-timedelta(days=1 if i<5 else 15)).isoformat()} for i in range(10)]
async def main():
 import sys
 phase=sys.argv[1] if len(sys.argv)>1 else 'after'
 target=Path('outputs/light-theme-2026-10-19');target.mkdir(parents=True,exist_ok=True)
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  context=await browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
  async def backend(route):
   table=urlparse(route.request.url).path.split('/')[-1]
   if '/auth/v1/' in route.request.url:data=user if '/user' in route.request.url else session
   elif table=='profiles':data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'free','created_at':'2026-01-01T00:00:00Z','onboarding_completed':True,'is_activated':True}
   elif table=='get_current_acre_date':data='2026-10-19'
   elif table=='question_training_responses':data=[] if int(parse_qs(urlparse(route.request.url).query).get('offset',['0'])[0]) else rows
   elif table=='board_exam_questions' and route.request.method=='HEAD':
    await route.fulfill(status=200,headers={'content-range':'0-0/300','access-control-expose-headers':'content-range'},body='');return
   elif table=='get_public_study_presence':data={'studying_now':12,'as_of':datetime.now(timezone.utc).isoformat(),'window_seconds':90}
   else:data=[]
   await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
  await context.route('**/*.supabase.co/**',backend)
  await context.add_init_script("if(location.hostname==='localhost')localStorage.setItem('theme','light')")
  page=await context.new_page();report={}
  for path,key in [('/','home'),('/auth','auth')]:
   await page.goto('http://localhost:8080'+path,wait_until='domcontentloaded',timeout=60000)
   await page.wait_for_timeout(800)
   intro=page.get_by_role('button',name='Pular introdução',exact=True)
   if await intro.count() and await intro.is_visible():await intro.click()
   report[key]=await page.evaluate(Path('scripts/qa/contrast-scan.js').read_text())
   await page.screenshot(path=str(target/f'{phase}-{key}.png'))
  await context.add_init_script("if(location.hostname==='localhost')localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
  for path,key in [('/dashboard','dashboard'),('/dashboard/question-trainer','trainer'),('/dashboard/performance','performance'),('/dashboard/library','library')]:
   await page.goto('http://localhost:8080'+path,wait_until='domcontentloaded',timeout=60000)
   await page.locator('.app-shell').wait_for(timeout=30000)
   if key=='performance':await page.get_by_test_id('progress-summary').wait_for(timeout=30000)
   if key=='dashboard':await page.wait_for_function("document.querySelector('.student-home__metric strong')?.textContent !== '…'",timeout=30000)
   await page.wait_for_timeout(500)
   report[key]=await page.evaluate(Path('scripts/qa/contrast-scan.js').read_text())
   await page.screenshot(path=str(target/f'{phase}-{key}.png'))
  if phase=='after':
   report['header']=await page.evaluate(Path('scripts/qa/contrast-scan.js').read_text(),{'selector':'.app-topbar *','headerFallback':[61,74,92,1]})
   for width in [1440,1024,768,390,320]:
    await page.set_viewport_size({'width':width,'height':1000});await page.goto('http://localhost:8080/dashboard/performance',wait_until='domcontentloaded');await page.locator('.app-topbar').wait_for();await page.wait_for_timeout(300)
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
    header=page.locator('.app-topbar');assert await header.evaluate("e=>getComputedStyle(e).backdropFilter")!='none'
    if width==1440:
     await page.get_by_role('button',name='Buscar área (Ctrl+K)',exact=True).click();await page.get_by_role('dialog').wait_for();await page.keyboard.press('Escape')
    await page.screenshot(path=str(target/f'header-light-{width}.png'))
   await page.get_by_role('button',name='Ativar tema escuro',exact=True).click();await page.wait_for_timeout(300)
   assert await page.evaluate("document.documentElement.classList.contains('dark')")
   await page.screenshot(path=str(target/'dark-320.png'))
   await page.get_by_role('button',name='Ativar tema claro',exact=True).click()
   await page.get_by_role('button',name='Abrir menu',exact=True).click();await page.get_by_role('dialog').wait_for();await page.keyboard.press('Escape')
  if phase=='after':
   assert all(not v['failures'] for v in report.values()),{k:v['failures'] for k,v in report.items() if v['failures']}
  (target/f'{phase}.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
  print(json.dumps({k:{'checked':v['checked'],'failures':v['failures'][:15],'skipped':v['skipped']} for k,v in report.items()},ensure_ascii=False,indent=2),flush=True)
  await browser.close()
asyncio.run(main())
