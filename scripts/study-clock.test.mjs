import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function fixture() {
 const storage=new Map(), sessions=new Map(), timers=new Map(), calls=[], rows=new Map();
 const state={now:1000,day:'2026-10-14',idle:0,fail:false};let id=0;
 const doc={visibilityState:'visible',addEventListener(){},removeEventListener(){}};
 const store=map=>({getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,String(v))});
 const rpc=(name,args)=>{
  if(name==='study_time_today')return Promise.resolve({data:[...rows.values()].filter(r=>r.day===state.day).reduce((n,r)=>n+r.seconds,0),error:null});
  calls.push({...args});
  if(state.fail&&args._seconds)return Promise.resolve({error:{message:'offline'}});
  const row=rows.get(args._id)||{day:state.day,seconds:0};row.seconds+=Math.min(120,args._seconds);rows.set(args._id,row);
  return Promise.resolve({error:null});
 };
 const deps={'@/integrations/supabase/client':{supabase:{rpc}},'@/lib/acreTime':{acreDateKey:()=>state.day},'@/lib/platformClock':{platformNow:()=>state.now},'@/lib/activity':{idleSeconds:()=>state.idle,IDLE_PAUSE_SECONDS:120}};
 const module={exports:{}};
 const code=ts.transpileModule(readFileSync('src/lib/studyClock.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 vm.runInNewContext(code,{module,exports:module.exports,require:n=>deps[n],localStorage:store(storage),sessionStorage:store(sessions),crypto:{randomUUID:()=>`session-${++id}`},document:doc,window:{setInterval:(fn,ms)=>{const key=++id;timers.set(key,{fn,ms});return key;},clearInterval:key=>timers.delete(key),addEventListener(){},removeEventListener(){}}});
 const clock=module.exports;
 return {clock,state,doc,calls,rows,storage,async tick(n=1){for(let i=0;i<n;i++){state.now+=1000;for(const t of [...timers.values()])if(t.ms===1000)t.fn();await Promise.resolve();}}};
}
test('daily active usage survives logout and login without counting idle or hidden tabs',async()=>{
 const f=fixture();f.clock.startStudyClock('student');await f.clock.flushStudyClock();await f.tick(10);
 f.state.idle=120;await f.tick(10);f.state.idle=0;f.doc.visibilityState='hidden';await f.tick(10);
 assert.equal(f.clock.getStudyToday(),10);await f.clock.flushStudyClock();f.clock.stopStudyClock();
 f.doc.visibilityState='visible';f.clock.startStudyClock('student');await f.clock.flushStudyClock();await f.tick(5);
 assert.equal(f.clock.getStudyToday(),15);await f.clock.flushStudyClock();assert.equal([...f.rows.values()].reduce((n,r)=>n+r.seconds,0),15);
});
test('failed sends remain queued and large backlogs are sent in chunks without server truncation',async()=>{
 const f=fixture();f.clock.startStudyClock('student');await f.clock.flushStudyClock();await f.tick(260);f.state.fail=true;await f.clock.flushStudyClock();
 assert.equal(JSON.parse(f.storage.get('norte_clock_v2:student')).unsent,260);
 f.state.fail=false;await f.clock.flushStudyClock();assert.equal(JSON.parse(f.storage.get('norte_clock_v2:student')).unsent,0);
 assert.equal([...f.rows.values()].reduce((n,r)=>n+r.seconds,0),260);
 assert.ok(f.calls.every(c=>c._seconds<=120));
});
test('Acre midnight rotates the session and keeps the previous day history',async()=>{
 const f=fixture();f.clock.startStudyClock('student');await f.clock.flushStudyClock();await f.tick(10);await f.clock.flushStudyClock();
 f.state.day='2026-10-15';await f.tick(3);await f.clock.flushStudyClock();assert.equal(f.clock.getStudyToday(),3);
 assert.equal([...f.rows.values()].filter(r=>r.day==='2026-10-14').reduce((n,r)=>n+r.seconds,0),10);
 assert.equal([...f.rows.values()].filter(r=>r.day==='2026-10-15').reduce((n,r)=>n+r.seconds,0),3);
});
