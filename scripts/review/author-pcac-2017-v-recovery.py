"""Build guarded repair packs from ignored, visually checked official evidence.
No network or credentials. Run stages sequentially after reading back each write.
"""
import argparse, datetime, hashlib, json, pathlib, re
ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / 'outputs/question-review-2026-10-15'
KEY = dict(enumerate('C A C A E D C A A D B A A D A B A A B E A D E C E * E C A B E B B E A C E A C D B B D A B C C B E C D C D C C C C C B B E C B A B C B B D B C D E D B A D D A D'.split(), 1))
FIXES = {'Afunção':'A função','Apalavra':'A palavra','coma Internet':'com a Internet','Zecanãofoiao':'Zeca não foi ao','Zecanão':'Zeca não','Leinº':'Lei nº','Dojuiz':'Do juiz','Duplograu':'Duplo grau','ACRFB':'A CRFB','OSTF':'O STF','129,8 9º':'129, § 9º','Eresto':'Ernesto','217-Ado':'217-A do','Aautoridade':'A autoridade','Aprisão':'A prisão','Nocaso':'No caso','seremilícitas':'serem ilícitas','àfamília':'à família','Acompetência':'A competência','noscasos':'nos casos','Aremoção':'A remoção','Oindiciamento':'O indiciamento','ainfração':'a infração','Ainfiltração':'A infiltração','Ainterceptação':'A interceptação','ALei':'A Lei','Aperda':'A perda','Arigidez':'A rigidez','éinviável':'é inviável'}
HEADINGS = ['NOÇÕES DE DIREITO PROCESSUAL PENAL','LEGISLAÇÃO DE DIREITO PENAL E PROCESSUAL PENAL ESPECIAL','NOÇÕES DE MEDICINA LEGAL']
def read(name): return json.loads((OUT / (name+'.json')).read_text())
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
def now(): return datetime.datetime.now(datetime.timezone.utc).isoformat()
def transcription(q):
    n=q['number']; text=q['text'].replace('-\n','-')
    for a,b in FIXES.items(): text=text.replace(a,b)
    text=re.sub(r'^Cc\)', 'C)', text, flags=re.M)
    if n==13:
        text='Com relação à computação nas nuvens (cloud computing), analise as afirmativas a seguir.\nI. Uma desvantagem é em relação ao custo.\nII. Para sua utilização, é necessária uma conexão com a Internet.\nIII. A palavra “nuvem” se refere à Internet.\nIV. Google, Amazon e Microsoft são exemplos de empresas líderes nesse serviço.\nEstão corretas as afirmativas:\nA) II, III e IV, apenas.\nB) I, II e III, apenas.\nC) I, II, III e IV.\nD) I, III e IV, apenas.\nE) I, II e IV, apenas.'
    if n==14:
        text='No Microsoft Excel, qual dos operadores a seguir deve preceder a digitação de uma fórmula em uma célula?\nA) @\nB) #\nC) $\nD) =\nE) +'
    if n==18:
        text=text.split('\nA)')[0]+'\nA) 1/72\nB) 7/99\nC) 7/(3⁶)\nD) 1/(3¹⁸)\nE) 392/(9²)'
    pieces=re.split(r'^([A-E])\)\s*',text.strip(),flags=re.M)
    if len(pieces)!=11 or pieces[1::2]!=list('ABCDE'):raise ValueError(f'Incomplete OCR labels in {n}')
    def clean(s):return re.sub(r'\s+',' ',s).strip()
    stem=clean(pieces[0]);result=stem
    for label,alt in zip(pieces[1::2],pieces[2::2]):
        alt=clean(alt)
        for heading in HEADINGS:
            if alt.endswith(heading):alt=alt[:-len(heading)].rstrip()
        result+='\n\n('+label+') '+alt
    return result

def build(stage):
    hashes = {'V-4.pdf':'6fc3d1720f125c353d99e08541c67e3baddaaf8de9ac3051a0ca271c1d4cfb69','gabarito-final.pdf':'a0d364982268671c13071145da7445923139e8183386eaff8c1999b56d695697','edital.pdf':'b77448e72ce9fe3824297ae6cb1896554838eac8d41bfc9ae602c08a7aa87cde','ocr-questions.json':'f0d8c2ace62f00befd36dea0b680b2733182f17b855d668c87cee673ef967a03'}
    for name,digest in hashes.items():
        if sha(OUT/name)!=digest: raise ValueError('Evidence changed: '+name)
    rows=[r for r in read('pcac-fresh') if r['content_status']=='under_review' and r['career_name']=='Agente de Polícia Civil']
    assert len({r['item_number'] for r in rows})==len(rows)
    sources={s['kind']:s for s in read('sources-pack')['sources']};ocr={q['number']:q for q in read('ocr-questions')}
    for r in rows:assert r['official_answer']==KEY[r['item_number']]!='*',f'Final key mismatch: {r["item_number"]}'
    prova=sources['prova'];gabarito=sources['gabarito'];items=[];stamp=now()
    for r in rows:
        n=r['item_number'];q=ocr[n]
        if stage=='provenance':
            patch=dict(question_source_id=prova['row']['id'],answer_key_source_id=gabarito['row']['id'],source_page=q['page'],verified_at=stamp,review_note=r['review_note']+'\nProveniência corrigida em 15/10/2026: caderno oficial S01 versão V e gabarito definitivo IBADE, página 2, individualmente cotejados. Gabarito original preservado. A recuperação da fonte não libera o item para treino. Texto e vigência ainda têm decisões separadas.')
            evidence=dict(reason='Cotejo do número e da letra com o gabarito definitivo S01-V, página 2; página do item no caderno S01-V.',visually_verified=True,item_number=n,official_answer=r['official_answer'],page=q['page'])
            for kind,s in [('prova',prova),('gabarito',gabarito)]:evidence[kind]=dict(path=s['evidence']['pdf_path'],sha256=s['evidence']['sha256'],url=s['row']['url'])
        elif stage=='context':
            if n<=10:continue # Supporting article still pending separate permission/context review.
            patch=dict(question_text=transcription(q),source_page=q['page'],context_review_required=False,verified_at=stamp,review_note=r['review_note']+'\nTexto e cinco alternativas recuperados do caderno oficial S01-V; conferência visual, inclusive fórmulas, símbolos e nomes. Preservados enunciado, gabarito e extração anterior. Apenas contexto recuperado: revisão de vigência e de pertinência ao edital permanece separada, sem ativação automática.')
            evidence=dict(reason='Transcrição integral do item e alternativas na página indicada do caderno oficial, sem substituir o texto por paráfrase.',visually_verified=True,pdf_sha256=prova['evidence']['sha256'],pdf_path=prova['evidence']['pdf_path'],source_url=prova['row']['url'],page=q['page'],alternative_labels=list('ABCDE'))
        else:raise ValueError(stage)
        items.append(dict(expected=r,patch=patch,evidence=evidence))
    pack=dict(items=items,scope=f'PC-AC 2017 S01-V; {stage}; sem alterar gabaritos, duplicados arquivados ou outras provas.')
    (OUT/(stage+'-pack.json')).write_text(json.dumps(pack,ensure_ascii=False,indent=2)+'\n')
    print(stage,len(items))

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('stage',choices=['provenance','context']);build(parser.parse_args().stage)
