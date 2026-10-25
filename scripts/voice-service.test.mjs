import test from 'node:test';
import assert from 'node:assert/strict';
import {voiceServiceConfig, generateVoiceAudio} from '../src/lib/voiceService.ts';

test('default service uses Brazilian Kokoro and WAV; existing custom providers retain overrides',()=>{
 const config=voiceServiceConfig({});
 assert.equal(config.model,'kokoro');assert.equal(config.voice,'pf_dora');assert.equal(config.format,'wav');
 const custom=voiceServiceConfig({VOICESTUDIO_API_URL:'https://example.invalid/',VOICESTUDIO_TTS_MODEL:'omnivoice'});
 assert.equal(custom.url,'https://example.invalid');assert.equal(custom.format,'mp3');assert.equal(custom.voice,'default');
});
test('synthesis sends Brazilian voice and returns playable audio privately',async()=>{
 const config=voiceServiceConfig({});let payload;
 const response=await generateVoiceAudio(' Questão de português. ',config,async(url,init)=>{
  assert.equal(url,config.url+'/v1/audio/speech');payload=JSON.parse(init.body);
  return new Response('RIFF-test',{headers:{'Content-Type':'audio/wav'}});
 });
 assert.equal(payload.voice,'pf_dora');assert.equal(payload.language,'pt-br');assert.equal(payload.response_format,'wav');assert.equal(payload.input,'Questão de português.');
 assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'private, no-store');assert.equal(await response.text(),'RIFF-test');
});
test('invalid text never calls the provider',async()=>{
 for(const text of ['', ' ', 'a'.repeat(4097)]){
  const response=await generateVoiceAudio(text,voiceServiceConfig({}),async()=>{throw new Error('must not run')});assert.equal(response.status,400);
 }
});
test('busy provider, failed network, non-audio, empty audio and broken body are handled',async()=>{
 for(const [fetcher,status] of [
  [async()=>new Response('{}',{status:503}),503],
  [async()=>{throw new Error('offline')},503],
  [async()=>new Response('{}',{headers:{'Content-Type':'application/json'}}),502],
  [async()=>new Response('',{headers:{'Content-Type':'audio/wav'}}),502],
  [async()=>({ok:true,headers:new Headers({'Content-Type':'audio/wav'}),arrayBuffer:async()=>{throw new Error('broken body')}}),503]
 ])assert.equal((await generateVoiceAudio('Teste',voiceServiceConfig({}),fetcher)).status,status);
});

test('job proxy validates opaque IDs and uses short polling requests',async()=>{
 const {voiceJobRequest}=await import('../src/lib/voiceService.ts');
 const id='a'.repeat(32);let calls=0;
 const fetcher=async(url,init)=>{calls++;assert.equal(init.method,'POST');assert.equal(url,'https://norte-kokoro.onrender.com/v1/audio/jobs');return Response.json({job_id:id,status:'pending',progress:12});};
 const result=await voiceJobRequest('start','Texto', '',voiceServiceConfig({}),fetcher);
 assert.equal(result.status,200);assert.equal((await result.json()).progress,12);
 assert.equal((await voiceJobRequest('audio','', '../invalid',voiceServiceConfig({}),fetcher)).status,400);
 assert.equal(calls,1);
});

test('browser polls job progress and fetches completed audio',async(t)=>{
 const {requestQuestionAudio}=await import('../src/lib/requestQuestionAudio.ts');
 const id='b'.repeat(32),actions=[],progress=[];
 t.mock.method(globalThis,'fetch',async(_url,init)=>{
  const body=JSON.parse(init.body);actions.push(body.action);
  if(body.action==='start')return Response.json({job_id:id,status:'pending',progress:10});
  if(body.action==='status')return Response.json({job_id:id,status:'ready',progress:100});
  return new Response('RIFF-audio',{headers:{'Content-Type':'audio/wav'}});
 });
 const result=await requestQuestionAudio('Texto',new AbortController().signal,value=>progress.push(value));
 assert.deepEqual(actions,['start','status','audio']);assert.deepEqual(progress,[10,100]);assert.equal(await result.text(),'RIFF-audio');
});

test('changing question aborts polling without requesting stale audio',async(t)=>{
 const {requestQuestionAudio}=await import('../src/lib/requestQuestionAudio.ts');
 const controller=new AbortController();let calls=0;
 t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({job_id:'c'.repeat(32),status:'pending',progress:0});});
 await assert.rejects(requestQuestionAudio('Texto',controller.signal,()=>controller.abort()),{name:'AbortError'});
 assert.equal(calls,1);
});
