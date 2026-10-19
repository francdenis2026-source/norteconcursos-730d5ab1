import test from 'node:test';
import assert from 'node:assert/strict';
import { validStudyPresence, studyPresenceLabel } from '../src/lib/studyPresence.ts';

test('presence accepts a fresh aggregate including a genuine zero', () => {
 const now=Date.parse('2026-10-19T05:00:00Z');
 for(const count of [0,1,1200]){
  const data={studying_now:count,as_of:new Date(now-20_000).toISOString(),window_seconds:90};
  assert.deepEqual(validStudyPresence(data,now),data);
 }
});
test('invalid, old and future aggregates are not presented as online users', () => {
 const now=Date.parse('2026-10-19T05:00:00Z'),base={studying_now:10,as_of:new Date(now).toISOString(),window_seconds:90};
 for(const data of [null,{},10,{...base,studying_now:-1},{...base,studying_now:1.5},{...base,studying_now:'10'},{...base,studying_now:NaN},{...base,as_of:'invalid'},{...base,as_of:new Date(now-121_000).toISOString()},{...base,as_of:new Date(now+121_000).toISOString()},{...base,window_seconds:600}])assert.equal(validStudyPresence(data,now),null);
});
test('accessible descriptions use correct singular and full counts',()=>{
 assert.equal(studyPresenceLabel(0),'0 pessoas estudando agora');
 assert.equal(studyPresenceLabel(1),'1 pessoa estudando agora');
 assert.equal(studyPresenceLabel(1200),'1.200 pessoas estudando agora');
});
