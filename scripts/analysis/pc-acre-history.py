"""Read-only historical counts from ignored snapshots; never publishes questions or forecasts probabilities."""
import argparse, collections, json, pathlib, re, unicodedata, urllib.parse


def norm(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s.lower()) if unicodedata.category(c) != 'Mn')


def role_of(career):
    text = norm(career)
    if 'delegado' in text: return 'Delegado'
    if 'escriv' in text: return 'Escrivão'
    if 'investigador' in text or 'agente' in text: return 'Investigador/Agente'
    return None


def subject_of(subject):
    t = norm(subject)
    if 'portugues' in t: return 'Português'
    if 'redacao oficial' in t: return 'Redação oficial'
    if 'informatic' in t: return 'Informática'
    if 'arquivolog' in t: return 'Arquivologia'
    if 'logico' in t and ('contabil' in t or 'estatistico' in t): return 'RLM/estatística/contabilidade (bloco misto)'
    if 'logico' in t: return 'Raciocínio lógico'
    if 'estatistica' in t: return 'Estatística'
    if 'contabil' in t: return 'Contabilidade'
    if 'direito penal' in t and 'processual' in t: return 'Penal/CPP/leis especiais (bloco misto)'
    if ('processual penal' in t or 'processo penal' in t) and 'extravagante' not in t: return 'Processo Penal'
    if 'processual penal' in t and 'extravagante' in t: return 'CPP/leis especiais (bloco misto)'
    if 'direito penal' in t and 'extravagante' in t: return 'Penal/leis especiais (bloco misto)'
    if 'legislacao' in t and ('penal' in t or 'especial' in t or 'organizacoes' in t): return 'Legislação especial'
    if t.endswith('direito penal'): return 'Penal'
    if 'constitucional' in t: return 'Constitucional'
    if 'direito administrativo' in t: return 'Administrativo'
    if 'direitos humanos' in t or 'direito humanos' in t: return 'Direitos humanos'
    if 'medicina legal' in t: return 'Medicina Legal'
    if 'criminolog' in t: return 'Criminologia'
    if 'lei organica' in t or 'institucional' in t or 'estadual' in t or 'especifica' in t: return 'Legislação institucional/estadual (não transferir entre estados)'
    if 'regional' in t or 'sobre sergipe' in t or 'geografia do amazonas' in t: return 'Conhecimentos regionais do estado da prova'
    return subject


def state_of(q):
    t = norm(q['contest_name'])
    for name,code in [('distrito federal','DF'),('acre','AC'),('piaui','PI'),('minas gerais','MG'),('ceara','CE'),('pernambuco','PE'),('santa catarina','SC'),('amazonas','AM'),('sergipe','SE'),('rondonia','RO'),('espirito santo','ES'),('rio de janeiro','RJ')]:
        if name in t: return code
    return q.get('state') or q['contest_name']


TRUSTED = {'cdn.cebraspe.org.br','www.cebraspe.org.br','conhecimento.fgv.br','www.cev.uece.br'}


def analyze(folder):
    sources = {s['id']:s for s in json.loads((folder/'content_sources.json').read_text())}
    questions = json.loads((folder/'official_exam_questions.json').read_text())
    assert len(questions) == len({q['id'] for q in questions}), 'Duplicated snapshot IDs'
    groups = collections.defaultdict(list)
    for q in questions:
        role = role_of(q['career_name'])
        if role: groups[(q['contest_name'],q['exam_year'],q['career_name'])].append(q)
    candidates = collections.defaultdict(list)
    excluded = []
    for key, rows in groups.items():
        ids = {q['question_source_id'] for q in rows} | {q['answer_key_source_id'] for q in rows}
        src = [sources.get(i,{}) for i in sorted(ids)]
        direct = all(s.get('is_official') and urllib.parse.urlparse(s.get('url') or '').hostname in TRUSTED and '.pdf' in urllib.parse.urlparse(s.get('url') or '').path.lower() for s in src)
        event = (state_of(rows[0]),key[1],role_of(key[2]))
        item_numbers = [q['item_number'] for q in rows]
        if len(item_numbers)!=len(set(item_numbers)): raise ValueError(f'Duplicate item numbers: {key}')
        summary = dict(state=event[0],year=event[1],role=event[2],contest=key[0],career=key[2],board=rows[0]['exam_board'],records=len(rows),statuses=dict(collections.Counter(q['content_status'] for q in rows)),subjects=dict(collections.Counter(subject_of(q['subject']) for q in rows)),sources=[{k:s.get(k) for k in ['title','url','is_official']} for s in src],max_item=max(item_numbers))
        if not direct:
            excluded.append(dict(**summary,reason='Mirror, placeholder or source without a direct official PDF; inventory only'))
        else: candidates[event].append(summary)
    events=[]
    for event, items in candidates.items():
        items.sort(key=lambda x:(x['records'],x['statuses'].get('active',0)),reverse=True)
        events.append(items[0])
        excluded.extend(dict(**x,reason='Duplicate state/year/role event') for x in items[1:])
    # Do not publish private mirror URLs in derived reports. Raw sources stay in ignored snapshots.
    for item in excluded: item.pop('sources', None)
    profiles={}
    for role in ['Investigador/Agente','Escrivão','Delegado']:
        selected=[e for e in events if e['role']==role and e['year']>=2024]
        if role=='Escrivão': selected=[e for e in events if e['role']==role and e['year']>=2021]
        selected.sort(key=lambda x:(-x['year'],x['state']))
        subjects=sorted({s for e in selected for s in e['subjects']})
        stats=[]
        max_year=max((e['year'] for e in selected),default=2026)
        for subject in subjects:
            weights=[2**(-(max_year-e['year'])/3) for e in selected]
            share=sum(w*e['subjects'].get(subject,0)/e['records'] for w,e in zip(weights,selected))/sum(weights)
            stats.append(dict(subject=subject,exams_present=sum(subject in e['subjects'] for e in selected),exams=len(selected),observed_questions=sum(e['subjects'].get(subject,0) for e in selected),weighted_observed_share=round(share*100,2)))
        profiles[role]=dict(exams=selected,total_records=sum(e['records'] for e in selected),subjects=sorted(stats,key=lambda x:(-x['exams_present'],-x['weighted_observed_share'])))
    return dict(method='Registered historical questions, including pending/annulled items for thematic counts only. No answers taught. Whole-exam normalization, recency half-life 3 years; no future probabilities. Direct registered official PDF URLs required, not a fresh web verification. Mixed subjects never split automatically.',profiles=profiles,excluded=sorted(excluded,key=lambda e:(e['state'],-e['year'],e['role'],e['contest'])))


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--snapshot',type=pathlib.Path,required=True);parser.add_argument('--output',type=pathlib.Path,required=True);args=parser.parse_args()
    result=analyze(args.snapshot);args.output.parent.mkdir(parents=True,exist_ok=True);args.output.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    for role,p in result['profiles'].items():
        print(role,len(p['exams']),'exams',p['total_records'],'records')
        for s in p['subjects'][:10]:print(s['subject'],f"{s['exams_present']}/{s['exams']}",s['weighted_observed_share'])
