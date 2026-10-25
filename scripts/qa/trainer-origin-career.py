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
    data=[] if int(params.get('offset',['0'])[0]) else [{'id':'new-'+subject,'subject':subject,'contest_name':'Polícia Federal' if subject=='Língua Portuguesa' else 'Repertório — Apostilas Opção','contest_year':2025,'career_name':'Agente de Polícia Federal' if subject=='Língua Portuguesa' else 'Diversos','exam_board':'CEBRASPE','question_text':'O aluno estuda diariamente.' if subject=='Língua Portuguesa' else 'Dois mais dois resulta em quatro.','subtopic':'Crase' if subject=='Língua Portuguesa' else 'Porcentagem','official_answer':'C','explanation':'Certo. Exemplo de teste.','legal_basis':[],'content_status':'active'} for subject in ['Língua Portuguesa','Matemática']]
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
   await page.goto('http://localhost:8080/dashboard/question-trainer',wait_until='domcontentloaded')
   origin=page.get_by_role('combobox',name='Concurso / material de origem',exact=True)
   career=page.get_by_role('combobox',name='Cargo da prova',exact=True)
   await expect(origin).to_be_enabled()
   await expect(career).to_be_enabled()
   await career.click()
   await expect(page.get_by_role('option',name='Agente de Polícia Federal',exact=False)).to_be_visible()
   assert await page.get_by_role('option',name='Diversos',exact=False).count()==0
   await page.get_by_role('option',name='Agente de Polícia Federal',exact=False).click()
   await expect(career).to_contain_text('Agente de Polícia Federal')
   await origin.click()
   assert await page.get_by_role('option',name='Repertório',exact=False).count()==0
   await page.keyboard.press('Escape')
   await page.get_by_role('button',name='Limpar filtros',exact=True).click()
   await origin.click()
   await page.get_by_role('option',name='Repertório',exact=False).click()
   await expect(career).to_be_disabled()
   await expect(page.get_by_role('button',name='Começar sessão',exact=True)).to_be_enabled()
   assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
   await page.screenshot(path=f'/tmp/norte-origin-career-{width}.png',full_page=True)
   await page.get_by_role('button',name='ENEM',exact=True).click()
   assert await page.get_by_role('combobox',name='Cargo da prova',exact=True).count()==0
   results.append({'width':width,'origin_and_job_distinct':True,'material_without_job_stays_available':True,'enem_hides_job':True})
  assert not errors,errors
  print(json.dumps({'cases':results,'browser_errors':errors}))
  await browser.close()
asyncio.run(main())
