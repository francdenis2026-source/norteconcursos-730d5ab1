"""Explicit reviewed subset only. Read-only by default; --apply writes with guards.

Secrets live in TASK_SUPABASE_URL / TASK_SUPABASE_SECRET. Snapshots stay local.
Search results never approve a question. Text and official keys cannot change.
"""
import datetime
import hashlib
import json
import os
from pathlib import Path
import sys
import time
from urllib.error import URLError, HTTPError
from urllib.parse import urlencode, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT/'docs/question-legal-review-378-2026-10-11.json'
ALLOWED = {'legal_basis','law_version_checked_at','legal_review_required','legal_audit_completed',
           'current_syllabus_topic_id','content_status','review_note','explanation'}

def same(field, a, b):
    if field == 'law_version_checked_at' and a and b:
        return datetime.datetime.fromisoformat(a.replace('Z','+00:00')) == datetime.datetime.fromisoformat(b.replace('Z','+00:00'))
    return a == b

def validate_decision(d, row, topic_ids):
    if not set(d['patch']).issubset(ALLOWED): raise ValueError('Protected patch field')
    if hashlib.md5(row['question_text'].encode()).hexdigest() != d['question_md5']: raise ValueError('Question changed '+d['id'])
    if row['official_answer'] != d['expected_answer']: raise ValueError('Key changed '+d['id'])
    for basis in d['patch']['legal_basis']:
        host = urlparse(basis['url']).hostname or ''
        if urlparse(basis['url']).scheme != 'https' or not any(host == h or host.endswith('.'+h) for h in ('planalto.gov.br','stf.jus.br','stj.jus.br','unodc.org')):
            raise ValueError('Unverified source domain')
    if d['patch']['content_status'] == 'active':
        if d['decision'] != 'verified' or row.get('context_review_required') or not d['patch'].get('legal_audit_completed'):
            raise ValueError('Incomplete review cannot publish')
        if d['patch'].get('current_syllabus_topic_id') not in topic_ids or not d.get('syllabus_source'):
            raise ValueError('Missing current syllabus')
    if all(same(f,row.get(f),v) for f,v in d['patch'].items()): return 'already_applied'
    for field in ['content_status','legal_basis','law_version_checked_at','current_syllabus_topic_id']:
        key = {'content_status':'expected_status','legal_basis':'expected_basis','law_version_checked_at':'expected_checked_at','current_syllabus_topic_id':'expected_current_topic'}[field]
        if key in d and not same(field,row.get(field),d[key]): raise ValueError('Stale review '+d['id']+' '+field)
    for field in ['review_note','explanation']:
        expected=d.get('expected_'+field+'_md5')
        if expected and hashlib.md5((row.get(field) or '').encode()).hexdigest()!=expected:
            raise ValueError('Concurrent review '+d['id'])
    return 'validated'

def filter_value(value):
    if value is None: return 'is.null'
    if isinstance(value, (dict,list,bool)): return 'eq.'+json.dumps(value,ensure_ascii=False,separators=(',',':'))
    return 'eq.'+str(value)

