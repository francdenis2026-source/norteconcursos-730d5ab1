"""Build a review pack from the readback of the separately audited text repair.
Usage: SNAPSHOT_FOLDER EVIDENCE_MANIFEST OUTPUT_PACK EXCLUSIONS_PACK [DECISIONS_JSON]
No credentials/network. Official originals stay in ignored outputs.
"""
import datetime, hashlib, json, pathlib, re, sys
ROOT=pathlib.Path(__file__).resolve().parents[2]

def build(snapshot,manifest_path,output,exclusions_output,decisions_path=None):
    read=lambda p:json.loads(pathlib.Path(p).read_text())
    decisions=read(decisions_path or ROOT/'scripts/review/pcac-2017-v-reviewed.json')
    evidence=read(manifest_path)
    pinned=read(ROOT/'docs/question-review-pcac-v-evidence-2026-10-15.json')['sources']
    for name,source in evidence['sources'].items():
        if any(source[k]!=pinned[name][k] for k in ['sha256','url','reviewed_at']):raise ValueError('Evidence differs from reviewed manifest: '+name)
        p=pathlib.Path(source['path']);digest=hashlib.sha256(p.read_bytes()).hexdigest()
        if digest!=source['sha256']:raise ValueError('Reviewed evidence changed: '+p.name)
        if not source.get('reviewed_at') or not source.get('url','').startswith('https://'):raise ValueError('Dated official evidence required')
    if evidence['sources']['prova']['sha256']!='6fc3d1720f125c353d99e08541c67e3baddaaf8de9ac3051a0ca271c1d4cfb69':raise ValueError('Wrong caderno/version')
    if evidence['sources']['matrix']['sha256']!='900be3d17f0a8f6e834d2c90019e3a594aa0fa81d354fff483059662401be88b':raise ValueError('Wrong current syllabus')
    rows=read(snapshot/'pcac-fresh.json');sources=read(snapshot/'content_sources-fresh.json');topics=read(snapshot/'syllabus_topics-fresh.json')
    originals={r['item_number']:r for r in rows if r['career_name']=='Agente de Polícia Civil'}
    # The archived aliases deliberately remain outside the operation.
    if len(originals)!=79:raise ValueError('Canonical exam scope changed')
    matrices={'matrix':('a982e86c-f18a-47f5-9cf8-f1f8bd2a22ff','900be3d17f0a8f6e834d2c90019e3a594aa0fa81d354fff483059662401be88b'),'pcdf_matrix':('02caf358-7504-4e09-b4e7-fe04e6bfae44','3b288efc9b596a8f915b38d50f693c2eae464a745ad07eac107283ec2fd876fa')}
    stamp=datetime.datetime.now(datetime.timezone.utc).isoformat();items=[];exclusions=[]
    def source(name):return evidence['sources'][name]
    def basis(name,ref):
        s=source(name)
        registered=[r for r in sources if r['url']==s['url'] and r['is_official'] and r['status'] in ['vigente','parcialmente_revogado']]
        if not registered:raise ValueError('Official source not registered: '+name)
        return dict(url=s['url'],title=s['title']+' — '+ref,lei=s['title'])
    for d in decisions['active']+decisions['historical']:
        n=d['item_number'];r=originals[n]
        if r['content_status']!='under_review' or r['context_review_required'] or 'TEXTO VERBATIM' in r['question_text']:raise ValueError('Fresh complete pending row required: '+str(n))
        if not all('('+a+')' in r['question_text'] for a in 'ABCDE'):raise ValueError('Missing alternatives')
        if d.get('answer',r['official_answer'])!=r['official_answer']:raise ValueError('Final key mismatch')
        names=['prova','gabarito'];legal=d['norm'] is not None
        patch=dict(content_status=d.get('status','active'),review_note=d['explanation'],verified_at=stamp)
        if patch['content_status']=='active':
            matrix=d.get('matrix','matrix')
            if matrix not in matrices or source(matrix)['sha256']!=matrices[matrix][1]:raise ValueError('Unverified current matrix')
            topic=next(t for t in topics if t['id']==d['topic_id'])
            if topic['edition_id']!=matrices[matrix][0] or topic['content_status']!='current':raise ValueError('Current matrix topic mismatch')
            patch.update(current_syllabus_topic_id=d['topic_id'],legal_review_required=legal,legal_audit_completed=legal)
            names+=[matrix]
        if legal:
            norm=d['norm'];names+=[norm];refs=d.get('reference','Regime vigente cotejado com texto histórico')
            bs=[basis(norm,refs)]
            if n in [30,51,52,67]:
                names+=['cf'];bs.append(basis('cf',{30:'art. 37, § 6º',51:'art. 5º, XI',52:'art. 5º, LXIII',67:'art. 225, § 3º'}[n]))
            for additional in d.get('additional_basis',[]):
                names.append(additional['norm']);bs.append(basis(additional['norm'],additional['reference']))
            patch.update(legal_basis=bs,law_version_checked_at=source(norm)['reviewed_at'])
        names+= {32:['stf_promotor'],36:['stf_sigilo'],38:['stf_foro'],40:['stf_extradicao'],67:['stf_ambientais'],68:['hediondos']}.get(n,[])
        if patch['content_status']!='active':
            norm_source=next(s for s in sources if s['url']==source(d['norm'])['url'] and s['is_official'])
            row=dict(edition_id='59a6294e-7f50-441d-a718-6ffbc02d90ec',original_item=f'PC-AC 2017 S01-V — questão {n} — '+r['id'],exclusion_type='replaced' if n==23 else 'obsolete',reason=d['reason'],replacement_source_id=norm_source['id'])
            exclusions.append(dict(row=row,expected_question=r))
        names+=d.get('extra_sources',[])
        names=list(dict.fromkeys(names));urls=[source(name)['url'] for name in names]
        items.append(dict(table='official_exam_questions',expected=r,patch=patch,evidence=dict(legal=legal,reason=d.get('reason','Revisão individual: '+d.get('reference',''))+'; gabarito e identidade S01-V preservados.',sources=urls,artifacts=[dict(source=name,sha256=source(name)['sha256'],reviewed_at=source(name)['reviewed_at'])for name in names])))
    if len({i['expected']['id'] for i in items})!=len(items):raise ValueError('Repeated editorial decision')
    pathlib.Path(output).write_text(json.dumps(dict(items=items),ensure_ascii=False,indent=2)+'\n')
    pathlib.Path(exclusions_output).write_text(json.dumps(dict(items=exclusions),ensure_ascii=False,indent=2)+'\n')
    print('Editorial decisions',len(items),'active',sum(i['patch']['content_status']=='active' for i in items))
if __name__=='__main__':
    folder,manifest,output,exclusions,*dataset=sys.argv[1:]
    if len(dataset)>1:raise ValueError('Only one decisions dataset allowed')
    build(pathlib.Path(folder),manifest,output,exclusions,dataset[0] if dataset else None)
