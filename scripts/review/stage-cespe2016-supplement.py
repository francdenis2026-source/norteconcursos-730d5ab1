"""Compare a bounded supplement with live catalogs; optionally stage privately.

Credentials are read without echo. Reports and source text must remain outside Git.
No existing candidate, source, review decision or student catalog is modified.
"""
import argparse
from collections import Counter, defaultdict
from datetime import datetime, timezone
import getpass
import hashlib
import json
from pathlib import Path
import re
import unicodedata
import urllib.error
import urllib.parse
import urllib.request

SOURCE = 'cd1bd6a9eb5e62e0cf6b5ae0be4d5f332b968432c419733878d30956d45ec705'
BASE = 'https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/'
TABLES = {
    'official_exam_questions': 'id,question_text,content_status',
    'board_exam_questions': 'id,stem,options,content_status',
    'curated_question_catalog': 'id,question_text,content_status',
    'question_corpus_candidates': 'id,corpus_id,source_key,source_page,discipline,content_status,payload',
}


def normalize(text):
    text = re.sub(r'(?<=\w)-\s*\n(?=\w)', '', text)
    return re.sub(r'\W+', '', unicodedata.normalize('NFKD', text.casefold()))


def variants(table, row):
    if table == 'board_exam_questions':
        stem = row.get('stem') or ''
        options = row.get('options') or {}
        if isinstance(options, dict):
            yield stem + '\n' + '\n'.join(f'({k}) {options[k]}' for k in sorted(options))
        yield stem
    elif table == 'question_corpus_candidates':
        payload = row.get('payload') or {}
        for field in ['question_text_candidate', 'stem']:
            if isinstance(payload.get(field), str):
                yield payload[field]
        publication = payload.get('publication') or {}
        if isinstance(publication.get('question_text'), str):
            yield publication['question_text']
    else:
        text = row.get('question_text') or ''
        yield text
        if 'Item:' in text:
            yield text.rsplit('Item:', 1)[1].strip()


def validate(pack):
    candidates = pack['candidates']
    if pack['source']['id'] != SOURCE or not 1 <= len(candidates) <= 100:
        raise ValueError('Wrong source or batch outside 1..100')
    removed = set()
    review_dir = Path(__file__).resolve().parents[2] / 'docs/reviews'
    for name in ['cespe2016-obsolete-removal-2026-10-17.json', 'cespe2016-obsolete-removal-04-2026-10-17.json']:
        removed.update(item['candidate_id'] for item in json.loads((review_dir / name).read_text())['items'])
    seen = set()
    for row in candidates:
        p = row['payload']
        expected = hashlib.sha256((SOURCE + ':' + row['source_key']).encode()).hexdigest()
        if (row['id'] != expected or row['id'] in seen or row['id'] in removed or row['corpus_id'] != SOURCE
                or row['content_status'] != 'under_review' or not 1 <= row['source_page'] <= 510
                or 'publication' in p or p.get('has_publication') is not False
                or p.get('individual_review_complete') is not False
                or not p.get('raw_text') or not p.get('question_text_candidate')
                or p.get('answer_candidate') not in [None, 'A', 'B', 'C', 'D', 'E']):
            raise ValueError('Invalid candidate or publication state')
        seen.add(row['id'])
    return candidates


def collect(request, table, select):
    rows, cursor = [], None
    while True:
        params = dict(select=select, order='id.asc', limit='500')
        if cursor:
            params['id'] = 'gt.' + cursor
        batch = request(table + '?' + urllib.parse.urlencode(params))
        for row in batch:
            if cursor is not None and row['id'] <= cursor:
                raise RuntimeError('Pagination did not advance')
            cursor = row['id']
            rows.append(row)
        if len(batch) < 500:
            return rows


