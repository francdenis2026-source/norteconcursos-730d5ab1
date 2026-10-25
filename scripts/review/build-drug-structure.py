"""Only move inspected structural captions; do not rewrite statute provisions."""
import json,hashlib,datetime,sys,importlib.util
from pathlib import Path
p=Path(sys.argv[1]);stage=sys.argv[2];out=Path(sys.argv[3]);read=lambda t:json.loads((p/stage/(t+'.json')).read_text(encoding='utf-8'))
s=importlib.util.spec_from_file_location('parser',Path(__file__).parents[1]/'build-legal-curriculum.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
c=next(c for c in read('legal_courses') if c['slug']=='drogas');ev=next(e for e in json.loads((p/'source-index-verified.json').read_text(encoding='utf-8')) if e['slug']=='drogas');raw=(p/'sources/drogas.html').read_bytes();assert hashlib.sha256(raw).hexdigest()==ev['sha256']
fresh={u['key']:u for u in m.parse_law(raw,'drogas',c['source_url']) if u['status']=='current'};old={u['unit_key']:u for u in read('legal_course_units') if u['course_id']==c['id'] and u['content_status']=='current'};assert set(fresh)==set(old) and len(fresh)==84
approved={'art-5','art-8-d','art-8-e','art-17','art-19','art-19-a','art-22','art-22-a','art-23-a','art-26','art-65'}
changes=[];chapters=[]
for k,u in old.items():
 f=fresh[k]
 if u['body_text']!=f['text']:
  assert k in approved and u['body_text'].startswith(f['text']+'\n\n'),k
  removed=u['body_text'][len(f['text']):].strip().split('\n\n')
  assert all(not any(marker in text for marker in ['Art.','§','I -','II -','Pena']) for text in removed),k
  changes.append({'course_slug':'drogas','expected':u,'body_text':f['text'],'content_sha256':f['sha256'],'moved_captions':removed})
 if u['chapter']!=f['chapter']:chapters.append({'unit_key':k,'expected':u,'chapter':f['chapter'],'content_sha256':f['sha256']})
assert {r['expected']['unit_key'] for r in changes}==approved
law={'expected':c,'source_url':c['source_url'],'source_sha256':ev['sha256'],'source_checked_at':ev['checked_at']}
pack={'version':'2026-10-12-drogas-headings','checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Transferir 11 rubricas finais para estrutura e corrigir capítulos conforme HTML oficial, sem remoção de disposição normativa ou renumeração de artigos.','laws':[law],'changes':changes,'additions':[],'status_changes':[]}
out.write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
out.with_name('drug-chapter-corrections-2026-10-12.json').write_text(json.dumps({'law':law,'units':chapters},ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(len(changes),'captions;',len(chapters),'chapter assignments')
