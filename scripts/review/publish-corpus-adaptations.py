"""Publish explicitly authored adaptations without releasing historical originals.

Usage: python publish-corpus-adaptations.py PACK REPORT [--apply].
Credentials are entered without echo and remain only in process memory.
"""
from datetime import datetime, timezone
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import urllib.parse
import uuid

_spec = importlib.util.spec_from_file_location('supplement_stage', Path(__file__).with_name('stage-cespe2016-supplement.py'))
stage = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(stage)
PREFIX = 'cespe2016:adapted-cpc2015-v1:'
CPC_URL = 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm'


def validate(pack):
    items = pack['items']
    if not 1 <= len(items) <= 100 or pack.get('original_exam_items_published') != 0:
        raise ValueError('Bounded adaptation batch required')
    seen, texts = set(), set()
    for item in items:
        row = item['row']
        key = PREFIX + item['origin_candidate_id']
        fingerprint = stage.normalize(row['question_text'].split('\n\n', 1)[-1])
        if (not re.fullmatch('[a-f0-9]{64}', item['origin_candidate_id'])
                or row['external_item_key'] != key or row['id'] != str(uuid.uuid5(uuid.NAMESPACE_URL, key))
                or row['id'] in seen or fingerprint in texts
                or item['kind'] != 'author_adaptation_not_original_exam'
                or row['is_original'] is not True or row['exam_board'] != 'Autoral (adaptação)'
                or not row['question_text'].startswith('Treino adaptado e atualizado — CPC/2015.')
                or row['content_status'] != 'active' or row['official_answer'] not in ['C', 'E']
                or len(row['explanation']) < 300 or 'Exemplo prático:' not in row['explanation']
                or row['subject'] != 'Direito Processual Civil' or not row.get('syllabus_topic_id')
                or not row.get('legal_basis')):
            raise ValueError('Invalid authored adaptation')
        for stamp in [row['verified_at'], row['law_version_checked_at']]:
            if datetime.fromisoformat(stamp) > datetime.now(timezone.utc):
                raise ValueError('Review date is in the future')
        if any(b['url'] != CPC_URL or not b.get('artigo') or not b.get('lei') for b in row['legal_basis']):
            raise ValueError('Official article references required')
        seen.add(row['id'])
        texts.add(fingerprint)
    return items


def same_row(stored, row):
    for key, value in row.items():
        actual = stored.get(key)
        if key in ['verified_at', 'law_version_checked_at']:
            if not actual or datetime.fromisoformat(actual) != datetime.fromisoformat(value):
                return False
        elif actual != value:
            return False
    return True


