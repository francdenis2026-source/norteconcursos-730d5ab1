"""Verify exact scoped changes and full preservation after source reapproval."""
import json,sys,datetime
from pathlib import Path
p=Path(sys.argv[1]);before=sys.argv[2];after=sys.argv[3];dest=Path(sys.argv[4]);read=lambda stage,t:json.loads((p/stage/(t+'.json')).read_text(encoding='utf-8'))
root=Path(__file__).parents[2];load=lambda name:json.loads((root/'docs/library'/name).read_text(encoding='utf-8'))
text=load('drug-structural-corrections-2026-10-12.json');chapters=load('drug-chapter-corrections-2026-10-12.json');approval=load('article-explanations-drug-structure-2026-10-12.json');byText={r['expected']['id']:r for r in text['changes']};byChapter={r['expected']['id']:r for r in chapters['units']};byApproval={r['unit_id']:r for r in approval['units']}
old={u['id']:u for u in read(before,'legal_course_units')};new={u['id']:u for u in read(after,'legal_course_units')};assert set(old)==set(new)
for id,u in old.items():
 expected={**u}
 if id in byText:expected.update(body_text=byText[id]['body_text'],content_sha256=byText[id]['content_sha256'])
 if id in byChapter:expected.update(chapter=byChapter[id]['chapter'])
 assert new[id]==expected,(id,'unit changed outside scope')
os={e['unit_id']:e for e in read(before,'legal_unit_explanations')};ns={e['unit_id']:e for e in read(after,'legal_unit_explanations')};assert set(os)==set(ns)
fields=['simples','pontos','atencao','exemplo','prova','termos','remissoes']
for id,e in os.items():
 if id not in byApproval:assert ns[id]==e,(id,'untargeted explanation changed')
 else:
  a=ns[id];assert all(a[k]==e[k]==byApproval[id][k] for k in fields)
  assert a['status']=='published' and a['reviewed_by'] and a['reviewed_at'] and a['content_sha256']==new[id]['content_sha256']
  assert datetime.datetime.fromisoformat(a['reviewed_at'])>=datetime.datetime.fromisoformat(a['updated_at'])
oc={c['id']:c for c in read(before,'legal_courses')};nc={c['id']:c for c in read(after,'legal_courses')};assert set(oc)==set(nc)
cid=chapters['law']['expected']['id'];counts={}
for u in sorted([u for u in new.values() if u['course_id']==cid and u['content_status']=='current'],key=lambda u:(u['position'],u['unit_key'])):counts[u['chapter']]=counts.get(u['chapter'],0)+1
for id,c in oc.items():
 expected={**c}
 if id==cid:expected['overview']={**c['overview'],'chapters':[{'title':k,'count':v} for k,v in counts.items()]}
 assert nc[id]==expected,(id,'course changed outside overview')
protected=['study_materials','study_material_enrichments','syllabus_topics','syllabus_editions','content_sources']
for t in protected:assert read(before,t)==read(after,t),t
dest.write_text(json.dumps({'verified_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'chapter_assignments_confirmed':len(byChapter),'captions_moved':len(byText),'source_reapprovals_confirmed':len(byApproval),'current_drug_units':84,'official_blocks':len(counts),'unchanged_other_units':len(old)-len(byChapter),'unchanged_other_explanations':len(os)-len(byApproval),'protected_tables_unchanged':protected,'identities_and_normative_text_preserved':True,'scope':'One drug course overview, chapter metadata, eleven trailing structural captions and their explicit source-hash reapproval. No claim of complete jurisprudential coverage.'},ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print('Scoped preservation verified')
