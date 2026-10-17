"""Release the seven specifically reviewed original STF/2008 language items.

Official documents and final-key checks precede every mutation. Public rows are
staged under_review; private audited approval precedes activation. No adaptations.
"""
import copy
from datetime import datetime
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import urllib.parse
import uuid
import pymupdf

spec=importlib.util.spec_from_file_location('stage',Path(__file__).with_name('stage-cespe2016-supplement.py'))
stage=importlib.util.module_from_spec(spec);spec.loader.exec_module(stage)
ALLOWED={4:'E',10:'C',11:'E',13:'E',14:'C',17:'E',23:'C'}
CONFIRMED={4,8,9,10,11,12,13,14,17,23}


def parse_final_key(text):
    lines=[s.strip() for s in text.splitlines() if s.strip()]
    result={}
    for base in range(1,121,20):
        pos=lines.index(str(base))
        if lines[pos:pos+20]!=[str(n) for n in range(base,base+20)]:
            raise ValueError('Unexpected final key numbering')
        answers=lines[pos+20:pos+40]
        if len(answers)!=20 or any(a not in ['C','E','X'] for a in answers):
            raise ValueError('Unexpected final key row')
        result.update(zip(range(base,base+20),answers))
    return result


def validate(pack, keys=None, annulled=None):
    numbers={i['row']['item_number'] for i in pack['items']}
    if numbers!=set(ALLOWED) or len(pack['items'])!=7 or len(pack['supports'])!=3:
        raise ValueError('Only seven individually approved originals are allowed')
    supports={s['id'] for s in pack['supports']}
    sources={s['kind']:s['row']['id']for s in pack['sources']}
    confirmed={i['original_item_number']:i for i in pack['confirmed_originals']}
    if set(sources)!={'question','answer_key','changes'} or pack['source_id']!=stage.SOURCE:
        raise ValueError('Official source provenance required')
    for item in pack['items']:
        row=item['row'];n=row['item_number']
        if (row['official_answer']!=ALLOWED[n] or row['exam_year']!=2008
                or row['id']!=str(uuid.uuid5(uuid.NAMESPACE_URL,'official:STF2008:cargo15:item:'+str(n)))
                or row['question_source_id']!=sources['question'] or row['answer_key_source_id']!=sources['answer_key']
                or row['syllabus_topic_id']!=row['current_syllabus_topic_id']
                or confirmed[n]['origin_candidate_id']!=item['origin_candidate_id']
                or row['question_text']!=item['original_instruction']+'\n\n'+item['official_statement']
                or row['exam_board']!='CEBRASPE' or row['subject']!='Língua Portuguesa'
                or row['career_name']!='Técnico Judiciário — Área Administrativa'
                or row['support_text_id'] not in supports or row['context_review_required']
                or row['legal_review_required'] or row['content_status']!='active'
                or not row['current_syllabus_topic_id'] or 'Exemplo:' not in row['review_note']):
            raise ValueError('Invalid original identity, context or approval')
        if keys is not None and (keys.get(n)!=row['official_answer'] or n in (annulled or set())):
            raise ValueError('Final key mismatch or annulled item')
    if {i['original_item_number'] for i in pack['confirmed_originals']}!=CONFIRMED:
        raise ValueError('Ten original correspondences required')
    if keys is not None and any(keys.get(i['original_item_number'])!=i['official_answer'] or i['original_item_number'] in (annulled or set()) for i in pack['confirmed_originals']):
        raise ValueError('Unconfirmed or annulled correspondence')


def pdf_text(path):
    with pymupdf.open(path)as document:
        return '\n'.join(page.get_text()for page in document)


