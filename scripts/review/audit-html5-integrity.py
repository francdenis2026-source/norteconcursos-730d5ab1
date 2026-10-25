"""Compare repaired HTML5 article boundaries with a saved database read-back.
Usage: python scripts/review/audit-html5-integrity.py EVIDENCE_FOLDER SNAPSHOT_STAGE REPORT
Requires scripts/requirements-legal.txt; stores metadata only in the report.
"""
import hashlib,importlib.util,json,sys,datetime
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('parser',ROOT/'scripts/build-legal-curriculum.py');parser=importlib.util.module_from_spec(spec);spec.loader.exec_module(parser)
folder=Path(sys.argv[1]);stage=sys.argv[2];output=Path(sys.argv[3]);read=lambda t:json.loads((folder/stage/f'{t}.json').read_text(encoding='utf-8'))
courses=read('legal_courses');units=read('legal_course_units');rows=[]
for course in courses:
 raw=(folder/'sources'/f"{course['slug']}.html").read_bytes()
 parsed={u['key']:u for u in parser.parse_law(raw,course['slug'],course['source_url']) if u['status']=='current'}
 current={u['unit_key']:u for u in units if u['course_id']==course['id'] and u['content_status']=='current'}
 rows.append({'slug':course['slug'],'source_url':course['source_url'],'source_sha256':hashlib.sha256(raw).hexdigest(),'parsed_current':len(parsed),'database_current':len(current),'missing_articles':sorted(set(parsed)-set(current)),'unexpected_current':sorted(set(current)-set(parsed)),'text_differences':[{'key':k,'database_sha256':u['content_sha256'],'parsed_sha256':parsed[k]['sha256']} for k,u in current.items() if k in parsed and u['content_sha256']!=parsed[k]['sha256']]})
report={'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'method':'HTML5 tree repair followed by paragraph-boundary extraction. Counts and body hashes do not certify all jurisprudence or future production of effects.','courses':len(rows),'missing_articles':sum(len(r['missing_articles']) for r in rows),'unexpected_current':sum(len(r['unexpected_current']) for r in rows),'text_differences':sum(len(r['text_differences']) for r in rows),'rows':rows}
output.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print({k:v for k,v in report.items() if k not in ['rows','method']})
