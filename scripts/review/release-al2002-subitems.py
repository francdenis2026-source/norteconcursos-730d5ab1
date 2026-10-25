"""Release nine verified original SEFAZ/AL 2002 subitems with compound identity.

The existing imported catalog accepts textual external keys; is_original=false
means the wording is not authored. No synthetic integer item numbers are used.
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

spec=importlib.util.spec_from_file_location('held',Path(__file__).with_name('release-held-language-originals.py'))
held=importlib.util.module_from_spec(spec);spec.loader.exec_module(held)
base=held.base;stage=held.stage
APPROVED={57,58,60,61,62,63,64,65,66}
CODE='SEFAZ_AL2002:fiscal'
TOPICS={1:'2ab9d0f8-22f6-467b-bb30-cd0c5cff4b7f',2:'5873244d-48e6-4241-a474-b5db3317d27f'}
uid=lambda x:str(uuid.uuid5(uuid.NAMESPACE_URL,x))


def public_text(pack,d):
    return (f'Texto-base [{pack["support_label"]}]:\n{pack["support_body"]}\n\n[[/texto-base]]\n'
            f'Questão {d["original_question_number"]} — Subitem {d["original_subitem_number"]} (original SEFAZ/AL, 2002).\n\n'
            +d['original_instruction']+'\n\n'+d['official_statement'])


def verify(pack):
    ds=pack['decisions'];g=pack['exam']
    if (pack['source_id']!=stage.SOURCE or g['code']!=CODE or len(ds)!=10
            or {d['source_item_index_zero_based']for d in ds}!=set(range(57,67))
            or {d['source_item_index_zero_based']for d in ds if d['publication_approved']}!=APPROVED):
        raise ValueError('Only the nine approved original subitems are allowed')
    if len({d['origin_candidate_id']for d in ds})!=10:raise ValueError('Duplicate origin')
    catalog=held.checked_bytes(g['catalog_evidence'])
    for kind in ['question','answer_key']:
        e=g[kind];u=urllib.parse.urlsplit(e['url']);data=held.checked_bytes(e)
        if (u.scheme!='https'or u.hostname!='cdn.cebraspe.org.br'or not data.startswith(b'%PDF')
                or not u.path.startswith('/concursos/_antigos/2002/sefaz/arquivos/')
                or u.path.rsplit('/',1)[-1].encode()not in catalog):raise ValueError('Official capture/catalog required')
    keytext=base.pdf_text(g['answer_key']['path'])
    if 'DEFINITIVOS'not in keytext:raise ValueError('Preliminary key forbidden')
    keys=held.parse_grouped_key(keytext)
    text=base.pdf_text(g['question']['path']);normalized=stage.normalize(re.sub(r'(?m)^\s*\d+\s*$','',text))
    if (stage.normalize(pack['support_body'])not in normalized or len(pack['support_body'])<1000
            or '26/12/2001'not in pack['support_label']or 'históricas'not in pack['support_label']):
        raise ValueError('Complete, dated historical support required')
    for d in ds:
        parent=d['original_question_number'];sub=d['original_subitem_number'];index=d['source_item_index_zero_based']
        if (parent!=(1 if index<62 else 2)or sub!=(index-57)%5+1
                or not d['answer_verified']or not d['context_complete']
                or keys[parent,sub]!=d['official_answer']or d['official_answer']not in ['C','E']
                or any(stage.normalize(d[k])not in normalized for k in ['original_instruction','official_statement'])):
            raise ValueError('Changed original identity, statement, command or final key')
        if not d['publication_approved']:
            if 'row'in d or not d['remaining_blockers']:raise ValueError('Ambiguous original must stay held')
            continue
        row=d['row'];key=f'official:SEFAZ_AL2002:fiscal:question:{parent}:subitem:{sub}'
        if (row['id']!=uid(key)or row['external_item_key']!=key or 'item_number'in row
                or row['source_id']!=uid(g['question']['url'])or row['is_original']is not False
                or row['contest_name']!='SEFAZ Alagoas'or row['contest_year']!=2002
                or row['career_name']!='Fiscal de Tributos Estaduais'or row['exam_board']!='CEBRASPE'
                or row['subject']!='Língua Portuguesa'or row['content_status']!='active'
                or row['official_answer']!=d['official_answer']or row['question_text']!=public_text(pack,d)
                or 'current_syllabus_topic_id'in row or row['syllabus_topic_id']!=TOPICS[parent]
                or len(row['explanation'])<200 or '\n\nExemplo: 'not in row['explanation']):
            raise ValueError('Unapproved publication attribution, coverage or explanation')
    held.checked_bytes(pack['pf_syllabus_evidence'])
    if 'Compreensão e interpretação de textos'not in base.pdf_text(pack['pf_syllabus_evidence']['path']):
        raise ValueError('Official current syllabus capture required')
    return keys


def desired_payload(old,d,pack):
    p=copy.deepcopy(old['payload']);r=p['individual_review'];g=pack['exam']
    evidence=[dict(url=g[k]['url'],title='SEFAZ/AL 2002 — '+('caderno original'if k=='question'else'gabarito definitivo'),verified=True,checked_at=pack['checked_at'],sha256=g[k]['sha256'])for k in ['question','answer_key']]
    r.update(refinement_reason='Original question/subitem identity preserved by textual external key; official matrix key and complete dated context rechecked',
        primary_evidence=evidence,reviewed_at=pack['checked_at'],review_scope='Original compound identity, final key, context and current syllabus',
        official_conference_batch_id=pack['batch_id'],publication_approved=d['publication_approved'],answer_verified=True,
        original_exam_answer_not_verified=False,context_complete=True,current_syllabus_verified=d['publication_approved'],
        original_question_number=d['original_question_number'],original_subitem_number=d['original_subitem_number'],
        official_exam_answer=d['official_answer'],remaining_blockers=d['remaining_blockers'])
    if d['publication_approved']:
        row=d['row'];comment,example=row['explanation'].split('\n\nExemplo: ',1)
        p.update(author_commentary=comment,author_example=example);r.update(explanation=comment,example=example,technical_answer_candidate=d['official_answer'])
        p['publication']=dict(table='curated_question_catalog',id=row['id'],original_exam=True,external_item_key=row['external_item_key'],
            original_question_number=d['original_question_number'],original_subitem_number=d['original_subitem_number'],
            question_source_id=row['source_id'],answer_key_source_id=uid(g['answer_key']['url']),
            current_syllabus_topic_id=row['syllabus_topic_id'],checked_at=pack['checked_at'])
    return p


def row_filters(row):
    parts={}
    for key,value in row.items():
        if value is None:parts[key]='is.null'
        else:
            literal=json.dumps(value,ensure_ascii=False,separators=(',',':'))if isinstance(value,(dict,list,bool))else str(value)
            parts[key]='eq.'+literal
    return urllib.parse.urlencode(parts)


def release(pack,request,report_path,apply=False):
    verify(pack);report_path=Path(report_path)
    if report_path.resolve().is_relative_to(Path(__file__).resolve().parents[2]):raise ValueError('Private backups must stay outside Git')
    ds=pack['decisions'];ids=','.join(d['origin_candidate_id']for d in ds)
    originals=request('question_corpus_candidates?select=*&id=in.('+ids+')');actual={r['id']:r for r in originals};desired={}
    if len(actual)!=10:raise RuntimeError('Missing held origins')
    for d in ds:
        old=actual[d['origin_candidate_id']];want=desired_payload(old,d,pack)
        if (old['corpus_id']!=pack['source_id']or old['content_status']!='reviewed'
                or hashlib.sha256(old['payload']['raw_text'].encode()).hexdigest()!=d['expected_raw_text_sha256']):
            raise RuntimeError('Changed held review status or original extraction')
        if old['payload']!=want and (old['payload'].get('publication')or old['payload']['individual_review'].get('publication_approved')is not False):
            raise RuntimeError('Prior publication/approval is protected')
        desired[old['id']]=want
    [edition]=request('syllabus_editions?select=*&id=eq.'+pack['current_edition_id'])
    [edital]=request('content_sources?select=*&id=eq.'+pack['current_edital_source_id'])
    topics=request('syllabus_topics?select=*&id=in.('+','.join(TOPICS.values())+')')
    if (len(topics)!=2 or any(t['edition_id']!=edition['id']or t['content_status']!='current'or t['discipline']!='Língua Portuguesa'for t in topics)
            or edition['status']!='active'or edition['source_id']!=edital['id']or not edital['is_official']
            or edital['status']!='vigente'or edital['url']!=pack['pf_syllabus_evidence']['url']):raise RuntimeError('Official active current syllabus required')
    for kind in ['question','answer_key']:
        e=pack['exam'][kind];[source]=request('content_sources?select=*&id=eq.'+uid(e['url']))
        if source['url']!=e['url']or not source['is_official']or source['status']!='vigente':raise RuntimeError('Registered historical official source required')
    public=[d['row']for d in ds if d['publication_approved']];own={r['id']for r in public};counts={};exact={};external={}
    for table,fields in stage.TABLES.items():
        if table=='question_corpus_candidates':fields='id,corpus_id,content_status,question_text:payload->>question_text_candidate,stem:payload->>stem'
        if table=='curated_question_catalog':fields+=',source_id,external_item_key'
        rows=stage.collect(request,table,fields);counts[table]=len(rows)
        for r in rows:
            if table=='curated_question_catalog':external[(r['source_id'],r['external_item_key'])]=r['id']
            if (table=='question_corpus_candidates'and r['id']in actual)or(table=='curated_question_catalog'and r['id']in own):continue
            variants=[r.get('question_text'),r.get('stem')]if table=='question_corpus_candidates'else stage.variants(table,r)
            for text in variants:
                if text:exact.setdefault(stage.normalize(text),[]).append((table,r['id']))
    planned=[]
    for d in ds:
        if not d['publication_approved']:continue
        row=d['row'];origin=actual[d['origin_candidate_id']]
        variants=[row['question_text'],d['official_statement'],d['original_instruction']+' '+d['official_statement'],origin['payload'].get('question_text_candidate','')]
        if any(stage.normalize(text)in exact for text in variants if text):raise RuntimeError('Duplicate requires individual assessment')
        key=(row['source_id'],row['external_item_key'])
        if key in external and external[key]!=row['id']:raise RuntimeError('Existing compound identity protected')
        found=request('curated_question_catalog?select=*&id=eq.'+row['id']);staged=dict(row,content_status='under_review')
        if found and not(base.same(found[0],row)or base.same(found[0],staged)):raise RuntimeError('Existing public revision protected')
        planned.append((row,bool(found)))
    report=dict(batch_id=pack['batch_id'],apply=apply,complete=False,decisions=10,approved=9,retained=1,compared_counts=counts,private_refined_ids=[],published_ids=[])
    backup=report_path.with_suffix('.preflight.json')
    if not backup.exists():backup.write_text(json.dumps(originals,ensure_ascii=False,indent=2)+'\n')
    def save():report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    save()
    if apply:
        for row,exists in planned:
            if not exists:request('curated_question_catalog?on_conflict=id','POST',[dict(row,content_status='under_review')],'resolution=ignore-duplicates,return=representation')
        for d in ds:
            ident=d['origin_candidate_id'];old=actual[ident]
            if old['payload']!=desired[ident]:
                result=request('rpc/refine_held_corpus_candidate','POST',dict(candidate=ident,expected_status='reviewed',expected_payload=old['payload'],next_status='reviewed',next_payload=desired[ident]))
                if result not in ['updated','unchanged']:raise RuntimeError('Audited refinement failed')
            report['private_refined_ids'].append(ident);save()
        for d in ds:
            if not d['publication_approved']:continue
            row=d['row'];ident=d['origin_candidate_id'];[private]=request('question_corpus_candidates?select=*&id=eq.'+ident)
            base.assert_publication_approval(private['payload'],desired[ident],row)
            [observed]=request('curated_question_catalog?select=*&id=eq.'+row['id'])
            if not base.same(observed,row):
                staged=dict(row,content_status='under_review')
                if not base.same(observed,staged):raise RuntimeError('Concurrent staged revision protected')
                changed=request('curated_question_catalog?'+row_filters(staged),'PATCH',dict(content_status='active'))
                if len(changed)!=1 or not base.same(changed[0],row):raise RuntimeError('Activation conflict')
            report['published_ids'].append(row['id']);save()
        for row,exists in planned:
            [fresh]=request('curated_question_catalog?select=*&id=eq.'+row['id'])
            if not base.same(fresh,row):raise RuntimeError('Final public readback mismatch')
        fresh=request('question_corpus_candidates?select=*&id=in.('+ids+')')
        if len(fresh)!=10 or any(r['payload']!=desired[r['id']]or r['content_status']!='reviewed'for r in fresh):raise RuntimeError('Private readback mismatch')
    report['complete']=True;save();return report


if __name__=='__main__':
    import argparse,getpass,urllib.request,urllib.error
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('pack',type=Path);parser.add_argument('report',type=Path);parser.add_argument('--apply',action='store_true');args=parser.parse_args()
    pack=json.loads(args.pack.read_text());verify(pack);credential=getpass.getpass('Supabase credential (hidden): ')
    def request(path,method='GET',body=None,prefer='return=representation'):
        req=urllib.request.Request(stage.BASE+path,method=method,headers={'apikey':credential,'Content-Type':'application/json','Prefer':prefer},data=json.dumps(body,ensure_ascii=False).encode()if body is not None else None)
        try:
            with urllib.request.urlopen(req,timeout=90)as response:
                data=response.read();return json.loads(data)if data else None
        except urllib.error.HTTPError as exc:raise RuntimeError('Supabase HTTP '+str(exc.code))from None
    print(json.dumps(release(pack,request,args.report,args.apply),ensure_ascii=False))