def run_publication(pack, request, collect, report_path, apply=False):
    items = validate(pack)
    evidence = pack['primary_evidence']
    for kind in ['cpc', 'edital']:
        item = evidence[kind]
        if not item.get('path') or hashlib.sha256(Path(item['path']).read_bytes()).hexdigest() != item['sha256']:
            raise ValueError('Official evidence file integrity mismatch')
    if evidence['cpc']['url'] != CPC_URL or evidence['cpc']['status'] != 200:
        raise ValueError('Official compiled text required')
    # Complete all source/topic/origin and catalog checks before any mutation.
    topics, editions, sources = {}, {}, {}
    original_rows = []
    for item in items:
        row = item['row']
        ident = item['origin_candidate_id']
        original = request('question_corpus_candidates?select=*&id=eq.' + ident)
        if len(original) != 1 or original[0]['corpus_id'] != stage.SOURCE or original[0]['content_status'] not in ['reviewed', 'under_review']:
            raise RuntimeError('Origin missing, excluded or already rejected')
        original_rows.append(original[0])
        tid = row['syllabus_topic_id']
        if tid not in topics:
            [topics[tid]] = request('syllabus_topics?select=*&id=eq.' + tid)
        topic = topics[tid]
        eid = topic['edition_id']
        if eid not in editions:
            [editions[eid]] = request('syllabus_editions?select=*&id=eq.' + eid)
        edition = editions[eid]
        sid = edition['source_id']
        if sid not in sources:
            [sources[sid]] = request('content_sources?select=*&id=eq.' + sid)
        source = sources[sid]
        if (topic['content_status'] != 'current' or topic['discipline'] != row['subject']
                or edition['status'] != 'active' or row['source_id'] != sid
                or source['url'] != evidence['edital']['url']
                or not source['is_official'] or source['source_type'] != 'edital' or source['status'] != 'vigente'):
            raise RuntimeError('Official current syllabus mismatch')
    registered = request('content_sources?select=id,is_official,status&url=eq.' + urllib.parse.quote(CPC_URL, safe=''))
    if not any(r['is_official'] and r['status'] == 'vigente' for r in registered):
        raise RuntimeError('Official legal basis not registered as current')
    snapshots = {t: collect(request, t, {'select': '*' if t == 'curated_question_catalog' else fields})
                 for t, fields in stage.TABLES.items() if t != 'question_corpus_candidates'}
    current = {r['id']: r for r in snapshots['curated_question_catalog']}
    exact = {}
    for table, rows in snapshots.items():
        for row in rows:
            for text in stage.variants(table, row):
                exact.setdefault(stage.normalize(text.split('\n\n', 1)[-1]), []).append((table, row['id']))
                exact.setdefault(stage.normalize(text), []).append((table, row['id']))
    pending, preserved = [], []
    for item in items:
        row = item['row']
        if row['id'] in current:
            if not same_row(current[row['id']], row):
                raise RuntimeError('Existing adaptation differs; never overwrite')
            preserved.append(row['id'])
        else:
            text = row['question_text'].split('\n\n', 1)[-1]
            if exact.get(stage.normalize(text)):
                raise RuntimeError('Exact duplicate found; inspect before publication')
            if any(r['external_item_key'] == row['external_item_key'] for r in current.values()):
                raise RuntimeError('External identity already exists')
            pending.append(row)
    report_path = Path(report_path)
    if report_path.resolve().is_relative_to(Path(__file__).resolve().parents[2]):
        raise ValueError('Private preflight backup must remain outside Git')
    report = dict(batch_id=pack['batch_id'], applied=apply, inserted_ids=[], preserved_ids=preserved,
        original_exam_items_published=0, original_rows_modified=0, verified=False,
        compared_counts={t: len(rows) for t, rows in snapshots.items()})
    report_path.with_suffix('.preflight.json').write_text(json.dumps(dict(original_rows=original_rows, topics=topics, editions=editions, sources=sources, report=report), ensure_ascii=False, indent=2)+'\n')
    report_path.write_text(json.dumps(report, indent=2)+'\n')
    if apply:
        if pending:
            created = request('curated_question_catalog?on_conflict=id', 'POST', pending,
                              'resolution=ignore-duplicates,return=representation')
            report['inserted_ids'] = [r['id'] for r in created]
            report_path.write_text(json.dumps(report, indent=2)+'\n')
        for item in items:
            row = item['row']
            actual = request('curated_question_catalog?select=*&id=eq.' + row['id'])
            if len(actual) != 1 or not same_row(actual[0], row):
                raise RuntimeError('Published readback mismatch')
        for old in original_rows:
            actual = request('question_corpus_candidates?select=*&id=eq.' + old['id'])
            if actual != [old]:
                raise RuntimeError('Original changed during publication; inspect concurrent review')
        report['verified'] = True
    report['checked_at'] = datetime.now(timezone.utc).isoformat()
    report_path.write_text(json.dumps(report, indent=2)+'\n')
    return report


if __name__ == '__main__':
    import argparse
    import getpass
    import urllib.error
    import urllib.request
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pack', type=Path)
    parser.add_argument('report', type=Path)
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    pack = json.loads(args.pack.read_text())
    validate(pack)
    key = getpass.getpass('Supabase credential (hidden): ')

    def request(path, method='GET', body=None, prefer='return=representation'):
        req = urllib.request.Request(stage.BASE + path, method=method,
            headers={'apikey': key, 'Content-Type': 'application/json', 'Prefer': prefer},
            data=json.dumps(body, ensure_ascii=False).encode() if body is not None else None)
        try:
            with urllib.request.urlopen(req, timeout=90) as response:
                data = response.read()
                return json.loads(data) if data else None
        except urllib.error.HTTPError as exc:
            raise RuntimeError('Supabase HTTP ' + str(exc.code)) from None

    def collect(request_fn, table, params):
        return stage.collect(request_fn, table, params['select'])

    print(json.dumps(run_publication(pack, request, collect, args.report, apply=args.apply), ensure_ascii=False))
