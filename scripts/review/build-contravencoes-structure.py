"""Move 64 inspected standalone rubrics and assign 66 current units to official sections."""
import ast,datetime,hashlib,importlib.util,json,sys
from pathlib import Path
p=Path(sys.argv[1]);stage=sys.argv[2];out=Path(sys.argv[3]);read=lambda t:json.loads((p/stage/(t+'.json')).read_text(encoding='utf8'))
parser=Path(__file__).parents[1]/'build-legal-curriculum.py';spec=importlib.util.spec_from_file_location('parser',parser);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
allow=next(ast.literal_eval(n.value) for n in ast.walk(ast.parse(parser.read_text(encoding='utf8'))) if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='contravention_rubrics' for t in n.targets));allow.add('DISPOSIÇÕES FINAIS')
c=next(c for c in read('legal_courses') if c['slug']=='contravencoes');ev=next(e for e in json.loads((p/'source-index-verified.json').read_text(encoding='utf8')) if e['slug']=='contravencoes');raw=(p/'sources/contravencoes.html').read_bytes();assert hashlib.sha256(raw).hexdigest()==ev['sha256']
allow.update({'CAPÍLULO II','DAS CONTRAVENÇÕES REFERENTES AO PATRIMÔNIO'})
old={u['unit_key']:u for u in read('legal_course_units') if u['course_id']==c['id'] and u['content_status']=='current'};fresh={u['key']:u for u in m.parse_law(raw,c['slug'],c['source_url']) if u['status']=='current'};assert set(old)==set(fresh) and len(old)==66
changes=[];chapters=[]
for k,u in old.items():
 f=fresh[k]
 if u['body_text']!=f['text']:
  assert u['body_text'].startswith(f['text']+'\n\n'),k
  removed=u['body_text'][len(f['text']):].strip().split('\n\n');assert all(t in allow for t in removed),(k,removed)
  changes.append({'course_slug':c['slug'],'expected':u,'body_text':f['text'],'content_sha256':f['sha256'],'moved_captions':removed})
 assert u['chapter']!=f['chapter'],k
 chapters.append({'unit_key':k,'expected':u,'chapter':f['chapter'],'content_sha256':f['sha256']})
assert len(changes)==64 and len(chapters)==66
assert fresh['art-24']['chapter'].endswith('CAPÍTULO II — DAS CONTRAVENÇÕES REFERENTES AO PATRIMÔNIO')
assert fresh['art-1']['chapter']=='PARTE GERAL' and fresh['art-72']['chapter']=='DISPOSIÇÕES FINAIS'
law={'expected':c,'source_url':c['source_url'],'source_sha256':ev['sha256'],'source_checked_at':ev['checked_at']}
pack={'version':'2026-10-12-contravencoes-headings','checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Mover 64 rubricas não normativas e corrigir agrupamento oficial; a grafia estrutural CAPÍLULO II é normalizada só no metadado. Preservar identidades, posições e disposições normativas.','laws':[law],'changes':changes,'additions':[],'status_changes':[]}
out.write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n',encoding='utf8');out.with_name('contravencoes-chapter-corrections-2026-10-12.json').write_text(json.dumps({'law':law,'units':chapters},ensure_ascii=False,indent=2)+'\n',encoding='utf8');print(len(changes),'rubrics;',len(chapters),'chapter assignments')
