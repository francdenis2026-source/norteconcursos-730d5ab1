"""Independent full read-back: exact authored content and preservation of non-targets."""
import datetime,json,sys
from pathlib import Path
folder=Path(sys.argv[1]);baseline=sys.argv[2];after=sys.argv[3];pack=json.loads(Path(sys.argv[4]).read_text(encoding='utf-8'));destination=Path(sys.argv[5])
read=lambda stage,table:json.loads((folder/stage/(table+'.json')).read_text(encoding='utf-8'))
fields=['unit_id','content_sha256','simples','pontos','atencao','exemplo','prova','termos','remissoes']
expected={r['unit_id']:r for r in pack['units']};old={e['unit_id']:e for e in read(baseline,'legal_unit_explanations')};new={e['unit_id']:e for e in read(after,'legal_unit_explanations')}
for id,row in expected.items():
    actual=new[id];assert actual['status']=='published' and actual['reviewed_by'] and actual['reviewed_at']
    for field in fields:assert actual[field]==row[field],(id,field)
    if 'expected' in row:assert old[id]==row['expected']
preserved=0;timestamp_only=[]
for id,row in old.items():
    if id not in expected:
        if new[id]!=row:
            assert '--allow-timestamp-only' in sys.argv[6:] and all(new[id][k]==v for k,v in row.items() if k!='updated_at'),(id,'untargeted changed')
            timestamp_only.append({'unit_id':id,'before_updated_at':row['updated_at'],'after_updated_at':new[id]['updated_at']})
        preserved+=1
assert set(old).issubset(new),'Deleted explanations'
protected=['study_materials','study_material_enrichments','legal_courses','legal_course_units','syllabus_topics','syllabus_editions','content_sources']
for table in protected:assert read(baseline,table)==read(after,table),table
courses=read(after,'legal_courses');units=read(after,'legal_course_units');coverage=[]
for course in courses:
    current=[u for u in units if u['course_id']==course['id'] and u['content_status']=='current']
    missing=[u['unit_key'] for u in current if u['id'] not in new or new[u['id']]['status']!='published' or new[u['id']]['content_sha256']!=u['content_sha256']]
    coverage.append({'slug':course['slug'],'total':len(current),'published':len(current)-len(missing),'missing':missing})
report={'verified_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'authored_explanations_confirmed':len(expected),'untargeted_explanations_preserved':preserved,'timestamp_only_changes':timestamp_only,'prior_revisions_retained_in_manifest':sum('expected' in r for r in pack['units']),'protected_tables_unchanged':protected,'fully_explained_paths':sum(not r['missing'] for r in coverage),'published_explanations':sum(r['published'] for r in coverage),'remaining_explanations':sum(len(r['missing']) for r in coverage),'coverage':coverage}
destination.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print({k:v for k,v in report.items() if k not in ['coverage','protected_tables_unchanged']})
