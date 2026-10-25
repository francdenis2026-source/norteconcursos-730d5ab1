import test from 'node:test';
import assert from 'node:assert/strict';
import {createSessionProfileLoader} from '../src/lib/sessionProfileLoader.ts';
import {fetchAllRows, isMissingQuestionSupport} from '../src/lib/catalog.ts';
const deferred=()=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no});return {promise,resolve,reject};};

test('all simultaneous profile consumers share the same request',async()=>{
 const request=deferred(),published=[];let reads=0;
 const loader=createSessionProfileLoader({identify:s=>s.id,load:()=>{reads++;return request.promise},publish:p=>published.push(p),change:()=>{},fail:assert.fail});
 const first=loader.run({id:'one'}),second=loader.run({id:'one'});
 assert.equal(first,second);await Promise.resolve();assert.equal(reads,1);
 request.resolve({id:'one',role:'user'});await first;assert.equal(published.length,1);
});

test('sign out invalidates a pending privileged profile immediately',async()=>{
 const request=deferred(),published=[],owners=[];
 const loader=createSessionProfileLoader({identify:s=>s.id,load:()=>request.promise,publish:p=>published.push(p),change:s=>owners.push(s?.id??null),fail:assert.fail});
 const pending=loader.run({id:'admin'});loader.select(null);
 request.resolve({id:'admin',role:'admin'});await pending;
 assert.deepEqual(owners,['admin',null]);assert.deepEqual(published,[]);
});

test('account switches cannot publish stale profiles or stale errors',async()=>{
 const a=deferred(),b=deferred(),published=[],errors=[];
 const loader=createSessionProfileLoader({identify:s=>s.id,load:s=>s.id==='a'?a.promise:b.promise,publish:p=>published.push(p),change:()=>{},fail:e=>errors.push(e)});
 const old=loader.run({id:'a'}),current=loader.run({id:'b'});
 b.resolve({id:'b',role:'user'});await current;a.reject(new Error('previous account'));await old;
 assert.deepEqual(published,[{id:'b',role:'user'}]);assert.deepEqual(errors,[]);
});

test('profile failures can retry and disposed providers do not receive completions',async()=>{
 let attempts=0;const errors=[],published=[];const final=deferred();
 const loader=createSessionProfileLoader({identify:s=>s.id,load:async()=>{if(!attempts++)throw new Error('network');return final.promise},publish:p=>published.push(p),change:()=>{},fail:e=>errors.push(e)});
 await loader.run({id:'one'});assert.equal(errors.length,1);
 const pending=loader.run({id:'one'});loader.dispose();final.resolve({id:'one'});await pending;
 assert.deepEqual(published,[]);
});

test('larger catalogue pages retain every record when the server caps responses',async()=>{
 const rows=Array.from({length:1203},(_,id)=>({id}));let calls=0;
 const result=await fetchAllRows(async(from,to)=>{calls++;return {data:rows.slice(from,Math.min(to+1,from+500)),error:null}},1000);
 assert.deepEqual(result,rows);assert.equal(calls,4);
});


test('network and cancelled requests do not trigger a second full catalogue download',()=>{
 assert.equal(isMissingQuestionSupport({code:'PGRST200'}),true);
 assert.equal(isMissingQuestionSupport(new TypeError('Network failure')),false);
 assert.equal(isMissingQuestionSupport({name:'CancelledError'}),false);
 assert.equal(isMissingQuestionSupport({code:'42501'}),false);
});
