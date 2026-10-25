import test from 'node:test';
import assert from 'node:assert/strict';
import {collectSnapshotRows} from './snapshot-pages.mjs';
test('Concurrent insertion before a page cursor does not duplicate or omit existing rows',async()=>{
 const original=Array.from({length:250},(_,i)=>({id:String(i).padStart(4,'0')}));let dataset=[...original],calls=0;
 const actual=await collectSnapshotRows('id',async params=>{
  const cursor=params.get('id')?.slice(3);
  const page=dataset.filter(r=>!cursor||r.id>cursor).sort((a,b)=>a.id.localeCompare(b.id)).slice(0,200);
  if(++calls===1)dataset.push({id:'0000a'},{id:'0240a'});
  return page;
 });
 assert.equal(new Set(actual.map(r=>r.id)).size,actual.length);
 assert.deepEqual(actual.filter(r=>original.some(o=>o.id===r.id)),original);
 assert.ok(actual.some(r=>r.id==='0240a'));
});
test('Repeated or unordered cursors fail instead of producing a misleading snapshot',async()=>{
 await assert.rejects(collectSnapshotRows('unit_id',async()=>[{unit_id:'b'},{unit_id:'a'}]),/out of order/);
 await assert.rejects(collectSnapshotRows('id',async()=>[{id:'a'},{id:'a'}]),/duplicated/);
});