def plan(candidates, snapshots):
    exact = defaultdict(list)
    for table, rows in snapshots.items():
        for row in rows:
            ref = dict(table=table, id=row['id'], content_status=row['content_status'])
            for text in set(variants(table, row)):
                fingerprint = normalize(text)
                if fingerprint:
                    exact[fingerprint].append(ref)
    by_id = {r['id']: r for r in snapshots['question_corpus_candidates']}
    pending, matches, preserved = [], [], []
    for row in candidates:
        old = by_id.get(row['id'])
        if old:
            if any(old[k] != row[k] for k in ['corpus_id', 'source_key', 'source_page', 'discipline']):
                raise RuntimeError('Existing identity mismatch')
            if old['payload']['raw_text'] != row['payload']['raw_text']:
                raise RuntimeError('Existing extraction differs; preserve and inspect')
            preserved.append(row['id'])
            continue
        found = exact.get(normalize(row['payload']['question_text_candidate']), [])
        if found:
            matches.append(dict(candidate_id=row['id'], matches=found))
        else:
            pending.append(row)
    return pending, matches, preserved


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pack', type=Path)
    parser.add_argument('report', type=Path)
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    repo = Path(__file__).resolve().parents[2]
    if args.report.resolve().is_relative_to(repo):
        raise ValueError('Store full live reports outside repository')
    pack = json.loads(args.pack.read_text())
    candidates = validate(pack)
    key = getpass.getpass('Supabase credential (hidden): ')

    def request(path, method='GET', body=None):
        headers = {'apikey': key, 'Content-Type': 'application/json'}
        if method == 'POST':
            headers['Prefer'] = 'resolution=ignore-duplicates,return=representation'
        req = urllib.request.Request(BASE + path, method=method, headers=headers,
            data=json.dumps(body, ensure_ascii=False).encode() if body is not None else None)
        try:
            with urllib.request.urlopen(req, timeout=90) as response:
                return json.loads(response.read())
        except urllib.error.HTTPError as exc:
            raise RuntimeError('Supabase HTTP ' + str(exc.code)) from None

    source = request('question_corpus_sources?select=id,page_count&id=eq.' + SOURCE)
    if len(source) != 1 or source[0]['page_count'] != 510:
        raise RuntimeError('Source preflight failed')
    snapshots = {}
    for table, fields in TABLES.items():
        snapshots[table] = collect(request, table, fields)
        print(json.dumps(dict(compared_table=table, rows=len(snapshots[table]))), flush=True)
    pending, matches, preserved = plan(candidates, snapshots)
    report = dict(checked_at=datetime.now(timezone.utc).isoformat(), source_id=SOURCE,
        candidates=len(candidates), snapshot_counts={t: len(v) for t, v in snapshots.items()},
        exact_matches=matches, preserved_ids=preserved, pending_ids=[c['id'] for c in pending],
        matching_scope='Normalized exact question text; semantic and table-context review still pending',
        applied=args.apply, inserted_ids=[], verified=False, publications=0, existing_rows_modified=0)

    def save():
        args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')

    save()
    if args.apply:
        for start in range(0, len(pending), 25):
            batch = pending[start:start+25]
            created = request('question_corpus_candidates?on_conflict=id', 'POST', batch)
            report['inserted_ids'].extend(r['id'] for r in created)
            save()
        for start in range(0, len(pending), 25):
            batch = pending[start:start+25]
            ids = ','.join(row['id'] for row in batch)
            stored = request('question_corpus_candidates?select=*&id=in.(' + ids + ')')
            actual = {row['id']: row for row in stored}
            if set(actual) != {row['id'] for row in batch}:
                raise RuntimeError('Readback identities differ')
            for row in batch:
                if any(actual[row['id']][k] != v for k, v in row.items()):
                    raise RuntimeError('Readback mismatch; inspect report before retry')
        report['verified'] = True
        current = collect(request, 'question_corpus_candidates', 'id,corpus_id,content_status')
        report['source_status_counts'] = dict(Counter(r['content_status'] for r in current if r['corpus_id'] == SOURCE))
    save()
    print(json.dumps({k: v for k, v in report.items() if not k.endswith('_ids') and k != 'exact_matches'}, ensure_ascii=False), flush=True)


if __name__ == '__main__':
    main()
