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
materials=[{'id':f'm{i}','slug':f'penal-teoria-{i}','title':title,'discipline':'Direito Penal','topic_label':'Fundamentos','sort_order':i,'content_status':'active','summary':'Teoria para revisão.','contest_name':None,'law_course_slug':None,'law_version_checked_at':None,'syllabus_topic_order':None,'body_md':'## Teoria de teste\nMaterial simulado apenas para validar a navegação.','source_note':'Fixture','legal_basis':[],'flashcards':[],'quiz':[]} for i,title in enumerate(['Fundamentos de Direito Penal','Outros fundamentos de Direito Penal'])]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  context=await browser.new_context(viewport={'width':1280,'height':1000})
  await context.add_init_script("if (location.hostname === 'localhost') localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
  mode={'value':'normal','theory':'ready'}
  async def backend(route):
   url=route.request.url;table=urlparse(url).path.split('/')[-1]
   if '/auth/v1/' in url:data=user if '/user' in url else session
   elif table=='profiles':data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'free','created_at':'2026-01-01T00:00:00Z','onboarding_completed':True,'is_activated':True}
   elif table=='study_materials':
    if mode['theory']=='error':
     await route.fulfill(status=403,content_type='application/json',body=json.dumps({'message':'fixture unavailable'}));return
    slug=parse_qs(urlparse(url).query).get('slug',[''])[0].removeprefix('eq.')
    data=next((m for m in materials if m['slug']==slug),None) if slug else materials if mode['theory']=='ready' else []
   elif table=='question_training_responses':
    if mode['value']=='unavailable':
     await route.fulfill(status=403,content_type='application/json',body=json.dumps({'message':'fixture unavailable'}));return
    data=rows if mode['value']=='normal' and int(parse_qs(urlparse(url).query).get('offset',['0'])[0])==0 else []
   elif table=='get_current_acre_date':data=(now-timedelta(hours=5)).strftime('%Y-%m-%d')
   else:data=[]
   await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
  await context.route('**/*.supabase.co/**',backend)
  page=await context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto('http://localhost:8080/dashboard/performance',wait_until='networkidle')
  panel=page.get_by_test_id('progress-summary');await panel.wait_for(timeout=60000)
  await panel.get_by_text('2 acertos em 10 questões novas',exact=True).wait_for()
  await panel.get_by_role('button',name='7 dias',exact=True).click()
  await panel.get_by_text('1 acerto em 5 questões novas',exact=True).wait_for()
  assert await panel.get_by_role('button',name='7 dias',exact=True).get_attribute('aria-pressed')=='true'
  link=panel.get_by_role('link',name='Treinar Direito Penal');href=await link.get_attribute('href')
  print('Training link:',href,flush=True)
  params=parse_qs(urlparse(href).query)
  assert 'question-trainer' in href and params.get('area')==['Direito Penal'] and json.loads(params['go'][0])=='1'
  heading=panel.get_by_role('link',name='Abrir questões de Direito Penal')
  assert await heading.get_attribute('href')==href
  theory=panel.get_by_role('link',name='Estudar teoria de Direito Penal: Fundamentos de Direito Penal',exact=True)
  assert '/dashboard/library/penal-teoria-0' in await theory.get_attribute('href')
  await panel.locator('summary').click()
  await panel.get_by_role('link',name='Outros fundamentos de Direito Penal',exact=True).wait_for(state='visible')
  await theory.click();await page.wait_for_url('**/dashboard/library/penal-teoria-0*')
  await page.get_by_role('heading',name='Fundamentos de Direito Penal',exact=True).wait_for()
  await page.goto('http://localhost:8080/dashboard/performance',wait_until='networkidle');await panel.wait_for()
  await panel.get_by_role('button',name='Tudo',exact=True).click()
  await panel.get_by_text('2 acertos em 10 questões novas',exact=True).wait_for()
  for width in [1280,768,390,320]:
   await page.set_viewport_size({'width':width,'height':1000});await panel.scroll_into_view_if_needed()
   assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),f'overflow {width}'
   for button in await panel.get_by_role('button').all():
    assert (await button.bounding_box())['height']>=44
   await page.screenshot(path=f'/tmp/progress-{width}.png')
  await page.evaluate("document.documentElement.classList.add('dark')");await page.screenshot(path='/tmp/progress-dark.png')
  await panel.get_by_role('button',name='7 dias',exact=True).focus();await page.keyboard.press('Space')
  assert await panel.get_by_role('button',name='7 dias',exact=True).get_attribute('aria-pressed')=='true'
  mode['theory']='empty';await page.reload(wait_until='networkidle');await panel.get_by_text('Ainda não há teoria publicada para esta matéria.',exact=True).wait_for()
  assert await panel.get_by_role('link',name='Treinar Direito Penal').count()==1
  mode['theory']='error';await page.reload(wait_until='networkidle');await panel.get_by_text('Não foi possível consultar a teoria agora. O treino continua disponível.',exact=True).wait_for(timeout=30000)
  mode['theory']='ready'
  mode['value']='empty';await page.reload(wait_until='networkidle');await panel.get_by_text('0 acertos em 0 questões novas',exact=True).wait_for()
  assert await panel.get_by_role('link').count()==0
  assert 'Ainda não há questões novas' in await panel.inner_text()
  mode['value']='unavailable';await page.reload(wait_until='networkidle');await panel.get_by_text('Respostas indisponíveis',exact=True).wait_for()
  assert '0 acertos' not in await panel.inner_text()
  assert not errors,errors
  print('PASS: period totals, keyboard, subject and theory navigation, extra readings, missing/unavailable theory, 320/390/768/1280 widths, dark, empty and unavailable sources; no JS errors')
  await browser.close()
asyncio.run(main())
