"""Run with Vite on localhost:5173 and Python Playwright/Chromium installed.
No real accounts or paid synthesis: browser audio and remote responses are mocked.
"""
import asyncio
from playwright.async_api import async_playwright

HTML = '''<html><head><script type="module">
import RefreshRuntime from '/@react-refresh';
RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;
window.__vite_plugin_react_preamble_installed__=true;
</script></head><body><div id="root"></div><script type="module">
import React from '/node_modules/.vite/deps/react.js';
import ReactDOM from '/node_modules/.vite/deps/react-dom_client.js';
import {QuestionAudioButton} from '/src/components/dashboard/QuestionAudioButton.tsx';
const root=ReactDOM.createRoot(document.getElementById('root'));
window.renderVoice=(text='Questão um.',naturalVoiceEnabled=true)=>root.render(React.createElement(QuestionAudioButton,{text,naturalVoiceEnabled}));
window.renderVoice();
</script></body></html>'''
MOCKS = '''() => {
window.audioLog=[]; window.utterances=[]; window.remoteStatus=200;
window.fetch=async (_url,options)=>{
 if(window.remoteStatus==='jobs') {
  const request=JSON.parse(options.body);
  if(request.action==='start') return Response.json({job_id:'d'.repeat(32),status:'pending',progress:0});
  if(request.action==='status') return Response.json({job_id:'d'.repeat(32),status:'ready',progress:100});
  return new Response('fake-audio',{headers:{'Content-Type':'audio/wav'}});
 }
 if(window.remoteStatus==='pending') return new Promise((_resolve,reject)=>options.signal.addEventListener('abort',()=>reject(new Error('aborted'))));
 if(window.remoteStatus==='network') throw new Error('offline');
 return new Response(window.remoteStatus===200?'fake-audio':'{}',{status:window.remoteStatus,headers:{'Content-Type':window.remoteStatus===200?'audio/mpeg':'application/json'}});
};
window.Audio=class {async play(){audioLog.push('play')} pause(){audioLog.push('pause')}};
window.SpeechSynthesisUtterance=class {constructor(text){this.text=text}};
Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{
 getVoices:()=>[{lang:'pt-BR'}],cancel:()=>audioLog.push('cancel'),
 speak:u=>{utterances.push(u);audioLog.push('speak')},pause:()=>audioLog.push('speech-pause'),resume:()=>audioLog.push('speech-resume')
}});
}'''

async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  page=await browser.new_page()
  page.on("pageerror",lambda e: print("PAGE ERROR",e,flush=True))
  await page.add_init_script("("+MOCKS+")()")
  await page.route('**/__voice-test',lambda route:route.fulfill(content_type='text/html',body=HTML))
  await page.goto('http://localhost:5173/__voice-test')
  button=page.get_by_role('button')
  await button.wait_for()
  await button.click();await page.wait_for_timeout(100)
  assert await page.evaluate('audioLog')==['play'],await page.evaluate('audioLog')
  assert await button.get_attribute('aria-label')=='Pausar leitura da questão'
  await button.click();await button.click()
  assert await page.evaluate('audioLog')==['play','pause','play']
  await page.evaluate("renderVoice('Questão dois.')");await page.wait_for_timeout(100)
  assert await page.evaluate('audioLog.at(-1)')=='pause'
  for status in [400,502,503,'network']:
   await page.evaluate('status=>{window.remoteStatus=status;renderVoice(`Questão ${status}`)}',status)
   await page.wait_for_timeout(100);await button.click();await page.wait_for_timeout(100)
   assert await page.evaluate('audioLog.at(-1)')=='speak'
   assert await page.get_by_role('status').inner_text()=='Usando a voz do aparelho; a voz natural está indisponível.'
   await button.click();assert await page.evaluate('audioLog.at(-1)')=='speech-pause'
   assert await button.get_attribute('aria-label')=='Ouvir questão'
   await button.click();assert await page.evaluate('audioLog.at(-1)')=='speech-resume'
   assert await button.get_attribute('aria-label')=='Pausar leitura da questão'
  await page.evaluate("remoteStatus='jobs';renderVoice('Questão gerada em segundo plano.')");await page.wait_for_timeout(100)
  await button.click();await page.get_by_text('Preparando áudio… 0%',exact=True).wait_for()
  await page.wait_for_timeout(2800)
  assert await button.get_attribute('aria-label')=='Pausar leitura da questão'
  print('PASS: background generation progress and playback.')
  await page.evaluate("remoteStatus='pending';renderVoice('Ouvir sem aguardar.')");await page.wait_for_timeout(100)
  await button.click()
  await page.get_by_role('button',name='Usar voz do aparelho agora',exact=True).click()
  await page.wait_for_timeout(100)
  assert await page.evaluate('utterances.at(-1).text')=='Ouvir sem aguardar.'
  assert await button.get_attribute('aria-label')=='Pausar leitura da questão'
  print('PASS: device voice can replace pending natural generation immediately.')
  await page.evaluate("remoteStatus='pending';renderVoice('Aguardando serviço.')");await page.wait_for_timeout(100)
  await button.click();await page.wait_for_timeout(100)
  count=await page.evaluate('utterances.length')
  await page.evaluate("renderVoice('Outra questão.',false)");await page.wait_for_timeout(100)
  assert await page.evaluate('utterances.length')==count
  await button.click();assert await page.evaluate('utterances.at(-1).text')=='Outra questão.'
  await page.evaluate('utterances.at(-1).onend()');await page.wait_for_timeout(100)
  assert await button.get_attribute('aria-label')=='Ouvir questão'
  print('PASS: remote audio starts, pause/resume, question cleanup, fallback on 400/502/503/network, speech pause/resume/end, stale request cancellation.')
  await browser.close()

asyncio.run(main())
