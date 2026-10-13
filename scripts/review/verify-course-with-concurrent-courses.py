"""Strict readback for the selected course; report concurrent edits outside it.
Does not replace importer preflight/CAS or silently assert unchanged global data.
"""
import json,sys,datetime,hashlib,re
from pathlib import Path
p=Path(sys.argv[1]);baseline=sys.argv[2];after=sys.argv[3];pack=json.loads(Path(sys.argv[4]).read_text());dest=Path(sys.argv[5]);read=lambda stage,t:json.loads((p/stage/(t+'.json')).read_text())
cs=read(after,'legal_courses');cp=next(c for c in cs if c['slug']==sys.argv[6]);old_units={u['id']:u for u in read(baseline,'legal_course_units')};new_units={u['id']:u for u in read(after,'legal_course_units')};old={e['unit_id']:e for e in read(baseline,'legal_unit_explanations')};new={e['unit_id']:e for e in read(after,'legal_unit_explanations')};targets={r['unit_id']:r for r in pack['units']};assert len(targets)==len(pack['units']);fields=['unit_id','content_sha256','simples','pontos','atencao','exemplo','prova','termos','remissoes']
for id,r in targets.items():
 assert r['course_slug']==sys.argv[6] and new_units[id]['course_id']==cp['id']
 e=new[id];assert e['status']=='published' and e['reviewed_by'] and e['reviewed_at'];assert old[id]==r['expected']
 assert all(e[f]==r[f] for f in fields),(id,'authored mismatch')
 assert e['content_sha256']==new_units[id]['content_sha256']
 assert hashlib.sha256(new_units[id]['body_text'].encode()).hexdigest()==e['content_sha256'],(id,'body hash mismatch')
 assert datetime.datetime.fromisoformat(e['reviewed_at'].replace('Z','+00:00'))>=datetime.datetime.fromisoformat(e['updated_at'].replace('Z','+00:00'))-datetime.timedelta(seconds=1),(id,'stale approval')
for id,u in old_units.items():
 if u['course_id']==cp['id']:assert new_units.get(id)==u,(id,'Target course unit altered')
assert {id for id,u in old_units.items() if u['course_id']==cp['id']}=={id for id,u in new_units.items() if u['course_id']==cp['id']},'Target course unit set altered'
assert set(old).issubset(new),'Explanation deleted';assert set(old_units).issubset(new_units),'Unit deleted'
concurrent=[];unchanged=0;cp_unchanged=0
for id,e in old.items():
 if id in targets:continue
 u=old_units[id]
 if new[id]!=e:
  assert u['course_id']!=cp['id'],(id,'Non-target Target course explanation altered')
  concurrent.append(dict(table='legal_unit_explanations',unit_id=id,course_id=u['course_id'],unit_key=u['unit_key'],fields=[f for f in e if e[f]!=new[id].get(f)],before_sha256=hashlib.sha256(json.dumps(e,sort_keys=True).encode()).hexdigest(),after_sha256=hashlib.sha256(json.dumps(new[id],sort_keys=True).encode()).hexdigest()))
 else:
  unchanged+=1
  if u['course_id']==cp['id']:cp_unchanged+=1
for id,u in old_units.items():
 if new_units[id]!=u:
  assert u['course_id']!=cp['id'],(id,'Target course altered')
  concurrent.append(dict(table='legal_course_units',unit_id=id,course_id=u['course_id'],unit_key=u['unit_key'],fields=[f for f in u if u[f]!=new_units[id].get(f)],before_sha256=hashlib.sha256(json.dumps(u,sort_keys=True).encode()).hexdigest(),after_sha256=hashlib.sha256(json.dumps(new_units[id],sort_keys=True).encode()).hexdigest()))
protected=['study_materials','study_material_enrichments','legal_courses','syllabus_topics','syllabus_editions','content_sources']
source_repair=None
if len(sys.argv)>7:
 source_repair=json.loads(Path(sys.argv[7]).read_text())
 assert source_repair['table']=='syllabus_editions' and source_repair['changed_fields']==['source_id']
 prior=source_repair['expected'];applied=source_repair['applied']
 assert prior['id']==applied['id'] and all(prior[k]==applied[k] for k in prior if k!='source_id')
 assert next(e for e in read(baseline,'syllabus_editions') if e['id']==prior['id'])==prior
 assert next(e for e in read(after,'syllabus_editions') if e['id']==prior['id'])==applied
 registered=next(s for s in read(after,'content_sources') if s['id']==applied['source_id'])
 assert registered==source_repair['source'] and registered['is_official'] and registered['source_type']=='edital' and registered['status']=='vigente'
 assert not re.search(r'\b(caderno|prova objetiva|gabarito)\b',registered.get('title',''),re.I)
 assert next(t for t in read(after,'syllabus_topics') if t['id']==cp['syllabus_topic_id'])['edition_id']==prior['id']
for t in protected:
 expected_table=read(baseline,t)
 if t=='syllabus_editions' and source_repair:expected_table=[source_repair['applied'] if row['id']==source_repair['expected']['id'] else row for row in expected_table]
 assert expected_table==read(after,t),t
for id in set(new)-set(old):
 assert new_units[id]['course_id']!=cp['id'],'Target course explanation unexpectedly added'
 concurrent.append(dict(table='legal_unit_explanations',unit_id=id,course_id=new_units[id]['course_id'],unit_key=new_units[id]['unit_key'],added=True))
for id in set(new_units)-set(old_units):
 assert new_units[id]['course_id']!=cp['id'],'Target course unit unexpectedly added'
 concurrent.append(dict(table='legal_course_units',unit_id=id,course_id=new_units[id]['course_id'],unit_key=new_units[id]['unit_key'],added=True))
out=dict(verified_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),authored_explanations_confirmed=len(targets),untargeted_explanations_preserved=unchanged,untargeted_course_explanations_preserved=cp_unchanged,prior_revisions_retained_in_manifest=len(targets),timestamp_only_changes=[],protected_tables_unchanged=[t for t in protected if not(source_repair and t=='syllabus_editions')],authorized_syllabus_source_repair=source_repair,course_units_unchanged=True,concurrent_other_course_changes=concurrent,note='Selected course targets and non-targets checked strictly; outside changes recorded without overwriting them or declaring global immutability. Optional single edition source_id repair is checked against exact before/after rows and its registered official source; no broad protected-table exemption.')
dest.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print({k:v for k,v in out.items() if k not in ['concurrent_other_course_changes','protected_tables_unchanged','authorized_syllabus_source_repair']});print('Observed concurrent outside target course changes:',len(concurrent));print('Explicit syllabus source correction verified:',bool(source_repair))
