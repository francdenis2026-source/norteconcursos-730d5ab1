"""Remove explicitly selected obsolete private candidates, with an external backup.

Usage: python remove-obsolete-corpus.py MANIFEST BACKUP REPORT [--apply]
The full question and review-history backup must remain outside the checkout.
No public catalog tables are modified. Credentials are prompted without echo.
"""
import argparse
import datetime
import getpass
import json
import os
from pathlib import Path
import re
import urllib.parse
import urllib.request


def remove(manifest, request, backup, report, apply=False):
    ids = [item['candidate_id'] for item in manifest['items']]
    if not 1 <= len(ids) <= 100 or len(set(ids)) != len(ids):
        raise ValueError('Select 1–100 distinct candidates')
    if any(not re.fullmatch('[a-f0-9]{64}', x) for x in ids + [manifest['corpus_id']]):
        raise ValueError('Invalid candidate/source identifier')
    snapshots = []
    for ident in ids:
        rows = request('question_corpus_candidates?id=eq.' + ident + '&select=*')
        if len(rows) != 1:
            raise ValueError('Missing candidate; inspect previous removal report before retrying')
        row = rows[0]
        if row['corpus_id'] != manifest['corpus_id'] or row['content_status'] != 'obsolete':
            raise ValueError('Only selected obsolete candidates from this corpus may be removed')
        if row['payload'].get('publication'):
            raise ValueError('Published content requires a separate dependency review')
        history = request('question_corpus_review_audit?candidate_id=eq.' + ident + '&select=*&order=id')
        if not history or history[-1]['next_status'] != 'obsolete':
            raise ValueError('Individual obsolete review history is required')
        snapshots.append(dict(candidate=row, history=history))
    backup = Path(backup)
    backup.parent.mkdir(parents=True, exist_ok=True)
    # Exclusive creation prevents destroying the only recovery copy on a retry.
    fd = os.open(backup, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, 'w') as stream:
        json.dump(snapshots, stream, ensure_ascii=False, indent=2)
        stream.flush()
        os.fsync(stream.fileno())
    result = dict(corpus_id=manifest['corpus_id'], selected=len(ids), removed=[],
                  complete=False, dry_run=not apply, publications=0,
                  backup_verified=json.loads(backup.read_text()) == snapshots,
                  history_policy='Exported outside database before deleting dependent audit rows',
                  checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat())
    def save():
        Path(report).write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    save()
    if not apply:
        return result
    for snapshot in snapshots:
        row, history = snapshot['candidate'], snapshot['history']
        ident = row['id']
        path = 'question_corpus_candidates?id=eq.' + ident
        if request(path + '&select=*') != [row]:
            raise ValueError('Candidate changed after backup; stopped')
        history_path = 'question_corpus_review_audit?candidate_id=eq.' + ident
        if request(history_path + '&select=*&order=id') != history:
            raise ValueError('History changed after backup; stopped')
        # The foreign key requires deleting dependent history first. Restore it
        # if candidate deletion fails; the durable external backup also survives
        # process/network interruption. This REST sequence is not a transaction.
        history_ids = ','.join(str(h['id']) for h in history)
        request(history_path + '&id=in.(' + history_ids + ')', 'DELETE')
        try:
            deleted = request(path + '&content_status=eq.obsolete&corpus_id=eq.' + manifest['corpus_id'], 'DELETE')
            if deleted != [row]:
                raise ValueError('Unexpected candidate delete result')
        except Exception:
            if request(path + '&select=id'):
                restored = [{k: v for k, v in h.items() if k != 'id'} for h in history]
                request('question_corpus_review_audit', 'POST', restored)
            raise
        if request(path + '&select=id') or request(history_path + '&select=id'):
            raise ValueError('Removal readback failed')
        result['removed'].append(ident)
        save()
    result['complete'] = True
    save()
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest'); parser.add_argument('backup'); parser.add_argument('report')
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    repo = Path(__file__).resolve().parents[2]
    if Path(args.backup).resolve().is_relative_to(repo):
        raise ValueError('Full source/history backup must be outside the repository')
    key = os.environ.get('TASK_SUPABASE_KEY') or getpass.getpass('Supabase credential (hidden): ')
    def request(path, method='GET', body=None):
        headers = {'apikey': key, 'Content-Type': 'application/json', 'Prefer': 'return=representation'}
        if key.count('.') == 2:
            headers['Authorization'] = 'Bearer ' + key
        req = urllib.request.Request('https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/' + path,
              headers=headers, method=method, data=json.dumps(body).encode() if body is not None else None)
        with urllib.request.urlopen(req, timeout=60) as response:
            data = response.read()
            return json.loads(data) if data else []
    result = remove(json.loads(Path(args.manifest).read_text()), request,
                    args.backup, args.report, args.apply)
    print(json.dumps({k: v for k, v in result.items() if k != 'removed'}, ensure_ascii=False))


if __name__ == '__main__':
    main()
