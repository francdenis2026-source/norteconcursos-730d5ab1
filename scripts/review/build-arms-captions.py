"""Remove only seven inspected trailing crime rubrics, preserving normative text."""
import datetime,hashlib,importlib.util,json,sys
from pathlib import Path
p=Path(sys.argv[1]);stage=sys.argv[2];out=Path(sys.argv[3])
read=lambda t:json.loads((p/stage/(t+'.json')).read_text(encoding='utf-8'))
s=importlib.util.spec_from_file_location('parser',Path(__file__).parents[1]/'build-legal-curriculum.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
c=next(c for c in read('legal_courses') if c['slug']=='armas')
ev=next(e for e in json.loads((p/'source-index-verified.json').read_text(encoding='utf-8')) if e['slug']=='armas')
raw=(p/'sources/armas.html').read_bytes();assert hashlib.sha256(raw).hexdigest()==ev['sha256']
fresh={u['key']:u for u in m.parse_law(raw,'armas',c['source_url']) if u['status']=='current'}
old={u['unit_key']:u for u in read('legal_course_units') if u['course_id']==c['id'] and u['content_status']=='current'}
assert set(fresh)==set(old) and len(fresh)==41
approved={'art-11-a','art-12','art-13','art-14','art-15','art-16','art-17'};changes=[]
for k,u in old.items():
 f=fresh[k];assert f['chapter']==u['chapter'],k
 if u['body_text']!=f['text']:
  assert k in approved and u['body_text'].startswith(f['text']+'\n\n'),k
  removed=u['body_text'][len(f['text']):].strip().split('\n\n')
  assert len(removed)==1 and removed[0] in {'Posse irregular de arma de fogo de uso permitido','Omissão de cautela','Porte ilegal de arma de fogo de uso permitido','Disparo de arma de fogo','Posse ou porte ilegal de arma de fogo de uso restrito','Comércio ilegal de arma de fogo','Tráfico internacional de arma de fogo'}
  changes.append({'course_slug':'armas','expected':u,'body_text':f['text'],'content_sha256':f['sha256'],'moved_captions':removed})
assert {r['expected']['unit_key'] for r in changes}==approved
law={'expected':c,'source_url':c['source_url'],'source_sha256':ev['sha256'],'source_checked_at':ev['checked_at']}
pack={'version':'2026-10-12-armas-captions','checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Separar sete rubricas de crimes anexadas ao artigo precedente, sem remoção de disposição normativa ou alteração de identidade, capítulo e posição.','laws':[law],'changes':changes,'additions':[],'status_changes':[]}
out.write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(len(changes),'inspected caption corrections')
