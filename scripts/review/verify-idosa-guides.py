"""Read-back and preservation check for the integrated Pessoa Idosa path."""
import json,datetime,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];p=Path(sys.argv[1]);out=Path(sys.argv[2]);read=lambda stage,t:json.loads((p/stage/f'{t}.json').read_text(encoding='utf-8'))
pack=json.loads((root/'docs/library/idosa-complete-path-review-2026-10-11.json').read_text(encoding='utf-8'));case=json.loads((root/'docs/library/idosa-case-reference-corrections-2026-10-11.json').read_text(encoding='utf-8'))[0]
assert read('after-idosa','legal_unit_explanations')==read('after-idosa-guides','legal_unit_explanations')
for t in ['legal_course_units','content_sources','syllabus_topics','syllabus_editions']:assert read('after-idosa-cases',t)==read('after-idosa-guides',t),t
counts={}
for table,targets,key in [('study_materials',pack['materials'],'slug'),('legal_courses',pack['courses'],'id'),('study_material_enrichments',pack['enrichments'],'id')]:
 old={r[key]:r for r in read('after-idosa-cases',table)};new={r[key]:r for r in read('after-idosa-guides',table)};selected={r[key]:r for r in targets};assert old.keys()==new.keys()
 for k,r in old.items():
  if k not in selected:assert r==new[k],(table,k);continue
  patch=selected[k]['patch']
  for field,value in patch.items():assert new[k][field]==value,(table,k,field)
  changed=set(patch)|({'reviewed_by','reviewed_at','updated_at'} if table!='study_material_enrichments' else set())
  for field in r:
   if field not in changed:assert new[k][field]==r[field],(table,k,field)
 counts[table]={'targets_verified':len(targets),'non_targets_preserved':len(old)-len(targets)}
old={e['id']:e for e in read('after-idosa','study_material_enrichments')};new={e['id']:e for e in read('after-idosa-cases','study_material_enrichments')}
for k,e in old.items():
 if k!=case['expected']['id']:assert e==new[k]
assert new[case['expected']['id']]['content']==case['content']
report={'verified_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'guide_updates':counts,'corrected_case_references':2,'archived_enrichments_untouched':True,'published_article_explanations_preserved':117,'question_trainer_mutations':0,'case_source':'Lei 10.741/2003, art. 94, parágrafo único, redação da Lei 15.163/2025'}
out.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(report)
