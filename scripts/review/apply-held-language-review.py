"""Store individually written technical reviews privately; never publish.

Usage: python apply-held-language-review.py PACK REPORT [--apply]
Publication approvals, original text/key updates and existing decisions are forbidden.
"""
import argparse
import copy
from datetime import datetime, timezone
import getpass
import hashlib
import json
from pathlib import Path
import re
import urllib.error
import urllib.request

SOURCE = 'cd1bd6a9eb5e62e0cf6b5ae0be4d5f332b968432c419733878d30956d45ec705'


def validate(pack):
    if (pack.get('source_id') != SOURCE or not 1 <= len(pack['items']) <= 100
            or pack.get('publications') != 0 or pack.get('official_final_keys_confirmed') != 0):
        raise ValueError('Private bounded technical review required')
    seen = set()
    for item in pack['items']:
        if (item['candidate_id'] in seen or not re.fullmatch('[a-f0-9]{64}', item['candidate_id'])
                or item['corpus_id'] != SOURCE or not 1 <= item['source_page'] <= 510
                or not re.fullmatch('[a-f0-9]{64}', item['expected_raw_text_sha256'])
                or item['technical_answer_candidate'] not in [None, 'C', 'E', 'A', 'B', 'D']
                or len(item['explanation']) < 200 or len(item['example']) < 50
                or not item['remaining_blockers'] or item['source_evidence']['is_official_exam_key'] is not False
                or item['source_evidence']['source_pdf_sha256'] != SOURCE):
            raise ValueError('Invalid individual technical analysis')
        seen.add(item['candidate_id'])
    if datetime.fromisoformat(pack['checked_at']) > datetime.now(timezone.utc):
        raise ValueError('Future review date')


def next_payload(row, item, pack):
    payload = copy.deepcopy(row['payload'])
    payload['author_commentary'] = item['explanation']
    payload['author_example'] = item['example']
    payload['individual_review'] = dict(batch_id=pack['batch_id'], reviewed_at=pack['checked_at'],
        publication_approved=False, review_scope='Individual technical language review; historical original remains held',
        technical_commentary_complete=True, technical_answer_candidate=item['technical_answer_candidate'],
        explanation=item['explanation'], example=item['example'],
        answer_verified=False, original_exam_answer_not_verified=True,
        context_complete=False, current_syllabus_verified=False,
        source_evidence=item['source_evidence'], support_reference=item.get('support_reference'),
        remaining_blockers=item['remaining_blockers'])
    return payload


def apply(pack, request, report_path, apply_writes=False):
    validate(pack)
    report_path = Path(report_path)
    if report_path.resolve().is_relative_to(Path(__file__).resolve().parents[2]):
        raise ValueError('Private preflight backup must stay outside Git')
    ids = ','.join(i['candidate_id'] for i in pack['items'])
    rows = request('question_corpus_candidates?select=*&id=in.(' + ids + ')')
    actual = {r['id']: r for r in rows}
    pending, preserved = [], []
    for item in pack['items']:
        row = actual.get(item['candidate_id'])
        if (not row or row['corpus_id'] != SOURCE or row['discipline'] != 'Língua Portuguesa' or row['source_page'] != item['source_page']
                or hashlib.sha256(row['payload']['raw_text'].encode()).hexdigest() != item['expected_raw_text_sha256']
                or 'publication' in row['payload']):
            raise RuntimeError('Missing, changed or published source; inspect before writing')
        desired = next_payload(row, item, pack)
        if row['content_status'] == 'reviewed' and row['payload'] == desired:
            preserved.append(row['id'])
            continue
        if row['content_status'] != 'under_review' or row['payload'].get('individual_review'):
            raise RuntimeError('Existing review is protected')
        pending.append((row, desired))
    report = dict(batch_id=pack['batch_id'], apply=apply_writes, complete=False,
        updated=[], preserved=preserved, detailed_reviews=len(pack['items']), publications=0,
        official_final_keys_confirmed=0, publication_approved=False)
    backup = report_path.with_suffix('.preflight.json')
    if not backup.exists():
        backup.write_text(json.dumps(rows, ensure_ascii=False, indent=2)+'\n')
    def save():
        report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
    save()
    if apply_writes:
        for row, desired in pending:
            result = request('rpc/review_corpus_candidate', 'POST', dict(candidate=row['id'],
                expected_status=row['content_status'], expected_payload=row['payload'],
                next_status='reviewed', next_payload=desired))
            if result not in ['updated', 'unchanged']:
                raise RuntimeError('Unexpected review RPC response')
            report['updated' if result == 'updated' else 'preserved'].append(row['id'])
            save()
        after = request('question_corpus_candidates?select=*&id=in.(' + ids + ')')
        by_id = {r['id']: r for r in after}
        for item in pack['items']:
            row = by_id.get(item['candidate_id'])
            if not row or row['content_status'] != 'reviewed' or row['payload'] != next_payload(actual[item['candidate_id']], item, pack):
                raise RuntimeError('Review readback mismatch')
    report['complete'] = True
    save()
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pack', type=Path); parser.add_argument('report', type=Path)
    parser.add_argument('--apply', action='store_true'); args = parser.parse_args()
    pack = json.loads(args.pack.read_text()); validate(pack)
    key = getpass.getpass('Supabase credential (hidden): ')
    def request(path, method='GET', body=None):
        req = urllib.request.Request('https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/'+path,
            method=method, headers={'apikey': key, 'Content-Type': 'application/json'},
            data=json.dumps(body, ensure_ascii=False).encode() if body is not None else None)
        try:
            with urllib.request.urlopen(req, timeout=60) as response:
                return json.loads(response.read())
        except urllib.error.HTTPError as exc:
            raise RuntimeError('Supabase HTTP '+str(exc.code)) from None
    print(json.dumps(apply(pack, request, args.report, args.apply), ensure_ascii=False))
