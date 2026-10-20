"""Responsive homepage smoke check; Supabase is mocked and no student data is changed."""
import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 Path("outputs/qa").mkdir(parents=True,exist_ok=True)
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  c=await b.new_context(reduced_motion='reduce')
  await c.route('**/*.supabase.co/**',lambda r:r.fulfill(status=200,content_type='application/json',body='[]'))
  page=await c.new_page(); results=[]
  for theme in ['light','dark']:
   for w in [320,390,768,1024,1440]:
    await page.set_viewport_size({'width':w,'height':950})
    await page.goto('http://localhost:8080/',wait_until='domcontentloaded')
    await page.evaluate('(dark)=>document.documentElement.classList.toggle("dark",dark)',theme=='dark')
    await page.locator('#home-title').wait_for()
    await page.wait_for_timeout(350)
    await page.wait_for_function('document.querySelector(".home-hero__image").naturalWidth>0')
    assert await page.locator('.home-hero__image').get_attribute('src')=='/media/hero/hero-norte-impacto.webp'
    assert 'carreiras-background.webp' in await page.locator('.home').evaluate('e=>getComputedStyle(e).backgroundImage')
    assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),f'overflow {w}'
    assert await page.locator('.home-hero').evaluate('e=>e.offsetHeight')<550
    assert await page.locator('.home-interstitial').count()==0
    portrait=page.locator('.home-final__image')
    assert await portrait.get_attribute('src')=='/media/hero/lineup-carreiras-ajustada.webp'
    if w<=1100:
     assert await portrait.evaluate('e=>getComputedStyle(e).position')=='relative'
    else:
     assert await portrait.evaluate('e=>getComputedStyle(e).position')=='absolute'
    accents=await page.locator('.home-platform, .home-method, .home-careers').evaluate_all('els=>els.map(e=>getComputedStyle(e).getPropertyValue("--section-color").trim())')
    assert len(set(accents))==2, 'Sections must share the coordinated blue/teal accents in both themes'
    assert await page.locator('.home-core-tool p').first.evaluate('e=>parseFloat(getComputedStyle(e).fontSize)')>=14
    assert 'blur' in await page.locator('.home-core-tools').evaluate('e=>getComputedStyle(e).backdropFilter')
    if w<=1000:
     assert await page.locator('.home-section-top').evaluate('e=>getComputedStyle(e).gridTemplateColumns.split(" ").length')==1
    # Compare actual text colors with the shared reading surface, including CSS Color 4.
    ratios=await page.evaluate("""()=>{
     const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const c=canvas.getContext('2d',{willReadFrequently:true});
     const rgb=v=>{c.clearRect(0,0,1,1);c.fillStyle=v;c.fillRect(0,0,1,1);return [...c.getImageData(0,0,1,1).data].slice(0,3)};
     const lum=v=>rgb(v).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
     const home=document.querySelector('.home');const bg=lum(getComputedStyle(home).getPropertyValue('--card').trim());
     return ['.home-core-tool p','.home-section-intro','.home-core-tool h3','.home-platform .home-heading h2 em'].map(s=>{const fg=lum(getComputedStyle(document.querySelector(s)).color);return {selector:s,ratio:(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05)}});
    }""")
    assert all(r['ratio']>=4.5 for r in ratios),ratios
    await page.evaluate('async()=>{for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}window.scrollTo(0,0)}')
    await page.locator('.home img').evaluate_all('imgs=>imgs.forEach(i=>i.loading="eager")')
    await page.wait_for_function('Array.from(document.querySelectorAll(".home img")).every(i=>i.complete && i.naturalWidth>0)',timeout=20000)
    await page.screenshot(path=f'outputs/qa/remodel-{theme}-{w}.png',full_page=True)
    results.append({'theme':theme,'width':w,'height':await page.locator('.home').evaluate('e=>e.offsetHeight'),'footer':await page.locator('.home-footer').evaluate('e=>e.offsetHeight'),'contrast_on_card':ratios})
  print(json.dumps(results))
  await page.set_viewport_size({'width':390,'height':844})
  await page.get_by_role('button',name='Abrir menu',exact=True).click()
  await page.get_by_role('navigation',name='Navegação móvel').wait_for(state='visible')
  await page.get_by_role('button',name='Fechar menu',exact=True).click()
  await page.locator('#como').scroll_into_view_if_needed()
  print('PASS responsive layout, themes, image loads, mobile menu')
  await b.close()
asyncio.run(main())
