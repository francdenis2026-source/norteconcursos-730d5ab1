"""Remove the historical Sedução rubric from CP 216-B, preserving its identity."""
import datetime,hashlib,importlib.util,json,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2];p=Path(sys.argv[1]);read=lambda t:json.loads((p/'before'/(t+'.json')).read_text(encoding='utf-8'))
c=next(c for c in read('legal_courses') if c['slug']=='codigo-penal');u=next(u for u in read('legal_course_units') if u['course_id']==c['id'] and u['unit_key']=='art-216-b')
s=importlib.util.spec_from_file_location('parser',root/'scripts/build-legal-curriculum.py');parser=importlib.util.module_from_spec(s);s.loader.exec_module(parser)
raw=(p/'sources/codigo-penal.html').read_bytes();f=next(f for f in parser.parse_law(raw,c['slug'],c['source_url']) if f['key']==u['unit_key']);assert u['body_text']==f['text']+'\n\nSedução'
ev=next(e for e in json.loads((p/'source-index-verified.json').read_text(encoding='utf-8')) if e['slug']==c['slug']);assert hashlib.sha256(raw).hexdigest()==ev['sha256']
law={'expected':c,'source_url':c['source_url'],'source_sha256':ev['sha256'],'source_checked_at':ev['checked_at']}
(root/'docs/library/cp216b-body-correction-2026-10-11.json').write_text(json.dumps({'version':'2026-10-11-cp216b','checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Remove apenas rubrica histórica do artigo posterior; conteúdo normativo, ID e progresso preservados.','laws':[law],'changes':[{'course_slug':c['slug'],'expected':u,'body_text':f['text'],'content_sha256':f['sha256']}],'additions':[],'status_changes':[]},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('One inspected editorial boundary correction')
