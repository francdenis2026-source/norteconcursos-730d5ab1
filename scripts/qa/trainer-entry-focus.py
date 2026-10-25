"""Browser fixtures only. All backend requests, including answer writes, stay local."""
import asyncio,base64,json,time
from urllib.parse import urlparse,parse_qs,quote
from playwright.async_api import async_playwright,expect
UID='00000000-0000-4000-8000-000000000123'
user={'id':UID,'aud':'authenticated','role':'authenticated','email':'focus@example.invalid','user_metadata':{'full_name':'ALUNO DE TESTE'},'created_at':'2026-01-01T00:00:00Z'}
def enc(v):return base64.urlsafe_b64encode(json.dumps(v).encode()).decode().rstrip('=')
token=enc({'alg':'HS256','typ':'JWT'})+'.'+enc({'sub':UID,'aud':'authenticated','role':'authenticated','exp':int(time.time())+3600})+'.test-signature'
session={'access_token':token,'refresh_token':'local-fixture','expires_in':3600,'expires_at':int(time.time())+3600,'token_type':'bearer','user':user}
questions=[{'id':'00000000-0000-4000-8000-00000000020'+str(i),'contest_name':'Teste','contest_year':2025,'career_name':'Teste','exam_board':'CEBRASPE','subject':'Língua Portuguesa','tested_topic':topic,'question_text':text,'official_answer':'C','content_status':'active','legal_basis':[],'explanation':'Certo. Este é um exemplo de teste local.','difficulty':'fácil'} for i,topic,text in [(1,'Concordância verbal','O verbo concorda com o sujeito.'),(2,'Crase','A expressão à noite recebe acento indicativo de crase.')]]
async def position(page,identifier):
 target=page.locator('#'+identifier);await expect(target).to_be_focused()
 await page.wait_for_function("""(id)=>{const e=document.getElementById(id),h=document.querySelector('.app-topbar'),c=document.getElementById('dashboard-content');if(!e)return false;const y=e.getBoundingClientRect().top,top=Math.max(0,h?.getBoundingClientRect().bottom??0);return y>=top-2&&y<=Math.max(top+40,innerHeight*.5)}""",arg=identifier)
 box=await target.bounding_box();return round(box['y'])
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  results=[]
  for width,height in [(320,700),(768,1024),(1280,900)]:
   for theme in ['light','dark']:
    context=await browser.new_context(viewport={'width':width,'height':height},reduced_motion='reduce')
    await context.add_init_script("localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(session))+");")
    writes=[]
    async def backend(route):
     url=route.request.url;table=urlparse(url).path.split('/')[-1];params=parse_qs(urlparse(url).query)
     if '/auth/v1/' in url:data=user if '/user' in url else session
     elif table=='profiles':data={'id':UID,'full_name':'ALUNO DE TESTE','subscription_tier':'free','created_at':'2026-01-01T00:00:00Z','onboarding_completed':True,'is_activated':True}
     elif table=='active_user_sessions':data=None
     elif table=='question_training_responses' and route.request.method=='POST':writes.append(route.request.post_data_json);data=[]
     elif table=='curated_question_catalog':data=questions if int(params.get('offset',['0'])[0])==0 else []
     elif '/rpc/' in url:data=0
     else:data=[]
     await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
    await context.route('**/*.supabase.co/**',backend)
    page=await context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    await page.goto('http://localhost:8080/dashboard/profile',wait_until='domcontentloaded')
    await page.locator('.app-shell').wait_for(timeout=60000)
    await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
    # Exercise the actual router link; the sidebar can be collapsed on mobile.
    await page.locator('a[href="/dashboard/question-trainer"]').first.evaluate('(element)=>element.click()')
    await page.locator('#trainer-setup').wait_for(timeout=60000)
    setup_y=await position(page,'trainer-setup')
    assert await page.locator('#trainer-setup .trainer-context').get_by_text('Língua Portuguesa',exact=True).count()==1
    assert await page.locator('#trainer-question').count()==0
    url='http://localhost:8080/dashboard/question-trainer?subject='+quote('Língua Portuguesa')+'&limit=all&fresh=fixture'
    await page.goto(url,wait_until='domcontentloaded')
    await page.get_by_role('button',name='Começar sessão',exact=True).wait_for()
    await position(page,'trainer-setup')
    await expect(page.get_by_role('button',name='Começar sessão',exact=True)).to_be_enabled()
    await page.get_by_role('button',name='Começar sessão',exact=True).click()
    question_y=await position(page,'trainer-question')
    banner=page.locator('#trainer-question .trainer-context')
    await expect(banner).to_contain_text('Concordância verbal')
    await expect(banner).to_contain_text('Língua Portuguesa')
    await page.locator('.trainer-verdict').first.click()
    await page.get_by_role('button',name='Confirmar resposta',exact=False).click()
    await page.get_by_role('button',name='Próxima questão',exact=False).first.click()
    next_y=await position(page,'trainer-question')
    await expect(page.locator('#trainer-question .trainer-context')).to_contain_text('Crase')
    assert len(writes)==1
    assert await page.locator('#trainer-question').evaluate('(e)=>e.scrollWidth<=e.clientWidth')
    await page.locator('#trainer-question .trainer-context').screenshot(path=f'/tmp/trainer-context-{theme}-{width}.png')
    # Automatic-start links focus the question directly rather than the setup header.
    await page.goto(url+'&go=%221%22',wait_until='domcontentloaded')
    await page.locator('#trainer-question').wait_for(timeout=60000)
    auto_y=await position(page,'trainer-question')
    assert not errors,errors
    results.append({'width':width,'theme':theme,'setup_y':setup_y,'question_y':question_y,'next_y':next_y,'auto_start_y':auto_y,'topic_updates':True})
    await context.close()
  print(json.dumps({'cases':results,'browser_errors':[]}));await browser.close()
asyncio.run(main())