def main():
    manifest=json.loads(MANIFEST.read_text(encoding='utf-8'))
    scope=json.loads((ROOT/'docs/question-taxonomy-review-2026-10-11.json').read_text(encoding='utf-8'))
    held={(d['table'],d['id']) for d in scope['decisions'] if d['quarantine']}
    ds=manifest['decisions']
    assert len(held)==378 and len({(d['table'],d['id']) for d in ds})==len(ds)
    assert all((d['table'],d['id']) in held for d in ds)
    base=os.environ['TASK_SUPABASE_URL'].rstrip('/')+'/rest/v1/'
    headers={'apikey':os.environ['TASK_SUPABASE_SECRET'],'Content-Type':'application/json','Prefer':'return=representation'}
    def request(table,params,body=None,method='GET',prefer=None):
        h=dict(headers)
        if prefer:h['Prefer']=prefer
        req=Request(base+table+'?'+urlencode(params),headers=h,method=method,
                    data=None if body is None else json.dumps(body,ensure_ascii=False).encode())
        for attempt in range(3):
            try:
                with urlopen(req,timeout=90) as response:
                    raw=response.read()
                    return json.loads(raw) if raw else []
            except (URLError,TimeoutError,ConnectionError) as exc:
                # A lost PATCH response may already have changed the record.
                # Restart safely through preflight instead of blindly repeating it.
                if method=='PATCH' or attempt==2 or isinstance(exc,HTTPError) and exc.code<500:
                    raise
                time.sleep(2**attempt)
    topics=request('syllabus_topics',{'select':'id','content_status':'eq.current'})
    topic_ids={t['id'] for t in topics}
    before={}
    for d in ds:
        rows=request(d['table'],{'id':'eq.'+d['id'],'select':'*'})
        if len(rows)!=1:raise ValueError('Missing question '+d['id'])
        row=rows[0]
        validate_decision(d,row,topic_ids)
        before[d['id']]=row
    print('Preflight verified:',len(ds),flush=True)
    sources={b['url']:b for d in ds for b in d['patch']['legal_basis']}
    sources.update({d['syllabus_source']:{'url':d['syllabus_source'],'title':'PCDF Delegado 2026: edital oficial retificado'} for d in ds if d.get('syllabus_source')})
    if '--apply' in sys.argv:
        for b in sources.values():
            host=urlparse(b['url']).hostname
            typ='edital' if host=='cdn.cebraspe.org.br' else 'jurisprudencia' if 'jus.br' in host else 'manual' if 'unodc.org' in host else 'lei'
            issuer='CEBRASPE / PCDF' if typ=='edital' else 'STF' if 'stf.' in host else 'STJ' if 'stj.' in host else 'ONU / UNODC' if typ=='manual' else 'Presidência da República'
            request('content_sources',{'on_conflict':'url'},dict(source_type=typ,title=b['title'],issuer=issuer,url=b['url'],
                    checked_at=manifest['checked_at'],is_official=True,status='vigente',notes='Fonte consultada na revisão individual do lote de 378; não implica auditoria integral de todos os dispositivos.'),
                    'POST','resolution=ignore-duplicates,return=representation')
        for b in sources.values():
            rows=request('content_sources',{'url':filter_value(b['url']),'select':'id,is_official'})
            if len(rows)!=1 or not rows[0]['is_official']:raise ValueError('Source registration failed')
    results=[]
    for d in ds:
        row=before[d['id']]
        status=validate_decision(d,row,topic_ids)
        if '--apply' in sys.argv and status!='already_applied':
            guards={'id':filter_value(d['id']),'select':'*'}
            for f in ['question_text','official_answer','content_status','legal_basis','law_version_checked_at',
                      'current_syllabus_topic_id','review_note','explanation','context_review_required',
                      'legal_review_required','legal_audit_completed','subject','syllabus_topic_id']:
                if f in row:guards[f]=filter_value(row[f])
            after=request(d['table'],guards,d['patch'],'PATCH')
            if len(after)!=1:raise ValueError('Concurrent edit blocked '+d['id'])
            check=request(d['table'],{'id':filter_value(d['id']),'select':'*'})[0]
            for f,v in row.items():
                if f not in d['patch'] and check.get(f)!=v:raise ValueError('Protected field changed '+f)
            if validate_decision(d,check,topic_ids)!='already_applied':raise ValueError('Read-back failed')
            status='applied'
        results.append({'id':d['id'],'result':status,'decision':d['decision'],'publication_status':d['patch']['content_status']})
    output={'scope_total':378,'processed':len(results),'remaining_individual_review':378-len(results),'results':results}
    path=ROOT/'outputs/legal-review-378'/('applied.json' if '--apply' in sys.argv else 'validated.json')
    path.write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding='utf-8')
    from collections import Counter
    print(dict(Counter(r['result'] for r in results)),dict(Counter(r['publication_status'] for r in results)),flush=True)

if __name__=='__main__':main()
