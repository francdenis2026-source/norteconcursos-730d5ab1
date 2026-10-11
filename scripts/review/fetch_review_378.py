"""Read-only export of the exact held scope; private snapshots stay in outputs."""
import json
import os
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'outputs/legal-review-378'
OUT.mkdir(parents=True, exist_ok=True)
manifest = json.loads((ROOT / 'docs/question-taxonomy-review-2026-10-11.json').read_text(encoding='utf-8'))
scope = [d for d in manifest['decisions'] if d['quarantine']]
assert len(scope) == 378
base = os.environ['TASK_SUPABASE_URL'].rstrip('/') + '/rest/v1/'
headers = {'apikey': os.environ['TASK_SUPABASE_SECRET']}

def get(table, params):
    with urlopen(Request(base + table + '?' + urlencode(params), headers=headers), timeout=90) as response:
        return json.load(response)

exports = {}
for table in sorted({d['table'] for d in scope}):
    ids = [d['id'] for d in scope if d['table'] == table]
    rows = []
    for start in range(0, len(ids), 40):
        rows.extend(get(table, {'select': '*', 'id': 'in.(' + ','.join(ids[start:start+40]) + ')'}))
    assert len(rows) == len(ids)
    exports[table] = rows
for table in ['syllabus_editions', 'syllabus_topics', 'content_sources']:
    rows = []
    for offset in range(0, 20000, 1000):
        page = get(table, {'select': '*', 'order': 'id', 'limit': '1000', 'offset': str(offset)})
        rows.extend(page)
        if len(page) < 1000:
            break
    exports[table] = rows
(OUT / 'baseline.json').write_text(json.dumps(exports, ensure_ascii=False, indent=2), encoding='utf-8')
print({table: len(rows) for table, rows in exports.items()})
