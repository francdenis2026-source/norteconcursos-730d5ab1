"""Authenticated browser fixtures only; all Supabase traffic intercepted, no real data or writes."""
import asyncio, base64, json, time
from datetime import datetime, timezone, timedelta
from urllib.parse import urlparse, parse_qs
from playwright.async_api import async_playwright, expect
UID='00000000-0000-4000-8000-000000000123'
user={'id':UID,'aud':'authenticated','role':'authenticated','email':'metric-test@example.invalid','user_metadata':{'full_name':'ALUNO DE TESTE'},'created_at':'2026-01-01T00:00:00Z'}
def enc(value):return base64.urlsafe_b64encode(json.dumps(value).encode()).decode().rstrip('=')
token=enc({'alg':'HS256','typ':'JWT'})+'.'+enc({'sub':UID,'aud':'authenticated','role':'authenticated','exp':int(time.time())+3600})+'.test-signature'
session={'access_token':token,'refresh_token':'local-test-only','expires_in':3600,'expires_at':int(time.time())+3600,'token_type':'bearer','user':user}
now=datetime.now(timezone.utc)
today=(now-timedelta(hours=5)).date()
rows=[{'id':f'a{i}','question_id':f'q{i}','question_source':'official','subject':'Língua Portuguesa' if i<2 else 'Matemática','is_correct':i<3,'created_at':now.isoformat()} for i in range(4)]
# A repeated correct answer must not replace the first wrong response.
rows.append({**rows[3],'id':'repeat','is_correct':True,'created_at':(now+timedelta(seconds=1)).isoformat()})
activity=[{'study_date':str(today),'active_seconds':600},{'study_date':str(today),'active_seconds':300},{'study_date':str(today-timedelta(days=2)),'active_seconds':1800}]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  context=await browser.new_context()
  await context.add_init_script("localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
  mode={'value':'normal'};scoped=[]
  async def backend(route):
   url=route.request.url;table=urlparse(url).path.split('/')[-1];params=parse_qs(urlparse(url).query)
   if '/auth/v1/' in url:data=user if '/user' in url else session
   elif table=='profiles':data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'free','created_at':'2026-01-01T00:00:00Z','onboarding_completed':True,'is_activated':True}
   elif table in ['question_training_responses','study_sessions']:
    assert params.get('user_id')==['eq.'+UID],(table,params)
    scoped.append(table)
    if mode['value']=='error':
     await route.fulfill(status=503,content_type='application/json',body=json.dumps({'message':'fixture unavailable'}));return
    data=[] if mode['value']=='empty' or int(params.get('offset',['0'])[0])>0 else rows if table=='question_training_responses' else activity
   elif table=='curated_question_catalog':
    data=[] if int(params.get('offset',['0'])[0]) else [{'id':'new-'+subject,'subject':subject,'contest_name':'Teste','contest_year':2025,'career_name':'Teste','exam_board':'CEBRASPE','question_text':'O aluno estuda diariamente.' if subject=='Língua Portuguesa' else 'Dois mais dois resulta em quatro.','official_answer':'C','explanation':'Certo. Exemplo de teste.','legal_basis':[],'content_status':'active'} for subject in ['Língua Portuguesa','Matemática']]
   elif table=='get_current_acre_date' :data=str(today)
   elif table=='study_time_today':data=900
   elif '/rpc/' in url:data=None
   else:data=[]
   await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
  await context.route('**/*.supabase.co/**',backend)
  page=await context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto('http://localhost:8080/dashboard',wait_until='domcontentloaded')
  try: await page.get_by_role('button',name='Taxa de acerto: 75%. Ver detalhes',exact=True).wait_for(timeout=20000)
  except Exception:
   print(await page.locator('body').inner_text(),errors,flush=True);raise
  shortcuts=page.get_by_role('navigation',name='Caminhos de estudo')
  for label,path in [('Questões','/dashboard/question-trainer'),('Conteúdo','/dashboard/library'),('Meu edital','/dashboard/edital'),('Simulados','/dashboard/mock-exams')]:
   assert await shortcuts.get_by_role('link',name=label,exact=False).get_attribute('href')==path
  results=[]
  for width,height in [(390,844),(1280,900)]:
   await page.set_viewport_size({'width':width,'height':height})
   for label in ['Questões resolvidas','Taxa de acerto']:
    for subject in ['Língua Portuguesa','Matemática']:
     trigger=page.get_by_role('button',name=label+':',exact=False);await trigger.click()
     panel=page.get_by_role('dialog');await panel.wait_for()
     group=panel.locator('.student-metric-panel__subjects')
     assert await group.get_by_role('link').count()==2
     link=group.get_by_role('link',name='Treinar '+subject,exact=True)
     await link.click()
     await page.get_by_role('button',name='Começar sessão',exact=True).wait_for(timeout=60000)
     await expect(page.get_by_role('button',name='Começar sessão',exact=True)).to_be_enabled()
     assert await page.locator('.trainer-resume-banner').count()==0
     fixed=page.get_by_role('group',name='Disciplina fixa neste treino',exact=True)
     await expect(fixed).to_contain_text(subject)
     assert await page.get_by_role('combobox',name='Disciplina',exact=True).count()==0
     await expect(page.get_by_role('combobox',name='Assunto',exact=True)).to_contain_text('Todos os assuntos')
     await page.get_by_role('button',name='Limpar filtros',exact=True).click()
     await expect(fixed).to_contain_text(subject)
     assert await page.get_by_role('combobox',name='Disciplina',exact=True).count()==0
     assert 'go=' not in page.url
     assert subject in page.url or 'subject=' in page.url
     results.append({'width':width,'metric':label,'subject':subject,'exact_discipline_setup_without_autostart':True,'locked_after_reset':True,'sidebar_unlocks_all_disciplines':True})
     await page.locator('a[href="/dashboard/question-trainer"]').first.evaluate('(element)=>element.click()')
     chooser=page.get_by_role('combobox',name='Disciplina',exact=True)
     await expect(chooser).to_contain_text('Todas as disciplinas')
     assert await page.get_by_role('group',name='Disciplina fixa neste treino',exact=True).count()==0
     await chooser.click()
     target='Matemática' if subject=='Língua Portuguesa' else 'Língua Portuguesa'
     await page.get_by_role('option',name=target,exact=False).click()
     await expect(chooser).to_contain_text(target)
     assert 'subject=' not in page.url
     await page.goto('http://localhost:8080/dashboard',wait_until='domcontentloaded')
     await page.get_by_role('button',name='Taxa de acerto: 75%. Ver detalhes',exact=True).wait_for()
  assert not errors,errors
  print(json.dumps({'cases':results,'browser_errors':errors}))
  await browser.close()
asyncio.run(main())
