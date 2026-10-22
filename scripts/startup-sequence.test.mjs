import test from 'node:test';
import assert from 'node:assert/strict';
import { createStartupSequence } from '../src/lib/startupSequence.ts';

test('homepage remains covered from route hydration through the film, then reveals exactly once',()=>{
  let reveals=0;const stages=[];
  const s=createStartupSequence(true,()=>reveals++,stage=>stages.push(stage));
  s.routeReady('/');assert.equal(reveals,0);
  assert.equal(s.prepareIntro(),true);assert.equal(s.showIntro(),true);
  assert.equal(reveals,0);
  s.settleIntro();s.settleIntro();s.routeReady('/');
  assert.equal(reveals,1);assert.deepEqual(stages,['intro','ready']);
  assert.equal(s.prepareIntro(),false);assert.equal(s.showIntro(),false);
});
test('effect order cannot reveal unfinished route content',()=>{
  let reveals=0;const s=createStartupSequence(true,()=>reveals++);
  s.showIntro();s.settleIntro();assert.equal(reveals,0);
  s.routeReady('/');assert.equal(reveals,1);
});
test('skipped or failed film goes directly from the same loader to the homepage',()=>{
  let reveals=0;const stages=[];const s=createStartupSequence(true,()=>reveals++,v=>stages.push(v));
  s.settleIntro();s.routeReady('/');
  assert.equal(reveals,1);assert.deepEqual(stages,['ready']);assert.equal(s.showIntro(),false);
});
test('direct login or dashboard documents and later SPA visits never wait for a film',()=>{
  let reveals=0;const s=createStartupSequence(false,()=>reveals++);
  s.routeReady('/auth');assert.equal(reveals,1);
  s.routeReady('/');assert.equal(s.prepareIntro(),false);assert.equal(s.showIntro(),false);assert.equal(reveals,1);
});
test('navigation away, watchdog or error recovery prevents a late intro',()=>{
  for(const force of [false,true]){
    let reveals=0;const s=createStartupSequence(true,()=>reveals++);
    if(force)s.forceReveal();else s.routeReady('/auth');
    assert.equal(reveals,1);assert.equal(s.showIntro(),false);s.settleIntro();assert.equal(reveals,1);
  }
});
