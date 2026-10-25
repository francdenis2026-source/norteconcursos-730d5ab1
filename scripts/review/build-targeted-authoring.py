"""Package an explicitly authored partial review, with fresh source and complete old rows."""
import datetime,hashlib,json,sys
from pathlib import Path
p=Path(sys.argv[1]);authored=json.loads(Path(sys.argv[2]).read_text(encoding='utf-8'));out=Path(sys.argv[3]);stage=sys.argv[4] if len(sys.argv)>4 else 'before'
read=lambda t:json.loads((p/stage/(t+'.json')).read_text(encoding='utf-8'))
c=next(c for c in read('legal_courses') if c['slug']==authored['course_slug'] and c['status']=='active');t=next(t for t in read('syllabus_topics') if t['id']==c['syllabus_topic_id'] and t['content_status']=='current');assert any(e['id']==t['edition_id'] and e['status']=='active' for e in read('syllabus_editions'))
us={u['unit_key']:u for u in read('legal_course_units') if u['course_id']==c['id'] and u['content_status']=='current'};es={e['unit_id']:e for e in read('legal_unit_explanations')}
audit=next(r for r in json.loads((p/'source-audit-fixed.json').read_text(encoding='utf-8'))['rows'] if r['slug']==c['slug']);assert not audit['text_differences'] and not audit['missing_articles'] and not audit['unexpected_current']
ev=next(e for e in json.loads((p/'source-index-verified.json').read_text(encoding='utf-8')) if e['slug']==c['slug']);assert hashlib.sha256((p/'sources'/(c['slug']+'.html')).read_bytes()).hexdigest()==ev['sha256']
rows=[]
for key,data in authored['units'].items():
 u=us[key];assert 'Variação:' in data['exemplo'] and all('?' in q and q.split('?',1)[1].strip() for q in data['prova'])
 rows.append({'course_slug':c['slug'],'course_id':c['id'],'syllabus_topic_id':t['id'],'edition_id':t['edition_id'],'unit_key':key,'unit_id':u['id'],'content_sha256':u['content_sha256'],**data,'expected':es[u['id']]})
law={'slug':c['slug'],'title':c['title'],'units':len(rows),'scope_type':'targeted_correction','course_current_units':len(us),'target_unit_keys':[r['unit_key'] for r in rows],'source_url':c['source_url'],'source_sha256':ev['sha256'],'source_checked_at':ev['checked_at']}
out.write_text(json.dumps({'version':'2026-10-11-'+c['slug']+'-targeted','checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Revisão limitada aos artigos explicitamente listados, sem certificar os outros dispositivos.','laws':[law],'units':rows},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(rows),'explicit reviews packaged')
