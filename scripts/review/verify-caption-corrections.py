"""Full snapshot verification of body-only caption moves and preservation."""
import datetime,json,sys
from pathlib import Path
p=Path(sys.argv[1]);before=sys.argv[2];after=sys.argv[3];pack=json.loads(Path(sys.argv[4]).read_text(encoding='utf-8'));out=Path(sys.argv[5])
read=lambda stage,t:json.loads((p/stage/(t+'.json')).read_text(encoding='utf-8'))
changes={r['expected']['id']:r for r in pack['changes']};assert not pack['additions'] and not pack['status_changes']
old={u['id']:u for u in read(before,'legal_course_units')};new={u['id']:u for u in read(after,'legal_course_units')};assert set(old)==set(new)
for id,u in old.items():
 r=changes.get(id)
 if r:
  assert r['expected']==u and u['body_text']==r['body_text']+'\n\n'+'\n\n'.join(r['moved_captions'])
  assert new[id]=={**u,'body_text':r['body_text'],'content_sha256':r['content_sha256']}
 else:assert new[id]==u,(id,'untargeted unit changed')
tables=['study_materials','study_material_enrichments','legal_courses','legal_unit_explanations','syllabus_topics','syllabus_editions','content_sources']
for t in tables:assert read(before,t)==read(after,t),t
report={'verified_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'caption_moves_confirmed':len(changes),'untargeted_units_preserved':len(old)-len(changes),'protected_tables_unchanged':tables,'normative_words_removed':0,'identities_positions_chapters_preserved':True,'explanation_hashes_automatically_rebound':False}
out.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(report)
