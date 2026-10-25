"""Read-only evidence export. Credentials remain in the process environment."""
import json
import argparse
import time
from urllib.error import URLError, HTTPError
import os
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/library-continuation-2026-10-11'
def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--stage',choices=['before','after'],default='before')
    args=parser.parse_args()
    OUT.mkdir(parents=True,exist_ok=True)
    for table in ['study_materials','study_material_enrichments','legal_courses','syllabus_topics','syllabus_editions','content_sources']:
        result=[]
        while True:
            query=urlencode({'select':'*','order':'id','limit':200,'offset':len(result)})
            request=Request(os.environ['TASK_SUPABASE_URL'].rstrip('/')+'/rest/v1/'+table+'?'+query,
                            headers={'apikey':os.environ['TASK_SUPABASE_SECRET']})
            for attempt in range(3):
                try:
                    with urlopen(request,timeout=30) as response:page=json.load(response)
                    break
                except (URLError,ConnectionError,TimeoutError) as error:
                    if attempt==2 or isinstance(error,HTTPError) and error.code<500:raise
                    time.sleep(2**attempt)
            result+=page
            if len(page)<200:break
        path=OUT/(table+'-'+args.stage+'.json')
        if path.exists() and args.stage=='before':raise RuntimeError('Preserve existing baseline: '+str(path))
        path.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
        print(table,len(result),flush=True)
if __name__=='__main__':main()
