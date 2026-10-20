"""Visual fixtures for compact student identity and exam shortcut; all backend calls are mocked."""
import asyncio,json,runpy
from pathlib import Path
from urllib.parse import urlparse,parse_qs
from playwright.async_api import async_playwright
from PIL import Image
fixture=runpy.run_path(str(Path(__file__).with_name('brand-surfaces.py')),run_name='qa_fixture')
roles=['Delegado de Polícia','Agente de Polícia Judiciária','Papiloscopista Policial']
questions=[{'id':f'00000000-0000-4000-8000-00000000020{i}','subject':'Língua Portuguesa','tested_topic':'Concordância','question_text':'Julgue o item. O verbo concorda com o sujeito da oração.','official_answer':'C','review_note':'Certo. O verbo deve concordar em número e pessoa com o sujeito da oração.','content_status':'active','contest_name':'Polícia Civil do Estado do Paraná','exam_year':2026,'career_name':role,'exam_board':'FGV','item_number':1,'legal_basis':[],'legal_review_required':False,'context_review_required':False,'legal_audit_completed':True,'difficulty':'fácil'} for i,role in enumerate(roles)]
async def backend(route):
 if urlparse(route.request.url).path.split('/')[-1]=='official_exam_questions':
  offset=int(parse_qs(urlparse(route.request.url).query).get('offset',['0'])[0])
  await route.fulfill(status=200,content_type='application/json',body=json.dumps(questions[offset:offset+1000]))
 else:await fixture['backend'](route)
async def main():
 Path('outputs/qa').mkdir(parents=True,exist_ok=True)
 alpha=Image.open('public/media/hero/area-aluno-emblema.webp').getchannel('A')
 assert alpha.getextrema()==(0,255),'Emblem must have genuine transparency'
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  c=await b.new_context(reduced_motion='reduce')
  await c.add_init_script("localStorage.setItem('sb-gkwphadbveiyjcwiiizw-auth-token',"+json.dumps(json.dumps(fixture['session']))+");")
  await c.route('**/*.supabase.co/**',backend)
  await c.route_web_socket('**/realtime/v1/**',lambda ws:ws.close(code=1000))
  page=await c.new_page();out=[]
  for theme in ['light','dark']:
   for w in [320,390,768,1024,1440]:
    await page.set_viewport_size({'width':w,'height':950})
    await page.goto('http://localhost:8080/dashboard',wait_until='domcontentloaded')
    await page.locator('.student-hub__masthead').wait_for()
    await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
    hero=page.locator('.student-hub__masthead');img=hero.locator('img');await img.evaluate('e=>e.decode()');await page.evaluate('document.fonts.ready')
    assert await img.get_attribute('src')=='/media/hero/area-aluno-emblema.webp'
    assert await page.locator('.app-brand-background').count()==0
    assert await hero.locator('.student-hub__hero-visual').evaluate('e=>getComputedStyle(e).backgroundImage')=='none'
    assert await hero.evaluate('e=>e.scrollWidth<=e.clientWidth')
    hb=await hero.bounding_box();assert hb['height']<350,hb
    notice=page.locator('.pcpr-spot--notice');await notice.wait_for()
    assert await notice.locator('img').count()==0
    assert await notice.locator('details').get_attribute('open') is None
    nb=await notice.bounding_box();assert nb['height']<210,nb
    assert 'career=Agente' in await notice.get_by_role('link',name='Treinar Agente').get_attribute('href')
    await notice.locator('summary').click()
    assert await notice.locator('li').count()==3
    for item in await notice.locator('li').all():assert '1 de 100' in await item.inner_text()
    await notice.locator('summary').click()
    await hero.screenshot(path=f'outputs/qa/student-compact-{theme}-{w}.png')
    await notice.screenshot(path=f'outputs/qa/student-exam-notice-{theme}-{w}.png')
    out.append({'theme':theme,'width':w,'hero_height':round(hb['height']),'notice_height':round(nb['height'])})
  print(json.dumps(out));print('PASS transparent emblem, compact header and exam shortcut, role counts and trainer links')
  await c.close();await b.close()
asyncio.run(main())
