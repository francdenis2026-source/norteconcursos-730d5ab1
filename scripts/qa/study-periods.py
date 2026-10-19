"""Local authenticated fixture; intercepts every backend call, never writes production data."""
import asyncio,json,base64,time
from datetime import datetime,timezone,timedelta
from urllib.parse import urlparse,parse_qs
from playwright.async_api import async_playwright,expect
UID='00000000-0000-4000-8000-000000000123'
Q1='00000000-0000-4000-8000-000000000201';Q2='00000000-0000-4000-8000-000000000202';Q3='00000000-0000-4000-8000-000000000203';SIM='00000000-0000-4000-8000-000000000301'
user={'id':UID,'aud':'authenticated','role':'authenticated','email':'activity@example.invalid','user_metadata':{'full_name':'ALUNO DE TESTE'},'created_at':'2026-01-01T00:00:00Z'}
def enc(v):return base64.urlsafe_b64encode(json.dumps(v).encode()).decode().rstrip('=')
token=enc({'alg':'HS256','typ':'JWT'})+'.'+enc({'sub':UID,'aud':'authenticated','role':'authenticated','exp':int(time.time())+3600})+'.test-signature'
session={'access_token':token,'refresh_token':'local-fixture','expires_in':3600,'expires_at':int(time.time())+3600,'token_type':'bearer','user':user}
now=datetime.now(timezone.utc);today=(now-timedelta(hours=5)).date();day=today-timedelta(days=2)
when=str(day)+'T15:00:00+00:00'
training=[{'id':'response-1','question_id':Q1,'question_source':'official','subject':'Língua Portuguesa','is_correct':False,'selected_answer':'E','official_answer':'C','response_seconds':45,'created_at':when}]
simresponse={'id':'sim-response','question_id':Q2,'question_source':'official','question_order':1,'subject':'Língua Portuguesa','is_correct':True,'selected_answer':'C','official_answer':'C'}
attempt={'id':SIM,'title':'Simulado de Português','total_questions':1,'correct_answers':1,'wrong_answers':0,'blank_answers':0,'accuracy':100,'duration_seconds':180,'finished_at':when,'contest_filter':'Teste'}
def question(qid):return {'id':qid,'subject':'Língua Portuguesa','tested_topic':'Concordância verbal','question_text':('O aluno estuda.' if qid==Q1 else 'As alunas estudam.' if qid==Q2 else 'Os alunos estudam diariamente.'),'official_answer':'C','review_note':'Certo. O verbo concorda com o sujeito. Exemplo: o aluno estuda.','content_status':'active','contest_name':'Teste','exam_year':2025,'career_name':'Teste','exam_board':'CEBRASPE','legal_basis':[],'legal_review_required':False,'context_review_required':False,'difficulty':'fácil'}
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  context=await b.new_context()
  await context.add_init_script("localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
  requests=[]
  async def backend(route):
   url=route.request.url;table=urlparse(url).path.split('/')[-1];params=parse_qs(urlparse(url).query);requests.append((table,params))
   if '/auth/v1/' in url:data=user if '/user' in url else session
   elif table=='profiles':data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'free','onboarding_completed':True,'is_activated':True,'created_at':'2026-01-01T00:00:00Z'}
   elif table in ['question_training_responses','simulator_attempts','simulator_responses','question_reinforcement_attempts','study_sessions']:
    assert params.get('user_id')==['eq.'+UID],(table,params)
    offset=int(params.get('offset',['0'])[0]);data=[]
    if not offset:
     if table=='question_training_responses':
      if 'question_id' in params:data={'is_correct':False} if params['question_id']==['eq.'+Q1] else None
      else:data=training
     elif table=='simulator_attempts':data=[attempt]
     elif table=='simulator_responses':data=[simresponse]
     elif table=='study_sessions':data=[{'study_date':str(day-timedelta(days=n)),'active_seconds':seconds} for n,seconds in [(0,1800),(10,600),(20,1200),(60,2400),(200,3600)]]
   elif table=='official_exam_questions':
    if 'id' in params:data=question(params['id'][0].removeprefix('eq.'))
    else:data=[question(Q1),question(Q2),question(Q3)] if int(params.get('offset',['0'])[0])==0 else []
   elif table=='get_question_training_stats':data={'total':6,'correct':4,'wrong':2,'accuracy':66.7}
   elif table=='get_current_acre_date':data=str(today)
   elif table=='study_time_today':data=0
   elif '/rpc/' in url:data=None
   else:data=[]
   await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
  await context.route('**/*.supabase.co/**',backend)
  page=await context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await page.goto('http://localhost:8080/dashboard',wait_until='domcontentloaded')
  await page.locator('.student-home__week-day').nth(4).wait_for(timeout=60000)
  results=[]
  for theme in ['light','dark']:
   await page.evaluate('(v)=>document.documentElement.classList.toggle("dark",v)',theme=='dark')
   for w,h in [(320,568),(768,1024),(1280,900)]:
    await page.set_viewport_size({'width':w,'height':h})
    trigger=page.locator('.student-home__week-day').nth(4);await trigger.click()
    panel=page.get_by_role('dialog');await panel.wait_for();activity=panel.get_by_role('region',name='Atividades realizadas')
    await activity.get_by_role('heading',name='O que você estudou neste dia').wait_for()
    await activity.locator('.activity-entry').first.wait_for()
    entries=activity.locator('.daily-study-activity__list > details')
    assert await entries.count()==2
    q=entries.filter(has=page.locator('summary b[data-result="Errou"]')).first
    await q.locator('summary').first.click()
    await q.get_by_text('Gabarito registrado na tentativa',exact=True).wait_for()
    await q.get_by_text('Concordância verbal',exact=True).wait_for()
    await q.get_by_text('80% de acerto',exact=True).wait_for()
    text=await q.inner_text();assert '5 outros alunos' in text
    fresh=q.get_by_role('link',name='Resolver questões novas deste assunto')
    href=await fresh.get_attribute('href');query={k:[json.loads(v[0]) if v[0].startswith(chr(34)) else v[0]] for k,v in parse_qs(urlparse(href).query).items()}
    assert query['unseen']==['1'] and query['studyTopic']==['Concordância verbal'] and query['subject']==['Língua Portuguesa']
    sim=entries.filter(has=page.get_by_text('Simulado de Português',exact=True));await sim.locator('summary').first.click()
    await sim.get_by_text('Língua Portuguesa: 1/1 acertos (100%)',exact=True).wait_for()
    sq=sim.locator('.activity-entry--question');await sq.locator('summary').click()
    await sq.get_by_text('Acertou',exact=True).wait_for()
    await sq.get_by_role('link',name='Resolver questões novas deste assunto').wait_for()
    assert 'mesmo simulado ainda indisponível' in await sim.inner_text()
    box=await panel.bounding_box();assert box['x']>=0 and box['y']>=0 and box['x']+box['width']<=w+1 and box['y']+box['height']<=h+1
    assert await panel.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
    for label,monthly in [('Dia',False),('7 dias',False),('15 dias',False),('30 dias',False),('6 meses',True),('1 ano',True)]:
     choice=panel.get_by_role('button',name=label,exact=True);await choice.click()
     await expect(choice).to_have_attribute('aria-pressed','true')
     await panel.get_by_role('heading',name='O que você estudou neste dia' if label=='Dia' else 'O que você estudou no período',exact=True).wait_for()
     if label!='Dia':assert await panel.get_by_role('heading',name='Tempo por mês' if monthly else 'Tempo por dia',exact=True).count()==1
     current_range=[params for table,params in requests if table=='simulator_attempts' and 'finished_at' in params][-1]['finished_at']
     assert current_range[-1]=='lt.'+str(day+timedelta(days=1))+'T05:00:00.000Z',current_range
     assert await panel.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
    await panel.screenshot(path=f'/tmp/daily-activity-{theme}-{w}.png')
    await page.keyboard.press('Escape');await panel.wait_for(state='detached');await expect(trigger).to_be_focused()
    results.append({'theme':theme,'width':w,'daily_results_simulator_breakdown_and_practice':True})
  # Follow the new-only link: q1 was answered in the trainer, q2 in a simulator;
  # only q3 is eligible even though all three share the same subject and topic.
  await page.goto('http://localhost:8080'+href,wait_until='domcontentloaded')
  await page.get_by_text('Treino em andamento',exact=False).wait_for(timeout=60000)
  banner=page.locator('.trainer-resume-banner');await expect(banner).to_contain_text('Questão 1 de 1')
  assert any(t=='simulator_responses' and 'attempt_id' not in p for t,p in requests)
  assert not errors,errors
  print(json.dumps({'cases':results,'trainer_excludes_previously_simulated_and_answered_items':True,'other_students_exclude_owner':True,'all_six_time_periods':True,'browser_errors':errors}))
  await b.close()
asyncio.run(main())
