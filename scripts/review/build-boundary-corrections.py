"""Build only reviewed orphan-paragraph corrections, preserving database identities.
Usage: python scripts/review/build-boundary-corrections.py EVIDENCE_FOLDER STAGE OUTPUT
Raw official pages and snapshots stay outside Git.
"""
import datetime, hashlib, importlib.util, json, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('parser',ROOT/'scripts/build-legal-curriculum.py');parser=importlib.util.module_from_spec(spec);spec.loader.exec_module(parser)
p=Path(sys.argv[1]);stage=sys.argv[2];out=Path(sys.argv[3])
read=lambda t:json.loads((p/stage/f'{t}.json').read_text(encoding='utf-8'))
courses=read('legal_courses');units=read('legal_course_units')
evidence={e['slug']:e for e in json.loads((p/'source-index-verified.json').read_text(encoding='utf-8'))}
# Each removal was inspected against the original HTML article boundaries.
approved={'cin':['art-17'],'lep':['art-123'],'idosa':['art-50','art-100'],'contravencoes':['art-26','art-68','art-59','art-38','art-64'],'eca':['art-247','art-232','art-239'],'ric':['art-5'],'lavagem':['art-17-e']}
changes=[];excluded=[];laws=[]
for slug,keys in approved.items():
 c=next(c for c in courses if c['slug']==slug);ev=evidence[slug];raw=(p/'sources'/f'{slug}.html').read_bytes();assert hashlib.sha256(raw).hexdigest()==ev['sha256']
 fresh={u['key']:u for u in parser.parse_law(raw,slug,c['source_url'])};old={u['unit_key']:u for u in units if u['course_id']==c['id']}
 for key in keys:
  u=old[key];f=fresh[key];assert u['content_status']=='current' and f['status']=='current'
  assert u['body_text']!=f['text'],(slug,key)
  changes.append({'course_slug':slug,'expected':u,'body_text':f['text'],'content_sha256':f['sha256']})
 if slug=='lavagem':
  u=old['art-16'];assert fresh['art-16']['status']=='revoked'
  body='Art. 16. (Revogado pela Lei nº 13.974, de 2020). Não integra a leitura normativa ativa.'
  excluded.append({'course_slug':slug,'expected':u,'body_text':body,'content_sha256':hashlib.sha256(body.encode()).hexdigest(),'content_status':'excluded','reason':'Revogação expressa confirmada na Lei 13.974/2020; preserve identidade e histórico.'})
 laws.append({'expected':c,'source_url':ev['url'],'source_sha256':ev['sha256'],'source_checked_at':ev['checked_at']})
out.write_text(json.dumps({'version':'2026-10-11','checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Remoção de parágrafos órfãos de versões suprimidas. Não certifica toda jurisprudência.','laws':laws,'changes':changes,'additions':[],'status_changes':excluded},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(changes),'boundary corrections;',len(excluded),'expressly revoked exclusion')
