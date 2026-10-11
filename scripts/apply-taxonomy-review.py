"""Apply only the reviewed subjects, with optimistic guards and read-back.

TASK_SUPABASE_URL and TASK_SUPABASE_SECRET are session environment variables.
Default is read-only; --apply writes. Snapshots/results stay in ignored outputs.
"""
import concurrent.futures
import hashlib
import json
import os
import pathlib
import sys
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
BASE = os.environ['TASK_SUPABASE_URL'].rstrip('/') + '/rest/v1/'
HEADERS = {'apikey':os.environ['TASK_SUPABASE_SECRET'],'Content-Type':'application/json','Prefer':'return=representation'}
manifest = json.loads((ROOT/'docs/question-taxonomy-review-2026-10-11.json').read_text(encoding='utf-8'))
assert manifest['reviewed']==755 and manifest['scope']=='classification_and_missing_evidence_quarantine'

def request(table, params, patch=None):
    url = BASE+table+'?'+urllib.parse.urlencode(params)
    req = urllib.request.Request(url,headers=HEADERS,data=None if patch is None else json.dumps(patch).encode(),method='GET' if patch is None else 'PATCH')
    return json.load(urllib.request.urlopen(req,timeout=60))

def guard(value):
    # Equality values are URL-encoded by urlencode, not quoted like IN lists.
    return 'eq.'+value

def inspect(d):
    rows=request(d['table'],{'id':'eq.'+d['id'],'select':'*'})
    if len(rows)!=1: raise ValueError('Missing reviewed record '+d['id'])
    row=rows[0]
    if hashlib.md5(row['question_text'].encode()).hexdigest()!=d['question_md5'] or row['subject'] not in [d['old_subject'],d['new_subject']]:
        raise ValueError('Snapshot changed '+d['id'])
    return row

def apply(d):
    before=inspect(d)
    hold=d['quarantine'] and before['content_status']=='active'
    if before['subject']==d['new_subject'] and not hold:return dict(id=d['id'],result='already_correct')
    if '--apply' not in sys.argv:return dict(id=d['id'],result='validated')
    patch={'subject':d['new_subject']}
    if hold:patch['content_status']='under_review'
    rows=request(d['table'],{'id':'eq.'+d['id'],'subject':guard(before['subject']),
        'content_status':guard(before['content_status']),
        'question_text':guard(before['question_text']),'select':'*'}, patch)
    if len(rows)!=1:raise ValueError('Concurrent edit '+d['id'])
    after=rows[0]
    if after['subject']!=d['new_subject']:raise ValueError('Write failed '+d['id'])
    # Only the classification field may change; do not publish/reapprove content.
    if after['content_status']!=patch.get('content_status',before['content_status']):raise ValueError('Unexpected publication change '+d['id'])
    for field in ['question_text','official_answer','legal_basis','law_version_checked_at','syllabus_topic_id']:
        if after[field]!=before[field]:raise ValueError('Protected field changed '+d['id']+' '+field)
    if inspect(d)['subject']!=d['new_subject']:raise ValueError('Read-back failed '+d['id'])
    return dict(id=d['id'],result='corrected')

results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    jobs={pool.submit(apply,d):d for d in manifest['decisions']}
    for future in concurrent.futures.as_completed(jobs):
        d=jobs[future]
        try:results.append(future.result())
        except Exception as exc:results.append(dict(id=d['id'],result='error',error=str(exc)))
        if len(results)%100==0:print('Processed',len(results),'errors',sum(r['result']=='error' for r in results),flush=True)
path=ROOT/'outputs/filter-audit'/('applied.json' if '--apply'in sys.argv else 'validated.json')
path.write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
from collections import Counter
print(dict(Counter(r['result'] for r in results)),flush=True)
if any(r['result']=='error' for r in results):sys.exit(1)
