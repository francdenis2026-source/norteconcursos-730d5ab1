import test from 'node:test';
import assert from 'node:assert/strict';
import {claimDocumentIntro} from '../src/lib/documentIntro.ts';
test('homepage document plays once; remount and return cannot replay',()=>{
 const document={dataset:{}};
 assert.equal(claimDocumentIntro(document,'https://norteconcursos.xyz/'),true);
 assert.equal(claimDocumentIntro(document,'https://norteconcursos.xyz/'),false);
});
test('first homepage visit after login or panel navigation is not a document opening',()=>{
 for(const path of ['/auth','/dashboard','/dashboard/profile']) {
 const document={dataset:{}};
 assert.equal(claimDocumentIntro(document,'https://norteconcursos.xyz'+path),false);
 assert.equal(claimDocumentIntro(document,'https://norteconcursos.xyz/'),false);
 }
});
test('a new or refreshed document can play; query and hash do not interfere',()=>{
 for(const url of ['https://norteconcursos.xyz/','https://norteconcursos.xyz/?source=app#inicio'])assert.equal(claimDocumentIntro({dataset:{}},url),true);
 assert.equal(claimDocumentIntro({dataset:{}},'invalid'),false);
});
