import test from 'node:test';
import assert from 'node:assert/strict';
import { createStartupSequence } from '../src/lib/startupSequence.ts';

test('homepage reveals immediately after route hydration without waiting for an intro',()=>{
  let reveals=0;const stages=[];
  const s=createStartupSequence(true,()=>reveals++,stage=>stages.push(stage));
  assert.equal(s.prepareIntro(),false);
  assert.equal(s.showIntro(),false);
  assert.equal(reveals,0);
  s.routeReady('/');
  assert.equal(reveals,1);
  assert.deepEqual(stages,['ready']);
  s.settleIntro();s.settleIntro();s.routeReady('/');
  assert.equal(reveals,1);
});

test('route content remains covered until the router confirms hydration',()=>{
  let reveals=0;const s=createStartupSequence(true,()=>reveals++);
  assert.equal(reveals,0);
  s.settleIntro();
  assert.equal(reveals,0);
  s.routeReady('/');
  assert.equal(reveals,1);
});

test('direct login, dashboard and public routes reveal as soon as they are ready',()=>{
  for(const path of ['/','/auth','/dashboard','/dashboard/profile']){
    let reveals=0;const s=createStartupSequence(path==='/',()=>reveals++);
    s.routeReady(path);
    assert.equal(reveals,1,path);
    assert.equal(s.prepareIntro(),false);
    assert.equal(s.showIntro(),false);
    s.routeReady('/');
    assert.equal(reveals,1);
  }
});

test('watchdog and error recovery reveal once; a late intro cannot reopen the loader',()=>{
  let reveals=0;const stages=[];
  const s=createStartupSequence(true,()=>reveals++,stage=>stages.push(stage));
  s.forceReveal();
  assert.equal(reveals,1);
  assert.equal(s.showIntro(),false);
  s.settleIntro();
  s.routeReady('/');
  assert.equal(reveals,1);
  assert.deepEqual(stages,['ready']);
});

test('a skipped or unavailable intro has no effect on first paint',()=>{
  let reveals=0;const s=createStartupSequence(true,()=>reveals++);
  s.routeReady('/');
  assert.equal(reveals,1);
  s.settleIntro();
  assert.equal(reveals,1);
});
