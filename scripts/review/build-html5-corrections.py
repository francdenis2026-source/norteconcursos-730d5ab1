"""Build reviewed extraction corrections from two independent local parses.
Raw official HTML and full snapshots remain local, outside Git.
"""
import datetime,hashlib,json,uuid,sys
from pathlib import Path
p=Path(sys.argv[1]);out=Path(sys.argv[2])
read=lambda name:json.loads((p/'after94'/f'{name}.json').read_text(encoding='utf-8'))
courses=read('legal_courses');units=read('legal_course_units')
evidence={x['slug']:x for x in json.loads((p/'source-index-verified.json').read_text(encoding='utf-8'))}
changes=[];additions=[];laws=[]
# These differences only move descriptive headings or combine explicitly
# revoked historical labels. They are not approved changes to active wording.
deferred={'codigo-penal':{'art-14','art-44','art-51','art-122','art-132','art-186','art-216-b'}}
for diff in json.loads((p/'html5-current-differences.json').read_text(encoding='utf-8')):
 c=next(c for c in courses if c['slug']==diff['slug'])
 raw=(p/'sources'/f"{c['slug']}.html").read_bytes();ev=evidence[c['slug']]
 assert hashlib.sha256(raw).hexdigest()==ev['sha256']
 old={u['unit_key']:u for u in units if u['course_id']==c['id']}
 fresh={u['key']:u for u in json.loads((p/f"html5-{c['slug']}.json").read_text(encoding='utf-8'))}
 for d in diff['changes']:
  k=d['key']
  if k in deferred.get(c['slug'],set()):continue
  u=old[k];f=fresh[k];assert u['content_status']=='current' and f['status']=='current'
  changes.append({'course_slug':c['slug'],'expected':u,'body_text':f['text'],'content_sha256':f['sha256']})
 for k in diff['added']:
  f=fresh[k];assert f['status']=='current'
  index=list(fresh).index(k)
  following=next((old[x['key']]['position'] for x in list(fresh.values())[index+1:] if x['key'] in old and x['status']=='current'),max(u['position'] for u in old.values())+1)
  template=next(u for u in old.values() if u['content_status']=='current')
  additions.append({'course_slug':c['slug'],'unit':{'id':str(uuid.uuid5(uuid.NAMESPACE_URL,c['id']+'/'+k)),'course_id':c['id'],'unit_key':k,'label':f['label'],'chapter':f['chapter'],'position':following,'body_text':f['text'],'content_sha256':f['sha256'],'content_status':'current','recall':template['recall']}})
 laws.append({'expected':c,'source_url':ev['url'],'source_sha256':ev['sha256'],'source_checked_at':ev['checked_at']})
lep=next(c for c in courses if c['slug']=='lep');old182=next(u for u in units if u['course_id']==lep['id'] and u['unit_key']=='art-182');new182=next(u for u in json.loads((p/'html5-lep.json').read_text(encoding='utf-8')) if u['key']=='art-182')
assert new182['status']=='revoked' and 'Revogado pela Lei nº 9.268' in new182['text']
excluded=[{'course_slug':'lep','expected':old182,'body_text':new182['text'],'content_sha256':new182['sha256'],'content_status':'excluded','reason':'Art. 182 e parágrafos expressamente revogados pela Lei 9.268/1996; retirar da leitura ativa preservando a identidade.'}]
pack={'version':'2026-10-11','checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope':'Correção de omissões de extração e exclusão de dispositivo expressamente revogado, não certificação de todas as explicações. IDs e revisões existentes preservados.','laws':laws,'changes':changes,'additions':additions,'status_changes':excluded,'deferred':{k:sorted(v) for k,v in deferred.items()}}
out.write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(len(changes),'corrected texts;',len(additions),'recovered articles')
