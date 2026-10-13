"""Strict readback for the selected course; report concurrent edits outside it.
Does not replace importer preflight/CAS or silently assert unchanged global data.
"""
import json,sys,datetime,hashlib
from pathlib import Path
p=Path(sys.argv[1]);baseline=sys.argv[2];after=sys.argv[3];pack=json.loads(Path(sys.argv[4]).read_text());dest=Path(sys.argv[5]);read=lambda stage,t:json.loads((p/stage/(t+'.json')).read_text())
cs=read(after,'legal_courses');cp=next(c for c in cs if c['slug']==sys.argv[6]);old_units={u['id']:u for u in read(baseline,'legal_course_units')};new_units={u['id']:u for u in read(after,'legal_course_units')};old={e['unit_id']:e for e in read(baseline,'legal_unit_explanations')};new={e['unit_id']:e for e in read(after,'legal_unit_explanations')};targets={r['unit_id']:r for r in pack['units']};assert len(targets)==len(pack['units']);fields=['unit_id','content_sha256','simples','pontos','atencao','exemplo','prova','termos','remissoes']
for id,r in targets.items():
 assert r['course_slug']==sys.argv[6] and new_units[id]['course_id']==cp['id']
 e=new[id];assert e['status']=='published' and e['reviewed_by'] and e['reviewed_at'];assert old[id]==r['expected']
 assert all(e[f]==r[f] for f in fields),(id,'authored mismatch')
 assert e['content_sha256']==new_units[id]['content_sha256']
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
for t in protected:assert read(baseline,t)==read(after,t),t
for id in set(new)-set(old):
 assert new_units[id]['course_id']!=cp['id'],'Target course explanation unexpectedly added'
 concurrent.append(dict(table='legal_unit_explanations',unit_id=id,course_id=new_units[id]['course_id'],unit_key=new_units[id]['unit_key'],added=True))
for id in set(new_units)-set(old_units):
 assert new_units[id]['course_id']!=cp['id'],'Target course unit unexpectedly added'
 concurrent.append(dict(table='legal_course_units',unit_id=id,course_id=new_units[id]['course_id'],unit_key=new_units[id]['unit_key'],added=True))
out=dict(verified_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),authored_explanations_confirmed=len(targets),untargeted_explanations_preserved=unchanged,untargeted_course_explanations_preserved=cp_unchanged,prior_revisions_retained_in_manifest=len(targets),timestamp_only_changes=[],protected_tables_unchanged=protected,course_units_unchanged=True,concurrent_other_course_changes=concurrent,note='Selected course targets and non-targets checked strictly; outside changes recorded without overwriting them or declaring global immutability.')
dest.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print({k:v for k,v in out.items() if k not in ['concurrent_other_course_changes','protected_tables_unchanged']});print('Observed concurrent fora do Target course changes:',len(concurrent))