def verify_documents(pack):
    texts={}
    for item in pack['sources']:
        row,e=item['row'],item['evidence'];url=urllib.parse.urlsplit(row['url'])
        data=Path(e['path']).read_bytes();catalog=Path(e['catalog_path']).read_bytes()
        if (url.scheme!='https' or url.hostname!='cdn.cebraspe.org.br'
                or not url.path.startswith('/concursos/STF2008/arquivos/')
                or not data.startswith(b'%PDF') or hashlib.sha256(data).hexdigest()!=e['sha256']
                or hashlib.sha256(catalog).hexdigest()!=e['catalog_sha256']
                or not e['visually_verified'] or url.path.split('/')[-1].encode() not in catalog):
            raise ValueError('Official capture/catalog integrity mismatch')
        texts[item['kind']]=pdf_text(e['path'])
    keytext=texts['answer_key']
    if not all(word in keytext for word in ['DEFINITIVOS','CARGO 15','ADMINISTRATIVA']):
        raise ValueError('Final Cargo 15 key required')
    keys=parse_final_key(keytext)
    notice=texts['changes'];start=notice.index('CARGO 15:');end=notice.index('CARGO 16:',start)
    annulled={int(n) for n in re.findall(r'ITEM\s+(\d+)\s*[–-]\s*anulado',notice[start:end],re.I)}
    if annulled!={n for n,a in keys.items()if a=='X'}:
        raise ValueError('Notice and final key annulments disagree')
    validate(pack,keys,annulled)
    normalized=stage.normalize(re.sub(r'(?m)^\d+\s*$', '', texts['question']))
    for support in pack['supports']:
        if stage.normalize(support['body']) not in normalized:
            raise ValueError('Support text differs from official paper')
    for item in pack['items']:
        if any(stage.normalize(item[key]) not in normalized for key in ['official_statement','original_instruction']):
            raise ValueError('Question differs from official paper')
    e=pack['pf_syllabus_evidence']
    if hashlib.sha256(Path(e['path']).read_bytes()).hexdigest()!=e['sha256']:
        raise ValueError('Current syllabus capture changed')
    if 'Compreensão e interpretação de textos' not in pdf_text(e['path']):
        raise ValueError('Current syllabus language topic not found')
    return keys,annulled


def same(actual, desired):
    if not actual:return False
    for key,value in desired.items():
        observed=actual.get(key)
        if key in ['checked_at','verified_at'] and value is not None:
            if not observed or datetime.fromisoformat(observed)!=datetime.fromisoformat(value):return False
        elif observed!=value:return False
    return True


def desired_private(old, confirmation, published, pack):
    payload=copy.deepcopy(old['payload']);review=payload['individual_review']
    row=published.get(confirmation['original_item_number'])
    review.update(refinement_reason='Official Cargo 15 paper, final key, context and change notice located and cross-checked',
        primary_evidence=pack['primary_evidence'],answer_verified=True,original_exam_answer_not_verified=False,
        original_item_number=confirmation['original_item_number'],official_exam_answer=confirmation['official_answer'],
        context_complete=True,publication_approved=bool(row),current_syllabus_verified=bool(row),
        reviewed_at=pack['checked_at'],review_scope='Original exam correspondence and final key verified; publication individually assessed')
    if row:
        main,example=row['review_note'].split('\n\nExemplo: ',1)
        payload.update(author_commentary=main,author_example=example)
        review.update(explanation=main,example=example,remaining_blockers=[])
        payload['publication']=dict(table='official_exam_questions',id=row['id'],
            original_exam=True,question_source_id=row['question_source_id'],answer_key_source_id=row['answer_key_source_id'],
            original_item_number=row['item_number'],current_syllabus_topic_id=row['current_syllabus_topic_id'],checked_at=pack['checked_at'])
    else:
        review['remaining_blockers']=['Historical education/current-affairs or legal claim still requires individual domain review',
                                      'Individual classification and current syllabus mapping not approved']
    return payload


def assert_publication_approval(actual, desired, public_row):
    if (actual!=desired or actual.get('individual_review',{}).get('publication_approved')is not True
            or actual.get('publication',{}).get('id')!=public_row['id']):
        raise RuntimeError('Audited private approval required before activation')


