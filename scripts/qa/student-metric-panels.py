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
   elif table=='get_current_acre_date':data=str(today)
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
  for theme in ['light','dark']:
   await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
   for w,h in [(320,568),(390,844),(768,1024),(1280,900)]:
    await page.set_viewport_size({'width':w,'height':h})
    for metric,label in [('questions','Questões resolvidas'),('accuracy','Taxa de acerto'),('today','Tempo ativo hoje'),('week','Estudo nesta semana')]:
     button=page.get_by_role('button',name=label+':',exact=False);await button.click()
     panel=page.get_by_role('dialog');await panel.wait_for()
     assert await panel.locator('[data-metric]').get_attribute('data-metric')==metric
     assert await panel.get_by_role('heading',name=label,exact=True).count()==1
     assert 'ALUNO DE TESTE' in await panel.inner_text()
     text=await panel.inner_text()
     assert 'Meu edital' not in text and 'Procurando suas provas' not in text
     if metric=='questions':assert await panel.locator('.student-metric-panel__history li').count()==4
     if metric=='accuracy':assert '75%' in text and 'Últimas questões respondidas' not in text
     if metric=='today':assert 'Tempo por dia' not in text and '2' in text
     if metric=='week':assert await panel.locator('.student-metric-panel__days li').count()==7 and '45 min' in text
     box=await panel.bounding_box();assert box['x']>=0 and box['y']>=0 and box['x']+box['width']<=w+1 and box['y']+box['height']<=h+1,box
     assert await panel.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
     if w==390:await panel.screenshot(path=f'/tmp/metric-{theme}-{metric}.png')
     await page.keyboard.press('Escape');await panel.wait_for(state='detached')
     await expect(button).to_be_focused()
    results.append({'theme':theme,'viewport':[w,h],'four_scoped_panels':True})
  rhythm=page.locator('section[aria-labelledby="dashboard-rhythm-title"]')
  day_buttons=rhythm.locator('.student-home__week-day')
  assert await day_buttons.count()==7
  for i in range(7):
   button=day_buttons.nth(i);await button.click()
   panel=page.get_by_role('dialog');await panel.wait_for()
   assert await panel.locator('[data-metric]').get_attribute('data-metric')=='today'
   expected='30 min' if i==4 else '15 min' if i==6 else '0 min'
   assert await panel.locator('.student-metric-panel__summary strong').inner_text()==expected
   if i!=6:assert await panel.get_by_role('heading',name='Tempo ativo em',exact=False).count()==1
   assert 'Tempo por dia' not in await panel.inner_text()
   await page.keyboard.press('Escape');await panel.wait_for(state='detached');await expect(button).to_be_focused()
  for name in ['Seu ritmo na semana','Ver histórico de tempo']:
   await rhythm.get_by_role('button',name=name,exact=True).click()
   panel=page.get_by_role('dialog');await panel.wait_for()
   assert await panel.locator('[data-metric]').get_attribute('data-metric')=='week'
   await page.keyboard.press('Escape');await panel.wait_for(state='detached')
  for state in ['empty','error']:
   mode['value']=state;await page.reload(wait_until='domcontentloaded')
   button=page.get_by_role('button',name='Questões resolvidas:',exact=False);await button.wait_for();await page.wait_for_timeout(2500);await button.click()
   panel=page.get_by_role('dialog')
   if state=='empty':await panel.get_by_text('Você ainda não tem respostas registradas',exact=False).wait_for()
   else:await panel.get_by_role('alert').wait_for();assert await panel.locator('[data-metric]').count()==0
   await page.keyboard.press('Escape')
  assert scoped and not errors,errors
  print(json.dumps({'cases':results,'first_response_preserved':True,'empty_and_error_states':True,'user_scoped_queries':True,'seven_day_drilldowns_and_history':True,'browser_errors':errors}))
  await browser.close()
asyncio.run(main())
