"""Authenticated trainer feedback regression. All accounts and writes are intercepted fixtures."""
import asyncio,json,base64,time
from urllib.parse import urlparse,parse_qs
from playwright.async_api import async_playwright, expect
UID='00000000-0000-4000-8000-000000000123'
user={'id':UID,'aud':'authenticated','role':'authenticated','email':'qa@example.invalid','user_metadata':{'full_name':'ALUNO DE TESTE'},'created_at':'2026-01-01T00:00:00Z'}
def enc(x):return base64.urlsafe_b64encode(json.dumps(x).encode()).decode().rstrip('=')
token=enc({'alg':'HS256','typ':'JWT'})+'.'+enc({'sub':UID,'aud':'authenticated','role':'authenticated','exp':int(time.time())+3600})+'.test-signature'
session={'access_token':token,'refresh_token':'local-test-only','expires_in':3600,'expires_at':int(time.time())+3600,'token_type':'bearer','user':user}
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for width,kind,correct in [(390,'ce',True),(390,'ce',False),(1280,'choice',True),(1280,'choice',False)]:
   context=await browser.new_context(viewport={'width':width,'height':900},reduced_motion='reduce',color_scheme='dark' if not correct else 'light')
   await context.add_init_script("localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
   fixture={'fail':False,'writes':[]}
   async def backend(route):
    url=route.request.url;table=urlparse(url).path.split('/')[-1]
    if '/auth/v1/' in url:data=user if '/user' in url else session
    elif table=='profiles':data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'free','created_at':'2026-01-01T00:00:00Z','onboarding_completed':True,'is_activated':True}
    elif table=='active_user_sessions':data=None
    elif table=='question_training_responses' and route.request.method=='POST':
     if fixture['fail']:
      await route.fulfill(status=500,content_type='application/json',body=json.dumps({'message':'Local QA save failure'}));return
     fixture['writes'].append(route.request.post_data_json);data=[]
    elif table=='curated_question_catalog' and int(parse_qs(urlparse(url).query).get('offset',['0'])[0])==0:
     data=[{'id':'00000000-0000-4000-8000-000000000999','contest_name':'Teste','contest_year':2025,'career_name':'Polícia Civil','exam_board':'CEBRASPE','subject':'Matemática','question_text':'A soma de um com um é igual a dois.' if kind=='ce' else 'Qual é a soma de dois com dois?\nA) Três.\nB) Quatro.\nC) Cinco.\nD) Seis.','official_answer':'C' if kind=='ce' else 'B','content_status':'active','legal_basis':[],'explanation':'A operação indicada é uma adição de números naturais. Some as duas parcelas apresentadas para encontrar o resultado e comparar com o enunciado.','difficulty':'facil'}]
    elif '/rpc/' in url:data=0
    else:data=[]
    await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
   await context.route('**/*.supabase.co/**',backend)
   page=await context.new_page()
   await page.goto('http://localhost:5173/dashboard/profile',wait_until='domcontentloaded');await page.wait_for_selector('.app-shell',timeout=60000)
   await page.goto('http://localhost:5173/dashboard/question-trainer',wait_until='domcontentloaded')
   start=page.get_by_role('button',name='Começar sessão',exact=True);await start.wait_for()
   await expect(start).to_be_enabled(timeout=30000);await start.click()
   choices=page.locator('.trainer-verdict' if kind=='ce' else '.trainer-option')
   await choices.first.wait_for()
   feedback=page.get_by_role('status',name='Correção da resposta')
   assert await feedback.count()==0
   index=(0 if correct else 1) if kind=='ce' else (1 if correct else 0)
   await choices.nth(index).click()
   assert await feedback.count()==0,'No verdict before confirming'
   confirm=page.get_by_role('button',name='Confirmar resposta',exact=False)
   if kind=='ce' and correct:
    fixture['fail']=True;await confirm.click();await page.get_by_text('Não foi possível salvar sua resposta. Tente novamente.',exact=True).wait_for();assert await feedback.count()==0
    fixture['fail']=False
   await confirm.click()
   await feedback.get_by_role('heading',name='Você acertou' if correct else 'Você errou',exact=True).wait_for()
   expected_selected=('Certo' if correct else 'Errado') if kind=='ce' else ('Alternativa B' if correct else 'Alternativa A')
   assert await feedback.locator('.answer-feedback__selected strong').inner_text()==expected_selected
   assert await feedback.locator('.answer-feedback__official strong').inner_text()==('Certo' if kind=='ce' else 'Alternativa B')
   assert fixture['writes'] and fixture['writes'][0]['is_correct']==correct
   assert await feedback.locator('.answer-feedback__icon').evaluate('(e)=>getComputedStyle(e).color')==await feedback.locator('.answer-feedback__icon svg').evaluate('(e)=>getComputedStyle(e).color'), 'Verdict icon must match its semantic color'
   await page.wait_for_timeout(200)
   bounds=await feedback.bounding_box();assert bounds['y']>=50 and bounds['y']+bounds['height']<=900,(width,kind,bounds)
   assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
   await page.screenshot(path=f'/tmp/answer-feedback-{kind}-{correct}-{width}.png')
   print(f'PASS trainer {kind} {correct} {width}: explicit verdict, selection/key, saved correctness, visible feedback, no overflow',flush=True)
   await context.close()
  await browser.close()
asyncio.run(main())
