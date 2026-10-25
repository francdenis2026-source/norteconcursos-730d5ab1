"""Verify scoped readback while explicitly recording concurrent other-course edits."""
import json,sys,datetime,hashlib
from pathlib import Path
root=Path(sys.argv[1]);before,after,packpath,out=sys.argv[2:6]
read=lambda stage,table:json.loads((root/stage/(table+'.json')).read_text(encoding='utf-8'))
pack=json.loads(Path(packpath).read_text(encoding='utf-8'));course=pack['laws'][0]['course_id'] if 'course_id' in pack['laws'][0] else pack['units'][0]['course_id']
oldus={r['id']:r for r in read(before,'legal_course_units')};newus={r['id']:r for r in read(after,'legal_course_units')}
cppids={i for i,u in oldus.items() if u['course_id']==course};assert cppids=={i for i,u in newus.items() if u['course_id']==course}
assert all(oldus[i]==newus[i] for i in cppids),'CPP structure changed during publication'
olde={r['unit_id']:r for r in read(before,'legal_unit_explanations')};newe={r['unit_id']:r for r in read(after,'legal_unit_explanations')}
targets={r['unit_id']:r for r in pack['units']};fields=('simples','pontos','atencao','exemplo','prova','termos','remissoes')
for i,r in targets.items():
 assert olde.get(i)==r.get('expected'),(i,'baseline differs from protected previous revision')
 e=newe[i];assert e['status']=='published' and e['reviewed_by'] and e['reviewed_at'],i
 assert e['content_sha256']==newus[i]['content_sha256']==r['content_sha256'],i
 assert hashlib.sha256(newus[i]['body_text'].encode()).hexdigest()==e['content_sha256'],i
 assert all(e[f]==r[f] for f in fields),i
 assert datetime.datetime.fromisoformat(e['reviewed_at'].replace('Z','+00:00')) >= datetime.datetime.fromisoformat(e['updated_at'].replace('Z','+00:00'))-datetime.timedelta(seconds=1),i
for i in cppids-targets.keys():assert olde.get(i)==newe.get(i),(i,'untargeted CPP explanation changed')
changes=[]
for table in ['study_materials','study_material_enrichments','legal_courses','legal_course_units','legal_unit_explanations','syllabus_topics','syllabus_editions','content_sources']:
 key='unit_id' if table=='legal_unit_explanations' else 'id';a={r[key]:r for r in read(before,table)};b={r[key]:r for r in read(after,table)}
 diffs=[i for i in a.keys()|b.keys() if a.get(i)!=b.get(i)]
 if table=='legal_unit_explanations':diffs=[i for i in diffs if i not in targets]
 if table=='legal_courses':assert a[course]==b[course]
 if diffs:changes.append({'table':table,'changed_ids':diffs,'origin':'Concurrent external edits observed; this importer writes only the listed CPP explanations.'})
result={'verified_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'course_slug':'codigo-processo-penal','published_units':len(targets),'target_keys':[r['unit_key'] for r in pack['units']],'all_authored_fields_match':True,'cpp_structure_preserved':True,'untargeted_cpp_explanations_preserved':len(cppids-targets.keys()),'concurrent_other_changes':changes}
Path(out).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print('Verified',len(targets),'CPP explanations;',len(changes),'tables with concurrent changes explicitly recorded')
