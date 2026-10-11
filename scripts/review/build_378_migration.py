"""Generate a bounded, transactional and idempotent migration from reviewed decisions."""
import json
import argparse
from pathlib import Path
from urllib.parse import urlparse

ROOT=Path(__file__).resolve().parents[2]

def literal(value, field=None):
    if value is None:return 'NULL'
    if isinstance(value,bool):return 'true' if value else 'false'
    cast=''
    if isinstance(value,(list,dict)):
        value=json.dumps(value,ensure_ascii=False,separators=(',',':'));cast='::jsonb'
    elif field=='law_version_checked_at':cast='::timestamptz'
    elif field in ('id','current_syllabus_topic_id'):cast='::uuid'
    return "'"+str(value).replace("'","''")+"'"+cast

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--manifest',type=Path,default=ROOT/'docs/question-legal-review-378-2026-10-11.json')
    parser.add_argument('--output',type=Path,default=ROOT/'supabase/migrations/20261011130000_official_source_review_378_batch01.sql')
    args=parser.parse_args()
    manifest=json.loads(args.manifest.read_text(encoding='utf-8'))
    ds=manifest['decisions']
    sources={b['url']:b for d in ds for b in d['patch']['legal_basis']}
    for d in ds:
        if d.get('syllabus_source'):sources[d['syllabus_source']]={'url':d['syllabus_source'],'title':'PCDF Delegado 2026: edital oficial retificado'}
    sql=['-- Individual official-source review of an explicit subset of 378 held questions.',
         '-- Original text, definitive answer keys and historical topic links are preserved.',
         '-- Unreviewed items remain held. Every stale record aborts the whole migration.', 'BEGIN;']
    for b in sources.values():
        host=urlparse(b['url']).hostname
        typ='edital' if host=='cdn.cebraspe.org.br' else 'jurisprudencia' if 'jus.br' in host else 'manual' if 'unodc.org' in host else 'lei'
        issuer='CEBRASPE / PCDF' if typ=='edital' else 'STF' if 'stf.' in host else 'STJ' if 'stj.' in host else 'ONU / UNODC' if typ=='manual' else 'Presidência da República'
        values=[typ,b['title'],issuer,b['url'],manifest['checked_at'],'vigente']
        sql.append('INSERT INTO public.content_sources(source_type,title,issuer,url,checked_at,status,is_official) VALUES ('+
                   ','.join(literal(v) for v in values)+',true) ON CONFLICT(url) DO NOTHING;')
    for d in ds:
        table=d['table']
        if table not in ('official_exam_questions','curated_question_catalog'):raise ValueError('Unknown table')
        patch=d['patch']
        allowed={'legal_basis','law_version_checked_at','content_status','review_note','explanation','legal_review_required','legal_audit_completed','current_syllabus_topic_id'}
        if not set(patch)<=allowed:raise ValueError('Protected patch')
        base=['q.id='+literal(d['id'],'id'),"md5(q.question_text)="+literal(d['question_md5']),
              'q.official_answer='+literal(d['expected_answer'])]
        publication=[]
        if patch['content_status']=='active':
            assert d['decision']=='verified' and patch['legal_audit_completed']
            publication=['NOT q.context_review_required',
              'EXISTS(SELECT 1 FROM public.syllabus_topics t JOIN public.syllabus_editions e ON e.id=t.edition_id WHERE t.id='+literal(patch['current_syllabus_topic_id'],'current_syllabus_topic_id')+" AND t.content_status='current' AND e.status='active')"]
        source_guard=("NOT EXISTS(SELECT 1 FROM jsonb_array_elements("+literal(patch['legal_basis'])+
                     ") b WHERE NOT EXISTS(SELECT 1 FROM public.content_sources s WHERE s.url=b->>'url' AND s.is_official))")
        publication.append(source_guard)
        equal=[f'q.{f} IS NOT DISTINCT FROM '+literal(v,f) for f,v in patch.items()]
        expected=list(base)+publication
        for field,key in [('content_status','expected_status'),('legal_basis','expected_basis'),('law_version_checked_at','expected_checked_at'),('current_syllabus_topic_id','expected_current_topic')]:
            if key in d:expected.append(f'q.{field} IS NOT DISTINCT FROM '+literal(d[key],field))
        for field in ('review_note','explanation'):
            key='expected_'+field+'_md5'
            if key in d:expected.append("md5(coalesce(q."+field+",''))="+literal(d[key]))
        sql.append('\n-- '+d['exam']+' / '+str(d['item'])+' / '+d['decision'])
        sql.append('DO $review$ DECLARE changed integer; BEGIN\n  IF EXISTS(SELECT 1 FROM public.'+table+' q WHERE '+
                   ' AND '.join(base+publication+equal)+') THEN NULL;\n  ELSE\n    UPDATE public.'+table+' q SET '+
                   ', '.join(f'{f}='+literal(v,f) for f,v in patch.items())+' WHERE '+' AND '.join(expected)+';\n'+
                   '    GET DIAGNOSTICS changed=ROW_COUNT;\n    IF changed<>1 THEN RAISE EXCEPTION '+literal('Stale or incomplete review: '+d['id'])+'; END IF;\n  END IF;\nEND; $review$;')
    sql.append('COMMIT;\n')
    path=args.output
    path.write_text('\n'.join(sql),encoding='utf-8')
    print('Bounded migration entries:',len(ds))

if __name__=='__main__':main()
