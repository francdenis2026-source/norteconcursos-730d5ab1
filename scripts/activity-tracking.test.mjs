import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
test('leaving one study component does not disable shared activity tracking',()=>{
 const module={exports:{}},added=[],removed=[];let monotonic=0,wall=1000;const storage=new Map();
 const code=ts.transpileModule(readFileSync('src/lib/activity.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 vm.runInNewContext(code,{module,exports:module.exports,require:()=>({platformNow:()=>wall}),performance:{now:()=>monotonic},Date,localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},window:{addEventListener:(e)=>added.push(e),removeEventListener:(e)=>removed.push(e),setInterval:()=>1,clearInterval:()=>{}}});
 const a=module.exports,first=a.startActivityTracking(),second=a.startActivityTracking();assert.equal(added.length,9);
 first();assert.equal(removed.length,0);monotonic=121000;wall=122000;assert.equal(a.idleSeconds(),121);
 second();second();assert.equal(removed.length,9);
});

test('media playing counts as activity so watching or listening never logs the user out',()=>{
 const module={exports:{}};let monotonic=0,wall=1000,playing=false;const storage=new Map();
 const code=ts.transpileModule(readFileSync('src/lib/activity.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const media=[{get paused(){return !playing},ended:false,readyState:4}];
 const document={querySelectorAll:(s)=>s==='video, audio'?media:[]};
 vm.runInNewContext(code,{module,exports:module.exports,require:()=>({platformNow:()=>wall}),performance:{now:()=>monotonic},Date,document,localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},window:{}});
 const a=module.exports;monotonic=600000;wall=601000;
 assert.ok(a.idleSeconds()>=300);
 playing=true;assert.equal(a.idleSeconds(),0);
 playing=false;monotonic+=1000;wall+=1000;assert.ok(a.idleSeconds()<=2);
});
