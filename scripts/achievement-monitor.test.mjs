import test from 'node:test';
import assert from 'node:assert/strict';
import { createAchievementMonitor } from '../src/lib/achievementMonitor.ts';
const medal = id => ({id,code:id,name:id,description:'Meta',icon_url:''});
const deferred = () => {let resolve;const promise=new Promise(r=>resolve=r);return {promise,resolve}};

test('loading historical awards or changing their order never announces a new medal',async()=>{
 const notices=[],snapshots=[];let saved=[medal('old-a'),medal('old-b')];
 const m=createAchievementMonitor({award:async()=>[],load:async()=>saved,onSnapshot:a=>snapshots.push(a),onEarned:a=>notices.push(a)});
 await m.refresh();saved=[saved[1],saved[0],medal('historical-import')];await m.refresh();assert.equal(notices.length,0);assert.equal(snapshots.at(-1).length,3);
});
test('announces every confirmed new award once, regardless of collection order or duplicate RPC rows',async()=>{
 const notices=[];const a=medal('new-a'),b=medal('new-b');
 const m=createAchievementMonitor({award:async()=>[a,b,a],load:async()=>[b,medal('old'),a],onSnapshot:()=>{},onEarned:x=>notices.push(x.id)});
 await m.refresh();await m.refresh();assert.deepEqual(notices,['new-a','new-b']);
});
test('an unconfirmed award cannot show a success notification',async()=>{
 const notices=[];const a=medal('not-saved');let saved=[];
 const m=createAchievementMonitor({award:async()=>[a],load:async()=>saved,onSnapshot:()=>{},onEarned:x=>notices.push(x.id)});
 await m.refresh();assert.deepEqual(notices,[]);saved=[a];await m.refresh();assert.deepEqual(notices,['not-saved']);
});
test('a failed snapshot retains pending issued awards for confirmation on retry',async()=>{
 const a=medal('new');const notices=[];let first=true,fail=true;
 const m=createAchievementMonitor({award:async()=>{const rows=first?[a]:[];first=false;return rows},load:async()=>{if(fail)throw Error('offline');return[a]},onSnapshot:()=>{},onEarned:x=>notices.push(x.id)});
 await assert.rejects(m.refresh(),/offline/);assert.equal(notices.length,0);fail=false;await m.refresh();assert.deepEqual(notices,['new']);
});
test('polls share the in-flight request; cancellation prevents updates and announcements',async()=>{
 const wait=deferred();let calls=0;const notices=[],snapshots=[];
 const m=createAchievementMonitor({award:()=>{calls++;return wait.promise},load:async()=>[medal('new')],onSnapshot:x=>snapshots.push(x),onEarned:x=>notices.push(x)});
 const one=m.refresh(),two=m.refresh();assert.equal(one,two);assert.equal(calls,1);m.stop();wait.resolve([medal('new')]);await one;await m.refresh();assert.equal(calls,1);assert.deepEqual(notices,[]);assert.deepEqual(snapshots,[]);
});
test('a failed award request does not publish a new or empty snapshot',async()=>{
 const snapshots=[],notices=[];
 const m=createAchievementMonitor({award:async()=>{throw Error('server unavailable')},load:async()=>[],onSnapshot:x=>snapshots.push(x),onEarned:x=>notices.push(x)});
 await assert.rejects(m.refresh(),/server unavailable/);assert.deepEqual(snapshots,[]);assert.deepEqual(notices,[]);
});
