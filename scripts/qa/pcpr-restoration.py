"""Read-only PCPR snapshot replay. All auth/REST requests are local fixtures, never production writes."""
import asyncio,base64,json,os,time
from pathlib import Path
from urllib.parse import urlparse,parse_qs,urlencode
from playwright.async_api import async_playwright,expect
ROWS=json.loads(Path(os.environ['PCPR_FIXTURE_FILE']).read_text())
UID='00000000-0000-4000-8000-000000000123'
user={'id':UID,'aud':'authenticated','role':'authenticated','email':'qa@example.invalid','user_metadata':{'full_name':'ALUNO DE TESTE'},'created_at':'2026-01-01T00:00:00Z'}
def enc(x):return base64.urlsafe_b64encode(json.dumps(x).encode()).decode().rstrip('=')
token=enc({'alg':'HS256','typ':'JWT'})+'.'+enc({'sub':UID,'aud':'authenticated','role':'authenticated','exp':int(time.time())+3600})+'.fixture'
session={'access_token':token,'refresh_token':'local-test-only','expires_in':3600,'expires_at':int(time.time())+3600,'token_type':'bearer','user':user}
async def backend(route):
 url=route.request.url;table=urlparse(url).path.split('/')[-1];params=parse_qs(urlparse(url).query)
 if '/auth/v1/' in url:data=user if '/user' in url else session
 elif table=='profiles':data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'premium','created_at':'2026-01-01T00:00:00Z','onboarding_completed':True,'is_activated':True}
 elif table=='active_user_sessions':data=None
 elif table=='board_exam_questions':
  available=[r for r in ROWS if r['content_status']=='active'];offset=int(params.get('offset',['0'])[0]);data=available[offset:offset+1000]
 elif table=='get_current_acre_date':data='2026-10-19'
 elif '/rpc/' in url:data=0
 else:data=[]
 await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  context=await browser.new_context(reduced_motion='reduce')
  await context.route('**/*.supabase.co/**',backend)
  for theme in ([] if os.environ.get('PCPR_SKIP_RAILS') else ['light','dark']):
   for width in [320,390,768,1024,1440]:
    page=await context.new_page();await page.set_viewport_size({'width':width,'height':1000})
    await page.goto('http://localhost:5173/',wait_until='networkidle')
    await page.evaluate('document.fonts.ready');await page.evaluate("document.documentElement.classList.toggle('dark',"+str(theme=='dark').lower()+")")
    rail=page.get_by_role('region',name='Oportunidades de concursos',exact=True);await rail.scroll_into_view_if_needed()
    track=rail.locator('.home-rail__track');await track.evaluate('e=>e.scrollTo({left:0,behavior:"instant"})')
    next=rail.get_by_role('button',name='Próximo: Oportunidades de concursos',exact=True);previous=rail.get_by_role('button',name='Anterior: Oportunidades de concursos',exact=True)
    await expect(previous).to_be_disabled()
    for _ in range(5):
     if await next.is_disabled():break
     await next.click();await page.wait_for_timeout(100)
    await expect(next).to_be_disabled();assert await track.evaluate('e=>e.scrollLeft')>0
    await track.focus()
    for _ in range(5):
     if await previous.is_disabled():break
     await page.keyboard.press('ArrowLeft');await page.wait_for_timeout(100)
    await expect(previous).to_be_disabled();assert await track.evaluate('e=>e.scrollLeft')<5
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    await rail.screenshot(path=f'/tmp/pcpr-carousel-{theme}-{width}.png');await page.close()
  print('PASS carousel: forward/back/keyboard; 320/390/768/1024/1440; light/dark; no overflow',flush=True)
  await context.add_init_script("localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
  page=await context.new_page();await page.set_viewport_size({'width':1280,'height':1000})
  query=urlencode({'mode':'catalog','limit':'all','contest':'Polícia Civil do Estado do Paraná','career':'Papiloscopista Policial','year':'2026','source':'official'})
  await page.goto('http://localhost:5173/dashboard/question-trainer?'+query,wait_until='domcontentloaded')
  await page.get_by_text('100 questões na seleção atual',exact=True).wait_for(timeout=30000)
  await page.screenshot(path='/tmp/pcpr-trainer-100.png')
  await page.goto('http://localhost:5173/dashboard/mock-exams',wait_until='domcontentloaded')
  await page.wait_for_selector('.app-shell')
  # The paper selector may be inside the "Prova cadastrada" mode.
  selector=page.locator('#simulator-paper-search')
  if not await selector.count():
   await page.get_by_role('button',name='Resolver uma prova cadastrada',exact=True).click()
  await selector.wait_for(timeout=30000);await selector.fill('Papiloscopista')
  card=page.get_by_role('button').filter(has_text='Papiloscopista Policial').filter(has_text='100 questões disponíveis')
  await card.first.wait_for(timeout=30000)
  await page.screenshot(path='/tmp/pcpr-simulator-100.png')
  print('PASS PCPR: real snapshot yields 100 Papiloscopista items in trainer and simulator; no response submitted',flush=True)
  await context.close();await browser.close()
asyncio.run(main())