def release(pack, request, report_path, apply=False):
    keys,annulled=verify_documents(pack)
    report_path=Path(report_path)
    if report_path.resolve().is_relative_to(Path(__file__).resolve().parents[2]):
        raise ValueError('Private backup/report must stay outside Git')
    ids=','.join(i['origin_candidate_id'] for i in pack['confirmed_originals'])
    originals=request('question_corpus_candidates?select=*&id=in.('+ids+')')
    byid={r['id']:r for r in originals};published={i['row']['item_number']:i['row']for i in pack['items']}
    desired={}
    for item in pack['confirmed_originals']:
        row=byid.get(item['origin_candidate_id'])
        if not row or row['corpus_id']!=pack['source_id'] or row['content_status']!='reviewed':
            raise RuntimeError('Original not in held review state')
        want=desired_private(row,item,published,pack);desired[row['id']]=want
        if row['payload']!=want and (row['payload'].get('publication') or row['payload']['individual_review'].get('publication_approved')is not False):
            raise RuntimeError('Prior published/private approval is protected')
    tids=','.join(sorted({r['current_syllabus_topic_id']for r in published.values()}))
    topics=request('syllabus_topics?select=*&id=in.('+tids+')')
    if len(topics)!=2 or any(t['edition_id']!=pack['current_edition_id'] or t['content_status']!='current' or t['discipline']!='Língua Portuguesa' for t in topics):
        raise RuntimeError('Current topic mismatch')
    [edition]=request('syllabus_editions?select=*&id=eq.'+pack['current_edition_id'])
    [edital]=request('content_sources?select=*&id=eq.'+pack['current_edital_source_id'])
    if (edition['status']!='active' or edition['source_id']!=edital['id'] or not edital['is_official']
            or edital['status']!='vigente' or edital['url']!=pack['pf_syllabus_evidence']['url']):
        raise RuntimeError('Official active current syllabus required')
    planned=[]
    for table,rows in [('content_sources',[s['row']for s in pack['sources']]),('question_support_texts',pack['supports']),('official_exam_questions',list(published.values()))]:
        for row in rows:
            actual=request(table+'?select=*&id=eq.'+row['id'])
            staged=dict(row,content_status='under_review')if table=='official_exam_questions'else row
            if actual and not (same(actual[0],row) or same(actual[0],staged)):
                raise RuntimeError('Existing source/support/question differs; preserve')
            planned.append((table,row,bool(actual)))
    counts={};exact={}
    for table,fields in stage.TABLES.items():
        if table=='question_corpus_candidates':fields='id,corpus_id,content_status,question_text:payload->>question_text_candidate,stem:payload->>stem'
        rows=stage.collect(request,table,fields);counts[table]=len(rows)
        for row in rows:
            if row['id']in byid or row['id']in {r['id']for r in published.values()}:continue
            variants=[row.get('question_text'),row.get('stem')]if table=='question_corpus_candidates'else stage.variants(table,row)
            for text in variants:
                if text:exact.setdefault(stage.normalize(text),[]).append((table,row['id']))
    for row in published.values():
        if stage.normalize(row['raw_extraction'])in exact:raise RuntimeError('Exact duplicate requires individual assessment')
    report=dict(batch_id=pack['batch_id'],apply=apply,complete=False,confirmed_originals=10,published_ids=[],
        retained_originals=3,compared_counts=counts,annulled_items_in_final_key=sorted(annulled),private_refined_ids=[])
    backup=report_path.with_suffix('.preflight.json')
    if not backup.exists():backup.write_text(json.dumps(originals,ensure_ascii=False,indent=2)+'\n')
    def save():report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    save()
    if apply:
        for table,row,exists in planned:
            if not exists:
                value=dict(row,content_status='under_review')if table=='official_exam_questions'else row
                request(table+'?on_conflict=id','POST',[value],'resolution=ignore-duplicates,return=representation')
        for confirmation in pack['confirmed_originals']:
            ident=confirmation['origin_candidate_id'];old=byid[ident]
            if old['payload']!=desired[ident]:
                result=request('rpc/refine_held_corpus_candidate','POST',dict(candidate=ident,expected_status='reviewed',
                    expected_payload=old['payload'],next_status='reviewed',next_payload=desired[ident]))
                if result not in ['updated','unchanged']:raise RuntimeError('Refinement failed')
            report['private_refined_ids'].append(ident);save()
        for row in published.values():
            origin=next(i['origin_candidate_id']for i in pack['confirmed_originals']if i['original_item_number']==row['item_number'])
            [approved]=request('question_corpus_candidates?select=*&id=eq.'+origin)
            assert_publication_approval(approved['payload'],desired[origin],row)
            [actual]=request('official_exam_questions?select=*&id=eq.'+row['id'])
            if not same(actual,row):
                if not same(actual,dict(row,content_status='under_review')):raise RuntimeError('Concurrent staged question changed')
                fields=['id','content_status','question_text','official_answer','review_note','verified_at','support_text_id']
                filters=urllib.parse.urlencode({k:'eq.'+str(actual[k])for k in fields})
                changed=request('official_exam_questions?'+filters,'PATCH',dict(content_status='active'))
                if len(changed)!=1 or not same(changed[0],row):raise RuntimeError('Activation conflict')
            report['published_ids'].append(row['id']);save()
        for table,row,exists in planned:
            [fresh]=request(table+'?select=*&id=eq.'+row['id'])
            if not same(fresh,row):raise RuntimeError('Final public/source readback mismatch')
        for ident,payload in desired.items():
            [fresh]=request('question_corpus_candidates?select=*&id=eq.'+ident)
            if fresh['payload']!=payload:raise RuntimeError('Private approval readback mismatch')
    report['complete']=True;save();return report


