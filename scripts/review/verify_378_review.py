"""Independent read-back of all 378 rows; verify the explicit subset and protected fields."""
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
import datetime
import json
import os
import time
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
from apply_378_review import same

ROOT=Path(__file__).resolve().parents[2]
def main():
    baseline=json.loads((ROOT/'outputs/legal-review-378/baseline.json').read_text(encoding='utf-8'))
    manifest=json.loads((ROOT/'docs/question-legal-review-378-2026-10-11.json').read_text(encoding='utf-8'))
    decisions={(d['table'],d['id']):d for d in manifest['decisions']}
    base=os.environ['TASK_SUPABASE_URL'].rstrip('/')+'/rest/v1/'
    headers={'apikey':os.environ['TASK_SUPABASE_SECRET']}
    jobs=[]
    for table in ['official_exam_questions','curated_question_catalog']:
        ids=[r['id'] for r in baseline[table]]
        for start in range(0,len(ids),40):jobs.append((table,ids[start:start+40]))
    def fetch(job):
        table,ids=job
        query=urlencode({'select':'*','id':'in.('+','.join(ids)+')'})
        for attempt in range(4):
            try:
                with urlopen(Request(base+table+'?'+query,headers=headers),timeout=30) as response:
                    rows=json.load(response)
                break
            except (URLError,TimeoutError,ConnectionError) as exc:
                if attempt==3 or isinstance(exc,HTTPError) and exc.code<500:raise
                time.sleep(2**attempt)
        assert len(rows)==len(ids)
        return table,rows
    actual={}
    with ThreadPoolExecutor(max_workers=4) as pool:
        for table,rows in pool.map(fetch,jobs):
            for row in rows:actual[table,row['id']]=row
    errors=[]
    for table in ['official_exam_questions','curated_question_catalog']:
        for before in baseline[table]:
            key=table,before['id'];after=actual[key]
            patch=decisions[key]['patch'] if key in decisions else {}
            for field,value in before.items():
                expected=patch.get(field,value)
                if not same(field,after.get(field),expected):errors.append({'id':before['id'],'field':field})
    status=Counter(r['content_status'] for r in actual.values())
    result={'verified_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'scope_total':378,
            'individual_decisions':len(decisions),'remaining_individual_review':378-len(decisions),
            'publication_statuses':dict(status),'decisions':dict(Counter(d['decision'] for d in decisions.values())),
            'unexpected_changes':errors,'preserved_original_text_and_keys':not errors}
    (ROOT/'outputs/legal-review-378/after-batch01.json').write_text(json.dumps(list(actual.values()),ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT/'docs/question-legal-review-378-batch01-applied-2026-10-11.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(result,ensure_ascii=False))
    if errors:raise SystemExit(1)

if __name__=='__main__':main()
