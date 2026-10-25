"""Explicit obsolete item: preserve the historical text/key and archive for current study."""
import datetime
import hashlib
import json
from review_378_decisions import BASE, ROOT, SOURCES

def main():
    row=next(r for r in BASE['official_exam_questions'] if r['id']=='760c2113-2af1-4622-b286-71fae4ee1750')
    assert row['official_answer']=='B' and row['item_number']==70
    reason=('Questão histórica de 2022, superada para treino da legislação vigente: a Lei 15.397/2026, art. 3, revogou o §5 do art. 171 do CP, que condicionava em regra o estelionato à representação. Publicada no DOU de 04/05/2026, entrou em vigor nessa data (art. 4). A alternativa B permanece apenas como gabarito histórico; não deve orientar o regime atual. Texto e resposta originais preservados. Aplicações intertemporais a fatos anteriores exigem análise própria.')
    checked=datetime.datetime.now(datetime.timezone.utc).isoformat()
    basis=[{'title':SOURCES['cp'][0],'url':SOURCES['cp'][1]},
           {'title':'Lei 15.397/2026','url':'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15397.htm'}]
    decision={'table':'official_exam_questions','id':row['id'],'exam':'PCRO Escrivão 2022','item':70,
              'question_md5':hashlib.md5(row['question_text'].encode()).hexdigest(),
              'expected_answer':row['official_answer'],'expected_status':row['content_status'],
              'expected_basis':row['legal_basis'],'expected_checked_at':row['law_version_checked_at'],
              'expected_current_topic':row['current_syllabus_topic_id'],
              'expected_review_note_md5':hashlib.md5((row['review_note'] or '').encode()).hexdigest(),
              'decision':'obsolete_archived','reason':reason,
              'evidence_url':'https://www2.camara.leg.br/legin/fed/lei/2026/lei-15397-30-abril-2026-799020-publicacaooriginal-179083-pl.html',
              'patch':{'content_status':'archived','legal_basis':basis,'law_version_checked_at':checked,'review_note':reason}}
    path=ROOT/'docs/question-legal-review-378-batch02-2026-10-11.json'
    if path.exists():
        old=json.loads(path.read_text(encoding='utf-8'))['decisions'][0]
        if old['reason']==reason:decision['patch']['law_version_checked_at']=old['patch']['law_version_checked_at']
    result={'scope_total':378,'checked_at':checked,'previous_individual_decisions':100,
            'pending_individual_review':277,'decisions':[decision]}
    path.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Explicit archive decisions: 1; cumulative: 101; pending: 277')

if __name__=='__main__':main()