def restore_official_instructions(pack, previous_rows, request, report_path):
    """Only add the verified original command; preserve published text/key/source."""
    verify_documents(pack)
    previous={r['id']:r for r in previous_rows};pending=[]
    for item in pack['items']:
        want=item['row'];old=previous[want['id']]
        if old['question_text']!=item['official_statement'] or any(old[k]!=v for k,v in want.items()if k!='question_text'):
            raise ValueError('Instruction restoration cannot alter original statement or other fields')
        [actual]=request('official_exam_questions?select=*&id=eq.'+want['id'])
        if same(actual,want):continue
        if not same(actual,old):raise RuntimeError('Concurrent published revision; preserve')
        pending.append((old,want))
    report=dict(restored_ids=[],complete=False)
    for old,want in pending:
        filters=urllib.parse.urlencode({k:'eq.'+str(old[k])for k in ['id','question_text','official_answer','verified_at','content_status']})
        changed=request('official_exam_questions?'+filters,'PATCH',dict(question_text=want['question_text']))
        if len(changed)!=1 or not same(changed[0],want):raise RuntimeError('Instruction readback mismatch')
        report['restored_ids'].append(want['id'])
        Path(report_path).write_text(json.dumps(report,indent=2)+'\n')
    report['complete']=True;Path(report_path).write_text(json.dumps(report,indent=2)+'\n');return report


if __name__=='__main__':
    import argparse
    import getpass
    import urllib.request
    import urllib.error
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pack',type=Path);parser.add_argument('report',type=Path)
    parser.add_argument('--apply',action='store_true');args=parser.parse_args()
    pack=json.loads(args.pack.read_text());validate(pack)
    key=getpass.getpass('Supabase credential (hidden): ')
    def request(path,method='GET',body=None,prefer='return=representation'):
        req=urllib.request.Request(stage.BASE+path,method=method,
            headers={'apikey':key,'Content-Type':'application/json','Prefer':prefer},
            data=json.dumps(body,ensure_ascii=False).encode()if body is not None else None)
        try:
            with urllib.request.urlopen(req,timeout=90)as response:
                data=response.read();return json.loads(data)if data else None
        except urllib.error.HTTPError as exc:
            raise RuntimeError('Supabase HTTP '+str(exc.code))from None
    print(json.dumps(release(pack,request,args.report,args.apply),ensure_ascii=False))
