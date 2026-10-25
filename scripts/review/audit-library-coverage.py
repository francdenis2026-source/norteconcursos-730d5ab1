"""Article-level coverage and exact official-source comparison; no publication."""
import hashlib, importlib.util, json, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('curriculum',ROOT/'scripts/build-legal-curriculum.py')
parser=importlib.util.module_from_spec(spec);spec.loader.exec_module(parser)
folder=Path(sys.argv[1]);read=lambda name:json.loads((folder/'before'/f'{name}.json').read_text(encoding='utf-8'))
courses=read('legal_courses');units=read('legal_course_units');explanations={r['unit_id']:r for r in read('legal_unit_explanations')}
evidence={r['slug']:r for r in json.loads((folder/'source-index-verified.json').read_text(encoding='utf-8'))}
rows=[];mismatches=[]
for course in courses:
    current=[u for u in units if u['course_id']==course['id'] and u['content_status']=='current']
    missing=[u['unit_key'] for u in current if u['id'] not in explanations or explanations[u['id']]['status']!='published' or explanations[u['id']]['content_sha256']!=u['content_sha256']]
    source=evidence[course['slug']];assert 'error' not in source,course['slug']
    raw=(folder/'sources'/(course['slug']+'.html')).read_bytes();assert hashlib.sha256(raw).hexdigest()==source['sha256']
    parsed=parser.parse_law(raw,course['slug'],course['source_url']);official={u['key']:u for u in parsed if u['status']=='current'}
    matched=[]
    for unit in current:
        fresh=official.get(unit['unit_key'])
        if fresh and fresh['sha256']==unit['content_sha256']:matched.append(unit['unit_key'])
        else:mismatches.append({'course_slug':course['slug'],'unit_key':unit['unit_key'],'reason':'body mismatch' if fresh else 'missing from source','database_text':unit['body_text'],'official_text':fresh['text'] if fresh else None})
    rows.append({'course_slug':course['slug'],'title':course['title'],'current_units':len(current),'published_explanations':len(current)-len(missing),'missing_explanations':missing,'official_exact_matches':len(matched),'official_verified_keys':matched,'source_url':source['url'],'source_sha256':source['sha256'],'source_checked_at':source['checked_at']})
report={'courses':len(rows),'current_units':sum(r['current_units'] for r in rows),'published_explanations':sum(r['published_explanations'] for r in rows),'missing_explanations':sum(len(r['missing_explanations']) for r in rows),'source_mismatches':len(mismatches),'rows':rows}
(folder/'coverage-before.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(folder/'source-mismatches.json').write_text(json.dumps(mismatches,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print({k:v for k,v in report.items() if k!='rows'})
for r in rows:
    if r['missing_explanations']:print(r['course_slug'],len(r['missing_explanations']),'missing;',r['official_exact_matches'],'matched')
