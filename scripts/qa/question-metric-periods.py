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
rows=[{'id':f'a{i}','question_id':f'q{i}','question_source':'official','subject':'Língua Portuguesa' if i%2==0 else 'Matemática','is_correct':i%2==0,'created_at':str(today-timedelta(days=n))+'T15:00:00+00:00'} for i,n in enumerate([0,6,14,29,100,200,500])]
rows.append({**rows[-1],'id':'repeat','is_correct':False,'created_at':str(today)+'T16:00:00+00:00'})
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
  try: await page.get_by_role('button',name='Taxa de acerto: 57%. Ver detalhes',exact=True).wait_for(timeout=20000)
  except Exception:
   print(await page.locator('body').inner_text(),errors,flush=True);raise
  shortcuts=page.get_by_role('navigation',name='Caminhos de estudo')
  for label,path in [('Questões','/dashboard/question-trainer'),('Conteúdo','/dashboard/library'),('Meu edital','/dashboard/edital'),('Simulados','/dashboard/mock-exams')]:
   assert await shortcuts.get_by_role('link',name=label,exact=False).get_attribute('href')==path
  results=[]
  for theme in ['light','dark']:
   await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
   for w,h in [(320,568),(768,1024),(1280,900)]:
    await page.set_viewport_size({'width':w,'height':h})
    for metric,label in [('questions','Questões resolvidas'),('accuracy','Taxa de acerto')]:
     trigger=page.get_by_role('button',name=label+':',exact=False);await trigger.click()
     panel=page.get_by_role('dialog');await panel.wait_for()
     await expect(panel.get_by_role('button',name='Todo histórico',exact=True)).to_have_attribute('aria-pressed','true')
     for period,n,accuracy in [('Dia',1,100),('7 dias',2,50),('15 dias',3,67),('30 dias',4,50),('6 meses',5,60),('12 meses',6,50),('Todo histórico',7,57)]:
      choice=panel.get_by_role('button',name=period,exact=True);await choice.click()
      await expect(choice).to_have_attribute('aria-pressed','true')
      value=panel.locator('.student-metric-panel__summary > div > strong')
      await expect(value).to_have_text(str(n) if metric=='questions' else str(accuracy)+'%')
      assert await panel.locator('.student-metric-panel__subjects > a').count()==(1 if n==1 else 2)
      if metric=='questions':assert await panel.locator('.student-metric-panel__history li').count()==n
      assert await panel.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
     await panel.get_by_role('button',name='Dia',exact=True).click()
     await panel.get_by_label('Data final do histórico').fill('2020-01-01')
     await panel.get_by_text('Nenhuma primeira resposta registrada neste período.',exact=False).wait_for()
     await panel.get_by_role('button',name='Todo histórico',exact=True).click()
     await expect(panel.locator('.student-metric-panel__summary > div > strong')).to_have_text('7' if metric=='questions' else '57%')
     if w==320:await panel.screenshot(path=f'/tmp/question-period-{theme}-{metric}.png')
     await page.keyboard.press('Escape');await panel.wait_for(state='detached');await expect(trigger).to_be_focused()
     results.append({'theme':theme,'width':w,'metric':metric,'all_periods_and_empty_range':True})
  assert not errors,errors
  print(json.dumps({'cases':results,'deduplication_before_date_filter':True,'browser_errors':errors}))
  await browser.close()
asyncio.run(main())
