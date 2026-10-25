"""Responsive daily challenge smoke test; all questions below are local QA fixtures."""
import asyncio, json
from playwright.async_api import async_playwright

ROWS = [{'id':str(i),'contest_name':'Polícia Federal','exam_year':2026,
 'career_name':'Agente de Polícia Federal','exam_board':'CEBRASPE','subject':'Matemática',
 'question_text':f'Na situação de número {i}, a soma de duas unidades com duas unidades resulta em quatro unidades.',
 'official_answer':'C','content_status':'active','legal_basis':[],
 'review_note':'A soma descrita no enunciado corresponde à adição de duas parcelas iguais a dois. O resultado dessa operação é quatro, de acordo com a definição da adição. Exemplo: dois livros e mais dois livros totalizam quatro livros.'} for i in range(10)]

async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for theme in ['light','dark']:
   context=await browser.new_context(color_scheme=theme, reduced_motion='reduce')
   async def backend(route):
    url=route.request.url
    data='2026-10-19' if 'get_current_acre_date' in url else ROWS if 'get_daily_guest_questions' in url else []
    await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
   await context.route('**/*.supabase.co/**',backend)
   for width in [320,390,768,1024,1440]:
    page=await context.new_page();await page.set_viewport_size({'width':width,'height':960})
    await page.goto('http://localhost:8080/desafio-diario',wait_until='networkidle')
    await page.get_by_role('button',name='Começar meu desafio').wait_for()
    await page.evaluate('document.fonts.ready')
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(theme,width,'intro overflow')
    await page.screenshot(path=f'/tmp/daily-{theme}-{width}.png',full_page=True)
    await page.get_by_role('button',name='Começar meu desafio').click()
    await page.get_by_role('button',name='Certo',exact=True).wait_for()
    await page.get_by_role('timer').wait_for()
    await page.get_by_role('region',name='Orientação de estudo').wait_for()
    assert await page.get_by_role('button',name='Confirmar resposta').is_disabled()
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(theme,width,'player overflow')
    chosen='Errado' if width in [320,768] else 'Certo'
    await page.get_by_role('button',name=chosen,exact=True).click()
    await page.get_by_role('button',name='Confirmar resposta').click()
    await page.get_by_role('heading',name='Você acertou' if chosen=='Certo' else 'Você errou',exact=True).wait_for()
    feedback=page.get_by_role('status',name='Correção da resposta')
    assert await feedback.locator('.answer-feedback__selected strong').inner_text()==chosen
    assert await feedback.locator('.answer-feedback__official strong').inner_text()=='Certo'
    await page.wait_for_timeout(150)
    bounds=await feedback.bounding_box();assert bounds['y']>=60 and bounds['y']+bounds['height']<=960,(width,bounds)
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    await page.screenshot(path=f'/tmp/daily-player-{theme}-{width}.png',full_page=True)
    # Reset only the local fixture context between widths.
    await page.evaluate('localStorage.clear()')
    await page.close()
    print(f'PASS {theme} {width}: intro, question, confirmation, explanation, no overflow',flush=True)
   page=await context.new_page();await page.set_viewport_size({'width':1440,'height':960})
   await page.goto('http://localhost:8080/desafio-diario',wait_until='networkidle')
   await page.get_by_role('button',name='Começar meu desafio').click()
   await page.get_by_role('button',name='Certo',exact=True).click()
   await page.get_by_role('button',name='Confirmar resposta').click()
   await page.get_by_role('heading',name='Você acertou',exact=True).wait_for()
   await page.reload(wait_until='networkidle')
   assert await page.locator('.daily-metrics strong').first.inner_text()=='09'
   await page.get_by_role('button',name='Começar meu desafio').click()
   for i in range(9):
    await page.get_by_role('button',name='Certo',exact=True).click()
    await page.get_by_role('button',name='Confirmar resposta').click()
    await page.get_by_role('heading',name='Você acertou',exact=True).wait_for()
    await page.get_by_role('button',name='Ver resultado' if i==8 else 'Próxima questão',exact=True).click()
   await page.get_by_role('heading',name='100%',exact=True).wait_for()
   await page.reload(wait_until='networkidle')
   await page.get_by_role('heading',name='Você já respondeu hoje.').wait_for()
   assert await page.get_by_role('button',name='Começar meu desafio').count()==0
   print(f'PASS {theme}: reload retains progress, 10 answers, result and daily cap',flush=True)
   await context.close()
  context=await browser.new_context(viewport={'width':1024,'height':1366})
  await context.route('**/*.supabase.co/**',backend)
  page=await context.new_page();await page.clock.install(time=__import__('datetime').datetime(2026,10,19,14,tzinfo=__import__('datetime').timezone.utc))
  await page.goto('http://localhost:8080/desafio-diario',wait_until='networkidle');await page.get_by_role('button',name='Começar meu desafio').click()
  timer=page.get_by_role('timer');await page.clock.run_for(2500)
  assert '00:02' in await timer.inner_text(),await timer.inner_text()
  await page.evaluate("window.testHidden=true;Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>window.testHidden?'hidden':'visible'});document.dispatchEvent(new Event('visibilitychange'))")
  frozen=await timer.locator('.question-stopwatch__time').inner_text();await page.clock.run_for(60000)
  assert frozen==await timer.locator('.question-stopwatch__time').inner_text()
  assert await timer.get_attribute('data-paused')=='true'
  await page.evaluate("window.testHidden=false;document.dispatchEvent(new Event('visibilitychange'));window.dispatchEvent(new MouseEvent('click'))")
  await page.clock.run_for(2000);assert frozen!=await timer.locator('.question-stopwatch__time').inner_text()
  await page.clock.run_for(125000);assert await timer.get_attribute('data-paused')=='true'
  await page.get_by_role('button',name='Certo',exact=True).click();await page.get_by_role('button',name='Confirmar resposta').click()
  await page.get_by_role('heading',name='Você acertou',exact=True).wait_for()
  frozen=await timer.locator('.question-stopwatch__time').inner_text();await page.clock.run_for(10000)
  assert frozen==await timer.locator('.question-stopwatch__time').inner_text()
  assert await timer.get_attribute('data-completed')=='true'
  await page.get_by_role('button',name='Próxima questão',exact=True).click()
  assert await timer.locator('.question-stopwatch__time').inner_text()=='00:00'
  await page.screenshot(path='/tmp/daily-tablet-portrait.png',full_page=True)
  print('PASS: timer advances, pauses hidden/idle, resumes, freezes after answer and resets per question; tablet portrait screenshot',flush=True)
  await context.close()
  await browser.close()
asyncio.run(main())
