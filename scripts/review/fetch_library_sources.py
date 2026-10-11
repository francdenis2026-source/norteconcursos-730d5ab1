"""Read-only official HTML evidence with the Windows proxy-aware urllib client."""
import concurrent.futures, datetime, hashlib, json, sys, time
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlparse

folder=Path(sys.argv[1]); sources=folder/'sources'; sources.mkdir(exist_ok=True)
courses=json.loads((folder/'before/legal_courses.json').read_text(encoding='utf-8'))
def fetch(course):
    assert urlparse(course['source_url']).hostname=='www.planalto.gov.br'
    path=sources/(course['slug']+'.html')
    for attempt in range(3):
        try:
            with urlopen(Request(course['source_url'],headers={'User-Agent':'Mozilla/5.0'}),timeout=30) as response: raw=response.read()
            assert len(raw)>1000
            with path.open('xb') as output:output.write(raw)
            result={'slug':course['slug'],'url':course['source_url'],'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw),'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
            print(course['slug'],len(raw),flush=True);return result
        except FileExistsError:raise
        except Exception as error:
            if attempt==2:return {'slug':course['slug'],'url':course['source_url'],'error':str(error)}
            time.sleep(attempt+1)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: results=list(pool.map(fetch,courses))
(folder/'source-index-verified.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
if any('error' in r for r in results):sys.exit(1)
