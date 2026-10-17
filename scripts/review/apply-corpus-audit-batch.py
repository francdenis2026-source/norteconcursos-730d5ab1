"""Apply a private corpus audit through the compare-and-set review RPC.

Usage: python scripts/review/apply-corpus-audit-batch.py PACK REPORT [--dry-run]
Use TASK_SUPABASE_KEY or the hidden credential prompt. Never publishes questions.
"""
import argparse
import copy
import datetime
import getpass
import hashlib
import json
import os
import pathlib
import re
import urllib.error
import urllib.parse
import urllib.request


def fingerprint(value):
    return hashlib.sha256(json.dumps(value, ensure_ascii=False, sort_keys=True,
                                     separators=(',', ':')).encode()).hexdigest()


def validate(pack):
    if not pack.get('batch_id') or not pack.get('items'):
        raise ValueError('Nonempty identified batch required')
    seen = set()
    now = datetime.datetime.now(datetime.timezone.utc)
    for item in pack['items']:
        ident = item['candidate_id']
        if not re.fullmatch('[a-f0-9]{64}', ident) or ident in seen:
            raise ValueError('Invalid or repeated candidate')
        seen.add(ident)
        for key in ['corpus_id', 'expected_payload_sha256', 'raw_text_sha256']:
            if not re.fullmatch('[a-f0-9]{64}', item[key]):
                raise ValueError('Source and preflight fingerprints required')
        if item['expected_status'] != 'under_review' or item['next_status'] not in ['obsolete', 'reviewed']:
            raise ValueError('Only pending private candidates may be reviewed')
        if len(item['explanation'].strip()) < 200 or len(item['example'].strip()) < 50:
            raise ValueError('Individual explanation and example required')
        if not item.get('reason') or not item.get('evidence'):
            raise ValueError('Individual reason and official evidence required')
        for evidence in item['evidence']:
            url = urllib.parse.urlsplit(evidence['url'])
            stamp = datetime.datetime.fromisoformat(evidence['checked_at'].replace('Z', '+00:00'))
            if (url.scheme != 'https' or url.hostname not in ['www.planalto.gov.br', 'planalto.gov.br']
                    or url.username or not evidence['reference'].strip()
                    or not re.fullmatch('[a-f0-9]{64}', evidence['sha256'])
                    or stamp.tzinfo is None or stamp > now):
                raise ValueError('Dated official statutory evidence required')


def next_payload(actual, item):
    payload = copy.deepcopy(actual['payload'])
    payload['author_commentary'] = item['explanation']
    payload['author_example'] = item['example']
    payload['individual_review'] = dict(
        publication_approved=False,
        explanation=item['explanation'], example=item['example'], reason=item['reason'],
        reviewed_at=item['evidence'][0]['checked_at'],
        legal_current=item['next_status'] == 'reviewed',
        answer_verified=False, context_complete=False,
        original_exam_answer_not_verified=True,
        primary_evidence=[dict(e, verified=True, title='CPC/2015 — texto oficial do Planalto')
                          for e in item['evidence']],
        batch_id=item['batch_id'],
        remaining_blockers=['Conferir prova e gabarito definitivo oficial',
                            'Confirmar contexto, figuras e segmentação',
                            'Conferir vínculo individual ao edital vigente antes de publicar'])
    return payload


def apply_batch(pack, request, report_path, dry_run=False):
    validate(pack)
    pending = []
    unchanged = []
    for item in pack['items']:
        item = {**item, 'batch_id': pack['batch_id']}
        rows = request('question_corpus_candidates?id=eq.' + item['candidate_id'] + '&select=*')
        if len(rows) != 1:
            raise ValueError('Missing candidate: ' + item['candidate_id'])
        row = rows[0]
        if row['payload'].get('publication'):
            raise ValueError('Publication payload is outside private review scope')
        if row['corpus_id'] != item['corpus_id'] or row['source_page'] != item['source_page']:
            raise ValueError('Source identity differs')
        if hashlib.sha256(row['payload']['raw_text'].encode()).hexdigest() != item['raw_text_sha256']:
            raise ValueError('Immutable source text differs')
        desired = next_payload(row, item)
        if row['content_status'] == item['next_status'] and row['payload'] == desired:
            unchanged.append(item['candidate_id'])
            continue
        if row['content_status'] != item['expected_status'] or fingerprint(row['payload']) != item['expected_payload_sha256']:
            raise ValueError('Concurrent review; reload candidate: ' + item['candidate_id'])
        pending.append((item, row, desired))
    report = dict(batch_id=pack['batch_id'], dry_run=dry_run, complete=False,
                  updated=[], unchanged=unchanged, pending=len(pending), publications=0,
                  full_editorial_audit_complete=False)
    def save():
        pathlib.Path(report_path).write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    save()
    if not dry_run:
        for item, row, desired in pending:
            result = request('rpc/review_corpus_candidate', 'POST', dict(
                candidate=row['id'], expected_status=row['content_status'], expected_payload=row['payload'],
                next_status=item['next_status'], next_payload=desired))
            if result not in ['updated', 'unchanged']:
                raise ValueError('Unexpected review RPC result')
            fresh = request('question_corpus_candidates?id=eq.' + row['id'] + '&select=*')
            if len(fresh) != 1 or fresh[0]['content_status'] != item['next_status'] or fresh[0]['payload'] != desired:
                raise ValueError('Review readback mismatch')
            report[result].append(row['id'])
            report['pending'] -= 1
            save()
    report['complete'] = True
    save()
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pack'); parser.add_argument('report')
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    pack = json.loads(pathlib.Path(args.pack).read_text())
    validate(pack)
    key = os.environ.get('TASK_SUPABASE_KEY') or getpass.getpass('Supabase credential (hidden): ')
    base = 'https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/'
    def request(path, method='GET', body=None):
        headers = {'apikey': key, 'Content-Type': 'application/json'}
        if re.fullmatch(r'[\w-]+\.[\w-]+\.[\w-]+', key):
            headers['Authorization'] = 'Bearer ' + key
        req = urllib.request.Request(base + path, method=method, headers=headers,
                                     data=json.dumps(body, ensure_ascii=False).encode() if body is not None else None)
        try:
            with urllib.request.urlopen(req, timeout=60) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            raise RuntimeError('Supabase HTTP ' + str(error.code)) from None
    print(json.dumps(apply_batch(pack, request, args.report, args.dry_run), ensure_ascii=False))


if __name__ == '__main__':
    main()
