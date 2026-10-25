"""Publish the 27 bounded language originals approved in the second held batch.

All 50 decisions retain source extraction, checked paper/key provenance and blockers.
This is a single bounded release, not a general-purpose automatic approval engine.
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

spec=importlib.util.spec_from_file_location('stf',Path(__file__).with_name('release-verified-stf2008-originals.py'))
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
stage=base.stage
APPROVED=set(range(21,26))|set(range(30,49))|{67,68,69}
KEY_CONFIRMED=set(range(20,28))|set(range(30,49))|set(range(57,70))


def tokens(text):
    return [t for t in text.split() if re.fullmatch(r'\d+|[CEX+]',t)]


def parse_key_rows(text,width,total):
    """Read repeated consecutive number rows followed by equally sized answer rows."""
    tok=tokens(text);result={};cursor=0
    for start in range(1,total+1,width):
        numbers=[str(n)for n in range(start,min(start+width,total+1))]
        positions=[n for n in range(cursor,len(tok)-len(numbers)+1)if tok[n:n+len(numbers)]==numbers]
        if len(positions)!=1:raise ValueError('Ambiguous/missing final-key number row')
        pos=positions[0];answers=tok[pos+len(numbers):pos+2*len(numbers)]
        if len(answers)!=len(numbers)or any(a not in ['C','E','X','+']for a in answers):
            raise ValueError('Invalid final-key answers')
        result.update(zip(map(int,numbers),answers));cursor=pos+2*len(numbers)
    return result


def parse_grouped_key(text):
    start=text.index('FISCAL DE TRIBUTOS ESTADUAIS')
    text=text[start:text.index('CONHECIMENTOS ESPECÍFICOS',start)]
    text=re.sub(r'I\s+T\s+E\s+N\s+S', '', text)
    tok=tokens(text);header=[str(n)for n in range(1,21)]
    pos=next(n for n in range(len(tok))if tok[n:n+20]==header)+20
    rows=[]
    for subitem in range(1,6):
        if tok[pos]!=str(subitem):raise ValueError('Grouped key row lost')
        values=tok[pos+1:pos+21]
        if len(values)!=20 or any(v not in ['C','E','X','+']for v in values):raise ValueError('Invalid grouped-key cell')
        rows.append(values);pos+=21
    return {(parent,sub):rows[sub-1][parent-1]for parent in [1,2]for sub in range(1,6)}


def checked_bytes(e):
    data=Path(e['path']).read_bytes()
    if hashlib.sha256(data).hexdigest()!=e['sha256']:raise ValueError('Capture hash mismatch')
    return data


def verify(pack):
    ds=pack['decisions'];byindex={d['source_item_index_zero_based']:d for d in ds}
    if (pack['source_id']!=stage.SOURCE or len(ds)!=50 or set(byindex)!=set(range(20,70))
            or {n for n,d in byindex.items()if d['publication_approved']}!=APPROVED
            or {n for n,d in byindex.items()if d['answer_verified']}!=KEY_CONFIRMED):
        raise ValueError('Only the reviewed bounded batch is allowed')
    if len({d['origin_candidate_id']for d in ds})!=50:raise ValueError('Duplicate origin')
    groups={g['code']:g for g in pack['exam_groups']};papertext={};keys={};annulled={}
    for g in groups.values():
        cat=checked_bytes(g['catalog_evidence'])
        for kind in ['question','answer_key','changes']:
            e=g.get(kind)
            if not e:continue
            u=urllib.parse.urlsplit(e['url']);data=checked_bytes(e)
            if u.scheme!='https' or u.hostname!='cdn.cebraspe.org.br' or not data.startswith(b'%PDF'):
                raise ValueError('Official PDF required')
            if u.path.rsplit('/',1)[-1].encode()not in cat:raise ValueError('PDF absent from captured official catalog')
        t=base.pdf_text(g['question']['path']);papertext[g['code']]=stage.normalize(re.sub(r'(?m)^\s*\d+\s*$', '',t))
        if g['answer_key']:
            t=base.pdf_text(g['answer_key']['path'])
            if g['key_header']not in t or any(w not in t for w in g['key_identity_words']):raise ValueError('Wrong cargo/caderno/final key')
            if g['code']=='SEFAZ_AL2002:fiscal':keys[g['code']]=parse_grouped_key(t);annulled[g['code']]=[]
            else:
                if g['key_section_start']:
                    t=t[t.index(g['key_section_start']):]
                    t=t[:t.index(g['key_section_end'],len(g['key_section_start']))]
                keys[g['code']]=parse_key_rows(t,g['key_width'],g['key_total'])
                annulled[g['code']]=[n for n,a in keys[g['code']].items()if a in ['X','+']]
    supports={s['id']:s for s in pack['supports']}
    expected_supports=set()
    for d in ds:
        code=d.get('exam_code')
        if d['answer_verified']:
            key=(d['original_question_number'],d['original_subitem_number'])if 'original_subitem_number'in d else d['original_item_number']
            if keys[code].get(key)!=d['official_answer']or d['official_answer']not in ['C','E']:
                raise ValueError('Final key mismatch/annulled item')
            if any(stage.normalize(d[f])not in papertext[code]for f in ['official_statement','original_instruction']):
                raise ValueError('Statement or command differs from official paper')
        if d['publication_approved']:
            row=d['row'];g=groups[code]
            if (row['id']!=str(uuid.uuid5(uuid.NAMESPACE_URL,'official:'+code+':item:'+str(d['original_item_number'])))
                    or row['question_text']!=d['original_instruction']+'\n\n'+d['official_statement']
                    or row['raw_extraction']!=d['official_statement']or row['official_answer']!=d['official_answer']
                    or row['question_source_id']!=str(uuid.uuid5(uuid.NAMESPACE_URL,g['question']['url']))
                    or row['answer_key_source_id']!=str(uuid.uuid5(uuid.NAMESPACE_URL,g['answer_key']['url']))
                    or any(row[f]!=g[f]for f in ['contest_name','career_name','exam_year'])
                    or row['content_status']!='active'or row['context_review_required']or row['legal_review_required']
                    or row['subject']!='Língua Portuguesa'or row['exam_board']!='CEBRASPE'
                    or row['current_syllabus_topic_id']!='2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f'
                    or row['syllabus_topic_id']!=row['current_syllabus_topic_id']
                    or len(row['review_note'])<200 or '\n\nExemplo: 'not in row['review_note']
                    or row['support_text_id']not in supports):
                raise ValueError('Unapproved publication identity/context/coverage')
            s=supports[row['support_text_id']];expected_supports.add(s['id'])
            if (stage.normalize(s['body'])not in papertext[code]or len(s['body'])<400
                    or str(row['exam_year'])not in s['label']or 'históricos'not in s['label']):
                raise ValueError('Missing/changed complete historical support')
        elif 'row'in d or not d['remaining_blockers']:raise ValueError('Held item requires blockers and no public row')
    if set(supports)!=expected_supports:raise ValueError('Unused or missing support')
    e=pack['pf_syllabus_evidence'];checked_bytes(e)
    if 'Compreensão e interpretação de textos'not in base.pdf_text(e['path']):raise ValueError('Current syllabus evidence missing')
    checked_bytes(pack['official_archive_evidence'])
    return annulled


def desired_payload(old,d,pack):
    p=copy.deepcopy(old['payload']);r=p['individual_review']
    sources=[s for s in pack['sources']if s['exam_code']==d.get('exam_code')]
    evidence=[dict(url=s['row']['url'],title=s['row']['title'],verified=True,checked_at=pack['checked_at'],sha256=s['evidence']['sha256'])for s in sources]
    if not evidence:
        a=pack['official_archive_evidence'];evidence=[dict(url=a['url'],title=a['title'],verified=True,checked_at=pack['checked_at'],sha256=a['sha256'],scope='Official event directory only; paper/key not verified')]
    r.update(refinement_reason='Official historical paper/key correspondence checked individually; unresolved source and representation blockers retained',
        primary_evidence=evidence,reviewed_at=pack['checked_at'],review_scope='Original paper, final key, context and current syllabus assessed individually',
        answer_verified=d['answer_verified'],original_exam_answer_not_verified=not d['answer_verified'],context_complete=d['context_complete'],
        publication_approved=d['publication_approved'],current_syllabus_verified=d['publication_approved'],remaining_blockers=d['remaining_blockers'],
        official_conference_batch_id=pack['batch_id'])
    for f in ['original_item_number','original_question_number','original_subitem_number','official_answer','exam_code']:
        if f in d:r[f]=d[f]
    if d['answer_verified']:r['official_exam_answer']=d['official_answer']
    if d['publication_approved']:
        row=d['row'];main,example=row['review_note'].split('\n\nExemplo: ',1)
        p.update(author_commentary=main,author_example=example)
        r.update(explanation=main,example=example,technical_answer_candidate=row['official_answer'])
        p['publication']=dict(table='official_exam_questions',id=row['id'],original_exam=True,
            question_source_id=row['question_source_id'],answer_key_source_id=row['answer_key_source_id'],
            original_item_number=row['item_number'],current_syllabus_topic_id=row['current_syllabus_topic_id'],checked_at=pack['checked_at'])
    return p


def release(pack,request,report_path,apply=False):
    annulled=verify(pack);report_path=Path(report_path)
    if report_path.resolve().is_relative_to(Path(__file__).resolve().parents[2]):raise ValueError('Backup outside Git required')
    ds=pack['decisions'];ids=','.join(d['origin_candidate_id']for d in ds)
    rows=request('question_corpus_candidates?select=*&id=in.('+ids+')');actual={r['id']:r for r in rows};desired={}
    if len(actual)!=50:raise RuntimeError('Missing source candidates')
    for d in ds:
        old=actual[d['origin_candidate_id']];want=desired_payload(old,d,pack)
        if old['corpus_id']!=pack['source_id']or old['content_status']!='reviewed':raise RuntimeError('Changed review status')
        if old['payload']!=want and (old['payload'].get('publication')or old['payload']['individual_review'].get('publication_approved')is not False):
            raise RuntimeError('Published/prior approval protected')
        desired[old['id']]=want
    topic='2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f'
    [t]=request('syllabus_topics?select=*&id=eq.'+topic)
    [edition]=request('syllabus_editions?select=*&id=eq.'+pack['current_edition_id'])
    [edital]=request('content_sources?select=*&id=eq.'+pack['current_edital_source_id'])
    if (t['edition_id']!=edition['id']or t['content_status']!='current'or t['discipline']!='Língua Portuguesa'
            or edition['status']!='active'or edition['source_id']!=edital['id']or not edital['is_official']
            or edital['status']!='vigente'or edital['url']!=pack['pf_syllabus_evidence']['url']):raise RuntimeError('Current syllabus/source changed')
    public=[d['row']for d in ds if d['publication_approved']];own_ids={r['id']for r in public};counts={};exact={};identities={}
    for table,fields in stage.TABLES.items():
        if table=='question_corpus_candidates':fields='id,corpus_id,content_status,question_text:payload->>question_text_candidate,stem:payload->>stem'
        if table=='official_exam_questions':fields+=',contest_name,career_name,exam_year,item_number'
        catalog=stage.collect(request,table,fields);counts[table]=len(catalog)
        for r in catalog:
            if table=='official_exam_questions':identities[(r['contest_name'],r['career_name'],r['exam_year'],r['item_number'])]=r['id']
            if (table=='question_corpus_candidates'and r['id']in actual)or(table=='official_exam_questions'and r['id']in own_ids):continue
            variants=[r.get('question_text'),r.get('stem')]if table=='question_corpus_candidates'else stage.variants(table,r)
            for text in variants:
                if text:exact.setdefault(stage.normalize(text),[]).append((table,r['id']))
    for d in ds:
        if not d['publication_approved']:continue
        row=d['row'];old=actual[d['origin_candidate_id']]
        variants=[row['question_text'],row['raw_extraction'],old['payload'].get('question_text_candidate','')]
        if any(stage.normalize(v)in exact for v in variants if v):raise RuntimeError('Duplicate requires individual resolution')
        identity=tuple(row[k]for k in ['contest_name','career_name','exam_year','item_number'])
        if identity in identities and identities[identity]!=row['id']:raise RuntimeError('Existing exam identity protected')
    planned=[]
    for table,values in [('content_sources',[s['row']for s in pack['sources']]),('question_support_texts',pack['supports']),('official_exam_questions',public)]:
        for want in values:
            found=request(table+'?select=*&id=eq.'+want['id']);staged=dict(want,content_status='under_review')if table=='official_exam_questions'else want
            if found and not(base.same(found[0],want)or base.same(found[0],staged)):raise RuntimeError('Existing source/support/public revision protected')
            planned.append((table,want,bool(found)))
    report=dict(batch_id=pack['batch_id'],apply=apply,complete=False,decisions=50,official_keys_confirmed=40,
        approved=27,retained=23,compared_counts=counts,annulled_by_exam=annulled,private_refined_ids=[],published_ids=[])
    backup=report_path.with_suffix('.preflight.json')
    if not backup.exists():backup.write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
    def save():report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    save()
    if apply:
        for table,want,exists in planned:
            if not exists:
                staged=dict(want,content_status='under_review')if table=='official_exam_questions'else want
                request(table+'?on_conflict=id','POST',[staged],'resolution=ignore-duplicates,return=representation')
        for d in ds:
            ident=d['origin_candidate_id'];old=actual[ident]
            if old['payload']!=desired[ident]:
                result=request('rpc/refine_held_corpus_candidate','POST',dict(candidate=ident,expected_status='reviewed',expected_payload=old['payload'],next_status='reviewed',next_payload=desired[ident]))
                if result not in ['updated','unchanged']:raise RuntimeError('Audited refinement failed')
            report['private_refined_ids'].append(ident);save()
        for d in ds:
            if not d['publication_approved']:continue
            row=d['row'];ident=d['origin_candidate_id']
            [private]=request('question_corpus_candidates?select=*&id=eq.'+ident)
            base.assert_publication_approval(private['payload'],desired[ident],row)
            [observed]=request('official_exam_questions?select=*&id=eq.'+row['id'])
            if not base.same(observed,row):
                if not base.same(observed,dict(row,content_status='under_review')):raise RuntimeError('Concurrent staged revision protected')
                fields=['id','content_status','question_text','official_answer','review_note','verified_at','support_text_id','question_source_id','answer_key_source_id','current_syllabus_topic_id']
                filters=urllib.parse.urlencode({k:'eq.'+str(observed[k])for k in fields})
                changed=request('official_exam_questions?'+filters,'PATCH',dict(content_status='active'))
                if len(changed)!=1 or not base.same(changed[0],row):raise RuntimeError('Activation conflict')
            report['published_ids'].append(row['id']);save()
        for table,want,exists in planned:
            [fresh]=request(table+'?select=*&id=eq.'+want['id'])
            if not base.same(fresh,want):raise RuntimeError('Final public/source/support readback mismatch')
        after=request('question_corpus_candidates?select=*&id=in.('+ids+')')
        if len(after)!=50 or any(r['payload']!=desired[r['id']]or r['content_status']!='reviewed'for r in after):raise RuntimeError('Private readback mismatch')
    report['complete']=True;save();return report


if __name__=='__main__':
    import argparse
    import getpass
    import urllib.error
    import urllib.request
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pack',type=Path)
    parser.add_argument('report',type=Path)
    parser.add_argument('--apply',action='store_true')
    args=parser.parse_args()
    pack=json.loads(args.pack.read_text());verify(pack)
    credential=getpass.getpass('Supabase credential (hidden): ')
    def request(path,method='GET',body=None,prefer='return=representation'):
        req=urllib.request.Request(stage.BASE+path,method=method,
            headers={'apikey':credential,'Content-Type':'application/json','Prefer':prefer},
            data=json.dumps(body,ensure_ascii=False).encode()if body is not None else None)
        try:
            with urllib.request.urlopen(req,timeout=90)as response:
                data=response.read();return json.loads(data)if data else None
        except urllib.error.HTTPError as exc:
            raise RuntimeError('Supabase HTTP '+str(exc.code))from None
    print(json.dumps(release(pack,request,args.report,args.apply),ensure_ascii=False))
