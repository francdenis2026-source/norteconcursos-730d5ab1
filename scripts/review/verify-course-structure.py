"""Verify scoped chapter/rubric changes and preserve all other records."""
import datetime,json,sys
from pathlib import Path
p=Path(sys.argv[1]);before=sys.argv[2];after=sys.argv[3];tp=json.loads(Path(sys.argv[4]).read_text(encoding='utf8'));cp=json.loads(Path(sys.argv[5]).read_text(encoding='utf8'));out=Path(sys.argv[6]);read=lambda stage,t:json.loads((p/stage/(t+'.json')).read_text(encoding='utf8'))
text={r['expected']['id']:r for r in tp['changes']};chap={r['expected']['id']:r for r in cp['units']};old={u['id']:u for u in read(before,'legal_course_units')};new={u['id']:u for u in read(after,'legal_course_units')};assert set(old)==set(new)
for id,u in old.items():
 expected={**u}
 if id in text:
  r=text[id];assert r['expected']==u and u['body_text']==r['body_text']+'\n\n'+'\n\n'.join(r['moved_captions']);expected.update(body_text=r['body_text'],content_sha256=r['content_sha256'])
 if id in chap:assert chap[id]['expected']==u;expected['chapter']=chap[id]['chapter']
 assert new[id]==expected,(id,'unexpected unit mutation')
cid=cp['law']['expected']['id'];oc={c['id']:c for c in read(before,'legal_courses')};nc={c['id']:c for c in read(after,'legal_courses')};assert set(oc)==set(nc);counts={}
for u in sorted([u for u in new.values() if u['course_id']==cid and u['content_status']=='current'],key=lambda u:(u['position'],u['unit_key'])):counts[u['chapter']]=counts.get(u['chapter'],0)+1
for id,c in oc.items():
 expected={**c}
 if id==cid:expected['overview']={**c['overview'],'chapters':[{'title':k,'count':v} for k,v in counts.items()]}
 assert nc[id]==expected,(id,'unexpected course mutation')
protected=['study_materials','study_material_enrichments','legal_unit_explanations','syllabus_topics','syllabus_editions','content_sources']
for t in protected:assert read(before,t)==read(after,t),t
report={'verified_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'chapter_assignments_confirmed':len(chap),'caption_moves_confirmed':len(text),'untargeted_units_preserved':len(old)-len(chap),'protected_tables_unchanged':protected,'official_groups':len(counts),'normative_words_removed':0,'identities_positions_statuses_preserved':True,'explanation_hashes_automatically_rebound':False}
out.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8');print(report)
